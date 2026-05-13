/**
 * Content for Scenario-C — the cinematic silent-film variant.
 *
 * Five full-viewport scenes, each a single frame with one focal light
 * and one narrative caption. The goal is the opposite register from
 * A (schematic narrative) and B (engineering spec): here the system is
 * shown as a story, not as a diagram.
 *
 * Structure is intentionally minimal. Each scene component reads its
 * chapter numeral, title, caption and meta from this file so the scene
 * components stay focused on drawing + motion.
 *
 * The numerals are rendered as large editorial serif marks (180–220px)
 * set against near-black. The caption sits below on a mono tag. The
 * title is a short ru-language phrase — one line, cinematic tone.
 *
 * Accents: every scene carries a single accent colour (the "one light
 * in the frame"). Accent swaps from warm/dangerous (fire) on scenes 1-2
 * to cool/controlled (water-blue-white) on scenes 3-5, mirroring the
 * story arc: ignition → response.
 */

export type ScenarioCScene = {
  /** 1-based index matching chapter numeral on screen. */
  index: 1 | 2 | 3 | 4 | 5;
  /** Roman-numeral-like chapter marker shown on the frame. */
  chapter: string;
  /** Short Russian phrase — one line, editorial tone. */
  title: string;
  /** Two-line narrative caption, placed below the title. */
  caption: string;
  /** Mono meta tag — timestamp-like label above the chapter. */
  meta: string;
  /**
   * CSS token for the accent colour this scene will use for
   * `--accent-current`. Scenes 1-2 use warm fire; 3-5 cool response.
   */
  accentToken: string;
  /**
   * Scene kind — used by the orchestrator to pick which component to
   * mount. Also tracked here so content/order is a single source of
   * truth.
   */
  kind:
    | "silence"
    | "spark"
    | "pump"
    | "pressure"
    | "flow";
};

/**
 * The ordered story beats:
 *   01 — Silence     night city, one faint window
 *   02 — Spark       the window ignites; embers rise
 *   03 — Pump        a response: impeller begins to turn
 *   04 — Pressure    macro of a riser — pressure builds
 *   05 — Flow        the sprinkler opens, flow is released
 */
export const scenarioCScenes: ScenarioCScene[] = [
  {
    index: 1,
    chapter: "I",
    title: "Здание спит",
    caption:
      "Ночной город. Окна погашены — кроме одного. Пока ничего не происходит, но система уже под давлением.",
    meta: "01 · TISHINA · 03:41",
    accentToken: "var(--accent-fire)",
    kind: "silence",
  },
  {
    index: 2,
    chapter: "II",
    title: "Первый отблеск",
    caption:
      "В одной из квартир — вспышка. Тепло поднимается по стояку. Датчик на коллекторе срабатывает через 1,8 секунды.",
    meta: "02 · SIGNAL · 03:41:21",
    accentToken: "var(--accent-fire)",
    kind: "spark",
  },
  {
    index: 3,
    chapter: "III",
    title: "Насос запускается",
    caption:
      "Основная машина раскручивается с нуля до номинальных 2950 об/мин. На выход подаётся 10 бар.",
    meta: "03 · LAUNCH · 03:41:23",
    accentToken: "var(--color-steel-light)",
    kind: "pump",
  },
  {
    index: 4,
    chapter: "IV",
    title: "Давление в стояке",
    caption:
      "Вода идёт вверх. На стрелке манометра — 9,4 бар. На этаже пожара давление стабилизируется первым.",
    meta: "04 · PRESSURE · 03:41:31",
    accentToken: "var(--accent-water)",
    kind: "pressure",
  },
  {
    index: 5,
    chapter: "V",
    title: "Ороситель открывается",
    caption:
      "Спусковой замок расплавлен. 84 литра в минуту на точку. Огонь локализован до приезда расчёта.",
    meta: "05 · RELEASE · 03:41:44",
    accentToken: "var(--accent-water)",
    kind: "flow",
  },
];
