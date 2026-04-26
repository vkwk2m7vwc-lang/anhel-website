/**
 * Опросный лист для подбора насосных установок ANHEL® — источник правды
 * для веб-формы и backend-валидации.
 *
 * Имена полей (`name`) ИДЕНТИЧНЫ AcroForm-полям в PDF
 * `_tmp_anhel_готовые/pumps-questionnaire-anhel.pdf` (67 полей).
 *
 * Все формулировки `label`, варианты, секции и порядок взяты 1-в-1
 * из `_scripts/build_pumps_questionnaire.py` (629 строк).
 *
 * Любая правка тут должна сопровождаться правкой PDF-скрипта (или наоборот),
 * иначе сломается маппинг web ↔ PDF.
 */

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'textarea'
  | 'checkbox'
  | 'radio';

export type FieldOption = {
  value: string;
  label: string;
};

export type ShowIf = {
  field: string;
  /** equals (default) | truthy | not-equals */
  op?: 'eq' | 'truthy' | 'neq';
  value?: string | boolean;
};

export type QuizField = {
  /** AcroForm-имя в PDF — должно совпадать байт-в-байт */
  name: string;
  /** Подпись из PDF, без перефразирования */
  label: string;
  type: FieldType;
  required?: boolean;
  /** для radio */
  options?: FieldOption[];
  /** единица измерения справа от поля */
  unit?: string;
  /** мелкая подсказка под/возле поля */
  hint?: string;
  placeholder?: string;
  /** условное отображение */
  showIf?: ShowIf;
  /** только для текстовых полей — multiline-textarea */
  multiline?: boolean;
  /** ширина в гриде шага: 'full' | 'half' (по умолчанию 'half' где есть пара) */
  width?: 'full' | 'half';
};

export type QuizSection = {
  id: string;
  /** Заголовок секции, как в PDF */
  title: string;
  /** Дополнительная подгруппа с подзаголовком (опц.) */
  hint?: string;
  fields: QuizField[];
};

export type QuizStep = {
  id: string;
  /** двухзначный номер «01» для mono-тега */
  number: string;
  /** Заголовок шага */
  title: string;
  /** Короткое описание под заголовком (опц.) */
  description?: string;
  sections: QuizSection[];
};

// ===== Тексты-обёртки 1-в-1 из PDF =====

export const QUIZ_INTRO_PARA_1 =
  'Уважаемые партнёры! Для наиболее точного подбора оборудования, соответствующего ' +
  'Вашим требованиям, просим Вас ответить на приведённые ниже вопросы или направить ' +
  'в наш адрес техническое задание, содержащее все требуемые данные.';

export const QUIZ_INTRO_PARA_2 =
  'При возникновении трудностей и вопросов по заполнению опросного листа, пожалуйста, ' +
  'позвоните по +7 (812) 416-4500 — наши специалисты с удовольствием Вам помогут.';

export const QUIZ_DISCLAIMER_TITLE = 'Внимание!';
export const QUIZ_DISCLAIMER_BODY =
  'ООО «Профит» не несёт ответственности за корректность исходных данных для подбора оборудования, ' +
  'указанных в опросном листе. Отказ заказчика заполнить опросный лист означает его согласие со всеми ' +
  'техническими характеристиками, определяемыми условным обозначением, указанным в заявке в соответствие ' +
  'с каталогом ANHEL®, и отсутствие дополнительных требований к изделию.';

export const QUIZ_CONSENT_LABEL =
  'Согласен на обработку персональных данных согласно политике конфиденциальности';

// ===== Опции (вынесены для переиспользования) =====

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


// ===== Шаги формы (5 шагов, 67 AcroForm полей) =====

export const pumpsSteps: QuizStep[] = [
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
  // STEP 02 — СИСТЕМА
  // ============================================================
  {
    id: 'system',
    number: '02',
    title: 'Система',
    description: 'Тип системы и её назначение',
    sections: [
      {
        id: 'system',
        title: 'Система',
        hint: 'Выберите все подходящие варианты',
        fields: [
          { name: 'sys_water_supply', label: 'водоснабжение', type: 'checkbox', width: 'full' },
          { name: 'sys_firefighting', label: 'пожаротушение', type: 'checkbox', width: 'full' },
          {
            name: 'ff_vpv',
            label: 'внутренний противопожарный водопровод (ВПВ)',
            type: 'checkbox',
            showIf: { field: 'sys_firefighting', op: 'truthy' },
            width: 'full',
          },
          {
            name: 'ff_apt',
            label: 'автоматическое пожаротушение (АПТ)',
            type: 'checkbox',
            showIf: { field: 'sys_firefighting', op: 'truthy' },
            width: 'full',
          },
          { name: 'sys_heating', label: 'отопление', type: 'checkbox', width: 'full' },
          {
            name: 'heat_closed',
            label: 'закрытая',
            type: 'checkbox',
            showIf: { field: 'sys_heating', op: 'truthy' },
            width: 'half',
          },
          {
            name: 'heat_open',
            label: 'открытая',
            type: 'checkbox',
            showIf: { field: 'sys_heating', op: 'truthy' },
            width: 'half',
          },
          { name: 'sys_cooling', label: 'кондиционирование', type: 'checkbox', width: 'full' },
          {
            name: 'sys_combined',
            label: 'совмещённая система (пожаротушение + водоснабжение)',
            type: 'checkbox',
            width: 'full',
          },
          { name: 'sys_other', label: 'другое', type: 'checkbox', width: 'full' },
          {
            name: 'sys_other_text',
            label: 'Уточните',
            type: 'text',
            showIf: { field: 'sys_other', op: 'truthy' },
            width: 'full',
          },
        ],
      },
    ],
  },


  // ============================================================
  // STEP 03 — РАСХОД И НАПОР
  // ============================================================
  {
    id: 'flow-head',
    number: '03',
    title: 'Расход и напор',
    description: 'Гидравлические параметры',
    sections: [
      {
        id: 'flow',
        title: 'Расход',
        fields: [
          { name: 'flow_total', label: 'Требуемый расход', type: 'number', unit: 'м³/ч', width: 'half' },
          { name: 'flow_jockey', label: 'Расход жокей-насоса', type: 'number', unit: 'м³/ч', width: 'half' },
          {
            name: 'flow_combined_water',
            label: 'Расход при водоснабжении',
            type: 'number',
            unit: 'м³/ч',
            hint: 'Совмещённая система',
            showIf: { field: 'sys_combined', op: 'truthy' },
            width: 'half',
          },
          {
            name: 'flow_combined_ff',
            label: 'Расход при пожаротушении',
            type: 'number',
            unit: 'м³/ч',
            hint: 'Совмещённая система',
            showIf: { field: 'sys_combined', op: 'truthy' },
            width: 'half',
          },
        ],
      },
      {
        id: 'head',
        title: 'Напор',
        fields: [
          {
            name: 'head_guaranteed',
            label: 'Гарантированный напор сети',
            type: 'number',
            unit: 'м.вод.ст.',
            width: 'half',
          },
          {
            name: 'intake_pond',
            label: 'Водоём',
            type: 'checkbox',
            hint: 'Забор воды из водоёма или резервуара',
            width: 'half',
          },
          { name: 'intake_under', label: 'Подземный', type: 'checkbox', width: 'half' },
          { name: 'intake_semi', label: 'Полузаглублённый', type: 'checkbox', width: 'half' },
          { name: 'intake_above', label: 'Наземный', type: 'checkbox', width: 'half' },
          { name: 'head_hmin', label: 'Hmin', type: 'number', unit: 'м.вод.ст.', width: 'half' },
          { name: 'head_hmax', label: 'Hmax', type: 'number', unit: 'м.вод.ст.', width: 'half' },
          {
            name: 'head_required',
            label: 'Требуемый напор насосной установки',
            type: 'number',
            unit: 'м.вод.ст.',
            hint: '* = Требуемый напор системы − Гарантированный напор сети',
            width: 'full',
          },
          {
            name: 'head_jockey',
            label: 'Требуемый напор жокей-насоса',
            type: 'number',
            unit: 'м.вод.ст.',
            width: 'half',
          },
          {
            name: 'head_combined_water',
            label: 'Требуемый напор насосной установки при водоснабжении',
            type: 'number',
            unit: 'м.в.с.',
            hint: 'Совмещённая система',
            showIf: { field: 'sys_combined', op: 'truthy' },
            width: 'full',
          },
          {
            name: 'head_combined_ff',
            label: 'Требуемый напор насосной установки при пожаротушении',
            type: 'number',
            unit: 'м.в.с.',
            hint: 'Совмещённая система',
            showIf: { field: 'sys_combined', op: 'truthy' },
            width: 'full',
          },
          {
            name: 'pressure_max',
            label: 'Максимальное давление в системе',
            type: 'number',
            unit: 'бар',
            width: 'half',
          },
        ],
      },
    ],
  },


  // ============================================================
  // STEP 04 — ОБОРУДОВАНИЕ
  // ============================================================
  {
    id: 'equipment',
    number: '04',
    title: 'Оборудование',
    description: 'Жидкость, насосы, управление, опции',
    sections: [
      {
        id: 'liquid-pumps',
        title: 'Жидкость и насосы',
        fields: [
          {
            name: 'liquid_type',
            label: 'Перекачиваемая жидкость',
            type: 'text',
            hint: 'если не чистая вода — указать концентрацию',
            width: 'half',
          },
          { name: 'liquid_temp', label: 'Температура жидкости', type: 'number', unit: '°C', width: 'half' },
          {
            name: 'pumps_main',
            label: 'Количество рабочих насосов',
            type: 'number',
            hint: 'обеспечивающих необходимый расход',
            width: 'half',
          },
          { name: 'pumps_reserve', label: 'Количество резервных насосов', type: 'number', width: 'half' },
        ],
      },
      {
        id: 'control',
        title: 'Управление',
        fields: [
          { name: 'ctrl_freq_with_ctrl', label: 'частотное с контроллером', type: 'checkbox', width: 'half' },
          {
            name: 'ctrl_freq_per_pump',
            label: 'частотное на каждый насос с контроллером',
            type: 'checkbox',
            width: 'half',
          },
          { name: 'ctrl_freq_no_ctrl', label: 'частотное без контроллера', type: 'checkbox', width: 'half' },
          { name: 'ctrl_relay_with_ctrl', label: 'релейное с контроллером', type: 'checkbox', width: 'half' },
          {
            name: 'ctrl_relay_soft_start',
            label: 'релейное с контроллером + плавный пуск',
            type: 'checkbox',
            width: 'half',
          },
          {
            name: 'valve_drive',
            label: 'Управление и коммутация задвижки с электроприводом',
            type: 'radio',
            options: YES_NO,
            width: 'full',
          },
          { name: 'valve_count', label: 'Число задвижек', type: 'number', width: 'half' },
          {
            name: 'valve_brand',
            label: 'Марка и тип применяемых задвижек',
            type: 'text',
            width: 'half',
          },
        ],
      },
      {
        id: 'options',
        title: 'Опции',
        fields: [
          {
            name: 'opt_power_no_avr',
            label: 'ввод питания на каждый насос без АВР',
            type: 'checkbox',
            width: 'full',
          },
          { name: 'opt_power_avr', label: 'два ввода питания с АВР', type: 'checkbox', width: 'full' },
          {
            name: 'opt_outdoor',
            label: 'уличное исполнение шкафа управления (УХЛ1, УХЛ2)',
            type: 'checkbox',
            width: 'full',
          },
          {
            name: 'opt_limit_sw',
            label: 'концевые выключатели для пожарной станции ВПВ',
            type: 'checkbox',
            width: 'full',
          },
          {
            name: 'opt_diff_diam',
            label: 'разный диаметр вход/выход коллекторов',
            type: 'checkbox',
            width: 'full',
          },
          {
            name: 'opt_diff_diam_text',
            label: 'Уточните диаметры',
            type: 'text',
            showIf: { field: 'opt_diff_diam', op: 'truthy' },
            width: 'full',
          },
        ],
      },
      {
        id: 'protocol',
        title: 'Передача данных',
        fields: [
          { name: 'proto_profibus', label: 'Profibus', type: 'checkbox', width: 'half' },
          { name: 'proto_modbus', label: 'Modbus', type: 'checkbox', width: 'half' },
          { name: 'proto_ethernet', label: 'Ethernet', type: 'checkbox', width: 'half' },
          { name: 'proto_gsm', label: 'GSM', type: 'checkbox', width: 'half' },
          { name: 'proto_other', label: 'Другое', type: 'checkbox', width: 'full' },
          {
            name: 'proto_other_text',
            label: 'Уточните',
            type: 'text',
            showIf: { field: 'proto_other', op: 'truthy' },
            width: 'full',
          },
        ],
      },
      {
        id: 'module',
        title: 'Модульное исполнение в ёмкости',
        hint: 'Тип / материал / ориентация',
        fields: [
          {
            name: 'module_container',
            label: 'контейнер',
            type: 'checkbox',
            hint: 'Тип',
            width: 'half',
          },
          { name: 'module_tank', label: 'бочка', type: 'checkbox', hint: 'Тип', width: 'half' },
          {
            name: 'module_fiberglass',
            label: 'стеклопластик',
            type: 'checkbox',
            hint: 'Материал',
            width: 'half',
          },
          { name: 'module_steel', label: 'металл', type: 'checkbox', hint: 'Материал', width: 'half' },
          {
            name: 'module_vertical',
            label: 'вертикальное исполнение',
            type: 'checkbox',
            hint: 'Ориентация',
            width: 'half',
          },
          {
            name: 'module_horizontal',
            label: 'горизонтальное исполнение',
            type: 'checkbox',
            hint: 'Ориентация',
            width: 'half',
          },
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
  // STEP 05 — СВОДКА И ОТПРАВКА (без AcroForm-полей)
  // ============================================================
  {
    id: 'review',
    number: '05',
    title: 'Сводка и отправка',
    description: 'Проверьте данные и отправьте заявку',
    sections: [],
  },
];

// ===== Утилиты =====

/** Все AcroForm-поля (плоский список) — для маппинг-проверки на бэкенде */
export const allPumpsFieldNames: readonly string[] = pumpsSteps
  .flatMap((step) => step.sections)
  .flatMap((section) => section.fields)
  .map((field) => field.name);

/** Все required-поля (только client-side hint, серверная схема — отдельная) */
export const requiredPumpsFieldNames: readonly string[] = pumpsSteps
  .flatMap((step) => step.sections)
  .flatMap((section) => section.fields)
  .filter((field) => field.required)
  .map((field) => field.name);

/** Pre-fill-маппинг подкатегорий насосных → автовыбранные чекбоксы системы */
export const pumpsPrefillMap: Record<string, Partial<Record<string, boolean>>> = {
  firefighting: { sys_firefighting: true },
  'water-supply': { sys_water_supply: true },
  'pressure-boost': { sys_water_supply: true },
  'heating-cooling': { sys_heating: true, sys_cooling: true },
  special: {},
};

/**
 * Акцент-цвет на странице quiz по подкатегории.
 * Совпадает с palette на /products/pumps/* для визуальной преемственности
 * (если пришли с пожарной — на форме акцент тоже красный).
 *
 * Значения — имена CSS-переменных из globals.css (--accent-fire / -water /
 * -heat / -treatment). Применяются как override `--accent-current` на
 * корне страницы.
 */
export const pumpsAccentMap: Record<string, string> = {
  firefighting: 'var(--accent-fire)',
  'water-supply': 'var(--accent-water)',
  'pressure-boost': 'var(--accent-water)',
  'heating-cooling': 'var(--accent-heat)',
  special: 'var(--accent-treatment)',
};
