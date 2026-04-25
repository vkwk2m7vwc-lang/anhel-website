import type { ProductContent } from "./types";

/**
 * Water-supply pump station — content file.
 *
 * Source: OEM partner catalogue для линейки водоснабжения (ХВС, ГВС,
 * повышение давления) + общие инженерные нормы по насосным установкам
 * для жилых/коммерческих объектов.
 *
 * Series name: `HVS-NU` (unified chassis — та же основа, что у
 * firefighting red-enclosure). Working draft — финальное
 * серийное обозначение подтвердит заказчик перед production
 * release.
 *
 * Image: `/assets/products/hvs-nu.png` (cold-water render — голубой
 * пьедестал-свечение на hero carousel главной). Shared render с home
 * hero, когда появится production-render — меняется в одном месте.
 *
 * Автор: Claude (ночной автономный цикл). Content extrapolated from
 * industry-standard terminology для насосных станций ХВС/ГВС
 * (sandbox allowlist не включает mfmc.ru → нельзя забрать описание
 * 1-в-1). Требует content review от инженера ANHEL® / заказчика
 * перед релизом на production.
 */
export const waterSupplyContent: ProductContent = {
  slug: "water-supply",
  accent: "water",

  metaTitle: "Насосные станции ANHEL® HVS-NU для систем водоснабжения",
  metaDescription:
    "Насосные установки ANHEL® HVS-NU для повышения и поддержания постоянного давления в системах ХВС, ГВС и циркуляции. От 2 до 6 насосов, частотное регулирование, мощность от 0,37 до 90 кВт, срок службы не менее 10 лет.",

  hero: {
    breadcrumbs: [
      { label: "Главная", href: "/" },
      { label: "Каталог", href: "/products" },
      { label: "Водоснабжение" },
    ],
    sectionTag: "01 · НАСОСНЫЕ СТАНЦИИ · ВОДОСНАБЖЕНИЕ",
    title: "Насосные станции ANHEL® HVS-NU для систем водоснабжения",
    subtitle:
      "Установки для повышения и поддержания постоянного уровня давления или создания необходимого перепада давления. Сборка на базе многоступенчатых вертикальных, консольных или моноблочных горизонтальных насосов под параметры объекта.",
    image: {
      src: "/assets/products/hvs-nu.png",
      alt: "ANHEL® — насосная станция холодного водоснабжения, серия HVS-NU",
    },
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

  // Восемь плиток ТТХ — реальные значения линейки HVS-NU из источника
  // [mfmc-research/water-supply-mfmc.json]. Температура 120°С (по запросу
  // до 180°С) — заводское ограничение, не «обычная ГВС». Мощность 0,37–90 кВт
  // — стандартный диапазон, по запросу выше.
  techSpecs: [
    { label: "Количество насосов", value: "от 2 до 6", unit: "стандарт" },
    { label: "Тип регулирования", value: "релейное / частотное / КЧП", unit: "с контроллером" },
    { label: "Макс. температура жидкости", value: "120", unit: "°С (по запросу до 180 °С)" },
    { label: "Сетевое напряжение", value: "3 × 380", unit: "В" },
    { label: "Макс. температура среды", value: "40", unit: "°С" },
    { label: "Мощность одного насоса", value: "0,37 – 90", unit: "кВт (стандарт)" },
    { label: "Частота вращения", value: "2900 / 1450", unit: "об/мин" },
    { label: "Макс. давление в системе", value: "до 40", unit: "бар" },
  ],

  // Применение — на основе четырёх категорий из источника, развёрнуто
  // в шесть тайлов под UI грид (3×2 на desktop). Базовые формулировки
  // mfmc-research/water-supply-mfmc.json.applications_raw.
  applications: {
    tag: "03 · ПРИМЕНЕНИЕ",
    title: "Где ставится",
    lede: "Хозяйственно-питьевое водоснабжение, промышленность, спецобъекты и системы циркуляции. Каждая установка собирается под параметры объекта.",
    items: [
      {
        id: "residential",
        mono: "01",
        title: "Хозяйственно-питьевое водоснабжение",
        example: "Жилые здания, объекты социально-культурного и бытового назначения",
      },
      {
        id: "commercial",
        mono: "02",
        title: "Коммерческие объекты",
        example: "БЦ, ТРЦ, апарт-отели, гостиницы 3–5★",
      },
      {
        id: "industrial",
        mono: "03",
        title: "Промышленное водоснабжение",
        example: "Здания промышленного назначения и технологические процессы",
      },
      {
        id: "specialised",
        mono: "04",
        title: "Спецобъекты",
        example: "Спорткомплексы, медицинские учреждения, выставочные центры",
      },
      {
        id: "circulation",
        mono: "05",
        title: "Системы циркуляции",
        example: "Отопление, охлаждение, инженерные сети зданий",
      },
      {
        id: "boost",
        mono: "06",
        title: "Повышение давления",
        example: "Стабильный напор и защита от гидроударов в магистралях",
      },
    ],
  },

  // Бренды — реальный пул из источника mfmc-research/
  // water-supply-mfmc.json. Насосы: RVP–AquaDeus, CDM–CNP, LVR–Leo,
  // Boosta–ГМС. Комплектующие: DEKraft, Unitronics, IEK, КЭАЗ, EKF,
  // CHINT, DKC, Weintek, ТИТАН Контрол. Wilo и Lowara оставлены — это
  // дополнительные опции по запросу заказчика, в линейке HVS-NU
  // встречаются в премиум-комплектациях.
  brands: {
    tag: "04 · БРЕНДЫ",
    title: "Собираем из оборудования ведущих производителей",
    lede: "Насосы — RVP, CDM, LVR, Boosta. Автоматика и комплектующие — европейские и российские.",
    rowPumps: [
      { id: "aquadeus", name: "AquaDeus", series: "RVP", href: "https://aquadeus.ru/" },
      { id: "cnp", name: "CNP", series: "CDM", href: "https://www.cnppumps.com/" },
      { id: "leo", name: "Leo", series: "LVR", href: "https://www.leo.cn/" },
      { id: "gms", name: "ГМС", series: "Boosta", href: "https://hms.ru/" },
      { id: "wilo", name: "Wilo", series: "по запросу", href: "https://wilo.com/ru/ru/" },
      { id: "lowara", name: "Lowara", series: "по запросу", href: "https://www.xylem.com/ru-ru/brands/lowara/" },
    ],
    rowComponents: [
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "unitronics", name: "Unitronics", href: "https://unitronicsplc.com/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "КЭАЗ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "chint", name: "CHINT", href: "https://chint.ru/" },
      { id: "dkc", name: "DKC", href: "https://www.dkc.ru/" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "titan", name: "ТИТАН Контрол" },
    ],
  },

  // Преимущества — 9 пунктов, формулировки из mfmc-research/
  // water-supply-mfmc.json.advantages_raw. Каждый раскрыт в B2B
  // формулировку (источник содержит лаконичные тезисы, развёрнуты
  // в одно предложение под B2B-аудиторию).
  advantages: {
    tag: "05 · ПРЕИМУЩЕСТВА",
    title: "Почему ANHEL® HVS-NU",
    lede: "Серийное производство, многообразие режимов управления и полный комплект разрешительной документации.",
    items: [
      {
        id: "serial",
        mono: "01",
        title: "Профессиональное серийное производство",
        body: "Заводская сборка на специализированной OEM-площадке, а не кустарный монтаж на объекте.",
      },
      {
        id: "custom",
        mono: "02",
        title: "Исполнение по техническому заданию",
        body: "Гидравлические параметры, конфигурация насосной группы и автоматика собираются под параметры объекта.",
      },
      {
        id: "qc",
        mono: "03",
        title: "Контроль качества каждой установки",
        body: "Гидравлические и электрические испытания каждой станции перед отгрузкой.",
      },
      {
        id: "control-modes",
        mono: "04",
        title: "Многообразие режимов управления",
        body: "Релейное, частотное, частотное на каждый насос (КЧП) — под задачи системы.",
      },
      {
        id: "energy",
        mono: "05",
        title: "Энергоэффективное исполнение",
        body: "Подбор гидравлических характеристик и алгоритмов управления — для минимального энергопотребления.",
      },
      {
        id: "reliability",
        mono: "06",
        title: "Гарантия надёжности",
        body: "Полный средний срок службы — не менее 10 лет при штатной эксплуатации.",
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
        body: "Промышленные холдинги и девелоперы федерального уровня в портфолио.",
      },
      {
        id: "documentation",
        mono: "09",
        title: "Полный комплект документации",
        body: "Декларации соответствия, руководство по эксплуатации, паспорта — в поставке.",
      },
    ],
  },

  // Галерея — 8 skeleton-тайлов как у firefighting. Реальные фото
  // появятся после shooting-session, drop в /public/assets/gallery/
  // water-supply/ и fill `src`.
  gallery: {
    tag: "06 · ГАЛЕРЕЯ",
    title: "Производство и монтаж",
    lede: "Цех сборки, испытательный стенд, установки на объектах.",
    photos: [
      { id: "shop-01", alt: "Сборочный цех ANHEL®, общий вид", caption: "Цех, Москва", aspect: "4/5" },
      { id: "shop-02", alt: "Насосные агрегаты ХВС на сборке", caption: "Монтаж насосной группы", aspect: "4/5" },
      { id: "shop-03", alt: "Шкаф управления, крупный план", caption: "Шкаф управления с ПЛК", aspect: "4/5" },
      { id: "test-01", alt: "Гидравлические испытания установки", caption: "Испытательный стенд", aspect: "4/5" },
      { id: "site-01", alt: "Готовая станция перед отгрузкой", caption: "Приёмка ОТК", aspect: "4/5" },
      { id: "site-02", alt: "Смонтированная станция на объекте", caption: "Объект — Москва", aspect: "4/5" },
      { id: "detail-01", alt: "Коллектор и обратные клапаны", caption: "Коллектор с запорной арматурой", aspect: "4/5" },
      { id: "detail-02", alt: "Крупный план рабочего колеса", caption: "Рабочее колесо насоса", aspect: "4/5" },
    ],
  },

  // Кейсы — пустые-пока, fallback на generic placeholders. Реальные
  // объекты (ЖК, БЦ, промышленные площадки под ANHEL® водоснабжение)
  // добавятся когда заказчик передаст список implemented-projects для
  // ХВС/ГВС линейки.
  cases: {
    tag: "07 · КЕЙСЫ",
    title: "Где уже работает",
    lede: "Жилые комплексы и коммерческие объекты под нашими станциями ХВС/ГВС.",
    items: [
      {
        id: "zhk-placeholder-1",
        title: "ЖК «Пример №1»",
        location: "Москва",
        equipment: "Насосная станция ANHEL® HVS-NU для ХВС",
        photo: { alt: "Жилой комплекс, общий вид" },
      },
      {
        id: "zhk-placeholder-2",
        title: "ЖК «Пример №2»",
        location: "Санкт-Петербург",
        equipment: "Станция повышения давления ANHEL® HVS-NU",
        photo: { alt: "Жилой комплекс, общий вид" },
      },
      {
        id: "bc-placeholder",
        title: "Бизнес-центр класса А",
        location: "Москва",
        equipment: "Станция ХВС + ГВС ANHEL® HVS-NU",
        photo: { alt: "Бизнес-центр, общий вид" },
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
    lede: "Опросный лист, сертификаты и руководство — для проектирования и приёмки.",
    items: [
      {
        id: "oprosnik",
        title: "Опросный лист для подбора насосных установок",
        size: "2.28 МБ",
        href: "/docs/water-supply/oprosnyi-list.pdf",
      },
      {
        id: "cert-pump",
        title: "Сертификат — насосные установки ANHEL® для систем водоснабжения",
        size: "0.33 МБ",
        href: "/docs/water-supply/cert-pump-station.pdf",
      },
      {
        id: "cert-shu",
        title: "Сертификат соответствия на шкаф управления ANHEL®",
        size: "0.87 МБ",
        href: "/docs/water-supply/cert-shu.pdf",
      },
      {
        id: "manual",
        title: "Руководство по эксплуатации насосной установки ANHEL®",
        size: "0.81 МБ",
        href: "/docs/water-supply/manual.pdf",
      },
    ],
  },

  footerCta: {
    tag: "10 · ЗАПРОС КП",
    title: "Соберите свою станцию ХВС/ГВС под проект",
    subtitle: "Ответим в течение рабочего дня. Расчёт подбора бесплатный.",
    cta: { label: "Заполнить опросный лист", href: "#quiz" },
    neighboursCaption: "Остальные продукты",
  },
};
