"use client";

import { useCallback, useMemo, useState } from "react";
import { Link } from "@/navigation";
import {
  VPU_ANHEL_MAX_TYPICAL_FLOW,
  type VpuModification,
} from "@/content/products/vpu-anhel-series-modifications";
import { selectVpuModification } from "@/lib/vpu-anhel-selector";

/**
 * Локализованные подписи UI быстрого подбора. Контент-агностичный
 * компонент: текстовый словарь приходит из per-locale config.
 */
export type QuickQuoteContent = {
  /** Mono tag, e.g. «02 · БЫСТРЫЙ ПОДБОР». */
  tag: string;
  title: string;
  lede: string;
  /** Label поля «Расход». */
  flowLabel: string;
  /** Placeholder поля. */
  flowPlaceholder: string;
  /** Метка единиц рядом с инпутом. */
  flowUnit: string;
  /** Состояние «Подобрано» — слева. */
  matchedTag: string;
  /** Состояние «Введите больше расхода» — initial. */
  emptyLabel: string;
  /** Состояние «Не нашли модификацию» (flow > 55.9). */
  oversizeTitle: string;
  oversizeBody: string;
  oversizeCtaLabel: string;
  oversizeCtaHref: string;
  /** CTA получить КП — primary button. */
  ctaPrimaryLabel: string;
  /** CTA опросный лист — secondary. */
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  /** Подпись разделителя «или». */
  divider: string;
  /** Контактная форма. */
  formTitle: string;
  fieldName: string;
  fieldNamePlaceholder: string;
  fieldPhone: string;
  fieldPhonePlaceholder: string;
  fieldEmail: string;
  fieldEmailPlaceholder: string;
  fieldCompany: string;
  fieldCompanyPlaceholder: string;
  fieldObject: string;
  fieldObjectPlaceholder: string;
  consentLabel: string;
  submitLabel: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorGeneric: string;
};

type Locale = "ru" | "en" | "tr";

type SubmissionState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

/**
 * «Быстрый подбор» — отдельная секция между Hero и TechSpecs.
 *
 * Поток:
 *   1. Клиент вводит расход → React state `flow`
 *   2. Реактивно вычисляется `matched` через `selectVpuModification`
 *   3. При `matched === null && flow > MAX` показывается алерт
 *      «Свяжитесь с нами», основная CTA блокируется
 *   4. Клик «Получить КП» — раскрывается контакт-форма
 *   5. Submit формы → POST /api/vpu-quote-quick →
 *      - в ответе blob PDF → автоскачивание
 *      - менеджер получает email с тем же PDF
 */
export function QuickQuoteSection({
  content,
  locale,
}: {
  content: QuickQuoteContent;
  locale: Locale;
}) {
  const [flowInput, setFlowInput] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [submission, setSubmission] = useState<SubmissionState>({ kind: "idle" });

  // Parse flow safely — поддерживаем «10», «10.5», «10,5».
  const flow = useMemo(() => {
    const normalized = flowInput.replace(",", ".").trim();
    if (!normalized) return null;
    const n = Number(normalized);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [flowInput]);

  const matched: VpuModification | null = useMemo(
    () => (flow !== null ? selectVpuModification(flow) : null),
    [flow],
  );

  const isOversize = flow !== null && flow > VPU_ANHEL_MAX_TYPICAL_FLOW;
  const canSubmit = matched !== null;

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!matched || flow === null) return;
      const form = e.currentTarget;
      const data = new FormData(form);

      const payload = {
        flow,
        customerName: String(data.get("customerName") ?? "").trim(),
        customerPhone: String(data.get("customerPhone") ?? "").trim(),
        customerEmail: String(data.get("customerEmail") ?? "").trim(),
        customerCompany: String(data.get("customerCompany") ?? "").trim(),
        objectAddress: String(data.get("objectAddress") ?? "").trim(),
        consent: form.elements.namedItem("consent") instanceof HTMLInputElement
          ? (form.elements.namedItem("consent") as HTMLInputElement).checked
          : false,
        locale,
      };

      setSubmission({ kind: "submitting" });
      try {
        const res = await fetch("/api/vpu-quote-quick", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          let message = content.errorGeneric;
          try {
            const errBody = (await res.json()) as { message?: string };
            if (errBody?.message) message = errBody.message;
          } catch {
            /* respond is binary or unparseable */
          }
          setSubmission({ kind: "error", message });
          return;
        }

        // Browser download of the PDF
        const blob = await res.blob();
        const cd = res.headers.get("Content-Disposition") ?? "";
        const fnameMatch = cd.match(/filename="([^"]+)"/);
        const filename = fnameMatch?.[1] ?? "anhel-vpu-kp.pdf";
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        setSubmission({ kind: "success" });
      } catch (err) {
        const message = err instanceof Error ? err.message : content.errorGeneric;
        setSubmission({ kind: "error", message });
      }
    },
    [matched, flow, locale, content.errorGeneric],
  );

  return (
    <section
      id="quick-quote"
      aria-labelledby="quick-quote-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="quick-quote-title"
              className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              {content.title}
            </h2>
          </div>
          <p className="max-w-[420px] text-sm text-[var(--color-secondary)]/65 md:text-right">
            {content.lede}
          </p>
        </div>

        {/* Calc + result */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {/* Flow input */}
          <div className="flex flex-col gap-3 border border-[var(--color-hairline)] p-6 md:p-8">
            <label
              htmlFor="vpu-flow-input"
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65"
            >
              {content.flowLabel}
            </label>
            <div className="flex items-baseline gap-3">
              <input
                id="vpu-flow-input"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={flowInput}
                onChange={(e) => setFlowInput(e.target.value)}
                placeholder={content.flowPlaceholder}
                className="w-full bg-transparent font-display text-4xl font-medium text-[var(--color-secondary)] tabular-nums outline-none placeholder:text-[var(--color-secondary)]/30 md:text-5xl"
              />
              <span className="font-mono text-sm uppercase tracking-[0.1em] text-[var(--color-secondary)]/55">
                {content.flowUnit}
              </span>
            </div>
            <div className="mt-2 h-px w-full bg-[var(--accent-current)]/40" />
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/50">
              0 — {VPU_ANHEL_MAX_TYPICAL_FLOW} м³/ч
            </p>
          </div>

          {/* Result panel */}
          <div className="flex flex-col gap-3 border border-[var(--color-hairline)] p-6 md:p-8">
            {!flow && (
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                {content.emptyLabel}
              </p>
            )}
            {flow !== null && matched && (
              <>
                <p
                  aria-live="polite"
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-current)]"
                >
                  {content.matchedTag}
                </p>
                <h3 className="font-display text-2xl font-medium text-[var(--color-secondary)] md:text-3xl">
                  {matched.nameRu}
                </h3>
                <p className="text-[14px] leading-relaxed text-[var(--color-secondary)]/75">
                  {matched.flowLabel[locale]} · {matched.dimensions} мм · {matched.linesCount} линий фильтрации
                </p>
              </>
            )}
            {isOversize && (
              <div
                role="alert"
                aria-live="polite"
                className="rounded-sm border border-[var(--accent-current)]/40 bg-[var(--accent-current)]/10 p-4"
              >
                <p className="font-display text-[16px] font-medium text-[var(--color-secondary)]">
                  {content.oversizeTitle}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-secondary)]/75">
                  {content.oversizeBody}
                </p>
                <Link
                  href={content.oversizeCtaHref}
                  className="mt-3 inline-block font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--accent-current)] underline-offset-4 hover:underline"
                >
                  {content.oversizeCtaLabel} →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* CTA row */}
        {!showForm && submission.kind === "idle" && (
          <div className="mt-10 flex flex-col items-start gap-3 md:mt-12 md:flex-row md:items-center md:gap-6">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              disabled={!canSubmit}
              className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-6 py-[14px] text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--accent-current)] hover:text-[var(--color-secondary)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {content.ctaPrimaryLabel}
              <span
                aria-hidden="true"
                className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              >
                →
              </span>
            </button>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50 md:inline">
              {content.divider}
            </span>
            <Link
              href={content.ctaSecondaryHref}
              className="inline-flex items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-6 py-[14px] text-sm font-medium text-[var(--color-secondary)]/85 transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
            >
              {content.ctaSecondaryLabel}
            </Link>
          </div>
        )}

        {/* Contact form — expanded after click */}
        {showForm && submission.kind !== "success" && (
          <form
            onSubmit={handleSubmit}
            className="mt-10 grid grid-cols-1 gap-5 border border-[var(--color-hairline)] p-6 md:mt-14 md:grid-cols-2 md:gap-6 md:p-10"
          >
            <h3 className="md:col-span-2 font-display text-2xl font-medium text-[var(--color-secondary)]">
              {content.formTitle}
            </h3>

            <FieldInput
              name="customerName"
              label={content.fieldName}
              placeholder={content.fieldNamePlaceholder}
              required
              autoComplete="name"
            />
            <FieldInput
              name="customerPhone"
              label={content.fieldPhone}
              placeholder={content.fieldPhonePlaceholder}
              required
              type="tel"
              autoComplete="tel"
            />
            <FieldInput
              name="customerEmail"
              label={content.fieldEmail}
              placeholder={content.fieldEmailPlaceholder}
              required
              type="email"
              autoComplete="email"
            />
            <FieldInput
              name="customerCompany"
              label={content.fieldCompany}
              placeholder={content.fieldCompanyPlaceholder}
              autoComplete="organization"
            />
            <FieldInput
              name="objectAddress"
              label={content.fieldObject}
              placeholder={content.fieldObjectPlaceholder}
              required
              className="md:col-span-2"
            />

            <label className="md:col-span-2 flex items-start gap-3 text-[13px] leading-snug text-[var(--color-secondary)]/70">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-4 w-4 accent-[var(--accent-current)]"
              />
              <span>{content.consentLabel}</span>
            </label>

            {submission.kind === "error" && (
              <p
                role="alert"
                className="md:col-span-2 rounded-sm bg-[var(--accent-current)]/10 px-4 py-2 text-[13px] text-[var(--color-secondary)]"
              >
                <strong>{content.errorTitle}:</strong> {submission.message}
              </p>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submission.kind === "submitting"}
                className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-6 py-[14px] text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--accent-current)] hover:text-[var(--color-secondary)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submission.kind === "submitting"
                  ? content.submitting
                  : content.submitLabel}
                <span
                  aria-hidden="true"
                  className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>
          </form>
        )}

        {submission.kind === "success" && (
          <div className="mt-10 border border-[var(--accent-current)] bg-[var(--accent-current)]/5 p-6 md:mt-14 md:p-10">
            <h3 className="font-display text-2xl font-medium text-[var(--color-secondary)]">
              {content.successTitle}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-secondary)]/80">
              {content.successBody}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function FieldInput({
  name,
  label,
  placeholder,
  required,
  type,
  autoComplete,
  className,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type ?? "text"}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="border-b border-[var(--color-hairline)] bg-transparent py-2 text-[15px] text-[var(--color-secondary)] outline-none transition-colors placeholder:text-[var(--color-secondary)]/30 focus:border-[var(--accent-current)]"
      />
    </label>
  );
}
