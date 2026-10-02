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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let exhibition: CurrentExhibition | undefined = undefined;

  try {
    const dbExhibition = await prisma.exhibition.findFirst({
      where: {
        OR: [
          { status: "Current" },
          { featuredOnHome: true },
        ],
      },
      orderBy: { updatedAt: "desc" },
    });

    if (dbExhibition) {
      exhibition = {
        id: dbExhibition.id,
        eyebrow: "Current Exhibition",
        status: dbExhibition.badgeLabel || "Now on",
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
            value: dbExhibition.dateRange,
          },
          {
            icon: "pin",
            label: "Where",
            value: dbExhibition.location,
          },
          {
            icon: "users",
            label: "Curated by",
            value: dbExhibition.curator,
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
            label: "Previous Exhibitions",
            href: "/exhibitions",
            style: "primary",
          },
        ],
      };
    }
  } catch (error) {
    console.error("Failed to fetch current exhibition from DB:", error);
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
        <NewsSection />
        <SupportSection />
      </main>
      <Footer />
    </div>
  );
}




