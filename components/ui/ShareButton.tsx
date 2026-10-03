"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ShareModal, type ShareData } from "./ShareModal";

type ShareButtonProps = {
  data: ShareData;
  variant?: "icon" | "pill" | "hero" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  iconSize?: number;
};

export function ShareButton({
  data,
  variant = "pill",
  size = "md",
  className = "",
  label = "Share",
  iconSize,
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
          <Icon name="share" size={iconSize || 18} className="block m-auto" />
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
          className={`group inline-flex items-center justify-center rounded-[3px] border border-border-strong bg-surface font-medium uppercase text-heading hover:border-palette-wine hover:text-palette-wine hover:bg-bg-secondary transition-all duration-300 cursor-pointer select-none ${
            size === "sm"
              ? "px-5 py-2.5 text-[12px] gap-2 tracking-[0.06em]"
              : size === "lg"
              ? "px-9 py-4 text-[14px] gap-3 tracking-[0.09em]"
              : "px-7 py-3.5 text-[13px] gap-2.5 tracking-[0.08em]"
          } ${className}`}
        >
          <Icon name="share" size={size === "sm" ? 14 : 16} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <span>{label || "Share Exhibition"}</span>
        </button>
      )}

      {variant === "outline" && (
        <button
          type="button"
          onClick={handleClick}
          className={`group inline-flex items-center justify-center rounded-[3px] border border-palette-amber bg-transparent font-medium uppercase text-palette-amber hover:bg-palette-amber hover:text-white transition-all duration-300 cursor-pointer select-none ${
            size === "sm"
              ? "px-5 py-2.5 text-[12px] gap-2 tracking-[0.06em]"
              : size === "lg"
              ? "px-9 py-4 text-[14px] gap-3 tracking-[0.09em]"
              : "px-7 py-3.5 text-[13px] gap-2.5 tracking-[0.08em]"
          } ${className}`}
        >
          <Icon name="share" size={size === "sm" ? 14 : 16} className="shrink-0" />
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
