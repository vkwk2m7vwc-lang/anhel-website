import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const FILES = [
  'public/assets/products/control-systems/electric-actuators/hero.png',
  'public/assets/products/control-systems/fire-suppression/hero.png',
  'public/assets/products/control-systems/sewage-pumping/hero.png',
  'public/assets/products/control-systems/smoke-control/hero.png',
  'public/assets/products/control-systems/variable-frequency/hero.png',
];

const results = [];
for (const f of FILES) {
  const abs = path.resolve(f);
  const dir = path.dirname(abs);
  const base = path.basename(abs, '.png');
  const inputStat = await fs.stat(abs);

  const avifOut = path.join(dir, `${base}.avif`);
  await sharp(abs).avif({ quality: 60, effort: 6 }).toFile(avifOut);
  const avifStat = await fs.stat(avifOut);

  // Перегенерируем WebP с актуальной квалити — старые webp были q?, ставим q80
  const webpOut = path.join(dir, `${base}.webp`);
  await sharp(abs).webp({ quality: 80 }).toFile(webpOut);
  const webpStat = await fs.stat(webpOut);

  results.push({
    file: f.replace('public', ''),
    png: (inputStat.size / 1024).toFixed(1) + ' KB',
    webp: (webpStat.size / 1024).toFixed(1) + ' KB',
    avif: (avifStat.size / 1024).toFixed(1) + ' KB',
  });
}
console.table(results);
