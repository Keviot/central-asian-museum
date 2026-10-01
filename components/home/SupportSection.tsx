import Link from "next/link";
import { Container } from "@/components/ui/Container";

export type SupportCard = {
  kicker: string;
  title: string;
  text: string;
  href: string;
};

export const defaultSupportCards: SupportCard[] = [
  {
    kicker: "Give",
    title: "Donate to the Museum",
    text: "Help care for the collection and keep the museum open to the community.",
    href: "/contact#donate",
  },
  {
    kicker: "Visit",
    title: "Group & School Visits",
    text: "Arrange a visit for a school, college or tour group.",
    href: "/contact?intent=visits#visit",
  },
  {
    kicker: "Research",
    title: "Research Access",
    text: "Enquire about the collection and the Trans-Himalayan Research Library.",
    href: "/contact?intent=research#visit",
  },
];

export type SupportSectionProps = {
  title?: string;
  tbdNote?: string;
  cards?: SupportCard[];
};

export function SupportSection({
  title = "Ways to support",
  tbdNote,
  cards = defaultSupportCards,
}: SupportSectionProps) {
  return (
    <section
      id="support"
      className="relative overflow-hidden border-b border-border-subtle bg-bg py-20 sm:py-24 md:py-28 lg:py-32"
    >
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
        {/* Section Header: Left Title + Right TBD Badge */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-baseline border-b border-border-subtle/60 pb-8 mb-12">
          <h2 className="font-heading text-[38px] font-medium text-heading sm:text-[48px] md:text-[54px] leading-none tracking-[-0.01em]">
            {title}
          </h2>

          {tbdNote && (
            <p className="text-[14px] sm:text-[15px] text-body font-normal">
              <mark className="tbd" title="Needs client input">
                TBD: {tbdNote}
              </mark>
            </p>
          )}
        </div>

        {/* Enclosed 3-Column Card Grid Container */}
        <div className="border border-palette-sand/70 bg-bg rounded-xs shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {cards.map((c, index) => {
              const isNotLast = index < cards.length - 1;

              return (
                <Link
                  key={c.title}
                  href={c.href}
                  className={`group relative flex flex-col justify-between p-7 sm:p-8 transition-colors duration-300 hover:bg-palette-sand/20 cursor-pointer select-none ${
                    isNotLast
                      ? "border-b border-palette-sand/70 md:border-b-0 md:border-r md:border-palette-sand/70"
                      : ""
                  }`}
                >
                  <div>
                    {/* Category Kicker */}
                    <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] text-palette-amber block">
                      {c.kicker}
                    </span>

                    {/* Main Headline */}
                    <h3 className="mt-2.5 font-heading text-[19px] sm:text-[21px] font-semibold text-heading leading-snug tracking-tight truncate group-hover:text-palette-amber transition-colors">
                      {c.title}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2.5 text-[13px] leading-relaxed text-body line-clamp-2">
                      {c.text}
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
