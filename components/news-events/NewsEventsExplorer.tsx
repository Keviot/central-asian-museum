"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { NewsEventCard } from "./NewsEventCard";
import { NewsEventModal } from "./NewsEventModal";
import { type NewsEventItem } from "@/lib/newsEvents";

type NewsEventsExplorerProps = {
  initialItems?: NewsEventItem[];
};

export function NewsEventsExplorer({ initialItems }: NewsEventsExplorerProps) {
  const [items, setItems] = useState<NewsEventItem[]>(initialItems || []);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<NewsEventItem | null>(null);

  useEffect(() => {
    async function loadNewsEvents() {
      try {
        const res = await fetch("/api/news-events");
        const data = await res.json();
        if (res.ok && data.newsEvents && data.newsEvents.length > 0) {
          setItems(data.newsEvents);
        }
      } catch (err) {
        console.error("Failed to load news events dynamically:", err);
      }
    }
    loadNewsEvents();
  }, []);

  // Dynamically compute categories ONLY from existing items
  const dynamicCategories = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));
    return ["All", ...cats];
  }, [items]);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleSelect = useCallback((item: NewsEventItem) => {
    setSelectedItem(item);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ? true : item.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        (item.fullContent && item.fullContent.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Filter Bar: Category Tabs & Search Input */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-border-subtle pb-8">
        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {dynamicCategories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-[12px] font-medium uppercase tracking-widest rounded-[3px] transition-all duration-300 select-none ${
                  isActive
                    ? "bg-btn-bg text-white shadow-sm"
                    : "bg-surface text-body border border-border hover:border-btn-bg hover:text-btn-bg"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Live Search Input Box */}
        <div className="relative w-full max-w-xs shrink-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
            <Icon name="search" size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news, lectures, galas..."
            className="w-full rounded-[3px] border border-border bg-surface py-2 pl-9 pr-4 text-[13px] text-heading placeholder:text-muted focus:border-btn-bg focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-heading"
              aria-label="Clear search"
            >
              <Icon name="close" size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Filter Count Status Bar */}
      <div className="mt-6 flex items-center justify-between text-[13px] text-muted">
        <p>
          Showing <span className="font-semibold text-heading">{filteredItems.length}</span>{" "}
          {filteredItems.length === 1 ? "bulletin" : "news & event items"}
          {selectedCategory !== "All" && (
            <span> in <strong className="text-palette-amber">{selectedCategory}</strong></span>
          )}
        </p>

        {(selectedCategory !== "All" || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-[12px] uppercase tracking-[0.08em] font-medium text-btn-bg hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* News & Events 3-Column Grid */}
      {filteredItems.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {filteredItems.map((item) => (
            <NewsEventCard
              key={item.id}
              item={item}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        /* Empty Search Results State */
        <div className="mt-16 rounded-sm border border-border bg-surface p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bg-secondary text-palette-amber border border-palette-amber/30">
            <Icon name="search" size={24} />
          </div>
          <h3 className="mt-4 font-heading text-[24px] font-medium text-heading">
            No News or Events Found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-muted">
            We couldn&apos;t find any news bulletin or event matching your search query or filter selection. Try adjusting your search query.
          </p>
          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              Show All News & Events
            </Button>
          </div>
        </div>
      )}

      {/* Interactive Modal Popup */}
      <NewsEventModal
        item={selectedItem}
        onClose={handleClose}
      />
    </div>
  );
}

