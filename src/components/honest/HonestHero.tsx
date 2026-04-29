"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * HonestHero — hero под бренд-позицию «ANHEL — это честно».
 *
 * Визуальный посыл: anti-marketing. Никаких glitter-эффектов,
 * никаких герой-картинок продукта, никакой карусели. Только
 * заголовок и тихая мета-строка.
 *
 * Композиция:
 *   - top-left: tiny mono ANHEL® + место + год
 *   - top-right: «См. ниже» + scroll arrow
 *   - центр: «ANHEL — / это честно.» в две строки, монументально,
 *     но без editorial гимнастики (line-height 0.95, tracking -0.04)
 *   - под заголовком тонкий разделитель + одна строка дисклейма:
 *     «Без слоганов, рекламы и партнёрских программ. Только то,
 *     что можно проверить.»
 *   - bottom: 4 анкера на проверяемые факты ниже (счётчики).
 *
 * Канвас всегда тёмный — для «честно» нужен максимальный контраст,
 * не «приятная картинка». Хардкод `#0a0a0a` + `#f5f5f3` локально
 * вне зависимости от глобальной темы — секция как «полоска чёрной
 * газетной бумаги» внутри сайта.
 */
export function HonestHero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: "#0a0a0a", color: "#f5f5f3" }}
    >
      {/* Top mono — место + год + заглушка цели */}
      <div className="relative z-10 flex items-start justify-between gap-6 px-6 pt-28 md:px-12 md:pt-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          ANHEL® · СПб · Москва · с 2018
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          href="#proof"
          className="hidden font-mono text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-100 md:inline-flex md:items-center md:gap-2"
        >
          <span>проверьте ↓</span>
        </motion.a>
      </div>

      {/* Centre — заголовок. Em-dash работает как «слово
          говорящего»: «ANHEL — это честно». Не «лучшие на рынке».
          Не «революционные». Просто факт о посадке бренда. */}
      <div className="relative z-10 flex flex-1 items-center px-6 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-display"
          style={{
            fontSize: "clamp(56px, 11vw, 220px)",
            fontWeight: 500,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
          }}
        >
          ANHEL —<br />
          <span className="italic font-normal">это честно.</span>
        </motion.h1>
      </div>

      {/* Под-заголовок — одна строка дисклейма + hairline */}
      <div className="relative z-10 px-6 md:px-12">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="origin-left"
          style={{
            height: "1px",
            background: "rgba(245, 245, 243, 0.18)",
            maxWidth: "560px",
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-6 max-w-[560px] text-base leading-relaxed md:text-lg"
        >
          Без слоганов, рекламных мест и партнёрских программ. Только то, что можно проверить.
        </motion.p>
      </div>

      {/* Bottom row — 4 «обещания» в виде счётчиков-анкеров.
          Каждое — number + label, при клике скроллит к
          соответствующему пункту в HonestFacts. Это не features —
          это стороны ответа на «почему честно». */}
      <div className="relative z-10 mt-16 grid grid-cols-2 gap-px border-t border-[rgba(245,245,243,0.18)] md:mt-24 md:grid-cols-4">
        {ANCHORS.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 1.1 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={a.href}
              data-cursor="hover"
              className="group block px-6 py-8 transition-colors hover:bg-[rgba(245,245,243,0.04)] md:px-8 md:py-10"
            >
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(40px, 5vw, 72px)",
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                }}
              >
                {a.big}
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.16em] opacity-65 group-hover:opacity-100">
                {a.label}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const ANCHORS: Array<{ big: string; label: string; href: string }> = [
  {
    big: "1",
    label: "Завод. В Москве",
    href: "#fact-factory",
  },
  {
    big: "30",
    label: "лет — это срок службы",
    href: "#fact-lifecycle",
  },
  {
    big: "13",
    label: "объектов с фото и адресом",
    href: "#fact-portfolio",
  },
  {
    big: "0",
    label: "наценок «за бренд»",
    href: "#fact-pricing",
  },
];
