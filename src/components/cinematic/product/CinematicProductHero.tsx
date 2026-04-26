"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

/**
 * CinematicProductHero — replaces ProductHero on the cinematic
 * variant. Lives in dark-island so the page lands as a stage
 * regardless of the global theme.
 *
 * Composition:
 *   - tiny mono caption top-left (chapter № + product line)
 *   - giant accent radial behind the product
 *   - massive typographic title — title fills the viewport, no
 *     subtitle / no two-line lede / no CTA pills
 *   - product photo flies in centred-right with accent drop-shadow
 *   - bottom-left: minimal meta line («АПТ · ВПВ · совмещённые»)
 *   - bottom-right: scroll affordance
 *
 * Difference from the legacy ProductHero:
 *   - drops breadcrumbs, sectionTag, subtitle, both CTAs
 *   - kills the 12-column grid; uses absolute positioning so type
 *     can break across the viewport
 *   - title scaled to display-mass (clamp 80→200px) — it IS the
 *     visual; not a card with fields
 *   - product photo cohabits the same canvas; no left/right split
 */
export function CinematicProductHero({
  index,
  line,
  title,
  meta,
  imageSrc,
  imageAlt,
  accent,
}: {
  /** «01» / «02» / «03» — chapter-style number. */
  index: string;
  /** «НАСОСНЫЕ СТАНЦИИ · ПОЖАРОТУШЕНИЕ» — mono caption. */
  line: string;
  /** Single product title, no subtitle. Reads as the headline. */
  title: string;
  /** Short meta — types, certificates, scope. Mono. */
  meta: string;
  imageSrc: string;
  imageAlt: string;
  /** Hex string for the radial wash + drop-shadow tint. */
  accent: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <section
      ref={ref}
      className="dark-island relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Giant accent radial — anchored on the right where the product
          sits, fades to transparent over 60% of the viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 72% 48%, ${accent}55 0%, transparent 65%)`,
        }}
      />

      {/* Hairline grid underneath everything for engineering signature */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-25"
      />

      {/* Top-left mono caption + chapter index */}
      <div className="relative z-10 flex items-start justify-between gap-6 px-6 pt-28 md:px-12 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-secondary)]/60"
        >
          <span style={{ color: accent }}>Глава {index}</span>
          <span className="text-[var(--color-secondary)]/40">/</span>
          <span>{line}</span>
        </motion.div>

        {/* Right side: a quiet "back to catalog" anchor */}
        <Link
          href="/products/pumps"
          data-cursor="hover"
          className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-secondary)]/55 transition-colors hover:text-[var(--color-secondary)] md:inline-block"
        >
          ← каталог
        </Link>
      </div>

      {/* Centre stage — title + product photo cohabit */}
      <div className="relative z-10 flex flex-1 flex-col items-stretch justify-center">
        {/* Massive title — overlaps the product image; the product
            sits at z-0 (behind), title at z-10 (front). Reads as one
            cinematic frame. */}
        <div className="pointer-events-none relative mx-auto flex w-full max-w-[1600px] items-center justify-center px-6 md:px-12">
          {/* Product photo — positioned absolute behind the title so
              the title can sit ON top with mix-blend behaviour. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0 mx-auto flex items-center justify-end pr-[2vw]"
            style={{
              filter: `drop-shadow(0 50px 100px ${accent}66)`,
            }}
          >
            <div
              className="relative"
              style={{
                width: "min(620px, 50vw)",
                height: "min(620px, 50vw)",
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 620px, 50vw"
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Title — overlays the product. Words split across lines
              and stagger-reveal. Mix-blend so where it crosses the
              product render the type takes on the product silhouette. */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-10 max-w-[1100px] font-display text-[var(--color-secondary)]"
            style={{
              fontSize: "clamp(56px, 10vw, 200px)",
              fontWeight: 600,
              lineHeight: 0.85,
              letterSpacing: "-0.045em",
              mixBlendMode: "difference",
            }}
          >
            {title.split(" ").map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.0,
                  delay: 0.6 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mr-[0.18em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </div>

      {/* Bottom row — meta line left, scroll hint right */}
      <div className="relative z-10 flex items-end justify-between gap-6 px-6 pb-10 md:px-12 md:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[460px] font-mono text-[11px] uppercase leading-[1.7] tracking-[0.16em] text-[var(--color-secondary)]/60"
        >
          {meta}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col items-end gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-secondary)]/65"
        >
          <span>прокрутите главу</span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-base"
            style={{ color: accent }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
