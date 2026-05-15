// _audit/screenshot.mjs — editorial visual audit screenshot pipeline
// Usage:
//   node _audit/screenshot.mjs --routes /,/products --viewports 390 --locales ru --themes light
//   node _audit/screenshot.mjs --priority P0,P1 --viewports 390,1440 --locales ru,en,tr --themes light,dark
//   node _audit/screenshot.mjs --all
// Output: _audit/screenshots/<route-slug>/<width>_<locale>_<theme>.webp  (WebP q80)
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const SHOTS = path.join(__dirname, "screenshots");
const SITEMAP = JSON.parse(fs.readFileSync(path.join(__dirname, "site-map.json"), "utf8"));

// ---- arg parsing ----
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : "true"]);
    return acc;
  }, [])
);
const BASE = args.base || "http://localhost:3000";
const OUTDIR = args.outdir ? path.resolve(args.outdir) : SHOTS;
const VIEWPORTS = { 390: { width: 390, height: 844, dsf: 2, mobile: true }, 820: { width: 820, height: 1180, dsf: 2, mobile: true }, 1440: { width: 1440, height: 900, dsf: 1, mobile: false } };
const WEBP_MAX = 16000; // WebP hard limit is 16383px per side; downscale very long pages to fit
const wantViewports = (args.viewports ? args.viewports.split(",") : ["390"]).filter((v) => VIEWPORTS[v]);
const wantLocales = args.locales ? args.locales.split(",") : ["ru"];
const wantThemes = args.themes ? args.themes.split(",") : ["light"];

let routes = [];
if (args.all === "true") routes = SITEMAP;
else if (args.priority) {
  const pr = args.priority.split(",");
  routes = SITEMAP.filter((r) => pr.includes(r.priority));
} else if (args.routes) {
  const rr = args.routes.split(",");
  routes = SITEMAP.filter((r) => rr.includes(r.route));
} else {
  routes = SITEMAP.filter((r) => r.route === "/");
}

const slug = (route) => (route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-"));
const urlFor = (route, locale) => {
  const p = locale === "ru" ? route : `/${locale}${route === "/" ? "" : route}`;
  return BASE + p;
};

async function settle(page) {
  // wait for fonts + network, then scroll through to trigger reveal/lazy content
  try { await page.waitForLoadState("networkidle", { timeout: 15000 }); } catch {}
  try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        const h = document.body.scrollHeight;
        y += Math.round(window.innerHeight * 0.8);
        window.scrollTo(0, y);
        if (y < h) setTimeout(step, 120);
        else { window.scrollTo(0, 0); setTimeout(res, 400); }
      };
      step();
    });
  });
  try { await page.waitForLoadState("networkidle", { timeout: 8000 }); } catch {}
  await page.waitForTimeout(500);
}

async function run() {
  fs.mkdirSync(OUTDIR, { recursive: true });
  const browser = await chromium.launch();
  let ok = 0, fail = 0;
  const failures = [];
  for (const r of routes) {
    const dir = path.join(OUTDIR, slug(r.route));
    fs.mkdirSync(dir, { recursive: true });
    for (const vp of wantViewports) {
      const V = VIEWPORTS[vp];
      for (const locale of wantLocales) {
        for (const theme of wantThemes) {
          const out = path.join(dir, `${vp}_${locale}_${theme}.webp`);
          const ctx = await browser.newContext({
            viewport: { width: V.width, height: V.height },
            deviceScaleFactor: V.dsf,
            isMobile: V.mobile,
            hasTouch: V.mobile,
            reducedMotion: "reduce",
            locale: locale === "ru" ? "ru-RU" : locale === "tr" ? "tr-TR" : "en-US",
          });
          await ctx.addInitScript((t) => {
            try { localStorage.setItem("theme", t); } catch {}
          }, theme);
          const page = await ctx.newPage();
          try {
            await page.goto(urlFor(r.route, locale), { waitUntil: "domcontentloaded", timeout: 45000 });
            await settle(page);
            const buf = await page.screenshot({ fullPage: true, type: "png" });
            let pipe = sharp(buf);
            const meta = await pipe.metadata();
            let note = "";
            if (meta.width > WEBP_MAX || meta.height > WEBP_MAX) {
              const scale = WEBP_MAX / Math.max(meta.width, meta.height);
              pipe = sharp(buf).resize({ width: Math.round(meta.width * scale) });
              note = ` (downscaled ${meta.width}x${meta.height} -> fit ${WEBP_MAX})`;
            }
            await pipe.webp({ quality: 80 }).toFile(out);
            ok++;
            console.log(`  ok  ${slug(r.route)}/${vp}_${locale}_${theme}${note}`);
          } catch (e) {
            fail++;
            failures.push({ route: r.route, vp, locale, theme, error: String(e).split("\n")[0] });
            console.log(`  FAIL ${slug(r.route)}/${vp}_${locale}_${theme} :: ${String(e).split("\n")[0]}`);
          } finally {
            await ctx.close();
          }
        }
      }
    }
  }
  await browser.close();
  console.log(`\nDONE. ok=${ok} fail=${fail}`);
  if (failures.length) {
    fs.writeFileSync(path.join(__dirname, "screenshot-failures.json"), JSON.stringify(failures, null, 2));
    console.log(`failures → _audit/screenshot-failures.json`);
  }
}
run().catch((e) => { console.error(e); process.exit(1); });
