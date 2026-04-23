"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  fireSystems,
  type FireSystemId,
} from "@/content/products/firefighting-systems";
import { LakhtaScene } from "./LakhtaScene";
import { LakhtaSteps } from "./LakhtaSteps";
import { SystemDetailCard } from "./SystemDetailCard";
import { SystemTabs } from "./SystemTabs";

/**
 * Section 3 "Как срабатывает" — the pinned scroll-driven story about
 * how the pump station responds to a fire. This is the narrative
 * centerpiece of the firefighting product page.
 *
 * Two independent state streams coexist here:
 *   • `activeStep` (0..5) — driven by GSAP ScrollTrigger scrub as the
 *     user scrolls the pinned section.
 *   • `activeSystem` — driven by the SystemTabs switcher above the grid.
 *     Default "sprinkler". Changing this swaps scene overlays + the
 *     body copy for steps 02/05/06 without touching `activeStep`.
 *
 * The two never collide because:
 *   1. The pin-spacer is computed from the section's outer box. That
 *      box's height is locked — the SystemDetailCard and step-body
 *      card each have a `min-height` sized from their longest variant
 *      + 12px buffer. No ScrollTrigger.refresh() is fired on system
 *      switch.
 *   2. GSAP only ever writes to `activeStep`. React writes to
 *      `activeSystem`. No crossed writes.
 *
 * Mobile adaptation (<768px):
 *   на <md скролл-пин отключён, секция течёт вниз последовательно,
 *   переключатель горизонтально-scrollable snap-strip, карточка
 *   описания всегда раскрыта, step-rail — обычный вертикальный список
 *   с синхронизированной подсветкой активного шага при приближении
 *   к соответствующему блоку.
 *
 *   (Wording locked verbatim so the decision survives future chats.)
 *
 * Why a single scrub trigger (vs. six `onToggle` triggers per step):
 *   - Smooth bidirectional scrolling with no stacking of callbacks.
 *   - Pin spacer is computed once, not six times → no Safari flicker.
 *   - Cheaper reverse-scroll: index changes go through the same gate.
 *
 * `reducedMotion` is resolved once on mount from `window.matchMedia`
 * and passed down. When true, the hook skips GSAP setup entirely and
 * the scene freezes at step 5 (final state: everything visible,
 * nothing moving). The SystemDetailCard crossfade also becomes instant
 * so no new loop is introduced on a system switch.
 */
export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  // -1 is the pre-scroll baseline: nothing active yet. ScrollTrigger
  // flips it to 0 on first engagement, which makes the fire-zone visibly
  // appear (step 01 "Очаг") rather than being present on mount.
  const [activeStep, setActiveStep] = useState(-1);
  const [activeSystem, setActiveSystem] = useState<FireSystemId>("sprinkler");
  const [reducedMotion, setReducedMotion] = useState(false);

  // Memoise the active system's step array so LakhtaSteps doesn't
  // see a new identity on every render (the array itself is stable
  // from the content module, but guard against future refactors).
  const system = useMemo(
    () => fireSystems.find((s) => s.id === activeSystem) ?? fireSystems[0],
    [activeSystem],
  );

  // Read prefers-reduced-motion once on mount and listen for changes so
  // the user toggling their OS preference mid-session still works.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Desktop-only pin. Below the md breakpoint we want a simple
    // scroll-through experience, not a pinned one — the 40/60 layout
    // collapses and there's nothing to anchor against.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const stepCount = system.steps.length;

      // If the user prefers reduced motion, skip the scrub entirely
      // and land on the final step so the full picture is visible
      // without ever moving. Pinning without animation is worse than
      // just showing the result in place.
      if (reducedMotion) {
        setActiveStep(stepCount - 1);
        return;
      }

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        // Six beats × ~67svh. Trimmed from 600% → 400% (≈1.5× faster
        // than the initial landing) so the section feels dynamic
        // without racing past each beat. Each step gets roughly
        // two-thirds of a viewport of scroll distance.
        end: "+=400%",
        pin: true,
        scrub: 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Progress 0..1 → index 0..5. Clamp so the final frame
          // shows index 5 exactly instead of briefly overshooting.
          const raw = self.progress * stepCount;
          const idx = Math.min(stepCount - 1, Math.max(0, Math.floor(raw)));
          setActiveStep((prev) => (prev === idx ? prev : idx));
        },
        // When the user scrolls above the pinned range (e.g. back up
        // past the section), reset to the pre-scroll baseline so the
        // next scroll-through replays the reveal from step 01.
        onLeaveBack: () => setActiveStep(-1),
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
    // system.steps.length is stable (always 6) but we depend on the
    // reference so a future length change would re-register correctly.
  }, [reducedMotion, system.steps.length]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-primary)]"
      style={{ ["--accent-current" as string]: "var(--accent-fire)" }}
      aria-label="Как срабатывает насосная станция пожаротушения"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-30"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col gap-10 px-6 py-16 md:gap-12 md:px-12 md:py-20">
        {/* Section header — label + title */}
        <header className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/50">
            03 · Типы АПТ и как они срабатывают
          </p>
          <h2 className="max-w-[720px] text-2xl font-medium leading-tight text-[var(--color-secondary)] md:text-4xl">
            Четыре системы пожаротушения — один завод под каждую.
          </h2>
          <p className="max-w-[620px] text-sm leading-relaxed text-[var(--color-secondary)]/60 md:text-base">
            Выберите тип установки — на схеме справа перестроится
            внутренняя логика здания. Вся последовательность —
            автоматическая, занимает секунды.
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

        {/* 40/60 grid — left: step rail, right: Lakhta scene */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(320px,2fr)_minmax(0,3fr)] md:gap-14">
          <div className="relative self-start">
            <LakhtaSteps activeStep={activeStep} steps={system.steps} />
          </div>

          {/* Scene stage — the SVG is square-ish portrait (600:1000), so
              we let it flex to its natural aspect inside the column. */}
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

      {/* Scroll hint — subtle nudge on the first beat so visitors
          realise the section reveals itself. Fades out once they've
          begun the narrative. */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <p
          className={
            "font-mono text-[10px] uppercase tracking-[0.12em] transition-opacity duration-500 " +
            (activeStep <= 0 && !reducedMotion
              ? "text-[var(--color-secondary)]/60"
              : "text-transparent")
          }
        >
          Прокрутить ↓
        </p>
      </div>
    </section>
  );
}
