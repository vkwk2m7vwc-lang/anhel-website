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
import { pressureBoostContent } from "@/content/products/pressure-boost";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/pumps/pressure-boost
 *
 * Автоматические установки поддержания давления (АУПД). Полная копия
 * структуры water-supply (10 секций) с обновлённым контентом —
 * поддержание постоянного давления, деаэрация и компенсация
 * температурных расширений в закрытых сетях теплоснабжения и
 * охлаждения.
 *
 * Section map: см. water-supply/page.tsx — порядок секций идентичен.
 */
export const metadata: Metadata = {
  title: pressureBoostContent.metaTitle,
  description: pressureBoostContent.metaDescription,
  openGraph: {
    type: "website",
    title: pressureBoostContent.metaTitle,
    description: pressureBoostContent.metaDescription,
    url: `/products/pumps/pressure-boost`,
    images: [
      {
        url: pressureBoostContent.hero.image.src,
        alt: pressureBoostContent.hero.image.alt,
      },
    ],
  },
};

export default function PressureBoostProductPage() {
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
  } = pressureBoostContent;

  const productJsonLd = productLd({
    slug,
    name: "Насосные станции ANHEL для поддержания давления",
    description: pressureBoostContent.metaDescription,
    image: pressureBoostContent.hero.image.src,
    category: "Pump / Pressure maintenance",
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Поддержание давления", url: `/products/pumps/${slug}` },
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
