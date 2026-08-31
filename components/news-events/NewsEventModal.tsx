"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import type { NewsEventItem } from "@/lib/newsEvents";

type NewsEventModalProps = {
  item: NewsEventItem | null;
  onClose: () => void;
};

export function NewsEventModal({ item, onClose }: NewsEventModalProps) {
  // Lock body scroll and handle ESC key when modal is open
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-surface-dark/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-4xl h-[90vh] md:h-155 max-h-165 flex flex-col md:grid md:grid-cols-12 rounded-sm border border-border bg-surface text-body shadow-2xl transition-all transform duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-surface-dark/80 text-white transition-colors hover:bg-surface-dark hover:text-palette-amber focus-visible:outline-none"
          aria-label="Close dialog"
        >
          <Icon name="close" size={18} />
        </button>

        {/* Left Side: High-Resolution Event Image */}
        <div className="relative aspect-video md:aspect-auto md:col-span-5 w-full min-h-50 md:min-h-full bg-bg-secondary overflow-hidden shrink-0">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-center"
          />
          
          <div
            className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Category Pill Overlay */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-xs bg-surface-dark/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-palette-sand backdrop-blur-md border border-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-palette-amber" />
              <span>{item.category}</span>
            </span>
          </div>
        </div>

        {/* Right Side: Detailed Curatorial Header, Scrollable Description, Fixed Action */}
        <div className="flex flex-col flex-1 min-h-0 md:col-span-7 p-6 sm:p-8 overflow-hidden">
          {/* Fixed Header */}
          <div className="shrink-0 space-y-3 pb-4 border-b border-border-subtle pr-8">
            {/* Category Kicker */}
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-palette-amber" aria-hidden="true" />
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-amber">
                {item.category}
              </p>
            </div>

            {/* Title */}
            <h2
              id="modal-title"
              className="font-heading text-[22px] font-medium leading-[1.18] text-heading sm:text-[26px] md:text-[30px]"
            >
              {item.title}
            </h2>

            {/* Metadata Badges (Date, Time, Location) */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[12px] font-medium text-body">
              <div className="flex items-center gap-1.5 text-palette-amber">
                <Icon name="calendar" size={14} />
                <span>{item.date}</span>
              </div>

              {item.time && (
                <>
                  <span className="text-border-subtle">•</span>
                  <div className="flex items-center gap-1.5 text-body">
                    <Icon name="clock" size={14} />
                    <span>{item.time}</span>
                  </div>
                </>
              )}

              <span className="text-border-subtle">•</span>
              <div className="flex items-center gap-1.5 text-muted">
                <Icon name="map-pin" size={14} />
                <span>{item.location}</span>
              </div>
            </div>
          </div>

          {/* Scrollable Description Only */}
          <div className="flex-1 min-h-0 overflow-y-auto py-4 pr-3 my-1 space-y-4 scrollbar-thin [scrollbar-color:var(--museum-border)_transparent]">
            {/* Summary Paragraph */}
            <p className="text-[15px] font-medium leading-relaxed text-heading">
              {item.summary}
            </p>

            {/* Full Article Content */}
            {item.fullContent && (
              <div className="text-[14px] leading-relaxed text-body whitespace-pre-wrap">
                {item.fullContent}
              </div>
            )}
          </div>

          {/* Fixed Action Footer */}
          <div className="shrink-0 pt-4 border-t border-border-subtle flex items-center justify-start">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              icon="arrow-right"
              onClick={onClose}
            >
              {item.rsvpRequired ? "Reserve Seat / RSVP" : "Inquire with Curator"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

