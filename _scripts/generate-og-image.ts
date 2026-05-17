/**
 * Generate the OG-image and the square Schema.org logo PNGs from their
 * SVG sources in `_assets/`. Run once per design change, commit both
 * the PNG outputs (so production serves them without a build step) and
 * this script (so the next change is reproducible).
 *
 * Outputs:
 *   public/og/default.png  (1200×630)  — Open Graph + Twitter card
 *   public/logo.png        ( 400×400)  — Schema.org Organization.logo
 *
 * Font note: sharp renders SVG via librsvg, which uses fontconfig — it
 * has NO access to web fonts or Next.js bundled fonts. The SVG sources
 * therefore list a font stack starting with Onest (in case it's
 * installed in the OS) and falling back to Helvetica/Arial; on most
 * macOS/Linux installs the fallback is what actually renders, which
 * is a regular grotesque sans, close enough visually.
 *
 * Run:
 *   npx tsx _scripts/generate-og-image.ts
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '..');

async function render(srcRel: string, outRel: string, w: number, h: number) {
  const src = path.join(ROOT, srcRel);
  const out = path.join(ROOT, outRel);

  const svg = await fs.readFile(src);

  // Pre-create the output directory just in case (public/og may not
  // exist on a clean checkout before the first run).
  await fs.mkdir(path.dirname(out), { recursive: true });

  // `density` boosts the SVG rasterisation resolution before resize so
  // text edges stay crisp at the target size. Use 2× the target width
  // — gives us a clean downsample to the exact OG dimensions.
  await sharp(svg, { density: Math.round((w / 1200) * 300) })
    .resize(w, h, { fit: 'fill' })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);

  const stat = await fs.stat(out);
  console.log(
    `✓ ${outRel}  (${w}×${h}, ${(stat.size / 1024).toFixed(1)} KB)`,
  );
}

async function main() {
  await render('_assets/og-image.svg', 'public/og/default.png', 1200, 630);
  await render('_assets/logo-square.svg', 'public/logo.png', 400, 400);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
