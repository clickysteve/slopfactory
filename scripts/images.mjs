// Turns source screenshots in assets/screenshots/ into the web images the site serves.
//
//   assets/screenshots/<id>.png  ->  public/screenshots/<id>.webp        (detail view, max 1600px wide)
//                                    public/screenshots/<id>-thumb.webp  (catalogue card, 720px wide)
//
// Run with `npm run images` after adding or replacing a screenshot. Only changed files are rebuilt.
import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = 'assets/screenshots';
const OUT = 'public/screenshots';
const FULL_WIDTH = 1600;
const THUMB_WIDTH = 720;

async function mtime(path) {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return 0;
  }
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
let built = 0;
for (const file of files) {
  const id = parse(file).name;
  const src = join(SRC, file);
  const full = join(OUT, `${id}.webp`);
  const thumb = join(OUT, `${id}-thumb.webp`);
  const srcTime = await mtime(src);
  if ((await mtime(full)) > srcTime && (await mtime(thumb)) > srcTime) continue;
  await sharp(src).resize({ width: FULL_WIDTH, withoutEnlargement: true }).webp({ quality: 84 }).toFile(full);
  await sharp(src).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 80 }).toFile(thumb);
  built++;
  console.log(`  ${id}`);
}
console.log(`${built} screenshot(s) rebuilt, ${files.length - built} unchanged.`);
