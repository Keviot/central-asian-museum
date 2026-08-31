"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "RESPONDED" | "ARCHIVED";
  createdAt: string;
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (res.ok) {
        setInquiries(data.inquiries || []);
        if (data.inquiries?.length > 0) {
          setSelectedInquiry(data.inquiries[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries(
          inquiries.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus as any });
        }
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const nextInquiries = inquiries.filter((item) => item.id !== id);
        setInquiries(nextInquiries);
        setSelectedInquiry(nextInquiries[0] || null);
      }
    } catch (error) {
      alert("Failed to delete inquiry");
    }
  };

  // Dynamically compute ONLY available status tabs that have active records + counts
  const availableTabs = useMemo(() => {
    const counts: Record<string, number> = { ALL: inquiries.length };
    inquiries.forEach((item) => {
      counts[item.status] = (counts[item.status] || 0) + 1;
    });

    const activeStatuses = Array.from(new Set(inquiries.map((i) => i.status)));
    const tabs = ["ALL", ...activeStatuses];

    return tabs.map((tab) => ({
      key: tab,
      label: `${tab} (${counts[tab] || 0})`,
    }));
  }, [inquiries]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      if (statusFilter === "ALL") return true;
      return item.status === statusFilter;
    });
  }, [inquiries, statusFilter]);

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-palette-sand/70 pb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-palette-amber font-bold">
          Curatorial CMS • Inquiries
        </span>
        <h1 className="font-heading text-[32px] sm:text-[36px] font-semibold text-heading mt-0.5">
          Visitor Inquiries Inbox
        </h1>
        <p className="text-[14px] text-body mt-1">
          Review, filter, and respond to incoming contact submissions, research access requests, and group tours.
        </p>
      </div>

      {/* Dynamic Status Tabs - ONLY SHOWING AVAILABLE TABS WITH LIVE COUNTS */}
      <div className="flex flex-wrap items-center gap-2">
        {availableTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3.5 py-1.5 text-[11.5px] font-mono uppercase tracking-wider rounded-xs transition-colors ${
              statusFilter === tab.key
                ? "bg-palette-wine text-white font-bold shadow-2xs"
                : "bg-bg-secondary text-body border border-palette-sand/60 hover:border-palette-wine"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Inbox 2-Column Split View */}
      {loading ? (
        <div className="p-12 text-center text-muted font-mono text-[13px]">
          Loading visitor inquiries from database...
        </div>
      ) : filteredInquiries.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Inbox List */}
          <div className="lg:col-span-5 space-y-3 max-h-162.5 overflow-y-auto pr-1">
            {filteredInquiries.map((item) => {
              const isSelected = selectedInquiry?.id === item.id;
              const isUnread = item.status === "UNREAD";
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedInquiry(item);
                    if (item.status === "UNREAD") {
                      handleStatusChange(item.id, "READ");
                    }
                  }}
                  className={`w-full text-left p-4 rounded-xs border transition-all cursor-pointer ${
                    isSelected
                      ? "border-palette-amber bg-palette-sand/20 shadow-xs"
                      : "border-palette-sand/70 bg-bg hover:border-palette-amber"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-[16px] font-semibold text-heading truncate">
                      {item.name}
                    </span>
                    {isUnread && (
                      <span className="h-2 w-2 rounded-full bg-palette-amber animate-pulse" />
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-palette-amber font-bold mt-0.5">
                    {item.subject}
                  </p>
                  <p className="text-[13px] text-body line-clamp-2 mt-1.5">
                    {item.message}
                  </p>
                  <div className="mt-3 pt-2 border-t border-palette-sand/40 flex items-center justify-between text-[11px] text-muted">
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    <span className="font-mono uppercase font-bold text-palette-sand">{item.status}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Message Detail Reader Box */}
          {selectedInquiry ? (
            <div className="lg:col-span-7 p-7 rounded-xs border border-palette-sand/70 bg-bg flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-palette-sand/70 pb-4 mb-6">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-palette-amber font-bold">
                      Inquiry Record
                    </span>
                    <h3 className="font-heading text-[24px] font-semibold text-heading">
                      {selectedInquiry.subject}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-xs border ${
                    selectedInquiry.status === "UNREAD"
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-700"
                      : selectedInquiry.status === "RESPONDED"
                      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-700"
                      : "bg-palette-sand/30 border-palette-sand/60 text-heading"
                  }`}>
                    {selectedInquiry.status}
                  </span>
                </div>

                {/* Visitor Metadata */}
                <div className="grid grid-cols-2 gap-4 text-[13.5px] border-b border-palette-sand/70 pb-5 mb-6">
                  <div>
                    <p className="font-mono text-[10.5px] uppercase text-palette-amber font-bold">Sender Name</p>
                    <p className="font-semibold text-heading">{selectedInquiry.name}</p>
                  </div>

                  <div>
                    <p className="font-mono text-[10.5px] uppercase text-palette-amber font-bold">Email Address</p>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-palette-wine underline font-medium">
                      {selectedInquiry.email}
                    </a>
                  </div>

                  {selectedInquiry.phone && (
                    <div>
                      <p className="font-mono text-[10.5px] uppercase text-palette-amber font-bold">Phone Number</p>
                      <p className="text-heading">{selectedInquiry.phone}</p>
                    </div>
                  )}

                  <div>
                    <p className="font-mono text-[10.5px] uppercase text-palette-amber font-bold">Received Date</p>
                    <p className="text-body">{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <p className="font-mono text-[10.5px] uppercase text-palette-amber font-bold mb-2">Message Body</p>
                  <div className="p-5 rounded-xs bg-bg-secondary border border-palette-sand/60 text-[14.5px] leading-relaxed text-heading whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="mt-8 pt-5 border-t border-palette-sand/70 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedInquiry.id, "RESPONDED")}
                    className="px-3 py-1.5 text-[11.5px] font-mono uppercase tracking-wider font-bold rounded-xs bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                  >
                    Mark Responded
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedInquiry.id, "READ")}
                    className="px-3 py-1.5 text-[11.5px] font-mono uppercase tracking-wider font-bold rounded-xs border border-palette-sand/70 bg-bg hover:border-palette-amber text-heading"
                  >
                    Mark Read
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    title="Delete Inquiry"
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-7 p-12 text-center rounded-xs border border-palette-sand/70 bg-bg">
              <p className="font-heading text-[20px] font-medium text-heading">Select an Inquiry</p>
              <p className="text-[13.5px] text-muted mt-1">Select any visitor submission from the left inbox to view full details.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xs border border-palette-sand/70 bg-bg">
          <p className="font-heading text-[20px] font-medium text-heading">No Inquiries Received</p>
          <p className="text-[13.5px] text-muted mt-1">Visitor submissions sent from the Contact page will appear here.</p>
        </div>
      )}
    </div>
  );
}
