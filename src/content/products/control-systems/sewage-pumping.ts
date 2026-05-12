import type { ProductContent } from "../types";
import { content as ruContent } from "../locales/ru/control-systems/sewage-pumping";

/**
 * sewage-pumping — locale dispatcher.
 *
 * RU is the master and the fallback for any locale. EN/TR files for
 * this slug are deferred to a follow-up wave; until then EN/TR
 * consumers see the RU content.
 */
const BY_LOCALE: Record<string, ProductContent> = { ru: ruContent };
export function getSewagePumpingContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}

export const sewagePumpingContent = ruContent;
