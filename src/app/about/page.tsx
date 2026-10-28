import type { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";
import { Photo } from "@/components/Photo";
import { QuoteCta } from "@/components/QuoteCta";
import { PageHeader, SectionHeading } from "@/components/ui";
import { ESTABLISHED } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Scoop's",
  description:
    "The story of Scoop's BBQ & Catering, serving Starkville, Mississippi since 2022.",
};

const VALUES = [
  {
    title: "Real smoke",
    body: "Meats smoked low and slow, with no shortcuts.",
  },
  {
    title: "Hospitality first",
    body: "We treat every guest like they're at our own table, from the first plate to the last.",
  },
  {
    title: "Show up right",
    body: "On time, set up clean, and ready to serve. Your event runs on schedule.",
  },
];

// Placeholder story copy; replace with the owner's own words.
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Scoop's"
        title={`Starkville's BBQ since ${ESTABLISHED}`}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/5] border border-gold/15">
          <Photo
            src="/photos/owner-portrait.jpg"
            alt="Owner of Scoop's BBQ & Catering"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-top"
          />
        </div>
        <div>
          <SectionHeading eyebrow="Our story" title="Southern hospitality, one plate at a time" />
          <div className="mt-6 space-y-5 text-base leading-relaxed text-cream/75 sm:text-lg">
            <p>
              Scoop&apos;s BBQ &amp; Catering opened in {ESTABLISHED} with a
              simple idea: serve the kind of barbecue people drive across town
              for, and treat every customer like family.
            </p>
            <p>
              What started with plates and pounds of rib tips grew into a
              full catering operation. Today we serve weddings, corporate
              events, church functions, and some of the biggest gatherings in
              Starkville, including Bulldog Bash.
            </p>
            <p>
              Whatever the occasion, our commitment is the same: great food,
              warm service, and an event your guests will talk about.
            </p>
          </div>
          <BrandLogo size="md" className="mt-8" />
        </div>
      </section>

      <section className="border-t border-gold/10 bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow="Our commitment" title="What we stand for" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="border-t border-gold/40 pt-6">
                <h3 className="font-display text-xl uppercase tracking-[0.1em] text-cream">
                  {v.title}
                </h3>
                <p className="mt-2 text-cream/65">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
