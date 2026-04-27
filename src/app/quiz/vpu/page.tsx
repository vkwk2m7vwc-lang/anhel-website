import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { QuizShell } from '@/components/quiz/QuizShell';
import { vpuQuizConfig } from '@/content/quiz/vpu-config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Опросный лист — установки водоподготовки | ANHEL®',
  description:
    'Заполните онлайн-опросник для подбора установки водоподготовки ANHEL®. Менеджер свяжется в течение 1 рабочего дня.',
};

/** /quiz/vpu — опросник по водоподготовке. Акцент: treatment (графит). */
export default function VpuQuizPage() {
  const accentStyle: CSSProperties = {
    '--accent-current': 'var(--accent-treatment)',
  } as CSSProperties;

  return (
    <main className="min-h-screen bg-primary text-secondary" style={accentStyle}>
      <QuizShell config={vpuQuizConfig} />
    </main>
  );
}
