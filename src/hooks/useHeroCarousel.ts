"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type UseHeroCarouselOptions = {
  /** How many slides exist. The hook treats index `0..count-1` as valid. */
  count: number;
  /** Enable auto-advance. D-variant passes `false`, E-variant passes `true`. */
  autoplay?: boolean;
  /** Interval between auto-advances, ms. Ignored when `autoplay` is false. */
  interval?: number;
  /** Callback fired after `active` changes — handy for logging or side effects. */
  onChange?: (nextIndex: number) => void;
};

export type UseHeroCarouselReturn = {
  /** Zero-based index of the slide currently shown. */
  active: number;
  /** Jump to a specific slide and reset the auto-timer. */
  goTo: (index: number) => void;
  /** Go to `active + 1` (wraps). */
  next: () => void;
  /** Go to `active - 1` (wraps). */
  prev: () => void;
  /** True when auto-advance is on and currently ticking. */
  isPlaying: boolean;
  /** Toggle the auto-advance (play/pause button). */
  toggle: () => void;
  /** Pause auto-advance on hover enter. */
  pause: () => void;
  /** Resume auto-advance on hover leave. */
  resume: () => void;
  /** 0..1 progress toward the next auto-advance (for the progress bar). */
  progress: number;
  /** True if user prefers reduced motion — UI should skip transitions. */
  prefersReduced: boolean;
};

/**
 * Hero carousel state machine.
 *
 * Used by both D (manual) and E (auto-advance) hero variants. A single hook
 * instead of two because the only real difference is whether the timer
 * ticks, and having one code path makes the UI consistent.
 *
 * Accessibility: when the user prefers reduced motion we force `autoplay`
 * off even if the caller passed `true`. The UI then has no progress bar
 * and the play-toggle is hidden by the caller (check `prefersReduced`).
 *
 * The progress value is a smooth 0..1 float updated via requestAnimationFrame
 * so we can animate a thin progress bar without re-rendering React every
 * frame (actually we do re-render — 60fps is fine here, small DOM — but we
 * keep the timer in a ref so hover-pause is jank-free).
 */
export function useHeroCarousel({
  count,
  autoplay = false,
  interval = 5000,
  onChange,
}: UseHeroCarouselOptions): UseHeroCarouselReturn {
  const prefersReduced = usePrefersReducedMotion();
  const effectiveAutoplay = autoplay && !prefersReduced;

  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(effectiveAutoplay);
  const [progress, setProgress] = useState(0);

  // Hover-pause flag lives in state (drives isPlaying) but we mirror it in a
  // ref so the RAF loop can read the latest value without re-subscribing.
  const [hoverPaused, setHoverPaused] = useState(false);
  const hoverRef = useRef(false);
  useEffect(() => {
    hoverRef.current = hoverPaused;
  }, [hoverPaused]);

  // Keep onChange stable in a ref so we don't retrigger effects.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Manual state helpers ---------------------------------------------------
  const goTo = useCallback(
    (index: number) => {
      const safe = ((index % count) + count) % count;
      setActive(safe);
      setProgress(0); // resetting the bar on any manual change
      onChangeRef.current?.(safe);
    },
    [count]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  const toggle = useCallback(() => {
    if (!effectiveAutoplay) return;
    setIsPlaying((v) => !v);
  }, [effectiveAutoplay]);

  const pause = useCallback(() => setHoverPaused(true), []);
  const resume = useCallback(() => setHoverPaused(false), []);

  // Sync: when autoplay prop flips (or reduced-motion changes), reset isPlaying
  useEffect(() => {
    setIsPlaying(effectiveAutoplay);
  }, [effectiveAutoplay]);

  // Auto-advance loop ------------------------------------------------------
  useEffect(() => {
    if (!effectiveAutoplay) {
      setProgress(0);
      return;
    }

    let rafId = 0;
    let start = performance.now();

    const tick = (now: number) => {
      // If the user toggled pause or is hovering, hold the current progress
      // and keep the clock by shifting the start forward.
      if (!isPlaying || hoverRef.current) {
        start = now - progressRef.current * interval;
        rafId = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - start;
      const p = Math.min(1, elapsed / interval);
      progressRef.current = p;
      setProgress(p);

      if (p >= 1) {
        // Advance to next slide. We read active via the functional setter to
        // avoid closing over a stale value across ticks.
        setActive((prev) => {
          const nextIdx = (prev + 1) % count;
          onChangeRef.current?.(nextIdx);
          return nextIdx;
        });
        progressRef.current = 0;
        setProgress(0);
        start = now;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
    // We intentionally don't depend on `active` — changing it would restart
    // the timer and visibly jump the bar on every click. Manual goTo already
    // resets progress to 0 via setProgress(0).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveAutoplay, isPlaying, interval, count]);

  const progressRef = useRef(0);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  return {
    active,
    goTo,
    next,
    prev,
    isPlaying,
    toggle,
    pause,
    resume,
    progress,
    prefersReduced,
  };
}
