import type { ProductAccent } from "@/content/products/types";

/**
 * Global summary of all ANHEL product pages. Used by:
 *   - the final CTA block (section 12) to render "остальные продукты"
 *     by filtering out the current slug
 *   - the products catalogue page (/products)
 *   - mobile menu navigation
 *   - the product showcase grid on home + catalog pages
 *
 * Each entry carries the visual fields (image, imageAlt, accentHex) so
 * that consumers like `ProductsShowcase` don't need a second source —
 * everything required to render a card is here. `HERO_PRODUCTS` in
 * `lib/hero-products.ts` stays separate for the main-hero carousel
 * (which intentionally features only the original four direction).
 *
 * Order: marketing-canonical pump-station block first (5), then
 * non-pump products (water-treatment, heating-unit). When a new
 * product is added, list it here and neighbour-strips, mobile menu and
 * catalog grid pick it up automatically.
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
  /** Card render under /public — same image used by hero & showcase. */
  image: string;
  /** Alt text for the card image. */
  imageAlt: string;
  /** Accent hex — drives the radial glow behind the product render. */
  accentHex: string;
  /**
   * When `true` the product's detail page isn't published yet.
   * Consumers (neighbour strip, future catalogue grid) render the card
   * as a disabled "Скоро" tile with no anchor, so clicks don't 404.
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
    image: "/assets/products/hvs-nu.png",
    imageAlt: "ANHEL — насосная станция холодного водоснабжения",
    accentHex: "#1E6FD9",
  },
  {
    slug: "firefighting",
    href: "/products/pumps/firefighting",
    title: "Пожаротушение",
    tagline: "АПТ, ВПВ и совмещённые системы.",
    accent: "fire",
    image: "/assets/products/hvs-nu-red2.png",
    imageAlt: "ANHEL — насосная станция пожаротушения",
    accentHex: "#D72638",
  },
  {
    slug: "heating-cooling",
    href: "/products/pumps/heating-cooling",
    title: "Отопление и кондиционирование",
    tagline: "Циркуляция теплоносителя и хладоносителя в инженерных контурах зданий.",
    accent: "treatment",
    image: "/assets/products/heating-cooling.png",
    imageAlt: "ANHEL — насосная станция для систем отопления и кондиционирования",
    accentHex: "#8A94A0",
  },
  {
    slug: "pressure-boost",
    href: "/products/pumps/pressure-boost",
    title: "Поддержание давления",
    tagline: "Автоматические установки поддержания давления (АУПД) для закрытых сетей теплоснабжения.",
    accent: "treatment",
    image: "/assets/products/pressure-boost.png",
    imageAlt: "ANHEL — установка поддержания давления (АУПД)",
    accentHex: "#8A94A0",
  },
  {
    slug: "special",
    href: "/products/pumps/special",
    title: "Специальное исполнение",
    tagline: "Контейнерные сборки и стеклопластиковые ёмкости — без капитального строительства.",
    accent: "treatment",
    image: "/assets/products/special.png",
    imageAlt: "ANHEL — насосная станция специального исполнения",
    accentHex: "#8A94A0",
  },
  {
    slug: "water-treatment",
    href: "/products/pumps/water-treatment",
    title: "Водоподготовка",
    tagline: "Установки фильтрации, умягчения, обезжелезивания и обратного осмоса.",
    accent: "treatment",
    image: "/assets/products/vpu.png",
    imageAlt: "ANHEL — установка водоподготовки",
    accentHex: "#8A94A0",
  },
  {
    slug: "heating-unit",
    href: "/products/pumps/heating-unit",
    title: "Тепловые пункты",
    tagline: "Блочные индивидуальные тепловые пункты (БИТП) — отопление, ГВС, комбинированные.",
    accent: "heat",
    image: "/assets/products/bitp.png",
    imageAlt: "ANHEL — блочный индивидуальный тепловой пункт (БИТП)",
    accentHex: "#E8873B",
  },
] as const;
