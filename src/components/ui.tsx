import Link from "next/link";
import type { ReactNode } from "react";

const BUTTON_BASE =
  "inline-flex items-center justify-center px-6 py-3 font-display text-sm uppercase tracking-[0.16em] transition-colors";

const BUTTON_VARIANTS = {
  solid: "bg-gold text-ink hover:bg-gold-hot",
  outline: "border border-cream/40 text-cream hover:border-gold hover:text-gold",
} as const;

export function buttonClass(variant: keyof typeof BUTTON_VARIANTS = "solid") {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]}`;
}

export function ButtonLink({
  href,
  variant = "solid",
  children,
  className = "",
}: {
  href: string;
  variant?: keyof typeof BUTTON_VARIANTS;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonClass(variant)} ${className}`.trim()}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-xs uppercase tracking-[0.28em] text-gold">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-3xl uppercase leading-tight tracking-wide text-cream sm:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-cream/70 sm:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}

/** Title block at the top of interior pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <header className="border-b border-gold/15 bg-charcoal">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-wide text-cream sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
