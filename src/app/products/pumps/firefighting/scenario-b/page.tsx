import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScenarioBScene } from "@/components/products/firefighting/scenario-b/ScenarioBScene";

/**
 * /products/pumps/firefighting/scenario-b
 *
 * Sandbox route — isometric engineering diagram variant. Opposite
 * register to Scenario-A: less cinematic, more spec-sheet. A functional
 * back-up if we decide the product page needs a "schematic + specs"
 * beat rather than a narrative one.
 *
 * `noindex` on metadata so Google never catalogs sandbox URLs.
 */
export const metadata: Metadata = {
  title: "Sandbox · Scenario B · ANHEL",
  description:
    "Sandbox-вариант секции «Как работает насосная станция»: изометрическая схема потоков с интерактивными спецификациями узлов.",
  robots: { index: false, follow: false },
};

export default function ScenarioBPage() {
  return (
    <>
      <header className="relative border-b border-[var(--color-hairline)] bg-[var(--color-primary)]">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 py-5 md:px-12">
          <Link
            href="/products/pumps/firefighting"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50 transition-colors hover:text-[var(--color-secondary)]"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5"
            />
            Пожаротушение
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/35">
            Sandbox · B — Isometric flow
          </p>
        </div>
      </header>

      <ScenarioBScene />

      <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-primary)]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-12 md:py-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40">
            Это эскиз одной из 4 визуальных концепций. Итоговый вариант
            интегрируется в основную страницу после выбора.
          </p>
          <Link
            href="/products/pumps/firefighting"
            data-cursor="hover"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/70 transition-colors hover:text-[var(--color-secondary)]"
          >
            Вернуться к странице продукта <span aria-hidden>→</span>
          </Link>
        </div>
      </footer>
    </>
  );
}
