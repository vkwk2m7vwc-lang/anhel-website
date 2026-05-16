/**
 * Email template — service request (/service/request → /api/service-request).
 *
 * v3 structure: the body carries only the contact card + object info +
 * a PDF-attachment notice. The full request (equipment, serials, fault
 * description, commitments) travels as a separate PDF attachment —
 * archiving service requests as a document matters for the service team.
 */
import {
  renderEmailShell,
  renderCustomerBlock,
  renderPdfCta,
  type EmailLocale,
  type EmailCustomer,
} from './_layout';

export type ServiceRequestEmailData = {
  locale: EmailLocale;
  /** Accent colour (hex) — tints the email. */
  accent: string;
  customer: EmailCustomer;
  /** Number of filled fields — shown in the PDF-attachment notice. */
  fieldCount: number;
};

export function renderServiceRequestEmail(data: ServiceRequestEmailData): {
  subject: string;
  html: string;
} {
  const subject = '[ANHEL] Заявка на сервис';
  const heading = 'Заявка на сервисное обслуживание';

  const bodyHtml =
    renderCustomerBlock(data.customer, data.accent) +
    renderPdfCta(data.accent, {
      title: 'Заявка на сервис приложена к письму',
      note: 'Полная заявка — оборудование, серийные номера, описание неисправности — отдельным PDF-файлом. Вложение в конце письма ↓',
    });

  const html = renderEmailShell({
    heading,
    locale: data.locale,
    accent: data.accent,
    bodyHtml,
    intro:
      'Клиент оставил заявку на сервисное обслуживание. Контакт — ниже, детали — в PDF.',
  });

  return { subject, html };
}
