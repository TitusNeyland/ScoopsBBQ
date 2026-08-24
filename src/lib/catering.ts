import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "./firebase";
import type { CateringInquiry } from "./types";

export type CreateCateringInput = Omit<
  CateringInquiry,
  "id" | "status" | "createdAt"
>;

export async function createCateringInquiry(
  input: CreateCateringInput
): Promise<{ id: string }> {
  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase is not configured. Add your Firebase keys to .env.local to send catering inquiries."
    );
  }

  const db = getDb();
  if (!db) {
    throw new Error("Firestore is unavailable.");
  }

  const payload: Omit<CateringInquiry, "id"> = {
    ...input,
    status: "new",
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, "cateringInquiries"), payload);
  return { id: ref.id };
}
