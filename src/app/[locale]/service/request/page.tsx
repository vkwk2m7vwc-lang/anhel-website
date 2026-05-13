import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServiceRequestForm } from '@/components/service/ServiceRequestForm';

/**
 * /service/request — multistep-форма заявки на сервисное обслуживание.
 *
 * SEO: noindex — поисковикам форма не нужна, в индекс уйдёт только
 * лендинг `/service`.
 *
 * i18n: meta-теги локализованы через service.request_page.*.
 *
 * Сама форма (ServiceRequestForm) остаётся на русском для всех локалей.
 * Причина: 50+ инженерных полей с строгими наименованиями (request_number,
 * equipment_serial, ШУ, ИОТ и т.п.), которые менеджер парсит в RU
 * нотации. EN/TR-клиенты должны писать через `/contacts` — глобальная
 * форма обратной связи на их языке доступна там. Перевод формы заявки —
 * отдельная задача после полной локализации PDF-опросников.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'service.request_page' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    robots: { index: false, follow: false },
  };
}

// Форма большая, состояние — клиентское. SSG смысла не имеет.
export const dynamic = 'force-dynamic';

export default function ServiceRequestPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <ServiceRequestForm />
    </div>
  );
}
