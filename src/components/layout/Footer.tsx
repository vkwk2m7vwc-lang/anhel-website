"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { CONTACTS } from "@/lib/contacts";

/**
 * Site-wide footer.
 *
 * Структура (copy.md A.4): пять колонок + двухстрочная юр-нижка.
 *
 *   Колонка 1 — бренд: «ANHEL®» + «Инженерное оборудование. Россия.»
 *   Колонка 2 — Продукция: 4 ссылки на /products/*
 *   Колонка 3 — Компания: О компании / Производство / Сервис / Проекты
 *   Колонка 4 — Материалы: опросные / каталоги / сертификаты / реквизиты
 *   Колонка 5 — Контакты: телефон / email / адрес
 *
 *   Юр-нижка:
 *     слева — © 2026 ООО «Профит». ИНН 7802825464. Все права защищены.
 *     справа — Политика конфиденциальности · Согласие на обработку
 *
 * Telegram-канал намеренно отсутствует — канала пока нет, добавим
 * когда запустится (см. copy.md «Что НЕ делаем в этой волне»).
 *
 * Colspans: md:grid-cols-12, бренд занимает md:col-span-4, далее 4
 * колонки навигации по md:col-span-2. На мобайле — один столбец.
 *
 * Якоря /documents#questionnaires|#catalogs|#certificates существуют
 * после рефактора /documents в этой же волне. Якорь /contacts#requisites
 * также добавлен в том же коммите.
 *
 * i18n: column titles, link labels, address и legal-нижка приходят
 * из `common.footer.*`. Юр.лицо (ООО «Профит», ИНН) остаётся в RU во
 * всех локалях — только подпись адаптируется (см. copy.md / brand
 * decision); copyright-строка пока без подписи, она появится в C4 при
 * переводе EN/TR через locale-specific варианты.
 */
export function Footer() {
  const t = useTranslations("common.footer");
  const tBrand = useTranslations("common.brand");
  const tAria = useTranslations("common.aria");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-12 md:gap-10 md:px-12 md:py-20">
        {/* Колонка 1 — Бренд */}
        <div className="md:col-span-4">
          <p className="font-display text-3xl leading-tight md:text-4xl">
            {tBrand("name")}
          </p>
          <p className="mt-4 max-w-xs text-sm text-[var(--color-secondary)]/65 md:text-[15px]">
            {tBrand("tagline_footer")}
          </p>
        </div>

        {/* Колонка 2 — Продукция */}
        <FooterColumn title={t("columns.products")}>
          <FooterLink href="/products/pumps">{t("products.pumps")}</FooterLink>
          <FooterLink href="/products/heating-unit">{t("products.heating_unit")}</FooterLink>
          <FooterLink href="/products/water-treatment">{t("products.water_treatment")}</FooterLink>
          <FooterLink href="/products/control-systems">{t("products.control_systems")}</FooterLink>
        </FooterColumn>

        {/* Колонка 3 — Компания */}
        <FooterColumn title={t("columns.company")}>
          <FooterLink href="/#about">{t("company.about")}</FooterLink>
          <FooterLink href="/#production">{t("company.production")}</FooterLink>
          <FooterLink href="/service">{t("company.service")}</FooterLink>
          <FooterLink href="/projects">{t("company.projects")}</FooterLink>
        </FooterColumn>

        {/* Колонка 4 — Материалы.
            Опросные/Каталоги/Сертификаты — якоря на /documents (рефактор
            страницы в этом же коммите даёт им рабочие точки скролла).
            Реквизиты — якорь на /contacts (id="requisites" на блоке
            «Карточка организации» добавлен в этом же коммите). */}
        <FooterColumn title={t("columns.materials")}>
          <FooterLink href="/documents#questionnaires">{t("materials.questionnaires")}</FooterLink>
          <FooterLink href="/documents#catalogs">{t("materials.catalogs")}</FooterLink>
          <FooterLink href="/documents#certificates">{t("materials.certificates")}</FooterLink>
          <FooterLink href="/contacts#requisites">{t("materials.requisites")}</FooterLink>
        </FooterColumn>

        {/* Колонка 5 — Контакты */}
        <FooterColumn title={t("columns.contacts")}>
          <Link
            href={`tel:${CONTACTS.phoneTel}`}
            data-cursor="hover"
            className="block text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)]"
          >
            {CONTACTS.phone}
          </Link>
          <Link
            href={`mailto:${CONTACTS.email}`}
            data-cursor="hover"
            className="block text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)]"
          >
            {CONTACTS.email}
          </Link>
          <p className="text-[var(--color-secondary)]/65">
            {t("address_line_1")}
            <br />
            {t("address_line_2")}
          </p>
        </FooterColumn>
      </div>

      {/* Юр-нижка — две строки. Слева © + юр.лицо + ИНН, справа — два
          юр-документа. Адрес домена убран отсюда, он уже есть в
          колонке «Контакты» косвенно через email-домен. */}
      <div className="border-t border-[var(--color-hairline)]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-6 py-6 text-xs text-[var(--color-secondary)]/65 md:flex-row md:items-center md:px-12">
          <p>{t("copyright", { year })}</p>
          <nav
            aria-label={tAria("legal_docs_nav")}
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <Link
              href="/privacy-policy"
              data-cursor="hover"
              className="text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)]"
            >
              {t("privacy_policy")}
            </Link>
            <Link
              href="/personal-data-consent"
              data-cursor="hover"
              className="text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)]"
            >
              {t("personal_data_consent")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/**
 * Footer navigation column — заголовок mono-tag + плотный stack
 * ссылок. Без вложенного <ul>: визуально и для tab-навигации
 * блок ссылок-в-stack читается так же, а DOM проще.
 */
function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="md:col-span-2">
      <p className="mono-tag mb-5">{title}</p>
      <div className="space-y-3 text-sm">{children}</div>
    </div>
  );
}

/**
 * Single footer link — single line, hover-underline through colour
 * contrast (not text-decoration), data-cursor=hover для custom-кёрсера.
 */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-cursor="hover"
      className="block text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)]"
    >
      {children}
    </Link>
  );
}
