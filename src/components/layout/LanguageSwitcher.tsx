"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n";

/**
 * Language switcher — dropdown by current locale code, full native
 * names in the menu (`RU — Русский`, `EN — English`, `TR — Türkçe`).
 *
 * Visual contract — identical to ThemeToggle: h-10 w-10 round button
 * with a thin secondary-coloured border. Together they form the
 * right-hand utility cluster in Header. No external dropdown library —
 * a small homegrown menu with click-outside, Esc, and focus return
 * keeps the bundle lean.
 *
 * Behaviour:
 *  - Button shows the active locale's compact code (`RU`).
 *  - Click opens a 200px popover anchored under the button. Current
 *    locale is disabled and gets a check mark.
 *  - Selecting a locale calls `router.replace` with the path rewritten
 *    to include or drop the locale prefix per `localePrefix: 'as-needed'`
 *    convention: RU lands on bare `/...`, EN/TR on `/<code>/...`.
 *  - Cookie persistence is handled automatically by next-intl on the
 *    `replace` navigation (it sees the new URL and stamps
 *    `NEXT_LOCALE`).
 *  - Esc closes; outside-click closes; Tab cycles options inside.
 *
 * Why `router.replace` instead of a regular `<a>`: stays inside the
 * Next.js client cache so theme, scroll position and any in-flight
 * data fetches survive the locale switch. A bare `<a>` would do a
 * hard reload and lose Lenis position + theme flicker.
 *
 * No flags — politically neutral, visually quieter, fits B2B premium.
 */
export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Outside-click + Esc close. Mirrors ProductsMenu/DocumentsMenu
  // patterns elsewhere in the header.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  /**
   * Build the target URL for a locale change.
   *
   * `pathname` (returned by next/navigation) for an EN page like
   * `/en/products` arrives WITHOUT the locale prefix — next-intl
   * strips it before exposing the value, so we just see `/products`.
   * For the home page it's `/`. Defensive: if any locale segment
   * still appears at the start, we strip it.
   *
   * Then we either prepend the new locale (`/en/...`) or, for the
   * default RU, return the bare path.
   */
  const switchTo = (next: Locale) => {
    if (next === currentLocale) {
      setOpen(false);
      return;
    }
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && (locales as readonly string[]).includes(segments[0])) {
      segments.shift();
    }
    const pathWithoutLocale = "/" + segments.join("/");
    const cleanPath = pathWithoutLocale === "/" ? "/" : pathWithoutLocale;
    const target =
      next === "ru" ? cleanPath : `/${next}${cleanPath === "/" ? "" : cleanPath}`;
    setOpen(false);
    router.replace(target);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${localeNames[currentLocale].native}`}
        data-cursor="hover"
        className="inline-flex h-10 items-center gap-1 rounded-full border border-[var(--color-secondary)]/20 px-3 text-[11px] font-mono uppercase tracking-[0.08em] text-[var(--color-secondary)] transition-colors hover:border-[var(--color-secondary)]/40"
      >
        {localeNames[currentLocale].code}
        <ChevronDown
          size={12}
          strokeWidth={1.75}
          aria-hidden="true"
          className={
            "transition-transform duration-200 " +
            (open ? "rotate-180" : "rotate-0")
          }
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Language menu"
          className="absolute right-0 top-full z-40 mt-2 w-[200px] overflow-hidden rounded-md border border-[var(--color-secondary)]/15 bg-[var(--color-primary)]/95 py-1 shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          {locales.map((l) => {
            const isActive = l === currentLocale;
            return (
              <button
                key={l}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => switchTo(l)}
                disabled={isActive}
                className={
                  "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors " +
                  (isActive
                    ? "text-[var(--color-secondary)] cursor-default"
                    : "text-[var(--color-secondary)]/75 hover:bg-[var(--color-hover-tint)] hover:text-[var(--color-secondary)]")
                }
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/55">
                    {localeNames[l].code}
                  </span>
                  <span>{localeNames[l].native}</span>
                </span>
                {isActive ? (
                  <Check
                    size={14}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="text-[var(--color-secondary)]/55"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
