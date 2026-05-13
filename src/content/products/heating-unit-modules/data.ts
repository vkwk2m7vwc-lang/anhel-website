import type { HeatingModule, HeatingModuleSlug, HeatingModuleSpec } from "./types";

/**
 * 8 модулей линейки ANHEL.
 *
 * Источник: mfmc.ru/catalog/sigma/<slug>/, исходный контент сохранён
 * в _docs/mfmc-research/heating-unit-*.json. Бренд-замена «Сигма Heat®»
 * → ANHEL; «МФМК» не упоминается.
 *
 * Картинки: placeholder /assets/products/bitp.webp для всех 8 модулей.
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
  description?: string;
  techSpecs?: HeatingModuleSpec[];
  applications?: string[];
};

const EN_OVERRIDES: Record<HeatingModuleSlug, HeatingModuleOverride> = {
  "input-metering": {
    title: "Heat-intake and metering module",
    shortTitle: "Heat intake and metering",
    tagline:
      "Receives heat from the district network, performs commercial metering and distributes it to the building's energy systems.",
    imageAlt: "ANHEL — heat-intake and metering module",
    description:
      "The heat-intake and metering module is an integrated solution for the efficient receipt, distribution and commercial metering of thermal energy supplied from a centralised district heating network. The metering assembly is built in compliance with the Russian Federation's Rules for Commercial Metering of Thermal Energy and Heat Carriers (Government Decree No. 1034 of 18 November 2013). Flowmeters, pressure transmitters and temperature sensors are installed on the supply and return pipelines; only a flowmeter is installed on the make-up line. The heat calculator sits separately from the BITP control cabinet.",
    techSpecs: [
      { label: "Number of flowmeters", value: "1 to 3", unit: "standard" },
      { label: "Max. thermal load", value: "up to 5", unit: "Gcal/h" },
      { label: "Intake nominal diameter", value: "DN 15 – DN 200" },
      { label: "Max. temperature", value: "200", unit: "°C" },
      { label: "Max. working pressure", value: "2.5", unit: "MPa" },
      { label: "Heat carrier", value: "water / glycol" },
      { label: "Ambient temperature", value: "up to 50", unit: "°C" },
    ],
    applications: [
      "Receipt of heat carrier from the centralised district heating network",
      "Distribution between the building's energy-consuming systems",
      "Filtration of coarse and fine particulates",
      "Maintaining the hydraulic regime of the system",
      "Commercial metering of thermal energy",
    ],
  },
  "open-heating": {
    title: "Open heating-circuit module",
    shortTitle: "Open heating circuit",
    tagline:
      "Direct-coupled scheme: heat carrier from the trunk network feeds the building directly; DHW is drawn from the supply line.",
    imageAlt: "ANHEL — open heating-circuit module",
    description:
      "The defining feature of the direct-coupled scheme is that the heat carrier circulating through the trunk network feeds the building's system directly. The scheme is called open because domestic hot water is drawn directly from the supply pipeline. Heating is regulated based on outdoor air temperature (weather-compensated control). Circulation-pump control is on/off, variable-frequency, or variable-frequency per pump (VFD-per-pump).",
    techSpecs: [
      { label: "Circulation pumps", value: "1 to 3", unit: "standard" },
      { label: "Pump location", value: "supply / return / bypass" },
      { label: "Max. thermal load", value: "up to 5", unit: "Gcal/h" },
      { label: "System nominal diameter", value: "DN 15 – DN 200" },
      { label: "Primary-side temperature", value: "up to 200", unit: "°C" },
      { label: "Secondary-side temperature", value: "up to 120", unit: "°C" },
      { label: "Heating control", value: "weather-compensated" },
      { label: "Pump control", value: "on/off / VFD / VFD-per-pump" },
    ],
    applications: [
      "Building heating systems with a direct-coupled connection to the district network",
      "Facilities that draw DHW directly from the supply pipeline",
      "Residential and public buildings on trunk-network heating",
    ],
  },
  "closed-heating": {
    title: "Closed heating-circuit module",
    shortTitle: "Closed heating circuit",
    tagline:
      "Indirect scheme: primary and secondary circulation loops are hydraulically separated by a plate heat exchanger.",
    imageAlt: "ANHEL — closed heating-circuit module",
    description:
      "Indirect (closed) scheme: the primary circuit (district network) and the secondary circuit (the building's internal system) are hydraulically separated by a plate heat exchanger. This delivers hydraulic isolation, protects the secondary loop from contaminants in the network water and allows the building to maintain its own pressure regime. Heating is weather-compensated, regulated by outdoor air temperature. Circulation-pump control is on/off, variable-frequency, or variable-frequency per pump (VFD-per-pump).",
    techSpecs: [
      { label: "Heat exchangers", value: "1 to 2", unit: "standard" },
      { label: "Circulation pumps", value: "1 to 3", unit: "standard" },
      { label: "Pump location", value: "supply / return" },
      { label: "Max. thermal load", value: "up to 5", unit: "Gcal/h (standard)" },
      { label: "Heating-system DN", value: "DN 15 – DN 200" },
      { label: "Primary-side temperature", value: "up to 200", unit: "°C" },
      { label: "Secondary-side temperature", value: "up to 120", unit: "°C" },
      { label: "Heating control", value: "weather-compensated" },
    ],
    applications: [
      "Multi-unit residential buildings and developments on district heating",
      "Business centres and public buildings with an indirect connection scheme",
      "Industrial facilities requiring hydraulic isolation between loops",
      "Retrofit of substations transitioning from open to closed scheme",
    ],
  },
  "makeup": {
    title: "Heating-loop fill and make-up module",
    shortTitle: "Fill and make-up",
    tagline:
      "Make-up unit — integral to the indirect heating scheme. Skid-mounted: shut-off valves, circulation pumps, piping.",
    imageAlt: "ANHEL — fill and make-up module",
    description:
      "The module handles the initial filling of the secondary heating loop and compensates for operational losses of heat carrier. Control is by pressure-sensor signal: when pressure drops below the set point, the module starts the pump and tops up the water until the rated regime is restored. Pump control is on/off, variable-frequency, or variable-frequency per pump (VFD-per-pump).",
    techSpecs: [
      { label: "Make-up pumps", value: "1 to 3", unit: "standard" },
      { label: "Heating-system DN", value: "DN 15 – DN 200" },
      { label: "Max. temperature", value: "120", unit: "°C" },
      { label: "Pump control", value: "on/off / VFD / VFD-per-pump" },
      { label: "Heat carrier", value: "water / glycol" },
    ],
    applications: [
      "Indirect (closed) heating systems requiring compensation of heat-carrier losses",
      "Loops with an expansion tank and a defined static pressure",
      "Initial filling of the secondary loop at system commissioning",
    ],
  },
  "single-stage-dhw": {
    title: "Single-stage DHW module",
    shortTitle: "Single-stage DHW",
    tagline:
      "Used in closed domestic-hot-water schemes. Skid-mounted: shut-off valves, heat exchanger, circulation pumps and piping.",
    imageAlt: "ANHEL — single-stage DHW module",
    description:
      "In a single-stage scheme, the heat carrier from the district network heats DHW in a single pass through a plate heat exchanger. It is used at facilities with steady consumption and a relatively flat DHW load profile over 24 hours. Outlet temperature is regulated by a motorised valve driven by a temperature sensor. Circulation-pump control is on/off, variable-frequency, or variable-frequency per pump (VFD-per-pump).",
    techSpecs: [
      { label: "Heat exchangers", value: "1 to 2", unit: "standard" },
      { label: "Circulation pumps", value: "1 to 3", unit: "standard" },
      { label: "Pump location", value: "supply (boosting) / return" },
      { label: "Pump control", value: "on/off / VFD / VFD-per-pump" },
      { label: "DHW control", value: "by temperature" },
      { label: "Heat carrier", value: "water / glycol" },
    ],
    applications: [
      "Residential buildings with moderate DHW load",
      "Hotels and dormitories with flat consumption profiles",
      "Commercial facilities without sharp DHW demand peaks",
    ],
  },
  "two-stage-dhw": {
    title: "Two-stage DHW module",
    shortTitle: "Two-stage DHW",
    tagline:
      "Used in closed domestic-hot-water schemes. Skid-mounted: 1st-stage and 2nd-stage heat exchangers, circulation pumps and piping.",
    imageAlt: "ANHEL — two-stage DHW module",
    description:
      "In a two-stage mixed scheme, cold DHW water first passes through a preheater (tail) exchanger where it is warmed by the heating-loop return water, then through the main exchanger where it is brought up to temperature by the primary supply water. This recovers the otherwise-wasted heat from the return line and reduces the load on the main exchanger. It is used at facilities with high and variable DHW load.",
    techSpecs: [
      { label: "Heat exchangers", value: "2 to 4", unit: "standard" },
      { label: "Circulation pumps", value: "1 to 3", unit: "standard" },
      { label: "Pump location", value: "supply / return" },
      { label: "Heat-exchange stages", value: "2 (preheater + main)" },
      { label: "Pump control", value: "on/off / VFD / VFD-per-pump" },
      { label: "DHW control", value: "by temperature, cascade" },
    ],
    applications: [
      "Multi-unit residential buildings with high and variable DHW load",
      "Business centres and shopping complexes",
      "Facilities with sharp peaks in hot-water consumption",
      "Retrofit of substations to improve energy efficiency",
    ],
  },
  "two-stage-dhw-monoblock": {
    title: "Two-stage DHW monoblock module",
    shortTitle: "Two-stage DHW (monoblock)",
    tagline:
      "Used in closed DHW schemes. Skid-mounted: dual-pass heat exchanger combining stages 1 and 2, circulation pumps and piping.",
    imageAlt: "ANHEL — two-stage DHW monoblock module",
    description:
      "The monoblock design merges both stages of two-stage DHW into a single dual-pass plate heat exchanger separated internally by a baffle. This delivers two-stage energy efficiency with a smaller footprint and simplifies the piping — two stages in one device. It is used at facilities with limited substation space.",
    techSpecs: [
      { label: "Heat exchanger", value: "monoblock dual-pass (stages 1+2)" },
      { label: "Circulation pumps", value: "1 to 3", unit: "standard" },
      { label: "Pump location", value: "supply / return" },
      { label: "Pump control", value: "on/off / VFD / VFD-per-pump" },
      { label: "DHW control", value: "by temperature" },
      { label: "Footprint", value: "−15 to −25", unit: "% vs. classic 2-stage" },
    ],
    applications: [
      "Facilities with limited substation space",
      "Retrofit of substations in constrained conditions",
      "Energy-efficient projects with compactness requirements",
    ],
  },
  "steam-condensate": {
    title: "Steam-condensate module",
    shortTitle: "Steam-condensate",
    tagline:
      "Steam-to-water conversion with condensate collection and return to the steam network. Skid-mounted assembly.",
    imageAlt: "ANHEL — steam-condensate module",
    description:
      "Steam-condensate systems handle the receipt, pressure reduction and cooling of steam, plus the collection and return of condensate at facilities with steam-based heating. Condensate produced when steam cools retains up to 25% of the energy — making it a valuable heat carrier to return to the boiler. Control is by steam pressure and temperature, with protection against water-hammer. Materials are carbon or alloy steels selected to the process parameters.",
    techSpecs: [
      { label: "Steam capacity", value: "up to 100,000", unit: "kg/h" },
      { label: "Max. pressure", value: "up to 6.3", unit: "MPa" },
      { label: "Max. temperature", value: "up to 545", unit: "°C" },
      { label: "Regulator type", value: "direct-acting / electric or pneumatic actuator" },
      { label: "Material", value: "carbon / alloy steels" },
      { label: "Condensate return", value: "automatic" },
    ],
    applications: [
      "Industrial facilities with steam-based heating",
      "Greenhouse complexes",
      "Production lines using process steam",
      "Boiler houses on a steam-condensate scheme",
    ],
  },
};

const TR_OVERRIDES: Record<HeatingModuleSlug, HeatingModuleOverride> = {
  "input-metering": {
    title: "Isı girişi ve sayaç modülü",
    shortTitle: "Isı girişi ve sayaç",
    tagline:
      "Bölgesel ısı şebekesinden ısı alır, ticari sayım yapar ve binanın enerji sistemlerine dağıtır.",
    imageAlt: "ANHEL — ısı girişi ve sayaç modülü",
    description:
      "Isı girişi ve sayaç modülü, merkezi bölgesel ısı şebekesinden gelen termal enerjinin verimli alımı, dağıtımı ve ticari sayımı için entegre bir çözümdür. Sayım grubu, Rusya Federasyonu'nun «Termal Enerji ve Isı Taşıyıcılarının Ticari Sayımına İlişkin Kurallar» (18.11.2013 tarihli 1034 sayılı Hükümet Kararnamesi) uyarınca yapılır. Debimetreler, basınç vericileri ve sıcaklık sensörleri besleme ve dönüş hatlarına; takviye hattına yalnızca debimetre takılır. Isı hesaplayıcı, BITP kontrol panosundan ayrı konumlandırılır.",
    techSpecs: [
      { label: "Debimetre sayısı", value: "1 ila 3", unit: "standart" },
      { label: "Maks. termal yük", value: "5'e kadar", unit: "Gcal/saat" },
      { label: "Giriş nominal çapı", value: "DN 15 – DN 200" },
      { label: "Maks. sıcaklık", value: "200", unit: "°C" },
      { label: "Maks. çalışma basıncı", value: "2,5", unit: "MPa" },
      { label: "Isı taşıyıcı", value: "su / glikol" },
      { label: "Ortam sıcaklığı", value: "50'ye kadar", unit: "°C" },
    ],
    applications: [
      "Merkezi bölgesel ısı şebekesinden ısı taşıyıcının alımı",
      "Binanın enerji tüketim sistemleri arasında dağıtım",
      "Kaba ve ince partiküllerin filtrasyonu",
      "Sistemin hidrolik rejiminin korunması",
      "Termal enerjinin ticari sayımı",
    ],
  },
  "open-heating": {
    title: "Açık ısıtma devresi modülü",
    shortTitle: "Açık ısıtma devresi",
    tagline:
      "Doğrudan bağlı şema: ana hattan gelen ısı taşıyıcısı binayı doğrudan besler; DHW besleme hattından alınır.",
    imageAlt: "ANHEL — açık ısıtma devresi modülü",
    description:
      "Doğrudan bağlı şemanın ayırt edici özelliği, ana hatlarda dolaşan ısı taşıyıcının binanın sistemini doğrudan beslemesidir. Şemanın «açık» olarak adlandırılmasının nedeni, sıcak kullanım suyunun (DHW) doğrudan besleme hattından alınmasıdır. Isıtma, dış hava sıcaklığına göre düzenlenir (hava-kompanze kontrol). Sirkülasyon pompası kontrolü aç/kapa, frekans değişkenli veya pompa başına frekans değişkenli (VFD-per-pump) olabilir.",
    techSpecs: [
      { label: "Sirkülasyon pompası", value: "1 ila 3", unit: "standart" },
      { label: "Pompa konumu", value: "besleme / dönüş / bypass" },
      { label: "Maks. termal yük", value: "5'e kadar", unit: "Gcal/saat" },
      { label: "Sistem nominal çapı", value: "DN 15 – DN 200" },
      { label: "Birincil taraf sıcaklığı", value: "200'e kadar", unit: "°C" },
      { label: "İkincil taraf sıcaklığı", value: "120'ye kadar", unit: "°C" },
      { label: "Isıtma kontrolü", value: "hava-kompanze" },
      { label: "Pompa kontrolü", value: "aç/kapa / VFD / pompa başına VFD" },
    ],
    applications: [
      "Şehir ısı şebekesine doğrudan bağlı binaların ısıtma sistemleri",
      "DHW'yi doğrudan besleme hattından alan tesisler",
      "Ana şebeke ısıtmasındaki konut ve kamu binaları",
    ],
  },
  "closed-heating": {
    title: "Kapalı ısıtma devresi modülü",
    shortTitle: "Kapalı ısıtma devresi",
    tagline:
      "Dolaylı şema: birincil ve ikincil sirkülasyon halkaları plakalı eşanjörle hidrolik olarak ayrılır.",
    imageAlt: "ANHEL — kapalı ısıtma devresi modülü",
    description:
      "Dolaylı (kapalı) şema: birincil devre (bölgesel şebeke) ve ikincil devre (binanın iç sistemi) plakalı eşanjör ile hidrolik olarak ayrılır. Bu, hidrolik izolasyon sağlar, ikincil devreyi şebeke suyundaki kirleticilerden korur ve binanın kendi basınç rejimini sürdürmesine imkân verir. Isıtma, dış hava sıcaklığına göre hava-kompanze olarak düzenlenir. Sirkülasyon pompası kontrolü aç/kapa, frekans değişkenli veya pompa başına frekans değişkenli (VFD-per-pump) olabilir.",
    techSpecs: [
      { label: "Eşanjör sayısı", value: "1 ila 2", unit: "standart" },
      { label: "Sirkülasyon pompası", value: "1 ila 3", unit: "standart" },
      { label: "Pompa konumu", value: "besleme / dönüş" },
      { label: "Maks. termal yük", value: "5'e kadar", unit: "Gcal/saat (standart)" },
      { label: "Isıtma sistemi DN", value: "DN 15 – DN 200" },
      { label: "Birincil taraf sıcaklığı", value: "200'e kadar", unit: "°C" },
      { label: "İkincil taraf sıcaklığı", value: "120'ye kadar", unit: "°C" },
      { label: "Isıtma kontrolü", value: "hava-kompanze" },
    ],
    applications: [
      "Bölgesel ısıtmaya bağlı çok daireli konut yapıları ve siteleri",
      "Dolaylı bağlantı şemalı iş merkezleri ve kamu binaları",
      "Devreler arasında hidrolik izolasyon gereken endüstriyel tesisler",
      "Açıktan kapalı şemaya geçen ısı merkezi modernizasyonları",
    ],
  },
  "makeup": {
    title: "Isıtma devresi doldurma ve takviye modülü",
    shortTitle: "Doldurma ve takviye",
    tagline:
      "Takviye ünitesi — dolaylı ısıtma şemasının ayrılmaz parçası. Şase üzerinde: kapatma vanaları, sirkülasyon pompaları, borulama.",
    imageAlt: "ANHEL — doldurma ve takviye modülü",
    description:
      "Modül, ikincil ısıtma devresinin ilk doldurulmasını ve ısı taşıyıcının işletim kayıplarının telafisini üstlenir. Kontrol, basınç sensörü sinyaliyle yapılır: basınç ayar değerinin altına düştüğünde modül pompayı çalıştırır ve nominal rejim sağlanana kadar su takviye eder. Pompa kontrolü aç/kapa, frekans değişkenli veya pompa başına frekans değişkenli (VFD-per-pump) olabilir.",
    techSpecs: [
      { label: "Takviye pompası", value: "1 ila 3", unit: "standart" },
      { label: "Isıtma sistemi DN", value: "DN 15 – DN 200" },
      { label: "Maks. sıcaklık", value: "120", unit: "°C" },
      { label: "Pompa kontrolü", value: "aç/kapa / VFD / pompa başına VFD" },
      { label: "Isı taşıyıcı", value: "su / glikol" },
    ],
    applications: [
      "Isı taşıyıcı kaybının telafisini gerektiren dolaylı (kapalı) ısıtma sistemleri",
      "Genleşme tanklı ve tanımlı statik basınçlı devreler",
      "Sistem devreye alma sırasında ikincil devrenin ilk doldurması",
    ],
  },
  "single-stage-dhw": {
    title: "Tek kademeli DHW modülü",
    shortTitle: "Tek kademeli DHW",
    tagline:
      "Kapalı sıcak kullanım suyu şemalarında kullanılır. Şase üzerinde: kapatma vanaları, eşanjör, sirkülasyon pompaları ve borulama.",
    imageAlt: "ANHEL — tek kademeli DHW modülü",
    description:
      "Tek kademeli şemada, bölgesel şebekeden gelen ısı taşıyıcı, plakalı eşanjörden tek geçişte DHW suyunu ısıtır. 24 saat boyunca nispeten düz bir DHW yük profili olan, kararlı tüketimli tesislerde kullanılır. Çıkış sıcaklığı, sıcaklık sensörüne göre çalışan motorize vana ile düzenlenir. Sirkülasyon pompası kontrolü aç/kapa, frekans değişkenli veya pompa başına frekans değişkenli (VFD-per-pump) olabilir.",
    techSpecs: [
      { label: "Eşanjör sayısı", value: "1 ila 2", unit: "standart" },
      { label: "Sirkülasyon pompası", value: "1 ila 3", unit: "standart" },
      { label: "Pompa konumu", value: "besleme (boosting) / dönüş" },
      { label: "Pompa kontrolü", value: "aç/kapa / VFD / pompa başına VFD" },
      { label: "DHW kontrolü", value: "sıcaklığa göre" },
      { label: "Isı taşıyıcı", value: "su / glikol" },
    ],
    applications: [
      "Orta düzey DHW yüklü konut yapıları",
      "Düzgün tüketim profilli oteller ve yurtlar",
      "Keskin DHW talep tepeleri olmayan ticari tesisler",
    ],
  },
  "two-stage-dhw": {
    title: "İki kademeli DHW modülü",
    shortTitle: "İki kademeli DHW",
    tagline:
      "Kapalı sıcak kullanım suyu şemalarında kullanılır. Şase üzerinde: 1. ve 2. kademe eşanjörler, sirkülasyon pompaları ve borulama.",
    imageAlt: "ANHEL — iki kademeli DHW modülü",
    description:
      "İki kademeli karışık şemada, soğuk DHW suyu önce ön ısıtıcı (kuyruk) eşanjörden geçer ve burada ısıtma devresi dönüş suyu ile ön ısıtılır, sonra ana eşanjörden geçer ve burada birincil besleme suyu ile son sıcaklığa getirilir. Bu, dönüş hattının aksi takdirde israf edilecek ısısını geri kazanır ve ana eşanjörün yükünü düşürür. Yüksek ve değişken DHW yüklü tesislerde kullanılır.",
    techSpecs: [
      { label: "Eşanjör sayısı", value: "2 ila 4", unit: "standart" },
      { label: "Sirkülasyon pompası", value: "1 ila 3", unit: "standart" },
      { label: "Pompa konumu", value: "besleme / dönüş" },
      { label: "Isı değişim kademesi", value: "2 (ön ısıtıcı + ana)" },
      { label: "Pompa kontrolü", value: "aç/kapa / VFD / pompa başına VFD" },
      { label: "DHW kontrolü", value: "sıcaklığa göre, kademeli" },
    ],
    applications: [
      "Yüksek ve değişken DHW yüklü çok daireli konut yapıları",
      "İş merkezleri ve alışveriş kompleksleri",
      "Sıcak su tüketiminde keskin tepeler olan tesisler",
      "Enerji verimliliğini artırmaya yönelik ısı merkezi modernizasyonları",
    ],
  },
  "two-stage-dhw-monoblock": {
    title: "İki kademeli DHW monoblok modülü",
    shortTitle: "İki kademeli DHW (monoblok)",
    tagline:
      "Kapalı DHW şemalarında kullanılır. Şase üzerinde: 1. ve 2. kademeleri birleştiren çift geçişli eşanjör, sirkülasyon pompaları ve borulama.",
    imageAlt: "ANHEL — iki kademeli DHW monoblok modülü",
    description:
      "Monoblok tasarım, iki kademeli DHW'nin her iki kademesini iç bir bölme ile ayrılmış tek çift geçişli plakalı eşanjörde birleştirir. Bu, daha küçük yer kaplama (footprint) ile iki kademeli enerji verimliliği sağlar ve borulamayı sadeleştirir — tek cihazda iki kademe. Isı merkezi alanı kısıtlı tesislerde kullanılır.",
    techSpecs: [
      { label: "Eşanjör", value: "monoblok çift geçişli (1+2 kademe)" },
      { label: "Sirkülasyon pompası", value: "1 ila 3", unit: "standart" },
      { label: "Pompa konumu", value: "besleme / dönüş" },
      { label: "Pompa kontrolü", value: "aç/kapa / VFD / pompa başına VFD" },
      { label: "DHW kontrolü", value: "sıcaklığa göre" },
      { label: "Yer kaplama", value: "−15 ila −25", unit: "% (klasik 2 kademeye göre)" },
    ],
    applications: [
      "Isı merkezi alanı kısıtlı tesisler",
      "Dar koşullarda ısı merkezi modernizasyonu",
      "Kompaktlık gereksinimi olan enerji verimli projeler",
    ],
  },
  "steam-condensate": {
    title: "Buhar-kondensat modülü",
    shortTitle: "Buhar-kondensat",
    tagline:
      "Buhar şebekesine geri dönüşlü kondensat toplama ile buhardan suya dönüşüm. Şase üzerinde montaj.",
    imageAlt: "ANHEL — buhar-kondensat modülü",
    description:
      "Buhar-kondensat sistemleri, buhar tabanlı ısıtmalı tesislerde buharın alımını, basıncının düşürülmesini ve soğutulmasını, ayrıca kondensatın toplanmasını ve geri dönüşünü üstlenir. Buharın soğumasıyla oluşan kondensat, enerjinin %25'ine kadarını taşıyabilir — bu da onu kazana geri döndürülecek değerli bir ısı taşıyıcı yapar. Kontrol, buhar basıncı ve sıcaklığına göre yapılır; su darbesine karşı koruma içerir. Malzemeler, proses parametrelerine uygun karbon veya alaşımlı çeliklerdir.",
    techSpecs: [
      { label: "Buhar kapasitesi", value: "100 000'e kadar", unit: "kg/saat" },
      { label: "Maks. basınç", value: "6,3'e kadar", unit: "MPa" },
      { label: "Maks. sıcaklık", value: "545'e kadar", unit: "°C" },
      { label: "Regülatör tipi", value: "doğrudan etkili / elektrik veya pnömatik aktüatörlü" },
      { label: "Malzeme", value: "karbon / alaşımlı çelikler" },
      { label: "Kondensat dönüşü", value: "otomatik" },
    ],
    applications: [
      "Buhar tabanlı ısıtmalı endüstriyel tesisler",
      "Sera kompleksleri",
      "Proses buharı kullanan üretim hatları",
      "Buhar-kondensat şemalı kazan daireleri",
    ],
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
      ...(o.description !== undefined && { description: o.description }),
      ...(o.techSpecs !== undefined && { techSpecs: o.techSpecs }),
      ...(o.applications !== undefined && { applications: o.applications }),
    };
  });
}

/**
 * Locale-aware version of `heatingModuleBySlug` — returns the same
 * lookup table but with per-locale overrides applied. Used by the
 * module sub-page (`/products/heating-unit/[slug]`) so heading,
 * shortTitle, tagline and image alt come out in the requested locale.
 */
export function getHeatingModuleBySlug(
  locale: string,
): Record<HeatingModuleSlug, HeatingModule> {
  return getHeatingModules(locale).reduce(
    (acc, m) => {
      acc[m.slug] = m;
      return acc;
    },
    {} as Record<HeatingModuleSlug, HeatingModule>,
  );
}
