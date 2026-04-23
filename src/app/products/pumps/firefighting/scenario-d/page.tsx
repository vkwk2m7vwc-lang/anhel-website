import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScenarioDScene } from "@/components/products/firefighting/scenario-d/ScenarioDScene";

/**
 * /products/pumps/firefighting/scenario-d
 *
 * Sandbox route — X-ray / Relats blueprint variant. A wireframe
 * elevation of the entire building with the firefighting system
 * drawn "through" the walls. Three toggleable layers (architecture,
 * plumbing, equipment) and a sweeping scan line reveal the system
 * diagnostically.
 *
 * `noindex` so Google never catalogs sandbox URLs.
 */
export const metadata: Metadata = {
  title: "Sandbox · Scenario D · ANHEL",
  description:
    "Sandbox-вариант секции «Как работает насосная станция»: рентген-срез здания с трёхслойной системой водоснабжения пожаротушения.",
  robots: { index: false, follow: false },
};

export default function ScenarioDPage() {
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
            Sandbox · D — X-ray section
          </p>
        </div>
      </header>

      <ScenarioDScene />

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
