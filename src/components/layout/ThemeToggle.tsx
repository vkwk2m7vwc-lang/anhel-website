"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

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
 *
 * i18n: aria-label и title живут в `common.theme_toggle.*` — две формы
 * (action and label) на каждое состояние, чтобы тон под скринридером и
 * tooltip-ом был естественным в каждом языке.
 */
export function ThemeToggle() {
  const t = useTranslations("common.theme_toggle");
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
      aria-label={isDark ? t("to_light") : t("to_dark")}
      title={isDark ? t("light_label") : t("dark_label")}
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
