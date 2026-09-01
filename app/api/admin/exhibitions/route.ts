import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const exhibitions = await prisma.exhibition.findMany({
      include: {
        highlights: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ exhibitions });
  } catch (error) {
    console.error("GET /api/admin/exhibitions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exhibitions from database" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      subtitle,
      slug,
      category,
      dateRange,
      location,
      imageSrc,
      imageAlt,
      descriptionHeading,
      description,
      curatorialEssayHeading,
      curatorialEssay,
      curator,
      status,
      badgeLabel,
      featuredOnHome,
      highlights = [],
    } = body;

    if (!title || !slug || !description) {
      return NextResponse.json(
        { error: "Title, slug, and description are required" },
        { status: 400 }
      );
    }

    const newExhibition = await prisma.exhibition.create({
      data: {
        title,
        subtitle: subtitle || "",
        slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        category: category || "Special Exhibitions",
        dateRange: dateRange || "TBA",
        location: location || "Main Gallery",
        imageSrc: imageSrc || "/images/exhibitions/silk-road-transformed.png",
        imageAlt: imageAlt || title,
        descriptionHeading: descriptionHeading || "Short Description",
        description,
        curatorialEssayHeading: curatorialEssayHeading || "Curatorial Narrative & Historical Context",
        curatorialEssay: curatorialEssay || description,
        curator: curator || "Central Asian Curatorial Team",
        status: status || "Current",
        badgeLabel: badgeLabel || "Featured Exhibition",
        featuredOnHome: featuredOnHome ?? true,
        seoKeywords: [category, title, "Central Asian Museum"],
        highlights: {
          create: highlights.map((h: any) => ({
            title: h.title,
            provenance: h.provenance || "Excavated Site",
            date: h.date || "Ancient Era",
            material: h.material || "",
            dimensions: h.dimensions || "",
            accessionNumber: h.accessionNumber || "",
            description: h.description || "",
            imageSrc: h.imageSrc || imageSrc || "/images/exhibitions/silk-road-transformed.png",
            imageAlt: h.title,
          })),
        },
      },
      include: {
        highlights: true,
      },
    });

    return NextResponse.json({
      success: true,
      exhibition: newExhibition,
    });
  } catch (error: any) {
    console.error("POST /api/admin/exhibitions error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create exhibition" },
      { status: 500 }
    );
  }
}
