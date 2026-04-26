"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * ProductChapter — a sticky 100vh scene per product. The whole
 * section is 200vh tall on the page; the inner viewport sticks
 * for the first 100vh, then releases as you scroll past. While
 * pinned, scroll progress drives:
 *
 *   - massive accent-tinted SINGLE WORD that scales / shifts as you
 *     pass through (typographic flagship of the chapter)
 *   - product image slides in from the right + fades to full
 *     opacity
 *   - copy block (chapter №, lede, link) lands at the bottom-left
 *
 * This is the biggest structural break from the legacy «card grid»
 * showcase. Each product gets its own 100vh moment instead of being
 * one tile in a 2x2 grid.
 *
 * The chapter colour bleeds into the canvas as a giant radial that
 * scales up with progress — so by the time the chapter is fully
 * pinned, the screen is washed with the product's accent.
 */
export function ProductChapter({
  index,
  word,
  title,
  lede,
  href,
  imageSrc,
  imageAlt,
  accent,
}: {
  /** «01» / «02» / «03» — shown in the corner. */
  index: string;
  /** Single-word headline (ВОДА / ОГОНЬ / ТЕПЛО). Big. */
  word: string;
  /** Product title under the lede. */
  title: string;
  /** Two-sentence lede. */
  lede: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  /** Hex string for the accent radial wash + word colour. */
  accent: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Drive progress from when section enters viewport until it leaves.
    offset: ["start end", "end start"],
  });

  // Word scales from 0.8 → 1.05 → 0.95 across the chapter — a slow
  // zoom-in then slight overshoot. The shift mirrors the ВДОХ/ВЫДОХ
  // metaphor of the hero.
  const wordScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.95]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["10vh", "-10vh"]);

  // Radial fades in 0..0.4 then holds.
  const radialOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.5, 0]);

  // Image slides in from x=120 to x=0 across the first half.
  const imageX = useTransform(scrollYProgress, [0.1, 0.5], ["120%", "0%"]);
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);

  return (
    <section
      ref={ref}
      // 200vh tall — gives 100vh of sticky pinning + 100vh of scroll
      // overflow that drives the progress.
      className="relative isolate"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full overflow-hidden bg-[var(--color-primary)]">
        {/* Giant accent radial — fills the whole canvas with the
            product's mood. Opacity scrubbed by scroll progress. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 70% 50%, ${accent} 0%, transparent 60%)`,
            opacity: radialOpacity,
          }}
        />

        {/* Hairline grid for engineering signature */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-hairline bg-grid opacity-25"
        />

        {/* Massive WORD — sits behind everything as the typographic
            flagship. Scaled / translated by scroll progress. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ scale: wordScale, y: wordY }}
        >
          <span
            className="select-none font-display"
            style={{
              color: accent,
              fontSize: "clamp(140px, 26vw, 480px)",
              fontWeight: 600,
              letterSpacing: "-0.05em",
              lineHeight: 0.8,
              opacity: 0.18,
            }}
          >
            {word}
          </span>
        </motion.div>

        {/* Product image — flies in from the right, lands in the
            right half of the viewport. The image is the photograph
            of the product (PNG with transparent bg). */}
        <motion.div
          className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 md:block"
          style={{
            x: imageX,
            opacity: imageOpacity,
            width: "min(540px, 42vw)",
            height: "min(540px, 42vw)",
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 540px, 42vw"
            className="object-contain"
            style={{
              filter: `drop-shadow(0 40px 80px ${accent}55)`,
            }}
          />
        </motion.div>

        {/* Mobile image — placed at top, scaled down */}
        <motion.div
          className="pointer-events-none absolute right-4 top-24 md:hidden"
          style={{
            opacity: imageOpacity,
            width: "min(50vw, 240px)",
            height: "min(50vw, 240px)",
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="50vw"
            className="object-contain"
          />
        </motion.div>

        {/* Copy block — anchored bottom-left. Chapter №, then product
            title, lede, and a primary link. Reads like a spread in a
            magazine. */}
        <div className="relative z-10 flex h-full w-full max-w-[1440px] flex-col justify-end px-6 pb-16 md:mx-auto md:px-12 md:pb-20">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7">
              {/* Chapter number — big, mono, accent */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="block font-mono text-[12px] uppercase tracking-[0.22em]"
                style={{ color: accent }}
              >
                Глава {index} · ANHEL
              </motion.span>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 font-display text-[var(--color-secondary)]"
                style={{
                  fontSize: "clamp(36px, 5vw, 80px)",
                  fontWeight: 500,
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                }}
              >
                {title}
              </motion.h2>

              {/* Lede + link */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="mt-8 flex flex-col gap-6 md:max-w-[480px] md:flex-row md:items-end md:gap-12"
              >
                <p className="text-base leading-relaxed text-[var(--color-secondary)]/70 md:text-lg">
                  {lede}
                </p>
                <Link
                  href={href}
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 self-start whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--color-secondary)] transition-opacity hover:opacity-70"
                  style={{ borderBottom: `1px solid ${accent}` }}
                >
                  <span className="pb-1.5">Открыть главу</span>
                  <span
                    aria-hidden="true"
                    className="pb-1.5 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
