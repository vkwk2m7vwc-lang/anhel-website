/**
 * Wire contract between the form components (client) and the API routes
 * (server). Pure types + tiny pure helpers — no runtime dependencies,
 * so client components can `import type` from here freely.
 *
 * Each form builds a `FormSubmissionPayload` from its RUSSIAN source
 * config (so the manager always gets Russian field labels) plus the
 * visitor's current UI locale, and POSTs it as JSON. The route validates
 * it, renders an HTML template and sends it through Resend.
 */

export type EmailLocale = 'ru' | 'en' | 'tr';

/** One "Поле → Значение" row. */
export type EmailField = { label: string; value: string };

/** A titled group of rows (a quiz step, a form section). */
export type EmailSection = { title?: string; rows: EmailField[] };

/** Who submitted the form — drives the contact card and the Reply-To. */
export type EmailCustomer = {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
};

/** The base JSON body every form POSTs. */
export type FormSubmissionPayload = {
  locale: EmailLocale;
  customer: EmailCustomer;
  sections: EmailSection[];
};

const LOCALES: readonly EmailLocale[] = ['ru', 'en', 'tr'];

/** Narrow an unknown value to a supported locale, defaulting to 'ru'. */
export function coerceLocale(value: unknown): EmailLocale {
  return LOCALES.includes(value as EmailLocale)
    ? (value as EmailLocale)
    : 'ru';
}

/** Loose email shape check — server-side guard, not a strict validator. */
export function looksLikeEmail(value: unknown): value is string {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Validate the shared shape of an incoming submission. Returns a
 * normalized payload or an error string. Routes layer their own
 * extra checks (zod schema, PDF mapping) on top.
 */
export function parseSubmissionPayload(
  body: unknown,
): { ok: true; payload: FormSubmissionPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Тело запроса не является объектом' };
  }
  const b = body as Record<string, unknown>;

  const customer = b.customer as Record<string, unknown> | undefined;
  if (!customer || typeof customer !== 'object') {
    return { ok: false, error: 'Отсутствует блок customer' };
  }
  const name = typeof customer.name === 'string' ? customer.name.trim() : '';
  if (!name) {
    return { ok: false, error: 'Не указано контактное лицо' };
  }

  const sections = Array.isArray(b.sections) ? (b.sections as EmailSection[]) : [];

  const payload: FormSubmissionPayload = {
    locale: coerceLocale(b.locale),
    customer: {
      name,
      email:
        typeof customer.email === 'string' && customer.email.trim()
          ? customer.email.trim()
          : undefined,
      phone:
        typeof customer.phone === 'string' && customer.phone.trim()
          ? customer.phone.trim()
          : undefined,
      company:
        typeof customer.company === 'string' && customer.company.trim()
          ? customer.company.trim()
          : undefined,
      position:
        typeof customer.position === 'string' && customer.position.trim()
          ? customer.position.trim()
          : undefined,
    },
    sections: sections
      .filter((s) => s && typeof s === 'object' && Array.isArray(s.rows))
      .map((s) => ({
        title: typeof s.title === 'string' ? s.title : undefined,
        rows: s.rows
          .filter(
            (r): r is EmailField =>
              !!r &&
              typeof r === 'object' &&
              typeof (r as EmailField).label === 'string',
          )
          .map((r) => ({
            label: r.label,
            value: typeof r.value === 'string' ? r.value : String(r.value ?? ''),
          })),
      })),
  };

  return { ok: true, payload };
}
