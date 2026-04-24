/**
 * Shared content types for every product page.
 *
 * Philosophy: components in `src/components/product-page/` are dumb
 * primitives that render whatever this data says. Per-product content
 * lives in `src/content/products/<slug>.ts`. This keeps copy, specs and
 * links out of JSX, so editing the firefighting station's torque rating
 * doesn't touch a React component.
 *
 * When we add the next products (water-supply, heating-unit, etc.) the
 * only new files are a second content-file and, if the narrative needs
 * it, unique per-product components under `src/components/products/<slug>/`.
 */

/**
 * Accent keys map onto CSS variables declared in `globals.css`.
 * Keeping this as a union (not a free string) so typos surface at compile
 * time when we add the next product.
 */
export type ProductAccent = "fire" | "water" | "treatment" | "heat";

/**
 * One step in the breadcrumb trail.
 * If `href` is omitted the item renders as the current page (no link,
 * dimmed colour).
 */
export type BreadcrumbLink = {
  label: string;
  href?: string;
};

/**
 * Hero CTA descriptor — deliberately minimal so commit 1 can render the
 * buttons with in-page anchor behaviour, and commit 5/6 can extend with
 * richer handlers (`open-quiz`, `download-pdf`) without reshaping content.
 *
 * The `href` pattern is the path of least surprise: `#quiz` jumps to the
 * form section once it exists; until then Lenis just no-ops smoothly.
 */
export type ProductCTA = {
  label: string;
  href: string;
  variant: "primary" | "ghost";
  /** Optional hint shown in mono-uppercase beside the label. */
  hint?: string;
};

/**
 * One tile in the 8-tile tech-specs grid.
 * `value` is the primary, typographically-dominant bit; `unit` sits next
 * to it in smaller mono text. Splitting them lets the tile handle edge
 * cases like "от 2 до 6" (no unit) vs "70 °С" (value + unit).
 */
export type TechSpecTile = {
  /** Plain label: «Количество насосов» */
  label: string;
  /** Primary value: «от 2 до 6», «70», «3 × 380». */
  value: string;
  /** Optional suffix: «°С», «кВт», «об/мин». */
  unit?: string;
};

/**
 * Everything the product Hero needs. Renders inside a section-level
 * wrapper that takes care of accent glow, grid background and Lenis
 * smooth-scroll anchoring.
 */
export type ProductHeroContent = {
  breadcrumbs: BreadcrumbLink[];
  /** e.g. «01 · НАСОСНЫЕ СТАНЦИИ · ПОЖАРОТУШЕНИЕ» — shown in mono caps. */
  sectionTag: string;
  title: string;
  /** Single-sentence lede. Keep to ~140 chars for typographic balance. */
  subtitle: string;
  /** Right-column product render. PNG must be transparent-background. */
  image: {
    src: string;
    alt: string;
  };
  primaryCta: ProductCTA;
  secondaryCta?: ProductCTA;
};

/**
 * One card in the Applications grid (section 5 «Применение»).
 *
 * Six items arranged 3×2 desktop, 2×3 tablet, 1×6 mobile. Each card
 * reads as a mono index, a short object-type title, and a single-line
 * example (usually a real reference object, e.g. «ЖК Дмитровский парк,
 * Москва»). Examples are deliberately short — if it doesn't fit in one
 * line at the designed size, cut it rather than wrap.
 */
export type ApplicationItem = {
  /** Stable id — used as React key and for ARIA. */
  id: string;
  /** Mono prefix: «01»..«06». */
  mono: string;
  /** Object type, e.g. «Жилые комплексы». */
  title: string;
  /** Single-line reference, e.g. «ЖК Дмитровский парк, Москва». */
  example: string;
};

/**
 * Applications section config. The copy sits in the content file so
 * different products can tweak their own tag/title/lede without forking
 * the component.
 */
export type ApplicationsContent = {
  /** Mono tag in header, e.g. «05 · ПРИМЕНЕНИЕ». */
  tag: string;
  /** Section h2, e.g. «Где ставится». */
  title: string;
  /** Optional single-line intro on the right of the header. */
  lede?: string;
  /** Six items, in display order. */
  items: ApplicationItem[];
};

/**
 * One brand word-mark shown in the brands strip (section 6).
 *
 * No SVG logos yet — we render the brand name in our display font,
 * lightly letterspaced, in the hairline/steel palette so the row
 * reads as a proof line rather than a marketing collage. When real
 * logos arrive we swap `name` for an `svg` field and update the
 * component (chore commit).
 */
export type BrandItem = {
  /** Stable id — used as React key. */
  id: string;
  /** Display name, e.g. «AquaDeus», «CNP», «DEKraft». */
  name: string;
  /** Optional short descriptor shown on hover / below, e.g. «RCP, RHP». */
  series?: string;
};

/**
 * Brands section — two rows in source order:
 *   rowPumps       насосные бренды (крупнее, ключевые)
 *   rowComponents  комплектующие (мельче, проходной ряд)
 * The component renders both in two visually distinct tiers.
 */
export type BrandsContent = {
  /** Mono tag, e.g. «06 · БРЕНДЫ». */
  tag: string;
  /** Section h2, e.g. «Собираем из оборудования мировых производителей». */
  title: string;
  /** One-line hint, right-aligned on desktop. */
  lede?: string;
  /** Row 1 — brands of pumps themselves. */
  rowPumps: BrandItem[];
  /** Row 2 — brands of electrical + automation components. */
  rowComponents: BrandItem[];
};

/**
 * One card in the Advantages grid (section 7 «Преимущества»).
 *
 * Layout: a big mono index + a single-line title + a short body line
 * that expands the title. Nine items is the МФМК reference count —
 * we preserve it in full so the engineering audience reads the whole
 * spec sheet at a glance.
 */
export type AdvantageItem = {
  /** Stable id. */
  id: string;
  /** Mono prefix: «01»..«09». */
  mono: string;
  /** Short one-line title, e.g. «Серийное производство». */
  title: string;
  /** 1-2 sentences expanding the title. */
  body: string;
};

/**
 * Advantages section config.
 */
export type AdvantagesContent = {
  tag: string;
  title: string;
  lede?: string;
  items: AdvantageItem[];
};

/**
 * Top-level product-page content. As we build commits 3-6 we extend this
 * with more fields (cases, quiz, etc.). Commit 1 only populated
 * `hero` and `techSpecs`; the firefighting commit sequence for sections
 * 5-12 adds the remaining fields one commit at a time.
 */
export type ProductContent = {
  /** URL slug — the last segment of the route. */
  slug: string;
  /** Drives CSS `--accent-current` within the product page. */
  accent: ProductAccent;
  metaTitle: string;
  metaDescription: string;
  hero: ProductHeroContent;
  techSpecs: TechSpecTile[];
  /** Section 5 — «Применение». */
  applications: ApplicationsContent;
  /** Section 6 — «Бренды». */
  brands: BrandsContent;
  /** Section 7 — «Преимущества» (9 tiles per МФМК reference). */
  advantages: AdvantagesContent;
};
