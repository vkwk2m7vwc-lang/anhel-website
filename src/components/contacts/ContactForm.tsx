"use client";

import { useState, type FormEvent } from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

/**
 * Форма обратной связи на странице `/contacts`.
 *
 * Поля — минимум для B2B-заявки: имя, телефон, email, сообщение.
 * Чекбокс согласия на обработку ПД обязательный (152-ФЗ) — submit
 * заблокирован, пока не отмечен. Ссылки на /privacy-policy и
 * /personal-data-consent.
 *
 * Submit — пока stub: показываем «Заявка отправлена» состояние
 * без реального backend-вызова. Когда подключим Resend в отдельном
 * спринте (как для /service/request), заменим body handler.
 *
 * i18n: все лейблы, плейсхолдер, кнопки, юридический consent-текст —
 * из `contacts.form.*`. ICU-сегменты разрезаны на prefix / link / and /
 * link / dot, чтобы каждый язык мог собрать предложение в естественном
 * для него порядке.
 */
export function ContactForm() {
  const t = useTranslations("contacts.form");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    setStatus("sending");
    // TODO: integrate Resend.
    window.setTimeout(() => setStatus("sent"), 600);
  }

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-image-placeholder)] p-8 text-[var(--color-secondary)]">
        <p className="font-display text-2xl leading-tight">
          {t("sent_title")}
        </p>
        <p className="mt-3 text-sm text-[var(--color-secondary)]/70">
          {t("sent_subtitle")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <Field
        label={t("fields.name")}
        name="name"
        type="text"
        required
        autoComplete="name"
      />
      <Field
        label={t("fields.phone")}
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        inputMode="tel"
      />
      <Field
        label={t("fields.email")}
        name="email"
        type="email"
        required
        autoComplete="email"
      />
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          {t("fields.message")}
        </span>
        <textarea
          name="message"
          rows={4}
          className="rounded-sm border border-[var(--color-hairline)] bg-transparent px-4 py-3 text-sm text-[var(--color-secondary)] outline-none transition-colors focus:border-[var(--color-secondary)]/50"
          placeholder={t("fields.message_placeholder")}
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
          {t("consent.prefix")}{" "}
          <Link
            href="/privacy-policy"
            className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
          >
            {t("consent.privacy_link")}
          </Link>{" "}
          {t("consent.and")}{" "}
          <Link
            href="/personal-data-consent"
            className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
          >
            {t("consent.personal_data_link")}
          </Link>
          {t("consent.dot")}
        </span>
      </label>

      <button
        type="submit"
        disabled={!consent || status === "sending"}
        data-cursor="hover"
        className="mt-2 inline-flex items-center justify-center self-start rounded-sm border border-[var(--color-secondary)] bg-[var(--color-secondary)] px-7 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-primary)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "sending" ? t("submitting") : t("submit")}
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
