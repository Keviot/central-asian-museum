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
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm border border-border bg-surface text-body shadow-2xl transition-all transform duration-300"
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

        {/* Grid: Left Image & Right Text Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
          {/* Left Side: High-Resolution Event Image */}
          <div className="relative aspect-4/3 md:aspect-auto md:col-span-5 w-full min-h-[260px] bg-bg-secondary overflow-hidden">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-center"
            />
            
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
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

          {/* Right Side: Detailed Curatorial Text & Action */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7 max-h-[85vh] md:max-h-[580px]">
            <div className="overflow-y-auto max-h-[320px] sm:max-h-[380px] pr-2 space-y-3">
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
                className="mt-3 font-heading text-[24px] font-medium leading-[1.15] text-heading sm:text-[28px] md:text-[32px]"
              >
                {item.title}
              </h2>

              {/* Metadata Badges (Date, Time, Location) */}
              <div className="mt-4 flex flex-wrap items-center gap-3 border-y border-border-subtle py-3 text-[12px] font-medium text-body">
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

              {/* Summary Paragraph */}
              <p className="mt-4 text-[15px] font-medium leading-relaxed text-heading">
                {item.summary}
              </p>

              {/* Full Article Content */}
              {item.fullContent && (
                <div className="mt-3 text-[14px] leading-relaxed text-body whitespace-pre-wrap">
                  {item.fullContent}
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                icon="arrow-right"
                onClick={onClose}
              >
                {item.rsvpRequired ? "Reserve Seat / RSVP" : "Inquire with Curator"}
              </Button>

              <button
                type="button"
                onClick={onClose}
                className="text-[12px] uppercase tracking-[0.14em] font-semibold text-muted hover:text-heading transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
