import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { collectionsData } from "@/lib/collections";

export function CollectionsSection() {
  const homeItems = collectionsData.filter((item) => item.featuredOnHome);

  const [
    ceramicItem,
    tileItem,
    suzaniItem,
    goldItem,
    manuscriptItem,
    chapanItem,
  ] = homeItems;

  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-20 sm:py-24 md:py-28 lg:py-32">
      {/* Subtle Background Glows */}
      <div
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-palette-amber/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-palette-sand/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header with Actions */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            kicker="Permanent & Archival Holdings"
            title="Masterpieces of the Silk Road"
            description="Explore iconic works of craftsmanship, sacred geometry, and nomadic luxury preserved across our twelve permanent galleries."
          />

          <div className="shrink-0 pb-2">
            <Button href="/collections" variant="outline" icon="arrow-right" size="md">
              View All Collections
            </Button>
          </div>
        </div>

        {/* Asymmetrical Collage Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Tile 1: Tall Ceramic Hero Tile (Left 4 cols, spans high) */}
          {ceramicItem && (
            <div className="lg:col-span-4 min-h-110 sm:min-h-125 lg:min-h-155 flex">
              <CollectionCard
                item={ceramicItem}
                className="w-full h-full"
                priority
              />
            </div>
          )}

          {/* Right Top Block (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8">
            {/* Tile 2: Wide Panoramic Architectural Tile */}
            {tileItem && (
              <div className="min-h-70 sm:min-h-80 lg:min-h-85">
                <CollectionCard
                  item={tileItem}
                  className="w-full h-full"
                />
              </div>
            )}

            {/* Split Sub-row for Tile 3 (Suzani) & Tile 4 (Bactrian Gold) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {suzaniItem && (
                <div className="min-h-80 sm:min-h-85">
                  <CollectionCard
                    item={suzaniItem}
                    className="w-full h-full"
                  />
                </div>
              )}

              {goldItem && (
                <div className="min-h-80 sm:min-h-85">
                  <CollectionCard
                    item={goldItem}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Lower Row: Asymmetric 7 cols (Manuscript) + 5 cols (Chapan) */}
          {manuscriptItem && (
            <div className="lg:col-span-7 min-h-90 sm:min-h-100">
              <CollectionCard
                item={manuscriptItem}
                className="w-full h-full"
              />
            </div>
          )}

          {chapanItem && (
            <div className="lg:col-span-5 min-h-90 sm:min-h-100">
              <CollectionCard
                item={chapanItem}
                className="w-full h-full"
              />
            </div>
          )}
        </div>


      </Container>
    </section>
  );
}
