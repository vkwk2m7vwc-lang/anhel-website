"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Прокручивает к якорю при cross-page-навигации.
 *
 * Сценарий: пользователь на `/contacts` кликает «О компании» в шапке
 * (href=`/#about`). Next.js App Router переходит на `/`, но Lenis
 * (smoothWheel) перехватывает события и нативный scroll-to-hash
 * срабатывает невыборочно. Этот компонент в client-зоне выполняет
 * `scrollIntoView` после mount страницы — двойной rAF гарантирует,
 * что секции `#about` и `#production` уже отрисованы.
 *
 * Триггеры: `usePathname()` (на смену маршрута) + `hashchange`
 * (на изменение якоря внутри одной страницы — например, mobile-menu
 * закрывается, потом тык по пункту даёт новый hash).
 */
export function AnchorScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const id = hash.slice(1);
      // Двойной rAF: первый — дождаться layout, второй — paint.
      // Без задержки секции, рендерящиеся ниже Hero, могут ещё не
      // дойти до getBoundingClientRect к моменту scrollIntoView.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  return null;
}
