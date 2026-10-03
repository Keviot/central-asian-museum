"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { BlockContentEditor } from "@/components/admin/BlockContentEditor";
import { CoverImageUpload } from "@/components/admin/CoverImageUpload";
import { formatDateToDDMMYYYY } from "@/lib/exhibitions";

export default function NewExhibitionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    badgeLabel: "Featured Exhibition",
    imageSrc: "",
    imageAlt: "",
    descriptionHeading: "Short Description",
    description: "",
    curatorialEssayHeading: "Curatorial Narrative & Historical Context",
    curatorialEssay: "",
    featuredOnHome: true,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    setFormData((prev) => ({
      ...prev,
      title,
      slug: generatedSlug,
      imageAlt: title,
    }));
  };

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
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/exhibitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create exhibition");

      router.push("/admin/exhibitions");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3.5 border-b border-palette-sand/70 pb-6">
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
            Create New Exhibition
          </h1>
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
              onChange={handleTitleChange}
              placeholder="e.g. The Silk Road Transformed: Gold, Silk & Lapis"
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
              placeholder="e.g. Cross-Cultural Mastery Along the Ancient Trade Routes"
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
              placeholder="e.g. Main Exhibition Hall A"
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
              placeholder="e.g. Dr. Alisher Narzullaev"
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
            />
          </div>

          {/* Date Picker Selector */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Exhibition Date Range Selection {formData.dateRange ? `(${formData.dateRange})` : "(DD/MM/YYYY)"}
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
          <CoverImageUpload
            label="Exhibition Cover Image"
            required
            value={formData.imageSrc}
            onChange={(url) => setFormData((prev) => ({ ...prev, imageSrc: url }))}
            className="sm:col-span-2"
          />

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
            {isSubmitting ? "Publishing..." : "Publish Exhibition"}
          </Button>
        </div>
      </form>
    </div>
  );
}

