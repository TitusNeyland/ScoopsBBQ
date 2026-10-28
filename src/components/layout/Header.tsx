"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { buttonClass } from "@/components/ui";
import { NAV } from "@/lib/site";

function normalize(path: string) {
  return path.replace(/\/$/, "") || "/";
}

export function Header() {
  const pathname = normalize(usePathname());
  const [open, setOpen] = useState(false);
  const [navPath, setNavPath] = useState(pathname);

  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gold/15 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Scoop's BBQ & Catering home"
        >
          <BrandLogo size="sm" eager />
          <span className="font-display text-lg uppercase leading-tight tracking-[0.12em] text-cream">
            Scoop&apos;s
            <span className="block text-[10px] tracking-[0.3em] text-gold">
              BBQ &amp; Catering
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-display text-xs uppercase tracking-[0.18em] transition-colors ${
                pathname === item.href
                  ? "text-gold"
                  : "text-cream/75 hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/quote" className={`${buttonClass()} px-5 py-2.5 text-xs`}>
            Request a Quote
          </Link>
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <Link
            href="/quote"
            className={`${buttonClass()} px-3.5 py-2 text-[11px] tracking-[0.14em]`}
          >
            Get a Quote
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-cream" />
            <span className="mt-1.5 block h-0.5 w-6 bg-cream" />
            <span className="mt-1.5 block h-0.5 w-6 bg-cream" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gold/15 bg-ink px-4 py-5 lg:hidden">
          <ul className="flex flex-col gap-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block font-display text-sm uppercase tracking-[0.18em] ${
                    pathname === item.href ? "text-gold" : "text-cream/80"
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
