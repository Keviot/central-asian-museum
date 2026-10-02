import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/about/Timeline";
import {
  timelineEntries,
  missionData,
  peopleGroups,
} from "@/lib/aboutData";

export const metadata: Metadata = {
  title: "About the Museum | Central Asian Museum, Leh",
  description:
    "The Central Asian Museum in Leh documents and presents the historical connections between Ladakh and the wider Central Asian world.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header variant="solid" />

      <main className="flex-1">
        {/* about.hero */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-12 sm:py-16 md:py-18 lg:py-20">
          <div
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            <div>
              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                A Museum at the Crossroads of Central Asia and Ladakh
              </h1>

              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                The Central Asian Museum in Leh is dedicated to documenting and presenting the historical connections between Ladakh and the wider Central Asian world.
              </p>
            </div>
          </Container>
        </section>

        {/* about.intro */}
        <section id="intro" className="py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <SectionHeading
                  kicker="Who We Are"
                  title="Ladakh's Place in a Larger World"
                />
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                  <p>
                    For centuries, Leh occupied an important position within networks of trade, travel and cultural exchange that connected the Indian subcontinent with Central Asia, Tibet, Kashmir and other regions of the Himalayan and trans-Himalayan world.
                  </p>
                  <p>
                    Merchants, pilgrims, travellers and artisans moved through these routes, bringing with them goods, ideas, languages, beliefs, artistic traditions and material cultures. Leh developed as an important trading centre within these networks, and the town's architecture, communities and material culture continue to reflect this layered history.
                  </p>
                  <p>
                    The museum seeks to make these connections accessible to contemporary audiences by bringing together objects and stories that illustrate Ladakh's place within this larger historical landscape.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="relative mx-auto w-full max-w-155 lg:max-w-none">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-md border border-palette-sand/60 bg-bg-secondary/50 sm:-inset-4"
                  />
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-[3px] border border-border shadow-lg">
                    <Image
                      src="/images/museum-garden-exterior.webp"
                      alt="The Central Asian Museum tower in the Tsas Soma Garden"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4 flex items-center justify-between text-[12px] text-muted">
                    <span>The Central Asian Museum, Tsas Soma Garden, Leh</span>
                    <span className="text-palette-amber font-medium">The Museum</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* about.connection */}
        <section
          id="connection"
          className="border-t border-border-subtle bg-bg-secondary py-14 sm:py-16 md:py-18 lg:py-20"
        >
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionHeading
                  kicker="Leh and the Central Asian Connection"
                  title="Where the Routes Met"
                />
                <div className="mt-8 flex items-center gap-4 border-l-2 border-palette-amber pl-5">
                  <p className="font-heading italic text-[18px] text-heading md:text-[20px]">
                    Leh not as an isolated Himalayan settlement, but as part of a much wider network of movement and exchange.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                <p>
                  Leh's location at the intersection of several historic routes played an important role in shaping the town. The town was connected through routes leading towards Kashmir and the plains of the Indian subcontinent, across the Karakoram towards Central Asia, and eastwards towards Tibet.
                </p>
                <p>
                  The historic trade in pashmina, wool, textiles, carpets, spices, tea, precious stones and other commodities brought merchants and travellers from different regions to Leh. These encounters also resulted in exchanges of artistic techniques, architectural traditions, foodways, clothing, languages and religious practices.
                </p>
                <p>
                  The Central Asian Museum provides a space to explore this history and to understand Leh not as an isolated Himalayan settlement, but as part of a much wider network of movement and exchange.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* about.site-history */}
        <section id="site-history" className="py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7 lg:col-start-6 lg:order-2">
                <SectionHeading
                  kicker="The History of the Site"
                  title="Where the Caravans Once Rested"
                />
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                  <p>
                    The museum is located in the Tsas Soma Garden, within the historic urban fabric of Leh, where the oldest mosque of Leh town is also situated.
                  </p>
                  <p>
                    The site on which the museum stands has its own history. Before becoming a museum, the property was the resting ground of the trade caravans. Its location within the historic town is significant, as it places the museum within the same landscape through which merchants and travellers once moved.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-4 lg:order-1">
                <figure className="relative mx-auto w-full max-w-110 lg:max-w-none">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-md border border-palette-sand/60 bg-bg-secondary/50 sm:-inset-4"
                  />
                  <Image
                    src="/images/tower-exterior-stairs.webp"
                    alt="The museum tower with its stone stairway"
                    width={1023}
                    height={1537}
                    className="portrait-full relative block w-full rounded-[3px] border border-border shadow-lg h-auto aspect-1023/1537 object-contain"
                  />
                  <figcaption className="relative mt-4 flex items-center justify-between text-[12px] text-muted">
                    <span>The museum tower and stairway</span>
                    <a
                      href="https://maps.app.goo.gl/CHsSHHyECqD3nZUe7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-palette-amber font-medium hover:underline"
                      title="View Tsas Soma Garden on Google Maps"
                    >
                      Tsas Soma Garden
                    </a>
                  </figcaption>
                </figure>
              </div>
            </div>
          </Container>
        </section>

        {/* about.timeline */}
        <section
          id="timeline"
          className="border-t border-border-subtle bg-bg-secondary py-14 sm:py-16 md:py-18 lg:py-20"
        >
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionHeading
                  kicker="How the Museum Came to Be"
                  title="From Caravan Ground to Museum"
                />
                <p className="mt-6 text-[15px] leading-relaxed text-body md:text-[16px]">
                  For centuries, Ladakh has been an important crossroads of Central Asian caravan trade. Like few other regions, Ladakh's culture has been shaped by the transmission of goods and ideas from such disparate regions as Tibet, Yarkand, Kashmir, Afghanistan and city states like Samarkand and Bukhara, connected by the various branches of the Silk Road.
                </p>
              </div>
              <div className="lg:col-span-7">
                <Timeline entries={timelineEntries} />
              </div>
            </div>
          </Container>
        </section>

        {/* about.ethos */}
        <section id="ethos" className="scroll-mt-24 py-14 sm:py-16 md:py-18 lg:py-20">
          <Container className="text-center">
            <div className="mx-auto max-w-180">
              <div className="mb-3.5 inline-flex items-center justify-center gap-2.5">
                <span aria-hidden="true" className="h-px w-6 bg-primary" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Our Ethos
                </p>
                <span aria-hidden="true" className="h-px w-6 bg-primary" />
              </div>
              <p className="mt-4 font-heading italic text-[26px] leading-[1.22] font-normal text-heading sm:text-[32px] sm:leading-[1.2] md:text-[38px] md:leading-[1.18]">
                “Heritage is not simply a collection of old<br className="hidden sm:inline" />{" "}
                objects. It is a living record of the people,<br className="hidden sm:inline" />{" "}
                communities, journeys and exchanges that have<br className="hidden sm:inline" />{" "}
                shaped a place.”
              </p>
              <p className="mt-8 text-[15px] leading-relaxed text-body md:text-[17px]">
                The museum therefore seeks to connect objects with the stories behind them: who made them, who used them, where they travelled from, how they reached Ladakh and what they tell us about the historical relationships between different communities and regions.
              </p>
            </div>
          </Container>
        </section>

        {/* about.mission */}
        <section
          id="mission"
          className="border-t border-border-subtle bg-bg-secondary py-14 sm:py-16 md:py-18 lg:py-20"
        >
          <Container>
            <SectionHeading
              kicker="Vision & Mission"
              title="What the Museum Aims to Do"
              align="center"
            />
            <p className="mt-6 text-center text-[15px] text-body md:text-[17px]">
              <span className="font-semibold text-heading">Vision:</span>{" "}
              {missionData.vision}
            </p>
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {missionData.aims.map((aim, idx) => (
                <div
                  key={idx}
                  className="rounded-sm border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-btn-bg hover:shadow-md"
                >
                  <p className="font-heading text-[40px] font-medium leading-none text-palette-sand">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-body">
                    {aim}
                  </p>
                </div>
              ))}
              <div className="mission-cta">
                <Link
                  href="/contact#donate"
                  className="mission-cta__btn"
                >
                  <span>Support our mission</span>
                  <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* about.building-teaser — dark band */}
        <section id="building" className="bg-surface-dark py-18 text-white md:py-24">
          <Container>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-[3px] border border-white/15 shadow-lg">
                  <Image
                    src="/images/thf/carpenters-lifting-beam.webp"
                    alt="Ladakhi carpenters lifting a carved timber beam into place inside the tower's stone walls"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="mb-3.5 inline-flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-px w-6 bg-palette-sand" />
                  <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-palette-sand">
                    The Building
                  </p>
                </div>
                <h2 className="font-heading text-[32px] font-medium leading-[1.12] tracking-[-0.01em] text-white sm:text-[40px] md:text-[46px]">
                  A Fortress Tower, Built by Hand
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-white/75 md:text-[17px]">
                  Designed by André Alexander in the shape of a Tibetan-Ladakhi fortress tower with a contemporary edge, the museum was built entirely by hand from local stone, timber and mud, around a carved wooden lantern that connects all four levels.
                </p>
                <div className="mt-9">
                  <Button
                    href="/about/building"
                    variant="primary"
                    size="md"
                    icon="arrow-right"
                    className="hover:brightness-110"
                  >
                    Explore the Building
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* about.people */}
        <section id="people" className="py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionHeading kicker="People" title="How the Museum Is Run" />
              </div>
              <div className="lg:col-span-7 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                <p>
                  The Central Asian Museum is a property of the Anjuman Moin-ul-Islam, which has entrusted its management to a dedicated museum committee responsible for overseeing its functioning, administration and long-term development.
                </p>
                <p>
                  The museum is managed through a collaborative structure that brings together members of the governing committee, advisors and the museum's day-to-day staff. This structure allows the museum to maintain its collections, welcome visitors, organise programmes and exhibitions, and work towards its broader mission of preserving and interpreting the cultural heritage of Ladakh and its connections with Central Asia.
                </p>
                <p>
                  The museum committee provides overall guidance and institutional oversight, while the museum staff are responsible for its daily operations and visitor services.
                </p>
              </div>
            </div>

            {peopleGroups.map((group) => (
              <div key={group.name} className="mt-16">
                <div className="flex flex-col justify-between gap-2 border-b border-border-subtle pb-4 md:flex-row md:items-baseline">
                  <h3 className="font-heading text-[26px] font-medium text-heading md:text-[30px]">
                    {group.name}
                  </h3>
                  {group.intro && (
                    <p className="text-[14px] text-muted">{group.intro}</p>
                  )}
                </div>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {group.roles.map((r, idx) => {
                    const isSingle =
                      r.role === "Director" ||
                      r.role === "General Secretary" ||
                      r.role === "Treasurer";
                    const isDirector = r.role === "Director";

                    const cardContent = (
                      <div
                        className="flex h-full flex-col rounded-sm border border-border bg-surface p-7"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-[3px] bg-palette-sand/40 text-palette-wine">
                          <Icon name={isSingle ? "user" : "users"} size={20} />
                        </div>
                        <h4 className="mt-6 font-heading text-[22px] font-medium text-heading">
                          {r.role}
                        </h4>
                        {Array.isArray(r.name) ? (
                          <ul className="advisors-list">
                            {r.name.map((n, i) => (
                              <li key={i} className="text-[12px] font-semibold tracking-[0.06em] text-palette-amber">
                                {n}
                              </li>
                            ))}
                          </ul>
                        ) : r.name ? (
                          <p className="mt-1 text-[12px] font-semibold tracking-[0.06em] text-palette-amber">
                            {r.name}
                          </p>
                        ) : null}
                        <p className="mt-4 text-[14px] leading-relaxed text-body">
                          {r.description}
                        </p>
                      </div>
                    );

                    if (isDirector) {
                      return (
                        <a
                          key={idx}
                          href="https://www.linkedin.com/in/noor-jahan-5b709aa8/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Director: Dr Noor Jahan Chunka on LinkedIn"
                          className="block transition-none"
                        >
                          {cardContent}
                        </a>
                      );
                    }

                    return <div key={idx}>{cardContent}</div>;
                  })}
                </div>
              </div>
            ))}

            <div className="mt-16 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
              <p>
                Together, the committee and staff work to ensure that the Central Asian Museum remains a well-managed and accessible cultural institution. While each person has a defined role, the functioning of the museum depends on collaboration between the governing committee, professional advisors and the staff who engage with the museum and its visitors every day.
              </p>
              <p>
                The museum's people are central to its identity. Their collective work enables the museum not only to care for its collections, but also to remain connected to the community and to create a welcoming space for learning, research and engagement with Ladakh's rich cultural heritage.
              </p>
            </div>
          </Container>
        </section>

        {/* about.living-museum */}
        <section
          id="living-museum"
          className="border-t border-border bg-bg-secondary py-14 sm:py-16 md:py-18 lg:py-20"
        >
          <Container className="text-center">
            <div className="mx-auto max-w-180">
              <div className="mb-4 inline-flex items-center justify-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-primary" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">
                  A Living Museum
                </p>
                <span aria-hidden="true" className="h-px w-8 bg-primary" />
              </div>
              <h2 className="font-heading text-[34px] font-medium text-heading sm:text-[44px] md:text-[50px]">
                A Space for Conversations About Ladakh's Past, Present and Future
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-body md:text-[17px]">
                The Central Asian Museum is not only a place to look at objects from the past. Through exhibitions, educational programmes, workshops, talks, research and community engagement, the museum seeks to create a space where heritage can be understood as something living and continually evolving.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-body md:text-[17px]">
                Situated in the heart of Leh, the museum invites visitors to explore the historical connections that have shaped the region and to consider how the movement of people, objects and ideas across mountains and borders continues to influence Ladakh today.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button href="/collections" variant="primary" icon="arrow-right">
                  Explore the Collection
                </Button>
                <Button href="/contact#visit" variant="outline">
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
