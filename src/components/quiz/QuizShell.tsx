'use client';

import Link from 'next/link';

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
import { useTranslations, useLocale } from 'next-intl';
import type { ZodTypeAny } from 'zod';
import { type QuizStep } from '@/content/quiz/pumps-fields';
import { makePumpsQuizSchema, pumpsQuizSchema } from '@/content/quiz/pumps-schema';
import { makeVpuQuizSchema, vpuQuizSchema } from '@/content/quiz/vpu-schema';
import { makeItpQuizSchema, itpQuizSchema } from '@/content/quiz/itp-schema';
import { makeAupdQuizSchema, aupdQuizSchema } from '@/content/quiz/aupd-schema';
import type { QuizConfig, QuizKind } from '@/content/quiz/quiz-config';
import { useTranslatedConfig } from './useTranslatedConfig';
import { buildQuizSubmission } from './buildSubmission';
import { coerceLocale } from '@/lib/email/payload';

/**
 * Static schemas (RU messages) used as a fallback for quizzes whose
 * schema factory is not yet migrated to the locale-aware variant.
 * Vpu is migrated and built per-render via `makeVpuQuizSchema(t)` inside
 * the component body — see the `schemas` memo below.
 *
 * Zod schemas are class instances and cannot be serialized across the
 * server↔client boundary, so we always resolve them in the client.
 */
const STATIC_SCHEMAS: Record<QuizKind, ZodTypeAny> = {
  pumps: pumpsQuizSchema,
  vpu: vpuQuizSchema,
  itp: itpQuizSchema,
  aupd: aupdQuizSchema,
};
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

export function QuizShell({ config: rawConfig, prefill }: Props) {
  const config = useTranslatedConfig(rawConfig);
  const locale = coerceLocale(useLocale());
  const t = useTranslations('quiz.shell');
  const tValidation = useTranslations('quiz.shell.validation');

  /**
   * Build the active zod schema for this quiz kind. Vpu uses the
   * locale-aware factory; the other three fall back to the static
   * RU-message schema until their schema files are migrated in the
   * follow-up commits (pumps / itp / aupd / control-systems).
   *
   * Re-memoizes only when the locale's `t` instance changes, which
   * effectively means once per locale switch. Within a render-stable
   * locale the schema reference stays stable for `useForm`.
   */
  const schema = useMemo<ZodTypeAny>(() => {
    if (rawConfig.kind === 'pumps') return makePumpsQuizSchema(tValidation);
    if (rawConfig.kind === 'vpu') return makeVpuQuizSchema(tValidation);
    if (rawConfig.kind === 'itp') return makeItpQuizSchema(tValidation);
    if (rawConfig.kind === 'aupd') return makeAupdQuizSchema(tValidation);
    return STATIC_SCHEMAS[rawConfig.kind];
  }, [rawConfig.kind, tValidation]);

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
    resolver: zodResolver(schema),
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
      const submission = buildQuizSubmission(rawConfig, values, locale);
      const res = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
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
          message: data.message || t('error_default'),
        });
      }
    } catch {
      setSubmitted({
        ok: false,
        message: t('error_network'),
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
      {/*
       * pt-24/sm:pt-28 — clear the fixed site Header (h-16 mobile / h-20
       * desktop). Previously py-10/sm:py-16 left the quiz tag + H1 tucked
       * under the header. Matches the rhythm of /quiz/control-systems and
       * the legal pages.
       */}
      <form onSubmit={onSubmit} noValidate className="mx-auto max-w-3xl px-5 pt-24 pb-10 sm:pt-28 sm:pb-16">
        {/* Header */}
        <header className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary/55">
            {t('tag')}
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-medium tracking-tight text-secondary">
            {config.title}
          </h1>
          {config.description && (
            <p className="mt-2 text-sm leading-relaxed text-secondary/70">{config.description}</p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-secondary/70">{t('intro_para_1')}</p>
          <p className="mt-3 text-sm leading-relaxed text-secondary/70">{t('intro_para_2')}</p>
        </header>

        <QuizProgress
          steps={config.steps}
          current={stepIdx}
          visited={visited}
          onStepClick={goTo}
        />

        {restored && (
          <p className="mt-4 rounded-sm border border-[color:var(--color-hairline)] bg-[color:var(--color-hover-tint)] px-3 py-2 text-xs text-secondary/70">
            {t('restored')}
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
  const t = useTranslations('quiz.shell');
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center px-5 py-16">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary/55">
        {t('received_tag')}
      </p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight text-secondary sm:text-4xl">
        {t('thanks_title')}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-secondary/75">
        {t('thanks_body')}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-secondary/65">
        {t('urgent_pre')}
        <a
          href="tel:+78124164500"
          className="border-b border-secondary/40 hover:border-secondary"
        >
          +7 (812) 416-45-00
        </a>
        {t('urgent_or')}
        <a
          href="mailto:info@anhelspb.com"
          className="border-b border-secondary/40 hover:border-secondary"
        >
          info@anhelspb.com
        </a>
        {t('urgent_dot')}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/"
          className="inline-flex min-h-11 items-center justify-center border border-secondary px-5 py-2.5 text-sm hover:bg-secondary hover:text-primary"
        >
          {t('to_home')}
        </a>
        <a
          href={catalogHref}
          className="inline-flex min-h-11 items-center justify-center border border-[color:var(--color-hairline)] px-5 py-2.5 text-sm hover:bg-[color:var(--color-hover-tint)]"
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
  const t = useTranslations('quiz.shell');
  const { control } = useFormContext();
  const watched = useWatch({ control });
  const values = (watched ?? {}) as Record<string, unknown>;
  return (
    <div className="space-y-8">
      {steps
        .filter((s) => s.id !== 'review')
        .map((s, idx) => {
          const filled = collectFilled(s, values, t('yes_short'));
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
                  // min-h-11 + horizontal padding — на mobile «Изменить»
                  // нужна нормальной tap-зоной. Visual look сохранили
                  // через -mr-2 (компенсация padding'а у правого края).
                  className="-mr-2 inline-flex min-h-11 items-center px-2 text-xs text-secondary/65 hover:text-secondary"
                >
                  {t('edit')}
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
          {t('disclaimer_title')}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-secondary/70">{t('disclaimer_body')}</p>
      </section>

      {/* Consent */}
      <section className="border-t border-[color:var(--color-hairline)] pt-6">
        <Controller
          name="consent_pdn"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <CheckboxField
                label={t('consent_label')}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
              />
              {fieldState.error && (
                <p className="mt-1 pl-7 text-xs text-[color:var(--accent-fire)]">
                  {fieldState.error.message}
                </p>
              )}
              <p className="mt-2 pl-7 text-xs leading-relaxed text-secondary/55">
                {t('consent_privacy_pre')}
                <Link
                  href="/privacy-policy"
                  className="border-b border-secondary/40 hover:border-secondary"
                >
                  {t('consent_privacy')}
                </Link>
                {t('consent_and')}
                <Link
                  href="/personal-data-consent"
                  className="border-b border-secondary/40 hover:border-secondary"
                >
                  {t('consent_data')}
                </Link>
                {t('urgent_dot')}
              </p>
            </div>
          )}
        />
      </section>
    </div>
  );
}

/** Собирает заполненные поля шага в [{label, value}]. */
function collectFilled(
  step: QuizStep,
  values: Record<string, unknown>,
  yesLabel: string,
) {
  const out: Array<{ label: string; value: string }> = [];
  for (const section of step.sections) {
    for (const f of section.fields) {
      const v = values[f.name];
      if (v === undefined || v === null || v === '' || v === false) continue;
      let pretty: string;
      if (f.type === 'checkbox') {
        pretty = yesLabel;
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
