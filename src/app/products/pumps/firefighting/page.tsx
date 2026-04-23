import type { Metadata } from "next";
import { ProductHero } from "@/components/product-page/ProductHero";
import { TechSpecsGrid } from "@/components/product-page/TechSpecsGrid";
import { HowItWorksSection } from "@/components/products/firefighting/lakhta/HowItWorksSection";
import { InstallationTypesSection } from "@/components/products/firefighting/installation-types/InstallationTypesSection";
import { firefightingContent } from "@/content/products/firefighting";

/**
 * /products/pumps/firefighting
 *
 * Reference product page for the site — everything we build here
 * becomes the template for water-supply, heating-unit, and
 * water-treatment. Content lives in
 * `src/content/products/firefighting.ts`; this file is only the
 * assembly.
 *
 * Commit 1 landed sections 1-2 (hero + tech specs). Sections 3-12 are
 * placeholders for subsequent commits. The `#quiz` anchor referenced by
 * the hero CTAs lands in commit 5 — until then clicking the buttons is
 * a no-op (lands on nothing, no error).
 */
export const metadata: Metadata = {
  title: firefightingContent.metaTitle,
  description: firefightingContent.metaDescription,
  openGraph: {
    type: "website",
    title: `${firefightingContent.metaTitle} · ANHEL`,
    description: firefightingContent.metaDescription,
    url: `/products/pumps/firefighting`,
    images: [
      {
        url: firefightingContent.hero.image.src,
        alt: firefightingContent.hero.image.alt,
      },
    ],
  },
};

export default function FirefightingProductPage() {
  const { hero, techSpecs, accent, installationTypes } = firefightingContent;

  return (
    <>
      <ProductHero content={hero} accent={accent} />
      <TechSpecsGrid specs={techSpecs} />
      <HowItWorksSection />
      {installationTypes && installationTypes.length > 0 && (
        <InstallationTypesSection types={installationTypes} />
      )}
      {/*
        Commit 3.1   — ✅ section 4 types (part 1: sprinkler + drencher)
        Commit 3.2   — section 4 types (part 2: ВПВ + combined) + polish
        Commit 3.3   — sections 5-7 (applications, components, advantages)
        Commit 4     — sections 8, 9, 11 (gallery, cases, documentation)
        Commit 5     — section 10 UI (quiz multi-step form, local only)
        Commit 6     — section 10 PDF + section 12 (CTA + neighbour nav)
        Commit 7     — quiz email submission + Turnstile (deferred)
      */}
    </>
  );
}
