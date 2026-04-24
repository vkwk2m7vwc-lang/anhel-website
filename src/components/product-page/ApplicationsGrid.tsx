"use client";

import { motion } from "framer-motion";
import type {
  ApplicationsContent,
  ApplicationItem,
} from "@/content/products/types";

/**
 * Applications grid — section 5 «Применение».
 *
 * Six cards laid out 3×2 desktop, 2×3 tablet, 1×6 mobile. Each card is
 * a monolithic block: large mono index, object-type headline, one-line
 * reference example. Hover lifts the card's border from hairline to
 * the page's accent colour (fire-red on firefighting, blue on water
 * supply, etc.) via the `--accent-current` CSS variable that ProductHero
 * writes to the page — no prop drilling.
 *
 * Design intent: this is the first "inventory" section after the
 * scroll-driven Lakhta narrative. The tone shifts from cinematic to
 * catalogue, so the grid is deliberately calm — hairline cells, no
 * inner glow, minimal hover drama. Just a colour change and a number
 * that picks up the same accent.
 *
 * Component-level accessibility:
 *   - The section uses `aria-labelledby` on its h2
 *   - Each card is a plain <li> (no interactivity yet; we'll swap in
 *     links when the /applications deep-page lands in Stage 3)
 *   - The mono prefix is flagged `aria-hidden` so the screen reader
 *     doesn't double-announce "zero one ... Жилые комплексы"
 *
 * Reuse: same component on all four product pages. Content comes from
 * `src/content/products/<slug>.ts#applications`.
 */
export function ApplicationsGrid({
  content,
}: {
  content: ApplicationsContent;
}) {
  return (
    <section
      id="applications"
      aria-labelledby="applications-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        {/* Header mirrors TechSpecsGrid so the vertical rhythm of the
            page stays predictable section-to-section. */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="applications-title"
              className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              {content.title}
            </h2>
          </div>
          {content.lede ? (
            <p className="max-w-[420px] text-sm text-[var(--color-secondary)]/60 md:text-right">
              {content.lede}
            </p>
          ) : null}
        </div>

        {/* 1 × 6 → 2 × 3 → 3 × 2. Same `gap-px bg-hairline` trick as
            TechSpecsGrid so the hairlines between cells are a single
            pixel thick with no double-border doubling at the edges. */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <ApplicationCard key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * One card in the grid.
 *
 * Layout: mono index top-left, title centred-ish below, example at the
 * bottom. On hover the accent colour (read from `--accent-current`)
 * fills the mono number and rings the card. Stagger mirrors the grid
 * reading order so the eye picks them up left-to-right, top-to-bottom.
 */
function ApplicationCard({
  item,
  index,
}: {
  item: ApplicationItem;
  index: number;
}) {
  // Cap delay so the last card (index 5) isn't sitting for 300 ms after
  // the first — feels laggy past ~0.2 s total.
  const staggerDelay = Math.min(index, 5) * 0.06;

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
      className="group relative flex min-h-[220px] flex-col justify-between bg-[var(--color-primary)] p-6 transition-colors duration-300 hover:bg-[#111] md:min-h-[260px] md:p-8"
    >
      {/* Accent ring — same pattern as TechSpecsGrid: transparent by
          default, lights up on hover. Uses `ring` rather than `border`
          so the 1 px line draws *inside* the cell and doesn't fight the
          ul's hairline grid. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 group-hover:ring-[var(--accent-current)]"
      />

      {/* Mono prefix — the number does most of the visual work. On
          hover it picks up the accent colour in sync with the ring. */}
      <p
        aria-hidden="true"
        className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40 transition-colors duration-300 group-hover:text-[var(--accent-current)]"
      >
        {item.mono}
      </p>

      {/* Title + example — kept close so the card reads as one unit
          rather than three stacked lines. The title gets the display
          face for typographic weight; the example drops back to mono
          so the card has a clear primary / secondary text hierarchy. */}
      <div className="mt-10 flex flex-col gap-3">
        <h3 className="font-display text-[24px] font-medium leading-tight text-[var(--color-secondary)] md:text-[28px]">
          {item.title}
        </h3>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/50">
          {item.example}
        </p>
      </div>
    </motion.li>
  );
}
