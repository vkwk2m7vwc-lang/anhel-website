/**
 * Scenario A — narrative steps for the skyscraper cross-section.
 *
 * Each step is one scroll "beat" (≈ 100 vh). As the user scrolls through
 * the pinned section, `activeStep` advances 0 → 5. The SVG reacts via
 * the `data-active-step` attribute on the scene root — each beat in the
 * list below also names the set of SVG node ids it should light up, so
 * the styling lives next to the narrative instead of hidden in CSS.
 *
 * Why a flat object instead of a switch/case in the component:
 * keeping the mapping in content means we can tweak which nodes
 * highlight on which step by editing this file alone, without touching
 * the scene. When we ship `/scenario-b`, `-c`, `-d` they read their
 * own content files in the same shape.
 */
export type ScenarioAStep = {
  /** 0-indexed position in the narrative — used as data-active-step. */
  index: number;
  /** Mono-cap number, e.g. "01". */
  mono: string;
  /** One-line title, renders next to the number. */
  title: string;
  /** One or two sentences of body copy. */
  body: string;
  /**
   * IDs of SVG nodes that should light up while this step is active.
   * The SVG is built with these ids verbatim — see `SkyscraperSVG.tsx`.
   * The orchestrator writes the active id set to a CSS variable so
   * selectors stay snappy even with 30+ targetable nodes.
   */
  activeNodes: readonly string[];
};

export const scenarioASteps: readonly ScenarioAStep[] = [
  {
    index: 0,
    mono: "01",
    title: "Возгорание",
    body: "На верхнем уровне — очаг. Спринклер-детектор фиксирует температуру и даёт сигнал на станцию. Дым — первый маркер, который читается в разрезе.",
    activeNodes: ["smoke", "fire-sprinkler"],
  },
  {
    index: 1,
    mono: "02",
    title: "Сигнал",
    body: "По шлейфу сигнализации команда идёт вниз, мимо детализированных нижних этажей — в подвал, к насосной станции. Пять долей секунды.",
    activeNodes: ["signal-line"],
  },
  {
    index: 2,
    mono: "03",
    title: "Запуск станции",
    body: "Щит управления получает команду. Основной и резервный насосы выходят на расчётный режим, давление в коллекторе поднимается до рабочего.",
    activeNodes: ["basement", "pump-primary", "pump-backup", "control-panel"],
  },
  {
    index: 3,
    mono: "04",
    title: "Давление в стояках",
    body: "Вода уходит вверх по двум стоякам. Частицы вдоль труб показывают поток — от коллектора до верхнего этажа движение идёт одновременно по обеим магистралям.",
    activeNodes: ["riser-left", "riser-right", "water-particles"],
  },
  {
    index: 4,
    mono: "05",
    title: "Подача воды",
    body: "Спринклеры нижних этажей на линии подачи вскрываются. На очаге — активный выброс. Давление держится в диапазоне, задаваемом ТЗ объекта.",
    activeNodes: [
      "fire-sprinkler",
      "sprinkler-f1",
      "sprinkler-f2",
      "sprinkler-f3",
      "sprinkler-f4",
      "sprinkler-f5",
      "sprinkler-f6",
    ],
  },
  {
    index: 5,
    mono: "06",
    title: "Локализация",
    body: "Очаг подавлен, дым рассеивается. Станция продолжает поддерживать давление до отмены. Вся последовательность — автоматическая, без участия оператора.",
    activeNodes: ["basement", "pump-primary"],
  },
];
