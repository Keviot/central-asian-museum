import Image from "next/image";
import { Button } from "@/components/ui/Button";

type HeroProps = {
  label?: string;
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function Hero({
  label,
  heading = "A Museum at the Crossroads of Central Asia and Ladakh",
  description = "The Central Asian Museum in Leh explores the historical, cultural and artistic connections between Ladakh and the wider Central Asian region.",
  ctaLabel = "Explore the Museum",
  ctaHref = "/about",
  imageSrc = "/images/museum-garden-exterior.webp",
  imageAlt = "The Central Asian Museum tower in the Tsas Soma Garden, Leh, with the mountains behind",
}: HeroProps) {
  return (
    <section className="relative flex min-h-screen w-full items-stretch overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center animate-[heroImage_1.8s_ease-out_both]"
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,23,28,0.38)_0%,rgba(38,23,28,0.2)_42%,rgba(38,23,28,0.76)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col justify-end px-6 pb-10 pt-32 sm:pt-36 md:px-10 md:pb-12 md:pt-40 lg:px-14 lg:pb-14 lg:pt-44">
        <div className="max-w-180 animate-[heroFade_1.05s_ease-out_both]">
          {label && (
            <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.28em] text-white/80 md:mb-6">
              {label}
            </p>
          )}

          <h1 className="font-heading text-[37px] font-medium leading-[1.08] tracking-[-0.01em] text-white sm:text-[42px] md:text-[56px] lg:text-[76px]">
            {heading}
          </h1>

          <p className="mt-6 max-w-120 text-[15px] font-normal leading-relaxed text-white/85 md:mt-8 md:text-[17px]">
            {description}
          </p>

          <div className="mt-9 md:mt-11">
            <Button href={ctaHref} size="lg" icon="arrow-right">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
