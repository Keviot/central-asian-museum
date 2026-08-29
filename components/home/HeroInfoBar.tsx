import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

type HeroInfoBarProps = {
  hoursTitle?: string;
  hoursDetail?: string;
  locationTitle?: string;
  locationDetail?: string;
  contactLabel?: string;
  contactHref?: string;
  className?: string;
};

export function HeroInfoBar({
  hoursTitle = "Museum Hours",
  hoursDetail = "9:30 AM – 6:00 PM, Mon – Sat",
  locationTitle = "Museum Location",
  locationDetail = "Sheynam, Main Market, Leh, Ladakh",
  contactLabel = "Contact Us",
  contactHref = "/contact",
  className = "",
}: HeroInfoBarProps) {
  return (
    <section
      aria-label="Museum Quick Information"
      className={`relative z-20 w-full bg-surface-dark text-white shadow-xl ${className}`}
    >
      {/* Top Silk Road Gold Accent Line */}
      <div
        className="h-[2px] w-full bg-gradient-to-r from-palette-amber via-palette-sand to-palette-amber opacity-85"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] px-6 py-5 md:px-10 lg:px-14 lg:py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          {/* Info Columns Wrapper */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:flex-1 lg:items-center lg:gap-10 xl:gap-14">
            
            {/* 1. Museum Hours Item (Silk Road Amber Accent) */}
            <div className="group flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-palette-amber/40 bg-palette-amber/15 text-palette-amber transition-colors duration-300 group-hover:bg-palette-amber/25">
                <Icon name="clock" size={20} />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-sand">
                    {hoursTitle}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-palette-sage/20 px-2 py-0.5 text-[9px] font-medium text-palette-sand border border-palette-sage/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open Today
                  </span>
                </div>
                <p className="mt-1 font-sans text-[14px] font-medium text-white sm:text-[15px]">
                  {hoursDetail}
                </p>
              </div>
            </div>

            {/* Vertical Gradient Separator for Large Screens */}
            <div
              className="hidden h-10 w-px bg-gradient-to-b from-transparent via-palette-sand/25 to-transparent lg:block"
              aria-hidden="true"
            />

            {/* 2. Museum Location Item (Samarkand Lapis Blue Accent) */}
            <div className="group flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-palette-lapis/40 bg-palette-lapis/20 text-palette-lapis transition-colors duration-300 group-hover:bg-palette-lapis/30">
                <Icon name="map-pin" size={20} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-sand">
                  {locationTitle}
                </span>
                <p className="mt-1 font-sans text-[14px] font-medium text-white sm:text-[15px]">
                  {locationDetail}
                </p>
              </div>
            </div>

          </div>

          {/* 3. Contact Us CTA Button Section */}
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

      {/* Subtle Bottom Border */}
      <div className="h-px w-full bg-border-subtle/30" aria-hidden="true" />
    </section>
  );
}
