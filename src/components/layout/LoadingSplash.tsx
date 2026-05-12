"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * First-paint splash: full-bleed panel with the ANHEL wordmark.
 *
 * Closes C3 from pre-launch audit (2026-05-08). На production main до
 * этого фикса висел исходный framer-motion `<AnimatePresence>` сплеш —
 * аудит замерил 7-11 секунд оверлея на `/quiz/vpu`, `/projects`,
 * `/service/request`. Коммит `bf71ba2` (CSS state machine + Performance
 * Navigation Timing API) лежал на ветке `fix/loading-splash-stuck-anim`
 * и в main не доходил. Эта реализация — порт bf71ba2 с дополнительным
 * `sessionStorage` гейтом и более коротким таймингом (по ТЗ ≤ 1.5 сек).
 *
 * Когда сплеш видим:
 *   1. Cold pageview в сессии — первый визит на любую страницу (sessionStorage
 *      `anhel:splash-shown` ещё не выставлен)
 *   2. F5 / Cmd+R / hard-reload — Performance Nav API `type === 'reload'`
 *
 * Когда сплеш СКРЫТ:
 *   - Внутренняя `<Link>` навигация — layout остаётся mounted, useEffect не
 *     запускается заново
 *   - Browser back/forward, bfcache, prerender — Nav API `back_forward` /
 *     `prerender`
 *   - Повторный заход в той же сессии — sessionStorage флаг говорит «уже видел»
 *   - prefers-reduced-motion — рендерим null
 *
 * Имплементация — plain CSS-transition state machine без framer-motion.
 * Предыдущая попытка `<AnimatePresence>` + `<motion.div>` в комбинации
 * framer-motion 11 + Next.js 14 App Router + Lenis ломалась: exit-анимация
 * не запускалась, элемент висел с `opacity: 1` бессрочно. CSS-путь
 * детерминирован — фазы переключают inline-стили, элемент анмаунтится
 * по setTimeout.
 *
 * Фазы:
 *   enter  — initial mount; letter-spacing 0.4em, opacity 0.
 *   idle   — wordmark разворачивается до 0.6em + opacity 1 (700мс).
 *   exit   — панель уезжает вверх + опасити в 0 (800мс).
 *   gone   — return null, элемент удаляется из дерева.
 *
 * Итого видим на экране: 700 (enter→idle transition) + 800 (idle→exit
 * transition completes) = 1500 мс ровно.
 */

type SplashPhase = "enter" | "idle" | "exit" | "gone";

const SESSION_FLAG_KEY = "anhel:splash-shown";
const ENTER_DURATION_MS = 700;
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

    // Gate 1: sessionStorage — если уже показывали в этой сессии, пропускаем.
    // private-mode / storage disabled — конструкция в try, при ошибке
    // ведём себя как раньше (показываем, без флага).
    let alreadyShown = false;
    try {
      alreadyShown = window.sessionStorage.getItem(SESSION_FLAG_KEY) === "1";
    } catch {
      // ignore
    }
    if (alreadyShown) {
      setPhase("gone");
      return;
    }

    // Gate 2: Performance Navigation Timing API (Level 2).
    // Возможные `type` значения:
    //   'navigate'    — fresh tab, direct URL, external referrer  → показываем
    //   'reload'      — F5 / Cmd+R                                → показываем
    //   'back_forward'— bfcache / history navigation              → пропускаем
    //   'prerender'   — Vercel/Next prerender                     → пропускаем
    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const navType = navEntry?.type;
    if (navType !== "navigate" && navType !== "reload") {
      setPhase("gone");
      return;
    }

    // Помечаем сессию как «сплеш уже видела» в момент перехода в idle.
    // Раньше — гонка: если пользователь успеет уйти на другой URL до
    // setTimeout, флаг не выставится, и на следующей странице сплеш
    // выскочит повторно.
    try {
      window.sessionStorage.setItem(SESSION_FLAG_KEY, "1");
    } catch {
      // ignore
    }

    // Запускаем переход enter → idle на следующем raf, чтобы inline-стили
    // фазы `enter` успели отрисоваться до transition.
    const enterFrame = requestAnimationFrame(() => setPhase("idle"));
    const exitTimer = window.setTimeout(() => setPhase("exit"), ENTER_DURATION_MS);
    const goneTimer = window.setTimeout(
      () => setPhase("gone"),
      ENTER_DURATION_MS + EXIT_DURATION_MS
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
        {/* ® рендерится в собственном tracking + superscript size,
            чтобы знак держался у последней буквы и не уходил в соседний
            letter-slot когда wordmark разворачивается до 0.6em. */}
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
