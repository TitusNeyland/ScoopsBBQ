/**
 * Seed Firestore `menuItems` from the local menu catalog.
 *
 * Prerequisites:
 * 1. Create a Firebase project and enable Firestore
 * 2. Download a service account key (Project settings → Service accounts)
 * 3. Save it as serviceAccountKey.json (gitignored) or set FIREBASE_SERVICE_ACCOUNT_PATH
 * 4. Run: npm run seed:menu
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadEnv } from "dotenv";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { LOCAL_MENU } from "../src/lib/menu-data";

loadEnv({ path: ".env.local" });
loadEnv();

async function main() {
  const keyPath = resolve(
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "./serviceAccountKey.json"
  );

  let serviceAccount: Record<string, string>;
  try {
    serviceAccount = JSON.parse(readFileSync(keyPath, "utf8")) as Record<
      string,
      string
    >;
  } catch {
    console.error(
      `Could not read service account at ${keyPath}.\n` +
        "Download a key from Firebase Console → Project settings → Service accounts,\n" +
        "save it locally, and set FIREBASE_SERVICE_ACCOUNT_PATH if needed."
    );
    process.exit(1);
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount as never),
    });
  }

  const db = getFirestore();
  const batch = db.batch();

  for (const item of LOCAL_MENU) {
    const data = {
      name: item.name,
      description: item.description,
      price: item.price,
      priceSuffix: item.priceSuffix ?? null,
      marketPrice: Boolean(item.marketPrice || item.price == null),
      category: item.category,
      imageUrl: item.imageUrl,
      available: item.available,
      sortOrder: item.sortOrder,
    };
    const ref = db.collection("menuItems").doc(item.id);
    batch.set(ref, data);
  }

  await batch.commit();
  console.log(`Seeded ${LOCAL_MENU.length} menu items into Firestore.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
