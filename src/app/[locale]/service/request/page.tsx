import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServiceRequestForm } from '@/components/service/ServiceRequestForm';

/**
 * /service/request — multistep-форма заявки на сервисное обслуживание.
 *
 * SEO: noindex — поисковикам форма не нужна, в индекс уйдёт только
 * лендинг `/service`.
 *
 * i18n: meta-теги и форма локализованы через service.request_form.*
 * (см. _scripts/locales). Form labels / placeholders / hints overlaid
 * via useTranslatedServiceSteps hook with TS RU fallback.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'service.request_form' });
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
