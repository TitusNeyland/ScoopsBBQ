"use client";

import manifest from "./image-manifest.json";

type Entry = { width: number; height: number; widths: number[] };

/**
 * next/image loader for the static export: maps "/photos/x.jpg" to the
 * smallest pre-generated WebP variant at least as wide as requested.
 * Variants are produced by scripts/optimize-images.mjs.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const key = src.replace(/^\/+/, "").replace(/\.\w+$/, "");
  const entry = (manifest as Record<string, Entry>)[key];
  if (!entry) return `${base}${src}`;

  const w = entry.widths.find((v) => v >= width) ?? entry.widths[entry.widths.length - 1];
  return `${base}/img/${key}-${w}.webp`;
}
