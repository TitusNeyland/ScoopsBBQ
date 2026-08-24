import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "./firebase";
import type { Order, OrderCustomer, OrderItem } from "./types";

export interface CreateOrderInput {
  items: OrderItem[];
  customer: OrderCustomer;
  notes: string;
  total: number;
}

export async function createOrder(
  input: CreateOrderInput
): Promise<{ id: string }> {
  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase is not configured. Add your Firebase keys to .env.local to accept orders."
    );
  }

  const db = getDb();
  if (!db) {
    throw new Error("Firestore is unavailable.");
  }

  const payload: Omit<Order, "id"> = {
    items: input.items,
    customer: input.customer,
    notes: input.notes,
    fulfillment: "pickup",
    paymentStatus: "pay_at_pickup",
    status: "new",
    total: input.total,
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, "orders"), payload);
  return { id: ref.id };
}
