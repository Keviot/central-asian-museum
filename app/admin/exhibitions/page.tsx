"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { formatDateRange } from "@/lib/exhibitions";

type Exhibition = {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  dateRange: string;
  location: string;
  curator: string;
  imageSrc: string;
  description: string;
  createdAt: string;
  highlights?: any[];
};

export default function AdminExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchExhibitions = async () => {
    try {
      const res = await fetch("/api/admin/exhibitions");
      const data = await res.json();
      if (res.ok) {
        setExhibitions(data.exhibitions || []);
      }
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/exhibitions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setExhibitions(exhibitions.filter((e) => e.id !== id));
      } else {
        alert("Failed to delete exhibition");
      }
    } catch (error) {
      alert("Error deleting exhibition");
    }
  };

  const filteredExhibitions = useMemo(() => {
    return exhibitions.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.curator && item.curator.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [exhibitions, searchQuery]);

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-palette-sand/70 pb-6">
        <div className="flex items-start gap-3.5">
          <Link
            href="/admin/dashboard"
            aria-label="Back to Dashboard"
            title="Back to Dashboard"
            className="mt-1 flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xs border border-palette-sand/80 bg-white hover:bg-bg-secondary hover:border-palette-amber text-heading transition-colors shadow-2xs group cursor-pointer"
          >
            <Icon name="arrow-left" size={17} className="text-palette-amber group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-palette-amber font-bold">
              Curatorial CMS • Exhibitions
            </span>
            <h1 className="font-heading text-[32px] sm:text-[36px] font-semibold text-heading mt-0.5">
              Exhibitions Manager
            </h1>
            <p className="text-[14px] text-body mt-1">
              Manage gallery exhibitions, curatorial narrative essays, and artifact highlights.
            </p>
          </div>
        </div>

        <Button
          href="/admin/exhibitions/new"
          variant="primary"
          icon="sparkles"
          size="md"
          className="shrink-0 bg-palette-wine hover:bg-palette-wine/90 self-start sm:self-auto"
        >
          Create New Exhibition
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-[13px] text-muted">
          Showing <span className="font-semibold text-heading">{filteredExhibitions.length}</span>{" "}
          {filteredExhibitions.length === 1 ? "exhibition" : "exhibitions"}
        </p>

        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exhibitions by title, gallery..."
            className="w-full rounded-xs border border-palette-sand/70 bg-bg py-2 pl-9 pr-4 text-[13px] text-heading placeholder:text-muted focus:border-palette-amber focus:outline-none"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
            <Icon name="search" size={15} />
          </div>
        </div>
      </div>

      {/* Exhibitions Data Table */}
      {loading ? (
        <div className="p-12 text-center text-muted font-mono text-[13px]">
          Loading exhibitions from database...
        </div>
      ) : filteredExhibitions.length > 0 ? (
        <div className="rounded-xs border border-palette-sand/70 bg-bg overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13.5px]">
              <thead className="bg-bg-secondary font-mono text-[10.5px] uppercase tracking-[0.18em] text-palette-amber border-b border-palette-sand/70">
                <tr>
                  <th className="py-3.5 px-5 font-bold">Cover & Exhibition Title</th>
                  <th className="py-3.5 px-4 font-bold">Location & Dates</th>
                  <th className="py-3.5 px-5 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-palette-sand/40">
                {filteredExhibitions.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-secondary/60 transition-colors">
                    {/* Image & Title */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xs bg-bg-secondary border border-palette-sand/60">
                          <Image
                            src={item.imageSrc}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/exhibitions/${item.slug}`}
                            target="_blank"
                            className="font-heading text-[17px] font-semibold text-heading hover:text-palette-amber transition-colors line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          <p className="text-[12px] text-muted line-clamp-1">{item.curator}</p>
                        </div>
                      </div>
                    </td>

                    {/* Location & Date */}
                    <td className="py-4 px-4 text-[12.5px] text-body">
                      <p className="font-semibold text-heading">{item.location}</p>
                      <p className="text-[11.5px] text-muted">{formatDateRange(item.dateRange)}</p>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/exhibitions/${item.slug}`}
                          target="_blank"
                          className="p-1.5 text-muted hover:text-heading transition-colors"
                          title="View Live Page"
                        >
                          <Icon name="external-link" size={15} />
                        </Link>
                        <Link
                          href={`/admin/exhibitions/${item.id}`}
                          className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider font-bold rounded-xs border border-palette-sand/70 bg-bg hover:border-palette-amber text-heading"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                          title="Delete Exhibition"
                        >
                          <Icon name="trash" size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-xs border border-palette-sand/70 bg-bg">
          <p className="font-heading text-[20px] font-medium text-heading">No Exhibitions Found</p>
          <p className="text-[13.5px] text-muted mt-1">Try adjusting your status filter or search term.</p>
        </div>
      )}
    </div>
  );
}
