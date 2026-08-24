import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export default function HomePage() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div
        className="animate-hero absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero.svg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/65 to-ink" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 md:justify-end md:pb-24 md:pt-28">
        <div className="animate-fade-up drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]">
          <BrandLogo size="hero" priority />
        </div>
        <h1 className="sr-only">Scoop&apos;s BBQ &amp; Catering</h1>
        <p className="animate-fade-up-delay mt-5 max-w-xl font-display text-2xl uppercase tracking-[0.08em] text-ember sm:text-3xl">
          Smoke, fire, and good plates
        </p>
        <p className="animate-fade-up-delay mt-3 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">
          Plates, by the pound, and fresh off the grill — Scoop&apos;s BBQ &amp;
          Catering, serving Starkville. Call or text 662-694-0933.
        </p>
        <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-3">
          <Link
            href="/menu"
            className="bg-ember px-6 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ember-hot"
          >
            Order now
          </Link>
          <Link
            href="/catering"
            className="border border-cream/40 px-6 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
          >
            Book catering
          </Link>
        </div>
      </div>
    </section>
  );
}
