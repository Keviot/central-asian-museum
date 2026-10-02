"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { BlockContentEditor } from "@/components/admin/BlockContentEditor";
import { formatDateToDDMMYYYY } from "@/lib/exhibitions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditExhibitionPage({ params }: Props) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    category: "",
    status: "Current",
    dateRange: "",
    location: "",
    curator: "",
    badgeLabel: "",
    imageSrc: "",
    imageAlt: "",
    descriptionHeading: "Short Description",
    description: "",
    curatorialEssayHeading: "Curatorial Narrative & Historical Context",
    curatorialEssay: "",
    featuredOnHome: true,
  });

  useEffect(() => {
    function parseDateRange(dateRangeStr: string) {
      if (!dateRangeStr) return { start: "", end: "" };
      const ymdMatches = dateRangeStr.match(/\d{4}-\d{2}-\d{2}/g);
      if (ymdMatches && ymdMatches.length >= 2) {
        return { start: ymdMatches[0], end: ymdMatches[1] };
      }
      if (ymdMatches && ymdMatches.length === 1) {
        return { start: ymdMatches[0], end: "" };
      }

      const parts = dateRangeStr.split(/\s+[\u2013\u2014\-]\s+|\s+to\s+/i);
      const parseSingle = (str: string) => {
        if (!str) return "";
        const trimmed = str.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
          const [day, m, y] = trimmed.split("/");
          return `${y}-${m}-${day}`;
        }
        const d = new Date(trimmed);
        if (!isNaN(d.getTime())) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${y}-${m}-${day}`;
        }
        return "";
      };
      return {
        start: parseSingle(parts[0] || ""),
        end: parseSingle(parts[1] || ""),
      };
    }

    async function loadData() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
      try {
        const res = await fetch(`/api/admin/exhibitions/${resolvedParams.id}`);
        const data = await res.json();
        if (res.ok && data.exhibition) {
          setFormData({
            ...data.exhibition,
            descriptionHeading: data.exhibition.descriptionHeading || "Short Description",
            curatorialEssayHeading: data.exhibition.curatorialEssayHeading || "Curatorial Narrative & Historical Context",
          });
          if (data.exhibition.dateRange) {
            const { start, end } = parseDateRange(data.exhibition.dateRange);
            if (start) setStartDate(start);
            if (end) setEndDate(end);
          }
        } else {
          setError("Exhibition record not found");
        }
      } catch (err) {
        setError("Failed to fetch exhibition");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params]);

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    const startFormatted = formatDateToDDMMYYYY(start);
    const endFormatted = formatDateToDDMMYYYY(end);
    if (startFormatted && endFormatted) {
      setFormData((prev) => ({ ...prev, dateRange: `${startFormatted} – ${endFormatted}` }));
    } else if (startFormatted) {
      setFormData((prev) => ({ ...prev, dateRange: `From ${startFormatted}` }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/exhibitions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update exhibition");

      router.push("/admin/exhibitions");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-muted font-mono text-[13px]">
        Loading exhibition details from database...
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-palette-sand/70 pb-6">
        <div className="flex items-center gap-3.5">
          <Link
            href="/admin/exhibitions"
            aria-label="Back to Exhibitions"
            title="Back to Exhibitions Manager"
            className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xs border border-palette-sand/80 bg-white hover:bg-bg-secondary hover:border-palette-amber text-heading transition-colors shadow-2xs group cursor-pointer"
          >
            <Icon name="arrow-left" size={17} className="text-palette-amber group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-palette-amber font-bold">
              Curatorial CMS • Exhibitions
            </span>
            <h1 className="font-heading text-[32px] font-semibold text-heading mt-0.5">
              Edit Exhibition Record
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {formData.slug && (
            <Link
              href={`/exhibitions/${formData.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xs border border-palette-sand/80 bg-white px-3.5 py-1.5 text-[11.5px] font-mono uppercase tracking-wider text-palette-wine hover:border-palette-amber hover:bg-bg-secondary transition-colors shadow-2xs font-semibold"
            >
              <span>View Live Page</span>
              <Icon name="external-link" size={13} />
            </Link>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xs border border-palette-wine/50 bg-palette-wine/10 text-[13.5px] text-palette-wine">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8 rounded-xs border border-palette-sand/70 bg-bg p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Title */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Exhibition Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[14px] text-heading focus:border-palette-amber focus:outline-none"
            />
          </div>

          {/* Subtitle */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Subtitle / Theme
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[14px] text-heading focus:border-palette-amber focus:outline-none"
            />
          </div>

          {/* Slug Field (Commented Out for now) */}
          {/*
          <div className="space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              URL Route Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13px] font-mono text-heading focus:border-palette-amber focus:outline-none"
            />
          </div>
          */}

          {/* Gallery Location */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Gallery Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
            />
          </div>

          {/* Lead Curator */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Lead Curator
            </label>
            <input
              type="text"
              value={formData.curator}
              onChange={(e) => setFormData({ ...formData, curator: e.target.value })}
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
            />
          </div>

          {/* Date Picker Selector & Current Display */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Exhibition Date Range Selection ({formData.dateRange})
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="block text-[11px] text-muted font-mono mb-1">From Date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleDateChange(e.target.value, endDate)}
                  className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-3 py-2 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
                />
              </div>
              <div>
                <span className="block text-[11px] text-muted font-mono mb-1">To Date</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleDateChange(startDate, e.target.value)}
                  className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-3 py-2 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Exhibition Cover Image *
            </label>

            {isUploadingImage ? (
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-palette-amber/70 rounded-xs bg-palette-amber/5 text-center">
                <div className="h-6 w-6 border-2 border-palette-wine border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-[13px] font-mono font-bold text-palette-wine uppercase tracking-wider">
                  Processing & Uploading Image...
                </span>
                <span className="text-[11px] text-muted font-mono mt-1">Please wait while the image is being processed</span>
              </div>
            ) : formData.imageSrc ? (
              <div className="flex items-center justify-between gap-4 p-3 rounded-xs border border-palette-sand/70 bg-bg-secondary">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xs border border-palette-sand">
                  <Image
                    src={formData.imageSrc}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="px-3 py-1.5 rounded-xs border border-palette-sand/80 bg-white hover:border-palette-amber text-[11px] font-mono font-bold uppercase tracking-wider text-heading cursor-pointer shrink-0">
                  <span>Change</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        const data = new FormData();
                        data.append("file", file);
                        setIsUploadingImage(true);
                        try {
                          const res = await fetch("/api/admin/upload", { method: "POST", body: data });
                          const json = await res.json();
                          if (res.ok && json.url) setFormData((prev) => ({ ...prev, imageSrc: json.url }));
                        } catch (err) {
                          console.error(err);
                        } finally {
                          setIsUploadingImage(false);
                          e.target.value = "";
                        }
                      }
                    }}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageSrc: "" })}
                  className="px-3 py-1.5 rounded-xs border border-red-400/60 bg-red-500/10 text-red-600 hover:bg-red-500/20 text-[11px] font-mono font-bold uppercase tracking-wider shrink-0 flex items-center gap-1"
                >
                  <Icon name="trash" size={13} />
                  <span>Remove</span>
                </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-palette-sand/80 rounded-xs bg-bg-secondary/50 hover:bg-bg-secondary hover:border-palette-amber cursor-pointer transition-colors text-center">
                <Icon name="upload" size={24} className="text-palette-amber mb-2" />
                <span className="text-[13px] font-mono font-bold text-heading uppercase tracking-wider">
                  Upload Cover Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const file = e.target.files[0];
                      const data = new FormData();
                      data.append("file", file);
                      setIsUploadingImage(true);
                      try {
                        const res = await fetch("/api/admin/upload", { method: "POST", body: data });
                        const json = await res.json();
                        if (res.ok && json.url) setFormData((prev) => ({ ...prev, imageSrc: json.url }));
                      } catch (err) {
                        console.error(err);
                      } finally {
                        setIsUploadingImage(false);
                        e.target.value = "";
                      }
                    }
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Short Description Section (Part of top section) */}
          <div className="sm:col-span-2 space-y-4 rounded-xs border border-palette-sand/70 bg-bg-secondary/30 p-5 mt-2">
            <div className="space-y-1.5">
              <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
                Short Description Section Header Text
              </label>
              <input
                type="text"
                value={formData.descriptionHeading}
                onChange={(e) => setFormData({ ...formData, descriptionHeading: e.target.value })}
                placeholder="Short Description"
                className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
                Short Description (Card Summary) *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary p-4 text-[14px] text-heading focus:border-palette-amber focus:outline-none"
              />
            </div>
          </div>

          {/* Horizontal Divider before Curatorial Essay Section */}
          <div className="sm:col-span-2 border-t-2 border-palette-sand pt-6 mt-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-palette-amber flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-palette-amber" />
              1. Curatorial Narrative Essay Section
            </span>
            <div className="space-y-6 rounded-xs border border-palette-sand/70 bg-bg-secondary/30 p-5">
              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
                  Curatorial Essay Section Header Text
                </label>
                <input
                  type="text"
                  value={formData.curatorialEssayHeading}
                  onChange={(e) => setFormData({ ...formData, curatorialEssayHeading: e.target.value })}
                  placeholder="Curatorial Narrative & Historical Context"
                  className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
                />
              </div>

              {/* Horizontal line between header text and block content */}
              <div className="border-t border-palette-sand/70 pt-4">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber mb-3">
                  Curatorial Narrative Essay & Content Blocks (Text, Images, YouTube & Tables)
                </label>
                <BlockContentEditor
                  value={formData.curatorialEssay}
                  onChange={(essayStr) => setFormData({ ...formData, curatorialEssay: essayStr })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 border-t border-palette-sand/70 pt-6">
          <Button href="/admin/exhibitions" variant="outline" size="md">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="bg-palette-wine hover:bg-palette-wine/90">
            {isSubmitting ? "Publishing..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

