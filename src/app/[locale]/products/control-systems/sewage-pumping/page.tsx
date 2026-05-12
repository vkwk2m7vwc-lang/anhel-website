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
import { sewagePumpingContent } from "@/content/products/control-systems/sewage-pumping";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/control-systems/sewage-pumping
 *
 * Шкаф управления для канализационных насосных станций (КНС),
 * дренажа, ливневой канализации и водоразборных ёмкостей. Сигналы
 * от поплавков, электродов, уровнемеров.
 */
export const metadata: Metadata = {
  title: sewagePumpingContent.metaTitle,
  description: sewagePumpingContent.metaDescription,
  openGraph: {
    type: "website",
    title: sewagePumpingContent.metaTitle,
    description: sewagePumpingContent.metaDescription,
    url: `/products/control-systems/${sewagePumpingContent.slug}`,
    images: [
      {
        url: sewagePumpingContent.hero.image.src,
        alt: sewagePumpingContent.hero.image.alt,
      },
    ],
  },
};

export default function SewagePumpingPage() {
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
  } = sewagePumpingContent;

  const productJsonLd = productLd({
    slug,
    name: "Шкаф управления ANHEL® для КНС",
    description: sewagePumpingContent.metaDescription,
    image: sewagePumpingContent.hero.image.src,
    category: "Control cabinets / Sewage pumping",
    model: "OMEGA-KNS",
    routePath: `/products/control-systems/${slug}`,
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Шкафы управления", url: "/products/control-systems" },
    { name: "Для КНС", url: `/products/control-systems/${slug}` },
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
