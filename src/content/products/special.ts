import type { ProductContent } from "./types";
import { content as ruContent } from "./locales/ru/special";
import { content as enContent } from "./locales/en/special";
import { content as trContent } from "./locales/tr/special";

const BY_LOCALE: Record<string, ProductContent> = { ru: ruContent, en: enContent, tr: trContent };
export function getSpecialContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}
export const specialContent = ruContent;
