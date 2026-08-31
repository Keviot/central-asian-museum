"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export default function NewNewsEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [categoriesList, setCategoriesList] = useState<string[]>([
    "Lecture & Symposium",
    "Artisan Workshop",
    "Curatorial News",
    "Cultural Gala",
    "Press Release",
  ]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Lecture & Symposium",
    date: "",
    readTime: "5 min read",
    location: "Main Auditorium & Virtual Stream",
    imageSrc: "/images/events_and_news/symposium-silk-road-preservation.png",
    imageAlt: "",
    summary: "",
    content: "",
    status: "Published",
  });

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set([...categoriesList, formData.category].filter(Boolean)));
  }, [categoriesList, formData.category]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    setFormData((prev) => ({
      ...prev,
      title,
      slug,
      imageAlt: title,
    }));
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
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/news-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to publish news item");

      router.push("/admin/news-events");
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
      <div className="flex items-center justify-between border-b border-palette-sand/70 pb-6">
        <div>
          <Link href="/admin/news-events" className="font-mono text-[11px] uppercase tracking-wider text-palette-amber font-bold hover:underline flex items-center gap-1 mb-1">
            ← Back to News & Events
          </Link>
          <h1 className="font-heading text-[32px] font-semibold text-heading">
            Publish New Event / Article
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
              Event / News Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. International Symposium: Preserving Silk Road Architectural Ceramics"
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

          {/* Date Picker Input */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Event Date / Publication Date *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Event Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Main Auditorium & Virtual Stream"
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
            />
          </div>

          {/* Cover Image Upload (No raw path text box!) */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Event Cover Image *
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

          {/* Summary */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Article Summary / Teaser *
            </label>
            <textarea
              required
              rows={3}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary p-4 text-[14px] text-heading focus:border-palette-amber focus:outline-none"
            />
          </div>

          {/* Full Content */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
              Full Article Body / Program Details
            </label>
            <textarea
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary p-4 text-[14px] text-heading focus:border-palette-amber focus:outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 border-t border-palette-sand/70 pt-6">
          <Button href="/admin/news-events" variant="outline" size="md">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="bg-palette-wine hover:bg-palette-wine/90">
            {isSubmitting ? "Publishing..." : "Publish News Article"}
          </Button>
        </div>
      </form>
    </div>
  );
}

