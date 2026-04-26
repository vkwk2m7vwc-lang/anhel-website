"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme provider — обёртка над next-themes.
 *
 * Default theme — `dark` (фирменная палитра ANHEL). Кнопка-toggle в Header
 * переключает на `light`. `enableSystem` следит за `prefers-color-scheme`
 * на первом заходе.
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
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
