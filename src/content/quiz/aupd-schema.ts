/**
 * Zod-схема АУПД. Required: 6 контактов + согласие.
 *
 * Two flavors exported:
 *  - `aupdQuizSchema`        — static RU, kept for server-side route.
 *  - `makeAupdQuizSchema(t)` — locale-aware factory used by QuizShell.
 */
import { z } from 'zod';
import {
  makeContactsBlock,
  makeConsentBlock,
  type ValidationT,
} from './contacts-schema';

const optionalText = z.string().trim().optional().or(z.literal('').transform(() => undefined));
const optionalNumberLike = z
  .union([z.string(), z.number()])
  .optional()
  .transform((v) => {
    if (v === undefined || v === '' || v === null) return undefined;
    const n = typeof v === 'number' ? v : Number(String(v).replace(',', '.'));
    return Number.isFinite(n) ? n : undefined;
  });
const optionalBool = z.boolean().optional();

/** Technical fields — same shape for both flavors. */
const technicalFields = {
  source_channel: z.string().optional(),
  source_other: optionalText,
  object_name: optionalText,

  thermal_power_gcal: optionalNumberLike,
  thermal_power_kw: optionalNumberLike,
  system_volume: optionalNumberLike,
  static_pressure: optionalNumberLike,
  max_pressure: optionalNumberLike,
  valve_pressure: optionalNumberLike,
  return_pressure: optionalNumberLike,

  heat_water: optionalBool,
  heat_glycol: optionalBool,
  glycol_percent: optionalText,
  temp_t1: optionalNumberLike,
  temp_t2: optionalNumberLike,
  pump_count: optionalNumberLike,
  fill_system: z.string().optional(),

  sys_heating: optionalBool,
  sys_ventilation: optionalBool,
  sys_other: optionalBool,
  sys_other_text: optionalText,

  limit_height: optionalNumberLike,
  limit_width: optionalNumberLike,
  additional_info: optionalText,
} as const;

/** RU-message static schema (server-side validation in /api/questionnaire). */
export const aupdQuizSchema = z.object({
  contact_organization: z.string().trim().min(1, 'Укажите организацию'),
  contact_fullname: z.string().trim().min(1, 'Укажите ФИО'),
  contact_position: z.string().trim().min(1, 'Укажите должность'),
  contact_city: z.string().trim().min(1, 'Укажите город'),
  contact_email: z.string().trim().min(1, 'Укажите email').email('Неверный формат email'),
  contact_phone: z.string().trim().min(1, 'Укажите телефон').regex(/^[+\d\s()\-.]{6,}$/, 'Проверьте телефон'),
  ...technicalFields,
  consent_pdn: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие на обработку персональных данных' }),
  }),
});

/** Locale-aware factory used by client-side QuizShell. */
export function makeAupdQuizSchema(t: ValidationT) {
  return z.object({
    ...makeContactsBlock(t),
    ...technicalFields,
    ...makeConsentBlock(t),
  });
}

export const aupdDefaults: Record<string, unknown> = {
  contact_organization: '', contact_fullname: '', contact_position: '',
  contact_city: '', contact_email: '', contact_phone: '',
  source_channel: undefined, source_other: '', object_name: '',
  thermal_power_gcal: '', thermal_power_kw: '', system_volume: '',
  static_pressure: '', max_pressure: '', valve_pressure: '', return_pressure: '',
  heat_water: false, heat_glycol: false, glycol_percent: '',
  temp_t1: '', temp_t2: '', pump_count: '', fill_system: undefined,
  sys_heating: false, sys_ventilation: false, sys_other: false, sys_other_text: '',
  limit_height: '', limit_width: '', additional_info: '',
  consent_pdn: false,
};

export const aupdStepFieldNames: Record<number, string[]> = {
  0: ['contact_organization', 'contact_fullname', 'contact_position', 'contact_city', 'contact_email', 'contact_phone'],
  1: [],
  2: [],
  3: [],
  4: ['consent_pdn'],
};
