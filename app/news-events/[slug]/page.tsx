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
import { newsData, type NewsPost } from "@/lib/newsData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

interface NewsDetailData {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  paragraphs: string[];
  seoKeywords: string[];
}

interface NewsCardItem {
  slug: string;
  title: string;
  date: string;
  image: string;
  category?: string;
}

async function getNewsEventData(slug: string) {
  let post: NewsDetailData | null = null;
  let allItems: NewsCardItem[] = [];

  try {
    const dbItem = await prisma.newsEvent.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
    });

    if (dbItem) {
      post = {
        id: dbItem.id,
        slug: dbItem.slug,
        title: dbItem.title,
        category: dbItem.category || "Museum Archive",
        date: dbItem.date,
        readTime: dbItem.readTime || "2 min read",
        imageSrc: dbItem.imageSrc,
        imageAlt: dbItem.imageAlt || dbItem.title,
        summary: dbItem.summary || "",
        paragraphs: dbItem.content
          ? dbItem.content.split("\n\n").map((p) => p.trim()).filter(Boolean)
          : [],
        seoKeywords: dbItem.seoKeywords || [],
      };
    }

    const dbAll = await prisma.newsEvent.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        slug: true,
        title: true,
        date: true,
        imageSrc: true,
        category: true,
      },
    });

    if (dbAll.length > 0) {
      allItems = dbAll.map((item) => ({
        slug: item.slug,
        title: item.title,
        date: item.date,
        image: item.imageSrc,
        category: item.category,
      }));
    }
  } catch (error) {
    console.error("Database fetch error in getNewsEventData:", error);
  }

  // Fallback to static news data if DB didn't find the item
  if (!post) {
    const fallback = newsData.posts.find((p) => (p.slug || p.id) === slug);
    if (fallback) {
      post = {
        id: fallback.id,
        slug: fallback.slug || fallback.id,
        title: fallback.title,
        category: fallback.category || "Museum News",
        date: fallback.date,
        readTime: fallback.readTime || "2 min read",
        imageSrc: fallback.image,
        imageAlt: fallback.alt || fallback.title,
        summary: fallback.excerpt || "",
        paragraphs: fallback.body,
        seoKeywords: ["Central Asian Museum", "Leh", "News & Events"],
      };
    }
  }

  if (allItems.length === 0) {
    allItems = newsData.posts.map((p) => ({
      slug: p.slug || p.id,
      title: p.title,
      date: p.date,
      image: p.image,
      category: p.category || "Museum Archive",
    }));
  }

  return { post, allItems };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getNewsEventData(slug);

  if (!post) {
    return {
      title: "News & Event Not Found | Central Asian Museum",
    };
  }

  const excerpt = post.summary || post.paragraphs[0] || post.title;

  return {
    title: `${post.title} | Central Asian Museum, Leh`,
    description: excerpt,
    keywords: post.seoKeywords,
    openGraph: {
      title: post.title,
      description: excerpt,
      images: [
        {
          url: post.imageSrc,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      type: "article",
    },
  };
}

export default async function NewsEventDetailPage({ params }: Props) {
  const { slug } = await params;
  const { post, allItems } = await getNewsEventData(slug);

  if (!post) {
    notFound();
  }

  // Find index for previous / next navigation and sidebar items
  const currentIndex = allItems.findIndex((i) => i.slug === post.slug);
  const total = allItems.length;

  const prevArticle = total > 1 && currentIndex !== -1
    ? allItems[(currentIndex - 1 + total) % total]
    : null;

  const nextArticle = total > 1 && currentIndex !== -1
    ? allItems[(currentIndex + 1) % total]
    : null;

  // Other stories for sidebar (excluding current article)
  const sidebarStories = allItems.filter((i) => i.slug !== post.slug).slice(0, 3);

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.summary || post.paragraphs[0] || post.title,
    datePublished: post.date,
    image: [post.imageSrc],
    publisher: {
      "@type": "Organization",
      name: "Central Asian Museum",
      url: "https://centralasianmuseumleh.org",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header variant="solid" />

      <main className="flex-1">
        {/* Editorial Journal Header Strip */}
        <section className="border-b border-border-subtle bg-bg pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Container className="max-w-6xl">
            {/* Top Gazette Bar: Breadcrumb + Kicker */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-border-subtle/50 text-[12px] font-mono uppercase tracking-[0.16em] text-muted">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2">
                <Link href="/" className="hover:text-heading transition-colors">
                  Home
                </Link>
                <span className="text-palette-amber">/</span>
                <Link href="/news-events" className="hover:text-heading transition-colors">
                  News &amp; Events
                </Link>
                <span className="text-palette-amber">/</span>
                <span className="text-palette-wine font-semibold truncate max-w-50 sm:max-w-xs">
                  Dispatch
                </span>
              </nav>

              <div className="flex items-center gap-2 text-palette-amber font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-palette-amber" />
                <span>Museum Chronicle · Tsas Soma Garden</span>
              </div>
            </div>

            {/* Headline and Metadata Row */}
            <div className="mt-8 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-xs border border-palette-amber/40 bg-palette-amber/10 text-palette-amber font-mono text-[11px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                )}
                <span className="text-[12px] text-muted font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <Icon name="calendar" size={13} className="text-palette-sage" />
                  {post.date}
                </span>
                {post.readTime && (
                  <>
                    <span className="text-border-subtle" aria-hidden="true">•</span>
                    <span className="text-[12px] text-muted font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <Icon name="clock" size={13} className="text-palette-sage" />
                      {post.readTime}
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-heading text-[34px] sm:text-[46px] md:text-[54px] font-medium leading-[1.12] text-heading tracking-[-0.01em]">
                {post.title}
              </h1>

              {/* Archival Decorative Dual-Rule */}
              <div className="mt-6 flex items-center gap-2" aria-hidden="true">
                <span className="h-0.5 w-16 bg-palette-amber" />
                <span className="h-px flex-1 bg-border-subtle" />
              </div>
            </div>
          </Container>
        </section>

        {/* 2-Column Editorial Story & Sidebar Layout */}
        <section className="py-12 sm:py-16 md:py-20 bg-bg">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
              {/* Left / Main Column (Story & Visuals) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Feature Image inside Museum Matting Frame */}
                <div className="rounded-xs border border-palette-sand/70 bg-bg-secondary p-2.5 sm:p-3.5 shadow-2xs">
                  <figure className="relative aspect-16/10 w-full overflow-hidden rounded-2xs bg-bg">
                    <Image
                      src={post.imageSrc}
                      alt={post.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 768px"
                      className="object-cover object-center"
                    />
                  </figure>
                  {post.imageAlt && (
                    <figcaption className="mt-3 px-1 text-[12.5px] leading-relaxed text-muted italic flex items-start gap-2">
                      <Icon name="image" size={14} className="text-palette-sage shrink-0 mt-0.5" />
                      <span>{post.imageAlt}</span>
                    </figcaption>
                  )}
                </div>

                {/* Article Prose with Editorial Drop-Cap */}
                <article className="space-y-6 text-[17px] leading-[1.85] text-body pt-2">
                  {post.paragraphs.map((para, idx) => {
                    if (idx === 0) {
                      return (
                        <p
                          key={idx}
                          className="first-letter:float-left first-letter:text-[48px] first-letter:font-heading first-letter:font-semibold first-letter:leading-none first-letter:mr-3.5 first-letter:text-palette-wine first-letter:mt-1 font-normal text-[18px] sm:text-[19px] leading-relaxed text-heading"
                        >
                          {para}
                        </p>
                      );
                    }
                    return (
                      <p key={idx} className="font-normal text-[16.5px] sm:text-[17.5px] leading-[1.85]">
                        {para}
                      </p>
                    );
                  })}
                </article>

                {/* Mid-article Quote / Takeaway if summary is available */}
                {post.summary && post.summary !== post.paragraphs[0] && (
                  <blockquote className="rounded-xs border-l-4 border-palette-wine bg-bg-secondary/60 p-5 sm:p-6 my-8">
                    <p className="font-heading text-[19px] sm:text-[21px] italic font-normal leading-relaxed text-heading">
                      &ldquo;{post.summary}&rdquo;
                    </p>
                    <cite className="block mt-2 font-mono text-[11px] uppercase tracking-wider text-palette-amber not-italic">
                      — Central Asian Museum Records
                    </cite>
                  </blockquote>
                )}

                {/* Article Endmark */}
                <div className="pt-8 border-t border-border-subtle/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[12px] font-mono text-muted uppercase tracking-wider">
                    <span className="h-2 w-2 rounded-full bg-palette-sage" />
                    <span>End of Chronicle</span>
                  </div>

                  <Link
                    href="/news-events"
                    className="inline-flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-wider text-palette-wine hover:text-palette-amber transition-colors font-semibold"
                  >
                    <span>View all 7 dispatches</span>
                    <Icon name="arrow-right" size={14} />
                  </Link>
                </div>
              </div>

              {/* Right Column (Sidebar with Context, Quick Links & Recent Stories) */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Card 1: Chronicle Overview */}
                  <div className="rounded-xs border border-palette-sand/70 bg-bg-secondary/40 p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-border-subtle">
                      <Icon name="book-open" size={16} className="text-palette-amber" />
                      <h2 className="font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-palette-amber">
                        Chronicle Overview
                      </h2>
                    </div>

                    <dl className="space-y-3.5 text-[13px]">
                      <div>
                        <dt className="text-muted text-[11px] font-mono uppercase tracking-wider">Date Recorded</dt>
                        <dd className="font-medium text-heading mt-0.5">{post.date}</dd>
                      </div>
                      <div>
                        <dt className="text-muted text-[11px] font-mono uppercase tracking-wider">Classification</dt>
                        <dd className="font-medium text-heading mt-0.5">{post.category}</dd>
                      </div>
                      <div>
                        <dt className="text-muted text-[11px] font-mono uppercase tracking-wider">Location / Venue</dt>
                        <dd className="font-medium text-heading mt-0.5">
                          <a
                            href="https://maps.app.goo.gl/CHsSHHyECqD3nZUe7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline transition-colors"
                            title="View on Google Maps"
                          >
                            Tsas Soma Garden, Leh, Ladakh
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted text-[11px] font-mono uppercase tracking-wider">Reading Duration</dt>
                        <dd className="font-medium text-heading mt-0.5">{post.readTime}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Card 2: More from the Museum Archive (Sidebar mini-list) */}
                  {sidebarStories.length > 0 && (
                    <div className="rounded-xs border border-palette-sand/70 bg-bg p-5 sm:p-6 space-y-4 shadow-2xs">
                      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                        <h2 className="font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-heading">
                          Other Dispatches
                        </h2>
                        <span className="text-[11px] font-mono text-muted">
                          {allItems.length} Total
                        </span>
                      </div>

                      <div className="space-y-4 divide-y divide-border-subtle/40">
                        {sidebarStories.map((story) => (
                          <Link
                            key={story.slug}
                            href={`/news-events/${story.slug}`}
                            className="group block pt-3 first:pt-0"
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-2xs border border-palette-sand/60 bg-bg-secondary">
                                <Image
                                  src={story.image}
                                  alt={story.title}
                                  fill
                                  sizes="64px"
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="block text-[11px] font-mono text-muted">
                                  {story.date}
                                </span>
                                <h3 className="font-heading text-[15px] font-medium leading-tight text-heading group-hover:text-palette-amber transition-colors line-clamp-2 mt-0.5">
                                  {story.title}
                                </h3>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Card 3: Visit the Complex CTA */}
                  <div className="rounded-xs border border-palette-sand/70 bg-palette-sand/20 p-5 space-y-3">
                    <h3 className="font-heading text-[18px] font-medium text-heading">
                      Visit the Museum Complex
                    </h3>
                    <p className="text-[12.5px] leading-relaxed text-body">
                      Explore the tower, caravan garden, kitchen museum, and research library in the heart of Leh.
                    </p>
                    <Button
                      href="/contact"
                      variant="primary"
                      size="sm"
                      icon="arrow-right"
                      className="w-full justify-center"
                    >
                      Plan Your Visit
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        {/* Bottom Editorial Navigation (Two-Card Previous & Next Stories Grid) */}
        <section className="border-t border-border-subtle bg-bg-secondary py-14 sm:py-18">
          <Container className="max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-palette-amber font-bold">
                  Chronicle Archive
                </span>
                <h2 className="font-heading text-[26px] sm:text-[30px] font-medium text-heading mt-0.5">
                  Continue Reading
                </h2>
              </div>

              <Button
                href="/news-events"
                variant="outline"
                size="md"
                icon="arrow-right"
                className="self-start"
              >
                All News &amp; Events
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Previous Story Card */}
              {prevArticle && (
                <Link
                  href={`/news-events/${prevArticle.slug}`}
                  className="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-xs border border-palette-sand/70 bg-bg hover:border-palette-amber transition-all shadow-2xs hover:shadow-xs"
                >
                  <div className="relative aspect-16/10 sm:w-36 sm:aspect-square shrink-0 overflow-hidden rounded-2xs bg-bg-secondary border border-palette-sand/40">
                    <Image
                      src={prevArticle.image}
                      alt={prevArticle.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 150px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted flex items-center gap-1">
                        <Icon name="arrow-left" size={12} className="text-palette-sage transition-transform group-hover:-translate-x-0.5" />
                        Previous Story
                      </span>
                      <h3 className="font-heading text-[18px] sm:text-[19px] font-medium leading-tight text-heading group-hover:text-palette-amber transition-colors mt-1.5">
                        {prevArticle.title}
                      </h3>
                    </div>
                    <span className="mt-3 text-[12px] font-mono text-muted">
                      {prevArticle.date}
                    </span>
                  </div>
                </Link>
              )}

              {/* Next Story Card */}
              {nextArticle && (
                <Link
                  href={`/news-events/${nextArticle.slug}`}
                  className="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-xs border border-palette-sand/70 bg-bg hover:border-palette-amber transition-all shadow-2xs hover:shadow-xs"
                >
                  <div className="relative aspect-16/10 sm:w-36 sm:aspect-square shrink-0 overflow-hidden rounded-2xs bg-bg-secondary border border-palette-sand/40 order-1 sm:order-2">
                    <Image
                      src={nextArticle.image}
                      alt={nextArticle.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 150px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 order-2 sm:order-1 sm:text-right">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted flex items-center sm:justify-end gap-1">
                        Next Story
                        <Icon name="arrow-right" size={12} className="text-palette-sage transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <h3 className="font-heading text-[18px] sm:text-[19px] font-medium leading-tight text-heading group-hover:text-palette-amber transition-colors mt-1.5">
                        {nextArticle.title}
                      </h3>
                    </div>
                    <span className="mt-3 text-[12px] font-mono text-muted">
                      {nextArticle.date}
                    </span>
                  </div>
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
