import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/schema-org";
import { locales, defaultLocale, type Locale } from "@/i18n";
import { heatingModules } from "@/content/products/heating-unit-modules/data";
import { PROJECTS } from "@/content/projects/data";

/**
 * sitemap.xml generator (Next 14 convention) — multi-locale aware.
 *
 * Strategy: for every public path we emit one entry per locale.
 * The default locale (RU) lives on the bare path (e.g. `/products`);
 * non-default locales prefix the path (e.g. `/en/products`).
 *
 * Each entry advertises sibling locale URLs through `alternates.languages`
 * (Next 14's sitemap format supports xhtml:link alternates natively),
 * plus an `x-default` pointer to RU. This is what Google and Yandex
 * consume to understand the locale graph for hreflang.
 *
 * Coming-soon product pages are still excluded — они рендерятся как
 * disabled cards без детальной страницы.
 *
 * SITE_URL берётся из NEXT_PUBLIC_SITE_URL (preview-деплои), fallback
 * `https://anhelspb.com`.
 *
 * Route manifest (v1.20.8 audit followup #H6) собирается из 5 источников:
 *   1. STATIC_PATHS — корневые публичные страницы (главная, /products
 *      catalog index, /projects, /documents, /service, /service/request,
 *      /contacts, юр.документы).
 *   2. PRODUCTS — детальные продуктовые страницы (~13 живых + категории).
 *   3. heatingModules — 8 модулей блочного теплового пункта
 *      (`/products/heating-unit/<slug>`).
 *   4. QUIZ_SLUGS — 5 страниц опросных листов.
 *   5. PROJECTS — портфолио объектов (`/projects/<slug>`).
 *
 * Priority hint:
 *   1.0 — home
 *   0.9 — продуктовые страницы (cornerstone)
 *   0.8 — продуктовые подстраницы (heating-unit модули) и /projects
 *   0.7 — quiz, /documents, /service
 *   0.5 — юр.документы
 */

/** Корневые публичные страницы и категориальные индексы. */
const STATIC_PATHS: string[] = [
  "/",
  "/products",
  "/products/pumps",
  "/products/water-treatment",
  "/products/heating-unit",
  "/products/control-systems",
  "/projects",
  "/documents",
  "/service",
  "/service/request",
  "/contacts",
  "/privacy-policy",
  "/personal-data-consent",
];

/** Slugs страниц опросных листов под `/quiz/<slug>`. */
const QUIZ_SLUGS = ["pumps", "vpu", "itp", "aupd", "control-systems"] as const;

/**
 * Build the canonical URL for a given path under a given locale.
 * RU drops the prefix; everything else prepends `/<code>`.
 */
function urlFor(locale: Locale, path: string): string {
  if (locale === defaultLocale) return `${SITE_URL}${path}`;
  return path === "/"
    ? `${SITE_URL}/${locale}`
    : `${SITE_URL}/${locale}${path}`;
}

/**
 * Build the `alternates.languages` object that Next.js turns into
 * `<xhtml:link rel="alternate" hreflang="<lang>" href="<url>" />`
 * entries in the rendered XML. Every entry carries a self-link plus
 * one link per other supported locale plus `x-default = RU`.
 */
function alternatesFor(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of locales) {
    langs[l] = urlFor(l, path);
  }
  langs["x-default"] = urlFor(defaultLocale, path);
  return langs;
}

/**
 * Pick a priority for a path. Priority — относительная важность URL'а
 * для краулера в пределах сайта (Google игнорирует абсолютные значения,
 * но соотношения учитывает).
 */
function priorityFor(path: string): number {
  if (path === "/") return 1.0;
  if (path === "/privacy-policy" || path === "/personal-data-consent") return 0.5;
  if (path.startsWith("/quiz/")) return 0.7;
  if (path === "/documents" || path === "/service" || path === "/service/request") return 0.7;
  if (path.startsWith("/projects/")) return 0.8;
  if (path.startsWith("/products/heating-unit/")) return 0.8;
  return 0.9;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Корневые статические маршруты + категории.
  const paths: string[] = [...STATIC_PATHS];

  // 2. Детальные продуктовые страницы (исключаем coming-soon).
  for (const product of PRODUCTS) {
    if (product.comingSoon) continue;
    // STATIC_PATHS уже содержит /products/pumps и т.п. — избегаем дублей.
    if (paths.includes(product.href)) continue;
    paths.push(product.href);
  }

  // 3. 8 модулей блочного теплового пункта.
  for (const mod of heatingModules) {
    paths.push(`/products/heating-unit/${mod.slug}`);
  }

  // 4. 5 страниц опросных листов.
  for (const slug of QUIZ_SLUGS) {
    paths.push(`/quiz/${slug}`);
  }

  // 5. Портфолио объектов.
  for (const project of PROJECTS) {
    paths.push(`/projects/${project.slug}`);
  }

  const entries: MetadataRoute.Sitemap = [];
  for (const path of paths) {
    for (const locale of locales) {
      entries.push({
        url: urlFor(locale, path),
        lastModified: now,
        changeFrequency: "monthly",
        priority: priorityFor(path),
        alternates: { languages: alternatesFor(path) },
      });
    }
  }

  return entries;
}
