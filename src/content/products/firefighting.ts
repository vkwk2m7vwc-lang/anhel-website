import type { ProductContent } from "./types";

/**
 * Firefighting pump station — content file.
 *
 * Source of truth: TZ for this page + ТТХ list from the brief (8 params,
 * exact wording preserved). When a value needs to change (e.g. new motor
 * range), we edit it here — components don't know the copy.
 *
 * The image `hvs-nu-red2.png` is the same render used by slide 2 of the
 * home-page hero carousel (`src/lib/hero-products.ts`). Keeping the two
 * references pointed at the same asset is intentional — one source of
 * truth for the red enclosure; when we swap in a sharper render, both
 * places pick it up.
 */
export const firefightingContent: ProductContent = {
  slug: "firefighting",
  accent: "fire",

  // SEO + social — Product schema.org data is wired up in commit 6.
  metaTitle: "Насосные станции пожаротушения",
  metaDescription:
    "Насосные станции пожаротушения ANHEL — серийное производство с контролем качества и индивидуальным исполнением под ТЗ. Срок службы от 10 лет.",

  hero: {
    breadcrumbs: [
      { label: "Главная", href: "/" },
      { label: "Насосные станции", href: "/products" },
      { label: "Пожаротушение" },
    ],
    sectionTag: "01 · НАСОСНЫЕ СТАНЦИИ · ПОЖАРОТУШЕНИЕ",
    title: "Насосные станции пожаротушения",
    subtitle:
      "Оборудование для систем, на которые полагаются жизни. Автоматический запуск, горячее резервирование и полный комплект разрешительной документации.",
    image: {
      src: "/assets/products/hvs-nu-red2.png",
      alt: "ANHEL — насосная станция пожаротушения в красном шкафу, серия HVS-NU",
    },
    // Both CTAs point at the quiz anchor — section 10 is built in commits 5-6.
    // Until then, clicking the anchor is a no-op (target doesn't exist yet),
    // which is the cleanest stub: no error, no misleading navigation.
    primaryCta: {
      label: "Быстрый запрос",
      href: "#quiz",
      variant: "primary",
    },
    secondaryCta: {
      label: "Опросный лист",
      href: "#quiz",
      variant: "ghost",
      hint: "5 шагов",
    },
  },

  // Eight tiles — exact ordering and wording from the brief.
  // `value` carries the number or short phrase; `unit` is the suffix we
  // render beside it in mono type. Splitting avoids hacks like "70°С" as
  // a single string (which we'd otherwise have to regex back apart for
  // the typographic treatment on the grid).
  techSpecs: [
    { label: "Количество насосов", value: "от 2 до 6" },
    { label: "Макс. температура жидкости", value: "70", unit: "°С" },
    { label: "Сетевое напряжение", value: "3 × 380", unit: "В" },
    { label: "Мощность одного насоса", value: "0,37 – 250", unit: "кВт" },
    { label: "Частота вращения", value: "2900 / 1450", unit: "об/мин" },
    { label: "Срок службы", value: "не менее 10", unit: "лет" },
    { label: "Тип регулирования", value: "релейное / частотное" },
    { label: "Температура окружающей среды", value: "до 40", unit: "°С" },
  ],

  // Section 5 «Применение». Six object types the fire-fighting station
  // is installed on. Examples are drawn from МФМК reference cases where
  // real object names exist (жилые, Москва/Одинцово); other categories
  // carry a typical-object descriptor until a real reference lands, at
  // which point we swap the string in place.
  applications: {
    tag: "05 · ПРИМЕНЕНИЕ",
    title: "Где ставится",
    lede: "От жилых комплексов до инфраструктурных объектов. Каждая установка собирается под проект объекта.",
    items: [
      {
        id: "residential",
        mono: "01",
        title: "Жилые комплексы",
        example: "ЖК «Дмитровский парк», Москва",
      },
      {
        id: "business",
        mono: "02",
        title: "Бизнес-центры",
        example: "БЦ класса A, 20+ этажей",
      },
      {
        id: "retail",
        mono: "03",
        title: "Торговые центры",
        example: "ТРЦ с закрытой автостоянкой",
      },
      {
        id: "industrial",
        mono: "04",
        title: "Промышленные предприятия",
        example: "Склады, производственные цеха",
      },
      {
        id: "hotels",
        mono: "05",
        title: "Гостиницы",
        example: "Отели 4–5★, апарт-отели",
      },
      {
        id: "infrastructure",
        mono: "06",
        title: "Инфраструктурные объекты",
        example: "Аэропорты, вокзалы, стадионы",
      },
    ],
  },
};
