"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * MomentOfTruth — sticky transitional section between the cinematic
 * hero and the spec numbers. Pure dramaturgy: the page pauses for
 * one viewport, the canvas floods with the accent radial, and three
 * urgency words («ДЫМ — СИГНАЛ — РЕАКЦИЯ») cross-fade as scroll
 * progress moves through the section.
 *
 * Why: a generic catalogue page goes hero → specs → applications.
 * For a fire-protection product, the EMOTIONAL stake (seconds matter,
 * automation has to be flawless) is the actual story. This section
 * tells that story without specs, without product photo, without a
 * grid — just three words and a tightening radial.
 *
 * Implementation: 200vh tall, sticky 100vh inside; framer-motion
 * `useScroll` with `target: ref` drives the word-index via
 * `useTransform`. AnimatePresence + key swap on the active word.
 */
export function MomentOfTruth({
  beats,
  accent,
}: {
  /** 2-4 short uppercase words. Cycles based on scroll progress. */
  beats: string[];
  /** Hex string for the radial accent. */
  accent: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress 0..1 → word index. We weight the middle 60%
  // so beats display equally during the «pinned» portion of the
  // experience, and the head/tail of the scroll handles enter/exit.
  const wordIndex = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    [0, beats.length],
  );

  // Radial scales 0 → 1 → 0.4 across the section so the canvas
  // breathes: starts dark, floods at the centre, exhales.
  const radialOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    [0, 0.7, 0.4, 0],
  );
  const radialScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.2, 0.9]);

  return (
    <section
      ref={ref}
      className="dark-island relative isolate"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        {/* Tightening radial — anchored centre */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${accent} 0%, transparent 65%)`,
            opacity: radialOpacity,
            scale: radialScale,
          }}
        />

        {/* Hairline grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-hairline bg-grid opacity-30"
        />

        {/* Word stack — render every word, fade based on whether the
            scroll progress is inside the slot for that word. We don't
            use AnimatePresence here because we want overlap: as one
            word is fading out, the next is fading in for the
            cinematic cross-dissolve. */}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {beats.map((word, i) => (
            <Beat
              key={word}
              word={word}
              index={i}
              progress={wordIndex}
              accent={accent}
            />
          ))}
        </div>

        {/* Bottom caption — quiet sub-line that reads only after the
            beats have played. Adds the meaning. */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: false, margin: "-30%" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute bottom-12 left-1/2 max-w-[560px] -translate-x-1/2 px-6 text-center font-mono text-[11px] uppercase leading-[1.7] tracking-[0.18em] text-[var(--color-secondary)]/55 md:bottom-20"
        >
          От первого датчика до полного давления — секунды. Автоматика. Резервирование. Без вмешательства человека.
        </motion.p>
      </div>
    </section>
  );
}

/** A single word — opacity-driven by scroll progress slot. */
function Beat({
  word,
  index,
  progress,
  accent,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
  accent: string;
}) {
  // Each word is centred at scroll-index = i + 0.5; its opacity peaks
  // there and fades over a slot of 0.6 indices.
  const center = index + 0.5;
  const opacity = useTransform(
    progress,
    [center - 0.7, center - 0.3, center, center + 0.3, center + 0.7],
    [0, 0.4, 1, 0.4, 0],
  );

  return (
    <motion.span
      style={{
        opacity,
        color: accent,
        fontSize: "clamp(80px, 16vw, 240px)",
        fontWeight: 600,
        letterSpacing: "-0.045em",
        lineHeight: 0.9,
      }}
      className="absolute font-display"
    >
      {word}
    </motion.span>
  );
}
