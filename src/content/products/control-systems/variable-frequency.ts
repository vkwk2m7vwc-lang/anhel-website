import type { ProductContent } from "../types";
import { content as ruContent } from "../locales/ru/control-systems/variable-frequency";
import { content as enContent } from "../locales/en/control-systems/variable-frequency";
import { content as trContent } from "../locales/tr/control-systems/variable-frequency";

/**
 * variable-frequency — locale dispatcher with full RU+EN+TR.
 */
const BY_LOCALE: Record<string, ProductContent> = {
  ru: ruContent,
  en: enContent,
  tr: trContent,
};
export function getVariableFrequencyContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}
export const variableFrequencyContent = ruContent;
