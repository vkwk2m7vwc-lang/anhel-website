import type { Metadata } from 'next';
import { QuizControlSystemsForm } from '@/components/products/QuizControlSystemsForm';

/**
 * /quiz/control-systems — multistep-форма опросного листа для шкафов
 * управления.
 *
 * Аналогично `/service/request`: страница выделена в собственный
 * сегмент, чтобы Hero/секции продуктовой страницы не отвлекали от
 * заполнения. Форма — клиентская, состояние в localStorage.
 *
 * SEO: noindex — поисковикам форма не нужна, в индекс уйдёт только
 * раздел `/products/control-systems` и 5 детальных страниц.
 */
export const metadata: Metadata = {
  title: 'Опросный лист · Шкафы управления',
  description:
    'Онлайн-форма опросного листа для подбора шкафов управления ANHEL®.',
  robots: { index: false, follow: false },
};

// Форма большая, состояние клиентское. SSG не имеет смысла.
export const dynamic = 'force-dynamic';

export default function QuizControlSystemsPage() {
  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <QuizControlSystemsForm />
    </div>
  );
}
