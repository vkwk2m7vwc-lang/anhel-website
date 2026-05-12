import type { ProductContent } from "./types";
import { content as ruContent } from "./locales/ru/water-supply";
import { content as enContent } from "./locales/en/water-supply";
import { content as trContent } from "./locales/tr/water-supply";

const BY_LOCALE: Record<string, ProductContent> = {
  ru: ruContent,
  en: enContent,
  tr: trContent,
};

export function getWaterSupplyContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}

export const waterSupplyContent = ruContent;
