// @ts-nocheck
/**
 * Предгенерация всех размеров картинок в WebP — выполняется на этапе
 * сборки (npm run build → перед next build).
 *
 * Каталог фото фиксированный, поэтому мы заранее режем каждую растровую
 * картинку из /public во все нужные ширины и кладём в /public/_img.
 * Дальше эти файлы отдаются статикой через CDN (см. src/lib/image-loader.ts)
 * — никакого рантайм-кодирования, мгновенно даже на первом заходе.
 *
 * Идемпотентно: уже сгенерированные файлы пропускаются (по mtime источника).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";

// Должно совпадать с WIDTHS в src/lib/image-loader.ts и с
// (imageSizes ∪ deviceSizes) в next.config.mjs.
const PREGEN_WIDTHS = [256, 384, 640, 828, 1080, 1200, 1920, 2048];
const QUALITY = 75;
const SRC_EXT = new Set([".webp", ".png", ".jpg", ".jpeg"]);

const PUBLIC_DIR = process.env.PUBLIC_DIR || path.join(process.cwd(), "public");
const OUT_ROOT = path.join(PUBLIC_DIR, "_img");

async function walk(dir, acc = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (full === OUT_ROOT) continue; // не обрабатываем собственный вывод
      await walk(full, acc);
    } else if (SRC_EXT.has(path.extname(e.name).toLowerCase())) {
      acc.push(full);
    }
  }
  return acc;
}

async function buildTasks(srcFiles) {
  const tasks = [];
  for (const src of srcFiles) {
    const rel = path.relative(PUBLIC_DIR, src); // assets/products/hvs-nu.webp
    // Расширение оставляем в пути (как отдельную папку), чтобы избежать
    // коллизий, когда рядом лежат hero.png и hero.webp.
    const srcStat = await fs.stat(src);
    for (const w of PREGEN_WIDTHS) {
      const out = path.join(OUT_ROOT, rel, `${w}.webp`);
      tasks.push({ src, out, w, srcMtime: srcStat.mtimeMs });
    }
  }
  return tasks;
}

async function isFresh(out, srcMtime) {
  try {
    const s = await fs.stat(out);
    return s.mtimeMs >= srcMtime; // вывод не старше источника
  } catch {
    return false;
  }
}

async function processTask(t) {
  if (await isFresh(t.out, t.srcMtime)) return "skip";
  await fs.mkdir(path.dirname(t.out), { recursive: true });
  await sharp(t.src)
    .resize({ width: t.w, withoutEnlargement: true }) // не увеличиваем мелкие
    .webp({ quality: QUALITY })
    .toFile(t.out);
  return "done";
}

async function run() {
  const t0 = Date.now();
  const srcFiles = await walk(PUBLIC_DIR);
  const tasks = await buildTasks(srcFiles);
  const concurrency = Math.max(2, (os.cpus()?.length || 4));
  let i = 0;
  let done = 0;
  let skip = 0;
  async function worker() {
    while (i < tasks.length) {
      const t = tasks[i++];
      const r = await processTask(t);
      if (r === "done") done++;
      else skip++;
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(
    `[pregen-images] sources=${srcFiles.length} variants=${tasks.length} generated=${done} skipped=${skip} in ${secs}s (x${concurrency})`,
  );
}

run().catch((err) => {
  console.error("[pregen-images] FAILED:", err);
  process.exit(1);
});
