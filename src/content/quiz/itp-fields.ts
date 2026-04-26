/**
 * Опросный лист — Блочные индивидуальные тепловые пункты (БИТП / ИТП) ANHEL®.
 * Источник правды: `_scripts/build_itp_questionnaire.py` (468 строк).
 * AcroForm 1-в-1 с `_tmp_anhel_готовые/itp-questionnaire-anhel.pdf` (97 полей).
 *
 * 6-страничный PDF разложен в 7 шагов формы (по логическим блокам).
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

const YES_NO: FieldOption[] = [
  { value: 'yes', label: 'Да' },
  { value: 'no', label: 'Нет' },
];

/** Типовой набор полей для одной из систем (Отопление / Вентиляция). */
function makeSystemFields(prefix: 'heating' | 'vent', systemLabel: string) {
  return [
    {
      name: `${prefix}_load`,
      label: 'Тепловая нагрузка',
      type: 'number' as const,
      unit: 'Гкал/час',
      width: 'full' as const,
    },
    // Схема присоединения
    {
      name: `${prefix}_scheme_dependent`,
      label: 'Зависимая',
      type: 'checkbox' as const,
      hint: 'Схема присоединения',
      width: 'half' as const,
    },
    {
      name: `${prefix}_scheme_independent`,
      label: 'Независимая',
      type: 'checkbox' as const,
      hint: 'Схема присоединения',
      width: 'half' as const,
    },
    {
      name: `${prefix}_scheme_direct`,
      label: 'Непосредственная',
      type: 'checkbox' as const,
      hint: 'Схема присоединения',
      width: 'full' as const,
    },
    // Тип ТО
    {
      name: `${prefix}_he_brazed`,
      label: 'Паяный',
      type: 'checkbox' as const,
      hint: 'Тип пластинчатого теплообменника',
      width: 'half' as const,
    },
    {
      name: `${prefix}_he_demountable`,
      label: 'Разборный',
      type: 'checkbox' as const,
      hint: 'Тип пластинчатого теплообменника',
      width: 'half' as const,
    },
    {
      name: `${prefix}_he_shell`,
      label: 'Кожухотрубчатый',
      type: 'checkbox' as const,
      hint: 'Тип пластинчатого теплообменника',
      width: 'full' as const,
    },
    // Температурный график
    {
      name: `${prefix}_t1`,
      label: 'Вход T1.2',
      type: 'number' as const,
      unit: '°C',
      hint: `Температурный график системы ${systemLabel.toLowerCase()} (зимний период)`,
      width: 'half' as const,
    },
    {
      name: `${prefix}_t2`,
      label: 'Вход T2.2',
      type: 'number' as const,
      unit: '°C',
      width: 'half' as const,
    },
    // Давление
    {
      name: `${prefix}_pressure_loss`,
      label: 'Потери давления в системе',
      type: 'number' as const,
      unit: 'м.в.ст.',
      width: 'half' as const,
    },
    {
      name: `${prefix}_max_pressure`,
      label: 'Максимальное рабочее давление',
      type: 'number' as const,
      unit: 'м.в.ст.',
      width: 'half' as const,
    },
    {
      name: `${prefix}_volume`,
      label: 'Объём системы',
      type: 'number' as const,
      unit: 'м³',
      width: 'half' as const,
    },
    // Резервирование ТО
    {
      name: `${prefix}_he_reserve`,
      label: 'Резервирование теплообменника',
      type: 'radio' as const,
      options: YES_NO,
      width: 'full' as const,
    },
    {
      name: `${prefix}_he_reserve_pct`,
      label: 'Резерв ТО',
      type: 'number' as const,
      unit: '%',
      showIf: { field: `${prefix}_he_reserve`, value: 'yes' },
      width: 'half' as const,
    },
    // Резервирование насоса
    {
      name: `${prefix}_pump_100`,
      label: '100%',
      type: 'checkbox' as const,
      hint: 'Резервирование насоса',
      width: 'half' as const,
    },
    {
      name: `${prefix}_pump_storage`,
      label: 'На склад',
      type: 'checkbox' as const,
      hint: 'Резервирование насоса',
      width: 'half' as const,
    },
    {
      name: `${prefix}_pump_double`,
      label: 'Сдвоенный',
      type: 'checkbox' as const,
      hint: 'Резервирование насоса',
      width: 'full' as const,
    },
    {
      name: `${prefix}_freq_reg`,
      label: 'Частотное регулирование насосов',
      type: 'radio' as const,
      options: YES_NO,
      width: 'full' as const,
    },
  ];
}


export const itpSteps: QuizStep[] = [
  // ============================================================
  // STEP 01 — КОНТАКТЫ И ОБЪЕКТ
  // ============================================================
  {
    id: 'contacts',
    number: '01',
    title: 'Контакты и объект',
    description: 'Кто вы и где будет работать БИТП',
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
        id: 'object',
        title: 'Объект',
        fields: [
          {
            name: 'object_name',
            label: 'Наименование и расположение объекта',
            type: 'textarea',
            multiline: true,
            width: 'full',
          },
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
    ],
  },
  // ============================================================
  // STEP 02 — ОСНОВНЫЕ ДАННЫЕ (вход в БИТП)
  // ============================================================
  {
    id: 'main',
    number: '02',
    title: 'Основные данные',
    description: 'Параметры сетевой воды на входе и теплоноситель',
    sections: [
      {
        id: 'temperatures',
        title: 'Температурный график сетевой воды',
        hint: 'На входе / выходе в БИТП (зимний период)',
        fields: [
          { name: 'main_t1', label: 'T1 (вход)', type: 'number', unit: '°C', width: 'half' },
          { name: 'main_t2', label: 'T2 (выход)', type: 'number', unit: '°C', width: 'half' },
        ],
      },
      {
        id: 'pressures',
        title: 'Давление сетевой воды',
        hint: 'На входе / выходе в БИТП',
        fields: [
          { name: 'main_p1', label: 'P1 (вход)', type: 'number', unit: 'бар', width: 'half' },
          { name: 'main_p2', label: 'P2 (выход)', type: 'number', unit: 'бар', width: 'half' },
        ],
      },
      {
        id: 'general',
        title: 'Общие',
        fields: [
          { name: 'building_height', label: 'Высота здания', type: 'number', unit: 'м', width: 'half' },
          {
            name: 'heat_carrier',
            label: 'Теплоноситель',
            type: 'text',
            hint: 'Вода, гликолевый раствор (%) и т.д.',
            width: 'full',
          },
        ],
      },
    ],
  },
  // ============================================================
  // STEP 03 — ОТОПЛЕНИЕ
  // ============================================================
  {
    id: 'heating',
    number: '03',
    title: 'Отопление',
    description: 'Параметры системы отопления',
    sections: [
      {
        id: 'heating',
        title: 'Отопление',
        fields: makeSystemFields('heating', 'отопления'),
      },
    ],
  },
  // ============================================================
  // STEP 04 — ВЕНТИЛЯЦИЯ
  // ============================================================
  {
    id: 'vent',
    number: '04',
    title: 'Вентиляция',
    description: 'Параметры системы вентиляции',
    sections: [
      {
        id: 'vent',
        title: 'Вентиляция',
        fields: makeSystemFields('vent', 'вентиляции'),
      },
    ],
  },
  // ============================================================
  // STEP 05 — ГВС
  // ============================================================
  {
    id: 'dhw',
    number: '05',
    title: 'ГВС',
    description: 'Горячее водоснабжение',
    sections: [
      {
        id: 'dhw-load',
        title: 'Нагрузка и температуры',
        fields: [
          { name: 'dhw_load', label: 'Тепловая нагрузка', type: 'number', unit: 'Гкал/час', width: 'full' },
          { name: 'dhw_cold_temp', label: 'Температура холодной воды', type: 'number', unit: '°C', width: 'half' },
          { name: 'dhw_hot_temp', label: 'Температура горячей воды', type: 'number', unit: '°C', width: 'half' },
          { name: 'dhw_cold_pressure', label: 'Давление холодной воды на входе в БИТП', type: 'number', unit: 'бар', width: 'half' },
          { name: 'dhw_hot_pressure', label: 'Необходимое давление горячей воды', type: 'number', unit: 'бар', width: 'half' },
        ],
      },
      {
        id: 'dhw-circ',
        title: 'Циркуляция',
        fields: [
          {
            name: 'dhw_circulation',
            label: 'Необходимость в установке циркуляционной линии ГВС',
            type: 'radio',
            options: YES_NO,
            width: 'full',
          },
          {
            name: 'dhw_circ_flow',
            label: 'Расход воды на циркуляцию ГВС от максимального расхода',
            type: 'number',
            unit: '%',
            showIf: { field: 'dhw_circulation', value: 'yes' },
            width: 'half',
          },
          {
            name: 'dhw_circ_resistance',
            label: 'Гидравлическое сопротивление циркуляции ГВС',
            type: 'number',
            unit: 'м.в.ст.',
            showIf: { field: 'dhw_circulation', value: 'yes' },
            width: 'half',
          },
        ],
      },
      {
        id: 'dhw-scheme',
        title: 'Схема включения теплообменника ГВС',
        fields: [
          { name: 'dhw_scheme_1', label: '1-ступенчатая', type: 'checkbox', width: 'half' },
          { name: 'dhw_scheme_2', label: '2-ступенчатая', type: 'checkbox', width: 'half' },
          { name: 'dhw_scheme_mono', label: 'Моноблок', type: 'checkbox', width: 'full' },
        ],
      },
      {
        id: 'dhw-he',
        title: 'Тип пластинчатого теплообменника',
        fields: [
          { name: 'dhw_he_brazed', label: 'Паяный', type: 'checkbox', width: 'half' },
          { name: 'dhw_he_demountable', label: 'Разборный', type: 'checkbox', width: 'half' },
          { name: 'dhw_he_shell', label: 'Кожухотрубчатый', type: 'checkbox', width: 'full' },
        ],
      },
      {
        id: 'dhw-reserve',
        title: 'Резервирование',
        fields: [
          {
            name: 'dhw_he_reserve',
            label: 'Резервирование теплообменника',
            type: 'radio',
            options: YES_NO,
            width: 'full',
          },
          {
            name: 'dhw_he_reserve_pct',
            label: 'Резерв ТО',
            type: 'number',
            unit: '%',
            showIf: { field: 'dhw_he_reserve', value: 'yes' },
            width: 'half',
          },
          { name: 'dhw_pump_100', label: '100%', type: 'checkbox', hint: 'Резервирование насоса', width: 'half' },
          { name: 'dhw_pump_storage', label: 'На склад', type: 'checkbox', hint: 'Резервирование насоса', width: 'half' },
          { name: 'dhw_pump_double', label: 'Сдвоенный', type: 'checkbox', hint: 'Резервирование насоса', width: 'full' },
          {
            name: 'dhw_freq_reg',
            label: 'Частотное регулирование насосов',
            type: 'radio',
            options: YES_NO,
            width: 'full',
          },
        ],
      },
    ],
  },
  // ============================================================
  // STEP 06 — ДОПОЛНИТЕЛЬНОЕ ОБОРУДОВАНИЕ И ИНФРАСТРУКТУРА
  // ============================================================
  {
    id: 'extras',
    number: '06',
    title: 'Доп. оборудование',
    description: 'Опции, арматура, связь, питание',
    sections: [
      {
        id: 'extras-list',
        title: 'Дополнительное оборудование, функции и параметры',
        fields: [
          { name: 'extra_weather_dep', label: 'Погодозависимое регулирование', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_auto_makeup', label: 'Автоматическая линия подпитки систем отопления и вентиляции', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_auto_pressure', label: 'Автоматическая установка поддержания давления для систем отопления и вентиляции', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_heat_meter', label: 'Узел учёта тепловой энергии', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_pressure_reg', label: 'Регулятор перепада давления', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_expansion_tank', label: 'Расширительный бак', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_flow_meter', label: 'Расходомер на холодную воду', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_pump_failure', label: 'Датчик аварии насоса (реле перепада давления)', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_dispatch', label: 'Диспетчеризация', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_makeup_valve', label: 'Предусмотреть подпиточный клапан', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_makeup_pump', label: 'Предусмотреть подпиточный насос', type: 'radio', options: YES_NO, width: 'full' },
          { name: 'extra_insulation', label: 'Изоляция трубопроводов', type: 'radio', options: YES_NO, width: 'full' },
        ],
      },
      {
        id: 'arm',
        title: 'Стальная арматура на вводе',
        fields: [
          { name: 'arm_welded', label: 'Под приварку', type: 'checkbox', width: 'half' },
          { name: 'arm_flange', label: 'Фланцевая', type: 'checkbox', width: 'half' },
          { name: 'arm_thread', label: 'Резьбовая', type: 'checkbox', width: 'full' },
        ],
      },
      {
        id: 'sizes',
        title: 'Размеры',
        fields: [
          {
            name: 'room_size',
            label: 'Размеры помещения для установки БИТП (длина × ширина × высота)',
            type: 'text',
            unit: 'мм',
            width: 'full',
          },
          {
            name: 'doorway_size',
            label: 'Размер проёма (ширина × высота)',
            type: 'text',
            unit: 'мм',
            width: 'full',
          },
        ],
      },
      {
        id: 'protocol',
        title: 'Передача данных на диспетчерский пункт',
        fields: [
          { name: 'proto_rs232', label: 'RS232 (485)', type: 'checkbox', width: 'half' },
          { name: 'proto_ethernet', label: 'Ethernet', type: 'checkbox', width: 'half' },
          { name: 'proto_gsm', label: 'GSM', type: 'checkbox', width: 'half' },
          { name: 'proto_modem', label: 'Тел. модем', type: 'checkbox', width: 'half' },
        ],
      },
      {
        id: 'power',
        title: 'Питание',
        fields: [
          {
            name: 'power_from_bitp',
            label: 'Питание насосов от шкафа управления БИТП',
            type: 'radio',
            options: YES_NO,
            width: 'full',
          },
          {
            name: 'power_from_external',
            label: 'Питание насосов от стороннего шкафа',
            type: 'radio',
            options: YES_NO,
            width: 'full',
          },
          { name: 'voltage_230', label: '1 × 230 V', type: 'checkbox', hint: 'Напряжение питания', width: 'half' },
          { name: 'voltage_380', label: '3 × 380 V', type: 'checkbox', hint: 'Напряжение питания', width: 'half' },
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
  // STEP 07 — СВОДКА
  // ============================================================
  {
    id: 'review',
    number: '07',
    title: 'Сводка и отправка',
    description: 'Проверьте данные и отправьте заявку',
    sections: [],
  },
];

export const allItpFieldNames: readonly string[] = itpSteps
  .flatMap((step) => step.sections)
  .flatMap((section) => section.fields)
  .map((field) => field.name);
