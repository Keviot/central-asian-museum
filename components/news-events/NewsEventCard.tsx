import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import type { NewsEventItem } from "@/lib/newsEvents";

type NewsEventCardProps = {
  item: NewsEventItem;
  onSelect: (item: NewsEventItem) => void;
  className?: string;
};

export function NewsEventCard({
  item,
  onSelect,
  className = "",
}: NewsEventCardProps) {
  return (
    <article
      className={`group relative flex flex-col justify-between pt-5 border-t border-palette-sand/60 transition-all duration-300 cursor-pointer ${className}`}
      onClick={() => onSelect(item)}
    >
      <div>
        {/* Top Stylized Accent Line with Amber Indicator */}
        <div className="flex items-center gap-2 mb-4" aria-hidden="true">
          <span className="h-[2px] w-8 bg-palette-amber transition-all duration-500 group-hover:w-14" />
          <span className="h-px flex-1 bg-border-subtle/40" />
        </div>

        {/* Top: Image Preview with Delicate Archival Border */}
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-xs bg-bg-secondary border border-palette-sand/50 mb-4">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Category Pill Overlay */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-xs bg-surface-dark/90 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-palette-sand backdrop-blur-md border border-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-palette-amber animate-pulse" />
              <span>{item.category}</span>
            </span>
          </div>
        </div>

        {/* Typography Content with Left Architectural Accent Line */}
        <div className="border-l-2 border-palette-amber/40 pl-3.5 transition-colors duration-300 group-hover:border-palette-amber">
          {/* Category Kicker */}
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-amber">
            {item.category}
          </p>

          {/* Event Title */}
          <h3 className="mt-1.5 font-heading text-[22px] font-medium leading-[1.2] text-heading sm:text-[24px] group-hover:text-palette-amber transition-colors">
            {item.title}
          </h3>

          {/* Date, Time & Location Metadata */}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-medium text-muted">
            <div className="flex items-center gap-1.5">
              <Icon name="calendar" size={13} className="text-palette-sage" />
              <span>{item.date}</span>
            </div>
            {item.time && (
              <div className="flex items-center gap-1.5">
                <Icon name="clock" size={13} className="text-palette-sage" />
                <span>{item.time}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Icon name="map-pin" size={13} className="text-palette-sage" />
              <span>{item.location}</span>
            </div>
          </div>

          {/* News Teaser Summary */}
          <p className="mt-3 text-[14px] leading-relaxed text-body line-clamp-2">
            {item.summary}
          </p>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="mt-5 pt-3 border-t border-border-subtle/40 flex items-center justify-between">
        <Button
          type="button"
          variant="primary"
          size="sm"
          icon="arrow-right"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
        >
          Read Event Details
        </Button>
      </div>
    </article>
  );
}
