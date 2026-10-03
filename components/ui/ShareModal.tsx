"use client";

import { useEffect, useState } from "react";
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
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // Compute absolute share URL
  const slugOrId = data.slug || data.id || "";
  const relativePath = `/exhibitions/${slugOrId}`;

  const [shareUrl, setShareUrl] = useState("");

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

  if (!isOpen) return null;

  const title = data.title || "Exhibition";
  const image = data.imageSrc || data.image || "/images/gallery-floor3-archive.webp";
  const dates = data.dateRange || data.dates || "";
  const location = data.location || data.where || "Central Asian Museum, Leh";
  const textSummary = data.subtitle || data.excerpt || `${title} at Central Asian Museum, Leh`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
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
        // User cancelled or share failed
        console.warn("Native share dismissed or failed:", err);
      }
    }
  };

  const shareText = encodeURIComponent(`${title} — Central Asian Museum, Leh\n${textSummary}\n`);
  const encodedUrl = encodeURIComponent(shareUrl);

  const channels = [
    {
      name: "WhatsApp",
      icon: "whatsapp" as const,
      href: `https://api.whatsapp.com/send?text=${shareText}${encodedUrl}`,
      colorClass: "hover:border-[#25D366] hover:text-[#25D366]",
    },
    {
      name: "X (Twitter)",
      icon: "twitter" as const,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} — Central Asian Museum, Leh`)}&url=${encodedUrl}`,
      colorClass: "hover:border-heading hover:text-heading",
    },
    {
      name: "Facebook",
      icon: "facebook" as const,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      colorClass: "hover:border-[#1877F2] hover:text-[#1877F2]",
    },
    {
      name: "LinkedIn",
      icon: "linkedin" as const,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      colorClass: "hover:border-[#0A66C2] hover:text-[#0A66C2]",
    },
    {
      name: "Email",
      icon: "mail" as const,
      href: `mailto:?subject=${encodeURIComponent(`${title} — Central Asian Museum, Leh`)}&body=${encodeURIComponent(`I wanted to share this exhibition with you from the Central Asian Museum in Leh:\n\n${title}\n${textSummary}\n\nView details on the museum website:\n${shareUrl}`)}`,
      colorClass: "hover:border-palette-amber hover:text-palette-amber",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-dark/75 backdrop-blur-sm transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="relative w-full max-w-lg rounded-sm border border-border bg-surface p-6 sm:p-7 text-body shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-muted hover:text-heading hover:bg-bg transition-colors focus-visible:outline-none"
          aria-label="Close dialog"
        >
          <Icon name="close" size={16} />
        </button>

        {/* Modal Header */}
        <div className="pr-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-palette-amber">
            Central Asian Museum · Leh
          </p>
          <h2
            id="share-modal-title"
            className="font-heading text-[24px] sm:text-[26px] font-medium leading-tight text-heading mt-1"
          >
            Share this Exhibition
          </h2>
        </div>

        {/* Exhibition Preview Card */}
        <div className="mt-5 flex gap-4 rounded-xs border border-border-subtle bg-bg-secondary p-3.5 sm:p-4">
          <div className="relative h-20 w-24 sm:h-22 sm:w-28 shrink-0 overflow-hidden rounded-xs border border-border-subtle bg-bg">
            <Image
              src={image}
              alt={title}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            <h3 className="font-heading text-[17px] sm:text-[18px] font-medium leading-snug text-heading line-clamp-1">
              {title}
            </h3>
            {dates && (
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
                <Icon name="calendar" size={12} className="text-palette-amber shrink-0" />
                <span className="truncate">{dates}</span>
              </p>
            )}
            {location && (
              <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-muted">
                <Icon name="pin" size={12} className="text-palette-amber shrink-0" />
                <span className="truncate">{location}</span>
              </p>
            )}
          </div>
        </div>

        {/* Copy Link Input Bar */}
        <div className="mt-5">
          <label className="block text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-muted mb-1.5">
            Exhibition Direct Link
          </label>
          <div className="flex rounded-xs border border-border bg-bg overflow-hidden focus-within:border-palette-amber transition-colors">
            <input
              type="text"
              readOnly
              value={shareUrl}
              onFocus={(e) => e.target.select()}
              className="flex-1 bg-transparent px-3 py-2 text-[13px] text-heading font-mono select-all outline-none truncate"
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-mono uppercase tracking-wider font-bold transition-all shrink-0 select-none cursor-pointer ${
                copied
                  ? "bg-live-green text-white"
                  : "bg-palette-wine text-white hover:bg-palette-wine/90"
              }`}
            >
              <Icon name={copied ? "check" : "copy"} size={14} />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
          {copied && (
            <p className="mt-1.5 text-[11.5px] text-live-green font-medium animate-in fade-in">
              ✓ Direct exhibition link copied to clipboard!
            </p>
          )}
        </div>

        {/* Social Share Channels */}
        <div className="mt-6 border-t border-border-subtle pt-5">
          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-muted mb-3">
            Share directly via
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {channels.map((ch) => (
              <a
                key={ch.name}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 rounded-xs border border-border-subtle bg-bg-secondary px-3 py-2 text-[12.5px] font-medium text-body transition-all ${ch.colorClass} hover:bg-surface hover:shadow-xs`}
              >
                <Icon name={ch.icon} size={15} />
                <span>{ch.name}</span>
              </a>
            ))}

            {canNativeShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 rounded-xs border border-border-subtle bg-bg-secondary px-3 py-2 text-[12.5px] font-medium text-body transition-all hover:border-palette-wine hover:text-palette-wine hover:bg-surface hover:shadow-xs"
              >
                <Icon name="share" size={15} />
                <span>Device Share</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-[11.5px] text-muted">
          Anyone with this link can view this exhibition on the museum&apos;s website.
        </p>
      </div>
    </div>
  );
}
