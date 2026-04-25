"use client";

import { useEffect, useMemo, useState } from "react";
import {
  fireSystems,
  type FireSystemId,
} from "@/content/products/firefighting-systems";
import { LakhtaScene } from "./LakhtaScene";
import { LakhtaSteps } from "./LakhtaSteps";
import { SystemDetailCard } from "./SystemDetailCard";
import { SystemTabs } from "./SystemTabs";

/**
 * Section 3 «Как срабатывает» — interactive step viewer for the
 * firefighting product page.
 *
 * Original implementation used a pinned GSAP ScrollTrigger: the section
 * was pinned to the viewport while the user scrolled, and `activeStep`
 * advanced through the 6 beats based on scrub progress. Two problems
 * with that:
 *   - On desktop the pin sometimes felt stuck — long page above the
 *     section pushed the pin-spacer math into edge cases where Safari
 *     froze the scrub mid-beat.
 *   - On mobile the pin was disabled (40/60 layout collapsed and there
 *     was no headroom to anchor against). The section then read as
 *     6 stacked beats with a separate SVG below — the connection
 *     between rail and scene was visually lost.
 *
 * New model: tap / click on a step in the rail → `activeStep` updates →
 * the Lakhta scene repaints with the corresponding overlay. No
 * scroll-pin, no GSAP. Identical behaviour on mobile and desktop;
 * Framer Motion in the children handles any in-place animations.
 *
 * Layout:
 *   - Desktop (≥md): grid `2fr | 3fr`. Steps left, scene right (as
 *     before).
 *   - Mobile (<md): compact stack. Tower at the top, capped at 42svh
 *     so it fits in the upper half of the viewport, then a 2×3 grid
 *     of step chips, then the active-step body card. Designed so the
 *     user can see both the chip they tap and the tower repaint in
 *     the same viewport — the previous variant had a tall vertical
 *     rail under the tower, so by step 03+ the tower had scrolled
 *     out of view and the connection was lost again.
 *
 * Two state streams, no overlap:
 *   - `activeStep` (0..5) — driven by user click on rail buttons.
 *   - `activeSystem` — driven by the SystemTabs switcher above the
 *     scene. Default «sprinkler». Changing it swaps scene overlays +
 *     step body copy; activeStep is preserved (still 0..5 → just
 *     points at the new variant).
 *
 * `reducedMotion` is resolved once on mount and passed to LakhtaScene +
 * SystemDetailCard so they can skip transitions. The rail itself has
 * only short colour transitions — those stay as ordinary CSS regardless.
 */
export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSystem, setActiveSystem] = useState<FireSystemId>("sprinkler");
  const [reducedMotion, setReducedMotion] = useState(false);

  // Memoise the active system's step array so LakhtaSteps doesn't see
  // a new identity on every render (the array itself is stable from
  // the content module, but guard against future refactors).
  const system = useMemo(
    () => fireSystems.find((s) => s.id === activeSystem) ?? fireSystems[0],
    [activeSystem],
  );

  // When system changes, clamp activeStep to the new system's range.
  // All systems today have 6 steps, but guard against future variants.
  useEffect(() => {
    if (activeStep >= system.steps.length) {
      setActiveStep(system.steps.length - 1);
    }
  }, [system.steps.length, activeStep]);

  // Read prefers-reduced-motion once on mount and listen for changes
  // so the user toggling their OS preference mid-session still works.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      className="relative bg-[var(--color-primary)]"
      style={{ ["--accent-current" as string]: "var(--accent-fire)" }}
      aria-label="Как срабатывает насосная станция пожаротушения"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-30"
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 md:gap-12 md:px-12 md:py-20">
        {/* Section header — label + title */}
        <header className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/65">
            03 · Типы АПТ и как они срабатывают
          </p>
          <h2 className="max-w-[720px] text-2xl font-medium leading-tight text-[var(--color-secondary)] md:text-4xl">
            Четыре системы пожаротушения — один завод под каждую.
          </h2>
          <p className="max-w-[640px] text-sm leading-relaxed text-[var(--color-secondary)]/65 md:text-base">
            Выберите тип установки — на схеме перестроится внутренняя
            логика здания. Тапайте по шагам ниже, чтобы пройти
            последовательность срабатывания. Вся работа автоматическая,
            занимает секунды.
          </p>
        </header>

        {/* System switcher + detail card */}
        <div className="flex flex-col gap-6 md:gap-8">
          <SystemTabs
            systems={fireSystems}
            activeId={activeSystem}
            onSelect={setActiveSystem}
          />
          <SystemDetailCard system={system} instant={reducedMotion} />
        </div>

        {/* Mobile branch: compact stack (tower → chips → body).
            Tower height capped at 42svh so chips and body land in the
            same viewport. SVG keeps its 600:1000 aspect; the
            max-h-based constraint shrinks width too, giving a narrow
            centred tower with chips directly underneath. */}
        <div className="md:hidden">
          <div className="relative mx-auto flex aspect-[600/1000] max-h-[42svh] w-auto items-start justify-center">
            <LakhtaScene
              activeStep={activeStep}
              activeSystem={activeSystem}
              reducedMotion={reducedMotion}
            />
          </div>
          <div className="mt-6">
            <LakhtaSteps
              activeStep={activeStep}
              steps={system.steps}
              onSelectStep={setActiveStep}
              compact
            />
          </div>
        </div>

        {/* Desktop branch: 40/60 grid — rail left, scene right.
            Both visible at once on md+, so no compact mode needed. */}
        <div className="hidden md:grid md:grid-cols-[minmax(320px,2fr)_minmax(0,3fr)] md:gap-14">
          <div className="relative self-start">
            <LakhtaSteps
              activeStep={activeStep}
              steps={system.steps}
              onSelectStep={setActiveStep}
            />
          </div>

          {/* Scene stage — the SVG is square-ish portrait (600:1000),
              so we let it flex to its natural aspect inside the
              column. */}
          <div className="relative flex items-start justify-center pt-2">
            <div className="relative aspect-[600/1000] w-full max-w-[620px]">
              <LakhtaScene
                activeStep={activeStep}
                activeSystem={activeSystem}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
