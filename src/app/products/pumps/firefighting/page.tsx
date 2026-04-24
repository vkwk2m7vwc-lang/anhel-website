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
import { DocumentsGrid } from "@/components/product-page/DocumentsGrid";
import { ProductCtaFooter } from "@/components/product-page/ProductCtaFooter";
import { HowItWorksSection } from "@/components/products/firefighting/lakhta/HowItWorksSection";
import { firefightingContent } from "@/content/products/firefighting";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/pumps/firefighting
 *
 * Reference product page for the site — everything we build here
 * becomes the template for water-supply, heating-unit, and
 * water-treatment. Content lives in
 * `src/content/products/firefighting.ts`; this file is only the
 * assembly.
 *
 * Section map (renumbered in audit round-1 to remove the 04 gap
 * left behind by merging the old «Как работает» into section 3):
 *   01 Hero                           ✓  ProductHero
 *   02 Тех. характеристики             ✓  TechSpecsGrid
 *   03 Как срабатывает (+ 4 системы)   ✓  HowItWorksSection
 *   04 Применение                      ✓  ApplicationsGrid
 *   05 Бренды насосов + комплектующие  ✓  BrandsStrip
 *   06 Преимущества (9 пунктов)        ✓  AdvantagesGrid
 *   07 Галерея                         ✓  GalleryRail (skeletons)
 *   08 Кейсы                           ✓  CasesCarousel (skeletons)
 *   09 Опросный лист (квиз)            ✓  QuizSection (UI only)
 *   10 Документация                    ✓  DocumentsGrid
 *   11 Финальный CTA + соседние        ✓  ProductCtaFooter
 *
 * The `#quiz` anchor referenced by the hero CTAs lands with section 09.
 */
export const metadata: Metadata = {
  title: firefightingContent.metaTitle,
  description: firefightingContent.metaDescription,
  openGraph: {
    type: "website",
    title: `${firefightingContent.metaTitle} · ANHEL®`,
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
    slug,
    hero,
    techSpecs,
    accent,
    applications,
    brands,
    advantages,
    gallery,
    cases,
    quiz,
    documents,
    footerCta,
  } = firefightingContent;

  // Schema.org Product + Breadcrumb payloads — rendered as JSON-LD
  // scripts inside the ProductPageShell so they inherit the same
  // <main> region. Model `HVS-NU` matches the canonical series label
  // used in hero-products.ts alt text (working draft — заказчик
  // финализирует обозначение перед production).
  const productJsonLd = productLd({
    slug,
    name: "Насосные станции пожаротушения ANHEL®",
    description: firefightingContent.metaDescription,
    image: firefightingContent.hero.image.src,
    category: "Pump / Fire suppression",
    model: "HVS-NU",
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Насосные станции", url: "/products" },
    { name: "Пожаротушение", url: `/products/pumps/${slug}` },
  ]);

  return (
    <ProductPageShell accent={accent}>
      {/* Structured data — Product + BreadcrumbList. Must sit inside
          the rendered tree (not <head>) so Next.js 14 emits them in
          the SSR body. Google's crawler doesn't care about position
          for JSON-LD as long as the script is present in the DOM. */}
      <script {...ldScriptProps(productJsonLd)} />
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      <ProductHero content={hero} accent={accent} />
      <TechSpecsGrid specs={techSpecs} />
      <HowItWorksSection />
      <ApplicationsGrid content={applications} />
      <BrandsStrip content={brands} />
      <AdvantagesGrid content={advantages} />
      <GalleryRail content={gallery} />
      <CasesCarousel content={cases} />
      <QuizSection content={quiz} />
      <DocumentsGrid content={documents} />
      <ProductCtaFooter content={footerCta} currentSlug={slug} />
      {/*
        Deferred: quiz email / Telegram / Turnstile backend.
      */}
    </ProductPageShell>
  );
}
