import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { exhibitionsData } from "@/lib/exhibitions";
import { newsEventsData } from "@/lib/newsEvents";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_CATEGORIES = {
  exhibition: [
    "Special Exhibitions",
    "Architecture & Tilework",
    "Textile Art & Culture",
    "Gold & Metallurgy",
    "Manuscripts & Astronomy",
  ],
  news: [
    "Lecture & Symposium",
    "Artisan Workshop",
    "Curatorial News",
    "Cultural Gala",
    "Press Release",
  ],
};

async function ensureDefaultCategoriesSeeded(type: "exhibition" | "news") {
  try {
    const existing = await (prisma as any).category.findMany({
      where: { type },
    });
    if (existing.length === 0) {
      const defaults = DEFAULT_CATEGORIES[type];
      for (const catName of defaults) {
        await (prisma as any).category.upsert({
          where: { type_name: { type, name: catName } },
          update: {},
          create: { type, name: catName },
        });
      }
    }
  } catch (err) {
    console.error("Error seeding default categories to DB:", err);
  }
}

async function getCategoryListAndUsage(type: "exhibition" | "news") {
  await ensureDefaultCategoriesSeeded(type);

  let masterDbCategories: { name: string }[] = [];
  try {
    masterDbCategories = await (prisma as any).category.findMany({
      where: { type },
      orderBy: { createdAt: "asc" },
    });
  } catch (err) {
    console.error("Failed to fetch master categories from DB:", err);
  }

  let items: { category: string }[] = [];
  if (type === "news") {
    try {
      const dbItems = await prisma.newsEvent.findMany({ select: { category: true } });
      items = dbItems.length > 0 ? dbItems : newsEventsData;
    } catch {
      items = newsEventsData;
    }
  } else {
    try {
      const dbItems = await prisma.exhibition.findMany({ select: { category: true } });
      items = dbItems.length > 0 ? dbItems : exhibitionsData;
    } catch {
      items = exhibitionsData;
    }
  }

  const categoryMap = new Map<string, { originalName: string; count: number }>();

  // Initialize with Master Categories from DB
  masterDbCategories.forEach((cat) => {
    categoryMap.set(cat.name.toLowerCase(), { originalName: cat.name, count: 0 });
  });

  // Count items per category & include any item categories
  items.forEach((item) => {
    if (!item.category) return;
    const trimmed = item.category.trim();
    const key = trimmed.toLowerCase();
    if (categoryMap.has(key)) {
      categoryMap.get(key)!.count += 1;
    } else {
      categoryMap.set(key, { originalName: trimmed, count: 1 });
    }
  });

  const categories = Array.from(categoryMap.values()).map((entry) => ({
    name: entry.originalName,
    count: entry.count,
    isUsed: entry.count > 0,
  }));

  return categories;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get("type");
    const type: "exhibition" | "news" = typeParam === "news" ? "news" : "exhibition";

    const categories = await getCategoryListAndUsage(type);
    return NextResponse.json({ categories });
  } catch (error: any) {
    console.error("Categories fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type: typeParam, name } = body;
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const type: "exhibition" | "news" = typeParam === "news" ? "news" : "exhibition";
    const trimmedName = name.trim();

    try {
      await (prisma as any).category.upsert({
        where: { type_name: { type, name: trimmedName } },
        update: {},
        create: { type, name: trimmedName },
      });
    } catch (err) {
      console.error("Error creating category in DB:", err);
    }

    const categories = await getCategoryListAndUsage(type);
    return NextResponse.json({ categories });
  } catch (error: any) {
    console.error("Add category error:", error);
    return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { type: typeParam, categories: categoriesToDelete } = body;
    if (!Array.isArray(categoriesToDelete) || categoriesToDelete.length === 0) {
      return NextResponse.json({ error: "Categories list is required" }, { status: 400 });
    }

    const type: "exhibition" | "news" = typeParam === "news" ? "news" : "exhibition";
    const targets = categoriesToDelete.map((c: string) => c.toLowerCase());

    const currentUsageList = await getCategoryListAndUsage(type);
    const inUseTargets = currentUsageList.filter(
      (c) => targets.includes(c.name.toLowerCase()) && c.count > 0
    );

    if (inUseTargets.length > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete categories in use: ${inUseTargets.map((c) => c.name).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Delete unused categories from DB
    try {
      const allDbCategories = await (prisma as any).category.findMany({
        where: { type },
      });
      const idsToDelete = allDbCategories
        .filter((c: any) => targets.includes(c.name.toLowerCase()))
        .map((c: any) => c.id);

      if (idsToDelete.length > 0) {
        await (prisma as any).category.deleteMany({
          where: { id: { in: idsToDelete } },
        });
      }
    } catch (err) {
      console.error("Error deleting categories from DB:", err);
    }

    const updatedCategories = await getCategoryListAndUsage(type);
    return NextResponse.json({ categories: updatedCategories });
  } catch (error: any) {
    console.error("Delete category error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
