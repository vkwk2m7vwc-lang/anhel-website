'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';
import type { QuizField, ShowIf } from '@/content/quiz/pumps-fields';
import { TextField } from './fields/TextField';
import { CheckboxField } from './fields/CheckboxField';
import { RadioGroupField } from './fields/RadioGroupField';
import { cn } from '@/lib/utils';

/** Условный рендеринг — true если поле должно быть видно. */
function evalShowIf(showIf: ShowIf | undefined, watched: Record<string, unknown>): boolean {
  if (!showIf) return true;
  const v = watched[showIf.field];
  const op = showIf.op ?? 'eq';
  if (op === 'truthy') return Boolean(v);
  if (op === 'neq') return v !== showIf.value;
  return v === showIf.value;
}

type Props = {
  field: QuizField;
};

/**
 * Универсальный рендер поля по описанию из `pumps-fields.ts`.
 * Делает showIf-проверку, mountит RHF Controller, подбирает сэмпл-компонент.
 */
export function QuizFieldRenderer({ field }: Props) {
  const { control, formState } = useFormContext();
  const watched = useWatch({ control });
  const visible = evalShowIf(field.showIf, watched as Record<string, unknown>);

  if (!visible) return null;

  const error = (formState.errors as Record<string, { message?: string } | undefined>)[field.name]
    ?.message;
  const widthClass =
    field.width === 'full'
      ? 'sm:col-span-2'
      : field.width === 'half'
        ? 'sm:col-span-1'
        : 'sm:col-span-2';

  if (field.type === 'checkbox') {
    return (
      <div className={cn(widthClass)}>
        <Controller
          name={field.name}
          control={control}
          render={({ field: f }) => (
            <CheckboxField
              label={field.label}
              hint={field.hint}
              checked={!!f.value}
              onChange={(e) => f.onChange(e.target.checked)}
              onBlur={f.onBlur}
            />
          )}
        />
      </div>
    );
  }

  if (field.type === 'radio') {
    return (
      <div className={cn(widthClass)}>
        <Controller
          name={field.name}
          control={control}
          render={({ field: f }) => (
            <RadioGroupField
              name={field.name}
              options={field.options ?? []}
              value={(f.value as string) ?? ''}
              onChange={(e) => f.onChange((e.target as HTMLInputElement).value)}
              onBlur={f.onBlur}
              inline={(field.options?.length ?? 0) <= 2}
              required={field.required}
              label={field.label && field.label !== '' ? field.label : undefined}
            />
          )}
        />
      </div>
    );
  }

  // text-like: text, email, tel, number, textarea
  return (
    <div className={cn(widthClass)}>
      <Controller
        name={field.name}
        control={control}
        render={({ field: f }) => (
          <TextField
            label={field.label}
            // Use text + inputMode='decimal' instead of type='number' to avoid
            // the native browser stepper (those tiny up/down arrows) overlapping
            // the unit suffix and looking ugly. Numeric keyboard on mobile is
            // preserved via inputMode.
            type={
              field.type === 'textarea' || field.type === 'number'
                ? undefined
                : (field.type as 'text' | 'email' | 'tel')
            }
            multiline={field.multiline || field.type === 'textarea'}
            unit={field.unit}
            hint={field.hint}
            placeholder={field.placeholder}
            required={field.required}
            value={(f.value as string) ?? ''}
            onChange={f.onChange}
            onBlur={f.onBlur}
            error={error}
            inputMode={field.type === 'number' ? 'decimal' : undefined}
          />
        )}
      />
    </div>
  );
}
