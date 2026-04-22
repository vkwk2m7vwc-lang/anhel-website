"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface CountUpOptions {
  /** Target value the counter should land on. */
  to: number;
  /** Animation length in seconds. */
  duration?: number;
  /** Number of leading zeros. 2 → "04" instead of "4". */
  pad?: number;
  /** Trigger the tween only when the element enters the viewport. */
  whenVisible?: boolean;
}

/**
 * Count-up tween wired to GSAP.
 *
 * Returns a `ref` to attach to the element that should become visible
 * *before* the tween starts, and the formatted `value` string ready to
 * render. When `prefers-reduced-motion` is set, we skip the tween and
 * render the final value immediately so there's no visual jank.
 */
export function useCountUp<T extends HTMLElement>({
  to,
  duration = 2,
  pad = 0,
  whenVisible = true,
}: CountUpOptions) {
  const ref = useRef<T | null>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [value, setValue] = useState(() =>
    String(prefersReduced ? to : 0).padStart(pad, "0")
  );

  useEffect(() => {
    if (prefersReduced) {
      setValue(String(to).padStart(pad, "0"));
      return;
    }

    const el = ref.current;
    if (!el) return;

    const proxy = { n: 0 };
    const runTween = () => {
      gsap.to(proxy, {
        n: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          setValue(String(Math.round(proxy.n)).padStart(pad, "0"));
        },
      });
    };

    if (!whenVisible) {
      runTween();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            runTween();
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, pad, whenVisible, prefersReduced]);

  return { ref, value };
}
