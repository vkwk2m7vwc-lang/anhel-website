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
import { getVariableFrequencyContent } from "@/content/products/control-systems/variable-frequency";
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
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const content = getVariableFrequencyContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      type: "website",
      title: `${content.metaTitle} · ANHEL®`,
      description: content.metaDescription,
      url: `/products/control-systems/variable-frequency`,
      images: [{ url: content.hero.image.src, alt: content.hero.image.alt }],
    },
  };
}

export default function VariableFrequencyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const content = getVariableFrequencyContent(locale);
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
    category: "Control cabinets / Variable frequency",
    model: "OMEGA-VF",
    routePath: `/products/control-systems/${slug}`,
  });
  const breadcrumbJsonLd = breadcrumbLd(
    content.hero.breadcrumbs.map((b, i, arr) => ({
      name: b.label,
      url: b.href ?? (i === arr.length - 1 ? `/products/control-systems/variable-frequency` : "/products"),
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
