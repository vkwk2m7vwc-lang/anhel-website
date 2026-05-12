import type { ProductContent } from "../../types";

/**
 * Block Individual Heat Point (БИТП) — content file.
 *
 * Отличие от «насосных» продуктов (firefighting, water-supply):
 * ИТП — модульное оборудование для тепло-/холодоснабжения,
 * а не насосная станция. Линейка состоит из нескольких модулей
 * (закрытая система отопления, ГВС, совмещённые и т.д.).
 *
 * Section structure:
 *   - Hero — один ассет /assets/products/bitp.png (тот же что на
 *     home carousel, когда появится production render — меняется
 *     в одном месте)
 *   - ТТХ — аггрегированные диапазоны по всей линейке
 *     (мощность 50–3000 кВт, темп. первого контура до 150°С и т.д.)
 *   - «Линейка модулей» (используем компонент ApplicationsGrid
 *     с адаптированным содержанием) — 6 модульных исполнений
 *     вместо «где ставится». Это делает страницу каталожной, а
 *     не product-driven — оправдано природой ИТП как конструктора.
 *   - Бренды, Преимущества, Галерея, Кейсы, Квиз, Документы, CTA —
 *     стандартный template
 *
 * Серия: `BITP-NU` (working draft, по аналогии с HVS-NU для насосов).
 * Финальное обозначение подтвердит заказчик.
 *
 * Image: /assets/products/bitp.png — тот же render, что на home
 * carousel (heat-unit slide). Заменится на production-render когда
 * будет.
 *
 * Content extrapolated: sandbox allowlist не включает mfmc.ru →
 * диапазоны ТТХ и названия модулей взяты из общей инженерной
 * терминологии для БИТП (СНиП, нормы проектирования тепловых
 * пунктов). Требует review от инженера ANHEL® / заказчика перед
 * production release.
 */
export const content: ProductContent = {
  slug: "heating-unit",
  accent: "heat",

  metaTitle: "Блочные индивидуальные тепловые пункты ANHEL",
  metaDescription:
    "Блочные индивидуальные тепловые пункты ANHEL — модули отопления, ГВС, охлаждения. Заводская сборка, погодозависимое регулирование, срок службы от 15 лет.",

  hero: {
    breadcrumbs: [
      { label: "Главная", href: "/" },
      { label: "Каталог", href: "/products" },
      { label: "Тепловые пункты" },
    ],
    sectionTag: "01 · ТЕПЛОВЫЕ ПУНКТЫ",
    title: "Блочные индивидуальные тепловые пункты ANHEL",
    subtitle:
      "Модульное оборудование для отопления, горячего водоснабжения и охлаждения. Заводская сборка, погодозависимое регулирование и полный комплект разрешительной документации.",
    image: {
      src: "/assets/products/bitp.png",
      alt: "ANHEL® — блочный индивидуальный тепловой пункт, модульное исполнение",
    },
    // Pair of hero CTAs:
    //   primary  — online questionnaire (7-step web form, mirror of PDF)
    //   secondary — direct PDF download for those preferring offline workflow
    primaryCta: {
      label: "Заполнить онлайн",
      href: "/quiz/itp",
      variant: "primary",
    },
    secondaryCta: {
      label: "Опросный лист",
      href: "/docs/heating-unit/oprosnyi-list.pdf",
      variant: "ghost",
    },
  },

  // Аггрегированные ТТХ по всей линейке БИТП. Значения — диапазоны
  // от младшей до старшей модели. Теплоноситель — вода или гликоль,
  // первый контур от теплосети (до 150°С), второй — потребитель
  // (70/95°С стандарт для отопления, 60°С ГВС).
  techSpecs: [
    { label: "Тепловая мощность", value: "50 – 3000", unit: "кВт" },
    { label: "Температура первого контура", value: "до 150", unit: "°С" },
    { label: "Температура второго контура", value: "70 / 95", unit: "°С" },
    { label: "Давление первого контура", value: "до 16", unit: "бар" },
    { label: "Давление второго контура", value: "до 10", unit: "бар" },
    { label: "Теплоноситель", value: "вода / гликоль" },
    { label: "Тип регулирования", value: "погодозависимое" },
    { label: "Срок службы", value: "не менее 15", unit: "лет" },
  ],

  // «Линейка модулей» — 6 основных модульных исполнений БИТП. Каждый
  // модуль — отдельный product SKU линейки, собирается под проектные
  // задания. Нумерация 01..06 даёт каталожный вид.
  applications: {
    tag: "02 · ЛИНЕЙКА МОДУЛЕЙ",
    title: "Восемь модулей под типовые задачи",
    lede: "От автономного отопления до совмещённых тепло-холодных систем. Любую комбинацию собираем в единый блок.",
    items: [
      {
        id: "heating-closed",
        mono: "01",
        title: "Закрытая система отопления",
        example: "Для ЖК и бизнес-центров с индивидуальным вводом тепла",
      },
      {
        id: "heating-open",
        mono: "02",
        title: "Открытая система отопления",
        example: "Прямой забор из теплосети, водоразбор",
      },
      {
        id: "dhw",
        mono: "03",
        title: "Горячее водоснабжение (ГВС)",
        example: "Одно- или двухступенчатый водоподогрев",
      },
      {
        id: "combined",
        mono: "04",
        title: "Совмещённая: отопление + ГВС",
        example: "Универсальное решение для жилых объектов",
      },
      {
        id: "cooling",
        mono: "05",
        title: "Холодоснабжение",
        example: "Модуль охлаждения для ТРЦ, БЦ, ЦОД",
      },
      {
        id: "ventilation",
        mono: "06",
        title: "Приточная вентиляция",
        example: "Модуль нагрева воздуха с рекуперацией",
      },
    ],
  },

  // Бренды теплового оборудования. Теплообменники — отдельный
  // критичный компонент для ИТП (пластинчатые Ридан, Alfa Laval).
  // Насосы циркуляции — Wilo, Lowara, ГМС. Автоматика — Danfoss
  // (тепловая специфика) + наши панели.
  brands: {
    tag: "03 · БРЕНДЫ",
    title: "Собираем из оборудования мировых производителей",
    lede: "Теплообменники, регулирующие клапаны и насосы — от проверенных производителей.",
    rowPumps: [
      { id: "ridan", name: "Ридан", series: "НН, S-серия" },
      { id: "alfa-laval", name: "Alfa Laval", series: "M-серия, T-серия" },
      { id: "wilo", name: "Wilo", series: "Stratos, Yonos", href: "https://wilo.com/ru/ru/" },
      { id: "lowara", name: "Lowara", series: "ecocirc", href: "https://www.xylem.com/ru-ru/brands/lowara/" },
      { id: "gms", name: "ГМС", series: "насосы ц/б", href: "https://hms.ru/" },
    ],
    rowComponents: [
      { id: "danfoss", name: "Danfoss", href: "https://www.danfoss.com/" },
      { id: "siemens", name: "Siemens", href: "https://www.siemens.com/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "КЭАЗ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "unitronics", name: "Unitronics", href: "https://unitronicsplc.com/" },
    ],
  },

  // Преимущества — 9 пунктов, адаптированы под ИТП. Изменены пункты
  // 02 (индивидуальная сборка под проектные параметры теплосети),
  // 05 (срок 15 лет вместо 10 — для ИТП это типичная гарантия),
  // 04 (погодозависимое + диспетчеризация вместо pump control modes).
  advantages: {
    tag: "03 · ПРЕИМУЩЕСТВА",
    title: "Почему ANHEL®",
    lede: "Заводская сборка, контроль качества и собственная автоматика.",
    items: [
      {
        id: "serial",
        mono: "01",
        title: "Заводская сборка",
        body: "Блочно-модульное исполнение — не кустарная сборка в подвале объекта.",
      },
      {
        id: "custom",
        mono: "02",
        title: "Индивидуальное исполнение",
        body: "Сборка под проектные параметры теплосети, гибкая конфигурация по мощности и теплоносителям.",
      },
      {
        id: "qc",
        mono: "03",
        title: "Контроль качества",
        body: "Каждый модуль проходит гидравлические и электрические испытания перед отгрузкой.",
      },
      {
        id: "control",
        mono: "04",
        title: "Погодозависимое регулирование",
        body: "Автоматический подбор параметров по датчику наружного воздуха. Интеграция в диспетчерскую систему.",
      },
      {
        id: "reliability",
        mono: "05",
        title: "Долгий срок службы",
        body: "Средний срок службы — не менее 15 лет при штатной эксплуатации.",
      },
      {
        id: "documentation",
        mono: "06",
        title: "Полный комплект документации",
        body: "Разрешительная, эксплуатационная и паспортная — все документы в поставке.",
      },
    ],
  },

  // Section «Галерея». Реальные фото ИТП ANHEL® из цеха и с объектов.
  // Файлы под /public/assets/production/heating-unit/.
  gallery: {
    tag: "04 · ГАЛЕРЕЯ",
    title: "С производства",
    photos: [
      {
        id: "heating-unit-01",
        src: "/assets/production/heating-unit/heating-unit-01.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 1",
        aspect: "4/5",
      },
      {
        id: "heating-unit-02",
        src: "/assets/production/heating-unit/heating-unit-02.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 2",
        aspect: "4/5",
      },
      {
        id: "heating-unit-03",
        src: "/assets/production/heating-unit/heating-unit-03.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 3",
        aspect: "4/5",
      },
      {
        id: "heating-unit-04",
        src: "/assets/production/heating-unit/heating-unit-04.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 4",
        aspect: "4/5",
      },
      {
        id: "heating-unit-05",
        src: "/assets/production/heating-unit/heating-unit-05.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 5",
        aspect: "4/5",
      },
      {
        id: "heating-unit-06",
        src: "/assets/production/heating-unit/heating-unit-06.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 6",
        aspect: "4/5",
      },
      {
        id: "heating-unit-07",
        src: "/assets/production/heating-unit/heating-unit-07.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 7",
        aspect: "4/5",
      },
      {
        id: "heating-unit-08",
        src: "/assets/production/heating-unit/heating-unit-08.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 8",
        aspect: "4/5",
      },
      {
        id: "heating-unit-09",
        src: "/assets/production/heating-unit/heating-unit-09.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 9",
        aspect: "4/5",
      },
      {
        id: "heating-unit-10",
        src: "/assets/production/heating-unit/heating-unit-10.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 10",
        aspect: "4/5",
      },
      {
        id: "heating-unit-11",
        src: "/assets/production/heating-unit/heating-unit-11.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 11",
        aspect: "4/5",
      },
      {
        id: "heating-unit-12",
        src: "/assets/production/heating-unit/heating-unit-12.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 12",
        aspect: "4/5",
      },
      {
        id: "heating-unit-13",
        src: "/assets/production/heating-unit/heating-unit-13.jpg",
        alt: "ANHEL — производство блочного теплового пункта, фото 13",
        aspect: "4/5",
      },
    ],
  },

  cases: {
    tag: "06 · КЕЙСЫ",
    title: "Где уже работает",
    lede: "Жилые комплексы и коммерческие объекты с нашими ИТП.",
    items: [
      {
        id: "zhk-placeholder-1",
        title: "ЖК «Пример №1»",
        location: "Москва",
        equipment: "ИТП ANHEL, отопление + ГВС",
        photo: { alt: "Жилой комплекс, общий вид" },
      },
      {
        id: "zhk-placeholder-2",
        title: "ЖК «Пример №2»",
        location: "Санкт-Петербург",
        equipment: "ИТП ANHEL, закрытая система отопления",
        photo: { alt: "Жилой комплекс, общий вид" },
      },
      {
        id: "bc-placeholder",
        title: "Бизнес-центр класса А",
        location: "Москва",
        equipment: "ИТП ANHEL, совмещённый + холодоснабжение",
        photo: { alt: "Бизнес-центр, общий вид" },
      },
    ],
  },

  quiz: {
    tag: "07 · ОПРОСНЫЙ ЛИСТ",
    title: "Подбор под ваш объект",
    lede: "Шесть шагов — от контактов до технических параметров системы. Отвечаем в течение рабочего дня.",
  },

  documents: {
    tag: "05 · ДОКУМЕНТАЦИЯ",
    title: "Документы и сертификаты",
    lede: "Опросный лист и сертификат — для проектирования и приёмки.",
    items: [
      {
        id: "oprosnik",
        title: "Опросный лист для подбора ИТП",
        size: "0.54 МБ",
        href: "/docs/heating-unit/oprosnyi-list.pdf",
      },
      {
        id: "cert-deklaratsiya",
        title: "Сертификат — блочные индивидуальные тепловые пункты ANHEL®",
        size: "2.32 МБ",
        href: "/docs/heating-unit/cert-deklaratsiya.pdf",
      },
    ],
  },

  footerCta: {
    tag: "06 · ЗАПРОС КП",
    title: "Соберите свой ИТП под проект",
    subtitle: "Ответим в течение рабочего дня. Расчёт подбора бесплатный.",
    cta: { label: "Заполнить опросный лист", href: "#documents" },
    neighboursCaption: "Остальные разделы",
  },
};
