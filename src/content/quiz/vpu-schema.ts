/**
 * Zod-схема ВПУ. Required: только 6 контактных + согласие на ОПД.
 * Все технические поля опциональные (как в PDF).
 */
import { z } from 'zod';

const optionalText = z.string().trim().optional().or(z.literal('').transform(() => undefined));
const optionalNumberLike = z
  .union([z.string(), z.number()])
  .optional()
  .transform((v) => {
    if (v === undefined || v === '' || v === null) return undefined;
    const n = typeof v === 'number' ? v : Number(String(v).replace(',', '.'));
    return Number.isFinite(n) ? n : undefined;
  });

export const vpuQuizSchema = z.object({
  // Контакты
  contact_organization: z.string().trim().min(1, 'Укажите организацию'),
  contact_fullname: z.string().trim().min(1, 'Укажите ФИО'),
  contact_position: z.string().trim().min(1, 'Укажите должность'),
  contact_city: z.string().trim().min(1, 'Укажите город'),
  contact_email: z.string().trim().min(1, 'Укажите email').email('Неверный формат email'),
  contact_phone: z
    .string()
    .trim()
    .min(1, 'Укажите телефон')
    .regex(/^[+\d\s()\-.]{6,}$/, 'Проверьте телефон'),

  // Источник
  water_source: optionalText,
  water_temp: optionalText, // диапазон «min, max» хранится как строка
  water_quality_req: optionalText,
  input_flow: optionalNumberLike,
  input_pressure: optionalNumberLike,
  input_pump_type: optionalText,

  // Расход и режим
  clean_flow_daily: optionalNumberLike,
  clean_flow_max_h: optionalNumberLike,
  shifts_count: optionalText,
  shift_duration: optionalText,
  shift_break: optionalText,
  operating_mode: optionalText,
  water_reserve: optionalNumberLike,
  existing_tanks: optionalNumberLike,
  output_pressure: optionalNumberLike,

  // Дренаж и документация
  drain_network: optionalText,
  drain_limits_composition: optionalText,
  drain_limits_volume: optionalText,
  design_docs_scope: optionalText,
  additional_info: optionalText,

  // Согласие
  consent_pdn: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие на обработку персональных данных' }),
  }),
});

export const vpuDefaults: Record<string, unknown> = {
  contact_organization: '', contact_fullname: '', contact_position: '',
  contact_city: '', contact_email: '', contact_phone: '',
  water_source: '', water_temp: '', water_quality_req: '',
  input_flow: '', input_pressure: '', input_pump_type: '',
  clean_flow_daily: '', clean_flow_max_h: '',
  shifts_count: '', shift_duration: '', shift_break: '',
  operating_mode: '', water_reserve: '', existing_tanks: '', output_pressure: '',
  drain_network: '', drain_limits_composition: '', drain_limits_volume: '',
  design_docs_scope: '', additional_info: '',
  consent_pdn: false,
};

export const vpuStepFieldNames: Record<number, string[]> = {
  0: [
    'contact_organization',
    'contact_fullname',
    'contact_position',
    'contact_city',
    'contact_email',
    'contact_phone',
  ],
  1: [],
  2: [],
  3: [],
  4: ['consent_pdn'],
};
