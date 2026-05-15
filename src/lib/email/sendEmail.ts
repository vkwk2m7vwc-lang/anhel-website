/**
 * Resend client wrapper — single point of email delivery for the site.
 *
 * Every form route (4 quizzes via /api/questionnaire, control-systems
 * quiz, service request, contact form) renders an HTML template and
 * hands it to `sendEmail()`. Keeping the Resend SDK isolated here means
 * the routes never touch the client directly and error handling /
 * from-address policy live in one place.
 *
 * From-address policy
 *   Test phase: `onboarding@resend.dev` — Resend's default verified
 *   sender, works without a verified domain. Resend only delivers from
 *   this address to the account owner's own inbox, which is exactly the
 *   test setup (QUIZ_RECIPIENT_EMAIL = personal inbox).
 *   Production: once `anhelspb.com` is verified in Resend, flip
 *   FROM_ADDRESS to `ANHEL <noreply@anhelspb.com>` — no other change.
 *
 * Env: RESEND_API_KEY (server-only, never NEXT_PUBLIC_*).
 */
import { Resend } from 'resend';

/** Friendly sender. Swap the address (not the name) when the domain is verified. */
const FROM_ADDRESS = 'ANHEL <onboarding@resend.dev>';

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

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
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
