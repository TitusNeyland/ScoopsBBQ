import type { Metadata } from "next";
import { QuoteCta } from "@/components/QuoteCta";
import { Testimonials } from "@/components/Testimonials";
import { PageHeader, SectionHeading } from "@/components/ui";
import { BUSINESS_EMAIL, CITY, SERVICE_AREAS } from "@/lib/site";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/types";

export const metadata: Metadata = {
  title: "Contact & Reviews",
  description:
    "Contact Scoop's BBQ & Catering in Starkville, MS. Read client reviews and see our service areas.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact & reviews"
        title="Let's talk food"
        intro="Questions about a date, a menu, or a large order? Reach out and we'll get back to you."
      />

      <section className="mx-auto grid max-w-6xl gap-px border-x border-gold/10 bg-gold/10 sm:grid-cols-3">
        <div className="bg-ink p-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-gold">
            Call or text
          </p>
          <a
            href={`tel:${BUSINESS_PHONE_TEL}`}
            className="mt-3 block font-display text-2xl tracking-wide text-cream hover:text-gold"
          >
            {BUSINESS_PHONE_DISPLAY}
          </a>
        </div>
        <div className="bg-ink p-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-gold">
            Email
          </p>
          <a
            href={`mailto:${BUSINESS_EMAIL}`}
            className="mt-3 block break-all text-lg text-cream hover:text-gold"
          >
            {BUSINESS_EMAIL}
          </a>
        </div>
        <div className="bg-ink p-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-gold">
            Based in
          </p>
          <p className="mt-3 text-lg text-cream">{CITY}</p>
        </div>
      </section>

      <section className="border-t border-gold/10 bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow="Reviews" title="From our clients" />
          <div className="mt-12">
            <Testimonials />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
        <SectionHeading
          eyebrow="Service areas"
          title="Where we cater"
          intro="Based in Starkville and serving the surrounding area. Planning something farther out? Ask us."
        />
        <ul className="grid gap-px bg-gold/15 sm:grid-cols-2">
          {SERVICE_AREAS.map((area) => (
            <li
              key={area}
              className="bg-ink px-5 py-4 font-display text-sm uppercase tracking-[0.12em] text-cream/85"
            >
              {area}
            </li>
          ))}
        </ul>
      </section>

      <QuoteCta />
    </>
  );
}
