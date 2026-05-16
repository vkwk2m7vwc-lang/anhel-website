/**
 * Product accent colours for transactional emails.
 *
 * Each form's email is tinted with the product's accent so the manager
 * can tell at a glance which line the lead is about — the same colour
 * coding the site uses (`--accent-*` in globals.css):
 *   water      синий   — ХВС / водоснабжение / насосные станции
 *   fire       красный — пожаротушение
 *   treatment  сталь   — водоподготовка
 *   heat       оранжевый — БИТП / тепловые пункты
 *   neutral    графит  — формы вне продуктовой линейки (сервис, контакты,
 *                        общий опросник шкафов управления)
 *
 * Hex values are the LIGHT-theme variants from globals.css `:root` — the
 * emails are light-themed, so these keep contrast against a white card.
 */

export type EmailAccent = 'water' | 'fire' | 'treatment' | 'heat' | 'neutral';

export const EMAIL_ACCENTS: Record<EmailAccent, string> = {
  water: '#1e6fd9',
  fire: '#d72638',
  treatment: '#5c6670',
  heat: '#c7711e',
  neutral: '#2a323a',
};

const ACCENT_KEYS: readonly EmailAccent[] = [
  'water',
  'fire',
  'treatment',
  'heat',
  'neutral',
];

/** Narrow an unknown value to a supported accent key, defaulting to 'neutral'. */
export function coerceAccent(value: unknown): EmailAccent {
  return ACCENT_KEYS.includes(value as EmailAccent)
    ? (value as EmailAccent)
    : 'neutral';
}

/** Resolve an accent key to its hex colour. */
export function accentHex(accent: EmailAccent): string {
  return EMAIL_ACCENTS[accent];
}
