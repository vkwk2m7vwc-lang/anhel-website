"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HonestIcomatHero — hero в стиле icomat.co.uk.
 *
 * Industrial / material aesthetic. Канвас разделён на две половины
 * по 50svh: верхняя — глубокий petrol-teal (#0d3a3f), как «материал»;
 * нижняя — белая «бумага» (#fafafa). Заголовок «ANHEL — это честно»
 * монументально пересекает границу между двумя слоями.
 *
 * Трюк с типографикой: headline получает вертикальный
 * background-clip:text градиент (50% белый / 50% чёрный) — буквы
 * выглядят так, будто верхняя половина читается на тёмном слое,
 * нижняя — на бумаге. Эффект «вырезки в материале».
 *
 * По бокам — технические аннотации в духе material data sheet:
 *   - top-left: «MATERIAL · № 01-2026»
 *   - top-right: 3 inline-параметра (DUTY · CYCLES · SERVICE)
 *   - bottom-left: одна «pull» цифра как ключевое значение
 *   - bottom-right: «↗ datasheet» линк на каталог
 *
 * Никаких glass-эффектов, никакого carousel — только material block
 * + paper, как лист тех. документа.
 */
export function HonestIcomatHero() {
  const TEAL = "#0d3a3f";
  const PAPER = "#fafafa";
  const INK = "#0a0a0a";

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden"
      style={{ background: PAPER, color: INK }}
    >
      {/* Top half — colored material block. height: 50svh */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0"
        style={{ height: "50svh", background: TEAL }}
      />

      {/* Hairline разделитель ровно по границе двух блоков —
          тонкая граница «материал | бумага» */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0"
        style={{
          top: "50svh",
          height: "1px",
          background: "rgba(10,10,10,0.65)",
        }}
      />

      {/* Top-left: MATERIAL tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute z-10 px-6 pt-28 md:px-12 md:pt-32"
        style={{ color: PAPER }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-65">
          MATERIAL · № 01-2026
        </p>
        <p className="mt-3 max-w-[200px] font-mono text-[10px] uppercase leading-[1.6] tracking-[0.16em] opacity-50">
          ANHEL®
          <br />
          СПб · Москва · с 2018
        </p>
      </motion.div>

      {/* Top-right: tech specs row, монохром, in-product detail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute right-0 z-10 px-6 pt-28 md:px-12 md:pt-32"
        style={{ color: PAPER }}
      >
        <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.16em] md:gap-x-8">
          <li className="opacity-90">
            <span className="opacity-55">DUTY</span> · 24/7
          </li>
          <li className="opacity-90">
            <span className="opacity-55">CYCLES</span> · 25 000+
          </li>
          <li className="opacity-90">
            <span className="opacity-55">SERVICE</span> · 30 ЛЕТ
          </li>
        </ul>
      </motion.div>

      {/* CENTRE — headline, vertically positioned at the boundary.
          background-clip: text gradient: top half PAPER (white),
          bottom half INK (dark). Граница градиента совпадает
          вертикально с серединой буквы → визуальный split. */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-display"
        style={{
          fontSize: "clamp(60px, 13vw, 240px)",
          fontWeight: 600,
          lineHeight: 0.92,
          letterSpacing: "-0.045em",
          background: `linear-gradient(180deg, ${PAPER} 0%, ${PAPER} 50%, ${INK} 50%, ${INK} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        ANHEL — <span className="italic font-normal">это честно.</span>
      </motion.h1>

      {/* Bottom-left: «pull number» — одна ключевая цифра */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.9 }}
        className="absolute bottom-0 left-0 z-10 px-6 pb-10 md:px-12 md:pb-14"
      >
        <span
          className="block font-display"
          style={{
            fontSize: "clamp(60px, 7vw, 120px)",
            fontWeight: 500,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
          }}
        >
          13
        </span>
        <span className="mt-1 block max-w-[280px] font-mono text-[10px] uppercase leading-[1.6] tracking-[0.16em] opacity-65">
          объектов в портфолио — с фото и адресом, не «более ста проектов»
        </span>
      </motion.div>

      {/* Bottom-right: technical datasheet link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-0 right-0 z-10 px-6 pb-10 md:px-12 md:pb-14"
      >
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] opacity-55">
          ↳ DATA
        </p>
        <Link
          href="/products"
          data-cursor="hover"
          className="group inline-flex items-baseline gap-2 border-b pb-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
          style={{ borderColor: "rgba(10,10,10,0.4)" }}
        >
          <span>смотреть datasheet</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
        </Link>
      </motion.div>
    </section>
  );
}
