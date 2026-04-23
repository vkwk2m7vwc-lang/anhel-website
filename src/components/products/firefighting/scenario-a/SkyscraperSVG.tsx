import type { CSSProperties } from "react";

/**
 * Axonometric cross-section of a firefighting skyscraper.
 *
 * Pure SVG, no animations inside this file — it's a styled geometry
 * primitive. The orchestrator (`ScenarioAScene`) passes an `activeNodes`
 * Set that drives `data-active` attributes on interactive nodes; CSS
 * transitions do the rest. Keeps this component side-effect-free so we
 * can render it on the server if we ever need to.
 *
 * Coordinate system:
 *   viewBox = 0 0 680 1180
 *   Building front face: x ∈ [140, 540], y ∈ [240, 920]
 *   Oblique back face is offset (+50, -30) — gives the "almost flat"
 *   axonometric read that feels architectural, not gamey.
 *   Ground line: y = 920
 *   Basement zone: y ∈ [920, 1040]
 *
 * Node ids (mirrored in `firefighting-scenario-a.ts`):
 *   smoke, fire-sprinkler, signal-line, riser-left, riser-right,
 *   basement, pump-primary, pump-backup, control-panel, water-particles,
 *   sprinkler-f1 … sprinkler-f6
 *
 * Tilting at ≈ 15° (the outer component applies `transform: rotateY(…)`)
 * would turn this from cross-section into full axonometric — for v1 we
 * keep the flat elevation to read cleanly as a diagram. Easy to tilt
 * later without changing this file.
 */

// --- Geometry constants -----------------------------------------------
// Keeping them at module scope lets us tweak the whole thing from one
// block. Accidentally introducing a "magic 34" inside the JSX is the
// fastest way to end up with a building where the third floor is half
// a floor taller than the fourth.
const BX = 140; // left edge of building (front face)
const BW = 400; // front face width
const BASE_Y = 920; // ground line
const FLOOR_H = 34;
const FLOORS = 20;
const ROOF_Y = BASE_Y - FLOORS * FLOOR_H; // 240
const DEPTH_DX = 50; // oblique offset for back face
const DEPTH_DY = -30;

const LEFT_RISER_X = BX + 100; // 240
const RIGHT_RISER_X = BX + 300; // 440

// Fire floor — close to top but with 2 floors of headroom for smoke.
const FIRE_FLOOR = 15;
const FIRE_FLOOR_TOP = BASE_Y - FIRE_FLOOR * FLOOR_H;
const FIRE_SPRINKLER_X = BX + 170; // between the two risers
const FIRE_SPRINKLER_Y = FIRE_FLOOR_TOP + 6;

const BASEMENT_BOTTOM = BASE_Y + 120;

// --- Helpers ----------------------------------------------------------

function floorY(f: number) {
  return BASE_Y - f * FLOOR_H; // y of the top edge of floor f (1-indexed)
}

/**
 * Building floors fade toward the top so the upper mass reads as
 * "continuation into clouds" rather than a hard ceiling. Keep the
 * bottom 8 floors at full opacity — that's the zone the detailed
 * plumbing lives in.
 */
function floorOpacity(f: number) {
  if (f <= 8) return 1;
  // Linear fade 1.0 → 0.18 across floors 9..20
  const t = (f - 8) / (FLOORS - 8);
  return Math.max(0.18, 1 - t * 0.8);
}

// --- Sub-components ---------------------------------------------------

type NodeState = { activeNodes: ReadonlySet<string> };

function FloorLines() {
  // 20 horizontal hairlines forming floor slabs, with an oblique back
  // edge that falls off toward the roof.
  return (
    <g className="floor-lines" aria-hidden="true">
      {Array.from({ length: FLOORS }).map((_, i) => {
        const f = i + 1;
        const y = floorY(f);
        const op = floorOpacity(f);
        return (
          <g key={`floor-${f}`} opacity={op}>
            {/* Front-face floor line */}
            <line
              x1={BX}
              y1={y}
              x2={BX + BW}
              y2={y}
              stroke="#3a3a3a"
              strokeWidth={0.5}
            />
            {/* Depth edge — connects to the back face */}
            <line
              x1={BX + BW}
              y1={y}
              x2={BX + BW + DEPTH_DX}
              y2={y + DEPTH_DY}
              stroke="#2a2a2a"
              strokeWidth={0.4}
            />
          </g>
        );
      })}
    </g>
  );
}

/**
 * Glass curtain-wall pass — adds silhouette character so the building
 * reads as a modern high-rise (Lakhta / Moscow-City) rather than a flat
 * sectional grid. Three moves:
 *
 *   1. Mullions — 9 vertical divisions across the front face at even
 *      spacing. Fade with height on the same ramp as floor lines so the
 *      upper mass still dissolves into clouds.
 *   2. Sky-lobby bands — two thicker horizontal strokes at floors 10 and
 *      18. Breaks the vertical monotony and gives the façade "levels"
 *      the way real supertalls do (mechanical/observation floors).
 *   3. Antenna — thin vertical mast above the roof, with a highlight
 *      dot at the tip. Pulls the eye up and implies scale.
 *
 * All additive — does not touch plumbing, basement or fire-source.
 */
function GlassFacade() {
  // 8 mullions → 9 panels. Evenly spaced, first at BX+W/9, etc.
  const MULLION_COUNT = 8;
  const BAND_FLOORS = [10, 18];
  const ANTENNA_X = BX + BW / 2;
  const ANTENNA_TOP = ROOF_Y - 70;
  const ANTENNA_BASE = ROOF_Y;

  return (
    <g className="glass-facade" aria-hidden="true">
      {/* Mullions — vertical curtain-wall lines. Each one is a single
          line from base to roof; we render them in a group with the
          same fade gradient as the floor lines by stacking a clip-path
          free overlay. Opacity stepping is done per-segment so the
          line naturally dims toward the top. */}
      {Array.from({ length: MULLION_COUNT }).map((_, i) => {
        const x = BX + ((i + 1) * BW) / (MULLION_COUNT + 1);
        // Render as stacked segments so each segment gets its own opacity.
        return (
          <g key={`mullion-${i}`}>
            {Array.from({ length: FLOORS }).map((__, f) => {
              const y1 = floorY(f);
              const y2 = floorY(f + 1);
              const op = floorOpacity(f + 1) * 0.55;
              return (
                <line
                  key={`m-${i}-${f}`}
                  x1={x}
                  y1={y1}
                  x2={x}
                  y2={y2}
                  stroke="#2f2f2f"
                  strokeWidth={0.35}
                  opacity={op}
                />
              );
            })}
          </g>
        );
      })}

      {/* Sky-lobby bands — thicker horizontal strokes that read as
          mechanical / observation floors. A second hairline just below
          each band adds depth. */}
      {BAND_FLOORS.map((f) => {
        const y = floorY(f);
        const op = floorOpacity(f);
        return (
          <g key={`band-${f}`} opacity={op}>
            <line
              x1={BX - 2}
              y1={y}
              x2={BX + BW + 2}
              y2={y}
              stroke="#5a5a5a"
              strokeWidth={1.2}
            />
            <line
              x1={BX}
              y1={y + 3}
              x2={BX + BW}
              y2={y + 3}
              stroke="#3a3a3a"
              strokeWidth={0.4}
            />
            {/* Depth echo — stroked onto the oblique back face */}
            <line
              x1={BX + BW}
              y1={y}
              x2={BX + BW + DEPTH_DX}
              y2={y + DEPTH_DY}
              stroke="#3a3a3a"
              strokeWidth={0.6}
            />
          </g>
        );
      })}

      {/* Antenna / communications mast — reads as "supertall" silhouette.
          A subtle guy-wire cross near the top adds recognisability. */}
      <g opacity={0.32}>
        <line
          x1={ANTENNA_X}
          y1={ANTENNA_TOP}
          x2={ANTENNA_X}
          y2={ANTENNA_BASE}
          stroke="#7a7a7a"
          strokeWidth={0.9}
        />
        {/* Tip highlight */}
        <circle cx={ANTENNA_X} cy={ANTENNA_TOP} r={1.3} fill="#9a9a9a" />
        {/* Cross strut halfway up */}
        <line
          x1={ANTENNA_X - 6}
          y1={ANTENNA_TOP + 28}
          x2={ANTENNA_X + 6}
          y2={ANTENNA_TOP + 28}
          stroke="#5a5a5a"
          strokeWidth={0.5}
        />
      </g>
    </g>
  );
}

function BuildingShell() {
  const backX = BX + BW + DEPTH_DX;
  const backBaseY = BASE_Y + DEPTH_DY;
  const backRoofY = ROOF_Y + DEPTH_DY;
  return (
    <g className="building-shell" aria-hidden="true">
      {/* Front-face vertical edges */}
      <line
        x1={BX}
        y1={BASE_Y}
        x2={BX}
        y2={ROOF_Y}
        stroke="#4a4a4a"
        strokeWidth={0.8}
      />
      <line
        x1={BX + BW}
        y1={BASE_Y}
        x2={BX + BW}
        y2={ROOF_Y}
        stroke="#4a4a4a"
        strokeWidth={0.8}
      />
      {/* Back right edge (oblique) */}
      <line
        x1={backX}
        y1={backBaseY}
        x2={backX}
        y2={backRoofY}
        stroke="#3a3a3a"
        strokeWidth={0.6}
        opacity={0.5}
      />
      {/* Top edge along the roof, front and depth */}
      <line
        x1={BX}
        y1={ROOF_Y}
        x2={BX + BW}
        y2={ROOF_Y}
        stroke="#4a4a4a"
        strokeWidth={0.8}
      />
      <line
        x1={BX + BW}
        y1={ROOF_Y}
        x2={backX}
        y2={backRoofY}
        stroke="#3a3a3a"
        strokeWidth={0.6}
        opacity={0.5}
      />
      {/* Ground plane — dashed, extends past the building for context */}
      <line
        x1={60}
        y1={BASE_Y}
        x2={620}
        y2={BASE_Y}
        stroke="#2a2a2a"
        strokeWidth={0.5}
        strokeDasharray="2 5"
      />
      <line
        x1={BX + BW}
        y1={BASE_Y}
        x2={backX}
        y2={backBaseY}
        stroke="#2a2a2a"
        strokeWidth={0.4}
        opacity={0.5}
      />
    </g>
  );
}

function DetailedLowerFloors({ activeNodes }: NodeState) {
  // Floors 1-6 show rooms + ceiling sprinklers. Three rooms per floor,
  // three sprinkler emitters per ceiling.
  const ROOMS = [BX + 100, BX + 225]; // internal dividers → 3 rooms
  const SPRINKLERS = [BX + 60, BX + 170, BX + 280, BX + 360];

  return (
    <g className="detailed-floors">
      {[1, 2, 3, 4, 5, 6].map((f) => {
        const yTop = floorY(f);
        const yBot = floorY(f - 1);
        const sprinklerId = `sprinkler-f${f}`;
        const isSprinklerActive = activeNodes.has(sprinklerId);
        return (
          <g key={`det-${f}`}>
            {/* Room dividers — thin hairlines inside the floor slab */}
            {ROOMS.map((x, i) => (
              <line
                key={i}
                x1={x}
                y1={yTop + 5}
                x2={x}
                y2={yBot - 3}
                stroke="#262626"
                strokeWidth={0.4}
              />
            ))}
            {/* Sprinkler heads on the ceiling. We deliberately let them
                overlap the floor line — on active they brighten enough
                to read without the radius needing to change. */}
            {SPRINKLERS.map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy={yTop + 5}
                r={1.8}
                data-node="sprinkler"
                data-active={isSprinklerActive ? "true" : "false"}
                className="fill-[#3a3a3a] transition-[fill] duration-500 data-[active=true]:fill-[var(--accent-current)]"
              />
            ))}
            {/* Connecting drop from riser to sprinkler line — very faint,
                just enough depth to say "these are fed by the riser" */}
            <line
              x1={LEFT_RISER_X}
              y1={yTop + 5}
              x2={SPRINKLERS[0]}
              y2={yTop + 5}
              stroke="#2a2a2a"
              strokeWidth={0.4}
            />
            <line
              x1={LEFT_RISER_X}
              y1={yTop + 5}
              x2={SPRINKLERS[1]}
              y2={yTop + 5}
              stroke="#2a2a2a"
              strokeWidth={0.4}
            />
            <line
              x1={RIGHT_RISER_X}
              y1={yTop + 5}
              x2={SPRINKLERS[2]}
              y2={yTop + 5}
              stroke="#2a2a2a"
              strokeWidth={0.4}
            />
            <line
              x1={RIGHT_RISER_X}
              y1={yTop + 5}
              x2={SPRINKLERS[3]}
              y2={yTop + 5}
              stroke="#2a2a2a"
              strokeWidth={0.4}
            />
          </g>
        );
      })}
    </g>
  );
}

function Risers({ activeNodes }: NodeState) {
  const activeL = activeNodes.has("riser-left");
  const activeR = activeNodes.has("riser-right");
  return (
    <g className="risers">
      <line
        id="riser-left"
        data-node="riser"
        data-active={activeL ? "true" : "false"}
        x1={LEFT_RISER_X}
        y1={BASE_Y + 10}
        x2={LEFT_RISER_X}
        y2={ROOF_Y + 8}
        strokeWidth={1.6}
        className="stroke-[#3a3a3a] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
      />
      <line
        id="riser-right"
        data-node="riser"
        data-active={activeR ? "true" : "false"}
        x1={RIGHT_RISER_X}
        y1={BASE_Y + 10}
        x2={RIGHT_RISER_X}
        y2={ROOF_Y + 8}
        strokeWidth={1.6}
        className="stroke-[#3a3a3a] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
      />
    </g>
  );
}

function SignalLine({ activeNodes }: NodeState) {
  const active = activeNodes.has("signal-line");
  return (
    <line
      id="signal-line"
      data-node="signal"
      data-active={active ? "true" : "false"}
      x1={BX + BW - 30}
      y1={FIRE_SPRINKLER_Y}
      x2={BX + BW - 30}
      y2={BASE_Y + 50}
      strokeWidth={0.8}
      strokeDasharray="3 4"
      className="stroke-[#2f2f2f] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
    />
  );
}

function FireSprinkler({ activeNodes }: NodeState) {
  // The fire sprinkler is always hinted at (it's the fire source — has
  // to be legible before the user scrolls), but lights fully on step 1.
  const active = activeNodes.has("fire-sprinkler");
  return (
    <g
      id="fire-sprinkler-group"
      data-node="fire-sprinkler"
      data-active={active ? "true" : "false"}
      className="group"
    >
      {/* Core dot */}
      <circle
        cx={FIRE_SPRINKLER_X}
        cy={FIRE_SPRINKLER_Y}
        r={3}
        className="fill-[var(--accent-current)] opacity-50 transition-opacity duration-500 group-data-[active=true]:opacity-100"
      />
      {/* Pulse ring — CSS-animated when active; muted otherwise.
          Pulse lives in globals.css under .fire-pulse */}
      <circle
        cx={FIRE_SPRINKLER_X}
        cy={FIRE_SPRINKLER_Y}
        r={3}
        className="fill-none stroke-[var(--accent-current)]"
        strokeWidth={1}
        style={
          {
            transformOrigin: `${FIRE_SPRINKLER_X}px ${FIRE_SPRINKLER_Y}px`,
          } as CSSProperties
        }
        data-node="fire-pulse"
        data-active={active ? "true" : "false"}
      />
    </g>
  );
}

function Basement({ activeNodes }: NodeState) {
  const basementActive = activeNodes.has("basement");
  const primaryActive = activeNodes.has("pump-primary");
  const backupActive = activeNodes.has("pump-backup");
  const panelActive = activeNodes.has("control-panel");

  // Slightly wider than the building — the basement extends past the
  // footprint in reality (and in our diagram it separates from the
  // tower visually, which helps the eye).
  const bx = BX - 30;
  const bw = BW + 100;
  const by = BASE_Y;
  const bh = BASEMENT_BOTTOM - BASE_Y;

  return (
    <g
      data-node="basement"
      data-active={basementActive ? "true" : "false"}
      className="group transition-opacity duration-500"
    >
      {/* Basement box — darker fill so it reads as "below ground" */}
      <rect
        x={bx}
        y={by}
        width={bw}
        height={bh}
        fill="#0e0e0e"
        stroke="#2a2a2a"
        strokeWidth={0.5}
      />
      {/* Accent line on the bottom — reinforces the station is "active" */}
      <line
        x1={bx}
        y1={by + bh}
        x2={bx + bw}
        y2={by + bh}
        strokeWidth={1}
        className="stroke-[#2a2a2a] transition-[stroke] duration-500 group-data-[active=true]:stroke-[var(--accent-current)]"
      />
      {/* Mono label */}
      <text
        x={bx + 10}
        y={by + 18}
        fontSize={9}
        fill="#555"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing={0.8}
      >
        НАСОСНАЯ СТАНЦИЯ · ПОДВАЛ
      </text>

      {/* Primary pump */}
      <g
        id="pump-primary"
        data-node="pump"
        data-active={primaryActive ? "true" : "false"}
        className="transition-opacity duration-500"
      >
        <rect
          x={bx + 30}
          y={by + 40}
          width={70}
          height={48}
          fill="#1a1a1a"
          strokeWidth={0.8}
          className="stroke-[#3a3a3a] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
          data-node="pump"
          data-active={primaryActive ? "true" : "false"}
        />
        {/* Impeller hint — circle inside the pump body */}
        <circle
          cx={bx + 65}
          cy={by + 64}
          r={12}
          fill="none"
          strokeWidth={0.8}
          className="stroke-[#3a3a3a] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
          data-node="pump"
          data-active={primaryActive ? "true" : "false"}
        />
        <text
          x={bx + 30}
          y={by + 100}
          fontSize={7}
          fill="#666"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing={0.6}
        >
          P-01 · ОСНОВНОЙ
        </text>
      </g>

      {/* Backup pump — mirror of primary */}
      <g
        id="pump-backup"
        data-node="pump"
        data-active={backupActive ? "true" : "false"}
        className="transition-opacity duration-500"
      >
        <rect
          x={bx + 120}
          y={by + 40}
          width={70}
          height={48}
          fill="#1a1a1a"
          strokeWidth={0.8}
          className="stroke-[#3a3a3a] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
          data-node="pump"
          data-active={backupActive ? "true" : "false"}
        />
        <circle
          cx={bx + 155}
          cy={by + 64}
          r={12}
          fill="none"
          strokeWidth={0.8}
          className="stroke-[#3a3a3a] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
          data-node="pump"
          data-active={backupActive ? "true" : "false"}
        />
        <text
          x={bx + 120}
          y={by + 100}
          fontSize={7}
          fill="#666"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing={0.6}
        >
          P-02 · РЕЗЕРВ
        </text>
      </g>

      {/* Discharge manifold — horizontal line from pumps to the risers */}
      <line
        x1={bx + 30}
        y1={by + 30}
        x2={bx + 220}
        y2={by + 30}
        strokeWidth={1.2}
        className="stroke-[#3a3a3a] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
        data-node="manifold"
        data-active={primaryActive ? "true" : "false"}
      />
      {/* Connectors from manifold up into the risers (which start at BASE_Y+10) */}
      <line
        x1={LEFT_RISER_X}
        y1={by + 30}
        x2={LEFT_RISER_X}
        y2={by + 10}
        strokeWidth={1.4}
        className="stroke-[#3a3a3a] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
        data-node="manifold"
        data-active={primaryActive ? "true" : "false"}
      />
      <line
        x1={RIGHT_RISER_X}
        y1={by + 30}
        x2={RIGHT_RISER_X}
        y2={by + 10}
        strokeWidth={1.4}
        className="stroke-[#3a3a3a] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
        data-node="manifold"
        data-active={primaryActive ? "true" : "false"}
      />

      {/* Control panel on the right — tall thin cabinet */}
      <g
        id="control-panel"
        data-node="panel"
        data-active={panelActive ? "true" : "false"}
      >
        <rect
          x={bx + bw - 70}
          y={by + 30}
          width={36}
          height={70}
          fill="#1a1a1a"
          strokeWidth={0.8}
          className="stroke-[#3a3a3a] transition-[stroke] duration-500 data-[active=true]:stroke-[var(--accent-current)]"
          data-node="panel"
          data-active={panelActive ? "true" : "false"}
        />
        {/* Indicator LEDs */}
        <circle
          cx={bx + bw - 52}
          cy={by + 46}
          r={1.8}
          className="fill-[#2a2a2a] transition-[fill] duration-500 data-[active=true]:fill-[var(--accent-current)]"
          data-node="panel"
          data-active={panelActive ? "true" : "false"}
        />
        <circle
          cx={bx + bw - 52}
          cy={by + 56}
          r={1.8}
          fill="#2a2a2a"
        />
        <circle
          cx={bx + bw - 52}
          cy={by + 66}
          r={1.8}
          fill="#2a2a2a"
        />
        <text
          x={bx + bw - 70}
          y={by + 110}
          fontSize={7}
          fill="#666"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing={0.6}
        >
          ЩИТ
        </text>
      </g>
    </g>
  );
}

// --- Public component -------------------------------------------------

export function SkyscraperSVG({ activeNodes }: NodeState) {
  return (
    <svg
      viewBox="0 0 680 1180"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Axonometric cross-section of a firefighting skyscraper with basement pump station"
      className="h-auto w-full max-w-[640px]"
    >
      <defs>
        {/* Cloud gradient — applied as a separate overlay rectangle over
            the upper portion of the building. Fills to pure bg at the
            top so the building literally disappears into it. */}
        <linearGradient id="sa-cloud-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0A0A" stopOpacity="1" />
          <stop offset="70%" stopColor="#0A0A0A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
        </linearGradient>
        {/* Soft blur used by the smoke plume (rendered by the parent
            inside its own group for animation). */}
        <filter id="sa-smoke-blur" x="-40%" y="-20%" width="180%" height="140%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

      {/* Geometry */}
      <FloorLines />
      <BuildingShell />

      {/* Cloud overlay — draws *above* the building so upper floors fade
          to bg, but *below* the smoke so the plume stays visible. */}
      <rect
        x={0}
        y={ROOF_Y - 60}
        width={680}
        height={260}
        fill="url(#sa-cloud-fade)"
        pointerEvents="none"
      />

      {/* Glass curtain-wall silhouette — mullions, sky-lobby bands, and
          the antenna mast. Rendered *after* the cloud overlay so the
          antenna sits above the fade and reads as "supertall" tip. The
          mullions already bake height-based fade into per-segment
          opacity, so they still dissolve upward even without the cloud
          overlay covering them. */}
      <GlassFacade />

      {/* Plumbing + fire source */}
      <DetailedLowerFloors activeNodes={activeNodes} />
      <Risers activeNodes={activeNodes} />
      <SignalLine activeNodes={activeNodes} />
      <FireSprinkler activeNodes={activeNodes} />

      {/* Smoke — rendered as a slot the parent fills. We don't animate
          framer-motion inside this server-safe component; the parent
          places its <SmokePlume /> next to this SVG at the same coords. */}

      {/* Basement — last so it draws on top of the fading ground line */}
      <Basement activeNodes={activeNodes} />
    </svg>
  );
}

/**
 * Geometry constants re-exported so other components (smoke plume,
 * water-particles path) can align themselves to the same coordinates
 * without re-deriving them. Exporting instead of hardcoding means one
 * edit moves the whole scene consistently.
 */
export const SCENE_GEOMETRY = {
  viewBox: { w: 680, h: 1180 },
  building: { x: BX, y: ROOF_Y, w: BW, h: BASE_Y - ROOF_Y },
  baseY: BASE_Y,
  roofY: ROOF_Y,
  leftRiserX: LEFT_RISER_X,
  rightRiserX: RIGHT_RISER_X,
  fireFloor: FIRE_FLOOR,
  fireSprinkler: { x: FIRE_SPRINKLER_X, y: FIRE_SPRINKLER_Y },
  basementBottom: BASEMENT_BOTTOM,
} as const;
