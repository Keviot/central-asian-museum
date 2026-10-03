import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { HeroInfoBar } from "@/components/home/HeroInfoBar";
import { AboutSection } from "@/components/home/AboutSection";
import { FloorsSlider } from "@/components/home/FloorsSlider";
import { CurrentExhibitionSection } from "@/components/home/CurrentExhibitionSection";
import { NewsSection } from "@/components/home/NewsSection";
import { SupportSection } from "@/components/home/SupportSection";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import type { CurrentExhibition } from "@/lib/exhibitionData";
import { parseEventDate, type NewsPost } from "@/lib/newsData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let exhibition: CurrentExhibition | undefined = undefined;
  let latestNewsPosts: NewsPost[] = [];

  // Fetch lastly added exhibition
  try {
    const dbExhibition = await prisma.exhibition.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (dbExhibition) {
      exhibition = {
        id: dbExhibition.id,
        eyebrow: "Featured Exhibition",
        status:
          dbExhibition.badgeLabel ||
          (dbExhibition.status === "Current"
            ? "Now on"
            : `${dbExhibition.status || "Special"} Exhibition`),
        title: dbExhibition.title,
        subtitle: dbExhibition.subtitle,
        image: dbExhibition.imageSrc,
        alt: dbExhibition.imageAlt || dbExhibition.title,
        level: 4,
        paragraphs: dbExhibition.description.split("\n\n").filter(Boolean),
        details: [
          {
            icon: "calendar",
            label: "Dates",
            value: dbExhibition.dateRange || "Ongoing",
          },
          {
            icon: "pin",
            label: "Where",
            value: dbExhibition.location || "Central Asian Museum",
          },
          {
            icon: "users",
            label: "Curated by",
            value: dbExhibition.curator || "The museum team",
          },
          {
            icon: "ticket",
            label: "Entry",
            value: "Included in the museum ticket",
          },
          {
            icon: "clock",
            label: "Hours",
            value: "Summer 10 am to 6 pm · Winter 10 am to 5 pm",
          },
        ],
        buttons: [
          {
            label: "Explore Exhibition",
            href: `/exhibitions/${dbExhibition.slug}`,
            style: "primary",
          },
          {
            label: "All Exhibitions",
            href: "/exhibitions",
            style: "secondary",
          },
        ],
      };
    }
  } catch (error) {
    console.error("Failed to fetch lastly added exhibition from DB:", error);
  }

  // Fetch lastly added news & events
  try {
    const dbNews = await prisma.newsEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    if (dbNews.length > 0) {
      // Sort in proper sequence: latest date first (e.g. 2026-10-13, 2026-09-11, 2026-07-09)
      const sortedDbNews = [...dbNews].sort((a, b) => {
        const timeA = parseEventDate(a.date) || new Date(a.createdAt).getTime();
        const timeB = parseEventDate(b.date) || new Date(b.createdAt).getTime();
        return timeB - timeA;
      });

      latestNewsPosts = sortedDbNews.map((item) => {
        const bodyParagraphs = item.content
          ? item.content.split("\n\n").map((p) => p.trim()).filter(Boolean)
          : [];
        return {
          id: item.slug || item.id,
          slug: item.slug,
          title: item.title,
          category: item.category,
          date: item.date,
          time: item.readTime,
          location: item.location || "Tsas Soma Garden, Leh",
          image: item.imageSrc,
          alt: item.imageAlt || item.title,
          excerpt:
            item.summary ||
            (bodyParagraphs[0]
              ? bodyParagraphs[0].slice(0, 160) + (bodyParagraphs[0].length > 160 ? "..." : "")
              : ""),
          body: bodyParagraphs,
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch lastly added news & events from DB:", error);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="transparent" />
      <main className="flex-1">
        <Hero />
        <HeroInfoBar />
        <AboutSection />
        <FloorsSlider />
        <CurrentExhibitionSection exhibition={exhibition} />
        <NewsSection initialPosts={latestNewsPosts} />
        <SupportSection />
      </main>
      <Footer />
    </div>
  );
}




