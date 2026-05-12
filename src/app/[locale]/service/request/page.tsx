import type { Metadata } from 'next';
import { ServiceRequestForm } from '@/components/service/ServiceRequestForm';

/**
 * /service/request — multistep-форма заявки на сервисное обслуживание.
 *
 * Страница вынесена в собственный сегмент, потому что Hero/секции
 * лендинга `/service` отвлекали бы от заполнения. На форме — компактная
 * шапка и прогресс-бар, без шапки сайта (Header всё равно глобальный).
 *
 * SEO: noindex — поисковикам форма не нужна, в индекс уйдёт только
 * лендинг `/service`.
 */
export const metadata: Metadata = {
  title: 'Заявка на диагностику',
  description:
    'Онлайн-форма заявки на сервисное обслуживание оборудования ANHEL.',
  robots: { index: false, follow: false },
};

// Форма большая, состояние — клиентское. SSG смысла не имеет.
export const dynamic = 'force-dynamic';

export default function ServiceRequestPage() {
  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <ServiceRequestForm />
    </div>
  );
}
