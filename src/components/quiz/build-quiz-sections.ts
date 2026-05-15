/**
 * Universal quiz → email-sections builder.
 *
 * Walks the RUSSIAN source config (`rawConfig`, not the locale-translated
 * one) across every step → section → field, and emits one EmailSection
 * per step that has at least one filled field. No empty rows: a field is
 * included only when its formatted value is non-empty.
 *
 * This is what makes a fully-filled БИТП quiz (97 fields) arrive complete
 * — the manager sees every parameter the client entered, grouped by step,
 * instead of just the handful that a hand-built payload happened to list.
 */
import type { QuizConfig } from '@/content/quiz/quiz-config';
import type { QuizField } from '@/content/quiz/pumps-fields';
import type { EmailSection } from '@/lib/email/payload';

/**
 * Contact-identity + object fields are lifted into the email's contact
 * card (and the PDF's contact panel), so they're skipped while building
 * the section rows. `consent_pdn` is the mandatory PD-consent checkbox —
 * implied true on every submission, not a data row.
 */
const SKIP_FIELD_NAMES = new Set<string>([
  'contact_organization',
  'contact_fullname',
  'contact_position',
  'contact_email',
  'contact_phone',
  'contact_city',
  'object_name',
  'consent_pdn',
]);

/** Turn a raw form value into a human string (radio → option label, etc.). */
function formatValue(field: QuizField, raw: unknown): string {
  if (raw === undefined || raw === null) return '';
  if (typeof raw === 'boolean') return raw ? 'Да' : '';
  if (typeof raw === 'number') return Number.isFinite(raw) ? String(raw) : '';
  const str = String(raw).trim();
  if (!str) return '';
  if (field.type === 'radio' && field.options) {
    const opt = field.options.find((o) => o.value === str);
    return opt ? opt.label : str;
  }
  return str;
}

export function buildQuizSections(
  rawConfig: QuizConfig,
  values: Record<string, unknown>,
): EmailSection[] {
  const sections: EmailSection[] = [];

  for (const step of rawConfig.steps) {
    const rows: EmailSection['rows'] = [];
    for (const section of step.sections) {
      for (const field of section.fields) {
        if (SKIP_FIELD_NAMES.has(field.name)) continue;
        const value = formatValue(field, values[field.name]);
        if (!value) continue;
        rows.push({ label: field.label, value });
      }
    }
    if (rows.length > 0) {
      const title = step.number ? `${step.number} · ${step.title}` : step.title;
      sections.push({ title, rows });
    }
  }

  return sections;
}
