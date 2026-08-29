import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { supportIntentsData, type SupportIntentItem } from "@/lib/support";

type SupportSectionProps = {
  title?: string;
  subtitle?: string;
  items?: SupportIntentItem[];
};

export function SupportSection({
  title = "Ways to support",
  subtitle = "Choose the way that suits you best.",
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
        {/* Section Header: Left Title + Right Subtitle */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-baseline border-b border-border-subtle/60 pb-8 mb-12">
          <h2 className="font-heading text-[38px] font-medium text-heading sm:text-[48px] md:text-[54px] leading-none tracking-[-0.01em]">
            {title}
          </h2>

          <p className="text-[14px] sm:text-[15px] text-body font-normal">
            {subtitle}
          </p>
        </div>

        {/* Enclosed 3x2 Grid Table Container */}
        <div className="border border-palette-sand/70 bg-bg rounded-xs shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {items.map((item, index) => {
              const isRow1 = index < 3;
              const isCol1Or2 = index % 3 !== 2;
              const isLastItem = index === items.length - 1;

              return (
                <Link
                  key={item.id}
                  href={`/contact?intent=${item.intentKey}`}
                  className={`group relative flex flex-col justify-between p-7 sm:p-8 transition-colors duration-300 hover:bg-palette-sand/20 cursor-pointer select-none ${
                    isRow1
                      ? "border-b border-palette-sand/70"
                      : isLastItem
                      ? ""
                      : "border-b border-palette-sand/70 md:border-b-0"
                  } ${isCol1Or2 ? "md:border-r md:border-palette-sand/70" : ""}`}
                >
                  <div>
                    {/* Category Kicker */}
                    <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] text-palette-amber block">
                      {item.kicker}
                    </span>

                    {/* Main Headline (Single Line) */}
                    <h3 className="mt-2.5 font-heading text-[19px] sm:text-[21px] font-semibold text-heading leading-snug tracking-tight truncate group-hover:text-palette-amber transition-colors">
                      {item.title}
                    </h3>

                    {/* Short Description (Strict 2 Lines) */}
                    <p className="mt-2.5 text-[13px] leading-relaxed text-body line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
