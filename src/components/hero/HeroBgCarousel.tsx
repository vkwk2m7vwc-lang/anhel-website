"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import { HERO_PRODUCTS } from "@/lib/hero-products";
import { cn } from "@/lib/utils";

type HeroBgCarouselProps = {
  /** D-variant passes `false`, E-variant passes `true`. */
  autoplay?: boolean;
};

/**
 * Hero background — carousel of 4 products (variants D & E).
 *
 * Layout mirrors variant B (text on the left 60%, product zone on the right
 * 40%), but the product swaps out over time. Accent colour (radial
 * gradient + drop-shadow) follows the active product, giving each slide its
 * own mood without touching the rest of the page chrome.
 *
 * Differences between D and E are minimal — D hides the progress bar and
 * play/pause toggle. Everything else is shared.
 */
export function HeroBgCarousel({ autoplay = false }: HeroBgCarouselProps) {
  const prefersReduced = usePrefersReducedMotion();
  const tilt = useTilt<HTMLDivElement>({ maxDeg: 4 });

  const { active, goTo, isPlaying, toggle, pause, resume, progress } =
    useHeroCarousel({
      count: HERO_PRODUCTS.length,
      autoplay,
      interval: 5000,
    });

  const product = HERO_PRODUCTS[active];

  // Accent driven gradient — we rebuild the string on every render, then
  // rely on CSS `transition: background 600ms` for the tween. Framer Motion
  // doesn't interpolate gradients, and animating rgba channels via JS would
  // burn frames for something the GPU already handles cheaply.
  const accentRgba = (alpha: number) => hexToRgba(product.accent, alpha);
  const gradient = `radial-gradient(circle at 72% 50%, ${accentRgba(
    0.18
  )} 0%, rgba(10,10,10,0) 55%)`;

  return (
    <>
      {/* Accent radial glow — smoothly cross-fades between products via CSS */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-[background] duration-[600ms] ease-in-out"
        style={{ background: gradient }}
      />
      {/* 40×40 hairline grid for continuity with variants A & B */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-60"
      />

      {/* Product zone — right 45% on desktop, full-width below md.
          `pointer-events-auto` so tilt/hover/clicks fire while the rest of
          the background layer stays click-through. */}
      <div
        className="pointer-events-auto absolute inset-y-0 right-0 hidden w-[45%] flex-col items-center justify-center md:flex"
        style={{ perspective: "1200px" }}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {/* The tilt + float wrapper is stable — only the <img> inside swaps,
            so the spring-smoothed tilt never stutters on slide change. */}
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={{
            rotateX: prefersReduced ? 0 : tilt.rotateX,
            rotateY: prefersReduced ? 0 : tilt.rotateY,
            transformStyle: "preserve-3d",
            filter: `drop-shadow(0 30px 40px ${accentRgba(0.45)})`,
            transition: "filter 600ms ease-in-out",
          }}
          animate={
            prefersReduced
              ? undefined
              : {
                  y: [0, -8, 0],
                }
          }
          transition={
            prefersReduced
              ? undefined
              : {
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          className="relative flex h-[70%] w-[85%] items-center justify-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={product.slug}
              initial={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 0, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={
                prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, filter: "blur(8px)" }
              }
              transition={{ duration: prefersReduced ? 0 : 0.4, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={product.image}
                alt={product.alt}
                fill
                priority={active === 0}
                sizes="(min-width: 1440px) 600px, 45vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Switcher strip — numbers 01..04, active name, optional play/pause.
            Sits at the bottom of the product zone so it doesn't visually
            compete with the headline on the left. */}
        <div className="absolute inset-x-8 bottom-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div
              role="tablist"
              aria-label="Карусель продуктов"
              className="flex items-center gap-2"
            >
              {HERO_PRODUCTS.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="hero-carousel-product"
                    data-cursor="hover"
                    onClick={() => goTo(i)}
                    className={cn(
                      "rounded-pill border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
                      isActive
                        ? "border-transparent bg-[var(--color-secondary)] text-[var(--color-primary)]"
                        : "border-[var(--color-hairline)] text-[var(--color-secondary)]/60 hover:text-[var(--color-secondary)]"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            {/* Play/pause — E-variant only, and only when the user hasn't
                requested reduced motion. */}
            {autoplay && !prefersReduced && (
              <button
                type="button"
                data-cursor="hover"
                onClick={toggle}
                aria-label={isPlaying ? "Пауза автосмены" : "Запустить автосмену"}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-secondary)]/60 transition-colors hover:text-[var(--color-secondary)]"
              >
                {isPlaying ? (
                  <Pause size={12} strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <Play size={12} strokeWidth={1.75} aria-hidden="true" />
                )}
              </button>
            )}
          </div>

          {/* Active product name, fades with the render */}
          <div
            id="hero-carousel-product"
            aria-live="polite"
            className="relative h-5 overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={product.slug}
                initial={
                  prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReduced ? { opacity: 0, y: 0 } : { opacity: 0, y: -6 }
                }
                transition={{ duration: prefersReduced ? 0 : 0.3 }}
                className="text-sm text-[var(--color-secondary)]/70"
              >
                {product.name}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Auto-advance progress — E-variant only */}
          {autoplay && !prefersReduced && (
            <div
              aria-hidden="true"
              className="h-px w-full bg-[var(--color-hairline)]"
            >
              <div
                className="h-full"
                style={{
                  width: `${Math.round(progress * 100)}%`,
                  backgroundColor: product.accent,
                  transition: "background-color 600ms ease-in-out",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile fallback — scaled-down centred render, switcher below.
          No tilt, no play/pause chrome; we keep the swap animation so the
          carousel still reads on narrow screens. */}
      <div className="absolute inset-x-0 bottom-24 flex flex-col items-center gap-4 md:hidden">
        <motion.div
          style={{
            filter: `drop-shadow(0 20px 30px ${accentRgba(0.45)})`,
            transition: "filter 600ms ease-in-out",
          }}
          className="relative h-[200px] w-[200px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`m-${product.slug}`}
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
              <Image
                src={product.image}
                alt=""
                aria-hidden="true"
                fill
                sizes="200px"
                className="object-contain opacity-90"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="pointer-events-auto flex items-center gap-2">
          {HERO_PRODUCTS.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={`m-${p.slug}`}
                type="button"
                aria-label={`Показать: ${p.name}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-pill transition-all",
                  isActive
                    ? "w-6 bg-[var(--color-secondary)]"
                    : "w-1.5 bg-[var(--color-secondary)]/30"
                )}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

/**
 * Expand `#RRGGBB` to `rgba(r, g, b, alpha)`. We keep the helper inline so
 * the carousel is self-contained — the rest of the app doesn't need hex
 * parsing today.
 */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
