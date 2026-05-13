import type { ProductContent } from "../types";
import { content as ruContent } from "../locales/ru/control-systems/fire-suppression";
import { content as enContent } from "../locales/en/control-systems/fire-suppression";
import { content as trContent } from "../locales/tr/control-systems/fire-suppression";

/**
 * fire-suppression — locale dispatcher with full RU+EN+TR.
 */
const BY_LOCALE: Record<string, ProductContent> = {
  ru: ruContent,
  en: enContent,
  tr: trContent,
};
export function getFireSuppressionContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}
export const fireSuppressionContent = ruContent;
