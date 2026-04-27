/** Zod-схема ИТП. Required: 6 контактов + согласие. */
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
const optionalRadio = z.string().optional();

/** Generic shape для одной системы (heating | vent). */
function systemShape(prefix: string) {
  return {
    [`${prefix}_load`]: optionalNumberLike,
    [`${prefix}_scheme_dependent`]: optionalBool,
    [`${prefix}_scheme_independent`]: optionalBool,
    [`${prefix}_scheme_direct`]: optionalBool,
    [`${prefix}_he_brazed`]: optionalBool,
    [`${prefix}_he_demountable`]: optionalBool,
    [`${prefix}_he_shell`]: optionalBool,
    [`${prefix}_t1`]: optionalNumberLike,
    [`${prefix}_t2`]: optionalNumberLike,
    [`${prefix}_pressure_loss`]: optionalNumberLike,
    [`${prefix}_max_pressure`]: optionalNumberLike,
    [`${prefix}_volume`]: optionalNumberLike,
    [`${prefix}_he_reserve`]: optionalRadio,
    [`${prefix}_he_reserve_pct`]: optionalNumberLike,
    [`${prefix}_pump_100`]: optionalBool,
    [`${prefix}_pump_storage`]: optionalBool,
    [`${prefix}_pump_double`]: optionalBool,
    [`${prefix}_freq_reg`]: optionalRadio,
  };
}

export const itpQuizSchema = z.object({
  // Контакты
  contact_organization: z.string().trim().min(1, 'Укажите организацию'),
  contact_fullname: z.string().trim().min(1, 'Укажите ФИО'),
  contact_position: z.string().trim().min(1, 'Укажите должность'),
  contact_city: z.string().trim().min(1, 'Укажите город'),
  contact_email: z.string().trim().min(1, 'Укажите email').email('Неверный формат email'),
  contact_phone: z.string().trim().min(1, 'Укажите телефон').regex(/^[+\d\s()\-.]{6,}$/, 'Проверьте телефон'),

  object_name: optionalText,
  source_channel: optionalRadio,
  source_other: optionalText,

  // Основные
  main_t1: optionalNumberLike, main_t2: optionalNumberLike,
  main_p1: optionalNumberLike, main_p2: optionalNumberLike,
  building_height: optionalNumberLike, heat_carrier: optionalText,

  // Отопление + Вентиляция (типовые блоки)
  ...systemShape('heating'),
  ...systemShape('vent'),

  // ГВС
  dhw_load: optionalNumberLike,
  dhw_cold_temp: optionalNumberLike, dhw_hot_temp: optionalNumberLike,
  dhw_cold_pressure: optionalNumberLike, dhw_hot_pressure: optionalNumberLike,
  dhw_circulation: optionalRadio,
  dhw_circ_flow: optionalNumberLike, dhw_circ_resistance: optionalNumberLike,
  dhw_scheme_1: optionalBool, dhw_scheme_2: optionalBool, dhw_scheme_mono: optionalBool,
  dhw_he_brazed: optionalBool, dhw_he_demountable: optionalBool, dhw_he_shell: optionalBool,
  dhw_he_reserve: optionalRadio, dhw_he_reserve_pct: optionalNumberLike,
  dhw_pump_100: optionalBool, dhw_pump_storage: optionalBool, dhw_pump_double: optionalBool,
  dhw_freq_reg: optionalRadio,

  // Дополнительное оборудование (12 yes/no)
  extra_weather_dep: optionalRadio,
  extra_auto_makeup: optionalRadio,
  extra_auto_pressure: optionalRadio,
  extra_heat_meter: optionalRadio,
  extra_pressure_reg: optionalRadio,
  extra_expansion_tank: optionalRadio,
  extra_flow_meter: optionalRadio,
  extra_pump_failure: optionalRadio,
  extra_dispatch: optionalRadio,
  extra_makeup_valve: optionalRadio,
  extra_makeup_pump: optionalRadio,
  extra_insulation: optionalRadio,

  // Арматура
  arm_welded: optionalBool, arm_flange: optionalBool, arm_thread: optionalBool,

  // Размеры и проёмы
  room_size: optionalText, doorway_size: optionalText,

  // Передача данных
  proto_rs232: optionalBool, proto_ethernet: optionalBool,
  proto_gsm: optionalBool, proto_modem: optionalBool,

  // Питание
  power_from_bitp: optionalRadio, power_from_external: optionalRadio,
  voltage_230: optionalBool, voltage_380: optionalBool,

  additional_info: optionalText,

  consent_pdn: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие на обработку персональных данных' }),
  }),
});

/** Дефолты для всех 97 + consent. */
function systemDefaults(prefix: string): Record<string, unknown> {
  return {
    [`${prefix}_load`]: '',
    [`${prefix}_scheme_dependent`]: false,
    [`${prefix}_scheme_independent`]: false,
    [`${prefix}_scheme_direct`]: false,
    [`${prefix}_he_brazed`]: false,
    [`${prefix}_he_demountable`]: false,
    [`${prefix}_he_shell`]: false,
    [`${prefix}_t1`]: '', [`${prefix}_t2`]: '',
    [`${prefix}_pressure_loss`]: '', [`${prefix}_max_pressure`]: '',
    [`${prefix}_volume`]: '',
    [`${prefix}_he_reserve`]: undefined, [`${prefix}_he_reserve_pct`]: '',
    [`${prefix}_pump_100`]: false, [`${prefix}_pump_storage`]: false, [`${prefix}_pump_double`]: false,
    [`${prefix}_freq_reg`]: undefined,
  };
}

export const itpDefaults: Record<string, unknown> = {
  contact_organization: '', contact_fullname: '', contact_position: '',
  contact_city: '', contact_email: '', contact_phone: '',
  object_name: '', source_channel: undefined, source_other: '',
  main_t1: '', main_t2: '', main_p1: '', main_p2: '',
  building_height: '', heat_carrier: '',
  ...systemDefaults('heating'),
  ...systemDefaults('vent'),
  dhw_load: '', dhw_cold_temp: '', dhw_hot_temp: '',
  dhw_cold_pressure: '', dhw_hot_pressure: '',
  dhw_circulation: undefined, dhw_circ_flow: '', dhw_circ_resistance: '',
  dhw_scheme_1: false, dhw_scheme_2: false, dhw_scheme_mono: false,
  dhw_he_brazed: false, dhw_he_demountable: false, dhw_he_shell: false,
  dhw_he_reserve: undefined, dhw_he_reserve_pct: '',
  dhw_pump_100: false, dhw_pump_storage: false, dhw_pump_double: false,
  dhw_freq_reg: undefined,
  extra_weather_dep: undefined, extra_auto_makeup: undefined, extra_auto_pressure: undefined,
  extra_heat_meter: undefined, extra_pressure_reg: undefined, extra_expansion_tank: undefined,
  extra_flow_meter: undefined, extra_pump_failure: undefined, extra_dispatch: undefined,
  extra_makeup_valve: undefined, extra_makeup_pump: undefined, extra_insulation: undefined,
  arm_welded: false, arm_flange: false, arm_thread: false,
  room_size: '', doorway_size: '',
  proto_rs232: false, proto_ethernet: false, proto_gsm: false, proto_modem: false,
  power_from_bitp: undefined, power_from_external: undefined,
  voltage_230: false, voltage_380: false,
  additional_info: '',
  consent_pdn: false,
};

export const itpStepFieldNames: Record<number, string[]> = {
  0: ['contact_organization', 'contact_fullname', 'contact_position', 'contact_city', 'contact_email', 'contact_phone'],
  1: [], 2: [], 3: [], 4: [], 5: [],
  6: ['consent_pdn'],
};
