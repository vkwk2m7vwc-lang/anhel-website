import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProductHero } from "@/components/product-page/ProductHero";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { AdvantagesGrid } from "@/components/product-page/AdvantagesGrid";
import { GalleryRail } from "@/components/product-page/GalleryRail";
import { DocumentsGrid } from "@/components/product-page/DocumentsGrid";
import { ProductCtaFooter } from "@/components/product-page/ProductCtaFooter";
import { HeatingModulesCatalog } from "@/components/products/heating-unit/HeatingModulesCatalog";
import { getHeatingUnitContent } from "@/content/products/heating-unit";
import { getHeatingModules } from "@/content/products/heating-unit-modules/data";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/heating-unit
 *
 * БИТП — модульное тепловое оборудование. Section map:
 *   01 Hero
 *   02 Линейка модулей (8 модулей)
 *   03 Преимущества
 *   04 Галерея
 *   05 Документация
 *   06 Финальный CTA + соседние разделы
 *
 * i18n: content приходит из `getHeatingUnitContent(locale)` —
 * per-locale TS файлы под `src/content/products/locales/<lang>/heating-unit.ts`
 * с одинаковой ProductContent-схемой. Компоненты (ProductHero,
 * AdvantagesGrid и т.д.) сами рендерят то что им дали, локализация —
 * на уровне content-дeлегатора.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const content = getHeatingUnitContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      type: "website",
      title: `${content.metaTitle} · ANHEL`,
      description: content.metaDescription,
      url: `/products/heating-unit`,
      images: [
        {
          url: content.hero.image.src,
          alt: content.hero.image.alt,
        },
      ],
    },
  };
}

export default function HeatingUnitProductPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const content = getHeatingUnitContent(locale);
  const heatingModules = getHeatingModules(locale);
  const {
    slug,
    hero,
    accent,
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
    category: "HVAC / Heat exchanger unit",
    model: "BITP-NU",
    routePath: `/products/${slug}`,
  });
  const breadcrumbJsonLd = breadcrumbLd(
    content.hero.breadcrumbs.map((b, i, arr) => ({
      name: b.label,
      url:
        b.href ??
        (i === arr.length - 1 ? `/products/${slug}` : "/products"),
    })),
  );

  return (
    <ProductPageShell accent={accent}>
      <script {...ldScriptProps(productJsonLd)} />
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      <ProductHero content={hero} accent={accent} />
      <HeatingModulesCatalog modules={heatingModules} />
      <AdvantagesGrid content={advantages} />
      <GalleryRail content={gallery} />
      <DocumentsGrid content={documents} />
      <ProductCtaFooter content={footerCta} currentSlug={slug} />
    </ProductPageShell>
  );
}
