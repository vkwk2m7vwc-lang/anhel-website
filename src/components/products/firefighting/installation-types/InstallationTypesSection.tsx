"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductContent } from "@/content/products/types";
import { InstallationTabs } from "./InstallationTabs";
import { InstallationScene } from "./InstallationScene";

/**
 * Section 4 «Типы установок» — wraps tab rail + scene + active-type
 * detail card.
 *
 * Unlike section 3 (which is scroll-driven via GSAP ScrollTrigger), this
 * section is click-driven — the user picks a tab, the scene crossfades
 * inside the SVG, the detail card underneath the tabs swaps with the
 * same timing. Mobile-first: the 40/60 grid collapses to a single
 * column, the scene sits above the tab rail + detail card.
 *
 * `prefers-reduced-motion` is respected by passing `reducedMotion` into
 * the scene so it freezes continuous loops (particles, LED blink, etc.)
 * The tab crossfade itself is a short 450ms opacity transition — fine
 * to leave on even for reduced-motion users, since it's not looping.
 *
 * Commit 4.1 ships with `types` containing spinkler + drencher only;
 * commit 4.2 appends the other two and the rail automatically grows.
 */
export function InstallationTypesSection({
  types,
}: {
  types: NonNullable<ProductContent["installationTypes"]>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect the OS preference live — same pattern as HowItWorksSection.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const active = types[activeIndex];

  return (
    <section
      className="relative bg-[var(--color-primary)]"
      style={{ ["--accent-current" as string]: "var(--accent-fire)" }}
      aria-label="Типы установок пожаротушения"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-30"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[minmax(320px,2fr)_minmax(0,3fr)] md:gap-14 md:px-12 md:py-24">
        {/* Left rail — section label, tab list, active detail card */}
        <div className="flex flex-col gap-12">
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/50">
              04 · Типы установок
            </p>
            <h2 className="max-w-[420px] text-2xl font-medium leading-tight text-[var(--color-secondary)] md:text-3xl">
              Четыре способа потушить — один завод под каждый.
            </h2>
            <p className="max-w-[420px] text-sm leading-relaxed text-[var(--color-secondary)]/60">
              Выберите тип установки — на схеме справа перестроится
              внутренняя логика здания: где открываются оросители, куда
              идёт вода, как ведёт себя система при срабатывании.
            </p>
          </div>

          <InstallationTabs
            types={types}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />

          {/* Active detail card — body + object list for the selected type.
              AnimatePresence wraps the whole card so tagline → body →
              objects swap as one block (cleaner than animating each line
              separately). */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.kind}
              id={`installation-panel-${active.kind}`}
              role="tabpanel"
              aria-labelledby={`installation-tab-${active.kind}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[420px] border-t border-[var(--color-hairline)] pt-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-fire)]">
                [{active.mono}] {active.title.toUpperCase()}
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-secondary)]">
                {active.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)]/70">
                {active.body}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40">
                  Где применяется
                </span>
                <span className="h-px flex-1 bg-[var(--color-hairline)]" />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/70">
                {active.objects.join(" · ")}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scene stage — same portrait aspect as section 3 for visual
            continuity. Crossfade between types happens inside the SVG. */}
        <div className="relative flex items-start justify-center pt-2">
          <div className="relative aspect-[600/1000] w-full max-w-[620px]">
            <InstallationScene
              activeType={active.kind}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
