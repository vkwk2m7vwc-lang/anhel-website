/**
 * Content for section 3 «Как срабатывает» on
 * /products/pumps/firefighting.
 *
 * The section pins the viewport and steps through a six-beat narrative
 * as the user scrolls. Each beat maps to an `activeStep` index 0..5
 * inside `LakhtaScene`. On top of that the user picks a fire-suppression
 * system from the horizontal switcher above the scene — the scene's
 * interior rewires and the copy for steps 02 / 05 / 06 swaps in. The
 * system-level tagline + body + applications live here too (rendered in
 * the detail card above the 40/60 grid).
 *
 * Steps 01 / 03 / 04 are physically identical across systems (ignition,
 * signal-to-cabinet routing, pump ramp) — the narrative copy is shared.
 * Steps 02 / 05 / 06 diverge per system (detection method, hydraulic
 * behaviour, extinguishing action) — each system supplies its own copy.
 *
 * Commit 4.1 ships two systems active in the switcher (sprinkler, drencher);
 * commit 4.2 appends ВПВ + combined. The rail reads `.length` so new
 * systems light up automatically.
 *
 * --- Height-lock philosophy ---
 * Two text blocks swap on system change:
 *   1. SystemDetailCard (tagline + body + applications line) above the grid
 *   2. Active-step body card inside LakhtaSteps (steps 02, 05, 06)
 *
 * Both blocks are locked to a `min-height` calibrated from the longest
 * variant + 12px buffer (user: "8-16px, лучше whitespace чем джиттер").
 * No ScrollTrigger.refresh is fired on switch — the outer pinned box
 * keeps a constant size, so pin-spacer stays stable and the scroll
 * position/activeStep survive the system change untouched.
 */

/** Discriminator for which system the user is currently viewing. */
export type FireSystemId = "sprinkler" | "drencher" | "vpv" | "combined";

export type SystemStep = {
  /** 0-indexed — mirrors the value written to `data-active-step`. */
  index: number;
  /** "01" … "06" — shown next to the title in the step rail. */
  mono: string;
  /** One-line title, sentence case. Short — specifics live in the body. */
  title: string;
  /** One or two sentences of body copy. Swaps per system for 02/05/06. */
  body: string;
};

export type FireSystem = {
  /** Stable id — used as React key and as `data-system` on the scene. */
  id: FireSystemId;
  /** "01" … "04" — shown in the mono prefix on the switcher tab. */
  number: string;
  /** Short tab name: «Спринклерная», «Дренчерная» … */
  title: string;
  /** One-sentence tagline — the strongest one-liner about this system. */
  tagline: string;
  /** 1-2 sentences of body copy — hydraulic logic + typical trigger. */
  body: string;
  /** 3-5 representative object types, rendered mono-uppercase on one line. */
  applications: readonly string[];
  /** Six-step narrative, exactly the order 01..06. Shared steps duplicated
   *  per system so the component doesn't have to merge arrays. */
  steps: readonly [SystemStep, SystemStep, SystemStep, SystemStep, SystemStep, SystemStep];
};

// --- Narrative shared across systems (01, 03, 04) -------------------------
// Pulled out as constants so the per-system arrays stay readable and
// accidental copy drift between systems stays impossible.

const STEP_01_IGNITION: SystemStep = {
  index: 0,
  mono: "01",
  title: "Очаг",
  body: "Возгорание на этаже. Температура у потолка растёт.",
};

const STEP_03_CABINET: SystemStep = {
  index: 2,
  mono: "03",
  title: "Запуск",
  body: "Шкаф регистрирует сигнал, загорается индикация «Пожар», запускается основной насос.",
};

const STEP_04_PRESSURE: SystemStep = {
  index: 3,
  mono: "04",
  title: "Давление",
  body: "Насос выводит систему на проектные 10 бар. При недостижении — автоматический запуск резервного.",
};

// --- Systems --------------------------------------------------------------

export const fireSystems: readonly FireSystem[] = [
  {
    id: "sprinkler",
    number: "01",
    title: "Спринклерная",
    tagline: "Срабатывает точечно над очагом — орошает только зону возгорания.",
    body: "Самая распространённая схема АПТ. Оросители нормально закрыты тепловой колбой, которая разрушается при 68 °C — вода идёт только туда, где действительно горит. Минимум ущерба от пролива, максимум площади под защитой одной станции.",
    applications: ["Офисы", "Торговые центры", "Гостиницы", "Склады общего назначения"],
    steps: [
      STEP_01_IGNITION,
      {
        index: 1,
        mono: "02",
        title: "Сигнал",
        body: "Колба спринклера над очагом разрушается при 68 °C. Давление в системе резко падает.",
      },
      STEP_03_CABINET,
      STEP_04_PRESSURE,
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
    ],
  },
  {
    id: "drencher",
    number: "02",
    title: "Дренчерная",
    tagline: "Заливает зону целиком — водяная завеса отсекает огонь от остального объекта.",
    body: "Оросители открытые, без тепловой колбы. Сигнал идёт от датчиков пожарной автоматики, шкаф открывает групповой клапан — вода одновременно поступает на все оросители защищаемой зоны. Применяется там, где нужно быстрое массовое охлаждение или изоляция пространства.",
    applications: ["Сцены театров", "Трансформаторные", "Нефтебазы", "Химические производства"],
    steps: [
      STEP_01_IGNITION,
      {
        index: 1,
        mono: "02",
        title: "Сигнал",
        body: "Датчик пожарной автоматики на потолке фиксирует возгорание. Сигнал передаётся на шкаф управления.",
      },
      STEP_03_CABINET,
      STEP_04_PRESSURE,
      {
        index: 4,
        mono: "05",
        title: "Подача",
        body: "Вода одновременно поступает на все открытые оросители зоны.",
      },
      {
        index: 5,
        mono: "06",
        title: "Локализация",
        body: "Водяная завеса отсекает огонь от соседних зон, охлаждает конструкции. Орошение продолжается до команды «Стоп».",
      },
    ],
  },
];

