import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema-org";

/**
 * robots.txt generator (Next 14 convention).
 *
 * Default posture: index everything except Next.js internal paths and
 * dev scenario routes. The scenario-a/b/c/d routes under
 * /products/pumps/firefighting/ were research prototypes during the
 * hero exploration and shouldn't surface in search results.
 *
 * Points сrawlers to `sitemap.xml` for URL discovery.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/products/pumps/firefighting/scenario-a",
          "/products/pumps/firefighting/scenario-b",
          "/products/pumps/firefighting/scenario-c",
          "/products/pumps/firefighting/scenario-d",
          // `/hero-e` is an alias route used by the dev team for
          // linking into the autoplay hero variant — same layout as
          // /, no need to double-index.
          "/hero-e",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
