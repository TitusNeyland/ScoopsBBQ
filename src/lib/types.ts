export type MenuCategory =
  | "plates"
  | "by_the_pound"
  | "fresh_off_grill"
  | "by_the_market";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Fixed price in USD, or null for market-price items */
  price: number | null;
  /** Shown after price, e.g. "each" */
  priceSuffix?: string;
  marketPrice?: boolean;
  category: MenuCategory;
  imageUrl: string;
  available: boolean;
  sortOrder: number;
}

export interface CateringInquiry {
  id?: string;
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  location: string;
  guestCount: number;
  budget: string;
  serviceType: string;
  menuPreferences: string[];
  message: string;
  status: "new";
  createdAt?: unknown;
}

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  plates: "Plates",
  by_the_pound: "By the Pound",
  fresh_off_grill: "Fresh Off the Grill",
  by_the_market: "By the Market",
};

export const CATEGORY_ORDER: MenuCategory[] = [
  "plates",
  "by_the_pound",
  "fresh_off_grill",
  "by_the_market",
];

export const BUSINESS_PHONE = "662-694-0933";
export const BUSINESS_PHONE_TEL = "+16626940933";
export const BUSINESS_PHONE_DISPLAY = "(662) 694-0933";
