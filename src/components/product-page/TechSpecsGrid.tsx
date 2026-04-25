"use client";

import { motion } from "framer-motion";
import type { TechSpecTile } from "@/content/products/types";

/**
 * Tech-specs grid.
 *
 * Eight tiles laid out 4×2 on desktop, 2×4 on tablet, 1×8 on mobile.
 * Every tile is its own flex block with a label (mono uppercase),
 * dominant value (display type), and optional unit suffix. On hover the
 * tile picks up a 1px accent ring plus a soft inner glow — nothing else.
 *
 * Design note — what we intentionally DON'T do:
 *   - No magnetic pull on the tiles. Tried 0.15 strength, confirmed the
 *     grid read as "escaping" itself — the drift of a single cell
 *     breaks the row's baseline. This is data, not a button set; the
 *     grid should sit still and let colour do the talking.
 *   - No `data-cursor="hover"` on the tiles. The custom cursor's hover
 *     state renders as a larger white circle that would land directly
 *     on top of the number the user came to read. Plain cursor only.
 *
 * Animation: whileInView stagger. Fires once on scroll entry; no
 * exit animation (nothing below this section would read a replay).
 *
 * The `accent` colour is read from the CSS custom property
 * `--accent-current` that ProductHero sets on the page section. The
 * grid itself stays colour-agnostic so the same component works for
 * every product.
 */
export function TechSpecsGrid({ specs }: { specs: readonly TechSpecTile[] }) {
  return (
    <section
      id="tech-specs"
      aria-labelledby="tech-specs-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        {/* Section header — mono tag above an h2. Mirrors the rhythm of
            the hero so the page doesn't reset its typographic anchor on
            every section. */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">02 · Технические характеристики</p>
            <h2
              id="tech-specs-title"
              className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              Параметры серии
            </h2>
          </div>
          <p className="max-w-[380px] text-sm text-[var(--color-secondary)]/60 md:text-right">
            Базовые характеристики. Итоговая конфигурация рассчитывается под ТЗ
            объекта.
          </p>
        </div>

        {/* 2 × 4 → 4 × 2. Mobile starts at 2 columns — прежний 1×8 stack
            заставлял пользователя листать 8 экранов, чтобы прочитать
            ТТХ. На lg+ возвращаемся к hairline-grid через `gap-px` +
            `bg-hairline`; на меньших экранах оставляем простой `gap-3`
            (12px): 170-180px на ячейку + небольшое воздушное разделение
            читается лучше, чем 1px хайрлайн между тесными плитками. */}
        {/* Mobile: 1-col compact rows со встроенной flex-row [label][value]
            раскладкой. Tablet (sm-md): 2 колонки card-блоки. Desktop (lg+):
            4 колонки в одну строку с hairline-grid через gap-px. */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 sm:grid-cols-2 sm:gap-3 sm:bg-transparent lg:grid-cols-4 lg:gap-px lg:bg-[var(--color-hairline)]">
          {specs.map((spec, i) => (
            <TechSpecCard key={spec.label} spec={spec} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Single spec tile.
 *
 * - Border effect: the ul's `gap-px bg-hairline` plus a solid tile
 *   background draws a 1px hairline grid between tiles without double
 *   borders on edges. On hover the tile's ring (ring-accent) lights up
 *   1px wide above the hairline.
 * - Stagger: each card picks up a delay based on `index`, capped at 7
 *   so we don't wait forever for the last one on a slow scroll.
 */
function TechSpecCard({ spec, index }: { spec: TechSpecTile; index: number }) {
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
      tabIndex={0}
      role="group"
      aria-label={spec.label}
      className={[
        "group relative flex bg-[var(--color-primary)] outline-none transition-colors duration-300",
        // Mobile compact row — label слева, value+unit справа.
        // Унифицированный rhythm: min-h-[64px], px-4 py-3 (как все гриды).
        "min-h-[64px] flex-row items-baseline justify-between gap-3 px-4 py-3",
        // Tablet (sm-md): block-card.
        "sm:min-h-[140px] sm:flex-col sm:items-stretch sm:justify-between sm:gap-0 sm:p-4",
        // Desktop:
        "md:min-h-[180px] md:p-6 lg:min-h-[220px] lg:p-8",
        "[@media(hover:hover)]:hover:bg-[#111]",
        "active:ring-1 active:ring-[var(--accent-current)]",
        "focus-visible:ring-1 focus-visible:ring-[var(--accent-current)]/70",
      ].join(" ")}
    >
      {/* Accent ring — appears on hover, sits just inside the cell. Uses
          the page-level accent CSS variable so each product gets its own
          colour without any prop drilling.
          Hover scoped to `@media (hover: hover)` so touch devices don't
          keep the last-tapped tile in a highlighted state — iOS/Android
          Safari and Chrome leave :hover active after a tap until another
          element is tapped, and that read as one tile bugged out while
          the others looked default. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 [@media(hover:hover)]:group-hover:ring-[var(--accent-current)]"
      />

      {/* Label — mono caps, dim. Lifts to accent-current on hover to
          match Applications/Advantages cards (crisp ring + coloured
          mono prefix). Previously we layered a `mixBlendMode: soft-light`
          inner glow on top, which diffused the ring into a fuzzy red
          tint and read as a different visual state than the other grids
          on the page. Dropped the glow, added a coordinated colour
          transition here instead — cell now reads as one family with
          the rest of the product page. */}
      <p className="min-w-0 flex-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65 transition-colors duration-300 [@media(hover:hover)]:group-hover:text-[var(--accent-current)] sm:flex-none">
        {spec.label}
      </p>

      {/* Value + unit — на mobile inline справа, на sm+ block ниже label
          с большим font-size. Long values ("от 2 до 6", "релейное /
          частотное") wrap cleanly thanks to flex-wrap baseline-row. */}
      <div className="flex flex-wrap items-baseline gap-x-2 sm:mt-4 md:mt-6">
        <span className="font-display text-[16px] font-medium leading-none text-[var(--color-secondary)] sm:text-[22px] md:text-[28px] lg:text-[32px]">
          {spec.value}
        </span>
        {spec.unit && (
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/65 sm:text-[11px]">
            {spec.unit}
          </span>
        )}
      </div>
    </motion.li>
  );
}
