"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { LeadItem } from "@/lib/mockLeadsData";

const SUBJECTS: Record<string, string> = {
  general: "General enquiry",
  visits: "Group, school or college visit",
  research: "Research access",
  donation: "Donation",
};

const PER_PAGE = 10;

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function formatDate(dateStr: string): string {
  const t = new Date(dateStr);
  if (isNaN(t.getTime())) return dateStr;
  const m = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][t.getMonth()];
  let h = t.getHours();
  const ap = h < 12 ? "am" : "pm";
  h = h % 12 || 12;
  const mins = String(t.getMinutes()).padStart(2, "0");
  return `${t.getDate()} ${m} ${t.getFullYear()} at ${h}:${mins} ${ap}`;
}

function getIntentChipStyle(intent: string): string {
  switch (intent?.toLowerCase()) {
    case "visits":
      return "bg-[#1c3f5e]/10 text-[#1c3f5e] border-[#1c3f5e]/25";
    case "research":
      return "bg-[#2d5038]/10 text-[#2d5038] border-[#2d5038]/25";
    case "donation":
      return "bg-[#8a6a12]/15 text-[#8a6a12] border-[#8a6a12]/30";
    case "general":
    default:
      return "bg-[#54333b]/10 text-[#54333b] border-[#54333b]/25";
  }
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "intent" | "date">("date");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);
  const [page, setPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Fetch leads on mount
  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/admin/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data.leads || []);
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("leads-updated"));
          }
        }
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const inTab = (l: LeadItem, k: string) => {
    if (k === "all") return true;
    if (k === "unread") return l.status === "unread";
    return l.intent === k;
  };

  // Counts for each tab
  const counts = useMemo(() => {
    return {
      all: leads.length,
      unread: leads.filter((l) => l.status === "unread").length,
      visits: leads.filter((l) => l.intent === "visits").length,
      research: leads.filter((l) => l.intent === "research").length,
      donation: leads.filter((l) => l.intent === "donation").length,
      general: leads.filter((l) => l.intent === "general").length,
    };
  }, [leads]);

  // Filtered & sorted leads
  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads
      .filter((l) => {
        if (!inTab(l, tab)) return false;
        if (!q) return true;
        const haystack = `${l.name} ${l.email} ${l.message} ${SUBJECTS[l.intent] || l.intent}`.toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => {
        let x: string | number = a[sortKey] || "";
        let y: string | number = b[sortKey] || "";
        if (sortKey === "date") {
          x = new Date(a.date).getTime();
          y = new Date(b.date).getTime();
        }
        return (x < y ? -1 : x > y ? 1 : 0) * sortDir;
      });
  }, [leads, tab, query, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pagedList = filteredList.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE
  );

  const handleSort = (key: "name" | "intent" | "date") => {
    if (sortKey === key) {
      setSortDir((d) => (d === 1 ? -1 : 1));
    } else {
      setSortKey(key);
      setSortDir(key === "date" ? -1 : 1);
    }
  };

  const handleRowClick = async (lead: LeadItem) => {
    if (lead.status === "read") return;
    // Mark as read
    try {
      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, status: "read" } : l))
      );
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("leads-updated"));
      }
      await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "read" }),
      });
    } catch (err) {
      console.error("Failed to mark lead as read:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("leads-updated"));
      }
      showToast("Lead deleted");
      await fetch(`/api/admin/leads/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  const tabs: {
    key: string;
    label: string;
    activeClass: string;
    badgeClass: string;
    colorDot: string;
  }[] = [
    {
      key: "all",
      label: "All Leads",
      activeClass: "bg-palette-wine text-white border-palette-wine shadow-xs font-semibold",
      badgeClass: "bg-white/20 text-white",
      colorDot: "bg-palette-wine",
    },
    {
      key: "unread",
      label: "Unread",
      activeClass: "bg-palette-amber text-[#26171c] border-palette-amber shadow-xs font-bold",
      badgeClass: "bg-[#26171c]/15 text-[#26171c]",
      colorDot: "bg-palette-amber",
    },
    {
      key: "visits",
      label: "Visits",
      activeClass: "bg-[#1c3f5e] text-white border-[#1c3f5e] shadow-xs font-semibold",
      badgeClass: "bg-white/20 text-white",
      colorDot: "bg-[#1c3f5e]",
    },
    {
      key: "research",
      label: "Research",
      activeClass: "bg-[#2d5038] text-white border-[#2d5038] shadow-xs font-semibold",
      badgeClass: "bg-white/20 text-white",
      colorDot: "bg-[#2d5038]",
    },
    {
      key: "donation",
      label: "Donation",
      activeClass: "bg-[#8a6a12] text-white border-[#8a6a12] shadow-xs font-semibold",
      badgeClass: "bg-white/20 text-white",
      colorDot: "bg-[#8a6a12]",
    },
    {
      key: "general",
      label: "General",
      activeClass: "bg-[#54333b] text-white border-[#54333b] shadow-xs font-semibold",
      badgeClass: "bg-white/20 text-white",
      colorDot: "bg-[#54333b]",
    },
  ];

  return (
    <div className="lp-main">
      {/* Title Area */}
      <div className="lp-title flex items-center gap-3.5">
        <Link
          href="/admin/dashboard"
          aria-label="Back to Dashboard"
          title="Back to Dashboard"
          className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xs border border-palette-sand/80 bg-white hover:bg-bg-secondary hover:border-palette-amber text-heading transition-colors shadow-2xs group cursor-pointer"
        >
          <Icon name="arrow-left" size={17} className="text-palette-amber group-hover:-translate-x-0.5 transition-transform" />
        </Link>
        <h1 className="m-0">Leads</h1>
      </div>
      <p className="lp-intro">
        Enquiries sent from the website&apos;s Contact form. Opening a lead (click it) marks it as read. Hover over a lead to delete it.
      </p>

      {/* Modern Premium Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3 border-b border-palette-sand/70">
        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((t) => {
            const isActive = tab === t.key;
            const count = counts[t.key as keyof typeof counts] ?? 0;
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setTab(t.key);
                  setPage(1);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12.5px] font-mono tracking-wider transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? t.activeClass
                    : "bg-white text-heading border-palette-sand/80 shadow-2xs hover:border-palette-amber hover:bg-bg-secondary hover:-translate-y-0.5"
                }`}
              >
                <span className={`h-2 w-2 rounded-full shrink-0 ${t.colorDot}`} />
                <span>{t.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                    isActive
                      ? t.badgeClass
                      : "bg-bg-secondary text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
            <Icon name="search" size={15} />
          </div>
          <input
            id="lp-search"
            type="search"
            placeholder="Search leads, message..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-8 py-2 rounded-xs border border-palette-sand/80 bg-white text-[13px] text-heading placeholder:text-muted/60 focus:border-palette-amber focus:outline-none shadow-2xs transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-muted hover:text-heading cursor-pointer"
              title="Clear search"
            >
              <Icon name="close" size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="p-12 text-center text-muted">
          <div className="h-6 w-6 rounded-full border-2 border-palette-amber/40 border-t-palette-amber animate-spin mx-auto mb-3" />
          <p className="font-mono text-[12px] uppercase tracking-wider">
            Loading leads...
          </p>
        </div>
      ) : (
        <>
          <table className="lp-table">
            <thead>
              <tr>
                <th className="lp-th-date">
                  <button type="button" onClick={() => handleSort("date")}>
                    Submitted on <i>{sortKey === "date" ? (sortDir === 1 ? "▲" : "▼") : "▲▼"}</i>
                  </button>
                </th>
                <th className="lp-th-who">
                  <button type="button" onClick={() => handleSort("name")}>
                    Name <i>{sortKey === "name" ? (sortDir === 1 ? "▲" : "▼") : "▲▼"}</i>
                  </button>
                </th>
                <th className="lp-th-msg">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {pagedList.map((l) => {
                const isExpanded = expandedIds.has(l.id);
                const isLong = l.message.length > 160 || (l.message.match(/\n/g) || []).length >= 3;
                return (
                  <tr
                    key={l.id}
                    data-id={l.id}
                    className={`transition-colors hover:bg-bg-secondary/35 ${l.status === "unread" ? "is-unread" : ""}`}
                    onClick={() => handleRowClick(l)}
                  >
                    {/* 1. Submitted on */}
                    <td className="lp-date">
                      <div className="font-mono text-[12.5px] text-palette-wine/90 font-medium whitespace-nowrap">
                        {formatDate(l.date)}
                      </div>
                    </td>

                    {/* 2. Name (No Phone Number) */}
                    <td className="lp-who">
                      <div className="lp-who__row">
                        <span className="lp-avatar shadow-2xs font-mono font-bold text-[14px]" aria-hidden="true">
                          {initials(l.name)}
                        </span>
                        <div className="min-w-0">
                          <strong className="truncate block font-semibold text-heading text-[14.5px]">{l.name}</strong>
                          <a
                            href={`mailto:${l.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="truncate block text-[12.5px] text-palette-wine hover:text-palette-amber hover:underline transition-colors mt-0.5"
                          >
                            {l.email}
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* 3. Message */}
                    <td className="lp-msg">
                      {/* Subject Tab in different color */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {l.status === "unread" && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-palette-amber text-[#26171c] font-mono text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                            New
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold uppercase tracking-wider border shadow-2xs ${getIntentChipStyle(
                            l.intent
                          )}`}
                        >
                          {SUBJECTS[l.intent] || l.intent}
                        </span>
                      </div>

                      {/* Message Content: default 4 lines, click to expand accordion in place */}
                      <div className="relative">
                        <p
                          className={`text-[13.5px] leading-relaxed text-heading cursor-pointer select-text transition-all ${
                            isExpanded ? "whitespace-pre-wrap" : "line-clamp-4"
                          }`}
                          onClick={(e) => {
                            if (isLong) {
                              toggleExpand(l.id, e);
                            }
                          }}
                          title={isLong ? (isExpanded ? "Click to collapse message" : "Click to read full message") : undefined}
                        >
                          {l.message}
                        </p>

                        {isLong && (
                          <button
                            type="button"
                            onClick={(e) => toggleExpand(l.id, e)}
                            className="mt-1.5 inline-flex items-center gap-1 font-mono text-[11.5px] text-palette-wine hover:text-palette-amber font-bold cursor-pointer transition-colors group/expand"
                          >
                            <span>{isExpanded ? "Show less" : "... Read full message"}</span>
                            <Icon
                              name={isExpanded ? "chevron-up" : "chevron-down"}
                              size={12}
                              className="transition-transform group-hover/expand:scale-110"
                            />
                          </button>
                        )}
                      </div>

                      {/* Action buttons on hover */}
                      <div className="lp-actions">
                        <button
                          type="button"
                          data-act="delete"
                          className="warn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(l.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredList.length === 0 && (
            <div className="lp-empty">No leads here.</div>
          )}

          {/* Pagination */}
          {filteredList.length > 0 && (
            <nav className="lp-pages" aria-label="Pages">
              <span className="lp-count">{filteredList.length} items</span>
              <button
                type="button"
                data-page="first"
                aria-label="First page"
                disabled={safePage === 1}
                onClick={() => {
                  setPage(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                «
              </button>
              <button
                type="button"
                data-page="prev"
                aria-label="Previous page"
                disabled={safePage === 1}
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                ‹
              </button>
              <span className="lp-pages__now">
                Page {safePage} of {totalPages}
              </span>
              <button
                type="button"
                data-page="next"
                aria-label="Next page"
                disabled={safePage === totalPages}
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                ›
              </button>
              <button
                type="button"
                data-page="last"
                aria-label="Last page"
                disabled={safePage === totalPages}
                onClick={() => {
                  setPage(totalPages);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                »
              </button>
            </nav>
          )}
        </>
      )}

      <p className="lp-note">
        Enquiries sent from the website&apos;s Contact page form (Name · Email · Subject · Message) will appear here. Clicking an unread lead marks it as read. Hover over a lead to delete it.
      </p>

      {/* Toast Notification */}
      <div
        className={`lp-toast ${toastMessage ? "is-on" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>
    </div>
  );
}
