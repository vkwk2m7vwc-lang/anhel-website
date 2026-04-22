/**
 * Source of truth for the four hero products shown in the carousel
 * variants (D: manual, E: auto-advance). Order here is the order of the
 * carousel — don't shuffle without the design team's ok.
 *
 * `accent` is the brand colour that drives the radial gradient behind the
 * product and the drop-shadow under it. We keep the accent as a plain hex
 * string (not a CSS var) because it feeds `rgba()` math at runtime for
 * glow intensity.
 */
export type HeroProduct = {
  /** Stable key — used for AnimatePresence keys and aria-labels. */
  slug: "pump-water" | "pump-fire" | "water-treatment" | "heating-unit";
  /** Short title shown under the carousel numbers. */
  name: string;
  /** Path under /public — must be an existing 4K render. */
  image: string;
  /** Accent hex that drives the gradient + drop-shadow. */
  accent: string;
  /** Alt text for the <img> in the product zone. */
  alt: string;
};

export const HERO_PRODUCTS: readonly HeroProduct[] = [
  {
    slug: "pump-water",
    name: "Насосная станция водоснабжения",
    image: "/assets/products/hvs-nu.png",
    accent: "#1E6FD9",
    alt: "ANHEL — насосная станция холодного водоснабжения, модель HVS-NU",
  },
  {
    slug: "pump-fire",
    name: "Насосная станция пожаротушения",
    image: "/assets/products/hvs-nu-red2.png",
    accent: "#D72638",
    alt: "ANHEL — насосная станция пожаротушения, красный шкаф HVS-NU",
  },
  {
    slug: "water-treatment",
    name: "Установка водоподготовки",
    image: "/assets/products/vpu.png",
    accent: "#8A94A0",
    alt: "ANHEL — установка водоподготовки VPU со стальными фильтрами",
  },
  {
    slug: "heating-unit",
    name: "Блочный тепловой пункт",
    image: "/assets/products/bitp.png",
    accent: "#E8873B",
    alt: "ANHEL — блочный индивидуальный тепловой пункт (БИТП)",
  },
] as const;
