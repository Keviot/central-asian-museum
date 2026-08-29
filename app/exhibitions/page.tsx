import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ExhibitionsExplorer } from "@/components/exhibitions/ExhibitionsExplorer";

export const metadata: Metadata = {
  title: "Exhibitions | Central Asian Museum",
  description:
    "Explore current, upcoming, and special exhibitions celebrating Silk Road gold, Timurid architecture, and nomadic Suzani textiles.",
};

export default function ExhibitionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header variant="solid" />

      <main className="flex-1">
        {/* Exhibitions Hero Section */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-16 md:py-24">
          <div
            className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-palette-amber/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-palette-lapis/15 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            {/* Breadcrumb */}
            <nav
              className="mb-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-heading transition-colors">
                Home
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-sage" />
              <span className="text-heading font-medium">Exhibitions</span>
            </nav>

            <div className="max-w-200">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary md:text-[12px]">
                  Special & Retrospective Programming
                </p>
              </div>

              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                Current & Special Exhibitions
              </h1>

              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                From monumental Timurid tile reconstructions to ancient Bactrian gold jewelry, discover our rotating curatorial galleries and special retrospectives.
              </p>
            </div>
          </Container>
        </section>

        {/* Dynamic Exhibitions Explorer Section with Search & Filter Tabs */}
        <section className="py-16 md:py-24">
          <Container>
            <ExhibitionsExplorer />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

