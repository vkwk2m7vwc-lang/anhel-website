import type { Metadata } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/product-page/Breadcrumbs';
import {
  SERVICE_CARDS,
  REQUIREMENTS,
  resolveServicePdfHref,
  SERVICE_REQUEST_HREF,
} from '@/content/service/page-content';

/**
 * /service — лендинг сервисного раздела ANHEL.
 *
 * Section map:
 *   01 Hero + CTA
 *   02 Услуги (4 карточки 2×2)
 *   03 Памятка «Что нужно для выезда» (3 пункта)
 *
 * i18n: вся UI-обвязка из `service.*`. Карточки/пункты хранят только
 * icon и key; titles/descriptions резолвятся через
 * t('services.cards.<key>.title') / t('requirements.items.<key>.description').
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'service.meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      type: 'website',
      title: t('title'),
      description: t('description'),
      url: '/service',
    },
  };
}

export default function ServicePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('service');
  const tCards = useTranslations('service.services.cards');
  const tReqs = useTranslations('service.requirements.items');

  const breadcrumbs = [
    { label: t('breadcrumbs.home'), href: '/' },
    { label: t('breadcrumbs.service') },
  ];

  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
      {/* === 01 Hero + CTA === */}
      <section className="relative overflow-hidden border-b border-[var(--color-hairline)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-grid-hairline bg-grid opacity-60"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-24 md:px-12 md:pb-24 md:pt-32">
          <Breadcrumbs items={breadcrumbs} />

          {/* Типографический hero — одна левая колонка max-w-4xl.
              Не двухколоночная сетка: справа формально нет пустой
              половины. Mobile не затронут (там колонка и так одна). */}
          <div className="mt-8 md:mt-10">
            <div className="max-w-4xl">
              <p className="mono-tag">{t('hero.mono_tag')}</p>
              <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] md:mt-8 md:text-6xl lg:text-7xl">
                {t('hero.heading')}
              </h1>
              <p className="mt-6 max-w-[560px] text-body text-[var(--color-secondary)]/75 md:mt-8">
                {t('hero.lede')}
              </p>

              {/* === CTA-кнопки в Hero === */}
              <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5">
                <Link
                  href={SERVICE_REQUEST_HREF}
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)]"
                >
                  {t('hero.cta_online')}
                  <span
                    aria-hidden="true"
                    className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <a
                  href={resolveServicePdfHref(locale)}
                  download
                  data-cursor="hover"
                  className="inline-flex items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-[22px] py-[14px] text-sm font-medium text-[var(--color-secondary)]/85 transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
                >
                  {t('hero.cta_pdf')}
                  <span
                    aria-hidden="true"
                    className="font-mono text-[var(--color-secondary)]/65"
                  >
                    ↓
                  </span>
                </a>
              </div>

              <p className="mt-6 max-w-[520px] text-xs leading-relaxed text-[var(--color-secondary)]/55 md:text-sm">
                {t('hero.footnote')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* === 02 Услуги === */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag">{t('services.mono_tag')}</p>
          <h2 className="mt-4 max-w-[680px] font-display text-3xl font-medium leading-tight md:mt-6 md:text-4xl lg:text-5xl">
            {t('services.heading')}
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border-[0.5px] border-[var(--color-hairline)] bg-[var(--color-hairline)] md:mt-14 md:grid-cols-2">
            {SERVICE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <li
                  key={card.key}
                  className="flex flex-col gap-5 bg-[var(--color-primary)] p-6 transition-colors hover:bg-[var(--color-hover-tint)] md:gap-6 md:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center text-[var(--color-secondary)]/85"
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium leading-tight md:text-2xl">
                      {tCards(`${card.key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)]/70 md:text-[15px]">
                      {tCards(`${card.key}.description`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* === 03 Памятка === */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag">{t('requirements.mono_tag')}</p>
          <h2 className="mt-4 max-w-[760px] font-display text-3xl font-medium leading-tight md:mt-6 md:text-4xl lg:text-5xl">
            {t('requirements.heading')}
          </h2>

          <ol className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-14 md:grid-cols-3">
            {REQUIREMENTS.map((req, i) => (
              <li
                key={req.key}
                className="border-t border-[var(--color-hairline)] pt-6"
              >
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-lg font-medium leading-tight md:text-xl">
                  {tReqs(`${req.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)]/70 md:text-[15px]">
                  {tReqs(`${req.key}.description`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}
