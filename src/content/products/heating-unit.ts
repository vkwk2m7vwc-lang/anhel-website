import type { ProductContent } from "./types";
import { content as ruContent } from "./locales/ru/heating-unit";
import { content as enContent } from "./locales/en/heating-unit";
import { content as trContent } from "./locales/tr/heating-unit";

/**
 * Block Individual Heat Point (БИТП) — locale dispatcher.
 *
 * Per-locale content lives in `./locales/<lang>/heating-unit.ts`.
 * This module just picks the right one. RU is the master and serves as
 * fallback for any locale not yet translated.
 *
 * Backward-compat: `heatingUnitContent` still exports the RU object —
 * kept so any non-locale-aware consumer (legacy refs, tests) keeps
 * compiling. New code should use `getHeatingUnitContent(locale)`.
 */
const BY_LOCALE: Record<string, ProductContent> = {
  ru: ruContent,
  en: enContent,
  tr: trContent,
};

export function getHeatingUnitContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}

// Backward-compat — existing consumers reading `heatingUnitContent`
// see RU. New page code passes locale via getHeatingUnitContent().
export const heatingUnitContent = ruContent;
