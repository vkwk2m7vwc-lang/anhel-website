/**
 * Quiz schema — fields take their structure from the official
 * «Опросный лист для подбора насосных установок» ANHEL. PDF's three
 * logical sections are grouped into six UI steps to lower cognitive
 * load — the field set is identical, only the pacing changes.
 *
 * Radio option values are stable keys (not localised strings) so a
 * future backend receives stable enums regardless of copy edits.
 */

export type QuizStepId =
  | "contact"
  | "object"
  | "hydraulics"
  | "pumps"
  | "options"
  | "extra";

export type QuizStep = {
  id: QuizStepId;
  title: string;
  subtitle?: string;
};

export const QUIZ_STEPS: readonly QuizStep[] = [
  { id: "contact", title: "Контактные данные", subtitle: "Кому отвечать по заявке" },
  { id: "object", title: "Объект и тип системы", subtitle: "Где стоит установка и какая система" },
  { id: "hydraulics", title: "Гидравлика", subtitle: "Подпор, напоры, жидкость" },
  { id: "pumps", title: "Насосы и управление", subtitle: "Количество насосов и тип регулирования" },
  { id: "options", title: "Опции и коммутация", subtitle: "Задвижки, питание, передача данных, ёмкость" },
  { id: "extra", title: "Дополнительно и отправка", subtitle: "Комментарий и согласие" },
] as const;

/** System type picker — Шаг 2 (PDF «Система»). */
export type SystemType =
  | "water"
  | "fire-drencher"
  | "fire-sprinkler"
  | "heating-closed"
  | "heating-open"
  | "aircon"
  | "wells"
  | "combined"
  | "other";

/** Water intake type — Шаг 3 (PDF «Забор воды из водоёма или резервуара»). */
export type WaterSource =
  | "reservoir"
  | "underground"
  | "semi-underground"
  | "above-ground";

/** Control mode — Шаг 4 (PDF «Управление»). */
export type ControlMode =
  | "vfd-controller"
  | "vfd-per-pump"
  | "vfd-no-controller"
  | "relay-controller"
  | "relay-softstart";

/** Module housing — Шаг 5 (PDF «Модульное исполнение в ёмкости»). */
export type ModuleHousing =
  | "container"
  | "barrel-fiberglass-vertical"
  | "barrel-fiberglass-horizontal"
  | "barrel-metal-vertical"
  | "barrel-metal-horizontal";

/** Data transfer protocols — Шаг 5 (PDF «Передача данных»). Multi-select. */
export type DataTransferProtocol = "profibus" | "modbus" | "ethernet" | "gsm" | "other";

/** Option checkboxes — Шаг 5 (PDF «Опции»). Multi-select. */
export type OptionFlag =
  | "power-per-pump-no-avr"
  | "power-dual-input-avr"
  | "outdoor-uxl1-uxl2"
  | "collector-diff";

/**
 * Full shape of the quiz state. Every field is optional — the UI
 * gates progression on a small whitelist (see `canAdvance` inside
 * QuizSection), but lets the viewer leave technical fields empty if
 * they don't know the number yet.
 */
export type QuizData = {
  // Step 1 — Контакты
  org?: string;
  fullName?: string;
  role?: string;
  email?: string;
  phone?: string;
  city?: string;

  // Step 2 — Объект и система
  objectName?: string;
  systemType?: SystemType;
  systemTypeOther?: string;
  flow?: string; // м³/ч
  feedFlow?: string; // расход насоса подпитки (спринклерная)
  combinedFlowWater?: string; // если «совмещённая»
  combinedFlowFire?: string;

  // Step 3 — Гидравлика
  inletHead?: string; // подпор
  waterSource?: WaterSource;
  hMin?: string;
  hMax?: string;
  outletHead?: string;
  feedOutletHead?: string; // для спринклерной
  combinedOutletWater?: string;
  combinedOutletFire?: string;
  maxPressure?: string; // бар
  fluid?: string;
  fluidTemp?: string; // °C

  // Step 4 — Насосы
  workingPumps?: string;
  standbyPumps?: string;
  control?: ControlMode;

  // Step 5 — Опции
  valvesElectric?: "yes" | "no";
  valveCount?: string;
  valveBrand?: string;
  options?: OptionFlag[];
  collectorDiff?: string; // «разный диаметр вход/выход коллекторов» — value
  dataTransfer?: DataTransferProtocol[];
  dataTransferOther?: string;
  moduleHousing?: ModuleHousing;

  // Step 6 — Дополнительно
  extra?: string;
  consent?: boolean;
};
