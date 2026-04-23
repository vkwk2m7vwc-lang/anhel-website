"use client";

import { motion } from "framer-motion";
import type { ScenarioAStep } from "@/content/products/firefighting-scenario-a";

/**
 * Left-side steps rail.
 *
 * Six rows, each: mono number → title → (active-state: short body).
 * A thin vertical spine connects the steps; a moving dot marks the
 * active one. Inactive steps read dim, active step is full contrast.
 *
 * The rail is sticky inside the pinned section, so as the user scrolls
 * through the 6 beats the rail stays in view and the active step
 * advances. Body copy for the active step renders beneath the title
 * with a soft fade — gives enough context without crowding the SVG.
 *
 * On mobile (< md) the rail collapses into a horizontal progress-style
 * strip at the top. Seeing both the diagram and the full step list is
 * impossible at phone widths, so we keep the diagram dominant and
 * surface just the current step label as a caption.
 */
export function StepsRail({
  steps,
  activeIndex,
}: {
  steps: readonly ScenarioAStep[];
  activeIndex: number;
}) {
  return (
    <>
      {/* Desktop / tablet — vertical rail */}
      <nav
        aria-label="Шаги сценария"
        className="hidden md:block"
      >
        <p className="mono-tag">Sandbox · A · Небоскрёб</p>
        <h2 className="mt-6 font-display text-[28px] font-medium leading-tight text-[var(--color-secondary)] md:text-[32px]">
          Как срабатывает
          <br />
          насосная станция
        </h2>
        <p className="mt-4 max-w-[300px] text-sm text-[var(--color-secondary)]/55">
          Шесть шагов — от детектирования очага до локализации. Прокручивай,
          чтобы пройти последовательность.
        </p>

        <ol className="relative mt-10 flex flex-col gap-6">
          {/* Spine — the thin vertical line behind the numbers. */}
          <span
            aria-hidden="true"
            className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-[var(--color-hairline)]"
          />
          {/* Moving accent segment — height proportional to active index */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[11px] top-2 w-px bg-[var(--accent-current)]"
            initial={false}
            animate={{
              height: `${(activeIndex / Math.max(1, steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {steps.map((step) => {
            const isActive = step.index === activeIndex;
            const isPast = step.index < activeIndex;
            return (
              <li key={step.index} className="relative flex items-start gap-4 pl-6">
                {/* Bullet — filled when active or past, hollow otherwise */}
                <span
                  aria-hidden="true"
                  className={
                    "absolute left-[6px] top-[5px] block h-[11px] w-[11px] rounded-full border transition-all duration-500 " +
                    (isActive
                      ? "border-[var(--accent-current)] bg-[var(--accent-current)] shadow-[0_0_0_3px_rgba(215,38,56,0.15)]"
                      : isPast
                        ? "border-[var(--accent-current)]/60 bg-[var(--accent-current)]/60"
                        : "border-[var(--color-secondary)]/25 bg-[var(--color-primary)]")
                  }
                />

                <div className="min-w-0 flex-1">
                  <p
                    className={
                      "font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-500 " +
                      (isActive
                        ? "text-[var(--accent-current)]"
                        : "text-[var(--color-secondary)]/35")
                    }
                  >
                    {step.mono}
                  </p>
                  <p
                    className={
                      "mt-1 font-display text-[15px] font-medium leading-snug transition-colors duration-500 md:text-[17px] " +
                      (isActive
                        ? "text-[var(--color-secondary)]"
                        : "text-[var(--color-secondary)]/45")
                    }
                  >
                    {step.title}
                  </p>
                  {/* Body — only renders for the active step; uses
                      AnimatePresence-less height animation to avoid
                      layout shift rippling through the rail. */}
                  <motion.p
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      height: isActive ? "auto" : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden text-sm leading-relaxed text-[var(--color-secondary)]/65"
                  >
                    <span className="mt-2 block max-w-[300px]">{step.body}</span>
                  </motion.p>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile — compact caption with step number + current title */}
      <div className="md:hidden">
        <p className="mono-tag">
          Шаг {activeIndex + 1} / {steps.length} · {steps[activeIndex].mono}
        </p>
        <h3 className="mt-2 font-display text-[22px] font-medium leading-tight text-[var(--color-secondary)]">
          {steps[activeIndex].title}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-secondary)]/60">
          {steps[activeIndex].body}
        </p>
      </div>
    </>
  );
}
