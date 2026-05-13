import type { ProductContent } from "../types";
import { content as ruContent } from "../locales/ru/control-systems/electric-actuators";
import { content as enContent } from "../locales/en/control-systems/electric-actuators";
import { content as trContent } from "../locales/tr/control-systems/electric-actuators";

/**
 * electric-actuators — locale dispatcher with full RU+EN+TR.
 */
const BY_LOCALE: Record<string, ProductContent> = {
  ru: ruContent,
  en: enContent,
  tr: trContent,
};
export function getElectricActuatorsContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}
export const electricActuatorsContent = ruContent;
