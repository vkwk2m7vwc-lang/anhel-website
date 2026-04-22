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

        {/* 1 × 8 → 2 × 4 → 4 × 2 */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 md:grid-cols-2 lg:grid-cols-4">
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
      className="group relative flex min-h-[180px] flex-col justify-between bg-[var(--color-primary)] p-6 transition-colors duration-300 hover:bg-[#111] md:min-h-[220px] md:p-8"
    >
      {/* Accent ring — appears on hover, sits just inside the cell. Uses
          the page-level accent CSS variable so each product gets its own
          colour without any prop drilling. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 group-hover:ring-[var(--accent-current)]"
        style={{
          boxShadow: "inset 0 0 0 0 transparent",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: "inset 0 0 40px 0 var(--accent-current)",
          // Mix accent at ~10% visibility — enough to read as a glow
          // inside the card, not an alarm. Tuned against #D72638; softer
          // accents (treatment steel) will look proportionally quieter.
          mixBlendMode: "soft-light",
        }}
      />

      {/* Label — mono caps, dim */}
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40">
        {spec.label}
      </p>

      {/* Value + unit — display type paired with a mono unit that sits
          on the baseline. Keeping them in one baseline-flex row so long
          values ("от 2 до 6", "релейное / частотное") wrap cleanly. */}
      <div className="mt-6 flex flex-wrap items-baseline gap-x-2">
        <span className="font-display text-[28px] font-medium leading-none text-[var(--color-secondary)] md:text-[32px]">
          {spec.value}
        </span>
        {spec.unit && (
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/50">
            {spec.unit}
          </span>
        )}
      </div>
    </motion.li>
  );
}
