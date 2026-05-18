/**
 * Email template — contact form (/contacts → /api/contacts).
 *
 * The simplest of the three: name / phone / email go in the contact
 * block, the free-text message gets its own section.
 */
import {
  renderEmailShell,
  renderCustomerBlock,
  renderSection,
  type EmailLocale,
  type EmailCustomer,
} from './_layout';

export type ContactFormEmailData = {
  locale: EmailLocale;
  /** Accent colour (hex) — tints the email. */
  accent: string;
  customer: EmailCustomer;
  /** Free-text message from the visitor (may be empty). */
  message: string;
};

export function renderContactFormEmail(data: ContactFormEmailData): {
  subject: string;
  html: string;
} {
  const subject = '[Заявка с сайта] Сообщение через форму обратной связи';
  const heading = 'Сообщение через форму обратной связи';

  const bodyHtml =
    renderCustomerBlock(data.customer, data.accent) +
    renderSection(
      {
        title: 'Сообщение',
        rows: [{ label: 'Текст обращения', value: data.message }],
      },
      data.accent,
    );

  const html = renderEmailShell({
    heading,
    locale: data.locale,
    accent: data.accent,
    bodyHtml,
    intro: 'Новое обращение через форму обратной связи на сайте.',
  });

  return { subject, html };
}
