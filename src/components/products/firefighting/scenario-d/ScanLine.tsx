"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SCENARIO_D_VIEWBOX } from "@/content/products/firefighting-scenario-d";

/**
 * Scan line — a horizontal cyan beam that sweeps top-to-bottom across
 * the elevation on a long loop (~10s one way, 10s back). The scan is
 * the mechanism that "reveals" components: as it passes a node, the
 * node's local glow intensifies (handled inside XraySection via the
 * shared `scanY` state).
 *
 * Rendered as a separate full-size SVG overlaid on the x-ray so we can
 * animate motion-y without provoking re-render storms in the main
 * drawing. We emit the current normalised Y (0..1) via the onProgress
 * callback so sibling components can react.
 */

type Props = {
  onProgress: (y: number) => void;
};

const W = SCENARIO_D_VIEWBOX.w;
const H = SCENARIO_D_VIEWBOX.h;

export function ScanLine({ onProgress }: Props) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    // Draw a static centreline — still communicates "this is a scan
    // plane" but without motion.
    return (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <line
          x1={40}
          y1={H / 2}
          x2={W - 40}
          y2={H / 2}
          stroke="var(--accent-current)"
          strokeOpacity={0.4}
          strokeWidth={0.8}
          strokeDasharray="6 6"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sd-scan-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-current)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent-current)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent-current)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* A group animates Y; the band + line move together */}
      <motion.g
        initial={{ y: 60 }}
        animate={{ y: [60, H - 80, 60] }}
        transition={{
          duration: 14,
          ease: "linear",
          repeat: Infinity,
        }}
        onUpdate={(latest) => {
          const raw = latest.y as number;
          onProgress(raw / H);
        }}
      >
        {/* Soft band (visual body of the scan) */}
        <rect
          x={40}
          y={-24}
          width={W - 80}
          height={48}
          fill="url(#sd-scan-band)"
        />
        {/* Centre hairline */}
        <line
          x1={40}
          y1={0}
          x2={W - 40}
          y2={0}
          stroke="var(--accent-current)"
          strokeOpacity={0.7}
          strokeWidth={0.6}
        />
        {/* Leading edge tick */}
        <line
          x1={40}
          y1={0}
          x2={60}
          y2={0}
          stroke="var(--accent-current)"
          strokeWidth={1.2}
        />
        <line
          x1={W - 60}
          y1={0}
          x2={W - 40}
          y2={0}
          stroke="var(--accent-current)"
          strokeWidth={1.2}
        />
      </motion.g>
    </svg>
  );
}
