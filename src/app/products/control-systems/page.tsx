import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";
import { CONTROL_SYSTEMS_PRODUCTS } from "@/lib/products";
import { breadcrumbLd, ldScriptProps } from "@/lib/schema-org";

/**
 * /products/control-systems — раздел-каталог шкафов управления.
 *
 * Точка входа в 5 серий шкафов управления:
 *   - С частотным регулированием (variable-frequency)
 *   - Для систем пожаротушения (fire-suppression)
 *   - Для дымоудаления и подпора (smoke-control)
 *   - Для КНС (sewage-pumping)
 *   - Для электрифицированной арматуры (electric-actuators)
 *
 * Структурно идентичен /products/pumps (5 насосных серий) и
 * /products/heating-unit (8 модулей ИТП) — та же page-shell +
 * ProductsShowcase. Reuse ради единого визуала карточек.
 *
 * Источник материалов — `tmp/source/control-systems/` (сырые
 * скрейпы с mfmc.ru, наш OEM-партнёр; в публикации — ANHEL®).
 */
export const metadata: Metadata = {
  title: "Шкафы управления",
  description:
    "Шкафы управления ANHEL® — пять серий для насосных станций, систем пожаротушения, дымоудаления, КНС и электрифицированной арматуры. Заводская сборка, сертификация ТР ТС и ФЗ-123.",
  openGraph: {
    type: "website",
    title: "Шкафы управления · ANHEL®",
    description:
      "Пять серий шкафов управления ANHEL® — заводская сборка, сертификация ТР ТС, гарантия и сервис.",
    url: "/products/control-systems",
  },
};

export default function ControlSystemsCategoryPage() {
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Каталог", url: "/products" },
    { name: "Шкафы управления", url: "/products/control-systems" },
  ]);

  return (
    <>
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      {/* Page header — те же пропорции, что и у /products/pumps */}
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
                  Шкафы управления
                </span>
              </li>
            </ol>
          </nav>

          <p className="mono-tag mt-8">02 · ШКАФЫ УПРАВЛЕНИЯ</p>
          <h1 className="mt-4 max-w-[860px] font-display text-section font-medium text-[var(--color-secondary)]">
            Пять серий шкафов управления под ваш объект
          </h1>
          <p className="mt-6 max-w-[640px] text-body text-[var(--color-secondary)]/70 md:mt-8">
            Частотное регулирование, пожаротушение, дымоудаление, КНС и
            электрифицированная арматура. Заводская сборка, сертификация
            ТР ТС и ФЗ-123 для пожарных шкафов, гарантия и пусконаладка
            под ключ.
          </p>
        </div>
      </section>

      <ProductsShowcase
        tone="page"
        monoTag="03 · СЕРИИ"
        title="Пять серий"
        lede="Кликните карточку, чтобы перейти к ТТХ, применению, преимуществам и опросному листу."
        products={CONTROL_SYSTEMS_PRODUCTS}
      />
    </>
  );
}
