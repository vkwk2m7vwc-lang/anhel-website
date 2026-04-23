"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SceneFrame } from "../SceneFrame";
import { scenarioCScenes } from "@/content/products/firefighting-scenario-c";

/**
 * Scene 05 — "Ороситель открывается".
 *
 * REDESIGN NOTE
 * ─────────────
 * The original plan called for "a fan of drops" from an opening
 * sprinkler. Drawn literally in SVG, discrete droplets tend to read
 * cartoonish (shower-emoji / Pixar rain territory). To keep the scene
 * cinematic we replaced that with:
 *
 *   1. A macro-scale section of the sprinkler head rendered in
 *      engineering-drawing line art (body, deflector, thermal link).
 *      The thermal link is drawn broken — the trigger event.
 *   2. Flow represented as a FAN OF HAIRLINE STREAKS (14 thin lines
 *      radiating downward in a 60° cone), not individual droplets.
 *      These animate by being "painted on" from top → bottom.
 *   3. A soft cone of mist behind the streaks — a radial gradient
 *      giving the frame a single "spotlight" of water.
 *
 * The net read is "pressurised release" without ever crossing into
 * animated-GIF rain.
 */
export function Scene05Flow() {
  const scene = scenarioCScenes[4];
  const prefersReduced = useReducedMotion();

  // Sprinkler head anchor (the deflector plane). Everything fans
  // outward from this point.
  const SX = 540;
  const SY = 220;

  // Streak config — 14 hairlines arranged across a 60° cone
  // (±30° from vertical). Length varies slightly so the cone doesn't
  // look like a barcode.
  const STREAK_COUNT = 14;
  const streaks = Array.from({ length: STREAK_COUNT }).map((_, i) => {
    const t = i / (STREAK_COUNT - 1); // 0..1 across cone width
    const angleDeg = -30 + t * 60;
    const rad = (angleDeg * Math.PI) / 180;
    const length = 280 + ((i * 37) % 60); // 280-340ish
    const endX = SX + Math.sin(rad) * length;
    const endY = SY + Math.cos(rad) * length;
    return {
      x1: SX,
      y1: SY,
      x2: endX,
      y2: endY,
      // Stagger each streak so the fan "fills in" over time.
      delay: (i * 0.08) % 1.4,
      duration: 1.4 + (i % 4) * 0.15,
    };
  });

  return (
    <SceneFrame scene={scene}>
      <svg
        viewBox="0 0 1080 620"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Cone-of-mist gradient — subtle brighter wedge behind the
              streaks. */}
          <radialGradient id="sc-spray-cone-05" cx="0.5" cy="0" r="0.7">
            <stop offset="0%" stopColor="var(--accent-current)" stopOpacity="0.35" />
            <stop offset="45%" stopColor="var(--accent-current)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent-current)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sc-streak-05" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-current)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--accent-current)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent-current)" stopOpacity="0" />
          </linearGradient>
          {/* Ceiling grid — a tight architectural tile so the sprinkler
              reads as "mounted below a suspended ceiling". */}
          <pattern id="sc-ceiling-05" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <rect width="48" height="48" fill="#0a0c10" />
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#14181f" strokeWidth={0.6} />
          </pattern>
        </defs>

        {/* Ceiling plane across the top of the frame */}
        <rect x={0} y={0} width={1080} height={140} fill="url(#sc-ceiling-05)" />
        {/* Ceiling–room boundary */}
        <line x1={0} y1={140} x2={1080} y2={140} stroke="#1e232c" strokeWidth={1.4} />
        {/* Room — deep dark gradient toward the floor */}
        <rect x={0} y={140} width={1080} height={480} fill="#05070a" />

        {/* Cone of mist — painted first so it sits behind the streaks
            and the sprinkler body. */}
        <motion.path
          d={`M ${SX} ${SY}
              L ${SX - 340 * Math.sin(Math.PI / 6)} ${SY + 340 * Math.cos(Math.PI / 6)}
              L ${SX + 340 * Math.sin(Math.PI / 6)} ${SY + 340 * Math.cos(Math.PI / 6)}
              Z`}
          fill="url(#sc-spray-cone-05)"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={
            prefersReduced
              ? { opacity: 0.7 }
              : { opacity: [0, 0.7, 0.6, 0.8, 0.7] }
          }
          transition={{
            duration: prefersReduced ? 0 : 3.2,
            times: prefersReduced ? undefined : [0, 0.35, 0.55, 0.75, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Streaks — each animates its draw length using pathLength.
            The streaks read as downward pressurised lines, not drops. */}
        <g strokeLinecap="round">
          {streaks.map((s, i) => (
            <motion.line
              key={i}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="url(#sc-streak-05)"
              strokeWidth={0.8}
              initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
              animate={
                prefersReduced
                  ? { pathLength: 1, opacity: 0.7 }
                  : {
                      pathLength: [0, 1, 1, 0],
                      opacity: [0, 0.85, 0.85, 0],
                    }
              }
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                times: [0, 0.25, 0.75, 1],
                ease: "easeOut",
              }}
            />
          ))}
        </g>

        {/* Sprinkler head — macro section. Drawn in thin steel strokes
            with no fills so it reads as engineering drawing. */}
        <g stroke="var(--color-steel-light)" strokeOpacity={0.85} strokeWidth={1} fill="none">
          {/* Connecting pipe coming DOWN from ceiling */}
          <line x1={SX} y1={80} x2={SX} y2={160} strokeWidth={2} />
          {/* Reducer/thread section — a short stepped cylinder */}
          <rect x={SX - 14} y={160} width={28} height={22} />
          <line x1={SX - 14} y1={166} x2={SX + 14} y2={166} strokeWidth={0.4} />
          <line x1={SX - 14} y1={172} x2={SX + 14} y2={172} strokeWidth={0.4} />
          <line x1={SX - 14} y1={178} x2={SX + 14} y2={178} strokeWidth={0.4} />
          {/* Body — a hex-ish frame */}
          <path
            d={`M ${SX - 22} ${182}
                L ${SX - 22} ${200}
                L ${SX - 14} ${210}
                L ${SX + 14} ${210}
                L ${SX + 22} ${200}
                L ${SX + 22} ${182}
                Z`}
          />
          {/* Frame arms down to deflector plane */}
          <line x1={SX - 18} y1={210} x2={SX - 22} y2={SY - 2} />
          <line x1={SX + 18} y1={210} x2={SX + 22} y2={SY - 2} />
          {/* Deflector — flat disk */}
          <line x1={SX - 30} y1={SY} x2={SX + 30} y2={SY} strokeWidth={1.6} />
          {/* Teeth on deflector (the little slots) */}
          {[-24, -16, -8, 0, 8, 16, 24].map((dx) => (
            <line key={dx} x1={SX + dx} y1={SY + 0.5} x2={SX + dx} y2={SY + 4} strokeWidth={0.6} />
          ))}
          {/* Broken thermal link — rendered as two short stubs with a
              tiny displaced gap. This is the trigger event. */}
          <line x1={SX - 5} y1={SY - 12} x2={SX - 2} y2={SY - 4} strokeWidth={1.1} />
          <line x1={SX + 4} y1={SY - 12} x2={SX + 2} y2={SY - 4} strokeWidth={1.1} />
          {/* Tiny fragment floating free (very subtle — sells "it just
              popped") */}
          {!prefersReduced && (
            <motion.line
              x1={SX - 4}
              y1={SY + 8}
              x2={SX - 2}
              y2={SY + 16}
              strokeWidth={0.8}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.8, 0.8, 0], y: [0, 14, 28, 42] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.15, 0.7, 1],
                repeatDelay: 1.4,
              }}
            />
          )}
        </g>

        {/* Mono spec stamp underneath — a quiet "84 л/мин · K80"
            reinforcing this is a real product, not an abstract vibe. */}
        <g opacity={0.55}>
          <line x1={SX + 44} y1={SY + 6} x2={SX + 90} y2={SY + 6} stroke="var(--color-steel-light)" strokeWidth={0.5} />
          <text
            x={SX + 96}
            y={SY + 9}
            className="font-mono"
            fill="var(--color-secondary)"
            opacity={0.6}
            style={{ fontSize: 10, letterSpacing: 1.4 }}
          >
            K80 · 84 Л/МИН
          </text>
        </g>

        {/* Dimension callout on the cone base (architectural flourish) */}
        <g opacity={0.35}>
          <line
            x1={SX - 340 * Math.sin(Math.PI / 6)}
            y1={SY + 340 * Math.cos(Math.PI / 6) + 16}
            x2={SX + 340 * Math.sin(Math.PI / 6)}
            y2={SY + 340 * Math.cos(Math.PI / 6) + 16}
            stroke="var(--color-steel-light)"
            strokeWidth={0.4}
          />
          <text
            x={SX}
            y={SY + 340 * Math.cos(Math.PI / 6) + 32}
            textAnchor="middle"
            className="font-mono"
            fill="var(--color-secondary)"
            opacity={0.55}
            style={{ fontSize: 9, letterSpacing: 1.4 }}
          >
            Ø 3,4 М · ЗОНА ПОКРЫТИЯ
          </text>
        </g>
      </svg>
    </SceneFrame>
  );
}
