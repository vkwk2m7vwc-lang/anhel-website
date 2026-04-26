"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

/**
 * ApplicationsCinema — replaces ApplicationsGrid (the 6-card 3x2
 * grid) with a vertical stack of full-bleed editorial moments.
 * Each application gets its own height-[80svh] section with:
 *
 *   - giant left-side type («ЖИЛЫЕ КОМПЛЕКСЫ») cropped
 *   - small mono index
 *   - real-object reference line
 *   - hairline accent rule
 *
 * No photos yet (the firefighting page doesn't have shoot-quality
 * imagery for object types). Without photos, the typography itself
 * has to carry the emotional weight — so it goes very large (clamp
 * 60→160px) and breaks across the viewport.
 *
 * When real object photos land, the layout extends naturally: drop
 * an `imageSrc` field into ApplicationBeat and the component renders
 * a full-bleed bg with text overlay. For now: pure typographic.
 */
export type ApplicationBeat = {
  /** «01» / «02» — short index. */
  mono: string;
  /** Single-word or two-word headline («ЖИЛЫЕ КОМПЛЕКСЫ»). */
  title: string;
  /** Real object reference («ЖК «Дмитровский парк», Москва»). */
  example: string;
  /** Optional photo. When provided, renders as full-bleed bg + scrim. */
  imageSrc?: string;
};

export function ApplicationsCinema({
  beats,
  accent,
}: {
  beats: ApplicationBeat[];
  /** Hex string for accent rule + index colour. */
  accent: string;
}) {
  return (
    <section className="relative bg-[var(--color-primary)]">
      <div className="mx-auto max-w-[1440px] px-6 py-32 md:px-12 md:py-44">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          04 · применение
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
          Где это работает.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-[520px] text-base leading-relaxed text-[var(--color-secondary)]/60"
        >
          От жилых комплексов до инфраструктурных объектов. Каждая установка собирается под проект — нет универсальной коробки.
        </motion.p>
      </div>

      {/* Stack of beats. Each beat is its own moment, full width. */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {beats.map((beat, i) => (
          <Beat key={i} beat={beat} accent={accent} index={i} />
        ))}
      </div>
    </section>
  );
}

function Beat({
  beat,
  accent,
  index,
}: {
  beat: ApplicationBeat;
  accent: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="group relative flex min-h-[60svh] items-center border-t border-[var(--color-hairline)] py-16 md:min-h-[70svh]"
    >
      {/* Optional bg photo */}
      {beat.imageSrc ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-25 transition-opacity duration-500 group-hover:opacity-40"
          style={{ backgroundImage: `url(${beat.imageSrc})` }}
        />
      ) : null}

      <div className="relative z-10 grid w-full grid-cols-12 items-end gap-6">
        {/* Mono index */}
        <span
          className="col-span-12 font-mono text-[10px] uppercase tracking-[0.22em] md:col-span-1"
          style={{ color: accent }}
        >
          {beat.mono}
        </span>

        {/* Massive title — fills the row */}
        <h3
          className="col-span-12 font-display text-[var(--color-secondary)] md:col-span-8"
          style={{
            fontSize: "clamp(48px, 8vw, 144px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontWeight: 500,
          }}
        >
          {beat.title}
        </h3>

        {/* Right-side reference line */}
        <div className="col-span-12 md:col-span-3 md:text-right">
          <div
            className="ml-auto h-px w-12"
            style={{ background: accent }}
          />
          <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-[var(--color-secondary)]/65 md:ml-auto">
            {beat.example}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
