"use client";

import { useEffect, useState, useMemo } from "react";
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

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "intent" | "date">("date");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);
  const [page, setPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const tabs: { key: string; label: string }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "visits", label: "Visits" },
    { key: "research", label: "Research" },
    { key: "donation", label: "Donation" },
    { key: "general", label: "General" },
  ];

  return (
    <div className="lp-main">
      {/* Title Area */}
      <div className="lp-title">
        <h1>Leads</h1>
      </div>
      <p className="lp-intro">
        Enquiries sent from the website&apos;s Contact form. Opening a lead (click it) marks it as read. Hover over a lead to delete it.
      </p>

      {/* Filter & Search Bar */}
      <div className="lp-filterbar">
        <ul className="lp-tabs" role="toolbar" aria-label="Filter leads">
          {tabs.map((t) => (
            <li key={t.key}>
              <button
                type="button"
                data-tab={t.key}
                aria-pressed={tab === t.key ? "true" : "false"}
                onClick={() => {
                  setTab(t.key);
                  setPage(1);
                }}
              >
                {t.label}{" "}
                <span className="n">
                  ({counts[t.key as keyof typeof counts] ?? 0})
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="lp-search">
          <span className="lp-count">{filteredList.length} items</span>
          <label className="sr-only" htmlFor="lp-search">
            Search leads
          </label>
          <input
            id="lp-search"
            type="search"
            placeholder="Search leads…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
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
                <th>
                  <button type="button" onClick={() => handleSort("name")}>
                    Name <i>▲▼</i>
                  </button>
                </th>
                <th>Message</th>
                <th>
                  <button type="button" onClick={() => handleSort("intent")}>
                    Subject <i>▲▼</i>
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => handleSort("date")}>
                    Submitted on <i>▲▼</i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {pagedList.map((l) => (
                <tr
                  key={l.id}
                  data-id={l.id}
                  className={l.status === "unread" ? "is-unread" : ""}
                  onClick={() => handleRowClick(l)}
                >
                  <td className="lp-who">
                    <div className="lp-who__row">
                      <span className="lp-avatar" aria-hidden="true">
                        {initials(l.name)}
                      </span>
                      <div>
                        <strong>{l.name}</strong>
                        <a
                          href={`mailto:${l.email}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {l.email}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="lp-msg">
                    {l.status === "unread" && (
                      <span className="lp-badge">New</span>
                    )}
                    <p>{l.message}</p>
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
                  <td className="lp-subject">
                    <b>{SUBJECTS[l.intent] || l.intent}</b>
                    <span className={`lp-chip lp-chip--${l.intent}`}>
                      {l.intent}
                    </span>
                  </td>
                  <td className="lp-date">{formatDate(l.date)}</td>
                </tr>
              ))}
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
