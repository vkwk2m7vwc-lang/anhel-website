"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SceneFrame } from "../SceneFrame";
import { scenarioCScenes } from "@/content/products/firefighting-scenario-c";

/**
 * Scene 02 — "Первый отблеск".
 *
 * We zoom in tight — the frame is dominated by a single window at
 * architectural scale. Inside the window: a breathing orange core, and
 * a slow upward drift of five ember points. A very faint vertical
 * "signal wave" on the left edge represents the heat rising inside the
 * riser shaft behind the wall (foreshadowing Scene 03).
 *
 * Ember motion is intentionally slow (4–6s vertical drift) and points
 * are small (r=1.4). Any larger or faster and it tips into cartoon.
 */
export function Scene02Spark() {
  const scene = scenarioCScenes[1];
  const prefersReduced = useReducedMotion();

  // Five ember positions inside the window opening. X jitter, y
  // starting low so they have room to rise.
  const embers = [
    { x: 500, yStart: 340, yEnd: 180, duration: 5.2, delay: 0 },
    { x: 540, yStart: 350, yEnd: 170, duration: 4.6, delay: 0.8 },
    { x: 560, yStart: 345, yEnd: 190, duration: 6.0, delay: 1.6 },
    { x: 520, yStart: 355, yEnd: 200, duration: 5.8, delay: 2.4 },
    { x: 545, yStart: 360, yEnd: 175, duration: 5.0, delay: 3.2 },
  ];

  return (
    <SceneFrame scene={scene}>
      <svg
        viewBox="0 0 1080 620"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sc-facade-02" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0c10" />
            <stop offset="100%" stopColor="#05070a" />
          </linearGradient>
          <radialGradient id="sc-ember-glow-02" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--accent-current)" stopOpacity="0.85" />
            <stop offset="55%" stopColor="var(--accent-current)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent-current)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sc-window-fill-02" cx="0.5" cy="0.7" r="0.7">
            <stop offset="0%" stopColor="var(--accent-current)" stopOpacity="0.95" />
            <stop offset="50%" stopColor="var(--accent-current)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent-current)" stopOpacity="0.15" />
          </radialGradient>
          <clipPath id="sc-window-clip-02">
            <rect x="440" y="180" width="200" height="220" rx="2" />
          </clipPath>
        </defs>

        {/* Full-frame facade wall — adjacent window cells at reduced
            opacity so we read WHICH building this is without competing
            with the subject window. */}
        <rect width="1080" height="620" fill="url(#sc-facade-02)" />

        {/* Neighbour windows (dim) */}
        {[
          { x: 140, y: 160 },
          { x: 140, y: 420 },
          { x: 280, y: 80 },
          { x: 280, y: 460 },
          { x: 740, y: 160 },
          { x: 740, y: 420 },
          { x: 880, y: 80 },
          { x: 880, y: 460 },
        ].map((w, i) => (
          <rect
            key={i}
            x={w.x}
            y={w.y}
            width={90}
            height={80}
            fill="#0e1117"
            stroke="#14181f"
            strokeWidth={0.5}
          />
        ))}

        {/* Mullions between the subject and its neighbours */}
        <line x1="400" y1="80" x2="400" y2="540" stroke="#14181f" strokeWidth={0.8} />
        <line x1="680" y1="80" x2="680" y2="540" stroke="#14181f" strokeWidth={0.8} />

        {/* Heat halo behind the subject window — a larger soft blur.
            This sells "the room is lit from inside" at scale. */}
        <motion.rect
          x={340}
          y={80}
          width={400}
          height={420}
          fill="url(#sc-ember-glow-02)"
          initial={prefersReduced ? false : { opacity: 0.35 }}
          animate={
            prefersReduced
              ? { opacity: 0.45 }
              : { opacity: [0.3, 0.55, 0.35] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* The subject window frame (two panes) */}
        <rect
          x="440"
          y="180"
          width="200"
          height="220"
          rx="2"
          fill="#05070a"
          stroke="#1a1e26"
          strokeWidth={1}
        />
        {/* Interior fill — the warm glow */}
        <motion.rect
          x="442"
          y="182"
          width="196"
          height="216"
          rx="1"
          fill="url(#sc-window-fill-02)"
          initial={prefersReduced ? false : { opacity: 0.7 }}
          animate={
            prefersReduced
              ? { opacity: 0.85 }
              : { opacity: [0.72, 0.95, 0.72] }
          }
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Middle mullion */}
        <line x1="540" y1="184" x2="540" y2="398" stroke="#05070a" strokeWidth={2} />
        <line x1="442" y1="290" x2="638" y2="290" stroke="#05070a" strokeWidth={1} />

        {/* Rising embers (clipped to the window interior) */}
        <g clipPath="url(#sc-window-clip-02)">
          {embers.map((e, i) => (
            <motion.circle
              key={i}
              cx={e.x}
              cy={e.yStart}
              r={1.4}
              fill="var(--accent-current)"
              initial={prefersReduced ? false : { opacity: 0, cy: e.yStart }}
              animate={
                prefersReduced
                  ? { opacity: 0.6 }
                  : {
                      opacity: [0, 0.9, 0.9, 0],
                      cy: [e.yStart, e.yEnd, e.yEnd - 20, e.yEnd - 40],
                    }
              }
              transition={{
                duration: e.duration,
                delay: e.delay,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.2, 0.7, 1],
              }}
            />
          ))}
        </g>

        {/* Signal wave — the thin dashed riser hint on the left edge of
            the frame. Nearly invisible, only reads if you're already
            looking. This is the "thermal detector sees it" beat. */}
        <g opacity={0.4}>
          <line
            x1="80"
            y1="100"
            x2="80"
            y2="540"
            stroke="var(--accent-current)"
            strokeWidth={0.6}
            strokeDasharray="2 6"
          />
          {!prefersReduced && (
            <motion.circle
              cx={80}
              cy={540}
              r={2}
              fill="var(--accent-current)"
              initial={{ cy: 540, opacity: 0 }}
              animate={{ cy: 100, opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.15, 0.8, 1],
              }}
            />
          )}
        </g>
      </svg>
    </SceneFrame>
  );
}
