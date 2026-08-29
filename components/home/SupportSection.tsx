import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { supportIntentsData, type SupportIntentItem } from "@/lib/support";

type SupportSectionProps = {
  kicker?: string;
  title?: string;
  description?: string;
  items?: SupportIntentItem[];
};

export function SupportSection({
  kicker = "Ways to Give & Engage",
  title = "Support the Central Asian Museum",
  description = "Preserve two millennia of Silk Road heritage through annual memberships, conservation philanthropy, guided group visits, and scholarly research partnerships.",
  items = supportIntentsData,
}: SupportSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-bg py-20 sm:py-24 md:py-28 lg:py-32">
      {/* Subtle Archival Glow Accents */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-palette-amber/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-palette-sand/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            kicker={kicker}
            title={title}
            description={description}
          />

          <div className="shrink-0 pb-2">
            <Button
              href="/contact"
              variant="outline"
              icon="arrow-right"
              size="md"
            >
              Contact Support Office
            </Button>
          </div>
        </div>

        {/* Intent Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between pt-5 border-t border-palette-sand/60 transition-all duration-300"
            >
              <div>
                {/* Top Stylized Accent Bar */}
                <div className="flex items-center gap-2 mb-4" aria-hidden="true">
                  <span className="h-[2px] w-8 bg-palette-amber transition-all duration-500 group-hover:w-14" />
                  <span className="h-px flex-1 bg-border-subtle/40" />
                </div>

                {/* Icon Badge & Kicker Header */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-palette-amber/40 bg-palette-amber/15 text-palette-amber transition-colors duration-300 group-hover:bg-palette-amber/25">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <div>
                    <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-amber">
                      {item.kicker}
                    </p>
                    <h3 className="font-heading text-[22px] font-medium leading-[1.2] text-heading sm:text-[24px] group-hover:text-palette-amber transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Intent Description */}
                <p className="mt-3 text-[14px] leading-relaxed text-body pl-0.5">
                  {item.description}
                </p>
              </div>

              {/* Action Button Linking to Contact Page with Query Param */}
              <div className="mt-6 pt-3 border-t border-border-subtle/40 flex items-center justify-between">
                <Button
                  href={`/contact?intent=${item.intentKey}`}
                  variant="primary"
                  size="sm"
                  icon="arrow-right"
                >
                  {item.ctaLabel}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
