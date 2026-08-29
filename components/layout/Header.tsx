"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNavItems, type NavItem } from "@/lib/navigation";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

type HeaderProps = {
  items?: NavItem[];
  brandLabel?: string;
  brandHref?: string;
  variant?: "transparent" | "solid";
};

export function Header({
  items = mainNavItems,
  brandLabel = "Central Asian Museum",
  brandHref = "/",
  variant = "transparent",
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  const isSolid = variant === "solid";

  return (
    <header
      className={`z-50 w-full transition-colors duration-300 ${
        isSolid
          ? "sticky top-0 bg-surface-dark text-white shadow-md"
          : "absolute inset-x-0 top-0 text-white"
      }`}
    >
      <div className="mx-auto flex max-w-360 items-center justify-between gap-6 px-6 py-5 md:px-10 lg:px-14 lg:py-7">
        <Link
          href={brandHref}
          className="font-heading text-[22px] font-medium tracking-[0.02em] text-white transition-opacity hover:opacity-90 md:text-[26px]"
        >
          {brandLabel}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/85 transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Button
            href="/contact"
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          >
            Plan Your Visit
          </Button>
        </div>

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
            <div className="mt-4 pt-4 border-t border-white/10">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => setOpen(false)}
              >
                Plan Your Visit
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
