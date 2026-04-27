import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { QuizShell } from '@/components/quiz/QuizShell';
import { itpQuizConfig } from '@/content/quiz/itp-config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Опросный лист — БИТП | ANHEL®',
  description:
    'Заполните онлайн-опросник для подбора блочного индивидуального теплового пункта (БИТП) ANHEL®. Менеджер свяжется в течение 1 рабочего дня.',
};

/** /quiz/itp — опросник по БИТП. Акцент: heat (янтарный). */
export default function ItpQuizPage() {
  const accentStyle: CSSProperties = {
    '--accent-current': 'var(--accent-heat)',
  } as CSSProperties;

  return (
    <main className="min-h-screen bg-primary text-secondary" style={accentStyle}>
      <QuizShell config={itpQuizConfig} />
    </main>
  );
}
