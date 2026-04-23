"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scenarioASteps } from "@/content/products/firefighting-scenario-a";
import { SkyscraperSVG } from "./SkyscraperSVG";
import { SmokePlume } from "./SmokePlume";
import { StepsRail } from "./StepsRail";
import { WaterParticles } from "./WaterParticles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scenario-A orchestrator.
 *
 * Pins the section while the user scrolls through six "beats"
 * (scroll distance = 6 × 100svh). Maps scroll progress to
 * `activeIndex` 0..5 and feeds the active step's `activeNodes` set
 * into the SVG so the right geometry lights up. The state is React,
 * the scroll mapping is GSAP — the two talk through `setActiveIndex`
 * calls guarded against redundant updates.
 *
 * Why a single ScrollTrigger instead of six per-step triggers: one
 * trigger with scrub gives a smoother reverse-scroll experience and
 * avoids the "gotcha" of stacked triggers firing out of order on a
 * fast scroll. Per-step triggers also make pinned layouts flicker in
 * Safari because each one recalculates the pin spacer.
 *
 * Smoke is shown a bit beyond step 0 (steps 0-1) because the signal-
 * travel beat still happens while the fire is real. Water particles
 * run only during step 3 — that's the narrative's "pressure rises"
 * beat. The activeNodes set handles every other toggle declaratively.
 */
export function ScenarioAScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const stepCount = scenarioASteps.length;

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        // Six beats, one viewport-height of scroll each. ScrollTrigger
        // adds a spacer internally when `pin: true`, so the document
        // stays the expected height without manual padding.
        end: "+=600%",
        pin: true,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const raw = self.progress * stepCount;
          const idx = Math.min(stepCount - 1, Math.max(0, Math.floor(raw)));
          setActiveIndex((prev) => (prev === idx ? prev : idx));
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [stepCount]);

  const activeNodes = useMemo(() => {
    const step = scenarioASteps[activeIndex];
    return new Set<string>(step?.activeNodes ?? []);
  }, [activeIndex]);

  const smokeActive = activeIndex <= 1; // step 0 (возгорание) and 1 (сигнал)
  const particlesActive = activeNodes.has("water-particles");

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-primary)]"
      style={{ ["--accent-current" as string]: "var(--accent-fire)" }}
    >
      {/* Hairline grid — keeps the page visually continuous with the
          product hero. Rendered behind everything. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-40"
      />

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[1440px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[340px_1fr] md:gap-14 md:px-12 md:py-20">
        {/* Left rail — inside the pin region, stays put automatically */}
        <div className="relative self-start">
          <StepsRail steps={scenarioASteps} activeIndex={activeIndex} />
        </div>

        {/* Scene stage — SkyscraperSVG + smoke + particles share the
            same viewBox so everything lines up with no JS math. */}
        <div className="relative flex items-start justify-center pt-2">
          <div className="relative aspect-[680/1180] w-full max-w-[620px]">
            <SkyscraperSVG activeNodes={activeNodes} />
            <SmokePlume active={smokeActive} />
            <WaterParticles active={particlesActive} />
          </div>
        </div>
      </div>

      {/* Tiny scroll hint — only visible at the very top of the pin,
          fades out after the first beat. Keeps the page from looking
          "stuck" for visitors who don't immediately realise they need
          to scroll. */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <p
          className={
            "font-mono text-[10px] uppercase tracking-[0.12em] transition-opacity duration-500 " +
            (activeIndex === 0
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
