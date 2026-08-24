import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Scoop's BBQ serves smoked favorites in Starkville, MS — and we cater.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <BrandLogo size="md" className="mb-6" />
      <p className="text-xs uppercase tracking-[0.18em] text-ember">Our story</p>
      <h1 className="mt-2 font-display text-4xl tracking-wide text-cream sm:text-5xl">
        About Scoop&apos;s BBQ
      </h1>
      <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-cream/75">
        <p>
          Scoops BBQ is a Starkville food service built around honest smoke and
          generous plates. From chicken club and cheeseburger plates to rib tips,
          pulled pork, and smoked wings — plus catering when you need a crowd
          fed.
        </p>
        <p>
          Call or text{" "}
          <a href="tel:+16626940933" className="text-ember hover:text-ember-hot">
            662-694-0933
          </a>{" "}
          anytime. Whether you&apos;re grabbing pickup or planning a catered
          spread, we keep it straightforward.
        </p>
        <p>
          Swap this copy with your real story, hours, and photos whenever
          you&apos;re ready. The layout is built so branding and imagery drop in
          cleanly.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/menu"
          className="bg-ember px-5 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream hover:bg-ember-hot"
        >
          See the menu
        </Link>
        <Link
          href="/catering"
          className="border border-cream/30 px-5 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream hover:bg-cream/10"
        >
          Catering
        </Link>
      </div>
    </div>
  );
}
