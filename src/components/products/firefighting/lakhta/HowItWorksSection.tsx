"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { howItWorksSteps } from "@/content/products/firefighting-how-it-works";
import { LakhtaScene } from "./LakhtaScene";
import { LakhtaSteps } from "./LakhtaSteps";

/**
 * Section 3 "Как срабатывает" — the pinned scroll-driven story about
 * how the pump station responds to a fire. This is the narrative
 * centerpiece of the firefighting product page.
 *
 * Architecture:
 *   - One ScrollTrigger pins the section for `600%` of its own height
 *     (six beats, one viewport each) and maps progress → `activeStep`
 *     0..5 via scrub.
 *   - `activeStep` lives in React state. GSAP writes to it through
 *     `setActiveIndex`; React writes it to `data-active-step` on the
 *     scene SVG. Continuous per-element loops (LED blink, smoke sway,
 *     etc.) are pure CSS keyframes gated by conditional `style`
 *     attributes — GSAP never touches them, so the two engines
 *     don't fight for the DOM.
 *   - `reducedMotion` is resolved once on mount from
 *     `window.matchMedia` and passed down. When true, the hook skips
 *     GSAP setup entirely and the scene freezes at step 5 (final
 *     state: everything visible, nothing moving).
 *
 * Why a single scrub trigger (vs. six `onToggle` triggers per step):
 *   - Smooth bidirectional scrolling with no stacking of callbacks.
 *   - Pin spacer is computed once, not six times → no Safari flicker.
 *   - Cheaper reverse-scroll: index changes go through the same gate.
 *
 * Mobile handling is intentionally minimal in this iteration: at
 * <768px we drop pinning and show the scene full-width above a
 * vertical list of steps. Session 2 replaces this with a proper
 * accordion.
 */
export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  // -1 is the pre-scroll baseline: nothing active yet. ScrollTrigger
  // flips it to 0 on first engagement, which makes the fire-zone visibly
  // appear (step 01 "Очаг") rather than being present on mount.
  const [activeStep, setActiveStep] = useState(-1);
  const [reducedMotion, setReducedMotion] = useState(false);

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
      const stepCount = howItWorksSteps.length;

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
  }, [reducedMotion]);

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

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[1440px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[minmax(320px,2fr)_minmax(0,3fr)] md:gap-14 md:px-12 md:py-20">
        {/* Left rail — stays inside the pinned region */}
        <div className="relative self-start">
          <LakhtaSteps activeStep={activeStep} />
        </div>

        {/* Scene stage — the SVG is square-ish portrait (600:1000), so
            we let it flex to its natural aspect inside the column. */}
        <div className="relative flex items-start justify-center pt-2">
          <div className="relative aspect-[600/1000] w-full max-w-[620px]">
            <LakhtaScene activeStep={activeStep} reducedMotion={reducedMotion} />
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
