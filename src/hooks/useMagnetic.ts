"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useIsTouch } from "./useIsTouch";

interface MagneticOptions {
  /** How strongly the element follows the cursor. 0.2–0.5 is tasteful. */
  strength?: number;
  /** Trigger radius in px. Outside this, no magnet. */
  radius?: number;
}

/**
 * Attach a magnetic-cursor effect to a ref'd element.
 * Pulls the element a few pixels toward the cursor while the pointer is
 * within `radius`. Disabled on touch and when the user prefers reduced motion.
 *
 * Usage:
 *   const ref = useMagnetic<HTMLButtonElement>({ strength: 0.35 });
 *   return <button ref={ref}>Смотреть каталог</button>;
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 0.3,
  radius = 120,
}: MagneticOptions = {}) {
  const ref = useRef<T | null>(null);
  const prefersReduced = usePrefersReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    if (prefersReduced || isTouch) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, radius, prefersReduced, isTouch]);

  return ref;
}
