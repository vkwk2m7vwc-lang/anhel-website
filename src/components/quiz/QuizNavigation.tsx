'use client';

import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  current: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
  disableNext?: boolean;
};

export function QuizNavigation({ current, total, onBack, onNext, isSubmitting, disableNext }: Props) {
  const t = useTranslations('quiz.shell');
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div
      className={cn(
        'sticky bottom-0 mt-10 flex items-center justify-between gap-4',
        // -mx-5 px-5 — на mobile QuizShell даёт контейнеру px-5, и
        // sticky-нав должна растягиваться edge-to-edge, иначе backdrop-
        // blur стрижётся по контенту. На sm+ возвращаем 0 inset.
        '-mx-5 px-5 sm:mx-0 sm:px-0',
        // safe-area для iOS — на iPhone X+ snake-bar занимает ~34px,
        // без env() sticky-нав налезает на «домашний» indicator.
        'pb-[env(safe-area-inset-bottom)]',
        'border-t border-[color:var(--color-hairline)] bg-primary/85 py-3 backdrop-blur sm:py-4',
      )}
    >
      <button
        type="button"
        onClick={onBack}
        disabled={isFirst}
        className={cn(
          // min-h-11 (44px) — WCAG-минимум для тачдтаргета. Раньше
          // py-2 px-3 даёт ~32px высоту, в перчатках на iPhone попасть
          // нереально. text-sm и небольшой horizontal padding оставлены —
          // увеличиваем только tap-area через min-h.
          'inline-flex min-h-11 items-center gap-2 px-3 py-2 text-sm transition-colors',
          isFirst
            ? 'cursor-not-allowed text-secondary/30'
            : 'text-secondary/75 hover:text-secondary',
        )}
      >
        <ArrowLeft size={16} aria-hidden /> {t('back')}
      </button>

      <button
        type={isLast ? 'submit' : 'button'}
        onClick={isLast ? undefined : onNext}
        disabled={disableNext || isSubmitting}
        className={cn(
          'group inline-flex min-h-11 items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all',
          'border border-secondary bg-secondary text-primary',
          'hover:bg-transparent hover:text-secondary',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        {isLast ? (
          <>
            {isSubmitting ? t('submitting') : t('submit')}
            <Send size={16} aria-hidden />
          </>
        ) : (
          <>
            {t('next')} <ArrowRight size={16} aria-hidden />
          </>
        )}
      </button>
    </div>
  );
}
