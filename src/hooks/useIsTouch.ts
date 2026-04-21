"use client";

import { useEffect, useState } from "react";

/**
 * True if the device's primary pointer is coarse (finger/stylus).
 * We use this to hide the custom cursor, skip hover-only animations, etc.
 */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setIsTouch(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isTouch;
}
