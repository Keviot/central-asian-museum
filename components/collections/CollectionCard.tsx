import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { CollectionItem } from "@/lib/collections";

type CollectionCardProps = {
  item: CollectionItem;
  className?: string;
  href?: string;
  priority?: boolean;
};

export function CollectionCard({
  item,
  className = "",
  href = "/collections",
  priority = false,
}: CollectionCardProps) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-sm border border-border bg-surface-dark shadow-sm transition-all duration-500 hover:border-btn-bg hover:shadow-xl select-none ${className}`}
    >
      {/* Background Image: Clean, Bright & Visible */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Minimal Gradient Scrim: mostly clear so the full image shines, soft at bottom for title contrast */}
        <div
          className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/85 group-hover:via-black/25"
          aria-hidden="true"
        />
      </div>

      {/* Top Subtle Pill — Only revealed gracefully on hover */}
      <div className="relative z-10 p-4 sm:p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-surface-dark/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-palette-sand backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-palette-amber" />
          <span>{item.category}</span>
        </span>
      </div>

      {/* Bottom Content: Minimal, Clean, Uncrowded */}
      <div className="relative z-10 mt-auto flex flex-col items-start p-4 sm:p-5 md:p-6">
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-palette-sand/90">
          {item.period}
        </p>

        <h3 className="mt-1 font-heading text-[20px] font-medium leading-tight text-white drop-shadow-md sm:text-[24px] md:text-[26px]">
          {item.title}
        </h3>

        {/* Hover-Revealed "Learn More" Button in #54333B with Smooth Slide-Up */}
        <div className="mt-3 flex max-h-0 items-center overflow-hidden opacity-0 transform translate-y-2 transition-all duration-300 ease-out group-hover:max-h-14 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-btn-bg px-5 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-white shadow-md transition-all duration-200 hover:bg-(--museum-btn-hover)">
            <span>Learn More</span>
            <Icon name="arrow-right" size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
