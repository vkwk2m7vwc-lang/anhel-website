"use client";

import Link from "next/link";
import { CATALOG_PATH } from "@/lib/routes";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { TranslationKey } from "@/lib/i18n";

/**
 * Minimal footer for Stage 1.
 *
 * The full footer (Stage 8 — sitemap, legal, контакты, mini-carousel) is
 * bigger than this; for now we keep a slim strip with the essentials so
 * the home page has a bottom edge and visitors see contact info.
 */
// Nav items keyed off the i18n dict; routes stay constant across locales.
const FOOTER_NAV: { labelKey: TranslationKey; href: string }[] = [
  { labelKey: "nav.products", href: CATALOG_PATH },
  { labelKey: "nav.projects", href: "/projects" },
  { labelKey: "nav.about", href: "/#about" },
  { labelKey: "nav.manufacturing", href: "/#manufacturing" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLocale();

  return (
    <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-4 md:px-12 md:py-20">
        <div className="md:col-span-2">
          <p className="font-display text-2xl leading-tight md:text-3xl">
            {t("footer.tagline.line1")}
            <br />
            {t("footer.tagline.line2")}
            <br />
            {t("footer.tagline.line3")}
          </p>
          <p className="mt-6 max-w-md text-sm text-[var(--color-secondary)]/60">
            {t("footer.tagline.body")}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="mono-tag">{t("footer.contacts.title")}</p>
          <Link
            href="tel:+78124164500"
            data-cursor="hover"
            className="block text-[var(--color-secondary)]/80 hover:text-[var(--color-secondary)]"
          >
            +7 (812) 416-4500
          </Link>
          <Link
            href="mailto:info@anhelspb.com"
            data-cursor="hover"
            className="block text-[var(--color-secondary)]/80 hover:text-[var(--color-secondary)]"
          >
            info@anhelspb.com
          </Link>
          <p className="text-[var(--color-secondary)]/60">
            Политехническая ул., д. 6, стр. 1,
            <br />
            пом. 1-Н, Санкт-Петербург
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="mono-tag">{t("footer.nav.title")}</p>
          {FOOTER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="hover"
              className="block text-[var(--color-secondary)]/80 hover:text-[var(--color-secondary)]"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--color-hairline)]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-[var(--color-secondary)]/65 md:flex-row md:items-center md:px-12">
          <p>© {year} ANHEL®. {t("footer.copyright")}</p>
          <p>{t("footer.location")}</p>
        </div>
      </div>
    </footer>
  );
}
