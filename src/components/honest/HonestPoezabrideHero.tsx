"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HonestPoezabrideHero — hero в стиле poezabride.com.
 *
 * Magazine-cover feel. Full-bleed фотография реального цеха
 * покрывает весь viewport, поверх неё italic-display headline
 * «ANHEL — это честно» внизу-слева как заголовок журнальной
 * обложки. Тонкая mono-шапка сверху, минимальные подписи
 * по углам. Никаких CTA-pill, никаких grid-карточек.
 *
 * Логика: фотография делает работу — она и есть «честно». Текст
 * не рекламирует, а подписывает. Как обложка фотопроекта или
 * специализированного издания.
 *
 * Тёмный gradient-scrim только в нижней четверти, чтобы headline
 * читался — не «затемняем фото целиком», как в плохих маркетинговых
 * lookbook'ах.
 */
export function HonestPoezabrideHero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white"
    >
      {/* Full-bleed photograph — реальный цех ANHEL.
          Object-cover + center 50% так что важная часть кадра в
          любой пропорции остаётся в кадре. */}
      <Image
        src="/assets/production/firefighting/shop-09.jpg"
        alt="ANHEL — фото производства, цех Москва"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 55%" }}
      />

      {/* Bottom scrim — тёмный градиент только для читаемости
          headline. Верхняя половина чистое фото, без затемнения. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 50%, rgba(0,0,0,0.55) 88%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      {/* Top — masthead-style caption */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-28 md:px-12 md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
        >
          ANHEL® · ВЫПУСК 01 · 2026
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden text-right font-mono text-[10px] uppercase tracking-[0.18em] md:block"
        >
          фотография цеха
          <br />
          Москва
        </motion.p>
      </div>

      {/* Spacer — фото читается чисто, headline внизу */}
      <div className="flex-1" />

      {/* BOTTOM — magazine-cover headline */}
      <div className="relative z-10 px-6 pb-12 md:px-12 md:pb-16">
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 0.85, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
        >
          ↳ от издателя
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-display"
          style={{
            fontSize: "clamp(56px, 11vw, 200px)",
            fontWeight: 500,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
          }}
        >
          ANHEL —{" "}
          <span className="italic font-normal">это честно.</span>
        </motion.h1>

        {/* Подпись + тонкий линк */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 flex flex-wrap items-end justify-between gap-6"
        >
          <p className="max-w-[440px] text-base leading-relaxed opacity-85 md:text-lg">
            На фото — наш цех. Не render, не stock.
            На сайте — каталог, документы, прямой телефон инженера.
          </p>
          <Link
            href="/projects"
            data-cursor="hover"
            className="group inline-flex items-baseline gap-2 border-b border-white/40 pb-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-white"
          >
            <span>13 объектов в архиве</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
