import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Support | Central Asian Museum, Leh",
  description:
    "Visit, contact or support the Central Asian Museum, Tsas Soma Garden, Leh, Ladakh.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-body">
      <Header variant="solid" />

      <main className="flex-1">
        {/* contact.hero */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-12 sm:py-16 md:py-18 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl"
          />
          <Container className="relative z-10">
            <div>
              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                Plan Your Visit &amp; Get in Touch
              </h1>
              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                Whether you are planning a visit, arranging a school or group trip, or enquiring about research access, we would be glad to hear from you.
              </p>
            </div>
          </Container>
        </section>

        {/* contact.details */}
        <section id="visit" className="scroll-mt-24 py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <div className="border border-palette-sand/80 rounded-xs bg-surface p-8 sm:p-10 md:p-12 shadow-sm">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8 lg:pr-12 lg:border-r lg:border-palette-sand/70">
                  <h2 className="font-heading text-[30px] font-medium text-heading md:text-[36px]">
                    Send an Enquiry
                  </h2>
                  <Suspense
                    fallback={
                      <div className="p-8 text-center text-[13px] text-muted">
                        Loading form...
                      </div>
                    }
                  >
                    <ContactForm />
                  </Suspense>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-start gap-7">
                  <div className="pb-7 border-b border-palette-sand/70">
                    <div className="flex items-center gap-2.5 text-palette-amber mb-3">
                      <Icon
                        name="map-pin"
                        size={20}
                        className="text-palette-amber shrink-0"
                      />
                      <h3 className="font-heading text-[20px] font-medium text-heading">
                        Museum Location
                      </h3>
                    </div>
                    <p className="text-[14px] leading-relaxed text-body">
                      <a
                        href="https://maps.app.goo.gl/CHsSHHyECqD3nZUe7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-heading underline underline-offset-2 transition-colors font-medium"
                        title="View Central Asian Museum on Google Maps"
                      >
                        Tsas Soma, Main Market, Leh, Ladakh 194101
                      </a>
                    </p>
                  </div>

                  <div className="pb-7 border-b border-palette-sand/70">
                    <div className="flex items-center gap-2.5 text-palette-amber mb-3">
                      <Icon
                        name="clock"
                        size={20}
                        className="text-palette-amber shrink-0"
                      />
                      <h3 className="font-heading text-[20px] font-medium text-heading">
                        Opening Hours
                      </h3>
                    </div>
                    <p className="text-[14px] leading-relaxed text-body">
                      Summer: 10 am to 6 pm
                      <button
                        type="button"
                        className="hours-info"
                        aria-label="Summer: May to October"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width={13}
                          height={13}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9.5" />
                          <path d="M12 11v5.5" />
                          <circle cx="12" cy="7.6" r="0.6" fill="currentColor" />
                        </svg>
                        <span className="hours-info__tip" role="tooltip">
                          May to October
                        </span>
                      </button>
                      <br />
                      Winter: 10 am to 5 pm
                    </p>
                  </div>

                  <div className="pb-7 border-b border-palette-sand/70">
                    <div className="flex items-center gap-2.5 text-palette-amber mb-3">
                      <Icon
                        name="ticket"
                        size={20}
                        className="text-palette-amber shrink-0"
                      />
                      <h3 className="font-heading text-[20px] font-medium text-heading">
                        Entry Fees
                      </h3>
                    </div>
                    <ul className="text-[14px] leading-relaxed text-body">
                      <li>
                        <span aria-label="50 rupees">₹50</span> · Indian nationals
                      </li>
                      <li>
                        <span aria-label="30 rupees">₹30</span> · Students and locals
                      </li>
                      <li>
                        <span aria-label="200 rupees">₹200</span> · Foreign nationals
                      </li>
                    </ul>
                  </div>

                  <div className="pb-7 border-b border-palette-sand/70">
                    <div className="flex items-center gap-2.5 text-palette-amber mb-3">
                      <Icon
                        name="phone"
                        size={20}
                        className="text-palette-amber shrink-0"
                      />
                      <h3 className="font-heading text-[20px] font-medium text-heading">
                        Phone
                      </h3>
                    </div>
                    <p className="text-[14px] leading-relaxed text-body">
                      <a className="hover:text-heading" href="tel:+919596919597">
                        +91 95969 19597
                      </a>
                    </p>
                  </div>

                  <div className="pb-7 border-b border-palette-sand/70">
                    <div className="flex items-center gap-2.5 text-palette-amber mb-3">
                      <Icon
                        name="mail"
                        size={20}
                        className="text-palette-amber shrink-0"
                      />
                      <h3 className="font-heading text-[20px] font-medium text-heading">
                        Email
                      </h3>
                    </div>
                    <p className="text-[14px] leading-relaxed text-body break-all">
                      <a
                        className="hover:text-heading underline underline-offset-2 transition-colors font-medium"
                        href="mailto:centralasianmuseum26@gmail.com"
                      >
                        centralasianmuseum26@gmail.com
                      </a>
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5 text-palette-amber mb-3">
                      <img
                        src="/images/instagram.webp"
                        alt=""
                        width={20}
                        height={20}
                        aria-hidden="true"
                        className="shrink-0"
                      />
                      <h3 className="font-heading text-[20px] font-medium text-heading">
                        Instagram
                      </h3>
                    </div>
                    <p className="text-[14px] leading-relaxed text-body">
                      <a
                        className="hover:text-heading underline underline-offset-2 transition-colors font-medium"
                        href="https://www.instagram.com/centralasianmuseum_leh/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @centralasianmuseum_leh
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* contact.donate */}
        <section
          id="donate"
          className="scroll-mt-24 border-t border-border-subtle bg-bg-secondary py-14 sm:py-16 md:py-18 lg:py-20"
        >
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <SectionHeading
                  kicker="Support the Museum"
                  title="Why Donate"
                />
                <p className="mt-6 text-[15px] leading-relaxed text-body md:text-[16px]">
                  The Central Asian Museum is a non-profit that relies entirely on donations and visitor ticket income to operate and care for its collections. Your contribution directly supports the preservation, conservation and documentation of important cultural artefacts and helps us create educational programmes and opportunities for the local community. By donating, you become part of an effort to safeguard Ladakh’s diverse trade heritage and ensure that it remains accessible for future generations.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-sm border border-border bg-surface p-7 md:p-8">
                  <h3 className="font-heading text-[22px] font-medium text-heading">
                    Bank Transfer Details
                  </h3>
                  <dl className="mt-6 space-y-4 text-[14px]">
                    <div className="flex flex-col gap-1 border-b border-border-subtle pb-3 sm:flex-row sm:justify-between">
                      <dt className="text-muted">Account name</dt>
                      <dd className="font-semibold text-heading">
                        Central Asian Museum
                      </dd>
                    </div>

                    <div className="flex flex-col gap-1 border-b border-border-subtle pb-3 sm:flex-row sm:justify-between">
                      <dt className="text-muted">Bank &amp; branch</dt>
                      <dd className="font-semibold text-heading">
                        J&amp;K Bank, Leh
                      </dd>
                    </div>

                    <div className="flex flex-col gap-1 border-b border-border-subtle pb-3 sm:flex-row sm:justify-between">
                      <dt className="text-muted">Account number</dt>
                      <dd className="font-semibold text-heading">
                        0069040100048210
                      </dd>
                    </div>

                    <div className="flex flex-col gap-1 border-b border-border-subtle pb-3 sm:flex-row sm:justify-between">
                      <dt className="text-muted">IFSC</dt>
                      <dd className="font-semibold text-heading">
                        JAKA0PRIEST
                      </dd>
                    </div>
                  </dl>
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
