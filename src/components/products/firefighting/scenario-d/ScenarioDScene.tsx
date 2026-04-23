"use client";

import { useState } from "react";
import { scenarioDLayers } from "@/content/products/firefighting-scenario-d";
import { XraySection } from "./XraySection";
import { ScanLine } from "./ScanLine";
import { LayerToggle } from "./LayerToggle";
import { AnnotationOverlay } from "./AnnotationOverlay";

/**
 * Scenario-D orchestrator.
 *
 * Owns three pieces of state:
 *   - `visible` — per-layer visibility flags (architecture/plumbing/
 *     equipment), toggled by LayerToggle.
 *   - `scanY` — normalised Y position of the scan line (0..1). Pushed
 *     here from ScanLine's framer-motion onUpdate so XraySection can
 *     emit local glows at whichever component the scan is crossing.
 *   - `highlightedId` — which annotation the user is currently hovering.
 *     Drives accent-red colouring on the annotation + glyph.
 *
 * The three SVG layers are stacked absolutely inside the same aspect-
 * ratio box so their viewBoxes resolve to identical screen coords.
 *
 * Accent token is set to `--accent-water` here (cool cyan) so the
 * whole x-ray reads as cold/diagnostic, opposite to the warm-fire
 * accent used in A/B/C.
 */
export function ScenarioDScene() {
  const [visible, setVisible] = useState(() =>
    scenarioDLayers.reduce(
      (acc, l) => {
        acc[l.id] = l.defaultOn;
        return acc;
      },
      {} as Record<(typeof scenarioDLayers)[number]["id"], boolean>,
    ),
  );
  const [scanY, setScanY] = useState(0.1);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const toggleLayer = (id: (typeof scenarioDLayers)[number]["id"]) =>
    setVisible((v) => ({ ...v, [id]: !v[id] }));

  return (
    <section
      className="relative bg-[var(--color-primary)]"
      style={{ ["--accent-current" as string]: "var(--accent-water)" }}
    >
      {/* Header — mono label + title */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-16 md:px-12 md:pt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/50">
          04 · Scenario D — рентген системы
        </p>
        <h2 className="mt-3 max-w-[720px] text-2xl font-medium leading-tight text-[var(--color-secondary)] md:text-3xl">
          Здание как снимок. Отключайте слои, чтобы увидеть, что осталось.
        </h2>

        {/* Layer toggles + scan hint */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <LayerToggle visible={visible} onToggle={toggleLayer} />
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40">
            SCAN · {String(Math.round(scanY * 100)).padStart(2, "0")}%
          </p>
        </div>
      </div>

      {/* The x-ray stage — three overlaid SVGs sharing the same viewBox */}
      <div className="mx-auto mt-8 w-full max-w-[1440px] px-6 pb-20 md:px-12 md:pb-24">
        <div className="relative aspect-[1200/720] w-full overflow-hidden rounded-sm border border-[var(--color-hairline)] bg-[var(--color-primary)]">
          {/* Base drawing */}
          <XraySection
            visible={visible}
            highlightedId={highlightedId}
            scanY={scanY}
          />
          {/* Scan line on top of drawing */}
          <ScanLine onProgress={setScanY} />
          {/* Annotation text — topmost so labels stay readable */}
          <AnnotationOverlay
            visible={{ plumbing: visible.plumbing, equipment: visible.equipment }}
            highlightedId={highlightedId}
            onHighlight={setHighlightedId}
          />

          {/* Footer hint inside the stage — diagnostic caption */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/35">
              Скан сверху вниз · наведите на [NN] для выделения
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
