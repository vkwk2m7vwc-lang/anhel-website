import type { Metadata } from 'next';
import { QuizShell } from '@/components/quiz/QuizShell';
import { pumpsPrefillMap } from '@/content/quiz/pumps-fields';
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
 */
export default function PumpsQuizPage({ searchParams }: Props) {
  const from = (searchParams?.from || '').trim();
  const prefill = (pumpsPrefillMap[from] || {}) as Partial<PumpsQuizValues>;

  return (
    <main className="min-h-screen bg-primary text-secondary">
      <QuizShell prefill={prefill} />
    </main>
  );
}
