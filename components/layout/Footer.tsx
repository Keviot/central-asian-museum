import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { footerNavItems } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="site-footer border-t border-border bg-surface-dark text-light-text">
      <Container className="site-footer__inner pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="site-footer__grid grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="site-footer__brand lg:col-span-5">
            <Link
              className="footer-brand"
              href="/"
              aria-label="Central Asian Museum, Leh: home"
            >
              <Image
                className="footer-brand__logo"
                src="/images/logo/cam-logo-dark.webp"
                alt="Central Asian Museum, Leh"
                width={140}
                height={136}
              />
            </Link>
            <p className="site-footer__tagline mt-6 max-w-95 text-[14px] leading-relaxed text-white/75 md:text-[15px]">
              Documenting the historical connections between Ladakh and the wider Central Asian world.
            </p>
            <div className="mt-4">
              <Link
                href="/admin/login"
                className="text-[13px] text-white/50 transition-colors duration-200 hover:text-white hover:underline underline-offset-4"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <p className="site-footer__heading font-heading text-[18px] font-medium text-white">
              Explore
            </p>
            <ul className="site-footer__links mt-5 space-y-3">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="inline-flex items-center gap-2 text-[14px] text-white/75 transition-colors duration-200 hover:text-white"
                    href={item.href}
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
            <p className="site-footer__heading font-heading text-[18px] font-medium text-white">
              Visiting Hours &amp; Location
            </p>
            <div className="site-footer__visit mt-5 space-y-4 text-[14px] text-white/75">
              <div className="flex items-start gap-3">
                <Icon
                  name="clock"
                  size={18}
                  className="mt-0.5 text-palette-amber shrink-0"
                />
                <div>
                  <p className="font-medium text-white">Opening hours</p>
                  <p className="text-[13px] text-white/60">
                    Summer (May to October): 10 am to 6 pm
                    <br />
                    Winter: 10 am to 5 pm
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
                  <p className="font-medium text-white">Address</p>
                  <a
                    href="https://maps.app.goo.gl/CHsSHHyECqD3nZUe7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-white/60 hover:text-white transition-colors underline decoration-white/30 underline-offset-2 hover:decoration-white"
                    title="View Central Asian Museum on Google Maps"
                  >
                    Tsas Soma, Main Market, Leh, Ladakh 194101
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="site-footer__bottom mt-14 border-t border-white/10 pt-8 flex flex-col gap-4 text-[12px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Central Asian Museum, Leh. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-palette-sand/70">
              At the crossroads of Ladakh and Central Asia
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

