"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

export type ShareData = {
  title: string;
  slug?: string;
  id?: string;
  subtitle?: string;
  excerpt?: string;
  image?: string;
  imageSrc?: string;
  dates?: string;
  dateRange?: string;
  where?: string;
  location?: string;
  curator?: string | null;
  url?: string;
};

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: ShareData;
};

export function ShareModal({ isOpen, onClose, data }: ShareModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // Compute absolute share URL
  const slugOrId = data.slug || data.id || "";
  const relativePath = `/exhibitions/${slugOrId}`;

  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      setShareUrl(data.url || `${origin}${relativePath}`);
      setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
    }
  }, [data.url, relativePath]);

  // Lock scroll and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const title = data.title || "Exhibition";
  const image = data.imageSrc || data.image || "/images/gallery-floor3-archive.webp";
  const dates = data.dateRange || data.dates || "";
  const location = data.location || data.where || "Central Asian Museum, Leh";
  const textSummary = data.subtitle || data.excerpt || `${title} at Central Asian Museum, Leh`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      }
    } catch (err) {
      console.warn("navigator.clipboard failed, attempting fallback:", err);
    }

    try {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (fallbackErr) {
      console.error("Failed to copy link via fallback:", fallbackErr);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Central Asian Museum, Leh`,
          text: textSummary,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled
      }
    }
  };

  const shareText = encodeURIComponent(`${title} — Central Asian Museum, Leh\n${textSummary}\n`);
  const encodedUrl = encodeURIComponent(shareUrl);

  const channels = [
    {
      name: "WhatsApp",
      shortName: "WhatsApp",
      icon: "whatsapp" as const,
      href: `https://api.whatsapp.com/send?text=${shareText}${encodedUrl}`,
      hoverClass: "group-hover:border-[#25D366] group-hover:text-[#25D366] group-hover:bg-[#25D366]/5",
    },
    {
      name: "X (Twitter)",
      shortName: "X",
      icon: "twitter" as const,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} — Central Asian Museum, Leh`)}&url=${encodedUrl}`,
      hoverClass: "group-hover:border-heading group-hover:text-heading group-hover:bg-heading/5",
    },
    {
      name: "Facebook",
      shortName: "Facebook",
      icon: "facebook" as const,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      hoverClass: "group-hover:border-[#1877F2] group-hover:text-[#1877F2] group-hover:bg-[#1877F2]/5",
    },
    {
      name: "LinkedIn",
      shortName: "LinkedIn",
      icon: "linkedin" as const,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      hoverClass: "group-hover:border-[#0A66C2] group-hover:text-[#0A66C2] group-hover:bg-[#0A66C2]/5",
    },
    {
      name: "Email",
      shortName: "Email",
      icon: "mail" as const,
      href: `mailto:?subject=${encodeURIComponent(`${title} — Central Asian Museum, Leh`)}&body=${encodeURIComponent(`I wanted to share this exhibition with you from the Central Asian Museum in Leh:\n\n${title}\n${textSummary}\n\nView details:\n${shareUrl}`)}`,
      hoverClass: "group-hover:border-palette-wine group-hover:text-palette-wine group-hover:bg-palette-wine/5",
    },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-surface-dark/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="relative w-full max-w-110 rounded-lg border border-border/80 bg-surface p-6 text-body shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-heading hover:bg-bg-secondary transition-colors focus-visible:outline-none cursor-pointer"
          aria-label="Close dialog"
        >
          <Icon name="close" size={17} />
        </button>

        {/* Modal Header */}
        <div className="pr-8">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-palette-amber text-left!">
            Central Asian Museum · Leh
          </p>
          <h2
            id="share-modal-title"
            className="font-heading text-[22px] sm:text-[24px] font-semibold leading-tight text-heading mt-1 text-left!"
          >
            Share Exhibition
          </h2>
        </div>

        {/* Compact Exhibition Preview */}
        <div className="mt-4 flex items-center gap-3.5 rounded-md border border-border-subtle bg-bg-secondary/60 p-3">
          <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-md border border-border-subtle bg-bg">
            <Image
              src={image}
              alt={title}
              fill
              sizes="52px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-[16px] font-medium leading-snug text-heading truncate text-left!">
              {title}
            </h3>
            <p className="font-sans text-[12px] text-muted truncate mt-0.5 text-left!">
              {dates || location}
            </p>
          </div>
        </div>

        {/* Share Channels */}
        <div className="mt-5">
          <p className="text-[11px] font-sans font-medium uppercase tracking-[0.12em] text-muted mb-3 text-left!">
            Share via
          </p>
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            {channels.map((ch) => (
              <a
                key={ch.name}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1.5 focus-visible:outline-none"
                title={`Share on ${ch.name}`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface text-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-sm ${ch.hoverClass}`}
                >
                  <Icon name={ch.icon} size={18} />
                </div>
                <span className="text-[11px] font-sans text-muted group-hover:text-heading transition-colors">
                  {ch.shortName}
                </span>
              </a>
            ))}

            {/* Native device share if supported */}
            {canNativeShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="group flex flex-col items-center gap-1.5 focus-visible:outline-none cursor-pointer"
                title="More sharing options"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface text-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-sm group-hover:border-palette-wine group-hover:text-palette-wine group-hover:bg-palette-wine/5">
                  <Icon name="share" size={16} />
                </div>
                <span className="text-[11px] font-sans text-muted group-hover:text-heading transition-colors">
                  More
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Copy Direct Link */}
        <div className="mt-5 pt-4 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-sans font-medium uppercase tracking-[0.12em] text-muted text-left!">
              Direct Link
            </p>
            {copied && (
              <span className="text-[11px] font-sans font-medium text-live-green animate-in fade-in flex items-center gap-1">
                <Icon name="check" size={12} /> Copied to clipboard
              </span>
            )}
          </div>
          <div className="flex items-center rounded-md border border-border bg-bg pl-3 pr-1 py-1 focus-within:border-palette-wine transition-colors gap-2">
            <Icon name="link" size={15} className="text-muted shrink-0" />
            <input
              type="text"
              readOnly
              value={shareUrl}
              onFocus={(e) => e.target.select()}
              className="flex-1 min-w-0 bg-transparent py-1 text-[12.5px] text-heading font-sans select-all outline-none truncate"
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-[12px] font-sans font-semibold tracking-wide transition-all shrink-0 select-none cursor-pointer shadow-xs ${
                copied
                  ? "bg-live-green text-white"
                  : "bg-palette-wine text-white hover:bg-palette-wine/90"
              }`}
            >
              <Icon name={copied ? "check" : "copy"} size={13} />
              <span>{copied ? "Copied" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
