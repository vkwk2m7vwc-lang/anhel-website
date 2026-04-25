import type { Metadata } from "next";
import { ProductHero } from "@/components/product-page/ProductHero";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { TechSpecsGrid } from "@/components/product-page/TechSpecsGrid";
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
 * /products/pumps/heating-unit
 *
 * БИТП — модульное тепловое оборудование. Отличие от насосных
 * станций: секция 3 переопределена как «Линейка модулей» (6 модулей
 * в каталожном виде), а не «Применение» по объектам. Это оправдано
 * природой ИТП как конструктора: «где ставится» — подразумевается
 * (везде, где нужен тепловой ввод); важнее показать, какие
 * конфигурации есть.
 *
 * Section map (10 секций):
 *   01 Hero
 *   02 ТТХ                     (аггрегированные диапазоны линейки)
 *   03 Линейка модулей         (6 модульных исполнений)
 *   04 Бренды                  (теплообменники, регуляторы, насосы)
 *   05 Преимущества (9)
 *   06 Галерея (skeletons)
 *   07 Кейсы (placeholders)
 *   08 Опросный лист (квиз)
 *   09 Документация (4 PDF skeleton)
 *   10 Финальный CTA + соседние
 *
 * Контент работает через стандартный `ApplicationsGrid` компонент —
 * поле `applications` в `ProductContent` используется здесь как
 * «линейка модулей». Без изменения типа: значения items остаются
 * (id/mono/title/example) — просто семантически они теперь модули,
 * а не типы объектов.
 */
export const metadata: Metadata = {
  title: heatingUnitContent.metaTitle,
  description: heatingUnitContent.metaDescription,
  openGraph: {
    type: "website",
    title: `${heatingUnitContent.metaTitle} · ANHEL`,
    description: heatingUnitContent.metaDescription,
    url: `/products/pumps/heating-unit`,
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
    techSpecs,
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
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Инженерное оборудование", url: "/products" },
    { name: "Тепловые пункты", url: `/products/pumps/${slug}` },
  ]);

  return (
    <ProductPageShell accent={accent}>
      <script {...ldScriptProps(productJsonLd)} />
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      <ProductHero content={hero} accent={accent} />
      <TechSpecsGrid specs={techSpecs} />
      {/* Линейка модулей — 8 кликабельных карточек, каждая ведёт на
          /products/pumps/heating-unit/<slug>. Заменила старую секцию
          ApplicationsGrid с 6 пунктами «где ставится» — для ИТП
          важнее каталог конфигураций, чем типы объектов. */}
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
