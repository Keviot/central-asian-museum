import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExhibitionCard } from "@/components/exhibitions/ExhibitionCard";
import { ExhibitionDetailViewer } from "@/components/exhibitions/ExhibitionDetailViewer";
import { exhibitionsData } from "@/lib/exhibitions";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getExhibition(slug: string) {
  try {
    const dbExhibition = await prisma.exhibition.findUnique({
      where: { slug },
      include: {
        highlights: true,
      },
    });

    if (dbExhibition) {
      return dbExhibition as any;
    }
  } catch (error) {
    console.error("Database fetch error in getExhibition:", error);
  }

  return exhibitionsData.find((item) => item.slug === slug) || null;
}

export async function generateStaticParams() {
  try {
    const dbExhibitions = await prisma.exhibition.findMany({ select: { slug: true } });
    if (dbExhibitions.length > 0) {
      return dbExhibitions.map((item) => ({ slug: item.slug }));
    }
  } catch (e) {
    // Fallback
  }

  return exhibitionsData.map((exhibition) => ({
    slug: exhibition.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = await getExhibition(slug);

  if (!exhibition) {
    return {
      title: "Exhibition Not Found | Central Asian Museum",
    };
  }

  return {
    title: `${exhibition.title} | Central Asian Museum`,
    description: exhibition.description,
    keywords: exhibition.seoKeywords || [],
    openGraph: {
      title: exhibition.title,
      description: exhibition.description,
      images: [
        {
          url: exhibition.imageSrc,
          width: 1200,
          height: 630,
          alt: exhibition.imageAlt,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: exhibition.title,
      description: exhibition.description,
      images: [exhibition.imageSrc],
    },
  };
}

export default async function ExhibitionDetailPage({ params }: Props) {
  const { slug } = await params;
  const exhibition = await getExhibition(slug);

  if (!exhibition) {
    notFound();
  }

  // Fetch recommended exhibitions
  let otherExhibitions: any[] = [];
  try {
    const allDb = await prisma.exhibition.findMany({
      where: { NOT: { slug: exhibition.slug } },
      take: 2,
    });
    if (allDb.length > 0) {
      otherExhibitions = allDb;
    }
  } catch (e) {
    otherExhibitions = exhibitionsData
      .filter((item) => item.slug !== exhibition.slug)
      .slice(0, 2);
  }

  // Schema.org JSON-LD Structured Data for Exhibition Event
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: exhibition.title,
    description: exhibition.description,
    startDate: "2025-10-15",
    endDate: "2026-04-30",
    location: {
      "@type": "Place",
      name: "Central Asian Museum",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sheynam, Main Market Road",
        addressLocality: "Leh",
        addressRegion: "Ladakh",
        postalCode: "194101",
        addressCountry: "IN",
      },
    },
    image: [exhibition.imageSrc],
    performer: {
      "@type": "Organization",
      name: "Central Asian Museum Curatorial Office",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-body">
      {/* Inject JSON-LD for Google Search Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header variant="transparent" />

      <main className="flex-1">
        {/* 4K Hero Section with Dark Gradient Overlay */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-surface-dark text-white">
          <Image
            src={exhibition.imageSrc}
            alt={exhibition.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/70 to-transparent"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            {/* Breadcrumbs */}
            <nav
              className="mb-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-palette-sand/80"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-amber" />
              <Link href="/exhibitions" className="hover:text-white transition-colors">
                Exhibitions
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-amber" />
              <span className="text-palette-amber font-medium truncate max-w-xs sm:max-w-md">
                {exhibition.title}
              </span>
            </nav>

            <div className="max-w-3xl">
              {/* Category & Status Badge */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-xs bg-palette-amber/20 border border-palette-amber/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-palette-amber backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-palette-amber animate-pulse" />
                  <span>{exhibition.badgeLabel}</span>
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-palette-sand/70">
                  {exhibition.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-heading text-[36px] font-medium leading-[1.1] tracking-[-0.01em] text-white sm:text-[48px] md:text-[56px] lg:text-[64px]">
                {exhibition.title}
              </h1>

              <p className="mt-4 font-heading text-[18px] sm:text-[22px] font-normal leading-snug text-palette-sand/90 italic">
                {exhibition.subtitle}
              </p>

              {/* Key Metadata Bar */}
              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/20 pt-6 text-[13.5px] text-palette-sand/90">
                <div className="flex items-center gap-2">
                  <Icon name="calendar" size={16} className="text-palette-amber" />
                  <span>{exhibition.dateRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="map-pin" size={16} className="text-palette-amber" />
                  <span>{exhibition.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="sparkles" size={16} className="text-palette-amber" />
                  <span>Curator: {exhibition.curator}</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  href="/contact?intent=visits"
                  variant="primary"
                  size="lg"
                  icon="arrow-right"
                >
                  Book Guided Group Visit
                </Button>
                <Button
                  href="/contact?intent=patron"
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  Support Exhibition Philanthropy
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Interactive Curatorial Viewer Components */}
        <ExhibitionDetailViewer exhibition={exhibition} />

        {/* Recommended Other Exhibitions */}
        <section className="py-20 sm:py-24 bg-bg">
          <Container>
            <SectionHeading
              kicker="Explore Further"
              title="More Exhibitions at the Museum"
              description="Discover complementary galleries exploring Silk Road textiles, celestial manuscripts, and Timurid architecture."
            />

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
              {otherExhibitions.map((item) => (
                <ExhibitionCard key={item.id} exhibition={item} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button href="/exhibitions" variant="outline" icon="arrow-right" size="lg">
                View All 6 Exhibitions
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
