import type { ProductContent } from "../types";
import { content as ruContent } from "../locales/ru/control-systems/smoke-control";

/**
 * smoke-control — locale dispatcher.
 *
 * RU is the master and the fallback for any locale. EN/TR files for
 * this slug are deferred to a follow-up wave; until then EN/TR
 * consumers see the RU content.
 */
const BY_LOCALE: Record<string, ProductContent> = { ru: ruContent };
export function getSmokeControlContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}

export const smokeControlContent = ruContent;
