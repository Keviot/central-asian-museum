"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import type { NewsPost } from "@/lib/newsData";

interface NewsCardProps {
  post: NewsPost;
  onOpen: (post: NewsPost) => void;
  className?: string;
}

export function NewsCard({ post, onOpen, className = "" }: NewsCardProps) {
  return (
    <article
      className={`news-card group relative flex flex-col justify-between pt-5 border-t border-palette-sand/60 transition-all duration-300 cursor-pointer ${className}`}
      onClick={() => onOpen(post)}
    >
      <div>
        <div aria-hidden="true" className="flex items-center gap-2 mb-4">
          <span className="h-0.5 w-8 bg-palette-amber transition-all duration-500 group-hover:w-14" />
          <span className="h-px flex-1 bg-border-subtle/40" />
        </div>
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-xs bg-bg-secondary border border-palette-sand/50 mb-4">
          <Image
            src={post.image}
            alt={post.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="border-l-2 border-palette-amber/40 pl-3.5 transition-colors duration-300 group-hover:border-palette-amber">
          <h3 className="font-heading text-[22px] font-medium leading-[1.2] text-heading sm:text-[24px] group-hover:text-palette-amber transition-colors">
            {post.title}
          </h3>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium text-muted">
            <div className="flex items-center gap-1.5">
              <Icon name="calendar" size={13} className="text-palette-sage" />
              <span>{post.date}</span>
            </div>
            {post.category && (
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-px bg-border-subtle" aria-hidden="true" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-palette-amber">
                  {post.category}
                </span>
              </span>
            )}
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-body line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </div>
      <div className="mt-5 pt-3 border-t border-border-subtle/40 flex items-center justify-between">
        <Button
          type="button"
          variant="primary"
          size="sm"
          icon="arrow-right"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(post);
          }}
          aria-haspopup="dialog"
        >
          Read More
        </Button>
      </div>
    </article>
  );
}
