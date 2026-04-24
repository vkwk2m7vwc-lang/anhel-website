"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { formatPhoneMask } from "./validators";

/**
 * Shared form primitives for the quiz. All use the ANHEL palette —
 * thin hairline borders on dark panels, fire-red (via
 * `--accent-current`) focus outlines, mono labels. Every field is
 * label-first above the input; asterisk appears inline when required.
 */

/** Text / number / email / tel input + optional unit suffix. */
export function FieldInput({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  required,
  unit,
  placeholder,
  width = "full",
  mask,
  error,
}: {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: "text" | "email" | "tel" | "number";
  required?: boolean;
  unit?: string;
  placeholder?: string;
  /** "full" fills its column, "short" caps at ~14ch for numeric fields. */
  width?: "full" | "short";
  /**
   * "phone" — applies the Russian phone mask (+7 (XXX) XXX-XX-XX) as
   * the user types. The formatted string is pushed through `onChange`,
   * so state always stores the display value.
   */
  mask?: "phone";
  /**
   * Error message shown under the field. Non-null value also switches
   * the field into `aria-invalid="true"` and tints the underline red
   * so screen readers and sighted users stay in sync.
   */
  error?: string;
}) {
  const errorId = useId();
  const handleChange = (raw: string) => {
    if (mask === "phone") {
      onChange(formatPhoneMask(raw));
      return;
    }
    onChange(raw);
  };

  return (
    <label className="flex flex-col gap-2">
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <input
          type={type}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={onBlur}
          className={cn(
            "w-full border-b bg-transparent py-2 text-sm text-[var(--color-secondary)] placeholder-[var(--color-secondary)]/55 outline-none transition-colors",
            error
              ? "border-[var(--accent-fire)] focus:border-[var(--accent-fire)]"
              : "border-[var(--color-hairline)] focus:border-[var(--accent-current)]",
            width === "short" && "max-w-[14ch]"
          )}
        />
        {unit ? (
          <span className="pointer-events-none absolute right-0 top-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/65">
            {unit}
          </span>
        ) : null}
      </div>
      {error ? (
        <span
          id={errorId}
          role="alert"
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent-fire)]"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

/** Multi-line textarea — same visual language as FieldInput. */
export function FieldTextarea({
  label,
  value,
  onChange,
  required,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <FieldLabel label={label} required={required} />
      <textarea
        rows={rows}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y border border-[var(--color-hairline)] bg-transparent p-3 text-sm text-[var(--color-secondary)] placeholder-[var(--color-secondary)]/55 outline-none transition-colors focus:border-[var(--accent-current)]"
      />
    </label>
  );
}

/** Label with required-marker asterisk. */
export function FieldLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
      {label}
      {required ? (
        <span className="ml-1 text-[var(--accent-current)]">*</span>
      ) : null}
    </span>
  );
}

/** Radio card — one option in a mutually-exclusive group. */
export function RadioCard<V extends string>({
  value,
  selected,
  onSelect,
  label,
  description,
}: {
  value: V;
  selected: V | undefined;
  onSelect: (v: V) => void;
  label: string;
  description?: string;
}) {
  const isActive = selected === value;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isActive}
      data-cursor="hover"
      onClick={() => onSelect(value)}
      className={cn(
        "group flex min-h-[64px] flex-col items-start gap-1 border p-4 text-left transition-colors",
        isActive
          ? "border-[var(--accent-current)] bg-[var(--accent-current)]/5"
          : "border-[var(--color-hairline)] hover:border-[var(--color-secondary)]/40"
      )}
    >
      <span
        className={cn(
          "font-mono text-[11px] uppercase tracking-[0.08em]",
          isActive ? "text-[var(--accent-current)]" : "text-[var(--color-secondary)]/70"
        )}
      >
        {label}
      </span>
      {description ? (
        <span className="text-xs text-[var(--color-secondary)]/65">
          {description}
        </span>
      ) : null}
    </button>
  );
}

/** Checkbox card — one option in a multi-select group. */
export function CheckboxCard({
  checked,
  onToggle,
  label,
  description,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-cursor="hover"
      onClick={onToggle}
      className={cn(
        "group flex min-h-[56px] items-start gap-3 border p-4 text-left transition-colors",
        checked
          ? "border-[var(--accent-current)] bg-[var(--accent-current)]/5"
          : "border-[var(--color-hairline)] hover:border-[var(--color-secondary)]/40"
      )}
    >
      {/* 14-px tick box — outline when unchecked, filled when checked */}
      <span
        aria-hidden="true"
        className={cn(
          "relative mt-[2px] inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center border transition-colors",
          checked
            ? "border-[var(--accent-current)] bg-[var(--accent-current)]"
            : "border-[var(--color-secondary)]/30"
        )}
      >
        {checked ? (
          <svg
            viewBox="0 0 12 10"
            className="h-[8px] w-[10px] fill-none stroke-[var(--color-primary)] stroke-2"
          >
            <path d="M1 5.5L4.5 9L11 1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <span className="flex flex-col gap-1">
        <span
          className={cn(
            "font-mono text-[11px] uppercase tracking-[0.08em]",
            checked ? "text-[var(--accent-current)]" : "text-[var(--color-secondary)]/75"
          )}
        >
          {label}
        </span>
        {description ? (
          <span className="text-xs text-[var(--color-secondary)]/65">
            {description}
          </span>
        ) : null}
      </span>
    </button>
  );
}

/** Inline consent checkbox — smaller, used on the final step. */
export function ConsentCheckbox({
  checked,
  onToggle,
  children,
}: {
  checked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative mt-[2px] inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center border transition-colors",
          checked
            ? "border-[var(--accent-current)] bg-[var(--accent-current)]"
            : "border-[var(--color-secondary)]/40"
        )}
      >
        {checked ? (
          <svg
            viewBox="0 0 12 10"
            className="h-[8px] w-[10px] fill-none stroke-[var(--color-primary)] stroke-2"
          >
            <path d="M1 5.5L4.5 9L11 1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <span className="text-xs leading-relaxed text-[var(--color-secondary)]/60">
        {children}
      </span>
    </label>
  );
}

/** Section divider inside a step — mono tag + hairline.
 *  Optional `id` прокидывает id на <p> так что родительский
 *  `role="radiogroup"` / `role="group"` wrapper может указать на
 *  него через aria-labelledby — screen reader объявит название
 *  группы перед зачиткой вариантов. */
export function FieldGroupTitle({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 border-t border-[var(--color-hairline)] pt-6">
      <p
        id={id}
        className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/60"
      >
        {children}
      </p>
    </div>
  );
}

/**
 * A11y group wrapper для набора `RadioCard`-ов или `CheckboxCard`-ов.
 *
 * Оборачивает детей в `<div role="radiogroup|group" aria-labelledby>`
 * так что screen reader зачитывает название группы («Тип системы»)
 * перед списком вариантов, а клавиатурная навигация не теряет
 * контекст.
 *
 * Использование:
 * ```tsx
 * <FieldRadioGroup label="Тип системы" idPrefix="system-type">
 *   <RadioCard ... />
 *   ...
 * </FieldRadioGroup>
 * ```
 */
export function FieldRadioGroup({
  label,
  idPrefix,
  variant = "radio",
  className,
  children,
}: {
  label: string;
  idPrefix: string;
  /** "radio" для взаимоисключающих, "checkbox" для multi-select. */
  variant?: "radio" | "checkbox";
  className?: string;
  children: React.ReactNode;
}) {
  const labelId = `${idPrefix}-label`;
  return (
    <div>
      <FieldGroupTitle id={labelId}>{label}</FieldGroupTitle>
      <div
        role={variant === "radio" ? "radiogroup" : "group"}
        aria-labelledby={labelId}
        className={className}
      >
        {children}
      </div>
    </div>
  );
}
