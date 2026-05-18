/**
 * Resend client wrapper — single point of email delivery for the site.
 *
 * Every form route (4 quizzes via /api/questionnaire, control-systems
 * quiz, service request, contact form) renders an HTML template and
 * hands it to `sendEmail()`. Keeping the Resend SDK isolated here means
 * the routes never touch the client directly and error handling /
 * from-address policy live in one place.
 *
 * From-address policy (v1.22 — Outlook-friendly)
 *   Domain `anhelspb.com` is NOT verified in Resend (verify hangs in EU
 *   region), so we send via Resend's universal sender
 *   `onboarding@resend.dev` and put the **customer's name** in the
 *   From display: `"Иван Петров (заявка с сайта)" <onboarding@resend.dev>`.
 *   This way Outlook shows the customer right in the inbox list and
 *   "Reply" — backed by replyTo = customer email — goes straight to
 *   the client. When/if Resend domain verification finally succeeds,
 *   flip the address half to `noreply@anhelspb.com` (keep the dynamic
 *   display name).
 *
 * Env: RESEND_API_KEY (server-only, never NEXT_PUBLIC_*).
 */
import { Resend } from 'resend';

/**
 * Universal Resend sender — works without domain verification. Combined
 * with the customer's name as the display, this is what shows up in
 * Outlook ("От: Иван Петров (заявка с сайта)").
 */
const FROM_ADDRESS_EMAIL = 'onboarding@resend.dev';

/** Strip characters that would break an RFC 5322 display-name. */
function escapeDisplayName(name: string): string {
  return name
    .replace(/[\r\n"\\<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Build the From header. If `customerName` is provided, put it in the
 * display so the manager sees the client (not "ANHEL") in their inbox.
 * Falls back to a generic "ANHEL" sender when no name is known.
 */
function buildFromAddress(customerName?: string): string {
  const display = customerName ? escapeDisplayName(customerName) : '';
  if (display) {
    return `"${display} (заявка с сайта)" <${FROM_ADDRESS_EMAIL}>`;
  }
  return `ANHEL <${FROM_ADDRESS_EMAIL}>`;
}

/** A file attached to the email — e.g. the filled questionnaire PDF. */
export type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type SendEmailArgs = {
  /** Recipient inbox — always process.env.QUIZ_RECIPIENT_EMAIL in this app. */
  to: string;
  subject: string;
  /** Full HTML body (table-based, inline styles — see lib/email/templates). */
  html: string;
  /**
   * Customer's email from the form — lets the manager hit "Reply" and
   * answer the client directly. Optional: contact form without an email
   * still sends, just without a reply target.
   */
  replyTo?: string;
  /**
   * Customer's name from the form — drives the From display name so the
   * manager sees the client in Outlook's inbox list. Optional: falls
   * back to a generic "ANHEL" sender when no name is available.
   */
  customerName?: string;
  /**
   * Blind-copy address — e.g. a monitoring inbox that should receive a
   * silent copy of every submission. Wired up to `QUIZ_BCC_EMAIL`.
   */
  bcc?: string;
  /** Optional attachments (the v3 questionnaire PDF). */
  attachments?: EmailAttachment[];
};

export type SendEmailResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/**
 * Send one transactional email through Resend.
 *
 * Never throws — every failure path returns `{ ok: false }` and is
 * logged to `console.error` so it surfaces in Vercel runtime logs. The
 * caller decides the HTTP response.
 */
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
  customerName,
  bcc,
  attachments,
}: SendEmailArgs): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[sendEmail] RESEND_API_KEY is not set — cannot send email.');
    return { ok: false, error: 'RESEND_API_KEY is not configured' };
  }
  if (!to) {
    console.error('[sendEmail] No recipient — QUIZ_RECIPIENT_EMAIL is not set.');
    return { ok: false, error: 'Recipient inbox is not configured' };
  }

  const resend = new Resend(apiKey);
  const from = buildFromAddress(customerName);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
      ...(bcc ? { bcc } : {}),
      ...(attachments && attachments.length > 0 ? { attachments } : {}),
    });

    if (error) {
      console.error('[sendEmail] Resend returned an error:', error);
      return { ok: false, error: error.message || 'Resend error' };
    }
    if (!data?.id) {
      console.error('[sendEmail] Resend returned no email id:', data);
      return { ok: false, error: 'Resend returned no email id' };
    }
    return { ok: true, id: data.id };
  } catch (err) {
    console.error('[sendEmail] Unexpected error while sending:', err);
    const message = err instanceof Error ? err.message : 'Unknown send error';
    return { ok: false, error: message };
  }
}
