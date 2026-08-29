import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const newsEvents = await prisma.newsEvent.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ newsEvents });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news events from database" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      category,
      date,
      readTime,
      location,
      imageSrc,
      imageAlt,
      summary,
      content,
      status,
    } = body;

    if (!title || !slug || !summary) {
      return NextResponse.json(
        { error: "Title, slug, and summary are required" },
        { status: 400 }
      );
    }

    const newNews = await prisma.newsEvent.create({
      data: {
        title,
        slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        category: category || "Lecture & Symposium",
        date: date || "Upcoming",
        readTime: readTime || "5 min read",
        location: location || "Museum Main Auditorium",
        imageSrc: imageSrc || "/images/events_and_news/symposium-silk-road-preservation.png",
        imageAlt: imageAlt || title,
        summary,
        content: content || summary,
        status: status || "Published",
        seoKeywords: [category, title, "Central Asian Museum"],
      },
    });

    return NextResponse.json({
      success: true,
      newsEvent: newNews,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create news item" },
      { status: 500 }
    );
  }
}
