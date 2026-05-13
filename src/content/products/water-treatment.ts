import type { ProductContent } from "./types";
import { content as ruContent } from "./locales/ru/water-treatment";
import { content as enContent } from "./locales/en/water-treatment";
import { content as trContent } from "./locales/tr/water-treatment";

/**
 * Water-treatment — locale dispatcher. Same pattern as heating-unit.
 * RU master + EN + TR variants under `./locales/<lang>/water-treatment.ts`.
 */
const BY_LOCALE: Record<string, ProductContent> = {
  ru: ruContent,
  en: enContent,
  tr: trContent,
};

export function getWaterTreatmentContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}

export const waterTreatmentContent = ruContent;
