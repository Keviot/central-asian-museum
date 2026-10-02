import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
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
    });

    if (dbExhibition) {
      return dbExhibition;
    }
  } catch (error) {
    console.error("Database fetch error in getExhibition:", error);
  }

  return null;
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
    title: `${exhibition.title} | Central Asian Museum, Leh`,
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
  };
}

export default async function ExhibitionDetailPage({ params }: Props) {
  const { slug } = await params;
  const exhibition = await getExhibition(slug);

  if (!exhibition) {
    notFound();
  }

  // Fetch the next exhibition in sequence so users can navigate between all 12
  let nextExhibition: { slug: string; title: string } | null = null;
  try {
    const all = await prisma.exhibition.findMany({
      orderBy: { createdAt: "desc" },
      select: { slug: true, title: true },
    });
    const currentIndex = all.findIndex((e) => e.slug === exhibition.slug);
    if (currentIndex !== -1 && all.length > 1) {
      const nextIndex = (currentIndex + 1) % all.length;
      nextExhibition = all[nextIndex];
    }
  } catch (e) {
    // ignore
  }

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: exhibition.title,
    description: exhibition.description,
    location: {
      "@type": "Place",
      name: "Central Asian Museum",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tsas Soma Garden, Main Market Road",
        addressLocality: "Leh",
        addressRegion: "Ladakh",
        postalCode: "194101",
        addressCountry: "IN",
      },
    },
    image: [exhibition.imageSrc],
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header variant="solid" />

      <main className="flex-1">
        {/* Exhibition Header Hero */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-14 sm:py-20">
          <div
            className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-palette-amber/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            {/* Breadcrumb Navigation */}
            <nav
              className="mb-6 flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-heading transition-colors">
                Home
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-sage" />
              <Link href="/exhibitions" className="hover:text-heading transition-colors">
                Exhibitions
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-sage" />
              <span className="text-heading font-medium truncate max-w-xs sm:max-w-md">
                {exhibition.title}
              </span>
            </nav>

            <div className="max-w-3xl">
              {/* Badge if present */}
              {exhibition.badgeLabel && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-xs border border-palette-wine/25 bg-palette-wine/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-palette-wine">
                  <span className="h-1.5 w-1.5 rounded-full bg-palette-wine animate-pulse" />
                  <span>{exhibition.badgeLabel}</span>
                </div>
              )}

              {/* Title */}
              <h1 className="font-heading text-[36px] font-medium leading-[1.15] text-heading sm:text-[46px] md:text-[54px]">
                {exhibition.title}
              </h1>

              {/* Subtitle */}
              {exhibition.subtitle && (
                <p className="mt-4 font-heading text-[18px] sm:text-[21px] font-normal leading-relaxed text-body italic">
                  {exhibition.subtitle}
                </p>
              )}

              {/* Key Metadata Pill Bar */}
              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-border-subtle pt-6 text-[13.5px] text-body">
                {exhibition.dateRange && (
                  <div className="flex items-center gap-2">
                    <Icon name="calendar" size={15} className="text-palette-sage shrink-0" />
                    <span className="font-medium text-heading">{exhibition.dateRange}</span>
                  </div>
                )}
                {exhibition.location && (
                  <a
                    href="https://maps.app.goo.gl/CHsSHHyECqD3nZUe7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-heading transition-colors"
                    title="View on Google Maps"
                  >
                    <Icon name="pin" size={15} className="text-palette-sage shrink-0" />
                    <span className="underline decoration-muted/40 underline-offset-2 hover:decoration-heading">
                      {exhibition.location}
                    </span>
                  </a>
                )}
                {exhibition.curator && (
                  <div className="flex items-center gap-2">
                    <Icon name="users" size={15} className="text-palette-sage shrink-0" />
                    <span>
                      Curated by <strong className="text-heading">{exhibition.curator}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Exhibition Content & Visual Frame */}
        <section className="py-14 sm:py-20">
          <Container className="max-w-4xl">
            {/* Museum Cover Image */}
            <figure className="relative aspect-16/10 w-full overflow-hidden rounded-xs border border-border bg-bg-secondary shadow-sm">
              <Image
                src={exhibition.imageSrc}
                alt={exhibition.imageAlt || exhibition.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover object-center"
              />
            </figure>
            {exhibition.imageAlt && (
              <p className="mt-3 text-[12.5px] text-muted italic">
                {exhibition.imageAlt}
              </p>
            )}

            {/* Description / Story Section */}
            <div className="mt-12 space-y-10">
              {exhibition.description && (
                <div className="space-y-4">
                  <h2 className="font-heading text-[24px] sm:text-[28px] font-medium text-heading border-b border-border-subtle pb-3">
                    {exhibition.descriptionHeading || "About the Exhibition"}
                  </h2>
                  <div className="text-[16px] sm:text-[17px] leading-relaxed text-body whitespace-pre-line">
                    {exhibition.description}
                  </div>
                </div>
              )}

              {/* Historical Context / Curatorial Narrative */}
              {exhibition.curatorialEssay && (
                <div className="space-y-4 pt-4">
                  <h2 className="font-heading text-[24px] sm:text-[28px] font-medium text-heading border-b border-border-subtle pb-3">
                    {exhibition.curatorialEssayHeading || "Historical Context"}
                  </h2>
                  <div className="text-[16px] sm:text-[17px] leading-relaxed text-body whitespace-pre-line">
                    {exhibition.curatorialEssay}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions & Navigation */}
            <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-border-subtle pt-8">
              <Button
                href="/exhibitions"
                variant="outline"
                size="md"
                icon="arrow-left"
                iconPosition="left"
                className="self-start"
              >
                All Exhibitions
              </Button>

              {nextExhibition && (
                <Link
                  href={`/exhibitions/${nextExhibition.slug}`}
                  className="group flex flex-col items-start sm:items-end text-left sm:text-right transition-colors"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted">
                    Other Exhibition →
                  </span>
                  <span className="font-heading text-[18px] font-medium text-heading group-hover:text-palette-amber transition-colors mt-0.5">
                    {nextExhibition.title}
                  </span>
                </Link>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
