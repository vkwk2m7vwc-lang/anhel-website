/**
 * Email template — quiz / questionnaire submission.
 *
 * Shared by all 5 quizzes: the 4 QuizShell quizzes routed through
 * /api/questionnaire (pumps / vpu / itp / aupd) and the control-systems
 * quiz (/api/quiz/control-systems). The caller passes a human product
 * name plus the already-formatted sections, so this template stays
 * agnostic of each quiz's field layout.
 */
import {
  renderEmailShell,
  renderCustomerBlock,
  renderSection,
  type EmailLocale,
  type EmailCustomer,
  type EmailSection,
} from './_layout';

export type QuizResultEmailData = {
  /** Human product name, e.g. "Подбор насосной установки", "Шкафы управления". */
  productName: string;
  /** Visitor's UI locale — shown as a tag in the header. */
  locale: EmailLocale;
  customer: EmailCustomer;
  /** Ordered, pre-formatted sections (Russian labels from the source config). */
  sections: EmailSection[];
};

export function renderQuizResultEmail(data: QuizResultEmailData): {
  subject: string;
  html: string;
} {
  const subject = `[ANHEL] Новый квиз — ${data.productName}`;
  const heading = `Новый опросный лист: ${data.productName}`;

  const filledSections = data.sections.filter((s) => s.rows.length > 0);
  const bodyHtml =
    renderCustomerBlock(data.customer) +
    filledSections.map(renderSection).join('');

  const html = renderEmailShell({
    heading,
    locale: data.locale,
    bodyHtml,
    intro:
      'Клиент заполнил опросный лист на сайте. Все указанные параметры — ниже.',
  });

  return { subject, html };
}
