"use client";

import { motion } from "framer-motion";

/**
 * Success state shown after the final "Отправить заявку" click.
 *
 * UI-only in this commit — no network request actually fires; the
 * state flip in QuizSection is a local one. When the backend commit
 * lands we'll replace the fake submit with a real fetch and show
 * this same success screen on 2xx. The restart action drops back
 * to an empty step 1 so the viewer can submit a second inquiry
 * without reloading the page.
 */
export function QuizSuccess({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 flex flex-col items-start gap-6 border-t border-[var(--color-hairline)] pt-10"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-current)]">
        Заявка принята
      </p>
      <h3 className="max-w-[620px] font-display text-[28px] font-medium leading-tight text-[var(--color-secondary)] md:text-[36px]">
        Спасибо — мы свяжемся в течение рабочего дня.
      </h3>
      <p className="max-w-[560px] text-sm leading-relaxed text-[var(--color-secondary)]/60">
        Инженер ANHEL свяжется по указанному номеру или email, уточнит
        параметры и подготовит подбор оборудования. Если данных в опросе
        хватит — пришлём предварительное КП без дополнительных вопросов.
      </p>

      <button
        type="button"
        onClick={onRestart}
        data-cursor="hover"
        className="mt-4 inline-flex items-center gap-2 border-b border-[var(--color-hairline)] pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/60 transition-colors hover:border-[var(--accent-current)] hover:text-[var(--color-secondary)]"
      >
        Отправить ещё одну заявку
        <span aria-hidden="true">→</span>
      </button>
    </motion.div>
  );
}
