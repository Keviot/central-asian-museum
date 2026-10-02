"use client";

import { useEffect, useState, useCallback } from "react";

const SCROLL_THRESHOLD = 450; // px scrolled before button appears

export function BackToTop() {
  const [isShown, setIsShown] = useState(false);

  const scrollToTop = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      setIsShown(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <button
      type="button"
      className={`totop ${isShown ? "is-shown" : ""}`}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="totop__icon"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
