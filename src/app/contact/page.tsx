import type { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Scoop's BBQ in Starkville, MS for orders and catering.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <BrandLogo size="md" className="mb-6" />
      <p className="text-xs uppercase tracking-[0.18em] text-ember">Reach us</p>
      <h1 className="mt-2 font-display text-4xl tracking-wide text-cream sm:text-5xl">
        Contact
      </h1>
      <p className="mt-3 max-w-xl text-cream/70">
        Questions about an order or catering date? Call, email, or stop by when
        we&apos;re firing up the pits.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-ember">
              Call or text
            </p>
            <a
              href="tel:+16626940933"
              className="mt-1 block text-lg text-cream hover:text-ember"
            >
              (662) 694-0933
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-ember">
              Email
            </p>
            <a
              href="mailto:hello@scoopsbbq.example"
              className="mt-1 block text-lg text-cream hover:text-ember"
            >
              hello@scoopsbbq.example
            </a>
            <p className="text-sm text-cream/50">Placeholder — replace with your email</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-ember">
              Location
            </p>
            <p className="mt-1 text-lg text-cream">Starkville, Mississippi</p>
            <p className="text-sm text-cream/60">
              Street address placeholder — update when ready
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-ember">
              Hours
            </p>
            <p className="mt-1 text-cream/80">Mon–Thu: 11am – 8pm</p>
            <p className="text-cream/80">Fri–Sat: 11am – 9pm</p>
            <p className="text-cream/80">Sun: Closed</p>
            <p className="mt-1 text-sm text-cream/50">Placeholder hours</p>
          </div>
        </div>

        <div className="flex min-h-72 items-center justify-center border border-smoke/40 bg-charcoal/50 p-6 text-center">
          <div>
            <p className="font-display text-xl text-cream/80">Map placeholder</p>
            <p className="mt-2 max-w-xs text-sm text-cream/55">
              Drop in a Google Maps embed for your Starkville location when you
              have the street address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
