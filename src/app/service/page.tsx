import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Breadcrumbs } from '@/components/product-page/Breadcrumbs';
import {
  SERVICE_CARDS,
  TARIFF_CARDS,
  TARIFF_FOOTNOTE,
  REQUIREMENTS,
  SERVICE_PDF_HREF,
  SERVICE_REQUEST_HREF,
  CTA_NOTE,
} from '@/content/service/page-content';

/**
 * /service — лендинг сервисного раздела ANHEL.
 *
 * Цель страницы — довести до заявки: либо PDF-файл скачать и отправить
 * на info@anhelspb.com, либо заполнить онлайн (`/service/request`). Всё
 * остальное (тарифы, памятка, перечень услуг) — поддержка решения, без
 * которой клиент справедливо засомневался бы.
 *
 * Section map:
 *   01 Hero (служебный, без 3D-фона — внимание держим на CTA-блоке).
 *   02 Услуги — 4 карточки 2×2 без переходов на отдельные страницы.
 *   03 CTA — две кнопки рядом + пояснение под ними.
 *   04 Тарифы и сроки — 4 цифровые карточки + сноска про негарантийные.
 *   05 «Что нужно для выезда» — 3 пункта.
 *   06 Контакты — компактный блок с телефоном/email/адресом.
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
      {/* === 01 Hero === */}
      <section className="relative border-b border-[var(--color-hairline)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-14 pt-24 md:px-12 md:pb-20 md:pt-32">
          <Breadcrumbs items={BREADCRUMBS} />
          <p className="mono-tag mt-8">Сервис</p>
          <h1 className="mt-6 max-w-[920px] font-display text-5xl font-medium leading-[1.05] md:text-6xl lg:text-7xl">
            Сервисное обслуживание
          </h1>
          <p className="mt-6 max-w-[640px] text-body text-[var(--color-secondary)]/75 md:mt-8">
            Диагностика, ремонт, пусконаладка и шефмонтаж оборудования ANHEL.
          </p>
        </div>
      </section>

      {/* === 02 Услуги (4 карточки) === */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag">02 · Что мы делаем</p>
          <h2 className="mt-4 max-w-[680px] font-display text-3xl font-medium leading-tight md:mt-6 md:text-4xl lg:text-5xl">
            Четыре направления сервиса
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
            {SERVICE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <li
                  key={card.title}
                  className="flex flex-col gap-4 rounded-md border-[0.5px] border-[var(--color-hairline)] bg-[var(--color-hover-tint)] p-6 md:gap-5 md:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-secondary)]/5 text-[var(--color-secondary)]/85"
                  >
                    <Icon size={20} strokeWidth={1.5} />
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

      {/* === 03 CTA — главная цель страницы === */}
      <section
        id="request"
        className="border-b border-[var(--color-hairline)] bg-[var(--color-hover-tint)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag">03 · Заявка на диагностику</p>
          <h2 className="mt-4 max-w-[760px] font-display text-3xl font-medium leading-tight md:mt-6 md:text-4xl lg:text-5xl">
            Оформите заявку — мы согласуем выезд инженера
          </h2>

          <div className="mt-10 flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center md:mt-12 md:gap-5">
            <Link
              href={SERVICE_REQUEST_HREF}
              data-cursor="hover"
              className="group inline-flex items-center justify-center gap-3 rounded-md bg-[var(--color-secondary)] px-6 py-[14px] text-sm font-medium text-[var(--color-primary)]"
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
              className="inline-flex items-center justify-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-6 py-[14px] text-sm font-medium text-[var(--color-secondary)]/85 transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
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

          <p className="mt-6 max-w-[640px] text-sm leading-relaxed text-[var(--color-secondary)]/65 md:mt-8 md:text-[15px]">
            {CTA_NOTE}
          </p>
        </div>
      </section>

      {/* === 04 Тарифы и сроки === */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag">04 · Тарифы и сроки</p>
          <h2 className="mt-4 max-w-[680px] font-display text-3xl font-medium leading-tight md:mt-6 md:text-4xl lg:text-5xl">
            Прозрачно по стоимости и срокам
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border-[0.5px] border-[var(--color-hairline)] bg-[var(--color-hairline)] sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
            {TARIFF_CARDS.map((card, idx) => (
              <li
                key={`${card.value}-${idx}`}
                className="flex flex-col gap-4 bg-[var(--color-primary)] p-6 md:gap-5 md:p-8"
              >
                <p className="font-display text-3xl font-medium leading-none tracking-tight md:text-[40px] lg:text-5xl">
                  {card.value}
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-secondary)]/70 md:text-[15px]">
                  {card.label}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[840px] text-xs leading-relaxed text-[var(--color-secondary)]/55 md:mt-10 md:text-sm">
            {TARIFF_FOOTNOTE}
          </p>
        </div>
      </section>

      {/* === 05 Памятка === */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag">05 · Что нужно для выезда</p>
          <h2 className="mt-4 max-w-[760px] font-display text-3xl font-medium leading-tight md:mt-6 md:text-4xl lg:text-5xl">
            Чтобы выезд состоялся вовремя
          </h2>

          <ol className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
            {REQUIREMENTS.map((req, i) => (
              <li
                key={req.title}
                className="flex flex-col gap-4 rounded-md border-[0.5px] border-[var(--color-hairline)] bg-[var(--color-hover-tint)] p-6 md:gap-5 md:p-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div>
                  <h3 className="font-display text-lg font-medium leading-tight md:text-xl">
                    {req.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)]/70 md:text-[15px]">
                    {req.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* === 06 Контакты сервиса === */}
      <section>
        <div className="mx-auto w-full max-w-[1440px] px-6 py-14 md:px-12 md:py-20">
          <p className="mono-tag">06 · Контакты сервиса</p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3 md:gap-8">
            <a
              href="tel:+78124164500"
              data-cursor="hover"
              className="group flex items-start gap-4"
            >
              <span
                aria-hidden="true"
                className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-secondary)]/5 text-[var(--color-secondary)]/85"
              >
                <Phone size={16} strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                  Телефон
                </p>
                <p className="mt-1 font-display text-lg text-[var(--color-secondary)] transition-opacity group-hover:opacity-80">
                  +7 (812) 416-4500
                </p>
              </div>
            </a>

            <a
              href="mailto:info@anhelspb.com"
              data-cursor="hover"
              className="group flex items-start gap-4"
            >
              <span
                aria-hidden="true"
                className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-secondary)]/5 text-[var(--color-secondary)]/85"
              >
                <Mail size={16} strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                  E-mail
                </p>
                <p className="mt-1 font-display text-lg text-[var(--color-secondary)] transition-opacity group-hover:opacity-80">
                  info@anhelspb.com
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-secondary)]/5 text-[var(--color-secondary)]/85"
              >
                <MapPin size={16} strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                  Адрес
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-secondary)]/85 md:text-[15px]">
                  ООО «Профит», г. Санкт-Петербург,
                  <br />
                  Политехническая ул., д. 6, стр. 1, пом. 1-Н
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
