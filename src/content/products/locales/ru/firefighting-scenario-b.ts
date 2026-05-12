/**
 * Content for Scenario-B — the isometric flow-diagram sandbox variant.
 *
 * Unlike Scenario-A (which has a 6-step scroll narrative), this scene
 * treats the pump station as a catalogue of addressable components.
 * Each component has its own coordinates in the SVG viewBox, a short
 * mono-tag for the visible label, and a spec sheet that the side panel
 * renders when the item is selected.
 *
 * Keep coordinates here and only here — the diagram component reads
 * them instead of hard-coding, so moving a node is a one-line edit.
 * The coordinate system is the SVG viewBox defined in IsometricDiagram
 * (0 0 1200 720).
 *
 * Categories drive pipe colouring in the diagram:
 *   - "source"   intake / water supply
 *   - "valve"    stop / control valves
 *   - "pump"     any pump (distinguished by role in spec)
 *   - "manifold" collector / header
 *   - "sensor"   pressure / flow instruments
 *   - "riser"    vertical distribution pipes
 *   - "sprinkler" end-point emitter
 */

export type ComponentKind =
  | "source"
  | "valve"
  | "pump"
  | "manifold"
  | "sensor"
  | "riser"
  | "sprinkler";

export type ComponentSpec = {
  label: string;
  value: string;
};

export type ScenarioBComponent = {
  /** Stable id — used as React key and as the selection handle. */
  id: string;
  kind: ComponentKind;
  /** Display name in the panel header. */
  name: string;
  /** Short mono-tag shown next to the node on the diagram. */
  mono: string;
  /** One-line subtitle in the panel. */
  subtitle: string;
  spec: ComponentSpec[];
  /** Anchor point of the node in SVG coords. */
  x: number;
  y: number;
};

/**
 * 10 components, arranged left-to-right by flow direction:
 *   intake → inlet valve → pump group (jockey + main + backup) →
 *   manifold with pressure sensor → two risers → example sprinkler.
 *
 * The pump group is stacked vertically around y=420 so the schematic
 * reads as "one input, three parallel pumps, one output" at a glance.
 */
export const scenarioBComponents: readonly ScenarioBComponent[] = [
  {
    id: "intake",
    kind: "source",
    name: "Ввод воды",
    mono: "ВВОД · ГОР.",
    subtitle: "Городской водопровод или накопительный резервуар",
    spec: [
      { label: "Диаметр подачи", value: "DN 150–200" },
      { label: "Давление ввода", value: "1.5–4.0 бар" },
      { label: "Резервирование", value: "два независимых ввода" },
      { label: "Норматив", value: "СП 10.13130.2020" },
    ],
    x: 90,
    y: 420,
  },
  {
    id: "inlet-valve",
    kind: "valve",
    name: "Задвижка входная",
    mono: "V-01 · DN150",
    subtitle: "Шибер с электроприводом, нормально открыта",
    spec: [
      { label: "Тип", value: "Шибер с эл. приводом" },
      { label: "Сигнал", value: "24 VDC на щит управления" },
      { label: "Материал", value: "Чугун с эпокс. покрытием" },
      { label: "Норматив", value: "ГОСТ 33423-2015" },
    ],
    x: 230,
    y: 420,
  },
  {
    id: "pump-jockey",
    kind: "pump",
    name: "Жокей-насос P-03",
    mono: "P-03 · ЖОКЕЙ",
    subtitle: "Поддерживает рабочее давление в контуре",
    spec: [
      { label: "Производительность", value: "3–8 м³/ч" },
      { label: "Напор", value: "90–120 м" },
      { label: "Мощность", value: "2.2 кВт" },
      { label: "Режим", value: "Автомат по реле давления" },
    ],
    x: 380,
    y: 300,
  },
  {
    id: "pump-primary",
    kind: "pump",
    name: "Насос основной P-01",
    mono: "P-01 · ОСН.",
    subtitle: "Пуск при падении давления ниже уставки",
    spec: [
      { label: "Производительность", value: "108 м³/ч" },
      { label: "Напор", value: "95 м" },
      { label: "Мощность", value: "45 кВт" },
      { label: "Корпус", value: "Чугун GGG-40" },
      { label: "Норматив", value: "СП 10.13130.2020" },
    ],
    x: 380,
    y: 420,
  },
  {
    id: "pump-backup",
    kind: "pump",
    name: "Насос резервный P-02",
    mono: "P-02 · РЕЗ.",
    subtitle: "Автозапуск при отказе P-01 за 3 секунды",
    spec: [
      { label: "Производительность", value: "108 м³/ч" },
      { label: "Напор", value: "95 м" },
      { label: "Мощность", value: "45 кВт" },
      { label: "Резервирование", value: "100 %, ATS щит" },
    ],
    x: 380,
    y: 540,
  },
  {
    id: "manifold",
    kind: "manifold",
    name: "Коллектор напорный",
    mono: "КОЛЛ. · DN150",
    subtitle: "Сводит потоки насосной группы в стояки",
    spec: [
      { label: "Диаметр", value: "DN 150" },
      { label: "Рабочее давление", value: "10 бар" },
      { label: "Материал", value: "Сталь 09Г2С" },
      { label: "Фланцы", value: "ГОСТ 33259-2015" },
    ],
    x: 570,
    y: 420,
  },
  {
    id: "pressure-sensor",
    kind: "sensor",
    name: "Датчик давления",
    mono: "PS-1 · 10 БАР",
    subtitle: "Замыкает контур управления на щит",
    spec: [
      { label: "Диапазон", value: "0–16 бар" },
      { label: "Выход", value: "4–20 мА" },
      { label: "Класс точности", value: "1.0" },
      { label: "Присоединение", value: "G½″" },
    ],
    x: 660,
    y: 340,
  },
  {
    id: "riser-left",
    kind: "riser",
    name: "Стояк левый",
    mono: "СТ-L · DN100",
    subtitle: "Вертикальная подача на этажи 1–20",
    spec: [
      { label: "Диаметр", value: "DN 100" },
      { label: "Давление у верхней точки", value: "≥ 0.6 бар" },
      { label: "Материал", value: "Сталь оцинкованная" },
      { label: "Крепления", value: "ГОСТ 34045-2016" },
    ],
    x: 780,
    y: 420,
  },
  {
    id: "riser-right",
    kind: "riser",
    name: "Стояк правый",
    mono: "СТ-R · DN100",
    subtitle: "Резерв и балансировка нагрузки",
    spec: [
      { label: "Диаметр", value: "DN 100" },
      { label: "Связь со СТ-L", value: "перемычки через каждые 5 этажей" },
      { label: "Материал", value: "Сталь оцинкованная" },
      { label: "Испытания", value: "1.5 × рабочее давление" },
    ],
    x: 840,
    y: 420,
  },
  {
    id: "sprinkler",
    kind: "sprinkler",
    name: "Ороситель",
    mono: "СПР · K80",
    subtitle: "Автомат, температура срабатывания 68 °C",
    spec: [
      { label: "Тип", value: "СВН-К80 / СВВ-К80" },
      { label: "Расход", value: "43 л/мин при 0.35 МПа" },
      { label: "Площадь орошения", value: "12 м²" },
      { label: "Норматив", value: "ГОСТ Р 51043-2002" },
    ],
    x: 1060,
    y: 200,
  },
];

/**
 * Ordered flow for the "auto-tour" — future extension. The tour walks
 * the viewer's attention along this list with a pause on each step.
 */
export const scenarioBFlow: readonly string[] = [
  "intake",
  "inlet-valve",
  "pump-primary",
  "manifold",
  "pressure-sensor",
  "riser-left",
  "sprinkler",
];
