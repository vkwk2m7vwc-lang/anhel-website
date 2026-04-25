"use client";

import { useSyncExternalStore } from "react";

/**
 * True if the device's primary pointer is coarse (finger/stylus).
 * We use this to hide the custom cursor, skip hover-only animations, etc.
 *
 * Implementation: `useSyncExternalStore` so the value is read
 * synchronously on the first client render (during commit phase),
 * not after `useEffect` runs. This closes the gap that `useState +
 * useEffect` left open: with the old approach, the hook returned
 * `false` for one render pass after hydration, during which any
 * dependent effect (e.g. `useMagnetic`) would attach a global
 * `mousemove` listener — and on iOS Safari, the synthetic mouse
 * events fired during a tap would then drag the magnetic element
 * away from the touch target, causing the first tap to miss.
 *
 * SSR returns `false` to match the most common environment (desktop
 * with hover) and avoid hydration mismatches. If the device is
 * actually touch-only, `useSyncExternalStore` schedules a sync
 * re-render before paint, so the discrepancy is invisible.
 */
const QUERY = "(hover: none), (pointer: coarse)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useIsTouch(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
