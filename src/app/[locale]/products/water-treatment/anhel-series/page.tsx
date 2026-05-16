import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProductHero } from "@/components/product-page/ProductHero";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { TechSpecsGrid } from "@/components/product-page/TechSpecsGrid";
import { ApplicationsGrid } from "@/components/product-page/ApplicationsGrid";
import { AdvantagesGrid } from "@/components/product-page/AdvantagesGrid";
import { DescriptionSection } from "@/components/product-page/DescriptionSection";
import { DocumentsGrid } from "@/components/product-page/DocumentsGrid";
import { ProductCtaFooter } from "@/components/product-page/ProductCtaFooter";
import { VpuModificationsTable } from "@/components/products/water-treatment/VpuModificationsTable";
import { PrincipleSteps } from "@/components/products/water-treatment/PrincipleSteps";
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
 * Section map — порядок совпадает с каноничным шаблоном продуктовой
 * страницы (firefighting / water-treatment/installations):
 *   01 Hero (с подписью «пример исполнения 2-линейной модификации»)
 *   02 ТТХ                          ✓ TechSpecsGrid
 *   03 Назначение и применение     ✓ DescriptionSection
 *   04 Применение                   ✓ ApplicationsGrid
 *   05 Модельный ряд серии          ✓ VpuModificationsTable (NEW)
 *   06 Принцип работы               ✓ PrincipleSteps (NEW, 4-col grid)
 *   07 Состав установки             ✓ CompositionList (NEW)
 *   08 Режимы и автоматика          ✓ AutomationSection (NEW)
 *   09 Преимущества (6)             ✓ AdvantagesGrid
 *   10 Документация                 ✓ DocumentsGrid
 *   11 CTA + соседние разделы       ✓ ProductCtaFooter (+ secondaryCta)
 *
 * Канонический шаблон содержит также BrandsStrip / GalleryRail /
 * RelatedProjectsSection — на странице серии они опущены сознательно
 * (бренды-сторонние не упоминаются, галереи серии пока нет, кейсы
 * показываются с родительского /water-treatment/installations).
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
    applications,
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
      <TechSpecsGrid specs={techSpecs} />
      {description ? <DescriptionSection content={description} /> : null}
      <ApplicationsGrid content={applications} />
      <VpuModificationsTable content={modifications} />
      <PrincipleSteps content={principle} />
      <CompositionList content={composition} />
      <AutomationSection content={automation} />
      <AdvantagesGrid content={advantages} />
      <DocumentsGrid content={documents} />
      <ProductCtaFooter content={footerCta} currentSlug={slug} />
    </ProductPageShell>
  );
}
