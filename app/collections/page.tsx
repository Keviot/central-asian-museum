import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { CollectionsExplorer } from "@/components/collections/CollectionsExplorer";

export const metadata: Metadata = {
  title: "Collections | Central Asian Museum",
  description:
    "Explore over two millennia of Silk Road art, architectural tilework, Suzani textiles, ancient Bactrian gold, and astronomical manuscripts.",
};

const conservationPillars = [
  {
    icon: "sparkles" as const,
    title: "Spectroscopic Analysis",
    description: "Non-destructive XRF and Raman spectroscopy to identify original organic natural dyes and metal alloys.",
  },
  {
    icon: "landmark" as const,
    title: "Guild Craftsmanship",
    description: "Collaborations with hereditary master potters in Rishtan and silk weavers in Margilan.",
  },
  {
    icon: "book-open" as const,
    title: "Open Provenance",
    description: "Full digitization of archaeological excavation journals, trade ledgers, and academic citations.",
  },
];

export default function CollectionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header variant="solid" />

      <main className="flex-1">
        {/* Collections Hero Banner */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-16 md:py-24">
          <div
            className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-palette-amber/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            {/* Breadcrumb Navigation */}
            <nav
              className="mb-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-heading transition-colors">
                Home
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-sage" />
              <span className="text-heading font-medium">Collections</span>
            </nav>

            <div className="max-w-200">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary md:text-[12px]">
                  Permanent Archives & Masterpieces
                </p>
              </div>

              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                Treasures Across the Silk Road Crossroads
              </h1>

              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                Spanning two millennia, our collections illuminate the vibrant synthesis of Hellenistic, Persian, nomadic Steppe, and Islamic civilizations that defined Central Asian history.
              </p>
            </div>
          </Container>
        </section>

        {/* Interactive Explorer & Collage Grid */}
        <section className="py-16 md:py-24">
          <Container>
            <CollectionsExplorer />
          </Container>
        </section>

        {/* Conservation & Curatorial Standards Callout */}
        <section className="border-t border-border-subtle bg-bg-secondary py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-180 text-center">
              <div className="mb-4 inline-flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary md:text-[12px]">
                  Conservation & Research
                </p>
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
              </div>

              <h2 className="font-heading text-[32px] font-medium text-heading sm:text-[42px] md:text-[48px]">
                The Science of Safeguarding Fragile Heritage
              </h2>

              <p className="mt-4 text-[15px] leading-relaxed text-body md:text-[17px]">
                Every textile, ceramic glaze, and parchment leaf in our collection undergoes continuous microscopic monitoring, preventive climate stabilization, and scholarly provenance verification.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {conservationPillars.map((item) => (
                <div
                  key={item.title}
                  className="rounded-sm border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:border-btn-bg hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[3px] bg-palette-sand/40 text-palette-wine">
                    <Icon name={item.icon} size={22} />
                  </div>
                  <h3 className="mt-6 font-heading text-[20px] font-medium text-heading">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-body">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
