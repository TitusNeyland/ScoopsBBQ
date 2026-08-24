import type { MenuItem } from "./types";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatMenuPrice(item: Pick<MenuItem, "price" | "marketPrice" | "priceSuffix">): string {
  if (item.marketPrice || item.price == null) {
    return "Market Price";
  }
  const base = formatPrice(item.price);
  return item.priceSuffix ? `${base} ${item.priceSuffix}` : base;
}
