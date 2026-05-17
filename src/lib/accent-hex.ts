"use client";

/**
 * Theme-aware accent hex resolver.
 *
 * Why this exists
 * ---------------
 * `globals.css` declares `--accent-water`, `--accent-fire`,
 * `--accent-treatment`, `--accent-heat` with **different** values для
 * `:root` (light) и `.dark`:
 *
 *   :root  treatment #5c6670   heat #c7711e
 *   .dark  treatment #8a94a0   heat #e8873b
 *
 * Большая часть UI ссылается на эти переменные через CSS (`border`,
 * `color`, `background`), и автоматически переключается с темой.
 *
 * Но **glow/drop-shadow математика** на главной странице (HeroBgCarousel,
 * HeroProductMobile, ProductsShowcase) и на каждой продуктовой странице
 * (ProductHero) считает `rgba(R, G, B, alpha)` в JS из чистого hex —
 * CSS var тут не подходит, нужны три числа R/G/B.
 *
 * Раньше hex-значения были захардкожены в data-файлах (`hero-products.ts`,
 * `products.ts`) и в компоненте `ProductHero.ACCENT_HEX`. Все они
 * совпадали с **dark**-вариантом палитры. Это значило, что в light-теме
 * glow вокруг продукта имел оттенок темной палитры — рассинхрон с
 * рамками/иконками того же продукта через CSS-vars.
 *
 * Night-audit followup (v1.20.8 — #C1).
 *
 * Использование
 * -------------
 * Любой client-component, который раньше тянул `product.accentHex` или
 * локальный hex-словарь, теперь делает:
 *
 *   const accentHex = useAccentHex(product.accent);
 *   // → "#5c6670" в light, "#8a94a0" в dark для accent="treatment"
 *
 * При SSR (first paint) и до того как next-themes резолвит preference,
 * `resolvedTheme` будет `undefined` — функция возвращает **dark**-вариант
 * (исторический default, см. `defaultTheme="dark"` в layout). После
 * гидрации значение обновляется без визуального скачка для пользователей
 * на дефолтной теме; для пользователей с системой "light" будет короткий
 * (~1 кадр) flash dark→light, что приемлемо для accent-effects (не для
 * основного фона).
 *
 * Не использовать для:
 *   - email templates (`src/lib/email/templates/*`) — серверные, тема не
 *     применима; они используют свою палитру в `email/accents.ts`.
 *   - PDF (`src/lib/pdf/*`) — серверные, см. выше.
 *   - SVG/иллюстрации со своей внутренней палитрой (LakhtaScene и т.п.).
 */

import { useTheme } from "next-themes";
import type { ProductAccent } from "@/content/products/types";

/**
 * Light-theme hex per ProductAccent — synced with `:root` block of
 * `src/app/globals.css`. Update both when палитра меняется.
 */
export const ACCENT_HEX_LIGHT: Record<ProductAccent, string> = {
  water: "#1e6fd9",
  fire: "#d72638",
  treatment: "#5c6670",
  heat: "#c7711e",
};

/**
 * Dark-theme hex per ProductAccent — synced with `.dark` block of
 * `src/app/globals.css`.
 */
export const ACCENT_HEX_DARK: Record<ProductAccent, string> = {
  water: "#1e6fd9",
  fire: "#d72638",
  treatment: "#8a94a0",
  heat: "#e8873b",
};

/**
 * Pure resolver — useful in non-React contexts (e.g., framer-motion
 * variant builders, useMemo'd compute). Falls back to dark-variant when
 * `resolvedTheme` is undefined (SSR / pre-hydration).
 */
export function resolveAccentHex(
  key: ProductAccent,
  resolvedTheme: string | undefined,
): string {
  return resolvedTheme === "light"
    ? ACCENT_HEX_LIGHT[key]
    : ACCENT_HEX_DARK[key];
}

/**
 * React hook — reads next-themes `resolvedTheme` and returns matching hex.
 *
 * Stable identity per render — safe to pass into useMemo deps without
 * pulling in the entire useTheme tuple.
 */
export function useAccentHex(key: ProductAccent): string {
  const { resolvedTheme } = useTheme();
  return resolveAccentHex(key, resolvedTheme);
}
