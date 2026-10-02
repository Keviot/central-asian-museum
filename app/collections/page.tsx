import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryIndex } from "@/components/collections/CategoryIndex";
import { collectionsFloors } from "@/lib/collectionsData";

export const metadata: Metadata = {
  title: "The Collection | Central Asian Museum, Leh",
  description:
    "Objects that reflect the movement of people, materials, ideas and traditions across Ladakh and Central Asia, displayed across four floors.",
};

function renderRichText(text: string) {
  const match = text.match(/\{\{TBD:\s*(.*?)\}\}/);
  if (!match) return text;
  const before = text.slice(0, match.index);
  const note = match[1];
  const after = text.slice((match.index ?? 0) + match[0].length);
  return (
    <>
      {before}
      <mark className="tbd" title="Needs client input">
        TBD: {note}
      </mark>
      {after}
    </>
  );
}

export default function CollectionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header variant="solid" />

      <main className="flex-1">
        {/* collections.hero */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-12 sm:py-16 md:py-18 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl"
          />
          <Container className="relative z-10">
            <div>
              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                Objects That Carry the Story of Exchange
              </h1>
              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                The museum&apos;s collection brings together objects that reflect the movement of people, materials, ideas and traditions across Ladakh and Central Asia.
              </p>
            </div>
          </Container>
        </section>

        {/* collections.intro */}
        <section id="intro" className="py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 space-y-4 text-[15px] leading-relaxed text-body md:text-[17px]">
                <p>
                  Rather than viewing these objects only according to their place of origin, the museum is interested in the journeys and relationships they represent.
                </p>
                <p>
                  Many objects carry evidence of exchange. Materials, techniques, forms and motifs travelled across geographical and cultural boundaries, demonstrating the close relationships that existed between Ladakh and the regions beyond its borders.
                </p>
                <div className="mt-8 border-l-2 border-palette-amber pl-5">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-palette-amber">
                    The Lantern
                  </p>
                  <p className="mt-2">
                    The building itself makes the same argument. A carved wooden lantern rises through the centre of the tower, and every gallery is arranged around its opening, so the four floors are always visibly linked. It was conceived as a symbol of the different cultures that live together in Ladakh. The collection follows that idea: objects from Ladakh, Central Asia and Tibet are shown not as separate worlds, but as parts of one connected story.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="relative mx-auto w-full max-w-110">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-md border border-palette-sand/60 bg-bg-secondary/50 sm:-inset-4"
                  />
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-[3px] border border-border shadow-lg">
                    <img
                      alt="Ground floor gallery with a large brass basin on a stone plinth beneath a hanging metal lamp, a carved wooden lattice screen and stone walls"
                      className="object-cover object-top"
                      loading="lazy"
                      src="/images/gallery-ground-basin-lamp.webp"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        transform: "scale(1.18)",
                        transformOrigin: "top center",
                      }}
                    />
                  </div>
                  <div className="relative mt-4 flex items-center justify-between text-[12px] text-muted">
                    <span>Ladakh Section · the brass basin beneath the hanging lamp</span>
                    <span className="text-palette-amber font-medium">Ground Floor</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* collections.categories — typographic index */}
        <CategoryIndex />

        {/* collections.floors */}
        <section id="floors" className="py-20 md:py-28">
          <Container>
            <SectionHeading
              kicker="Floors & Sections"
              title="Four Floors, Four Stories"
              description="The Central Asian Museum is organised across four floors, with each level presenting a distinct aspect of the region's cultural history. Together, the galleries explore Ladakh's own cultural heritage, its historic connections with Central Asia and Tibet, and the archival records that document these histories."
              align="center"
            />

            <div className="mt-16 space-y-20 md:space-y-28">
              {collectionsFloors.map((f, index) => {
                const isEven = (index + 1) % 2 === 0;
                return (
                  <div
                    key={f.anchor}
                    id={f.anchor}
                    className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
                  >
                    <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : ""}`}>
                      <div className="relative mx-auto w-full max-w-155 lg:max-w-none">
                        <div
                          aria-hidden="true"
                          className="absolute -inset-3 rounded-md border border-palette-sand/60 bg-bg-secondary/50 sm:-inset-4"
                        />
                        <div className="relative aspect-4/3 w-full overflow-hidden rounded-[3px] border border-border shadow-lg">
                          <img
                            alt={f.alt}
                            className="object-cover object-center"
                            loading="lazy"
                            src={f.image}
                            style={{ position: "absolute", height: "100%", width: "100%", inset: 0 }}
                          />
                        </div>
                        <div className="relative mt-4 flex items-center justify-between text-[12px] text-muted">
                          <span>{f.name}</span>
                          <span className="text-palette-amber font-medium">{f.floor}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : ""}`}>
                      <div className="flex items-center gap-4">
                        <img
                          className="floor-mark"
                          src={`/images/logo/level-${f.level}.webp`}
                          width={60}
                          height={60}
                          alt={`Level ${f.level} of 4`}
                          loading="lazy"
                        />
                        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-palette-amber">
                          {f.level_label} · {f.floor}
                        </p>
                      </div>
                      <h3 className="mt-4 font-heading text-[30px] font-medium leading-[1.12] text-heading md:text-[40px]">
                        {f.name}
                      </h3>
                      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                        {f.paragraphs.map((p, pIndex) => (
                          <p key={pIndex}>{renderRichText(p)}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* collections.provenance */}
        <section id="provenance" className="border-t border-border-subtle bg-bg-secondary py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionHeading
                  kicker="Provenance"
                  title="Where the Objects Come From"
                />
              </div>
              <div className="lg:col-span-7 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                <p>
                  The museum&apos;s objects come from different regions of Ladakh. Many have been donated and some purchased.
                </p>
                <p>
                  Where available, the museum records information about an object&apos;s maker, owner, place of origin, date, material, function and history of acquisition. Documenting provenance is an ongoing process and forms an important part of the museum&apos;s work.
                </p>
                <p>
                  The museum is committed to responsible documentation and care of its collections and to continuing research into the histories of the objects in its care.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
