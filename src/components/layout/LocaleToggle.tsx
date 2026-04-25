"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

/**
 * Locale toggle — RU/EN.
 *
 * Lives next to ThemeToggle in Header. Visual language deliberately
 * matches: same 40×40 circle, same border + hover treatment. The
 * label inside is the OPPOSITE of the current locale — i.e. when
 * the site is in RU, the button reads "EN" (= what you'll switch
 * to), mirroring how settings UIs commonly label this.
 *
 * Pre-hydration we render a static placeholder so the SSR markup
 * (which always reflects DEFAULT_LOCALE = RU) and the CSR markup
 * stay aligned and React doesn't flag a mismatch.
 */
export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, t, ready } = useLocale();

  const next = locale === "ru" ? "en" : "ru";
  const label = t("locale.label.short"); // "EN" when ru, "RU" when en
  const aria = t("locale.switchTo");

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={aria}
      title={aria}
      data-cursor="hover"
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border border-[var(--color-secondary)]/20 text-[var(--color-secondary)]",
        "font-mono text-[10px] uppercase tracking-[0.12em]",
        "transition-colors duration-200 hover:border-[var(--color-secondary)]/40",
        "hover:bg-[var(--color-secondary)]/5",
        className,
      )}
    >
      {/* Match the ThemeToggle's hydration placeholder so both buttons
          settle in lockstep on first paint. */}
      {!ready ? (
        <span aria-hidden="true" className="opacity-50">
          EN
        </span>
      ) : (
        <span aria-hidden="true">{label}</span>
      )}
    </button>
  );
}
