import type { ProductContent } from "../types";
import { content as ruContent } from "../locales/ru/control-systems/sewage-pumping";
import { content as enContent } from "../locales/en/control-systems/sewage-pumping";
import { content as trContent } from "../locales/tr/control-systems/sewage-pumping";

/**
 * sewage-pumping — locale dispatcher with full RU+EN+TR.
 */
const BY_LOCALE: Record<string, ProductContent> = {
  ru: ruContent,
  en: enContent,
  tr: trContent,
};
export function getSewagePumpingContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}
export const sewagePumpingContent = ruContent;
