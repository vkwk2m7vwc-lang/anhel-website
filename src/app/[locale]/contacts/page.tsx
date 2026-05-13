import type { Metadata } from "next";
import { Link } from "@/navigation";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CONTACTS } from "@/lib/contacts";
import { ContactForm } from "@/components/contacts/ContactForm";

/**
 * `/contacts` — отдельная страница «Контакты».
 *
 * Структура (сверху вниз):
 *   1. Hero-блок — h1 + lede
 *   2. Quick contacts — телефон + email (крупно, кликабельно)
 *   3. Карточка организации — информативный блок «с кем имеете дело»
 *   4. Яндекс-карта офиса (iframe)
 *   5. Форма обратной связи (с обязательным чекбоксом согласия на ПД)
 *
 * Карта: координаты Политехническая ул., 6/1 — 60.0048, 30.3724.
 *
 * i18n: вся карточка организации (включая значения — полное название,
 * адрес, банк, числовые идентификаторы) хранится в contacts.json под
 * `requisites.values.*`. На EN/TR — международный B2B-формат
 * (Profit LLC, transliterated address, Alfa-Bank JSC). Числовые
 * идентификаторы (ИНН, ОГРН, BIK, счёт) одинаковы во всех локалях.
 * Это информативный блок, не юр.документ — договор и юр.документы
 * пересылаются юристами отдельно по почте.
 *
 * Поля реквизитов сложены под единый нативный `<details>` (одинаково
 * на всех 3 локалях) — карточка не шумит, посетитель видит сначала
 * только название + подзаголовок + ярлык, при клике раскрывает полную
 * выкладку. summary-надпись локализована (`requisites.disclosure_summary`).
 *
 * Юр.факты для документов (privacy-policy, personal-data-consent)
 * по-прежнему берутся из `@/lib/legal` LEGAL_ENTITY (RU-only).
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "contacts.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const YANDEX_MAP_SRC =
  "https://yandex.ru/map-widget/v1/?text=" +
  encodeURIComponent("Санкт-Петербург, ул. Политехническая, 6 стр. 1") +
  "&z=17";

export default function ContactsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("contacts");

  return (
    <main className="pt-24 md:pt-32">
      {/* Hero */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag mb-6">{t("hero.mono_tag")}</p>
          <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            {t("hero.heading")}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-secondary)]/70 md:text-lg">
            {t("hero.subtitle")}
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
                {t("quick.phone_label")}
              </p>
              <p className="mt-2 font-mono text-xl md:text-2xl">
                {CONTACTS.phone}
              </p>
              <p className="mt-2 text-sm text-[var(--color-secondary)]/55">
                {t("quick.phone_hours")}
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
                {t("quick.email_label")}
              </p>
              <p className="mt-2 break-all font-mono text-xl md:text-2xl">
                {CONTACTS.email}
              </p>
              <p className="mt-2 text-sm text-[var(--color-secondary)]/55">
                {t("quick.email_response")}
              </p>
            </span>
          </Link>
        </div>
      </section>

      {/* Реквизиты — карточка организации.
          id="requisites" — якорь для ссылок из Footer (`/contacts#requisites`). */}
      <section
        id="requisites"
        className="scroll-mt-24 border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag mb-6">{t("requisites.mono_tag")}</p>

          <article className="rounded-md border border-[var(--color-hairline)] bg-[var(--color-primary)] p-8 shadow-sm md:p-14">
            <header className="flex flex-col gap-3 border-b border-[var(--color-hairline)] pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
              <div>
                {/* Локалезависимое короткое имя: ООО «Профит» / Profit LLC. */}
                <p className="font-display text-3xl tracking-[0.02em] md:text-4xl">
                  {t("requisites.values.short_name")}
                </p>
                <p className="mt-2 text-sm text-[var(--color-secondary)]/60">
                  {t("requisites.brand_subtitle")}
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-secondary)]/55">
                {t("requisites.card_label")}
              </p>
            </header>

            <details className="group">
              <summary
                data-cursor="hover"
                className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/70 transition-colors marker:hidden hover:text-[var(--color-secondary)] [&::-webkit-details-marker]:hidden"
              >
                <span className="normal-case tracking-normal text-[13px] text-[var(--color-secondary)]/70 md:text-[14px]">
                  {t("requisites.disclosure_summary")}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-hairline)] text-base transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="pt-2">
                <RekvSection title={t("requisites.sections.identification")}>
                  <RekvRow
                    label={t("requisites.labels.full_name")}
                    value={t("requisites.values.full_name")}
                  />
                  <RekvRow
                    label={t("requisites.labels.short_name")}
                    value={t("requisites.values.short_name")}
                  />
                </RekvSection>

                <RekvSection title={t("requisites.sections.address")}>
                  <RekvRow
                    label={t("requisites.labels.legal_address")}
                    value={t("requisites.values.legal_address")}
                  />
                  <RekvRow
                    label={t("requisites.labels.actual_address")}
                    value={t("requisites.values.actual_address")}
                  />
                </RekvSection>

                <RekvSection title={t("requisites.sections.registration")} cols={2}>
                  <RekvRow label={t("requisites.labels.inn")} value={t("requisites.values.inn")} mono />
                  <RekvRow label={t("requisites.labels.kpp")} value={t("requisites.values.kpp")} mono />
                  <RekvRow label={t("requisites.labels.ogrn")} value={t("requisites.values.ogrn")} mono />
                  <RekvRow label={t("requisites.labels.okpo")} value={t("requisites.values.okpo")} mono />
                  <RekvRow label={t("requisites.labels.okato")} value={t("requisites.values.okato")} mono />
                </RekvSection>

                <RekvSection title={t("requisites.sections.banking")}>
                  <RekvRow label={t("requisites.labels.bank")} value={t("requisites.values.bank")} />
                  <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
                    <RekvRow label={t("requisites.labels.account")} value={t("requisites.values.account")} mono />
                    <RekvRow label={t("requisites.labels.bik")} value={t("requisites.values.bik")} mono />
                    <RekvRow
                      label={t("requisites.labels.correspondent_account")}
                      value={t("requisites.values.correspondent_account")}
                      mono
                    />
                  </div>
                </RekvSection>

                <RekvSection title={t("requisites.sections.leadership")} last>
                  <RekvRow
                    label={t("requisites.labels.director")}
                    value={t("requisites.values.director")}
                  />
                </RekvSection>

                <div className="mt-10 flex flex-col items-start gap-3 border-t border-[var(--color-hairline)] pt-8 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm text-[var(--color-secondary)]/55">
                    {t("requisites.download_note")}
                  </p>
                  <a
                    href="/anhel-card.pdf"
                    download="ANHEL-karta-organizacii.pdf"
                    data-cursor="hover"
                    className="inline-flex items-center gap-3 rounded-sm border border-[var(--color-secondary)] bg-[var(--color-secondary)] px-7 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-primary)] transition-opacity hover:opacity-90"
                  >
                    {t("requisites.download_cta")}
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </details>
          </article>
        </div>
      </section>

      {/* Map */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <p className="mono-tag mb-6">{t("map.mono_tag")}</p>
          <p className="max-w-2xl font-display text-2xl leading-tight md:text-3xl">
            {t("requisites.values.legal_address")}
          </p>
          <div className="mt-10 overflow-hidden rounded-sm border border-[var(--color-hairline)]">
            <iframe
              title={t("map.iframe_title")}
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
            <p className="mono-tag mb-6">{t("form.mono_tag")}</p>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              {t("form.heading")}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-secondary)]/70">
              {t("form.lede")}
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
