'use client';

import { cn } from '@/lib/utils';
import type { QuizStep } from '@/content/quiz/pumps-fields';

type Props = {
  steps: QuizStep[];
  current: number;
  /** Какие шаги пользователь УЖЕ посетил (можно вернуться кликом). */
  visited: Set<number>;
  onStepClick?: (index: number) => void;
};

/**
 * Прогресс-бар: тонкая горизонтальная полоса + точки 01..05.
 * Точки кликабельны для пройденных шагов.
 */
export function QuizProgress({ steps, current, visited, onStepClick }: Props) {
  const pct = steps.length > 1 ? (current / (steps.length - 1)) * 100 : 0;

  return (
    <div className="w-full">
      <div className="relative h-px w-full bg-[color:var(--color-hairline)]">
        <div
          className="absolute left-0 top-0 h-full bg-secondary transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-2">
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
                'flex flex-1 flex-col items-start text-left transition-opacity',
                clickable ? 'cursor-pointer hover:opacity-100' : 'cursor-default',
                active ? 'opacity-100' : visitedStep ? 'opacity-70' : 'opacity-30',
              )}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/55">
                {step.number}
              </span>
              <span
                className={cn(
                  'mt-1 text-xs sm:text-sm',
                  active ? 'text-secondary' : 'text-secondary/70',
                )}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-secondary/55">
        Шаг {current + 1} из {steps.length}
      </p>
    </div>
  );
}
