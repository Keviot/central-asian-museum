import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Inquiries | Central Asian Museum",
  description:
    "Get in touch with the Central Asian Museum curatorial office for memberships, research access, group visits, and conservation philanthropy.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-body">
      <Header variant="solid" />

      <main className="flex-1 bg-white">
        {/* Contact Hero Banner - Warm Sand Header Section */}
        <section className="relative overflow-hidden bg-[#F3EFE8] pt-28 pb-14 md:pt-36 md:pb-16 border-b border-palette-sand/60">
          <div
            className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-palette-amber/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-palette-rose/20 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            {/* Breadcrumb */}
            <nav
              className="mb-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-muted font-mono"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-palette-wine transition-colors">
                Home
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-amber" />
              <span className="text-heading font-bold">Contact & Inquiries</span>
            </nav>

            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-palette-amber" aria-hidden="true" />
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-palette-amber font-mono md:text-[12px]">
                  Curatorial Office & Visitor Services
                </p>
              </div>

              <h1 className="font-heading text-[38px] font-semibold leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[56px] lg:text-[64px]">
                Plan Your Visit & Support Inquiries
              </h1>

              <p className="mt-6 text-[16.5px] font-normal leading-relaxed text-body md:text-[18.5px] max-w-2xl">
                Whether you are joining as an annual patron, requesting archival manuscript research access, or booking a group tour, our team is at your service.
              </p>
            </div>
          </Container>
        </section>

        {/* Main Section - COMPLETELY WHITE BACKGROUND (MATCHING HOMEPAGE SECOND SECTION) */}
        <section className="py-16 md:py-20 bg-white">
          <Container>
            {/* Outer Enclosed Architectural Line Frame Box - CRISP WHITE CANVAS */}
            <div className="border border-palette-sand/80 rounded-xs bg-white p-8 sm:p-10 md:p-12 shadow-sm">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
                {/* Left Column: Form with Vertical Right Line */}
                <div className="lg:col-span-8 lg:pr-12 lg:border-r lg:border-palette-sand/70">
                  <Suspense fallback={<div className="p-8 text-center text-muted font-mono text-[13px]">Loading Inquiry Form...</div>}>
                    <ContactForm />
                  </Suspense>
                </div>

                {/* Right Column: Natural Comfortable Spacing & Line Dividers */}
                <div className="lg:col-span-4 flex flex-col justify-start gap-7">
                  {/* Museum Location Block */}
                  <div className="pb-7 border-b border-palette-sand/70">
                    <div className="flex items-center gap-2.5 text-palette-amber mb-3">
                      <Icon name="map-pin" size={18} className="text-palette-amber shrink-0" />
                      <h3 className="font-heading text-[20px] font-medium text-heading">
                        Museum Location
                      </h3>
                    </div>
                    <p className="text-[14px] leading-relaxed text-body">
                      Sheynam, Main Market Road, Leh, Ladakh 194101, India
                    </p>
                  </div>

                  {/* Gallery Hours Block */}
                  <div className="pb-7 border-b border-palette-sand/70">
                    <div className="flex items-center gap-2.5 text-palette-amber mb-3">
                      <Icon name="clock" size={18} className="text-palette-amber shrink-0" />
                      <h3 className="font-heading text-[20px] font-medium text-heading">
                        Gallery Hours
                      </h3>
                    </div>
                    <div className="text-[13.5px] leading-relaxed text-body space-y-2">
                      <p className="flex justify-between items-center">
                        <span className="text-muted">Monday – Saturday:</span>
                        <span className="font-semibold text-heading">9:30 AM – 6:00 PM</span>
                      </p>
                      <p className="flex justify-between items-center">
                        <span className="text-muted">Sunday:</span>
                        <span className="font-semibold text-heading">10:00 AM – 4:00 PM</span>
                      </p>
                    </div>
                  </div>

                  {/* Direct Inquiries Block */}
                  <div>
                    <div className="flex items-center gap-2.5 text-palette-amber mb-3">
                      <Icon name="landmark" size={18} className="text-palette-amber shrink-0" />
                      <h3 className="font-heading text-[20px] font-medium text-heading">
                        Direct Inquiries
                      </h3>
                    </div>
                    <div className="text-[13.5px] leading-relaxed text-body space-y-3">
                      <div>
                        <p className="text-muted text-[12px] font-medium">Visitor Desk:</p>
                        <a href="mailto:info@centralasianmuseum.org" className="text-heading font-medium hover:text-palette-wine transition-colors">
                          info@centralasianmuseum.org
                        </a>
                      </div>
                      <div>
                        <p className="text-muted text-[12px] font-medium">Curatorial Archive:</p>
                        <a href="mailto:archives@centralasianmuseum.org" className="text-heading font-medium hover:text-palette-wine transition-colors">
                          archives@centralasianmuseum.org
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
