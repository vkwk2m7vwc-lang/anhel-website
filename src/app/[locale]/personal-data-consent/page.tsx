import type { Metadata } from "next";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CONTACTS } from "@/lib/contacts";
import { LEGAL_ENTITY } from "@/lib/legal";

/**
 * `/personal-data-consent` — Согласие субъекта на обработку
 * персональных данных.
 *
 * Связанный документ с /privacy-policy. EN/TR — пояснительный перевод,
 * юр. сила сохраняется у русской редакции (которую субъект ПД и
 * подтверждает чекбоксом). Реквизиты ООО «Профит» — RU во всех локалях.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "legal.consent.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const LEGAL_PRIVACY_EMAIL = CONTACTS.email;

export default function PersonalDataConsentPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("legal.consent");

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
  const privacyLink = (label: string) => (
    <Link
      href="/privacy-policy"
      className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
    >
      {label}
    </Link>
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

        <Block>
          <p>
            {t("intro_before")} {siteLink}
            {t("intro_after", {
              operator,
              inn: LEGAL_ENTITY.inn,
              ogrn: LEGAL_ENTITY.ogrn,
              address: LEGAL_ENTITY.legalAddressFull,
            })}
          </p>
        </Block>

        <Block title={t("s1.title")}>
          <p>{t("s1.intro")}</p>
          <ul>
            <li>{t("s1.i1")}</li>
            <li>{t("s1.i2")}</li>
            <li>{t("s1.i3")}</li>
            <li>{t("s1.i4")}</li>
            <li>{t("s1.i5")}</li>
            <li>{t("s1.i6")}</li>
          </ul>
        </Block>

        <Block title={t("s2.title")}>
          <p>{t("s2.intro")}</p>
          <ul>
            <li>{t("s2.i1")}</li>
            <li>{t("s2.i2")}</li>
            <li>{t("s2.i3")}</li>
            <li>{t("s2.i4")}</li>
            <li>{t("s2.i5")}</li>
          </ul>
        </Block>

        <Block title={t("s3.title")}>
          <p>{t("s3.intro")}</p>
          <ul>
            <li>{t("s3.i1")}</li>
            <li>{t("s3.i2")}</li>
            <li>{t("s3.i3")}</li>
            <li>{t("s3.i4")}</li>
          </ul>
          <p>{t("s3.footer")}</p>
        </Block>

        <Block title={t("s4.title")}>
          <p>{t("s4.p1")}</p>
          <p>
            {t("s4.p2_before")} {emailLink}
            {t("s4.p2_after")}
          </p>
          <p>{t("s4.p3")}</p>
        </Block>

        <Block title={t("s5.title")}>
          <p>
            {t("s5.p1_before")} {privacyLink(t("s5.p1_link"))}
            {t("s5.p1_after")}
          </p>
        </Block>

        <Block title={t("s6.title")}>
          <p>
            {t("s6.p1_before")} {privacyLink(t("s6.p1_link"))}
            {t("s6.p1_after")}
          </p>
        </Block>

        <div className="mt-20 flex flex-col gap-2 border-t border-[var(--color-hairline)] pt-8 text-sm text-[var(--color-secondary)]/65 md:flex-row md:items-center md:justify-between">
          <p>
            {LEGAL_ENTITY.shortName} · ИНН {LEGAL_ENTITY.inn}
          </p>
          <Link
            href="/privacy-policy"
            className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
          >
            {t("footer.to_privacy")}
          </Link>
        </div>
      </article>
    </main>
  );
}

function Block({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-[var(--color-hairline)] pt-8 md:mt-16 md:pt-10">
      {title ? (
        <h2 className="font-display text-xl md:text-2xl">{title}</h2>
      ) : null}
      <div
        className={
          "space-y-4 text-[15px] leading-relaxed text-[var(--color-secondary)]/85 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2 " +
          (title ? "mt-5" : "")
        }
      >
        {children}
      </div>
    </section>
  );
}
