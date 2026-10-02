"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { mainNavItems, type NavItem } from "@/lib/navigation";
import { Icon } from "@/components/ui/Icon";

type HeaderProps = {
  items?: NavItem[];
  brandLabel?: string;
  brandHref?: string;
  logoSrc?: string;
  variant?: "transparent" | "solid";
};

export function Header({
  items = mainNavItems,
  brandLabel = "Central Asian Museum",
  brandHref = "/",
  logoSrc = "/images/logo/cam-logo-dark.webp",
  variant = "transparent",
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const isSolid = variant === "solid";

  return (
    <header
      className={`z-50 w-full transition-colors duration-300 ${
        isSolid
          ? "sticky top-0 bg-surface-dark text-white shadow-md"
          : "absolute inset-x-0 top-0 text-white"
      }`}
    >
      <div className="mx-auto flex max-w-360 items-center justify-between gap-6 px-6 py-4 md:px-10 lg:px-14 lg:py-5">
        <Link
          href={brandHref}
          className="inline-flex items-center shrink-0 transition-opacity hover:opacity-90"
          aria-label={`${brandLabel}: home`}
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={brandLabel}
              width={104}
              height={101}
              priority
              className="h-auto w-16 md:w-20 lg:w-26 object-contain transition-transform duration-200"
            />
          ) : (
            <span className="font-heading text-[22px] font-medium tracking-[0.02em] text-white md:text-[26px]">
              {brandLabel}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label="Primary">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && item.href !== "/about" && pathname?.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-[14px] uppercase tracking-[0.14em] transition-colors duration-200 py-1 ${
                  isActive
                    ? "text-white font-semibold after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-palette-amber"
                    : "text-white/80 font-medium hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-white/80 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-surface-dark px-6 py-6 lg:hidden">
          <nav className="mx-auto flex max-w-360 flex-col gap-2" aria-label="Mobile">
            {items.map((item) => {
              const isActive =
              pathname === item.href ||
              (item.href !== "/" && item.href !== "/about" && pathname?.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`py-3 text-[13px] uppercase tracking-[0.14em] transition-colors ${
                    isActive
                      ? "text-palette-amber font-bold border-l-2 border-palette-amber pl-3"
                      : "text-white/90 font-medium hover:text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
