import type { Metadata } from "next";
import { ProductHero } from "@/components/product-page/ProductHero";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { TechSpecsGrid } from "@/components/product-page/TechSpecsGrid";
import { ApplicationsGrid } from "@/components/product-page/ApplicationsGrid";
import { BrandsStrip } from "@/components/product-page/BrandsStrip";
import { AdvantagesGrid } from "@/components/product-page/AdvantagesGrid";
import { GalleryRail } from "@/components/product-page/GalleryRail";
import { DescriptionSection } from "@/components/product-page/DescriptionSection";
import { RelatedProjectsSection } from "@/components/product-page/RelatedProjectsSection";
import { DocumentsGrid } from "@/components/product-page/DocumentsGrid";
import { ProductCtaFooter } from "@/components/product-page/ProductCtaFooter";
import { waterSupplyContent } from "@/content/products/water-supply";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/pumps/water-supply
 *
 * Second product page после firefighting (template referent).
 * Использует те же компоненты; отличие — отсутствие секции 3
 * «Как срабатывает» (она у firefighting — scroll-driven narrative
 * про активацию пожарной автоматики, для водоснабжения нет
 * эквивалентной «драматической» истории — станция просто работает
 * 24/7 и частотно подстраивается под расход).
 *
 * Section map:
 *   01 Hero                           ✓  ProductHero
 *   02 Тех. характеристики             ✓  TechSpecsGrid
 *   03 Применение                      ✓  ApplicationsGrid
 *   04 Бренды                          ✓  BrandsStrip
 *   05 Преимущества (9 пунктов)        ✓  AdvantagesGrid
 *   06 Галерея                         ✓  GalleryRail (skeletons)
 *   07 Кейсы                           ✓  CasesCarousel (skeletons)
 *   08 Опросный лист (квиз)            ✓  QuizSection
 *   09 Документация                    ✓  DocumentsGrid
 *   10 Финальный CTA + соседние        ✓  ProductCtaFooter
 *
 * Секция «Как работает» для водоснабжения — возможное расширение
 * (режимы: спящий / поддержание давления / пиковая нагрузка),
 * но для первого релиза не включаем. Флаг в отчёте
 * `_docs/water_supply_report.md`.
 */
export const metadata: Metadata = {
  title: waterSupplyContent.metaTitle,
  description: waterSupplyContent.metaDescription,
  openGraph: {
    type: "website",
    title: `${waterSupplyContent.metaTitle} · ANHEL®`,
    description: waterSupplyContent.metaDescription,
    url: `/products/pumps/water-supply`,
    images: [
      {
        url: waterSupplyContent.hero.image.src,
        alt: waterSupplyContent.hero.image.alt,
      },
    ],
  },
};

export default function WaterSupplyProductPage() {
  const {
    slug,
    hero,
    techSpecs,
    description,
    accent,
    applications,
    brands,
    advantages,
    gallery,
    documents,
    footerCta,
  } = waterSupplyContent;

  const productJsonLd = productLd({
    slug,
    name: "Насосные станции водоснабжения ANHEL®",
    description: waterSupplyContent.metaDescription,
    image: waterSupplyContent.hero.image.src,
    category: "Pump / Water supply",
    model: "HVS-NU",
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Насосные станции", url: "/products" },
    { name: "Водоснабжение", url: `/products/pumps/${slug}` },
  ]);

  return (
    <ProductPageShell accent={accent}>
      <script {...ldScriptProps(productJsonLd)} />
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      <ProductHero content={hero} accent={accent} />
      <TechSpecsGrid specs={techSpecs} />
      {description ? <DescriptionSection content={description} /> : null}
      <ApplicationsGrid content={applications} />
      <BrandsStrip content={brands} />
      <AdvantagesGrid content={advantages} />
      <GalleryRail content={gallery} />
      <RelatedProjectsSection productSlug={slug} tag="08 · ОБЪЕКТЫ" />
      <DocumentsGrid content={documents} />
      <ProductCtaFooter content={footerCta} currentSlug={slug} />
    </ProductPageShell>
  );
}
