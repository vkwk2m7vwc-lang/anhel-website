'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
  Controller,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QUIZ_INTRO_PARA_1,
  QUIZ_INTRO_PARA_2,
  QUIZ_DISCLAIMER_TITLE,
  QUIZ_DISCLAIMER_BODY,
  QUIZ_CONSENT_LABEL,
  type QuizStep,
} from '@/content/quiz/pumps-fields';
import type { QuizConfig } from '@/content/quiz/quiz-config';
import { QuizProgress } from './QuizProgress';
import { QuizNavigation } from './QuizNavigation';
import { QuizSection } from './QuizSection';
import { CheckboxField } from './fields/CheckboxField';
import { IntakeChooser } from './IntakeChooser';

type Props = {
  /** Конфиг опросника (pumps / vpu / itp / aupd) */
  config: QuizConfig;
  /** initial pre-fill values from URL query */
  prefill?: Record<string, unknown>;
};

export function QuizShell({ config, prefill }: Props) {
  const [stepIdx, setStepIdx] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [submitted, setSubmitted] = useState<null | { ok: true } | { ok: false; message: string }>(
    null,
  );
  const [restored, setRestored] = useState(false);

  // Initial values: defaults + prefill
  const initialValues = useMemo(
    () => ({ ...config.defaults, ...(prefill || {}) }) as Record<string, unknown>,
    [config.defaults, prefill],
  );

  const methods = useForm<Record<string, unknown>>({
    resolver: zodResolver(config.schema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  const { handleSubmit, trigger, reset, watch } = methods;
  const stepCount = config.steps.length;
  const step: QuizStep = config.steps[stepIdx];

  // === Restore from localStorage on mount ===
  const didRestore = useRef(false);
  useEffect(() => {
    if (didRestore.current) return;
    didRestore.current = true;
    try {
      const raw = localStorage.getItem(config.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { values?: Record<string, unknown>; stepIdx?: number };
      if (parsed && parsed.values) {
        const merged = { ...initialValues, ...parsed.values };
        reset(merged);
        if (typeof parsed.stepIdx === 'number' && parsed.stepIdx < stepCount) {
          setStepIdx(parsed.stepIdx);
          setVisited(
            new Set(Array.from({ length: parsed.stepIdx + 1 }, (_, i) => i)),
          );
        }
        setRestored(true);
      }
    } catch {
      // ignore
    }
  }, [initialValues, reset, stepCount, config.storageKey]);

  // === Save to localStorage on every change ===
  useEffect(() => {
    const sub = watch((values) => {
      try {
        localStorage.setItem(
          config.storageKey,
          JSON.stringify({ values, stepIdx, savedAt: Date.now() }),
        );
      } catch {
        // ignore
      }
    });
    return () => sub.unsubscribe();
  }, [watch, stepIdx, config.storageKey]);

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= stepCount) return;
      setStepIdx(idx);
      setVisited((prev) => {
        const next = new Set(prev);
        next.add(idx);
        return next;
      });
      // scroll to top
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [stepCount],
  );

  const handleNext = useCallback(async () => {
    const fieldsToValidate = config.stepFieldNames[stepIdx] || [];
    if (fieldsToValidate.length > 0) {
      const ok = await trigger(fieldsToValidate, {
        shouldFocus: true,
      });
      if (!ok) return;
    }
    goTo(stepIdx + 1);
  }, [stepIdx, trigger, goTo, config.stepFieldNames]);

  const handleBack = useCallback(() => {
    goTo(stepIdx - 1);
  }, [stepIdx, goTo]);

  // === Submit ===
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: config.kind, values }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
      if (res.ok && data.success) {
        try {
          localStorage.removeItem(config.storageKey);
        } catch {}
        setSubmitted({ ok: true });
      } else {
        setSubmitted({
          ok: false,
          message: data.message || 'Не удалось отправить заявку. Попробуйте позже.',
        });
      }
    } catch {
      setSubmitted({
        ok: false,
        message:
          'Ошибка сети. Скачайте PDF и пришлите на info@anhelspb.com — мы обработаем заявку.',
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  // === Success/Error screens ===
  if (submitted?.ok) {
    return <SuccessScreen catalogHref={config.catalogHref} catalogLabel={config.catalogLabel} />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} noValidate className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
        {/* Header */}
        <header className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary/55">
            Опросный лист
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-medium tracking-tight text-secondary">
            {config.title}
          </h1>
          {config.description && (
            <p className="mt-2 text-sm leading-relaxed text-secondary/70">{config.description}</p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-secondary/70">{QUIZ_INTRO_PARA_1}</p>
          <p className="mt-3 text-sm leading-relaxed text-secondary/70">{QUIZ_INTRO_PARA_2}</p>
        </header>

        <QuizProgress
          steps={config.steps}
          current={stepIdx}
          visited={visited}
          onStepClick={goTo}
        />

        {restored && (
          <p className="mt-4 rounded-sm border border-[color:var(--color-hairline)] bg-[color:var(--color-hover-tint)] px-3 py-2 text-xs text-secondary/70">
            Восстановлены данные из предыдущей сессии. Можно продолжить с того места, где
            остановились.
          </p>
        )}

        {/* Step body with slide animation */}
        <div className="mt-10 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary/55">
                  {step.number} · {step.title}
                </p>
                {step.description && (
                  <p className="mt-1 text-sm text-secondary/55">{step.description}</p>
                )}
              </div>

              {step.id !== 'review' ? (
                <div className="space-y-8">
                  {step.sections.map((section) => {
                    const custom = config.customSections?.[section.id];
                    if (custom?.component === 'intake-chooser') {
                      return (
                        <QuizSection
                          key={section.id}
                          section={section}
                          beforeFields={<IntakeChooser />}
                          excludeFields={custom.excludeFieldNames}
                        />
                      );
                    }
                    return <QuizSection key={section.id} section={section} />;
                  })}
                </div>
              ) : (
                <ReviewStep onJump={goTo} steps={config.steps} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {submitted?.ok === false && (
          <div className="mt-6 rounded-sm border border-[color:var(--accent-fire)] bg-[color:var(--accent-fire)]/10 px-4 py-3 text-sm text-secondary">
            {submitted.message}
          </div>
        )}

        <QuizNavigation
          current={stepIdx}
          total={stepCount}
          onBack={handleBack}
          onNext={handleNext}
          isSubmitting={isSubmitting}
        />
      </form>
    </FormProvider>
  );
}

// === Helpers ===

function SuccessScreen({
  catalogHref,
  catalogLabel,
}: {
  catalogHref: string;
  catalogLabel: string;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center px-5 py-16">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary/55">
        Заявка получена
      </p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight text-secondary sm:text-4xl">
        Спасибо!
      </h1>
      <p className="mt-4 text-base leading-relaxed text-secondary/75">
        Мы получили ваш запрос. Менеджер свяжется в течение 1 рабочего дня.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-secondary/65">
        Срочный вопрос — звоните{' '}
        <a
          href="tel:+78124164500"
          className="border-b border-secondary/40 hover:border-secondary"
        >
          +7 (812) 416-45-00
        </a>{' '}
        или пишите на{' '}
        <a
          href="mailto:info@anhelspb.com"
          className="border-b border-secondary/40 hover:border-secondary"
        >
          info@anhelspb.com
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/"
          className="border border-secondary px-5 py-2.5 text-sm hover:bg-secondary hover:text-primary"
        >
          На главную
        </a>
        <a
          href={catalogHref}
          className="border border-[color:var(--color-hairline)] px-5 py-2.5 text-sm hover:bg-[color:var(--color-hover-tint)]"
        >
          {catalogLabel}
        </a>
      </div>
    </div>
  );
}

function ReviewStep({
  onJump,
  steps,
}: {
  onJump: (idx: number) => void;
  steps: QuizStep[];
}) {
  const { control } = useFormContext();
  const watched = useWatch({ control });
  const values = (watched ?? {}) as Record<string, unknown>;
  return (
    <div className="space-y-8">
      {steps
        .filter((s) => s.id !== 'review')
        .map((s, idx) => {
          const filled = collectFilled(s, values);
          if (filled.length === 0) return null;
          return (
            <section key={s.id} className="border-t border-[color:var(--color-hairline)] pt-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-base font-medium text-secondary">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary/55">
                    {s.number}
                  </span>{' '}
                  {s.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onJump(idx)}
                  className="text-xs text-secondary/65 hover:text-secondary"
                >
                  Изменить
                </button>
              </div>
              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {filled.map(({ label, value }) => (
                  <div key={label} className="border-b border-[color:var(--color-hairline)] pb-2">
                    <dt className="text-[11px] uppercase tracking-wider text-secondary/55">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-secondary">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}

      {/* Disclaimer */}
      <section className="relative border-l-2 border-[color:var(--accent-fire)] pl-4">
        <p className="text-sm font-medium text-[color:var(--accent-fire)]">
          {QUIZ_DISCLAIMER_TITLE}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-secondary/70">{QUIZ_DISCLAIMER_BODY}</p>
      </section>

      {/* Consent */}
      <section className="border-t border-[color:var(--color-hairline)] pt-6">
        <Controller
          name="consent_pdn"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <CheckboxField
                label={QUIZ_CONSENT_LABEL}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
              />
              {fieldState.error && (
                <p className="mt-1 pl-7 text-xs text-[color:var(--accent-fire)]">
                  {fieldState.error.message}
                </p>
              )}
              <p className="mt-2 pl-7 text-xs text-secondary/55">
                <a
                  href="#"
                  className="border-b border-secondary/40 hover:border-secondary"
                  onClick={(e) => e.preventDefault()}
                  title="Страница в разработке"
                >
                  Политика конфиденциальности
                </a>{' '}
                (страница появится позже)
              </p>
            </div>
          )}
        />
      </section>
    </div>
  );
}

/** Собирает заполненные поля шага в [{label, value}]. */
function collectFilled(step: QuizStep, values: Record<string, unknown>) {
  const out: Array<{ label: string; value: string }> = [];
  for (const section of step.sections) {
    for (const f of section.fields) {
      const v = values[f.name];
      if (v === undefined || v === null || v === '' || v === false) continue;
      let pretty: string;
      if (f.type === 'checkbox') {
        pretty = 'Да';
      } else if (f.type === 'radio' && f.options) {
        const opt = f.options.find((o) => o.value === v);
        pretty = opt ? opt.label : String(v);
      } else {
        pretty = String(v);
      }
      const label = f.unit ? `${f.label}, ${f.unit}` : f.label;
      out.push({ label, value: pretty });
    }
  }
  return out;
}
