"use client";

import { motion } from "framer-motion";
import {
  SCENARIO_D_VIEWBOX,
  scenarioDComponents,
  scenarioDFireTarget,
  type ScenarioDComponent,
} from "@/content/products/firefighting-scenario-d";

/**
 * X-ray elevation of the building + firefighting system.
 *
 * Rendered as a pure line drawing on a dark field. Three visual strata:
 *
 *   1. Architecture layer — building outline, floor plates, roof parapet,
 *      staircase, ground line. Drawn in steel-light hairlines at 0.4–0.8px.
 *   2. Plumbing layer — main intake, riser stack, manifold header, roof
 *      tank, spurs to sample floors. Drawn in accent-current (cyan) at
 *      ~1px, slightly brighter than architecture.
 *   3. Equipment layer — pumps, valves, sensors, sprinkler. Drawn as
 *      kind-specific glyphs, filled with the background colour and
 *      stroked at 1px so they "float" above pipes on the drawing.
 *
 * The three layers can be toggled on/off via `visible.*` props — we
 * wrap each cluster in a <g> with opacity transitions so turning a
 * layer off fades rather than pops.
 *
 * Coordinates use the exported viewBox so annotations and scan line
 * resolve to the same coordinate system.
 */

type Props = {
  visible: {
    architecture: boolean;
    plumbing: boolean;
    equipment: boolean;
  };
  /** Which component (if any) is currently "hot" from the scan pass. */
  highlightedId: string | null;
  /**
   * Normalised Y position of the scan (0..1). Used for the local glow
   * emitted by components when the scan crosses them.
   */
  scanY: number;
};

const W = SCENARIO_D_VIEWBOX.w;
const H = SCENARIO_D_VIEWBOX.h;

/** Building mass — inset from the viewBox so annotations have room. */
const B = {
  x: 230,
  y: 90,
  w: 400,
  h: 560,
};

const FLOOR_COUNT = 14; // abstract — building is "about 33 floors" in meta
const FLOOR_H = B.h / FLOOR_COUNT;

export function XraySection({ visible, highlightedId, scanY }: Props) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        {/* Subtle dot grid — an x-ray plate texture. */}
        <pattern id="sd-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx={1} cy={1} r={0.5} fill="var(--color-secondary)" fillOpacity={0.08} />
        </pattern>
        {/* Glow for the fire target and active components. */}
        <radialGradient id="sd-target-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--accent-fire)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="var(--accent-fire)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--accent-fire)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sd-scan-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--accent-current)" stopOpacity="0.7" />
          <stop offset="60%" stopColor="var(--accent-current)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent-current)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dotted grid background */}
      <rect x={0} y={0} width={W} height={H} fill="url(#sd-dots)" />

      {/* Corner registration marks — little L-brackets in each corner,
          very much a blueprint/x-ray touch. */}
      <g stroke="var(--color-secondary)" strokeOpacity={0.25} strokeWidth={0.6} fill="none">
        {[
          { x: 32, y: 32, rot: 0 },
          { x: W - 32, y: 32, rot: 90 },
          { x: W - 32, y: H - 32, rot: 180 },
          { x: 32, y: H - 32, rot: 270 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.rot})`}>
            <line x1={0} y1={0} x2={18} y2={0} />
            <line x1={0} y1={0} x2={0} y2={18} />
          </g>
        ))}
      </g>

      {/* Project stamp — top-right "SECTION A-A" flourish */}
      <g opacity={0.45}>
        <text
          x={W - 48}
          y={60}
          textAnchor="end"
          className="font-mono"
          fill="var(--color-secondary)"
          style={{ fontSize: 10, letterSpacing: 2 }}
        >
          SECTION A-A · SPB 2026
        </text>
        <line x1={W - 260} y1={70} x2={W - 48} y2={70} stroke="var(--color-secondary)" strokeOpacity={0.5} strokeWidth={0.4} />
      </g>

      {/* ─────────────────────── ARCHITECTURE LAYER ─────────────────────── */}
      <motion.g
        animate={{ opacity: visible.architecture ? 1 : 0.1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ground line across the full width */}
        <line
          x1={40}
          y1={B.y + B.h}
          x2={W - 40}
          y2={B.y + B.h}
          stroke="var(--color-steel-light)"
          strokeOpacity={0.55}
          strokeWidth={0.8}
        />
        {/* Ground hatching on the street side */}
        {Array.from({ length: 22 }).map((_, i) => (
          <line
            key={i}
            x1={40 + i * 12}
            y1={B.y + B.h + 2}
            x2={34 + i * 12}
            y2={B.y + B.h + 12}
            stroke="var(--color-steel-light)"
            strokeOpacity={0.35}
            strokeWidth={0.4}
          />
        ))}

        {/* Building outline */}
        <rect
          x={B.x}
          y={B.y}
          width={B.w}
          height={B.h}
          fill="none"
          stroke="var(--color-steel-light)"
          strokeOpacity={0.7}
          strokeWidth={0.9}
        />
        {/* Subterranean basement — shown below ground line with dashed
            strokes to imply "unseen" level for the pump room. */}
        <rect
          x={B.x - 40}
          y={B.y + B.h}
          width={B.w + 80}
          height={80}
          fill="none"
          stroke="var(--color-steel-light)"
          strokeOpacity={0.5}
          strokeWidth={0.6}
          strokeDasharray="4 4"
        />
        {/* Floor plates */}
        {Array.from({ length: FLOOR_COUNT - 1 }).map((_, i) => {
          const y = B.y + (i + 1) * FLOOR_H;
          return (
            <line
              key={i}
              x1={B.x}
              y1={y}
              x2={B.x + B.w}
              y2={y}
              stroke="var(--color-steel-light)"
              strokeOpacity={0.2}
              strokeWidth={0.4}
            />
          );
        })}
        {/* Every 4th floor emphasised — reads as "structural level" */}
        {[3, 7, 11].map((i) => (
          <line
            key={i}
            x1={B.x}
            y1={B.y + (i + 1) * FLOOR_H}
            x2={B.x + B.w}
            y2={B.y + (i + 1) * FLOOR_H}
            stroke="var(--color-steel-light)"
            strokeOpacity={0.5}
            strokeWidth={0.6}
          />
        ))}

        {/* Staircase core — a thin vertical stripe on the left side of
            the building. Gives the section some interior geometry. */}
        <rect
          x={B.x + 40}
          y={B.y}
          width={32}
          height={B.h}
          fill="none"
          stroke="var(--color-steel-light)"
          strokeOpacity={0.35}
          strokeWidth={0.4}
          strokeDasharray="3 3"
        />
        {/* Staircase zig-zag */}
        {Array.from({ length: FLOOR_COUNT }).map((_, i) => {
          const y = B.y + i * FLOOR_H;
          return (
            <polyline
              key={i}
              points={`${B.x + 44},${y + FLOOR_H - 2} ${B.x + 68},${y + 2} ${B.x + 44},${y + 2}`}
              fill="none"
              stroke="var(--color-steel-light)"
              strokeOpacity={0.22}
              strokeWidth={0.35}
            />
          );
        })}

        {/* Roof parapet */}
        <line
          x1={B.x - 10}
          y1={B.y}
          x2={B.x + B.w + 10}
          y2={B.y}
          stroke="var(--color-steel-light)"
          strokeOpacity={0.6}
          strokeWidth={0.6}
        />
        {/* Antenna */}
        <line
          x1={B.x + B.w * 0.35}
          y1={B.y}
          x2={B.x + B.w * 0.35}
          y2={B.y - 48}
          stroke="var(--color-steel-light)"
          strokeOpacity={0.5}
          strokeWidth={0.5}
        />
        <line
          x1={B.x + B.w * 0.35 - 6}
          y1={B.y - 30}
          x2={B.x + B.w * 0.35 + 6}
          y2={B.y - 30}
          stroke="var(--color-steel-light)"
          strokeOpacity={0.5}
          strokeWidth={0.5}
        />

        {/* Floor-number tickers on the far-right gutter */}
        {[1, 11, 22, 33].map((n, i) => {
          const y = B.y + B.h - (n / 33) * B.h;
          return (
            <g key={i} opacity={0.5}>
              <line x1={B.x + B.w} y1={y} x2={B.x + B.w + 12} y2={y} stroke="var(--color-steel-light)" strokeWidth={0.4} />
              <text
                x={B.x + B.w + 18}
                y={y + 3}
                className="font-mono"
                fill="var(--color-secondary)"
                opacity={0.6}
                style={{ fontSize: 9, letterSpacing: 1 }}
              >
                {String(n).padStart(2, "0")}F
              </text>
            </g>
          );
        })}
      </motion.g>

      {/* ───────────────────────── PLUMBING LAYER ─────────────────────────── */}
      <motion.g
        animate={{ opacity: visible.plumbing ? 1 : 0.08 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Street main coming in from the left at ground level */}
        <line
          x1={40}
          y1={560}
          x2={180}
          y2={560}
          stroke="var(--accent-current)"
          strokeOpacity={0.8}
          strokeWidth={1.1}
        />
        {/* Rise into pump room through wall */}
        <polyline
          points={`180,560 180,580 340,580`}
          fill="none"
          stroke="var(--accent-current)"
          strokeOpacity={0.8}
          strokeWidth={1.1}
        />
        {/* Pump room run → manifold */}
        <line
          x1={340}
          y1={580}
          x2={540}
          y2={580}
          stroke="var(--accent-current)"
          strokeOpacity={0.8}
          strokeWidth={1.1}
        />
        {/* Jockey pump spur */}
        <polyline
          points={`430,580 430,600 430,590`}
          fill="none"
          stroke="var(--accent-current)"
          strokeOpacity={0.5}
          strokeWidth={0.7}
        />
        {/* Manifold → riser base */}
        <polyline
          points={`540,580 540,560 625,560`}
          fill="none"
          stroke="var(--accent-current)"
          strokeOpacity={0.8}
          strokeWidth={1.1}
        />
        {/* THE RISER — the main vertical. Goes from ground to roof. */}
        <line
          x1={625}
          y1={560}
          x2={625}
          y2={B.y + 30}
          stroke="var(--accent-current)"
          strokeOpacity={0.85}
          strokeWidth={1.2}
        />
        {/* Roof tank feed — from riser top left to tank */}
        <polyline
          points={`625,120 560,120`}
          fill="none"
          stroke="var(--accent-current)"
          strokeOpacity={0.8}
          strokeWidth={1.1}
        />
        {/* Roof tank body — simple rectangle */}
        <rect
          x={500}
          y={100}
          width={60}
          height={40}
          fill="none"
          stroke="var(--accent-current)"
          strokeOpacity={0.75}
          strokeWidth={1}
        />
        {/* Waterline inside tank (thin horizontal) */}
        <line x1={504} y1={118} x2={556} y2={118} stroke="var(--accent-current)" strokeOpacity={0.4} strokeWidth={0.4} strokeDasharray="3 3" />
        {/* Relief outlet */}
        <polyline
          points={`625,130 700,130 700,100`}
          fill="none"
          stroke="var(--accent-current)"
          strokeOpacity={0.8}
          strokeWidth={1}
        />

        {/* Branch spurs to a few sample floors — 6 of them, alternating
            east/west to keep the drawing balanced. */}
        {[0.22, 0.36, 0.5, 0.64, 0.78, 0.9].map((t, i) => {
          const y = B.y + 30 + t * (560 - B.y - 30);
          const east = i % 2 === 0;
          const tipX = east ? B.x + B.w - 30 : B.x + 90;
          return (
            <polyline
              key={i}
              points={`${625},${y} ${tipX},${y}`}
              fill="none"
              stroke="var(--accent-current)"
              strokeOpacity={0.55}
              strokeWidth={0.7}
            />
          );
        })}
        {/* The ONE spur that goes to the sample sprinkler (top east) —
            drawn brighter so the eye can trace from ground to target. */}
        <polyline
          points={`625,180 780,180`}
          fill="none"
          stroke="var(--accent-current)"
          strokeOpacity={0.95}
          strokeWidth={1}
        />
      </motion.g>

      {/* ─────────────────────── EQUIPMENT LAYER ──────────────────────────── */}
      <motion.g
        animate={{ opacity: visible.equipment ? 1 : 0.08 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {scenarioDComponents.map((c) => (
          <EquipmentGlyph
            key={c.id}
            component={c}
            hot={highlightedId === c.id}
            scanY={scanY}
          />
        ))}
        {/* Pressure sensor ↔ manifold dashed signal line */}
        <line
          x1={605}
          y1={545}
          x2={560}
          y2={575}
          stroke="var(--accent-current)"
          strokeOpacity={0.4}
          strokeWidth={0.5}
          strokeDasharray="2 3"
        />
      </motion.g>

      {/* ─────────────────────── FIRE TARGET ──────────────────────────────── */}
      <g>
        <motion.circle
          cx={scenarioDFireTarget.x}
          cy={scenarioDFireTarget.y}
          r={22}
          fill="url(#sd-target-glow)"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx={scenarioDFireTarget.x}
          cy={scenarioDFireTarget.y}
          r={3}
          fill="var(--accent-fire)"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Concentric ring that pulses outward — like a radar blip */}
        <motion.circle
          cx={scenarioDFireTarget.x}
          cy={scenarioDFireTarget.y}
          fill="none"
          stroke="var(--accent-fire)"
          strokeWidth={0.8}
          initial={{ r: 3, opacity: 0.7 }}
          animate={{ r: 36, opacity: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      </g>
    </svg>
  );
}

/**
 * Single equipment glyph drawn in the kind-specific wireframe language
 * used throughout scenarios B and D. Filled with background colour so
 * it visually cuts through pipes underneath.
 */
function EquipmentGlyph({
  component,
  hot,
  scanY,
}: {
  component: ScenarioDComponent;
  hot: boolean;
  scanY: number;
}) {
  const { id, x, y } = component;

  // Distance to scan line (0..1 normalised) — used to draw the
  // scan-hover glow behind the glyph when the sweep passes.
  const scanYPx = scanY * H;
  const dy = Math.abs(scanYPx - y);
  const nearScan = dy < 48;

  const stroke = hot ? "var(--accent-fire)" : "var(--accent-current)";
  const bg = "var(--color-primary)";

  return (
    <g>
      {/* Local scan glow */}
      {nearScan && (
        <circle
          cx={x}
          cy={y}
          r={18}
          fill="url(#sd-scan-glow)"
          opacity={Math.max(0, 1 - dy / 48)}
        />
      )}

      {id === "intake" && (
        <g stroke={stroke} strokeWidth={1} fill={bg}>
          <path d={`M ${x - 14} ${y - 6} L ${x + 14} ${y - 6} L ${x + 18} ${y + 6} L ${x - 18} ${y + 6} Z`} />
          <path d={`M ${x - 10} ${y} Q ${x - 5} ${y - 3} ${x} ${y} T ${x + 10} ${y}`} fill="none" />
        </g>
      )}
      {id === "primary-pump" && (
        <g stroke={stroke} strokeWidth={1} fill={bg}>
          <circle cx={x} cy={y} r={14} />
          <line x1={x - 10} y1={y} x2={x + 10} y2={y} />
          <line x1={x} y1={y - 10} x2={x} y2={y + 10} />
          <line x1={x - 7} y1={y - 7} x2={x + 7} y2={y + 7} strokeWidth={0.6} />
          <line x1={x - 7} y1={y + 7} x2={x + 7} y2={y - 7} strokeWidth={0.6} />
        </g>
      )}
      {id === "jockey-pump" && (
        <g stroke={stroke} strokeWidth={1} fill={bg}>
          <circle cx={x} cy={y} r={9} />
          <line x1={x - 6} y1={y} x2={x + 6} y2={y} strokeWidth={0.6} />
          <line x1={x} y1={y - 6} x2={x} y2={y + 6} strokeWidth={0.6} />
        </g>
      )}
      {id === "manifold" && (
        <g stroke={stroke} strokeWidth={1} fill={bg}>
          <rect x={x - 22} y={y - 6} width={44} height={12} rx={2} />
          <line x1={x - 22} y1={y} x2={x + 22} y2={y} strokeWidth={0.4} opacity={0.6} />
          <circle cx={x - 16} cy={y} r={1.2} fill={stroke} />
          <circle cx={x} cy={y} r={1.2} fill={stroke} />
          <circle cx={x + 16} cy={y} r={1.2} fill={stroke} />
        </g>
      )}
      {id === "pressure-sensor" && (
        <g stroke={stroke} strokeWidth={1} fill={bg}>
          <circle cx={x} cy={y} r={7} />
          <line x1={x} y1={y} x2={x + 4} y2={y - 4} strokeWidth={1} />
          <line x1={x - 5} y1={y + 5} x2={x + 5} y2={y + 5} strokeWidth={0.4} />
        </g>
      )}
      {id === "riser" && (
        <g stroke={stroke} strokeWidth={0.8} fill="none">
          <circle cx={x} cy={y} r={4} fill={bg} />
          <circle cx={x} cy={y} r={1.5} fill={stroke} />
        </g>
      )}
      {id === "branch-valve" && (
        <g stroke={stroke} strokeWidth={1} fill={bg}>
          <polygon points={`${x - 8},${y - 6} ${x},${y} ${x - 8},${y + 6}`} />
          <polygon points={`${x + 8},${y - 6} ${x},${y} ${x + 8},${y + 6}`} />
          <line x1={x} y1={y - 10} x2={x} y2={y - 6} strokeWidth={0.5} />
        </g>
      )}
      {id === "sprinkler" && (
        <g stroke={stroke} strokeWidth={1} fill={bg}>
          <line x1={x} y1={y - 10} x2={x} y2={y} />
          <line x1={x - 8} y1={y} x2={x + 8} y2={y} strokeWidth={1.2} />
          <polygon points={`${x - 5},${y} ${x + 5},${y} ${x},${y + 7}`} fill={stroke} />
        </g>
      )}
      {id === "roof-tank" && (
        <g stroke={stroke} strokeWidth={0.9} fill="none">
          <circle cx={x} cy={y} r={5} fill={bg} />
          <line x1={x - 4} y1={y} x2={x + 4} y2={y} strokeWidth={0.4} />
        </g>
      )}
      {id === "relief" && (
        <g stroke={stroke} strokeWidth={1} fill={bg}>
          <polygon points={`${x - 6},${y + 4} ${x + 6},${y + 4} ${x},${y - 6}`} />
          <line x1={x} y1={y - 6} x2={x} y2={y - 14} strokeWidth={0.6} />
        </g>
      )}

      {/* Ticker dot — tiny bracketed number floats above glyph */}
      <text
        x={x}
        y={y - 22}
        textAnchor="middle"
        className="font-mono"
        fill={hot ? "var(--accent-fire)" : "var(--color-secondary)"}
        opacity={hot ? 1 : 0.55}
        style={{ fontSize: 9, letterSpacing: 1 }}
      >
        [{component.ticker}]
      </text>
    </g>
  );
}
