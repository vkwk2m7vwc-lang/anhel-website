"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HonestNewspaperHero — hero стилизован под первую полосу
 * инженерной газеты.
 *
 * Логика: газета не «продаёт», она информирует. Тон совпадает с
 * бренд-позицией «честно». Поэтому весь визуал — печатный:
 *   - cream paper канвас (#f5f1e8)
 *   - чёрный текст (#0a0a0a), без цветов кроме одного синего на ссылках
 *   - газетная шапка: wordmark / выпуск / дата / город
 *   - hero-banner headline в манере «первой полосы» (тяжёлый,
 *     uppercase, плотная плотность)
 *   - под ним deck-строка одной фразой (как в WSJ / Коммерсант)
 *   - lede в две колонки (как печатная статья)
 *   - в правом нижнем углу: «Continued → каталог»
 *
 * Никакой карусели, никаких CTA-pill, никакого фото. Это первая
 * полоса. Дальше посетитель «листает» страницу — а ниже идёт
 * обычный ProductsShowcase, как продолжение каталога.
 */
export function HonestNewspaperHero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col"
      style={{ background: "#f5f1e8", color: "#0a0a0a" }}
    >
      {/* MASTHEAD — газетная шапка */}
      <header className="relative z-10 px-6 pt-24 md:px-12 md:pt-28">
        {/* Top hairline */}
        <div
          className="h-px w-full"
          style={{ background: "rgba(10,10,10,0.85)" }}
        />

        <div className="grid grid-cols-3 items-baseline py-3 md:py-4">
          {/* Left: wordmark in newspaper style */}
          <p
            className="font-display text-left"
            style={{
              fontSize: "clamp(20px, 2vw, 28px)",
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            ANHEL®
          </p>
          {/* Centre: issue number */}
          <p
            className="text-center font-mono text-[10px] uppercase tracking-[0.18em] md:text-[11px]"
            style={{ color: "rgba(10,10,10,0.65)" }}
          >
            № 01 · 2026 · ВЫПУСК ПЕРВЫЙ
          </p>
          {/* Right: city / role */}
          <p
            className="text-right font-mono text-[10px] uppercase tracking-[0.18em] md:text-[11px]"
            style={{ color: "rgba(10,10,10,0.65)" }}
          >
            СПб · МОСКВА · ИЗДАТЕЛЬ ANHEL
          </p>
        </div>

        {/* Double hairline — двойная полоса как в газете */}
        <div
          className="h-[3px] w-full border-y"
          style={{
            borderTopColor: "rgba(10,10,10,0.85)",
            borderBottomColor: "rgba(10,10,10,0.85)",
            background: "transparent",
          }}
        />

        {/* Section tag — как rubric газеты */}
        <p
          className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "rgba(10,10,10,0.55)" }}
        >
          Передовая · от издателя
        </p>
      </header>

      {/* Big banner headline */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 px-6 pt-10 font-display md:px-12 md:pt-16"
        style={{
          fontSize: "clamp(56px, 11vw, 220px)",
          fontWeight: 600,
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
        }}
      >
        ANHEL —<br />
        <span style={{ textTransform: "none", fontStyle: "italic", fontWeight: 500 }}>
          это честно.
        </span>
      </motion.h1>

      {/* Deck — strapline под headline, как в WSJ */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10 mt-6 max-w-[820px] px-6 italic md:mt-8 md:px-12"
        style={{
          fontSize: "clamp(18px, 1.6vw, 24px)",
          lineHeight: 1.4,
          color: "rgba(10,10,10,0.75)",
        }}
      >
        Бренд-позиция вместо слогана. Без рекламных мест и партнёрских наценок —
        о компании рассказывают её объекты, документы и серийные номера.
      </motion.p>

      {/* Single hairline before lede */}
      <div className="relative z-10 mx-6 mt-10 md:mx-12 md:mt-12">
        <div
          className="h-px w-full"
          style={{ background: "rgba(10,10,10,0.4)" }}
        />
      </div>

      {/* Lede in two columns — like a printed article */}
      <div className="relative z-10 mx-auto mt-8 grid w-full max-w-[1440px] grid-cols-1 gap-8 px-6 md:mt-10 md:grid-cols-2 md:gap-12 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="text-base leading-relaxed md:text-[17px]"
          style={{ color: "rgba(10,10,10,0.85)" }}
        >
          ANHEL — производитель насосных станций, индивидуальных тепловых пунктов
          и систем водоподготовки. Один цех в Москве, офис в Санкт-Петербурге.
          Серия HVS-NU собрана на той же базе, что и Альфа Stream — без наценки
          «за бренд» и без партнёрской цепочки.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="text-base leading-relaxed md:text-[17px]"
          style={{ color: "rgba(10,10,10,0.85)" }}
        >
          На этой странице — то, что можно проверить: 13 объектов с фото и
          адресами, декларации ТР ТС с серийными номерами, опросные листы в
          PDF, прямой телефон инженера. Если что-то здесь окажется неправдой —
          напишите на info@anhelspb.com, поправим за сутки.
        </motion.p>
      </div>

      {/* Bottom row — «Continued on page →» */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 mx-auto mt-auto flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-6 px-6 pb-10 pt-12 md:px-12 md:pb-14"
      >
        <p
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(10,10,10,0.5)" }}
        >
          Прокрутите вниз — каталог следует ниже
        </p>
        <Link
          href="/projects"
          data-cursor="hover"
          className="group inline-flex items-baseline gap-2 font-display"
          style={{
            fontSize: "clamp(16px, 1.4vw, 20px)",
            color: "#0a0a0a",
            borderBottom: "1.5px solid #0a0a0a",
            paddingBottom: "2px",
          }}
        >
          <span>13 объектов в архиве</span>
          <span className="font-mono transition-transform duration-200 group-hover:translate-x-1">
            ↗
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
