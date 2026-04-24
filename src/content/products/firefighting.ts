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

  // Section 6 «Бренды». Two tiers — pump brands (main line of trust)
  // and automation / power components (supporting tier). Lists mirror
  // the МФМК reference catalogue.
  brands: {
    tag: "06 · БРЕНДЫ",
    title: "Собираем из оборудования мировых производителей",
    lede: "Насосы — от проверенных производителей, автоматика — собственное и импортное.",
    rowPumps: [
      { id: "aquadeus", name: "AquaDeus", series: "RCP, RHP" },
      { id: "cnp", name: "CNP", series: "NIS, TD" },
      { id: "leo", name: "Leo", series: "Lez" },
      { id: "gms", name: "ГМС", series: "КМ" },
    ],
    rowComponents: [
      { id: "dekraft", name: "DEKraft" },
      { id: "unitronics", name: "Unitronics" },
      { id: "iek", name: "IEK" },
      { id: "keaz", name: "КЭАЗ" },
      { id: "ekf", name: "EKF" },
      { id: "chint", name: "CHINT" },
      { id: "dkc", name: "DKC" },
      { id: "weintek", name: "Weintek" },
      { id: "titan", name: "ТИТАН Контрол" },
      { id: "mfmk", name: "МФМК" },
    ],
  },

  // Section 7 «Преимущества». All nine points from the МФМК reference —
  // user asked for the full list, not a cut-down to six.
  advantages: {
    tag: "07 · ПРЕИМУЩЕСТВА",
    title: "Почему ANHEL",
    lede: "Серийное производство, контроль качества и собственная автоматика.",
    items: [
      {
        id: "serial",
        mono: "01",
        title: "Серийное производство",
        body: "Профессиональный сборочный цикл — не кустарная сборка на объекте.",
      },
      {
        id: "custom",
        mono: "02",
        title: "Индивидуальное исполнение",
        body: "Сборка по техническому заданию заказчика, гибкая конфигурация под проект.",
      },
      {
        id: "qc",
        mono: "03",
        title: "Контроль качества",
        body: "Каждая станция проходит гидравлические и электрические испытания перед отгрузкой.",
      },
      {
        id: "control-modes",
        mono: "04",
        title: "Многообразие режимов управления",
        body: "Релейное, частотное, с контроллером и плавным пуском — под задачи объекта.",
      },
      {
        id: "reliability",
        mono: "05",
        title: "Надёжность и долгий срок службы",
        body: "Полный средний срок службы — не менее 10 лет при штатной эксплуатации.",
      },
      {
        id: "own-modules",
        mono: "06",
        title: "Модули ввода/вывода собственного производства",
        body: "Автоматика собирается у нас в цеху, что упрощает интеграцию и сервис.",
      },
      {
        id: "compact",
        mono: "07",
        title: "Компактное исполнение",
        body: "Удобство транспортировки и монтажа даже в ограниченных помещениях насосных.",
      },
      {
        id: "references",
        mono: "08",
        title: "Рекомендации крупнейших заказчиков",
        body: "Жилые комплексы Москвы и Санкт-Петербурга, промышленные площадки.",
      },
      {
        id: "documentation",
        mono: "09",
        title: "Полный комплект документации",
        body: "Разрешительная и эксплуатационная — все сертификаты и паспорта в поставке.",
      },
    ],
  },

  // Section 8 «Галерея». No real photos yet — eight aspect-locked
  // placeholders. When the shooting deck lands we drop files into
  // /public/assets/gallery/firefighting/ and fill in `src` here; the
  // layout keeps working unchanged.
  gallery: {
    tag: "08 · ГАЛЕРЕЯ",
    title: "Производство и монтаж",
    lede: "Цех сборки, испытательный стенд, установки на объектах.",
    photos: [
      { id: "shop-01", alt: "Сборочный цех ANHEL, общий вид", caption: "Цех, Санкт-Петербург", aspect: "4/5" },
      { id: "shop-02", alt: "Насосные агрегаты на сборке", caption: "Монтаж насосной группы", aspect: "4/5" },
      { id: "shop-03", alt: "Шкаф управления, крупный план", caption: "Шкаф управления с ПЛК", aspect: "4/5" },
      { id: "test-01", alt: "Гидравлические испытания установки", caption: "Испытательный стенд", aspect: "4/5" },
      { id: "site-01", alt: "Готовая станция перед отгрузкой", caption: "Приёмка ОТК", aspect: "4/5" },
      { id: "site-02", alt: "Смонтированная станция на объекте", caption: "Объект — Москва", aspect: "4/5" },
      { id: "detail-01", alt: "Коллектор и обратные клапаны", caption: "Коллектор с запорной арматурой", aspect: "4/5" },
      { id: "detail-02", alt: "Крупный план рабочего колеса", caption: "Рабочее колесо насоса", aspect: "4/5" },
    ],
  },

  // Section 9 «Кейсы». Two real entries lifted from the МФМК
  // implemented-projects list for this product line. Added one
  // аnonymised example (БЦ in Санкт-Петербурге) to give the carousel
  // a third card until the real roster is handed over.
  cases: {
    tag: "09 · КЕЙСЫ",
    title: "Где уже работает",
    lede: "Жилые комплексы, бизнес-центры и промышленные площадки под нашими станциями.",
    items: [
      {
        id: "zhk-dmitrovsky",
        title: "ЖК «Дмитровский парк»",
        location: "Москва, 2023",
        equipment: "5 пожарных насосных установок Альфа Stream™",
        photo: { alt: "Жилой комплекс «Дмитровский парк», общий вид" },
      },
      {
        id: "zhk-odingrad",
        title: "ЖК «Одинград»",
        location: "Одинцово, 2022",
        equipment: "Насосная установка Альфа Stream™ АПТ",
        photo: { alt: "Жилой комплекс «Одинград», общий вид" },
      },
      {
        id: "bc-spb",
        title: "Бизнес-центр класса А",
        location: "Санкт-Петербург, 2024",
        equipment: "Станция пожаротушения на 3+1 насос",
        photo: { alt: "Бизнес-центр класса А, пример объекта" },
      },
    ],
  },

  // Section 10 «Опросный лист». Only the header copy is per-product —
  // the full field schema lives inside QuizSection because it's lifted
  // directly from the МФМК quiz PDF and is identical across all four
  // station lines.
  quiz: {
    tag: "10 · ОПРОСНЫЙ ЛИСТ",
    title: "Подбор под ваш объект",
    lede: "Шесть шагов — от контактов до технических параметров системы. Отвечаем в течение рабочего дня.",
  },

  // Section 11 «Документация». Four PDFs straight from the МФМК
  // reference. Real files go under /public/docs/firefighting/ when
  // the user drops them in; until then the hrefs point at the
  // canonical mfmc.ru copies so the click still lands on the right
  // document.
  documents: {
    tag: "11 · ДОКУМЕНТАЦИЯ",
    title: "Документы и сертификаты",
    lede: "Опросный лист, сертификаты и руководство — для проектирования и приёмки.",
    items: [
      {
        id: "oprosnik",
        title: "Опросный лист для подбора насосных установок",
        size: "2.28 МБ",
        href: "/docs/firefighting/oprosnyi-list.pdf",
      },
      {
        id: "cert-pump",
        title: "Сертификат — насосные установки АЛЬФА (водяное и пенное пожаротушение)",
        size: "0.33 МБ",
        href: "/docs/firefighting/cert-pump-station.pdf",
      },
      {
        id: "cert-shu",
        title: "Сертификат соответствия на ШУ ОМЕГА типа АШУ",
        size: "0.87 МБ",
        href: "/docs/firefighting/cert-shu.pdf",
      },
      {
        id: "manual",
        title: "Руководство по эксплуатации НУ АЛЬФА СПД",
        size: "0.81 МБ",
        href: "/docs/firefighting/manual.pdf",
      },
    ],
  },

  // Section 12 «Финальный CTA + соседние продукты». The neighbour
  // strip pulls from src/lib/products.ts and excludes this slug
  // automatically.
  footerCta: {
    tag: "12 · ЗАПРОС КП",
    title: "Соберите свою станцию под проект",
    subtitle: "Ответим в течение рабочего дня. Расчёт подбора бесплатный.",
    cta: { label: "Заполнить опросный лист", href: "#quiz" },
    neighboursCaption: "Остальные продукты",
  },
};
