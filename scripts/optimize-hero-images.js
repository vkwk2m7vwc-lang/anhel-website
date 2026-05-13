/**
 * Конвертирует ключевые PNG-рендеры продуктов в WebP.
 *
 * Контекст: hero-carousel и продуктовые страницы тащат ~5MB PNG-картинок
 * при первой загрузке (5 продуктов × 0.7-1.4MB). next/image автоматически
 * конвертирует в WebP/AVIF в production через /_next/image, но source-файл
 * всё равно весит много (Vercel image-optimization кэширует выход, но
 * первая трансформация = full PNG byte-cost).
 *
 * Решение — отдать next/image уже-WebP. Сохраняет 60-75% размера на нашем
 * наборе непрозрачных рендеров с мягкими тенями. Качество 85 для альфа-PNG
 * визуально неотличимо от оригинала.
 *
 * Применение: node scripts/optimize-hero-images.js
 *
 * После запуска нужно обновить ссылки на /assets/products/*.png →
 * /assets/products/*.webp в hero-products.ts и в страницах продуктов.
 *
 * Зависимости: sharp (уже в devDependencies).
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const TARGETS = [
  // Hero carousel + соответствующие продуктовые страницы
  "public/assets/products/hvs-nu.png",
  "public/assets/products/hvs-nu-red2.png",
  "public/assets/products/vpu.png",
  "public/assets/products/bitp.png",
  "public/assets/products/heating-cooling.png",
  "public/assets/products/special.png",
  "public/assets/products/pressure-boost.png",
  // heating-unit modules
  "public/assets/products/heating-unit/modules/two-stage-dhw.png",
  "public/assets/products/heating-unit/modules/two-stage-dhw-monoblock.png",
  "public/assets/products/heating-unit/modules/closed-heating.png",
  "public/assets/products/heating-unit/modules/open-heating.png",
  "public/assets/products/heating-unit/modules/steam-condensate.png",
  "public/assets/products/heating-unit/modules/single-stage-dhw.png",
  "public/assets/products/heating-unit/modules/makeup.png",
  "public/assets/products/heating-unit/modules/input-metering.png",
];

(async () => {
  let saved = 0;
  let originalTotal = 0;
  let webpTotal = 0;
  for (const file of TARGETS) {
    if (!fs.existsSync(file)) {
      console.log(`  skip (missing): ${file}`);
      continue;
    }
    const outFile = file.replace(/\.png$/i, ".webp");
    const origSize = fs.statSync(file).size;
    originalTotal += origSize;

    // quality 85 — визуально совпадает с PNG для матовых рендеров.
    // effort 6 — на 30% дольше билд, но 5-8% меньше размер.
    await sharp(file)
      .webp({ quality: 85, effort: 6 })
      .toFile(outFile);

    const webpSize = fs.statSync(outFile).size;
    webpTotal += webpSize;
    saved += origSize - webpSize;
    const pct = ((1 - webpSize / origSize) * 100).toFixed(0);
    console.log(
      `  ${file.replace(/^public\//, "")} → .webp  ${(origSize / 1024).toFixed(
        0
      )}K → ${(webpSize / 1024).toFixed(0)}K  (-${pct}%)`
    );
  }
  console.log("");
  console.log(
    `Total: ${(originalTotal / 1024 / 1024).toFixed(2)}MB → ${(
      webpTotal /
      1024 /
      1024
    ).toFixed(2)}MB  (saved ${(saved / 1024 / 1024).toFixed(2)}MB, -${(
      (saved / originalTotal) *
      100
    ).toFixed(0)}%)`
  );
  console.log("");
  console.log(
    "Next steps: update image refs in src/ to point at .webp variants:"
  );
  console.log("  - src/lib/hero-products.ts");
  console.log("  - src/components/products/* (showcases, cards)");
  console.log("  - src/components/products/heating-unit/HeatingModulesCatalog.tsx");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
