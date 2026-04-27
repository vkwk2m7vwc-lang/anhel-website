'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
};

/** Чекбокс в стиле проекта: квадратная рамка hairline + sharp галочка. */
export const CheckboxField = forwardRef<HTMLInputElement, Props>(function CheckboxField(
  { label, hint, className, id, name, checked, onChange, ...rest },
  ref,
) {
  const inputId = id || `f-${name}`;
  return (
    <label
      htmlFor={inputId}
      className={cn(
        'group flex cursor-pointer select-none items-start gap-3 py-1.5',
        className,
      )}
    >
      <span className="relative mt-0.5 inline-block h-[18px] w-[18px] shrink-0">
        <input
          ref={ref}
          id={inputId}
          name={name}
          type="checkbox"
          checked={!!checked}
          onChange={onChange}
          className="peer h-full w-full appearance-none rounded-sm border border-[color:var(--color-hairline)] bg-primary checked:border-secondary checked:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-current)]"
          {...rest}
        />
        {/* checkmark */}
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-primary opacity-0 peer-checked:opacity-100"
        >
          <path
            d="M3 8l3.5 3.5L13 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm leading-snug text-secondary">
        {label}
        {hint && <span className="ml-2 text-xs text-secondary/45">{hint}</span>}
      </span>
    </label>
  );
});
