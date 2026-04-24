import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/schema-org";

/**
 * sitemap.xml generator (Next 14 convention).
 *
 * Lists publicly crawlable URLs so search engines (Yandex, Google)
 * discover the product pages and their update cadence.
 *
 * Rules:
 *   - Home page: monthly, priority 1.0
 *   - Ready product pages: monthly, priority 0.9 (filtered from PRODUCTS
 *     by `comingSoon === false | undefined`)
 *   - Coming-soon products: excluded from sitemap — they render as
 *     disabled cards, no detail page exists to index
 *
 * SITE_URL uses NEXT_PUBLIC_SITE_URL env when set (for preview deploys),
 * fallback `https://anhelspb.com`. Canonical production URL must be
 * finalized before Яндекс Вебмастер submission — see audit finding 28
 * (metadataBase correction).
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];

  for (const product of PRODUCTS) {
    if (product.comingSoon) continue;
    routes.push({
      url: `${SITE_URL}${product.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  return routes;
}
