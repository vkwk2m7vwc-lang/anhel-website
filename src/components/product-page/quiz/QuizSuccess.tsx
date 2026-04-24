"use client";

import { motion } from "framer-motion";
import { CONTACTS } from "@/lib/contacts";

/**
 * Mailto-confirmation panel shown after the final-step button fires.
 *
 * Until the real form backend (Resend + Telegram + Turnstile) ships,
 * the submit action opens the user's mail client with a pre-filled
 * letter to ANHEL®. We can't legitimately say «Заявка принята»
 * because no заявка has been transmitted from our side — the user
 * just sent it via their own mailbox. This panel reflects that
 * reality and doubles as a fallback for users whose browser doesn't
 * launch a mail client (hand-off to direct phone call / manual email).
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
        Открыт почтовый клиент
      </p>
      <h3 className="max-w-[620px] font-display text-[28px] font-medium leading-tight text-[var(--color-secondary)] md:text-[36px]">
        Проверьте почтовый клиент — в нём уже письмо с вашими параметрами.
      </h3>
      <p className="max-w-[620px] text-sm leading-relaxed text-[var(--color-secondary)]/60">
        Нажмите «Отправить» в почтовом клиенте — инженер ANHEL® свяжется
        по указанному номеру или email и подготовит подбор оборудования.
        Если клиент не открылся автоматически, напишите напрямую:
      </p>

      <div className="flex flex-col gap-3 font-mono text-[13px] uppercase tracking-[0.08em] md:flex-row md:gap-8">
        <a
          href={`tel:${CONTACTS.phoneTel}`}
          data-cursor="hover"
          className="inline-flex items-center gap-2 text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)]"
        >
          <span aria-hidden="true">☎</span>
          {CONTACTS.phone}
        </a>
        <a
          href={`mailto:${CONTACTS.email}`}
          data-cursor="hover"
          className="inline-flex items-center gap-2 text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)]"
        >
          <span aria-hidden="true">✉</span>
          {CONTACTS.email}
        </a>
      </div>

      <button
        type="button"
        onClick={onRestart}
        data-cursor="hover"
        className="mt-4 inline-flex items-center gap-2 border-b border-[var(--color-hairline)] pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/60 transition-colors hover:border-[var(--accent-current)] hover:text-[var(--color-secondary)]"
      >
        Заполнить ещё одну заявку
        <span aria-hidden="true">→</span>
      </button>
    </motion.div>
  );
}
