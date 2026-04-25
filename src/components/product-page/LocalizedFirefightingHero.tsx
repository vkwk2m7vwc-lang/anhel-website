"use client";

import { ProductHero } from "./ProductHero";
import { useLocale } from "@/components/providers/LocaleProvider";
import type {
  ProductAccent,
  ProductHeroContent,
} from "@/content/products/types";

/**
 * Locale-aware wrapper around ProductHero for the firefighting page.
 *
 * Why a wrapper, not a flag inside ProductHero: the i18n-toggle
 * experiment is scoped to a single reference product page (firefighting).
 * Keeping the hero component generic and putting the per-page
 * translation logic in this thin shim means we can roll the same
 * pattern out to other pages later without polluting the shared
 * component's API.
 *
 * Behaviour:
 *   - locale = "ru" → original RU content from firefighting.ts
 *   - locale = "en" → fields swapped for the matching translations
 *     in i18n.ts (`ff.hero.*`). Breadcrumbs labels are also flipped
 *     so the «Главная / Насосные станции / Пожаротушение» chain
 *     reads as «Home / Pump stations / Fire protection».
 *
 * The image, slug, accent, and route paths stay identical — only
 * the human-readable strings change.
 */
export function LocalizedFirefightingHero({
  content,
  accent,
}: {
  content: ProductHeroContent;
  accent: ProductAccent;
}) {
  const { locale, t } = useLocale();

  if (locale === "ru") {
    return <ProductHero content={content} accent={accent} />;
  }

  const translated: ProductHeroContent = {
    ...content,
    sectionTag: t("ff.hero.tag"),
    title: t("ff.hero.title"),
    subtitle: t("ff.hero.lede"),
    primaryCta: {
      ...content.primaryCta,
      label: t("ff.hero.cta.primary"),
    },
    secondaryCta: content.secondaryCta
      ? {
          ...content.secondaryCta,
          label: t("ff.hero.cta.secondary"),
        }
      : undefined,
    breadcrumbs: content.breadcrumbs.map((crumb, i) => {
      // Map the three known breadcrumb labels by position. This is
      // brittle if the chain changes, but the firefighting page has
      // a stable 3-step chain — and the wrapper is page-specific.
      if (i === 0) return { ...crumb, label: t("nav.products") + " / Home" };
      if (i === 1) return { ...crumb, label: t("product.pumps.title") };
      if (i === 2) return { ...crumb, label: t("product.firefighting.title") };
      return crumb;
    }),
  };

  return <ProductHero content={translated} accent={accent} />;
}
