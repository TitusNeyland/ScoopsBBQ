import { formatMenuPrice } from "@/lib/format";
import type { MenuItem } from "@/lib/types";

export function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-gold/15 py-3">
      <h4 className="font-display text-sm uppercase tracking-[0.08em] text-cream sm:text-base">
        {item.name}
      </h4>
      <span
        className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-gold/30"
        aria-hidden
      />
      <span className="shrink-0 font-display text-sm tracking-wide text-gold sm:text-base">
        {formatMenuPrice(item)}
      </span>
    </div>
  );
}
