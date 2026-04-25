import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";
import { PUMPS_PRODUCTS } from "@/lib/products";
import { breadcrumbLd, ldScriptProps } from "@/lib/schema-org";

/**
 * /products/pumps — раздел-каталог насосных станций.
 *
 * Точка входа в 5 серий насосных станций:
 *   - Водоснабжение (ХВС, ГВС, повышение давления)
 *   - Пожаротушение (АПТ, ВПВ)
 *   - Отопление и кондиционирование
 *   - Поддержание давления (АУПД)
 *   - Специальное исполнение (контейнер / стеклопластик)
 *
 * Структурно идентичен /products/heating-unit (8 модулей ИТП) —
 * та же page-shell + ProductsShowcase с подкатегориями вместо
 * top-level каталога. Reuse ProductsShowcase ради единого визуала
 * карточек (ring on hover, accent radial glow, product render).
 */
export const metadata: Metadata = {
  title: "Насосные станции",
  description:
    "Насосные станции ANHEL: водоснабжение, пожаротушение, отопление и кондиционирование, поддержание давления, специальное исполнение. Заводская сборка под параметры объекта.",
  openGraph: {
    type: "website",
    title: "Насосные станции · ANHEL®",
    description:
      "Пять серий насосных станций ANHEL — заводская сборка под параметры объекта.",
    url: "/products/pumps",
  },
};

export default function PumpsCategoryPage() {
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Насосные станции", url: "/products/pumps" },
  ]);

  return (
    <>
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      {/* Page header — те же пропорции, что и у /products каталога */}
      <section className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-28 md:px-12 md:pb-14 md:pt-32">
          <nav aria-label="Хлебные крошки" className="font-mono text-[11px]">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 uppercase tracking-[0.08em]">
              <li className="flex items-center gap-1.5">
                <Link
                  href="/"
                  data-cursor="hover"
                  className="text-[var(--color-secondary)]/55 transition-colors hover:text-[var(--color-secondary)]"
                >
                  Главная
                </Link>
                <ChevronRight
                  aria-hidden="true"
                  size={12}
                  strokeWidth={1.5}
                  className="text-[var(--color-secondary)]/25"
                />
              </li>
              <li className="flex items-center gap-1.5">
                <Link
                  href="/products"
                  data-cursor="hover"
                  className="text-[var(--color-secondary)]/55 transition-colors hover:text-[var(--color-secondary)]"
                >
                  Каталог
                </Link>
                <ChevronRight
                  aria-hidden="true"
                  size={12}
                  strokeWidth={1.5}
                  className="text-[var(--color-secondary)]/25"
                />
              </li>
              <li className="flex items-center gap-1.5">
                <span
                  aria-current="page"
                  className="text-[var(--color-secondary)]/80"
                >
                  Насосные станции
                </span>
              </li>
            </ol>
          </nav>

          <p className="mono-tag mt-8">02 · НАСОСНЫЕ СТАНЦИИ</p>
          <h1 className="mt-4 max-w-[860px] font-display text-section font-medium text-[var(--color-secondary)]">
            Пять серий насосных станций под ваш объект
          </h1>
          <p className="mt-6 max-w-[640px] text-body text-[var(--color-secondary)]/70 md:mt-8">
            Водоснабжение, пожаротушение, отопление и кондиционирование,
            поддержание давления, специальное исполнение. Каждая серия
            собирается под параметры конкретного объекта — насосы,
            автоматика и режимы управления подбираются по гидравлике
            и инженерному заданию.
          </p>
        </div>
      </section>

      <ProductsShowcase
        tone="page"
        monoTag="03 · СЕРИИ"
        title="Пять серий"
        lede="Кликните карточку, чтобы перейти к ТТХ, применению, преимуществам и опросному листу."
        products={PUMPS_PRODUCTS}
      />
    </>
  );
}
