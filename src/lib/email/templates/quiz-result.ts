/**
 * Email template — quiz / questionnaire submission (v3: short body).
 *
 * Shared by all 5 quizzes: the 4 QuizShell quizzes routed through
 * /api/questionnaire (pumps / vpu / itp / aupd) and the control-systems
 * quiz (/api/quiz/control-systems).
 *
 * v3 structure: the body carries only the contact card + object info +
 * a PDF-attachment notice. The full filled questionnaire (every field,
 * grouped by step) travels as a separate PDF attachment — so the manager
 * isn't scrolling 97 fields in the email body.
 */
import {
  renderEmailShell,
  renderCustomerBlock,
  renderPdfCta,
  type EmailLocale,
  type EmailCustomer,
} from './_layout';

export type QuizResultEmailData = {
  /** Human product name, e.g. "БИТП", "Шкафы управления". */
  productName: string;
  /** Visitor's UI locale — shown as a tag in the header. */
  locale: EmailLocale;
  /** Product accent colour (hex) — tints the email. */
  accent: string;
  customer: EmailCustomer;
  /** Number of filled fields — shown in the PDF-attachment notice. */
  fieldCount: number;
};

export function renderQuizResultEmail(data: QuizResultEmailData): {
  subject: string;
  html: string;
} {
  const subject = `[ANHEL] Новый квиз — ${data.productName}`;
  const heading = `Новая заявка — ${data.productName}`;

  const bodyHtml =
    renderCustomerBlock(data.customer, data.accent) +
    renderPdfCta(data.accent, {
      title: 'Опросный лист приложен к письму',
      note: `Полный заполненный опросный лист — ${data.fieldCount} ${pluralFields(
        data.fieldCount,
      )} — отдельным PDF-файлом. Вложение в конце письма ↓`,
    });

  const html = renderEmailShell({
    heading,
    locale: data.locale,
    accent: data.accent,
    bodyHtml,
    intro:
      'Клиент заполнил опросный лист на сайте. Контакт — ниже, все параметры — в PDF.',
  });

  return { subject, html };
}

/** Russian plural for «параметр». */
function pluralFields(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'параметр';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'параметра';
  return 'параметров';
}
