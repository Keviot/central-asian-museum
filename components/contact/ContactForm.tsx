"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const intentSubjectMap: Record<string, string> = {
  membership: "Museum Membership & Patronage",
  patron: "Philanthropy & Relic Conservation",
  visits: "Group, School & Guided Visits",
  research: "Research & Archival Access",
  partnership: "Cultural Partnerships & CSR",
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
    <div className="w-full bg-transparent">
      {rawIntent && intentSubjectMap[rawIntent] && (
        <div className="mb-8 flex items-center gap-3 border-b border-palette-amber/40 pb-4 text-[13.5px] text-heading">
          <Icon name="sparkles" size={18} className="text-palette-amber shrink-0" />
          <p>
            Inquiry Intent Pre-selected:{" "}
            <strong className="text-palette-amber font-medium">
              {intentSubjectMap[rawIntent]}
            </strong>
          </p>
        </div>
      )}

      {submitted ? (
        <div className="py-12 border-b border-border-subtle">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-palette-sage/20 text-palette-sage border border-palette-sage/40">
            <Icon name="check" size={24} />
          </div>
          <h3 className="mt-4 font-heading text-[28px] font-medium text-heading">
            Inquiry Received
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-body max-w-md">
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {/* Full Name Field (Line Based) */}
            <div className="group relative">
              <label htmlFor="contact-name" className="block font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-amber mb-1">
                Full Name <span className="text-palette-amber">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full bg-transparent border-b border-border-subtle pb-3 pt-1 text-[15px] text-heading placeholder:text-muted/50 focus:border-palette-amber focus:outline-none transition-colors"
              />
            </div>

            {/* Email Address Field (Line Based) */}
            <div className="group relative">
              <label htmlFor="contact-email" className="block font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-amber mb-1">
                Email Address <span className="text-palette-amber">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eleanor@example.com"
                className="w-full bg-transparent border-b border-border-subtle pb-3 pt-1 text-[15px] text-heading placeholder:text-muted/50 focus:border-palette-amber focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {/* Phone Number Field (Line Based) */}
            <div className="group relative">
              <label htmlFor="contact-phone" className="block font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-amber mb-1">
                Phone Number (Optional)
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-transparent border-b border-border-subtle pb-3 pt-1 text-[15px] text-heading placeholder:text-muted/50 focus:border-palette-amber focus:outline-none transition-colors"
              />
            </div>

            {/* Inquiry Subject (Intent Dropdown - Line Based) */}
            <div className="group relative">
              <label htmlFor="contact-subject" className="block font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-amber mb-1">
                Inquiry Subject <span className="text-palette-amber">*</span>
              </label>
              <select
                id="contact-subject"
                required
                value={subject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-transparent border-b border-border-subtle pb-3 pt-1 text-[15px] text-heading focus:border-palette-amber focus:outline-none transition-colors cursor-pointer"
              >
                <option value="General Museum Inquiry" className="bg-surface text-heading">General Museum Inquiry</option>
                <option value="Museum Membership & Patronage" className="bg-surface text-heading">Museum Membership & Patronage</option>
                <option value="Philanthropy & Relic Conservation" className="bg-surface text-heading">Philanthropy & Relic Conservation</option>
                <option value="Group, School & Guided Visits" className="bg-surface text-heading">Group, School & Guided Visits</option>
                <option value="Research & Archival Access" className="bg-surface text-heading">Research & Archival Access</option>
                <option value="Cultural Partnerships & CSR" className="bg-surface text-heading">Cultural Partnerships & CSR</option>
                <option value="Artifact & Gallery Sponsorship" className="bg-surface text-heading">Artifact & Gallery Sponsorship</option>
              </select>
            </div>
          </div>

          {/* Message Details (Line Based Textarea) */}
          <div className="group relative">
            <label htmlFor="contact-message" className="block font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-palette-amber mb-1">
              Message & Inquiry Details <span className="text-palette-amber">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your support inquiry, date preferences, or research interests..."
              className="w-full bg-transparent border-b border-border-subtle pb-3 pt-1 text-[15px] text-heading placeholder:text-muted/50 focus:border-palette-amber focus:outline-none transition-colors resize-y"
            />
          </div>

          {/* Submit Action */}
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
