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
import { getWaterTreatmentContent } from "@/content/products/water-treatment";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/water-treatment/installations — индивидуальные установки
 * водоподготовки ANHEL (фильтрация, умягчение, обезжелезивание,
 * обратный осмос). До введения серии ВПУ Anhel страница жила
 * напрямую на `/products/water-treatment`; теперь это первый из двух
 * продуктов раздела, доступный по slug `installations`.
 *
 * Контент не менялся — только slug (с `water-treatment` → `installations`)
 * и добавлен четвёртый уровень breadcrumb. Все ТТХ, фото и документы
 * остались как были.
 *
 * Section map:
 *   01 Hero                04 Бренды              07 Кейсы (RelatedProjects)
 *   02 ТТХ                 05 Преимущества        08 Опросный лист
 *   03 Применение          06 Галерея             09 Документация
 *                                                 10 Финальный CTA
 *
 * i18n: вся content приходит из `getWaterTreatmentContent(locale)`,
 * tag для секции RelatedProjects — из products.related_projects.projects_tag.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const content = getWaterTreatmentContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      type: "website",
      title: `${content.metaTitle} · ANHEL®`,
      description: content.metaDescription,
      url: `/products/water-treatment/installations`,
      images: [
        {
          url: content.hero.image.src,
          alt: content.hero.image.alt,
        },
      ],
    },
  };
}

export default function WaterTreatmentProductPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const content = getWaterTreatmentContent(locale);
  const t = useTranslations("products.related_projects");
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
    category: "Water treatment / Filtration",
    model: "VPU-NU",
    routePath: `/products/water-treatment/${slug}`,
  });
  const breadcrumbJsonLd = breadcrumbLd(
    content.hero.breadcrumbs.map((b, i, arr) => ({
      name: b.label,
      url:
        b.href ??
        (i === arr.length - 1
          ? `/products/water-treatment/${slug}`
          : "/products"),
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
      <RelatedProjectsSection productSlug={slug} tag={t("projects_tag")} />
      <DocumentsGrid content={documents} />
      <ProductCtaFooter content={footerCta} currentSlug={slug} />
    </ProductPageShell>
  );
}
