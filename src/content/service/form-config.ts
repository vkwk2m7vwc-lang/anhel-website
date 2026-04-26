/**
 * Конфигурация формы /service/request — 5 логических шагов.
 *
 * Поля сгруппированы по смыслу, чтобы пользователь не щёлкал «Далее» через
 * мини-секции с одним полем. Имена полей сохранены 1-в-1 с PDF-заявкой —
 * когда подключим Resend, бэкенд получит тот же набор имён.
 *
 * Подсказки про формат ввода (24С574, +7 (___) ___-__-__, name@company.ru)
 * живут в `placeholder`, чтобы появляться прямо в строке серым.
 */

export type FieldKind = 'text' | 'tel' | 'email' | 'date' | 'textarea' | 'checkbox';
export type FieldWidth = 'half' | 'full';

export type FormField = {
  name: string;
  label: string;
  kind: FieldKind;
  required: boolean;
  /** На десктопе: half — одна из двух колонок, full — вся ширина */
  width?: FieldWidth;
  placeholder?: string;
  hint?: string;
  /** Только для textarea: минимальная длина для прохождения валидации. */
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
    title: 'Объект и заявка',
    description:
      'Где установлено оборудование, по какому документу было поставлено.',
    fields: [
      {
        name: 'request_number',
        label: 'Номер заявки (серийный номер изделия)',
        kind: 'text',
        required: true,
        width: 'full',
        placeholder: 'например, 24С574 — год и индекс серии',
      },
      {
        name: 'company_name',
        label: 'Название компании',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: 'ООО «Ромашка»',
      },
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
        width: 'full',
        placeholder: 'СПб, Невский пр., 28',
      },
    ],
  },
  {
    index: 1,
    title: 'Оборудование и основания',
    description: 'Что обслуживаем и по какому документу поставлено.',
    fields: [
      {
        name: 'equipment_type',
        label: 'Тип оборудования',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: 'насосная установка / ИТП / ВПУ',
      },
      {
        name: 'equipment_name',
        label: 'Наименование',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: 'установка пожаротушения HVS-NU 60-90',
      },
      {
        name: 'equipment_serial',
        label: 'Серийный номер изделия',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: '24С574',
      },
      {
        name: 'equipment_commissioning_date',
        label: 'Дата ввода в эксплуатацию',
        kind: 'date',
        required: true,
        width: 'half',
      },
      {
        name: 'invoice_number_date',
        label: 'Номер и дата Счёта',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: '№ 123 от 12.05.2024',
      },
      {
        name: 'upd_number_date',
        label: 'Номер и дата УПД',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: '№ 456 от 18.05.2024',
      },
      {
        name: 'synteka_number',
        label: 'Номер заявки в Синтеке',
        kind: 'text',
        required: false,
        width: 'full',
        placeholder: 'если есть — иначе пропустите',
      },
    ],
  },
  {
    index: 2,
    title: 'Контактное лицо',
    description: 'С кем встретится сервисный инженер на объекте.',
    fields: [
      {
        name: 'contact_full_name',
        label: 'ФИО',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: 'Иванов Иван Иванович',
      },
      {
        name: 'contact_position',
        label: 'Должность',
        kind: 'text',
        required: true,
        width: 'half',
        placeholder: 'главный инженер',
      },
      {
        name: 'contact_phone',
        label: 'Мобильный телефон',
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
    ],
  },
  {
    index: 3,
    title: 'Неисправность и согласия',
    description:
      'Опишите проблему — чем подробнее, тем точнее инженер подготовится. Подтвердите условия выезда.',
    fields: [
      {
        name: 'problem_description',
        label: 'Подробное описание неисправности',
        kind: 'textarea',
        required: true,
        width: 'full',
        minLength: 50,
        placeholder:
          'Например: после планового включения насос №1 не выходит на рабочее давление, при пуске слышен металлический шум…',
        hint: 'Видео-материалы можно приложить к письму после отправки заявки на info@anhelspb.com.',
      },
      {
        name: 'commit_representative',
        label:
          'Обязуюсь обеспечить присутствие представителя с правом подписи в Сервисном протоколе и печати на Акте выполненных работ.',
        kind: 'checkbox',
        required: true,
        width: 'full',
      },
      {
        name: 'commit_equipment_ready',
        label:
          'Обязуюсь обеспечить готовность оборудования к диагностике (доступ, эл. питание ШУ, подача и расход воды).',
        kind: 'checkbox',
        required: true,
        width: 'full',
      },
      {
        name: 'commit_decision_after_request',
        label:
          'Понимаю, что решение о выезде сервисного инженера принимается после получения заполненной и пропечатанной заявки.',
        kind: 'checkbox',
        required: true,
        width: 'full',
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
    index: 4,
    title: 'Проверка и отправка',
    description:
      'Проверьте введённые данные. После отправки заявка попадёт на info@anhelspb.com — мы согласуем с вами выезд.',
    fields: [],
  },
];

/** Версия конфига — для будущих миграций localStorage. */
export const FORM_STORAGE_KEY = 'anhel-service-request-v2';

/** Все имена полей плоско — для упрощения типизации значений формы. */
export const ALL_FIELD_NAMES: readonly string[] = FORM_STEPS.flatMap((s) =>
  s.fields.map((f) => f.name),
);
