"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { exhibitionsData, type ExhibitionItem } from "@/lib/exhibitionsData";

interface ExhibitionsExplorerProps {
  initialItems?: ExhibitionItem[];
}

export function ExhibitionsExplorer({
  initialItems = exhibitionsData.items,
}: ExhibitionsExplorerProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return initialItems;
    return initialItems.filter((it) => {
      const searchStr = `${it.title} ${it.excerpt} ${(it.body || []).join(" ")} ${it.dates} ${it.where || ""} ${it.curator || ""}`.toLowerCase();
      return searchStr.includes(q);
    });
  }, [searchQuery, initialItems]);

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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exhibitions…"
            className="w-full rounded-[3px] border border-border bg-surface py-2 pl-9 pr-4 text-[13px] text-heading placeholder:text-muted focus:border-btn-bg focus:outline-none transition-colors"
          />
        </label>
      </div>

      {/* Exhibitions List Grid (Loquet style) */}
      {filteredItems.length > 0 ? (
        <div className="exlist" data-list-grid>
          {filteredItems.map((it, idx) => {
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
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <p className="exlist__excerpt">{it.excerpt}</p>
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

                  <div className="mt-6 pt-4 border-t border-border-subtle/50 flex items-center justify-between">
                    <Button
                      href={href}
                      variant="primary"
                      size="sm"
                      icon="arrow-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore Exhibition
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
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
