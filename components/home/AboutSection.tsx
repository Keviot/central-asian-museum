import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

export type AboutHighlight = {
  icon: IconName;
  title: string;
  description: string;
};

export type AboutSectionProps = {
  kicker?: string;
  title?: string;
  description?: string;
  secondaryDescription?: string;
  buttonLabel?: string;
  buttonHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  badgeLabel?: string;
  badgeSublabel?: string;
  highlights?: AboutHighlight[];
};

const defaultHighlights: AboutHighlight[] = [
  {
    icon: "landmark",
    title: "Architectural Marvels",
    description: "Centuries of glazed tile mastery, azure domes, and madrasa craft.",
  },
  {
    icon: "sparkles",
    title: "Silk Road Textiles",
    description: "Exquisite hand-dyed Suzani tapestries, silks, and nomadic regalia.",
  },
  {
    icon: "book-open",
    title: "Preserved Manuscripts",
    description: "Rare astronomical charts, trade route maps, and poetic codices.",
  },
];

export function AboutSection({
  kicker = "About The Museum",
  title = "A Living Sanctuary of Silk Road Art & Heritage",
  description = "Nestled at the historic crossroads of East and West, the Central Asian Museum preserves and illuminates over two millennia of creative genius. From the monumental azure-tiled architecture of Samarkand and Bukhara to delicate Suzani embroideries and intricate nomadic jewelry, our galleries celebrate the vibrant cultures shaped by the Silk Road.",
  secondaryDescription = "Through immersive exhibitions, scholarly research, and hands-on conservation programs, we invite visitors to explore the stories, craftsmanship, and enduring traditions that continue to inspire our world today.",
  buttonLabel = "Learn More",
  buttonHref = "/about",
  imageSrc = "/images/about/museum-about-gallery.jpg",
  imageAlt = "Illuminated galleries of the Central Asian Museum featuring ceramics and Suzani textiles",
  badgeLabel = "Permanent Collection",
  badgeSublabel = "Over 10,000 Rare Artifacts",
  highlights = defaultHighlights,
}: AboutSectionProps) {
  return (
    <section className="relative overflow-hidden bg-bg py-20 sm:py-24 md:py-28 lg:py-32 border-b border-border-subtle">
      {/* Subtle architectural background texture accent */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-palette-sand/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-palette-rose/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start lg:col-span-6 xl:col-span-6">
            {/* Section Kicker */}
            <div className="mb-4 inline-flex items-center gap-3">
              <span
                className="h-px w-8 bg-primary"
                aria-hidden="true"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary md:text-[12px]">
                {kicker}
              </p>
            </div>

            {/* Main Title */}
            <h2 className="font-heading text-[32px] font-medium leading-[1.12] tracking-[-0.01em] text-heading sm:text-[40px] md:text-[46px] lg:text-[50px] xl:text-[54px]">
              {title}
            </h2>

            {/* Description Paragraphs */}
            <p className="mt-5 text-[15px] font-normal leading-relaxed text-body sm:text-[16px] md:mt-6 md:text-[17px]">
              {description}
            </p>
            {secondaryDescription && (
              <p className="mt-3 text-[14px] font-normal leading-relaxed text-muted sm:text-[15px] md:mt-4">
                {secondaryDescription}
              </p>
            )}

            {/* Highlights Grid */}
            <div className="mt-8 grid w-full grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-3 sm:gap-6">
              {highlights.map((item) => (
                <div key={item.title} className="flex flex-col">
                  <div className="flex items-center gap-2 text-palette-amber">
                    <Icon name={item.icon} size={18} />
                    <span className="font-heading text-[16px] font-semibold text-heading">
                      {item.title}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-normal text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Learn More Button */}
            <div className="mt-9 sm:mt-10">
              <Button href={buttonHref} variant="primary" icon="arrow-right" size="md">
                {buttonLabel}
              </Button>
            </div>
          </div>

          {/* Right Column: Museum Gallery Image */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto w-full max-w-145 lg:max-w-none">
              {/* Outer decorative museum frame */}
              <div
                className="absolute -inset-3 rounded-md border border-palette-sand/60 bg-bg-secondary/50 sm:-inset-4"
                aria-hidden="true"
              />

              {/* Main Image Card */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-[3px] border border-border bg-bg-secondary shadow-[0_16px_40px_-12px_rgba(40,36,33,0.12)]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px)"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle gradient overlay at base for badge contrast */}
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Floating Aesthetic Museum Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
                  <div className="flex items-center gap-3 rounded-[3px] border border-white/20 bg-surface-dark/90 px-4 py-3 text-white backdrop-blur-md shadow-lg sm:px-5 sm:py-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-palette-amber text-white">
                      <Icon name="compass" size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-palette-sand">
                        {badgeLabel}
                      </p>
                      <p className="font-heading text-[16px] font-medium text-white sm:text-[18px]">
                        {badgeSublabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
