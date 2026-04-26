'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import {
  FORM_STEPS,
  FORM_STORAGE_KEY,
  ALL_FIELD_NAMES,
  type FormField,
  type FormStep,
} from '@/content/service/form-config';

/**
 * Multistep-форма заявки на сервисное обслуживание.
 *
 * Архитектура — нативный React state без react-hook-form/zod, потому что
 * на main quiz-инфраструктуры пока нет (она в параллельной WIP-ветке
 * `feat/web-questionnaire-pumps`). Когда WIP-ветка сольётся, эту форму
 * можно будет либо оставить отдельной (service ≠ quiz по семантике),
 * либо мигрировать на общий QuizShell.
 *
 * Поведение:
 *   - 9 шагов (0..8), последний — превью + submit. Заглушка отправки:
 *     сохраняем в storage, показываем success-state, спустя 1.6 сек —
 *     redirect на /service?submitted=1.
 *   - localStorage сохраняет values + текущий step на каждом изменении,
 *     восстанавливается при возврате (ключ — `anhel-service-request-v1`).
 *   - Валидация прогоняется при попытке «Далее» — выводит ошибки под
 *     полями. Для tel/email — regex; для problem_description — minLength 50.
 *   - Прогресс-бар сверху с номерами шагов; на md+ кликабелен только до
 *     уже пройденных шагов (как в quiz/pumps).
 *
 * Темы — дизайн-токены через CSS-vars (как везде в проекте). Никакой
 * темы-специфичной логики тут нет.
 */

type Values = Record<string, string | boolean>;
type Errors = Record<string, string | undefined>;

const TEL_REGEX = /^\+?[\d\s()\-]{10,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emptyValues(): Values {
  const v: Values = {};
  for (const name of ALL_FIELD_NAMES) {
    // Чекбоксы — boolean, остальное — строка (включая date).
    v[name] = false;
  }
  // Не-чекбоксы инициализируем пустой строкой
  for (const step of FORM_STEPS) {
    for (const field of step.fields) {
      if (field.kind !== 'checkbox') v[field.name] = '';
    }
  }
  return v;
}

/** Валидация одного поля. Возвращает текст ошибки или undefined. */
function validateField(field: FormField, value: string | boolean): string | undefined {
  if (field.kind === 'checkbox') {
    if (field.required && value !== true) return 'Необходимо согласие';
    return undefined;
  }
  const str = typeof value === 'string' ? value.trim() : '';
  if (field.required && !str) return 'Поле обязательно';
  if (!str) return undefined;

  if (field.kind === 'tel' && !TEL_REGEX.test(str)) return 'Похоже на некорректный номер';
  if (field.kind === 'email' && !EMAIL_REGEX.test(str)) return 'Некорректный e-mail';
  if (field.kind === 'textarea' && field.minLength && str.length < field.minLength) {
    return `Минимум ${field.minLength} символов (введено ${str.length})`;
  }
  return undefined;
}

/** Валидация целого шага. Возвращает map имя→ошибка. */
function validateStep(step: FormStep, values: Values): Errors {
  const errs: Errors = {};
  for (const f of step.fields) {
    const e = validateField(f, values[f.name]);
    if (e) errs[f.name] = e;
  }
  return errs;
}

export function ServiceRequestForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(emptyValues);
  const [stepIdx, setStepIdx] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'done'>('idle');
  const restoredRef = useRef(false);

  // === Restore from localStorage on mount ===
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
      if (typeof parsed.stepIdx === 'number' && parsed.stepIdx >= 0 && parsed.stepIdx < FORM_STEPS.length) {
        setStepIdx(parsed.stepIdx);
        setVisited(new Set(Array.from({ length: parsed.stepIdx + 1 }, (_, i) => i)));
      }
    } catch {
      // битый JSON — игнорируем
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
      // quota / private mode — игнорируем
    }
  }, [values, stepIdx]);

  const step = FORM_STEPS[stepIdx];
  const isLast = stepIdx === FORM_STEPS.length - 1;

  const setFieldValue = useCallback((name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Очищаем ошибку поля при изменении — пользователь не должен видеть
    // красное, пока перепечатывает.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleNext = useCallback(() => {
    const errs = validateStep(step, values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const nextIdx = stepIdx + 1;
    if (nextIdx >= FORM_STEPS.length) return;
    setVisited((prev) => new Set(prev).add(nextIdx));
    setStepIdx(nextIdx);
    // Скролл к началу секции — длинные шаги уезжают.
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step, stepIdx, values]);

  const handlePrev = useCallback(() => {
    if (stepIdx === 0) return;
    setErrors({});
    setStepIdx(stepIdx - 1);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [stepIdx]);

  const handleSubmit = useCallback(() => {
    // Прогоним валидацию по всем шагам — на случай, если пользователь
    // вернулся назад и что-то стёр.
    const allErrs: Errors = {};
    for (const s of FORM_STEPS) {
      Object.assign(allErrs, validateStep(s, values));
    }
    if (Object.keys(allErrs).length > 0) {
      setErrors(allErrs);
      // Уведём на первый шаг с ошибкой
      const firstErrStep = FORM_STEPS.find((s) =>
        s.fields.some((f) => allErrs[f.name]),
      );
      if (firstErrStep) setStepIdx(firstErrStep.index);
      return;
    }
    setSubmitState('submitting');
    // Заглушка — реальная отправка через Resend будет отдельной задачей.
    setTimeout(() => {
      setSubmitState('done');
      try {
        window.localStorage.removeItem(FORM_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setTimeout(() => {
        router.push('/service?submitted=1');
      }, 1600);
    }, 700);
  }, [values, router]);

  const goToStep = useCallback(
    (idx: number) => {
      if (!visited.has(idx)) return;
      setErrors({});
      setStepIdx(idx);
    },
    [visited],
  );

  const totalSteps = FORM_STEPS.length;

  return (
    <div className="mx-auto w-full max-w-[920px] px-6 pb-24 pt-24 md:px-12 md:pt-28">
      {/* Header */}
      <p className="mono-tag">Заявка на диагностику</p>
      <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] md:text-5xl">
        Сервисная заявка ANHEL®
      </h1>
      <p className="mt-4 max-w-[640px] text-sm leading-relaxed text-[var(--color-secondary)]/65 md:mt-6 md:text-[15px]">
        Заполните форму — мы согласуем выезд инженера. Решение о выезде
        принимается после получения заполненной и пропечатанной заявки на
        info@anhelspb.com.
      </p>

      {/* === Прогресс-бар === */}
      <div className="mt-10 md:mt-12">
        <div className="flex items-center justify-between gap-1">
          {FORM_STEPS.map((s, i) => {
            const isActive = i === stepIdx;
            const isVisited = visited.has(i);
            const isClickable = isVisited && i !== stepIdx;
            return (
              <button
                type="button"
                key={s.index}
                onClick={() => isClickable && goToStep(i)}
                disabled={!isClickable}
                aria-label={`Шаг ${i + 1}: ${s.title}`}
                aria-current={isActive ? 'step' : undefined}
                className={
                  'group relative h-8 flex-1 rounded-sm border-[0.5px] transition-colors ' +
                  (isActive
                    ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]'
                    : isVisited
                    ? 'cursor-pointer border-[var(--color-secondary)]/55 bg-[var(--color-secondary)]/15 hover:bg-[var(--color-secondary)]/25'
                    : 'cursor-default border-[var(--color-hairline)] bg-transparent')
                }
              >
                <span className="sr-only">{s.title}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65">
          <span>
            Шаг {stepIdx + 1} / {totalSteps}
          </span>
          <span className="text-[var(--color-secondary)]/85">{step.title}</span>
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
            className="mt-12 rounded-md border-[0.5px] border-[var(--color-secondary)]/30 bg-[var(--color-hover-tint)] p-6 md:p-8"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-secondary)] text-[var(--color-primary)]">
                <Check size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-xl font-medium md:text-2xl">
                  Заявка отправлена
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-secondary)]/70 md:text-[15px]">
                  Мы свяжемся с вами в течение рабочего дня. Сейчас вернём
                  на главную страницу сервиса.
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16"
            aria-labelledby={`step-${step.index}-title`}
          >
            <h2
              id={`step-${step.index}-title`}
              className="font-display text-2xl font-medium leading-tight md:text-3xl"
            >
              {step.title}
            </h2>
            {step.description && (
              <p className="mt-3 max-w-[640px] text-sm leading-relaxed text-[var(--color-secondary)]/65 md:mt-4 md:text-[15px]">
                {step.description}
              </p>
            )}

            {/* === Поля === */}
            {step.fields.length > 0 && (
              <div className="mt-8 flex flex-col gap-5 md:mt-10 md:gap-6">
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

            {/* === Превью на последнем шаге === */}
            {isLast && <ReviewSummary values={values} />}
          </motion.section>
        </AnimatePresence>
      )}

      {/* === Памятка === */}
      {submitState !== 'done' && (
        <details className="mt-12 rounded-md border-[0.5px] border-[var(--color-hairline)] bg-[var(--color-hover-tint)] p-5 md:p-6">
          <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65 hover:text-[var(--color-secondary)]/85">
            Памятка по заполнению
          </summary>
          <ol className="mt-4 list-inside list-decimal space-y-2 text-sm leading-relaxed text-[var(--color-secondary)]/70 md:text-[15px]">
            <li>Номер заявки — это серийный номер изделия.</li>
            <li>Обязательно укажите номер и дату УПД.</li>
            <li>
              Пример серийного номера на шильде изделия — формат 24С574 (год и
              индекс серии).
            </li>
          </ol>
        </details>
      )}

      {/* === Кнопки навигации === */}
      {submitState !== 'done' && (
        <div className="mt-10 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between md:mt-12">
          <button
            type="button"
            onClick={handlePrev}
            disabled={stepIdx === 0}
            className="inline-flex items-center justify-center gap-2 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-5 py-3 text-sm font-medium text-[var(--color-secondary)]/85 transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden="true" className="font-mono">
              ←
            </span>
            Назад
          </button>

          {!isLast ? (
            <button
              type="button"
              onClick={handleNext}
              data-cursor="hover"
              className="group inline-flex items-center justify-center gap-3 rounded-md bg-[var(--color-secondary)] px-6 py-3 text-sm font-medium text-[var(--color-primary)]"
            >
              Далее
              <span
                aria-hidden="true"
                className="font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitState === 'submitting'}
              data-cursor="hover"
              className="group inline-flex items-center justify-center gap-3 rounded-md bg-[var(--color-secondary)] px-6 py-3 text-sm font-medium text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitState === 'submitting' ? 'Отправляем…' : 'Отправить заявку'}
              <span
                aria-hidden="true"
                className="font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          )}
        </div>
      )}

      {/* Cancel link */}
      {submitState === 'idle' && (
        <p className="mt-6 text-center text-xs text-[var(--color-secondary)]/55">
          Передумали?{' '}
          <Link
            href="/service"
            className="underline-offset-2 hover:text-[var(--color-secondary)] hover:underline"
          >
            Вернуться к описанию услуг
          </Link>
        </p>
      )}
    </div>
  );
}

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
  const id = `field-${field.name}`;
  const errorId = error ? `${id}-error` : undefined;
  const hintId = field.hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  if (field.kind === 'checkbox') {
    const checked = value === true;
    return (
      <label
        htmlFor={id}
        className="group flex cursor-pointer items-start gap-3 rounded-md border-[0.5px] border-[var(--color-hairline)] bg-[var(--color-hover-tint)] p-4 transition-colors hover:border-[var(--color-secondary)]/40 md:p-5"
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          required={field.required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(field.name, e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[var(--color-secondary)]"
        />
        <span className="text-sm leading-relaxed text-[var(--color-secondary)]/85 md:text-[15px]">
          {field.label}
          {field.required && (
            <span aria-hidden="true" className="ml-1 text-[var(--color-secondary)]/55">
              *
            </span>
          )}
        </span>
        {error && (
          <FieldError id={errorId!} message={error} />
        )}
      </label>
    );
  }

  if (field.kind === 'textarea') {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-medium text-[var(--color-secondary)]/85">
          {field.label}
          {field.required && (
            <span aria-hidden="true" className="ml-1 text-[var(--color-secondary)]/55">
              *
            </span>
          )}
        </label>
        <textarea
          id={id}
          value={typeof value === 'string' ? value : ''}
          required={field.required}
          placeholder={field.placeholder}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(field.name, e.target.value)}
          rows={6}
          className="w-full rounded-md border-[0.5px] border-[var(--color-hairline)] bg-[var(--color-hover-tint)] px-4 py-3 text-sm leading-relaxed text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/40 focus:border-[var(--color-secondary)]/60 focus:outline-none md:text-[15px]"
        />
        {field.hint && (
          <p id={hintId} className="text-xs text-[var(--color-secondary)]/55 md:text-sm">
            {field.hint}
          </p>
        )}
        {error && <FieldError id={errorId!} message={error} />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-[var(--color-secondary)]/85">
        {field.label}
        {field.required && (
          <span aria-hidden="true" className="ml-1 text-[var(--color-secondary)]/55">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={field.kind === 'tel' ? 'tel' : field.kind === 'email' ? 'email' : field.kind === 'date' ? 'date' : 'text'}
        value={typeof value === 'string' ? value : ''}
        required={field.required}
        placeholder={field.placeholder}
        autoComplete={
          field.kind === 'email'
            ? 'email'
            : field.kind === 'tel'
            ? 'tel'
            : 'off'
        }
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(field.name, e.target.value)}
        className="w-full rounded-md border-[0.5px] border-[var(--color-hairline)] bg-[var(--color-hover-tint)] px-4 py-3 text-sm leading-relaxed text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/40 focus:border-[var(--color-secondary)]/60 focus:outline-none md:text-[15px]"
      />
      {field.hint && (
        <p id={hintId} className="text-xs text-[var(--color-secondary)]/55 md:text-sm">
          {field.hint}
        </p>
      )}
      {error && <FieldError id={errorId!} message={error} />}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1.5 text-xs text-[var(--accent-fire)] md:text-sm"
    >
      <AlertCircle size={14} strokeWidth={1.75} aria-hidden="true" />
      {message}
    </p>
  );
}

/**
 * Превью на последнем шаге — собираем все значения и показываем
 * сгруппированно по шагам, чтобы пользователь увидел, что отправляет.
 */
function ReviewSummary({ values }: { values: Values }) {
  const grouped = useMemo(
    () =>
      FORM_STEPS.filter((s) => s.fields.length > 0).map((s) => ({
        step: s,
        rows: s.fields.map((f) => {
          const raw = values[f.name];
          let display = '';
          if (f.kind === 'checkbox') {
            display = raw === true ? 'Да' : '—';
          } else {
            display = typeof raw === 'string' && raw.trim() ? raw : '—';
          }
          return { field: f, display };
        }),
      })),
    [values],
  );

  return (
    <div className="mt-10 space-y-6 md:mt-12 md:space-y-8">
      {grouped.map(({ step, rows }) => (
        <div
          key={step.index}
          className="rounded-md border-[0.5px] border-[var(--color-hairline)] bg-[var(--color-hover-tint)] p-5 md:p-6"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
            Шаг {step.index + 1} · {step.title}
          </p>
          <dl className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-6 md:gap-y-4">
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
