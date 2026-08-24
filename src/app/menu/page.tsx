import type { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";
import { MenuItemRow } from "@/components/menu/MenuItemRow";
import { getMenuItems } from "@/lib/menu";
import {
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type MenuCategory,
} from "@/lib/types";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Scoop's BBQ & Catering menu — plates, by the pound, fresh off the grill, and market cuts in Starkville, MS.",
};

export default async function MenuPage() {
  const items = await getMenuItems();

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 opacity-40 sm:h-80 sm:w-80"
        style={{
          background:
            "radial-gradient(circle at 70% 80%, rgba(232,90,42,0.55), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col items-center text-center">
          <BrandLogo size="lg" priority />
          <h1 className="mt-4 font-display text-5xl tracking-[0.12em] text-cream sm:text-6xl">
            MENU
          </h1>
          <p className="mt-3 max-w-md text-sm text-cream/65">
            Order online for pickup, or call / text{" "}
            <a
              href={`tel:${BUSINESS_PHONE_TEL}`}
              className="text-ember hover:text-ember-hot"
            >
              {BUSINESS_PHONE_DISPLAY}
            </a>
            . Pay at pickup.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {grouped.map(({ category, items: groupItems }) => (
            <section key={category} id={category}>
              <h2 className="text-center font-display text-2xl tracking-[0.14em] text-ember sm:text-3xl">
                {CATEGORY_LABELS[category as MenuCategory].toUpperCase()}
              </h2>
              <div className="mt-4 border-t border-ember/60">
                {groupItems.map((item) => (
                  <MenuItemRow key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 text-center font-display text-lg tracking-[0.16em] text-ember">
          CALL OR TEXT
        </p>
        <a
          href={`tel:${BUSINESS_PHONE_TEL}`}
          className="mt-2 block text-center font-display text-3xl tracking-wide text-cream hover:text-ember"
        >
          662-694-0933
        </a>
      </div>
    </div>
  );
}
