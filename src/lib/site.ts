/**
 * Site copy and structure. Items marked "placeholder" are stand-ins until the
 * client supplies real content (photos, reviews, package details).
 */

export const ESTABLISHED = 2022;
export const CITY = "Starkville, Mississippi";
export const TAGLINE = "Where Southern Flavor Meets Exceptional Hospitality.";

export const BUSINESS_EMAIL = "hello@scoopsbbq.example"; // placeholder
export const INSTAGRAM_HANDLE = "scoopsbbq";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export const NAV = [
  { href: "/catering", label: "Catering Services" },
  { href: "/menu", label: "Menus & Packages" },
  { href: "/our-work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export interface Service {
  slug: string;
  title: string;
  blurb: string;
  details: string;
  /** Path under /public once a real photo exists */
  photo?: string;
}

export const SERVICES: Service[] = [
  {
    slug: "corporate",
    title: "Corporate Events",
    blurb: "Lunches, meetings, and company gatherings served on schedule.",
    photo: "/photos/turkey-chicken-platter.jpg",
    details:
      "From boxed lunches for a morning meeting to a full buffet for the whole company, we show up on time, set up clean, and keep the line moving so your team can get back to business.",
  },
  {
    slug: "weddings",
    title: "Weddings",
    blurb: "Rehearsal dinners, receptions, and everything in between.",
    photo: "/photos/garden-reception-buffet.jpg",
    details:
      "Southern hospitality for the biggest day of the year. We work with you and your venue on menu, service style, and timing so your guests remember the food as much as the first dance.",
  },
  {
    slug: "university",
    title: "University Events",
    blurb: "Tailgates, Bulldog Bash, department functions, and Greek life.",
    photo: "/photos/whole-roasted-pig.jpg",
    details:
      "Starkville is our home. We've fed game-day crowds, campus celebrations, and student organizations, and we know how to serve a big crowd fast without cutting corners.",
  },
  {
    slug: "church",
    title: "Church Functions",
    blurb: "Fellowship dinners, homecomings, and family-style gatherings.",
    photo: "/photos/banana-pudding-peach-cobbler.jpg",
    details:
      "Generous portions and comfort food that brings people to the table. Ask about family-style service for fellowship halls and outdoor homecomings.",
  },
];

export interface Package {
  slug: string;
  title: string;
  blurb: string;
  highlights: string[];
  photo?: string;
}

// Package food items come from the real menu; service details are placeholders.
export const PACKAGES: Package[] = [
  {
    slug: "bbq-buffet",
    title: "BBQ Buffets",
    blurb: "Our signature smoked meats with classic sides, served buffet style.",
    photo: "/photos/corporate-buffet.jpg",
    highlights: [
      "Pulled pork, smoked turkey, or pulled chicken",
      "Rib tips and smoked sausage",
      "Baked beans, mac and cheese, and potato salad",
      "Sauces and full buffet setup",
    ],
  },
  {
    slug: "hors-doeuvres",
    title: "Heavy Hors d'Oeuvres",
    blurb: "Passed or stationed bites for receptions and mixers.",
    photo: "/photos/smoked-wings-pan.jpg",
    highlights: [
      "Grilled chicken kabobs",
      "Spinach dip with tortilla chips",
      "Smoked chicken wings and rib tips",
      "Stationed or passed service",
    ],
  },
  {
    slug: "southern-comfort",
    title: "Southern Comfort Food",
    blurb: "Family-style favorites that feel like Sunday dinner.",
    photo: "/photos/banana-pudding-peach-cobbler.jpg",
    highlights: [
      "Chicken quarters and halves off the grill",
      "Pulled pork and smoked turkey",
      "Mac and cheese, baked beans, and potato salad",
      "Banana pudding and peach cobbler",
    ],
  },
  {
    slug: "premium",
    title: "Premium Selections",
    blurb: "Elevated cuts and presentation for upscale events.",
    photo: "/photos/garden-reception-buffet.jpg",
    highlights: [
      "Full slabs of loin back ribs",
      "Smoked turkey and pulled pork",
      "Plated or buffet presentation",
      "Uniformed service staff",
    ],
  },
  {
    slug: "custom",
    title: "Custom Menus",
    blurb: "Build a menu around your event, guests, and budget.",
    photo: "/photos/chicken-kabobs-pan.jpg",
    highlights: [
      "Work directly with Scoop's on every item",
      "Dietary needs and kid-friendly options",
      "Mix and match from any package",
      "Pricing tailored to your guest count",
    ],
  },
];

export interface WorkItem {
  title: string;
  category: "Bulldog Bash" | "University Events" | "Catering Jobs";
  photo?: string;
}

// Placeholder gallery; swap in real event photos as they come in.
export const WORK: WorkItem[] = [
  { title: "Bulldog Bash serving line", category: "Bulldog Bash" },
  { title: "Bulldog Bash crowd", category: "Bulldog Bash" },
  {
    title: "Whole roasted pig for Delta Sigma Theta",
    category: "University Events",
    photo: "/photos/whole-roasted-pig.jpg",
  },
  { title: "Campus department lunch", category: "University Events" },
  { title: "Tailgate spread", category: "University Events" },
  {
    title: "Tented garden reception buffet",
    category: "Catering Jobs",
    photo: "/photos/garden-reception-buffet.jpg",
  },
  {
    title: "Banana pudding and peach cobbler",
    category: "Catering Jobs",
    photo: "/photos/banana-pudding-peach-cobbler.jpg",
  },
  {
    title: "Smoked turkey and chicken platter",
    category: "Catering Jobs",
    photo: "/photos/turkey-chicken-platter.jpg",
  },
  {
    title: "Wings on the smoker",
    category: "Catering Jobs",
    photo: "/photos/wings-on-smoker.jpg",
  },
  {
    title: "Smoked wings by the pan",
    category: "Catering Jobs",
    photo: "/photos/smoked-wings-pan.jpg",
  },
  {
    title: "Corporate lunch buffet",
    category: "Catering Jobs",
    photo: "/photos/corporate-buffet.jpg",
  },
  {
    title: "Chicken kabobs on the pit",
    category: "Catering Jobs",
    photo: "/photos/chicken-kabobs-pit.jpg",
  },
  {
    title: "Grilled chicken kabobs",
    category: "Catering Jobs",
    photo: "/photos/chicken-kabobs-pan.jpg",
  },
  {
    title: "Spinach dip and chips",
    category: "Catering Jobs",
    photo: "/photos/spinach-dip.jpg",
  },
  { title: "Ribs and rib tips platter", category: "Catering Jobs" },
  { title: "Graduation party", category: "Catering Jobs" },
];

/** Real photos before placeholders, otherwise keeping the original order. */
export function photosFirst<T extends { photo?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => Number(Boolean(b.photo)) - Number(Boolean(a.photo)));
}

export interface Testimonial {
  quote: string;
  name: string;
  event: string;
  /** Sample copy; shown with a visible "sample" label until replaced */
  placeholder?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Scoop's fed our whole department and people are still talking about the rib tips. Set up was fast and the team was a pleasure to work with.",
    name: "Client name",
    event: "University department luncheon",
    placeholder: true,
  },
  {
    quote:
      "They handled our rehearsal dinner from start to finish. Great food, great hospitality, and right on budget.",
    name: "Client name",
    event: "Wedding rehearsal dinner",
    placeholder: true,
  },
  {
    quote:
      "Easy to book, showed up early, and the pulled pork disappeared in minutes. We'll be calling Scoop's again.",
    name: "Client name",
    event: "Church homecoming",
    placeholder: true,
  },
];

// Placeholder: confirm actual travel radius with the client.
export const SERVICE_AREAS = [
  "Starkville & Oktibbeha County",
  "Mississippi State University",
  "Columbus & West Point",
  "The Golden Triangle",
  "Statewide events by request",
];

export const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];
