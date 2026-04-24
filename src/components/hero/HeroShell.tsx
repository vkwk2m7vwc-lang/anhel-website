"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { HeroTitle } from "./HeroTitle";
import { HeroCTAs } from "./HeroCTAs";
import { HeroCounters } from "./HeroCounters";

/**
 * HeroShell — shared hero scaffold used by all three variants (A/B/C).
 *
 * Every variant renders exactly the same tech-caption, headline, CTAs,
 * counters, footer-caption and scroll hint. The background layer is the
 * only thing that changes — it's injected through `background` (absolute
 * positioned slot) or `foreground` (absolute, stacked above background
 * but below text) so each variant stays self-contained.
 *
 * Composition diagram:
 *   <section>
 *     └─ <div background>          z-0
 *     └─ <div foreground optional> z-10
 *     └─ <div content>             z-20 — text, CTAs, counters
 *   </section>
 */
export function HeroShell({
  background,
  foreground,
  variantLabel,
}: {
  background: ReactNode;
  foreground?: ReactNode;
  variantLabel: string;
}) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-primary)]"
    >
      {/* z-0 — pure background (video / radial gradient / SVG schema) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {background}
      </div>

      {/* z-10 — optional foreground that still sits behind the text,
          currently used by variants B and C to show the product render. */}
      {foreground ? (
        <div className="pointer-events-none absolute inset-0 z-10">
          {foreground}
        </div>
      ) : null}

      {/* z-20 — content grid.

          `pointer-events-none` on the outer wrapper, `pointer-events-auto`
          selectively on interactive children.

          Why: carousel variants (hero E) put clickable tab buttons in the
          right 45% at the bottom of the hero, rendered inside the z-0
          background layer. The content wrapper stacks above (z-20) and
          its bounding box covers the full width — even where it's
          visually empty — so without selective pointer-events it swallows
          every click in that right-45% area. Making the whole content
          wrapper click-through by default and re-enabling clicks only
          on the interactive top block (tag + title + CTAs) fixes it
          without moving anything around in the stacking order.

          The counters / variant-label row at the bottom is text-only
          and can stay click-through (no explicit auto on it). */}
      <div className="pointer-events-none relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-between px-6 pb-10 pt-28 md:px-12 md:pb-14 md:pt-32">
        <div className="pointer-events-auto flex-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mono-tag"
          >
            01 / 04 · Инженерное оборудование
          </motion.p>

          <div className="mt-8 max-w-[1100px] md:mt-12">
            <HeroTitle />
          </div>

          <HeroCTAs />
        </div>

        {/* Bottom row: counters + variant label + scroll hint — all three
            children are presentational text, so we leave the row
            click-through (the outer wrapper already is). */}
        <div className="mt-12 flex flex-col gap-10 border-t border-[var(--color-hairline)] pt-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <HeroCounters />

          <div className="flex flex-col gap-3 text-right md:items-end">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/40">
              Проектирование · Производство · Автоматизация
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50">
              {variantLabel}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/60"
            >
              Прокрутить
              <motion.span
                aria-hidden="true"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
