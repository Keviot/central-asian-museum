"use client";

import { useEffect, useRef } from "react";
import type { TimelineEntry } from "@/lib/aboutData";

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  const olRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = olRef.current;
    if (!ol) return;

    const updateTimeline = () => {
      const items = ol.querySelectorAll<HTMLLIElement>("li");
      if (items.length === 0) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      const olRect = ol.getBoundingClientRect();
      const firstRect = firstItem.getBoundingClientRect();
      const lastRect = lastItem.getBoundingClientRect();

      // Dot center is 13.5px from top of each li (top 6px + half of 15px dot)
      const firstDotCenter = firstRect.top + 13.5;
      const lastDotCenter = lastRect.top + 13.5;
      const tlLen = Math.max(0, lastDotCenter - firstDotCenter);

      ol.style.setProperty("--tl-len", `${tlLen}px`);

      // Trigger line at 60% of viewport height
      const triggerY = window.innerHeight * 0.6;

      let litCount = 0;
      items.forEach((item) => {
        const itemDotCenter = item.getBoundingClientRect().top + 13.5;
        if (itemDotCenter <= triggerY) {
          item.classList.add("is-lit");
          litCount++;
        } else {
          item.classList.remove("is-lit");
        }
      });

      let p = 0;
      if (tlLen > 0) {
        p = Math.max(0, Math.min(1, (triggerY - firstDotCenter) / tlLen));
      }
      ol.style.setProperty("--tl-p", p.toFixed(4));
    };

    updateTimeline();
    window.addEventListener("scroll", updateTimeline, { passive: true });
    window.addEventListener("resize", updateTimeline, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateTimeline);
      window.removeEventListener("resize", updateTimeline);
    };
  }, [entries]);

  return (
    <ol ref={olRef} className="timeline">
      {entries.map((e, idx) => (
        <li key={idx}>
          <p className="font-heading text-[20px] font-medium text-palette-wine md:text-[22px]">
            {e.isTbdDate ? <mark className="tbd">{e.date}</mark> : e.date}
          </p>
          <p className="mt-1 text-[15px] leading-relaxed text-body md:mt-0 md:text-[16px]">
            {e.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
