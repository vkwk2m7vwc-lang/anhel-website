"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { FireSystem } from "@/content/products/firefighting-systems";

/**
 * Compact detail card for the currently-selected fire-suppression
 * system. Renders as the first block of the left column inside the
 * 40/60 grid (above the step rail), NOT as a full-width band above
 * the grid — that was the mistake in the initial composition: it
 * detached the system context from the scene it controlled.
 *
 * Structure (compact):
 *   [mono label: [01] СПРИНКЛЕРНАЯ]
 *   [tagline — 1-2 lines]
 *   [body — 2-3 lines]
 *   [applications mono line: ПРИМЕНЕНИЕ · офисы · склады · …]
 *
 * The previous full-width version had a separate «Где применяется»
 * header with a hairline divider — removed. Applications now collapse
 * into a single mono-caps line that rhymes visually with the
 * `[01] СПРИНКЛЕРНАЯ` label at the top, which keeps the card short
 * enough to fit above the step-rail on a standard 900px viewport.
 *
 * Crossfades on system change via AnimatePresence (450ms, ease-out-expo).
 * Height-locked via `min-height` so the swap never causes the pinned
 * section's spacer to recompute — see HowItWorksSection height-lock
 * comment for the global story.
 *
 * When 4.2 ships ВПВ + combined, re-measure the tallest variant
 * (tagline + body + applications) and bump CARD_MIN_H if needed.
 */
type Props = {
  system: FireSystem;
  /** When true, crossfade is instant (0ms) — for prefers-reduced-motion. */
  instant: boolean;
};

// Compact card min-height: longest current tagline (~14 words) + body
// (~30 words) + mono applications line renders at ~118px on a 1440px
// viewport. Adding a 16-24px cushion so ВПВ / combined copy in 4.2 can
// differ slightly without another measurement pass, and so font-rendering
// variance across devices never causes a jitter on switch.
const CARD_MIN_H = 140;

export function SystemDetailCard({ system, instant }: Props) {
  const duration = instant ? 0 : 0.45;

  return (
    <div
      className="relative"
      style={{ minHeight: CARD_MIN_H }}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={system.id}
          id={`system-panel-${system.id}`}
          role="tabpanel"
          aria-labelledby={`system-tab-${system.id}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-fire)]">
            [{system.number}] {system.title.toUpperCase()}
          </p>
          <p className="mt-3 max-w-[420px] text-base leading-snug text-[var(--color-secondary)]">
            {system.tagline}
          </p>
          <p className="mt-2 max-w-[420px] text-sm leading-relaxed text-[var(--color-secondary)]/65">
            {system.body}
          </p>
          <p className="mt-3 max-w-[420px] font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
            <span className="text-[var(--color-secondary)]/35">Применение</span>
            <span className="mx-2 text-[var(--color-secondary)]/25">·</span>
            {system.applications.join(" · ")}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
