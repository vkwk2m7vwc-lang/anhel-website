"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProductContent } from "@/content/products/types";
import { QUIZ_STEPS, type QuizData, type QuizStepId } from "./quiz-schema";
import { StepContact } from "./steps/StepContact";
import { StepObject } from "./steps/StepObject";
import { StepHydraulics } from "./steps/StepHydraulics";
import { StepPumps } from "./steps/StepPumps";
import { StepOptions } from "./steps/StepOptions";
import { StepExtra } from "./steps/StepExtra";
import { QuizSuccess } from "./QuizSuccess";

/**
 * Опросный лист / quiz — section 10.
 *
 * Six-step form lifted verbatim from the МФМК PDF questionnaire —
 * fields, labels, radio options are the official spec. Visual shell
 * is entirely ANHEL: dark panel, mono-tag header, fire-red accent
 * wherever the accent shows. Progress bar at the top with six segments.
 *
 * UI only in this commit — there is no submit handler yet (email
 * + Telegram + Turnstile is a deferred backend commit). The final
 * "Отправить заявку" button flips the section to a local success
 * state so the viewer sees the full flow.
 *
 * State: a single `data` object mutated via a shallow-merge setter.
 * Validation is minimal (required fields on step 1). We deliberately
 * don't block progression on the other steps — real projects often
 * leave fields empty because the inquiry sender doesn't know them
 * yet, and ANHEL's engineers fill the gaps on the call that follows.
 *
 * Reuse: same component on every product page. The only per-product
 * field is the section header (`content`); the schema itself is
 * product-independent because the PDF is shared across the whole
 * станция line (МФМК confirmed this when we sourced the file).
 */
export function QuizSection({
  content,
}: {
  content: ProductContent["quiz"];
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<QuizData>({});
  const [submitted, setSubmitted] = useState(false);

  const step = QUIZ_STEPS[stepIndex];
  const progress = (stepIndex + 1) / QUIZ_STEPS.length;
  const isLast = stepIndex === QUIZ_STEPS.length - 1;
  const isFirst = stepIndex === 0;

  /**
   * Shallow-merge updater — every step pushes a partial through here
   * instead of setting individual pieces. Keeps re-renders compact
   * because we never rebuild the whole data object inside a step.
   */
  const updateData = useCallback((patch: Partial<QuizData>) => {
    setData((d) => ({ ...d, ...patch }));
  }, []);

  /**
   * Required-fields gate for step 1 only — name, org, phone, email.
   * Other steps pass through unconditionally (see the doc comment on
   * validation above).
   */
  const canAdvance = useMemo(() => {
    if (stepIndex !== 0) return true;
    return Boolean(
      data.org?.trim() &&
        data.fullName?.trim() &&
        data.role?.trim() &&
        data.email?.trim() &&
        data.phone?.trim()
    );
  }, [stepIndex, data]);

  const goNext = () => {
    if (!canAdvance) return;
    if (isLast) {
      // UI stub — real submission lives in a later backend commit.
      setSubmitted(true);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, QUIZ_STEPS.length - 1));
  };

  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  return (
    <section
      id="quiz"
      aria-labelledby="quiz-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 py-20 md:px-12 md:py-28">
        {/* Section header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="quiz-title"
              className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              {content.title}
            </h2>
          </div>
          {content.lede ? (
            <p className="max-w-[380px] text-sm text-[var(--color-secondary)]/60 md:text-right">
              {content.lede}
            </p>
          ) : null}
        </div>

        {submitted ? (
          <QuizSuccess onRestart={() => { setSubmitted(false); setStepIndex(0); setData({}); }} />
        ) : (
          <>
            {/* Progress — six equal segments, the active one grows from 0
                to full as its step is "on". We fade the completed ones
                full-secondary and the upcoming ones hairline. */}
            <QuizProgress current={stepIndex} total={QUIZ_STEPS.length} progress={progress} />

            {/* Step label + title pair — doesn't animate out so the
                progress bar above stays anchored during the transition. */}
            <div className="mt-10 flex items-baseline justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40">
                  Шаг {String(stepIndex + 1).padStart(2, "0")} из {String(QUIZ_STEPS.length).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-[22px] font-medium leading-tight text-[var(--color-secondary)] md:text-[26px]">
                  {step.title}
                </h3>
              </div>
              {step.subtitle ? (
                <p className="hidden max-w-[320px] text-right text-xs text-[var(--color-secondary)]/50 md:block">
                  {step.subtitle}
                </p>
              ) : null}
            </div>

            {/* Step body — AnimatePresence cross-fade, keyed by step id */}
            <div className="relative mt-8 md:mt-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <StepBody id={step.id} data={data} onChange={updateData} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav — back left, next/submit right. Next is disabled on
                step 1 if required contact fields aren't filled. */}
            <div className="mt-12 flex flex-col gap-4 border-t border-[var(--color-hairline)] pt-6 md:flex-row md:items-center md:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={isFirst}
                data-cursor="hover"
                className={cn(
                  "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                  isFirst
                    ? "cursor-not-allowed text-[var(--color-secondary)]/20"
                    : "text-[var(--color-secondary)]/60 hover:text-[var(--color-secondary)]"
                )}
              >
                <span aria-hidden="true">←</span>
                Назад
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={!canAdvance}
                data-cursor="hover"
                className={cn(
                  "group inline-flex items-center gap-3 rounded-md px-5 py-3 text-sm font-medium transition-all",
                  canAdvance
                    ? "bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--accent-current)] hover:text-[var(--color-secondary)]"
                    : "cursor-not-allowed bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]/40"
                )}
              >
                {isLast ? "Отправить заявку" : "Далее"}
                <span
                  aria-hidden="true"
                  className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>

            {/* Disclaimer from the original PDF, verbatim */}
            <p className="mt-8 border-l-2 border-[var(--accent-current)]/60 pl-4 text-[11px] leading-relaxed text-[var(--color-secondary)]/45">
              Внимание: ANHEL не несёт ответственности за корректность
              исходных данных для подбора оборудования, указанных в опросном
              листе. Отказ заполнить опросный лист означает согласие со
              всеми техническими характеристиками, определяемыми условным
              обозначением в заявке, и отсутствие дополнительных требований.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

/**
 * Six-segment progress bar. Each segment gets its own div so the bar
 * reads as "steps" rather than a linear fill — matches the form's
 * structured feel. Active segment glows in the page accent.
 */
function QuizProgress({
  current,
  total,
  progress,
}: {
  current: number;
  total: number;
  progress: number;
}) {
  return (
    <div className="mt-10 flex flex-col gap-3">
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[2px] flex-1 overflow-hidden transition-colors duration-300",
              i < current
                ? "bg-[var(--color-secondary)]"
                : i === current
                  ? "bg-[var(--accent-current)]/30"
                  : "bg-[var(--color-hairline)]"
            )}
          >
            {i === current ? (
              <motion.div
                className="h-full bg-[var(--accent-current)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40">
        <span>Прогресс</span>
        <span>{Math.round(progress * 100)} %</span>
      </div>
    </div>
  );
}

/**
 * Router-style dispatcher — picks the right step component per id so
 * QuizSection itself doesn't know the shape of every step body.
 */
function StepBody({
  id,
  data,
  onChange,
}: {
  id: QuizStepId;
  data: QuizData;
  onChange: (patch: Partial<QuizData>) => void;
}) {
  switch (id) {
    case "contact":
      return <StepContact data={data} onChange={onChange} />;
    case "object":
      return <StepObject data={data} onChange={onChange} />;
    case "hydraulics":
      return <StepHydraulics data={data} onChange={onChange} />;
    case "pumps":
      return <StepPumps data={data} onChange={onChange} />;
    case "options":
      return <StepOptions data={data} onChange={onChange} />;
    case "extra":
      return <StepExtra data={data} onChange={onChange} />;
    default:
      return null;
  }
}
