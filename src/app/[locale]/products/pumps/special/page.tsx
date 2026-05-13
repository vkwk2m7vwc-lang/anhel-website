import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
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
import { getSpecialContent } from "@/content/products/special";
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
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const content = getSpecialContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      type: "website",
      title: `${content.metaTitle} · ANHEL®`,
      description: content.metaDescription,
      url: `/products/pumps/special`,
      images: [{ url: content.hero.image.src, alt: content.hero.image.alt }],
    },
  };
}

export default function SpecialProductPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const content = getSpecialContent(locale);
  const tProj = useTranslations("products.related_projects");
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
  } = content;

  const productJsonLd = productLd({
    slug,
    name: content.metaTitle,
    description: content.metaDescription,
    image: content.hero.image.src,
    category: "Pump / Special execution",
  });
  const breadcrumbJsonLd = breadcrumbLd(
    content.hero.breadcrumbs.map((b, i, arr) => ({
      name: b.label,
      url: b.href ?? (i === arr.length - 1 ? `/products/pumps/${slug}` : "/products"),
    })),
  );

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
      <RelatedProjectsSection productSlug={slug} tag={tProj("projects_tag")} />
      <DocumentsGrid content={documents} />
      <ProductCtaFooter content={footerCta} currentSlug={slug} />
    </ProductPageShell>
  );
}
