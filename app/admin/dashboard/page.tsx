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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] text-heading">
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#4E4841] flex flex-col">
      {/* Top Admin Header — PRISTINE LIGHT MUSEUM THEME */}
      <header className="bg-white text-heading border-b border-palette-sand/70 py-4 px-6 sm:px-10 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-palette-wine text-white shadow-xs">
            <Icon name="landmark" size={18} />
          </div>
          <div>
            <h1 className="font-heading text-[18px] font-semibold text-heading leading-tight">
              Central Asian Museum CMS
            </h1>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-palette-amber font-bold">
              Curatorial Administration Desk
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:block text-right">
            <p className="text-[13px] font-bold text-heading">{user?.name}</p>
            <p className="font-mono text-[10.5px] text-palette-amber font-medium">{user?.email}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xs bg-palette-wine hover:bg-palette-wine/90 border border-palette-wine/30 px-4 py-2 text-[11.5px] font-mono font-bold uppercase tracking-wider text-white shadow-xs transition-colors cursor-pointer"
          >
            <Icon name="close" size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 py-10">
        {/* Welcome Header Card */}
        <div className="p-8 rounded-xs border border-palette-sand/80 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-palette-amber font-bold mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Admin Session</span>
            </div>
            <h2 className="font-heading text-[28px] sm:text-[32px] font-semibold text-heading">
              Welcome back, {user?.name}
            </h2>
            <p className="text-[14px] text-body mt-1 max-w-2xl">
              You are authenticated with full administrator privileges to manage museum exhibitions, news & events, press releases, and visitor inquiries.
            </p>
          </div>

          <Button href="/" variant="outline" size="sm" icon="arrow-right" className="shrink-0">
            View Live Website
          </Button>
        </div>

        {/* Management Module Grid */}
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
                News & Events CMS
              </h3>
              <p className="text-[13.5px] text-body leading-relaxed mt-2">
                Publish upcoming lectures, archaeological announcements, press releases, and research symposiums.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-palette-sand/50">
              <Link href="/admin/news-events" className="font-mono text-[12px] uppercase tracking-wider text-palette-wine font-bold hover:underline flex items-center gap-1">
                <span>Manage News & Events</span>
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </div>

          {/* Module 3: Contact Inquiry Inbox */}
          <div className="p-7 rounded-xs border border-palette-sand/80 bg-white flex flex-col justify-between hover:border-palette-amber transition-colors shadow-2xs group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xs bg-palette-amber/15 text-palette-amber">
                  <Icon name="mail" size={24} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-palette-amber font-bold bg-palette-amber/10 px-2.5 py-1 rounded-xs">
                  CMS Module
                </span>
              </div>
              <h3 className="font-heading text-[22px] font-semibold text-heading group-hover:text-palette-amber transition-colors">
                Visitor Inquiry Inbox
              </h3>
              <p className="text-[13.5px] text-body leading-relaxed mt-2">
                Review, filter, and respond to incoming contact form submissions, research requests, and group tour bookings.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-palette-sand/50">
              <Link href="/admin/inquiries" className="font-mono text-[12px] uppercase tracking-wider text-palette-wine font-bold hover:underline flex items-center gap-1">
                <span>View Visitor Inbox</span>
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
