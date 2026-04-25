import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { Breadcrumbs } from "@/components/product-page/Breadcrumbs";
import { TechSpecsGrid } from "@/components/product-page/TechSpecsGrid";
import { QuizSection } from "@/components/product-page/quiz/QuizSection";
import { ProductCtaFooter } from "@/components/product-page/ProductCtaFooter";
import { heatingUnitContent } from "@/content/products/heating-unit";
import {
  heatingModules,
  heatingModuleBySlug,
} from "@/content/products/heating-unit-modules/data";
import type { HeatingModuleSlug } from "@/content/products/heating-unit-modules/types";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

/**
 * Dynamic route for individual heating-unit module —
 * /products/pumps/heating-unit/[slug].
 *
 * 8 модулей линейки ANHEL® BITP-NU. Каждая подстраница содержит:
 *   - Hero с картинкой модуля + tagline + CTA
 *   - ТТХ модуля (4–8 строк, специфичные для модуля)
 *   - Полное описание (1–3 абзаца)
 *   - Состав установки (опционально)
 *   - Назначение / применение (4–5 пунктов)
 *   - Опросный лист (общий с родительской страницей)
 *   - Возврат в каталог + соседние модули
 *
 * Бренды, документы, преимущества, кейсы — на родительской
 * /products/pumps/heating-unit/, чтобы не дублировать контент.
 */

type RouteParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return heatingModules.map((m) => ({ slug: m.slug }));
}

function getModule(slug: string) {
  if (!isValidSlug(slug)) return null;
  return heatingModuleBySlug[slug];
}

function isValidSlug(slug: string): slug is HeatingModuleSlug {
  return Object.prototype.hasOwnProperty.call(heatingModuleBySlug, slug);
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) return { title: "Модуль не найден · ANHEL®" };
  return {
    title: `${m.title} · ANHEL® BITP-NU`,
    description: m.tagline,
    openGraph: {
      type: "website",
      title: `${m.title} · ANHEL® BITP-NU`,
      description: m.tagline,
      url: `/products/pumps/heating-unit/${m.slug}`,
      images: [{ url: m.image.src, alt: m.image.alt }],
    },
  };
}

export default async function HeatingModulePage({ params }: RouteParams) {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) notFound();

  const accent = heatingUnitContent.accent;

  const productJsonLd = productLd({
    slug: `heating-unit-${m.slug}`,
    name: `${m.title} · ANHEL® BITP-NU`,
    description: m.tagline,
    image: m.image.src,
    category: "HVAC / Heat exchanger module",
    model: "BITP-NU",
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Тепловые пункты", url: "/products/pumps/heating-unit" },
    { name: m.shortTitle, url: `/products/pumps/heating-unit/${m.slug}` },
  ]);

  // Соседи — два следующих модуля по списку (зацикленно)
  const idx = heatingModules.findIndex((x) => x.slug === m.slug);
  const neighbours = [1, 2].map(
    (offset) => heatingModules[(idx + offset) % heatingModules.length],
  );

  return (
    <ProductPageShell accent={accent}>
      <script {...ldScriptProps(productJsonLd)} />
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      {/* Hero модуля — компактная shell, не reuse ProductHero потому что
          там много hero-specific логики (tilt, magnetic CTA, mobile-product
          в верхней половине). Здесь нужен сжатый header. */}
      <section
        className="relative overflow-hidden bg-[var(--color-primary)]"
        style={{
          ["--accent-current" as string]:
            accent === "heat" ? "var(--accent-heat)" : "var(--accent-fire)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-hairline bg-grid opacity-30"
        />
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 pb-16 pt-28 md:flex-row md:items-center md:gap-16 md:px-12 md:pb-20 md:pt-32">
          <div className="flex-1">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Каталог", href: "/products" },
                {
                  label: "Тепловые пункты",
                  href: "/products/pumps/heating-unit",
                },
                { label: m.shortTitle },
              ]}
            />
            <p className="mono-tag mt-6">
              {m.mono} · МОДУЛЬ ANHEL® BITP-NU
              {m.draft ? " · DRAFT" : ""}
            </p>
            <h1 className="mt-6 max-w-[640px] font-display text-section font-medium text-[var(--color-secondary)] md:mt-8">
              {m.title}
            </h1>
            <p className="mt-6 max-w-[540px] text-body text-[var(--color-secondary)]/75 md:mt-8">
              {m.tagline}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5">
              <Link
                href="#quiz"
                data-cursor="hover"
                className="inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)]"
              >
                Быстрый запрос
                <span aria-hidden="true" className="font-mono">
                  →
                </span>
              </Link>
              <Link
                href="/products/pumps/heating-unit"
                data-cursor="hover"
                className="inline-flex items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-[22px] py-[14px] text-sm font-medium text-[var(--color-secondary)]/80 transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
              >
                ← К каталогу модулей
              </Link>
            </div>
          </div>

          {/* Module image */}
          <div className="relative mx-auto flex h-[min(45vw,260px)] w-[min(45vw,260px)] items-center justify-center md:mx-0 md:h-[320px] md:w-[320px]">
            <Image
              src={m.image.src}
              alt={m.image.alt}
              fill
              sizes="320px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <TechSpecsGrid specs={m.techSpecs} />

      {/* Описание */}
      <section
        className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
        aria-labelledby="module-description"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <p className="mono-tag">03 · ОПИСАНИЕ</p>
          <h2
            id="module-description"
            className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
          >
            Назначение и принцип работы
          </h2>
          <p className="mt-8 max-w-[760px] text-base leading-relaxed text-[var(--color-secondary)]/80">
            {m.description}
          </p>
        </div>
      </section>

      {/* Состав установки — опционально */}
      {m.composition?.length ? (
        <section
          className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
          aria-labelledby="module-composition"
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
            <p className="mono-tag">04 · СОСТАВ УСТАНОВКИ</p>
            <h2
              id="module-composition"
              className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              Что входит в модуль
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:grid-cols-2 lg:grid-cols-3">
              {m.composition.map((item, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3 bg-[var(--color-primary)] p-4 sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-[var(--color-secondary)]/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Применение */}
      <section
        className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
        aria-labelledby="module-applications"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <p className="mono-tag">
            {m.composition?.length ? "05" : "04"} · ПРИМЕНЕНИЕ
          </p>
          <h2
            id="module-applications"
            className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
          >
            Где используется модуль
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

      <QuizSection content={heatingUnitContent.quiz} />

      {/* Соседние модули — навигация без возврата на каталог */}
      <section
        className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
        aria-labelledby="module-neighbours"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <p className="mono-tag">{m.composition?.length ? "07" : "06"} · СМЕЖНЫЕ МОДУЛИ</p>
          <h2
            id="module-neighbours"
            className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
          >
            Другие модули линейки
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:grid-cols-2">
            {neighbours.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/products/pumps/heating-unit/${n.slug}`}
                  data-cursor="hover"
                  className="group flex h-full flex-col justify-between bg-[var(--color-primary)] p-6 transition-colors duration-300 [@media(hover:hover)]:hover:bg-[#111] sm:p-8"
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
                      Подробно
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

      <ProductCtaFooter
        content={heatingUnitContent.footerCta}
        currentSlug={"heating-unit"}
      />
    </ProductPageShell>
  );
}
