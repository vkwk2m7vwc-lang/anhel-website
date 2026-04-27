/**
 * Опросный лист — Автоматические Установки Поддержания Давления (АУПД) ANHEL®.
 * Источник правды: `_scripts/build_aupd_questionnaire.py` (209 строк).
 * AcroForm 1-в-1 с `_tmp_anhel_готовые/aupd-questionnaire-anhel.pdf` (30 полей).
 */
import type { QuizStep, FieldOption } from './pumps-fields';

const SOURCE_CHANNEL_OPTIONS: FieldOption[] = [
  { value: 'ad', label: 'Реклама Яндекс / Google' },
  { value: 'search', label: 'Поиск Яндекс / Google' },
  { value: 'social', label: 'Социальные сети' },
  { value: 'recommend', label: 'Рекомендации коллег, друзей' },
  { value: 'known', label: 'Уже знали о нас, работали с нами' },
  { value: 'other', label: 'Другое' },
];

const FILL_SYSTEM_OPTIONS: FieldOption[] = [
  { value: 'no', label: 'нет' },
  { value: 'yes', label: 'да' },
  { value: 'yes_5h', label: 'да, за 5 часов по требованию МОЭК' },
];

export const aupdSteps: QuizStep[] = [
  // ============================================================
  // STEP 01 — КОНТАКТЫ И ОБЪЕКТ
  // ============================================================
  {
    id: 'contacts',
    number: '01',
    title: 'Контакты и объект',
    description: 'Кто вы и где будет работать установка',
    sections: [
      {
        id: 'contact-data',
        title: 'Контактные данные',
        fields: [
          { name: 'contact_organization', label: 'Организация', type: 'text', required: true, width: 'full' },
          { name: 'contact_fullname', label: 'Фамилия, имя, отчество', type: 'text', required: true, width: 'full' },
          { name: 'contact_position', label: 'Должность', type: 'text', required: true, width: 'half' },
          { name: 'contact_city', label: 'Город', type: 'text', required: true, width: 'half' },
          { name: 'contact_email', label: 'Email', type: 'email', required: true, width: 'half' },
          { name: 'contact_phone', label: 'Контактный телефон', type: 'tel', required: true, width: 'half' },
        ],
      },
      {
        id: 'source',
        title: 'Как вы о нас узнали?',
        fields: [
          {
            name: 'source_channel',
            label: 'Как вы о нас узнали?',
            type: 'radio',
            options: SOURCE_CHANNEL_OPTIONS,
          },
          {
            name: 'source_other',
            label: 'Уточните',
            type: 'text',
            showIf: { field: 'source_channel', value: 'other' },
            width: 'full',
          },
        ],
      },
      {
        id: 'object',
        title: 'Основные данные',
        fields: [
          {
            name: 'object_name',
            label: 'Название и расположение объекта',
            type: 'textarea',
            multiline: true,
            width: 'full',
          },
        ],
      },
    ],
  },
  // ============================================================
  // STEP 02 — ПАРАМЕТРЫ СИСТЕМЫ
  // ============================================================
  {
    id: 'system-params',
    number: '02',
    title: 'Параметры системы',
    description: 'Мощность, объём, давление',
    sections: [
      {
        id: 'thermal-power',
        title: 'Тепловая мощность системы',
        fields: [
          { name: 'thermal_power_gcal', label: 'Тепловая мощность системы', type: 'number', unit: 'Гкал/ч', width: 'half' },
          { name: 'thermal_power_kw', label: 'Тепловая мощность системы', type: 'number', unit: 'кВт', width: 'half' },
        ],
      },
      {
        id: 'volume-pressure',
        title: 'Объём и давление',
        fields: [
          { name: 'system_volume', label: 'Объём системы (расчётный)', type: 'number', unit: 'л', width: 'half' },
          { name: 'static_pressure', label: 'Статическое давление в системе', type: 'number', unit: 'бар', width: 'half' },
          { name: 'max_pressure', label: 'Максимальное рабочее давление', type: 'number', unit: 'м.вод.ст.', width: 'half' },
          { name: 'valve_pressure', label: 'Давление срабатывания предохранительного клапана', type: 'number', unit: 'м.вод.ст.', width: 'half' },
          { name: 'return_pressure', label: 'Давление в обратной линии теплосети', type: 'number', unit: 'м.вод.ст.', width: 'full' },
        ],
      },
    ],
  },
  // ============================================================
  // STEP 03 — ТЕПЛОНОСИТЕЛЬ И РЕЖИМ
  // ============================================================
  {
    id: 'medium-mode',
    number: '03',
    title: 'Теплоноситель и режим',
    description: 'Тип среды, температура, насосы',
    sections: [
      {
        id: 'medium',
        title: 'Тип теплоносителя',
        fields: [
          { name: 'heat_water', label: 'вода', type: 'checkbox', width: 'half' },
          { name: 'heat_glycol', label: 'раствор гликоля', type: 'checkbox', width: 'half' },
          {
            name: 'glycol_percent',
            label: 'Концентрация гликоля',
            type: 'text',
            unit: '%',
            showIf: { field: 'heat_glycol', op: 'truthy' },
            width: 'half',
          },
        ],
      },
      {
        id: 'temperature',
        title: 'Температурный график системы',
        hint: 'прямая T1 / обратная T2',
        fields: [
          { name: 'temp_t1', label: 'T1 (прямая)', type: 'number', unit: '°C', width: 'half' },
          { name: 'temp_t2', label: 'T2 (обратная)', type: 'number', unit: '°C', width: 'half' },
        ],
      },
      {
        id: 'pumps',
        title: 'Насосы и заполнение',
        fields: [
          { name: 'pump_count', label: 'Количество насосов', type: 'number', width: 'half' },
          {
            name: 'fill_system',
            label: 'Система заполнения',
            type: 'radio',
            options: FILL_SYSTEM_OPTIONS,
            width: 'full',
          },
        ],
      },
    ],
  },
  // ============================================================
  // STEP 04 — ТИП СИСТЕМЫ И ГАБАРИТЫ
  // ============================================================
  {
    id: 'system-type',
    number: '04',
    title: 'Тип системы и габариты',
    description: 'Назначение и условия монтажа',
    sections: [
      {
        id: 'sys',
        title: 'Тип системы',
        fields: [
          { name: 'sys_heating', label: 'отопление', type: 'checkbox', width: 'half' },
          { name: 'sys_ventilation', label: 'вентиляция', type: 'checkbox', width: 'half' },
          { name: 'sys_other', label: 'другая', type: 'checkbox', width: 'full' },
          {
            name: 'sys_other_text',
            label: 'Уточните',
            type: 'text',
            showIf: { field: 'sys_other', op: 'truthy' },
            width: 'full',
          },
        ],
      },
      {
        id: 'limits',
        title: 'Ограничение по габаритам проёма',
        hint: 'Высота × ширина для прохода установки',
        fields: [
          { name: 'limit_height', label: 'Высота', type: 'number', unit: 'м', width: 'half' },
          { name: 'limit_width', label: 'Ширина', type: 'number', unit: 'м', width: 'half' },
        ],
      },
      {
        id: 'additional',
        title: 'Дополнительные сведения',
        fields: [
          {
            name: 'additional_info',
            label: 'Дополнительные сведения',
            type: 'textarea',
            multiline: true,
            width: 'full',
          },
        ],
      },
    ],
  },
  // ============================================================
  // STEP 05 — СВОДКА
  // ============================================================
  {
    id: 'review',
    number: '05',
    title: 'Сводка и отправка',
    description: 'Проверьте данные и отправьте заявку',
    sections: [],
  },
];

export const allAupdFieldNames: readonly string[] = aupdSteps
  .flatMap((step) => step.sections)
  .flatMap((section) => section.fields)
  .map((field) => field.name);
