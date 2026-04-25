"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Theme provider wrapper around `next-themes`.
 *
 * Defaults:
 *   - attribute="class"      → toggles `class="dark"` / `class="light"`
 *                              on <html>, matching `:root.dark` /
 *                              `:root.light` selectors in globals.css.
 *   - defaultTheme="system"  → first paint follows OS preference
 *                              (`prefers-color-scheme`).
 *   - enableSystem           → keep OS preference reactive while the
 *                              user hasn't picked a theme manually.
 *   - disableTransitionOnChange=false → we WANT the 300ms theme
 *                              transition the brand asked for.
 *
 * `next-themes` injects an inline pre-hydration script via the
 * provider, so there is no FOUC (flash of un-themed content) on
 * first paint.
 */
export function ThemeProvider({
  children,
  ...rest
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="anhel-theme"
      {...rest}
    >
      {children}
    </NextThemesProvider>
  );
}
