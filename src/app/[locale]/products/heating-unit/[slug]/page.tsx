import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/navigation";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { Breadcrumbs } from "@/components/product-page/Breadcrumbs";
import { TechSpecsGrid } from "@/components/product-page/TechSpecsGrid";
import { AdvantagesGrid } from "@/components/product-page/AdvantagesGrid";
import { GalleryRail } from "@/components/product-page/GalleryRail";
import { RelatedProjectsSection } from "@/components/product-page/RelatedProjectsSection";
import { DocumentsGrid } from "@/components/product-page/DocumentsGrid";
import { ProductCtaFooter } from "@/components/product-page/ProductCtaFooter";
import { getHeatingUnitContent } from "@/content/products/heating-unit";
import {
  getHeatingModules,
  getHeatingModuleBySlug,
} from "@/content/products/heating-unit-modules/data";
import type { HeatingModuleSlug } from "@/content/products/heating-unit-modules/types";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * Dynamic route for individual heating-unit module —
 * /products/heating-unit/[slug].
 *
 * Section map (приведено к структуре насосных страниц минус Бренды,
 * плюс «Другие модули» в конце перед CTA — UX-фидбек 28 апр 2026):
 *   01 Hero (картинка модуля + tagline + CTA, custom — не reuse
 *       ProductHero, потому что breadcrumbs и кнопка «← К каталогу
 *       модулей» специфичны для модульной страницы)
 *   02 Тех. характеристики    TechSpecsGrid
 *   03 Описание               (custom inline section)
 *   04 Применение             (custom inline section)
 *   05 Преимущества           AdvantagesGrid (контент общий с
 *                              родительской /products/heating-unit)
 *   06 Галерея «С производства» GalleryRail (контент общий)
 *   07 Объекты-референс       RelatedProjectsSection (общий пул проектов)
 *   08 Документация           DocumentsGrid (контент общий)
 *   09 Другие модули          (соседи по линейке — навигация без
 *                              возврата на каталог)
 *   10 Финальный CTA          ProductCtaFooter (3 категории-разделы)
 *
 * AdvantagesGrid / GalleryRail / DocumentsGrid читают `tag` из контента,
 * поэтому они получают override-объекты с правильной нумерацией секций
 * (на родителе advantages.tag = "03 · ...", на модульной странице нужно
 * "05 · ...").
 *
 * Бренды не показываем — UX-фидбек user'а: на ИТП мы не указываем
 * комплектующих по бренду, в отличие от насосных серий.
 */

type RouteParams = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return getHeatingModules("ru").map((m) => ({ slug: m.slug }));
}

function getModule(slug: string, locale: string) {
  const lookup = getHeatingModuleBySlug(locale);
  if (!Object.prototype.hasOwnProperty.call(lookup, slug)) return null;
  return lookup[slug as HeatingModuleSlug];
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const m = getModule(slug, locale);
  const tMeta = await getTranslations({ locale, namespace: "common.ui.module" });
  if (!m) return { title: tMeta("not_found") };
  return {
    title: `${m.title} · ANHEL`,
    description: m.tagline,
    openGraph: {
      type: "website",
      title: `${m.title} · ANHEL`,
      description: m.tagline,
      url: `/products/heating-unit/${m.slug}`,
      images: [{ url: m.image.src, alt: m.image.alt }],
    },
  };
}

export default async function HeatingModulePage({ params }: RouteParams) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tUi = await getTranslations({ locale, namespace: "common.ui.module" });
  const tCrumb = await getTranslations({ locale, namespace: "common.ui.module.breadcrumbs" });
  const tDet = await getTranslations({ locale, namespace: "common.ui" });
  const m = getModule(slug, locale);
  if (!m) notFound();

  const heatingUnitContent = getHeatingUnitContent(locale);
  const heatingModules = getHeatingModules(locale);
  const accent = heatingUnitContent.accent;

  const productJsonLd = productLd({
    slug: `heating-unit-${m.slug}`,
    name: `${m.title} · ANHEL`,
    description: m.tagline,
    image: m.image.src,
    category: "HVAC / Heat exchanger module",
    model: "BITP-NU",
    routePath: `/products/heating-unit/${m.slug}`,
  });
  // Parent breadcrumbs come from the localized heating-unit content;
  // we add the current module shortTitle as the leaf.
  const parentCrumbs = heatingUnitContent.hero.breadcrumbs;
  const breadcrumbJsonLd = breadcrumbLd([
    ...parentCrumbs.map((b, i, arr) => ({
      name: b.label,
      url: b.href ?? (i === arr.length - 1 ? "/products/heating-unit" : "/products"),
    })),
    { name: m.shortTitle, url: `/products/heating-unit/${m.slug}` },
  ]);

  // Соседи — два следующих модуля по списку (зацикленно)
  const idx = heatingModules.findIndex((x) => x.slug === m.slug);
  const neighbours = [1, 2].map(
    (offset) => heatingModules[(idx + offset) % heatingModules.length],
  );

  // Override mono-tag для общих секций — на родителе свои номера, у нас
  // в этой структуре они идут под 05/06/08.
  const advantagesContent = {
    ...heatingUnitContent.advantages,
    tag: tUi("advantages_tag"),
  };
  const galleryContent = {
    ...heatingUnitContent.gallery,
    tag: tUi("gallery_tag"),
  };
  const documentsContent = {
    ...heatingUnitContent.documents,
    tag: tUi("documents_tag"),
  };

  return (
    <ProductPageShell accent={accent}>
      <script {...ldScriptProps(productJsonLd)} />
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      {/* 01 Hero модуля — единая 12-col grid схема под одинаковые
          пропорции с ProductHero (текст col-6 / изображение col-6,
          mobile aspect-[4/3] под текстом). Кастомный hero оставлен
          (не reuse ProductHero), потому что мы рендерим module-specific
          breadcrumbs + кнопку «{tUi("back_to_catalog")}». Подсветка/тень
          сделаны статически: server-component, без motion. */}
      <section
        id="product-hero"
        className="relative overflow-hidden bg-[var(--color-primary)]"
        style={{
          ["--accent-current" as string]:
            accent === "heat" ? "var(--accent-heat)" : "var(--accent-fire)",
        }}
      >
        {/* Accent radial backlight — то же что в ProductHero (alpha 0.18,
            72% 50%). Без него детальные ИТП-модули рендерились на чистом
            чёрном без orange-подсветки за продуктом. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle at 72% 50%, ${
              accent === "heat" ? "rgba(232,135,59,0.18)" : "rgba(215,38,56,0.18)"
            } 0%, rgba(10,10,10,0) 55%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-grid-hairline bg-grid opacity-30"
        />
        <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 pb-10 pt-24 md:px-12 md:pb-14 md:pt-28">
          <Breadcrumbs
            items={[
              { label: tCrumb("home"), href: "/" },
              { label: tCrumb("catalog"), href: "/products" },
              {
                label: tCrumb("heating_unit"),
                href: "/products/heating-unit",
              },
              { label: m.shortTitle },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-12 md:gap-10 lg:gap-14">
            {/* TEXT — col-6 на md+ */}
            <div className="md:col-span-6">
              <p className="mono-tag">
                {tUi("module_label", { mono: m.mono })}
                {m.draft ? " · DRAFT" : ""}
              </p>
              {/* text-4xl на mobile (36px) — модули типа
                  «РАСПРЕДЕЛИТЕЛЬНЫЙ МОДУЛЬ» в text-5xl шли в 4 строки.
                  Совпадает с фиксом в product-page/ProductHero.tsx —
                  держим парность. */}
              <h1 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-[var(--color-secondary)] md:mt-8 md:text-5xl lg:text-7xl">
                {m.title}
              </h1>
              <p className="mt-6 max-w-[540px] text-body text-[var(--color-secondary)]/75 md:mt-8">
                {m.tagline}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5">
                <Link
                  href="#documents"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)]"
                >{tUi("quick_request")}<span aria-hidden="true" className="font-mono">
                    →
                  </span>
                </Link>
                <Link
                  href="/products/heating-unit"
                  data-cursor="hover"
                  className="inline-flex items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-[22px] py-[14px] text-sm font-medium text-[var(--color-secondary)]/80 transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
                >
                  {tUi("back_to_catalog")}
                </Link>
              </div>
            </div>

            {/* IMAGE — col-6 на md+, aspect-4/3 на mobile под текстом.
                Drop-shadow тоном accent — как в ProductHero, придаёт
                продукту объём и pedestal-feel. */}
            <div className="md:col-span-6">
              <div
                className="relative aspect-[4/3] w-full md:aspect-auto md:h-[520px]"
                style={{
                  filter: `drop-shadow(0 30px 40px ${
                    accent === "heat" ? "rgba(232,135,59,0.45)" : "rgba(215,38,56,0.45)"
                  })`,
                }}
              >
                <Image
                  src={m.image.src}
                  alt={m.image.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 ТТХ — TechSpecsGrid внутри уже фильтрует пустые */}
      <TechSpecsGrid specs={m.techSpecs} />

      {/* 03 Описание */}
      <section
        className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
        aria-labelledby="module-description"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <p className="mono-tag">{tUi("description_tag")}</p>
          <h2
            id="module-description"
            className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
          >
            {tUi("description_title")}
          </h2>
          <p className="mt-8 max-w-[760px] text-base leading-relaxed text-[var(--color-secondary)]/80">
            {m.description}
          </p>
        </div>
      </section>

      {/* 04 Применение */}
      <section
        className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
        aria-labelledby="module-applications"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <p className="mono-tag">{tUi("applications_tag")}</p>
          <h2
            id="module-applications"
            className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
          >
            {tUi("applications_title")}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:grid-cols-2">
            {m.applications.map((a, i) => (
              <li
                key={i}
                className="flex items-baseline gap-3 bg-[var(--color-primary)] p-4 sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-current)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-[var(--color-secondary)]/85">
                  {a}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 Преимущества — общие с родительской /products/heating-unit */}
      <AdvantagesGrid content={advantagesContent} />

      {/* 06 Галерея «С производства» — общая с родительской страницей */}
      <GalleryRail content={galleryContent} />

      {/* 07 Объекты-референс — auto-фильтр по slug "heating-unit",
          секция прячется если связанных проектов нет */}
      <RelatedProjectsSection productSlug="heating-unit" tag={tUi("references_tag")} />

      {/* 08 Документация — общие документы по линейке ИТП */}
      <DocumentsGrid content={documentsContent} />

      {/* 09 Другие модули — навигация по линейке без возврата на каталог */}
      <section
        className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
        aria-labelledby="module-neighbours"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <p className="mono-tag">{tUi("neighbours_tag")}</p>
          <h2
            id="module-neighbours"
            className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
          >
            {tUi("neighbours_title")}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:grid-cols-2">
            {neighbours.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/products/heating-unit/${n.slug}`}
                  data-cursor="hover"
                  className="group flex h-full flex-col justify-between bg-[var(--color-primary)] p-6 transition-colors duration-300 [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)] sm:p-8"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65 [@media(hover:hover)]:group-hover:text-[var(--accent-current)]">
                    {n.mono}
                  </p>
                  <div className="mt-6 flex flex-col gap-2">
                    <h3 className="font-display text-[18px] font-medium leading-tight text-[var(--color-secondary)] md:text-[22px]">
                      {n.shortTitle}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--color-secondary)]/70">
                      {n.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55 [@media(hover:hover)]:group-hover:text-[var(--accent-current)]">
                      {tDet("details_more")}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 ease-out-expo [@media(hover:hover)]:group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10 Финальный CTA + neighbours strip (3 раздела, не плоский список) */}
      <ProductCtaFooter
        content={heatingUnitContent.footerCta}
        currentSlug={"heating-unit"}
      />
    </ProductPageShell>
  );
}
