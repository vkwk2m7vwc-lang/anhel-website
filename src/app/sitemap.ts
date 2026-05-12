import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/schema-org";
import { locales, defaultLocale, type Locale } from "@/i18n";

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
 * Coming-soon product pages are still excluded — they render as
 * disabled cards, no detail page exists to index.
 *
 * SITE_URL uses NEXT_PUBLIC_SITE_URL env when set (for preview deploys),
 * fallback `https://anhelspb.com`.
 */

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths: string[] = ["/"];

  for (const product of PRODUCTS) {
    if (product.comingSoon) continue;
    paths.push(product.href);
  }

  const entries: MetadataRoute.Sitemap = [];
  for (const path of paths) {
    const isHome = path === "/";
    for (const locale of locales) {
      entries.push({
        url: urlFor(locale, path),
        lastModified: now,
        changeFrequency: "monthly",
        priority: isHome ? 1.0 : 0.9,
        alternates: { languages: alternatesFor(path) },
      });
    }
  }

  return entries;
}
