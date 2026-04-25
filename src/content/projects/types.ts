/**
 * Projects (portfolio) content types.
 *
 * The portfolio page lists реализованные объекты сгруппированно — карточки
 * грид-сеткой, каждая кликабельна и ведёт на детальную страницу с галереей
 * и описанием поставленного оборудования.
 *
 * Data source: список взят с сайта головной компании (profitspb.com/projects),
 * сверен с внутренним реестром «Список проектов.xlsx» в папке Документы.
 *
 * `category` — главная ось фильтра в UI:
 *   pumps           — насосные станции (любой подтип)
 *   water-treatment — водоподготовка
 *   mixed           — обе категории на объекте
 */
export type ProjectCategory = "pumps" | "water-treatment" | "mixed";

export type ProjectItem = {
  /** URL slug — последний сегмент роутa /projects/<slug>. Стабильный, не меняется. */
  slug: string;
  /** Полное название объекта (как на источнике), е.g. «ЖК «Гранд Вью»». */
  title: string;
  /** Заказчик / девелопер — короткой строкой, как на карточке. */
  customer: string;
  /** Категория для фильтра в UI. */
  category: ProjectCategory;
  /** Поставленное оборудование (как в реестре). Каждая строка = один пункт. */
  equipment: string[];
  /** Hero-фото — путь под /public, e.g. «/assets/projects/zhk-grand-view/cover.jpg». */
  cover: string;
  /** Альт-текст для cover (a11y). */
  coverAlt: string;
  /** Опционально: год реализации, если известен. */
  year?: number;
  /** Опционально: город / адрес, если известен. */
  location?: string;
  /** Опциональный лонг-text для детальной страницы. */
  description?: string;
};
