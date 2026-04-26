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
import { specialContent } from "@/content/products/special";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/pumps/special
 *
 * Насосные станции специального исполнения — контейнерные сборки
 * и стеклопластиковые ёмкости. Полная копия структуры water-supply
 * (10 секций) с обновлённым контентом под специфику специсполнений
 * (повышенные требования к среде эксплуатации, отсутствие капстроя
 * на объекте, сжатые сроки поставки).
 *
 * Section map: см. water-supply/page.tsx — порядок секций идентичен.
 */
export const metadata: Metadata = {
  title: specialContent.metaTitle,
  description: specialContent.metaDescription,
  openGraph: {
    type: "website",
    title: specialContent.metaTitle,
    description: specialContent.metaDescription,
    url: `/products/pumps/special`,
    images: [
      {
        url: specialContent.hero.image.src,
        alt: specialContent.hero.image.alt,
      },
    ],
  },
};

export default function SpecialProductPage() {
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
  } = specialContent;

  const productJsonLd = productLd({
    slug,
    name: "Насосные станции ANHEL специального исполнения",
    description: specialContent.metaDescription,
    image: specialContent.hero.image.src,
    category: "Pump / Special execution",
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Специальное исполнение", url: `/products/pumps/${slug}` },
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
