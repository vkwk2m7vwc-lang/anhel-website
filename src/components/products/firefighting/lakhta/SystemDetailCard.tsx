"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { FireSystem } from "@/content/products/firefighting-systems";

/**
 * Detail card rendered immediately below the SystemTabs rail and
 * above the 40/60 grid. Shows the tagline + body + applications line
 * for the currently-selected system.
 *
 * Crossfades on system change via AnimatePresence (450ms, ease-out-expo).
 * Height-locked via `min-height` so the swap doesn't change the card's
 * bounding box — keeps the pinned section stable (see
 * HowItWorksSection's height-lock comment for the why).
 *
 * The min-height is calibrated for the longest tagline+body combo
 * across all four systems + 12px buffer; when 4.2 ships ВПВ + combined,
 * re-measure the tallest variant and bump CARD_MIN_H if needed.
 */
type Props = {
  system: FireSystem;
  /** When true, crossfade is instant (0ms) — for prefers-reduced-motion. */
  instant: boolean;
};

// Longest current combo (drencher tagline ~12 words + body ~40 words +
// applications line) renders at ~168px on a 1440px viewport. Add a
// comfortable ~24px cushion so ВПВ/combined can be added in 4.2 without
// another measurement pass, and so font-rendering variance across
// devices never causes the card to jitter on switch. If 4.2 copy is
// even longer, bump this up.
const CARD_MIN_H = 192;

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
          <p className="mt-3 max-w-[720px] text-base leading-snug text-[var(--color-secondary)] md:text-lg">
            {system.tagline}
          </p>
          <p className="mt-3 max-w-[720px] text-sm leading-relaxed text-[var(--color-secondary)]/65">
            {system.body}
          </p>

          <div className="mt-5 flex max-w-[720px] flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40">
              Где применяется
            </span>
            <span className="h-px flex-1 bg-[var(--color-hairline)]" />
          </div>
          <p className="mt-3 max-w-[720px] font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/70">
            {system.applications.join(" · ")}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
