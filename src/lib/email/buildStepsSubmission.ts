/**
 * Build the email-submission payload for a step-based form
 * (ServiceRequestForm and QuizControlSystemsForm — both use the
 * structurally identical `FormStep` / `FormField` shape).
 *
 * Like `buildQuizSubmission`, it walks the RUSSIAN source config so the
 * manager always gets Russian labels. Contact-identity fields are lifted
 * into the `customer` card; everything else becomes section rows.
 */
import type { EmailCustomer, EmailLocale, EmailSection } from './payload';

/** Minimal structural shapes — both forms' configs satisfy these. */
type FieldLike = {
  name: string;
  label: string;
  kind: 'text' | 'tel' | 'email' | 'date' | 'textarea' | 'checkbox';
};
type StepLike = {
  title: string;
  fields: readonly FieldLike[];
};

/**
 * Field names shared by the service form and the control-systems quiz
 * that map into the contact card instead of a section row. `consent_pd`
 * is the mandatory PD-consent checkbox — also lifted out (implied true).
 */
const CONTACT_FIELD_NAMES = {
  name: 'contact_full_name',
  email: 'contact_email',
  phone: 'contact_phone',
  company: 'company_name',
  position: 'contact_position',
} as const;

const SKIP_FROM_SECTIONS = new Set<string>([
  ...Object.values(CONTACT_FIELD_NAMES),
  'object_name',
  'object_address',
  'consent_pd',
]);

function formatValue(field: FieldLike, raw: unknown): string {
  if (raw === undefined || raw === null) return '';
  if (typeof raw === 'boolean') return raw ? 'Да' : '';
  const str = String(raw).trim();
  return str;
}

export type StepsSubmission = {
  locale: EmailLocale;
  customer: EmailCustomer;
  sections: EmailSection[];
};

export function buildStepsSubmission(
  steps: readonly StepLike[],
  values: Record<string, string | boolean>,
  locale: EmailLocale,
): StepsSubmission {
  const sections: EmailSection[] = [];

  for (const step of steps) {
    const rows: EmailSection['rows'] = [];
    for (const field of step.fields) {
      if (SKIP_FROM_SECTIONS.has(field.name)) continue;
      const value = formatValue(field, values[field.name]);
      if (!value) continue;
      rows.push({ label: field.label, value });
    }
    if (rows.length > 0) sections.push({ title: step.title, rows });
  }

  const str = (key: string): string => {
    const v = values[key];
    return typeof v === 'string' ? v.trim() : '';
  };

  const customer: EmailCustomer = {
    name: str(CONTACT_FIELD_NAMES.name),
    email: str(CONTACT_FIELD_NAMES.email) || undefined,
    phone: str(CONTACT_FIELD_NAMES.phone) || undefined,
    company: str(CONTACT_FIELD_NAMES.company) || undefined,
    position: str(CONTACT_FIELD_NAMES.position) || undefined,
    objectName: str('object_name') || undefined,
    objectAddress: str('object_address') || undefined,
  };

  return { locale, customer, sections };
}
