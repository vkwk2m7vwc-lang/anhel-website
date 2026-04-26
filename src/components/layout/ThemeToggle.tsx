"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Theme toggle — солнце/луна, переключает dark ↔ light.
 *
 * `mounted` guard избегает hydration mismatch: до первого render на клиенте
 * `theme` ещё `undefined`, и сервер не знает, какую иконку рендерить. Пока
 * mounted=false — рендерим невидимый placeholder того же размера, чтобы не
 * было layout shift на первой кадре после гидрирования.
 *
 * Совпадает по визуалу с другими кнопками-иконками в Header (h-10 w-10
 * круглая обводка). На mobile входит в правую группу шапки рядом с пунктом
 * «Меню».
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Same dimensions / position even before mount — avoid layout shift.
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-secondary)]/20"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"
      }
      title={isDark ? "Светлая тема" : "Тёмная тема"}
      data-cursor="hover"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] transition-colors hover:border-[var(--color-secondary)]/40"
    >
      {isDark ? (
        <Sun size={16} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Moon size={16} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}
