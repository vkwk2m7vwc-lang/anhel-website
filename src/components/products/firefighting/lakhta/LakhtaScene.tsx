"use client";

/**
 * Lakhta scene — inline SVG of a tapered skyscraper in section, with a
 * basement pump station, two red firefighting risers, a horizontal
 * delivery pipe to the fire floor, and a smoke plume rising above the
 * tower.
 *
 * The scene is a single inline SVG (400+ lines of paths and elements)
 * on purpose: GSAP targets elements by ID selector, and splitting the
 * figure into React sub-components would force re-renders on every
 * scroll update (killing 60fps) without buying any real prop-control.
 * The only prop is `activeStep` (0..5); it writes `data-active-step`
 * on the root <svg> and React state changes are used sparingly — one
 * render per step transition, not per scroll frame.
 *
 * Continuous animations (LED blink, smoke sway, pump glow pulse,
 * impeller rotation, particle flow, droplet fall) are implemented as
 * CSS keyframes defined in globals.css under the `lakhta-*` prefix.
 * Each animated element gets `style={{ animation }}` conditionally based
 * on `activeStep` + `prefersReducedMotion`. No runtime animation engine
 * is needed for these loops — the browser handles them on the
 * compositor thread.
 *
 * Element structure (roughly matching the reference SVG):
 *   - Background + grid
 *   - Building group (faces, mullions, floor lines, spire)
 *   - Pump station (basement enclosure, active pumps, reserves, panel)
 *   - Risers + horizontal pipe (red) + idle sprinklers
 *   - Fire point (floor highlight, glow, flame)
 *   - Active sprinkler (hidden until step 5)
 *   - Smoke plume (visible from step 0)
 *   - Annotations + header + legend
 */

type Props = {
  /** Current narrative beat, 0..5. Drives data-active-step + loop gating. */
  activeStep: number;
  /** When true, all continuous loops are disabled and final state shown. */
  reducedMotion: boolean;
};

// Keyframe names must match definitions in globals.css under the
// `lakhta-` prefix. Kept as string consts so typos surface in one place.
const ANIM = {
  flamePulse: "lakhta-flame-pulse 1s ease-in-out infinite",
  ledBlink: "lakhta-led-blink 0.8s ease-in-out infinite",
  pumpGlow: "lakhta-pump-glow 1.2s ease-in-out infinite",
  pumpPulse: "lakhta-pump-pulse 1.2s ease-in-out infinite",
  impellerRotate: "lakhta-impeller-rotate 2s linear infinite",
  riserRise: "lakhta-riser-rise 6s linear infinite",
  riserRiseRight: "lakhta-riser-rise-right 6s linear infinite",
  horizontalFlow: "lakhta-horizontal-flow 2.4s linear infinite",
  smokeSway: "lakhta-smoke-sway 5s ease-in-out infinite",
  dropletFall: "lakhta-droplet-fall 1.2s ease-in infinite",
  sprinklerAppear: "lakhta-sprinkler-appear 0.6s ease-out forwards",
} as const;

// Helper: compose a style object for a loop, returning `undefined` when
// gating is off so React doesn't render an empty `style=""` attribute.
const loop = (when: boolean, animation: string): React.CSSProperties | undefined =>
  when ? { animation } : undefined;

export function LakhtaScene({ activeStep, reducedMotion }: Props) {
  // Gate per-step: elements stay in their final state once unlocked, so
  // scrolling backwards doesn't restart animations (mirrors GSAP scrub
  // idempotency). Reduced-motion short-circuits all loops.
  const firePresent = activeStep >= 0;
  const ledOn = activeStep >= 1;
  const pumpsOn = activeStep >= 2;
  const risersOn = activeStep >= 3;
  const horizontalOn = activeStep >= 4;
  const sprinklerOn = activeStep >= 5;

  const ifMotion = (flag: boolean, anim: string) =>
    reducedMotion ? undefined : loop(flag, anim);

  return (
    <svg
      viewBox="0 0 600 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      data-active-step={activeStep}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      role="img"
      aria-label="Схема срабатывания насосной станции пожаротушения в разрезе небоскрёба"
    >
      <defs>
        <linearGradient id="lakhta-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
        </linearGradient>
        <linearGradient id="lakhta-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" stopOpacity="1" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="lakhta-fire-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(215,38,56,0.6)" />
          <stop offset="100%" stopColor="rgba(215,38,56,0)" />
        </radialGradient>
        <radialGradient id="lakhta-pump-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(215,38,56,0.3)" />
          <stop offset="100%" stopColor="rgba(215,38,56,0)" />
        </radialGradient>
      </defs>

      {/* Background fill */}
      <rect width="600" height="1000" fill="#0a0a0a" />

      {/* Hairline grid — decorative, always visible */}
      <g stroke="rgba(255,255,255,0.04)" strokeWidth={0.5}>
        <line x1="0" y1="100" x2="600" y2="100" />
        <line x1="0" y1="200" x2="600" y2="200" />
        <line x1="0" y1="300" x2="600" y2="300" />
        <line x1="0" y1="400" x2="600" y2="400" />
        <line x1="0" y1="500" x2="600" y2="500" />
        <line x1="0" y1="600" x2="600" y2="600" />
        <line x1="0" y1="700" x2="600" y2="700" />
        <line x1="0" y1="800" x2="600" y2="800" />
        <line x1="0" y1="900" x2="600" y2="900" />
        <line x1="100" y1="0" x2="100" y2="1000" />
        <line x1="200" y1="0" x2="200" y2="1000" />
        <line x1="300" y1="0" x2="300" y2="1000" />
        <line x1="400" y1="0" x2="400" y2="1000" />
        <line x1="500" y1="0" x2="500" y2="1000" />
      </g>

      {/* ================== LAKHTA SILHOUETTE ================== */}
      <g id="lakhta-building" stroke="rgba(255,255,255,0.5)" strokeWidth={1.2} fill="none">
        {/* Left face (tapered, visible) */}
        <path
          d="M 200 950 L 210 750 L 218 550 L 226 350 L 234 180 L 245 80 L 300 60 L 300 950 Z"
          fill="url(#lakhta-glass)"
        />
        {/* Right face (darker, side view) */}
        <path
          d="M 300 950 L 300 60 L 355 80 L 366 180 L 374 350 L 382 550 L 390 750 L 400 950 Z"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.3)"
        />
        {/* Central spire */}
        <path
          d="M 296 60 L 300 20 L 304 60 Z"
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.5)"
        />
        <circle cx="300" cy="18" r="1.5" fill="rgba(255,255,255,0.7)" />
      </g>

      {/* Glass mullions */}
      <g stroke="rgba(255,255,255,0.25)" strokeWidth={0.7} fill="none">
        <line x1="220" y1="950" x2="238" y2="180" />
        <line x1="245" y1="950" x2="255" y2="180" />
        <line x1="270" y1="950" x2="275" y2="180" />
        <line x1="295" y1="950" x2="298" y2="180" />
        <line x1="305" y1="950" x2="302" y2="180" strokeOpacity={0.3} />
        <line x1="330" y1="950" x2="325" y2="180" strokeOpacity={0.3} />
        <line x1="355" y1="950" x2="345" y2="180" strokeOpacity={0.3} />
        <line x1="380" y1="950" x2="362" y2="180" strokeOpacity={0.3} />
      </g>

      {/* Floor lines (bottom detailed, top fading) */}
      <g stroke="rgba(255,255,255,0.35)" strokeWidth={0.8} fill="none">
        <line x1="200" y1="900" x2="400" y2="900" />
        <line x1="202" y1="860" x2="398" y2="860" />
        <line x1="204" y1="820" x2="396" y2="820" />
        <line x1="206" y1="780" x2="394" y2="780" />
        <line x1="208" y1="740" x2="392" y2="740" />
        <line x1="210" y1="700" x2="390" y2="700" />
        <line x1="212" y1="660" x2="388" y2="660" />
        <line x1="214" y1="620" x2="386" y2="620" />
        <line x1="216" y1="580" x2="384" y2="580" />
        <line x1="218" y1="540" x2="382" y2="540" />
        <line x1="220" y1="500" x2="380" y2="500" strokeOpacity={0.7} />
        <line x1="221" y1="460" x2="379" y2="460" strokeOpacity={0.6} />
        <line x1="222" y1="420" x2="378" y2="420" strokeOpacity={0.5} />
        <line x1="224" y1="380" x2="376" y2="380" strokeOpacity={0.4} />
        <line x1="226" y1="340" x2="374" y2="340" strokeOpacity={0.3} />
        <line x1="228" y1="300" x2="372" y2="300" strokeOpacity={0.22} />
        <line x1="232" y1="260" x2="368" y2="260" strokeOpacity={0.15} />
        <line x1="236" y1="220" x2="364" y2="220" strokeOpacity={0.1} />
      </g>

      {/* Top fade to clouds */}
      <rect x="0" y="0" width="600" height="300" fill="url(#lakhta-fade)" />

      {/* ================== BASEMENT PUMP STATION ================== */}
      <g id="pump-station">
        {/* Soft glow — pulses when pumps are active */}
        <circle
          cx="300"
          cy="925"
          r="130"
          fill="url(#lakhta-pump-glow)"
          opacity={pumpsOn ? 1 : 0.3}
          style={ifMotion(pumpsOn, ANIM.pumpGlow)}
        />

        {/* Basement outline */}
        <rect
          x="160"
          y="880"
          width="280"
          height="80"
          fill="rgba(215,38,56,0.08)"
          stroke="rgba(215,38,56,0.5)"
          strokeWidth={1.2}
        />

        {/* Label */}
        <text
          x="170"
          y="898"
          fill="rgba(215,38,56,1)"
          fontFamily="monospace"
          fontSize="10"
          letterSpacing="2"
          fontWeight={500}
        >
          НАСОСНАЯ СТАНЦИЯ · ПОДВАЛ
        </text>

        {/* Pump P-01 — active from step 2 */}
        <g
          id="pump-01"
          style={{
            transformOrigin: "195px 935px",
            animation:
              reducedMotion || !pumpsOn ? undefined : ANIM.pumpPulse,
          }}
        >
          <circle
            cx="195"
            cy="935"
            r="13"
            stroke="rgba(215,38,56,0.9)"
            strokeWidth={1.3}
            fill="none"
          />
          <circle cx="195" cy="935" r="5" fill="#D72638" />
          {/* Cross rotates at 2s/rev when pumps are on */}
          <g
            style={{
              transformOrigin: "195px 935px",
              animation: reducedMotion || !pumpsOn ? undefined : ANIM.impellerRotate,
            }}
          >
            <line
              x1="188"
              y1="935"
              x2="202"
              y2="935"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1}
            />
            <line
              x1="195"
              y1="928"
              x2="195"
              y2="942"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1}
            />
          </g>
        </g>

        {/* Pump P-02 — active from step 2 */}
        <g
          id="pump-02"
          style={{
            transformOrigin: "230px 935px",
            animation:
              reducedMotion || !pumpsOn ? undefined : ANIM.pumpPulse,
          }}
        >
          <circle
            cx="230"
            cy="935"
            r="13"
            stroke="rgba(215,38,56,0.9)"
            strokeWidth={1.3}
            fill="none"
          />
          <circle cx="230" cy="935" r="5" fill="#D72638" />
          <g
            style={{
              transformOrigin: "230px 935px",
              animation: reducedMotion || !pumpsOn ? undefined : ANIM.impellerRotate,
            }}
          >
            <line
              x1="223"
              y1="935"
              x2="237"
              y2="935"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1}
            />
            <line
              x1="230"
              y1="928"
              x2="230"
              y2="942"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1}
            />
          </g>
        </g>

        {/* Reserve pumps (idle, no animation) */}
        <circle
          cx="265"
          cy="935"
          r="13"
          stroke="rgba(215,38,56,0.5)"
          strokeWidth={1}
          fill="none"
        />
        <circle
          cx="300"
          cy="935"
          r="13"
          stroke="rgba(215,38,56,0.5)"
          strokeWidth={1}
          fill="none"
        />
        <circle
          cx="335"
          cy="935"
          r="13"
          stroke="rgba(215,38,56,0.5)"
          strokeWidth={1}
          fill="none"
        />

        {/* Control panel with LED */}
        <g id="control-panel">
          <rect
            x="360"
            y="920"
            width="35"
            height="30"
            stroke="rgba(215,38,56,0.9)"
            strokeWidth={1.3}
            fill="none"
          />
          <rect
            x="366"
            y="927"
            width="18"
            height="12"
            stroke="rgba(215,38,56,0.6)"
            strokeWidth={0.6}
            fill="rgba(215,38,56,0.3)"
          />
          {/* LED blinks from step 1 */}
          <circle
            cx="365"
            cy="943"
            r="1"
            fill="#D72638"
            id="led-active"
            style={ifMotion(ledOn, ANIM.ledBlink)}
            opacity={ledOn ? 1 : 0.4}
          />
          <circle cx="370" cy="943" r="1" fill="rgba(215,38,56,0.4)" />
          <circle cx="375" cy="943" r="1" fill="rgba(215,38,56,0.4)" />
        </g>

        {/* Labels */}
        <text
          x="178"
          y="975"
          fill="rgba(215,38,56,0.6)"
          fontFamily="monospace"
          fontSize="7"
          letterSpacing="1"
        >
          P-01 · АКТИВНЫЙ
        </text>
        <text
          x="215"
          y="975"
          fill="rgba(215,38,56,0.6)"
          fontFamily="monospace"
          fontSize="7"
          letterSpacing="1"
        >
          P-02 · АКТИВНЫЙ
        </text>
        <text
          x="252"
          y="975"
          fill="rgba(255,255,255,0.3)"
          fontFamily="monospace"
          fontSize="7"
          letterSpacing="1"
        >
          P-03 · РЕЗЕРВ
        </text>
        <text
          x="366"
          y="975"
          fill="rgba(255,255,255,0.3)"
          fontFamily="monospace"
          fontSize="7"
          letterSpacing="1"
        >
          ЩИТ
        </text>
      </g>

      {/* ================== WATER RISERS WITH FLOW ================== */}
      {/* Left riser (red pipe) */}
      <line
        x1="220"
        y1="880"
        x2="238"
        y2="260"
        stroke="rgba(215,38,56,0.6)"
        strokeWidth={1.5}
      />

      {/* Left riser water particles — rise when risersOn.
          Each circle gets its own start offset via nth-child-style delay
          so they don't move as a single bar. Delays are baked as
          negative animation-delay to start mid-cycle. */}
      <g
        id="water-left"
        style={
          reducedMotion || !risersOn
            ? undefined
            : { transformBox: "fill-box" as const }
        }
      >
        {[
          { cx: 224, cy: 750, r: 2, o: 0.9, delay: 0 },
          { cx: 226, cy: 680, r: 1.5, o: 0.7, delay: -1 },
          { cx: 228, cy: 600, r: 2, o: 0.85, delay: -2 },
          { cx: 230, cy: 520, r: 1.5, o: 0.6, delay: -3 },
          { cx: 232, cy: 440, r: 1.8, o: 0.75, delay: -4 },
          { cx: 234, cy: 360, r: 1.3, o: 0.5, delay: -5 },
        ].map((p, i) => (
          <circle
            key={`wl-${i}`}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill={`rgba(255,255,255,${p.o})`}
            style={
              reducedMotion || !risersOn
                ? undefined
                : { animation: `${ANIM.riserRise}`, animationDelay: `${p.delay}s` }
            }
          />
        ))}
      </g>

      {/* Right riser (red pipe) */}
      <line
        x1="380"
        y1="880"
        x2="362"
        y2="260"
        stroke="rgba(215,38,56,0.6)"
        strokeWidth={1.5}
      />

      {/* Right riser water particles */}
      <g id="water-right">
        {[
          { cx: 376, cy: 780, r: 2, o: 0.9, delay: -0.5 },
          { cx: 374, cy: 710, r: 1.5, o: 0.7, delay: -1.5 },
          { cx: 372, cy: 630, r: 2, o: 0.85, delay: -2.5 },
          { cx: 370, cy: 560, r: 1.8, o: 0.75, delay: -3.5 },
          { cx: 368, cy: 480, r: 1.5, o: 0.6, delay: -4.5 },
          { cx: 366, cy: 400, r: 1.3, o: 0.5, delay: -5.5 },
        ].map((p, i) => (
          <circle
            key={`wr-${i}`}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill={`rgba(255,255,255,${p.o})`}
            style={
              reducedMotion || !risersOn
                ? undefined
                : {
                    animation: `${ANIM.riserRiseRight}`,
                    animationDelay: `${p.delay}s`,
                  }
            }
          />
        ))}
      </g>

      {/* Central riser (dashed, inactive visual) */}
      <line
        x1="300"
        y1="880"
        x2="300"
        y2="450"
        stroke="rgba(215,38,56,0.5)"
        strokeWidth={1}
        strokeDasharray="3,4"
      />

      {/* ================== HORIZONTAL PIPE TO FIRE FLOOR ================== */}
      <line
        x1="238"
        y1="450"
        x2="310"
        y2="450"
        stroke="rgba(215,38,56,0.6)"
        strokeWidth={1.2}
      />

      {/* Horizontal particles — from left riser to fire floor */}
      <g id="water-to-fire">
        {[
          { cx: 260, r: 1.8, o: 0.9, delay: 0 },
          { cx: 280, r: 1.5, o: 0.75, delay: -0.8 },
          { cx: 295, r: 1.2, o: 0.6, delay: -1.6 },
        ].map((p, i) => (
          <circle
            key={`wf-${i}`}
            cx={p.cx}
            cy={450}
            r={p.r}
            fill={`rgba(255,255,255,${p.o})`}
            style={
              reducedMotion || !horizontalOn
                ? undefined
                : {
                    animation: `${ANIM.horizontalFlow}`,
                    animationDelay: `${p.delay}s`,
                  }
            }
          />
        ))}
      </g>

      {/* ================== IDLE SPRINKLERS ================== */}
      <g id="idle-sprinklers" fill="rgba(215,38,56,0.4)">
        <circle cx="260" cy="900" r="1.8" />
        <circle cx="300" cy="900" r="1.8" />
        <circle cx="340" cy="900" r="1.8" />
        <circle cx="260" cy="860" r="1.8" />
        <circle cx="300" cy="860" r="1.8" />
        <circle cx="340" cy="860" r="1.8" />
        <circle cx="260" cy="820" r="1.8" />
        <circle cx="340" cy="820" r="1.8" />
        <circle cx="260" cy="780" r="1.5" />
        <circle cx="340" cy="780" r="1.5" />
        <circle cx="260" cy="740" r="1.5" />
        <circle cx="340" cy="740" r="1.5" />
        <circle cx="260" cy="700" r="1.5" />
        <circle cx="340" cy="700" r="1.5" />
        <circle cx="260" cy="660" r="1.3" />
        <circle cx="340" cy="660" r="1.3" />
        <circle cx="260" cy="620" r="1.3" />
        <circle cx="340" cy="620" r="1.3" />
        <circle cx="260" cy="580" r="1.3" />
        <circle cx="340" cy="580" r="1.3" />
        <circle cx="260" cy="540" r="1.2" />
        <circle cx="340" cy="540" r="1.2" />
        <circle cx="265" cy="500" r="1.2" opacity={0.7} />
        <circle cx="335" cy="500" r="1.2" opacity={0.7} />
      </g>

      {/* ================== FIRE ZONE (step 1+) ==================
          Floor highlight + glow + flame. active-sprinkler is pulled out
          into its own group below since it doesn't appear until step 6. */}
      <g
        id="fire-zone"
        style={{
          opacity: firePresent ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      >
        {/* Floor highlight */}
        <rect
          x="216"
          y="440"
          width="168"
          height="20"
          fill="rgba(215,38,56,0.08)"
          stroke="rgba(215,38,56,0.4)"
          strokeWidth={0.5}
        />

        {/* Fire glow */}
        <circle cx="320" cy="450" r="35" fill="url(#lakhta-fire-glow)" />

        {/* Fire flame — gentle pulse */}
        <g
          id="fire-flame"
          style={{
            transformOrigin: "330px 450px",
            animation: reducedMotion || !firePresent ? undefined : ANIM.flamePulse,
          }}
        >
          <circle cx="330" cy="450" r="4" fill="#D72638" />
          <circle cx="330" cy="450" r="2" fill="#FF6B35" />
        </g>
      </g>

      {/* ================== ACTIVE SPRINKLER (step 6 only) ==================
          Hidden until step 5 (index), then fades in with droplets. */}
      <g
        id="active-sprinkler"
        style={{
          opacity: sprinklerOn ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      >
        <circle cx="310" cy="447" r="3" fill="rgba(255,255,255,0.95)" />
        <circle
          cx="310"
          cy="447"
          r="8"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={0.6}
        />
        {/* Spray lines */}
        <g stroke="rgba(255,255,255,0.6)" strokeWidth={0.8} fill="none">
          <line x1="310" y1="447" x2="315" y2="455" />
          <line x1="310" y1="447" x2="320" y2="456" />
          <line x1="310" y1="447" x2="325" y2="455" />
          <line x1="310" y1="447" x2="305" y2="455" />
          <line x1="310" y1="447" x2="300" y2="456" />
          <line x1="310" y1="447" x2="295" y2="455" />
        </g>
        {/* Droplets — fall with gravity */}
        {[
          { cx: 318, cy: 457, r: 0.8, o: 0.9, delay: 0 },
          { cx: 322, cy: 455, r: 0.6, o: 0.8, delay: -0.3 },
          { cx: 302, cy: 457, r: 0.8, o: 0.9, delay: -0.6 },
          { cx: 298, cy: 455, r: 0.6, o: 0.8, delay: -0.9 },
        ].map((d, i) => (
          <circle
            key={`dp-${i}`}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={`rgba(255,255,255,${d.o})`}
            style={
              reducedMotion || !sprinklerOn
                ? undefined
                : {
                    animation: `${ANIM.dropletFall}`,
                    animationDelay: `${d.delay}s`,
                  }
            }
          />
        ))}
      </g>

      {/* ================== SMOKE PLUME ==================
          Visible from step 1 (fire detected). Sways gently when motion
          is allowed — transform-origin at the plume's base so it looks
          like it's being pushed by air, not pivoting around its middle. */}
      <g
        id="smoke"
        strokeLinecap="round"
        fill="none"
        style={{
          opacity: firePresent ? 1 : 0,
          transition: "opacity 0.8s ease-out",
          transformOrigin: "328px 440px",
          animation: reducedMotion || !firePresent ? undefined : ANIM.smokeSway,
        }}
      >
        <path
          d="M 328 440 Q 320 410 330 380 Q 342 350 325 320 Q 318 290 332 260 Q 340 230 325 200"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={16}
        />
        <path
          d="M 328 440 Q 322 420 330 400 Q 340 375 328 350"
          stroke="rgba(255,255,255,0.38)"
          strokeWidth={10}
        />
        <path
          d="M 328 440 Q 325 430 328 420"
          stroke="rgba(180,180,180,0.6)"
          strokeWidth={6}
        />
        <path
          d="M 320 250 Q 335 220 320 190 Q 310 165 325 145"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={8}
        />
      </g>

      {/* ================== SIDE ANNOTATIONS ================== */}
      <g
        fontFamily="monospace"
        fill="rgba(255,255,255,0.5)"
        fontSize="9"
        letterSpacing="2"
      >
        <text x="30" y="450">
          ОЧАГ
        </text>
        <circle cx="75" cy="446" r="3" fill="#D72638" />

        <text x="30" y="925" fontSize="9">
          НАСОСНАЯ
        </text>
        <circle cx="100" cy="921" r="3" stroke="#D72638" strokeWidth={1} fill="none" />
      </g>

      {/* ================== HEADER ================== */}
      <g fontFamily="monospace" letterSpacing="3">
        <text x="30" y="50" fill="rgba(255,255,255,0.85)" fontSize="14" fontWeight={500}>
          03 · КАК СРАБАТЫВАЕТ НАСОСНАЯ
        </text>
        <text x="30" y="72" fill="rgba(255,255,255,0.4)" fontSize="10">
          AXONOMETRIC · УСТАНОВКА ПОЖАРОТУШЕНИЯ
        </text>
      </g>

      {/* ================== META INFO TOP RIGHT ================== */}
      <g fontFamily="monospace" letterSpacing="1">
        <text x="450" y="45" fill="rgba(255,255,255,0.4)" fontSize="8">
          26 ЭТАЖЕЙ
        </text>
        <text x="450" y="60" fill="rgba(255,255,255,0.4)" fontSize="8">
          462 МЕТРА
        </text>
        <text x="450" y="75" fill="rgba(255,255,255,0.4)" fontSize="8">
          С-ПЕТЕРБУРГ
        </text>
      </g>

      {/* ================== LEGEND BOTTOM ================== */}
      <g
        fontFamily="monospace"
        letterSpacing="1"
        fontSize="7"
        fill="rgba(255,255,255,0.4)"
      >
        <text x="30" y="985">
          ВОДА
        </text>
        <circle cx="65" cy="982" r="1.5" fill="rgba(255,255,255,0.8)" />
        <text x="90" y="985">
          КРАСНЫЕ ТРУБЫ · СИСТЕМА ПОЖАРОТУШЕНИЯ (ГОСТ 14202)
        </text>
      </g>
    </svg>
  );
}
