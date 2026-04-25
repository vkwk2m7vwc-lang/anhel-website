import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

/**
 * /products — каталог продуктовой линейки.
 *
 * Простая страница: hero-style header + ProductsShowcase с 4 карточками.
 * Используется как destination для:
 *   - "Смотреть каталог" CTA на главной hero
 *   - "Продукты" в Header NAV
 *   - Breadcrumb "Насосные станции" на продуктовых страницах
 *     (после того как catalog заработает)
 *
 * Не путать с продуктовыми страницами `/products/pumps/<slug>` —
 * те описывают конкретный продукт. Этот URL — обзорный каталог.
 */
export const metadata: Metadata = {
  title: "Каталог продукции",
  description:
    "Каталог инженерного оборудования ANHEL: насосные станции, установки водоподготовки, блочные индивидуальные тепловые пункты. Заводская сборка, серийное производство, индивидуальная конфигурация под ТЗ.",
  openGraph: {
    type: "website",
    title: "Каталог продукции · ANHEL®",
    description:
      "Три направления — насосные станции, водоподготовка, тепловые пункты. Заводская сборка, индивидуальная конфигурация под ТЗ.",
    url: "/products",
  },
};

export default function ProductsCatalogPage() {
  return (
    <>
      {/* Page header — компактный, без отдельного hero render'a:
          каталог это указатель, а не лендинг. Breadcrumb +
          mono-tag + h1 + лид-абзац. */}
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
                <span
                  aria-current="page"
                  className="text-[var(--color-secondary)]/80"
                >
                  Каталог
                </span>
              </li>
            </ol>
          </nav>

          <p className="mono-tag mt-8">01 · КАТАЛОГ ПРОДУКЦИИ</p>
          <h1 className="mt-4 max-w-[860px] font-display text-section font-medium text-[var(--color-secondary)]">
            Инженерное оборудование под ваш проект
          </h1>
          <p className="mt-6 max-w-[640px] text-body text-[var(--color-secondary)]/70 md:mt-8">
            Три направления — насосные станции (пять серий внутри),
            установки водоподготовки и блочные индивидуальные тепловые
            пункты. Заводская сборка, серийное производство и
            индивидуальная конфигурация под ТЗ объекта.
          </p>
        </div>
      </section>

      {/* Top-level каталог — 3 раздела (Насосные / Водоподготовка /
          ИТП). Внутри «Насосных» открывается подкаталог /products/pumps
          с 5 сериями. Tone="page" выключает border-top и снижает
          вертикальный padding (страница уже имеет header выше). */}
      <ProductsShowcase
        tone="page"
        monoTag="02 · НАПРАВЛЕНИЯ"
        title="Три направления"
        lede="Кликните карточку, чтобы перейти к разделу. У насосных станций — пять серий внутри; у тепловых пунктов — восемь модулей."
      />
    </>
  );
}
