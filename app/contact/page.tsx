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
    <div className="flex min-h-screen flex-col bg-bg">
      <Header variant="solid" />

      <main className="flex-1">
        {/* Contact Hero Section */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-16 md:py-24">
          <div
            className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-palette-amber/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            {/* Breadcrumb */}
            <nav
              className="mb-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-heading transition-colors">
                Home
              </Link>
              <Icon name="chevron-right" size={12} className="text-palette-sage" />
              <span className="text-heading font-medium">Contact & Support</span>
            </nav>

            <div className="max-w-200">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary md:text-[12px]">
                  Curatorial Office & Visitor Services
                </p>
              </div>

              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                Plan Your Visit & Support Inquiries
              </h1>

              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                Whether you are joining as an annual patron, requesting archival manuscript research, or booking a group tour, our team is at your service.
              </p>
            </div>
          </Container>
        </section>

        {/* Main Form & Info Section */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left Column: Interactive Contact Form */}
              <div className="lg:col-span-8">
                <Suspense fallback={<div className="p-8 text-center text-muted">Loading Inquiry Form...</div>}>
                  <ContactForm />
                </Suspense>
              </div>

              {/* Right Column: Museum Hours & Direct Contacts */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                {/* Museum Location Box */}
                <div className="rounded-sm border border-border bg-surface p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-3 text-palette-amber mb-3">
                    <Icon name="map-pin" size={20} />
                    <h3 className="font-heading text-[20px] font-medium text-heading">
                      Museum Location
                    </h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-body">
                    Sheynam, Main Market Road<br />
                    Leh, Ladakh 194101<br />
                    India
                  </p>
                </div>

                {/* Museum Hours Box */}
                <div className="rounded-sm border border-border bg-surface p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-3 text-palette-amber mb-3">
                    <Icon name="clock" size={20} />
                    <h3 className="font-heading text-[20px] font-medium text-heading">
                      Gallery Hours
                    </h3>
                  </div>
                  <div className="text-[14px] leading-relaxed text-body space-y-1.5">
                    <p className="flex justify-between">
                      <span className="text-muted">Monday – Saturday:</span>
                      <span className="font-medium text-heading">9:30 AM – 6:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted">Sunday:</span>
                      <span className="font-medium text-heading">10:00 AM – 4:00 PM</span>
                    </p>
                  </div>
                </div>

                {/* Direct Contact Box */}
                <div className="rounded-sm border border-border bg-surface p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-3 text-palette-amber mb-3">
                    <Icon name="landmark" size={20} />
                    <h3 className="font-heading text-[20px] font-medium text-heading">
                      Direct Inquiries
                    </h3>
                  </div>
                  <div className="text-[14px] leading-relaxed text-body space-y-2">
                    <p>
                      <strong className="text-heading font-medium block">Visitor Desk:</strong>
                      info@centralasianmuseum.org
                    </p>
                    <p>
                      <strong className="text-heading font-medium block">Curatorial Archive:</strong>
                      archives@centralasianmuseum.org
                    </p>
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
