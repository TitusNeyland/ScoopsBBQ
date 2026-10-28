import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { QuoteCta } from "@/components/QuoteCta";
import { ButtonLink, PageHeader, SectionHeading } from "@/components/ui";
import { MenuItemRow } from "@/components/menu/MenuItemRow";
import { getMenuItems } from "@/lib/menu";
import { PACKAGES } from "@/lib/site";
import {
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "@/lib/types";

export const metadata: Metadata = {
  title: "Menus & Packages",
  description:
    "BBQ buffets, heavy hors d'oeuvres, Southern comfort food, premium selections, and custom catering menus from Scoop's BBQ & Catering.",
};

export default async function MenuPage() {
  const items = await getMenuItems();
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Menus & packages"
        title="Built for your crowd"
        intro="Choose a package as a starting point, then make it yours. Pricing depends on guest count, service style, and selections. Request a quote and we'll put it together."
      />

      <nav
        aria-label="Packages"
        className="sticky top-18 z-40 border-b border-gold/15 bg-ink/95 backdrop-blur"
      >
        <ul className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-3 sm:px-6">
          {PACKAGES.map((pkg) => (
            <li key={pkg.slug} className="shrink-0">
              <a
                href={`#${pkg.slug}`}
                className="font-display text-xs uppercase tracking-[0.16em] text-cream/70 hover:text-gold"
              >
                {pkg.title}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a
              href="#everyday"
              className="font-display text-xs uppercase tracking-[0.16em] text-cream/70 hover:text-gold"
            >
              Everyday Menu
            </a>
          </li>
        </ul>
      </nav>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2">
        {PACKAGES.map((pkg, i) => (
          <article
            key={pkg.slug}
            id={pkg.slug}
            className={`scroll-mt-36 border border-gold/20 bg-charcoal ${
              i === PACKAGES.length - 1 ? "md:col-span-2 md:grid md:grid-cols-2" : ""
            }`}
          >
            <div className="relative aspect-[16/9] md:aspect-auto md:min-h-56">
              <Photo src={pkg.photo} alt={pkg.title} sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div className="p-7 sm:p-8">
              <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-cream">
                {pkg.title}
              </h2>
              <p className="mt-2 text-cream/70">{pkg.blurb}</p>
              <ul className="mt-5 space-y-2 text-sm text-cream/80">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-2 h-1 w-3 shrink-0 bg-gold" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`/quote?menu=${pkg.slug}`}
                variant="outline"
                className="mt-7"
              >
                Get pricing
              </ButtonLink>
            </div>
          </article>
        ))}
      </div>

      <section id="everyday" className="scroll-mt-36 border-t border-gold/10 bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="Everyday menu"
            title="Plates & by the pound"
            intro={
              <>
                Feeding a smaller group? Our everyday menu is available for
                pickup. Call or text{" "}
                <a
                  href={`tel:${BUSINESS_PHONE_TEL}`}
                  className="text-gold hover:text-gold-hot"
                >
                  {BUSINESS_PHONE}
                </a>{" "}
                to order.
              </>
            }
          />
          <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {grouped.map(({ category, items: groupItems }) => (
              <div key={category}>
                <h3 className="font-display text-lg uppercase tracking-[0.2em] text-gold">
                  {CATEGORY_LABELS[category]}
                </h3>
                <div className="mt-3 border-t border-gold/40">
                  {groupItems.map((item) => (
                    <MenuItemRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta
        title="Have something else in mind?"
        body="Custom menus are our specialty. Tell us about your event and we'll build a menu around it."
      />
    </>
  );
}
