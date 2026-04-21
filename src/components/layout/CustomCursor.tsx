"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouch } from "@/hooks/useIsTouch";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Custom cursor: small filled dot that tracks the mouse exactly,
 * plus a larger outlined ring that trails behind with easing.
 *
 * Hover state: when the pointer is over `[data-cursor="hover"]` or an
 * element tagged `[data-cursor="text"]`, the ring expands / the dot
 * shrinks. This is a purely visual effect — the native cursor is hidden
 * via `body.anhel-cursor-active` (see globals.css).
 *
 * Disabled entirely on touch devices and when prefers-reduced-motion is on.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const isTouch = useIsTouch();
  const prefersReduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  // Toggle the body class that hides the native cursor.
  useEffect(() => {
    const shouldEnable = !isTouch && !prefersReduced;
    setEnabled(shouldEnable);
    if (shouldEnable) {
      document.body.classList.add("anhel-cursor-active");
    } else {
      document.body.classList.remove("anhel-cursor-active");
    }
    return () => document.body.classList.remove("anhel-cursor-active");
  }, [isTouch, prefersReduced]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Quick setters are the performant path in GSAP — avoid allocating a
    // new tween on every mousemove.
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    // Hover state — grow the ring when over an interactive element.
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const kind = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      if (!kind) return;
      if (kind === "hover") {
        gsap.to(ring, { scale: 2, duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.3, ease: "power3.out" });
      } else if (kind === "text") {
        gsap.to(ring, { scale: 3.5, duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: 0.3, duration: 0.3, ease: "power3.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-cursor]")) return;
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot: tracks 1:1 with the pointer. */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-secondary)] mix-blend-difference"
      />
      {/* Ring: follows with delay for that weighty cursor feel. */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-secondary)]/60 mix-blend-difference"
      />
    </>
  );
}
