import type { ProductContent } from "../../../types";

/**
 * Шкаф управления для систем дымоудаления и подпора.
 *
 * Управление противодымной вентиляцией. Пожарный сертификат
 * соответствия требованиям ФЗ-123. Стандартное исполнение IP54
 * с возможностью повышения до IP69. Красный корпус —
 * отличительный признак противопожарного устройства.
 *
 * Сырые материалы — `tmp/source/control-systems/pages/03-smoke-control.md`.
 */
export const content: ProductContent = {
  slug: "smoke-control",
  accent: "fire",

  metaTitle: "Шкафы управления для дымоудаления и подпора",
  metaDescription:
    "Шкафы управления ANHEL® для систем противодымной вентиляции — дымоудаление и подпор воздуха. Пожарный сертификат ФЗ-123, IP54+, мониторинг вентиляторов и клапанов. Для коммерческих, промышленных и жилых объектов.",

  hero: {
    breadcrumbs: [
      { label: "Главная", href: "/" },
      { label: "Каталог", href: "/products" },
      { label: "Шкафы управления", href: "/products/control-systems" },
      { label: "Для дымоудаления и подпора" },
    ],
    sectionTag: "01 · ШКАФЫ УПРАВЛЕНИЯ · ДЫМОУДАЛЕНИЕ",
    title: "Шкафы управления противодымной вентиляцией ANHEL®",
    subtitle:
      "Управление вентиляторами дымоудаления, клапанами и системами подпора воздуха. Автоматический переход в режим дымоудаления по сигналу «Пожар». Пожарный сертификат ФЗ-123, IP54+, отличительный красный корпус.",
    image: {
      src: "/assets/products/control-systems/smoke-control/hero.webp",
      alt: "ANHEL — шкаф управления противодымной вентиляцией, красный корпус с органами управления вентиляторами",
    },
    primaryCta: {
      label: "Запрос ТКП",
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
    { label: "Ввод питания", value: "1 / 2 со встроенным АВР" },
    { label: "Напряжение питания", value: "1×220 / 3×380", unit: "В" },
    { label: "Степень защиты", value: "IP54 (опц. до IP69)" },
    { label: "Климатическое исполнение", value: "УХЛ4 (опц. УХЛ1, УХЛ2)" },
    { label: "Корпус", value: "красный (противопожарный)" },
    { label: "Сертификация", value: "ФЗ-123 (пожарный)" },
    { label: "Управление клапанами", value: "поддерживается" },
    { label: "Тип управления", value: "ручное / автоматическое" },
  ],

  description: {
    tag: "03 · ОПИСАНИЕ",
    title: "Назначение и принцип работы",
    paragraphs: [
      "Шкаф управления ANHEL® противодымной вентиляцией активизируется при поступлении сигнала о пожаре, автоматически запускает вентиляторы дымоудаления и подпора, открывает пожарные клапаны и контролирует исправность всей системы. Поддерживает любые конфигурации противодымных систем — от одноэтажных до многоконтурных.",
      "Контролирует входящие сигналы управления на обрыв и короткое замыкание, проверяет обмотки двигателя, обеспечивает автоматическое переключение на резервный ввод при сбоях питания. Для зон МГН доступна опция управления нагревателями. Конструкция обеспечивает работу в экстремальных условиях задымления и высоких температур.",
    ],
  },

  applications: {
    tag: "04 · ПРИМЕНЕНИЕ",
    title: "Где ставится",
    lede: "Здания различного назначения с обязательной системой противодымной защиты.",
    items: [
      {
        id: "commercial",
        mono: "01",
        title: "Коммерческая недвижимость",
        example: "БЦ, ТРЦ, гостиницы, многофункциональные центры",
      },
      {
        id: "residential",
        mono: "02",
        title: "Жилые комплексы",
        example: "Многоэтажные ЖК, паркинги, лестничные клетки",
      },
      {
        id: "industrial",
        mono: "03",
        title: "Промышленные объекты",
        example: "Производственные цеха, склады с категорией пожароопасности",
      },
      {
        id: "mgn",
        mono: "04",
        title: "Зоны МГН",
        example: "Безопасные зоны с управлением нагревателями",
      },
      {
        id: "tunnels",
        mono: "05",
        title: "Подземные сооружения",
        example: "Тоннели, паркинги, технические этажи",
      },
      {
        id: "social",
        mono: "06",
        title: "Социальные объекты",
        example: "Школы, детсады, больницы — массовое пребывание людей",
      },
    ],
  },

  brands: {
    tag: "05 · БРЕНДЫ",
    title: "Промышленные комплектующие",
    lede: "Совместимость с системами пожарной сигнализации, устройствами плавного пуска и частотными преобразователями.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric" },
      { id: "abb", name: "ABB", series: "PSE Soft Starter" },
      { id: "siemens", name: "Siemens", series: "Sirius" },
      { id: "instart", name: "INSTART" },
      { id: "vesper", name: "Веспер" },
    ],
    rowComponents: [
      { id: "bolid", name: "Болид (Орион)", href: "https://bolid.ru/" },
      { id: "rubezh", name: "Рубеж", href: "https://rubezh.ru/" },
      { id: "owen", name: "ОВЕН", href: "https://owen.ru/" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "finder", name: "Finder", href: "https://www.findernet.com/" },
    ],
  },

  advantages: {
    tag: "06 · ПРЕИМУЩЕСТВА",
    title: "Почему ANHEL®",
    lede: "Пожарный сертификат, высокая степень защиты и проверка целостности линий.",
    items: [
      {
        id: "fz123",
        mono: "01",
        title: "Пожарный сертификат ФЗ-123",
        body: "Подтверждённая работоспособность в составе противопожарных систем — испытания на устойчивость к высоким температурам и задымлению.",
      },
      {
        id: "ip54",
        mono: "02",
        title: "Степень защиты IP54+",
        body: "Стандартно IP54 с возможностью повышения до IP69 — для жёстких условий эксплуатации.",
      },
      {
        id: "monitoring",
        mono: "03",
        title: "Мониторинг линий и обмоток",
        body: "Проверка входящих сигналов на обрыв и КЗ, контроль обмоток двигателя — диагностика ДО возникновения аварии.",
      },
      {
        id: "modes",
        mono: "04",
        title: "Ручной и автоматический режимы",
        body: "Переключение между режимами для тестирования и обслуживания. Автоматическое переключение в режим дымоудаления.",
      },
      {
        id: "redundancy",
        mono: "05",
        title: "Резервирование питания и АВР",
        body: "Один или два ввода со встроенным АВР, резервные источники бесперебойного питания.",
      },
      {
        id: "compliance",
        mono: "06",
        title: "Соответствие ПБ, СП и ГОСТ",
        body: "Монтаж и эксплуатация по нормам пожарной безопасности; красный корпус — отличительный признак противопожарного устройства.",
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
    lede: "Реализованные проекты с шкафами противодымной защиты ANHEL®.",
    items: [
      {
        id: "life-warsaw",
        title: "ЖК «Life Варшавская»",
        location: "Москва",
        equipment: "50 шкафов дымоудаления",
        photo: { alt: "ЖК Life Варшавская" },
      },
      {
        id: "arcus-smoke",
        title: "БЦ «Аркус 4»",
        location: "Москва",
        equipment: "31 шкаф противодымной защиты",
        photo: { alt: "Бизнес-центр Аркус 4" },
      },
      {
        id: "nasedkino",
        title: "Золоторудное «Наседкино»",
        location: "Забайкалье",
        equipment: "34 шкафа управления, включая дымоудаление",
        photo: { alt: "Золоторудное предприятие Наседкино" },
      },
    ],
  },

  quiz: {
    tag: "09 · ОПРОСНЫЙ ЛИСТ",
    title: "Подбор под ваш объект",
    lede: "Семь шагов — от контактов до конфигурации системы дымоудаления.",
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
    tag: "11 · ЗАПРОС ТКП",
    title: "Соберите шкаф противодымной защиты под ваш проект",
    subtitle: "Ответим в течение рабочего дня. Расчёт подбора бесплатный.",
    cta: { label: "Заполнить опросный лист", href: "/quiz/control-systems" },
    neighboursCaption: "Остальные разделы",
  },
};
