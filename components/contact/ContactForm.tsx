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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subject = selectedSubject ?? defaultSubject;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit inquiry");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected transmission error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-transparent">
      {rawIntent && intentSubjectMap[rawIntent] && (
        <div className="mb-8 flex items-center gap-3 rounded-xs border border-palette-amber/40 bg-palette-amber/10 p-4 text-[13.5px] text-heading">
          <Icon name="sparkles" size={18} className="text-palette-amber shrink-0" />
          <p>
            Inquiry Intent Pre-selected:{" "}
            <strong className="text-palette-amber font-bold">
              {intentSubjectMap[rawIntent]}
            </strong>
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xs border border-palette-wine/50 bg-palette-wine/10 text-[13.5px] text-palette-wine">
          {error}
        </div>
      )}

      {submitted ? (
        <div className="py-12 border-b border-palette-sand/70">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-700 border border-emerald-500/40">
            <Icon name="check" size={24} />
          </div>
          <h3 className="mt-4 font-heading text-[28px] font-semibold text-heading">
            Inquiry Transmitted Successfully
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-body max-w-md">
            Thank you, <strong className="text-heading">{name}</strong>. Your inquiry regarding{" "}
            <strong className="text-palette-amber">{subject}</strong> has been transmitted to our curatorial office and stored in our database. We will reply within 24 business hours.
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
        <form onSubmit={handleSubmit} className="flex flex-col space-y-7">
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="block font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-palette-amber">
                Full Name <span className="text-palette-wine font-extrabold">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full rounded-none border-b border-palette-sand/80 bg-transparent px-0 py-2.5 text-[14.5px] text-heading placeholder:text-muted/50 focus:border-palette-amber focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="block font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-palette-amber">
                Email Address <span className="text-palette-wine font-extrabold">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eleanor@example.com"
                className="w-full rounded-none border-b border-palette-sand/80 bg-transparent px-0 py-2.5 text-[14.5px] text-heading placeholder:text-muted/50 focus:border-palette-amber focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Phone & Inquiry Subject */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="contact-phone" className="block font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-palette-amber">
                Phone Number (Optional)
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-none border-b border-palette-sand/80 bg-transparent px-0 py-2.5 text-[14.5px] text-heading placeholder:text-muted/50 focus:border-palette-amber focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-subject" className="block font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-palette-amber">
                Inquiry Subject <span className="text-palette-wine font-extrabold">*</span>
              </label>
              <select
                id="contact-subject"
                required
                value={subject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full rounded-none border-b border-palette-sand/80 bg-transparent px-0 py-2.5 text-[14.5px] text-heading focus:border-palette-amber focus:outline-none transition-colors cursor-pointer"
              >
                <option value="General Museum Inquiry" className="bg-white text-heading">General Museum Inquiry</option>
                <option value="Museum Membership & Patronage" className="bg-white text-heading">Museum Membership & Patronage</option>
                <option value="Philanthropy & Relic Conservation" className="bg-white text-heading">Philanthropy & Relic Conservation</option>
                <option value="Group, School & Guided Visits" className="bg-white text-heading">Group, School & Guided Visits</option>
                <option value="Research & Archival Access" className="bg-white text-heading">Research & Archival Access</option>
                <option value="Cultural Partnerships & CSR" className="bg-white text-heading">Cultural Partnerships & CSR</option>
                <option value="Artifact & Gallery Sponsorship" className="bg-white text-heading">Artifact & Gallery Sponsorship</option>
              </select>
            </div>
          </div>

          {/* Row 3: Message Textarea */}
          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="block font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-palette-amber">
              Message & Inquiry Details <span className="text-palette-wine font-extrabold">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your support inquiry, date preferences, or research interests..."
              className="w-full rounded-none border-b border-palette-sand/80 bg-transparent px-0 py-2.5 text-[14.5px] text-heading placeholder:text-muted/50 focus:border-palette-amber focus:outline-none transition-colors resize-y"
            />
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xs bg-palette-wine hover:bg-palette-wine/90 border border-palette-wine/30 text-[12.5px] font-mono font-bold uppercase tracking-[0.18em] text-white shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isSubmitting ? "Transmitting..." : "Submit Inquiry"}</span>
              <Icon name="arrow-right" size={16} className="text-palette-amber" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
