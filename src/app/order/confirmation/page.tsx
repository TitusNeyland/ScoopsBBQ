"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <>
      <p className="text-xs uppercase tracking-[0.18em] text-ember">Thank you</p>
      <h1 className="mt-2 font-display text-4xl tracking-wide text-cream sm:text-5xl">
        Order received
      </h1>
      <p className="mt-4 max-w-lg text-cream/75">
        We&apos;ve got your order. Pay at pickup when you arrive. We&apos;ll use
        the phone or email you provided if we need to reach you.
      </p>
      {id && (
        <p className="mt-6 border border-smoke/40 bg-charcoal/70 px-4 py-3 text-sm text-cream/80">
          Reference: <span className="font-mono text-ember">{id}</span>
        </p>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/menu"
          className="bg-ember px-5 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream hover:bg-ember-hot"
        >
          Order again
        </Link>
        <Link
          href="/"
          className="border border-cream/30 px-5 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream hover:bg-cream/10"
        >
          Home
        </Link>
      </div>
    </>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Suspense fallback={<p className="text-cream/70">Loading…</p>}>
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
