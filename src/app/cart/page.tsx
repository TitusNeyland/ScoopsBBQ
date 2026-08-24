"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { withBasePath } from "@/lib/paths";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl tracking-wide text-cream">Cart</h1>
        <p className="mt-4 text-cream/70">Your cart is empty.</p>
        <Link
          href="/menu"
          className="mt-6 inline-block bg-ember px-5 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream hover:bg-ember-hot"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl tracking-wide text-cream sm:text-5xl">
        Cart
      </h1>

      <ul className="mt-8 divide-y divide-smoke/40 border-y border-smoke/40">
        {items.map((item) => (
          <li key={item.menuItemId} className="flex gap-4 py-5 sm:items-center">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-charcoal">
              <Image
                src={withBasePath(item.imageUrl)}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg text-cream">{item.name}</p>
                <p className="text-sm text-cream/60">
                  {formatPrice(item.price)} each
                </p>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-cream/70">
                  Qty
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.menuItemId,
                        Number.parseInt(e.target.value, 10) || 1
                      )
                    }
                    className="w-16 border border-smoke bg-charcoal px-2 py-1 text-cream"
                  />
                </label>
                <p className="w-20 text-right text-cream">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.menuItemId)}
                  className="text-sm text-ash hover:text-ember"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-display text-2xl text-cream">
          Subtotal{" "}
          <span className="text-ember">{formatPrice(subtotal)}</span>
        </p>
        <Link
          href="/checkout"
          className="bg-ember px-6 py-3 font-display text-sm uppercase tracking-[0.14em] text-cream hover:bg-ember-hot"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
