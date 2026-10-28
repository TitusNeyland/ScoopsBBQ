import Link from "next/link";
import { Photo } from "@/components/Photo";
import { QuoteCta } from "@/components/QuoteCta";
import { Testimonials } from "@/components/Testimonials";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/ui";
import {
  CITY,
  ESTABLISHED,
  PACKAGES,
  photosFirst,
  SERVICES,
  TAGLINE,
  WORK,
} from "@/lib/site";

const FEATURED_SERVICES = ["weddings", "corporate", "university"];

export default function HomePage() {
  const featured = SERVICES.filter((s) => FEATURED_SERVICES.includes(s.slug));
  const workPreview = photosFirst(WORK).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-4.5rem)] items-end overflow-hidden">
        <div className="animate-hero absolute inset-0">
          <Photo
            src="/photos/chicken-kabobs-pit.jpg"
            alt="Chicken kabobs grilling over the fire"
            eager
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
          <div className="animate-fade-up">
            <Eyebrow>
              Est. {ESTABLISHED} · {CITY}
            </Eyebrow>
            <h1 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.95] tracking-wide text-cream sm:text-7xl lg:text-8xl">
              Scoop&apos;s BBQ
              <span className="block text-gold">&amp; Catering</span>
            </h1>
          </div>
          <p className="animate-fade-up-delay mt-6 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-2xl">
            {TAGLINE}
          </p>
          <div className="animate-fade-up-delay mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/quote">Request a Quote</ButtonLink>
            <ButtonLink href="/menu" variant="outline">
              Explore Our Menus
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="It's about the experience"
            title="Smoked low and slow. Served with Southern hospitality."
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-cream/70 sm:text-lg">
            <p>
              Since {ESTABLISHED}, Scoop&apos;s has been feeding Starkville, from
              Bulldog Bash crowds to wedding receptions and corporate lunches.
              Every event gets the same care: real smoke, generous portions,
              and a team that treats your guests like family.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link
              href="/about"
              className="font-display text-sm uppercase tracking-[0.18em] text-gold hover:text-gold-hot"
            >
              Our story →
            </Link>
            <Link
              href="/our-work"
              className="font-display text-sm uppercase tracking-[0.18em] text-gold hover:text-gold-hot"
            >
              See our work →
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] border border-gold/15">
            <Photo
              src="/photos/corporate-buffet.jpg"
              alt="Buffet set for a corporate lunch"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
          <div className="relative mt-10 aspect-[3/4] border border-gold/15">
            <Photo
              src="/photos/chicken-kabobs-pan.jpg"
              alt="Tray of grilled chicken kabobs"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-gold/10 bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Catering services"
              title="Exceptional catering for every occasion"
            />
            <Link
              href="/catering"
              className="shrink-0 font-display text-sm uppercase tracking-[0.18em] text-gold hover:text-gold-hot"
            >
              All services →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((service) => (
              <Link
                key={service.slug}
                href={`/catering#${service.slug}`}
                className="card-lift group block border border-gold/15 bg-ink"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo
                    src={service.photo}
                    alt={service.title}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl uppercase tracking-[0.1em] text-cream">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">
                    {service.blurb}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-cream/55">
            Also serving church functions, from fellowship dinners to
            homecomings.
          </p>
        </div>
      </section>

      {/* Menus */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Menus & packages"
          title="From BBQ buffets to premium spreads"
          intro="Start with a package or build your own. Every menu can be tailored to your guest count and budget."
          align="center"
        />
        <div className="mt-12 grid gap-px border border-gold/15 bg-gold/15 sm:grid-cols-2 lg:grid-cols-5">
          {PACKAGES.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/menu#${pkg.slug}`}
              className="group flex flex-col bg-ink p-6 transition-colors hover:bg-coal"
            >
              <h3 className="font-display text-lg uppercase tracking-[0.1em] text-cream group-hover:text-gold">
                {pkg.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">
                {pkg.blurb}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/menu" variant="outline">
            Explore Our Menus
          </ButtonLink>
        </div>
      </section>

      {/* Our work */}
      <section className="border-t border-gold/10 bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Our work"
              title="Bulldog Bash, campus events, and more"
            />
            <Link
              href="/our-work"
              className="shrink-0 font-display text-sm uppercase tracking-[0.18em] text-gold hover:text-gold-hot"
            >
              View gallery →
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
            {workPreview.map((item, i) => (
              <div
                key={item.title}
                className={`relative border border-gold/10 ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"
                }`}
              >
                <Photo src={item.photo} alt={item.title} sizes="(min-width: 768px) 33vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Kind words"
          title="What our clients say"
          align="center"
        />
        <div className="mt-12">
          <Testimonials />
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
