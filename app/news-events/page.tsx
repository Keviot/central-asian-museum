import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { NewsExplorer } from "@/components/news/NewsExplorer";

import { prisma } from "@/lib/prisma";
import { newsData, parseEventDate, type NewsPost } from "@/lib/newsData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "News & Events | Central Asian Museum",
  description:
    "News, milestones and events at the Central Asian Museum, Tsas Soma Garden, Leh.",
};

export default async function NewsEventsPage() {
  let posts: NewsPost[] = [...newsData.posts].sort(
    (a, b) => parseEventDate(b.date) - parseEventDate(a.date)
  );

  try {
    const dbItems = await prisma.newsEvent.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (dbItems.length > 0) {
      const sortedDbItems = [...dbItems].sort((a, b) => {
        const timeA = parseEventDate(a.date) || new Date(a.createdAt).getTime();
        const timeB = parseEventDate(b.date) || new Date(b.createdAt).getTime();
        return timeB - timeA;
      });

      posts = sortedDbItems.map((item) => {
        const bodyParagraphs = item.content
          ? item.content.split("\n\n").map((p) => p.trim()).filter(Boolean)
          : [];
        return {
          id: item.slug || item.id,
          slug: item.slug,
          title: item.title,
          category: item.category,
          date: item.date,
          image: item.imageSrc,
          alt: item.imageAlt || item.title,
          excerpt:
            item.summary ||
            (bodyParagraphs[0] ? bodyParagraphs[0].slice(0, 160) + (bodyParagraphs[0].length > 160 ? "..." : "") : ""),
          body: bodyParagraphs,
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch news events from database:", error);
  }
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header variant="solid" />

      <main className="flex-1">
        {/* News & Events Hero Banner */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-16 md:py-24">
          <div
            className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-palette-amber/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            {/* Breadcrumb */}
            <nav
              className="mb-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-heading transition-colors">
                Home
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-sage" />
              <span className="text-heading font-medium">News & Events</span>
            </nav>

            <div className="max-w-200">
              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                Museum News & Events
              </h1>

              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                Milestones in the museum&apos;s story, and the programmes and events that bring the Tsas Soma Garden to life.
              </p>
            </div>
          </Container>
        </section>

        {/* Dynamic Grid & Search Section */}
        <section id="list" className="py-16 md:py-24">
          <Container>
            <NewsExplorer initialPosts={posts} />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
