"use client";

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FloorMark } from "@/components/ui/FloorMark";

export type FloorSlide = {
  level: string;
  floor: string;
  title: string;
  style?: string;
  text: string;
  alt: string;
  href: string;
  image: string;
  tbd?: string;
};

export const defaultFloorSlides: FloorSlide[] = [
  {
    level: "Level One",
    floor: "Ground Floor",
    title: "Ladakh",
    text: "The cultural heritage of Ladakh: everyday life, utensils, craftsmanship and material culture, and the relationship between people and the landscape.",
    alt: "Ground floor gallery with a brass vessel, carved stones and Ladakhi objects",
    href: "/collections#ground",
    image: "/images/gallery-ground-ladakh.webp",
  },
  {
    level: "Level Two",
    floor: "Floor 1",
    title: "Central Asia",
    text: "Goods, people, ideas and artistic traditions that travelled the trade routes linking Ladakh with the wider Central Asian world.",
    alt: "Central Asian gallery with a samovar, metal vessels and fluted timber columns",
    href: "/collections#floor-1",
    image: "/images/gallery-floor1-central-asia.webp",
  },
  {
    level: "Level Three",
    floor: "Floor 2",
    title: "Tibet",
    text: "Centuries of shared Buddhist tradition, pilgrimage, scholarship, artistic exchange and movement across the Himalayan landscape.",
    alt: "Tibetan gallery with carpets, copper vessels and carved capitals",
    href: "/collections#floor-2",
    image: "/images/gallery-floor2-tibet.webp",
  },
  {
    level: "Level Four",
    floor: "Floor 3",
    title: "Changing Exhibitions",
    text: "Temporary and changing exhibitions, alongside the museum's manuscripts and archival records.",
    alt: "Top floor gallery with manuscripts in display cases and historic photographs",
    href: "/collections#floor-3",
    image: "/images/gallery-floor3-archive.webp",
  },
];

export type FloorsSliderProps = {
  slides?: FloorSlide[];
};

// Helper to generate responsive srcset (800w, 1280w, 1537w)
function getSrcSet(image: string): string {
  const base = image.replace(/\.webp$/, "");
  return `${base}-800.webp 800w, ${base}-1280.webp 1280w, ${image} 1537w`;
}

// Inner edge of each square in the 320px level-logo artwork [left, top, right, bottom].
// The "drawn" layer shows everything outside this hole; the hole shrinks as you go up, so squares appear outer to inner.
const HOLES = [
  [43, 43, 275.5, 281],
  [61.5, 62, 257, 263],
  [81, 81, 238, 243],
  [160, 162, 160, 162],
];

function hole(t: number): number[] {
  const i = Math.min(HOLES.length - 2, Math.floor(t));
  const f = t - i;
  const a = HOLES[i];
  const b = HOLES[i + 1];
  return a.map((v, k) => ((v + (b[k] - v) * f) / 320) * 100);
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

export function FloorsSlider({
  slides = defaultFloorSlides,
}: FloorsSliderProps) {
  // Desktop v2 DOM refs
  const flxRef = useRef<HTMLElement>(null);
  const slideEls = useRef<(HTMLElement | null)[]>([]);
  const imgEls = useRef<(HTMLImageElement | null)[]>([]);
  const dimEls = useRef<(HTMLDivElement | null)[]>([]);
  const textEls = useRef<(HTMLDivElement | null)[]>([]);
  const stateEls = useRef<(HTMLSpanElement | null)[]>([]);
  const drawnEls = useRef<(HTMLImageElement | null)[]>([]);
  const logoEl = useRef<HTMLDivElement>(null);
  const navBtnEls = useRef<(HTMLButtonElement | null)[]>([]);
  const lastIndexRef = useRef(-1);
  const rafRef = useRef<number>(0);

  // Mobile compact slider state
  const mobileRef = useRef<HTMLElement>(null);
  const [mobileCurrentIndex, setMobileCurrentIndex] = useState(0);

  // Render function for Desktop v2 scroll-linked reveal
  const renderV2 = useCallback(() => {
    const root = flxRef.current;
    if (!root) return;
    const n = slides.length;
    const unit = (root.offsetHeight - window.innerHeight) / (n - 1);
    if (unit <= 0) return;
    const t = clamp(-root.getBoundingClientRect().top / unit, 0, n - 1);

    slides.forEach((_, k) => {
      const s = slideEls.current[k];
      const img = imgEls.current[k];
      const dim = dimEls.current[k];
      const text = textEls.current[k];
      if (!s || !img || !dim || !text) return;

      const f = k === 0 ? 1 : clamp(t - (k - 1), 0, 1);
      const g = clamp(t - k, 0, 1);
      s.style.clipPath = `inset(0 0 ${((1 - f) * 100).toFixed(3)}% 0)`;
      img.style.transform = `translate3d(0,${(-(1 - f) * 16 + g * 9).toFixed(3)}%,0) scale(1.08)`;
      dim.style.opacity = (g * 0.6).toFixed(3);
      const c = clamp(1 - Math.abs(t - k) * 1.8, 0, 1);
      text.style.opacity = c.toFixed(3);
      text.style.transform = `translate3d(0,${((t - k) * 70).toFixed(1)}px,0)`;
      s.setAttribute("aria-hidden", Math.round(t) === k ? "false" : "true");
      if (t > k - 1.6 && img.loading === "lazy") {
        img.loading = "eager";
      }
    });

    const h = hole(t);
    const clip = `polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${h[0]}% ${h[1]}%, ${h[0]}% ${h[3]}%, ${h[2]}% ${h[3]}%, ${h[2]}% ${h[1]}%, ${h[0]}% ${h[1]}%)`;
    drawnEls.current.forEach((d) => {
      if (d) d.style.clipPath = clip;
    });

    const cur = Math.round(t);
    if (cur !== lastIndexRef.current) {
      lastIndexRef.current = cur;
      stateEls.current.forEach((st, k) => {
        if (st) st.classList.toggle("is-active", k === cur);
      });
      navBtnEls.current.forEach((b, k) => {
        if (b) b.setAttribute("aria-current", k === cur ? "true" : "false");
      });
      if (logoEl.current) {
        logoEl.current.setAttribute("aria-label", `Level ${cur + 1} of ${n}`);
      }
    }
  }, [slides]);

  // Mobile progress calculation
  const calculateMobileActiveIndex = useCallback(() => {
    if (!mobileRef.current) return;
    const rect = mobileRef.current.getBoundingClientRect();
    const travel = mobileRef.current.offsetHeight - window.innerHeight;
    if (travel <= 0) return;
    const progress = Math.min(1, Math.max(0, -rect.top / travel));
    const nextIndex = Math.min(slides.length - 1, Math.floor(progress * slides.length));
    setMobileCurrentIndex(nextIndex);
  }, [slides.length]);

  // Unified scroll & resize handler
  useEffect(() => {
    const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

    const onScroll = () => {
      if (isDesktop()) {
        if (document.hidden) {
          renderV2();
          return;
        }
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0;
            renderV2();
          });
        }
      } else {
        calculateMobileActiveIndex();
      }
    };

    const onResize = () => {
      if (isDesktop()) {
        renderV2();
      } else {
        calculateMobileActiveIndex();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    if (isDesktop()) {
      renderV2();
    } else {
      calculateMobileActiveIndex();
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [renderV2, calculateMobileActiveIndex]);

  // Navigate to floor on desktop
  const goToDesktop = (index: number) => {
    const root = flxRef.current;
    if (!root) return;
    const n = slides.length;
    const unit = (root.offsetHeight - window.innerHeight) / (n - 1);
    const top = root.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + unit * index, behavior: "smooth" });
  };

  // Navigate to floor on mobile
  const goToMobile = (index: number) => {
    const root = mobileRef.current;
    if (!root) return;
    const n = slides.length;
    const targetIdx = Math.max(0, Math.min(n - 1, index));
    const travel = root.offsetHeight - window.innerHeight;
    const top = root.getBoundingClientRect().top + window.scrollY;
    const targetScroll = top + (travel * (targetIdx + 0.5)) / n;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <>
      {/* =========================================================================
          Desktop (1024px+): Floors Slider v2
          Scroll-linked reveal, CSS scroll-snap proximity, dynamic level logo
          ========================================================================= */}
      <section
        id="floors"
        ref={flxRef}
        className="flx"
        data-flx
        style={{ "--floors": slides.length } as CSSProperties}
        aria-label="The four floors of the museum"
      >
        <div className="flx__snaps" aria-hidden="true">
          {slides.map((_, i) => (
            <i key={i} style={{ top: `calc(${i} * 100vh)` }} />
          ))}
        </div>
        <div className="flx__stage">
          {slides.map((slide, idx) => (
            <article
              key={slide.title}
              ref={(el) => {
                slideEls.current[idx] = el;
              }}
              className="flx__slide"
              data-i={idx}
              style={{ zIndex: idx + 1 }}
              aria-hidden={idx === 0 ? "false" : "true"}
            >
              <img
                ref={(el) => {
                  imgEls.current[idx] = el;
                }}
                className="flx__img"
                src={slide.image}
                srcSet={getSrcSet(slide.image)}
                sizes="100vw"
                alt={slide.alt}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="floors__shade" aria-hidden="true" />
              <div
                ref={(el) => {
                  dimEls.current[idx] = el;
                }}
                className="flx__dim"
                aria-hidden="true"
              />
              <div
                ref={(el) => {
                  textEls.current[idx] = el;
                }}
                className="flx__content"
              >
                <p className="floors__kicker">
                  {slide.level} · {slide.floor}
                </p>
                <h3 className="floors__title">{slide.title}</h3>
                <p className="floors__text">
                  {slide.text}
                  {slide.tbd && (
                    <>
                      <br />
                      <mark className="tbd mt-2">{slide.tbd}</mark>
                    </>
                  )}
                </p>
                <div className="floors__meta">
                  <Button
                    href={slide.href}
                    variant="primary"
                    size="sm"
                    icon="arrow-right"
                    className="hover:brightness-110 shadow-lg"
                  >
                    Explore the Floor
                  </Button>
                </div>
              </div>
            </article>
          ))}

          <div className="flx__rail">
            <div
              ref={logoEl}
              className="flx__logo"
              role="img"
              aria-label={`Level 1 of ${slides.length}`}
              data-flx-logo
            >
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    stateEls.current[idx] = el;
                  }}
                  className={`flx__state ${idx === 0 ? "is-active" : ""}`}
                >
                  <img
                    className="flx__ghost"
                    src={`/images/logo/level-${idx + 1}-dark.webp`}
                    alt=""
                    width={112}
                    height={112}
                  />
                  <img
                    ref={(el) => {
                      drawnEls.current[idx] = el;
                    }}
                    className="flx__drawn"
                    src={`/images/logo/level-${idx + 1}-dark.webp`}
                    alt=""
                    width={112}
                    height={112}
                  />
                </span>
              ))}
            </div>
            <ul className="flx__nav">
              {slides.map((slide, idx) => (
                <li key={slide.title}>
                  <button
                    ref={(el) => {
                      navBtnEls.current[idx] = el;
                    }}
                    type="button"
                    data-flx-goto={idx}
                    aria-current={idx === 0 ? "true" : "false"}
                    onClick={() => goToDesktop(idx)}
                  >
                    {slide.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Phones & Tablets (<1024px): Compact Floors Slider
          Compact top rail, stacked floor mark, responsive images
          ========================================================================= */}
      <div className="floors-compact">
        <section
          id="floors-mobile"
          ref={mobileRef}
          className="floors relative"
          style={{ "--floors": slides.length } as CSSProperties}
          aria-label="The four floors of the museum"
        >
          <div className="floors__stage">
            {slides.map((slide, idx) => {
              const isActive = idx === mobileCurrentIndex;
              const isPast = idx < mobileCurrentIndex;

              return (
                <article
                  key={slide.title}
                  className={`floors__slide ${isActive ? "is-active" : ""} ${
                    isPast ? "is-past" : ""
                  }`}
                  data-slide={idx}
                  aria-hidden={isActive ? "false" : "true"}
                >
                  <img
                    src={slide.image}
                    srcSet={getSrcSet(slide.image)}
                    sizes="100vw"
                    alt={slide.alt}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="floors__img"
                  />
                  <div className="floors__shade" aria-hidden="true" />
                  <div className="floors__content">
                    <p className="floors__kicker">
                      {slide.level} · {slide.floor}
                    </p>
                    <h3 className="floors__title">{slide.title}</h3>
                    <p className="floors__text">
                      {slide.text}
                      {slide.tbd && (
                        <>
                          <br />
                          <mark className="tbd mt-2">{slide.tbd}</mark>
                        </>
                      )}
                    </p>
                    <div className="floors__meta">
                      <Button
                        href={slide.href}
                        variant="primary"
                        size="sm"
                        icon="arrow-right"
                        className="hover:brightness-110 shadow-lg"
                      >
                        Explore the Floor
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Left Side: Vertical Scroll Indicator */}
            <div className="floors__scroll" aria-hidden="true">
              <em>Scroll down</em>
              <i />
            </div>

            {/* Right Side / Top Bar on mobile: Interactive Level Rail */}
            <div className="floors__rail">
              <button
                type="button"
                className="floors__arrow"
                onClick={() => goToMobile(mobileCurrentIndex - 1)}
                disabled={mobileCurrentIndex === 0}
                aria-label="Previous level"
              >
                <Icon name="arrow-right" size={18} className="-rotate-90" />
              </button>

              <div className="my-1">
                <FloorMark
                  activeLevel={mobileCurrentIndex + 1}
                  size={104}
                  tone="dark"
                  className="floors__mark transition-transform duration-300 hover:scale-105"
                />
              </div>

              <ul className="floors__nav">
                {slides.map((slide, idx) => {
                  const isActive = idx === mobileCurrentIndex;
                  return (
                    <li key={slide.title}>
                      <button
                        type="button"
                        onClick={() => goToMobile(idx)}
                        aria-current={isActive ? "true" : "false"}
                        aria-label={`${slide.level}: ${slide.title}`}
                      >
                        <span className="label">{slide.title}</span>
                        <span className="n">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                className="floors__arrow"
                onClick={() => goToMobile(mobileCurrentIndex + 1)}
                disabled={mobileCurrentIndex === slides.length - 1}
                aria-label="Next level"
              >
                <Icon name="arrow-right" size={18} className="rotate-90" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
