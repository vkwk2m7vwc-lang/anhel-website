/**
 * Zod-схема для опросника насосных установок.
 *
 * Используется и на клиенте (RHF resolver), и на сервере (валидация payload в /api/questionnaire).
 *
 * Required-поля — только 6 контактных + согласие на ОПД на финальном шаге.
 * Все технические поля опциональные (как в PDF), но если заполнены —
 * проходят базовые проверки (числа, валидный email, и т.п.).
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
const optionalBool = z.boolean().optional();

export const pumpsQuizSchema = z.object({
  // Step 01 — Контакты и объект (только 6 контактных = required)
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

  source_channel: z.string().optional(),
  source_other: optionalText,
  object_name: optionalText,

  // Step 02 — Система
  sys_water_supply: optionalBool,
  sys_firefighting: optionalBool,
  ff_vpv: optionalBool,
  ff_apt: optionalBool,
  sys_heating: optionalBool,
  heat_closed: optionalBool,
  heat_open: optionalBool,
  sys_cooling: optionalBool,
  sys_combined: optionalBool,
  sys_other: optionalBool,
  sys_other_text: optionalText,

  // Step 03 — Расход и напор
  flow_total: optionalNumberLike,
  flow_jockey: optionalNumberLike,
  flow_combined_water: optionalNumberLike,
  flow_combined_ff: optionalNumberLike,
  head_guaranteed: optionalNumberLike,
  intake_pond: optionalBool,
  intake_under: optionalBool,
  intake_semi: optionalBool,
  intake_above: optionalBool,
  head_hmin: optionalNumberLike,
  head_hmax: optionalNumberLike,
  head_required: optionalNumberLike,
  head_jockey: optionalNumberLike,
  head_combined_water: optionalNumberLike,
  head_combined_ff: optionalNumberLike,
  pressure_max: optionalNumberLike,

  // Step 04 — Оборудование
  liquid_type: optionalText,
  liquid_temp: optionalNumberLike,
  pumps_main: optionalNumberLike,
  pumps_reserve: optionalNumberLike,

  ctrl_freq_with_ctrl: optionalBool,
  ctrl_freq_per_pump: optionalBool,
  ctrl_freq_no_ctrl: optionalBool,
  ctrl_relay_with_ctrl: optionalBool,
  ctrl_relay_soft_start: optionalBool,

  valve_drive: z.string().optional(),
  valve_count: optionalNumberLike,
  valve_brand: optionalText,

  opt_power_no_avr: optionalBool,
  opt_power_avr: optionalBool,
  opt_outdoor: optionalBool,
  opt_limit_sw: optionalBool,
  opt_diff_diam: optionalBool,
  opt_diff_diam_text: optionalText,

  proto_profibus: optionalBool,
  proto_modbus: optionalBool,
  proto_ethernet: optionalBool,
  proto_gsm: optionalBool,
  proto_other: optionalBool,
  proto_other_text: optionalText,

  module_container: optionalBool,
  module_tank: optionalBool,
  module_fiberglass: optionalBool,
  module_steel: optionalBool,
  module_vertical: optionalBool,
  module_horizontal: optionalBool,

  additional_info: optionalText,

  // Step 05 — Согласие
  consent_pdn: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие на обработку персональных данных' }),
  }),
});

export type PumpsQuizValues = z.infer<typeof pumpsQuizSchema>;

/** Дефолты — все checkboxes false, тексты '', radio undefined. */
export const pumpsDefaults: Record<string, unknown> = {
  contact_organization: '',
  contact_fullname: '',
  contact_position: '',
  contact_city: '',
  contact_email: '',
  contact_phone: '',
  source_channel: undefined,
  source_other: '',
  object_name: '',

  sys_water_supply: false, sys_firefighting: false, ff_vpv: false, ff_apt: false,
  sys_heating: false, heat_closed: false, heat_open: false,
  sys_cooling: false, sys_combined: false, sys_other: false, sys_other_text: '',

  flow_total: '', flow_jockey: '', flow_combined_water: '', flow_combined_ff: '',
  head_guaranteed: '',
  intake_pond: false, intake_under: false, intake_semi: false, intake_above: false,
  head_hmin: '', head_hmax: '', head_required: '', head_jockey: '',
  head_combined_water: '', head_combined_ff: '', pressure_max: '',

  liquid_type: '', liquid_temp: '', pumps_main: '', pumps_reserve: '',
  ctrl_freq_with_ctrl: false, ctrl_freq_per_pump: false, ctrl_freq_no_ctrl: false,
  ctrl_relay_with_ctrl: false, ctrl_relay_soft_start: false,
  valve_drive: undefined, valve_count: '', valve_brand: '',
  opt_power_no_avr: false, opt_power_avr: false, opt_outdoor: false,
  opt_limit_sw: false, opt_diff_diam: false, opt_diff_diam_text: '',
  proto_profibus: false, proto_modbus: false, proto_ethernet: false, proto_gsm: false,
  proto_other: false, proto_other_text: '',
  module_container: false, module_tank: false, module_fiberglass: false,
  module_steel: false, module_vertical: false, module_horizontal: false,
  additional_info: '',

  consent_pdn: false,
};

/** Поля, валидируемые на конкретном шаге (для блокировки «Далее»). */
export const stepFieldNames: Record<number, string[]> = {
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
