/**
 * Build the email-submission payload for a QuizShell quiz.
 *
 * Walks the RUSSIAN source config (`rawConfig`, not the locale-translated
 * one) so the manager always receives Russian field labels regardless of
 * the visitor's UI language. The visitor's locale is passed through
 * separately and shown as a tag in the email header.
 *
 * Output shape matches `FormSubmissionPayload` plus the quiz-only
 * `kind` + `values` (the route still zod-validates `values` and runs the
 * web↔PDF AcroForm mapping check on it).
 */
import type { QuizConfig } from '@/content/quiz/quiz-config';
import type { QuizField } from '@/content/quiz/pumps-fields';
import type { EmailCustomer, EmailLocale, EmailSection } from '@/lib/email/payload';

/**
 * Contact fields surface in the email's contact card instead of a
 * section row, so they're skipped while building sections. `consent_pdn`
 * is the mandatory PD-consent checkbox — also skipped (it's implied true
 * on every submission).
 */
const CONTACT_FIELD_NAMES = [
  'contact_organization',
  'contact_fullname',
  'contact_position',
  'contact_email',
  'contact_phone',
] as const;

const SKIP_FROM_SECTIONS = new Set<string>([
  ...CONTACT_FIELD_NAMES,
  'consent_pdn',
]);

/** Turn a raw form value into a human string (radio → option label, etc.). */
function formatValue(field: QuizField, raw: unknown): string {
  if (raw === undefined || raw === null) return '';
  if (typeof raw === 'boolean') return raw ? 'Да' : '';
  const str = String(raw).trim();
  if (!str) return '';
  if (field.type === 'radio' && field.options) {
    const opt = field.options.find((o) => o.value === str);
    return opt ? opt.label : str;
  }
  return str;
}

export type QuizSubmission = {
  kind: QuizConfig['kind'];
  locale: EmailLocale;
  customer: EmailCustomer;
  sections: EmailSection[];
  values: Record<string, unknown>;
};

export function buildQuizSubmission(
  rawConfig: QuizConfig,
  values: Record<string, unknown>,
  locale: EmailLocale,
): QuizSubmission {
  const sections: EmailSection[] = [];

  for (const step of rawConfig.steps) {
    const rows: EmailSection['rows'] = [];
    for (const section of step.sections) {
      for (const field of section.fields) {
        if (SKIP_FROM_SECTIONS.has(field.name)) continue;
        const value = formatValue(field, values[field.name]);
        if (!value) continue;
        rows.push({ label: field.label, value });
      }
    }
    if (rows.length > 0) sections.push({ title: step.title, rows });
  }

  const str = (key: string): string => {
    const v = values[key];
    return typeof v === 'string' ? v.trim() : '';
  };

  const customer: EmailCustomer = {
    name: str('contact_fullname'),
    email: str('contact_email') || undefined,
    phone: str('contact_phone') || undefined,
    company: str('contact_organization') || undefined,
    position: str('contact_position') || undefined,
  };

  return { kind: rawConfig.kind, locale, customer, sections, values };
}
