import type { ProductAccent } from "@/content/products/types";

/**
 * Global summary of all four ANHEL product pages. Used by:
 *   - the final CTA block (section 12) to render "остальные продукты"
 *     by filtering out the current slug
 *   - later: the products catalogue page (/products)
 *   - the global navigation mega-menu when it ships
 *
 * Keep the list in canonical marketing order — водоснабжение,
 * пожаротушение, водоподготовка, теплопункты. When a new product is
 * added, add it here and the neighbour strip on every existing
 * product page picks it up with no changes.
 */

export type ProductSummary = {
  slug: string;
  /** Route path, e.g. "/products/pumps/firefighting". */
  href: string;
  /** Short card title. */
  title: string;
  /** 1-line tagline shown under the title. */
  tagline: string;
  /** Accent key — drives the neighbour card's hover highlight. */
  accent: ProductAccent;
  /**
   * When `true` the product's detail page isn't published yet.
   * Consumers (neighbour strip, future catalogue grid) render the card
   * as a disabled "Скоро" tile with no anchor, so clicks don't 404.
   * Once the detail page lands, flip the flag to `false` (or remove
   * it) and the card becomes a live link with no other changes.
   */
  comingSoon?: boolean;
};

export const PRODUCTS: readonly ProductSummary[] = [
  {
    slug: "water-supply",
    href: "/products/pumps/water-supply",
    title: "Водоснабжение",
    tagline: "Насосные станции ХВС, ГВС и повышения давления для жилых и коммерческих объектов.",
    accent: "water",
  },
  {
    slug: "firefighting",
    href: "/products/pumps/firefighting",
    title: "Пожаротушение",
    tagline: "АПТ, ВПВ и совмещённые системы.",
    accent: "fire",
  },
  {
    slug: "water-treatment",
    href: "/products/pumps/water-treatment",
    title: "Водоподготовка",
    tagline: "Установки фильтрации и подготовки воды.",
    accent: "treatment",
    comingSoon: true,
  },
  {
    slug: "heating-unit",
    href: "/products/pumps/heating-unit",
    title: "Тепловые пункты",
    tagline: "Блочные индивидуальные тепловые пункты (БИТП) — отопление, ГВС, комбинированные.",
    accent: "heat",
  },
] as const;
