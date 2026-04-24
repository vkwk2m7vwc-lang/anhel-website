import type { ReactNode } from "react";
import type { ProductAccent } from "@/content/products/types";

/**
 * Map accent key to the CSS variable declared in `globals.css`. Single
 * source of truth for which var each product reads — the same mapping
 * lives in ProductHero for local effects (glow / drop-shadow maths).
 * If the roster of accents changes, both places need a touch.
 */
const ACCENT_VAR: Record<ProductAccent, string> = {
  fire: "var(--accent-fire)",
  water: "var(--accent-water)",
  treatment: "var(--accent-treatment)",
  heat: "var(--accent-heat)",
};

/**
 * Product-page shell.
 *
 * Sole responsibility: declare `--accent-current` at the page root so
 * every section below — hero, tech specs, applications, brands,
 * advantages, etc. — reads the same accent colour without each one
 * hardcoding the key. Previously `ProductHero` set the variable on its
 * own `<section>` and everything below inherited nothing, so hovers on
 * ApplicationsGrid / AdvantagesGrid picked up the default water-blue
 * from globals.css instead of the page's own accent.
 *
 * Anything else that has to be accent-aware on a product page now
 * lives INSIDE this shell. The shell itself stays a server component
 * (no state, no effects) so it doesn't force hydration on the whole
 * route.
 */
export function ProductPageShell({
  accent,
  children,
}: {
  accent: ProductAccent;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        // CSS custom properties inherit down the tree — setting it once
        // here covers every nested section.
        ["--accent-current" as string]: ACCENT_VAR[accent],
      }}
    >
      {children}
    </div>
  );
}
