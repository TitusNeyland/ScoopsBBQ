"use client";

import { useCart } from "@/components/cart/CartProvider";
import { formatMenuPrice } from "@/lib/format";
import {
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  type MenuItem,
} from "@/lib/types";

export function MenuItemRow({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const isMarket = item.marketPrice || item.price == null;

  return (
    <article className="menu-row group flex items-baseline gap-3 border-b border-ember/50 py-3.5">
      <h3 className="min-w-0 flex-1 font-menu text-sm uppercase tracking-wide text-cream sm:text-base">
        {item.name}
      </h3>
      <span className="shrink-0 font-menu text-sm uppercase tracking-wide text-cream sm:text-base">
        {formatMenuPrice(item)}
      </span>
      {isMarket ? (
        <a
          href={`tel:${BUSINESS_PHONE_TEL}`}
          className="shrink-0 border border-ember/70 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ember"
        >
          Call
        </a>
      ) : (
        <button
          type="button"
          onClick={() => addItem(item)}
          className="shrink-0 border border-ember/70 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ember"
        >
          Add
        </button>
      )}
      <span className="sr-only">
        {isMarket
          ? `Call or text ${BUSINESS_PHONE_DISPLAY} for price`
          : undefined}
      </span>
    </article>
  );
}
