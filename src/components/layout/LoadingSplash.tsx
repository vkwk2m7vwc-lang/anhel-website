"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * First-paint splash: full-bleed panel with the ANHEL wordmark.
 *
 * Shown only on a true page load — fresh tab, direct URL entry, external
 * referrer, or a manual reload (F5 / Cmd+R). Skipped on browser back/
 * forward navigations and prerender entries: the user is stepping through
 * history they already have, and a splash flash there reads as a stutter.
 * Client-side `<Link>` navigations don't reach this `useEffect` either —
 * the layout (and therefore this component) stays mounted across them.
 *
 * Implementation switched from `<AnimatePresence>` + `<motion.div>` to
 * plain CSS transitions because, in the previous version, the exit
 * animation reliably failed to trigger on production: React state went
 * to `visible=false` (verified in fiber) but Framer Motion kept the
 * element mounted with `opacity: 1` indefinitely. The CSS path is fully
 * deterministic — phase changes drive inline-style transitions, the
 * element unmounts at the end on a setTimeout. No animation library in
 * the loop, no chance of a Framer Motion regression here again.
 *
 * Phases:
 *   `enter`  — initial mount; wordmark at 0.4em letter-spacing, opacity 0.
 *   `idle`   — wordmark animated to 0.6em + opacity 1 (700 ms).
 *   `exit`   — panel fades and slides up (opacity 0, translateY -100%, 800 ms).
 *   `gone`   — element returns `null` and is removed from the tree.
 *
 * Auto-dismisses after 900 ms even if `window.load` never fires.
 * Respects `prefers-reduced-motion` (renders nothing).
 */

type SplashPhase = "enter" | "idle" | "exit" | "gone";

const ENTER_DURATION_MS = 700;
const IDLE_DURATION_MS = 900;
const EXIT_DURATION_MS = 800;

export function LoadingSplash() {
  const prefersReduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<SplashPhase>(
    prefersReduced ? "gone" : "enter"
  );

  useEffect(() => {
    if (prefersReduced) {
      setPhase("gone");
      return;
    }

    // Performance Navigation Timing — Level 2.
    // Possible `type` values: 'navigate' | 'reload' | 'back_forward' | 'prerender'.
    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const navType = navEntry?.type;
    if (navType !== "navigate" && navType !== "reload") {
      setPhase("gone");
      return;
    }

    // Kick off the wordmark entry on the next paint frame so the inline
    // styles for `enter` actually render before we transition to `idle`.
    const enterFrame = requestAnimationFrame(() => setPhase("idle"));
    const exitTimer = window.setTimeout(() => setPhase("exit"), IDLE_DURATION_MS);
    const goneTimer = window.setTimeout(
      () => setPhase("gone"),
      IDLE_DURATION_MS + EXIT_DURATION_MS
    );

    return () => {
      cancelAnimationFrame(enterFrame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(goneTimer);
    };
  }, [prefersReduced]);

  if (phase === "gone") return null;

  const isExit = phase === "exit";
  const isEnter = phase === "enter";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-primary)]"
      style={{
        opacity: isExit ? 0 : 1,
        transform: isExit ? "translateY(-100%)" : "translateY(0%)",
        transition: `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1), transform ${EXIT_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        willChange: "opacity, transform",
      }}
    >
      <span
        className="font-display text-2xl text-[var(--color-secondary)]"
        style={{
          letterSpacing: isEnter ? "0.4em" : "0.6em",
          opacity: isEnter ? 0 : 1,
          transition: `letter-spacing ${ENTER_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${ENTER_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        ANHEL
        {/* ® rendered with its own tighter tracking + superscript size so
            the mark hugs the last letter and doesn't drift into the next
            letter-slot when the wordmark expands to 0.6em. */}
        <span
          aria-hidden="true"
          className="align-super text-[0.5em] tracking-normal"
        >
          ®
        </span>
      </span>
    </div>
  );
}
