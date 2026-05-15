/**
 * Email template — service request (/service/request → /api/service-request).
 *
 * The visitor reports a fault on already-installed ANHEL equipment. The
 * sections carry the object / equipment / fault details; the customer
 * block carries who the service engineer will meet on site.
 */
import {
  renderEmailShell,
  renderCustomerBlock,
  renderSection,
  type EmailLocale,
  type EmailCustomer,
  type EmailSection,
} from './_layout';

export type ServiceRequestEmailData = {
  locale: EmailLocale;
  /** Accent colour (hex) — tints the email. */
  accent: string;
  customer: EmailCustomer;
  /** Ordered, pre-formatted sections (Russian labels from the source config). */
  sections: EmailSection[];
};

export function renderServiceRequestEmail(data: ServiceRequestEmailData): {
  subject: string;
  html: string;
} {
  const subject = '[ANHEL] Заявка на сервис';
  const heading = 'Заявка на сервисное обслуживание';

  const filledSections = data.sections.filter((s) => s.rows.length > 0);
  const bodyHtml =
    renderCustomerBlock(data.customer, data.accent) +
    filledSections.map((s) => renderSection(s, data.accent)).join('');

  const html = renderEmailShell({
    heading,
    locale: data.locale,
    accent: data.accent,
    bodyHtml,
    intro:
      'Клиент оставил заявку на сервисное обслуживание оборудования ANHEL.',
  });

  return { subject, html };
}
