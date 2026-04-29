"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HonestOffmenuHero — hero в стиле offmenu.design / utility.
 *
 * Принцип: broken grid. Слова заголовка не лежат в одну линию —
 * они разбросаны по странице как элементы случайной композиции.
 * Размеры разные: одно слово гигантское, другое — мелкая
 * аннотация. Mono-метки, числа и hairline-разделители работают
 * как полноправные композиционные элементы, а не подписи.
 *
 * Layout (12-col grid):
 *   col 1-3:  «01 / 06» + tag «BRAND» (top-left)
 *   col 4-12: «ANHEL» массивно, прижато к верху (top-right)
 *   col 1-4:  «это» мелко, italic (mid-left)
 *   col 4-12: пояснение body в одну колонку (mid-centre)
 *   col 6-12: «честно.» гигантское italic (bottom-right)
 *   col 1-12: hairline + bottom row (footer)
 *
 * Mixed weights: «ANHEL» display medium, «это» italic light,
 * «честно» italic heavy. Намеренная асимметрия — composition,
 * не columned content.
 */
export function HonestOffmenuHero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col"
      style={{ background: "#fafafa", color: "#0a0a0a" }}
    >
      {/* 12-column grid с разными ячейками для каждого элемента */}
      <div className="relative grid h-full min-h-[100svh] grid-cols-12 grid-rows-[auto_1fr_auto_auto] gap-x-4 gap-y-8 px-6 pb-10 pt-28 md:gap-x-6 md:gap-y-10 md:px-12 md:pb-14 md:pt-32">

        {/* (1) Top-left: 01/06 + BRAND tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-12 row-start-1 md:col-span-3"
        >
          <div className="flex items-baseline gap-3">
            <span
              className="font-display"
              style={{
                fontSize: "clamp(40px, 5vw, 80px)",
                fontWeight: 600,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "rgba(10,10,10,0.18)",
              }}
            >
              01
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
              / 06
            </span>
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] opacity-55">
            BRAND POSITION ° 2026
          </div>
        </motion.div>

        {/* (2) Top-right: ANHEL massive */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 row-start-2 self-start font-display md:col-span-9 md:col-start-4"
          style={{
            fontSize: "clamp(80px, 14vw, 280px)",
            fontWeight: 600,
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
          }}
        >
          ANHEL
        </motion.h1>

        {/* (3) Mid-left: это (small italic, almost a margin note) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="col-span-12 row-start-3 self-end md:col-span-3 md:col-start-1"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-45">
            ↳ relation
          </div>
          <div
            className="mt-2 font-display italic"
            style={{
              fontSize: "clamp(24px, 3vw, 48px)",
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              opacity: 0.8,
            }}
          >
            — это —
          </div>
        </motion.div>

        {/* (4) Mid-right body — короткая lede */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="col-span-12 row-start-3 self-end md:col-span-5 md:col-start-7 md:max-w-[440px]"
          style={{
            fontSize: "16px",
            lineHeight: 1.55,
            color: "rgba(10,10,10,0.75)",
          }}
        >
          Не «лучшие на рынке», не «революционные технологии».
          Серия HVS-NU собирается на той же базе, что и Альфа Stream,
          но без партнёрской цепочки и наценки за бренд.
        </motion.p>

        {/* (5) Bottom-right: честно. — gigantic italic */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 row-start-4 self-end md:col-span-10 md:col-start-3"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-55">
            ↳ promise
          </div>
          <div
            className="mt-3 font-display italic md:text-right"
            style={{
              fontSize: "clamp(96px, 18vw, 360px)",
              fontWeight: 500,
              lineHeight: 0.85,
              letterSpacing: "-0.045em",
            }}
          >
            честно.
          </div>
        </motion.div>

        {/* (6) Hairline + footer row, full-width below grid */}
        <div className="col-span-12 row-start-5 mt-6 border-t border-[rgba(10,10,10,0.18)] pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-wrap items-baseline justify-between gap-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">
              ANHEL® · СПб · Москва · с 2018
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
              <Link
                href="/products"
                data-cursor="hover"
                className="group inline-flex items-baseline gap-2 border-b border-[rgba(10,10,10,0.4)] pb-1 transition-colors hover:border-[#0a0a0a]"
              >
                <span>каталог</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
              </Link>
              <Link
                href="/projects"
                data-cursor="hover"
                className="group inline-flex items-baseline gap-2 border-b border-[rgba(10,10,10,0.4)] pb-1 transition-colors hover:border-[#0a0a0a]"
              >
                <span>13 объектов</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
