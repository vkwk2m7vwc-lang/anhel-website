import type { ProductContent } from "./types";
import { content as ruContent } from "./locales/ru/heating-cooling";
import { content as enContent } from "./locales/en/heating-cooling";
import { content as trContent } from "./locales/tr/heating-cooling";

const BY_LOCALE: Record<string, ProductContent> = {
  ru: ruContent,
  en: enContent,
  tr: trContent,
};

export function getHeatingCoolingContent(locale: string): ProductContent {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}

export const heatingCoolingContent = ruContent;
