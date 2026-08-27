"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CollectionCard } from "./CollectionCard";
import {
  collectionCategories,
  collectionsData,
  type CollectionCategory,
} from "@/lib/collections";

export function CollectionsExplorer() {
  const [selectedCategory, setSelectedCategory] =
    useState<CollectionCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return collectionsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.origin.toLowerCase().includes(query) ||
        item.period.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Filter Bar: Category Tabs & Search Input */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-border-subtle pb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {collectionCategories.map((category) => {
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

        {/* Live Search Input */}
        <div className="relative w-full max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
            <Icon name="search" size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artifacts, eras, origins..."
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

      {/* Status Bar */}
      <div className="mt-6 flex items-center justify-between text-[13px] text-muted">
        <p>
          Showing <span className="font-semibold text-heading">{filteredItems.length}</span>{" "}
          {filteredItems.length === 1 ? "masterpiece" : "masterpieces"}
          {selectedCategory !== "All" && (
            <span> in <strong className="text-primary">{selectedCategory}</strong></span>
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

      {/* Asymmetric Collage Grid */}
      {filteredItems.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {filteredItems.map((item, index) => {
            // Create asymmetrical mosaic layout based on item and index
            const isWide = index % 5 === 1 || index % 5 === 4;
            const isTall = index % 5 === 0;

            const colSpan = isWide
              ? "lg:col-span-8 min-h-90"
              : isTall
                ? "lg:col-span-4 min-h-115"
                : "lg:col-span-4 min-h-95";

            return (
              <div key={item.id} className={`${colSpan} flex`}>
                <CollectionCard
                  item={item}
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-16 rounded-sm border border-border bg-surface p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bg-secondary text-primary">
            <Icon name="search" size={24} />
          </div>
          <h3 className="mt-4 font-heading text-[24px] font-medium text-heading">
            No Artifacts Found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-muted">
            We couldn&apos;t find any collection items matching your search criteria. Try a different keyword or reset your filter.
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
              Show All Masterpieces
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
