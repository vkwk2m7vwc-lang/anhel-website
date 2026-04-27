"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import { HERO_PRODUCTS } from "@/lib/hero-products";
import { cn } from "@/lib/utils";

type HeroBgCarouselProps = {
  /**
   * If `true`, the carousel auto-advances every 5s and the UI shows
   * a play/pause toggle + progress bar. If `false`, the user must
   * click the numbered tabs to switch cards.
   *
   * `/` and `/hero-e` both pass `true` today — the only two routes
   * that mount this component after the A/B/D variants were pruned.
   */
  autoplay?: boolean;
};

/**
 * Hero background — carousel of 4 products.
 *
 * Layout: text on the left 60%, product zone on the right 40%. The
 * product swaps out over time (manual or auto per `autoplay`). Accent
 * colour (radial gradient + pedestal-glow) follows the active product,
 * giving each slide its own mood without touching the rest of the
 * page chrome.
 */
export function HeroBgCarousel({
  autoplay = false,
}: HeroBgCarouselProps) {
  const prefersReduced = usePrefersReducedMotion();
  const tilt = useTilt<HTMLDivElement>({ maxDeg: 4 });

  const { active, goTo, isPlaying, toggle, pause, resume, progress } =
    useHeroCarousel({
      count: HERO_PRODUCTS.length,
      autoplay,
      interval: 5000,
    });

  /*
   * Pause model --------------------------------------------------------
   * Only one source parks the carousel: hover. Pointer inside → pause,
   * pointer outside → resume. No timers, no grace windows.
   *
   * A click on a number previously added a dedicated pause window
   * (9 s → 5 s in earlier iterations) to let the viewer study their
   * pick, but it felt too static: users saw a non-ticking progress
   * bar and thought the carousel had stalled. New behaviour is to
   * just switch slides on click and let the normal 5-s interval run
   * from 0 immediately — so the progress bar starts moving the very
   * moment you click.
   *
   * If the user happens to be hovering at the time of click, hover
   * continues to hold the carousel until they move off. `goTo` resets
   * the progress bar to 0, and the RAF loop in useHeroCarousel keeps
   * it at 0 while `hoverPaused` is true, then picks up from 0 on
   * pointerleave.
   */

  const product = HERO_PRODUCTS[active];

  // Accent driven gradient — we rebuild the string on every render, then
  // rely on CSS `transition: background 600ms` for the tween. Framer Motion
  // doesn't interpolate gradients, and animating rgba channels via JS would
  // burn frames for something the GPU already handles cheaply.
  const accentRgba = (alpha: number) => hexToRgba(product.accent, alpha);
  // Было 0.18 — fire-red и heat-orange разливались на половину экрана.
  // 0.10 даёт уверенно читаемый цветной backlight за продуктом, но не
  // заполняет всю правую колонку.
  const gradient = `radial-gradient(circle at 72% 50%, ${accentRgba(
    0.10
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
          the background layer stays click-through.

          Pause/resume hooks: we listen to BOTH `onMouseEnter/Leave` and
          `onPointerEnter/Leave`. In a real browser a mouse hover will
          fire both (pointer events subsume mouse events on desktop),
          but our handlers are idempotent so the duplicate call is a
          no-op. The reason we keep both:
            - `MouseEvent` covers legacy/headless paths where CDP-driven
              test tooling only dispatches mouse events (e.g. Puppeteer
              headless, used by our automated UX regression).
            - `PointerEvent` covers touch and pen where the browser
              does *not* synthesise mouse events (e.g. iOS Safari tap).
          The union gives us uniform pause-on-interact behaviour across
          every input type we actually care about. */}
      <div
        className="pointer-events-auto absolute inset-y-0 right-0 hidden w-[45%] flex-col items-center justify-center md:flex"
        style={{ perspective: "1200px" }}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerEnter={pause}
        onPointerLeave={resume}
      >
        {/* The tilt + float wrapper is stable — only the <img> inside swaps,
            so the spring-smoothed tilt never stutters on slide change.

            Previously we used `filter: drop-shadow(...)` here to anchor the
            product, but the PNG renders have ~27–46% partial-alpha pixels
            (soft feathering + baked-in floor reflections). drop-shadow
            traces that alpha, so the shadow read as a blurred rectangle
            instead of the product silhouette — a visible backdrop box on
            all four cards.

            Swapped to a dedicated radial-glow div rendered *behind* the
            image (sibling of AnimatePresence, earlier in DOM so it stacks
            below). The glow is independent of the PNG's alpha channel —
            it's just a gradient ellipse we paint, so there is no way for
            image feathering to leak into it. */}
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={{
            rotateX: prefersReduced ? 0 : tilt.rotateX,
            rotateY: prefersReduced ? 0 : tilt.rotateY,
            transformStyle: "preserve-3d",
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
          {/* Pedestal glow удалён по запросу — был alpha 0.35 эллипс под
              продуктом, на heat-акценте (orange) читался как «лужа на полу».
              Hero теперь рендерит продукт на чистом фоне с лёгким accent
              backlight за изображением (см. `gradient` выше). Если хочется
              вернуть «свет на пол» — восстанови этот блок с alpha ≤ 0.05. */}

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
              {product.href ? (
                <Link
                  href={product.href}
                  aria-label={`Открыть страницу: ${product.name}`}
                  data-cursor="hover"
                  className="relative block h-full w-full cursor-pointer"
                >
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    priority={active === 0}
                    sizes="(min-width: 1440px) 600px, 45vw"
                    className="object-contain transition-transform duration-300 ease-out-expo group-hover:scale-[1.01]"
                  />
                </Link>
              ) : (
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  priority={active === 0}
                  sizes="(min-width: 1440px) 600px, 45vw"
                  className="object-contain"
                />
              )}
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
                    aria-label={`Показать: ${p.name}`}
                    data-cursor="hover"
                    onClick={() => goTo(i)}
                    className={cn(
                      "cursor-pointer rounded-pill border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em]",
                      "transition-[background-color,color,border-color,transform] duration-200",
                      "active:scale-[0.94]",
                      isActive
                        ? "border-transparent bg-[var(--color-secondary)] text-[var(--color-primary)]"
                        : "border-[var(--color-hairline)] text-[var(--color-secondary)]/60 hover:border-[var(--color-secondary)]/40 hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)]"
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

          {/* Active product name + inline Подробнее/Скоро affordance.
              Fades together with the render so the whole block feels like
              one "card". A link when product.href exists, a muted chip
              otherwise — that makes the ready state visibly distinct from
              the "в работе" state without adding a separate UI. */}
          <div
            id="hero-carousel-product"
            aria-live="polite"
            className="relative h-5 overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={product.slug}
                initial={
                  prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReduced ? { opacity: 0, y: 0 } : { opacity: 0, y: -6 }
                }
                transition={{ duration: prefersReduced ? 0 : 0.3 }}
                className="flex items-center gap-3 text-sm"
              >
                {product.href ? (
                  <Link
                    href={product.href}
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)]"
                  >
                    <span>{product.name}</span>
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={{ color: product.accent }}
                    />
                  </Link>
                ) : (
                  <>
                    <span className="text-[var(--color-secondary)]/70">
                      {product.name}
                    </span>
                    <span className="rounded-pill border border-[var(--color-hairline)] px-2 py-[1px] font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/45">
                      Скоро
                    </span>
                  </>
                )}
              </motion.div>
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
          carousel still reads on narrow screens.

          Same pedestal-glow approach as desktop — see the block above for
          the rationale on why we don't use `filter: drop-shadow` here.

          Pointer handlers mirror the desktop zone so tap-to-pause /
          leave-to-resume-after-4-s works on mobile too. */}
      <div
        className="pointer-events-auto absolute inset-x-0 bottom-24 flex flex-col items-center gap-4 md:hidden"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerEnter={pause}
        onPointerLeave={resume}
      >
        <motion.div className="relative h-[200px] w-[200px]">
          {/* Pedestal glow (mobile) удалён вместе с desktop — см. коммент
              в desktop-блоке выше. */}
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
              {product.href ? (
                <Link
                  href={product.href}
                  aria-label={`Открыть страницу: ${product.name}`}
                  className="relative block h-full w-full"
                >
                  <Image
                    src={product.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="200px"
                    className="object-contain opacity-90"
                  />
                </Link>
              ) : (
                <Image
                  src={product.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="200px"
                  className="object-contain opacity-90"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center gap-2">
          {HERO_PRODUCTS.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={`m-${p.slug}`}
                type="button"
                aria-label={`Показать: ${p.name}`}
                aria-pressed={isActive}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-pill transition-all duration-200",
                  "active:scale-[0.88]",
                  isActive
                    ? "w-6 bg-[var(--color-secondary)]"
                    : "w-1.5 bg-[var(--color-secondary)]/30 hover:bg-[var(--color-secondary)]/60"
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
