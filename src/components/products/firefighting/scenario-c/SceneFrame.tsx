"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import type { ScenarioCScene } from "@/content/products/firefighting-scenario-c";

/**
 * Shared shell for every Scenario-C cinematic frame.
 *
 * Layout contract — all five scenes share this skeleton so the pacing
 * is consistent and the reader's eye settles on the same beats each time:
 *
 *   ┌───────────────────────────────────────────────────────────────┐
 *   │  [mono meta]                                 [chapter numeral]│
 *   │                                                                │
 *   │                    ┌─────────────────────┐                     │
 *   │                    │                     │                     │
 *   │                    │   scene artwork     │                     │
 *   │                    │   (children slot)   │                     │
 *   │                    │                     │                     │
 *   │                    └─────────────────────┘                     │
 *   │                                                                │
 *   │  [title]                                                       │
 *   │  [caption]                                                     │
 *   └───────────────────────────────────────────────────────────────┘
 *
 * The frame is min-h:100svh so every scene occupies a full viewport.
 * We trigger a single fade/rise-in once the frame is ~35% visible,
 * which keeps the text from appearing too early while the artwork is
 * still climbing into view. We do NOT pin — the user's scroll position
 * always matches the document position (simpler, more predictable).
 *
 * Reduced motion: everything snaps in with no translation/fade.
 */

type Props = {
  scene: ScenarioCScene;
  children: ReactNode;
  /**
   * Optional className override for the artwork container. Individual
   * scenes sometimes want to draw edge-to-edge; others want a tighter
   * inset. Defaults to a centred 1040x620-ish stage.
   */
  stageClassName?: string;
};

export function SceneFrame({ scene, children, stageClassName }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: false });
  const prefersReduced = useReducedMotion();

  // Framer's useInView toggles the state; we drive children via data
  // attributes AND with motion props. Data-active bubbles down for
  // any per-scene decorative motion the scenes want to opt into.
  const active = inView;

  const baseTransition = prefersReduced
    ? { duration: 0 }
    : { duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <section
      ref={ref}
      data-scene-index={scene.index}
      data-active={active}
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[var(--color-primary)]"
      style={{ ["--accent-current" as string]: scene.accentToken }}
    >
      {/* Top bar — mono meta on the left, huge chapter numeral anchored
          to the right. The numeral is large but sits in a reduced
          opacity so it reads as chapter furniture, not a heading. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-start justify-between gap-6 px-6 pt-10 md:px-12 md:pt-14">
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={baseTransition}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/45"
        >
          {scene.meta}
        </motion.p>

        <motion.span
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={active ? { opacity: 0.14 } : { opacity: 0 }}
          transition={{ ...baseTransition, delay: prefersReduced ? 0 : 0.1 }}
          aria-hidden="true"
          className="select-none font-serif text-[140px] leading-none tracking-[-0.02em] text-[var(--color-secondary)] md:text-[200px]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {scene.chapter}
        </motion.span>
      </div>

      {/* Artwork stage — fills the remaining vertical space. Individual
          scenes render their SVG/canvas here. We give it a standard
          aspect-ratio-ish sizing but allow each scene to override. */}
      <div className="relative z-0 flex flex-1 items-center justify-center px-6 md:px-12">
        <div
          className={
            stageClassName ??
            "relative flex aspect-[16/10] w-full max-w-[1080px] items-center justify-center"
          }
        >
          {children}
        </div>
      </div>

      {/* Caption block — title + narrative paragraph. Mono subline at
          the very bottom (a thin editorial flourish). */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-14 pt-10 md:px-12 md:pb-20 md:pt-14">
        <motion.h3
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ ...baseTransition, delay: prefersReduced ? 0 : 0.18 }}
          className="max-w-[640px] text-3xl font-medium leading-tight tracking-[-0.01em] text-[var(--color-secondary)] md:text-[40px]"
        >
          {scene.title}
        </motion.h3>
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ ...baseTransition, delay: prefersReduced ? 0 : 0.28 }}
          className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-[var(--color-secondary)]/65"
        >
          {scene.caption}
        </motion.p>
      </div>

      {/* Ambient grain — full-scene SVG turbulence, overlaid in a blend
          mode that gives the frames that subtle silver-halide feel
          without being distracting. */}
      <GrainOverlay />
    </section>
  );
}

/**
 * Inline SVG turbulence grain. We keep it per-frame rather than in the
 * scene root so the blend with each scene's accent stays local — a
 * centralised grain would smear over the scene boundaries and look
 * uniform rather than film-like.
 */
function GrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="sc-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#sc-grain)" />
    </svg>
  );
}
