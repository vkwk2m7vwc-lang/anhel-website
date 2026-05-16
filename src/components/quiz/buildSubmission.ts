/**
 * Build the email-submission payload for a QuizShell quiz.
 *
 * Lifts the contact-identity fields into the `customer` card and delegates
 * the rest to the universal `buildQuizSections` builder, so the manager
 * receives every filled field grouped by step (Russian labels from the
 * source config). `accent` is the product colour key; `kind` + `values`
 * are quiz-only — the route still zod-validates `values` and runs the
 * web↔PDF AcroForm mapping check on it.
 */
import type { QuizConfig } from '@/content/quiz/quiz-config';
import type { EmailAccent } from '@/lib/email/accents';
import type {
  EmailCustomer,
  EmailLocale,
  EmailSection,
} from '@/lib/email/payload';
import { buildQuizSections } from './build-quiz-sections';

export type QuizSubmission = {
  kind: QuizConfig['kind'];
  locale: EmailLocale;
  accent: EmailAccent;
  customer: EmailCustomer;
  sections: EmailSection[];
  values: Record<string, unknown>;
};

export function buildQuizSubmission(
  rawConfig: QuizConfig,
  values: Record<string, unknown>,
  locale: EmailLocale,
  accent: EmailAccent,
): QuizSubmission {
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
    city: str('contact_city') || undefined,
    objectName: str('object_name') || undefined,
  };

  return {
    kind: rawConfig.kind,
    locale,
    accent,
    customer,
    sections: buildQuizSections(rawConfig, values),
    values,
  };
}
