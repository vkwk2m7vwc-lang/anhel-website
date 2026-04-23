"use client";

import { type MouseEvent } from "react";
import { type ScenarioBComponent } from "@/content/products/firefighting-scenario-b";

/**
 * Isometric flow diagram — the main stage for Scenario-B.
 *
 * Rendering model:
 *   - One SVG with viewBox 0 0 1200 720.
 *   - Pipes are drawn first so components sit on top.
 *   - Each pipe has a stable path id (`sb-pipe-<from>-<to>`) — the
 *     FlowParticles sibling references those as MotionPath targets.
 *   - Each component renders a kind-specific glyph (pump = ringed
 *     circle, valve = diamond, manifold = horizontal cylinder, …) so
 *     the viewer reads role without needing to learn the legend first.
 *
 * Interaction surface:
 *   - Every node has an invisible hit-rect sized a little larger than
 *     the glyph so pointer targets stay forgiving on touch devices.
 *   - `data-selected` / `data-hovered` attributes drive subtle
 *     highlight colours via Tailwind data-variant selectors.
 *   - Callbacks bubble up — the orchestrator owns state.
 *
 * Why SVG over Three.js: the scene is flat, the perspective is fake,
 * and screen readers actually get useful output from SVG. Also a ~25 KB
 * render beats a 150 KB WebGL context for something that doesn't rotate.
 */

export const ISO_VIEW_BOX = { w: 1200, h: 720 } as const;

/**
 * Exported so FlowParticles can resolve the same paths without
 * re-deriving geometry. Each entry defines the SVG path id that both
 * the visible pipe and the motion animation reference.
 */
export const ISO_PIPE_IDS = {
  intakeToValve: "sb-pipe-intake-valve",
  valveToJockey: "sb-pipe-valve-jockey",
  valveToPrimary: "sb-pipe-valve-primary",
  valveToBackup: "sb-pipe-valve-backup",
  jockeyToManifold: "sb-pipe-jockey-manifold",
  primaryToManifold: "sb-pipe-primary-manifold",
  backupToManifold: "sb-pipe-backup-manifold",
  manifoldToRiserL: "sb-pipe-manifold-riserL",
  manifoldToRiserR: "sb-pipe-manifold-riserR",
  riserLToLoop: "sb-pipe-riserL-loop",
  loopToSprinkler: "sb-pipe-loop-sprinkler",
} as const;

/** Pipe stroke colours — keep these few, mostly one accent. */
const PIPE_FEED = "#334b66"; // "in service" feed — muted blue-grey
const PIPE_ACTIVE = "var(--accent-current)"; // recoloured on active/selected
const GLYPH_STROKE = "#8a94a0";
const GLYPH_FILL = "#14181c";
const LABEL_COLOR = "#8a94a0";

type Props = {
  components: readonly ScenarioBComponent[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
};

export function IsometricDiagram({
  components,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: Props) {
  // Pull components by id — we know the shape, so this stays ergonomic.
  const byId = (id: string) =>
    components.find((c) => c.id === id) as ScenarioBComponent;

  const intake = byId("intake");
  const inletValve = byId("inlet-valve");
  const jockey = byId("pump-jockey");
  const primary = byId("pump-primary");
  const backup = byId("pump-backup");
  const manifold = byId("manifold");
  const sensor = byId("pressure-sensor");
  const riserL = byId("riser-left");
  const riserR = byId("riser-right");
  const sprinkler = byId("sprinkler");

  // Riser vertical extent — pipes travel up from y=420 to y≈210 (just
  // below sprinkler floor). Keeps the floor-loop short and legible.
  const RISER_TOP_Y = 210;
  const LOOP_Y = RISER_TOP_Y;

  // Pipe path definitions. Using cubic splines keeps corners soft so
  // the "engineering schematic" read is calm, not jagged. Short paths
  // use `L` to stay crisp.
  const paths = {
    intakeToValve: `M ${intake.x + 32} ${intake.y} L ${inletValve.x - 22} ${inletValve.y}`,
    valveToJockey: `M ${inletValve.x + 22} ${inletValve.y} C ${inletValve.x + 80} ${inletValve.y}, ${jockey.x - 80} ${jockey.y}, ${jockey.x - 30} ${jockey.y}`,
    valveToPrimary: `M ${inletValve.x + 22} ${inletValve.y} L ${primary.x - 30} ${primary.y}`,
    valveToBackup: `M ${inletValve.x + 22} ${inletValve.y} C ${inletValve.x + 80} ${inletValve.y}, ${backup.x - 80} ${backup.y}, ${backup.x - 30} ${backup.y}`,
    jockeyToManifold: `M ${jockey.x + 30} ${jockey.y} C ${jockey.x + 80} ${jockey.y}, ${manifold.x - 80} ${manifold.y}, ${manifold.x - 40} ${manifold.y}`,
    primaryToManifold: `M ${primary.x + 30} ${primary.y} L ${manifold.x - 40} ${manifold.y}`,
    backupToManifold: `M ${backup.x + 30} ${backup.y} C ${backup.x + 80} ${backup.y}, ${manifold.x - 80} ${manifold.y}, ${manifold.x - 40} ${manifold.y}`,
    // Manifold → risers: short horizontal then vertical up
    manifoldToRiserL: `M ${manifold.x + 40} ${manifold.y} L ${riserL.x} ${manifold.y} L ${riserL.x} ${RISER_TOP_Y}`,
    manifoldToRiserR: `M ${manifold.x + 40} ${manifold.y + 8} L ${riserR.x} ${manifold.y + 8} L ${riserR.x} ${RISER_TOP_Y + 8}`,
    // Left riser → floor loop → sprinkler (the demo "floor")
    riserLToLoop: `M ${riserL.x} ${LOOP_Y} L ${sprinkler.x - 30} ${LOOP_Y}`,
    loopToSprinkler: `M ${sprinkler.x - 30} ${LOOP_Y} L ${sprinkler.x} ${sprinkler.y + 10}`,
  };

  const handleNodeClick = (id: string) => (e: MouseEvent) => {
    e.stopPropagation();
    onSelect(selectedId === id ? null : id);
  };

  return (
    <svg
      viewBox={`0 0 ${ISO_VIEW_BOX.w} ${ISO_VIEW_BOX.h}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Isometric flow diagram of the firefighting pump station"
      className="h-auto w-full"
      onClick={() => onSelect(null)} /* click on empty space clears selection */
    >
      <defs>
        {/* Blueprint grid — very faint dot pattern to hint "technical
            drawing" without crowding the diagram. Pattern is 24×24 with
            a 0.6px dot so the eye reads texture, not measurement. */}
        <pattern
          id="sb-grid"
          x={0}
          y={0}
          width={24}
          height={24}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={0.5} cy={0.5} r={0.6} fill="#1c2128" />
        </pattern>
        {/* Pipe path defs — visible pipes reference these so the line
            dash/offset can be tweaked centrally. Motion particles also
            bind to these ids. */}
        {Object.entries(paths).map(([key, d]) => (
          <path
            key={key}
            id={ISO_PIPE_IDS[key as keyof typeof ISO_PIPE_IDS]}
            d={d}
            fill="none"
          />
        ))}
      </defs>

      {/* Background grid */}
      <rect
        x={0}
        y={0}
        width={ISO_VIEW_BOX.w}
        height={ISO_VIEW_BOX.h}
        fill="url(#sb-grid)"
      />

      {/* Pipes — two-pass render (wide muted base + thin accent highlight
          on hover/select for whichever segment the selected node touches) */}
      <g className="pipes" aria-hidden="true">
        {Object.entries(ISO_PIPE_IDS).map(([key, id]) => (
          <use
            key={`pipe-${key}`}
            href={`#${id}`}
            stroke={PIPE_FEED}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
        {/* Inner highlight — thin lighter stroke over the base so the
            pipe reads as a small channel rather than a single stroke */}
        {Object.entries(ISO_PIPE_IDS).map(([key, id]) => (
          <use
            key={`pipe-inner-${key}`}
            href={`#${id}`}
            stroke="#5a6778"
            strokeWidth={0.6}
            strokeLinecap="round"
            fill="none"
            opacity={0.7}
          />
        ))}
      </g>

      {/* Signal line from pressure-sensor back to control — dashed, thin.
          Implied "this sensor talks to the panel" without drawing the
          whole electrical system. */}
      <line
        x1={sensor.x}
        y1={sensor.y + 6}
        x2={manifold.x + 4}
        y2={manifold.y - 12}
        stroke="#4a5568"
        strokeWidth={0.8}
        strokeDasharray="3 4"
        opacity={0.65}
      />

      {/* Components — each glyph comes from its kind. Order is cosmetic
          (later draws on top of earlier) — pumps last so their rings
          sit above the pipe junctions. */}
      <NodeIntake node={intake} {...{ selectedId, hoveredId, onHover, onSelect: handleNodeClick }} />
      <NodeValve node={inletValve} {...{ selectedId, hoveredId, onHover, onSelect: handleNodeClick }} />
      <NodeManifold node={manifold} {...{ selectedId, hoveredId, onHover, onSelect: handleNodeClick }} />
      <NodeSensor node={sensor} {...{ selectedId, hoveredId, onHover, onSelect: handleNodeClick }} />
      <NodeRiser node={riserL} topY={RISER_TOP_Y} {...{ selectedId, hoveredId, onHover, onSelect: handleNodeClick }} />
      <NodeRiser node={riserR} topY={RISER_TOP_Y + 8} {...{ selectedId, hoveredId, onHover, onSelect: handleNodeClick }} />
      <NodeSprinkler node={sprinkler} {...{ selectedId, hoveredId, onHover, onSelect: handleNodeClick }} />
      <NodePump node={jockey} role="jockey" {...{ selectedId, hoveredId, onHover, onSelect: handleNodeClick }} />
      <NodePump node={primary} role="primary" {...{ selectedId, hoveredId, onHover, onSelect: handleNodeClick }} />
      <NodePump node={backup} role="backup" {...{ selectedId, hoveredId, onHover, onSelect: handleNodeClick }} />
    </svg>
  );
}

// ---------------------------------------------------------------------
// Shared node helpers
// ---------------------------------------------------------------------

type NodeProps = {
  node: ScenarioBComponent;
  selectedId: string | null;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => (e: MouseEvent) => void;
};

/** Mono label rendered at a fixed offset below each node. */
function NodeLabel({
  x,
  y,
  text,
  align = "middle",
  selected,
}: {
  x: number;
  y: number;
  text: string;
  align?: "start" | "middle" | "end";
  selected: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={10}
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      letterSpacing={0.6}
      textAnchor={align}
      fill={selected ? "var(--color-secondary)" : LABEL_COLOR}
      opacity={selected ? 1 : 0.75}
      style={{ transition: "fill 300ms, opacity 300ms" }}
    >
      {text}
    </text>
  );
}

/** Invisible forgiving hit target — larger than the glyph itself. */
function HitArea({
  x,
  y,
  w,
  h,
  id,
  onHover,
  onSelect,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => (e: MouseEvent) => void;
}) {
  return (
    <rect
      x={x - w / 2}
      y={y - h / 2}
      width={w}
      height={h}
      fill="transparent"
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={onSelect(id)}
      data-cursor="hover"
      className="cursor-pointer"
    />
  );
}

function useHighlight(
  selectedId: string | null,
  hoveredId: string | null,
  id: string,
) {
  const selected = selectedId === id;
  const hovered = hoveredId === id && !selected;
  return { selected, hovered };
}

// ---------------------------------------------------------------------
// Node glyphs (one per kind)
// ---------------------------------------------------------------------

function NodeIntake({ node, selectedId, hoveredId, onHover, onSelect }: NodeProps) {
  const { selected, hovered } = useHighlight(selectedId, hoveredId, node.id);
  const stroke = selected ? PIPE_ACTIVE : GLYPH_STROKE;
  const opacity = hovered ? 1 : 0.9;
  return (
    <g data-node-id={node.id} data-selected={selected} opacity={opacity}>
      {/* Trapezoidal reservoir — the signifier for "water source" */}
      <polygon
        points={`${node.x - 32},${node.y + 24} ${node.x - 22},${node.y - 18} ${node.x + 22},${node.y - 18} ${node.x + 32},${node.y + 24}`}
        fill={GLYPH_FILL}
        stroke={stroke}
        strokeWidth={1.2}
        style={{ transition: "stroke 300ms" }}
      />
      {/* Wavy water line inside */}
      <path
        d={`M ${node.x - 18} ${node.y + 4} Q ${node.x - 10} ${node.y - 2}, ${node.x} ${node.y + 4} T ${node.x + 18} ${node.y + 4}`}
        stroke={stroke}
        strokeWidth={0.8}
        fill="none"
        opacity={0.6}
      />
      <NodeLabel x={node.x} y={node.y + 44} text={node.mono} selected={selected} />
      <HitArea x={node.x} y={node.y} w={70} h={60} id={node.id} onHover={onHover} onSelect={onSelect} />
    </g>
  );
}

function NodeValve({ node, selectedId, hoveredId, onHover, onSelect }: NodeProps) {
  const { selected, hovered } = useHighlight(selectedId, hoveredId, node.id);
  const stroke = selected ? PIPE_ACTIVE : GLYPH_STROKE;
  const opacity = hovered ? 1 : 0.9;
  return (
    <g data-node-id={node.id} data-selected={selected} opacity={opacity}>
      {/* Butterfly / diamond — two triangles meeting at centre, the
          classic valve icon in P&ID diagrams */}
      <polygon
        points={`${node.x - 18},${node.y - 14} ${node.x},${node.y} ${node.x - 18},${node.y + 14}`}
        fill={GLYPH_FILL}
        stroke={stroke}
        strokeWidth={1.2}
      />
      <polygon
        points={`${node.x + 18},${node.y - 14} ${node.x},${node.y} ${node.x + 18},${node.y + 14}`}
        fill={GLYPH_FILL}
        stroke={stroke}
        strokeWidth={1.2}
      />
      {/* Stem — indicates electric actuator */}
      <line
        x1={node.x}
        y1={node.y - 14}
        x2={node.x}
        y2={node.y - 24}
        stroke={stroke}
        strokeWidth={1}
      />
      <rect x={node.x - 6} y={node.y - 30} width={12} height={6} fill={GLYPH_FILL} stroke={stroke} strokeWidth={0.8} />
      <NodeLabel x={node.x} y={node.y + 38} text={node.mono} selected={selected} />
      <HitArea x={node.x} y={node.y - 6} w={56} h={56} id={node.id} onHover={onHover} onSelect={onSelect} />
    </g>
  );
}

function NodePump({
  node,
  role,
  selectedId,
  hoveredId,
  onHover,
  onSelect,
}: NodeProps & { role: "primary" | "backup" | "jockey" }) {
  const { selected, hovered } = useHighlight(selectedId, hoveredId, node.id);
  const stroke = selected ? PIPE_ACTIVE : GLYPH_STROKE;
  const opacity = hovered ? 1 : 0.9;
  // Jockey reads as "smaller" — tight visual rank vs. primary/backup.
  const r = role === "jockey" ? 16 : 22;
  return (
    <g data-node-id={node.id} data-selected={selected} opacity={opacity}>
      {/* Outer ring */}
      <circle cx={node.x} cy={node.y} r={r} fill={GLYPH_FILL} stroke={stroke} strokeWidth={1.4} />
      {/* Inner ring — hints at impeller housing */}
      <circle cx={node.x} cy={node.y} r={r - 6} stroke={stroke} strokeWidth={0.6} fill="none" opacity={0.7} />
      {/* Four spokes — the impeller */}
      {[0, 45, 90, 135].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const ix = node.x + Math.cos(rad) * (r - 8);
        const iy = node.y + Math.sin(rad) * (r - 8);
        return (
          <line
            key={deg}
            x1={node.x - (ix - node.x)}
            y1={node.y - (iy - node.y)}
            x2={ix}
            y2={iy}
            stroke={stroke}
            strokeWidth={0.6}
            opacity={0.7}
          />
        );
      })}
      {/* Flanges on intake/discharge sides */}
      <line x1={node.x - r - 6} y1={node.y - 4} x2={node.x - r - 6} y2={node.y + 4} stroke={stroke} strokeWidth={2} />
      <line x1={node.x + r + 6} y1={node.y - 4} x2={node.x + r + 6} y2={node.y + 4} stroke={stroke} strokeWidth={2} />
      <NodeLabel x={node.x} y={node.y + r + 18} text={node.mono} selected={selected} />
      <HitArea x={node.x} y={node.y} w={(r + 10) * 2} h={(r + 10) * 2} id={node.id} onHover={onHover} onSelect={onSelect} />
    </g>
  );
}

function NodeManifold({ node, selectedId, hoveredId, onHover, onSelect }: NodeProps) {
  const { selected, hovered } = useHighlight(selectedId, hoveredId, node.id);
  const stroke = selected ? PIPE_ACTIVE : GLYPH_STROKE;
  const opacity = hovered ? 1 : 0.9;
  // Horizontal cylinder — two ellipses capped on a rectangle.
  const w = 70;
  const h = 22;
  return (
    <g data-node-id={node.id} data-selected={selected} opacity={opacity}>
      <rect
        x={node.x - w / 2}
        y={node.y - h / 2}
        width={w}
        height={h}
        fill={GLYPH_FILL}
        stroke={stroke}
        strokeWidth={1.2}
      />
      <ellipse cx={node.x - w / 2} cy={node.y} rx={4} ry={h / 2} fill={GLYPH_FILL} stroke={stroke} strokeWidth={1} />
      <ellipse cx={node.x + w / 2} cy={node.y} rx={4} ry={h / 2} fill={GLYPH_FILL} stroke={stroke} strokeWidth={1} />
      {/* Outgoing stubs up (to sensor) and two stubs right (to risers) */}
      <line x1={node.x - 4} y1={node.y - h / 2} x2={node.x - 4} y2={node.y - h / 2 - 14} stroke={stroke} strokeWidth={1} />
      <NodeLabel x={node.x} y={node.y + h + 18} text={node.mono} selected={selected} />
      <HitArea x={node.x} y={node.y} w={w + 16} h={h + 20} id={node.id} onHover={onHover} onSelect={onSelect} />
    </g>
  );
}

function NodeSensor({ node, selectedId, hoveredId, onHover, onSelect }: NodeProps) {
  const { selected, hovered } = useHighlight(selectedId, hoveredId, node.id);
  const stroke = selected ? PIPE_ACTIVE : GLYPH_STROKE;
  const opacity = hovered ? 1 : 0.9;
  return (
    <g data-node-id={node.id} data-selected={selected} opacity={opacity}>
      <circle cx={node.x} cy={node.y} r={10} fill={GLYPH_FILL} stroke={stroke} strokeWidth={1.2} />
      {/* Needle */}
      <line x1={node.x} y1={node.y} x2={node.x + 6} y2={node.y - 4} stroke={stroke} strokeWidth={1} />
      <circle cx={node.x} cy={node.y} r={1.2} fill={stroke} />
      <NodeLabel x={node.x} y={node.y - 18} text={node.mono} selected={selected} />
      <HitArea x={node.x} y={node.y} w={30} h={30} id={node.id} onHover={onHover} onSelect={onSelect} />
    </g>
  );
}

function NodeRiser({
  node,
  topY,
  selectedId,
  hoveredId,
  onHover,
  onSelect,
}: NodeProps & { topY: number }) {
  const { selected, hovered } = useHighlight(selectedId, hoveredId, node.id);
  const stroke = selected ? PIPE_ACTIVE : GLYPH_STROKE;
  const opacity = hovered ? 1 : 0.9;
  return (
    <g data-node-id={node.id} data-selected={selected} opacity={opacity}>
      {/* Riser annotation — small bracket + tick marks up the pipe.
          Hit area covers the whole length. */}
      <g stroke={stroke} strokeWidth={0.8} opacity={0.6}>
        {Array.from({ length: 5 }).map((_, i) => {
          const y = node.y - 40 - i * 35;
          return (
            <line
              key={i}
              x1={node.x - 4}
              y1={y}
              x2={node.x + 4}
              y2={y}
            />
          );
        })}
      </g>
      <NodeLabel x={node.x + 18} y={topY + 30} text={node.mono} align="start" selected={selected} />
      <HitArea
        x={node.x}
        y={(node.y + topY) / 2}
        w={30}
        h={Math.abs(node.y - topY) + 10}
        id={node.id}
        onHover={onHover}
        onSelect={onSelect}
      />
    </g>
  );
}

function NodeSprinkler({ node, selectedId, hoveredId, onHover, onSelect }: NodeProps) {
  const { selected, hovered } = useHighlight(selectedId, hoveredId, node.id);
  const stroke = selected ? PIPE_ACTIVE : GLYPH_STROKE;
  const opacity = hovered ? 1 : 0.9;
  return (
    <g data-node-id={node.id} data-selected={selected} opacity={opacity}>
      {/* Stem */}
      <line x1={node.x} y1={node.y - 12} x2={node.x} y2={node.y + 4} stroke={stroke} strokeWidth={1.2} />
      {/* Deflector (horizontal dash at base) */}
      <line x1={node.x - 10} y1={node.y + 4} x2={node.x + 10} y2={node.y + 4} stroke={stroke} strokeWidth={1.2} />
      {/* Droplet — triangle pointing down */}
      <polygon
        points={`${node.x - 5},${node.y + 4} ${node.x + 5},${node.y + 4} ${node.x},${node.y + 16}`}
        fill={stroke}
        opacity={0.8}
      />
      <NodeLabel x={node.x} y={node.y + 36} text={node.mono} selected={selected} />
      <HitArea x={node.x} y={node.y} w={34} h={46} id={node.id} onHover={onHover} onSelect={onSelect} />
    </g>
  );
}
