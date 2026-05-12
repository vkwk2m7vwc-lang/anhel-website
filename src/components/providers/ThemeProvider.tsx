"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme provider — обёртка над next-themes.
 *
 * Default theme — `light` (по правке от 12.05.2026: «всегда по умолчанию
 * сайт открывался в белой теме»). Кнопка-toggle в Header переключает на
 * `dark`. `enableSystem={false}` — игнорируем системную `prefers-color-scheme`,
 * иначе пользователь с тёмной OS-темой получил бы dark при первом заходе.
 * После toggle выбор сохраняется в localStorage и применяется на след. заходах.
 *
 * `attribute="class"` — добавляет `<html class="dark">` или `class="light"`,
 * что совпадает с Tailwind `darkMode: "class"`.
 *
 * `disableTransitionOnChange` отключает CSS-transitions именно на момент
 * смены класса — без него браузер пытается анимировать всё одновременно
 * (фон, тени, бордюры, акценты), что выглядит как «пятно». Глобальные
 * transition на html.background-color останутся в обычной навигации.
 */
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
