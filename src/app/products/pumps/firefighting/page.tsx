import type { Metadata } from "next";
import { ProductHero } from "@/components/product-page/ProductHero";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { TechSpecsGrid } from "@/components/product-page/TechSpecsGrid";
import { ApplicationsGrid } from "@/components/product-page/ApplicationsGrid";
import { BrandsStrip } from "@/components/product-page/BrandsStrip";
import { AdvantagesGrid } from "@/components/product-page/AdvantagesGrid";
import { GalleryRail } from "@/components/product-page/GalleryRail";
import { CasesCarousel } from "@/components/product-page/CasesCarousel";
import { QuizSection } from "@/components/product-page/quiz/QuizSection";
import { HowItWorksSection } from "@/components/products/firefighting/lakhta/HowItWorksSection";
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
 * Section map (current vs planned):
 *   1  Hero                           ✓  ProductHero
 *   2  Тех. характеристики             ✓  TechSpecsGrid
 *   3  Как срабатывает (+ 4 системы)   ✓  HowItWorksSection
 *   4  [merged into 3 — the 4-system switcher sits inside section 3]
 *   5  Применение                      ✓  ApplicationsGrid
 *   6  Бренды насосов + комплектующие  ✓  BrandsStrip
 *   7  Преимущества (9 пунктов)        ✓  AdvantagesGrid
 *   8  Галерея                         ✓  GalleryRail (skeletons)
 *   9  Кейсы                           ✓  CasesCarousel (skeletons)
 *   10 Опросный лист (квиз)            ✓  QuizSection (UI only)
 *   11 Документация                    ⏳
 *   12 Финальный CTA + соседние        ⏳
 *
 * The `#quiz` anchor referenced by the hero CTAs lands with section 10.
 * Until then clicking the buttons is a no-op (lands on nothing, no
 * error) — cleanest stub.
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
  const {
    hero,
    techSpecs,
    accent,
    applications,
    brands,
    advantages,
    gallery,
    cases,
    quiz,
  } = firefightingContent;

  return (
    <ProductPageShell accent={accent}>
      <ProductHero content={hero} accent={accent} />
      <TechSpecsGrid specs={techSpecs} />
      <HowItWorksSection />
      <ApplicationsGrid content={applications} />
      <BrandsStrip content={brands} />
      <AdvantagesGrid content={advantages} />
      <GalleryRail content={gallery} />
      <CasesCarousel content={cases} />
      <QuizSection content={quiz} />
      {/*
        Next commits (in order):
          — Sections 11 + 12: documents + final CTA + neighbour nav
          — Deferred:      quiz email / Telegram / Turnstile
      */}
    </ProductPageShell>
  );
}
