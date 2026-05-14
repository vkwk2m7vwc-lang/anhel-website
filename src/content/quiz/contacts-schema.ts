/**
 * Shared zod blocks used by all 4 quiz schemas (pumps / vpu / itp / aupd).
 *
 * Each block is delivered as a factory `make…(t)` so the validation
 * messages can be localized at render time via `useTranslations` /
 * `getTranslations`. The factory consumes a thin `ValidationT` shape
 * (a function `(key) => string`) so we don't tie this module to
 * `next-intl`'s exact types.
 *
 * Key namespace: messages.quiz.shell.validation.* — see
 * `src/messages/<locale>/quiz.json`.
 *
 * The legacy static schemas in `*-schema.ts` are kept untouched (with
 * RU messages) so the server-side `/api/questionnaire` route can
 * continue to validate without the locale context. Client-side
 * validation in `QuizShell` uses the factory exclusively.
 */
import { z } from 'zod';

export type ValidationT = (key: string) => string;

/**
 * Six contact fields shared by pumps / vpu / itp / aupd.
 * Returned as a plain object that can be spread into a `z.object({...})`.
 */
export function makeContactsBlock(t: ValidationT) {
  return {
    contact_organization: z.string().trim().min(1, t('required.organization')),
    contact_fullname: z.string().trim().min(1, t('required.fullname')),
    contact_position: z.string().trim().min(1, t('required.position')),
    contact_city: z.string().trim().min(1, t('required.city')),
    contact_email: z
      .string()
      .trim()
      .min(1, t('required.email'))
      .email(t('email_format')),
    contact_phone: z
      .string()
      .trim()
      .min(1, t('required.phone'))
      .regex(/^[+\d\s()\-.]{6,}$/, t('phone_format')),
  };
}

/**
 * Personal-data-consent checkbox shared by all 4 quizzes.
 * The checkbox is `z.literal(true)` — must be ticked, with the
 * localized message attached via `errorMap`.
 */
export function makeConsentBlock(t: ValidationT) {
  return {
    consent_pdn: z.literal(true, {
      errorMap: () => ({ message: t('consent_required') }),
    }),
  };
}
