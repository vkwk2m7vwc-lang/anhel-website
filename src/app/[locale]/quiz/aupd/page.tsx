import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { QuizShell } from '@/components/quiz/QuizShell';
import { aupdQuizConfig } from '@/content/quiz/aupd-config';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'quiz.aupd' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

/** /quiz/aupd — опросник по АУПД. Акцент: water (синий). */
export default function AupdQuizPage() {
  const accentStyle: CSSProperties = {
    '--accent-current': 'var(--accent-water)',
  } as CSSProperties;

  return (
    <main className="min-h-screen bg-primary text-secondary" style={accentStyle}>
      <QuizShell config={aupdQuizConfig} />
    </main>
  );
}
