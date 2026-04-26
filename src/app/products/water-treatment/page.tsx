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
import { waterTreatmentContent } from "@/content/products/water-treatment";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/water-treatment
 *
 * Четвёртая продуктовая страница — водоподготовка. Структура
 * аналогична water-supply (10 секций, без HowItWorks), но
 * технологически это другое оборудование: не насосы, а установки
 * фильтрации, умягчения, обезжелезивания и обратного осмоса.
 *
 * Section map:
 *   01 Hero                04 Бренды               07 Кейсы
 *   02 ТТХ                 05 Преимущества (9)     08 Опросный лист
 *   03 Применение          06 Галерея              09 Документация
 *                                                  10 Финальный CTA
 *
 * Применение — стандартные 6 карточек (жилые, котельные,
 * промышленность, пищевая, HoReCa, медицина). В отличие от ИТП
 * здесь «линейка модулей» не нужна — установка водоподготовки
 * это индивидуальный проект под качество входной воды, а не
 * каталог модулей.
 */
export const metadata: Metadata = {
  title: waterTreatmentContent.metaTitle,
  description: waterTreatmentContent.metaDescription,
  openGraph: {
    type: "website",
    title: waterTreatmentContent.metaTitle,
    description: waterTreatmentContent.metaDescription,
    url: `/products/water-treatment`,
    images: [
      {
        url: waterTreatmentContent.hero.image.src,
        alt: waterTreatmentContent.hero.image.alt,
      },
    ],
  },
};

export default function WaterTreatmentProductPage() {
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
  } = waterTreatmentContent;

  const productJsonLd = productLd({
    slug,
    name: "Установки водоподготовки ANHEL",
    description: waterTreatmentContent.metaDescription,
    image: waterTreatmentContent.hero.image.src,
    category: "Water treatment / Filtration",
    model: "VPU-NU",
    routePath: `/products/${slug}`,
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Водоподготовка", url: `/products/${slug}` },
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
