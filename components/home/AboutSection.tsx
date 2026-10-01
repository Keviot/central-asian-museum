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
  imageCaption?: string;
  imageTag?: string;
  highlights?: AboutHighlight[];
};

const defaultHighlights: AboutHighlight[] = [
  {
    icon: "mountain",
    title: "Ladakh Section",
    description: "Everyday life, craftsmanship and material culture of Ladakh.",
  },
  {
    icon: "route",
    title: "Central Asian Section",
    description: "Objects that travelled the trade routes across the Karakoram.",
  },
  {
    icon: "lotus",
    title: "Tibetan Section",
    description: "Shared Buddhist traditions, pilgrimage and artistic exchange.",
  },
];

export function AboutSection({
  kicker = "About the Museum",
  title = "Leh, at the Heart of a Wider World",
  description = "The Central Asian Museum in Leh is dedicated to documenting and presenting the historical connections between Ladakh and the wider Central Asian world. For centuries, Leh occupied an important position within networks of trade, travel and cultural exchange that connected the Indian subcontinent with Central Asia, Tibet, Kashmir and other regions of the Himalayan and trans-Himalayan world.",
  secondaryDescription = "The museum seeks to make these connections accessible to contemporary audiences by bringing together objects and stories that illustrate Ladakh's place within this larger historical landscape.",
  buttonLabel = "Learn More",
  buttonHref = "/about",
  imageSrc = "/images/tower-exterior-stairs.webp",
  imageAlt = "The museum's stone tower with its timber gallery and external stairway",
  imageCaption = "The museum tower, Tsas Soma Garden",
  imageTag = "Leh",
  highlights = defaultHighlights,
}: AboutSectionProps) {
  return (
    <section id="about" className="relative overflow-hidden bg-bg py-20 sm:py-24 md:py-28 lg:py-32 border-b border-border-subtle">
      {/* Ambient background glows */}
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
          <div className="flex flex-col items-start lg:col-span-7 xl:col-span-6">
            {/* Section Eyebrow */}
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

          {/* Right Column: Portrait Museum Tower Image (un-cropped 2:3 ratio) */}
          <div className="lg:col-span-5 lg:col-start-8">
            <figure className="relative mx-auto w-full max-w-110 lg:max-w-none">
              {/* Outer decorative frame */}
              <div
                className="absolute -inset-3 rounded-md border border-palette-sand/60 bg-bg-secondary/50 sm:-inset-4"
                aria-hidden="true"
              />

              {/* Tower Image */}
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1023}
                height={1537}
                className="relative block w-full rounded-[3px] border border-border shadow-lg h-auto aspect-1023/1537 object-contain"
              />

              {/* Caption & Tag */}
              {imageCaption && (
                <figcaption className="relative mt-4 flex items-center justify-between text-[12px] text-muted">
                  <a
                    href="https://maps.app.goo.gl/CHsSHHyECqD3nZUe7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-heading transition-colors"
                    title="View on Google Maps"
                  >
                    {imageCaption}
                  </a>
                  {imageTag && (
                    <a
                      href="https://maps.app.goo.gl/CHsSHHyECqD3nZUe7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-palette-amber font-medium hover:underline"
                      title="View on Google Maps"
                    >
                      {imageTag}
                    </a>
                  )}
                </figcaption>
              )}
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}

