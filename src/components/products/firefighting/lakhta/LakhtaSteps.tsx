"use client";

import { howItWorksSteps } from "@/content/products/firefighting-how-it-works";

/**
 * Left-rail step menu for the "Как срабатывает" section.
 *
 * Sticky inside the pinned section so the list of steps stays visible
 * while the right column (SVG) animates through the narrative. The
 * currently-active step is highlighted with the firefighting red
 * accent (#D72638) and an indicator bar, everything else sits at
 * low opacity.
 *
 * The title + body of the active step is surfaced here too — it's
 * what the reader actually follows while they scroll. Previous steps
 * "fade down" so they remain readable as context; future steps stay
 * dim to signal "not there yet".
 *
 * Click handlers are intentionally omitted in this iteration. The
 * section is scroll-driven by design; adding click-to-jump would make
 * the narrative feel like a slideshow instead of a continuous read.
 * We can revisit in a later pass if user-testing shows friction.
 */

type Props = {
  activeStep: number;
};

export function LakhtaSteps({ activeStep }: Props) {
  const active = howItWorksSteps[activeStep] ?? howItWorksSteps[0];

  return (
    <div className="flex h-full flex-col justify-between gap-12 py-4">
      {/* Section label */}
      <div className="space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/50">
          03 · Как срабатывает
        </p>
        <h2 className="max-w-[360px] text-2xl font-medium leading-tight text-[var(--color-secondary)] md:text-3xl">
          Шесть шагов от первой искры до локализации.
        </h2>
        <p className="max-w-[360px] text-sm leading-relaxed text-[var(--color-secondary)]/60">
          Прокрутите секцию — на схеме справа подсветятся элементы, которые
          срабатывают на каждом этапе. Вся последовательность —
          автоматическая, занимает секунды.
        </p>
      </div>

      {/* Step list */}
      <ol className="space-y-0" role="list">
        {howItWorksSteps.map((step) => {
          const isActive = step.index === activeStep;
          const isPast = step.index < activeStep;
          return (
            <li
              key={step.index}
              data-active={isActive ? "true" : "false"}
              data-past={isPast ? "true" : "false"}
              className="group relative border-l border-[var(--color-hairline)] py-3 pl-5 transition-colors data-[active=true]:border-[var(--accent-fire)]"
            >
              {/* Active marker — a 2px accent bar that occupies the left border
                  slot cleanly. */}
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
            </li>
          );
        })}
      </ol>

      {/* Active step body — one block that updates as activeStep changes,
          kept below the list so the reader's eye has a stable anchor. */}
      <div className="max-w-[420px] border-t border-[var(--color-hairline)] pt-6">
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
