import { ButtonLink } from "@/components/ui";
import { BUSINESS_PHONE, BUSINESS_PHONE_TEL } from "@/lib/types";

export function QuoteCta({
  title = "Let's plan your event.",
  body = "Tell us the date, guest count, and what you have in mind. We'll follow up with a menu and a quote.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-y border-gold/25 bg-coal">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl uppercase tracking-wide text-cream sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-cream/70">{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/quote">Request a Quote</ButtonLink>
          <a
            href={`tel:${BUSINESS_PHONE_TEL}`}
            className="font-display text-sm uppercase tracking-[0.16em] text-cream/80 hover:text-gold"
          >
            Or call {BUSINESS_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
