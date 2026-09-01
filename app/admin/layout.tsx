"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (pathname === "/admin/login") return;

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
      }
    }
    checkAuth();
  }, [pathname, router]);

  // Skip sidebar layout for login page after hooks initialization
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navigation: { name: string; href: string; icon: import("@/components/ui/Icon").IconName }[] = [
    { name: "Dashboard Overview", href: "/admin/dashboard", icon: "landmark" },
    { name: "Exhibitions Manager", href: "/admin/exhibitions", icon: "sparkles" },
    { name: "News & Events CMS", href: "/admin/news-events", icon: "calendar" },
    // { name: "Visitor Inquiries", href: "/admin/inquiries", icon: "mail" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#4E4841] flex flex-col md:flex-row">
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
          <div className="p-6 border-b border-palette-sand/70 bg-[#F3EFE8]/60">
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
                      : "text-heading hover:bg-[#F3EFE8] hover:text-palette-wine hover:translate-x-1"
                  }`}
                >
                  <Icon name={item.icon} size={17} className={isActive ? "text-palette-amber" : "text-palette-amber/80"} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-palette-sand/70 bg-[#F3EFE8]/60">
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
              className="w-full flex items-center justify-center gap-2 rounded-xs border border-palette-sand/80 bg-white py-2 text-[11.5px] font-mono uppercase tracking-wider text-heading hover:border-palette-amber hover:bg-[#FAF8F5] transition-colors shadow-2xs"
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

      {/* Main Admin Page Content */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
