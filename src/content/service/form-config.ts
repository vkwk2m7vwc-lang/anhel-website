/**
 * Конфигурация формы /service/request — 9 шагов один-в-один с PDF-заявкой.
 *
 * Поля и их типы перечислены здесь декларативно, чтобы UI не разрастался
 * if/else-логикой по каждому полю. Шаги 6 (обязательства) и 7 (согласие
 * ПД) — чекбоксы; остальные — обычные input'ы с типом из `kind`.
 *
 * Важно: ключи `name` совпадают с полями в TZ — если позже подключим
 * Resend-отправку, бекенд получит тот же набор имён.
 */

export type FieldKind = 'text' | 'tel' | 'email' | 'date' | 'textarea' | 'checkbox';

export type FormField = {
  name: string;
  label: string;
  kind: FieldKind;
  required: boolean;
  placeholder?: string;
  hint?: string;
  /** Только для textarea: минимальная длина для прохождения валидации. */
  minLength?: number;
};

export type FormStep = {
  /** 1..N номер шага (0-й шаг — отдельно, "Номер заявки") */
  index: number;
  title: string;
  /** Подзаголовок-описание шага (1 предложение) */
  description?: string;
  fields: FormField[];
};

export const FORM_STEPS: readonly FormStep[] = [
  {
    index: 0,
    title: 'Номер заявки',
    description:
      'Это серийный номер изделия. Найдёте его на шильде оборудования (формат, например, 24С574 — год и индекс серии).',
    fields: [
      {
        name: 'request_number',
        label: 'Серийный номер изделия',
        kind: 'text',
        required: true,
        placeholder: 'например, 24С574',
      },
    ],
  },
  {
    index: 1,
    title: 'Контакты объекта',
    description: 'Где установлено оборудование.',
    fields: [
      {
        name: 'company_name',
        label: 'Название компании',
        kind: 'text',
        required: true,
      },
      {
        name: 'object_name',
        label: 'Наименование объекта',
        kind: 'text',
        required: true,
      },
      {
        name: 'object_address',
        label: 'Адрес объекта',
        kind: 'text',
        required: true,
      },
    ],
  },
  {
    index: 2,
    title: 'Основания',
    description: 'Документы, по которым был поставлен товар.',
    fields: [
      {
        name: 'invoice_number_date',
        label: 'Номер и дата Счёта',
        kind: 'text',
        required: true,
        placeholder: '№ 123 от 12.05.2024',
      },
      {
        name: 'upd_number_date',
        label: 'Номер и дата УПД',
        kind: 'text',
        required: true,
        placeholder: '№ 456 от 18.05.2024',
      },
      {
        name: 'synteka_number',
        label: 'Номер заявки в Синтеке',
        kind: 'text',
        required: false,
        placeholder: 'необязательно',
      },
    ],
  },
  {
    index: 3,
    title: 'Контактное лицо',
    description: 'С кем встретится сервисный инженер на объекте.',
    fields: [
      {
        name: 'contact_full_name',
        label: 'ФИО',
        kind: 'text',
        required: true,
      },
      {
        name: 'contact_position',
        label: 'Должность',
        kind: 'text',
        required: true,
      },
      {
        name: 'contact_phone',
        label: 'Мобильный телефон',
        kind: 'tel',
        required: true,
        placeholder: '+7 (___) ___-__-__',
      },
      {
        name: 'contact_email',
        label: 'E-mail',
        kind: 'email',
        required: true,
        placeholder: 'name@company.ru',
      },
    ],
  },
  {
    index: 4,
    title: 'Оборудование',
    fields: [
      {
        name: 'equipment_type',
        label: 'Тип',
        kind: 'text',
        required: true,
        placeholder: 'насосная установка / ИТП / ВПУ',
      },
      {
        name: 'equipment_name',
        label: 'Наименование',
        kind: 'text',
        required: true,
      },
      {
        name: 'equipment_serial',
        label: 'Серийный номер изделия',
        kind: 'text',
        required: true,
      },
      {
        name: 'equipment_commissioning_date',
        label: 'Дата ввода в эксплуатацию',
        kind: 'date',
        required: true,
      },
    ],
  },
  {
    index: 5,
    title: 'Описание неисправности',
    description: 'Чем подробнее — тем точнее инженер подготовится к выезду.',
    fields: [
      {
        name: 'problem_description',
        label: 'Подробное описание неисправности',
        kind: 'textarea',
        required: true,
        minLength: 50,
        hint: 'Видео-материалы можно приложить к письму после отправки заявки на info@anhelspb.com.',
      },
    ],
  },
  {
    index: 6,
    title: 'Подтверждение обязательств',
    description: 'Без этих условий выезд не состоится.',
    fields: [
      {
        name: 'commit_representative',
        label:
          'Обязуюсь обеспечить присутствие представителя с правом подписи в Сервисном протоколе и печати на Акте выполненных работ.',
        kind: 'checkbox',
        required: true,
      },
      {
        name: 'commit_equipment_ready',
        label:
          'Обязуюсь обеспечить готовность оборудования к диагностике (доступ, эл. питание ШУ, подача и расход воды).',
        kind: 'checkbox',
        required: true,
      },
      {
        name: 'commit_decision_after_request',
        label:
          'Понимаю, что решение о выезде сервисного инженера принимается после получения заполненной и пропечатанной заявки.',
        kind: 'checkbox',
        required: true,
      },
    ],
  },
  {
    index: 7,
    title: 'Согласие на обработку персональных данных',
    fields: [
      {
        name: 'consent_pd',
        label:
          'Даю согласие на обработку персональных данных в соответствии с ФЗ-152.',
        kind: 'checkbox',
        required: true,
      },
    ],
  },
  {
    index: 8,
    title: 'Проверка и отправка',
    description:
      'Проверьте введённые данные. После отправки заявка попадёт на info@anhelspb.com — мы согласуем с вами выезд.',
    fields: [],
  },
];

/** Версия конфига — для будущих миграций localStorage. */
export const FORM_STORAGE_KEY = 'anhel-service-request-v1';

/** Все имена полей плоско — для упрощения типизации значений формы. */
export const ALL_FIELD_NAMES: readonly string[] = FORM_STEPS.flatMap((s) =>
  s.fields.map((f) => f.name),
);
