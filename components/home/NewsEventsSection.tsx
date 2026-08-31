"use client";

import { useState, useCallback, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { NewsEventCard } from "@/components/news-events/NewsEventCard";
import { NewsEventModal } from "@/components/news-events/NewsEventModal";
import { newsEventsData, type NewsEventItem } from "@/lib/newsEvents";

type NewsEventsSectionProps = {
  kicker?: string;
  title?: string;
  description?: string;
  items?: NewsEventItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
};

export function NewsEventsSection({
  kicker = "Lectures, Workshops & Updates",
  title = "Museum News & Events",
  description = "Join our curatorial lectures, artisan weaving masterclasses, press announcements, and seasonal cultural galas.",
  items: initialItems,
  viewAllHref = "/news-events",
  viewAllLabel = "View All News & Events",
}: NewsEventsSectionProps) {
  const [newsItems, setNewsItems] = useState<NewsEventItem[]>(initialItems || newsEventsData);
  const [selectedItem, setSelectedItem] = useState<NewsEventItem | null>(null);

  useEffect(() => {
    async function loadDynamicNews() {
      try {
        const res = await fetch("/api/news-events");
        const data = await res.json();
        if (res.ok && data.newsEvents && data.newsEvents.length > 0) {
          setNewsItems(data.newsEvents);
        }
      } catch (err) {
        console.error("Failed to load homepage news events dynamically:", err);
      }
    }
    if (!initialItems) {
      loadDynamicNews();
    }
  }, [initialItems]);

  const displayItems = newsItems.filter((item) => item.featuredOnHome !== false);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleSelect = useCallback((item: NewsEventItem) => {
    setSelectedItem(item);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-20 sm:py-24 md:py-28 lg:py-32">
      {/* Subtle Archival Background Glows */}
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-palette-amber/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-palette-sage/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header with Top Action */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            kicker={kicker}
            title={title}
            description={description}
          />

          <div className="shrink-0 pb-2">
            <Button
              href={viewAllHref}
              variant="outline"
              icon="arrow-right"
              size="md"
            >
              {viewAllLabel}
            </Button>
          </div>
        </div>

        {/* Curatorial News & Events 3-Column Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {displayItems.map((item) => (
            <NewsEventCard
              key={item.id}
              item={item}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </Container>

      {/* Interactive Modal Popup (Left Image + Right Details) */}
      <NewsEventModal
        item={selectedItem}
        onClose={handleClose}
      />
    </section>
  );
}

