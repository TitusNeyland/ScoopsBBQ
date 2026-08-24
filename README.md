# Scoops BBQ

Marketing + online ordering site for **Scoops BBQ** in Starkville, MS. Built with Next.js (React), TypeScript, Tailwind CSS, and Firebase/Firestore.

Orders are pickup-only in v1 with **pay at pickup**. Catering inquiries are stored in Firestore for follow-up.

## Features

- Brand-first home page with Order / Catering CTAs
- Menu with add-to-cart (local fallback menu until Firestore is seeded)
- Cart + checkout → `orders` collection
- Catering inquiry form → `cateringInquiries` collection
- About & Contact pages with Starkville placeholders

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
| `orders` | Customer pickup orders (public create only) |
| `cateringInquiries` | Catering leads (public create only) |

## Swapping placeholders

| Asset | Path |
|---|---|
| Hero background | `public/hero.svg` (or replace with `hero.jpg` and update `src/app/page.tsx`) |
| Logo | `public/logo.svg` |
| Menu images | `public/menu/*.svg` |
| Phone / email / address / hours | Footer, Contact page |

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
