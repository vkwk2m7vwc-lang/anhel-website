import type { Metadata } from "next";
import { ProductHero } from "@/components/product-page/ProductHero";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { BrandsStrip } from "@/components/product-page/BrandsStrip";
import { AdvantagesGrid } from "@/components/product-page/AdvantagesGrid";
import { GalleryRail } from "@/components/product-page/GalleryRail";
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
 * Section map:
 *   01 Hero
 *   02 Линейка модулей         (8 модульных исполнений)
 *   03 Бренды                  (теплообменники, регуляторы, насосы)
 *   04 Преимущества
 *   05 Галерея (если есть фото — иначе скрыта)
 *   06 Документация            (раньше 08 — quiz/cases убраны для
 *                                согласованности с 5 насосными + ВПУ)
 *   07 Финальный CTA + соседние
 *
 * QuizSection и CasesCarousel удалены: квиз дублировал доступ к
 * опросному листу из блока документации, а кейсы остались
 * placeholder'ами. На дочерних [slug]-страницах модулей quiz сохранён.
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
      {/* Documents — override tag «06 · ДОКУМЕНТАЦИЯ» (раньше «08»),
          чтобы нумерация на родительской странице ИТП не имела
          разрывов после удаления Quiz/Cases. Дочерние [slug]-страницы
          модулей используют свои tag-overrides — родителя не задевают. */}
      <DocumentsGrid
        content={{ ...documents, tag: "06 · ДОКУМЕНТАЦИЯ" }}
      />
      <ProductCtaFooter
        content={{ ...footerCta, tag: "07 · ЗАПРОС КП" }}
        currentSlug={slug}
      />
    </ProductPageShell>
  );
}
