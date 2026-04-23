"use client";

import type { FireSystem } from "@/content/products/firefighting-systems";

/**
 * Step rail for the "Как срабатывает" section. Pure list — no own
 * header, no external body card. Both responsibilities moved out:
 *
 *   - Section header (mono tag + H2 + subcopy) lives once at the top
 *     of the section (HowItWorksSection), not here. The previous
 *     composition had a duplicate "03 · Как срабатывает" title
 *     inside this component in addition to the outer section header
 *     above the tabs — two numbers, two titles, read as two sections.
 *
 *   - Active-step body now renders inline inside the active `<li>` as
 *     a mini accordion expansion. The dim items stay thin; the active
 *     item grows to show the copy. This collapses three stacked blocks
 *     (detail card / step rail / body card) into two (detail card /
 *     step rail), buying back ~130px of vertical height in the left
 *     column so everything fits in a 900px viewport without scrolling.
 *
 * Height-lock: active `<li>` is pinned to `ACTIVE_STEP_MIN_H`. This
 * preserves the pin-spacer invariant on system change — steps 02 / 05
 * / 06 swap copy per system, so without the lock the rail's total
 * height would oscillate by ~20-30px and ScrollTrigger would want to
 * refresh its pin-spacer. With the lock, the outer box stays still.
 *
 * Click handlers intentionally omitted: scroll-driven by design. Adding
 * click-to-jump would turn the narrative into a slideshow.
 */

type Props = {
  activeStep: number;
  steps: FireSystem["steps"];
};

// Active-item min-height. Longest body among sprinkler+drencher
// steps 02/05/06 is ~34 words → ~3 lines × 20px leading = ~60px. Plus
// the row header (mono + title ≈ 22px) + 12px gap above body + 16px
// bottom padding ≈ 110px. Rounded up to 132 for a 16-22px cushion —
// stays within the 8-16px policy at worst-case rendering, and gives
// room for a slightly longer ВПВ / combined body in 4.2 without
// another measurement pass. Re-measure if 4.2 copy exceeds ~38 words
// in any of 02/05/06.
const ACTIVE_STEP_MIN_H = 132;

export function LakhtaSteps({ activeStep, steps }: Props) {
  return (
    <ol className="space-y-0" role="list">
      {steps.map((step) => {
        const isActive = step.index === activeStep;
        const isPast = step.index < activeStep;
        return (
          <li
            key={step.index}
            data-active={isActive ? "true" : "false"}
            data-past={isPast ? "true" : "false"}
            style={isActive ? { minHeight: ACTIVE_STEP_MIN_H } : undefined}
            className="group relative border-l border-[var(--color-hairline)] py-3 pl-5 transition-colors data-[active=true]:border-[var(--accent-fire)]"
          >
            {/* Active marker — 2px accent bar occupying the left border
                slot cleanly. Grows top-to-bottom on activation. */}
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
                      : "text-[var(--color-secondary)]/25",
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
                      : "text-[var(--color-secondary)]/35",
                ].join(" ")}
              >
                {step.title}
              </span>
            </div>

            {/* Inline body — only rendered for the active step. No
                CSS entrance animation: the section is scroll-scrubbed
                at 0.4 buffer, so the step change already reads smoothly
                on scroll. Adding a fade-in here would fight the scrub
                and feel laggy on fast scroll. On system switch the
                rail swap is covered by the accent-bar transition. */}
            {isActive && (
              <p className="mt-3 max-w-[420px] text-sm leading-relaxed text-[var(--color-secondary)]/80">
                {step.body}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
