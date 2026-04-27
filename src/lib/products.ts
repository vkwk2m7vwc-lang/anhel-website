import type { ProductAccent } from "@/content/products/types";

/**
 * Каталог ANHEL устроен в две ступени:
 *
 *   /products                  — TOP_LEVEL (3 раздела + 4-й позже)
 *     /products/pumps          — раздел «Насосные станции» (5 продуктов)
 *       /products/pumps/<slug>
 *     /products/water-treatment — отдельная категория (без подразделов)
 *     /products/heating-unit   — раздел ИТП (8 модулей внутри)
 *
 * Плоский массив `PRODUCTS` остаётся для:
 *   - финального CTA-блока на каждой продуктовой странице
 *     (соседние карточки фильтруются по slug)
 *   - mobile menu (показывает все продукты в одном списке)
 *   - поиска по slug
 *
 * Двух-уровневые консумеры:
 *   - `TOP_LEVEL_PRODUCTS` — для каталога /products
 *   - `PUMPS_PRODUCTS`     — для каталога /products/pumps
 */

export type ProductSummary = {
  slug: string;
  /** Route path. Top-level: `/products/<slug>`. Sub: `/products/pumps/<slug>`. */
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
   * Когда `true` страница раздела/продукта ещё не опубликована.
   * Карточка рендерится как «Скоро» без ссылки.
   */
  comingSoon?: boolean;
};

/**
 * Top-level каталог `/products` — 4 раздела:
 *   pumps, water-treatment, heating-unit, control-systems.
 * Каждый раздел — точка входа в подкаталог либо в одну продуктовую
 * страницу.
 */
export const TOP_LEVEL_PRODUCTS: readonly ProductSummary[] = [
  {
    slug: "pumps",
    href: "/products/pumps",
    title: "Насосные станции",
    tagline:
      "Пять серий — водоснабжение, пожаротушение, отопление и кондиционирование, поддержание давления, специальное исполнение.",
    accent: "water",
    // Visual для верхне-уровневой карточки — тот же hero, что у
    // первой подкатегории (водоснабжение).
    image: "/assets/products/hvs-nu.png",
    imageAlt: "ANHEL — насосные станции для инженерных систем",
    accentHex: "#1E6FD9",
  },
  {
    slug: "water-treatment",
    href: "/products/water-treatment",
    title: "Водоподготовка",
    tagline: "Установки фильтрации, умягчения, обезжелезивания и обратного осмоса.",
    accent: "treatment",
    image: "/assets/products/vpu.png",
    imageAlt: "ANHEL — установка водоподготовки",
    accentHex: "#8A94A0",
  },
  {
    slug: "heating-unit",
    href: "/products/heating-unit",
    title: "Тепловые пункты",
    tagline: "Блочные индивидуальные тепловые пункты (БИТП) — отопление, ГВС, комбинированные.",
    accent: "heat",
    image: "/assets/products/bitp.png",
    imageAlt: "ANHEL — блочный индивидуальный тепловой пункт (БИТП)",
    accentHex: "#E8873B",
  },
  {
    slug: "control-systems",
    href: "/products/control-systems",
    title: "Шкафы управления",
    tagline:
      "Пять серий — частотные, для пожаротушения, дымоудаления, КНС и электрифицированной арматуры.",
    accent: "water",
    // Top-level превью — variable-frequency (составной серый 4-секционный
    // с HMI). Визуально согласован с другими 3 направлениями (все серые
    // промышленные сборки), когда все 4 карточки видны вместе.
    image: "/assets/products/control-systems/variable-frequency/hero.png",
    imageAlt: "ANHEL — шкафы управления, серия с частотным регулированием",
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
] as const;

/**
 * Подкаталог `/products/control-systems` — 5 серий шкафов управления
 * ОМЕГА (наш OEM-партнёр МФМК; в публикации — ANHEL®). Серии:
 * частотный, пожаротушение, дымоудаление, КНС, электрифицированная
 * арматура.
 */
export const CONTROL_SYSTEMS_PRODUCTS: readonly ProductSummary[] = [
  {
    slug: "variable-frequency",
    href: "/products/control-systems/variable-frequency",
    title: "С частотным регулированием",
    tagline:
      "Для повысительных насосов в системах ХВС, ГВС, отопления и кондиционирования. ПИД-регулирование, плавный пуск, каскадное управление до 6 насосов.",
    accent: "water",
    image: "/assets/products/control-systems/variable-frequency/hero.png",
    imageAlt: "ANHEL — шкаф управления с частотным регулированием",
    accentHex: "#1E6FD9",
  },
  {
    slug: "fire-suppression",
    href: "/products/control-systems/fire-suppression",
    title: "Для систем пожаротушения",
    tagline:
      "Управление пожарными насосами в дренчерных и спринклерных системах, пенном пожаротушении класса B. АВР, приоритет подачи, контроль ППКП.",
    accent: "fire",
    image: "/assets/products/control-systems/fire-suppression/hero.png",
    imageAlt: "ANHEL — шкаф управления для систем пожаротушения",
    accentHex: "#D72638",
  },
  {
    slug: "smoke-control",
    href: "/products/control-systems/smoke-control",
    title: "Для дымоудаления и подпора",
    tagline:
      "Управление противодымной вентиляцией. Пожарный сертификат ФЗ-123, IP54+, индикация «Пожар», устойчивость к высоким температурам.",
    accent: "fire",
    image: "/assets/products/control-systems/smoke-control/hero.png",
    imageAlt: "ANHEL — шкаф управления противодымной вентиляцией",
    accentHex: "#D72638",
  },
  {
    slug: "sewage-pumping",
    href: "/products/control-systems/sewage-pumping",
    title: "Для КНС",
    tagline:
      "Управление дренажными и канализационными насосами, ливневыми стоками. Поплавки и уровнемеры, ручной/автоматический режим, до 4 насосов.",
    accent: "water",
    image: "/assets/products/control-systems/sewage-pumping/hero.png",
    imageAlt: "ANHEL — шкаф управления канализационных насосных станций",
    accentHex: "#1E6FD9",
  },
  {
    slug: "electric-actuators",
    href: "/products/control-systems/electric-actuators",
    title: "Для электрифицированной арматуры",
    tagline:
      "Управление электроприводами запорных и регулирующих задвижек. До 5 задвижек, прямой пуск, ручной/автоматический режим.",
    accent: "treatment",
    image: "/assets/products/control-systems/electric-actuators/hero.png",
    imageAlt: "ANHEL — шкаф управления электрифицированной арматурой",
    accentHex: "#8A94A0",
  },
] as const;

/**
 * Полный плоский массив всех 12 продуктов — для совместимости с
 * консумерами, которые работают по slug без знания иерархии:
 *   - `ProductCtaFooter` (соседние продукты на странице товара)
 *   - `MobileMenu` (плоский список всех продуктов)
 *   - старые потребители по slug
 *
 * Order: насосные → водоподготовка → ИТП → шкафы. Маркетинговый порядок.
 */
export const PRODUCTS: readonly ProductSummary[] = [
  ...PUMPS_PRODUCTS,
  ...TOP_LEVEL_PRODUCTS.filter((p) => p.slug !== "pumps" && p.slug !== "control-systems"),
  ...CONTROL_SYSTEMS_PRODUCTS,
] as const;
