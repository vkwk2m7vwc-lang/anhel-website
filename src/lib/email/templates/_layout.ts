/**
 * Shared building blocks for every ANHEL transactional email.
 *
 * Why plain HTML-string builders (not .tsx / React Email):
 *   Email clients (Gmail web/iOS, Mail.app, Outlook) only reliably
 *   render <table>-based layouts with inline styles. Building that as
 *   JSX needs a server renderer; plain template strings are simpler,
 *   dependency-free and produce exactly the markup we control.
 *
 * Branding (per Stage 4 launch plan — intentionally darker/simpler than
 * the full site palette so it survives every mail client):
 *   bg     #0A0A0A   text   #F5F5F3   accent #FF6B35
 *   panel  #141414   hairline rgba(255,255,255,0.08)
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
  bg: '#0A0A0A',
  panel: '#141414',
  text: '#F5F5F3',
  muted: '#9A9A98',
  accent: '#FF6B35',
  hairline: 'rgba(255,255,255,0.08)',
} as const;

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

/** Render a "Поле → Значение" table for one section. */
export function renderSection(section: EmailSection): string {
  const rows = section.rows
    .map(
      (row) => `
        <tr>
          <td style="padding:8px 16px 8px 0;vertical-align:top;width:42%;font-size:13px;line-height:1.45;color:${COLORS.muted};">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding:8px 0;vertical-align:top;font-size:14px;line-height:1.5;color:${COLORS.text};">
            ${escapeHtml(row.value) || '&mdash;'}
          </td>
        </tr>`,
    )
    .join('');

  const title = section.title
    ? `<p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.accent};">
         ${escapeHtml(section.title)}
       </p>`
    : '';

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-collapse:collapse;">
      <tr><td style="padding:0;">${title}</td></tr>
      <tr>
        <td style="padding:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px solid ${COLORS.hairline};">
            ${rows}
          </table>
        </td>
      </tr>
    </table>`;
}

/** Contact card — the person who submitted the form. */
export function renderCustomerBlock(customer: EmailCustomer): string {
  const rows: EmailField[] = [];
  if (customer.company) rows.push({ label: 'Компания', value: customer.company });
  rows.push({ label: 'Контактное лицо', value: customer.name });
  if (customer.position) rows.push({ label: 'Должность', value: customer.position });
  if (customer.phone) rows.push({ label: 'Телефон', value: customer.phone });
  if (customer.email) rows.push({ label: 'E-mail', value: customer.email });

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-collapse:collapse;background:${COLORS.panel};border:1px solid ${COLORS.hairline};">
      <tr>
        <td style="padding:18px 20px;">
          ${renderSection({ title: 'Контакт', rows }).trim()}
        </td>
      </tr>
    </table>`;
}

/**
 * Wrap a body in the full ANHEL email shell — header (text logo + locale
 * tag), heading, Moscow timestamp, body, footer.
 */
export function renderEmailShell(args: {
  heading: string;
  locale: EmailLocale;
  bodyHtml: string;
  /** Optional one-line intro under the heading. */
  intro?: string;
}): string {
  const { heading, locale, bodyHtml, intro } = args;
  const timestamp = formatMoscowTimestamp();

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;border-collapse:collapse;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:22px;font-weight:600;letter-spacing:0.04em;color:${COLORS.text};">
                    ANHEL<span style="color:${COLORS.accent};font-size:13px;vertical-align:super;">&reg;</span>
                  </td>
                  <td align="right" style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.muted};">
                    Язык:&nbsp;<span style="color:${COLORS.text};">${LOCALE_LABEL[locale]}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accent rule -->
          <tr><td style="padding:0;"><div style="height:2px;background:${COLORS.accent};font-size:0;line-height:0;">&nbsp;</div></td></tr>

          <!-- Heading + timestamp -->
          <tr>
            <td style="padding:24px 0 4px;">
              <h1 style="margin:0;font-size:21px;line-height:1.3;font-weight:600;color:${COLORS.text};">
                ${escapeHtml(heading)}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 ${intro ? '8' : '24'}px;font-size:12px;letter-spacing:0.06em;color:${COLORS.muted};">
              ${escapeHtml(timestamp)}
            </td>
          </tr>
          ${
            intro
              ? `<tr><td style="padding:0 0 24px;font-size:14px;line-height:1.55;color:${COLORS.muted};">${escapeHtml(intro)}</td></tr>`
              : ''
          }

          <!-- Body -->
          <tr><td style="padding:0;">${bodyHtml}</td></tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;border-top:1px solid ${COLORS.hairline};">
              <p style="margin:0;font-size:12px;line-height:1.6;color:${COLORS.muted};">
                ANHEL<span style="color:${COLORS.accent};">&reg;</span>
                &nbsp;&middot;&nbsp; ООО «ПРОФИТ»
                &nbsp;&middot;&nbsp; <a href="https://anhelspb.com" style="color:${COLORS.muted};text-decoration:underline;">anhelspb.com</a>
                &nbsp;&middot;&nbsp; <a href="mailto:info@anhelspb.com" style="color:${COLORS.muted};text-decoration:underline;">info@anhelspb.com</a>
              </p>
              <p style="margin:8px 0 0;font-size:11px;line-height:1.6;color:${COLORS.muted};">
                Письмо сформировано автоматически с сайта anhelspb.com. Чтобы ответить клиенту — просто нажмите «Ответить».
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
