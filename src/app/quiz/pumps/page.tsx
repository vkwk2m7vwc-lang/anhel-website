import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { QuizShell } from '@/components/quiz/QuizShell';
import { pumpsPrefillMap, pumpsAccentMap } from '@/content/quiz/pumps-fields';
import type { PumpsQuizValues } from '@/content/quiz/pumps-schema';

export const metadata: Metadata = {
  title: 'Опросный лист — подбор насосной установки | ANHEL®',
  description:
    'Заполните онлайн-опросник для подбора насосной установки. Менеджер свяжется в течение 1 рабочего дня. Также доступен PDF-вариант.',
};

type Props = {
  searchParams?: { from?: string };
};

/**
 * /quiz/pumps?from=firefighting — пре-фил по подкатегории насосных.
 * Поддержанные значения `from`: firefighting | water-supply | pressure-boost |
 * heating-cooling | special.
 *
 * Дополнительно из `from` тянется акцент-цвет через CSS-variable
 * `--accent-current` — формы для разных подкатегорий получают свой цвет
 * (пожарка красный, водоснабжение синий, отопление янтарный).
 */
export default function PumpsQuizPage({ searchParams }: Props) {
  const from = (searchParams?.from || '').trim();
  const prefill = (pumpsPrefillMap[from] || {}) as Partial<PumpsQuizValues>;
  const accent = pumpsAccentMap[from];

  // Override --accent-current так чтобы он применялся ко всем дочерним
  // компонентам формы — точкам прогресса, проценту, hover-states карточек.
  const accentStyle: CSSProperties | undefined = accent
    ? ({ '--accent-current': accent } as CSSProperties)
    : undefined;

  return (
    <main className="min-h-screen bg-primary text-secondary" style={accentStyle}>
      <QuizShell prefill={prefill} />
    </main>
  );
}
