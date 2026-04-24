"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { useMagnetic } from "@/hooks/useMagnetic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Breadcrumbs } from "./Breadcrumbs";
import type {
  ProductAccent,
  ProductCTA,
  ProductHeroContent,
} from "@/content/products/types";

/**
 * Per-accent hex values — used for glow + drop-shadow math. We can't
 * `rgba(var(--accent-fire))` in CSS because var() wraps a full colour,
 * not an R,G,B triple. Re-declaring the hexes here keeps the runtime
 * maths simple and stays in sync with `globals.css` (reviewed on every
 * palette change).
 */
const ACCENT_HEX: Record<ProductAccent, string> = {
  fire: "#D72638",
  water: "#1E6FD9",
  treatment: "#8A94A0",
  heat: "#E8873B",
};

/**
 * Map accent key to the CSS variable that `globals.css` exposes. We use
 * this for the thin "shell" colour (e.g. underlines, bullet ticks) so
 * the whole page picks up one source of truth.
 */
const ACCENT_VAR: Record<ProductAccent, string> = {
  fire: "var(--accent-fire)",
  water: "var(--accent-water)",
  treatment: "var(--accent-treatment)",
  heat: "var(--accent-heat)",
};

/**
 * Product-page hero.
 *
 * Layout (desktop, ≥ md):
 *   ┌──────────────────────────────┬─────────────────┐
 *   │  breadcrumbs                 │                 │
 *   │  mono-tag                    │                 │
 *   │                              │   3D product    │
 *   │  H1 title                    │   render with   │
 *   │  subtitle                    │   tilt + glow   │
 *   │                              │                 │
 *   │  [primary] [ghost]           │                 │
 *   │                              │                 │
 *   │  ────────────────────────────────────          │
 *   │  scroll hint                                   │
 *   └────────────────────────────────────────────────┘
 *
 * Below `md` the layout stacks: breadcrumbs + copy on top, image
 * beneath with a smaller footprint. Tilt / magnetic cursor disable on
 * touch and for users with reduced motion (enforced inside the hooks).
 *
 * The shell deliberately does NOT reuse `HeroShell` from `src/components/hero/`.
 * HeroShell is home-hero-specific (counters strip, variant labels). Product
 * hero has breadcrumbs and no counters. Trying to fold one into the other
 * would compromise both. Shared DNA (grid, mono-tag treatment, tilt, glow)
 * is just reproduced here — 30 lines of duplication trades cleanly against
 * keeping either component from sprouting conditionals.
 */
export function ProductHero({
  content,
  accent,
}: {
  content: ProductHeroContent;
  accent: ProductAccent;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const tilt = useTilt<HTMLDivElement>({ maxDeg: 4 });

  const hex = ACCENT_HEX[accent];
  const accentVar = ACCENT_VAR[accent];

  // Build the radial glow + drop-shadow once — simple strings, no motion
  // values needed because the accent doesn't animate inside a single
  // product page (it's fixed for the whole route).
  const glow = `radial-gradient(circle at 72% 50%, ${hexToRgba(
    hex,
    0.18
  )} 0%, rgba(10,10,10,0) 55%)`;
  const dropShadow = `drop-shadow(0 30px 40px ${hexToRgba(hex, 0.45)})`;

  return (
    <section
      id="product-hero"
      className="relative flex min-h-[88svh] flex-col overflow-hidden bg-[var(--color-primary)]"
      style={{
        // Expose the current accent to downstream sections (tech specs etc.)
        // on the same route — they read `var(--accent-current)` rather than
        // hard-coding the key.
        ["--accent-current" as string]: accentVar,
      }}
    >
      {/* Radial accent glow — static, no cross-fade needed */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{ background: glow }}
      />
      {/* 40×40 hairline grid — continuity with home hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-grid-hairline bg-grid opacity-60"
      />

      {/* Right-side product render — absolute so the copy grid can claim
          full width for alignment, and the image floats without affecting
          the flow. Hidden below md; a smaller mobile render appears at
          the bottom of the stack. */}
      <div
        className="pointer-events-auto absolute inset-y-0 right-0 z-10 hidden w-[45%] items-center justify-center md:flex"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={{
            rotateX: prefersReduced ? 0 : tilt.rotateX,
            rotateY: prefersReduced ? 0 : tilt.rotateY,
            transformStyle: "preserve-3d",
            filter: dropShadow,
          }}
          animate={prefersReduced ? undefined : { y: [0, -8, 0] }}
          transition={
            prefersReduced
              ? undefined
              : { y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
          }
          className="relative h-[72%] w-[85%]"
        >
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            priority
            sizes="(min-width: 1440px) 600px, 45vw"
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Content grid */}
      <div className="relative z-20 mx-auto flex min-h-[88svh] w-full max-w-[1440px] flex-col justify-between px-6 pb-10 pt-28 md:px-12 md:pb-14 md:pt-32">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Breadcrumbs items={content.breadcrumbs} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
            className="mono-tag mt-6"
          >
            {content.sectionTag}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.25,
            }}
            className="mt-8 max-w-[720px] font-display text-section font-medium text-[var(--color-secondary)] md:mt-10"
          >
            {content.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.45,
            }}
            className="mt-6 max-w-[540px] text-body text-[var(--color-secondary)]/70 md:mt-8"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5"
          >
            <ProductCtaButton cta={content.primaryCta} />
            {content.secondaryCta && (
              <ProductCtaButton cta={content.secondaryCta} />
            )}
          </motion.div>

          {/* Mobile render — scaled, centred under the copy block */}
          <div className="mt-12 flex justify-center md:hidden">
            <div
              className="relative h-[260px] w-[260px]"
              style={{ filter: dropShadow }}
            >
              <Image
                src={content.image.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="260px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Thin baseline: hairline + scroll hint + timestamp of sorts */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--color-hairline)] pt-6 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/40">
            Проектирование · Производство · Автоматизация
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/60 md:justify-end"
          >
            Прокрутить
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/**
 * CTA pill — lifted out of the main component to keep the magnetic-ref
 * attachment clean. Primary = filled white pill, ghost = hairline
 * outline. Both follow the cursor subtly within 120px (see `useMagnetic`).
 */
function ProductCtaButton({ cta }: { cta: ProductCTA }) {
  const ref = useMagnetic<HTMLAnchorElement>({
    strength: cta.variant === "primary" ? 0.35 : 0.3,
  });

  if (cta.variant === "primary") {
    return (
      <Link
        ref={ref}
        href={cta.href}
        data-cursor="hover"
        className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)] transition-transform duration-300 ease-out-expo will-change-transform"
      >
        {cta.label}
        <span
          aria-hidden="true"
          className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    );
  }

  return (
    <Link
      ref={ref}
      href={cta.href}
      data-cursor="hover"
      className="inline-flex items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-[22px] py-[14px] text-sm font-medium text-[var(--color-secondary)]/80 transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
    >
      {cta.label}
      {cta.hint && (
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/40">
          {cta.hint}
        </span>
      )}
    </Link>
  );
}

/**
 * Expand `#RRGGBB` to `rgba(r, g, b, alpha)`. Mirror of the helper in
 * `HeroBgCarousel` — kept local so each component stays self-contained
 * and there's no third place to edit if the format ever changes.
 */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
