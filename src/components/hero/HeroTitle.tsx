"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Hero headline with GSAP SplitText reveal.
 *
 * Text: «Производим инженерное оборудование, на которое можно положиться».
 * Renders as a single block; SplitText splits into words and animates them
 * with a staggered y-translate. The first paint shows the static text.
 *
 * Animation: split into words, stagger 0.04s, `expo.out` over 1.2s.
 * When the user prefers reduced motion, we skip SplitText entirely and
 * show the final static text.
 */
export function HeroTitle() {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    // Slight delay (≈DOMContentLoaded + 200ms) so fonts have a chance to
    // swap before we split — measurements are stable.
    const raf = requestAnimationFrame(() => {
      const split = new SplitText(el, { type: "words" });
      gsap.set(split.words, { yPercent: 100, opacity: 0 });
      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.04,
        delay: 0.2,
        onComplete: () => {
          // Flatten transforms so the text doesn't lock GPU layers forever.
          gsap.set(split.words, { clearProps: "transform,opacity" });
        },
      });
      // Return cleanup via outer ref capture.
      return () => split.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, [prefersReduced]);

  return (
    <h1
      ref={ref}
      className="font-display text-hero font-medium text-[var(--color-secondary)]"
    >
      Производим инженерное оборудование, на которое можно положиться
    </h1>
  );
}
