"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { createOrder } from "@/lib/orders";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl tracking-wide text-cream">
          Checkout
        </h1>
        <p className="mt-4 text-cream/70">Add something tasty first.</p>
        <Link
          href="/menu"
          className="mt-6 inline-block bg-ember px-5 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream hover:bg-ember-hot"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const { id } = await createOrder({
        items: items.map((item) => ({
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        customer: { name, phone, email },
        notes,
        total: subtotal,
      });
      clearCart();
      router.push(`/order/confirmation?id=${encodeURIComponent(id)}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not place your order."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl tracking-wide text-cream sm:text-5xl">
        Checkout
      </h1>
      <p className="mt-3 max-w-xl text-cream/70">
        Pickup orders only for now. You&apos;ll pay at pickup — no card required
        online.
      </p>

      {!isFirebaseConfigured() && (
        <p className="mt-4 border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-cream/90">
          Firebase is not configured yet. Add your project keys to{" "}
          <code className="text-ember">.env.local</code> to accept live orders.
        </p>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Name" required>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field-input"
              autoComplete="name"
            />
          </Field>
          <Field label="Phone" required>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="field-input"
              autoComplete="tel"
            />
          </Field>
          <Field label="Email" required>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-input"
              autoComplete="email"
            />
          </Field>
          <Field label="Pickup notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="field-input"
              placeholder="Allergies, sauce preference, ETA…"
            />
          </Field>

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
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </form>

        <aside className="border border-smoke/40 bg-charcoal/60 p-6">
          <h2 className="font-display text-xl text-cream">Order summary</h2>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            {items.map((item) => (
              <li key={item.menuItemId} className="flex justify-between gap-4">
                <span>
                  {item.quantity}× {item.name}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex justify-between border-t border-smoke/40 pt-4 font-display text-lg text-cream">
            <span>Total</span>
            <span className="text-ember">{formatPrice(subtotal)}</span>
          </p>
          <p className="mt-2 text-xs text-cream/50">Payment: pay at pickup</p>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.14em] text-cream/60">
        {label}
        {required ? " *" : ""}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
