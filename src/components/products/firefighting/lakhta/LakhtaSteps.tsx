"use client";

import type { FireSystem } from "@/content/products/firefighting-systems";

/**
 * Step viewer for the «Как срабатывает» section.
 *
 * Two layout variants behind one component, picked via the `compact`
 * prop:
 *
 *   • RAIL (default, desktop): a vertical button-list with the active
 *     step's body rendered below it. Used in the desktop 2-col layout
 *     where the rail sits to the left of the Lakhta scene.
 *
 *   • COMPACT (`compact={true}`, mobile): a 2×3 grid of chip buttons
 *     followed by the body card. Designed to live directly under the
 *     Lakhta scene on phones so the user can see both the chip they're
 *     tapping and the tower changing in the same viewport. Without this
 *     variant the rail rendered tall enough that the tower scrolled
 *     out of view by the time the user reached step 03+.
 *
 * Both variants:
 *   - Drive the same `activeStep` parent state via `onSelectStep`.
 *   - Use the same body-card layout (`[mono] TITLE` + body) so a system
 *     switch produces the same content regardless of viewport.
 *   - Hover-states are gated to `@media (hover: hover)` so the last
 *     tapped chip / row doesn't stay highlighted on iOS after the tap.
 *
 * The section header (label + h2 + intro) lives in the parent now —
 * keeping it here too duplicated «03 ·» on screen.
 */

type Props = {
  activeStep: number;
  steps: FireSystem["steps"];
  onSelectStep: (index: number) => void;
  /**
   * When true, render the 2×3 chip grid layout (mobile-friendly).
   * When false / omitted, render the desktop rail.
   */
  compact?: boolean;
};

// Body-card height budget — longest body among sprinkler + drencher
// step 06 renders at ~3 lines × ~24px leading ≈ 72px; plus the mono
// label (~18px) and 12px top gap → ~102px. Rounded up to 128px for a
// buffer so font-rendering differences across devices don't cause
// jitter on system change. Compact uses 112px (one more line of
// vertical breathing room is fine on mobile, but a tighter bound keeps
// the body card close to the chips above).
const STEP_BODY_MIN_H = 128;
const STEP_BODY_MIN_H_COMPACT = 112;

export function LakhtaSteps({
  activeStep,
  steps,
  onSelectStep,
  compact = false,
}: Props) {
  const safeIndex = Math.min(Math.max(activeStep, 0), steps.length - 1);
  const active = steps[safeIndex];

  if (compact) {
    return (
      <div className="flex flex-col gap-4">
        {/* 2-column chip grid — three rows × two chips. Each chip lists
            the mono code + step title. Active chip lights up in the
            firefighting accent (border + mono colour); past / future
            stay neutral. Min-height keeps the chip a comfortable
            touch-target (>= 44px). */}
        <ol
          className="grid grid-cols-2 gap-2"
          role="list"
          aria-label="Шаги срабатывания"
        >
          {steps.map((step) => {
            const isActive = step.index === activeStep;
            return (
              <li key={step.index}>
                <button
                  type="button"
                  onClick={() => onSelectStep(step.index)}
                  aria-pressed={isActive}
                  data-active={isActive ? "true" : "false"}
                  className={[
                    "group flex min-h-[60px] w-full flex-col items-start justify-center gap-1 rounded-md border px-3 py-2 text-left transition-colors",
                    "[@media(hover:hover)]:hover:border-[var(--accent-fire)]/60",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-fire)]/60",
                    isActive
                      ? "border-[var(--accent-fire)] bg-[var(--accent-fire)]/10"
                      : "border-[var(--color-hairline)] bg-transparent",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                      isActive
                        ? "text-[var(--accent-fire)]"
                        : "text-[var(--color-secondary)]/55",
                    ].join(" ")}
                  >
                    {step.mono}
                  </span>
                  <span
                    className={[
                      "text-[13px] font-medium leading-tight transition-colors",
                      isActive
                        ? "text-[var(--color-secondary)]"
                        : "text-[var(--color-secondary)]/75",
                    ].join(" ")}
                  >
                    {step.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Body card — same content as the desktop rail. Slightly
            tighter min-height (112 vs 128) since mobile typography is
            naturally a hair smaller. */}
        <div
          className="border-t border-[var(--color-hairline)] pt-4"
          style={{ minHeight: STEP_BODY_MIN_H_COMPACT }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-fire)]">
            [{active.mono}] {active.title.toUpperCase()}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-secondary)]/80">
            {active.body}
          </p>
        </div>
      </div>
    );
  }

  // Desktop rail — vertical button list with body card below.
  return (
    <div className="flex h-full flex-col gap-8">
      <ol className="space-y-0" role="list">
        {steps.map((step) => {
          const isActive = step.index === activeStep;
          const isPast = step.index < activeStep;
          return (
            <li key={step.index}>
              <button
                type="button"
                onClick={() => onSelectStep(step.index)}
                aria-pressed={isActive}
                data-active={isActive ? "true" : "false"}
                data-past={isPast ? "true" : "false"}
                className="group relative block w-full border-l border-[var(--color-hairline)] py-3 pl-5 text-left transition-colors data-[active=true]:border-[var(--accent-fire)] [@media(hover:hover)]:hover:border-[var(--accent-fire)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-fire)]/60"
              >
                {/* Active marker — a 2px accent bar that occupies the
                    left border slot cleanly. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[var(--accent-fire)] transition-transform duration-300 ease-out group-data-[active=true]:scale-y-100"
                />

                <div className="flex items-baseline gap-3">
                  <span
                    className={[
                      "font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                      isActive
                        ? "text-[var(--accent-fire)]"
                        : isPast
                          ? "text-[var(--color-secondary)]/55"
                          : "text-[var(--color-secondary)]/35",
                    ].join(" ")}
                  >
                    {step.mono}
                  </span>
                  <span
                    className={[
                      "text-base font-medium transition-colors",
                      isActive
                        ? "text-[var(--color-secondary)]"
                        : isPast
                          ? "text-[var(--color-secondary)]/70"
                          : "text-[var(--color-secondary)]/55",
                    ].join(" ")}
                  >
                    {step.title}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Active step body — one block that updates as activeStep
          changes, kept below the list so the reader's eye has a stable
          anchor. min-height locked so a system switch that swaps in
          shorter copy doesn't collapse the card. */}
      <div
        className="max-w-[420px] border-t border-[var(--color-hairline)] pt-6"
        style={{ minHeight: STEP_BODY_MIN_H }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-fire)]">
          [{active.mono}] {active.title.toUpperCase()}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)]/80">
          {active.body}
        </p>
      </div>
    </div>
  );
}
