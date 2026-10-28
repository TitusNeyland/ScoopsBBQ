import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { QuoteCta } from "@/components/QuoteCta";
import { ButtonLink, PageHeader, SectionHeading } from "@/components/ui";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catering Services",
  description:
    "Catering for corporate events, weddings, university events, church functions, private parties, and VIP hospitality in Starkville, MS.",
};

const STEPS = [
  {
    title: "Request a quote",
    body: "Share your date, location, guest count, and budget. It takes about two minutes.",
  },
  {
    title: "Plan the menu",
    body: "We'll call to talk through packages, service style, and any special requests.",
  },
  {
    title: "We bring the smoke",
    body: "Our team arrives on time, sets up, serves, and cleans up, so you can enjoy your event.",
  },
];

export default function CateringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catering services"
        title="Every occasion, served right"
        intro="From a campus lunch for fifty to a wedding reception for three hundred, Scoop's brings real Southern BBQ and polished, friendly service to your event."
      />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-20 sm:px-6 sm:space-y-28 sm:py-28">
        {SERVICES.map((service, i) => (
          <section
            key={service.slug}
            id={service.slug}
            className="grid scroll-mt-28 gap-10 md:grid-cols-2 md:items-center md:gap-16"
          >
            <div
              className={`relative aspect-[4/3] border border-gold/15 ${
                i % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <Photo
                src={service.photo}
                alt={service.title}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div>
              <p className="font-display text-sm tracking-[0.2em] text-gold">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-cream sm:text-4xl">
                {service.title}
              </h2>
              <p className="mt-3 text-lg text-cream/80">{service.blurb}</p>
              <p className="mt-4 leading-relaxed text-cream/65">
                {service.details}
              </p>
              <ButtonLink
                href={`/quote?service=${service.slug}`}
                variant="outline"
                className="mt-7"
              >
                Request a Quote
              </ButtonLink>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-gold/10 bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow="How it works" title="Booking is simple" />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border-t border-gold/40 pt-6">
                <p className="font-display text-4xl text-gold">{i + 1}</p>
                <h3 className="mt-3 font-display text-xl uppercase tracking-[0.1em] text-cream">
                  {step.title}
                </h3>
                <p className="mt-2 text-cream/65">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
