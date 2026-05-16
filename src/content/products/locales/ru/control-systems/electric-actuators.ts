import type { ProductContent } from "../../../types";

/**
 * Шкаф управления для электрифицированной арматуры.
 *
 * Управление электрифицированными запорными и регулирующими
 * задвижками со стандартными асинхронными электродвигателями
 * переменного тока с короткозамкнутым ротором. До 5 задвижек,
 * мощность электропривода 0,37–7,5 кВт, прямой пуск.
 *
 * Сырые материалы — `tmp/source/control-systems/pages/05-electric-actuators.md`.
 */
export const content: ProductContent = {
  slug: "electric-actuators",
  accent: "treatment",

  metaTitle: "Шкафы управления для электрифицированной арматуры",
  metaDescription:
    "Шкафы управления ANHEL® для электроприводов запорной и регулирующей арматуры. До 5 задвижек, мощность электропривода 0,37–7,5 кВт, прямой пуск, ручной и автоматический режим.",

  hero: {
    breadcrumbs: [
      { label: "Главная", href: "/" },
      { label: "Каталог", href: "/products" },
      { label: "Шкафы управления", href: "/products/control-systems" },
      { label: "Для электрифицированной арматуры" },
    ],
    sectionTag: "01 · ШКАФЫ УПРАВЛЕНИЯ · АРМАТУРА",
    title: "Шкафы управления для электрифицированной арматуры ANHEL®",
    subtitle:
      "Управление электроприводами запорных и регулирующих задвижек по входным сигналам системы автоматизации. Ручной режим — переключатель и индикация состояния на лицевой панели. Автоматический — внешние дискретные сигналы.",
    image: {
      src: "/assets/products/control-systems/electric-actuators/hero.webp",
      alt: "ANHEL — шкаф управления электрифицированной арматурой, серый корпус с индикацией состояния задвижек",
    },
    primaryCta: {
      label: "Запрос КП",
      href: "#documents",
      variant: "primary",
    },
    secondaryCta: {
      label: "Опросный лист",
      href: "/quiz/control-systems",
      variant: "ghost",
    },
  },

  techSpecs: [
    { label: "Количество задвижек", value: "1 – 5" },
    { label: "Мощность электропривода", value: "0,37 – 7,5", unit: "кВт" },
    { label: "Способ пуска", value: "прямой" },
    { label: "Напряжение питания", value: "220 – 380", unit: "В" },
    { label: "Ввод питания", value: "один / два с АВР" },
    { label: "Тип управления", value: "ручное / автоматическое" },
    { label: "Климатическое исполнение", value: "УХЛ4 (опц. УХЛ1, УХЛ2)" },
    { label: "Протоколы", value: "Modbus RTU/TCP" },
  ],

  description: {
    tag: "03 · ОПИСАНИЕ",
    title: "Назначение и принцип работы",
    paragraphs: [
      "Шкаф управления ANHEL® для электрифицированной арматуры контролирует электроприводы запорных и регулирующих задвижек — типовых асинхронных двигателей переменного тока с короткозамкнутым ротором. Алгоритм работы основан на обработке входных сигналов от системы автоматизации.",
      "В ручном режиме открытие и закрытие задвижки выполняется переключателем на лицевой панели с индикацией состояния. В автоматическом — управление осуществляется по внешним дискретным сигналам, шкаф формирует управляющие воздействия на электропривод. Шкаф обеспечивает защиту от перегрузок, КЗ и аварийных режимов.",
    ],
  },

  applications: {
    tag: "04 · ПРИМЕНЕНИЕ",
    title: "Где ставится",
    lede: "Запорная и регулирующая арматура в технологических процессах.",
    items: [
      {
        id: "shutoff",
        mono: "01",
        title: "Запорная арматура",
        example: "Перекрытие потока в насосных станциях",
      },
      {
        id: "control",
        mono: "02",
        title: "Регулирующая арматура",
        example: "Поддержание заданных параметров технологии",
      },
      {
        id: "heating",
        mono: "03",
        title: "Теплоснабжение",
        example: "Регулирование контуров отопления и ГВС",
      },
      {
        id: "industrial",
        mono: "04",
        title: "Промышленность",
        example: "Технологические узлы с электрифицированной арматурой",
      },
      {
        id: "water-supply",
        mono: "05",
        title: "Водоснабжение",
        example: "Управление магистральными задвижками",
      },
      {
        id: "scada",
        mono: "06",
        title: "Интеграция в АСУ ТП",
        example: "Управление по дискретным сигналам и Modbus",
      },
    ],
  },

  brands: {
    tag: "05 · БРЕНДЫ",
    title: "Промышленные комплектующие",
    lede: "Контроллеры, реле и силовые компоненты — от ведущих производителей.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric" },
      { id: "abb", name: "ABB" },
      { id: "siemens", name: "Siemens" },
      { id: "auma", name: "AUMA", series: "электроприводы" },
      { id: "regada", name: "Regada", series: "электроприводы" },
    ],
    rowComponents: [
      { id: "owen", name: "ОВЕН", href: "https://owen.ru/" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "finder", name: "Finder", href: "https://www.findernet.com/" },
      { id: "phoenix", name: "Phoenix Contact", href: "https://www.phoenixcontact.com/" },
    ],
  },

  advantages: {
    tag: "06 · ПРЕИМУЩЕСТВА",
    title: "Почему ANHEL®",
    lede: "Точность управления, защита и интеграция с АСУ ТП.",
    items: [
      {
        id: "modes",
        mono: "01",
        title: "Ручной и автоматический режим",
        body: "Переключение с лицевой панели; в ручном — управление переключателем с индикацией состояния задвижки.",
      },
      {
        id: "protection",
        mono: "02",
        title: "Защита электроприводов",
        body: "Контроль перегрузок, коротких замыканий, аварийных ситуаций — продление ресурса задвижек.",
      },
      {
        id: "modbus",
        mono: "03",
        title: "Modbus RTU/TCP",
        body: "Интеграция с верхним уровнем АСУ ТП без дополнительных шлюзов.",
      },
      {
        id: "avr",
        mono: "04",
        title: "АВР на 1 или 2 ввода",
        body: "Двойной ввод с автоматическим переключением — для критичных технологических узлов.",
      },
      {
        id: "compact",
        mono: "05",
        title: "Компактное исполнение",
        body: "Габариты под установку до 5 задвижек в одном шкафу — экономия места в помещениях АСУ ТП.",
      },
      {
        id: "documentation",
        mono: "06",
        title: "Полный комплект документации",
        body: "Сертификаты, декларации, паспорта и руководство по эксплуатации — в комплекте поставки.",
      },
    ],
  },

  gallery: {
    tag: "07 · ГАЛЕРЕЯ",
    title: "С производства",
    lede: "Фотографии будут опубликованы после ретуши заводских снимков.",
    photos: [
      {
        id: "cabinets-01",
        src: "/assets/production/cabinets/cabinets-01.jpg",
        alt: "ANHEL — производство шкафов управления, фото 1",
        aspect: "4/5",
      },
      {
        id: "cabinets-02",
        src: "/assets/production/cabinets/cabinets-02.jpg",
        alt: "ANHEL — производство шкафов управления, фото 2",
        aspect: "4/5",
      },
      {
        id: "cabinets-03",
        src: "/assets/production/cabinets/cabinets-03.jpg",
        alt: "ANHEL — производство шкафов управления, фото 3",
        aspect: "4/5",
      },
      {
        id: "cabinets-04",
        src: "/assets/production/cabinets/cabinets-04.jpg",
        alt: "ANHEL — производство шкафов управления, фото 4",
        aspect: "4/5",
      },
      {
        id: "cabinets-05",
        src: "/assets/production/cabinets/cabinets-05.jpg",
        alt: "ANHEL — производство шкафов управления, фото 5",
        aspect: "4/5",
      },
      {
        id: "cabinets-06",
        src: "/assets/production/cabinets/cabinets-06.jpg",
        alt: "ANHEL — производство шкафов управления, фото 6",
        aspect: "4/5",
      },
      {
        id: "cabinets-07",
        src: "/assets/production/cabinets/cabinets-07.jpg",
        alt: "ANHEL — производство шкафов управления, фото 7",
        aspect: "4/5",
      },
      {
        id: "cabinets-08",
        src: "/assets/production/cabinets/cabinets-08.jpg",
        alt: "ANHEL — производство шкафов управления, фото 8",
        aspect: "4/5",
      },
      {
        id: "cabinets-09",
        src: "/assets/production/cabinets/cabinets-09.jpg",
        alt: "ANHEL — производство шкафов управления, фото 9",
        aspect: "4/5",
      },
      {
        id: "cabinets-10",
        src: "/assets/production/cabinets/cabinets-10.jpg",
        alt: "ANHEL — производство шкафов управления, фото 10",
        aspect: "4/5",
      },
      {
        id: "cabinets-11",
        src: "/assets/production/cabinets/cabinets-11.jpg",
        alt: "ANHEL — производство шкафов управления, фото 11",
        aspect: "4/5",
      },
      {
        id: "cabinets-12",
        src: "/assets/production/cabinets/cabinets-12.jpg",
        alt: "ANHEL — производство шкафов управления, фото 12",
        aspect: "4/5",
      },
      {
        id: "cabinets-13",
        src: "/assets/production/cabinets/cabinets-13.jpg",
        alt: "ANHEL — производство шкафов управления, фото 13",
        aspect: "4/5",
      },
    ],
  },

  cases: {
    tag: "08 · КЕЙСЫ",
    title: "Где уже работает",
    lede: "Реализованные проекты с шкафами управления арматурой.",
    items: [
      {
        id: "tula-pumps",
        title: "Тулачермет-Сталь — автоматизация насосов",
        location: "Тула",
        equipment: "Шкафы управления + ПО",
        photo: { alt: "Тулачермет-Сталь, Тула" },
      },
      {
        id: "varton",
        title: "Завод компании «Вартон»",
        location: "Обнинск",
        equipment: "Промышленная система охлаждения с электрифицированной арматурой",
        photo: { alt: "Завод Вартон, Обнинск" },
      },
      {
        id: "nasedkino",
        title: "Золоторудное «Наседкино»",
        location: "Забайкалье",
        equipment: "34 шкафа управления, в том числе арматурой",
        photo: { alt: "Золоторудное предприятие Наседкино" },
      },
    ],
  },

  quiz: {
    tag: "09 · ОПРОСНЫЙ ЛИСТ",
    title: "Подбор под ваш объект",
    lede: "Семь шагов — от контактов до конфигурации шкафа арматуры.",
  },

  documents: {
    tag: "10 · ДОКУМЕНТАЦИЯ",
    title: "Документы и опросный лист",
    lede: "Опросный лист — PDF для проектирования и приёмки или онлайн-форма с автосохранением.",
    items: [
      {
        id: "oprosnik-pdf",
        title: "Опросный лист на подбор шкафов управления (PDF)",
        size: "1.8 МБ",
        href: "/docs/control-systems/oprosnyi-list.pdf",
      },
      {
        id: "oprosnik-online",
        title: "Заполнить опросный лист онлайн",
        href: "/quiz/control-systems",
      },
    ],
  },

  footerCta: {
    tag: "11 · ЗАПРОС КП",
    title: "Соберите шкаф управления арматурой под ваш проект",
    subtitle: "Ответим в течение рабочего дня. Расчёт подбора бесплатный.",
    cta: { label: "Заполнить опросный лист", href: "/quiz/control-systems" },
    neighboursCaption: "Остальные разделы",
  },
};
