"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const intentSubjectMap: Record<string, string> = {
  membership: "Museum Membership & Annual Patronage",
  patron: "Philanthropy, Donations & Relic Conservation",
  visits: "Group, School & Guided Visits",
  research: "Research & Archival Access Requests",
  partnership: "Cultural Partnerships & Collaborations",
  sponsorship: "Artifact & Gallery Sponsorship",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const rawIntent = searchParams.get("intent") || "";
  const defaultSubject = intentSubjectMap[rawIntent] || "General Museum Inquiry";

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subject = selectedSubject ?? defaultSubject;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full rounded-sm border border-border bg-surface p-6 sm:p-8 md:p-10 shadow-sm">
      {rawIntent && intentSubjectMap[rawIntent] && (
        <div className="mb-6 flex items-center gap-3 rounded-xs border border-palette-amber/40 bg-palette-amber/10 px-4 py-3 text-[13px] text-heading">
          <Icon name="sparkles" size={18} className="text-palette-amber shrink-0" />
          <p>
            Intent Detected: Pre-selected subject for{" "}
            <strong className="text-palette-amber font-semibold">
              {intentSubjectMap[rawIntent]}
            </strong>
          </p>
        </div>
      )}

      {submitted ? (
        <div className="py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-palette-sage/20 text-palette-sage border border-palette-sage/40">
            <Icon name="check" size={26} />
          </div>
          <h3 className="mt-4 font-heading text-[28px] font-medium text-heading">
            Inquiry Received
          </h3>
          <p className="mt-2 text-[15px] text-body max-w-md mx-auto">
            Thank you, <strong className="text-heading">{name}</strong>. Your inquiry regarding{" "}
            <strong className="text-palette-amber">{subject}</strong> has been transmitted to our curatorial office. We will reply within 24 business hours.
          </p>
          <div className="mt-8">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSubmitted(false);
                setMessage("");
              }}
            >
              Send Another Inquiry
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label htmlFor="contact-name" className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-heading mb-2">
                Full Name <span className="text-palette-amber">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full rounded-[3px] border border-border bg-bg-secondary px-4 py-3 text-[14px] text-heading placeholder:text-muted focus:border-btn-bg focus:outline-none transition-colors"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="contact-email" className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-heading mb-2">
                Email Address <span className="text-palette-amber">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eleanor@example.com"
                className="w-full rounded-[3px] border border-border bg-bg-secondary px-4 py-3 text-[14px] text-heading placeholder:text-muted focus:border-btn-bg focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Phone Number */}
            <div>
              <label htmlFor="contact-phone" className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-heading mb-2">
                Phone Number (Optional)
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-[3px] border border-border bg-bg-secondary px-4 py-3 text-[14px] text-heading placeholder:text-muted focus:border-btn-bg focus:outline-none transition-colors"
              />
            </div>

            {/* Inquiry Subject (Intent Dropdown) */}
            <div>
              <label htmlFor="contact-subject" className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-heading mb-2">
                Inquiry Subject <span className="text-palette-amber">*</span>
              </label>
              <select
                id="contact-subject"
                required
                value={subject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full rounded-[3px] border border-border bg-bg-secondary px-4 py-3 text-[14px] text-heading focus:border-btn-bg focus:outline-none transition-colors"
              >
                <option value="General Museum Inquiry">General Museum Inquiry</option>
                <option value="Museum Membership & Annual Patronage">Museum Membership & Annual Patronage</option>
                <option value="Philanthropy, Donations & Relic Conservation">Philanthropy, Donations & Relic Conservation</option>
                <option value="Group, School & Guided Visits">Group, School & Guided Visits</option>
                <option value="Research & Archival Access Requests">Research & Archival Access Requests</option>
                <option value="Cultural Partnerships & Collaborations">Cultural Partnerships & Collaborations</option>
                <option value="Artifact & Gallery Sponsorship">Artifact & Gallery Sponsorship</option>
              </select>
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="contact-message" className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-heading mb-2">
              Message & Inquiry Details <span className="text-palette-amber">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your support inquiry, date preferences, or research interests..."
              className="w-full rounded-[3px] border border-border bg-bg-secondary p-4 text-[14px] text-heading placeholder:text-muted focus:border-btn-bg focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" icon="arrow-right" className="w-full sm:w-auto">
              Submit Inquiry
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
