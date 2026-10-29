# Scoops BBQ

Catering-first marketing site for **Scoop's BBQ & Catering** in Starkville, MS. Built with Next.js (React), TypeScript, Tailwind CSS, and Firebase/Firestore.

Quote requests are stored in Firestore (`cateringInquiries`) for follow-up.

## Pages

- **Home** — hero, intro, featured services, packages, work gallery, reviews, quote CTA
- **Catering Services** (`/catering`) — corporate, weddings, university, church
- **Menus & Packages** (`/menu`) — catering packages plus the everyday plates / by-the-pound menu
- **Our Work** (`/our-work`) — Bulldog Bash, university events, catering jobs
- **About** (`/about`)
- **Request a Quote** (`/quote`) — date, location, guest count, budget, service type, menu preferences
- **Contact & Reviews** (`/contact`) — contact info, testimonials, service areas

## Content & photos

Most copy lives in [`src/lib/site.ts`](src/lib/site.ts). Photo slots render a labeled placeholder until you add a `photo` path to a service, package, or gallery item.

**Adding photos:** put the full-resolution original in `images/photos/` and reference it as `/photos/<name>.jpg`. Before every `dev` and `build`, [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs) generates WebP versions at several widths into `public/img/` (gitignored), and a custom `next/image` loader serves each device the smallest size it needs. Larger originals mean sharper photos on big screens; nothing is ever upscaled. Testimonials marked `placeholder: true` show a visible "sample review" label — replace them with real reviews before launch.

## Deploy to GitHub Pages

This site builds as a **static export** and deploys via GitHub Actions.

1. In the repo on GitHub: **Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not “Deploy from a branch”)
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually)

Site URL:

**https://titusneyland.github.io/ScoopsBBQ/**

If Pages was previously set to “Deploy from a branch,” GitHub was serving the README — switching to Actions fixes that.

### Local static preview

```bash
GITHUB_PAGES=true npm run build
npx serve out
```

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Firebase env vars, the site still runs using the built-in local menu. Checkout and catering submission require Firebase.

## Firebase setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Cloud Firestore**.
3. Add a **Web** app and copy the config into `.env.local` (see `.env.example`):

```bash
cp .env.example .env.local
```

4. Deploy security rules from [`firestore.rules`](firestore.rules) (Firebase Console → Firestore → Rules, or Firebase CLI).
5. Seed the menu:

```bash
# Download a service account JSON from Project settings → Service accounts
# Save as ./serviceAccountKey.json (gitignored via *.pem / keep out of git)
npm run seed:menu
```

Set `FIREBASE_SERVICE_ACCOUNT_PATH` in `.env.local` if the key lives elsewhere.

### Collections

| Collection | Purpose |
|---|---|
| `menuItems` | Menu catalog (public read when `available == true`) |
| `cateringInquiries` | Quote requests (public create only) |

## Swapping placeholders

| Asset | Where |
|---|---|
| Photos | Put originals in `images/photos/`, then set `photo` on items in `src/lib/site.ts` (hero/intro/about photos: the `<Photo>` calls in each page) |
| Logo | `images/logo.png` (tab icon: `src/app/icon.png`) |
| Email, service areas, testimonials, package details | `src/lib/site.ts` |
| Phone | `src/lib/types.ts` |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run seed:menu` | Write starter menu to Firestore |
| `npm run lint` | ESLint |

## Out of scope (v1)

- Online card payments (Stripe/Square later)
- Staff admin dashboard
- Delivery tracking
