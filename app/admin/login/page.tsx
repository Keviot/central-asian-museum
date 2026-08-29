"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin/dashboard";

  const [email, setEmail] = useState("admin@centralasianmuseum.org");
  const [password, setPassword] = useState("MuseumAdmin2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAF8F5] text-heading p-6">
      {/* Decorative Subtle Sand Radial Backdrop Glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-palette-rose/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-xs border border-palette-sand/80 bg-white p-8 sm:p-10 shadow-xl">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-palette-wine text-white hover:scale-105 transition-transform shadow-md">
            <Icon name="landmark" size={28} />
          </Link>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-palette-amber font-bold block">
              Central Asian Museum Leh
            </span>
            <h1 className="font-heading text-[32px] sm:text-[36px] font-semibold text-heading tracking-tight mt-1">
              Curatorial CMS Portal
            </h1>
            <p className="text-[13.5px] text-body mt-1">
              Sign in with administrative access to manage exhibitions, events, and visitor inquiries.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xs border border-palette-wine/50 bg-palette-wine/10 text-[13.5px] text-palette-wine font-mono flex items-center gap-2">
            <Icon name="close" size={16} className="text-palette-wine shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-palette-amber">
              Curator Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@centralasianmuseum.org"
              className="w-full rounded-xs border border-palette-sand/80 bg-[#F3EFE8]/70 px-4 py-3 text-[14px] text-heading placeholder:text-muted/60 focus:border-palette-amber focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-palette-amber">
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xs border border-palette-sand/80 bg-[#F3EFE8]/70 px-4 py-3 text-[14px] text-heading placeholder:text-muted/60 focus:border-palette-amber focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xs bg-palette-wine hover:bg-palette-wine/90 border border-palette-wine/30 py-3.5 text-[12.5px] font-mono font-bold uppercase tracking-[0.18em] text-white shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{loading ? "Authenticating..." : "Access Curatorial Panel"}</span>
            <Icon name="arrow-right" size={16} className="text-white" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-palette-sand/60 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[11.5px] uppercase tracking-wider text-body hover:text-palette-wine transition-colors"
          >
            <span>← Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
