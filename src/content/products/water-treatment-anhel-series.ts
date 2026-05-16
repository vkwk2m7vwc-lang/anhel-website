import type { ProductContent } from "./types";
import type { VpuModificationsContent } from "@/components/products/water-treatment/VpuModificationsTable";
import type { CompositionContent } from "@/components/products/water-treatment/CompositionList";
import type { AutomationContent } from "@/components/products/water-treatment/AutomationSection";
import type { AdvantagesContent } from "./types";

import {
  content as ruContent,
  modifications as ruModifications,
  principle as ruPrinciple,
  composition as ruComposition,
  automation as ruAutomation,
} from "./locales/ru/water-treatment-anhel-series";
import {
  content as enContent,
  modifications as enModifications,
  principle as enPrinciple,
  composition as enComposition,
  automation as enAutomation,
} from "./locales/en/water-treatment-anhel-series";
import {
  content as trContent,
  modifications as trModifications,
  principle as trPrinciple,
  composition as trComposition,
  automation as trAutomation,
} from "./locales/tr/water-treatment-anhel-series";

/**
 * VPU Anhel Series — locale dispatcher.
 *
 * Returns the full bundle of section content for the page so the
 * route handler can pull a single object and pass each piece to its
 * component. Pattern follows getWaterTreatmentContent (single content
 * object) but extended with the series-specific sections — modifications
 * table, principle steps, composition list, and automation blocks.
 */
export type VpuAnhelSeriesBundle = {
  content: ProductContent;
  modifications: VpuModificationsContent;
  principle: AdvantagesContent;
  composition: CompositionContent;
  automation: AutomationContent;
};

const RU_BUNDLE: VpuAnhelSeriesBundle = {
  content: ruContent,
  modifications: ruModifications,
  principle: ruPrinciple as AdvantagesContent,
  composition: ruComposition,
  automation: ruAutomation,
};

const EN_BUNDLE: VpuAnhelSeriesBundle = {
  content: enContent,
  modifications: enModifications,
  principle: enPrinciple as AdvantagesContent,
  composition: enComposition,
  automation: enAutomation,
};

const TR_BUNDLE: VpuAnhelSeriesBundle = {
  content: trContent,
  modifications: trModifications,
  principle: trPrinciple as AdvantagesContent,
  composition: trComposition,
  automation: trAutomation,
};

const BY_LOCALE: Record<string, VpuAnhelSeriesBundle> = {
  ru: RU_BUNDLE,
  en: EN_BUNDLE,
  tr: TR_BUNDLE,
};

export function getVpuAnhelSeriesContent(locale: string): VpuAnhelSeriesBundle {
  return BY_LOCALE[locale] ?? BY_LOCALE.ru;
}
