"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartItem, MenuItem } from "@/lib/types";

const STORAGE_KEY = "scoops-bbq-cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

let memoryCart: CartItem[] = [];
const listeners = new Set<() => void>();

function readStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function setCart(next: CartItem[]) {
  memoryCart = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore quota / private mode
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartItem[] {
  return memoryCart;
}

function getServerSnapshot(): CartItem[] {
  return [];
}

function ensureHydrated() {
  if (typeof window === "undefined") return;
  memoryCart = readStorage();
}

if (typeof window !== "undefined") {
  ensureHydrated();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((item: MenuItem, quantity = 1) => {
    if (item.price == null || item.marketPrice) return;
    const price = item.price;
    const prev = memoryCart;
    const existing = prev.find((row) => row.menuItemId === item.id);
    if (existing) {
      setCart(
        prev.map((row) =>
          row.menuItemId === item.id
            ? { ...row, quantity: row.quantity + quantity }
            : row
        )
      );
      return;
    }
    setCart([
      ...prev,
      {
        menuItemId: item.id,
        name: item.name,
        price,
        quantity,
        imageUrl: item.imageUrl,
      },
    ]);
  }, []);

  const removeItem = useCallback((menuItemId: string) => {
    setCart(memoryCart.filter((row) => row.menuItemId !== menuItemId));
  }, []);

  const updateQuantity = useCallback((menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(memoryCart.filter((row) => row.menuItemId !== menuItemId));
      return;
    }
    setCart(
      memoryCart.map((row) =>
        row.menuItemId === menuItemId ? { ...row, quantity } : row
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, row) => sum + row.quantity, 0);
    const subtotal = items.reduce(
      (sum, row) => sum + row.price * row.quantity,
      0
    );
    return {
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [items, addItem, removeItem, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
