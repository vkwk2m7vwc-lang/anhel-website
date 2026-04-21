"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";

/**
 * Stage 1 placeholder home page.
 *
 * A full hero shell that proves the whole stack runs together:
 *  - next/font typography,
 *  - Tailwind tokens → BRAND.md palette,
 *  - Framer Motion reveal timings,
 *  - Magnetic CTAs (pulls toward cursor, snaps back with elastic),
 *  - Lenis smooth scroll (scroll past the fold to feel it),
 *  - prefers-reduced-motion fallbacks throughout.
 *
 * Stages 2–9 will replace these sections with real content (horizontal
 * product explorer, projects mosaic, building cross-section, etc.).
 */

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const ctaPrimary = useMagnetic<HTMLAnchorElement>({ strength: 0.35 });
  const ctaSecondary = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });

  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-[var(--color-primary)] px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40"
      >
        <div className="mx-auto w-full max-w-[1440px]">
          <motion.p
            {...FADE_UP}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mono-tag mb-8"
          >
            01 / 04 · Инженерное оборудование
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="font-display text-[clamp(3.5rem,10vw,10rem)] font-medium leading-[0.9] tracking-[-0.03em] text-[var(--color-secondary)]"
          >
            Системы,
            <br />
            которые держат
            <br />
            <span className="text-[var(--color-steel-light)]">здание живым.</span>
          </motion.h1>

          <motion.p
            {...FADE_UP}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-8 max-w-xl text-balance text-base text-[var(--color-secondary)]/70 md:text-lg"
            data-cursor="text"
          >
            ANHEL проектирует и производит насосные станции, пожарные
            установки, теплообменные пункты и системы водоподготовки.
            Петербург — от инженерной документации до пусконаладки.
          </motion.p>

          <motion.div
            {...FADE_UP}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <Link
              ref={ctaPrimary}
              href="/#products"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-secondary)] px-7 py-4 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-white"
            >
              Смотреть каталог
              <span
                aria-hidden="true"
                className="inline-block translate-x-0 transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              ref={ctaSecondary}
              href="/#contact"
              data-cursor="hover"
              className="inline-flex items-center gap-3 rounded-full border border-[var(--color-secondary)]/25 px-7 py-4 text-sm text-[var(--color-secondary)] transition-colors hover:border-[var(--color-secondary)]/70"
            >
              Обсудить проект
            </Link>
          </motion.div>
        </div>

        {/* Bottom-of-hero counters — proof points, Stage 2 will animate
            these as count-ups on scroll into view. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="mx-auto mt-24 grid w-full max-w-[1440px] grid-cols-2 gap-8 border-t border-[var(--color-hairline)] pt-10 md:grid-cols-4"
        >
          {[
            { k: "15+", v: "лет на рынке" },
            { k: "200+", v: "реализованных объектов" },
            { k: "100%", v: "производство в СПб" },
            { k: "24/7", v: "сервисная поддержка" },
          ].map((c) => (
            <div key={c.v}>
              <p className="font-display text-3xl text-[var(--color-secondary)] md:text-4xl">
                {c.k}
              </p>
              <p className="mt-2 text-xs text-[var(--color-secondary)]/50 md:text-sm">
                {c.v}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── PLACEHOLDER STRIP ──────────────────────────────────── */}
      <section
        id="products"
        className="relative bg-[var(--color-primary)] px-6 py-32 md:px-12 md:py-40"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="mono-tag mb-6">02 / 04 · Линейка продуктов</p>
          <h2 className="font-display text-4xl leading-tight tracking-tight text-[var(--color-secondary)] md:text-6xl">
            Четыре направления.
            <br />
            <span className="text-[var(--color-steel-light)]">
              Одна инженерная культура.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-[var(--color-secondary)]/60">
            Горизонтальный product-explorer со сменой акцентных цветов по
            продукту появится на Этапе 3 (ХВС, Пожар, ВПУ, БИТП).
          </p>
        </div>
      </section>
    </>
  );
}
