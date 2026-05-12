/**
 * Projects (portfolio) content types.
 *
 * The portfolio page lists реализованные объекты сгруппированно — карточки
 * грид-сеткой, каждая кликабельна и ведёт на детальную страницу с галереей
 * и описанием поставленного оборудования.
 *
 * `category` — главная ось фильтра в UI:
 *   pumps           — насосные станции (любой подтип)
 *   water-treatment — водоподготовка
 *   mixed           — обе категории на объекте
 *
 * i18n: titles + cover-alt + equipment строки живут в
 * `messages/<locale>/projects.json`. Здесь — только структурные
 * данные: slug (как ключ), категория, путь к cover, опц. год/город.
 */
export type ProjectCategory = "pumps" | "water-treatment" | "mixed";

/**
 * Стабильные ключи строк оборудования. Каждый ключ резолвится через
 * t(`projects.equipment_lines.<key>`) при рендере. Дедуплицирует
 * повторяющиеся строки — у большинства объектов одинаковая поставка.
 */
export type EquipmentKey =
  | "pumps_pressure_fire_anhel"
  | "pumps_pressure_fire"
  | "water_treatment_anhel"
  | "pumps_pressure_anhel";

export type ProjectItem = {
  /** URL slug — последний сегмент роутa /projects/<slug>. Стабильный. */
  slug: string;
  /** Категория для фильтра в UI. */
  category: ProjectCategory;
  /** Ключи строк оборудования (резолвятся через t() при рендере). */
  equipment: EquipmentKey[];
  /** Hero-фото — путь под /public, e.g. «/assets/projects/zhk-grand-view/cover.jpg». */
  cover: string;
  /** Опционально: год реализации, если известен. */
  year?: number;
  /** Опционально: город / адрес, если известен. */
  location?: string;
};
