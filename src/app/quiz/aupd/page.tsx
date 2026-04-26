import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { QuizShell } from '@/components/quiz/QuizShell';
import { aupdQuizConfig } from '@/content/quiz/aupd-config';

export const metadata: Metadata = {
  title: 'Опросный лист — АУПД | ANHEL®',
  description:
    'Заполните онлайн-опросник для подбора автоматической установки поддержания давления (АУПД) ANHEL®. Менеджер свяжется в течение 1 рабочего дня.',
};

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
