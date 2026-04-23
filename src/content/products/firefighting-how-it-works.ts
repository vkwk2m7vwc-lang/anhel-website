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

export const howItWorksSteps: readonly HowItWorksStep[] = [
  {
    index: 0,
    mono: "01",
    title: "Очаг",
    body: "На верхнем уровне здания срабатывает тепловой замок спринклера — цепь автоматики замыкает сигнал на щит. Дым над очагом читается в разрезе как первый маркер события.",
  },
  {
    index: 1,
    mono: "02",
    title: "Сигнал",
    body: "По шлейфу сигнализации команда за доли секунды уходит вниз — мимо этажей, мимо стояков, к подвалу. Щит управления в насосной получает вводную и подтверждает приём индикатором.",
  },
  {
    index: 2,
    mono: "03",
    title: "Запуск",
    body: "Щит даёт питание на основной и резервный насосы. Импеллеры выходят на расчётные обороты — красный контур и вращение крестов показывают, какие агрегаты включены.",
  },
  {
    index: 3,
    mono: "04",
    title: "Давление",
    body: "Вода поднимается по двум стоякам одновременно. Частицы в трубах идут снизу вверх — от коллектора в подвале до линии подачи под этажом очага. Давление держится в диапазоне, заданном ТЗ объекта.",
  },
  {
    index: 4,
    mono: "05",
    title: "Подача",
    body: "На уровне очага вода уходит в горизонтальную магистраль и дальше — к активному спринклеру. Частицы вдоль трубы показывают направление потока от стояка к точке срабатывания.",
  },
  {
    index: 5,
    mono: "06",
    title: "Локализация",
    body: "Спринклер над очагом вскрывается. Капли уходят в зону возгорания, температура падает, дым начинает рассеиваться. Станция поддерживает давление до отмены — без участия оператора.",
  },
];
