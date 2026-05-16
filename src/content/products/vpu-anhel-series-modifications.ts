/**
 * VPU ANHEL Series — машиночитаемая конфигурация 4 модификаций.
 *
 * Используется тремя консумерами:
 *   1) Таблица модельного ряда на странице (VpuModificationsTable)
 *   2) Быстрый подбор (QuickQuoteSection) — функция `selectVpuModification`
 *   3) Генератор PDF КП (lib/pdf/generate-kp.ts) — берёт чертёж/схему по slug
 *
 * Источник данных:
 *   - Расходы: «Градация ВПУ.xlsx» (заказчик, май 2026)
 *   - Габариты: тот же файл (В × Ш × Г, мм)
 *   - Кол-во линий = кол-во дисковых фильтров = кол-во мешочных
 *     фильтров 25 мкм = кол-во м/о 5 мкм = кол-во УФ-ламп
 *   - Чертежи / схемы: исходные PDF от заказчика → конвертация в PNG
 *     (150 DPI, fitz) → `public/kp/{drawings,schemes}/<id>.png`
 *
 * Электропотребление / масса — данные есть только для Тип 2.
 * На странице не публикуем, в PDF КП для Тип 2 указываем фактические,
 * для Тип 3/4/5 — «уточняется при подборе».
 */

export type VpuModificationId = "2-lines" | "3-lines" | "4-lines" | "5-lines";

export type VpuModification = {
  id: VpuModificationId;
  /** Кол-во параллельных линий фильтрации = N компонентов каждого типа. */
  linesCount: 2 | 3 | 4 | 5;
  /** Имена для трёх локалей. */
  nameRu: string;
  nameEn: string;
  nameTr: string;
  /** Кратчайший «Тип N» для PDF-генератора. */
  typeLabel: string;
  /**
   * Гарантированный диапазон расхода, м³/ч. Включает верхнюю границу,
   * НЕ включает нижнюю (см. `selectVpuModification`).
   */
  minFlow: number;
  maxFlow: number;
  /** Уже-форматированная подпись расхода для UI / PDF в 3 локалях. */
  flowLabel: { ru: string; en: string; tr: string };
  /** Габариты В × Ш × Г, мм. Уже отформатированная строка. */
  dimensions: string;
  /**
   * Только для Тип 2 — у нас есть фактические цифры из паспортов.
   * Для Тип 3/4/5 поле пустое — в PDF подставляем «уточняется при подборе».
   */
  powerNote?: string;
  weightNote?: string;
  /** Путь к чертежу под `/public/kp/drawings/`. */
  drawingPath: string;
  /** Путь к схеме под `/public/kp/schemes/`. */
  schemePath: string;
};

/**
 * 4 модификации в порядке возрастания расхода.
 */
export const VPU_ANHEL_MODIFICATIONS: readonly VpuModification[] = [
  {
    id: "2-lines",
    linesCount: 2,
    nameRu: "ВПУ ANHEL (2 линии)",
    nameEn: "ANHEL VPU (2 lines)",
    nameTr: "ANHEL VPU (2 hat)",
    typeLabel: "Тип 2",
    minFlow: 0,
    maxFlow: 21.9,
    flowLabel: {
      ru: "до 21,9 м³/ч",
      en: "up to 21.9 m³/h",
      tr: "21,9 m³/saate kadar",
    },
    dimensions: "1856 × 1136 × 2080",
    powerNote: "не более 1,5 кВт (220 В, 50 Гц)",
    weightNote: "не более 250 кг",
    drawingPath: "/kp/drawings/2-lines.png",
    schemePath: "/kp/schemes/2-lines.png",
  },
  {
    id: "3-lines",
    linesCount: 3,
    nameRu: "ВПУ ANHEL (3 линии)",
    nameEn: "ANHEL VPU (3 lines)",
    nameTr: "ANHEL VPU (3 hat)",
    typeLabel: "Тип 3",
    minFlow: 21.9,
    maxFlow: 35.9,
    flowLabel: {
      ru: "от 22,0 до 35,9 м³/ч",
      en: "22.0 to 35.9 m³/h",
      tr: "22,0 ile 35,9 m³/saat arası",
    },
    dimensions: "1900 × 1956 × 3139",
    drawingPath: "/kp/drawings/3-lines.png",
    schemePath: "/kp/schemes/3-lines.png",
  },
  {
    id: "4-lines",
    linesCount: 4,
    nameRu: "ВПУ ANHEL (4 линии)",
    nameEn: "ANHEL VPU (4 lines)",
    nameTr: "ANHEL VPU (4 hat)",
    typeLabel: "Тип 4",
    minFlow: 35.9,
    maxFlow: 45.9,
    flowLabel: {
      ru: "от 36,0 до 45,9 м³/ч",
      en: "36.0 to 45.9 m³/h",
      tr: "36,0 ile 45,9 m³/saat arası",
    },
    dimensions: "~ 1856 × 1800 × 3075",
    drawingPath: "/kp/drawings/4-lines.png",
    schemePath: "/kp/schemes/4-lines.png",
  },
  {
    id: "5-lines",
    linesCount: 5,
    nameRu: "ВПУ ANHEL (5 линий)",
    nameEn: "ANHEL VPU (5 lines)",
    nameTr: "ANHEL VPU (5 hat)",
    typeLabel: "Тип 5",
    minFlow: 45.9,
    maxFlow: 55.9,
    flowLabel: {
      ru: "от 46,0 до 55,9 м³/ч",
      en: "46.0 to 55.9 m³/h",
      tr: "46,0 ile 55,9 m³/saat arası",
    },
    dimensions: "1856 × 1800 × 5565",
    drawingPath: "/kp/drawings/5-lines.png",
    schemePath: "/kp/schemes/5-lines.png",
  },
] as const;

/**
 * Максимальный поддерживаемый расход «типового» исполнения серии.
 * При запросе расхода > этого числа быстрый подбор показывает
 * «Свяжитесь с нами для нестандартной модификации».
 */
export const VPU_ANHEL_MAX_TYPICAL_FLOW = 55.9;
