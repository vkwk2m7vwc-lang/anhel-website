import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { QuizShell } from '@/components/quiz/QuizShell';
import { itpQuizConfig } from '@/content/quiz/itp-config';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'quiz.itp' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

/** /quiz/itp — опросник по БИТП. Акцент: heat (янтарный). */
export default function ItpQuizPage() {
  const accentStyle: CSSProperties = {
    '--accent-current': 'var(--accent-heat)',
  } as CSSProperties;

  return (
    <main className="min-h-screen bg-primary text-secondary" style={accentStyle}>
      <QuizShell config={itpQuizConfig} accent="heat" />
    </main>
  );
}
