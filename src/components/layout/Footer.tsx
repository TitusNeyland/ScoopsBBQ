import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { BUSINESS_EMAIL, CITY, ESTABLISHED, NAV, SERVICE_AREAS } from "@/lib/site";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/types";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/20 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <div>
              <p className="font-display text-xl uppercase tracking-[0.12em] text-cream">
                Scoop&apos;s
              </p>
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-gold">
                BBQ &amp; Catering
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/60">
            Southern flavor and exceptional hospitality. Est. {ESTABLISHED} in{" "}
            {CITY}.
          </p>
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.22em] text-gold">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-cream/75">
            <li>
              <a href={`tel:${BUSINESS_PHONE_TEL}`} className="hover:text-gold">
                {BUSINESS_PHONE_DISPLAY}
              </a>
              <span className="text-cream/45"> · call or text</span>
            </li>
            <li>
              <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-gold">
                {BUSINESS_EMAIL}
              </a>
            </li>
            <li>{CITY}</li>
          </ul>
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.22em] text-gold">
            Service areas
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-cream/75">
            {SERVICE_AREAS.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.22em] text-gold">
            Explore
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-cream/75">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className="text-gold hover:text-gold-hot">
                Request a Quote →
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Scoop&apos;s BBQ &amp; Catering. All
        rights reserved.
      </div>
    </footer>
  );
}
