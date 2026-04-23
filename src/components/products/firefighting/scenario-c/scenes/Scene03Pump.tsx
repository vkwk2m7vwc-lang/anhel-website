"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SceneFrame } from "../SceneFrame";
import { scenarioCScenes } from "@/content/products/firefighting-scenario-c";

/**
 * Scene 03 — "Насос запускается".
 *
 * The scene collapses to an architectural cross-section through the
 * pump housing. The frame is dark; the housing is drawn in thin
 * technical-grey strokes (no fills); inside, the impeller is a ring
 * with 7 backward-curved blades. The impeller rotates slowly (one
 * revolution per ~6s) — this is the moment of mechanical awakening,
 * not of operating speed. Running at real RPM would blur to nothing.
 *
 * A single small red status dot on the control panel blinks — THE
 * one warm colour carried over from scenes 1-2, now meaning "response
 * initiated" instead of "danger detected".
 *
 * Everything else (pipe flanges, bolts, coupling, motor body) is drawn
 * as technical line art so the frame reads as a page from an engineer's
 * notebook, not a render.
 */
export function Scene03Pump() {
  const scene = scenarioCScenes[2];
  const prefersReduced = useReducedMotion();

  // Impeller geometry — 7 blades around a common hub.
  const IMPELLER_CX = 540;
  const IMPELLER_CY = 310;
  const IMPELLER_R = 120;
  const HUB_R = 22;
  const BLADE_COUNT = 7;

  // Produce a smooth SVG-path backward-curved blade. Built in local
  // coordinates (relative to hub centre), the component rotates the
  // group as a whole.
  const bladePath = (() => {
    const r1 = HUB_R + 6;
    const r2 = IMPELLER_R - 6;
    // A gentle S-curve from inner to outer radius.
    return `M ${r1} 0 C ${r1 + 20} -6 ${r2 - 30} -18 ${r2} -32 L ${r2 - 2} -34 C ${r2 - 32} -20 ${r1 + 18} -8 ${r1 - 2} 2 Z`;
  })();

  return (
    <SceneFrame scene={scene}>
      <svg
        viewBox="0 0 1080 620"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="sc-pump-glow-03" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="#c0c8d0" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#c0c8d0" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#c0c8d0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sc-status-dot-03" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--accent-fire)" stopOpacity="1" />
            <stop offset="60%" stopColor="var(--accent-fire)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent-fire)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint halo around the pump so the eye lands on it. */}
        <ellipse
          cx={540}
          cy={320}
          rx={340}
          ry={260}
          fill="url(#sc-pump-glow-03)"
        />

        {/* Motor body (right of impeller) — a rectangular mass with
            cooling fins rendered as vertical ticks. */}
        <g stroke="var(--color-steel-light)" strokeWidth={0.8} fill="none" opacity={0.7}>
          <rect x={700} y={250} width={180} height={130} rx={4} />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1={720 + i * 18} y1={260} x2={720 + i * 18} y2={370} strokeWidth={0.5} />
          ))}
          <rect x={708} y={280} width={164} height={12} strokeWidth={0.5} />
          <rect x={708} y={340} width={164} height={12} strokeWidth={0.5} />
          <text
            x={790}
            y={410}
            textAnchor="middle"
            className="font-mono"
            fill="var(--color-secondary)"
            opacity={0.35}
            style={{ fontSize: 10, letterSpacing: 1.5 }}
          >
            MOTOR · 55 kW
          </text>
        </g>

        {/* Coupling between motor shaft and pump */}
        <g stroke="var(--color-steel-light)" strokeWidth={0.8} fill="none" opacity={0.6}>
          <rect x={660} y={296} width={40} height={38} />
          <line x1={660} y1={315} x2={700} y2={315} />
        </g>

        {/* Pump housing (volute) — a circle with a tangential spiral
            exit and flanged ports. */}
        <g stroke="var(--color-steel-light)" strokeWidth={1} fill="none" opacity={0.8}>
          {/* Outer housing wall — slightly offset from impeller to
              show the volute shape. */}
          <path
            d={`M ${IMPELLER_CX - IMPELLER_R - 18} ${IMPELLER_CY}
                A ${IMPELLER_R + 18} ${IMPELLER_R + 22} 0 1 1 ${IMPELLER_CX + IMPELLER_R + 28} ${IMPELLER_CY - 6}
                L ${IMPELLER_CX + IMPELLER_R + 50} ${IMPELLER_CY - 30}
                L ${IMPELLER_CX + IMPELLER_R + 82} ${IMPELLER_CY - 30}
                L ${IMPELLER_CX + IMPELLER_R + 82} ${IMPELLER_CY + 18}
                L ${IMPELLER_CX + IMPELLER_R + 28} ${IMPELLER_CY + 18}
                A ${IMPELLER_R + 18} ${IMPELLER_R + 22} 0 0 1 ${IMPELLER_CX - IMPELLER_R - 18} ${IMPELLER_CY}
                Z`}
          />
          {/* Suction flange (top) */}
          <rect x={IMPELLER_CX - 26} y={IMPELLER_CY - IMPELLER_R - 46} width={52} height={22} />
          <line x1={IMPELLER_CX - 32} y1={IMPELLER_CY - IMPELLER_R - 24} x2={IMPELLER_CX + 32} y2={IMPELLER_CY - IMPELLER_R - 24} strokeWidth={0.5} />
          {/* Flange bolts as dots */}
          {[-18, 0, 18].map((dx) => (
            <circle key={dx} cx={IMPELLER_CX + dx} cy={IMPELLER_CY - IMPELLER_R - 35} r={1.6} fill="var(--color-steel-light)" fillOpacity={0.6} />
          ))}
          {/* Discharge flange bolts */}
          {[-10, 8].map((dy) => (
            <circle key={dy} cx={IMPELLER_CX + IMPELLER_R + 72} cy={IMPELLER_CY - 6 + dy} r={1.6} fill="var(--color-steel-light)" fillOpacity={0.6} />
          ))}
          {/* Baseplate */}
          <line x1={IMPELLER_CX - 180} y1={IMPELLER_CY + IMPELLER_R + 40} x2={IMPELLER_CX + 360} y2={IMPELLER_CY + IMPELLER_R + 40} strokeWidth={0.6} />
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={i}
              x1={IMPELLER_CX - 180 + i * 40}
              y1={IMPELLER_CY + IMPELLER_R + 40}
              x2={IMPELLER_CX - 186 + i * 40}
              y2={IMPELLER_CY + IMPELLER_R + 52}
              strokeWidth={0.4}
              opacity={0.5}
            />
          ))}
        </g>

        {/* The rotating impeller group. Transform-origin anchored to
            the impeller centre so rotation spins in place. */}
        <motion.g
          style={{ transformOrigin: `${IMPELLER_CX}px ${IMPELLER_CY}px` }}
          initial={prefersReduced ? false : { rotate: 0 }}
          animate={prefersReduced ? { rotate: 0 } : { rotate: 360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Rim */}
          <circle
            cx={IMPELLER_CX}
            cy={IMPELLER_CY}
            r={IMPELLER_R}
            fill="none"
            stroke="var(--color-steel-light)"
            strokeWidth={0.8}
            opacity={0.5}
          />
          {/* Inner rim */}
          <circle
            cx={IMPELLER_CX}
            cy={IMPELLER_CY}
            r={IMPELLER_R - 10}
            fill="none"
            stroke="var(--color-steel-light)"
            strokeWidth={0.4}
            opacity={0.35}
          />
          {/* Blades — draw 7 copies of the same path, each rotated. */}
          {Array.from({ length: BLADE_COUNT }).map((_, i) => {
            const angle = (360 / BLADE_COUNT) * i;
            return (
              <g
                key={i}
                transform={`translate(${IMPELLER_CX} ${IMPELLER_CY}) rotate(${angle})`}
              >
                <path
                  d={bladePath}
                  fill="var(--color-steel-light)"
                  fillOpacity={0.08}
                  stroke="var(--color-steel-light)"
                  strokeWidth={0.8}
                  strokeLinejoin="round"
                  opacity={0.85}
                />
              </g>
            );
          })}
          {/* Hub */}
          <circle
            cx={IMPELLER_CX}
            cy={IMPELLER_CY}
            r={HUB_R}
            fill="var(--color-primary)"
            stroke="var(--color-steel-light)"
            strokeWidth={1}
          />
          {/* Keyway slit on hub (just a line — shows rotation obviously) */}
          <line
            x1={IMPELLER_CX + HUB_R - 6}
            y1={IMPELLER_CY}
            x2={IMPELLER_CX + HUB_R + 2}
            y2={IMPELLER_CY}
            stroke="var(--color-steel-light)"
            strokeWidth={1}
          />
        </motion.g>

        {/* Control panel label (bottom-left) with the blinking status
            dot — the one warm element in the frame. */}
        <g transform="translate(180 450)">
          <rect
            x={0}
            y={0}
            width={180}
            height={60}
            fill="none"
            stroke="var(--color-steel-light)"
            strokeOpacity={0.5}
            strokeWidth={0.8}
          />
          <text
            x={14}
            y={22}
            className="font-mono"
            fill="var(--color-secondary)"
            opacity={0.55}
            style={{ fontSize: 10, letterSpacing: 1.4 }}
          >
            ЗАПУСК
          </text>
          <text
            x={14}
            y={44}
            className="font-mono"
            fill="var(--color-secondary)"
            opacity={0.35}
            style={{ fontSize: 9, letterSpacing: 1.2 }}
          >
            0 → 2950 RPM
          </text>
          {/* Halo + dot */}
          <motion.circle
            cx={150}
            cy={30}
            r={14}
            fill="url(#sc-status-dot-03)"
            initial={prefersReduced ? false : { opacity: 0.4 }}
            animate={
              prefersReduced
                ? { opacity: 0.6 }
                : { opacity: [0.3, 0.75, 0.3] }
            }
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx={150}
            cy={30}
            r={3.2}
            fill="var(--accent-fire)"
            initial={prefersReduced ? false : { opacity: 0.7 }}
            animate={
              prefersReduced
                ? { opacity: 0.9 }
                : { opacity: [0.65, 1, 0.65] }
            }
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* Tiny dimension lines — classic engineering-drawing flourish
            that reinforces "this is a section, not a photo". */}
        <g stroke="var(--color-steel-light)" strokeWidth={0.4} opacity={0.35} fill="none">
          <line x1={IMPELLER_CX - IMPELLER_R} y1={IMPELLER_CY + IMPELLER_R + 20} x2={IMPELLER_CX + IMPELLER_R} y2={IMPELLER_CY + IMPELLER_R + 20} />
          <line x1={IMPELLER_CX - IMPELLER_R} y1={IMPELLER_CY + IMPELLER_R + 14} x2={IMPELLER_CX - IMPELLER_R} y2={IMPELLER_CY + IMPELLER_R + 26} />
          <line x1={IMPELLER_CX + IMPELLER_R} y1={IMPELLER_CY + IMPELLER_R + 14} x2={IMPELLER_CX + IMPELLER_R} y2={IMPELLER_CY + IMPELLER_R + 26} />
          <text
            x={IMPELLER_CX}
            y={IMPELLER_CY + IMPELLER_R + 36}
            textAnchor="middle"
            fill="var(--color-secondary)"
            opacity={0.5}
            className="font-mono"
            style={{ fontSize: 9, letterSpacing: 1.2 }}
          >
            Ø 240
          </text>
        </g>
      </svg>
    </SceneFrame>
  );
}
