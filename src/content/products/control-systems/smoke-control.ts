import type { ProductContent } from "../types";
import { content as ruContent } from "../locales/ru/control-systems/smoke-control";
import { content as enContent } from "../locales/en/control-systems/smoke-control";
import { content as trContent } from "../locales/tr/control-systems/smoke-control";

/**
 * smoke-control — locale dispatcher with full RU+EN+TR.
 */
const BY_LOCALE: Record<string, ProductContent> = {
  ru: ruContent,
  en: enContent,
  tr: trContent,
};
export function getSmokeControlContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}
export const smokeControlContent = ruContent;
