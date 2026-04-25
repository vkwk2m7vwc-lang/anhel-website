"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLocale } from "@/components/providers/LocaleProvider";

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
  const { t, locale } = useLocale();

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
    // Re-split when locale changes — the new copy needs a fresh
    // SplitText pass; otherwise the GSAP refs would point at the
    // old word spans and the animation wouldn't fire.
  }, [prefersReduced, locale]);

  return (
    <h1
      ref={ref}
      className="font-display text-hero font-medium text-[var(--color-secondary)]"
    >
      <span className="block overflow-hidden">{t("hero.title.line1")}</span>
      <span className="block overflow-hidden opacity-50">
        {t("hero.title.line2")}
      </span>
      <span className="block overflow-hidden">{t("hero.title.line3")}</span>
    </h1>
  );
}
