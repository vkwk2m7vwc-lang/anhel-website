"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SceneFrame } from "../SceneFrame";
import { scenarioCScenes } from "@/content/products/firefighting-scenario-c";

/**
 * Scene 01 — "Здание спит".
 *
 * A night-time wide shot of a tower, drawn in three planes of silhouette
 * to suggest atmospheric depth:
 *
 *   1. Back plane — a sparse skyline (low opacity, no detail)
 *   2. Mid plane  — the main tower (our subject), fully silhouetted
 *   3. Fore plane — a soft horizon line + a few dark foreground shapes
 *
 * The only light in the entire frame is ONE window on the tower — a tiny
 * warm-orange rectangle that "breathes" in opacity (1.4s loop, gentle).
 * This is the hook: everything is asleep except one point of heat.
 *
 * Deliberately no cinematic grading, no moon, no stars. Less is more —
 * the silence reads loudest when the frame is almost empty.
 */
export function Scene01Silence() {
  const scene = scenarioCScenes[0];
  const prefersReduced = useReducedMotion();

  return (
    <SceneFrame scene={scene}>
      <svg
        viewBox="0 0 1080 620"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Night gradient wash — a cold vertical gradient so the bottom
            reads as a slightly brighter horizon haze. */}
        <defs>
          <linearGradient id="sc-sky-01" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050608" />
            <stop offset="70%" stopColor="#0a0c10" />
            <stop offset="100%" stopColor="#10141a" />
          </linearGradient>
          <radialGradient id="sc-window-glow-01" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--accent-current)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--accent-current)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent-current)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1080" height="620" fill="url(#sc-sky-01)" />

        {/* Back-plane distant skyline — short, low-contrast strokes.
            Just enough to break the horizon so the subject doesn't
            feel posed against a void. */}
        <g opacity={0.35}>
          <rect x="20"  y="410" width="60"  height="120" fill="#141820" />
          <rect x="90"  y="430" width="42"  height="100" fill="#11151c" />
          <rect x="140" y="400" width="80"  height="130" fill="#161a22" />
          <rect x="230" y="425" width="54"  height="105" fill="#121620" />
          <rect x="860" y="420" width="58"  height="110" fill="#121620" />
          <rect x="930" y="395" width="76"  height="135" fill="#141820" />
          <rect x="1015" y="430" width="46"  height="100" fill="#11151c" />
        </g>

        {/* Mid-plane — the subject tower. A single tall slab with a
            column of window cells rendered at low opacity (unlit). The
            one lit window is painted LATER, on top, so its warmth is
            unambiguous. */}
        {(() => {
          const TX = 420; // tower x
          const TY = 180; // tower top
          const TW = 240; // tower width
          const TH = 360; // tower height
          const COLS = 6;
          const ROWS = 12;
          const MARGIN = 24;
          const CELL_W = (TW - MARGIN * 2) / COLS;
          const CELL_H = (TH - MARGIN * 2) / ROWS;
          const WIN_W = CELL_W * 0.65;
          const WIN_H = CELL_H * 0.5;

          // Pick the one lit window — near the top third, off-centre
          // so it feels observed rather than symmetrical.
          const LIT_COL = 3;
          const LIT_ROW = 4;

          const windows: { x: number; y: number; lit: boolean }[] = [];
          for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              const x = TX + MARGIN + c * CELL_W + (CELL_W - WIN_W) / 2;
              const y = TY + MARGIN + r * CELL_H + (CELL_H - WIN_H) / 2;
              windows.push({ x, y, lit: c === LIT_COL && r === LIT_ROW });
            }
          }

          const litWin = windows.find((w) => w.lit)!;

          return (
            <>
              {/* Tower mass */}
              <rect
                x={TX}
                y={TY}
                width={TW}
                height={TH}
                fill="#0c0e13"
                stroke="#1a1e26"
                strokeWidth={1}
              />
              {/* Vertical mullion — single architectural line to give
                  the slab some character without overdesigning. */}
              <line
                x1={TX + TW / 2}
                y1={TY + 8}
                x2={TX + TW / 2}
                y2={TY + TH - 8}
                stroke="#1a1e26"
                strokeWidth={0.5}
              />
              {/* Unlit window cells */}
              {windows.map((w, i) =>
                w.lit ? null : (
                  <rect
                    key={i}
                    x={w.x}
                    y={w.y}
                    width={WIN_W}
                    height={WIN_H}
                    fill="#15191f"
                    opacity={0.6}
                  />
                ),
              )}
              {/* Halo behind lit window */}
              <motion.circle
                cx={litWin.x + WIN_W / 2}
                cy={litWin.y + WIN_H / 2}
                r={46}
                fill="url(#sc-window-glow-01)"
                initial={prefersReduced ? false : { opacity: 0.6 }}
                animate={
                  prefersReduced
                    ? { opacity: 0.7 }
                    : { opacity: [0.55, 0.85, 0.55] }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Lit window itself — solid warm fill, subtle breathing */}
              <motion.rect
                x={litWin.x}
                y={litWin.y}
                width={WIN_W}
                height={WIN_H}
                fill="var(--accent-current)"
                initial={prefersReduced ? false : { opacity: 0.65 }}
                animate={
                  prefersReduced
                    ? { opacity: 0.8 }
                    : { opacity: [0.7, 0.95, 0.7] }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Roof crown — a tiny cap so the silhouette doesn't look
                  like a cardboard box. */}
              <rect x={TX + 8} y={TY - 10} width={TW - 16} height={10} fill="#0c0e13" />
              <line
                x1={TX + TW / 2}
                y1={TY - 10}
                x2={TX + TW / 2}
                y2={TY - 56}
                stroke="#11151c"
                strokeWidth={2}
              />
              <circle cx={TX + TW / 2} cy={TY - 58} r={2} fill="#222833" />
            </>
          );
        })()}

        {/* Foreground horizon line — a thin desaturated band so the
            subject sits IN a city rather than floating above one. */}
        <line
          x1="0"
          y1="540"
          x2="1080"
          y2="540"
          stroke="#1a1e26"
          strokeWidth={0.6}
        />
        <rect x="0" y="540" width="1080" height="80" fill="#06080b" />
      </svg>
    </SceneFrame>
  );
}
