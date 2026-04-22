"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { HERO_PRODUCTS, type HeroProduct } from "@/lib/hero-products";
import { cn } from "@/lib/utils";

/**
 * Hero background — variant D redesign: "living showcase with focus".
 *
 * Not a carousel. A static fan composition: one hero product centered,
 * three others peeking out behind it in an asymmetric triangle (top-left,
 * bottom-left, bottom-right). Click a back product → `layoutId` morph
 * swaps it into the hero slot; the previous hero takes its place.
 *
 * Step 1 (this file) delivers the static layout + click-to-swap + accent
 * colour follow. Hover-reveal, drop-shadow polish, and float/tilt motion
 * come in step 2. Everything lives inside the right 45% of the viewport
 * so the composition never crowds the headline column on the left.
 *
 * Reduced motion: collapses to a flat four-up row with no blur and no
 * transitions. Swap still works (state just updates, no animation).
 */

/** Screen coords for each role (% of the right zone, not the viewport). */
type SlotStyle = {
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
  blur: number;
  /** z-order inside the fan — hero sits on top. */
  z: number;
};

const SLOTS: readonly SlotStyle[] = [
  // 0 — hero: centered, crisp. Slightly tighter than v1 so the back
  // products have visible real-estate around all four sides.
  { left: "22%", top: "14%", width: "58%", height: "68%", opacity: 1, blur: 0, z: 30 },
  // 1 — top-back: upper-left, sits clearly ABOVE and to the LEFT of the
  // hero (not behind it). Leaves the headline column on the left of the
  // viewport untouched — this is inside the right 45% zone.
  { left: "8%", top: "2%", width: "26%", height: "26%", opacity: 0.42, blur: 4, z: 10 },
  // 2 — bottom-left: peeks out below+left of the hero with meaningful
  // standalone area (roughly a third of the tile visible outside hero).
  { left: "0%", top: "56%", width: "26%", height: "26%", opacity: 0.42, blur: 4, z: 20 },
  // 3 — bottom-right: peeks out below+right of the hero, a touch larger
  // so the triangle reads as intentional, not a rigid mirror.
  { left: "72%", top: "60%", width: "27%", height: "27%", opacity: 0.45, blur: 4, z: 20 },
];

/**
 * Keep `order[0]` = current hero, `order[1..3]` = back products.
 * Clicking back[i] swaps it with the hero — both animate via layoutId.
 */
type Order = readonly [HeroProduct, HeroProduct, HeroProduct, HeroProduct];

const INITIAL_ORDER: Order = [
  HERO_PRODUCTS[0],
  HERO_PRODUCTS[1],
  HERO_PRODUCTS[2],
  HERO_PRODUCTS[3],
];

export function HeroBgShowcase() {
  const prefersReduced = usePrefersReducedMotion();
  const [order, setOrder] = useState<Order>(INITIAL_ORDER);

  const hero = order[0];

  /** Swap `order[0]` with `order[slotIdx]`. slotIdx must be 1..3. */
  const swap = useCallback((slotIdx: number) => {
    if (slotIdx < 1 || slotIdx > 3) return;
    setOrder((prev) => {
      const next = [...prev] as HeroProduct[];
      [next[0], next[slotIdx]] = [next[slotIdx], next[0]];
      return next as unknown as Order;
    });
  }, []);

  // Accent gradient — rebuilt every render, CSS transitions handle the tween
  const accentRgba = (alpha: number) => hexToRgba(hero.accent, alpha);
  const gradient = `radial-gradient(circle at 72% 50%, ${accentRgba(
    0.18
  )} 0%, rgba(10,10,10,0) 55%)`;

  // Layout animation config — single bezier for a premium, controlled morph.
  // Disabled under prefers-reduced-motion by flipping duration to 0.
  const layoutTransition = prefersReduced
    ? { duration: 0 }
    : { layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } };

  return (
    <>
      {/* Accent radial glow — tracks the current hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-[background] duration-[600ms] ease-in-out"
        style={{ background: gradient }}
      />
      {/* Hairline grid for continuity with variants A / B / E */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-60"
      />

      {/* Desktop fan — sits inside the right 45% zone so it never touches
          the headline column on the left.
          `pointer-events-auto` so back-product buttons can be clicked.
          `pointer-events` is inherited, and the HeroShell wrapper sets it to
          `none` — without this override the back buttons' own
          `pointer-events-auto` could still behave inconsistently across
          nested stacking contexts. Matches the pattern used by
          HeroBgCarousel. */}
      <div
        className="pointer-events-auto absolute inset-y-0 right-0 hidden w-[45%] md:block"
        style={{ perspective: "1400px" }}
      >
        {/* Subtle hint. Top-right of the zone, tiny mono — easy to miss on
            purpose. In step 2 (hover reveal) we'll fade it out when the
            user engages. */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute right-8 top-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-secondary)]/35"
        >
          Наведите для выбора
        </p>

        {/* The four products. We render in `order` so each slug is always
            at the right slot for its current role, and `layoutId` does the
            morph when roles change. */}
        {order.map((product, slotIdx) => {
          const slot = SLOTS[slotIdx];
          const isHero = slotIdx === 0;

          return (
            <motion.button
              key={product.slug}
              type="button"
              layoutId={`hero-d-${product.slug}`}
              onClick={isHero ? undefined : () => swap(slotIdx)}
              disabled={isHero}
              aria-label={
                isHero
                  ? `Текущий продукт: ${product.name}`
                  : `Выбрать: ${product.name}`
              }
              data-cursor={isHero ? undefined : "hover"}
              transition={layoutTransition}
              className={cn(
                "absolute rounded-lg",
                isHero
                  ? "pointer-events-none cursor-default"
                  : "pointer-events-auto cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)]/60"
              )}
              style={{
                left: slot.left,
                top: slot.top,
                width: slot.width,
                height: slot.height,
                zIndex: slot.z,
                opacity: slot.opacity,
                filter: isHero
                  ? `drop-shadow(0 30px 40px ${accentRgba(0.45)})`
                  : `blur(${slot.blur}px)`,
                transition:
                  "filter 600ms ease-in-out, opacity 600ms ease-in-out",
                background: "transparent",
                border: "none",
                padding: 0,
              }}
            >
              <Image
                src={product.image}
                alt=""
                aria-hidden="true"
                fill
                priority={isHero}
                sizes="(min-width: 1440px) 600px, 45vw"
                className="object-contain"
                draggable={false}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Mobile fallback — four products in a 2×2 grid, clickable, no blur.
          Swap still works, so tapping a card promotes it to "hero" state
          (which, on mobile, just re-renders the same grid order). Keeping
          parity keeps the accent-colour transition consistent across
          breakpoints. */}
      <div className="pointer-events-auto absolute inset-x-4 bottom-16 grid grid-cols-2 gap-3 md:hidden">
        {order.map((product, slotIdx) => {
          const isHero = slotIdx === 0;
          return (
            <button
              key={`m-${product.slug}`}
              type="button"
              onClick={isHero ? undefined : () => swap(slotIdx)}
              disabled={isHero}
              aria-label={
                isHero
                  ? `Текущий: ${product.name}`
                  : `Выбрать: ${product.name}`
              }
              className={cn(
                "relative aspect-square rounded-md border p-3 transition-colors",
                isHero
                  ? "border-[var(--color-secondary)]/30 bg-[var(--color-secondary)]/[0.04]"
                  : "border-[var(--color-hairline)] bg-transparent"
              )}
              style={{
                filter: isHero
                  ? `drop-shadow(0 8px 14px ${accentRgba(0.35)})`
                  : undefined,
              }}
            >
              <Image
                src={product.image}
                alt=""
                aria-hidden="true"
                fill
                sizes="50vw"
                className={cn(
                  "object-contain",
                  isHero ? "opacity-100" : "opacity-60"
                )}
                draggable={false}
              />
              <span className="absolute inset-x-2 bottom-1 truncate text-center font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/60">
                {isHero ? product.name : ""}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

/**
 * `#RRGGBB` → `rgba(r, g, b, alpha)`. Local copy instead of importing from
 * HeroBgCarousel — keeps this component self-contained and avoids a
 * cross-component dependency on what's otherwise an internal helper.
 */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
