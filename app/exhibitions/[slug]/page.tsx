import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ShareButton } from "@/components/ui/ShareButton";
import { BlockContentRenderer } from "@/components/exhibitions/BlockContentRenderer";
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
    const decodedSlug = decodeURIComponent(slug).trim();

    // 1. Search by exact slug or ID or lowercase slug
    const dbExhibition = await prisma.exhibition.findFirst({
      where: {
        OR: [
          { slug: decodedSlug },
          { id: decodedSlug },
          { slug: decodedSlug.toLowerCase() },
        ],
      },
      include: {
        highlights: true,
      },
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
      title: "Exhibition Not Found | Central Asian Museum, Leh",
      description: "The requested exhibition could not be found at the Central Asian Museum, Leh.",
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://central-asian-museum.vercel.app";
  const shareUrl = `${appUrl}/exhibitions/${exhibition.slug}`;
  const excerpt = exhibition.subtitle || exhibition.description.slice(0, 160) + "...";

  return {
    title: `${exhibition.title} | Central Asian Museum, Leh`,
    description: excerpt,
    keywords: exhibition.seoKeywords || [
      "Central Asian Museum",
      "Leh Ladakh",
      "Himalayan Art",
      "Silk Route History",
      exhibition.title,
    ],
    openGraph: {
      title: `${exhibition.title} | Central Asian Museum, Leh`,
      description: excerpt,
      url: shareUrl,
      siteName: "Central Asian Museum, Leh",
      images: [
        {
          url: exhibition.imageSrc,
          width: 1200,
          height: 630,
          alt: exhibition.imageAlt || exhibition.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${exhibition.title} | Central Asian Museum, Leh`,
      description: excerpt,
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

  // Fetch adjacent exhibitions for continuous exploration
  let nextExhibition: { slug: string; title: string; imageSrc: string } | null = null;
  let prevExhibition: { slug: string; title: string; imageSrc: string } | null = null;
  let isFeatured = false;
  try {
    const all = await prisma.exhibition.findMany({
      orderBy: { createdAt: "desc" },
      select: { slug: true, title: true, imageSrc: true },
    });
    isFeatured = all.length > 0 && all[0].slug === exhibition.slug;
    const currentIndex = all.findIndex((e) => e.slug === exhibition.slug || e.slug === slug);
    if (currentIndex !== -1 && all.length > 1) {
      const nextIndex = (currentIndex + 1) % all.length;
      const prevIndex = (currentIndex - 1 + all.length) % all.length;
      nextExhibition = all[nextIndex];
      prevExhibition = all[prevIndex];
    }
  } catch (e) {
    console.warn("Failed to fetch adjacent exhibitions:", e);
  }

  // Schema.org JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: exhibition.title,
    description: exhibition.description,
    startDate: exhibition.dateRange,
    location: {
      "@type": "Place",
      name: "Central Asian Museum, Leh",
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

  const shareData = {
    title: exhibition.title,
    slug: exhibition.slug,
    id: exhibition.id,
    subtitle: exhibition.subtitle,
    excerpt: exhibition.description.slice(0, 140) + "...",
    image: exhibition.imageSrc,
    dates: exhibition.dateRange,
    where: exhibition.location,
    curator: exhibition.curator,
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header variant="solid" />

      <main className="flex-1">
        {/* 1. Exhibition Header & Decorated Hero Banner */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-12 sm:py-16 md:py-20">
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
              className="mb-8 flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-muted font-mono"
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
              <span className="text-heading font-semibold truncate max-w-xs sm:max-w-md">
                {exhibition.title}
              </span>
            </nav>

            <div className="max-w-4xl">
              {/* Badge & Category Row */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {isFeatured ? (
                  <div className="inline-flex items-center gap-2 rounded-xs border border-palette-wine/25 bg-palette-wine/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-palette-wine">
                    <span className="h-1.5 w-1.5 rounded-full bg-palette-wine animate-pulse" />
                    <span>Featured Exhibition</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-xs border border-palette-amber/30 bg-palette-amber/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-palette-amber">
                    <span>
                      {exhibition.status === "Upcoming"
                        ? "Upcoming Exhibition"
                        : exhibition.status === "Special"
                          ? "Special Exhibition"
                          : exhibition.status === "Permanent"
                            ? "Permanent Collection"
                            : "Past Exhibition"}
                    </span>
                  </div>
                )}

                {exhibition.category && (
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted border-l border-border-subtle pl-3">
                    {exhibition.category}
                  </span>
                )}
              </div>

              {/* Grand Title */}
              <h1 className="font-heading text-[38px] sm:text-[48px] md:text-[56px] lg:text-[62px] font-medium leading-[1.1] tracking-[-0.01em] text-heading">
                {exhibition.title}
              </h1>

              {/* Subtitle / Poetic Kicker */}
              {exhibition.subtitle && (
                <p className="mt-4 font-heading text-[20px] sm:text-[23px] font-normal leading-relaxed text-body italic">
                  {exhibition.subtitle}
                </p>
              )}

              {/* Action Bar: 1. Back Button, 2. Share Button, 3. Plan Your Visit */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <Button
                  href="/exhibitions"
                  variant="outline"
                  size="sm"
                  icon="arrow-left"
                  iconPosition="left"
                >
                  Back to Exhibitions
                </Button>

                <ShareButton
                  data={shareData}
                  variant="hero"
                  label="Share Exhibition"
                />

                <Button
                  href="/contact?intent=visits"
                  variant="primary"
                  size="sm"
                  icon="calendar"
                  iconPosition="left"
                >
                  Plan Your Visit
                </Button>
              </div>

              {/* Curatorial Metadata Specs Grid */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-border-subtle pt-8 text-[13.5px]">
                {exhibition.dateRange && (
                  <div className="flex items-start gap-3 rounded-xs border border-border-subtle bg-surface/60 p-3.5 shadow-2xs">
                    <div className="h-8 w-8 rounded-full bg-palette-amber/15 text-palette-amber flex items-center justify-center shrink-0">
                      <Icon name="calendar" size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-muted">
                        Exhibition Dates
                      </p>
                      <p className="font-medium text-heading mt-0.5">{exhibition.dateRange}</p>
                    </div>
                  </div>
                )}

                {exhibition.location && (
                  <div className="flex items-start gap-3 rounded-xs border border-border-subtle bg-surface/60 p-3.5 shadow-2xs">
                    <div className="h-8 w-8 rounded-full bg-palette-amber/15 text-palette-amber flex items-center justify-center shrink-0">
                      <Icon name="pin" size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-muted">
                        Gallery Location
                      </p>
                      <a
                        href="https://maps.app.goo.gl/CHsSHHyECqD3nZUe7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-heading mt-0.5 underline decoration-muted/40 underline-offset-2 hover:decoration-heading block"
                        title="Open on Google Maps"
                      >
                        {exhibition.location}
                      </a>
                    </div>
                  </div>
                )}

                {exhibition.curator && (
                  <div className="flex items-start gap-3 rounded-xs border border-border-subtle bg-surface/60 p-3.5 shadow-2xs sm:col-span-2 lg:col-span-1">
                    <div className="h-8 w-8 rounded-full bg-palette-amber/15 text-palette-amber flex items-center justify-center shrink-0">
                      <Icon name="users" size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-muted">
                        Lead Curator
                      </p>
                      <p className="font-medium text-heading mt-0.5">{exhibition.curator}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* 2. Exhibition Visual Presentation Frame */}
        <section className="py-12 sm:py-16">
          <Container className="max-w-5xl">
            {/* Museum Cover Artwork Frame */}
            <div className="group relative w-full overflow-hidden rounded-xs border border-border bg-bg-secondary shadow-md">
              <div className="relative aspect-16/10 sm:aspect-video w-full overflow-hidden">
                <Image
                  src={exhibition.imageSrc}
                  alt={exhibition.imageAlt || exhibition.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1100px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Floating Share Badge on Image Corner */}
              <div className="absolute top-4 right-4 z-10">
                <ShareButton
                  data={shareData}
                  variant="icon"
                  className="w-10 h-10 shadow-md bg-surface/90 backdrop-blur-xs"
                />
              </div>
            </div>

            {exhibition.imageAlt && (
              <p className="mt-3 text-center text-[12.5px] text-muted italic font-serif">
                &ldquo;{exhibition.imageAlt}&rdquo;
              </p>
            )}

            {/* 3. Curatorial Story & Exhibition Details (Two-Column Layout) */}
            <div className="mt-14 sm:mt-18 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Main Column (8 Cols): Overview, Essay, Highlights */}
              <div className="lg:col-span-8 space-y-12">
                {/* Section A: Description / Overview */}
                {exhibition.description && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-palette-amber" aria-hidden="true" />
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-palette-amber">
                        {exhibition.descriptionHeading || "Exhibition Overview"}
                      </p>
                    </div>

                    <h2 className="font-heading text-[28px] sm:text-[32px] font-medium text-heading leading-tight">
                      {exhibition.descriptionHeading || "About the Exhibition"}
                    </h2>

                    <div className="text-[16px] sm:text-[17.5px] leading-relaxed text-body whitespace-pre-line border-l-2 border-palette-amber/40 pl-5 py-1">
                      {exhibition.description}
                    </div>
                  </div>
                )}

                {/* Section B: Curatorial Essay & Historical Context */}
                {exhibition.curatorialEssay && (
                  <div className="space-y-6 pt-4 border-t border-border-subtle">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-palette-amber" aria-hidden="true" />
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-palette-amber">
                        Historical Context
                      </p>
                    </div>

                    <h2 className="font-heading text-[28px] sm:text-[32px] font-medium text-heading leading-tight">
                      {exhibition.curatorialEssayHeading || "Curatorial Narrative & Historical Context"}
                    </h2>

                    <div className="prose prose-stone max-w-none text-[15.5px] sm:text-[16.5px] leading-relaxed text-body">
                      <BlockContentRenderer essay={exhibition.curatorialEssay} />
                    </div>
                  </div>
                )}

                {/* Section C: Artifact Highlights (if curated) */}
                {exhibition.highlights && exhibition.highlights.length > 0 && (
                  <div className="space-y-8 pt-6 border-t border-border-subtle">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-palette-amber" aria-hidden="true" />
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-palette-amber">
                        Curated Highlights
                      </p>
                    </div>

                    <h2 className="font-heading text-[28px] sm:text-[32px] font-medium text-heading leading-tight">
                      Featured Collection Highlights
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {exhibition.highlights.map((artifact) => (
                        <div
                          key={artifact.id}
                          className="rounded-xs border border-border-subtle bg-surface p-4 shadow-xs flex flex-col"
                        >
                          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xs border border-border-subtle bg-bg-secondary mb-3.5">
                            <Image
                              src={artifact.imageSrc}
                              alt={artifact.imageAlt || artifact.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 400px"
                              className="object-cover"
                            />
                          </div>
                          {artifact.accessionNumber && (
                            <span className="text-[10.5px] font-mono uppercase tracking-widest text-palette-amber font-bold">
                              {artifact.accessionNumber}
                            </span>
                          )}
                          <h3 className="font-heading text-[18px] font-medium text-heading leading-snug mt-1">
                            {artifact.title}
                          </h3>
                          <div className="mt-2 text-[12px] text-muted space-y-0.5">
                            <p><strong>Origin:</strong> {artifact.provenance} ({artifact.date})</p>
                            {artifact.material && <p><strong>Material:</strong> {artifact.material}</p>}
                            {artifact.dimensions && <p><strong>Dimensions:</strong> {artifact.dimensions}</p>}
                          </div>
                          <p className="mt-3 text-[13.5px] leading-relaxed text-body pt-2 border-t border-border-subtle/80 flex-1">
                            {artifact.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Column (4 Cols): Museum Info, Visit Hours, Share Card */}
              <div className="lg:col-span-4 space-y-6">
                {/* 1. Quick Share Box */}
                <div className="rounded-xs border border-palette-amber/40 bg-palette-sand/20 p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 text-palette-amber mb-2">
                    <Icon name="share" size={18} />
                    <h3 className="font-heading text-[20px] font-semibold text-heading">
                      Share this Exhibition
                    </h3>
                  </div>
                  <p className="text-[13px] leading-relaxed text-body mb-4">
                    Send this exhibition directly to colleagues, students, or companions planning a visit to Leh.
                  </p>
                  <ShareButton
                    data={shareData}
                    variant="hero"
                    className="w-full text-center"
                    label="Share with Others"
                  />
                </div>

                {/* 2. Visitor Guidelines & Entry */}
                <div className="rounded-xs border border-border-subtle bg-bg-secondary p-6 shadow-xs">
                  <h3 className="font-heading text-[20px] font-semibold text-heading mb-4 pb-3 border-b border-border-subtle">
                    Visitor Information
                  </h3>

                  <div className="space-y-4 text-[13.5px]">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] font-bold text-palette-amber block mb-1">
                        Admission
                      </span>
                      <p className="text-body leading-relaxed">
                        Access to all temporary exhibitions is included with standard museum admission.
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] font-bold text-palette-amber block mb-1">
                        Museum Hours
                      </span>
                      <p className="text-body leading-relaxed">
                        Summer (May – Oct): 10:00 am – 6:00 pm<br />
                        Winter (Nov – Apr): 10:00 am – 5:00 pm
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] font-bold text-palette-amber block mb-1">
                        Location & Campus
                      </span>
                      <p className="text-body leading-relaxed">
                        Top-Floor Tower Gallery<br />
                        Central Asian Museum, Tsas Soma Garden, Leh, Ladakh 194101
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-subtle">
                    <Button
                      href="/contact?intent=visits"
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Inquire with Curators
                    </Button>
                  </div>
                </div>

                {/* 3. Research & Scholarly Inquiries */}
                <div className="rounded-xs border border-border-subtle bg-bg-secondary p-6 shadow-xs">
                  <div className="flex items-center gap-2.5 text-palette-amber mb-2">
                    <Icon name="landmark" size={18} />
                    <h3 className="font-heading text-[18px] font-semibold text-heading">
                      Research & Press Inquiries
                    </h3>
                  </div>
                  <p className="text-[13px] leading-relaxed text-body">
                    For high-resolution press imagery, scholarly access to archival items, or academic citation inquiries, contact{" "}
                    <a
                      href="mailto:centralasianmuseum26@gmail.com"
                      className="text-palette-wine underline font-medium hover:text-palette-amber transition-colors"
                    >
                      centralasianmuseum26@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Decorated "Share This Exhibition" Callout Banner */}
            <div className="mt-16 rounded-xs border border-border-subtle bg-surface-dark text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
              <div
                className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-palette-amber/15 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-2xl">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-palette-sand">
                  Spread Himalayan Heritage
                </p>
                <h3 className="font-heading text-[26px] sm:text-[32px] font-medium leading-snug mt-1 text-white">
                  Share &ldquo;{exhibition.title}&rdquo; with others
                </h3>
                <p className="mt-2 text-[14.5px] text-palette-sand/90 leading-relaxed font-sans">
                  Help preserve and illuminate the cultural tapestry of the Silk Route by sharing this exhibition with your community, students, and fellow travelers.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <ShareButton
                    data={shareData}
                    variant="outline"
                    className="border-white! text-white! hover:bg-white! hover:text-surface-dark!"
                    label="Open Sharing Options"
                  />
                  <Button
                    href="/exhibitions"
                    variant="secondary"
                    size="md"
                  >
                    View All Exhibitions
                  </Button>
                </div>
              </div>
            </div>

            {/* 5. Adjacent Exhibition Navigation */}
            <div className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-border-subtle pt-8">
              {prevExhibition ? (
                <Link
                  href={`/exhibitions/${prevExhibition.slug}`}
                  className="group flex flex-col items-start text-left transition-colors"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted flex items-center gap-1 group-hover:text-palette-amber">
                    ← Previous Exhibition
                  </span>
                  <span className="font-heading text-[18px] font-medium text-heading group-hover:text-palette-amber transition-colors mt-0.5">
                    {prevExhibition.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextExhibition && (
                <Link
                  href={`/exhibitions/${nextExhibition.slug}`}
                  className="group flex flex-col items-start sm:items-end text-left sm:text-right transition-colors"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted flex items-center gap-1 group-hover:text-palette-amber">
                    Next Exhibition →
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
