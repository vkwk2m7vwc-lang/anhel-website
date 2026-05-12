import type { ProductContent } from "./types";
import { content as ruContent } from "./locales/ru/pressure-boost";
import { content as enContent } from "./locales/en/pressure-boost";
import { content as trContent } from "./locales/tr/pressure-boost";

const BY_LOCALE: Record<string, ProductContent> = { ru: ruContent, en: enContent, tr: trContent };
export function getPressureBoostContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}
export const pressureBoostContent = ruContent;
