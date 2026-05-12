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
import { electricActuatorsContent } from "@/content/products/control-systems/electric-actuators";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/control-systems/electric-actuators
 *
 * Шкаф управления для электрифицированной арматуры (запорной и
 * регулирующей). До 5 задвижек, электроприводы 0,37–7,5 кВт.
 */
export const metadata: Metadata = {
  title: electricActuatorsContent.metaTitle,
  description: electricActuatorsContent.metaDescription,
  openGraph: {
    type: "website",
    title: electricActuatorsContent.metaTitle,
    description: electricActuatorsContent.metaDescription,
    url: `/products/control-systems/${electricActuatorsContent.slug}`,
    images: [
      {
        url: electricActuatorsContent.hero.image.src,
        alt: electricActuatorsContent.hero.image.alt,
      },
    ],
  },
};

export default function ElectricActuatorsPage() {
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
  } = electricActuatorsContent;

  const productJsonLd = productLd({
    slug,
    name: "Шкаф управления ANHEL® для электрифицированной арматуры",
    description: electricActuatorsContent.metaDescription,
    image: electricActuatorsContent.hero.image.src,
    category: "Control cabinets / Electric actuators",
    model: "OMEGA-VALVE",
    routePath: `/products/control-systems/${slug}`,
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Шкафы управления", url: "/products/control-systems" },
    { name: "Для электрифицированной арматуры", url: `/products/control-systems/${slug}` },
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
