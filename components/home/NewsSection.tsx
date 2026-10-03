"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsModal } from "@/components/news/NewsModal";
import { newsData, parseEventDate, type NewsPost } from "@/lib/newsData";

interface NewsSectionProps {
  initialPosts?: NewsPost[];
}

export function NewsSection({ initialPosts }: NewsSectionProps = {}) {
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Show posts in proper sequence: latest date first, oldest last.
  // If fewer than 3, fill remaining slots with archival posts so the grid remains balanced.
  let displayPosts: NewsPost[] = [];
  if (initialPosts && initialPosts.length > 0) {
    displayPosts = [...initialPosts].sort(
      (a, b) => parseEventDate(b.date) - parseEventDate(a.date)
    );
    if (displayPosts.length < 3) {
      const existingIds = new Set(displayPosts.map((p) => p.id));
      for (const p of newsData.posts) {
        if (!existingIds.has(p.id) && displayPosts.length < 3) {
          displayPosts.push(p);
        }
      }
    }
  } else {
    displayPosts = [...newsData.posts]
      .sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date))
      .slice(0, 3);
  }

  const latestPosts = displayPosts.slice(0, 3);

  return (
    <>
      <section
        id="news"
        className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary pt-14 sm:pt-16 md:pt-18 lg:pt-20 pb-10 lg:pb-13"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-palette-amber/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-palette-sage/20 blur-3xl"
        />

        <Container className="relative z-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              title={newsData.heading}
              description={newsData.lead}
            />
            <div className="hidden shrink-0 pb-2 sm:block">
              <Button
                href="/news-events"
                variant="outline"
                size="md"
              >
                View All News &amp; Events
              </Button>
            </div>
          </div>

          <div
            ref={railRef}
            className="news-rail mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          >
            {latestPosts.map((post) => (
              <NewsCard
                key={post.id}
                post={post}
                onOpen={(p) => setSelectedPost(p)}
              />
            ))}
            <Link
              href="/news-events"
              className="news-more"
            >
              <span className="news-more__icon">
                <Icon name="arrow-right" size={22} />
              </span>
              <h3 className="news-more__title">View all news &amp; events</h3>
              <p className="news-more__note">Milestones, programmes and events</p>
            </Link>
          </div>
        </Container>
      </section>

      <NewsModal
        posts={latestPosts}
        activeId={selectedPost?.id || null}
        onClose={() => setSelectedPost(null)}
      />
    </>
  );
}
