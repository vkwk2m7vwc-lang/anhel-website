/**
 * Конфигурация формы /quiz/control-systems — 6 логических шагов.
 *
 * Поля собраны из ТТХ-таблиц всех 5 шкафов на mfmc.ru (наш OEM-партнёр):
 * количество насосов/задвижек, мощность, способ пуска, ввод питания,
 * напряжение, климатическое исполнение, тип управления, протоколы.
 *
 * Структура и стиль — 1-в-1 с `/service/request` (FormStep / FormField),
 * чтобы переиспользовать рендеринг. Имена полей пытаются совпадать с
 * полями PDF-опросника МФМК для будущей интеграции с бэкендом.
 *
 * Сырые материалы — `tmp/source/control-systems/` (5 .md + README).
 */

export type FieldKind = 'text' | 'tel' | 'email' | 'textarea' | 'checkbox';
export type FieldWidth = 'half' | 'full';

export type FormField = {
  name: string;
  label: string;
  kind: FieldKind;
  required: boolean;
  width?: FieldWidth;
  placeholder?: string;
  hint?: string;
  minLength?: number;
};

export type FormStep = {
  index: number;
  title: string;
  description?: string;
  fields: FormField[];
};

export const FORM_STEPS: readonly FormStep[] = [
  {
    index: 0,
    title: 'Контакты',
    description: 'Кому и куда отправить коммерческое предложение.',
    fields: [
      {
        name: 'company_name',
        label: 'Компания',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: 'ООО «Ромашка»',
      },
      {
        name: 'contact_full_name',
        label: 'ФИО',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: 'Иванов Иван Иванович',
      },
      {
        name: 'contact_phone',
        label: 'Телефон',
        kind: 'tel',
        required: true,
        width: 'half',
        placeholder: '+7 (___) ___-__-__',
      },
      {
        name: 'contact_email',
        label: 'E-mail',
        kind: 'email',
        required: true,
        width: 'half',
        placeholder: 'name@company.ru',
      },
      {
        name: 'contact_position',
        label: 'Должность',
        kind: 'text',
        required: false,
        width: 'full',
        placeholder: 'главный инженер / проектировщик / снабженец',
      },
    ],
  },
  {
    index: 1,
    title: 'Объект',
    description: 'Где будет установлен шкаф управления.',
    fields: [
      {
        name: 'object_name',
        label: 'Наименование объекта',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: 'ЖК «Балтийская Жемчужина»',
      },
      {
        name: 'object_address',
        label: 'Адрес объекта',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: 'Санкт-Петербург, Невский пр., 28',
      },
      {
        name: 'object_type',
        label: 'Тип здания',
        kind: 'text',
        required: false,
        width: 'half',
        placeholder: 'жилой / коммерческий / промышленный',
      },
      {
        name: 'project_stage',
        label: 'Стадия проекта',
        kind: 'text',
        required: false,
        width: 'half',
        placeholder: 'проектирование / стройка / модернизация',
      },
    ],
  },
  {
    index: 2,
    title: 'Назначение шкафа',
    description: 'Для какой системы подбираем шкаф управления.',
    fields: [
      {
        name: 'cabinet_type',
        label: 'Тип шкафа',
        kind: 'text',
        required: true,
        width: 'full',
        placeholder:
          'частотное регулирование / пожаротушение / дымоудаление / КНС / арматура',
        hint:
          'Если не уверены — оставьте пометку «не определились»; подберём вместе.',
      },
      {
        name: 'application_details',
        label: 'Назначение системы',
        kind: 'textarea',
        required: false,
        width: 'full',
        minLength: 0,
        placeholder:
          'Например: ХВС многоэтажного ЖК, спринклерная система склада, КНС бытовых стоков',
      },
    ],
  },
  {
    index: 3,
    title: 'Технические параметры',
    description:
      'Базовые параметры — точные значения подберём после уточнения.',
    fields: [
      {
        name: 'pumps_count',
        label: 'Количество насосов / задвижек',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: '1 – 6 (для шкафа арматуры — до 5 задвижек)',
      },
      {
        name: 'pump_power',
        label: 'Мощность каждого, кВт',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: '0,37 – 500',
      },
      {
        name: 'current_value',
        label: 'Сила тока, А',
        kind: 'text',
        required: false,
        width: 'half',
        placeholder: '1 – 4000',
      },
      {
        name: 'voltage',
        label: 'Напряжение питания, В',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: '3×380 / 660 / 6 кВ / 10 кВ',
      },
      {
        name: 'start_method',
        label: 'Способ пуска',
        kind: 'text',
        required: false,
        width: 'half',
        placeholder: 'прямой / плавный / ПЧ / УПП',
      },
      {
        name: 'power_input',
        label: 'Ввод питания',
        kind: 'text',
        required: false,
        width: 'half',
        placeholder: 'одинарный / двойной с АВР',
      },
    ],
  },
  {
    index: 4,
    title: 'Особые требования',
    description:
      'Климатическое исполнение, протоколы, сертификация, диспетчеризация.',
    fields: [
      {
        name: 'climate_class',
        label: 'Климатическое исполнение',
        kind: 'text',
        required: false,
        width: 'half',
        placeholder: 'УХЛ4 (стандарт) / УХЛ1 / УХЛ2',
      },
      {
        name: 'control_type',
        label: 'Тип управления',
        kind: 'text',
        required: false,
        width: 'half',
        placeholder: 'местное / дистанционное / комбинированное',
      },
      {
        name: 'protocols',
        label: 'Протоколы передачи данных',
        kind: 'text',
        required: false,
        width: 'half',
        placeholder: 'Modbus RTU/TCP, ProfibusDP, EasyAccess, VNC',
      },
      {
        name: 'certification',
        label: 'Сертификация',
        kind: 'text',
        required: false,
        width: 'half',
        placeholder: 'ФЗ-123 / ТР ТС / без специальных требований',
      },
      {
        name: 'extra_options',
        label: 'Дополнительные опции и пожелания',
        kind: 'textarea',
        required: false,
        width: 'full',
        minLength: 0,
        placeholder:
          'Интеграция с «Орион»/«Рубеж», IP69, GSM-диспетчеризация, удалённый доступ, подключение датчиков РТС…',
      },
      {
        name: 'deadline',
        label: 'Желаемые сроки поставки',
        kind: 'text',
        required: false,
        width: 'full',
        placeholder: 'например, готовы получить через 8 недель после ТЗ',
      },
      {
        name: 'consent_pd',
        label:
          'Даю согласие на обработку персональных данных в соответствии с ФЗ-152.',
        kind: 'checkbox',
        required: true,
        width: 'full',
      },
    ],
  },
  {
    index: 5,
    title: 'Проверка и отправка',
    description:
      'Проверьте введённые данные. После отправки заявка попадёт на info@anhelspb.com — мы свяжемся в течение рабочего дня.',
    fields: [],
  },
];

/** Версия конфига — для будущих миграций localStorage. */
export const FORM_STORAGE_KEY = 'anhel-quiz-control-systems-v1';

/** Все имена полей плоско — для упрощения типизации значений формы. */
export const ALL_FIELD_NAMES: readonly string[] = FORM_STEPS.flatMap((s) =>
  s.fields.map((f) => f.name),
);
