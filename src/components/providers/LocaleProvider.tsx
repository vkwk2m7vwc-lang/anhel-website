"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  STORAGE_KEY,
  translate,
  type Locale,
  type TranslationKey,
} from "@/lib/i18n";

/**
 * Locale context — sister to ThemeProvider.
 *
 * Lifecycle:
 *   1. SSR + first paint → `DEFAULT_LOCALE` (RU). The dict + a stable
 *      `t()` are available on the very first render so server-rendered
 *      copy lands in RU and never flashes.
 *   2. Client mount → read `localStorage[STORAGE_KEY]`. If a valid
 *      locale is stored, switch to it. Same `t()` reference; just the
 *      `locale` value changes and components rerender.
 *   3. User toggles → `setLocale` writes through to localStorage and
 *      sets `<html lang>` so screen-readers and search bots see the
 *      live language too.
 *
 * Hydration safety: the storage read happens in `useEffect`, which runs
 * after hydration. If the user's stored locale != DEFAULT_LOCALE, they
 * see one frame of RU before the swap — acceptable for an experiment.
 */
type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: TranslationKey) => string;
  /** True once we've reconciled with localStorage. UIs can gate
      icon-swap animations on this to avoid flashing the wrong icon. */
  ready: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as string[]).includes(value);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage after mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) {
        setLocaleState(stored);
        document.documentElement.lang = stored;
      }
    } catch {
      // localStorage can throw in private mode / storage-disabled — fall
      // back to the default. Not worth logging during normal use.
    } finally {
      setReady(true);
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* no-op — see hydration block above */
    }
    document.documentElement.lang = next;
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translate(locale, key),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, ready }),
    [locale, setLocale, t, ready],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/**
 * Read the locale + a memoised `t()`. Throws when called outside the
 * provider — that's a wiring bug, not a runtime error to swallow.
 */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale() must be used inside <LocaleProvider>");
  }
  return ctx;
}
