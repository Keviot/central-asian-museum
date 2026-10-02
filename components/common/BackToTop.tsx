"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTOP_AFTER = 600; // px scrolled before button appears

export function BackToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isShown, setIsShown] = useState(false);
  const [isDocking, setIsDocking] = useState(false);
  const dockedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToTop = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const check = () => {
      const scrollY = window.scrollY;
      const logo = document.querySelector<HTMLElement>("footer .footer-brand");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!logo) {
        setIsShown(scrollY > TOTOP_AFTER);
        return;
      }

      const r = logo.getBoundingClientRect();
      const vh = window.innerHeight;
      const visibleHeight = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      const seen = visibleHeight / (r.height || 1);

      if (seen >= 0.85) {
        // Dock into footer logo
        if (!dockedRef.current) {
          dockedRef.current = true;
          if (scrollY > TOTOP_AFTER && !reduce) {
            const b = btn.getBoundingClientRect();
            // Center of the red square in logo
            const tx = r.left + r.width * 0.522;
            const ty = r.top + r.height * 0.477;
            const dx = tx - (b.left + b.width / 2);
            const dy = ty - (b.top + b.height / 2);
            const s = Math.max(0.2, (r.width * 0.44) / b.width);

            btn.style.setProperty("--dx", `${dx.toFixed(1)}px`);
            btn.style.setProperty("--dy", `${dy.toFixed(1)}px`);
            btn.style.setProperty("--s", s.toFixed(3));
            setIsDocking(true);

            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
              setIsDocking(false);
              setIsShown(false);
              logo.classList.add("is-arrow");
              timerRef.current = setTimeout(() => {
                logo.classList.remove("is-arrow");
              }, 1300);
            }, 650);
          } else {
            setIsShown(false);
          }
        }
      } else if (seen <= 0) {
        // Undock when logo is completely out of view
        if (dockedRef.current) {
          dockedRef.current = false;
          setIsDocking(false);
          setIsShown(scrollY > TOTOP_AFTER);
        }
      } else {
        if (!dockedRef.current) {
          setIsShown(scrollY > TOTOP_AFTER);
        }
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      className={`totop ${isShown ? "is-shown" : ""} ${isDocking ? "is-docking" : ""}`}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
