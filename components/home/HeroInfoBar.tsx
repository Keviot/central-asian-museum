"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

type HeroInfoBarProps = {
  hoursTitle?: string;
  hoursDetail?: ReactNode;
  locationTitle?: string;
  locationDetail?: ReactNode;
  entryFeeTitle?: string;
  entryFee?: string;
  entryFeeSpoken?: string;
  entryFeeNote?: string;
  contactLabel?: string;
  contactHref?: string;
  className?: string;
};

export function HeroInfoBar({
  hoursTitle = "Museum Hours",
  locationTitle = "Museum Location",
  locationDetail = "Tsas Soma Garden, Leh, Ladakh",
  entryFeeTitle = "Entry Fees",
  contactLabel = "Contact Us",
  contactHref = "/contact",
  className = "",
}: HeroInfoBarProps) {
  const [chosenSeason, setChosenSeason] = useState<"summer" | "winter">("summer");
  const [previewSeason, setPreviewSeason] = useState<"summer" | "winter" | null>(null);

  const activeSeason = previewSeason ?? chosenSeason;

  return (
    <section
      id="visit-bar"
      aria-label="Museum Quick Information"
      className={`relative z-20 w-full bg-surface-dark text-white shadow-xl ${className}`}
    >
      {/* Top Silk Road Gold Accent Line */}
      <div
        className="h-0.5 w-full bg-linear-to-r from-palette-amber via-palette-sand to-palette-amber opacity-85"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-360 px-6 py-5 md:px-10 lg:px-14 lg:py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          {/* Info Columns Wrapper */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:flex-1 lg:items-center lg:gap-10 xl:gap-14">
            
            {/* 1. Museum Hours Item with Summer / Winter Switch */}
            <div className="group flex items-start gap-4" data-hours>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-palette-amber/40 bg-palette-amber/15 text-palette-amber transition-colors duration-300 group-hover:bg-palette-amber/25">
                <Icon name="clock" size={20} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-sand">
                  {hoursTitle}
                </span>
                <p className="hours-time mt-1 font-sans text-[14px] font-medium text-white sm:text-[15px]" aria-live="polite">
                  <span
                    className={`hours-time__item ${activeSeason === "summer" ? "is-active" : ""}`}
                    data-season="summer"
                  >
                    10 am to 6 pm{" "}
                    <small className="ml-1 text-[11px] font-normal text-white/55">
                      May to October
                    </small>
                  </span>
                  <span
                    className={`hours-time__item ${activeSeason === "winter" ? "is-active" : ""}`}
                    data-season="winter"
                  >
                    10 am to 5 pm{" "}
                    <small className="ml-1 text-[11px] font-normal text-white/55">
                      Winter
                    </small>
                  </span>
                </p>
                <div
                  className={`hours-switch ${activeSeason === "winter" ? "is-winter" : ""}`}
                  role="group"
                  aria-label="Season"
                  onMouseLeave={() => setPreviewSeason(null)}
                >
                  <button
                    type="button"
                    className={`hours-switch__opt ${activeSeason === "summer" ? "is-active" : ""}`}
                    data-season-btn="summer"
                    aria-pressed={activeSeason === "summer"}
                    onClick={() => {
                      setChosenSeason("summer");
                      setPreviewSeason(null);
                    }}
                    onMouseEnter={() => setPreviewSeason("summer")}
                  >
                    <Icon name="sun" size={13} />
                    <span>Summer</span>
                  </button>
                  <button
                    type="button"
                    className={`hours-switch__opt ${activeSeason === "winter" ? "is-active" : ""}`}
                    data-season-btn="winter"
                    aria-pressed={activeSeason === "winter"}
                    onClick={() => {
                      setChosenSeason("winter");
                      setPreviewSeason(null);
                    }}
                    onMouseEnter={() => setPreviewSeason("winter")}
                  >
                    <Icon name="snowflake" size={13} />
                    <span>Winter</span>
                  </button>
                  <span className="hours-switch__thumb" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Vertical Gradient Separator */}
            <div
              className="hidden h-10 w-px bg-linear-to-b from-transparent via-palette-sand/25 to-transparent lg:block"
              aria-hidden="true"
            />

            {/* 2. Museum Location Item */}
            <a
              href="https://maps.app.goo.gl/CHsSHHyECqD3nZUe7"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 transition-opacity hover:opacity-90"
              title="View Central Asian Museum on Google Maps"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-palette-lapis/40 bg-palette-lapis/20 text-palette-lapis transition-colors duration-300 group-hover:bg-palette-lapis/30">
                <Icon name="map-pin" size={20} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-sand">
                  {locationTitle}
                </span>
                <div className="mt-1 font-sans text-[14px] font-medium text-white sm:text-[15px] leading-tight underline decoration-white/40 underline-offset-2 group-hover:decoration-white">
                  {locationDetail}
                </div>
              </div>
            </a>

            {/* Vertical Gradient Separator */}
            <div
              className="hidden h-10 w-px bg-linear-to-b from-transparent via-palette-sand/25 to-transparent lg:block"
              aria-hidden="true"
            />

            {/* 3. Entry Fees Item */}
            <div className="group flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-palette-rose/40 bg-palette-rose/15 text-palette-rose transition-colors duration-300 group-hover:bg-palette-rose/25">
                <Icon name="ticket" size={20} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-sand">
                  {entryFeeTitle}
                </span>
                <p className="mt-1 font-sans text-[14px] font-medium text-white sm:text-[15px]">
                  <span aria-label="50 rupees">₹50</span>{" "}
                  <span className="text-[12px] font-normal text-white/60">
                    Indian nationals
                  </span>
                </p>
                <p className="text-[12px] text-white/60">
                  <span aria-label="30 rupees">₹30</span> students and locals ·{" "}
                  <span aria-label="200 rupees">₹200</span> foreign nationals
                </p>
              </div>
            </div>

          </div>

          {/* 4. Contact Us CTA Button Section */}
          <div className="flex shrink-0 items-center border-t border-white/10 pt-4 lg:border-t-0 lg:pt-0">
            <Button
              href={contactHref}
              variant="primary"
              size="md"
              icon="arrow-right"
              className="w-full shadow-md sm:w-auto hover:brightness-110"
            >
              {contactLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

