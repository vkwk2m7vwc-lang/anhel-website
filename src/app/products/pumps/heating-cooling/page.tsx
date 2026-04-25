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
import { heatingCoolingContent } from "@/content/products/heating-cooling";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/pumps/heating-cooling
 *
 * Насосные станции для систем отопления и кондиционирования.
 * Полная копия структуры water-supply (10 секций) с обновлённым
 * контентом — циркуляция теплоносителя/хладоносителя в системах
 * отопления, холодоснабжения и кондиционирования.
 *
 * Section map: см. water-supply/page.tsx — порядок секций идентичен.
 */
export const metadata: Metadata = {
  title: heatingCoolingContent.metaTitle,
  description: heatingCoolingContent.metaDescription,
  openGraph: {
    type: "website",
    title: `${heatingCoolingContent.metaTitle} · ANHEL®`,
    description: heatingCoolingContent.metaDescription,
    url: `/products/pumps/heating-cooling`,
    images: [
      {
        url: heatingCoolingContent.hero.image.src,
        alt: heatingCoolingContent.hero.image.alt,
      },
    ],
  },
};

export default function HeatingCoolingProductPage() {
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
  } = heatingCoolingContent;

  const productJsonLd = productLd({
    slug,
    name: "Насосные станции ANHEL для систем отопления и кондиционирования",
    description: heatingCoolingContent.metaDescription,
    image: heatingCoolingContent.hero.image.src,
    category: "Pump / Heating and cooling",
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Отопление и кондиционирование", url: `/products/pumps/${slug}` },
  ]);

  return (
    <ProductPageShell accent={accent}>
      <script {...ldScriptProps(productJsonLd)} />
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      <ProductHero content={hero} accent={accent} />
      <TechSpecsGrid specs={techSpecs} />
      <ApplicationsGrid content={applications} />
      <BrandsStrip content={brands} />
      <AdvantagesGrid content={advantages} />
      <GalleryRail content={gallery} />
      <CasesCarousel content={cases} />
      <QuizSection content={quiz} />
      <DocumentsGrid content={documents} />
      <ProductCtaFooter content={footerCta} currentSlug={slug} />
    </ProductPageShell>
  );
}
