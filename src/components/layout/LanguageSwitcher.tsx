"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Check, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "@/navigation";
import { locales, localeNames, type Locale } from "@/i18n";

/**
 * Language switcher — dropdown by current locale code, full native
 * names in the menu (`RU — Русский`, `EN — English`, `TR — Türkçe`).
 *
 * Visual contract — identical to ThemeToggle: h-10 round-pill button
 * with a thin secondary-coloured border. Together they form the
 * right-hand utility cluster in Header.
 *
 * Behaviour:
 *  - Button shows the active locale's compact code (`RU`).
 *  - Click opens a 200px popover anchored under the button. Current
 *    locale is disabled and gets a check mark.
 *  - Selecting a locale calls `router.replace(pathname, { locale })`
 *    via the `@/navigation` wrapper. The wrapper internally rewrites
 *    the path with the right locale prefix (`localePrefix: 'as-needed'`):
 *    RU lands on the bare path, EN/TR get `/<code>/` prepended.
 *  - Soft navigation only — theme, scroll position and any in-flight
 *    data fetches survive the locale switch.
 *  - Cookie persistence (`NEXT_LOCALE`, 365 days) is set automatically
 *    by next-intl middleware on the resulting request.
 *  - Esc closes; outside-click closes.
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
   * Switch to a target locale.
   *
   * `pathname` (from `@/navigation.usePathname`) is the canonical
   * locale-stripped path — for `/en/products/pumps` we get
   * `/products/pumps`. We pass that path plus the target locale to
   * `router.replace`, which handles the `as-needed` prefixing rule
   * (RU on bare host, EN/TR on `/<code>/...`).
   */
  const switchTo = (next: Locale) => {
    if (next === currentLocale) {
      setOpen(false);
      return;
    }
    setOpen(false);
    router.replace(pathname, { locale: next });
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
          strokeWidth={1.5}
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
          className="absolute right-0 top-full z-40 mt-2 w-[200px] overflow-hidden rounded border border-[var(--color-secondary)]/15 bg-[var(--color-primary)] py-1 shadow-2xl shadow-black/30 backdrop-blur-sm"
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
                    strokeWidth={1.5}
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
