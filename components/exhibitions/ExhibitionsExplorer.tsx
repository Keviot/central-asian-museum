"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ExhibitionCard } from "./ExhibitionCard";
import {
  exhibitionCategories,
  exhibitionsData,
  type ExhibitionCategory,
} from "@/lib/exhibitions";

export function ExhibitionsExplorer() {
  const [selectedCategory, setSelectedCategory] =
    useState<ExhibitionCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return exhibitionsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All"
          ? true
          : selectedCategory === "Current"
          ? item.status === "Current"
          : selectedCategory === "Upcoming"
          ? item.status === "Upcoming"
          : item.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Filter Bar: Category/Status Pills & Live Search Input */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-border-subtle pb-8">
        {/* Category & Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {exhibitionCategories.map((category) => {
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

        {/* Search Input Box */}
        <div className="relative w-full max-w-xs shrink-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
            <Icon name="search" size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exhibitions, galleries, dates..."
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

      {/* Filter Status Bar */}
      <div className="mt-6 flex items-center justify-between text-[13px] text-muted">
        <p>
          Showing <span className="font-semibold text-heading">{filteredItems.length}</span>{" "}
          {filteredItems.length === 1 ? "exhibition" : "exhibitions"}
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

      {/* Exhibitions Grid */}
      {filteredItems.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {filteredItems.map((exhibition) => (
            <ExhibitionCard
              key={exhibition.id}
              exhibition={exhibition}
              href="/exhibitions"
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-16 rounded-sm border border-border bg-surface p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bg-secondary text-primary">
            <Icon name="search" size={24} />
          </div>
          <h3 className="mt-4 font-heading text-[24px] font-medium text-heading">
            No Exhibitions Found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-muted">
            We couldn&apos;t find any exhibition matching your search query or filter selection. Try a different search term or reset your filter.
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
              Show All Exhibitions
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
