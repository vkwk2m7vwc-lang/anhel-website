"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ISO_PIPE_IDS, ISO_VIEW_BOX } from "./IsometricDiagram";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

/**
 * Ambient particle flow over the isometric diagram.
 *
 * Unlike Scenario-A's scroll-driven particles, these run continuously
 * to sell "the system is alive, currently pressurised". Each pipe path
 * (defined in IsometricDiagram's <defs>) hosts 1–3 particles staggered
 * along the cycle so motion reads from any viewing moment.
 *
 * Why a separate SVG overlay rather than appending to the diagram SVG:
 *   - Keeps the diagram a pure presentation component (easier to test).
 *   - Animation re-runs (on prefers-reduced-motion change, for instance)
 *     can tear down this component in isolation without re-rendering
 *     every glyph.
 *
 * The overlay sits absolute on top of the diagram with the exact same
 * viewBox, so motion paths resolve to the same screen coordinates.
 */

/** Tuning: per-pipe particle count + base duration (sec) + stagger. */
const PIPE_PARTICLES: Record<
  keyof typeof ISO_PIPE_IDS,
  { count: number; duration: number }
> = {
  intakeToValve: { count: 2, duration: 3.2 },
  valveToJockey: { count: 1, duration: 2.6 },
  valveToPrimary: { count: 2, duration: 2.4 },
  valveToBackup: { count: 1, duration: 2.6 },
  jockeyToManifold: { count: 1, duration: 2.6 },
  primaryToManifold: { count: 2, duration: 2.4 },
  backupToManifold: { count: 1, duration: 2.6 },
  manifoldToRiserL: { count: 2, duration: 3.6 },
  manifoldToRiserR: { count: 2, duration: 3.6 },
  riserLToLoop: { count: 1, duration: 2.8 },
  loopToSprinkler: { count: 1, duration: 2.2 },
};

export function FlowParticles() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const scope = svgRef.current;

    // Short-circuit on reduced-motion. We still render the particles
    // but keep them faintly visible and static — the user still sees
    // "where flow lives" without the motion.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set("[data-sb-p]", { opacity: 0.4 });
        return;
      }

      const particles = scope.querySelectorAll<SVGCircleElement>("[data-sb-p]");
      particles.forEach((el) => {
        const pipeId = el.getAttribute("data-sb-pipe");
        const duration = parseFloat(el.getAttribute("data-sb-duration") || "2.5");
        const delay = parseFloat(el.getAttribute("data-sb-delay") || "0");
        if (!pipeId) return;
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            keyframes: {
              "0%": { opacity: 0 },
              "10%": { opacity: 0.8 },
              "85%": { opacity: 0.8 },
              "100%": { opacity: 0 },
            },
            motionPath: { path: `#${pipeId}`, autoRotate: false },
            duration,
            delay,
            repeat: -1,
            ease: "none",
          },
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${ISO_VIEW_BOX.w} ${ISO_VIEW_BOX.h}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Flatten the (pipeKey, count, duration) triples into individual
          particle circles. Delay = (i / count) * duration so particles
          space themselves evenly along each cycle — you always see
          motion regardless of when the viewer glances. */}
      {(Object.entries(PIPE_PARTICLES) as Array<
        [keyof typeof ISO_PIPE_IDS, { count: number; duration: number }]
      >).flatMap(([key, { count, duration }]) => {
        const pipeId = ISO_PIPE_IDS[key];
        return Array.from({ length: count }).map((_, i) => (
          <circle
            key={`${pipeId}-${i}`}
            r={2.2}
            fill="var(--accent-current)"
            opacity={0}
            data-sb-p="true"
            data-sb-pipe={pipeId}
            data-sb-duration={duration}
            data-sb-delay={(i / count) * duration}
          />
        ));
      })}
    </svg>
  );
}
