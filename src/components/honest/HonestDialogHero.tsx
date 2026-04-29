"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HonestDialogHero — hero в формате диалога Q&A.
 *
 * Идея: «честно» это не дизайн-приём, это тон. Тон проще всего
 * показать через речь. Диалог инженера с заказчиком, где финальная
 * реплика — это бренд-position.
 *
 *   — Что вы делаете?
 *   — Насосные станции, ИТП, водоподготовку.
 *   — А что лучшего?
 *   — Ничего. ANHEL — это честно.
 *
 * Вопросы (Q) набраны в font-mono на opacity 50% — это «голос
 * другого». Ответы (A) — font-display, полная плотность. Em-dash
 * выровнен по левому краю единой колонкой, как в книге диалогов.
 *
 * Финальная реплика выбита в отдельный блок: больше всех остальных,
 * с italic-акцентом на «честно» и accent-color (water-blue).
 *
 * Никаких иллюстраций, никакой карусели, никакого фото. Только
 * речь — это и есть «честно».
 */
export function HonestDialogHero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: "#0a0a0a", color: "#f5f5f3" }}
    >
      {/* Top mono caption */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-28 md:px-12 md:pt-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          ANHEL® · СПб · Москва · с 2018
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden font-mono text-[10px] uppercase tracking-[0.18em] md:inline"
        >
          разговор · не реклама
        </motion.p>
      </div>

      {/* Centre — диалог, em-dash на левом краю */}
      <div className="relative z-10 flex flex-1 items-center px-6 md:px-12">
        <div className="w-full max-w-[1200px] mx-auto">
          {DIALOG.map((line, i) => (
            <Line key={i} line={line} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom — два тихих линка */}
      <div className="relative z-10 flex items-end justify-between gap-6 px-6 pb-10 md:px-12 md:pb-14">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="font-mono text-[10px] uppercase leading-[1.6] tracking-[0.16em]"
        >
          Если есть свой вопрос — пришлите на info@anhelspb.com
          <br />
          Отвечает инженер.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.6 }}
          className="flex flex-col items-end gap-3 font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          <Link
            href="/products"
            data-cursor="hover"
            className="group inline-flex items-baseline gap-2 border-b border-[rgba(245,245,243,0.4)] pb-1 transition-colors hover:border-[rgba(245,245,243,0.9)]"
          >
            <span>посмотреть каталог</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

type LineKind = "q" | "a" | "final";
type DialogLine = { kind: LineKind; text: string };

const DIALOG: DialogLine[] = [
  { kind: "q", text: "Что вы делаете?" },
  { kind: "a", text: "Насосные станции. ИТП. Водоподготовку." },
  { kind: "q", text: "А что лучшего?" },
  { kind: "final", text: "Ничего. ANHEL — это честно." },
];

function Line({ line, index }: { line: DialogLine; index: number }) {
  // Каждая реплика появляется через 0.5s после предыдущей —
  // ритм разговора, не списка. Q короче, A — длиннее dwell.
  const delay = 0.6 + index * 0.55;

  if (line.kind === "q") {
    // Вопрос — голос «другого». Mono, dim, средний размер.
    return (
      <motion.p
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono"
        style={{
          fontSize: "clamp(18px, 2vw, 28px)",
          lineHeight: 1.4,
          letterSpacing: "0.02em",
          marginBottom: "0.6em",
        }}
      >
        — {line.text}
      </motion.p>
    );
  }

  if (line.kind === "a") {
    // Ответ — голос ANHEL. Display, полная плотность, крупно.
    return (
      <motion.p
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 0.95, x: 0 }}
        transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
        className="font-display"
        style={{
          fontSize: "clamp(28px, 4vw, 64px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          fontWeight: 500,
          marginBottom: "1.5em",
        }}
      >
        — {line.text}
      </motion.p>
    );
  }

  // Final — финальная реплика, бренд-position.
  // Больше всех остальных, с accent-color на ключевом слове.
  return (
    <motion.p
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="font-display"
      style={{
        fontSize: "clamp(40px, 7vw, 132px)",
        lineHeight: 0.98,
        letterSpacing: "-0.035em",
        fontWeight: 500,
      }}
    >
      — Ничего.{" "}
      <span style={{ color: "var(--accent-water)" }}>
        ANHEL — это{" "}
        <span className="italic font-normal">честно.</span>
      </span>
    </motion.p>
  );
}
