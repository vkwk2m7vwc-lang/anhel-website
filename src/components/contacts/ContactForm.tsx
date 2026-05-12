"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

/**
 * Форма обратной связи на странице `/contacts`.
 *
 * Поля — минимум для B2B-заявки: имя, телефон, email, сообщение.
 * Чекбокс согласия на обработку ПД обязательный (152-ФЗ) — submit
 * заблокирован, пока не отмечен. Ссылки на /privacy-policy и
 * /personal-data-consent — эти страницы появятся отдельным
 * коммитом C4 в этой же ветке `feat/pre-launch-critical-fixes`.
 *
 * Submit — пока stub: показываем «Заявка отправлена» состояние
 * без реального backend-вызова. Когда подключим Resend в отдельном
 * спринте (как для /service/request), заменим body handler.
 */
export function ContactForm() {
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    setStatus("sending");
    // TODO: integrate Resend (см. /api/questionnaire паттерн).
    // Пока — оптимистичный UX-stub, чтобы форма не молчала.
    window.setTimeout(() => setStatus("sent"), 600);
  }

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-image-placeholder)] p-8 text-[var(--color-secondary)]">
        <p className="font-display text-2xl leading-tight">Заявка отправлена</p>
        <p className="mt-3 text-sm text-[var(--color-secondary)]/70">
          Свяжемся в течение рабочего дня. Если срочно — позвоните по номеру в шапке.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <Field label="Имя" name="name" type="text" required autoComplete="name" />
      <Field
        label="Телефон"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        inputMode="tel"
      />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
      />
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          Сообщение
        </span>
        <textarea
          name="message"
          rows={4}
          className="rounded-sm border border-[var(--color-hairline)] bg-transparent px-4 py-3 text-sm text-[var(--color-secondary)] outline-none transition-colors focus:border-[var(--color-secondary)]/50"
          placeholder="Опишите задачу, объект, сроки"
        />
      </label>

      <label className="mt-2 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[var(--color-secondary)]/75">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          aria-required="true"
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--accent-water)]"
        />
        <span>
          Я даю согласие на обработку моих персональных данных в
          соответствии с{" "}
          <Link
            href="/privacy-policy"
            className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
          >
            Политикой конфиденциальности
          </Link>
          {" "}и{" "}
          <Link
            href="/personal-data-consent"
            className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
          >
            Согласием на обработку ПД
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={!consent || status === "sending"}
        data-cursor="hover"
        className="mt-2 inline-flex items-center justify-center self-start rounded-sm border border-[var(--color-secondary)] bg-[var(--color-secondary)] px-7 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-primary)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required = false,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type: "text" | "tel" | "email";
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="rounded-sm border border-[var(--color-hairline)] bg-transparent px-4 py-3 text-sm text-[var(--color-secondary)] outline-none transition-colors focus:border-[var(--color-secondary)]/50"
      />
    </label>
  );
}
