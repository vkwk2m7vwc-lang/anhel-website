/**
 * Content for section 3 "Как срабатывает" on
 * /products/pumps/firefighting.
 *
 * The section pins the viewport and steps through a six-beat narrative
 * as the user scrolls. Each beat maps to an `activeStep` index 0..5
 * inside `LakhtaScene`. The SVG reacts via `data-active-step` + per-
 * element conditional animations keyed off the same index.
 *
 * The list here is the single source of truth for copy; the scene
 * reads these indexes to decide which groups fade in and which
 * continuous loops start. The mono code (01..06) is used only for the
 * visible step label — ordering comes from array position.
 */
export type HowItWorksStep = {
  /** 0-indexed position — mirrors the value written to data-active-step. */
  index: number;
  /** "01" … "06" — shown next to the title in the rail. */
  mono: string;
  /** One-line title, sentence case. */
  title: string;
  /** One or two sentences of body copy. */
  body: string;
};

// Copy aligned with the manufacturer's АПТ (автоматическая установка
// пожаротушения) technical terminology after a pass through the
// product manual. Engineers reading the section should see the exact
// terms they use in specifications: "колба спринклера" (not just
// "спринклер"), "шкаф управления" (not just "щит"), explicit
// temperature and pressure thresholds (68°C, 10 бар).
export const howItWorksSteps: readonly HowItWorksStep[] = [
  {
    index: 0,
    mono: "01",
    title: "Очаг",
    body: "Возгорание на этаже. Температура у потолка растёт.",
  },
  {
    index: 1,
    mono: "02",
    title: "Сигнал",
    body: "Колба спринклера над очагом разрушается при 68 °C. Давление в системе резко падает.",
  },
  {
    index: 2,
    mono: "03",
    title: "Запуск",
    body: "Шкаф регистрирует падение давления, загорается индикация «Пожар», запускается основной насос.",
  },
  {
    index: 3,
    mono: "04",
    title: "Давление",
    body: "Насос выводит систему на проектные 10 бар. При недостижении — автоматический запуск резервного.",
  },
  {
    index: 4,
    mono: "05",
    title: "Подача",
    body: "Вода поднимается по стояку к активному спринклеру над очагом.",
  },
  {
    index: 5,
    mono: "06",
    title: "Локализация",
    body: "Спринклер орошает зону возгорания. Дым рассеивается, станция поддерживает давление до команды «Стоп».",
  },
];
