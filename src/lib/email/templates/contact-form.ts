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
  customer: EmailCustomer;
  /** Free-text message from the visitor (may be empty). */
  message: string;
};

export function renderContactFormEmail(data: ContactFormEmailData): {
  subject: string;
  html: string;
} {
  const subject = '[ANHEL] Сообщение с сайта';
  const heading = 'Сообщение через форму обратной связи';

  const bodyHtml =
    renderCustomerBlock(data.customer) +
    renderSection({
      title: 'Сообщение',
      rows: [{ label: 'Текст обращения', value: data.message }],
    });

  const html = renderEmailShell({
    heading,
    locale: data.locale,
    bodyHtml,
    intro: 'Новое обращение через форму обратной связи на сайте.',
  });

  return { subject, html };
}
