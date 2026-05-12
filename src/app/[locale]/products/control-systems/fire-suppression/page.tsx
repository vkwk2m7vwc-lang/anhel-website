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
import { fireSuppressionContent } from "@/content/products/control-systems/fire-suppression";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/control-systems/fire-suppression
 *
 * Шкаф управления для систем пожаротушения. Пожарный сертификат
 * ФЗ-123, до 4 насосов, АВР, приоритет подачи воды на нужды
 * пожаротушения.
 */
export const metadata: Metadata = {
  title: fireSuppressionContent.metaTitle,
  description: fireSuppressionContent.metaDescription,
  openGraph: {
    type: "website",
    title: fireSuppressionContent.metaTitle,
    description: fireSuppressionContent.metaDescription,
    url: `/products/control-systems/${fireSuppressionContent.slug}`,
    images: [
      {
        url: fireSuppressionContent.hero.image.src,
        alt: fireSuppressionContent.hero.image.alt,
      },
    ],
  },
};

export default function FireSuppressionPage() {
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
  } = fireSuppressionContent;

  const productJsonLd = productLd({
    slug,
    name: "Шкаф управления ANHEL® для систем пожаротушения",
    description: fireSuppressionContent.metaDescription,
    image: fireSuppressionContent.hero.image.src,
    category: "Control cabinets / Fire suppression",
    model: "OMEGA-FIRE",
    routePath: `/products/control-systems/${slug}`,
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Шкафы управления", url: "/products/control-systems" },
    { name: "Для систем пожаротушения", url: `/products/control-systems/${slug}` },
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
