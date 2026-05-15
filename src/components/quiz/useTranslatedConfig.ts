'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { QuizConfig } from '@/content/quiz/quiz-config';

/**
 * Overlays localized strings on top of a `QuizConfig` walking the
 * full step/section/field tree.
 *
 * Lookup convention (all keys under namespace `quiz`):
 *   {kind}.title                              — page title
 *   {kind}.description                        — page subtitle
 *   {kind}.catalog_label                      — success-screen catalog button
 *   {kind}.steps.{step.id}.title              — step heading
 *   {kind}.steps.{step.id}.description        — step subtitle
 *   {kind}.sections.{section.id}.title        — section heading
 *   {kind}.sections.{section.id}.hint         — section sub-line
 *   {kind}.fields.{field.name}.label          — input label
 *   {kind}.fields.{field.name}.hint           — input hint
 *   {kind}.fields.{field.name}.placeholder    — input placeholder
 *   {kind}.fields.{field.name}.options.{value} — radio option label
 *
 * Source-of-truth fallback: every TS-hardcoded RU string (label / hint /
 * placeholder / option.label / section.title / step.title) stays in
 * `*-fields.ts`. When a key is missing in the active locale's JSON
 * dictionary the original RU string is rendered. That lets us translate
 * the 5 quizzes one-by-one over multiple commits without breaking the
 * UI on partially-translated locales — each commit just fills in more
 * keys.
 *
 * The walk is wrapped in `useMemo` keyed on `config` + the `t` instance,
 * so a typical render does zero extra work after first mount.
 */
export function useTranslatedConfig(config: QuizConfig): QuizConfig {
  const t = useTranslations('quiz');

  return useMemo(() => {
    const k = config.kind;

    /**
     * Safe translate. next-intl throws `MISSING_MESSAGE` for unknown keys;
     * we catch and fall back to the TS hardcoded string. The empty-string
     * check covers the rare case where `t()` returns the key itself for
     * an explicitly-empty value.
     */
    const tr = (key: string, fallback: string): string => {
      try {
        const v = t(key);
        // next-intl returns the ABSOLUTE path (`quiz.<key>`) for a missing
        // message — never the relative `key` we passed. The old `v !== key`
        // guard therefore never matched a miss, so missing keys leaked the
        // raw `quiz.itp.description`-style string into the UI instead of
        // falling back to the RU source string. Guard both forms.
        return v && v !== key && v !== `quiz.${key}` ? v : fallback;
      } catch {
        return fallback;
      }
    };

    /** Only translate optional strings if they exist on the source field. */
    const trOpt = (
      key: string,
      fallback: string | undefined,
    ): string | undefined => {
      if (fallback === undefined) return undefined;
      return tr(key, fallback);
    };

    return {
      ...config,
      title: tr(`${k}.title`, config.title),
      description: trOpt(`${k}.description`, config.description),
      catalogLabel: tr(`${k}.catalog_label`, config.catalogLabel),
      steps: config.steps.map((step) => ({
        ...step,
        title: tr(`${k}.steps.${step.id}.title`, step.title),
        description: trOpt(
          `${k}.steps.${step.id}.description`,
          step.description,
        ),
        sections: step.sections.map((section) => ({
          ...section,
          title: tr(
            `${k}.sections.${section.id}.title`,
            section.title,
          ),
          hint: trOpt(`${k}.sections.${section.id}.hint`, section.hint),
          fields: section.fields.map((field) => ({
            ...field,
            label: tr(`${k}.fields.${field.name}.label`, field.label),
            hint: trOpt(`${k}.fields.${field.name}.hint`, field.hint),
            placeholder: trOpt(
              `${k}.fields.${field.name}.placeholder`,
              field.placeholder,
            ),
            unit: trOpt(`${k}.fields.${field.name}.unit`, field.unit),
            options: field.options
              ? field.options.map((opt) => ({
                  ...opt,
                  label: tr(
                    `${k}.fields.${field.name}.options.${opt.value}`,
                    opt.label,
                  ),
                }))
              : undefined,
          })),
        })),
      })),
    };
  }, [config, t]);
}
