"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { HERO_PRODUCTS } from "@/lib/hero-products";
import { cn } from "@/lib/utils";

/**
 * Mobile-only inline hero product slot — five products with auto-advance
 * and a numbered 01..05 pagination row underneath. Sits in HeroShell's
 * mobile flow (`md:hidden` on the consumer side), independent of the
 * desktop carousel which keeps living in HeroBgCarousel's background
 * layer at lg+.
 *
 * State is independent: this component runs its own useHeroCarousel
 * instance. Mobile (<md) and desktop (≥lg) never display together, so
 * separate timelines never visually clash. The two-pixel band at
 * md-lg (768-1023) is text-only on both sides; no carousel runs there.
 *
 * Layout
 *   ┌──────────────────┐
 *   │                  │   product image — 300×300 max, object-contain
 *   │   product render │   pedestal glow under the lower third
 *   │                  │
 *   └──────────────────┘
 *   ┌ 01 ┐┌ 02 ┐┌ 03 ┐ ...   numbered pills, active pill inverts colours
 *
 * Product slot height is fixed at 300px so the layout doesn't reflow
 * when products of different vertical aspect swap in (water-treatment is
 * wider, pump cabinets are taller); object-contain ensures none crop.
 */
export function HeroProductMobile() {
  const tHero = useTranslations("home.hero_carousel");
  const tUi = useTranslations("common.ui");
  const prefersReduced = usePrefersReducedMotion();
  const { active, goTo } = useHeroCarousel({
    count: HERO_PRODUCTS.length,
    autoplay: true,
    interval: 5000,
  });
  const product = HERO_PRODUCTS[active];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Product slot — 300px tall, capped at 320px wide so the render
          never spills past the safe column on the narrowest phones. */}
      <div className="relative h-[275px] w-full max-w-[320px]">
        {/* Pedestal glow — sits below the product, accent follows the
            active product. Cross-fades via CSS background transition,
            same approach as desktop. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 h-[35%] w-[75%] -translate-x-1/2"
          style={{
            bottom: "0%",
            background: `radial-gradient(ellipse at center, ${hexToRgba(
              product.accent,
              0.35
            )} 0%, ${hexToRgba(product.accent, 0.15)} 40%, rgba(10,10,10,0) 70%)`,
            filter: "blur(18px)",
            transition: "background 600ms ease-in-out",
          }}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={product.slug}
            initial={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 0, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, filter: "blur(6px)" }
            }
            transition={{ duration: prefersReduced ? 0 : 0.4 }}
            className="relative h-full w-full"
          >
            {product.href ? (
              <Link
                href={product.href}
                aria-label={tUi("carousel.open_product", {
                  name: tHero(`${product.slug}.name`),
                })}
                className="relative block h-full w-full"
              >
                <Image
                  src={product.image}
                  alt={tHero(`${product.slug}.alt`)}
                  fill
                  priority={active === 0}
                  sizes="320px"
                  className="object-contain"
                />
              </Link>
            ) : (
              <Image
                src={product.image}
                alt={tHero(`${product.slug}.alt`)}
                fill
                priority={active === 0}
                sizes="320px"
                className="object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Numbered pagination 01..05 — pill style. Active pill inverts
          colours (filled secondary on primary text); inactive pills are
          a low-contrast outline. flex-wrap covers the narrowest screens
          where five pills wouldn't fit one row. */}
      <div
        role="tablist"
        aria-label={tUi("carousel.products_aria")}
        className="flex flex-wrap items-center justify-center gap-1.5"
      >
        {HERO_PRODUCTS.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={tUi("carousel.show_product", {
                name: tHero(`${p.slug}.name`),
              })}
              onClick={() => goTo(i)}
              className={cn(
                "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]",
                "transition-colors duration-200 active:scale-[0.94]",
                isActive
                  ? "border-[var(--color-secondary)] bg-[var(--color-secondary)] text-[var(--color-primary)]"
                  : "border-[var(--color-secondary)]/30 text-[var(--color-secondary)]/60"
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Expand `#RRGGBB` to `rgba(r, g, b, alpha)`. Inline so this component
 * is self-contained — matches the same helper used in HeroBgCarousel.
 */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
