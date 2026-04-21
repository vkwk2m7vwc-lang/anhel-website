"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Global smooth-scroll provider.
 *
 * Wires Lenis into GSAP's ticker so ScrollTrigger pins (Stage 3 horizontal
 * products, Stage 5 building cross-section) stay glued to the smoothed
 * scroll value. Without this, pinned sections jitter by a frame.
 *
 * Skips entirely when the user has prefers-reduced-motion on — native
 * scroll is then fine and we avoid an inertial feel some find nauseating.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // GSAP ticker drives Lenis — one animation frame, two jobs.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Each smoothed scroll tick also pokes ScrollTrigger so pinned
    // sections stay in sync.
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [prefersReduced]);

  return <>{children}</>;
}
