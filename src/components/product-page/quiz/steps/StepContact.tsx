"use client";

import { useState } from "react";
import { FieldInput } from "../QuizFields";
import type { QuizData } from "../quiz-schema";
import { ERRORS, isValidEmail, isValidPhone } from "../validators";

/**
 * Шаг 01 · Контактные данные.
 * Required fields (per PDF asterisks): Организация, ФИО, Должность,
 * Email, Телефон. City is optional.
 *
 * Validation strategy:
 *   - Required fields: show «Обязательное поле» after the field has
 *     been touched (on blur) AND is still empty
 *   - Email: regex shape check; «Проверьте формат email» when
 *     non-empty-and-invalid after blur
 *   - Phone: masked to +7 (___) ___-__-__ as the user types; error
 *     shown if fewer than 10 subscriber digits after blur
 *
 * The page-level canAdvance in QuizSection has its own gate that
 * doesn't depend on `touched` — touching just controls whether the
 * user sees the error red before attempting to advance.
 */
export function StepContact({
  data,
  onChange,
}: {
  data: QuizData;
  onChange: (p: Partial<QuizData>) => void;
}) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const mark = (key: string) =>
    setTouched((t) => (t[key] ? t : { ...t, [key]: true }));

  const err = {
    org: touched.org && !data.org?.trim() ? ERRORS.required : undefined,
    fullName:
      touched.fullName && !data.fullName?.trim() ? ERRORS.required : undefined,
    role: touched.role && !data.role?.trim() ? ERRORS.required : undefined,
    email: touched.email
      ? !data.email?.trim()
        ? ERRORS.required
        : !isValidEmail(data.email)
          ? ERRORS.email
          : undefined
      : undefined,
    phone: touched.phone
      ? !data.phone?.trim()
        ? ERRORS.required
        : !isValidPhone(data.phone)
          ? ERRORS.phone
          : undefined
      : undefined,
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      <FieldInput
        label="Организация"
        required
        value={data.org}
        onChange={(v) => onChange({ org: v })}
        onBlur={() => mark("org")}
        error={err.org}
        placeholder="ООО «Строй-проект»"
      />
      <FieldInput
        label="Фамилия, имя, отчество"
        required
        value={data.fullName}
        onChange={(v) => onChange({ fullName: v })}
        onBlur={() => mark("fullName")}
        error={err.fullName}
        placeholder="Иванов Иван Иванович"
      />
      <FieldInput
        label="Должность"
        required
        value={data.role}
        onChange={(v) => onChange({ role: v })}
        onBlur={() => mark("role")}
        error={err.role}
        placeholder="Главный инженер"
      />
      <FieldInput
        label="Email"
        type="email"
        required
        value={data.email}
        onChange={(v) => onChange({ email: v })}
        onBlur={() => mark("email")}
        error={err.email}
        placeholder="name@company.ru"
      />
      <FieldInput
        label="Контактный телефон"
        type="tel"
        required
        mask="phone"
        value={data.phone}
        onChange={(v) => onChange({ phone: v })}
        onBlur={() => mark("phone")}
        error={err.phone}
        placeholder="+7 (___) ___-__-__"
      />
      <FieldInput
        label="Город"
        value={data.city}
        onChange={(v) => onChange({ city: v })}
        placeholder="Москва"
      />
    </div>
  );
}
