"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Hero headline with GSAP SplitText reveal.
 *
 * Text: «Системы, / которые держат здание / живым.» — the middle line is
 * rendered at opacity 0.5 so the first and third lines read as the accent.
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
    // aria-label прокидывает связный текст в screen reader / SEO-парсер.
    // Без него три block-span дают textContent без пробелов:
    // «Системы,которые держат зданиеживым.» — это ломает чтение.
    // Визуально внутри h1 остаются три строки на разных уровнях opacity.
    <h1
      ref={ref}
      aria-label="Системы, которые держат здание живым."
      className="font-display text-hero font-medium text-[var(--color-secondary)]"
    >
      <span className="block overflow-hidden">Системы,</span>
      <span className="block overflow-hidden opacity-50">
        которые держат здание
      </span>
      <span className="block overflow-hidden">живым.</span>
    </h1>
  );
}
