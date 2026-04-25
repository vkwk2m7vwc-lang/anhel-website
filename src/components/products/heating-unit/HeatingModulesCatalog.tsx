"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HeatingModule } from "@/content/products/heating-unit-modules/types";

/**
 * Heating-unit modules catalog — section on /products/pumps/heating-unit.
 *
 * Renders 8 module cards in a responsive grid (2×4 desktop, 2×4 tablet,
 * 2×4 mobile compact). Each card is a clickable link to the module's
 * detail page at /products/pumps/heating-unit/<slug>/.
 *
 * Tone matches the rest of product page sections — same `gap-px
 * bg-hairline` cell-border treatment, same staggered enter animation,
 * same hover lift-to-accent pattern. Hover-states are gated to
 * `@media (hover: hover)` so iOS taps don't leave the last-tapped card
 * stuck in its hover state (same fix family as the other grids).
 *
 * Image fallback: the data layer currently uses one shared placeholder
 * (`/assets/products/bitp.png`) for all 8 modules — see
 * `_docs/heating_unit_modules_gaps.md` for the path forward.
 */
export function HeatingModulesCatalog({
  modules,
}: {
  modules: readonly HeatingModule[];
}) {
  return (
    <section
      id="modules"
      aria-labelledby="modules-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">02 · ЛИНЕЙКА МОДУЛЕЙ</p>
            <h2
              id="modules-title"
              className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              Восемь модулей под любую конфигурацию ИТП
            </h2>
          </div>
          <p className="max-w-[440px] text-sm text-[var(--color-secondary)]/65 md:text-right">
            Конструктор блочного теплового пункта: ввод и учёт тепла,
            отопление, ГВС в одно- и двухступенчатых исполнениях,
            пароконденсатные системы.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-px bg-[var(--color-hairline)] md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {modules.map((m, i) => (
            <ModuleCard key={m.slug} module={m} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ModuleCard({
  module: m,
  index,
}: {
  module: HeatingModule;
  index: number;
}) {
  const staggerDelay = Math.min(index, 7) * 0.05;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: staggerDelay,
      }}
    >
      <Link
        href={`/products/pumps/heating-unit/${m.slug}`}
        data-cursor="hover"
        className="group relative flex h-full min-h-[220px] flex-col justify-between bg-[var(--color-primary)] p-4 transition-colors duration-300 [@media(hover:hover)]:hover:bg-[#111] sm:min-h-[260px] sm:p-6 md:min-h-[300px] md:p-8"
      >
        {/* Accent ring — transparent by default, lights up on hover.
            Gated to (hover: hover) so iOS doesn't leave a tile stuck
            in its hover state after a tap. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 [@media(hover:hover)]:group-hover:ring-[var(--accent-current)]"
        />

        <div className="flex items-start justify-between gap-3">
          <p
            aria-hidden="true"
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65 transition-colors duration-300 [@media(hover:hover)]:group-hover:text-[var(--accent-current)]"
          >
            {m.mono}
          </p>
          {m.draft ? (
            <span
              className="rounded-pill border border-[var(--color-hairline)] px-2 py-[1px] font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/45"
              title="Контент модуля проходит content-review"
            >
              draft
            </span>
          ) : null}
        </div>

        {/* Module image — square aspect, centred. Все 8 модулей пока на
            одном placeholder (bitp.png) — см. _docs/heating_unit_modules_gaps.md */}
        <div className="relative mx-auto my-4 h-[110px] w-[110px] sm:h-[140px] sm:w-[140px]">
          <Image
            src={m.image.src}
            alt={m.image.alt}
            fill
            sizes="140px"
            className="object-contain opacity-90 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-[15px] font-medium leading-tight text-[var(--color-secondary)] sm:text-[18px] md:text-[20px]">
            {m.shortTitle}
          </h3>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/55 [@media(hover:hover)]:group-hover:text-[var(--accent-current)]">
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
    </motion.li>
  );
}
