import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CONTACTS } from "@/lib/contacts";
import { LEGAL_ENTITY } from "@/lib/legal";

/**
 * `/privacy-policy` — Политика обработки персональных данных.
 *
 * Базовый юр.документ под 152-ФЗ РФ. Текст переведён на EN/TR как
 * пояснение для иностранных посетителей; юр. сила сохраняется только
 * у русской редакции (она и есть тот документ, который субъект ПД
 * подтверждает чекбоксом). Реквизиты Оператора (полное наименование
 * ООО «Профит», ИНН, ОГРН, юр.адрес) — RU во всех локалях, это юр.
 * факты.
 *
 * При материальных правках обновляется `effective_date` в JSON и
 * добавляется запись в /personal-data-consent.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "legal.privacy.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const LEGAL_PRIVACY_EMAIL = CONTACTS.email;

export default function PrivacyPolicyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("legal.privacy");

  const operator = LEGAL_ENTITY.fullName;
  const emailLink = (
    <a
      href={`mailto:${LEGAL_PRIVACY_EMAIL}`}
      className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
    >
      {LEGAL_PRIVACY_EMAIL}
    </a>
  );
  const siteLink = (
    <a
      href="https://anhelspb.com"
      className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
    >
      anhelspb.com
    </a>
  );

  return (
    <main className="pt-24 md:pt-32">
      <article className="mx-auto max-w-3xl px-6 pb-24 text-[var(--color-secondary)] md:px-8 md:pb-32">
        <p className="mono-tag mb-6">{t("mono_tag")}</p>
        <h1 className="font-display text-3xl leading-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          {t("effective", { date: t("effective_date") })}
        </p>

        <Block n="1" title={t("s1.title")}>
          <p>{t("s1.p1", { operator })}</p>
          <p>
            {t("s1.p2_before")} {siteLink}
            {t("s1.p2_after")}
          </p>
        </Block>

        <Block n="2" title={t("s2.title")}>
          <dl className="grid gap-x-6 gap-y-3 md:grid-cols-[max-content_1fr]">
            <Term>{t("s2.labels.full_name")}</Term>
            <Definition>{LEGAL_ENTITY.fullName}</Definition>
            <Term>{t("s2.labels.short_name")}</Term>
            <Definition>{LEGAL_ENTITY.shortName}</Definition>
            <Term>{t("s2.labels.inn")}</Term>
            <Definition mono>{LEGAL_ENTITY.inn}</Definition>
            <Term>{t("s2.labels.ogrn")}</Term>
            <Definition mono>{LEGAL_ENTITY.ogrn}</Definition>
            <Term>{t("s2.labels.legal_address")}</Term>
            <Definition>{LEGAL_ENTITY.legalAddressFull}</Definition>
            <Term>{t("s2.labels.email")}</Term>
            <Definition mono>
              <a
                href={`mailto:${LEGAL_PRIVACY_EMAIL}`}
                className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
              >
                {LEGAL_PRIVACY_EMAIL}
              </a>
            </Definition>
          </dl>
        </Block>

        <Block n="3" title={t("s3.title")}>
          <p>{t("s3.intro")}</p>
          <ul>
            <li>{t("s3.i1")}</li>
            <li>{t("s3.i2")}</li>
            <li>{t("s3.i3")}</li>
            <li>{t("s3.i4")}</li>
            <li>{t("s3.i5")}</li>
          </ul>
        </Block>

        <Block n="4" title={t("s4.title")}>
          <p>{t("s4.intro")}</p>
          <ul>
            <li>{t("s4.i1")}</li>
            <li>{t("s4.i2")}</li>
            <li>{t("s4.i3")}</li>
            <li>{t("s4.i4")}</li>
            <li>{t("s4.i5")}</li>
            <li>{t("s4.i6")}</li>
          </ul>
          <p>{t("s4.footer")}</p>
        </Block>

        <Block n="5" title={t("s5.title")}>
          <p>{t("s5.p1")}</p>
        </Block>

        <Block n="6" title={t("s6.title")}>
          <p>{t("s6.p1")}</p>
          <p>{t("s6.p2")}</p>
          <p>
            {t("s6.p3_before")} {emailLink}
            {t("s6.p3_after")}
          </p>
        </Block>

        <Block n="7" title={t("s7.title")}>
          <p>{t("s7.intro")}</p>
          <ul>
            <li>{t("s7.i1")}</li>
            <li>{t("s7.i2")}</li>
            <li>{t("s7.i3")}</li>
          </ul>
          <p>{t("s7.footer")}</p>
        </Block>

        <Block n="8" title={t("s8.title")}>
          <p>{t("s8.intro")}</p>
          <ul>
            <li>{t("s8.i1")}</li>
            <li>{t("s8.i2")}</li>
            <li>{t("s8.i3")}</li>
            <li>{t("s8.i4")}</li>
            <li>{t("s8.i5")}</li>
          </ul>
        </Block>

        <Block n="9" title={t("s9.title")}>
          <p>{t("s9.intro")}</p>
          <ul>
            <li>{t("s9.i1")}</li>
            <li>{t("s9.i2")}</li>
            <li>{t("s9.i3")}</li>
            <li>{t("s9.i4")}</li>
          </ul>
          <p>
            {t("s9.footer_before")} {emailLink}
            {t("s9.footer_after")}
          </p>
        </Block>

        <Block n="10" title={t("s10.title")}>
          <p>
            {t("s10.p1_before")}{" "}
            <a
              href="https://anhelspb.com/privacy-policy"
              className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
            >
              anhelspb.com/privacy-policy
            </a>
            {t("s10.p1_after")}
          </p>
        </Block>

        <div className="mt-20 flex flex-col gap-2 border-t border-[var(--color-hairline)] pt-8 text-sm text-[var(--color-secondary)]/65 md:flex-row md:items-center md:justify-between">
          <p>
            {LEGAL_ENTITY.shortName} · {t("s2.labels.inn")} {LEGAL_ENTITY.inn}
          </p>
          <Link
            href="/personal-data-consent"
            className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
          >
            {t("footer.to_consent")}
          </Link>
        </div>
      </article>
    </main>
  );
}

function Block({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-[var(--color-hairline)] pt-8 md:mt-16 md:pt-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
        {n}
      </p>
      <h2 className="mt-2 font-display text-xl md:text-2xl">{title}</h2>
      <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[var(--color-secondary)]/85 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

function Term({ children }: { children: React.ReactNode }) {
  return (
    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55 md:py-1">
      {children}
    </dt>
  );
}

function Definition({
  children,
  mono,
}: {
  children: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <dd
      className={
        "text-[var(--color-secondary)]/90 " +
        (mono ? "font-mono text-sm tracking-[0.02em]" : "")
      }
    >
      {children}
    </dd>
  );
}
