import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScenarioCScene } from "@/components/products/firefighting/scenario-c/ScenarioCScene";

/**
 * /products/pumps/firefighting/scenario-c
 *
 * Sandbox route — cinematic silent-film variant. Five full-viewport
 * frames telling the ignition-to-response story. Opposite register
 * from A (schematic narrative) and B (engineering catalogue): here
 * the system is shown as a short film.
 *
 * `noindex` so Google never catalogs sandbox URLs.
 */
export const metadata: Metadata = {
  title: "Sandbox · Scenario C · ANHEL",
  description:
    "Sandbox-вариант секции «Как работает насосная станция»: кинематографичные сцены — пять кадров от тишины до струи воды.",
  robots: { index: false, follow: false },
};

export default function ScenarioCPage() {
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
            Sandbox · C — Cinematic
          </p>
        </div>
      </header>

      <ScenarioCScene />

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
