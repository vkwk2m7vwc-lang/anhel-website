import { chromium, devices } from "playwright";

const URL =
  process.argv[2] ||
  "https://anhel-website-876sbt2ek-anurin7-5494s-projects.vercel.app/?_vercel_share=1gXPyI1GXppctRI4yhXNtv4wUsbEjaJv";
const OUT = process.argv[3] || "tmp/hero-mobile.png";

const iphone = devices["iPhone 13"];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  ...iphone,
  locale: "ru-RU",
  reducedMotion: "reduce",
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
// LoadingSplash может закрывать hero — ждём чтобы он успел уйти
await page.waitForTimeout(2200);
await page.screenshot({ path: OUT, fullPage: false });
console.log("saved:", OUT, " viewport:", iphone.viewport);
await browser.close();
