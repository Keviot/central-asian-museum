import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsEventsData } from "@/lib/newsEvents";
import { parseEventDate } from "@/lib/newsData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const dbNews = await prisma.newsEvent.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (dbNews.length === 0) {
      return NextResponse.json({ newsEvents: newsEventsData });
    }

    const sortedDbNews = [...dbNews].sort((a, b) => {
      const timeA = parseEventDate(a.date) || new Date(a.createdAt).getTime();
      const timeB = parseEventDate(b.date) || new Date(b.createdAt).getTime();
      return timeB - timeA;
    });

    const newsEvents = sortedDbNews.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      date: item.date,
      time: item.readTime || "Press Announcement",
      location: item.location,
      imageSrc: item.imageSrc,
      imageAlt: item.imageAlt || item.title,
      summary: item.summary,
      fullContent: item.content,
      rsvpRequired: false,
      featuredOnHome: true,
    }));

    return NextResponse.json({ newsEvents });
  } catch (error: any) {
    console.error("Public news events fetch error:", error);
    return NextResponse.json({ newsEvents: newsEventsData });
  }
}
