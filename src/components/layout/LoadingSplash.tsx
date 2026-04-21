"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * First-paint splash: black panel with the ANHEL wordmark. Shows for a
 * short beat, then lifts away. Purely cosmetic — it never blocks
 * interaction because we run it while React hydrates and fonts settle.
 *
 * Respects prefers-reduced-motion (renders nothing in that case) and
 * auto-dismisses after 900ms even if the window never fires `load`.
 */
export function LoadingSplash() {
  const prefersReduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(!prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), 900);
    const onLoad = () => window.setTimeout(() => setVisible(false), 300);
    window.addEventListener("load", onLoad);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-primary)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="font-display text-2xl tracking-[0.4em] text-[var(--color-secondary)]"
            initial={{ letterSpacing: "0.4em", opacity: 0 }}
            animate={{ letterSpacing: "0.6em", opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            ANHEL
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
