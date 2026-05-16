import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { QuizShell } from '@/components/quiz/QuizShell';
import { vpuQuizConfig } from '@/content/quiz/vpu-config';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'quiz.vpu' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

/** /quiz/vpu — опросник по водоподготовке. Акцент: treatment (графит). */
export default function VpuQuizPage() {
  const accentStyle: CSSProperties = {
    '--accent-current': 'var(--accent-treatment)',
  } as CSSProperties;

  return (
    <main className="min-h-screen bg-primary text-secondary" style={accentStyle}>
      <QuizShell config={vpuQuizConfig} accent="treatment" />
    </main>
  );
}
