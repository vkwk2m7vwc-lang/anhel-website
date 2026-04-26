/**
 * Опросный лист — установки водоподготовки ANHEL® (ВПУ).
 * Источник правды: `_scripts/build_vpu_questionnaire.py` (178 строк).
 * AcroForm-имена 1-в-1 с `_tmp_anhel_готовые/vpu-questionnaire-anhel.pdf`
 * (26 полей).
 */
import type { QuizStep } from './pumps-fields';

export const vpuSteps: QuizStep[] = [
  // ============================================================
  // STEP 01 — КОНТАКТЫ
  // ============================================================
  {
    id: 'contacts',
    number: '01',
    title: 'Контакты',
    description: 'Кто вы и для какого объекта',
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
    ],
  },
  // ============================================================
  // STEP 02 — ИСТОЧНИК И ТРЕБОВАНИЯ К ВОДЕ
  // ============================================================
  {
    id: 'source',
    number: '02',
    title: 'Источник и требования',
    description: 'Параметры исходной и очищенной воды',
    sections: [
      {
        id: 'source',
        title: 'Основные данные',
        fields: [
          {
            name: 'water_source',
            label: 'Источник водоснабжения',
            type: 'textarea',
            multiline: true,
            hint: 'Анализ исходной воды необходимо приложить к опросному листу',
            width: 'full',
          },
          {
            name: 'water_temp',
            label: 'Температура исходной воды (min, max)',
            type: 'text',
            unit: '°C',
            width: 'half',
          },
          {
            name: 'water_quality_req',
            label: 'Требования к качеству воды',
            type: 'textarea',
            multiline: true,
            hint: 'Приложить требования или ссылку на нормативный документ',
            width: 'full',
          },
          {
            name: 'input_flow',
            label: 'Расход на входе в водопроводной сети в точке подключения',
            type: 'number',
            unit: 'м³/ч',
            width: 'half',
          },
          {
            name: 'input_pressure',
            label: 'Давление на входе в водопроводной сети в точке подключения',
            type: 'number',
            unit: 'м.вод.ст.',
            width: 'half',
          },
          {
            name: 'input_pump_type',
            label: 'Тип применяемого насоса на входе (если имеется)',
            type: 'text',
            width: 'full',
          },
        ],
      },
    ],
  },
  // ============================================================
  // STEP 03 — РАСХОД ОЧИЩЕННОЙ ВОДЫ И РЕЖИМ
  // ============================================================
  {
    id: 'flow-mode',
    number: '03',
    title: 'Расход и режим',
    description: 'Производительность и график работы установки',
    sections: [
      {
        id: 'clean-flow',
        title: 'Необходимый расход очищенной воды',
        fields: [
          {
            name: 'clean_flow_daily',
            label: 'Суточный',
            type: 'number',
            unit: 'м³/сут',
            width: 'half',
          },
          {
            name: 'clean_flow_max_h',
            label: 'Максимальный часовой',
            type: 'number',
            unit: 'м³/ч',
            width: 'half',
          },
        ],
      },
      {
        id: 'schedule',
        title: 'График водопотребления',
        hint: 'Для выбора оптимальной схемы работы установки',
        fields: [
          { name: 'shifts_count', label: 'Количество смен', type: 'text', width: 'half' },
          { name: 'shift_duration', label: 'Продолжительность смены', type: 'text', width: 'half' },
          {
            name: 'shift_break',
            label: 'Продолжительность перерыва между сменами (max)',
            type: 'text',
            width: 'full',
          },
          { name: 'operating_mode', label: 'Режим работы установки', type: 'text', width: 'full' },
        ],
      },
      {
        id: 'storage',
        title: 'Резерв и напор',
        fields: [
          {
            name: 'water_reserve',
            label: 'Необходимый запас чистой воды (накопительная ёмкость − V)',
            type: 'number',
            unit: 'м³',
            width: 'full',
          },
          {
            name: 'existing_tanks',
            label: 'Объём имеющихся ёмкостей под чистую воду',
            type: 'number',
            unit: 'м³',
            width: 'half',
          },
          {
            name: 'output_pressure',
            label: 'Необходимый напор воды на выходе из установки',
            type: 'number',
            unit: 'м.вод.ст.',
            width: 'half',
          },
        ],
      },
    ],
  },
  // ============================================================
  // STEP 04 — ДРЕНАЖ И ДОКУМЕНТАЦИЯ
  // ============================================================
  {
    id: 'drain-docs',
    number: '04',
    title: 'Дренаж и документация',
    description: 'Условия отведения промывной воды и проектная документация',
    sections: [
      {
        id: 'drain',
        title: 'Промывная вода',
        fields: [
          {
            name: 'drain_network',
            label: 'Наличие сети для отведения промывной воды',
            type: 'text',
            width: 'full',
          },
          {
            name: 'drain_limits_composition',
            label: 'Ограничения по составу',
            type: 'text',
            hint: 'Наличие ограничений по качеству отводимой промывной воды',
            width: 'half',
          },
          {
            name: 'drain_limits_volume',
            label: 'Ограничения по объёму',
            type: 'text',
            width: 'half',
          },
        ],
      },
      {
        id: 'docs',
        title: 'Проектная документация',
        fields: [
          {
            name: 'design_docs_scope',
            label: 'Объём предоставления проектной документации на установку',
            type: 'text',
            width: 'full',
          },
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

/** Все AcroForm-имена для проверки маппинга на бэкенде */
export const allVpuFieldNames: readonly string[] = vpuSteps
  .flatMap((step) => step.sections)
  .flatMap((section) => section.fields)
  .map((field) => field.name);
