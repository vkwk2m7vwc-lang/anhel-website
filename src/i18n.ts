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
 * middleware resolves the locale. Loads every namespace in parallel
 * so a single `useTranslations('home')` call inside a component never
 * has to await dynamic-import boundaries.
 *
 * If a locale is somehow not in our allow-list (shouldn't happen with
 * `localePrefix: 'as-needed'`, but defensive), we 404 rather than
 * silently fall back — better to fail loudly than show broken keys.
 *
 * No explicit `any` — we let TS infer the shape from the JSON
 * imports, which keeps next-intl's `AbstractIntlMessages` happy and
 * also keeps `eslint-no-explicit-any` quiet on the CI build.
 */
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  const entries = await Promise.all(
    namespaces.map(
      async (ns) =>
        [ns, (await import(`./messages/${locale}/${ns}.json`)).default] as const,
    ),
  );

  return { messages: Object.fromEntries(entries) };
});
