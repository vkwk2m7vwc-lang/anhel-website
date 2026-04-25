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
 * 8 модулей линейки. Перенумерованная (после удаления секции
 * «Состав установки») структура подстраницы:
 *   01 Hero (картинка модуля + tagline + CTA)
 *   02 Параметры (ТТХ, 4–8 строк)
 *   03 Описание (1–3 абзаца)
 *   04 Применение (4–5 пунктов)
 *   05 Опросный лист (общий с родительской страницей)
 *   06 Смежные модули (соседи по линейке)
 *
 * Секция «Состав установки» (composition) удалена по UX-фидбеку
 * заказчика — на mfmc.ru-источнике она тоже отсутствовала, был
 * placeholder-список с дублированием smyslov.
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
    title: `${m.title} · ANHEL`,
    description: m.tagline,
    openGraph: {
      type: "website",
      title: `${m.title} · ANHEL`,
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
    name: `${m.title} · ANHEL`,
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

      {/* 01 Hero модуля — единая 12-col grid схема под одинаковые
          пропорции с ProductHero (текст col-6 / изображение col-6,
          mobile aspect-[4/3] под текстом). Кастомный hero оставлен
          (не reuse ProductHero), потому что мы рендерим module-specific
          breadcrumbs + кнопку «← К каталогу модулей». */}
      <section
        id="product-hero"
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
        <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 pb-10 pt-24 md:px-12 md:pb-14 md:pt-28">
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

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-12 md:gap-10 lg:gap-14">
            {/* TEXT — col-6 на md+ */}
            <div className="md:col-span-6">
              <p className="mono-tag">
                01 · {m.mono} МОДУЛЬ
                {m.draft ? " · DRAFT" : ""}
              </p>
              <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] text-[var(--color-secondary)] md:mt-8 lg:text-7xl">
                {m.title}
              </h1>
              <p className="mt-6 max-w-[540px] text-body text-[var(--color-secondary)]/75 md:mt-8">
                {m.tagline}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5">
                <Link
                  href="#quiz"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)]"
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

            {/* IMAGE — col-6 на md+, aspect-4/3 на mobile под текстом */}
            <div className="md:col-span-6">
              <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-[520px]">
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

      {/* 04 Применение */}
      <section
        className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
        aria-labelledby="module-applications"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <p className="mono-tag">04 · ПРИМЕНЕНИЕ</p>
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

      {/* 05 Опросный лист */}
      <QuizSection content={heatingUnitContent.quiz} />

      {/* 06 Соседние модули — навигация без возврата на каталог */}
      <section
        className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
        aria-labelledby="module-neighbours"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <p className="mono-tag">06 · СМЕЖНЫЕ МОДУЛИ</p>
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
