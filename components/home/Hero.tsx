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
  label = "Central Asian Museum",
  heading = "Discover the Heritage of Central Asia",
  description = "Explore centuries of art, culture, craftsmanship and stories shaped by the Silk Road.",
  ctaLabel = "Explore the Museum",
  ctaHref = "/collections",
  imageSrc = "https://images.unsplash.com/photo-1715824633698-37810119f69c?q=80&w=2400&auto=format&fit=crop",
  imageAlt = "Blue-domed madrasa architecture at Registan Square, Samarkand",
}: HeroProps) {
  return (
    <section className="relative flex min-h-screen w-full items-end overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center [animation:heroImage_1.8s_ease-out_both]"
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,36,33,0.38)_0%,rgba(40,36,33,0.22)_42%,rgba(40,36,33,0.74)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-40 lg:px-14 lg:pb-28">
        <div className="max-w-[720px] [animation:heroFade_1.05s_ease-out_both]">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 md:mb-6 md:text-[12px]">
            {label}
          </p>

          <h1 className="font-heading text-[42px] font-medium leading-[1.08] tracking-[-0.01em] text-white sm:text-[48px] md:text-[64px] lg:text-[88px]">
            {heading}
          </h1>

          <p className="mt-6 max-w-[480px] text-[15px] font-normal leading-relaxed text-white/85 md:mt-8 md:text-[17px]">
            {description}
          </p>

          <div className="mt-9 md:mt-11">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
