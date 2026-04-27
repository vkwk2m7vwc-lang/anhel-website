/**
 * Centralised ANHEL® contact endpoints.
 *
 * One place to change the phone number, email address, and
 * Санкт-Петербург office line when they move. Imported by the
 * Header / Footer / quiz fallback so a single edit updates every
 * user-facing mention.
 */

export const CONTACTS = {
  phone: "+7 (812) 416-45-00",
  /** Dial format — rfc3966 tel: URI. */
  phoneTel: "+78124164500",
  email: "info@anhelspb.com",
  officeAddress: "Политехническая ул., д. 6, стр. 1, пом. 1-Н, Санкт-Петербург",
} as const;
