/**
 * Lightweight i18n for the «design/i18n-toggle» experiment.
 *
 * Why not next-intl / next-i18next: those route on locale (`/ru/...`,
 * `/en/...`), which is overkill for the toggle experiment — we just
 * want a runtime switch to demo the UX. If the toggle is approved
 * we'll lift this to a routing-based lib later.
 *
 * Translation surface (shell-level, see TZ for variant scope):
 *   - Header NAV labels
 *   - Hero (home page) headline + CTAs + tag
 *   - Footer (slogan + nav + contacts header)
 *
 * Anything not in the dict falls back to RU (the project source-language).
 * Adding a new key: extend `TRANSLATIONS`, then `t("key")` works in both
 * server and client components — but the client one is the live view.
 */

export type Locale = "ru" | "en";

export const DEFAULT_LOCALE: Locale = "ru";
export const LOCALES: Locale[] = ["ru", "en"];

export const STORAGE_KEY = "anhel-locale";

/* ---------------------------------------------------------------------
 * Translation dictionary.
 *
 * Keys are namespaced with dots so a future migration to a real i18n
 * library (next-intl) can flat-map them onto JSON files without renames.
 * --------------------------------------------------------------------- */
export const TRANSLATIONS = {
  ru: {
    "nav.products": "Продукты",
    "nav.projects": "Объекты",
    "nav.about": "О компании",
    "nav.manufacturing": "Производство",
    "nav.contacts": "Контакты",

    "hero.tag": "01 / 04 · Инженерное оборудование",
    "hero.title.line1": "Системы,",
    "hero.title.line2": "которые держат здание",
    "hero.title.line3": "живым.",
    "hero.cta.primary": "Смотреть каталог",
    "hero.cta.secondary": "Опросный лист",
    "hero.footer.disciplines": "Проектирование · Производство · Автоматизация",
    "hero.footer.scrollHint": "Прокрутить",

    "footer.tagline.line1": "ANHEL® — инженерное",
    "footer.tagline.line2": "оборудование для зданий,",
    "footer.tagline.line3": "которые будут стоять десятилетиями.",
    "footer.tagline.body":
      "Офис — Санкт-Петербург, производство — Москва. Проектирование под задачу объекта, сервис и гарантия — от теплообменных пунктов до систем водоподготовки.",
    "footer.contacts.title": "Контакты",
    "footer.nav.title": "Навигация",
    "footer.copyright": "Все права защищены.",
    "footer.location": "Санкт-Петербург · anhelspb.com",

    "common.openMenu": "Открыть меню",
    "common.toHome": "ANHEL® — на главную",
    "locale.switchTo": "Switch to English",
    "locale.label.short": "EN", // shown on the button when current is RU
  },
  en: {
    "nav.products": "Products",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.manufacturing": "Manufacturing",
    "nav.contacts": "Contacts",

    "hero.tag": "01 / 04 · Engineering equipment",
    "hero.title.line1": "Systems",
    "hero.title.line2": "that keep buildings",
    "hero.title.line3": "alive.",
    "hero.cta.primary": "View catalogue",
    "hero.cta.secondary": "Spec sheet",
    "hero.footer.disciplines": "Engineering · Manufacturing · Automation",
    "hero.footer.scrollHint": "Scroll",

    "footer.tagline.line1": "ANHEL® — engineering",
    "footer.tagline.line2": "equipment for buildings",
    "footer.tagline.line3": "designed to stand for decades.",
    "footer.tagline.body":
      "Office in St. Petersburg, manufacturing in Moscow. Engineered to the project's brief — from heat-exchange substations to water treatment systems, with service and warranty.",
    "footer.contacts.title": "Contacts",
    "footer.nav.title": "Navigation",
    "footer.copyright": "All rights reserved.",
    "footer.location": "St. Petersburg · anhelspb.com",

    "common.openMenu": "Open menu",
    "common.toHome": "ANHEL® — home",
    "locale.switchTo": "Переключить на русский",
    "locale.label.short": "RU", // shown when current is EN
  },
} as const;

/* All keys are typed off the RU dict — RU is the source-of-truth and
   the EN dict is required to mirror it (covered by the `Translations`
   type below). If you add a key in RU and forget EN, TS will yell. */
export type TranslationKey = keyof (typeof TRANSLATIONS)["ru"];
type Translations = Record<TranslationKey, string>;
const _checkEnComplete: Translations = TRANSLATIONS.en;
void _checkEnComplete;

/**
 * Pure resolver. Use this in server components or in places where you
 * already have the locale in hand (the client `useLocale()` hook is
 * the more common path).
 */
export function translate(locale: Locale, key: TranslationKey): string {
  return TRANSLATIONS[locale][key] ?? TRANSLATIONS[DEFAULT_LOCALE][key] ?? key;
}
