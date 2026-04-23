"use client";

import { useMemo, useState } from "react";
import { scenarioBComponents } from "@/content/products/firefighting-scenario-b";
import { IsometricDiagram } from "./IsometricDiagram";
import { FlowParticles } from "./FlowParticles";
import { ComponentPanel } from "./ComponentPanel";

/**
 * Scenario-B orchestrator.
 *
 * Owns two pieces of state:
 *   - `selectedId` — the node whose spec is currently shown in the
 *     panel. Null means the panel is in its default "legend" state.
 *   - `hoveredId` — drives transient visual hint only, not the panel
 *     (so the panel doesn't flash as the cursor wanders).
 *
 * Everything else (pipe geometry, glyph drawing, particle motion) is
 * delegated to the children. That keeps each piece small and makes it
 * easy to swap one without touching the others during the sandbox
 * phase.
 *
 * The `--accent-current` token is set to the fire-red here so particles
 * and selected glyphs pick up the firefighting product accent without
 * per-component wiring.
 */
export function ScenarioBScene() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selected = useMemo(
    () => scenarioBComponents.find((c) => c.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <section
      className="relative min-h-[100svh] bg-[var(--color-primary)]"
      style={{ ["--accent-current" as string]: "var(--accent-fire)" }}
    >
      {/* Section title + mono breadcrumb — gives the sandbox some
          context that this is a "how it works" exploration. */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-16 md:px-12 md:pt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/50">
          02 · Scenario B — изометрическая схема
        </p>
        <h2 className="mt-3 max-w-[640px] text-2xl font-medium leading-tight text-[var(--color-secondary)] md:text-3xl">
          Десять узлов насосной станции. Наведите или кликните, чтобы увидеть
          полную спецификацию.
        </h2>
      </div>

      {/* Main split — diagram + panel. On mobile the panel stacks below
          the diagram; on desktop it occupies a fixed 360px column. */}
      <div className="mx-auto mt-10 grid w-full max-w-[1440px] grid-cols-1 gap-8 px-6 pb-20 md:grid-cols-[1fr_360px] md:gap-10 md:px-12 md:pb-24">
        {/* Diagram stage — holds SVG + ambient particles in the same
            absolutely-positioned frame so coordinates align. */}
        <div className="relative aspect-[1200/720] w-full overflow-hidden rounded-sm border border-[var(--color-hairline)] bg-[var(--color-primary)]">
          <IsometricDiagram
            components={scenarioBComponents}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={setSelectedId}
            onHover={setHoveredId}
          />
          <FlowParticles />

          {/* Bottom hint — disappears once anything is interacted with. */}
          <div
            className={
              "pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 transition-opacity duration-500 " +
              (selectedId || hoveredId ? "opacity-0" : "opacity-100")
            }
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/45">
              Наведите на любой элемент →
            </p>
          </div>
        </div>

        {/* Side panel — fixed column on desktop, natural height on
            mobile. Uses sticky top so it follows the scroll when the
            diagram is taller than the viewport. */}
        <div className="md:col-start-2">
          <ComponentPanel component={selected} onClose={() => setSelectedId(null)} />
        </div>
      </div>
    </section>
  );
}
