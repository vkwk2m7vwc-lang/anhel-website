/**
 * Schema.org JSON-LD helpers.
 *
 * Small factory functions that produce typed JSON-LD payloads used by
 * layout.tsx (Organization, site-wide) and per-product pages (Product,
 * BreadcrumbList). They all return plain objects — callers wrap with
 * `<script type="application/ld+json" dangerouslySetInnerHTML=...>`.
 *
 * Why one module: BRAND/contact/site data appears in multiple LD-blobs
 * (Product has manufacturer.Organization, Organization has contactPoint,
 * etc.). Centralising the values keeps edits single-touch.
 */

import { CONTACTS } from "./contacts";

/**
 * Production canonical URL used for all @id/url fields. When the site
 * moves to a final domain, update here — structured data on prior
 * deploys will still resolve to the live pages because Schema.org
 * treats @id as a logical identifier, not a physical crawl target.
 *
 * NEXT_PUBLIC_SITE_URL env takes precedence so Vercel preview builds
 * carry the preview origin in their LD rather than the production one
 * (prevents duplicate @id collisions during QA).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://anhelspb.com";

type JsonLd = Record<string, unknown>;

/**
 * Site-wide Organization entity. Rendered once in the root layout so
 * every page exposes the same org signal — avoids Schema.org's dedup
 * warnings that fire when multiple conflicting Organization blobs
 * appear on different pages.
 */
export function organizationLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "ANHEL",
    legalName: "ГК Профит",
    alternateName: ["ANHEL®", "ГК Профит"],
    url: SITE_URL,
    logo: `${SITE_URL}/assets/products/hvs-nu.png`,
    description:
      "Проектирование и производство модульного инженерного оборудования: насосные станции (водоснабжение, пожаротушение), блочные тепловые пункты, установки водоподготовки.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Политехническая ул., д. 6, стр. 1, пом. 1-Н",
      addressLocality: "Санкт-Петербург",
      addressCountry: "RU",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACTS.phone,
        email: CONTACTS.email,
        contactType: "sales",
        areaServed: "RU",
        availableLanguage: ["ru"],
      },
    ],
    // Два производственных узла — офис в СПб (см. address) и
    // производство в Москве. Schema.org позволяет multiple
    // PostalAddress через departments.
    department: [
      {
        "@type": "Organization",
        name: "ANHEL — производство",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Москва",
          addressCountry: "RU",
        },
      },
    ],
  };
}

/**
 * Product entity for a pump/equipment line. Minimal fields that
 * Google's Product rich-result requires + optional manufacturer back
 * to our Organization @id so the graph connects.
 */
export function productLd(params: {
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  /** e.g. «HVS-NU» — added to Product.model + sku when provided. */
  model?: string;
  /**
   * Optional explicit route path (e.g. `/products/water-treatment`).
   * If omitted, defaults to `/products/pumps/<slug>` for back-compat
   * with pump-station pages.
   */
  routePath?: string;
}): JsonLd {
  const url = `${SITE_URL}${params.routePath ?? `/products/pumps/${params.slug}`}`;
  const imageAbs = params.image.startsWith("http")
    ? params.image
    : `${SITE_URL}${params.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: params.name,
    description: params.description,
    image: imageAbs,
    url,
    category: params.category,
    ...(params.model
      ? { model: params.model, sku: params.model, mpn: params.model }
      : {}),
    brand: { "@type": "Brand", name: "ANHEL" },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * BreadcrumbList — helps search engines understand site hierarchy.
 * Items are positioned 1..N; the last one is the current page with no
 * `item` so crawlers don't double-link it.
 */
export function breadcrumbLd(items: ReadonlyArray<{ name: string; url?: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      ...(item.url ? { item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}` } : {}),
    })),
  };
}

/** Small helper for `dangerouslySetInnerHTML`. */
export function ldScriptProps(data: JsonLd | JsonLd[]) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
