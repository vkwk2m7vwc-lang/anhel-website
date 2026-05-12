import type { ProductAccent } from "@/content/products/types";

/**
 * Каталог ANHEL устроен в две ступени:
 *
 *   /products                  — TOP_LEVEL (4 раздела)
 *     /products/pumps          — раздел «Насосные станции» (5 продуктов)
 *       /products/pumps/<slug>
 *     /products/water-treatment — отдельная категория (без подразделов)
 *     /products/heating-unit   — раздел ИТП (8 модулей внутри)
 *     /products/control-systems — 5 серий шкафов
 *
 * `PRODUCTS` остаётся плоским списком для:
 *   - финального CTA-блока на каждой продуктовой странице
 *   - mobile menu (все продукты в одном списке)
 *   - поиска по slug
 *
 * i18n: title/tagline/imageAlt живут в `messages/<locale>/products.items.<slug>`.
 * Здесь — только структурные данные (slug, href, image-путь, accent).
 * Консумеры (ProductsShowcase, ProductCard, MobileMenu) резолвят
 * локализованные строки через t() по slug при рендере.
 */

export type ProductSummary = {
  /** Stable key — also lookup key for `products.items.<slug>`. */
  slug: string;
  /** Route path. Top-level: `/products/<slug>`. Sub: `/products/pumps/<slug>`. */
  href: string;
  /** Accent key — drives the neighbour card's hover highlight. */
  accent: ProductAccent;
  /** Card render under /public — same image used by hero & showcase. */
  image: string;
  /** Accent hex — drives the radial glow behind the product render. */
  accentHex: string;
  /**
   * Когда `true` страница раздела/продукта ещё не опубликована.
   * Карточка рендерится как «Скоро» без ссылки.
   */
  comingSoon?: boolean;
};

/**
 * Top-level каталог `/products` — 4 раздела:
 *   pumps, water-treatment, heating-unit, control-systems.
 */
export const TOP_LEVEL_PRODUCTS: readonly ProductSummary[] = [
  {
    slug: "pumps",
    href: "/products/pumps",
    accent: "water",
    image: "/assets/products/hvs-nu.png",
    accentHex: "#1E6FD9",
  },
  {
    slug: "water-treatment",
    href: "/products/water-treatment",
    accent: "treatment",
    image: "/assets/products/vpu.png",
    accentHex: "#8A94A0",
  },
  {
    slug: "heating-unit",
    href: "/products/heating-unit",
    accent: "heat",
    image: "/assets/products/bitp.png",
    accentHex: "#E8873B",
  },
  {
    slug: "control-systems",
    href: "/products/control-systems",
    accent: "water",
    image: "/assets/products/control-systems/variable-frequency/hero.png",
    accentHex: "#1E6FD9",
  },
] as const;

/**
 * Подкаталог `/products/pumps` — 5 серий насосных станций.
 */
export const PUMPS_PRODUCTS: readonly ProductSummary[] = [
  {
    slug: "water-supply",
    href: "/products/pumps/water-supply",
    accent: "water",
    image: "/assets/products/hvs-nu.png",
    accentHex: "#1E6FD9",
  },
  {
    slug: "firefighting",
    href: "/products/pumps/firefighting",
    accent: "fire",
    image: "/assets/products/hvs-nu-red2.png",
    accentHex: "#D72638",
  },
  {
    slug: "heating-cooling",
    href: "/products/pumps/heating-cooling",
    accent: "treatment",
    image: "/assets/products/heating-cooling.png",
    accentHex: "#8A94A0",
  },
  {
    slug: "pressure-boost",
    href: "/products/pumps/pressure-boost",
    accent: "treatment",
    image: "/assets/products/pressure-boost.png",
    accentHex: "#8A94A0",
  },
  {
    slug: "special",
    href: "/products/pumps/special",
    accent: "treatment",
    image: "/assets/products/special.png",
    accentHex: "#8A94A0",
  },
] as const;

/**
 * Подкаталог `/products/control-systems` — 5 серий шкафов управления.
 * Порядок отображения 2×3:
 *   row 1: variable-frequency | electric-actuators
 *   row 2: fire-suppression (красный)  | smoke-control (красный)
 *   row 3: sewage-pumping     | _
 */
export const CONTROL_SYSTEMS_PRODUCTS: readonly ProductSummary[] = [
  {
    slug: "variable-frequency",
    href: "/products/control-systems/variable-frequency",
    accent: "water",
    image: "/assets/products/control-systems/variable-frequency/hero.png",
    accentHex: "#1E6FD9",
  },
  {
    slug: "electric-actuators",
    href: "/products/control-systems/electric-actuators",
    accent: "treatment",
    image: "/assets/products/control-systems/electric-actuators/hero.png",
    accentHex: "#8A94A0",
  },
  {
    slug: "fire-suppression",
    href: "/products/control-systems/fire-suppression",
    accent: "fire",
    image: "/assets/products/control-systems/fire-suppression/hero.png",
    accentHex: "#D72638",
  },
  {
    slug: "smoke-control",
    href: "/products/control-systems/smoke-control",
    accent: "fire",
    image: "/assets/products/control-systems/smoke-control/hero.png",
    accentHex: "#D72638",
  },
  {
    slug: "sewage-pumping",
    href: "/products/control-systems/sewage-pumping",
    accent: "water",
    image: "/assets/products/control-systems/sewage-pumping/hero.png",
    accentHex: "#1E6FD9",
  },
] as const;

/**
 * Полный плоский массив всех продуктов — для консумеров, которые
 * работают по slug без знания иерархии:
 *   - `ProductCtaFooter` (соседние продукты на странице товара)
 *   - `MobileMenu` (плоский список всех продуктов)
 *   - старые потребители по slug
 *
 * Order: насосные → водоподготовка → ИТП → шкафы.
 */
export const PRODUCTS: readonly ProductSummary[] = [
  ...PUMPS_PRODUCTS,
  ...TOP_LEVEL_PRODUCTS.filter(
    (p) => p.slug !== "pumps" && p.slug !== "control-systems",
  ),
  ...CONTROL_SYSTEMS_PRODUCTS,
] as const;

/**
 * Resolve top-level category для произвольного slug.
 */
export function getTopLevelCategory(slug: string): string {
  if (PUMPS_PRODUCTS.some((p) => p.slug === slug)) return "pumps";
  if (CONTROL_SYSTEMS_PRODUCTS.some((p) => p.slug === slug)) return "control-systems";
  return slug;
}
