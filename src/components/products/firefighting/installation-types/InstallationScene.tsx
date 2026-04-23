"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { InstallationTypeKind } from "@/content/products/types";

/**
 * Section 4 «Типы установок» — single scene that rewires per tab.
 *
 * Design rationale (memory: project_section_4_installation_types.md):
 * instead of four isolated miniature SVGs, we keep the same building in
 * the same proportions across every tab and only swap the interior logic.
 * Reading the four tabs in sequence should feel like flipping through
 * schematics for the same building — not like looking at four different
 * buildings.
 *
 * What we KEEP from `LakhtaScene`:
 *   - Building silhouette, mullions, floor lines
 *   - Basement pump station with active pumps + control panel
 *   - Left/right red risers with continuous water particles
 *
 * What we STRIP (section 4 isn't cinematic — it's an explainer):
 *   - Smoke plume (the section-3 hook doesn't belong here)
 *   - Top cloud-fade gradient (takes attention from interior detail)
 *   - Step-gated reveals (pumps, risers, LED are always on — the whole
 *     point is showing the system already in operation)
 *   - Annotations + dev text (the accompanying detail card does the
 *     labelling work now)
 *
 * What's PER-TYPE (driven by `activeType`):
 *   - sprinkler: one active head at the fire, single-floor targeted response
 *   - drencher: every drencher on the fire floor is open (water curtain)
 *   - vpv (4.2): sprinklers dim, red ВПВ cabinets on 3-4 floors, hose to fire
 *   - combined (4.2): sprinklers + ВПВ both visible, manifold splits feed
 *
 * Commit 4.1 wires sprinkler + drencher. Commit 4.2 appends the other two.
 */

type Props = {
  activeType: InstallationTypeKind;
  reducedMotion: boolean;
};

// Reusing the `lakhta-*` keyframes that already exist in globals.css —
// same visual language, no need to invent a new animation vocabulary for
// this section. See `src/app/globals.css` for the definitions.
const ANIM = {
  ledBlink: "lakhta-led-blink 0.8s ease-in-out infinite",
  pumpGlow: "lakhta-pump-glow 1.2s ease-in-out infinite",
  pumpPulse: "lakhta-pump-pulse 1.2s ease-in-out infinite",
  impellerRotate: "lakhta-impeller-rotate 2s linear infinite",
  riserRise: "lakhta-riser-rise 6s linear infinite",
  riserRiseRight: "lakhta-riser-rise-right 6s linear infinite",
  horizontalFlow: "lakhta-horizontal-flow 2.4s linear infinite",
  flamePulse: "lakhta-flame-pulse 1s ease-in-out infinite",
  dropletFall: "lakhta-droplet-fall 1.2s ease-in infinite",
} as const;

export function InstallationScene({ activeType, reducedMotion }: Props) {
  const ifMotion = (anim: string): React.CSSProperties | undefined =>
    reducedMotion ? undefined : { animation: anim };

  return (
    <svg
      viewBox="0 0 600 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      data-active-type={activeType}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      role="img"
      aria-label={`Схема работы установки пожаротушения: ${activeType}`}
    >
      <defs>
        <linearGradient id="it-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>
        <radialGradient id="it-fire-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(215,38,56,0.55)" />
          <stop offset="100%" stopColor="rgba(215,38,56,0)" />
        </radialGradient>
        <radialGradient id="it-pump-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(215,38,56,0.25)" />
          <stop offset="100%" stopColor="rgba(215,38,56,0)" />
        </radialGradient>
      </defs>

      {/* Background — flat, no fade overlay. The section is meant to read
          as a clean schematic; atmospheric effects live in section 3. */}
      <rect width="600" height="1000" fill="#0a0a0a" />

      {/* Hairline grid — continuity with the rest of the firefighting page */}
      <g stroke="rgba(255,255,255,0.035)" strokeWidth={0.5}>
        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((y) => (
          <line key={`h-${y}`} x1="0" y1={y} x2="600" y2={y} />
        ))}
        {[100, 200, 300, 400, 500].map((x) => (
          <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="1000" />
        ))}
      </g>

      {/* ================== BUILDING SILHOUETTE ==================
          Paths copied verbatim from LakhtaScene — same proportions
          means section 3 → section 4 transition reads as "same
          building, different system", exactly what we want. */}
      <g stroke="rgba(255,255,255,0.5)" strokeWidth={1.2} fill="none">
        <path
          d="M 200 950 L 210 750 L 218 550 L 226 350 L 234 180 L 245 80 L 300 60 L 300 950 Z"
          fill="url(#it-glass)"
        />
        <path
          d="M 300 950 L 300 60 L 355 80 L 366 180 L 374 350 L 382 550 L 390 750 L 400 950 Z"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.3)"
        />
        <path
          d="M 296 60 L 300 20 L 304 60 Z"
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.5)"
        />
        <circle cx="300" cy="18" r="1.5" fill="rgba(255,255,255,0.7)" />
      </g>

      {/* Glass mullions */}
      <g stroke="rgba(255,255,255,0.22)" strokeWidth={0.7} fill="none">
        <line x1="220" y1="950" x2="238" y2="180" />
        <line x1="245" y1="950" x2="255" y2="180" />
        <line x1="270" y1="950" x2="275" y2="180" />
        <line x1="295" y1="950" x2="298" y2="180" />
        <line x1="305" y1="950" x2="302" y2="180" strokeOpacity={0.3} />
        <line x1="330" y1="950" x2="325" y2="180" strokeOpacity={0.3} />
        <line x1="355" y1="950" x2="345" y2="180" strokeOpacity={0.3} />
        <line x1="380" y1="950" x2="362" y2="180" strokeOpacity={0.3} />
      </g>

      {/* Floor lines */}
      <g stroke="rgba(255,255,255,0.3)" strokeWidth={0.8} fill="none">
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
        <line x1="220" y1="500" x2="380" y2="500" strokeOpacity={0.65} />
        <line x1="221" y1="460" x2="379" y2="460" strokeOpacity={0.55} />
        <line x1="222" y1="420" x2="378" y2="420" strokeOpacity={0.45} />
        <line x1="224" y1="380" x2="376" y2="380" strokeOpacity={0.35} />
        <line x1="226" y1="340" x2="374" y2="340" strokeOpacity={0.25} />
        <line x1="228" y1="300" x2="372" y2="300" strokeOpacity={0.2} />
        <line x1="232" y1="260" x2="368" y2="260" strokeOpacity={0.15} />
        <line x1="236" y1="220" x2="364" y2="220" strokeOpacity={0.1} />
      </g>

      {/* ================== PUMP STATION (always active here) ==================
          Unlike section 3 (where the station reveals step-by-step), in
          section 4 we're showing the system mid-operation. Pumps, LED,
          impellers — all on by default. */}
      <g>
        <circle
          cx="300"
          cy="925"
          r="130"
          fill="url(#it-pump-glow)"
          opacity={1}
          style={ifMotion(ANIM.pumpGlow)}
        />

        <rect
          x="160"
          y="880"
          width="280"
          height="80"
          fill="rgba(215,38,56,0.08)"
          stroke="rgba(215,38,56,0.5)"
          strokeWidth={1.2}
        />

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

        {/* Two active pumps — impeller + pulse loop */}
        {[195, 230].map((cx) => (
          <g
            key={`pump-${cx}`}
            style={{
              transformOrigin: `${cx}px 935px`,
              ...(ifMotion(ANIM.pumpPulse) ?? {}),
            }}
          >
            <circle
              cx={cx}
              cy="935"
              r="13"
              stroke="rgba(215,38,56,0.9)"
              strokeWidth={1.3}
              fill="none"
            />
            <circle cx={cx} cy="935" r="5" fill="#D72638" />
            <g
              style={{
                transformOrigin: `${cx}px 935px`,
                ...(ifMotion(ANIM.impellerRotate) ?? {}),
              }}
            >
              <line
                x1={cx - 7}
                y1="935"
                x2={cx + 7}
                y2="935"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={1}
              />
              <line
                x1={cx}
                y1="928"
                x2={cx}
                y2="942"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={1}
              />
            </g>
          </g>
        ))}

        {/* Reserve pumps — idle, dimmer */}
        {[265, 300, 335].map((cx) => (
          <circle
            key={`res-${cx}`}
            cx={cx}
            cy="935"
            r="13"
            stroke="rgba(215,38,56,0.5)"
            strokeWidth={1}
            fill="none"
          />
        ))}

        {/* Control panel + LED */}
        <rect
          x="360"
          y="920"
          width="35"
          height="30"
          stroke="#D72638"
          strokeWidth={1.6}
          fill="none"
        />
        <rect
          x="366"
          y="927"
          width="18"
          height="12"
          stroke="rgba(215,38,56,1)"
          strokeWidth={0.8}
          fill="rgba(215,38,56,0.5)"
        />
        <circle cx="365" cy="943" r="4.5" fill="#D72638" opacity={0.35} />
        <circle
          cx="365"
          cy="943"
          r="2.2"
          fill="#D72638"
          style={ifMotion(ANIM.ledBlink)}
        />
        <circle cx="372" cy="943" r="1.4" fill="rgba(215,38,56,0.4)" />
        <circle cx="379" cy="943" r="1.4" fill="rgba(215,38,56,0.4)" />
      </g>

      {/* ================== RISERS ==================
          Always flowing — the system is in operation. */}
      <line
        x1="220"
        y1="880"
        x2="238"
        y2="260"
        stroke="rgba(215,38,56,0.6)"
        strokeWidth={1.5}
      />
      <g>
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
              reducedMotion
                ? undefined
                : { animation: ANIM.riserRise, animationDelay: `${p.delay}s` }
            }
          />
        ))}
      </g>

      <line
        x1="380"
        y1="880"
        x2="362"
        y2="260"
        stroke="rgba(215,38,56,0.6)"
        strokeWidth={1.5}
      />
      <g>
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
              reducedMotion
                ? undefined
                : {
                    animation: ANIM.riserRiseRight,
                    animationDelay: `${p.delay}s`,
                  }
            }
          />
        ))}
      </g>

      <line
        x1="300"
        y1="880"
        x2="300"
        y2="450"
        stroke="rgba(215,38,56,0.5)"
        strokeWidth={1}
        strokeDasharray="3,4"
      />

      {/* ================== PER-TYPE OVERLAY ==================
          AnimatePresence with mode="sync" crossfades old and new overlays
          together for ~450ms on tab switch. The building/pumps/risers
          above sit outside this group so they never re-render — the
          reader's eye stays locked on the silhouette while the interior
          logic morphs. ease-out-expo ≈ cubic-bezier(0.16, 1, 0.3, 1). */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.g
          key={activeType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeType === "sprinkler" && (
            <SprinklerOverlay reducedMotion={reducedMotion} />
          )}
          {activeType === "drencher" && (
            <DrencherOverlay reducedMotion={reducedMotion} />
          )}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}

/* ================================================================
 * SPRINKLER — one head triggers over the fire.
 * Single targeted response to one local event.
 * ================================================================ */
function SprinklerOverlay({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <g>
      {/* Idle sprinkler grid — dim red dots on every floor showing
          coverage everywhere, not just at the fire point. Included here
          (inside the overlay) so they crossfade cleanly when drencher
          takes over. */}
      <g fill="rgba(215,38,56,0.4)">
        {[900, 860, 820, 780, 740, 700, 660, 620, 580, 540].flatMap((y, row) =>
          [260, 340].map((x) => (
            <circle
              key={`idle-${y}-${x}`}
              cx={x}
              cy={y}
              r={row > 5 ? 1.3 : row > 3 ? 1.5 : 1.8}
            />
          ))
        )}
        <circle cx="300" cy="900" r="1.8" />
        <circle cx="300" cy="860" r="1.8" />
        <circle cx="265" cy="500" r="1.2" opacity={0.7} />
        <circle cx="335" cy="500" r="1.2" opacity={0.7} />
      </g>

      {/* Horizontal feed — left riser to the fire floor. Particles flow
          continuously because the station is already delivering water
          (we're mid-event, not showing the trigger sequence). */}
      <line
        x1="238"
        y1="450"
        x2="310"
        y2="450"
        stroke="rgba(215,38,56,0.65)"
        strokeWidth={1.2}
      />
      <g>
        {[
          { cx: 260, r: 1.8, o: 0.9, delay: 0 },
          { cx: 280, r: 1.5, o: 0.75, delay: -0.8 },
          { cx: 295, r: 1.2, o: 0.6, delay: -1.6 },
        ].map((p, i) => (
          <circle
            key={`spr-wf-${i}`}
            cx={p.cx}
            cy={450}
            r={p.r}
            fill={`rgba(255,255,255,${p.o})`}
            style={
              reducedMotion
                ? undefined
                : {
                    animation: "lakhta-horizontal-flow 2.4s linear infinite",
                    animationDelay: `${p.delay}s`,
                  }
            }
          />
        ))}
      </g>

      {/* Fire zone — small, localised */}
      <g>
        <rect
          x="300"
          y="440"
          width="60"
          height="20"
          fill="rgba(215,38,56,0.08)"
          stroke="rgba(215,38,56,0.4)"
          strokeWidth={0.5}
        />
        <circle cx="330" cy="450" r="30" fill="url(#it-fire-glow)" />
        <g
          style={{
            transformOrigin: "330px 450px",
            ...(reducedMotion
              ? {}
              : { animation: "lakhta-flame-pulse 1s ease-in-out infinite" }),
          }}
        >
          <circle cx="330" cy="450" r="4" fill="#D72638" />
          <circle cx="330" cy="450" r="2" fill="#FF6B35" />
        </g>
      </g>

      {/* One active sprinkler head above the fire */}
      <g>
        <circle cx="310" cy="447" r="3" fill="rgba(255,255,255,0.95)" />
        <circle
          cx="310"
          cy="447"
          r="8"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={0.6}
        />
        <g stroke="rgba(255,255,255,0.6)" strokeWidth={0.8} fill="none">
          <line x1="310" y1="447" x2="315" y2="455" />
          <line x1="310" y1="447" x2="320" y2="456" />
          <line x1="310" y1="447" x2="325" y2="455" />
          <line x1="310" y1="447" x2="305" y2="455" />
          <line x1="310" y1="447" x2="300" y2="456" />
          <line x1="310" y1="447" x2="295" y2="455" />
        </g>
        {[
          { cx: 318, cy: 457, r: 0.8, o: 0.9, delay: 0 },
          { cx: 322, cy: 455, r: 0.6, o: 0.8, delay: -0.3 },
          { cx: 302, cy: 457, r: 0.8, o: 0.9, delay: -0.6 },
          { cx: 298, cy: 455, r: 0.6, o: 0.8, delay: -0.9 },
        ].map((d, i) => (
          <circle
            key={`spr-dp-${i}`}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={`rgba(255,255,255,${d.o})`}
            style={
              reducedMotion
                ? undefined
                : {
                    animation: "lakhta-droplet-fall 1.2s ease-in infinite",
                    animationDelay: `${d.delay}s`,
                  }
            }
          />
        ))}
      </g>

      {/* Caption */}
      <g
        fontFamily="monospace"
        fill="rgba(255,255,255,0.5)"
        fontSize="9"
        letterSpacing="2"
      >
        <text x="420" y="447">
          1 ГОЛОВА
        </text>
        <text x="420" y="460" fontSize="7" fill="rgba(255,255,255,0.35)">
          ТОЧКА СРАБАТЫВАНИЯ
        </text>
      </g>
    </g>
  );
}

/* ================================================================
 * DRENCHER — whole floor opens at once.
 * Mass water curtain, no localised point.
 * ================================================================ */
function DrencherOverlay({ reducedMotion }: { reducedMotion: boolean }) {
  // Eight drencher positions across the fire floor — evenly spaced to
  // read as "every head on this floor is open". Ends are tucked inside
  // the building width at y=450 (same floor as sprinkler's single head).
  const drencherXs = [228, 248, 268, 288, 308, 328, 348, 368];

  return (
    <g>
      {/* Full-width horizontal feed spanning both risers */}
      <line
        x1="238"
        y1="450"
        x2="362"
        y2="450"
        stroke="rgba(215,38,56,0.7)"
        strokeWidth={1.4}
      />
      {/* Bidirectional flow — particles from both sides converge to the
          centre. Baked as two sequences of circles with opposite delays
          so the flow visibly comes from both risers at once. */}
      <g>
        {[
          { cx: 252, delay: 0 },
          { cx: 272, delay: -0.6 },
          { cx: 292, delay: -1.2 },
          { cx: 348, delay: -0.2 },
          { cx: 328, delay: -0.8 },
          { cx: 312, delay: -1.4 },
        ].map((p, i) => (
          <circle
            key={`drn-wf-${i}`}
            cx={p.cx}
            cy={450}
            r={1.5}
            fill="rgba(255,255,255,0.8)"
            style={
              reducedMotion
                ? undefined
                : {
                    animation: "lakhta-horizontal-flow 2.4s linear infinite",
                    animationDelay: `${p.delay}s`,
                  }
            }
          />
        ))}
      </g>

      {/* Fire zone — wider than sprinkler, spans the entire floor */}
      <rect
        x="216"
        y="440"
        width="168"
        height="20"
        fill="rgba(215,38,56,0.1)"
        stroke="rgba(215,38,56,0.4)"
        strokeWidth={0.5}
      />
      {/* Two glow hot-spots to suggest multi-point ignition the curtain
          is responding to — keeps us from implying a single localised fire. */}
      <circle cx="260" cy="450" r="28" fill="url(#it-fire-glow)" opacity={0.7} />
      <circle cx="340" cy="450" r="28" fill="url(#it-fire-glow)" opacity={0.7} />
      <g
        style={{
          transformOrigin: "260px 450px",
          ...(reducedMotion
            ? {}
            : { animation: "lakhta-flame-pulse 1s ease-in-out infinite" }),
        }}
      >
        <circle cx="260" cy="450" r="3" fill="#D72638" />
        <circle cx="260" cy="450" r="1.5" fill="#FF6B35" />
      </g>
      <g
        style={{
          transformOrigin: "340px 450px",
          ...(reducedMotion
            ? {}
            : { animation: "lakhta-flame-pulse 1s ease-in-out infinite" }),
        }}
      >
        <circle cx="340" cy="450" r="3" fill="#D72638" />
        <circle cx="340" cy="450" r="1.5" fill="#FF6B35" />
      </g>

      {/* Drencher heads — every position open */}
      {drencherXs.map((x, idx) => (
        <g key={`drn-head-${x}`}>
          <circle cx={x} cy={447} r={2.4} fill="rgba(255,255,255,0.95)" />
          <circle
            cx={x}
            cy={447}
            r={6}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={0.6}
          />
          {/* Three spray arms per head */}
          <g stroke="rgba(255,255,255,0.5)" strokeWidth={0.7} fill="none">
            <line x1={x} y1={447} x2={x - 5} y2={455} />
            <line x1={x} y1={447} x2={x} y2={457} />
            <line x1={x} y1={447} x2={x + 5} y2={455} />
          </g>
          {/* Two droplets per head, staggered by index so the curtain
              doesn't pulse as a single unit */}
          <circle
            cx={x - 3}
            cy={460}
            r={0.7}
            fill="rgba(255,255,255,0.85)"
            style={
              reducedMotion
                ? undefined
                : {
                    animation: "lakhta-droplet-fall 1.2s ease-in infinite",
                    animationDelay: `${-(idx * 0.15)}s`,
                  }
            }
          />
          <circle
            cx={x + 3}
            cy={460}
            r={0.7}
            fill="rgba(255,255,255,0.85)"
            style={
              reducedMotion
                ? undefined
                : {
                    animation: "lakhta-droplet-fall 1.2s ease-in infinite",
                    animationDelay: `${-(idx * 0.15) - 0.6}s`,
                  }
            }
          />
        </g>
      ))}

      {/* Caption */}
      <g
        fontFamily="monospace"
        fill="rgba(255,255,255,0.5)"
        fontSize="9"
        letterSpacing="2"
      >
        <text x="420" y="447">
          8 ГОЛОВ
        </text>
        <text x="420" y="460" fontSize="7" fill="rgba(255,255,255,0.35)">
          ВОДЯНАЯ ЗАВЕСА
        </text>
      </g>
    </g>
  );
}
