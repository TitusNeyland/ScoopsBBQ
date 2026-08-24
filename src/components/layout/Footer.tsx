import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import {
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
} from "@/lib/types";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-smoke/30 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <p className="font-display text-2xl tracking-wide text-cream">
              Scoop&apos;s BBQ
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-cream/65">
            BBQ &amp; catering in Starkville, MS — plates, by the pound, and
            fresh off the grill.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-ember">
            Call or text
          </p>
          <p className="mt-2 text-sm text-cream/80">Starkville, Mississippi</p>
          <a
            href={`tel:${BUSINESS_PHONE_TEL}`}
            className="mt-2 inline-block text-sm text-cream hover:text-ember"
          >
            {BUSINESS_PHONE_DISPLAY}
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-ember">
            Explore
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-cream/75">
            <li>
              <Link href="/menu" className="hover:text-cream">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/catering" className="hover:text-cream">
                Catering
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-cream">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-smoke/20 py-4 text-center text-xs text-cream/45">
        © {new Date().getFullYear()} Scoop&apos;s BBQ &amp; Catering. All
        rights reserved.
      </div>
    </footer>
  );
}
