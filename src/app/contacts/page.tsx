import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import { LEGAL_ENTITY } from "@/lib/legal";
import { ContactForm } from "@/components/contacts/ContactForm";

/**
 * `/contacts` — отдельная страница «Контакты».
 *
 * Заменяет мёртвую ссылку на якорь `/#contact` (C1 из pre-launch audit).
 * Структура (сверху вниз):
 *   1. Hero-блок — h1 + lede
 *   2. Quick contacts — телефон + email (крупно, кликабельно)
 *   3. Реквизиты ООО «Профит» — полная карточка для счёта/договора
 *   4. Яндекс-карта офиса (iframe)
 *   5. Форма обратной связи (с обязательным чекбоксом согласия на ПД)
 *
 * Карта: координаты Политехническая ул., 6/1 — 60.0048, 30.3724
 * (СПб, Светлановское МО). Если адрес поменяется — поправить координаты
 * и подпись в одном месте здесь.
 *
 * Кнопка «Скачать карточку организации» (PDF) — заглушка с TODO,
 * пока файл `/public/anhel-card.pdf` не загружен. Когда придёт PDF —
 * убрать `aria-disabled` и поставить href на реальный файл.
 */
export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты ANHEL® — телефон, email, реквизиты ООО «Профит», адрес офиса в Санкт-Петербурге и форма обратной связи.",
};

const YANDEX_MAP_SRC =
  "https://yandex.ru/map-widget/v1/?text=" +
  encodeURIComponent("Санкт-Петербург, ул. Политехническая, 6 стр. 1") +
  "&z=17";

export default function ContactsPage() {
  return (
    <main className="pt-24 md:pt-32">
      {/* Hero */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag mb-6">Контакты</p>
          <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Свяжитесь с нами — обсудим задачу, подберём решение, посчитаем КП.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-secondary)]/70 md:text-lg">
            Офис и инженерное бюро — Санкт-Петербург. Производство — Москва. Сервисная бригада работает по объектам в эксплуатации круглосуточно.
          </p>
        </div>
      </section>

      {/* Quick contacts */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-14 md:grid-cols-2 md:px-12">
          <Link
            href={`tel:${CONTACTS.phoneTel}`}
            data-cursor="hover"
            className="group flex items-start gap-4 rounded-sm border border-[var(--color-hairline)] p-6 transition-colors hover:border-[var(--color-secondary)]/40"
          >
            <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-hairline)]">
              <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                Телефон
              </p>
              <p className="mt-2 font-mono text-xl md:text-2xl">
                {CONTACTS.phone}
              </p>
              <p className="mt-2 text-sm text-[var(--color-secondary)]/55">
                Пн–Пт, 9:00–18:00 (МСК)
              </p>
            </span>
          </Link>

          <Link
            href={`mailto:${CONTACTS.email}`}
            data-cursor="hover"
            className="group flex items-start gap-4 rounded-sm border border-[var(--color-hairline)] p-6 transition-colors hover:border-[var(--color-secondary)]/40"
          >
            <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-hairline)]">
              <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                Email
              </p>
              <p className="mt-2 break-all font-mono text-xl md:text-2xl">
                {CONTACTS.email}
              </p>
              <p className="mt-2 text-sm text-[var(--color-secondary)]/55">
                Отвечаем в течение рабочего дня
              </p>
            </span>
          </Link>
        </div>
      </section>

      {/* Реквизиты — карточка организации */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag mb-6">Реквизиты</p>

          <article className="rounded-md border border-[var(--color-hairline)] bg-[var(--color-primary)] p-8 shadow-sm md:p-14">
            {/* Card header — wordmark + document label */}
            <header className="flex flex-col gap-3 border-b border-[var(--color-hairline)] pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
              <div>
                <p className="font-display text-3xl tracking-[0.04em] md:text-4xl">
                  ANHEL
                  <span aria-hidden="true" className="align-super text-[0.5em] tracking-normal">
                    ®
                  </span>
                </p>
                <p className="mt-2 text-sm text-[var(--color-secondary)]/60">
                  Инженерное оборудование
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-secondary)]/55">
                Карточка организации
              </p>
            </header>

            {/* Section: Наименование */}
            <RekvSection title="Наименование">
              <RekvRow label="Полное наименование" value={LEGAL_ENTITY.fullName} />
              <RekvRow label="Сокращённое наименование" value={LEGAL_ENTITY.shortName} />
            </RekvSection>

            {/* Section: Адрес */}
            <RekvSection title="Адрес">
              <RekvRow label="Юридический адрес" value={LEGAL_ENTITY.legalAddressLine} />
              <RekvRow label="Фактический адрес" value={LEGAL_ENTITY.actualAddressLine} />
            </RekvSection>

            {/* Section: Регистрационные коды */}
            <RekvSection title="Регистрационные данные" cols={2}>
              <RekvRow label="ИНН" value={LEGAL_ENTITY.inn} mono />
              <RekvRow label="КПП" value={LEGAL_ENTITY.kpp} mono />
              <RekvRow label="ОГРН" value={LEGAL_ENTITY.ogrn} mono />
              <RekvRow label="ОКПО" value={LEGAL_ENTITY.okpo} mono />
              <RekvRow label="ОКАТО" value={LEGAL_ENTITY.okato} mono />
            </RekvSection>

            {/* Section: Банковские */}
            <RekvSection title="Банковские реквизиты">
              <RekvRow label="Банк" value={LEGAL_ENTITY.bank} />
              <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
                <RekvRow label="Расчётный счёт" value={LEGAL_ENTITY.account} mono />
                <RekvRow label="БИК" value={LEGAL_ENTITY.bik} mono />
                <RekvRow label="Корреспондентский счёт" value={LEGAL_ENTITY.correspondentAccount} mono />
              </div>
            </RekvSection>

            {/* Section: Подпись */}
            <RekvSection title="Руководство" last>
              <RekvRow label="Генеральный директор" value={LEGAL_ENTITY.director} />
            </RekvSection>

            {/* Download */}
            <div className="mt-10 flex flex-col items-start gap-3 border-t border-[var(--color-hairline)] pt-8 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-[var(--color-secondary)]/55">
                Можно скачать PDF и приложить к заявке, договору или счёту.
              </p>
              <a
                href="/anhel-card.pdf"
                download="ANHEL-karta-organizacii.pdf"
                data-cursor="hover"
                className="inline-flex items-center gap-3 rounded-sm border border-[var(--color-secondary)] bg-[var(--color-secondary)] px-7 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-primary)] transition-opacity hover:opacity-90"
              >
                Скачать карточку (PDF)
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Map */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <p className="mono-tag mb-6">Адрес офиса</p>
          <p className="max-w-2xl font-display text-2xl leading-tight md:text-3xl">
            {LEGAL_ENTITY.legalAddressLine}
          </p>
          <div className="mt-10 overflow-hidden rounded-sm border border-[var(--color-hairline)]">
            <iframe
              title="Карта офиса ANHEL® — Политехническая ул., д. 6, стр. 1"
              src={YANDEX_MAP_SRC}
              width="100%"
              height="480"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block border-0"
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-[1fr_1.2fr] md:gap-20 md:px-12 md:py-24">
          <div>
            <p className="mono-tag mb-6">Форма обратной связи</p>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              Напишите задачу — ответим решением, не отпиской.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-secondary)]/70">
              Если знаете, что нужно — напишите параметры. Если ещё думаете — опишите объект и задачу своими словами, инженер свяжется и поможет сформулировать.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}

function RekvSection({
  title,
  cols = 1,
  last,
  children,
}: {
  title: string;
  cols?: 1 | 2;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={
        "py-8 md:py-10 " +
        (last ? "" : "border-b border-[var(--color-hairline)]")
      }
    >
      <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55">
        {title}
      </h2>
      <div
        className={
          cols === 2
            ? "grid gap-x-10 gap-y-6 md:grid-cols-2"
            : "flex flex-col gap-6"
        }
      >
        {children}
      </div>
    </section>
  );
}

function RekvRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
        {label}
      </p>
      <p
        className={
          "mt-2 leading-relaxed text-[var(--color-secondary)] " +
          (mono ? "font-mono text-[15px] tracking-[0.02em]" : "text-[15px]")
        }
      >
        {value}
      </p>
    </div>
  );
}
