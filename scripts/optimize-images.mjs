/**
 * Generate responsive WebP variants of everything in images/ into public/img/,
 * plus a manifest the next/image loader (src/lib/image-loader.ts) reads.
 *
 * Runs automatically before `npm run dev` and `npm run build`.
 * To add a photo: drop the full-resolution file in images/photos/ and
 * reference it as "/photos/<name>.jpg".
 */
import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import sharp from "sharp";

const SRC_DIR = "images";
const OUT_DIR = "public/img";
const MANIFEST = "src/lib/image-manifest.json";
const WIDTHS = [96, 192, 384, 640, 960, 1280, 1600, 1920, 2560];
const QUALITY = 75;

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const path = join(dir, e.name);
      if (e.isDirectory()) return listImages(path);
      return /\.(jpe?g|png|webp)$/i.test(e.name) ? [path] : [];
    })
  );
  return files.flat();
}

async function isFresh(output, sourceMtime) {
  try {
    return (await stat(output)).mtimeMs >= sourceMtime;
  } catch {
    return false;
  }
}

const manifest = {};
const expected = new Set();
let generated = 0;

for (const file of (await listImages(SRC_DIR)).sort()) {
  const key = relative(SRC_DIR, file).replace(/\\/g, "/").replace(/\.\w+$/, "");
  const { width, height } = await sharp(file).metadata();
  const widths = [...WIDTHS.filter((w) => w < width), Math.min(width, 2560)];
  const sourceMtime = (await stat(file)).mtimeMs;

  for (const w of widths) {
    const output = join(OUT_DIR, `${key}-${w}.webp`);
    expected.add(output);
    if (await isFresh(output, sourceMtime)) continue;
    await mkdir(dirname(output), { recursive: true });
    await sharp(file).resize({ width: w }).webp({ quality: QUALITY }).toFile(output);
    generated++;
  }

  manifest[key] = { width, height, widths };
}

// Drop variants whose source was removed or renamed.
for (const output of await listImages(OUT_DIR).catch(() => [])) {
  if (!expected.has(output)) await rm(output);
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(
  `optimize-images: ${Object.keys(manifest).length} images, ${generated} variants generated`
);
