import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/product-page/Breadcrumbs';
import {
  SERVICE_CARDS,
  REQUIREMENTS,
  SERVICE_PDF_HREF,
  SERVICE_REQUEST_HREF,
} from '@/content/service/page-content';

/**
 * /service — лендинг сервисного раздела ANHEL.
 *
 * Главная цель — довести до заявки. Поэтому CTA-кнопки (Заполнить онлайн +
 * Скачать PDF) живут прямо в Hero — без скролла. Дальше идут поддерживающие
 * секции: что мы делаем, что нужно для выезда, контакты.
 *
 * Тарифы и сроки сознательно убраны — могут поменяться, и держать их в
 * статичной разметке = риск устаревания.
 *
 * Section map:
 *   01 Hero + CTA
 *   02 Услуги (4 карточки 2×2)
 *   03 Памятка «Что нужно для выезда» (3 пункта)
 *   04 Контакты сервиса
 */
export const metadata: Metadata = {
  title: 'Сервисное обслуживание',
  description:
    'Диагностика, пусконаладка и шефмонтаж насосных установок, тепловых пунктов и систем водоподготовки ANHEL. Заявка на сервис онлайн или PDF.',
  openGraph: {
    type: 'website',
    title: 'Сервисное обслуживание · ANHEL®',
    description:
      'Диагностика, пусконаладка и шефмонтаж насосных установок, тепловых пунктов и систем водоподготовки ANHEL. Заявка на сервис онлайн или PDF.',
    url: '/service',
  },
};

const BREADCRUMBS = [
  { label: 'Главная', href: '/' },
  { label: 'Сервис' },
];

export default function ServicePage() {
  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
      {/* === 01 Hero + CTA === */}
      <section className="relative overflow-hidden border-b border-[var(--color-hairline)]">
        {/* Hairline grid фон — как на продуктовых страницах */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-grid-hairline bg-grid opacity-60"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-24 md:px-12 md:pb-24 md:pt-32">
          <Breadcrumbs items={BREADCRUMBS} />

          <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-7">
              <p className="mono-tag">Сервис</p>
              <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] md:mt-8 md:text-6xl lg:text-7xl">
                Сервисное обслуживание
              </h1>
              <p className="mt-6 max-w-[560px] text-body text-[var(--color-secondary)]/75 md:mt-8">
                Диагностика, ремонт, пусконаладка и шефмонтаж оборудования
                ANHEL. Выезд инженера на объект — после получения заполненной
                заявки.
              </p>

              {/* === CTA-кнопки в Hero === */}
              <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5">
                <Link
                  href={SERVICE_REQUEST_HREF}
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)]"
                >
                  Заполнить онлайн
                  <span
                    aria-hidden="true"
                    className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <a
                  href={SERVICE_PDF_HREF}
                  download
                  data-cursor="hover"
                  className="inline-flex items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-[22px] py-[14px] text-sm font-medium text-[var(--color-secondary)]/85 transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
                >
                  Скачать PDF-заявку
                  <span
                    aria-hidden="true"
                    className="font-mono text-[var(--color-secondary)]/65"
                  >
                    ↓
                  </span>
                </a>
              </div>

              <p className="mt-6 max-w-[520px] text-xs leading-relaxed text-[var(--color-secondary)]/55 md:text-sm">
                Решение о выезде сервисного инженера принимается после
                получения заполненной и пропечатанной заявки на
                info@anhelspb.com.
              </p>
            </div>

            {/* Right column: stats plate — заполняет визуальную пустоту в
                Hero и одновременно даёт scan-credibility перед кликом по
                CTA. Стат-блоки факт. характеристики процесса (НЕ цены —
                цены подвижны), вертикальная hairline-разделённая стопка. */}
            <div className="md:col-span-5">
              <dl className="grid grid-cols-1 divide-y divide-[var(--color-hairline)] border-y border-[var(--color-hairline)] md:mt-2">
                {[
                  { k: 'Реакция', v: '1 рабочий день' },
                  { k: 'География', v: 'СПб + регионы' },
                  { k: 'Документы', v: 'Сервисный протокол + Акт' },
                  { k: 'Гарантия', v: 'на оборудование и работы' },
                ].map(({ k, v }) => (
                  <div key={k} className="flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between md:gap-6 md:py-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                      {k}
                    </dt>
                    <dd className="font-display text-base text-[var(--color-secondary)]/90 md:text-lg">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* === 02 Услуги === */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag">02 · Что мы делаем</p>
          <h2 className="mt-4 max-w-[680px] font-display text-3xl font-medium leading-tight md:mt-6 md:text-4xl lg:text-5xl">
            Четыре направления сервиса
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border-[0.5px] border-[var(--color-hairline)] bg-[var(--color-hairline)] md:mt-14 md:grid-cols-2">
            {SERVICE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <li
                  key={card.title}
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
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)]/70 md:text-[15px]">
                      {card.description}
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
          <p className="mono-tag">03 · Что нужно для выезда</p>
          <h2 className="mt-4 max-w-[760px] font-display text-3xl font-medium leading-tight md:mt-6 md:text-4xl lg:text-5xl">
            Чтобы выезд состоялся вовремя
          </h2>

          <ol className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-14 md:grid-cols-3">
            {REQUIREMENTS.map((req, i) => (
              <li
                key={req.title}
                className="border-t border-[var(--color-hairline)] pt-6"
              >
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-lg font-medium leading-tight md:text-xl">
                  {req.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)]/70 md:text-[15px]">
                  {req.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}
