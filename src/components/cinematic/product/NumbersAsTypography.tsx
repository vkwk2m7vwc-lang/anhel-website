"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * NumbersAsTypography — replaces TechSpecsGrid for the cinematic
 * variant. Every spec becomes a viewport-sized editorial moment:
 * a giant number on the left margin, a single contextual line on
 * the right. Editorial pacing, not a data grid.
 *
 * Layout principle: a magazine spread, not a spreadsheet. The
 * legacy TechSpecsGrid renders 8 specs in a 4x2 grid as small tiles.
 * This version puts each spec in its own «scene» with monumental
 * typography. The visitor scrolls through the numbers like turning
 * pages.
 *
 * For the firefighting page we cherry-pick the 5 most legibility-
 * worthy specs (motor power, pump count, life-cycle, max temp,
 * voltage) and let the others fall away. Density is the enemy of
 * cinema.
 */
export type NumberBeat = {
  /** The big number — string so we can include units like «10» / «70°». */
  big: string;
  /** Optional unit shown smaller next to the big number. */
  unit?: string;
  /** Single-line caption telling the visitor what this number is. */
  caption: string;
  /** Optional one-line context underneath the caption. */
  context?: string;
};

export function NumbersAsTypography({
  beats,
  accent,
}: {
  beats: NumberBeat[];
  /** Hex for the right-side accent rule + caption colour. */
  accent: string;
}) {
  return (
    <section className="relative isolate bg-[var(--color-primary)]">
      {/* Top caption — anchors the section in the page narrative */}
      <div className="mx-auto max-w-[1440px] px-6 pt-32 md:px-12 md:pt-44">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          02 · цифры
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[900px] font-display text-[var(--color-secondary)]"
          style={{
            fontSize: "clamp(36px, 5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 500,
          }}
        >
          Что это значит в цифрах.
        </motion.h2>
      </div>

      {/* Number stack — each beat is min-h-[80svh]; viewer scrolls
          through them slowly. Asymmetric grid: number left
          (col-span-7), caption right (col-span-5). */}
      <div className="mx-auto mt-24 max-w-[1440px] px-6 md:mt-32 md:px-12">
        {beats.map((beat, i) => (
          <Beat key={i} beat={beat} accent={accent} index={i} />
        ))}
      </div>

      {/* Bottom hairline */}
      <div className="mx-auto mt-32 max-w-[1440px] px-6 md:px-12">
        <div className="h-px w-full bg-[var(--color-hairline)]" />
      </div>
    </section>
  );
}

function Beat({
  beat,
  accent,
  index,
}: {
  beat: NumberBeat;
  accent: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });

  return (
    <div
      ref={ref}
      className="grid min-h-[80svh] grid-cols-12 items-center gap-6 border-t border-[var(--color-hairline)] py-16 md:py-24"
    >
      {/* Index — tiny corner */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : undefined}
        transition={{ duration: 0.6 }}
        className="col-span-12 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-secondary)]/45 md:col-span-1"
      >
        № {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* The big number — column 1-7, dominant. */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-12 md:col-span-6"
      >
        <span
          className="block font-display text-[var(--color-secondary)]"
          style={{
            fontSize: "clamp(96px, 16vw, 260px)",
            fontWeight: 500,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
          }}
        >
          {beat.big}
          {beat.unit ? (
            <span
              style={{
                fontSize: "0.32em",
                letterSpacing: "0.02em",
                fontWeight: 400,
                marginLeft: "0.18em",
                color: accent,
              }}
            >
              {beat.unit}
            </span>
          ) : null}
        </span>
      </motion.div>

      {/* Caption — column 8-12, accent-tinted top rule */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-12 md:col-span-5"
      >
        <div className="h-px w-12" style={{ background: accent }} />
        <p
          className="mt-6 font-display text-[var(--color-secondary)]"
          style={{
            fontSize: "clamp(20px, 2vw, 28px)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            fontWeight: 400,
          }}
        >
          {beat.caption}
        </p>
        {beat.context ? (
          <p className="mt-4 max-w-[420px] text-sm leading-relaxed text-[var(--color-secondary)]/60">
            {beat.context}
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}
