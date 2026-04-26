import type { ProductContent } from "./types";

/**
 * Water-treatment installation — content file.
 *
 * Установки водоподготовки: фильтрация, умягчение, обезжелезивание,
 * обратный осмос. Отдельная продуктовая линейка — не насосные
 * станции и не ИТП.
 *
 * Серия: `VPU-NU` (ВодоПодготовка Установка + NU суффикс chassis) —
 * working draft по аналогии с HVS-NU/BITP-NU. Финальное
 * обозначение подтвердит заказчик.
 *
 * Image: /assets/products/vpu.png — тот же render что на home hero
 * carousel (water-treatment slide).
 *
 * Структура как у water-supply — 10 секций без «Как срабатывает».
 * Секция 3 — «Применение» (промышленность, пищевая, ЖК) оставляю
 * стандартной; ИТП-подобное «Линейка модулей» не подходит, потому
 * что водоподготовка — не модульный конструктор, а индивидуальная
 * установка под качество входной воды.
 *
 * Content extrapolated. Sandbox allowlist не включает
 * anhelspb.com/catalog/waterpreparation — описание не снято 1-в-1.
 * Взяты общие нормы по водоподготовке (ГОСТ Р 51232, СанПиН 2.1.4).
 * Требует review от инженера-технолога ANHEL®.
 */
export const waterTreatmentContent: ProductContent = {
  slug: "water-treatment",
  accent: "treatment",

  metaTitle: "Установки водоподготовки ANHEL",
  metaDescription:
    "Установки водоподготовки ANHEL — высокотехнологичное оборудование с энергоэффективной автоматикой и комплектующими ведущих мировых производителей. Фильтрация, умягчение, обезжелезивание, обратный осмос. Для промышленности, пищевой отрасли и жилых объектов.",

  hero: {
    breadcrumbs: [
      { label: "Главная", href: "/" },
      { label: "Каталог", href: "/products" },
      { label: "Водоподготовка" },
    ],
    sectionTag: "01 · ИНЖЕНЕРНОЕ ОБОРУДОВАНИЕ · ВОДОПОДГОТОВКА",
    title: "Установки водоподготовки ANHEL",
    subtitle:
      "Высокотехнологичное оборудование с лучшими технологическими, конструкционными и энергосберегающими решениями. Фильтрация, умягчение, обезжелезивание, обратный осмос — комплексно с автоматикой и комплектующими ведущих мировых производителей.",
    image: {
      src: "/assets/products/vpu.png",
      alt: "ANHEL — установка водоподготовки со стальными фильтрами",
    },
    // Pair of hero CTAs:
    //   primary  — online questionnaire (5-step web form, mirror of PDF)
    //   secondary — direct PDF download for those preferring offline workflow
    primaryCta: {
      label: "Заполнить онлайн",
      href: "/quiz/vpu",
      variant: "primary",
    },
    secondaryCta: {
      label: "Опросный лист",
      href: "/docs/water-treatment/oprosnyi-list.pdf",
      variant: "ghost",
    },
  },

  // ТТХ для водоподготовки — другие оси: производительность по воде,
  // давление входа/выхода, тип фильтрующих сред, показатели выходной
  // воды. Восемь плиток на те же позиции сетки.
  techSpecs: [
    { label: "Производительность", value: "0,5 – 80", unit: "м³/ч" },
    { label: "Давление входа", value: "2 – 6", unit: "бар" },
    { label: "Давление выхода", value: "до 10", unit: "бар" },
    { label: "Температура воды", value: "5 – 35", unit: "°С" },
    { label: "Жёсткость после умягчения", value: "< 0,1", unit: "мг-экв/л" },
    { label: "Железо после обезжелезивания", value: "< 0,3", unit: "мг/л" },
    { label: "Степень очистки (RO)", value: "до 99,5", unit: "%" },
    { label: "Срок службы установки", value: "не менее 10", unit: "лет" },
  ],

  description: {
    tag: "03 · ОПИСАНИЕ",
    title: "Назначение и принцип работы",
    paragraphs: [
      "Установки водоподготовки ANHEL — комплекс фильтрации, умягчения, обезжелезивания и обратного осмоса. Подбираются под химический анализ входной воды и требования к выходной — для жилых, коммерческих и промышленных объектов.",
      "Фильтрующие среды и мембраны от ведущих мировых производителей. Автоматическая регенерация по времени или по расходу, диспетчеризация и пуско-наладка с контрольными анализами выходной воды перед передачей заказчику.",
    ],
  },

  // Применение — где ставится водоподготовка. Ключевые рынки —
  // промышленность (котельные, производство), пищевая отрасль,
  // жилые и коммерческие объекты.
  applications: {
    tag: "03 · ПРИМЕНЕНИЕ",
    title: "Где ставится",
    lede: "От жилых домов до промышленных производств. Подбор по качеству входной воды и требованиям к выходной.",
    items: [
      {
        id: "residential",
        mono: "01",
        title: "Жилые объекты",
        example: "Коттеджи, ЖК с автономным водоснабжением",
      },
      {
        id: "boiler",
        mono: "02",
        title: "Котельные",
        example: "Подготовка подпиточной воды",
      },
      {
        id: "industrial",
        mono: "03",
        title: "Промышленность",
        example: "Технологические процессы, производство",
      },
      {
        id: "food",
        mono: "04",
        title: "Пищевая отрасль",
        example: "Напитки, производство продуктов питания",
      },
      {
        id: "hospitality",
        mono: "05",
        title: "HoReCa",
        example: "Гостиницы, рестораны, SPA-центры",
      },
      {
        id: "medical",
        mono: "06",
        title: "Медицина и фармацевтика",
        example: "Больницы, лаборатории, производство лекарств",
      },
    ],
  },

  // Бренды водоподготовительного оборудования — фильтрующие среды,
  // клапаны, мембраны RO, дозирующие насосы. Стандартный ANHEL® pull
  // автоматики + специфические бренды водоподготовки (Clack для
  // управляющих клапанов, Dow FilmTec / Vontron для мембран).
  brands: {
    tag: "04 · БРЕНДЫ",
    title: "Собираем из оборудования мировых производителей",
    lede: "Фильтрующие среды, клапаны управления и мембраны — от проверенных производителей.",
    rowPumps: [
      { id: "clack", name: "Clack", series: "WS1, WS2" },
      { id: "runxin", name: "Runxin", series: "F63, F75" },
      { id: "filmtec", name: "Dow FilmTec", series: "BW, TW" },
      { id: "vontron", name: "Vontron", series: "ULP, LP" },
      { id: "ecosoft", name: "Ecosoft" },
      { id: "aquachem", name: "AquaChem" },
    ],
    rowComponents: [
      { id: "grundfos", name: "Grundfos", series: "DDA", href: "https://www.grundfos.com/" },
      { id: "dosatron", name: "Dosatron" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "КЭАЗ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "unitronics", name: "Unitronics", href: "https://unitronicsplc.com/" },
    ],
  },

  advantages: {
    tag: "05 · ПРЕИМУЩЕСТВА",
    title: "Почему ANHEL®",
    lede: "Проектирование под качество входной воды, контроль качества и собственная автоматика.",
    items: [
      {
        id: "analysis",
        mono: "01",
        title: "Подбор по анализу воды",
        body: "Химический анализ входной воды и подбор конфигурации под требования объекта.",
      },
      {
        id: "custom",
        mono: "02",
        title: "Индивидуальное исполнение",
        body: "Сборка под производительность и показатели качества выходной воды, гибкая конфигурация.",
      },
      {
        id: "qc",
        mono: "03",
        title: "Контроль качества",
        body: "Пуско-наладка с контрольными анализами выходной воды перед передачей заказчику.",
      },
      {
        id: "automation",
        mono: "04",
        title: "Автоматическая регенерация",
        body: "По времени или по расходу — фильтры самостоятельно восстанавливаются без вмешательства оператора.",
      },
      {
        id: "own-modules",
        mono: "05",
        title: "Автоматика собственного производства",
        body: "Шкаф управления и система диспетчеризации собираются у нас в цеху.",
      },
      {
        id: "documentation",
        mono: "06",
        title: "Надёжность и полный комплект документации",
        body: "Средний срок службы корпусов — не менее 10 лет; загрузки и мембраны — сменные расходники. Декларации соответствия и паспорта — в поставке.",
      },
    ],
  },

  // Section «Галерея». Установка обратного осмоса ANHEL® для ГОК Удокан.
  // Все файлы под /public/assets/production/water-treatment/.
  gallery: {
    tag: "06 · ГАЛЕРЕЯ",
    title: "С производства",
    photos: [
      {
        id: "udokan-01",
        src: "/assets/production/water-treatment/udokan-01.jpg",
        alt: "Установка обратного осмоса ANHEL® на стальной раме",
        aspect: "4/5",
      },
      {
        id: "udokan-02",
        src: "/assets/production/water-treatment/udokan-02.jpg",
        alt: "Мембранные модули установки обратного осмоса ANHEL®",
        aspect: "4/5",
      },
      {
        id: "udokan-03",
        src: "/assets/production/water-treatment/udokan-03.jpg",
        alt: "Трубопровод и арматура установки ANHEL®",
        aspect: "4/5",
      },
      {
        id: "udokan-04",
        src: "/assets/production/water-treatment/udokan-04.jpg",
        alt: "Крупный план мембранных элементов ANHEL®",
        aspect: "4/5",
      },
      {
        id: "udokan-05",
        src: "/assets/production/water-treatment/udokan-05.jpg",
        alt: "Контрольно-измерительная арматура установки ANHEL®",
        aspect: "4/5",
      },
      {
        id: "udokan-06",
        src: "/assets/production/water-treatment/udokan-06.jpg",
        alt: "Установка ANHEL® — ракурс с торца",
        aspect: "4/5",
      },
      {
        id: "udokan-07",
        src: "/assets/production/water-treatment/udokan-07.jpg",
        alt: "Стальная рама и обвязка установки ANHEL®",
        aspect: "4/5",
      },
      {
        id: "udokan-08",
        src: "/assets/production/water-treatment/udokan-08.jpg",
        alt: "Установка ANHEL® — общий вид",
        aspect: "4/5",
      },
    ],
  },

  cases: {
    tag: "07 · КЕЙСЫ",
    title: "Где уже работает",
    lede: "Промышленные и коммерческие объекты с нашими установками водоподготовки.",
    items: [
      {
        id: "industrial-placeholder",
        title: "Промышленное предприятие",
        location: "Московская область",
        equipment: "Установка ANHEL, умягчение + обезжелезивание",
        photo: { alt: "Промышленный объект, общий вид" },
      },
      {
        id: "hotel-placeholder",
        title: "Гостиница 5★",
        location: "Санкт-Петербург",
        equipment: "Установка ANHEL, комплексная водоподготовка",
        photo: { alt: "Гостиничный комплекс, общий вид" },
      },
      {
        id: "zhk-placeholder",
        title: "ЖК «Пример»",
        location: "Москва",
        equipment: "Установка ANHEL, умягчение для ГВС",
        photo: { alt: "Жилой комплекс, общий вид" },
      },
    ],
  },

  quiz: {
    tag: "08 · ОПРОСНЫЙ ЛИСТ",
    title: "Подбор под ваш объект",
    lede: "Шесть шагов — от контактов до технических параметров системы. Отвечаем в течение рабочего дня.",
  },

  documents: {
    tag: "09 · ДОКУМЕНТАЦИЯ",
    title: "Документы и сертификаты",
    lede: "Декларация соответствия ЕАЭС, опросный лист и руководство — для проектирования и приёмки.",
    items: [
      {
        id: "oprosnik",
        title: "Опросный лист для подбора установки водоподготовки",
        size: "2.23 МБ",
        href: "/docs/water-treatment/oprosnyi-list.pdf",
      },
      {
        id: "cert-deklaratsiya",
        title: "Декларация соответствия ЕАЭС — установки водоподготовки ANHEL®",
        size: "0.49 МБ",
        href: "/docs/water-treatment/cert-deklaratsiya.pdf",
      },
    ],
  },

  footerCta: {
    tag: "10 · ЗАПРОС КП",
    title: "Соберите свою установку водоподготовки под проект",
    subtitle: "Ответим в течение рабочего дня. Расчёт подбора бесплатный.",
    cta: { label: "Заполнить опросный лист", href: "#documents" },
    neighboursCaption: "Остальные продукты",
  },
};
