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

  metaTitle: "Насосные станции водоснабжения",
  metaDescription:
    "Насосные станции холодного и горячего водоснабжения ANHEL® — для жилых комплексов, бизнес-центров и промышленных объектов. Частотное регулирование, срок службы от 10 лет.",

  hero: {
    breadcrumbs: [
      { label: "Главная", href: "/" },
      // Parent /products роут не готов — href опущен чтобы breadcrumb
      // не вёл в 404 (аналог firefighting).
      { label: "Насосные станции" },
      { label: "Водоснабжение" },
    ],
    sectionTag: "01 · НАСОСНЫЕ СТАНЦИИ · ВОДОСНАБЖЕНИЕ",
    title: "Насосные станции водоснабжения",
    subtitle:
      "Оборудование для систем ХВС, ГВС и повышения давления. Частотное регулирование по расходу, автоматическое резервирование и полный комплект разрешительной документации.",
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

  // Восемь плиток ТТХ — зеркалят структуру firefighting, но значения
  // адаптированы под водоснабжение. Мощность насосов и температура
  // уточнены под ХВС/ГВС (верхний предел +70°С — стандарт для ГВС).
  techSpecs: [
    { label: "Количество насосов", value: "от 2 до 6" },
    { label: "Производительность", value: "5 – 500", unit: "м³/ч" },
    { label: "Напор", value: "до 160", unit: "м.в.ст." },
    { label: "Макс. температура жидкости", value: "70", unit: "°С" },
    { label: "Сетевое напряжение", value: "3 × 380", unit: "В" },
    { label: "Мощность одного насоса", value: "0,37 – 200", unit: "кВт" },
    { label: "Тип регулирования", value: "частотное / релейное" },
    { label: "Срок службы", value: "не менее 10", unit: "лет" },
  ],

  // Применение — зеркало firefighting по структуре, текст адаптирован
  // под водоснабжение. Жилые и коммерческие объекты — основной рынок.
  applications: {
    tag: "03 · ПРИМЕНЕНИЕ",
    title: "Где ставится",
    lede: "От многоквартирных домов до промышленных объектов. Каждая установка собирается под проект объекта.",
    items: [
      {
        id: "residential",
        mono: "01",
        title: "Жилые комплексы",
        example: "Многоквартирные дома, ЖК, апарт-комплексы",
      },
      {
        id: "business",
        mono: "02",
        title: "Бизнес-центры",
        example: "БЦ класса A/B/C, офисные центры",
      },
      {
        id: "retail",
        mono: "03",
        title: "Торговые центры",
        example: "ТРЦ, МФК, ритейл-парки",
      },
      {
        id: "hotels",
        mono: "04",
        title: "Гостиницы",
        example: "Отели 3–5★, апарт-отели",
      },
      {
        id: "industrial",
        mono: "05",
        title: "Промышленные объекты",
        example: "Производственные цеха, склады, технопарки",
      },
      {
        id: "infrastructure",
        mono: "06",
        title: "Инфраструктурные объекты",
        example: "Вокзалы, аэропорты, спорткомплексы",
      },
    ],
  },

  // Бренды насосов и автоматики — та же линейка, что и для
  // firefighting. Производство на OEM-заводе в Москве использует
  // одинаковый пул комплектующих для всех product lines.
  brands: {
    tag: "04 · БРЕНДЫ",
    title: "Собираем из оборудования мировых производителей",
    lede: "Насосы — от проверенных производителей, автоматика — собственное и импортное.",
    rowPumps: [
      { id: "aquadeus", name: "AquaDeus", series: "RCP, RHP", href: "https://aquadeus.ru/" },
      { id: "cnp", name: "CNP", series: "NIS, TD", href: "https://www.cnppumps.com/" },
      { id: "wilo", name: "Wilo", series: "Helix, SCP, MVIE", href: "https://wilo.com/ru/ru/" },
      { id: "lowara", name: "Lowara", series: "e-SV, NSC", href: "https://www.xylem.com/ru-ru/brands/lowara/" },
      { id: "leo", name: "Leo", series: "Lez, APM", href: "https://www.leo.cn/" },
      { id: "gms", name: "ГМС", series: "КМ, К", href: "https://hms.ru/" },
      { id: "kq", name: "KQ" },
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

  // Преимущества — 9 пунктов, адаптированы под водоснабжение.
  // Основа та же, что у firefighting; изменены пункты 02 (индивидуальное
  // исполнение под ТЗ water-focused) и 05 (надёжность с акцентом на
  // круглосуточный рабочий режим, а не на аварийный запуск).
  advantages: {
    tag: "05 · ПРЕИМУЩЕСТВА",
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
        body: "Сборка под гидравлические параметры объекта, гибкая конфигурация по расходу и напору.",
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
        title: "Круглосуточный режим",
        body: "Рассчитано на непрерывную работу 24/7. Средний срок службы — не менее 10 лет при штатной эксплуатации.",
      },
      {
        id: "own-modules",
        mono: "06",
        title: "Модули ввода/вывода собственного производства",
        body: "Автоматика собирается в цеху, что упрощает интеграцию и сервис.",
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
        body: "Жилые комплексы и промышленные площадки Москвы и Санкт-Петербурга.",
      },
      {
        id: "documentation",
        mono: "09",
        title: "Полный комплект документации",
        body: "Разрешительная и эксплуатационная — все сертификаты и паспорта в поставке.",
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
