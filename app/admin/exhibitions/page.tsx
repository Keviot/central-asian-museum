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
  const [statusFilter, setStatusFilter] = useState("All");
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

  // Dynamically compute ONLY status options that exist in current dataset
  const availableStatuses = useMemo(() => {
    const statusSet = new Set<string>();
    exhibitions.forEach((e) => {
      if (e.status) statusSet.add(e.status);
    });
    return ["All", ...Array.from(statusSet)];
  }, [exhibitions]);

  const filteredExhibitions = useMemo(() => {
    return exhibitions.filter((item) => {
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [exhibitions, statusFilter, searchQuery]);

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-palette-sand/70 pb-6">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-palette-amber font-bold">
            Curatorial CMS • Exhibitions
          </span>
          <h1 className="font-heading text-[32px] sm:text-[36px] font-semibold text-heading mt-0.5">
            Exhibitions Manager
          </h1>
          <p className="text-[14px] text-body mt-1">
            Manage permanent and special gallery exhibitions, curatorial narrative essays, and artifact highlights.
          </p>
        </div>

        <Button
          href="/admin/exhibitions/new"
          variant="primary"
          icon="sparkles"
          size="md"
          className="shrink-0 bg-palette-wine hover:bg-palette-wine/90"
        >
          Create New Exhibition
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Dynamic Status Pills - SHOWING ONLY AVAILABLE STATUSES */}
        <div className="flex flex-wrap items-center gap-2">
          {availableStatuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 text-[11.5px] font-mono uppercase tracking-wider rounded-xs transition-colors ${
                statusFilter === status
                  ? "bg-palette-wine text-white font-bold shadow-2xs"
                  : "bg-bg-secondary text-body border border-palette-sand/60 hover:border-palette-wine"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

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
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
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

                    {/* Category */}
                    <td className="py-4 px-4 font-medium text-body text-[13px]">
                      {item.category}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-xs px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border ${
                        item.status === "Current"
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-700"
                          : item.status === "Upcoming"
                          ? "bg-amber-500/15 border-amber-500/30 text-amber-700"
                          : "bg-palette-sand/30 border-palette-sand/60 text-heading"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${item.status === "Current" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                        <span>{item.status}</span>
                      </span>
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
