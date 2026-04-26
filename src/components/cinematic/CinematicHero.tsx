"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MorphingWord, type MorphingBeat } from "./MorphingWord";

/**
 * CinematicHero — replaces the legacy carousel hero on the
 * /cinematic experiment.
 *
 * Composition (top → bottom):
 *   - tiny mono caption «ANHEL® / SPB / EST. 2018»
 *   - kinetic morphing word at the centre — ВОДА → ОГОНЬ → ТЕПЛО → ПУЛЬС
 *   - quiet sub-line «ВДОХ И ВЫДОХ ЗДАНИЯ»
 *   - bottom-left two-line manifesto («ИНЖЕНЕРНЫЕ СИСТЕМЫ /
 *     КОТОРЫЕ ПРОДОЛЖАЮТ РАБОТАТЬ»)
 *   - bottom-right scroll affordance ↓
 *
 * The whole stage is a `dark-island` so the canvas stays cinematic
 * regardless of the global theme — bright accent colours look
 * theatrical only on a black backdrop.
 *
 * The accent radial behind the word follows the active morph beat
 * via `onChange` — when the word becomes ОГОНЬ the canvas glows red,
 * when it becomes ТЕПЛО — orange. That's the «pulse».
 */
export function CinematicHero() {
  const [beat, setBeat] = useState<MorphingBeat | null>(null);
  const accent = beat?.accent ?? "#1E6FD9";

  return (
    <section
      id="hero"
      // dark-island redefines CSS vars locally so children read with
      // dark-mode contrast even when the global theme is light.
      className="dark-island relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Massive accent radial — repaints with each beat. transition
          on the inline style gives a 1.2 s smooth fade between hues. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accent}33 0%, transparent 65%)`,
          transition: "background 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Hairline grid — keeps the engineering signature alive
          underneath the kinetic moment. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-30"
      />

      {/* Top-left mono caption */}
      <div className="relative z-10 px-6 pt-28 md:px-12 md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-secondary)]/55"
        >
          ANHEL® · СПб · СЕРИЙНОЕ ПРОИЗВОДСТВО
        </motion.p>
      </div>

      {/* Centre stage — kinetic word floats in the middle of the
          viewport. Wrap in a flex-1 so the word stays vertically
          centred regardless of viewport height. */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <MorphingWord onChange={setBeat} />

        {/* Sub-line — ties the word to the brand promise without a
            sales tone. Ranges in italic display weight to feel like a
            chapter epigraph, not a tagline. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
          className="mt-8 max-w-[640px] px-6 text-center font-display text-lg italic text-[var(--color-secondary)]/65 md:text-2xl"
        >
          Вдох и выдох здания.
        </motion.p>
      </div>

      {/* Bottom row — two anchored corners. Left: a quiet two-line
          manifesto that tells the visitor what they're looking at
          before they scroll. Right: a hint that there's more below. */}
      <div className="relative z-10 flex items-end justify-between gap-6 px-6 pb-10 md:px-12 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[260px] font-mono text-[11px] uppercase leading-[1.6] tracking-[0.14em] text-[var(--color-secondary)]/55 md:max-w-[320px]"
        >
          Инженерные системы,
          <br />
          которые продолжают работать
          <br />
          через тридцать лет.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col items-end gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-secondary)]/65"
        >
          <span>Прокрутите</span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-base"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
