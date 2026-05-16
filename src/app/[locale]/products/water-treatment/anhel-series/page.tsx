import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProductHero } from "@/components/product-page/ProductHero";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { TechSpecsGrid } from "@/components/product-page/TechSpecsGrid";
import { AdvantagesGrid } from "@/components/product-page/AdvantagesGrid";
import { DescriptionSection } from "@/components/product-page/DescriptionSection";
import { DocumentsGrid } from "@/components/product-page/DocumentsGrid";
import { ProductCtaFooter } from "@/components/product-page/ProductCtaFooter";
import { VpuModificationsTable } from "@/components/products/water-treatment/VpuModificationsTable";
import { CompositionList } from "@/components/products/water-treatment/CompositionList";
import { AutomationSection } from "@/components/products/water-treatment/AutomationSection";
import { getVpuAnhelSeriesContent } from "@/content/products/water-treatment-anhel-series";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/water-treatment/anhel-series — VPU Anhel Series.
 *
 * Серия установок водоподготовки с 4 модификациями по числу линий
 * фильтрации. Главный визуальный акцент — таблица модификаций
 * (VpuModificationsTable). Документация переиспользуется с действующего
 * продукта водоподготовки (общий /docs/water-treatment/).
 *
 * Section map:
 *   01 Hero (с подписью «пример исполнения 2-линейной модификации»)
 *   02 Назначение и применение     ✓ DescriptionSection
 *   03 Модельный ряд серии          ✓ VpuModificationsTable (NEW)
 *   04 Принцип работы               ✓ AdvantagesGrid (4 ступени)
 *   05 Состав установки             ✓ CompositionList (NEW)
 *   06 Технические характеристики    ✓ TechSpecsGrid
 *   07 Режимы работы и автоматика   ✓ AutomationSection (NEW)
 *   08 Преимущества (6)             ✓ AdvantagesGrid
 *   09 Документация                 ✓ DocumentsGrid
 *   10 CTA + соседние разделы       ✓ ProductCtaFooter (+ secondaryCta)
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { content } = getVpuAnhelSeriesContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      type: "website",
      title: `${content.metaTitle} · ANHEL®`,
      description: content.metaDescription,
      url: `/products/water-treatment/anhel-series`,
      images: [
        {
          url: content.hero.image.src,
          alt: content.hero.image.alt,
        },
      ],
    },
  };
}

export default function VpuAnhelSeriesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const { content, modifications, principle, composition, automation } =
    getVpuAnhelSeriesContent(locale);
  const {
    slug,
    hero,
    techSpecs,
    description,
    accent,
    advantages,
    documents,
    footerCta,
  } = content;

  const productJsonLd = productLd({
    slug,
    name: content.metaTitle,
    description: content.metaDescription,
    image: content.hero.image.src,
    category: "Water treatment / Filtration / UV disinfection",
    model: "VPU-Anhel-Series",
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
      {description ? <DescriptionSection content={description} /> : null}
      <VpuModificationsTable content={modifications} />
      <AdvantagesGrid content={principle} />
      <CompositionList content={composition} />
      <TechSpecsGrid specs={techSpecs} />
      <AutomationSection content={automation} />
      <AdvantagesGrid content={advantages} />
      <DocumentsGrid content={documents} />
      <ProductCtaFooter content={footerCta} currentSlug={slug} />
    </ProductPageShell>
  );
}
