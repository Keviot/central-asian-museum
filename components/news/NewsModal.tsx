"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

export type ModalSlide = {
  id: string;
  title: string;
  date: string;
  time?: string | null;
  location?: string | null;
  image: string;
  alt: string;
  body: string[];
};

export interface NewsModalProps {
  post?: ModalSlide | null;
  posts?: ModalSlide[];
  activeId?: string | null;
  onClose: () => void;
  ariaLabel?: string;
}

export function NewsModal({
  post,
  posts: rawPosts,
  activeId,
  onClose,
  ariaLabel = "News and events",
}: NewsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize posts list
  const slides: ModalSlide[] = rawPosts && rawPosts.length > 0
    ? rawPosts
    : post
    ? [post]
    : [];

  const targetId = activeId || post?.id || null;
  const isOpen = targetId !== null && slides.length > 0;

  // Jump to specific slide
  const goTo = useCallback(
    (index: number, smooth: boolean = true) => {
      const track = trackRef.current;
      if (!track || slides.length === 0) return;
      const validIndex = Math.max(0, Math.min(slides.length - 1, index));
      setCurrentIndex(validIndex);

      const targetLeft = validIndex * track.clientWidth;
      if (smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        track.scrollTo({ left: targetLeft, behavior: "smooth" });
      } else {
        track.scrollLeft = targetLeft;
      }

      // Reset scroll of the active slide text
      const slideEls = track.querySelectorAll(".news-modal__text");
      if (slideEls[validIndex]) {
        (slideEls[validIndex] as HTMLElement).scrollTop = 0;
      }
    },
    [slides.length]
  );

  // Handle open / close lifecycle
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = "hidden";

      // Set initial slide
      const initialIdx = slides.findIndex((s) => s.id === targetId);
      const startIdx = initialIdx >= 0 ? initialIdx : 0;
      setCurrentIndex(startIdx);

      // Scroll track to initial slide immediately
      requestAnimationFrame(() => {
        if (trackRef.current) {
          trackRef.current.scrollLeft = startIdx * trackRef.current.clientWidth;
        }
      });
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, targetId, slides]);

  // Sync scroll position with current index during touch swipe
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    const bounded = Math.max(0, Math.min(slides.length - 1, i));
    if (bounded !== currentIndex) {
      setCurrentIndex(bounded);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentIndex - 1, true);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(currentIndex + 1, true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, goTo, onClose]);

  // Window resize sync
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && trackRef.current) {
        trackRef.current.scrollLeft = currentIndex * trackRef.current.clientWidth;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="news-modal"
      id="news-modal"
      aria-label={ariaLabel}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      onClose={onClose}
    >
      <button
        type="button"
        className="news-modal__close"
        onClick={onClose}
        aria-label="Close"
      >
        <Icon name="close" size={18} />
      </button>

      <div
        ref={trackRef}
        className="news-modal__track"
        data-modal-track
        onScroll={handleScroll}
      >
        {slides.map((p, idx) => (
          <article
            key={p.id}
            className="news-modal__slide"
            data-slide-id={p.id}
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${slides.length}`}
            aria-hidden={idx !== currentIndex}
          >
            <div className="news-modal__media relative w-full overflow-hidden">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="news-modal__text">
              <h2 className="font-heading text-[24px] font-medium leading-[1.18] text-heading sm:text-[28px] md:text-[30px]">
                {p.title}
              </h2>
              <div className="news-modal__details">
                <span className="news-modal__date">
                  <Icon name="calendar" size={14} />
                  <span>{p.date}</span>
                </span>
                {p.time && (
                  <>
                    <span aria-hidden="true" className="news-modal__dot">
                      •
                    </span>
                    <span>
                      <Icon name="clock" size={14} />
                      <span>{p.time}</span>
                    </span>
                  </>
                )}
                {p.location && (
                  <>
                    <span aria-hidden="true" className="news-modal__dot">
                      •
                    </span>
                    <a
                      href="https://maps.app.goo.gl/CHsSHHyECqD3nZUe7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-heading transition-colors"
                      title="View location on Google Maps"
                    >
                      <Icon name="map-pin" size={14} />
                      <span className="underline decoration-muted/40 underline-offset-2 hover:decoration-heading">
                        {p.location}
                      </span>
                    </a>
                  </>
                )}
              </div>
              <div className="news-modal__body">
                {p.body.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="news-modal__nav">
          <button
            type="button"
            className="news-modal__arrow"
            onClick={() => goTo(currentIndex - 1, true)}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <Icon name="arrow-left" size={16} />
          </button>
          <span className="news-modal__count" aria-live="polite">
            <b data-modal-index>{currentIndex + 1}</b> / {slides.length}
          </span>
          <button
            type="button"
            className="news-modal__arrow"
            onClick={() => goTo(currentIndex + 1, true)}
            disabled={currentIndex === slides.length - 1}
            aria-label="Next"
          >
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      )}
    </dialog>
  );
}
