"use client";

import { motion } from "framer-motion";
import {
  SCENARIO_D_VIEWBOX,
  scenarioDComponents,
  scenarioDFireTarget,
  type ScenarioDComponent,
} from "@/content/products/firefighting-scenario-d";

/**
 * Annotation overlay — the mono labels + leader lines that sit on top
 * of the x-ray. Each label block is positioned in viewBox coordinates
 * (from the content file) and connects to its node with a thin L-shaped
 * leader.
 *
 * The label itself is a small two-line block:
 *
 *     [04]  КОЛЛЕКТОР
 *           DN 200 · ВЫХОД НА СТОЯКИ
 *
 * A tiny colour-inherited dot sits where the leader ends at the label,
 * mirroring the "technical drawing" feel.
 *
 * The overlay fades annotations out for layers that are off — we don't
 * want "КОЛЛЕКТОР" floating when the plumbing layer is hidden.
 */

type Props = {
  visible: { plumbing: boolean; equipment: boolean };
  highlightedId: string | null;
  onHighlight: (id: string | null) => void;
};

const W = SCENARIO_D_VIEWBOX.w;
const H = SCENARIO_D_VIEWBOX.h;

export function AnnotationOverlay({
  visible,
  highlightedId,
  onHighlight,
}: Props) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {/* Target label — always visible (it's not gated by any layer;
          the "fire" is information about the world, not about the
          system). */}
      <TargetLabel />

      {/* System annotations */}
      {scenarioDComponents.map((c) => (
        <Annotation
          key={c.id}
          component={c}
          visible={visible}
          highlighted={highlightedId === c.id}
          onHover={onHighlight}
        />
      ))}
    </svg>
  );
}

function Annotation({
  component,
  visible,
  highlighted,
  onHover,
}: {
  component: ScenarioDComponent;
  visible: { plumbing: boolean; equipment: boolean };
  highlighted: boolean;
  onHover: (id: string | null) => void;
}) {
  const { x, y, labelX, labelY, side, ticker, name, meta, layer } = component;
  const isVisible = layer === "plumbing" ? visible.plumbing : visible.equipment;

  // Leader: from node to first bend (halfway in Y), then horizontal to
  // the label anchor. Slightly offset so the leader doesn't overlap
  // with the glyph.
  const nodeOffsetX = side === "left" ? -18 : 18;
  const leaderStartX = x + nodeOffsetX;
  const leaderStartY = y;
  const bendX = side === "left" ? labelX + 160 : labelX - 10;
  const bendY = labelY;

  const path = `M ${leaderStartX} ${leaderStartY} L ${bendX} ${leaderStartY} L ${bendX} ${bendY}`;

  return (
    <motion.g
      animate={{ opacity: isVisible ? 1 : 0.15 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => onHover(component.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: "pointer", pointerEvents: isVisible ? "auto" : "none" }}
    >
      {/* Leader line */}
      <path
        d={path}
        fill="none"
        stroke={
          highlighted ? "var(--accent-fire)" : "var(--color-secondary)"
        }
        strokeOpacity={highlighted ? 0.9 : 0.3}
        strokeWidth={0.5}
      />
      {/* Anchor dot at node end */}
      <circle
        cx={leaderStartX}
        cy={leaderStartY}
        r={1.5}
        fill={highlighted ? "var(--accent-fire)" : "var(--color-secondary)"}
        opacity={highlighted ? 1 : 0.5}
      />
      {/* Anchor dot at label end */}
      <circle
        cx={bendX}
        cy={bendY}
        r={1.5}
        fill={highlighted ? "var(--accent-fire)" : "var(--color-secondary)"}
        opacity={highlighted ? 1 : 0.5}
      />

      {/* Label block */}
      <g transform={`translate(${labelX} ${labelY})`}>
        <text
          textAnchor={side === "left" ? "end" : "start"}
          x={side === "left" ? 150 : 0}
          y={-4}
          className="font-mono"
          fill={highlighted ? "var(--accent-fire)" : "var(--color-secondary)"}
          opacity={highlighted ? 1 : 0.7}
          style={{ fontSize: 10, letterSpacing: 1 }}
        >
          [{ticker}] {name.toUpperCase()}
        </text>
        <text
          textAnchor={side === "left" ? "end" : "start"}
          x={side === "left" ? 150 : 0}
          y={10}
          className="font-mono"
          fill="var(--color-secondary)"
          opacity={highlighted ? 0.8 : 0.45}
          style={{ fontSize: 9, letterSpacing: 1 }}
        >
          {meta}
        </text>
      </g>
    </motion.g>
  );
}

function TargetLabel() {
  const { x, y, meta } = scenarioDFireTarget;
  // Label sits to the right of the target, aligned to a far-right gutter
  const labelX = 980;
  const labelY = y - 20;
  const bendX = labelX - 10;

  return (
    <g>
      <path
        d={`M ${x + 20} ${y} L ${bendX} ${y} L ${bendX} ${labelY}`}
        fill="none"
        stroke="var(--accent-fire)"
        strokeOpacity={0.7}
        strokeWidth={0.6}
      />
      <circle cx={x + 20} cy={y} r={1.6} fill="var(--accent-fire)" />
      <circle cx={bendX} cy={labelY} r={1.6} fill="var(--accent-fire)" />
      <g transform={`translate(${labelX} ${labelY})`}>
        <text
          x={0}
          y={-4}
          className="font-mono"
          fill="var(--accent-fire)"
          opacity={0.95}
          style={{ fontSize: 10, letterSpacing: 1 }}
        >
          [T] ОЧАГ ВОЗГОРАНИЯ
        </text>
        <text
          x={0}
          y={10}
          className="font-mono"
          fill="var(--color-secondary)"
          opacity={0.6}
          style={{ fontSize: 9, letterSpacing: 1 }}
        >
          {meta}
        </text>
      </g>
    </g>
  );
}
