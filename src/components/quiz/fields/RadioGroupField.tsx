'use client';

import { type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import type { FieldOption } from '@/content/quiz/pumps-fields';

type Props = {
  name: string;
  label?: string;
  options: FieldOption[];
  value?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
  inline?: boolean;
  className?: string;
  required?: boolean;
};

/** Группа radio-кнопок. Inline для коротких (Да/Нет), stack для длинных списков. */
export function RadioGroupField({
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  inline = false,
  className,
  required,
}: Props) {
  return (
    <fieldset className={cn(className)}>
      {label && (
        <legend className="mb-3 block text-sm text-secondary/75">
          {label}
          {required && <span className="ml-0.5 text-[color:var(--accent-fire)]">*</span>}
        </legend>
      )}
      <div className={cn(inline ? 'flex flex-wrap gap-x-6 gap-y-2' : 'flex flex-col gap-2')}>
        {options.map((opt) => {
          const inputId = `f-${name}-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={inputId}
              className="group flex cursor-pointer select-none items-center gap-3 py-1"
            >
              <span className="relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                <input
                  id={inputId}
                  name={name}
                  type="radio"
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  onBlur={onBlur}
                  className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full border border-[color:var(--color-hairline)] bg-primary checked:border-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-current)]"
                />
                <span className="pointer-events-none h-2 w-2 rounded-full bg-secondary opacity-0 peer-checked:opacity-100" />
              </span>
              <span className="text-sm text-secondary">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
