"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HonestSplitHero — 50/50 split hero под бренд-позицию «честно».
 *
 * Левая половина (60% на md+) — тёмный канвас (#0a0a0a) с
 * монументальным заголовком «ANHEL — это честно.» в три строки.
 * Под ним один контр-факт-доказательство: «Один завод. В Москве.
 * 13 объектов в портфолио. Ноль партнёрских наценок.»
 * Внизу — два тонких CTA-линка (без pill-кнопок).
 *
 * Правая половина (40% на md+) — full-bleed фотография реального
 * цеха производства. Без рамки, без затемнения сверху, без glass —
 * фото говорит за себя. Берётся из public/assets/production/firefighting/
 * (это реальные фото, не render).
 *
 * Логика: «честно» доказывается фотографией. Слева утверждение,
 * справа — как оно выглядит. Без посредников.
 */
export function HonestSplitHero() {
  return (
    <section
      id="hero"
      className="relative isolate grid min-h-[100svh] grid-cols-1 overflow-hidden md:grid-cols-[3fr_2fr]"
    >
      {/* LEFT — заголовок + факт + CTA. Тёмный канвас захардкожен,
          не флипается с темой — для «честно» нужен максимальный
          контраст между текстом и реальной фотографией справа. */}
      <div
        className="relative flex flex-col justify-between p-8 md:p-12 lg:p-16"
        style={{ background: "#0a0a0a", color: "#f5f5f3" }}
      >
        {/* Top mono caption */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          ANHEL® · СПб · Москва · с 2018
        </motion.p>

        {/* Centre — заголовок и факт */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{
              fontSize: "clamp(56px, 9vw, 168px)",
              fontWeight: 500,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            ANHEL —<br />
            <span className="opacity-50">это</span>
            <br />
            <span className="italic font-normal">честно.</span>
          </motion.h1>

          {/* Hairline + контр-факт */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left"
            style={{
              height: "1px",
              background: "rgba(245,245,243,0.18)",
              maxWidth: "320px",
              marginTop: "32px",
            }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-6 max-w-[420px] text-base leading-relaxed md:text-lg"
          >
            Один завод. В Москве. 13 объектов в портфолио — с фотографиями и адресами.
            Без партнёрских наценок «за бренд». Справа — наш цех на этой неделе.
          </motion.p>
        </div>

        {/* Bottom — два тихих линка вместо pill-CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-wrap gap-x-10 gap-y-4 font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          <Link
            href="/projects"
            data-cursor="hover"
            className="group inline-flex items-baseline gap-2 border-b border-[rgba(245,245,243,0.4)] pb-1 transition-colors hover:border-[rgba(245,245,243,0.9)]"
          >
            <span>Объекты с адресами</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
          </Link>
          <Link
            href="/products"
            data-cursor="hover"
            className="group inline-flex items-baseline gap-2 border-b border-[rgba(245,245,243,0.4)] pb-1 transition-colors hover:border-[rgba(245,245,243,0.9)]"
          >
            <span>Каталог + документы</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
          </Link>
        </motion.div>
      </div>

      {/* RIGHT — full-bleed фотография реального цеха.
          Mobile (1-col): рендерится снизу с фиксированной высотой, не
          full-bleed (иначе hero становится 200vh).
          Desktop (md+): полная высота, занимает 40% ширины.
          Никаких glass-эффектов, никакого затемнения — фото читается
          как «вот, посмотрите, это снято на нашем заводе». */}
      <div className="relative h-[60svh] overflow-hidden bg-[#0a0a0a] md:h-auto">
        <Image
          src="/assets/production/firefighting/shop-01.jpg"
          alt="ANHEL — реальный цех производства, фото с площадки"
          fill
          priority
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />

        {/* Tiny caption внизу-справа: дата кадра + место.
            Мини-шильдик в духе фоторепортажа, не маркетинговый
            лейбл. Полупрозрачный фон, на любой картинке читается. */}
        <div className="absolute bottom-4 right-4 z-10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
             style={{ background: "rgba(10,10,10,0.6)", color: "#f5f5f3" }}>
          ЦЕХ · МОСКВА · СБОРКА HVS-NU
        </div>
      </div>
    </section>
  );
}
