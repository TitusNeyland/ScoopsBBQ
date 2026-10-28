import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import { PageHeader } from "@/components/ui";
import { BUSINESS_EMAIL } from "@/lib/site";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/types";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a catering quote from Scoop's BBQ & Catering. Tell us your event date, location, guest count, and budget.",
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a quote"
        title="Tell us about your event"
        intro="Share a few details and we'll follow up with menu ideas and pricing."
      />

      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_18rem]">
        <Suspense>
          <QuoteForm />
        </Suspense>

        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div className="border-l-2 border-gold pl-5">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-gold">
              Prefer to talk?
            </p>
            <a
              href={`tel:${BUSINESS_PHONE_TEL}`}
              className="mt-2 block font-display text-2xl tracking-wide text-cream hover:text-gold"
            >
              {BUSINESS_PHONE_DISPLAY}
            </a>
            <p className="text-sm text-cream/55">Call or text anytime</p>
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="mt-3 block text-sm text-cream/75 hover:text-gold"
            >
              {BUSINESS_EMAIL}
            </a>
          </div>
          <div className="border-l-2 border-smoke pl-5 text-sm leading-relaxed text-cream/60">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-cream/80">
              Good to know
            </p>
            <p className="mt-2">
              Popular dates like graduation weekends and home games book early.
              The sooner you reach out, the better.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
