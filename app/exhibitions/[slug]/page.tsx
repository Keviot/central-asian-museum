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
import { exhibitionsData, formatDateRange } from "@/lib/exhibitions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

      <Header variant="solid" />

      <main className="flex-1">
        {/* Luxurious Light-Theme Museum Hero Section */}
        <section className="relative overflow-hidden border-b border-palette-sand/70 bg-linear-to-b from-[#FBF9F5] via-[#F6F2EA] to-bg pt-28 pb-16 md:pt-36 md:pb-20">
          {/* Subtle Ambient Background Glows */}
          <div
            className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-palette-amber/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-palette-sage/20 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            {/* Breadcrumbs */}
            <nav
              className="mb-8 flex flex-wrap items-center gap-2 text-[12px] font-mono uppercase tracking-[0.16em] text-muted"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-palette-wine transition-colors">
                Home
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-amber" />
              <Link href="/exhibitions" className="hover:text-palette-wine transition-colors">
                Exhibitions
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-amber" />
              <span className="text-palette-wine font-bold truncate max-w-xs sm:max-w-md">
                {exhibition.title}
              </span>
            </nav>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              {/* Left Column: Details & Actions */}
              <div className="lg:col-span-7 space-y-6">
                {/* Category & Status Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-xs bg-palette-wine/10 border border-palette-wine/25 px-3 py-1 text-[10.5px] font-mono font-bold uppercase tracking-[0.18em] text-palette-wine">
                    <span className="h-1.5 w-1.5 rounded-full bg-palette-wine animate-pulse" />
                    <span>{exhibition.badgeLabel}</span>
                  </span>
                  <span className="text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-palette-amber">
                    {exhibition.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h1 className="font-heading text-[36px] font-semibold leading-[1.1] text-heading sm:text-[46px] md:text-[52px] lg:text-[58px]">
                    {exhibition.title}
                  </h1>

                  <p className="mt-4 font-heading text-[18px] sm:text-[21px] font-normal leading-snug text-body/90 italic">
                    {exhibition.subtitle}
                  </p>
                </div>

                {/* Key Metadata Bar */}
                <div className="flex flex-wrap items-center gap-6 border-y border-palette-sand/70 py-4 text-[13.5px] text-body">
                  <div className="flex items-center gap-2">
                    <Icon name="calendar" size={16} className="text-palette-amber shrink-0" />
                    <span className="font-medium">{formatDateRange(exhibition.dateRange)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="map-pin" size={16} className="text-palette-amber shrink-0" />
                    <span>{exhibition.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="sparkles" size={16} className="text-palette-amber shrink-0" />
                    <span>Curator: <strong className="text-heading">{exhibition.curator}</strong></span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    href="/contact?intent=visits"
                    variant="primary"
                    size="lg"
                    icon="arrow-right"
                    className="bg-palette-wine hover:bg-palette-wine/90"
                  >
                    Book Guided Group Visit
                  </Button>
                  <Button
                    href="/contact?intent=patron"
                    variant="outline"
                    size="lg"
                  >
                    Support Exhibition
                  </Button>
                </div>
              </div>

              {/* Right Column: Hero Cover Image Framing */}
              <div className="lg:col-span-5">
                <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 w-full overflow-hidden rounded-xs border-2 border-palette-sand/80 bg-bg-secondary shadow-md group">
                  <Image
                    src={exhibition.imageSrc}
                    alt={exhibition.imageAlt || exhibition.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                    <span className="bg-black/60 px-2.5 py-1 rounded-xs backdrop-blur-xs">
                      {exhibition.location}
                    </span>
                    <span className="bg-palette-amber text-surface-dark px-2.5 py-1 rounded-xs font-bold uppercase tracking-wider">
                      {exhibition.status}
                    </span>
                  </div>
                </div>
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
