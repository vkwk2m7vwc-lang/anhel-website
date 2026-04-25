"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Theme toggle — sun / moon icon button, lives in the Header
 * (and in MobileMenu for parity).
 *
 * Behaviour:
 *   - Click flips between "dark" and "light"
 *   - System preference is the initial value (handled by ThemeProvider)
 *   - During SSR `theme` is undefined; we render a static placeholder
 *     so the markup stays stable and avoids hydration mismatch
 *
 * Visual:
 *   - 40×40 circle button matching the existing burger
 *   - Icon swaps with a 200ms cross-fade so the switch feels material
 *   - `data-cursor="hover"` ties into CustomCursor
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // `next-themes` recommends gating UI on a mounted flag so the SSR
  // and CSR markups match — otherwise the icon-swap would trip the
  // hydration check on the very first paint.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const handleClick = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
      data-cursor="hover"
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border border-[var(--color-secondary)]/20 text-[var(--color-secondary)]",
        "transition-colors duration-200 hover:border-[var(--color-secondary)]/40",
        "hover:bg-[var(--color-secondary)]/5",
        className,
      )}
    >
      {/* Static placeholder while the client mounts — avoids icon flicker
          and hydration mismatch warnings. */}
      {!mounted ? (
        <span className="block h-[18px] w-[18px] rounded-full border border-current opacity-50" />
      ) : (
        <>
          <Sun
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
            className={cn(
              "absolute transition-all duration-200",
              isDark
                ? "scale-50 opacity-0 rotate-90"
                : "scale-100 opacity-100 rotate-0",
            )}
          />
          <Moon
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
            className={cn(
              "absolute transition-all duration-200",
              isDark
                ? "scale-100 opacity-100 rotate-0"
                : "scale-50 opacity-0 -rotate-90",
            )}
          />
        </>
      )}
    </button>
  );
}
