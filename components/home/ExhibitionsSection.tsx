import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ExhibitionCard } from "@/components/exhibitions/ExhibitionCard";
import { exhibitionsData, type ExhibitionItem } from "@/lib/exhibitions";

type ExhibitionsSectionProps = {
  kicker?: string;
  title?: string;
  description?: string;
  items?: ExhibitionItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
};

export function ExhibitionsSection({
  kicker = "Special & Retrospective Galleries",
  title = "Curated Exhibitions",
  description = "Immerse yourself in featured galleries, seasonal retrospectives, and digital art installations tracing Central Asian heritage.",
  items = exhibitionsData,
  viewAllHref = "/exhibitions",
  viewAllLabel = "Explore More",
}: ExhibitionsSectionProps) {
  const displayItems = items
    .filter((item) => item.featuredOnHome !== false)
    .slice(0, 4);

  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-bg py-20 sm:py-24 md:py-28 lg:py-32">
      {/* Subtle Archival Glow Accents */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-palette-amber/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-palette-sand/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header with Top Right Action */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            kicker={kicker}
            title={title}
            description={description}
          />

          <div className="shrink-0 pb-2">
            <Button
              href={viewAllHref}
              variant="outline"
              icon="arrow-right"
              size="md"
            >
              {viewAllLabel}
            </Button>
          </div>
        </div>

        {/* Curatorial Editorial 2-Column Catalog Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {displayItems.map((exhibition) => (
            <ExhibitionCard
              key={exhibition.id}
              exhibition={exhibition}
              href="/exhibitions"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
