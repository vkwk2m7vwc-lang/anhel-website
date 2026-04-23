"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/**
 * Thin divider between cinematic scenes.
 *
 * Purpose: give the eye a breath between full-bleed frames. Each scene
 * occupies 100svh, so stacking them without punctuation would feel like
 * an endless reel. The divider is a short (~36svh) strip with a single
 * vertical hairline that "descends" into view, a mono timecode on one
 * side, and a progress fraction on the other. It reads as a sprocket
 * hole between film frames.
 *
 * The vertical rule uses scaleY animation so the line appears to
 * literally draw itself downward as the divider enters the viewport.
 */

type Props = {
  /** 1-based index of the NEXT scene — used for the progress fraction. */
  nextIndex: number;
  /** Total scenes — for the denominator. */
  total: number;
  /** Optional timestamp string to sit under the line. */
  stamp?: string;
};

export function ChapterDivider({ nextIndex, total, stamp }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  const prefersReduced = useReducedMotion();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex h-[36svh] w-full items-center justify-center bg-[var(--color-primary)]"
    >
      {/* Left-aligned mono stamp (optional) */}
      {stamp ? (
        <p className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/30 md:left-12">
          {stamp}
        </p>
      ) : null}

      {/* The drawing vertical hairline */}
      <motion.div
        initial={prefersReduced ? false : { scaleY: 0, opacity: 0 }}
        animate={
          inView
            ? { scaleY: 1, opacity: 0.4 }
            : { scaleY: 0, opacity: 0 }
        }
        transition={{
          duration: prefersReduced ? 0 : 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: "top center" }}
        className="h-[60%] w-px bg-[var(--color-secondary)]"
      />

      {/* Right-aligned progress fraction */}
      <p className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/30 md:right-12">
        {String(nextIndex).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
    </div>
  );
}
