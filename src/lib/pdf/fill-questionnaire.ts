/**
 * Wrapper around the PDF generator — produces the ready-to-attach
 * questionnaire: PDF bytes + a localized, filesystem-safe filename.
 *
 * Used by the form API routes: build the PDF from the same `sections`
 * data the email body used to carry, then hand `{ content, filename }`
 * straight to `sendEmail({ attachments: [...] })`.
 *
 * The PDF *content* stays Russian (manager-facing archive, consistent
 * with the v2 email decision); only the filename prefix is localized.
 */
import { Buffer } from 'node:buffer';
import type { EmailCustomer, EmailLocale, EmailSection } from '@/lib/email/payload';
import { buildQuestionnairePdf } from './questionnaire-pdf';

export type QuestionnaireKind = 'quiz' | 'service';

/** Localized filename prefix — `Опросный лист — …` / `Questionnaire — …` / `Anket — …`. */
const FILENAME_PREFIX: Record<EmailLocale, Record<QuestionnaireKind, string>> = {
  ru: { quiz: 'Опросный лист', service: 'Заявка на сервис' },
  en: { quiz: 'Questionnaire', service: 'Service request' },
  tr: { quiz: 'Anket', service: 'Servis talebi' },
};

/** Strip characters that are unsafe in filenames across OSes. */
function sanitizeFilenamePart(value: string): string {
  return value
    .replace(/[/\\:*?"<>|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export type FilledQuestionnaire = { content: Buffer; filename: string };

export async function fillQuestionnaire(args: {
  kind: QuestionnaireKind;
  /** Product name for the title — e.g. "БИТП". Ignored for `service`. */
  productName: string;
  accentHex: string;
  locale: EmailLocale;
  customer: EmailCustomer;
  sections: EmailSection[];
}): Promise<FilledQuestionnaire> {
  const { kind, productName, accentHex, locale, customer, sections } = args;

  const documentTitle =
    kind === 'service'
      ? 'Заявка на сервисное обслуживание'
      : `Опросный лист — ${productName}`;

  const bytes = await buildQuestionnairePdf({
    documentTitle,
    accentHex,
    locale,
    customer,
    sections,
  });

  // Filename: "<Prefix> — <Product> — <Object|Company> — <DD.MM.YYYY>.pdf"
  const subject = customer.objectName || customer.company || customer.name;
  const dateStr = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  const parts =
    kind === 'service'
      ? [FILENAME_PREFIX[locale].service, subject, dateStr]
      : [FILENAME_PREFIX[locale].quiz, productName, subject, dateStr];

  const filename =
    parts
      .filter(Boolean)
      .map(sanitizeFilenamePart)
      .filter(Boolean)
      .join(' — ') + '.pdf';

  return { content: Buffer.from(bytes), filename };
}
