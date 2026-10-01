"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";

export function ContactForm() {
  const searchParams = useSearchParams();
  const rawIntent = searchParams.get("intent") || "general";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prevRawIntent, setPrevRawIntent] = useState(rawIntent);
  const [intent, setIntent] = useState(rawIntent);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (rawIntent !== prevRawIntent) {
    setPrevRawIntent(rawIntent);
    setIntent(rawIntent);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const intentLabels: Record<string, string> = {
      general: "General enquiry",
      visits: "Group, school or college visit",
      research: "Research access",
      donation: "Donation",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          intent,
          subject: intentLabels[intent] || intent,
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-8 rounded-xs border border-palette-sand/80 bg-surface p-8 text-center sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <Icon name="check" size={24} />
        </div>
        <h3 className="mt-4 font-heading text-[26px] font-medium text-heading">
          Enquiry Sent
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-body">
          Thank you, <strong className="font-semibold text-heading">{name}</strong>. Your enquiry has been received and our team will get in touch with you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setMessage("");
          }}
          className="mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-palette-wine hover:underline cursor-pointer"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2" onSubmit={handleSubmit}>
      {error && (
        <div className="sm:col-span-2 rounded-xs border border-red-200 bg-red-50 p-4 text-[14px] text-red-700">
          {error}
        </div>
      )}
      <div className="field">
        <label htmlFor="f-name">Name</label>
        <input
          id="f-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input
          id="f-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="f-intent">Subject</label>
        <select
          id="f-intent"
          name="intent"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
        >
          <option value="general">General enquiry</option>
          <option value="visits">Group, school or college visit</option>
          <option value="research">Research access</option>
          <option value="donation">Donation</option>
        </select>
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="f-msg">Message</label>
        <textarea
          id="f-msg"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center justify-center font-medium uppercase rounded-[3px] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 select-none cursor-pointer disabled:cursor-not-allowed bg-btn-bg text-white hover:bg-(--museum-btn-hover) shadow-sm hover:shadow focus-visible:outline-btn-bg px-7 py-3.5 text-[13px] gap-2.5 tracking-[0.08em]"
        >
          <span>{isSubmitting ? "Sending..." : "Send Enquiry"}</span>
          <Icon
            name="arrow-right"
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </form>
  );
}
