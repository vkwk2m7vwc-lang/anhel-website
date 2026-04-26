'use client';

import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

type Props = {
  current: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
  disableNext?: boolean;
};

export function QuizNavigation({ current, total, onBack, onNext, isSubmitting, disableNext }: Props) {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div
      className={cn(
        'sticky bottom-0 mt-10 flex items-center justify-between gap-4',
        'border-t border-[color:var(--color-hairline)] bg-primary/85 py-4 backdrop-blur',
      )}
    >
      <button
        type="button"
        onClick={onBack}
        disabled={isFirst}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 text-sm transition-colors',
          isFirst
            ? 'cursor-not-allowed text-secondary/30'
            : 'text-secondary/75 hover:text-secondary',
        )}
      >
        <ArrowLeft size={16} aria-hidden /> Назад
      </button>

      <button
        type={isLast ? 'submit' : 'button'}
        onClick={isLast ? undefined : onNext}
        disabled={disableNext || isSubmitting}
        className={cn(
          'group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all',
          'border border-secondary bg-secondary text-primary',
          'hover:bg-transparent hover:text-secondary',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        {isLast ? (
          <>
            {isSubmitting ? 'Отправка…' : 'Отправить заявку'}
            <Send size={16} aria-hidden />
          </>
        ) : (
          <>
            Далее <ArrowRight size={16} aria-hidden />
          </>
        )}
      </button>
    </div>
  );
}
