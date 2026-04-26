'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type CommonProps = {
  label: string;
  error?: string;
  hint?: string;
  unit?: string;
  multiline?: boolean;
  required?: boolean;
};

type Props = CommonProps &
  Omit<InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;

/**
 * Material-style text input с floating label и тонкой нижней линией.
 * Универсален: text, email, tel, number, textarea (multiline=true).
 */
export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  function TextField(props, ref) {
    const {
      label,
      error,
      hint,
      unit,
      multiline,
      required,
      className,
      id,
      value,
      onChange,
      onBlur,
      name,
      type,
      placeholder,
      ...rest
    } = props;
    const inputId = id || `f-${name}`;
    const filled = value !== undefined && value !== '' && value !== null;

    const fieldClass = cn(
      'peer block w-full bg-transparent pt-6 pb-2 pr-10 text-sm text-secondary outline-none placeholder:text-transparent',
      multiline ? 'min-h-[7rem] resize-y' : 'h-12',
    );

    return (
      <div className={cn('relative', className)}>
        <div
          className={cn(
            'group relative border-b transition-colors',
            error
              ? 'border-[color:var(--accent-fire)]'
              : 'border-[color:var(--color-hairline)] focus-within:border-secondary',
          )}
        >
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={inputId}
              name={name}
              value={(value as string) ?? ''}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder || ' '}
              rows={4}
              className={fieldClass}
              {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={inputId}
              name={name}
              type={type || 'text'}
              value={(value as string) ?? ''}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder || ' '}
              className={fieldClass}
              {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
          <label
            htmlFor={inputId}
            className={cn(
              'pointer-events-none absolute left-0 origin-left transition-all',
              'top-4 text-sm text-secondary/55',
              'peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-secondary/85',
              filled && 'top-1 text-[11px] text-secondary/75',
            )}
          >
            {label}
            {required && <span className="ml-0.5 text-[color:var(--accent-fire)]">*</span>}
          </label>
          {unit && (
            <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-xs text-secondary/55">
              {unit}
            </span>
          )}
        </div>
        {error ? (
          <p className="mt-1 text-xs text-[color:var(--accent-fire)]">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-xs text-secondary/45">{hint}</p>
        ) : null}
      </div>
    );
  },
);
