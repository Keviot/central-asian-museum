"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { BlockContentEditor } from "@/components/admin/BlockContentEditor";

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
  const [error, setError] = useState<string | null>(null);

  const [categoriesList, setCategoriesList] = useState<string[]>([
    "Special Exhibitions",
    "Architecture & Tilework",
    "Textile Art & Culture",
    "Gold & Metallurgy",
    "Manuscripts & Astronomy",
  ]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

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
    description: "",
    curatorialEssay: "",
    featuredOnHome: true,
  });

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set([...categoriesList, formData.category].filter(Boolean)));
  }, [categoriesList, formData.category]);

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
          setFormData(data.exhibition);
          if (data.exhibition.dateRange) {
            const { start, end } = parseDateRange(data.exhibition.dateRange);
            if (start) setStartDate(start);
            if (end) setEndDate(end);
          }
          if (data.exhibition.category) {
            setCategoriesList((prev) => Array.from(new Set([...prev, data.exhibition.category])));
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
    if (start && end) {
      setFormData((prev) => ({ ...prev, dateRange: `${start} – ${end}` }));
    } else if (start) {
      setFormData((prev) => ({ ...prev, dateRange: `From ${start}` }));
    }
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (trimmed && !categoriesList.includes(trimmed)) {
      setCategoriesList((prev) => [...prev, trimmed]);
      setFormData((prev) => ({ ...prev, category: trimmed }));
    }
    setNewCategoryName("");
    setIsAddingCategory(false);
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
      <div className="flex items-center justify-between border-b border-palette-sand/70 pb-6">
        <div>
          <Link href="/admin/exhibitions" className="font-mono text-[11px] uppercase tracking-wider text-palette-amber font-bold hover:underline flex items-center gap-1 mb-1">
            ← Back to Exhibitions
          </Link>
          <h1 className="font-heading text-[32px] font-semibold text-heading">
            Edit Exhibition Record
          </h1>
        </div>

        {formData.slug && (
          <Link
            href={`/exhibitions/${formData.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-wider text-palette-wine hover:underline"
          >
            <span>View Live Page</span>
            <Icon name="external-link" size={14} />
          </Link>
        )}
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

          {/* Dynamic Category with Add Category Feature */}
          <div className="space-y-1.5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
                Category
              </label>
              <button
                type="button"
                onClick={() => setIsAddingCategory(!isAddingCategory)}
                className="text-[11px] font-mono uppercase tracking-wider font-bold text-palette-wine hover:underline flex items-center gap-1"
              >
                <span>+ Add Category</span>
              </button>
            </div>

            {isAddingCategory ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter custom category name..."
                  className="flex-1 rounded-xs border border-palette-amber bg-white px-3 py-2 text-[13.5px] text-heading focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-3 py-2 rounded-xs bg-palette-wine text-white text-[12px] font-mono uppercase tracking-wider font-bold"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="px-3 py-2 rounded-xs border border-palette-sand/80 bg-white text-heading text-[12px] font-mono uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
              >
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
            >
              <option value="Current">Current</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Special">Special</option>
              <option value="Permanent">Permanent</option>
            </select>
          </div>

          {/* Location */}
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

          {/* Cover Image Upload (No raw path text box!) */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Exhibition Cover Image *
            </label>

            {formData.imageSrc ? (
              <div className="flex items-center gap-4 p-3 rounded-xs border border-palette-sand/70 bg-bg-secondary">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xs border border-palette-sand">
                  <Image
                    src={formData.imageSrc}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-mono font-bold text-heading truncate">Cover Image Selected</p>
                  <p className="text-[11px] font-mono text-muted truncate">{formData.imageSrc}</p>
                </div>
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
                        const res = await fetch("/api/admin/upload", { method: "POST", body: data });
                        const json = await res.json();
                        if (res.ok && json.url) setFormData((prev) => ({ ...prev, imageSrc: json.url }));
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
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-palette-sand/80 rounded-xs bg-bg-secondary/50 hover:bg-bg-secondary hover:border-palette-amber cursor-pointer transition-colors text-center">
                <Icon name="upload" size={24} className="text-palette-amber mb-2" />
                <span className="text-[13px] font-mono font-bold text-heading uppercase tracking-wider">
                  Upload Cover Image
                </span>
                <span className="text-[11px] text-muted mt-1">
                  Uploads directly to Cloudinary storage
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const file = e.target.files[0];
                      const data = new FormData();
                      data.append("file", file);
                      const res = await fetch("/api/admin/upload", { method: "POST", body: data });
                      const json = await res.json();
                      if (res.ok && json.url) setFormData((prev) => ({ ...prev, imageSrc: json.url }));
                    }
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Summary Description */}
          <div className="sm:col-span-2 space-y-1.5">
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

          {/* Curatorial Essay Block CMS Editor */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber mb-2">
              Curatorial Narrative Essay & Content Blocks (Text, Images, YouTube & Tables)
            </label>
            <BlockContentEditor
              value={formData.curatorialEssay}
              onChange={(essayStr) => setFormData({ ...formData, curatorialEssay: essayStr })}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 border-t border-palette-sand/70 pt-6">
          <Button href="/admin/exhibitions" variant="outline" size="md">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="bg-palette-wine hover:bg-palette-wine/90">
            {isSubmitting ? "Updating Database..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

