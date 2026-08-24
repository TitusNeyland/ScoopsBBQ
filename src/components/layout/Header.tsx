"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { useCart } from "@/components/cart/CartProvider";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [navPath, setNavPath] = useState(pathname);

  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-smoke/30 bg-charcoal/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          aria-label="Scoop's BBQ home"
        >
          <BrandLogo size="sm" priority />
          <span className="font-display text-xl tracking-wide text-cream sm:text-2xl">
            Scoop&apos;s BBQ
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm uppercase tracking-[0.12em] transition-colors ${
                pathname === item.href
                  ? "text-ember"
                  : "text-cream/75 hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="relative rounded border border-ember/60 px-3 py-1.5 text-sm uppercase tracking-[0.12em] text-cream transition-colors hover:border-ember hover:bg-ember/15"
          >
            Cart
            {itemCount > 0 && (
              <span
                key={itemCount}
                className="absolute -right-2 -top-2 flex h-5 min-w-5 animate-cart-pop items-center justify-center rounded-full bg-ember px-1 text-xs font-semibold text-cream"
              >
                {itemCount}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/cart"
            className="relative rounded border border-ember/60 px-2.5 py-1 text-xs uppercase tracking-[0.12em] text-cream"
          >
            Cart
            {itemCount > 0 && (
              <span
                key={itemCount}
                className="absolute -right-2 -top-2 flex h-5 min-w-5 animate-cart-pop items-center justify-center rounded-full bg-ember px-1 text-xs font-semibold text-cream"
              >
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="text-cream"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-cream" />
            <span className="mt-1.5 block h-0.5 w-6 bg-cream" />
            <span className="mt-1.5 block h-0.5 w-6 bg-cream" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-smoke/30 bg-charcoal px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block text-sm uppercase tracking-[0.12em] ${
                    pathname === item.href ? "text-ember" : "text-cream/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
