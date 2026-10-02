"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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

  // Profile Dropdown & Password Modal states
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Password form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

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

  // Click outside listener for profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }
    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      // silent
    }
    router.push("/admin/login");
    router.refresh();
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    setIsSubmittingPassword(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || "Failed to update password.");
      } else {
        setPasswordSuccess("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setIsChangePasswordOpen(false);
          setPasswordSuccess(null);
        }, 1500);
      }
    } catch (err) {
      setPasswordError("Network error. Please try again.");
    } finally {
      setIsSubmittingPassword(false);
    }
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

      {/* Admin Sidebar Navigation - STICKY NON-SCROLLABLE SIDEBAR (CLEAN, NO FOOTER) */}
      <aside
        className={`w-full md:w-64 shrink-0 bg-white border-r border-palette-sand/70 flex flex-col shadow-xs md:sticky md:top-0 md:h-screen md:overflow-y-auto ${
          isMobileMenuOpen ? "block" : "hidden md:flex"
        }`}
      >
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
      </aside>

      {/* Main Admin Content Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Admin Header - CLEAN HEADER WITH RIGHT PROFILE DROPDOWN ONLY */}
        <header className="bg-white text-heading border-b border-palette-sand/70 py-3 px-6 sm:px-10 flex items-center justify-end shadow-2xs relative z-30">
          {/* Profile Menu Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              type="button"
              onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
              aria-label="Admin Profile Menu"
              aria-expanded={isProfileDropdownOpen}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-bg-secondary border border-palette-sand/60 hover:border-palette-amber transition-all cursor-pointer group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-palette-wine text-white shadow-xs group-hover:scale-105 transition-transform">
                <Icon name="user" size={18} />
              </div>
              <Icon
                name="chevron-down"
                size={14}
                className={`text-muted transition-transform duration-200 group-hover:text-palette-wine ${
                  isProfileDropdownOpen ? "rotate-180 text-palette-wine" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xs border border-palette-sand/80 bg-white shadow-lg py-1 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                {/* User Details */}
                <div className="px-4 py-3 border-b border-palette-sand/60 bg-bg-secondary/40">
                  <p className="text-[13.5px] font-semibold text-heading truncate">{user?.name || "Chief Curator"}</p>
                  <p className="font-mono text-[10.5px] text-palette-amber font-bold truncate">{user?.email || "centralasianmuseum26@gmail.com"}</p>
                </div>

                {/* Actions */}
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      setIsChangePasswordOpen(true);
                      setPasswordError(null);
                      setPasswordSuccess(null);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-heading hover:bg-bg-secondary hover:text-palette-wine transition-colors text-left cursor-pointer group"
                  >
                    <Icon name="key" size={15} className="text-palette-amber group-hover:scale-110 transition-transform" />
                    <span>Change Password</span>
                  </button>

                  <Link
                    href="/"
                    target="_blank"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-heading hover:bg-bg-secondary hover:text-palette-wine transition-colors text-left group"
                  >
                    <Icon name="external-link" size={15} className="text-palette-amber group-hover:scale-110 transition-transform" />
                    <span>Preview Live Site</span>
                  </Link>
                </div>

                <div className="border-t border-palette-sand/60 py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-palette-wine hover:bg-palette-wine/10 font-semibold transition-colors text-left cursor-pointer group"
                  >
                    <Icon name="log-out" size={15} className="text-palette-wine group-hover:translate-x-0.5 transition-transform" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Subpage View */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Change Password Modal */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-md rounded-xs border border-palette-sand/80 bg-white p-6 sm:p-8 shadow-xl space-y-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-password-title"
          >
            <div className="flex items-center justify-between border-b border-palette-sand/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-palette-amber/20 text-palette-amber">
                  <Icon name="key" size={18} />
                </div>
                <div>
                  <h2 id="change-password-title" className="font-heading text-[20px] font-semibold text-heading">
                    Change Password
                  </h2>
                  <p className="text-[12px] text-muted">Update your administrative credentials</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChangePasswordOpen(false)}
                className="text-muted hover:text-heading p-1.5 rounded-xs transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            {passwordError && (
              <div className="p-3.5 rounded-xs border border-palette-wine/50 bg-palette-wine/10 text-[13px] text-palette-wine font-medium">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3.5 rounded-xs border border-emerald-600/50 bg-emerald-50 text-[13px] text-emerald-800 font-medium">
                {passwordSuccess}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-palette-amber">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full rounded-xs border border-palette-sand/70 bg-bg-secondary px-4 py-2.5 text-[13.5px] text-heading focus:border-palette-amber focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="rounded-xs border border-palette-sand/80 bg-white px-4 py-2 text-[12px] font-mono uppercase tracking-wider text-heading hover:bg-bg-secondary transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="rounded-xs bg-palette-wine hover:bg-palette-wine/90 px-5 py-2 text-[12px] font-mono font-bold uppercase tracking-wider text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingPassword ? "Updating..." : "Save Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
