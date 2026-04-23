"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SCENE_GEOMETRY } from "./SkyscraperSVG";

/**
 * Thin rising smoke plume above the fire source.
 *
 * Rendered as a second SVG overlaying the SkyscraperSVG — same viewBox
 * and coordinate space (SCENE_GEOMETRY), absolutely positioned on top.
 * Keeping it in its own SVG means the main diagram stays a pure,
 * server-safe geometry primitive; all the animation lives here.
 *
 * Visual target: a faint, vertical blurred streak with three offset
 * tendrils that breathe. NOT cartoon puffs, NOT rising particles —
 * think candlewick smoke in a dark room. Enough to say "this floor is
 * on fire" without dragging the composition into comic-book territory.
 *
 * The whole group fades in only when its `active` prop is true (i.e.
 * step 0 "Возгорание"); after step 0 we keep it at ~40% so the viewer
 * still reads the fire source as the narrative reference through the
 * rest of the scroll.
 */
export function SmokePlume({ active }: { active: boolean }) {
  const prefersReduced = usePrefersReducedMotion();
  const { viewBox, fireSprinkler, roofY } = SCENE_GEOMETRY;
  const sx = fireSprinkler.x;
  const sy = fireSprinkler.y - 4; // start just above the sprinkler head

  // Each tendril is a cubic bezier that snakes upward into the cloud
  // zone. Small left/right jitter in the control points gives the
  // tendrils distinct silhouettes — otherwise they stack identically
  // and read as a single blob.
  const top = roofY - 20;
  const tendrils = [
    // [id, stroke opacity, horizontal drift, control-point sway]
    { d: `M ${sx} ${sy} C ${sx - 6} ${sy - 60}, ${sx + 8} ${sy - 140}, ${sx - 4} ${top}`, delay: 0.0, opacity: 0.22 },
    { d: `M ${sx + 2} ${sy} C ${sx + 10} ${sy - 70}, ${sx - 6} ${sy - 150}, ${sx + 8} ${top - 10}`, delay: 0.6, opacity: 0.16 },
    { d: `M ${sx - 2} ${sy} C ${sx - 12} ${sy - 80}, ${sx + 4} ${sy - 160}, ${sx - 10} ${top + 6}`, delay: 1.2, opacity: 0.13 },
  ];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Re-declare the blur filter — SVG filters don't cross <svg>
            boundaries, so we can't re-use the one defined in
            SkyscraperSVG. */}
        <filter id="sa-smoke-plume-blur" x="-40%" y="-10%" width="180%" height="120%">
          <feGaussianBlur stdDeviation="3.4" />
        </filter>
      </defs>

      <motion.g
        filter="url(#sa-smoke-plume-blur)"
        initial={false}
        animate={{ opacity: active ? 1 : 0.45 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {tendrils.map((t, i) => (
          <motion.path
            key={i}
            d={t.d}
            stroke="#E8E8E8"
            strokeWidth={2}
            fill="none"
            opacity={t.opacity}
            animate={
              prefersReduced
                ? undefined
                : {
                    // Breathing motion — slight vertical drift + opacity
                    // modulation. Loops forever; staggered delays keep
                    // the three tendrils visually uncoupled.
                    y: [0, -4, 0],
                    opacity: [t.opacity, t.opacity * 1.4, t.opacity * 0.7, t.opacity],
                  }
            }
            transition={
              prefersReduced
                ? undefined
                : {
                    duration: 5.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: t.delay,
                  }
            }
          />
        ))}
      </motion.g>
    </svg>
  );
}
