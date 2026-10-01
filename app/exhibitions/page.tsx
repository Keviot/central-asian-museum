import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ExhibitionsExplorer } from "@/components/exhibitions/ExhibitionsExplorer";
import { exhibitionsData } from "@/lib/exhibitionsData";

import { prisma } from "@/lib/prisma";
import type { ExhibitionItem } from "@/lib/exhibitionsData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Exhibitions | Central Asian Museum, Leh",
  description:
    "Current and previous exhibitions at the Central Asian Museum, Tsas Soma Garden, Leh.",
};

export default async function ExhibitionsPage() {
  let items: ExhibitionItem[] = exhibitionsData.items;

  try {
    const dbExhibitions = await prisma.exhibition.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (dbExhibitions.length > 0) {
      items = dbExhibitions.map((ex) => ({
        id: ex.id,
        slug: ex.slug,
        status: ex.badgeLabel || (ex.status === "Current" ? "Now on" : "Past exhibition"),
        title: ex.title,
        dates: ex.dateRange,
        where: ex.location,
        curator: ex.curator,
        image: ex.imageSrc,
        alt: ex.imageAlt || ex.title,
        excerpt: ex.subtitle || ex.description.slice(0, 140) + "...",
        body: [ex.description, ex.curatorialEssay].filter(Boolean),
        now: ex.status === "Current" || (ex.badgeLabel ? ex.badgeLabel.toLowerCase().includes("current") || ex.badgeLabel.toLowerCase().includes("now on") : false),
      }));
    }
  } catch (error) {
    console.error("Failed to fetch exhibitions from DB:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header variant="solid" />

      <main className="flex-1">
        {/* Exhibitions Page Hero: no eyebrow */}
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
              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                {exhibitionsData.heading}
              </h1>

              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                {exhibitionsData.page_lead}
              </p>
            </div>
          </Container>
        </section>

        {/* Dynamic Exhibitions Listing Section */}
        <section id="list" className="py-16 md:py-24">
          <Container>
            <ExhibitionsExplorer initialItems={items} />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
