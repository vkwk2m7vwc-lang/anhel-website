import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'quiz.control_systems',
  });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    robots: { index: false, follow: false },
  };
}

// Форма большая, состояние клиентское. SSG не имеет смысла.
export const dynamic = 'force-dynamic';

export default function QuizControlSystemsPage() {
  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <QuizControlSystemsForm />
    </div>
  );
}
