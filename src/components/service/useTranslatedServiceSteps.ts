'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import {
  FORM_STEPS,
  type FormStep,
} from '@/content/service/form-config';

/**
 * Overlays localized strings on the service-request FORM_STEPS array.
 * Mirrors the control-systems and shared-QuizShell translation hooks.
 *
 * Lookup convention under namespace `service.request_form`:
 *   steps.{step.index}.title          — step heading
 *   steps.{step.index}.description    — step subtitle
 *   fields.{field.name}.label         — input label
 *   fields.{field.name}.placeholder   — input placeholder
 *   fields.{field.name}.hint          — input hint
 *
 * Missing keys fall back to the TS hardcoded RU string.
 */
export function useTranslatedServiceSteps(): readonly FormStep[] {
  const t = useTranslations('service.request_form');

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
