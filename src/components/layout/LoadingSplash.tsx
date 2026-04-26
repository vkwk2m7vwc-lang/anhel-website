"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * First-paint splash: чёрный экран с ANHEL wordmark. Показывается один
 * раз за визит браузера (gated через localStorage), затем не появляется
 * на client-side навигации между страницами.
 *
 * Раньше splash перекрывал контент 60-80% viewport на каждом переходе
 * между страницами (LoadingSplash mount в layout.tsx → каждый client
 * route его пересоздаёт), что давало LCP 4.1s на главной (Lighthouse).
 *
 * Поведение:
 *   - первый visit (нет ключа в localStorage) → splash 900ms → ставится
 *     флаг → больше не показывается
 *   - повторные заходы и навигация → splash скрыт сразу
 *   - prefers-reduced-motion → splash скрыт всегда
 *   - localStorage недоступен → fallback на старое поведение (показ
 *     каждый раз с auto-timer); это редкий edge case
 */
const FIRST_VISIT_KEY = "anhel_first_visit_done";

export function LoadingSplash() {
  const prefersReduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(!prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }

    let firstVisitDone = false;
    try {
      firstVisitDone = window.localStorage.getItem(FIRST_VISIT_KEY) === "1";
    } catch {
      // localStorage недоступен (private mode, security policy) —
      // fallback на старое поведение с auto-timer.
    }

    if (firstVisitDone) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
      try {
        window.localStorage.setItem(FIRST_VISIT_KEY, "1");
      } catch {
        // Ignored — см. выше. На повторном заходе splash снова появится,
        // но это лучше чем сломанная страница.
      }
    }, 900);
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
            {/* ® rendered with its own tighter tracking + superscript size
                so the mark hugs the last letter and doesn't drift into the
                next letter-slot when the wordmark expands to 0.6em. */}
            <span
              aria-hidden="true"
              className="align-super text-[0.5em] tracking-normal"
            >
              ®
            </span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
