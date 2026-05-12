import type { HeatingModule, HeatingModuleSlug } from "./types";

/**
 * 8 модулей линейки ANHEL.
 *
 * Источник: mfmc.ru/catalog/sigma/<slug>/, исходный контент сохранён
 * в _docs/mfmc-research/heating-unit-*.json. Бренд-замена «Сигма Heat®»
 * → ANHEL; «МФМК» не упоминается.
 *
 * Картинки: placeholder /assets/products/bitp.png для всех 8 модулей.
 * 8 индивидуальных рендеров присланы заказчиком в чате, ожидают
 * сохранения в public/assets/products/heating-unit/modules/<slug>.png —
 * см. _docs/heating_unit_modules_gaps.md.
 *
 * Полнота контента:
 *   ✓ полный                 — input-metering, open-heating
 *   ⚠ tagline + общие ТТХ    — closed-heating, makeup, single-stage-dhw,
 *                               two-stage-dhw, two-stage-dhw-monoblock,
 *                               steam-condensate
 *
 * Модули с draft:true требуют ручного review заказчика перед production.
 */

const MODULE_IMG = (slug: string) =>
  `/assets/products/heating-unit/modules/${slug}.png`;

export const heatingModules: HeatingModule[] = [
  {
    slug: "input-metering",
    mono: "01",
    title: "Модуль ввода и учёта тепла",
    shortTitle: "Ввод и учёт тепла",
    tagline:
      "Приём теплоносителя из тепловой сети, его коммерческий учёт и распределение между системами энергопотребления объекта.",
    description:
      "Модуль ввода и учёта тепловой энергии — интегрированное решение для эффективного приёма, распределения и коммерческого учёта тепловой энергии, поступающей из централизованной тепловой сети. Узел учёта выполняется в соответствии с «Правилами коммерческого учёта тепловой энергии, теплоносителя» (Постановление Правительства РФ №1034 от 18.11.2013 г.). Расходомеры, преобразователи давления и термометры устанавливаются на подающем и обратном трубопроводах. На подпиточном трубопроводе устанавливается только расходомер. Тепловычислитель размещается отдельно от щита управления БИТП.",
    image: { src: MODULE_IMG("input-metering"), alt: "ANHEL — модуль ввода и учёта тепла" },
    techSpecs: [
      { label: "Количество расходомеров", value: "от 1 до 3", unit: "стандарт" },
      { label: "Макс. тепловая нагрузка", value: "до 5", unit: "Гкал/ч" },
      { label: "Диаметр узла ввода", value: "ДУ 15 – ДУ 200" },
      { label: "Макс. температура", value: "200", unit: "°С" },
      { label: "Макс. рабочее давление", value: "2,5", unit: "МПа" },
      { label: "Теплоноситель", value: "вода / гликоль" },
      { label: "Темп. окружающей среды", value: "до 50", unit: "°С" },
    ],
    applications: [
      "Приём теплоносителя из централизованной тепловой сети",
      "Распределение между системами энергопотребления объекта",
      "Очистка от крупно- и мелкодисперсных примесей",
      "Поддержание гидравлического режима системы",
      "Коммерческий учёт тепловой энергии",
    ],
  },

  {
    slug: "open-heating",
    mono: "02",
    title: "Модуль открытой системы отопления",
    shortTitle: "Открытая система отопления",
    tagline:
      "Зависимая схема: теплоноситель из магистральной сети поступает в систему здания напрямую, отбор для ГВС — из подающего трубопровода.",
    description:
      "Главная особенность зависимой системы заключается в том, что теплоноситель, протекающий по магистральным сетям, напрямую поступает в систему здания. Открытой её называют потому, что из подающего трубопровода производится отбор теплоносителя для обеспечения дома горячей водой. Регулирование отопления — погодозависимое, по температуре наружного воздуха. Регулирование циркуляционных насосов — релейное, частотное или частотное на каждый насос (КЧП).",
    image: { src: MODULE_IMG("open-heating"), alt: "ANHEL — модуль открытой системы отопления" },
    techSpecs: [
      { label: "Циркуляционные насосы", value: "от 1 до 3", unit: "стандарт" },
      { label: "Расположение насоса", value: "подача / обратка / перемычка" },
      { label: "Макс. тепловая нагрузка", value: "до 5", unit: "Гкал/ч" },
      { label: "Диаметр системы", value: "ДУ 15 – ДУ 200" },
      { label: "Темп. греющей стороны", value: "до 200", unit: "°С" },
      { label: "Темп. нагреваемой стороны", value: "до 120", unit: "°С" },
      { label: "Регулирование отопления", value: "погодозависимое" },
      { label: "Регулирование насосов", value: "релейное / частотное / КЧП" },
    ],
    applications: [
      "Системы отопления зданий с зависимой схемой подключения к тепловой сети",
      "Объекты с прямым отбором теплоносителя для ГВС из подающего трубопровода",
      "Жилые и общественные здания на магистральном теплоснабжении",
    ],
  },

  {
    slug: "closed-heating",
    mono: "03",
    title: "Модуль закрытой системы отопления",
    shortTitle: "Закрытая система отопления",
    tagline:
      "В независимой системе есть основной и дополнительный контур циркуляции, гидравлически разделённые теплообменником.",
    description:
      "Независимая (закрытая) схема: первый контур (тепловая сеть) и второй контур (внутренняя система здания) гидравлически разделены пластинчатым теплообменником. Это даёт гидравлическую развязку, защищает внутренний контур от загрязнений сетевой воды и позволяет поддерживать собственный режим давления. Регулирование отопления — погодозависимое (по температуре наружного воздуха). Регулирование циркуляционных насосов — релейное, частотное или частотное на каждый насос (КЧП).",
    image: { src: MODULE_IMG("closed-heating"), alt: "ANHEL — модуль закрытой системы отопления" },
    techSpecs: [
      { label: "Количество теплообменников", value: "от 1 до 2", unit: "стандарт" },
      { label: "Циркуляционные насосы", value: "от 1 до 3", unit: "стандарт" },
      { label: "Расположение насоса", value: "подача / обратка" },
      { label: "Макс. тепловая нагрузка", value: "до 5", unit: "Гкал/ч (стандарт)" },
      { label: "Диаметр системы отопления", value: "ДУ 15 – ДУ 200" },
      { label: "Темп. греющей стороны", value: "до 200", unit: "°С" },
      { label: "Темп. нагреваемой стороны", value: "до 120", unit: "°С" },
      { label: "Регулирование отопления", value: "погодозависимое" },
    ],
    applications: [
      "Многоквартирные жилые дома и ЖК на централизованном теплоснабжении",
      "Бизнес-центры и общественные здания с независимой схемой подключения",
      "Промышленные объекты, где нужна гидравлическая развязка контуров",
      "Реконструкция БТП с переходом с открытой схемы на закрытую",
    ],
  },

  {
    slug: "makeup",
    mono: "04",
    title: "Модуль заполнения и подпитки системы отопления",
    shortTitle: "Заполнение и подпитка",
    tagline:
      "Узел подпитки — неотъемлемая часть независимой системы отопления. Единая конструкция на общей раме: запорно-регулирующая арматура, циркуляционные насосы и трубопроводная обвязка.",
    description:
      "Модуль решает задачу первичного заполнения внутреннего контура системы отопления и компенсации эксплуатационных потерь теплоносителя. Управление — по сигналам датчика давления: при падении ниже уставки модуль включает насос и доливает воду до восстановления нормативного режима. Регулирование насосов — релейное, частотное или частотное на каждый насос (КЧП).",
    image: { src: MODULE_IMG("makeup"), alt: "ANHEL — модуль заполнения и подпитки" },
    techSpecs: [
      { label: "Насосы подпитки", value: "от 1 до 3", unit: "стандарт" },
      { label: "Диаметр системы отопления", value: "ДУ 15 – ДУ 200" },
      { label: "Максимальная температура", value: "120", unit: "°С" },
      { label: "Регулирование насосов", value: "релейное / частотное / КЧП" },
      { label: "Теплоноситель", value: "вода / гликоль" },
    ],
    applications: [
      "Независимые (закрытые) системы отопления, требующие компенсации потерь теплоносителя",
      "Контуры с расширительным баком и заданным статическим давлением",
      "Первичное заполнение внутреннего контура при запуске системы",
    ],
  },

  {
    slug: "single-stage-dhw",
    mono: "05",
    title: "Модуль одноступенчатой системы ГВС",
    shortTitle: "Одноступенчатая ГВС",
    tagline:
      "Применяется в закрытых системах приготовления горячей воды. Единая конструкция на общей раме: запорно-регулирующая арматура, теплообменное оборудование, циркуляционные насосы и трубопроводная обвязка.",
    description:
      "В одноступенчатой схеме теплоноситель из тепловой сети нагревает воду ГВС за один проход через пластинчатый теплообменник. Применяется на объектах с устойчивым потреблением и относительно ровной нагрузкой ГВС в течение суток. Регулирование температуры на выходе — клапаном с электроприводом по датчику температуры. Регулирование циркуляционных насосов — релейное, частотное или частотное на каждый насос (КЧП).",
    image: { src: MODULE_IMG("single-stage-dhw"), alt: "ANHEL — модуль одноступенчатой ГВС" },
    techSpecs: [
      { label: "Количество теплообменников", value: "от 1 до 2", unit: "стандарт" },
      { label: "Циркуляционные насосы", value: "от 1 до 3", unit: "стандарт" },
      { label: "Расположение насоса", value: "подача (повысительная) / обратка" },
      { label: "Регулирование насосов", value: "релейное / частотное / КЧП" },
      { label: "Регулирование ГВС", value: "по температуре" },
      { label: "Теплоноситель", value: "вода / гликоль" },
    ],
    applications: [
      "Жилые здания со средней нагрузкой ГВС",
      "Гостиницы и общежития с ровным графиком потребления",
      "Коммерческие объекты, где нет резких пиков расхода ГВС",
    ],
  },

  {
    slug: "two-stage-dhw",
    mono: "06",
    title: "Модуль двухступенчатой системы ГВС",
    shortTitle: "Двухступенчатая ГВС",
    tagline:
      "Применяется в закрытых системах приготовления горячей воды. Единая конструкция на общей раме: запорно-регулирующая арматура, теплообменное оборудование (1-я и 2-я ступень), циркуляционные насосы и трубопроводная обвязка.",
    description:
      "В двухступенчатой смешанной схеме холодная вода ГВС сначала проходит через предварительный (хвостовой) теплообменник, где нагревается обратной водой системы отопления, затем — через основной теплообменник, где догревается прямой сетевой водой. Это позволяет дополнительно использовать «бросовое» тепло обратки и снизить нагрузку на основной теплообменник. Применяется на объектах с большой нагрузкой ГВС и переменным графиком.",
    image: { src: MODULE_IMG("two-stage-dhw"), alt: "ANHEL — модуль двухступенчатой ГВС" },
    techSpecs: [
      { label: "Количество теплообменников", value: "от 2 до 4", unit: "стандарт" },
      { label: "Циркуляционные насосы", value: "от 1 до 3", unit: "стандарт" },
      { label: "Расположение насоса", value: "подача / обратка" },
      { label: "Ступени теплообмена", value: "2 (предвар. + основной)" },
      { label: "Регулирование насосов", value: "релейное / частотное / КЧП" },
      { label: "Регулирование ГВС", value: "по температуре, каскадное" },
    ],
    applications: [
      "Многоквартирные жилые дома с высокой и переменной нагрузкой ГВС",
      "Бизнес-центры и торговые комплексы",
      "Объекты с резкими пиками потребления горячей воды",
      "Реконструкция БТП с повышением энергоэффективности",
    ],
  },

  {
    slug: "two-stage-dhw-monoblock",
    mono: "07",
    title: "Модуль двухступенчатой ГВС на базе моноблока",
    shortTitle: "Двухступенчатая ГВС (моноблок)",
    tagline:
      "Применяется в закрытых системах приготовления горячей воды. Единая конструкция на общей раме: двухходовой теплообменник, объединяющий 1-ю и 2-ю ступень, циркуляционные насосы и трубопроводная обвязка.",
    description:
      "Моноблочное исполнение объединяет обе ступени двухступенчатой ГВС в одном корпусе двухходового пластинчатого теплообменника, разделённом перегородкой. Это даёт двухступенчатую энергоэффективность при меньшем footprint и упрощает обвязку — две ступени в одном устройстве. Применяется на объектах с ограниченным пространством теплового пункта.",
    image: { src: MODULE_IMG("two-stage-dhw-monoblock"), alt: "ANHEL — модуль двухступенчатой ГВС на моноблоке" },
    techSpecs: [
      { label: "Теплообменник", value: "моноблочный двухходовой (1+2 ступени)" },
      { label: "Циркуляционные насосы", value: "от 1 до 3", unit: "стандарт" },
      { label: "Расположение насоса", value: "подача / обратка" },
      { label: "Регулирование насосов", value: "релейное / частотное / КЧП" },
      { label: "Регулирование ГВС", value: "по температуре" },
      { label: "Footprint", value: "−15 … −25", unit: "% к классической 2-ступ. схеме" },
    ],
    applications: [
      "Объекты с ограниченным пространством теплового пункта",
      "Реконструкция БТП в стеснённых условиях",
      "Энергоэффективные проекты с требованиями к компактности",
    ],
  },

  {
    slug: "steam-condensate",
    mono: "08",
    title: "Пароконденсатные системы (СРП)",
    shortTitle: "Пароконденсатные системы",
    tagline:
      "Станции редуцирования пара (СРП) — снижение уровня парового давления и поддержание заданного давления после станции, вне зависимости от перемен в работе источника. Двух типов: на базе регулятора прямого действия и на базе регулятора с электро- или пневмоприводом.",
    description:
      "Пароконденсатные системы предназначены для приёма, редуцирования, охлаждения пара и сбора-возврата конденсата на объектах с паровым теплоснабжением. Конденсат, образующийся при охлаждении пара, способен сохранять до 25% энергии — это делает его ценным теплоносителем для возврата в котёл. Регулирование — по давлению и температуре пара, защита от гидроударов. Материалы исполнения — углеродистые или легированные стали под параметры технологического процесса.",
    image: { src: MODULE_IMG("steam-condensate"), alt: "ANHEL — пароконденсатный модуль (СРП)" },
    techSpecs: [
      { label: "Производительность по пару", value: "до 100 000", unit: "кг/ч" },
      { label: "Максимальное давление", value: "до 6,3", unit: "МПа" },
      { label: "Максимальная температура", value: "до 545", unit: "°С" },
      { label: "Тип регулятора", value: "прямого действия / электро- или пневмопривод" },
      { label: "Материал исполнения", value: "углеродистые / легированные стали" },
      { label: "Возврат конденсата", value: "автоматический" },
    ],
    applications: [
      "Промышленные объекты с паровым теплоснабжением",
      "Тепличные комплексы",
      "Производственные линии с технологическим паром",
      "Котельные с пароконденсатной схемой",
    ],
  },
];

export const heatingModuleBySlug: Record<HeatingModuleSlug, HeatingModule> =
  heatingModules.reduce(
    (acc, m) => {
      acc[m.slug] = m;
      return acc;
    },
    {} as Record<HeatingModuleSlug, HeatingModule>,
  );


/**
 * Per-locale overrides for the visible top-level fields of each
 * heating module: title, shortTitle, tagline and the image alt.
 *
 * The deep content (description, techSpecs, applications) stays as
 * the RU master for now — it shows on the module sub-page only, and
 * translating ~400 strings per locale is a follow-up task. UI on
 * the parent /products/heating-unit landing only renders the four
 * fields below, so EN/TR catalog grid reads correctly out of the box.
 */
type HeatingModuleOverride = {
  title: string;
  shortTitle: string;
  tagline: string;
  imageAlt: string;
};

const EN_OVERRIDES: Record<HeatingModuleSlug, HeatingModuleOverride> = {
  "input-metering": {
    title: "Heat-intake and metering module",
    shortTitle: "Heat intake and metering",
    tagline:
      "Receives heat from the district network, performs commercial metering and distributes it to the building's energy systems.",
    imageAlt: "ANHEL — heat-intake and metering module",
  },
  "open-heating": {
    title: "Open heating-circuit module",
    shortTitle: "Open heating circuit",
    tagline:
      "Direct-coupled scheme: heat carrier from the trunk network feeds the building directly; DHW is drawn from the supply line.",
    imageAlt: "ANHEL — open heating-circuit module",
  },
  "closed-heating": {
    title: "Closed heating-circuit module",
    shortTitle: "Closed heating circuit",
    tagline:
      "Indirect scheme: primary and secondary circulation loops are hydraulically separated by a plate heat exchanger.",
    imageAlt: "ANHEL — closed heating-circuit module",
  },
  "makeup": {
    title: "Heating-loop fill and make-up module",
    shortTitle: "Fill and make-up",
    tagline:
      "Make-up unit — integral to the indirect heating scheme. Skid-mounted: shut-off valves, circulation pumps, piping.",
    imageAlt: "ANHEL — fill and make-up module",
  },
  "single-stage-dhw": {
    title: "Single-stage DHW module",
    shortTitle: "Single-stage DHW",
    tagline:
      "Used in closed domestic-hot-water schemes. Skid-mounted: shut-off valves, heat exchanger, circulation pumps and piping.",
    imageAlt: "ANHEL — single-stage DHW module",
  },
  "two-stage-dhw": {
    title: "Two-stage DHW module",
    shortTitle: "Two-stage DHW",
    tagline:
      "Used in closed domestic-hot-water schemes. Skid-mounted: 1st-stage and 2nd-stage heat exchangers, circulation pumps and piping.",
    imageAlt: "ANHEL — two-stage DHW module",
  },
  "two-stage-dhw-monoblock": {
    title: "Two-stage DHW monoblock module",
    shortTitle: "Two-stage DHW (monoblock)",
    tagline:
      "Used in closed DHW schemes. Skid-mounted: dual-pass heat exchanger combining stages 1 and 2, circulation pumps and piping.",
    imageAlt: "ANHEL — two-stage DHW monoblock module",
  },
  "steam-condensate": {
    title: "Steam-condensate module",
    shortTitle: "Steam-condensate",
    tagline:
      "Steam-to-water conversion with condensate collection and return to the steam network. Skid-mounted assembly.",
    imageAlt: "ANHEL — steam-condensate module",
  },
};

const TR_OVERRIDES: Record<HeatingModuleSlug, HeatingModuleOverride> = {
  "input-metering": {
    title: "Isı girişi ve sayaç modülü",
    shortTitle: "Isı girişi ve sayaç",
    tagline:
      "Bölgesel ısı şebekesinden ısı alır, ticari sayım yapar ve binanın enerji sistemlerine dağıtır.",
    imageAlt: "ANHEL — ısı girişi ve sayaç modülü",
  },
  "open-heating": {
    title: "Açık ısıtma devresi modülü",
    shortTitle: "Açık ısıtma devresi",
    tagline:
      "Doğrudan bağlı şema: ana hattan gelen ısı taşıyıcısı binayı doğrudan besler; DHW besleme hattından alınır.",
    imageAlt: "ANHEL — açık ısıtma devresi modülü",
  },
  "closed-heating": {
    title: "Kapalı ısıtma devresi modülü",
    shortTitle: "Kapalı ısıtma devresi",
    tagline:
      "Dolaylı şema: birincil ve ikincil sirkülasyon halkaları plakalı eşanjörle hidrolik olarak ayrılır.",
    imageAlt: "ANHEL — kapalı ısıtma devresi modülü",
  },
  "makeup": {
    title: "Isıtma devresi doldurma ve takviye modülü",
    shortTitle: "Doldurma ve takviye",
    tagline:
      "Takviye ünitesi — dolaylı ısıtma şemasının ayrılmaz parçası. Şase üzerinde: kapatma vanaları, sirkülasyon pompaları, borulama.",
    imageAlt: "ANHEL — doldurma ve takviye modülü",
  },
  "single-stage-dhw": {
    title: "Tek kademeli DHW modülü",
    shortTitle: "Tek kademeli DHW",
    tagline:
      "Kapalı sıcak kullanım suyu şemalarında kullanılır. Şase üzerinde: kapatma vanaları, eşanjör, sirkülasyon pompaları ve borulama.",
    imageAlt: "ANHEL — tek kademeli DHW modülü",
  },
  "two-stage-dhw": {
    title: "İki kademeli DHW modülü",
    shortTitle: "İki kademeli DHW",
    tagline:
      "Kapalı sıcak kullanım suyu şemalarında kullanılır. Şase üzerinde: 1. ve 2. kademe eşanjörler, sirkülasyon pompaları ve borulama.",
    imageAlt: "ANHEL — iki kademeli DHW modülü",
  },
  "two-stage-dhw-monoblock": {
    title: "İki kademeli DHW monoblok modülü",
    shortTitle: "İki kademeli DHW (monoblok)",
    tagline:
      "Kapalı DHW şemalarında kullanılır. Şase üzerinde: 1. ve 2. kademeleri birleştiren çift geçişli eşanjör, sirkülasyon pompaları ve borulama.",
    imageAlt: "ANHEL — iki kademeli DHW monoblok modülü",
  },
  "steam-condensate": {
    title: "Buhar-kondensat modülü",
    shortTitle: "Buhar-kondensat",
    tagline:
      "Buhar şebekesine geri dönüşlü kondensat toplama ile buhardan suya dönüşüm. Şase üzerinde montaj.",
    imageAlt: "ANHEL — buhar-kondensat modülü",
  },
};

const OVERRIDES_BY_LOCALE: Record<string, Record<HeatingModuleSlug, HeatingModuleOverride>> = {
  en: EN_OVERRIDES,
  tr: TR_OVERRIDES,
};

/**
 * Returns the heating-modules array localized for the given locale.
 * RU is the master; for EN/TR we replace the top-level visible fields
 * (title, shortTitle, tagline, image.alt) from the overrides table.
 * Deep fields (description, techSpecs, applications) stay RU for now.
 */
export function getHeatingModules(locale: string): HeatingModule[] {
  const overrides = OVERRIDES_BY_LOCALE[locale];
  if (!overrides) return heatingModules;
  return heatingModules.map((m) => {
    const o = overrides[m.slug];
    if (!o) return m;
    return {
      ...m,
      title: o.title,
      shortTitle: o.shortTitle,
      tagline: o.tagline,
      image: { ...m.image, alt: o.imageAlt },
    };
  });
}
