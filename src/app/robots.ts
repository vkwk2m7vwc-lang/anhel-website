import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema-org";

/**
 * robots.txt generator (Next 14 convention).
 *
 * Default posture: index everything except Next.js internal paths.
 * The scenario-a/b/c/d dev routes under /products/pumps/firefighting/
 * were research prototypes during the hero exploration — they have been
 * removed from routing entirely, so they no longer need a disallow rule.
 *
 * Points сrawlers to `sitemap.xml` for URL discovery.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
