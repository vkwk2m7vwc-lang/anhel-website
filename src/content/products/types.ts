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
 * One tab in the «Типы установок» section (section 4).
 *
 * The firefighting page ships four variants (sprinkler / drencher /
 * ВПВ / combined); each one feeds the same `InstallationScene` SVG and
 * rewires which sprinklers are active, whether ВПВ cabinets appear,
 * where the signal originates. The `kind` field is the discriminator
 * the scene switches on — keep it as a string literal so adding a new
 * variant (for a different product line) surfaces a compile error in
 * every `switch` that forgot to handle it.
 */
export type InstallationTypeKind =
  | "sprinkler"
  | "drencher"
  | "vpv"
  | "combined";

export type InstallationType = {
  /** Discriminator read by `InstallationScene` to pick which logic runs. */
  kind: InstallationTypeKind;
  /** "01" … "04" — shown next to the title in the tab rail. */
  mono: string;
  /** Short tab name — one word if possible. Body carries the detail. */
  title: string;
  /** One-sentence tagline shown in the active tab's detail block. */
  tagline: string;
  /** 1-2 sentences explaining how the system behaves and where it's used. */
  body: string;
  /** 3-4 typical object types — rendered as a comma-separated mono line. */
  objects: readonly string[];
};

/**
 * Top-level product-page content. As we build commits 3-6 we extend this
 * with more fields (applications, brands, cases, etc.). Commit 1 only
 * populates `hero` and `techSpecs`.
 *
 * `installationTypes` lands in commit 3 (sections 4.1 + 4.2). Other
 * product pages may or may not have this section — keep it optional so
 * water-supply / heating-unit don't need a stub file before they're
 * designed.
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
  /** Section 4 «Типы установок» — omit if the product doesn't have variants. */
  installationTypes?: readonly InstallationType[];
};
