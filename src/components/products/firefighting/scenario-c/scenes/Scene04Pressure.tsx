"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SceneFrame } from "../SceneFrame";
import { scenarioCScenes } from "@/content/products/firefighting-scenario-c";

/**
 * Scene 04 — "Давление в стояке".
 *
 * A macro vertical cross-section of a riser pipe occupies the centre
 * of the frame. Inside the cut-away section we see water columns
 * (thin vertical highlights) plus 14 particles drifting upward in
 * staggered trails — the pressure wave moving up the building. To the
 * right, a round analog manometer with a needle that sweeps from 0 to
 * ~9.4 bar when the scene enters view and stays there, with a small
 * residual wobble.
 *
 * No cartoon bubbles. Particles are hairline dots (r=1.2) and use a
 * blue accent so they read as "water under pressure", not "fire".
 */
export function Scene04Pressure() {
  const scene = scenarioCScenes[3];
  const prefersReduced = useReducedMotion();

  // Riser pipe geometry — a tall cylinder shown in section with cut
  // edges, positioned centre-left. Coordinates are in the 1080x620
  // viewBox.
  const PIPE_X = 380;
  const PIPE_W = 120;
  const PIPE_TOP = 60;
  const PIPE_BOT = 560;

  // Particles — (xOffset relative to pipe, startY above bottom)
  const particles = Array.from({ length: 14 }).map((_, i) => ({
    xOffset: 18 + (i * 17) % (PIPE_W - 36),
    startY: PIPE_BOT - ((i * 43) % (PIPE_BOT - PIPE_TOP - 40)),
    duration: 3.6 + (i % 4) * 0.4,
    delay: (i * 0.35) % 3.6,
  }));

  // Manometer — centre + radius; needle end angle maps from -135° (0)
  // to +135° (max), we land on ~+110° for 9.4/10 bar.
  const MAN_CX = 820;
  const MAN_CY = 310;
  const MAN_R = 120;
  const NEEDLE_FINAL_DEG = 110; // maps to ~9.4 bar on the gauge

  return (
    <SceneFrame scene={scene}>
      <svg
        viewBox="0 0 1080 620"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sc-riser-inner-04" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0c0f15" />
            <stop offset="35%" stopColor="#10151d" />
            <stop offset="50%" stopColor="#141b24" />
            <stop offset="65%" stopColor="#10151d" />
            <stop offset="100%" stopColor="#0c0f15" />
          </linearGradient>
          <linearGradient id="sc-water-sheen-04" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-current)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--accent-current)" stopOpacity="0.35" />
            <stop offset="70%" stopColor="var(--accent-current)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent-current)" stopOpacity="0" />
          </linearGradient>
          <clipPath id="sc-riser-clip-04">
            <rect
              x={PIPE_X + 6}
              y={PIPE_TOP + 6}
              width={PIPE_W - 12}
              height={PIPE_BOT - PIPE_TOP - 12}
              rx={3}
            />
          </clipPath>
        </defs>

        {/* Pipe outer shell */}
        <rect
          x={PIPE_X}
          y={PIPE_TOP}
          width={PIPE_W}
          height={PIPE_BOT - PIPE_TOP}
          rx={4}
          fill="none"
          stroke="var(--color-steel-light)"
          strokeOpacity={0.7}
          strokeWidth={1.2}
        />
        {/* Cut-away: inner bore */}
        <rect
          x={PIPE_X + 6}
          y={PIPE_TOP + 6}
          width={PIPE_W - 12}
          height={PIPE_BOT - PIPE_TOP - 12}
          rx={3}
          fill="url(#sc-riser-inner-04)"
        />
        {/* Vertical mid-line as interior highlight — reads as "column
            of water under sheen" without being literal. */}
        <rect
          x={PIPE_X + PIPE_W / 2 - 12}
          y={PIPE_TOP + 10}
          width={24}
          height={PIPE_BOT - PIPE_TOP - 20}
          fill="url(#sc-water-sheen-04)"
          opacity={0.55}
        />

        {/* Flange rings top and bottom */}
        {[PIPE_TOP - 12, PIPE_BOT - 18].map((y, i) => (
          <g key={i}>
            <rect
              x={PIPE_X - 10}
              y={y}
              width={PIPE_W + 20}
              height={14}
              fill="none"
              stroke="var(--color-steel-light)"
              strokeOpacity={0.6}
              strokeWidth={0.8}
            />
            {[-20, 0, 20, 40].map((dx, j) => (
              <circle
                key={j}
                cx={PIPE_X + PIPE_W / 2 + dx - 10}
                cy={y + 7}
                r={1.6}
                fill="var(--color-steel-light)"
                fillOpacity={0.55}
              />
            ))}
          </g>
        ))}

        {/* Floor-marker ticks to the left of the pipe — "33-й этаж",
            "22-й", "11-й", "подвал". Editorial detail, doesn't need
            to be read — just seen. */}
        {[
          { y: PIPE_TOP + 60, label: "33" },
          { y: PIPE_TOP + 180, label: "22" },
          { y: PIPE_TOP + 300, label: "11" },
          { y: PIPE_BOT - 30, label: "0" },
        ].map((row, i) => (
          <g key={i} opacity={0.55}>
            <line
              x1={PIPE_X - 60}
              y1={row.y}
              x2={PIPE_X - 14}
              y2={row.y}
              stroke="var(--color-steel-light)"
              strokeWidth={0.5}
            />
            <text
              x={PIPE_X - 68}
              y={row.y + 3}
              textAnchor="end"
              className="font-mono"
              fill="var(--color-secondary)"
              opacity={0.5}
              style={{ fontSize: 10, letterSpacing: 1.4 }}
            >
              {row.label}
            </text>
          </g>
        ))}

        {/* Particles inside the pipe — rising trails. */}
        <g clipPath="url(#sc-riser-clip-04)">
          {particles.map((p, i) => (
            <motion.circle
              key={i}
              cx={PIPE_X + p.xOffset}
              cy={p.startY}
              r={1.2}
              fill="var(--accent-current)"
              initial={
                prefersReduced ? false : { cy: p.startY, opacity: 0 }
              }
              animate={
                prefersReduced
                  ? { opacity: 0.5 }
                  : {
                      cy: [p.startY, PIPE_TOP + 20],
                      opacity: [0, 0.85, 0.85, 0],
                    }
              }
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.15, 0.85, 1],
              }}
            />
          ))}
        </g>

        {/* Manometer — circular dial with ticks and animated needle. */}
        <g>
          {/* Outer ring */}
          <circle
            cx={MAN_CX}
            cy={MAN_CY}
            r={MAN_R}
            fill="none"
            stroke="var(--color-steel-light)"
            strokeWidth={1.2}
            opacity={0.8}
          />
          <circle
            cx={MAN_CX}
            cy={MAN_CY}
            r={MAN_R - 6}
            fill="none"
            stroke="var(--color-steel-light)"
            strokeWidth={0.4}
            opacity={0.4}
          />
          {/* Major ticks 0..10 bar. Covers 270° arc from -135° to +135°. */}
          {Array.from({ length: 11 }).map((_, i) => {
            const t = i / 10;
            const a = -135 + t * 270;
            const rad = (a * Math.PI) / 180;
            // Tick runs from r-18 to r-6 along angle
            const x1 = MAN_CX + Math.cos(rad) * (MAN_R - 18);
            const y1 = MAN_CY + Math.sin(rad) * (MAN_R - 18);
            const x2 = MAN_CX + Math.cos(rad) * (MAN_R - 4);
            const y2 = MAN_CY + Math.sin(rad) * (MAN_R - 4);
            const lx = MAN_CX + Math.cos(rad) * (MAN_R - 30);
            const ly = MAN_CY + Math.sin(rad) * (MAN_R - 30);
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--color-steel-light)"
                  strokeWidth={i % 2 === 0 ? 1 : 0.5}
                  opacity={i % 2 === 0 ? 0.75 : 0.4}
                />
                {i % 2 === 0 && (
                  <text
                    x={lx}
                    y={ly + 3}
                    textAnchor="middle"
                    className="font-mono"
                    fill="var(--color-secondary)"
                    opacity={0.5}
                    style={{ fontSize: 9, letterSpacing: 0.5 }}
                  >
                    {i}
                  </text>
                )}
              </g>
            );
          })}
          {/* Label "бар" */}
          <text
            x={MAN_CX}
            y={MAN_CY + 30}
            textAnchor="middle"
            className="font-mono"
            fill="var(--color-secondary)"
            opacity={0.55}
            style={{ fontSize: 10, letterSpacing: 2 }}
          >
            БАР
          </text>
          {/* Red danger arc on last segment (8-10 bar) */}
          {(() => {
            const aStart = -135 + (8 / 10) * 270;
            const aEnd = -135 + (10 / 10) * 270;
            const r = MAN_R - 4;
            const sx = MAN_CX + Math.cos((aStart * Math.PI) / 180) * r;
            const sy = MAN_CY + Math.sin((aStart * Math.PI) / 180) * r;
            const ex = MAN_CX + Math.cos((aEnd * Math.PI) / 180) * r;
            const ey = MAN_CY + Math.sin((aEnd * Math.PI) / 180) * r;
            return (
              <path
                d={`M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`}
                fill="none"
                stroke="var(--accent-fire)"
                strokeWidth={2}
                opacity={0.55}
              />
            );
          })()}

          {/* Needle */}
          <motion.g
            style={{ transformOrigin: `${MAN_CX}px ${MAN_CY}px` }}
            initial={prefersReduced ? false : { rotate: -135 }}
            animate={
              prefersReduced
                ? { rotate: NEEDLE_FINAL_DEG }
                : { rotate: [-135, NEEDLE_FINAL_DEG, NEEDLE_FINAL_DEG - 4, NEEDLE_FINAL_DEG + 2, NEEDLE_FINAL_DEG] }
            }
            transition={{
              duration: prefersReduced ? 0 : 3.2,
              times: prefersReduced ? undefined : [0, 0.55, 0.72, 0.88, 1],
              ease: [0.16, 1, 0.3, 1],
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 2.8,
            }}
          >
            {/* Needle shaft — points RIGHT at angle 0 by default; we
                rotate around centre. */}
            <line
              x1={MAN_CX - 12}
              y1={MAN_CY}
              x2={MAN_CX + MAN_R - 22}
              y2={MAN_CY}
              stroke="var(--color-secondary)"
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          </motion.g>
          {/* Centre cap */}
          <circle
            cx={MAN_CX}
            cy={MAN_CY}
            r={6}
            fill="var(--color-primary)"
            stroke="var(--color-steel-light)"
            strokeWidth={1}
          />
          {/* Reading label above dial */}
          <text
            x={MAN_CX}
            y={MAN_CY - MAN_R - 16}
            textAnchor="middle"
            className="font-mono"
            fill="var(--color-secondary)"
            opacity={0.6}
            style={{ fontSize: 10, letterSpacing: 1.4 }}
          >
            P · СТОЯК · 9,4
          </text>
        </g>
      </svg>
    </SceneFrame>
  );
}
