/**
 * Shared building blocks for every ANHEL transactional email.
 *
 * Why plain HTML-string builders (not .tsx / React Email):
 *   Email clients (Gmail web/iOS, Mail.app, Outlook) only reliably
 *   render <table>-based layouts with inline styles. Building that as
 *   JSX needs a server renderer; plain template strings are simpler,
 *   dependency-free and produce exactly the markup we control.
 *
 * Theme — light B2B classic (v2):
 *   page  #F2F2F1   card  #FFFFFF   text  #1A1A1A   muted #6E6E6E
 *   panel #F7F7F6   hairline rgba(10,10,10,0.10)
 *   font  Arial / Helvetica sans-serif stack — no web fonts (unreliable
 *         in mail clients); set on body AND every text cell because
 *         Outlook resets inherited font-family.
 *   accent — per product, passed in (see lib/email/accents.ts):
 *     water синий · fire красный · treatment сталь · heat оранжевый ·
 *     neutral графит
 *
 * The email chrome (headings, section labels, footer) is always in
 * Russian — it is read by the ANHEL manager. The customer's UI locale
 * is shown as a tag in the header ("Язык: EN"); the field labels are
 * taken from the Russian source config, so the manager always gets a
 * clean Russian email regardless of which language the visitor used.
 */

import type {
  EmailLocale,
  EmailField,
  EmailSection,
  EmailCustomer,
} from '../payload';

// Re-export so template files can keep importing types from a single place.
export type { EmailLocale, EmailField, EmailSection, EmailCustomer };

export const LOCALE_LABEL: Record<EmailLocale, string> = {
  ru: 'RU',
  en: 'EN',
  tr: 'TR',
};

const COLORS = {
  page: '#F2F2F1',
  card: '#FFFFFF',
  panel: '#F7F7F6',
  text: '#1A1A1A',
  heading: '#0A0A0A',
  muted: '#6E6E6E',
  hairline: 'rgba(10,10,10,0.10)',
} as const;

/** B2B-safe sans-serif stack — no web fonts (mail clients can't load them). */
const FONT = "Arial, 'Helvetica Neue', Helvetica, sans-serif";

/** Escape user-supplied text before putting it into HTML. */
export function escapeHtml(input: unknown): string {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Current time in Moscow, e.g. "15.05.2026, 18:42 МСК". */
export function formatMoscowTimestamp(date: Date = new Date()): string {
  const formatted = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
  return `${formatted} МСК`;
}

/** Render a "Поле → Значение" table for one section. `accent` tints the title. */
export function renderSection(section: EmailSection, accent: string): string {
  const rows = section.rows
    .map(
      (row) => `
        <tr>
          <td style="padding:7px 16px 7px 0;vertical-align:top;width:42%;font-family:${FONT};font-size:13px;line-height:1.45;color:${COLORS.muted};border-top:1px solid ${COLORS.hairline};">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding:7px 0;vertical-align:top;font-family:${FONT};font-size:14px;line-height:1.5;color:${COLORS.text};border-top:1px solid ${COLORS.hairline};">
            ${escapeHtml(row.value) || '&mdash;'}
          </td>
        </tr>`,
    )
    .join('');

  const title = section.title
    ? `<p style="margin:0 0 4px;font-family:${FONT};font-size:11px;letter-spacing:0.10em;text-transform:uppercase;font-weight:700;color:${accent};">
         ${escapeHtml(section.title)}
       </p>`
    : '';

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px;border-collapse:collapse;">
      <tr><td style="padding:0;">${title}</td></tr>
      <tr>
        <td style="padding:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${rows}
          </table>
        </td>
      </tr>
    </table>`;
}

/** Contact card — the person who submitted the form. */
export function renderCustomerBlock(
  customer: EmailCustomer,
  accent: string,
): string {
  const rows: EmailField[] = [];
  if (customer.company) rows.push({ label: 'Компания', value: customer.company });
  rows.push({ label: 'Контактное лицо', value: customer.name });
  if (customer.position) rows.push({ label: 'Должность', value: customer.position });
  if (customer.phone) rows.push({ label: 'Телефон', value: customer.phone });
  if (customer.email) rows.push({ label: 'E-mail', value: customer.email });
  if (customer.city) rows.push({ label: 'Город', value: customer.city });
  if (customer.objectName) rows.push({ label: 'Объект', value: customer.objectName });
  if (customer.objectAddress)
    rows.push({ label: 'Адрес объекта', value: customer.objectAddress });

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-collapse:collapse;background:${COLORS.panel};border:1px solid ${COLORS.hairline};border-left:3px solid ${accent};">
      <tr>
        <td style="padding:16px 20px 2px;">
          ${renderSection({ title: 'Контакт', rows }, accent).trim()}
        </td>
      </tr>
    </table>`;
}

/**
 * PDF-attachment notice block (v3). Email attachments have no clickable
 * URL inside the body, so this is an accent-tinted informational panel
 * that points the manager at the attachment, not a real link.
 */
export function renderPdfCta(
  accent: string,
  args: { title: string; note: string },
): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;border-collapse:collapse;background:${COLORS.panel};border:1px solid ${COLORS.hairline};border-left:3px solid ${accent};">
      <tr>
        <td style="padding:16px 20px;font-family:${FONT};">
          <span style="display:inline-block;background:${accent};color:#FFFFFF;font-family:${FONT};font-size:10px;font-weight:700;letter-spacing:0.08em;padding:5px 9px;border-radius:3px;">PDF</span>
          <span style="font-family:${FONT};font-size:14px;font-weight:700;color:${COLORS.heading};">&nbsp;&nbsp;${escapeHtml(args.title)}</span>
          <p style="margin:6px 0 0;font-family:${FONT};font-size:12px;line-height:1.5;color:${COLORS.muted};">
            ${escapeHtml(args.note)}
          </p>
        </td>
      </tr>
    </table>`;
}

/**
 * Wrap a body in the full ANHEL email shell — header (text logo + locale
 * tag), heading, Moscow timestamp, body, footer. Light B2B theme; `accent`
 * (a hex colour) tints the rule, the ® mark and section labels.
 */
export function renderEmailShell(args: {
  heading: string;
  locale: EmailLocale;
  bodyHtml: string;
  accent: string;
  /** Optional one-line intro under the heading. */
  intro?: string;
}): string {
  const { heading, locale, bodyHtml, intro, accent } = args;
  const timestamp = formatMoscowTimestamp();

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.page};font-family:${FONT};-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.page};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;border-collapse:collapse;background:${COLORS.card};border:1px solid ${COLORS.hairline};">
          <tr>
            <td style="padding:32px 36px 36px;font-family:${FONT};">

              <!-- Header -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:${FONT};font-size:22px;font-weight:700;letter-spacing:0.03em;color:${COLORS.heading};">
                    ANHEL<span style="color:${accent};font-size:13px;vertical-align:super;">&reg;</span>
                  </td>
                  <td align="right" style="font-family:${FONT};font-size:11px;letter-spacing:0.10em;text-transform:uppercase;color:${COLORS.muted};">
                    Язык:&nbsp;<span style="color:${COLORS.heading};font-weight:700;">${LOCALE_LABEL[locale]}</span>
                  </td>
                </tr>
              </table>

              <!-- Accent rule -->
              <div style="height:3px;background:${accent};font-size:0;line-height:0;margin:18px 0 0;">&nbsp;</div>

              <!-- Heading + timestamp -->
              <h1 style="margin:24px 0 4px;font-family:${FONT};font-size:21px;line-height:1.3;font-weight:700;color:${COLORS.heading};">
                ${escapeHtml(heading)}
              </h1>
              <p style="margin:0 0 ${intro ? '8' : '24'}px;font-family:${FONT};font-size:12px;letter-spacing:0.04em;color:${COLORS.muted};">
                ${escapeHtml(timestamp)}
              </p>
              ${
                intro
                  ? `<p style="margin:0 0 24px;font-family:${FONT};font-size:14px;line-height:1.55;color:${COLORS.muted};">${escapeHtml(intro)}</p>`
                  : ''
              }

              <!-- Body -->
              ${bodyHtml}

              <!-- Footer -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 0;border-top:1px solid ${COLORS.hairline};">
                <tr>
                  <td style="padding:20px 0 0;font-family:${FONT};">
                    <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;color:${COLORS.muted};">
                      ANHEL<span style="color:${accent};">&reg;</span>
                      &nbsp;&middot;&nbsp; ООО «ПРОФИТ»
                      &nbsp;&middot;&nbsp; <a href="https://anhelspb.com" style="color:${COLORS.muted};text-decoration:underline;">anhelspb.com</a>
                      &nbsp;&middot;&nbsp; <a href="mailto:info@anhelspb.com" style="color:${COLORS.muted};text-decoration:underline;">info@anhelspb.com</a>
                    </p>
                    <p style="margin:8px 0 0;font-family:${FONT};font-size:11px;line-height:1.6;color:${COLORS.muted};">
                      Письмо сформировано автоматически с сайта anhelspb.com. Чтобы ответить клиенту — просто нажмите «Ответить».
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
