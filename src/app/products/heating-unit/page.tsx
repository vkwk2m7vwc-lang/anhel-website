import type { Metadata } from "next";
import { ProductHero } from "@/components/product-page/ProductHero";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { BrandsStrip } from "@/components/product-page/BrandsStrip";
import { AdvantagesGrid } from "@/components/product-page/AdvantagesGrid";
import { GalleryRail } from "@/components/product-page/GalleryRail";
import { CasesCarousel } from "@/components/product-page/CasesCarousel";
import { QuizSection } from "@/components/product-page/quiz/QuizSection";
import { DocumentsGrid } from "@/components/product-page/DocumentsGrid";
import { ProductCtaFooter } from "@/components/product-page/ProductCtaFooter";
import { HeatingModulesCatalog } from "@/components/products/heating-unit/HeatingModulesCatalog";
import { heatingUnitContent } from "@/content/products/heating-unit";
import { heatingModules } from "@/content/products/heating-unit-modules/data";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * /products/heating-unit
 *
 * БИТП — модульное тепловое оборудование. Отличие от насосных
 * станций: секция 3 переопределена как «Линейка модулей» (6 модулей
 * в каталожном виде), а не «Применение» по объектам. Это оправдано
 * природой ИТП как конструктора: «где ставится» — подразумевается
 * (везде, где нужен тепловой ввод); важнее показать, какие
 * конфигурации есть.
 *
 * Section map (9 секций):
 *   01 Hero
 *   02 Линейка модулей         (8 модульных исполнений)
 *   03 Бренды                  (теплообменники, регуляторы, насосы)
 *   04 Преимущества (9)
 *   05 Галерея (skeletons)
 *   06 Кейсы (placeholders)
 *   07 Опросный лист (квиз)
 *   08 Документация (4 PDF skeleton)
 *   09 Финальный CTA + соседние
 *
 * ТТХ убраны с родительской страницы — каждый модуль ИТП имеет свои
 * параметры, поэтому аггрегированные диапазоны линейки на родителе
 * вводили в заблуждение. Технические характеристики показываются на
 * подстранице конкретного модуля (/products/heating-unit/[slug]).
 */
export const metadata: Metadata = {
  title: heatingUnitContent.metaTitle,
  description: heatingUnitContent.metaDescription,
  openGraph: {
    type: "website",
    title: `${heatingUnitContent.metaTitle} · ANHEL`,
    description: heatingUnitContent.metaDescription,
    url: `/products/heating-unit`,
    images: [
      {
        url: heatingUnitContent.hero.image.src,
        alt: heatingUnitContent.hero.image.alt,
      },
    ],
  },
};

export default function HeatingUnitProductPage() {
  const {
    slug,
    hero,
    accent,
    brands,
    advantages,
    gallery,
    cases,
    quiz,
    documents,
    footerCta,
  } = heatingUnitContent;

  const productJsonLd = productLd({
    slug,
    name: "Блочные индивидуальные тепловые пункты ANHEL",
    description: heatingUnitContent.metaDescription,
    image: heatingUnitContent.hero.image.src,
    category: "HVAC / Heat exchanger unit",
    model: "BITP-NU",
    routePath: `/products/${slug}`,
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Тепловые пункты", url: `/products/${slug}` },
  ]);

  return (
    <ProductPageShell accent={accent}>
      <script {...ldScriptProps(productJsonLd)} />
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      <ProductHero content={hero} accent={accent} />
      {/* 02 Линейка модулей — 8 кликабельных карточек, каждая ведёт на
          /products/heating-unit/<slug>. ТТХ убраны с родителя:
          у каждого модуля свои параметры, агрегированные диапазоны
          линейки путали юзера. Технические характеристики раскрываются
          только когда выбран конкретный модуль (на подстранице). */}
      <HeatingModulesCatalog modules={heatingModules} />
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
