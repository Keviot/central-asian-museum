"use client";

import { useState, useMemo } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsModal } from "@/components/news/NewsModal";
import { newsData, type NewsPost } from "@/lib/newsData";

interface NewsExplorerProps {
  initialPosts?: NewsPost[];
}

const ITEMS_PER_PAGE = 9;

export function NewsExplorer({ initialPosts = newsData.posts }: NewsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return initialPosts;
    return initialPosts.filter((p) => {
      const searchTarget = [
        p.title,
        p.excerpt,
        ...p.body,
        p.date,
      ]
        .join(" ")
        .toLowerCase();
      return searchTarget.includes(q);
    });
  }, [searchQuery, initialPosts]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredPosts.length);
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const listSection = document.getElementById("list");
    if (listSection) {
      listSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (safePage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (safePage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      <div className="flex flex-col gap-6 border-b border-border-subtle pb-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-muted" aria-live="polite">
          Showing{" "}
          <span className="font-semibold text-heading">
            {filteredPosts.length}
          </span>{" "}
          news &amp; event items
        </p>

        <label className="relative w-full max-w-xs shrink-0">
          <span className="sr-only">Search news and events</span>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
            <Icon name="search" size={16} />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search news and events…"
            className="w-full rounded-[3px] border border-border bg-surface py-2 pl-9 pr-4 text-[13px] text-heading placeholder:text-muted focus:border-btn-bg focus:outline-none transition-colors"
          />
        </label>
      </div>

      {paginatedPosts.length > 0 ? (
        <>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {paginatedPosts.map((post) => (
              <NewsCard
                key={post.id}
                post={post}
                onOpen={(p) => setSelectedPost(p)}
              />
            ))}
          </div>

          {/* Premium Museum Pagination Bar (Shown only when there are 2 or more pages) */}
          {totalPages > 1 && (
            <nav
              className="mt-14 pt-8 border-t border-palette-sand/60 flex flex-col sm:flex-row items-center justify-between gap-5"
              aria-label="News and events pagination"
            >
              {/* Left: Entries range summary */}
              <p className="text-[13px] text-muted font-mono tracking-wide">
                Showing <strong className="text-heading font-semibold">{startIndex + 1}–{endIndex}</strong> of{" "}
                <strong className="text-heading font-semibold">{filteredPosts.length}</strong> items
              </p>

              {/* Center: Previous, Page Numbers, Next */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(safePage - 1)}
                  disabled={safePage <= 1}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-xs border text-[12px] font-mono uppercase tracking-wider transition-all ${
                    safePage <= 1
                      ? "border-border-subtle/50 text-muted/40 cursor-not-allowed bg-transparent"
                      : "border-palette-sand/80 bg-bg text-heading hover:border-palette-amber hover:text-palette-amber hover:bg-bg-secondary cursor-pointer shadow-2xs"
                  }`}
                  aria-label="Previous Page"
                >
                  <Icon name="arrow-left" size={13} />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((p, idx) => {
                    if (p === "...") {
                      return (
                        <span
                          key={`ellipsis-${idx}`}
                          className="px-2 py-1 text-muted text-[13px] font-mono select-none"
                        >
                          …
                        </span>
                      );
                    }

                    const isActive = p === safePage;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePageChange(p)}
                        aria-current={isActive ? "page" : undefined}
                        className={`h-9 min-w-9 px-2.5 rounded-xs text-[13px] font-mono font-bold transition-all flex items-center justify-center ${
                          isActive
                            ? "bg-palette-wine text-white border border-palette-wine shadow-xs"
                            : "border border-palette-sand/70 bg-bg text-heading hover:border-palette-amber hover:text-palette-amber hover:bg-bg-secondary cursor-pointer"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(safePage + 1)}
                  disabled={safePage >= totalPages}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-xs border text-[12px] font-mono uppercase tracking-wider transition-all ${
                    safePage >= totalPages
                      ? "border-border-subtle/50 text-muted/40 cursor-not-allowed bg-transparent"
                      : "border-palette-sand/80 bg-bg text-heading hover:border-palette-amber hover:text-palette-amber hover:bg-bg-secondary cursor-pointer shadow-2xs"
                  }`}
                  aria-label="Next Page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <Icon name="arrow-right" size={13} />
                </button>
              </div>

              {/* Right: Page indicator badge */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-xs border border-palette-sand/70 bg-bg-secondary/60 text-[11px] font-mono font-medium uppercase tracking-[0.14em] text-muted">
                  Page {safePage} of {totalPages}
                </span>
              </div>
            </nav>
          )}
        </>
      ) : (
        <div className="news-empty mt-12 rounded-xs border border-dashed border-border py-12 px-6 text-center">
          <h2 className="font-heading text-[26px] font-medium text-heading">
            No news or events found
          </h2>
          <p className="mt-2 text-[14px] text-body">
            Nothing matches your search. Try another word.
          </p>
          <Button
            type="button"
            variant="outline"
            size="md"
            className="mt-6"
            onClick={() => handleSearchChange("")}
          >
            Show All News &amp; Events
          </Button>
        </div>
      )}
      <NewsModal
        posts={filteredPosts}
        activeId={selectedPost?.id || null}
        onClose={() => setSelectedPost(null)}
      />
    </>
  );
}
