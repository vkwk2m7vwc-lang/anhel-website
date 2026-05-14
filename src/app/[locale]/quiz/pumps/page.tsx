import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { QuizShell } from '@/components/quiz/QuizShell';
import { pumpsPrefillMap, pumpsAccentMap } from '@/content/quiz/pumps-fields';
import { pumpsQuizConfig } from '@/content/quiz/pumps-config';

// Render at request-time, не во время build. Quiz-форма большая и состоит
// из client-component, статическая генерация для неё не имеет смысла.
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'quiz.pumps',
  });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

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
  const prefill = pumpsPrefillMap[from] || {};
  const accent = pumpsAccentMap[from];

  const accentStyle: CSSProperties | undefined = accent
    ? ({ '--accent-current': accent } as CSSProperties)
    : undefined;

  return (
    <main className="min-h-screen bg-primary text-secondary" style={accentStyle}>
      <QuizShell config={pumpsQuizConfig} prefill={prefill} />
    </main>
  );
}
