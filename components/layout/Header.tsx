"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNavItems, type NavItem } from "@/lib/navigation";

type HeaderProps = {
  items?: NavItem[];
  brandLabel?: string;
  brandHref?: string;
};

export function Header({
  items = mainNavItems,
  brandLabel = "Central Asian Museum",
  brandHref = "/",
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-6 md:px-10 lg:px-14 lg:py-8">
        <Link
          href={brandHref}
          className="font-heading text-[22px] font-medium tracking-[0.02em] text-white md:text-[26px]"
        >
          {brandLabel}
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/90 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            className={`absolute h-px w-5 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`absolute h-px w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-px w-5 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </div>

      <div
        className={`border-t border-white/15 bg-[#282421] lg:hidden ${open ? "block" : "hidden"}`}
      >
        <nav
          className="mx-auto flex max-w-[1440px] flex-col gap-1 px-6 py-6"
          aria-label="Mobile"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-white/90 transition-colors hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
