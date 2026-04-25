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
    "common.comingSoon": "Скоро",
    "common.more": "Подробнее",
    "locale.switchTo": "Switch to English",
    "locale.label.short": "EN", // shown on the button when current is RU

    /* Showcase section on the home page (also reused on /products) */
    "showcase.tag": "02 · ЛИНЕЙКА ПРОДУКТОВ",
    "showcase.title": "Три направления, одна сборка",
    "showcase.lede":
      "Насосные станции, водоподготовка и тепловые пункты. Заводская сборка, серийное производство, индивидуальная конфигурация под ТЗ.",

    /* Top-level catalog cards */
    "product.pumps.title": "Насосные станции",
    "product.pumps.tagline":
      "Пять серий — водоснабжение, пожаротушение, отопление и кондиционирование, поддержание давления, специальное исполнение.",
    "product.water-treatment.title": "Водоподготовка",
    "product.water-treatment.tagline":
      "Установки фильтрации, умягчения, обезжелезивания и обратного осмоса.",
    "product.heating-unit.title": "Тепловые пункты",
    "product.heating-unit.tagline":
      "Блочные индивидуальные тепловые пункты (БИТП) — отопление, ГВС, комбинированные.",

    /* Pumps subcategory cards */
    "product.water-supply.title": "Водоснабжение",
    "product.water-supply.tagline":
      "Насосные станции ХВС, ГВС и повышения давления для жилых и коммерческих объектов.",
    "product.firefighting.title": "Пожаротушение",
    "product.firefighting.tagline": "АПТ, ВПВ и совмещённые системы.",
    "product.heating-cooling.title": "Отопление и кондиционирование",
    "product.heating-cooling.tagline":
      "Циркуляция теплоносителя и хладоносителя в инженерных контурах зданий.",
    "product.pressure-boost.title": "Поддержание давления",
    "product.pressure-boost.tagline":
      "Автоматические установки поддержания давления (АУПД) для закрытых сетей теплоснабжения.",
    "product.special.title": "Специальное исполнение",
    "product.special.tagline":
      "Контейнерные сборки и стеклопластиковые ёмкости — без капитального строительства.",

    /* Firefighting product page — hero + section labels */
    "ff.hero.tag": "01 · ПОЖАРОТУШЕНИЕ",
    "ff.hero.title": "Насосные установки пожаротушения ANHEL",
    "ff.hero.lede":
      "АПТ, ВПВ и совмещённые системы. Заводская сборка под ТЗ объекта, сертификация по ТР ТС.",
    "ff.hero.cta.primary": "Опросный лист",
    "ff.hero.cta.secondary": "Технические характеристики",
    "ff.section.specs": "02 · Технические характеристики",
    "ff.section.howItWorks": "03 · Типы АПТ и как они срабатывают",
    "ff.section.applications": "04 · Применение",
    "ff.section.brands": "05 · Бренды насосов и комплектующих",
    "ff.section.advantages": "06 · Преимущества",
    "ff.section.gallery": "07 · Галерея",
    "ff.section.cases": "08 · Кейсы внедрения",
    "ff.section.quiz": "09 · Опросный лист",
    "ff.section.documents": "10 · Документация",
    "ff.cta.requestQuote": "Запросить КП",
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
    "common.comingSoon": "Soon",
    "common.more": "Read more",
    "locale.switchTo": "Переключить на русский",
    "locale.label.short": "RU", // shown when current is EN

    /* Showcase section on the home page (also reused on /products) */
    "showcase.tag": "02 · PRODUCT LINE",
    "showcase.title": "Three directions, one assembly",
    "showcase.lede":
      "Pump stations, water treatment, and heating substations. Factory assembly, serial production, custom configuration to spec.",

    /* Top-level catalog cards */
    "product.pumps.title": "Pump stations",
    "product.pumps.tagline":
      "Five series — water supply, fire protection, heating & cooling, pressure boost, special execution.",
    "product.water-treatment.title": "Water treatment",
    "product.water-treatment.tagline":
      "Filtration, softening, iron removal and reverse-osmosis units.",
    "product.heating-unit.title": "Heating substations",
    "product.heating-unit.tagline":
      "Modular individual heating substations (BITP) — heating, hot water, combined.",

    /* Pumps subcategory cards */
    "product.water-supply.title": "Water supply",
    "product.water-supply.tagline":
      "Cold water, hot water and pressure-boost pump stations for residential and commercial buildings.",
    "product.firefighting.title": "Fire protection",
    "product.firefighting.tagline":
      "Sprinkler, deluge, hydrant and combined systems.",
    "product.heating-cooling.title": "Heating & cooling",
    "product.heating-cooling.tagline":
      "Heating-medium and chilled-medium circulation in building engineering loops.",
    "product.pressure-boost.title": "Pressure maintenance",
    "product.pressure-boost.tagline":
      "Automatic pressure-maintenance units (APMU) for closed heating networks.",
    "product.special.title": "Special execution",
    "product.special.tagline":
      "Containerised assemblies and fibreglass tanks — no capital construction needed.",

    /* Firefighting product page — hero + section labels */
    "ff.hero.tag": "01 · FIRE PROTECTION",
    "ff.hero.title": "ANHEL fire-protection pump units",
    "ff.hero.lede":
      "Sprinkler, deluge, hydrant and combined systems. Factory-assembled to project spec, EAEU TR-TS certified.",
    "ff.hero.cta.primary": "Spec sheet",
    "ff.hero.cta.secondary": "Technical specifications",
    "ff.section.specs": "02 · Technical specifications",
    "ff.section.howItWorks": "03 · Fire-protection types and how they fire",
    "ff.section.applications": "04 · Applications",
    "ff.section.brands": "05 · Pump and component brands",
    "ff.section.advantages": "06 · Advantages",
    "ff.section.gallery": "07 · Gallery",
    "ff.section.cases": "08 · Case studies",
    "ff.section.quiz": "09 · Spec sheet",
    "ff.section.documents": "10 · Documents",
    "ff.cta.requestQuote": "Request quote",
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
