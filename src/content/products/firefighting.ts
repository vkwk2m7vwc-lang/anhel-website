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
  metaTitle: "Насосные станции ANHEL для систем пожаротушения",
  metaDescription:
    "Насосные станции ANHEL для систем пожаротушения. Обеспечивают необходимое давление и объём воды как в режиме ожидания, так и при тушении возгорания. От 2 до 6 насосов, релейное/частотное регулирование, срок службы не менее 10 лет.",

  hero: {
    breadcrumbs: [
      { label: "Главная", href: "/" },
      { label: "Каталог", href: "/products" },
      { label: "Пожаротушение" },
    ],
    sectionTag: "01 · НАСОСНЫЕ СТАНЦИИ · ПОЖАРОТУШЕНИЕ",
    title: "Насосные станции ANHEL для систем пожаротушения",
    subtitle:
      "Установки обеспечивают необходимое давление и объём воды в системе пожаротушения, как в режиме ожидания, так и во время увеличенного потребления при тушении возгорания. Автоматический запуск, горячее резервирование и полный комплект разрешительной документации.",
    image: {
      src: "/assets/products/hvs-nu-red2.png",
      alt: "ANHEL® — насосная станция пожаротушения в красном шкафу, серия HVS-NU",
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
      hint: "6 шагов",
    },
  },

  // Восемь плиток — реальные значения с mfmc.ru/catalog/alfa/
  // ...nasosnye-ustanovki-alfa-dlya-sistem-pozharotusheniya/.
  // Сырой JSON в _docs/mfmc-research/firefighting-mfmc.json.
  // Тип регулирования (релейное и частотное) разнесён на две
  // строки — на mfmc.ru у этой страницы оба варианта с УПП и
  // плавным пуском. Мощность / частота вращения / срок службы
  // взяты с близкого аналога (страница water-supply, та же
  // база линейки Альфа Stream → ANHEL® HVS-NU).
  techSpecs: [
    { label: "Количество насосов", value: "от 2 до 6", unit: "стандарт" },
    { label: "Тип регулирования (релейное)", value: "с контроллером / с УПП" },
    { label: "Тип регулирования (частотное)", value: "с контроллером / на каждый насос / с плавным пуском" },
    { label: "Макс. температура жидкости", value: "70", unit: "°С" },
    { label: "Сетевое напряжение", value: "3 × 380", unit: "В" },
    { label: "Мощность одного насоса", value: "0,37 – 250", unit: "кВт" },
    { label: "Частота вращения", value: "2900 / 1450", unit: "об/мин" },
    { label: "Срок службы", value: "не менее 10", unit: "лет" },
  ],

  // Section 5 «Применение». Six object types the fire-fighting station
  // is installed on. Examples use real object names where confirmed
  // (жилые, Москва/Одинцово); other categories carry a typical-object
  // descriptor until a real reference lands, at which point we swap
  // the string in place.
  applications: {
    tag: "04 · ПРИМЕНЕНИЕ",
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
  // and automation / power components (supporting tier). `href` points
  // at the manufacturer's Russia-facing portal where the brand still
  // has one; when the Russia site is offline or was never set up we
  // fall back to the global domain. Brands without a stable portal
  // render as plain word-marks.
  brands: {
    tag: "05 · БРЕНДЫ",
    title: "Собираем из оборудования мировых производителей",
    lede: "Насосы — от проверенных производителей, автоматика — собственное и импортное.",
    rowPumps: [
      {
        id: "aquadeus",
        name: "AquaDeus",
        series: "RCP, RHP",
        href: "https://aquadeus.ru/",
      },
      {
        id: "cnp",
        name: "CNP",
        series: "NIS, TD",
        href: "https://www.cnppumps.com/",
      },
      {
        id: "wilo",
        name: "Wilo",
        series: "Helix, SCP",
        href: "https://wilo.com/ru/ru/",
      },
      {
        id: "lowara",
        name: "Lowara",
        series: "e-SV, NSC",
        href: "https://www.xylem.com/ru-ru/brands/lowara/",
      },
      {
        id: "leo",
        name: "Leo",
        series: "Lez",
        href: "https://www.leo.cn/",
      },
      {
        id: "gms",
        name: "ГМС",
        series: "КМ",
        href: "https://hms.ru/",
      },
      {
        id: "kq",
        name: "KQ",
      },
    ],
    rowComponents: [
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      {
        id: "unitronics",
        name: "Unitronics",
        href: "https://unitronicsplc.com/",
      },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "КЭАЗ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "chint", name: "CHINT", href: "https://chint.ru/" },
      { id: "dkc", name: "DKC", href: "https://www.dkc.ru/" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "titan", name: "ТИТАН Контрол" },
    ],
  },

  // Section 7 «Преимущества». Full nine-point spec sheet (not a cut-down
  // to six) — инженерному читателю важен полный список.
  advantages: {
    tag: "06 · ПРЕИМУЩЕСТВА",
    title: "Почему ANHEL®",
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
    tag: "07 · ГАЛЕРЕЯ",
    title: "Производство и монтаж",
    lede: "Цех сборки, испытательный стенд, установки на объектах.",
    photos: [
      { id: "shop-01", alt: "Сборочный цех ANHEL®, общий вид", caption: "Цех, Москва", aspect: "4/5" },
      { id: "shop-02", alt: "Насосные агрегаты на сборке", caption: "Монтаж насосной группы", aspect: "4/5" },
      { id: "shop-03", alt: "Шкаф управления, крупный план", caption: "Шкаф управления с ПЛК", aspect: "4/5" },
      { id: "test-01", alt: "Гидравлические испытания установки", caption: "Испытательный стенд", aspect: "4/5" },
      { id: "site-01", alt: "Готовая станция перед отгрузкой", caption: "Приёмка ОТК", aspect: "4/5" },
      { id: "site-02", alt: "Смонтированная станция на объекте", caption: "Объект — Москва", aspect: "4/5" },
      { id: "detail-01", alt: "Коллектор и обратные клапаны", caption: "Коллектор с запорной арматурой", aspect: "4/5" },
      { id: "detail-02", alt: "Крупный план рабочего колеса", caption: "Рабочее колесо насоса", aspect: "4/5" },
    ],
  },

  // Section 9 «Кейсы». Two real implemented projects for this product
  // line. The anonymised BC-SPb placeholder was removed in the audit
  // round-1 fixes — кейсы должны быть только реальными.
  cases: {
    tag: "08 · КЕЙСЫ",
    title: "Где уже работает",
    lede: "Жилые комплексы и промышленные площадки под нашими станциями.",
    items: [
      {
        id: "zhk-dmitrovsky",
        title: "ЖК «Дмитровский парк»",
        location: "Москва, 2023",
        equipment: "5 насосных установок ANHEL HVS-NU для АПТ",
        photo: { alt: "Жилой комплекс «Дмитровский парк», общий вид" },
      },
      {
        id: "zhk-odingrad",
        title: "ЖК «Одинград»",
        location: "Одинцово, 2022",
        equipment: "Насосная установка ANHEL HVS-NU АПТ",
        photo: { alt: "Жилой комплекс «Одинград», общий вид" },
      },
    ],
  },

  // Section 10 «Опросный лист». Only the header copy is per-product —
  // the full field schema lives inside QuizSection because оно
  // идентично для всех четырёх линеек станций ANHEL.
  quiz: {
    tag: "09 · ОПРОСНЫЙ ЛИСТ",
    title: "Подбор под ваш объект",
    lede: "Шесть шагов — от контактов до технических параметров системы. Отвечаем в течение рабочего дня.",
  },

  // Section 11 «Документация». Four PDFs — опросный лист, два
  // сертификата и руководство. Реальные файлы лежат в
  // /public/docs/firefighting/; до их появления ссылки ведут на
  // локальные пути (будут 404 до загрузки файлов — ожидаемый gap).
  documents: {
    tag: "10 · ДОКУМЕНТАЦИЯ",
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
        title: "Сертификат — насосные установки ANHEL для водяного и пенного пожаротушения",
        size: "0.33 МБ",
        href: "/docs/firefighting/cert-pump-station.pdf",
      },
      {
        id: "cert-shu",
        title: "Сертификат соответствия на шкаф управления ANHEL",
        size: "0.87 МБ",
        href: "/docs/firefighting/cert-shu.pdf",
      },
      {
        id: "manual",
        title: "Руководство по эксплуатации насосной установки ANHEL",
        size: "0.81 МБ",
        href: "/docs/firefighting/manual.pdf",
      },
    ],
  },

  // Section 12 «Финальный CTA + соседние продукты». The neighbour
  // strip pulls from src/lib/products.ts and excludes this slug
  // automatically.
  footerCta: {
    tag: "11 · ЗАПРОС КП",
    title: "Соберите свою станцию под проект",
    subtitle: "Ответим в течение рабочего дня. Расчёт подбора бесплатный.",
    cta: { label: "Заполнить опросный лист", href: "#quiz" },
    neighboursCaption: "Остальные продукты",
  },
};
