"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SCENE_GEOMETRY } from "./SkyscraperSVG";

// Register the plugin once, at module load. Guarded against SSR so
// Next.js' build-time import doesn't try to touch `window`.
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

/**
 * Water particle trails flowing up the two risers.
 *
 * Eight small red dots ride along the riser paths in a loop, staggered
 * so the viewer always reads motion instead of a single dot. Uses
 * GSAP's MotionPath plugin — overkill for straight lines today, but
 * the moment we add a bend (e.g. jumper over the basement), the same
 * component handles it without re-architecture.
 *
 * Lifecycle:
 *   - `active=true`  → particles tween, infinite repeat.
 *   - `active=false` → particles stay at opacity 0, no tweens live.
 *
 * Everything is scoped with `gsap.context(scope)` so the cleanup
 * function kills every animation and leftover tween on unmount or on
 * `active` toggling off. That matters because ScrollTrigger can pin
 * the section for a while and we don't want zombie tweens still
 * calling RAF in the background.
 */
export function WaterParticles({ active }: { active: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { viewBox, leftRiserX, rightRiserX, baseY, roofY } = SCENE_GEOMETRY;

  // Straight-line paths up each riser. Encoded as SVG path strings
  // because MotionPathPlugin accepts either a DOM element or a raw
  // path; passing the element keeps the path definition inside the
  // DOM tree where devtools can inspect it.
  const pathLeft = `M ${leftRiserX} ${baseY + 10} L ${leftRiserX} ${roofY + 8}`;
  const pathRight = `M ${rightRiserX} ${baseY + 10} L ${rightRiserX} ${roofY + 8}`;

  useEffect(() => {
    if (!svgRef.current) return;
    const scope = svgRef.current;

    const ctx = gsap.context(() => {
      if (!active) {
        // Kill any lingering tweens and hide particles immediately.
        gsap.killTweensOf("[data-wp]");
        gsap.set("[data-wp]", { opacity: 0 });
        return;
      }
      const particles = scope.querySelectorAll<SVGCircleElement>("[data-wp]");
      particles.forEach((el) => {
        const pathId = el.getAttribute("data-wp-target");
        if (!pathId) return;
        const delay = parseFloat(el.getAttribute("data-wp-delay") || "0");
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            // Fade in at the bottom, ride up, fade out near the top.
            // The keyframes timeline keeps the particle solid through
            // the middle of its journey — reads as "pressurised flow".
            keyframes: {
              "0%": { opacity: 0 },
              "12%": { opacity: 0.95 },
              "85%": { opacity: 0.95 },
              "100%": { opacity: 0 },
            },
            motionPath: {
              path: `#${pathId}`,
              autoRotate: false,
            },
            duration: 2.6,
            delay,
            repeat: -1,
            ease: "none",
          },
        );
      });
    }, scope);

    return () => ctx.revert();
  }, [active]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <path id="sa-wp-path-left" d={pathLeft} />
        <path id="sa-wp-path-right" d={pathRight} />
      </defs>
      {/* Left riser — 4 staggered particles */}
      {[0, 0.65, 1.3, 1.95].map((d, i) => (
        <circle
          key={`l-${i}`}
          r={2.8}
          className="fill-[var(--accent-current)]"
          data-wp="true"
          data-wp-target="sa-wp-path-left"
          data-wp-delay={d}
          opacity={0}
        />
      ))}
      {/* Right riser — offset by half a cycle to desync */}
      {[0.33, 0.98, 1.63, 2.28].map((d, i) => (
        <circle
          key={`r-${i}`}
          r={2.8}
          className="fill-[var(--accent-current)]"
          data-wp="true"
          data-wp-target="sa-wp-path-right"
          data-wp-delay={d}
          opacity={0}
        />
      ))}
    </svg>
  );
}
