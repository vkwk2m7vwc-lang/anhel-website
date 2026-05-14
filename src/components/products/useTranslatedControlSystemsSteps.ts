'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import {
  FORM_STEPS,
  type FormStep,
} from '@/content/products/control-systems/quiz-config';

/**
 * Overlays localized strings on top of the FORM_STEPS array for the
 * control-systems quiz form. Mirrors `useTranslatedConfig` for the
 * shared QuizShell pipeline — same fallback semantics.
 *
 * Lookup convention under namespace `quiz.control_systems`:
 *   steps.{step.index}.title          — step heading
 *   steps.{step.index}.description    — step subtitle
 *   fields.{field.name}.label         — input label
 *   fields.{field.name}.placeholder   — input placeholder
 *   fields.{field.name}.hint          — input hint
 *
 * If a key is missing in the active locale's JSON the original TS string
 * is rendered — so partial translation never breaks the page.
 */
export function useTranslatedControlSystemsSteps(): readonly FormStep[] {
  const t = useTranslations('quiz.control_systems');

  return useMemo(() => {
    const tr = (key: string, fallback: string): string => {
      try {
        const v = t(key);
        return v && v !== key ? v : fallback;
      } catch {
        return fallback;
      }
    };
    const trOpt = (
      key: string,
      fallback: string | undefined,
    ): string | undefined => {
      if (fallback === undefined) return undefined;
      return tr(key, fallback);
    };

    return FORM_STEPS.map((step) => ({
      ...step,
      title: tr(`steps.${step.index}.title`, step.title),
      description: trOpt(
        `steps.${step.index}.description`,
        step.description,
      ),
      fields: step.fields.map((field) => ({
        ...field,
        label: tr(`fields.${field.name}.label`, field.label),
        placeholder: trOpt(
          `fields.${field.name}.placeholder`,
          field.placeholder,
        ),
        hint: trOpt(`fields.${field.name}.hint`, field.hint),
      })),
    }));
  }, [t]);
}
