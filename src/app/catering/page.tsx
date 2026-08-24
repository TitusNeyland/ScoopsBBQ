"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createCateringInquiry } from "@/lib/catering";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function CateringPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("25");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const { id } = await createCateringInquiry({
        name,
        phone,
        email,
        eventDate,
        guestCount: Number.parseInt(guestCount, 10) || 0,
        message,
      });
      setInquiryId(id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not send your inquiry."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (inquiryId) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ember">
          Catering
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-cream">
          Inquiry sent
        </h1>
        <p className="mt-4 max-w-lg text-cream/75">
          Thanks for reaching out. We&apos;ll confirm details and payment for
          your event shortly.
        </p>
        <p className="mt-6 border border-smoke/40 bg-charcoal/70 px-4 py-3 text-sm text-cream/80">
          Reference: <span className="font-mono text-ember">{inquiryId}</span>
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-ember px-5 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream hover:bg-ember-hot"
        >
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.18em] text-ember">Events</p>
      <h1 className="mt-2 font-display text-4xl tracking-wide text-cream sm:text-5xl">
        Catering
      </h1>
      <p className="mt-3 max-w-xl text-cream/70">
        From game-day spreads to family reunions — Scoops BBQ brings the smoke
        to Starkville and beyond. Tell us about your event and we&apos;ll follow
        up with a plan and payment confirmation.
      </p>

      {!isFirebaseConfigured() && (
        <p className="mt-4 border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-cream/90">
          Firebase is not configured yet. Add your project keys to{" "}
          <code className="text-ember">.env.local</code> to receive inquiries.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-4">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.14em] text-cream/60">
            Name *
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field-input mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.14em] text-cream/60">
            Phone *
          </span>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="field-input mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.14em] text-cream/60">
            Email *
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-input mt-1.5"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.14em] text-cream/60">
              Event date *
            </span>
            <input
              required
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="field-input mt-1.5"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.14em] text-cream/60">
              Guest count *
            </span>
            <input
              required
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="field-input mt-1.5"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.14em] text-cream/60">
            Tell us about the event *
          </span>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="field-input mt-1.5"
            placeholder="Location, menu ideas, budget range…"
          />
        </label>

        {error && (
          <p className="border border-ember/50 bg-ember/10 px-3 py-2 text-sm text-cream">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-ember px-6 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream hover:bg-ember-hot disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send inquiry"}
        </button>
      </form>
    </div>
  );
}
