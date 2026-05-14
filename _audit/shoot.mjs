// _audit/shoot.mjs — single focused capture for problem-evidence screenshots.
// Full page:   node _audit/shoot.mjs --url http://localhost:3000/ --vp 390 --theme light --locale ru --out /tmp/x.webp
// Clipped:     ... --out _audit/screenshots/home/issue-01.webp --clip 0,3200,780,1400
//   --clip is left,top,width,height in RAW screenshot px (viewport width * deviceScaleFactor).
//   vp 390 -> dsf 2 (raw width 780); vp 820 -> dsf 2 (1640); vp 1440 -> dsf 1 (1440).
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : "true"]);
    return acc;
  }, [])
);
const VIEWPORTS = { 390: { width: 390, height: 844, dsf: 2, mobile: true }, 820: { width: 820, height: 1180, dsf: 2, mobile: true }, 1440: { width: 1440, height: 900, dsf: 1, mobile: false } };
const V = VIEWPORTS[args.vp || "390"];
const theme = args.theme || "light";
const locale = args.locale || "ru";
const out = args.out || "/tmp/audit-shot.webp";
const WEBP_MAX = 16000;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: V.width, height: V.height },
  deviceScaleFactor: V.dsf,
  isMobile: V.mobile,
  hasTouch: V.mobile,
  reducedMotion: "reduce",
  locale: locale === "ru" ? "ru-RU" : locale === "tr" ? "tr-TR" : "en-US",
});
await ctx.addInitScript((t) => { try { localStorage.setItem("theme", t); } catch {} }, theme);
const page = await ctx.newPage();
await page.goto(args.url, { waitUntil: "domcontentloaded", timeout: 45000 });
try { await page.waitForLoadState("networkidle", { timeout: 15000 }); } catch {}
try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const step = () => {
      const h = document.body.scrollHeight;
      y += Math.round(window.innerHeight * 0.8);
      window.scrollTo(0, y);
      if (y < h) setTimeout(step, 110); else { window.scrollTo(0, 0); setTimeout(res, 400); }
    };
    step();
  });
});
await page.waitForTimeout(500);

const buf = await page.screenshot({ fullPage: true, type: "png" });
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
let pipe = sharp(buf);
const meta = await pipe.metadata();
if (args.clip && args.clip !== "true") {
  let [left, top, width, height] = args.clip.split(",").map(Number);
  left = Math.max(0, Math.min(left, meta.width - 1));
  top = Math.max(0, Math.min(top, meta.height - 1));
  width = Math.min(width, meta.width - left);
  height = Math.min(height, meta.height - top);
  pipe = sharp(buf).extract({ left, top, width, height });
} else if (meta.width > WEBP_MAX || meta.height > WEBP_MAX) {
  const scale = WEBP_MAX / Math.max(meta.width, meta.height);
  pipe = sharp(buf).resize({ width: Math.round(meta.width * scale) });
}
await pipe.webp({ quality: 80 }).toFile(out);
const fm = await sharp(fs.readFileSync(out)).metadata();
console.log(`saved ${out}  (${fm.width}x${fm.height})  page raw ${meta.width}x${meta.height}`);
await browser.close();
