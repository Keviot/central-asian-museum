import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { mainNavItems } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-dark text-light-text">
      <Container className="pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="font-heading text-[26px] font-medium tracking-[0.02em] text-white md:text-[28px]"
            >
              Central Asian Museum
            </Link>
            <p className="mt-4 max-w-95 text-[14px] leading-relaxed text-white/75 md:text-[15px]">
              Dedicated to celebrating and safeguarding centuries of artistic, architectural, and cultural heritage shaped along the historic Silk Road.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-palette-amber" />
              <p className="text-[12px] uppercase tracking-[0.16em] text-palette-sand">
                Permanent & Traveling Exhibitions
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <p className="font-heading text-[18px] font-medium text-white">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-[14px] text-white/75 transition-colors duration-200 hover:text-white"
                  >
                    <Icon
                      name="chevron-right"
                      size={14}
                      className="text-palette-sage opacity-80"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div className="lg:col-span-4">
            <p className="font-heading text-[18px] font-medium text-white">
              Visiting Hours & Location
            </p>
            <div className="mt-5 space-y-4 text-[14px] text-white/75">
              <div className="flex items-start gap-3">
                <Icon
                  name="clock"
                  size={18}
                  className="mt-0.5 text-palette-amber shrink-0"
                />
                <div>
                  <p className="font-medium text-white">Tuesday – Sunday</p>
                  <p className="text-[13px] text-white/60">
                    10:00 AM – 6:00 PM (Closed Mondays)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon
                  name="map-pin"
                  size={18}
                  className="mt-0.5 text-palette-amber shrink-0"
                />
                <div>
                  <p className="font-medium text-white">Silk Road Cultural Center</p>
                  <p className="text-[13px] text-white/60">
                    Heritage Boulevard, Central District
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col gap-4 text-[12px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Central Asian Museum. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-palette-sand/70">Preserving Silk Road Legacies</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
