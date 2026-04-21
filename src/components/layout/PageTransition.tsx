"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Page transitions — a "curtain" wipe driven by clip-path.
 *
 * On every route change we mount a dark panel that sweeps in from below,
 * covers the viewport for a beat, then retreats upward. The `children`
 * underneath cross-fade so the new route is ready behind the curtain.
 *
 * We key off `usePathname` so AnimatePresence treats each route as a
 * distinct child. When the user has prefers-reduced-motion we skip the
 * transition entirely.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
        {/* Curtain sits above the page content during the exit phase.
            Uses `clip-path: inset(...)` so the panel grows from bottom
            and releases upward, echoing terminal-industries.com. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] bg-[var(--color-primary)]"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(100% 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
