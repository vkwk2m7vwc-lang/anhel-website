'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Send, Check } from 'lucide-react';
import {
  FORM_STEPS,
  FORM_STORAGE_KEY,
  ALL_FIELD_NAMES,
  type FormField,
  type FormStep,
} from '@/content/service/form-config';
import { useTranslatedServiceSteps } from './useTranslatedServiceSteps';

/** Validation `t(key, vars?)` shape — shared across translation namespaces. */
type Tfn = (key: string, vars?: Record<string, string | number>) => string;

/**
 * Multistep-форма заявки на сервисное обслуживание.
 *
 * Визуальный язык один-в-один с `/quiz/pumps` (на main quiz пока в WIP-ветке;
 * стиль мы реплицируем в собственном самодостаточном компоненте, без
 * react-hook-form/zod, чтобы не тащить зависимости в main):
 *   • Тонкая полоса прогресса + маркеры-точки с акцентом активного шага.
 *   • Live-проценты по доле заполненных полей в текущем шаге.
 *   • Floating-label инпуты: только нижняя hairline, прозрачный фон.
 *   • Sticky-навигация снизу: ghost-back и filled-next/submit.
 *   • Секции (если их > 1 на шаге) разделяются hairline-top + заголовком.
 *
 * Поведение:
 *   • localStorage хранит значения и текущий шаг (ключ `anhel-service-request-v1`).
 *   • Валидация — на «Далее»: required + email/tel regex + min length для problem.
 *   • Заглушка submit: 700 ms → success-стейт → через 1.6 с redirect на
 *     `/service?submitted=1`.
 *
 * Когда WIP-ветка `feat/web-questionnaire-pumps` сольётся в main — эту форму
 * можно либо оставить (semantically service ≠ quiz), либо рефакторнуть на
 * общий QuizShell.
 */

type Values = Record<string, string | boolean>;
type Errors = Record<string, string | undefined>;

const TEL_REGEX = /^\+?[\d\s()\-]{10,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emptyValues(): Values {
  const v: Values = {};
  for (const name of ALL_FIELD_NAMES) v[name] = false;
  for (const step of FORM_STEPS) {
    for (const field of step.fields) {
      if (field.kind !== 'checkbox') v[field.name] = '';
    }
  }
  return v;
}

function validateField(
  field: FormField,
  value: string | boolean,
  tValidation: Tfn,
): string | undefined {
  if (field.kind === 'checkbox') {
    if (field.required && value !== true) return tValidation('consent_required');
    return undefined;
  }
  const str = typeof value === 'string' ? value.trim() : '';
  if (field.required && !str) return tValidation('field_required');
  if (!str) return undefined;
  if (field.kind === 'tel' && !TEL_REGEX.test(str)) return tValidation('phone_format');
  if (field.kind === 'email' && !EMAIL_REGEX.test(str)) return tValidation('email_format');
  if (field.kind === 'textarea' && field.minLength && str.length < field.minLength) {
    return tValidation('min_length', { min: field.minLength, actual: str.length });
  }
  return undefined;
}

function validateStep(
  step: FormStep,
  values: Values,
  tValidation: Tfn,
): Errors {
  const errs: Errors = {};
  for (const f of step.fields) {
    const e = validateField(f, values[f.name], tValidation);
    if (e) errs[f.name] = e;
  }
  return errs;
}

/** Заполнено ли поле — для счётчика прогресса. */
function isFilled(field: FormField, value: string | boolean): boolean {
  if (field.kind === 'checkbox') return value === true;
  return typeof value === 'string' && value.trim() !== '';
}

/** Live-прогресс: пройденные шаги + доля заполненности текущего шага. */
function computeProgress(stepIdx: number, step: FormStep, values: Values): number {
  const total = FORM_STEPS.length;
  if (total === 0) return 0;
  const stepWeight = 100 / total;
  const base = stepIdx * stepWeight;
  if (step.fields.length === 0) {
    // Финальный шаг (review) — пройден сразу как зашли
    return Math.round(base + stepWeight);
  }
  const filled = step.fields.filter((f) => isFilled(f, values[f.name])).length;
  const fraction = filled / step.fields.length;
  return Math.round(base + fraction * stepWeight);
}

export function ServiceRequestForm() {
  const router = useRouter();
  const t = useTranslations('service.request_form');
  const tValidation = useTranslations('quiz.shell.validation') as unknown as Tfn;
  const localizedSteps = useTranslatedServiceSteps();
  const [values, setValues] = useState<Values>(emptyValues);
  const [stepIdx, setStepIdx] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'done'>('idle');
  const restoredRef = useRef(false);

  // === Restore from localStorage ===
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const raw = window.localStorage.getItem(FORM_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { values?: Values; stepIdx?: number };
      if (parsed.values && typeof parsed.values === 'object') {
        setValues((prev) => ({ ...prev, ...parsed.values }));
      }
      if (
        typeof parsed.stepIdx === 'number' &&
        parsed.stepIdx >= 0 &&
        parsed.stepIdx < FORM_STEPS.length
      ) {
        setStepIdx(parsed.stepIdx);
        setVisited(new Set(Array.from({ length: parsed.stepIdx + 1 }, (_, i) => i)));
      }
    } catch {
      /* битый JSON — игнорируем */
    }
  }, []);

  // === Persist on every change ===
  useEffect(() => {
    if (!restoredRef.current) return;
    try {
      window.localStorage.setItem(
        FORM_STORAGE_KEY,
        JSON.stringify({ values, stepIdx }),
      );
    } catch {
      /* quota / private mode */
    }
  }, [values, stepIdx]);

  const step = localizedSteps[stepIdx];
  const isLast = stepIdx === localizedSteps.length - 1;
  const pct = computeProgress(stepIdx, step, values);

  const setFieldValue = useCallback((name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleNext = useCallback(() => {
    const errs = validateStep(step, values, tValidation);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const nextIdx = stepIdx + 1;
    if (nextIdx >= FORM_STEPS.length) return;
    setVisited((prev) => new Set(prev).add(nextIdx));
    setStepIdx(nextIdx);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, stepIdx, values, tValidation]);

  const handlePrev = useCallback(() => {
    if (stepIdx === 0) return;
    setErrors({});
    setStepIdx(stepIdx - 1);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepIdx]);

  const handleSubmit = useCallback(() => {
    const allErrs: Errors = {};
    for (const s of localizedSteps)
      Object.assign(allErrs, validateStep(s, values, tValidation));
    if (Object.keys(allErrs).length > 0) {
      setErrors(allErrs);
      const firstErrStep = localizedSteps.find((s) =>
        s.fields.some((f) => allErrs[f.name]),
      );
      if (firstErrStep) setStepIdx(firstErrStep.index);
      return;
    }
    setSubmitState('submitting');
    setTimeout(() => {
      setSubmitState('done');
      try {
        window.localStorage.removeItem(FORM_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setTimeout(() => router.push('/service?submitted=1'), 1600);
    }, 700);
  }, [values, router, localizedSteps, tValidation]);

  const goToStep = useCallback(
    (idx: number) => {
      if (!visited.has(idx) || idx === stepIdx) return;
      setErrors({});
      setStepIdx(idx);
    },
    [visited, stepIdx],
  );

  return (
    <div className="mx-auto w-full max-w-[840px] px-6 pb-24 pt-20 md:px-12 md:pb-32 md:pt-28">
      {/* === Header === */}
      <p className="mono-tag">{t('tag')}</p>
      <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] md:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-[var(--color-secondary)]/65 md:mt-5 md:text-[15px]">
        {t('subtitle')}
      </p>

      {/* === Progress: тонкая линия + точки === */}
      <div className="mt-8 md:mt-14">
        {/* Тонкая полоса */}
        <div className="relative h-px w-full bg-[var(--color-hairline)]">
          <div
            className="absolute left-0 top-0 h-full bg-[var(--color-secondary)] transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Маркеры.
            7 шагов в 360 px — каждая метка едва ли 50 px шириной, точка
            6 px ловится только в перчатках. Увеличиваем min-h до 44 px,
            а сам пятачок остаётся декоративным — фактический tap-target
            теперь весь столбик. */}
        <div className="mt-5 flex items-start justify-between gap-1">
          {localizedSteps.map((s, i) => {
            const active = i === stepIdx;
            const isVisited = visited.has(i);
            const clickable = isVisited && !active;
            return (
              <button
                key={s.index}
                type="button"
                disabled={!clickable}
                onClick={() => clickable && goToStep(i)}
                aria-current={active ? 'step' : undefined}
                aria-label={t('step_aria', { current: i + 1, title: s.title })}
                className={
                  'group relative flex min-h-11 flex-1 flex-col items-start py-1 text-left transition-colors ' +
                  (clickable ? 'cursor-pointer' : 'cursor-default')
                }
              >
                <span
                  aria-hidden="true"
                  className={
                    'mb-2 inline-block h-1.5 w-1.5 rounded-full transition-colors ' +
                    (active
                      ? 'bg-[var(--color-secondary)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-secondary)_20%,transparent)]'
                      : isVisited
                      ? 'bg-[var(--color-secondary)]'
                      : 'bg-[var(--color-hairline)]')
                  }
                />
                <span
                  className={
                    'hidden text-[10px] font-medium uppercase tracking-[0.08em] sm:inline-block ' +
                    (active
                      ? 'text-[var(--color-secondary)]'
                      : isVisited
                      ? 'text-[var(--color-secondary)]/65'
                      : 'text-[var(--color-secondary)]/30')
                  }
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          <span>
            {t('step_of', {
              current: stepIdx + 1,
              total: localizedSteps.length,
            })}
          </span>
          <span className="text-[var(--color-secondary)]/85">{pct}%</span>
        </div>
      </div>

      {/* === Submit success === */}
      <AnimatePresence>
        {submitState === 'done' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 border-t border-[var(--color-hairline)] pt-8"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-secondary)]/40 text-[var(--color-secondary)]">
                <Check size={18} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-2xl font-medium">
                  {t('success_title')}
                </p>
                <p className="mt-3 max-w-[520px] text-sm leading-relaxed text-[var(--color-secondary)]/70 md:text-[15px]">
                  {t('success_body')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Step content === */}
      {submitState !== 'done' && (
        <AnimatePresence mode="wait">
          <motion.section
            key={step.index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 border-t border-[var(--color-hairline)] pt-8 md:mt-16 md:pt-12"
            aria-labelledby={`step-${step.index}-title`}
          >
            <p className="mono-tag">
              {t('step_short', {
                current: stepIdx + 1,
                total: localizedSteps.length,
              })}
            </p>
            <h2
              id={`step-${step.index}-title`}
              className="mt-4 font-display text-3xl font-medium leading-tight md:text-4xl"
            >
              {step.title}
            </h2>
            {step.description && (
              <p className="mt-4 max-w-[640px] text-sm leading-relaxed text-[var(--color-secondary)]/65 md:mt-5 md:text-[15px]">
                {step.description}
              </p>
            )}

            {step.fields.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 md:mt-12">
                {step.fields.map((field) => (
                  <FieldRow
                    key={field.name}
                    field={field}
                    value={values[field.name]}
                    error={errors[field.name]}
                    onChange={setFieldValue}
                  />
                ))}
              </div>
            )}

            {isLast && (
              <ReviewSummary values={values} steps={localizedSteps} />
            )}
          </motion.section>
        </AnimatePresence>
      )}

      {/* === Sticky bottom navigation === */}
      {submitState !== 'done' && (
        <div className="sticky bottom-0 z-20 -mx-6 mt-10 flex items-center justify-between gap-4 border-t border-[var(--color-hairline)] bg-[var(--color-primary)]/85 px-6 py-3 backdrop-blur md:mt-14 md:px-12 md:py-4 md:-mx-12">
          <button
            type="button"
            onClick={handlePrev}
            disabled={stepIdx === 0}
            className={
              // min-h-11 — кнопка «Назад» в sticky-нав уходила в ~32px,
              // на 360 px дельта между Назад и Далее визуально кричала.
              'inline-flex min-h-11 items-center gap-2 px-3 py-2 text-sm transition-colors ' +
              (stepIdx === 0
                ? 'cursor-not-allowed text-[var(--color-secondary)]/30'
                : 'text-[var(--color-secondary)]/75 hover:text-[var(--color-secondary)]')
            }
          >
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
            {t('back')}
          </button>

          {!isLast ? (
            <button
              type="button"
              onClick={handleNext}
              data-cursor="hover"
              className="group inline-flex min-h-11 items-center gap-2 border border-[var(--color-secondary)] bg-[var(--color-secondary)] px-5 py-2.5 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-transparent hover:text-[var(--color-secondary)]"
            >
              {t('next')}
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitState === 'submitting'}
              data-cursor="hover"
              className="group inline-flex min-h-11 items-center gap-2 border border-[var(--color-secondary)] bg-[var(--color-secondary)] px-5 py-2.5 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-transparent hover:text-[var(--color-secondary)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitState === 'submitting' ? t('submitting') : t('submit')}
              <Send size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {/* Cancel link */}
      {submitState === 'idle' && (
        <p className="mt-6 text-center text-xs text-[var(--color-secondary)]/55">
          {t('cancel_pre')}
          <Link
            href="/service"
            className="underline-offset-2 hover:text-[var(--color-secondary)] hover:underline"
          >
            {t('cancel_link')}
          </Link>
        </p>
      )}
    </div>
  );
}

/**
 * Поле формы: статичный mono-cap label сверху + input/textarea с серым
 * placeholder в строке. Подсказка-пример видна сразу как plain placeholder
 * (в духе обычных B2B-форм). Hint (если есть) — мелким текстом ниже.
 *
 * Стиль самого input повторяет TextField из quiz-ветки: только нижняя
 * hairline, прозрачный фон, фокус усиливает линию.
 */
function FieldRow({
  field,
  value,
  error,
  onChange,
}: {
  field: FormField;
  value: string | boolean;
  error: string | undefined;
  onChange: (name: string, value: string | boolean) => void;
}) {
  const tShell = useTranslations('quiz.shell');
  const id = `field-${field.name}`;
  const errorId = error ? `${id}-error` : undefined;
  const hintId = field.hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  // === Checkbox — отдельный layout, всегда full-width ===
  if (field.kind === 'checkbox') {
    const checked = value === true;
    return (
      <label
        htmlFor={id}
        className="col-span-full flex cursor-pointer items-start gap-3 border-t border-[var(--color-hairline)] py-4 first:border-t-0"
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          required={field.required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(field.name, e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-secondary)]"
        />
        <span className="text-sm leading-relaxed text-[var(--color-secondary)]/85 md:text-[15px]">
          {field.name === 'consent_pd' ? (
            <>
              {tShell('consent_privacy_pre')}
              <Link
                href="/privacy-policy"
                className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
              >
                {tShell('consent_privacy')}
              </Link>
              {tShell('consent_and')}
              <Link
                href="/personal-data-consent"
                className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
              >
                {tShell('consent_data')}
              </Link>
              {tShell('urgent_dot')}
            </>
          ) : (
            field.label
          )}
          {field.required && (
            <span aria-hidden="true" className="ml-1 text-[var(--color-secondary)]/55">
              *
            </span>
          )}
        </span>
        {error && <FieldError id={errorId!} message={error} className="ml-auto" />}
      </label>
    );
  }

  // === Textarea / Input ===
  const colClass = field.width === 'full' ? 'sm:col-span-2' : 'sm:col-span-1';
  const isTextarea = field.kind === 'textarea';

  const inputClass =
    'block w-full bg-transparent pb-2 pt-1 text-sm text-[var(--color-secondary)] outline-none placeholder:text-[var(--color-secondary)]/30 md:text-[15px]';

  return (
    <div className={`${colClass} pt-3 pb-4`}>
      <label
        htmlFor={id}
        className="mb-3 block font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/65"
      >
        {field.label}
        {field.required && (
          <span aria-hidden="true" className="ml-1 text-[var(--color-secondary)]/45">
            *
          </span>
        )}
      </label>
      <div
        className={
          'border-b transition-colors ' +
          (error
            ? 'border-[var(--accent-fire)]'
            : 'border-[var(--color-hairline)] focus-within:border-[var(--color-secondary)]')
        }
      >
        {isTextarea ? (
          <textarea
            id={id}
            value={typeof value === 'string' ? value : ''}
            required={field.required}
            placeholder={field.placeholder}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={describedBy}
            onChange={(e) => onChange(field.name, e.target.value)}
            rows={4}
            className={`${inputClass} min-h-[7rem] resize-y leading-relaxed`}
          />
        ) : (
          <input
            id={id}
            type={
              field.kind === 'tel'
                ? 'tel'
                : field.kind === 'email'
                ? 'email'
                : field.kind === 'date'
                ? 'date'
                : 'text'
            }
            value={typeof value === 'string' ? value : ''}
            required={field.required}
            placeholder={field.placeholder}
            autoComplete={
              field.kind === 'email' ? 'email' : field.kind === 'tel' ? 'tel' : 'off'
            }
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={describedBy}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={`${inputClass} h-11`}
          />
        )}
      </div>
      {field.hint && (
        <p id={hintId} className="mt-2 text-xs text-[var(--color-secondary)]/55">
          {field.hint}
        </p>
      )}
      {error && <FieldError id={errorId!} message={error} className="mt-2" />}
    </div>
  );
}

function FieldError({
  id,
  message,
  className,
}: {
  id: string;
  message: string;
  className?: string;
}) {
  return (
    <p
      id={id}
      role="alert"
      className={`text-xs text-[var(--accent-fire)] ${className ?? ''}`}
    >
      {message}
    </p>
  );
}

/** Превью на последнем шаге — все шаги/поля списком. */
function ReviewSummary({
  values,
  steps,
}: {
  values: Values;
  steps: readonly FormStep[];
}) {
  const tShell = useTranslations('quiz.shell');
  const yesLabel = tShell('yes_short');
  const grouped = useMemo(
    () =>
      steps
        .filter((s) => s.fields.length > 0)
        .map((s) => ({
          step: s,
          rows: s.fields.map((f) => {
            const raw = values[f.name];
            let display = '';
            if (f.kind === 'checkbox') {
              display = raw === true ? yesLabel : '—';
            } else {
              display = typeof raw === 'string' && raw.trim() ? raw : '—';
            }
            return { field: f, display };
          }),
        })),
    [steps, values, yesLabel],
  );

  return (
    <div className="mt-10 space-y-10 md:mt-12">
      {grouped.map(({ step, rows }) => (
        <div key={step.index} className="border-t border-[var(--color-hairline)] pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
            {step.index + 1} · {step.title}
          </p>
          <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {rows.map(({ field, display }) => (
              <div key={field.name}>
                <dt className="text-xs text-[var(--color-secondary)]/55 md:text-sm">
                  {field.label}
                </dt>
                <dd className="mt-1 text-sm text-[var(--color-secondary)]/90 md:text-[15px]">
                  {display}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
