"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HonestMozhnoHero — hero с мемным бренд-заголовком
 * «ANHEL, можно а зачем».
 *
 * Это отсылка к народному мему про Ладу — на любой вопрос
 * «можно ли это сделать?» ответ «можно, а зачем». Российская
 * прагматичная самоирония: зачем украшательства, если задача —
 * чтобы насос качал воду тридцать лет.
 *
 * Дизайн соответствует тону шутки — намеренно простой:
 *   - white-paper канвас (не cream, не cinematic — самый обычный)
 *   - чёрный текст без accent
 *   - заголовок плотным sans, прямо, без декорации
 *   - запятая в заголовке — ключевая. Она читается как пауза-вздох
 *     перед «а зачем»
 *   - под ним короткий ответ-pun-back в курсиве: пояснение, на
 *     случай если посетитель не словил отсылку
 *   - в углу мини-asterisk с ссылкой на источник мема
 *   - в нижнем ряду пара тихих линков — каталог + контакт
 *
 * Никакой иронии в продуктах — стиль ROM/ассамблер/работающее
 * железо. Шутка только в позиции бренда; продукты от этого
 * не страдают.
 */
export function HonestMozhnoHero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col"
      style={{ background: "#fafafa", color: "#0a0a0a" }}
    >
      {/* Top mono caption */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-28 md:px-12 md:pt-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          ANHEL® · СПб · Москва · с 2018
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden font-mono text-[10px] uppercase tracking-[0.18em] md:block"
        >
          бренд-позиция · 2026
        </motion.p>
      </div>

      {/* Centre — заголовок + пояснение */}
      <div className="relative z-10 flex flex-1 items-center px-6 md:px-12">
        <div className="w-full max-w-[1280px] mx-auto">
          {/* Заголовок. Запятая делает шутку — «ANHEL, [пауза]
              можно а зачем». Без запятой посыл другой. */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{
              fontSize: "clamp(48px, 9vw, 168px)",
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            ANHEL,{" "}
            <span className="opacity-60">можно</span>
            <br />
            <span className="italic font-medium">а зачем</span>
            <span style={{ color: "rgba(10,10,10,0.4)" }}>.*</span>
          </motion.h1>

          {/* Pun-back: пояснение для тех, кто не словил отсылку */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 max-w-[640px] md:mt-16"
          >
            <p
              className="text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(10,10,10,0.85)" }}
            >
              Можно сделать «инновационное решение из будущего». Можно
              «революционные технологии». Можно ребрендинг с круглыми
              иконками и слоганом про экосистему.
            </p>
            <p
              className="mt-4 text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(10,10,10,0.85)" }}
            >
              А можно собрать насосную станцию, которая будет качать
              воду тридцать лет. Мы выбрали второе.
            </p>
          </motion.div>

          {/* Footnote — расшифровка asterisk */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-10 max-w-[560px] font-mono text-[10px] uppercase leading-[1.7] tracking-[0.16em] md:mt-14"
          >
            * Народная цитата времён ВАЗ-2106 — про инженерный прагматизм
            против маркетингового излишества.
          </motion.p>
        </div>
      </div>

      {/* Bottom row — два тихих линка */}
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6 border-t border-[rgba(10,10,10,0.12)] px-6 pb-10 pt-8 md:px-12 md:pb-14 md:pt-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="font-mono text-[10px] uppercase leading-[1.6] tracking-[0.16em]"
        >
          Без слоганов про экосистему · 13 объектов с фото и адресом
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="flex flex-wrap gap-x-10 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em]"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
