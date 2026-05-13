import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

/**
 * Supported locales and i18n config for next-intl.
 *
 * RU is the master (no URL prefix). EN and TR are stage-1 additions
 * (`/en`, `/tr`). Stage 2 will extend this with ZH/ES/FR — the
 * architecture is fully driven by this constants array, so adding a
 * language is a matter of pushing a code, providing `localeNames`,
 * and dropping JSON dictionaries under `src/messages/<locale>/`.
 *
 * Why `as const` — gives `Locale` a precise union type
 * (`'ru' | 'en' | 'tr'`) for compile-time exhaustiveness checks in
 * the LanguageSwitcher and other consumers.
 */
export const locales = ["ru", "en", "tr"] as const;
export const defaultLocale = "ru" as const;
export type Locale = (typeof locales)[number];

/**
 * Display data for the language switcher dropdown. `code` is the
 * compact button label (e.g. `RU`); `native` is the full native-name
 * label shown in the dropdown list (e.g. `Русский`).
 *
 * No flags by design — politically neutral and visually quieter,
 * which fits the premium B2B aesthetic.
 */
export const localeNames: Record<Locale, { code: string; native: string }> = {
  ru: { code: "RU", native: "Русский" },
  en: { code: "EN", native: "English" },
  tr: { code: "TR", native: "Türkçe" },
};

/**
 * All namespace files Claude expects in `src/messages/<locale>/`.
 * Adding a namespace = adding a JSON file under each locale folder
 * AND adding the name here. Keep alphabetised for easy diffs.
 */
const namespaces = [
  "common",
  "contacts",
  "documents",
  "home",
  "legal",
  "meta",
  "products",
  "projects",
  "quiz",
  "service",
] as const;

/**
 * next-intl request config — invoked once per request after the
 * middleware resolves the locale.
 *
 * `requestLocale` (replaces the deprecated `locale` parameter as of
 * next-intl 3.22) is a Promise of the locale value pulled from the
 * URL segment by the middleware. We validate it against the allow
 * list and 404 on anything else — defensive against weird hits that
 * bypass middleware (shouldn't happen with `localePrefix: 'as-needed'`,
 * but worth being explicit).
 *
 * All namespaces load in parallel via `Promise.all` so a single
 * `useTranslations('home')` call inside a component never has to
 * await dynamic-import boundaries.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested as Locale)
    ? (requested as Locale)
    : undefined;
  if (!locale) notFound();

  const entries = await Promise.all(
    namespaces.map(
      async (ns) =>
        [ns, (await import(`./messages/${locale}/${ns}.json`)).default] as const,
    ),
  );

  return { locale, messages: Object.fromEntries(entries) };
});
