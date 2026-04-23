/**
 * Content for Scenario-D — the X-ray / blueprint variant (Relats style).
 *
 * Unlike A (scroll narrative), B (isometric catalogue), or C (cinematic
 * film), this scenario treats the pump station as a medical imaging
 * scan: the building is drawn as a pure wireframe elevation on a dark
 * field, and the engineering system is drawn "through" the walls as a
 * second layer. A scan line sweeps top-to-bottom, briefly emphasising
 * whatever sits under it — the reveal language is diagnostic, not
 * decorative.
 *
 * This file defines:
 *   - The three LAYERS the viewer can toggle (архитектура, трубопровод,
 *     оборудование). Each has a label and a short id the drawing
 *     component reads.
 *   - The COMPONENTS (~10 nodes). Every component carries a layer,
 *     a bracketed ticker (drawn next to its leader line), a one-word
 *     name, and a mono meta string (e.g. "P = 10 БАР"). X/Y are in the
 *     elevation viewBox coordinates (0,0 = top-left, 1200x720).
 *   - The fire target — a single red point the "scan" is looking for.
 *
 * We avoid the component shape/spec tables from Scenario-B on purpose:
 * D is an at-a-glance holistic reveal, not a click-through spec sheet.
 */

export type ScenarioDLayer = {
  /** Stable id — referenced by components and toggle state. */
  id: "architecture" | "plumbing" | "equipment";
  /** Label on the toggle chip. */
  label: string;
  /** One-line helper text shown below the chip when active. */
  hint: string;
  /** Default visibility — all three on initially. */
  defaultOn: boolean;
};

export type ScenarioDComponent = {
  id: string;
  /** Layer the node belongs to — determines toggle visibility. */
  layer: Exclude<ScenarioDLayer["id"], "architecture">;
  /** Short bracketed number shown beside leader line, e.g. "01". */
  ticker: string;
  /** One-word name in the label (e.g. "Насос"). */
  name: string;
  /** Mono meta string (e.g. "P = 10 БАР · 85 Л/СЕК"). */
  meta: string;
  /** Anchor point in viewBox coords (where the component sits). */
  x: number;
  y: number;
  /** Label anchor — where the text block lives. */
  labelX: number;
  labelY: number;
  /** Side the label sits on — drives text alignment + leader direction. */
  side: "left" | "right";
};

export const scenarioDLayers: ScenarioDLayer[] = [
  {
    id: "architecture",
    label: "Архитектура",
    hint: "Контур здания и межэтажные перекрытия",
    defaultOn: true,
  },
  {
    id: "plumbing",
    label: "Трубопровод",
    hint: "Стояки, коллекторы и распределительные сети",
    defaultOn: true,
  },
  {
    id: "equipment",
    label: "Оборудование",
    hint: "Насосы, клапаны, датчики и оросители",
    defaultOn: true,
  },
];

/**
 * Elevation viewBox — fixed here so XraySection, ScanLine and
 * annotations resolve to the same coordinate space.
 */
export const SCENARIO_D_VIEWBOX = { w: 1200, h: 720 };

/**
 * Ten nodes distributed vertically across the elevation:
 * ground level pump room → riser ascending through floors →
 * rooftop tank and relief valves → sample sprinkler on the top floor.
 */
export const scenarioDComponents: ScenarioDComponent[] = [
  {
    id: "intake",
    layer: "plumbing",
    ticker: "01",
    name: "Ввод",
    meta: "DN 150 · ГОСУДАРСТВЕННАЯ СЕТЬ",
    x: 180,
    y: 560,
    labelX: 70,
    labelY: 560,
    side: "left",
  },
  {
    id: "primary-pump",
    layer: "equipment",
    ticker: "02",
    name: "Основной насос",
    meta: "55 кВт · 2950 ОБ/МИН · 10 БАР",
    x: 340,
    y: 580,
    labelX: 70,
    labelY: 620,
    side: "left",
  },
  {
    id: "jockey-pump",
    layer: "equipment",
    ticker: "03",
    name: "Жокей-насос",
    meta: "2,2 кВт · ПОДДЕРЖАНИЕ ДАВЛЕНИЯ",
    x: 430,
    y: 590,
    labelX: 70,
    labelY: 660,
    side: "left",
  },
  {
    id: "manifold",
    layer: "plumbing",
    ticker: "04",
    name: "Коллектор",
    meta: "DN 200 · ВЫХОД НА СТОЯКИ",
    x: 540,
    y: 570,
    labelX: 540,
    labelY: 680,
    side: "right",
  },
  {
    id: "pressure-sensor",
    layer: "equipment",
    ticker: "05",
    name: "Датчик давления",
    meta: "0–16 БАР · СИГНАЛ 4–20 мА",
    x: 605,
    y: 545,
    labelX: 720,
    labelY: 620,
    side: "right",
  },
  {
    id: "riser",
    layer: "plumbing",
    ticker: "06",
    name: "Стояк",
    meta: "DN 100 · 33 ЭТАЖА",
    x: 625,
    y: 330,
    labelX: 760,
    labelY: 330,
    side: "right",
  },
  {
    id: "branch-valve",
    layer: "equipment",
    ticker: "07",
    name: "Секционная задвижка",
    meta: "DN 100 · PN 16",
    x: 625,
    y: 240,
    labelX: 760,
    labelY: 240,
    side: "right",
  },
  {
    id: "sprinkler",
    layer: "equipment",
    ticker: "08",
    name: "Ороситель",
    meta: "K80 · 84 Л/МИН · 68°C",
    x: 780,
    y: 180,
    labelX: 880,
    labelY: 180,
    side: "right",
  },
  {
    id: "roof-tank",
    layer: "plumbing",
    ticker: "09",
    name: "Резервуар",
    meta: "6 м³ · АВАРИЙНЫЙ ЗАПАС",
    x: 560,
    y: 120,
    labelX: 70,
    labelY: 120,
    side: "left",
  },
  {
    id: "relief",
    layer: "equipment",
    ticker: "10",
    name: "Предохранительный клапан",
    meta: "12 БАР · СБРОС В АТМОСФЕРУ",
    x: 700,
    y: 130,
    labelX: 70,
    labelY: 160,
    side: "left",
  },
];

/**
 * Single red point — the thing the scan is looking FOR. Positioned on
 * floor 22, west wing. One warm pixel on the whole scan.
 */
export const scenarioDFireTarget = {
  x: 860,
  y: 215,
  floor: "22",
  meta: "ОЧАГ · 22 ЭТАЖ · ЗАПАД",
};
