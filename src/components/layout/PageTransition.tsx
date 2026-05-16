"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "@/navigation";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Page transitions — короткий fade на смене маршрута.
 *
 * Этап 5 / Сессия 1 (perf-audit): убрали «занавес» (clip-path inset
 * 0→100%, 600мс) и сократили общий fade с 350мс до 200мс. Раньше
 * AnimatePresence в `mode="wait"` ждал, пока занавес доползёт до
 * верхнего края экрана — это давало ~950мс ощутимой задержки на
 * каждом переходе и на iPhone выглядело «медленно» (см. _AUDIT.md,
 * пункт PageTransition).
 *
 * Дизайн-источник занавеса — terminal-industries.com. На десктопе он
 * читался приемлемо, на мобиле — нет: пользователь успевает подумать,
 * что что-то сломалось, прежде чем увидеть новую страницу. Решение:
 * оставить только мягкий opacity-fade, поднять его на GPU
 * (`will-change: opacity`) и отдать переход <300мс.
 *
 * Тонкости:
 *   • `mode="wait"` сохраняем — иначе старая страница перекрывает
 *     новую и заметен «прыжок» якорей.
 *   • `initial={false}` — на первом mount не fade-in'ем, чтобы
 *     LoadingSplash остался единственным элементом, который видим
 *     при cold-pageview.
 *   • `prefers-reduced-motion` — рендерим без AnimatePresence.
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
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
