'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { cn } from '@/lib/utils';
import type { QuizField, QuizStep, ShowIf } from '@/content/quiz/pumps-fields';

type Props = {
  steps: QuizStep[];
  current: number;
  /** Какие шаги пользователь УЖЕ посетил (можно вернуться кликом). */
  visited: Set<number>;
  onStepClick?: (index: number) => void;
};

/** Поле учитывается, если оно сейчас видно (showIf-условие выполнено). */
function isFieldVisible(field: QuizField, values: Record<string, unknown>): boolean {
  const cond: ShowIf | undefined = field.showIf;
  if (!cond) return true;
  const v = values[cond.field];
  const op = cond.op ?? 'eq';
  if (op === 'truthy') return Boolean(v);
  if (op === 'neq') return v !== cond.value;
  return v === cond.value;
}

/** Заполнено ли поле — checkbox=true | text непустой | radio выбран. */
function isFieldFilled(field: QuizField, values: Record<string, unknown>): boolean {
  const v = values[field.name];
  if (field.type === 'checkbox') return !!v;
  if (field.type === 'radio') return v !== undefined && v !== '' && v !== null;
  if (v === undefined || v === null) return false;
  return String(v).trim() !== '';
}

/**
 * «Живой» прогресс: пройденные шаги + доля заполненных полей текущего шага.
 *  base = (current / total) * 100  — какие шаги пройдены целиком
 *  step-bonus = (filled / visible) * (100 / total)  — заполненность текущего
 *
 * Так на 1-м шаге без ввода видишь 0 %, набрал контакты — 18 %, на полпути
 * по 3-му шагу — где-то 47 %.
 */
function computeLiveProgress(
  steps: QuizStep[],
  current: number,
  values: Record<string, unknown>,
): number {
  if (steps.length === 0) return 0;
  const stepWeight = 100 / steps.length;
  const baseProgress = current * stepWeight;
  const currentStep = steps[current];
  const visibleFields = currentStep.sections
    .flatMap((s) => s.fields)
    .filter((f) => isFieldVisible(f, values));
  if (visibleFields.length === 0) {
    // финальный шаг сводки — пройден сразу как только зашёл, но 100% дадим
    // только при submit success (это уже не наш экран)
    return Math.round(baseProgress + stepWeight);
  }
  const filledCount = visibleFields.filter((f) => isFieldFilled(f, values)).length;
  const stepFraction = filledCount / visibleFields.length;
  return Math.round(baseProgress + stepFraction * stepWeight);
}

/**
 * Прогресс-бар: тонкая горизонтальная полоса + точки 01..05.
 * Точки кликабельны для пройденных шагов.
 *
 * Активный шаг визуально доминирует:
 *  — точка-маркер с акцентным цветом
 *  — заголовок жирнее и контрастнее
 *  — пройденные шаги слегка приглушены
 *  — будущие сильно приглушены, чтобы взгляд не цеплялся
 */
export function QuizProgress({ steps, current, visited, onStepClick }: Props) {
  const { control } = useFormContext();
  const watched = useWatch({ control });
  const values = (watched ?? {}) as Record<string, unknown>;
  const pct = computeLiveProgress(steps, current, values);

  return (
    <div className="w-full">
      {/* Тонкая полоса прогресса */}
      <div className="relative h-px w-full bg-[color:var(--color-hairline)]">
        <div
          className="absolute left-0 top-0 h-full bg-secondary transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Список шагов с точками-маркерами */}
      <div className="mt-5 flex items-start justify-between gap-2">
        {steps.map((step, idx) => {
          const active = idx === current;
          const visitedStep = visited.has(idx);
          const clickable = visitedStep && !active && !!onStepClick;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onStepClick?.(idx)}
              className={cn(
                'group relative flex flex-1 flex-col items-start text-left transition-colors',
                clickable && 'cursor-pointer',
                !clickable && !active && 'cursor-default',
              )}
              aria-current={active ? 'step' : undefined}
            >
              {/* Маркер: точка с акцентом для активного / pass-mark для пройденного */}
              <span
                className={cn(
                  'mb-2 inline-block h-1.5 w-1.5 rounded-full transition-colors',
                  active
                    ? 'bg-[color:var(--accent-current)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent-current)_22%,transparent)]'
                    : visitedStep
                      ? 'bg-secondary'
                      : 'bg-[color:var(--color-hairline)]',
                )}
                aria-hidden="true"
              />

              <span
                className={cn(
                  'font-mono text-[10px] uppercase tracking-widest transition-colors',
                  active
                    ? 'text-[color:var(--accent-current)]'
                    : visitedStep
                      ? 'text-secondary/55'
                      : 'text-secondary/30',
                )}
              >
                {step.number}
              </span>
              <span
                className={cn(
                  'mt-0.5 text-xs sm:text-sm transition-colors',
                  active
                    ? 'font-medium text-secondary'
                    : visitedStep
                      ? 'text-secondary/65 group-hover:text-secondary'
                      : 'text-secondary/30',
                )}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Подпись: «Шаг N из 5 · NN%» */}
      <p className="mt-4 flex items-baseline gap-3 text-xs text-secondary/55">
        <span>
          Шаг {current + 1} из {steps.length}
        </span>
        <span className="font-mono text-[color:var(--accent-current)]">{pct}%</span>
      </p>
    </div>
  );
}
