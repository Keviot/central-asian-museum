"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [unreadLeads, setUnreadLeads] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const authRes = await fetch("/api/admin/me");
        if (!authRes.ok) {
          router.push("/admin/login");
          return;
        }
        const authData = await authRes.json();
        setUser(authData.user);

        // Fetch leads unread count
        const leadsRes = await fetch("/api/admin/leads");
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          if (Array.isArray(leadsData.leads)) {
            const unread = leadsData.leads.filter((l: any) => l.status === "unread").length;
            setUnreadLeads(unread);
          }
        }
      } catch (error) {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-bg text-heading">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-palette-amber/30 border-t-palette-amber animate-spin" />
          <span className="font-mono text-[13px] uppercase tracking-widest text-palette-amber font-bold">
            Verifying Curatorial Session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 py-10">
      {/* Welcome Header Card */}
      <div className="p-8 rounded-xs border border-palette-sand/80 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-palette-amber font-bold mb-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Admin Session</span>
          </div>
          <h2 className="font-heading text-[28px] sm:text-[32px] font-semibold text-heading">
            Welcome back, {user?.name || "Curator"}
          </h2>
          <p className="text-[14px] text-body mt-1 max-w-2xl">
            You are authenticated with full administrator privileges to manage museum exhibitions, news &amp; events, press releases, and visitor enquiries.
          </p>
        </div>

        <Button href="/" variant="outline" size="sm" icon="arrow-right" className="shrink-0">
          View Live Website
        </Button>
      </div>

      {/* Management Module Grid - 3 Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Module 1: Exhibitions Manager */}
        <div className="p-7 rounded-xs border border-palette-sand/80 bg-white flex flex-col justify-between hover:border-palette-amber transition-colors shadow-2xs group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xs bg-palette-amber/15 text-palette-amber">
                <Icon name="sparkles" size={24} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-palette-amber font-bold bg-palette-amber/10 px-2.5 py-1 rounded-xs">
                CMS Module
              </span>
            </div>
            <h3 className="font-heading text-[22px] font-semibold text-heading group-hover:text-palette-amber transition-colors">
              Exhibitions Manager
            </h3>
            <p className="text-[13.5px] text-body leading-relaxed mt-2">
              Create, edit, toggle status, and manage curatorial essays and key artifact highlights for all museum galleries.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-palette-sand/50">
            <Link href="/admin/exhibitions" className="font-mono text-[12px] uppercase tracking-wider text-palette-wine font-bold hover:underline flex items-center gap-1">
              <span>Manage Exhibitions</span>
              <Icon name="arrow-right" size={14} />
            </Link>
          </div>
        </div>

        {/* Module 2: News & Events Manager */}
        <div className="p-7 rounded-xs border border-palette-sand/80 bg-white flex flex-col justify-between hover:border-palette-amber transition-colors shadow-2xs group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xs bg-palette-amber/15 text-palette-amber">
                <Icon name="calendar" size={24} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-palette-amber font-bold bg-palette-amber/10 px-2.5 py-1 rounded-xs">
                CMS Module
              </span>
            </div>
            <h3 className="font-heading text-[22px] font-semibold text-heading group-hover:text-palette-amber transition-colors">
              News &amp; Events CMS
            </h3>
            <p className="text-[13.5px] text-body leading-relaxed mt-2">
              Publish upcoming lectures, archaeological announcements, press releases, and research symposiums.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-palette-sand/50">
            <Link href="/admin/news-events" className="font-mono text-[12px] uppercase tracking-wider text-palette-wine font-bold hover:underline flex items-center gap-1">
              <span>Manage News &amp; Events</span>
              <Icon name="arrow-right" size={14} />
            </Link>
          </div>
        </div>

        {/* Module 3: Leads Portal (Contact Enquiries) */}
        <div className="p-7 rounded-xs border border-palette-sand/80 bg-white flex flex-col justify-between hover:border-palette-amber transition-colors shadow-2xs group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xs bg-palette-amber/15 text-palette-amber">
                <Icon name="inbox" size={24} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-palette-amber font-bold bg-palette-amber/10 px-2.5 py-1 rounded-xs">
                {unreadLeads > 0 ? `${unreadLeads} Unread` : "CMS Module"}
              </span>
            </div>
            <h3 className="font-heading text-[22px] font-semibold text-heading group-hover:text-palette-amber transition-colors">
              Leads Portal
            </h3>
            <p className="text-[13.5px] text-body leading-relaxed mt-2">
              Review and manage enquiries sent from the website&apos;s Contact form. Filter by visits, research, donation, and general enquiries.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-palette-sand/50">
            <Link href="/admin/leads" className="font-mono text-[12px] uppercase tracking-wider text-palette-wine font-bold hover:underline flex items-center gap-1">
              <span>Manage Leads</span>
              <Icon name="arrow-right" size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
