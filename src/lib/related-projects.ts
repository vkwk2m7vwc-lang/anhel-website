import { PROJECTS as PROJECT_LIST } from "@/content/projects/data";
import type { ProjectItem } from "@/content/projects/types";

/**
 * Категория продукта в каталоге → какие категории объектов из
 * `/projects` показывать в блоке «Объекты-референс».
 *
 * - Любой из 5 насосных продуктов (и весь раздел `/products/pumps`) →
 *   объекты с насосами или комбинированные.
 * - Водоподготовка → объекты водоподготовки или комбинированные
 *   (mixed обычно содержит и насосы, и водоподготовку).
 *
 * ИТП пока не отмечены в данных как отдельная категория объектов —
 * в текущем datasete их нет. При появлении ИТП-объектов добавить
 * категорию `heating-unit` в ProjectCategory + расширить маппинг.
 */
const PRODUCT_TO_PROJECT_CATEGORIES: Record<string, ProjectItem["category"][]> =
  {
    // Pump products (5 серий) и раздел /products/pumps.
    pumps: ["pumps", "mixed"],
    "water-supply": ["pumps", "mixed"],
    firefighting: ["pumps", "mixed"],
    "heating-cooling": ["pumps", "mixed"],
    "pressure-boost": ["pumps", "mixed"],
    special: ["pumps", "mixed"],

    // Water treatment.
    "water-treatment": ["water-treatment", "mixed"],
  };

/**
 * Получить до `limit` объектов из портфолио, релевантных продукту по
 * slug-у. Если для slug нет mapping — возвращается пустой массив.
 *
 * Стабильность: фильтрация сохраняет порядок из `data.ts`, так что
 * обновления портфолио предсказуемо влияют на product pages.
 */
export function getRelatedProjects(
  productSlug: string,
  limit = 3,
): ProjectItem[] {
  const allowed = PRODUCT_TO_PROJECT_CATEGORIES[productSlug];
  if (!allowed || allowed.length === 0) return [];
  return PROJECT_LIST.filter((p) => allowed.includes(p.category)).slice(
    0,
    limit,
  );
}

/**
 * Слаг для query-фильтра на /projects при клике «Смотреть все объекты»
 * со страницы продукта. Возвращает значение, совпадающее с тем, что
 * /projects понимает в `?category=...`.
 */
export function getRelatedProjectsCategoryFilter(
  productSlug: string,
): "pumps" | "water-treatment" | "mixed" | "all" {
  const allowed = PRODUCT_TO_PROJECT_CATEGORIES[productSlug];
  if (!allowed || allowed.length === 0) return "all";
  // Если разрешены и pumps и mixed — фильтруем по pumps (mixed как
  // под-категория останется виден через UI). Аналогично с
  // water-treatment.
  if (allowed.includes("pumps")) return "pumps";
  if (allowed.includes("water-treatment")) return "water-treatment";
  return "all";
}
