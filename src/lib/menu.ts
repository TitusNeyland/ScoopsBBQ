import { collection, getDocs, query, where } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "./firebase";
import { LOCAL_MENU } from "./menu-data";
import type { MenuItem } from "./types";

function mapDoc(id: string, data: Record<string, unknown>): MenuItem {
  const marketPrice = Boolean(data.marketPrice);
  const rawPrice = data.price;
  const price =
    marketPrice || rawPrice === null || rawPrice === undefined
      ? null
      : Number(rawPrice);

  return {
    id,
    name: String(data.name ?? ""),
    description: String(data.description ?? ""),
    price,
    priceSuffix: data.priceSuffix ? String(data.priceSuffix) : undefined,
    marketPrice: marketPrice || price === null,
    category: data.category as MenuItem["category"],
    imageUrl: String(data.imageUrl ?? "/menu/sides.svg"),
    available: Boolean(data.available ?? true),
    sortOrder: Number(data.sortOrder ?? 0),
  };
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!isFirebaseConfigured()) {
    return LOCAL_MENU.filter((item) => item.available);
  }

  const db = getDb();
  if (!db) return LOCAL_MENU.filter((item) => item.available);

  try {
    const q = query(
      collection(db, "menuItems"),
      where("available", "==", true)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return LOCAL_MENU.filter((item) => item.available);
    }

    const items = snapshot.docs.map((docSnap) =>
      mapDoc(docSnap.id, docSnap.data() as Record<string, unknown>)
    );

    return items.sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.sortOrder - b.sortOrder
    );
  } catch (error) {
    console.error("Failed to load menu from Firestore:", error);
    return LOCAL_MENU.filter((item) => item.available);
  }
}
