"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import type { ExhibitionItem } from "@/lib/exhibitionsData";

interface ExhibitionsExplorerProps {
  initialItems?: ExhibitionItem[];
}

const ITEMS_PER_PAGE = 6;

export function ExhibitionsExplorer({
  initialItems = [],
}: ExhibitionsExplorerProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return initialItems;
    return initialItems.filter((it) => {
      const searchStr = `${it.title} ${it.excerpt} ${(it.body || []).join(" ")} ${it.dates} ${it.where || ""} ${it.curator || ""}`.toLowerCase();
      return searchStr.includes(q);
    });
  }, [searchQuery, initialItems]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length);
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

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
      {/* Search Header Row */}
      <div className="flex flex-col gap-6 border-b border-border-subtle pb-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-muted" aria-live="polite">
          Showing{" "}
          <span className="font-semibold text-heading">
            {filteredItems.length}
          </span>{" "}
          <span>
            {filteredItems.length === 1 ? "exhibition" : "exhibitions"}
          </span>
        </p>

        <label className="relative w-full max-w-xs shrink-0">
          <span className="sr-only">Search exhibitions</span>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
            <Icon name="search" size={16} />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search exhibitions…"
            className="w-full rounded-[3px] border border-border bg-surface py-2 pl-9 pr-4 text-[13px] text-heading placeholder:text-muted focus:border-btn-bg focus:outline-none transition-colors"
          />
        </label>
      </div>

      {/* Exhibitions List Grid */}
      {paginatedItems.length > 0 ? (
        <>
          <div className="exlist" data-list-grid>
            {paginatedItems.map((it, idx) => {
              const slug = it.slug || it.id;
              const href = `/exhibitions/${slug}`;

              return (
                <article
                  key={it.id}
                  className="exlist__item group cursor-pointer"
                  data-post={it.id}
                  onClick={() => router.push(href)}
                >
                  <Link href={href} className="exlist__media block">
                    <Image
                      src={it.image}
                      alt={it.alt}
                      fill
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 100vw, 1120px"
                      className="object-cover"
                    />
                    {it.now && (
                      <span className="exlist__now">
                        <i aria-hidden="true" />
                        {it.status}
                      </span>
                    )}
                  </Link>

                  <div className="exlist__text">
                    <p className={`exlist__label ${it.now ? "is-now" : ""}`}>
                      {it.status}
                    </p>
                    <h2 className="exlist__title">
                      <Link
                        href={href}
                        className="hover:text-palette-amber transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {it.title}
                      </Link>
                    </h2>
                    <div className="exlist__meta">
                      {it.dates && (
                        <span>
                          <Icon name="calendar" size={15} />
                          {it.dates}
                        </span>
                      )}
                      {it.where && (
                        <span>
                          <Icon name="pin" size={15} />
                          {it.where}
                        </span>
                      )}
                      {it.curator && (
                        <span>
                          <Icon name="users" size={15} />
                          {it.curator}
                        </span>
                      )}
                    </div>
                    <p className="exlist__excerpt">{it.excerpt}</p>
                    <Link
                      href={href}
                      className="exlist__go"
                      aria-label={`Open the exhibition: ${it.title}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name="arrow-right" size={20} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Exhibitions Pagination Bar (Shown when totalPages > 1) */}
          {totalPages > 1 && (
            <nav
              className="mt-14 pt-8 border-t border-palette-sand/60 flex flex-col sm:flex-row items-center justify-between gap-5"
              aria-label="Exhibitions pagination"
            >
              <p className="text-[13px] text-muted font-mono tracking-wide">
                Showing <strong className="text-heading font-semibold">{startIndex + 1}–{endIndex}</strong> of{" "}
                <strong className="text-heading font-semibold">{filteredItems.length}</strong> exhibitions
              </p>

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
                        className={`min-w-8 h-8 px-2 flex items-center justify-center rounded-xs border text-[12px] font-mono font-medium transition-all ${
                          isActive
                            ? "bg-btn-bg text-white border-btn-bg font-semibold shadow-xs"
                            : "border-border-subtle/70 bg-bg hover:bg-bg-secondary text-body hover:text-heading cursor-pointer"
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

              <div className="hidden md:block text-[12px] font-mono text-muted">
                Page <span className="text-heading font-medium">{safePage}</span> of{" "}
                <span className="text-heading font-medium">{totalPages}</span>
              </div>
            </nav>
          )}
        </>
      ) : (
        <div className="news-empty" data-list-empty>
          <h2 className="font-heading text-[26px] font-medium text-heading">
            No exhibitions found
          </h2>
          <p className="mt-2 text-[14px] text-body">
            Nothing matches your search. Try another word.
          </p>
          <Button
            type="button"
            variant="outline"
            size="md"
            className="mt-6"
            onClick={() => setSearchQuery("")}
          >
            Show All Exhibitions
          </Button>
        </div>
      )}
    </>
  );
}
