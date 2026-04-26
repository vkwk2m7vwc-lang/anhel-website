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
import { variableFrequencyContent } from "@/content/products/control-systems/variable-frequency";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/control-systems/variable-frequency
 *
 * Шкаф управления ANHEL® с частотным регулированием. Структура
 * идентична water-treatment / pumps detail-страницам — 11-секционная
 * шкала с Description (новый блок 03 · ОПИСАНИЕ).
 */
export const metadata: Metadata = {
  title: variableFrequencyContent.metaTitle,
  description: variableFrequencyContent.metaDescription,
  openGraph: {
    type: "website",
    title: variableFrequencyContent.metaTitle,
    description: variableFrequencyContent.metaDescription,
    url: `/products/control-systems/${variableFrequencyContent.slug}`,
    images: [
      {
        url: variableFrequencyContent.hero.image.src,
        alt: variableFrequencyContent.hero.image.alt,
      },
    ],
  },
};

export default function VariableFrequencyPage() {
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
  } = variableFrequencyContent;

  const productJsonLd = productLd({
    slug,
    name: "Шкаф управления ANHEL® с частотным регулированием",
    description: variableFrequencyContent.metaDescription,
    image: variableFrequencyContent.hero.image.src,
    category: "Control cabinets / Variable frequency",
    model: "OMEGA-VF",
    routePath: `/products/control-systems/${slug}`,
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Шкафы управления", url: "/products/control-systems" },
    { name: "С частотным регулированием", url: `/products/control-systems/${slug}` },
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
