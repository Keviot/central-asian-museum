import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us | Central Asian Museum",
  description:
    "Learn about the mission, history, and curatorial vision of the Central Asian Museum, preserving two millennia of Silk Road art, architecture, and craftsmanship.",
};

type PillarItem = {
  icon: IconName;
  title: string;
  subtitle: string;
  description: string;
};

const pillars: PillarItem[] = [
  {
    icon: "landmark",
    title: "Monumental Architecture",
    subtitle: "Tilecraft & Dome Engineering",
    description:
      "Documenting and preserving the intricate geometric tilework, muqarnas vaults, and azure domes that defined the grand madrasas of Samarkand, Bukhara, and Khiva.",
  },
  {
    icon: "sparkles",
    title: "Suzani & Nomadic Textiles",
    subtitle: "Fiber Arts & Natural Dyes",
    description:
      "A world-renowned archive of hand-embroidered wedding tapestries, nomadic saddlecloths, ikat silks, and ceremonial robes woven across the Fergana Valley and steppe.",
  },
  {
    icon: "compass",
    title: "Ceramics & Metallurgy",
    subtitle: "Bronze, Lapis & Glazed Pottery",
    description:
      "Centuries of ceramic ingenuity featuring vibrant cobalt slips, turquoise glazes, engraved bronze astrolabes, and filigree gold jewelry from ancient Sogdiana.",
  },
  {
    icon: "book-open",
    title: "Manuscripts & Scholarly Lore",
    subtitle: "Astronomy, Poetry & Cartography",
    description:
      "Safeguarding illuminated manuscripts, Ulug Beg observatory calculations, medical treaties by Ibn Sina, and trade route maps inscribed along the caravan routes.",
  },
];

const stats = [
  { value: "10,000+", label: "Preserved Artifacts", note: "Spanning 2,200 years of history" },
  { value: "12", label: "Permanent Galleries", note: "Curated with modern immersion" },
  { value: "45+", label: "Global Partner Institutions", note: "Collaborative research & loans" },
  { value: "250K+", label: "Annual Visitors", note: "Scholars, students, and travelers" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header variant="solid" />

      <main className="flex-1">
        {/* About Hero / Breadcrumb Section */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-16 md:py-24">
          <div
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-heading transition-colors">
                Home
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-sage" />
              <span className="text-heading font-medium">About Us</span>
            </nav>

            <div className="max-w-200">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary md:text-[12px]">
                  Established 1994
                </p>
              </div>

              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                Guardians of Silk Road Heritage & Creative Legacy
              </h1>

              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                The Central Asian Museum exists to preserve, study, and celebrate the rich mosaic of civilizations that flourished at the historic crossroads of Asia, Europe, and the Middle East.
              </p>
            </div>
          </Container>
        </section>

        {/* Narrative & Visual Story Section */}
        <section className="py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
              {/* Left narrative */}
              <div className="lg:col-span-6">
                <SectionHeading
                  kicker="Our Founding Vision"
                  title="Where Trade Routes Sparked Enduring Artistry"
                  description="For centuries, the Silk Road was not simply a conduit of precious trade; it was a grand cultural crucible where ideas, aesthetic philosophies, and artisanal secrets coalesced."
                />

                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                  <p>
                    Founded through a coalition of Central Asian historians, master craftsmen, and international heritage organizations, our museum opened its doors to provide a permanent home for treasures scattered across caravanserais, madrasas, and remote mountain vaults.
                  </p>
                  <p>
                    Today, our curators work in close partnership with regional restoration guilds, ensuring that ancient techniques in cobalt pottery glazing, natural indigo dying, and wood carving are not merely displayed behind glass, but kept vibrantly alive for future generations.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 border-l-2 border-palette-amber pl-5">
                  <p className="font-heading italic text-[18px] text-heading md:text-[20px]">
                    &ldquo;To understand Central Asia is to witness how the convergence of diverse peoples produces timeless beauty.&rdquo;
                  </p>
                </div>
              </div>

              {/* Right image with museum framing */}
              <div className="lg:col-span-6">
                <div className="relative mx-auto w-full max-w-155 lg:max-w-none">
                  <div
                    className="absolute -inset-3 rounded-md border border-palette-sand/60 bg-bg-secondary/50 sm:-inset-4"
                    aria-hidden="true"
                  />
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-[3px] border border-border shadow-lg">
                    <Image
                      src="/images/about/museum-about-hero.jpg"
                      alt="Curated Central Asian ceramics and blue tilework exhibition hall"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[12px] text-muted">
                    <span>Gallery VI: Ceramic Masters of Bukhara & Samarkand</span>
                    <span className="text-palette-amber font-medium">Permanent Hall</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Four Curatorial Pillars */}
        <section className="border-t border-border-subtle bg-bg-secondary py-20 md:py-28">
          <Container>
            <SectionHeading
              kicker="Curatorial Pillars"
              title="Four Realms of Cultural Mastery"
              description="Our permanent collections are organized into four dedicated galleries, each reflecting a pinnacle of Central Asian craftsmanship."
              align="center"
              className="mx-auto"
            />

            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="group flex flex-col justify-between rounded-sm border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-btn-bg hover:shadow-md"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-[3px] bg-palette-sand/40 text-palette-wine transition-colors group-hover:bg-btn-bg group-hover:text-white">
                      <Icon name={pillar.icon} size={24} />
                    </div>

                    <h3 className="mt-6 font-heading text-[22px] font-medium text-heading">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-palette-amber">
                      {pillar.subtitle}
                    </p>

                    <p className="mt-4 text-[14px] leading-relaxed text-body">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border-subtle">
                    <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-btn-bg transition-colors group-hover:underline">
                      <span>Explore Gallery</span>
                      <Icon name="arrow-right" size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Stats & Preservation Impact */}
        <section className="bg-surface-dark py-18 text-white md:py-24">
          <Container>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col border-l border-white/15 pl-6"
                >
                  <p className="font-heading text-[44px] font-medium tracking-tight text-palette-sand sm:text-[52px]">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-heading text-[18px] font-medium text-white">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-[13px] text-white/60">
                    {stat.note}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Visit & Exploration CTA */}
        <section className="border-t border-border bg-bg py-20 md:py-28">
          <Container className="text-center">
            <div className="mx-auto max-w-180">
              <div className="mb-4 inline-flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary md:text-[12px]">
                  Plan Your Experience
                </p>
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
              </div>

              <h2 className="font-heading text-[34px] font-medium text-heading sm:text-[44px] md:text-[50px]">
                Witness Two Millennia of Silk Road Wonders
              </h2>

              <p className="mt-5 text-[15px] leading-relaxed text-body md:text-[17px]">
                Whether you are exploring our world-renowned Suzani textiles, attending a scholarly colloquium, or admiring our architectural scale models, an unforgettable journey awaits.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button href="/collections" variant="primary" icon="arrow-right">
                  Explore Collections
                </Button>
                <Button href="/contact" variant="outline">
                  Plan Your Visit
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
