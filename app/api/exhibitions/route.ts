import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const dbExhibitions = await prisma.exhibition.findMany({
      include: { highlights: true },
      orderBy: { createdAt: "desc" },
    });

    const exhibitions = dbExhibitions.map((item, idx) => {
      const isFeatured = idx === 0;
      let badge = "Past Exhibition";
      if (isFeatured) {
        badge = "Featured Exhibition";
      } else if (item.status === "Upcoming") {
        badge = "Upcoming Exhibition";
      } else if (item.status === "Special") {
        badge = "Special Exhibition";
      } else if (item.status === "Permanent") {
        badge = "Permanent Collection";
      } else if (
        item.badgeLabel &&
        !item.badgeLabel.toLowerCase().includes("featured") &&
        !item.badgeLabel.toLowerCase().includes("now on") &&
        !item.badgeLabel.toLowerCase().includes("current")
      ) {
        badge = item.badgeLabel;
      } else {
        badge = "Past Exhibition";
      }

      return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle,
        category: item.category,
        dateRange: item.dateRange,
        location: item.location,
        imageSrc: item.imageSrc,
        imageAlt: item.imageAlt || item.title,
        description: item.description,
        curatorialEssay: item.curatorialEssay,
        curator: item.curator,
        status: item.status,
        badgeLabel: badge,
        featuredOnHome: isFeatured,
        highlights: item.highlights || [],
      };
    });

    return NextResponse.json({ exhibitions });
  } catch (error: any) {
    console.error("Public exhibitions fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exhibitions" },
      { status: 500 }
    );
  }
}
