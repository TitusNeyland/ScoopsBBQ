import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { QuoteCta } from "@/components/QuoteCta";
import { PageHeader } from "@/components/ui";
import { WORK, type WorkItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Photos from Bulldog Bash, university events, and catering jobs by Scoop's BBQ & Catering.",
};

const GROUPS: { category: WorkItem["category"]; intro: string }[] = [
  {
    category: "Bulldog Bash",
    intro: "Serving one of Starkville's biggest nights of the year.",
  },
  {
    category: "University Events",
    intro: "Tailgates, department lunches, and campus celebrations.",
  },
  {
    category: "Catering Jobs",
    intro: "Weddings, corporate lunches, parties, and everything in between.",
  },
];

export default function OurWorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Events we've served"
        intro="A look at the crowds we've fed and the spreads we've set. Every event is a little different. The food and the hospitality stay the same."
      />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-20 sm:px-6">
        {GROUPS.map(({ category, intro }) => {
          const items = WORK.filter((w) => w.category === category);
          if (items.length === 0) return null;

          return (
            <section key={category}>
              <div className="flex flex-col gap-2 border-b border-gold/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="font-display text-2xl uppercase tracking-[0.12em] text-cream sm:text-3xl">
                  {category}
                </h2>
                <p className="text-sm text-cream/60">{intro}</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                {items.map((item) => (
                  <figure key={item.title} className="relative aspect-[4/3] border border-gold/10">
                    <Photo
                      src={item.photo}
                      alt={item.title}
                      sizes="(min-width: 768px) 33vw, 50vw"
                    />
                  </figure>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <QuoteCta title="Your event could be next." />
    </>
  );
}
