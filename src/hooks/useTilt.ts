"use client";

import { useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useIsTouch } from "./useIsTouch";

interface TiltOptions {
  /** Maximum tilt angle (degrees) at the edges of the element. */
  maxDeg?: number;
}

interface TiltHandles<T extends HTMLElement> {
  ref: React.RefObject<T>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<T>) => void;
  onMouseLeave: () => void;
}

/**
 * Mouse-driven tilt for a bounded element.
 *
 * Maps cursor position within the element's bounding box to rotateX /
 * rotateY values smoothed with a spring. Respects `prefers-reduced-motion`
 * and short-circuits on touch devices (where mousemove is unreliable).
 */
export function useTilt<T extends HTMLElement>({
  maxDeg = 4,
}: TiltOptions = {}): TiltHandles<T> {
  const ref = useRef<T | null>(null);
  const prefersReduced = usePrefersReducedMotion();
  const isTouch = useIsTouch();

  // Raw, unsmoothed pointer position within the element (−0.5 … 0.5).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring-smoothed rotations so motion feels analog rather than digital.
  const springed = { stiffness: 140, damping: 18, mass: 0.6 } as const;
  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], [-maxDeg, maxDeg]),
    springed
  );
  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], [maxDeg, -maxDeg]),
    springed
  );

  const onMouseMove = (e: React.MouseEvent<T>) => {
    if (prefersReduced || isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return { ref: ref as React.RefObject<T>, rotateX, rotateY, onMouseMove, onMouseLeave };
}
