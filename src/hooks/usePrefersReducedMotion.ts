"use client";

import { useEffect, useState } from "react";

/**
 * Reactive hook returning whether the user has requested reduced motion.
 * Defaults to `false` during SSR so the first paint still shows animated
 * marketing visuals to users who don't care — we downgrade on mount.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return prefersReduced;
}
