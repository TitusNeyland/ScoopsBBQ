import { TESTIMONIALS } from "@/lib/site";

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <figure
          key={i}
          className="flex flex-col border border-gold/20 bg-charcoal p-7"
        >
          <span
            className="font-display text-5xl leading-none text-gold"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="mt-2 flex-1 text-base leading-relaxed text-cream/85">
            {t.quote}
          </blockquote>
          <figcaption className="mt-6 border-t border-gold/15 pt-4">
            <p className="font-display text-sm uppercase tracking-[0.14em] text-cream">
              {t.name}
            </p>
            <p className="text-sm text-cream/55">{t.event}</p>
            {t.placeholder && (
              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-gold/60">
                Sample review · replace before launch
              </p>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
