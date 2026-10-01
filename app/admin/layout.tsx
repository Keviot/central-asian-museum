"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadLeads, setUnreadLeads] = useState<number>(0);

  const fetchLeadsCount = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.leads)) {
          const unread = data.leads.filter((l: any) => l.status === "unread").length;
          setUnreadLeads(unread);
        }
      }
    } catch (err) {
      // silent
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      }
    } catch (err) {
      // silent
    }
  }, []);

  useEffect(() => {
    if (pathname === "/admin/login") return;

    fetchLeadsCount();
    fetchUser();

    const handleLeadsUpdated = () => {
      fetchLeadsCount();
    };

    window.addEventListener("leads-updated", handleLeadsUpdated);
    return () => {
      window.removeEventListener("leads-updated", handleLeadsUpdated);
    };
  }, [pathname, fetchLeadsCount, fetchUser]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      // silent
    }
    router.push("/admin/login");
    router.refresh();
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navigation: {
    name: string;
    href: string;
    icon: import("@/components/ui/Icon").IconName;
    badge?: number;
  }[] = [
    { name: "Dashboard Overview", href: "/admin/dashboard", icon: "landmark" },
    { name: "Exhibitions Manager", href: "/admin/exhibitions", icon: "sparkles" },
    { name: "News & Events CMS", href: "/admin/news-events", icon: "calendar" },
    { name: "Leads", href: "/admin/leads", icon: "inbox", badge: unreadLeads },
  ];

  return (
    <div className="min-h-screen bg-bg text-body flex flex-col md:flex-row">
      {/* Mobile Top Header - CLEAN LIGHT THEME */}
      <div className="md:hidden bg-white text-heading p-4 flex items-center justify-between border-b border-palette-sand/70 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-palette-wine text-white">
            <Icon name="landmark" size={16} />
          </div>
          <span className="font-heading text-[17px] font-semibold text-heading">Museum Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 text-heading hover:text-palette-wine"
        >
          <Icon name={isMobileMenuOpen ? "close" : "menu"} size={22} />
        </button>
      </div>

      {/* Admin Sidebar Navigation - STICKY NON-SCROLLABLE SIDEBAR */}
      <aside
        className={`w-full md:w-64 shrink-0 bg-white border-r border-palette-sand/70 flex flex-col justify-between shadow-xs md:sticky md:top-0 md:h-screen md:overflow-y-auto ${
          isMobileMenuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-palette-sand/70 bg-bg-secondary/60">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-palette-wine text-white group-hover:scale-105 transition-transform shadow-sm">
                <Icon name="landmark" size={22} />
              </div>
              <div>
                <h1 className="font-heading text-[18px] font-semibold text-heading leading-tight">
                  Central Asian Museum
                </h1>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-palette-amber font-bold mt-0.5">
                  Curatorial CMS
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xs text-[13.5px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-palette-wine text-white font-bold border-l-4 border-palette-amber shadow-sm translate-x-1"
                      : "text-heading hover:bg-bg-secondary hover:text-palette-wine hover:translate-x-1"
                  }`}
                >
                  <Icon name={item.icon} size={17} className={isActive ? "text-palette-amber" : "text-palette-amber/80"} />
                  <span>{item.name}</span>
                  {typeof item.badge === "number" && item.badge > 0 && (
                    <span className="ml-auto min-w-5.5 px-2 py-0.5 rounded-full bg-palette-amber text-[#26171c] text-[11px] font-bold text-center leading-tight">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-palette-sand/70 bg-bg-secondary/60">
          {user && (
            <div className="mb-3 px-2 py-1 border-b border-palette-sand/50 pb-3">
              <p className="text-[13.5px] font-semibold text-heading truncate">{user.name}</p>
              <p className="font-mono text-[10.5px] text-palette-amber font-bold truncate">{user.email}</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 rounded-xs border border-palette-sand/80 bg-white py-2 text-[11.5px] font-mono uppercase tracking-wider text-heading hover:border-palette-amber hover:bg-bg transition-colors shadow-2xs"
            >
              <Icon name="external-link" size={13} />
              <span>Preview Live Site</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-xs bg-palette-wine hover:bg-palette-wine/90 py-2 text-[11.5px] font-mono uppercase tracking-wider text-white transition-colors cursor-pointer shadow-xs font-bold"
            >
              <Icon name="close" size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Admin Header (As per CAM Curatorial CMS) */}
        <header className="bg-white text-heading border-b border-palette-sand/70 py-4 px-6 sm:px-10 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-palette-wine text-white shadow-xs">
              <Icon name="landmark" size={18} />
            </div>
            <div>
              <h1 className="font-heading text-[18px] sm:text-[20px] font-semibold text-heading leading-tight">
                Central Asian Museum CMS
              </h1>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-palette-amber font-bold">
                Curatorial Administration Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-[13.5px] font-bold text-heading">{user?.name || "Chief Curator"}</p>
              <p className="font-mono text-[10.5px] text-palette-amber font-medium">{user?.email || "sample account"}</p>
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

        {/* Subpage View */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
