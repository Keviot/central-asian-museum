"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ShareModal, type ShareData } from "./ShareModal";

type ShareButtonProps = {
  data: ShareData;
  variant?: "icon" | "pill" | "hero" | "outline";
  className?: string;
  label?: string;
};

export function ShareButton({
  data,
  variant = "pill",
  className = "",
  label = "Share",
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <>
      {variant === "icon" && (
        <button
          type="button"
          onClick={handleClick}
          aria-label={`Share ${data.title}`}
          title="Share this exhibition"
          className={`inline-flex items-center justify-center rounded-full border border-border-subtle bg-surface text-body hover:border-palette-amber hover:text-palette-amber hover:bg-bg-secondary transition-all cursor-pointer select-none shrink-0 ${className}`}
        >
          <Icon name="share" size={17} className="block m-auto" />
        </button>
      )}

      {variant === "pill" && (
        <button
          type="button"
          onClick={handleClick}
          className={`inline-flex items-center gap-2 rounded-xs border border-border-subtle bg-surface px-3 py-1.5 text-[12.5px] font-medium text-body hover:border-palette-amber hover:text-palette-amber hover:bg-bg-secondary transition-all cursor-pointer select-none ${className}`}
        >
          <Icon name="share" size={14} className="text-palette-amber shrink-0" />
          <span>{label}</span>
        </button>
      )}

      {variant === "hero" && (
        <button
          type="button"
          onClick={handleClick}
          className={`inline-flex items-center justify-center gap-2 rounded-xs border border-palette-wine/40 bg-surface px-4 py-2 text-[12.5px] font-mono uppercase tracking-[0.12em] font-bold text-palette-wine hover:bg-palette-wine hover:text-white transition-all cursor-pointer select-none shadow-xs hover:shadow-sm ${className}`}
        >
          <Icon name="share" size={15} className="shrink-0" />
          <span>{label || "Share Exhibition"}</span>
        </button>
      )}

      {variant === "outline" && (
        <button
          type="button"
          onClick={handleClick}
          className={`inline-flex items-center justify-center gap-2 rounded-[3px] border border-palette-amber bg-transparent px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-palette-amber hover:bg-palette-amber hover:text-white transition-all cursor-pointer select-none ${className}`}
        >
          <Icon name="share" size={15} className="shrink-0" />
          <span>{label || "Share Exhibition"}</span>
        </button>
      )}

      <ShareModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={data}
      />
    </>
  );
}
