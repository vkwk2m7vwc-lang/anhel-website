import type { ProductContent } from "./types";
import { content as ruContent } from "./locales/ru/firefighting";
import { content as enContent } from "./locales/en/firefighting";
import { content as trContent } from "./locales/tr/firefighting";

const BY_LOCALE: Record<string, ProductContent> = { ru: ruContent, en: enContent, tr: trContent };
export function getFirefightingContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}
export const firefightingContent = ruContent;
