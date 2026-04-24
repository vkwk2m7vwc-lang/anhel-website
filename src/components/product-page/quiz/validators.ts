/**
 * Quiz field validators.
 *
 * Plain functions, no React, no DOM — imported by both the fields
 * (for error display) and the section (for canAdvance gating). Keeps
 * the validation rules in one place so a future regex tweak ripples
 * automatically.
 */

/**
 * Email — loose but safe shape check.
 *
 * Pattern: non-space, @, non-space, ., non-space 2+ chars. Mirrors
 * the HTML5 email validation shape without trying to be RFC-5322
 * complete (which hurts more than it helps for Russian B2B).
 */
export function isValidEmail(value: string | undefined): boolean {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/**
 * Phone — counts digits after stripping formatting characters. We
 * require either 10 digits (subscriber number alone) or 11 (with a
 * country-code prefix like 7/8). The mask feeds us 10 after its
 * own normalisation, so 10 is the common case; 11 is a fallback
 * for pasted raw input we haven't re-masked yet.
 */
export function isValidPhone(value: string | undefined): boolean {
  if (!value) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

/**
 * Russian phone mask: +7 (XXX) XXX-XX-XX.
 *
 * Accepts any input shape — raw digits, pasted "+7", "8XXX", mixed
 * formatting — and produces the canonical display format. Leading 7
 * or 8 is treated as the country prefix and dropped; the last 10
 * digits become the subscriber number.
 *
 * Edge cases:
 *   - Empty input or all-non-digit input: returns "" so the user
 *     can clear the field without the mask forcing "+7" back in
 *   - Short input: returns partial format as user types
 *   - Overflow (user pastes 15 digits): truncated to 10 subscriber
 */
export function formatPhoneMask(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  // Normalise country prefix — accept 7 or 8, drop either
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }
  // Cap to subscriber length
  digits = digits.slice(0, 10);

  let out = "+7";
  if (digits.length > 0) out += ` (${digits.slice(0, 3)}`;
  if (digits.length >= 3) out += ")";
  if (digits.length > 3) out += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) out += `-${digits.slice(8, 10)}`;
  return out;
}

/** Human-readable error messages — surfaced under the field. */
export const ERRORS = {
  required: "Обязательное поле",
  email: "Проверьте формат email",
  phone: "Укажите телефон: +7 (___) ___-__-__",
} as const;
