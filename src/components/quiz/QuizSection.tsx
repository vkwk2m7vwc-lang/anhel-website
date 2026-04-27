'use client';

import type { QuizSection as TSection } from '@/content/quiz/pumps-fields';
import { QuizFieldRenderer } from './QuizFieldRenderer';

type Props = {
  section: TSection;
  /** Доп. контент ПЕРЕД полями секции (например, кастомный chooser) */
  beforeFields?: React.ReactNode;
  /** Доп. контент после полей секции */
  afterFields?: React.ReactNode;
  /** Имена полей, которые нужно скрыть в общей сетке (рендерятся кастомно) */
  excludeFields?: readonly string[];
};

/** Заголовок секции + grid-контейнер на 2 колонки (с col-span у полей). */
export function QuizSection({ section, beforeFields, afterFields, excludeFields }: Props) {
  const fields = excludeFields
    ? section.fields.filter((f) => !excludeFields.includes(f.name))
    : section.fields;

  if (fields.length === 0 && !beforeFields && !afterFields) return null;

  return (
    <section className="border-t border-[color:var(--color-hairline)] pt-6">
      <div className="mb-5">
        <h3 className="text-base font-medium text-secondary">{section.title}</h3>
        {section.hint && <p className="mt-1 text-xs text-secondary/55">{section.hint}</p>}
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {beforeFields}
        {fields.map((f) => (
          <QuizFieldRenderer key={f.name} field={f} />
        ))}
      </div>
      {afterFields}
    </section>
  );
}
