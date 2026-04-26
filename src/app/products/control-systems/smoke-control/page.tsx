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
import { smokeControlContent } from "@/content/products/control-systems/smoke-control";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/control-systems/smoke-control
 *
 * Шкаф управления противодымной вентиляцией. Красный корпус —
 * отличительный признак противопожарного устройства. Пожарный
 * сертификат ФЗ-123, IP54+.
 */
export const metadata: Metadata = {
  title: smokeControlContent.metaTitle,
  description: smokeControlContent.metaDescription,
  openGraph: {
    type: "website",
    title: smokeControlContent.metaTitle,
    description: smokeControlContent.metaDescription,
    url: `/products/control-systems/${smokeControlContent.slug}`,
    images: [
      {
        url: smokeControlContent.hero.image.src,
        alt: smokeControlContent.hero.image.alt,
      },
    ],
  },
};

export default function SmokeControlPage() {
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
  } = smokeControlContent;

  const productJsonLd = productLd({
    slug,
    name: "Шкаф управления ANHEL® противодымной вентиляцией",
    description: smokeControlContent.metaDescription,
    image: smokeControlContent.hero.image.src,
    category: "Control cabinets / Smoke control",
    model: "OMEGA-SMOKE",
    routePath: `/products/control-systems/${slug}`,
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Шкафы управления", url: "/products/control-systems" },
    { name: "Для дымоудаления и подпора", url: `/products/control-systems/${slug}` },
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
