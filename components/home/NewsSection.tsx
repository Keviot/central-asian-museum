"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsModal } from "@/components/news/NewsModal";
import { newsData, type NewsPost } from "@/lib/newsData";

export function NewsSection() {
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const latestPosts = newsData.posts.slice(0, 3);

  return (
    <>
      <section
        id="news"
        className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-20 sm:py-24 md:py-28 lg:py-32"
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
              kicker={newsData.eyebrow}
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

          <div className="news-rail mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {latestPosts.map((post) => (
              <NewsCard
                key={post.id}
                post={post}
                onOpen={(p) => setSelectedPost(p)}
              />
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Button
              href="/news-events"
              variant="outline"
              size="md"
              className="w-full justify-center"
            >
              View All News &amp; Events
            </Button>
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
