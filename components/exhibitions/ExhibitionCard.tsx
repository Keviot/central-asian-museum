import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import type { ExhibitionItem } from "@/lib/exhibitions";

type ExhibitionCardProps = {
  exhibition: ExhibitionItem;
  className?: string;
  href?: string;
};

export function ExhibitionCard({
  exhibition,
  className = "",
  href,
}: ExhibitionCardProps) {
  const targetHref = href || `/exhibitions/${exhibition.slug}`;

  return (
    <article
      className={`group flex flex-col gap-6 sm:flex-row sm:items-start transition-all duration-300 ${className}`}
    >
      {/* Left Side: Clean Frameless Exhibition Image */}
      <Link
        href={targetHref}
        className="relative aspect-4/3 sm:aspect-square w-full sm:w-48 md:w-56 lg:w-60 shrink-0 overflow-hidden rounded-xs bg-bg-secondary block cursor-pointer"
      >
        <Image
          src={exhibition.imageSrc}
          alt={exhibition.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 240px"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Status Pill Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-xs bg-surface-dark/85 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-palette-sand backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-palette-amber animate-pulse" />
            <span>{exhibition.status}</span>
          </span>
        </div>
      </Link>

      {/* Right Side: Clean Curatorial Typography */}
      <div className="flex flex-1 flex-col justify-between pt-1">
        <div>
          {/* Category Kicker */}
          <div className="flex items-center gap-2">
            <span className="h-px w-5 bg-palette-amber" aria-hidden="true" />
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-amber">
              {exhibition.category}
            </p>
          </div>

          {/* Exhibition Title */}
          <h3 className="mt-2 font-heading text-[22px] font-medium leading-[1.18] tracking-[-0.01em] text-heading sm:text-[25px] md:text-[28px] group-hover:text-palette-amber transition-colors">
            <Link href={targetHref} className="hover:underline">
              {exhibition.title}
            </Link>
          </h3>

          {/* Dates & Location */}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-medium text-muted">
            <div className="flex items-center gap-1.5">
              <Icon name="calendar" size={13} className="text-palette-sage" />
              <span>{exhibition.dateRange}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="map-pin" size={13} className="text-palette-sage" />
              <span>{exhibition.location}</span>
            </div>
          </div>
        </div>

        {/* Learn More Button */}
        <div className="mt-4">
          <Button
            href={targetHref}
            variant="primary"
            size="sm"
            icon="arrow-right"
          >
            Explore Exhibition
          </Button>
        </div>
      </div>
    </article>
  );
}
