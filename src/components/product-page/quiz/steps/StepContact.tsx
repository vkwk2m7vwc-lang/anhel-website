"use client";

import { FieldInput } from "../QuizFields";
import type { QuizData } from "../quiz-schema";

/**
 * Шаг 01 · Контактные данные — PDF section «Контактные данные».
 * Required fields (per PDF asterisks): Организация, ФИО, Должность,
 * Email, Телефон. City is optional.
 */
export function StepContact({
  data,
  onChange,
}: {
  data: QuizData;
  onChange: (p: Partial<QuizData>) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      <FieldInput
        label="Организация"
        required
        value={data.org}
        onChange={(v) => onChange({ org: v })}
        placeholder="ООО «Строй-проект»"
      />
      <FieldInput
        label="Фамилия, имя, отчество"
        required
        value={data.fullName}
        onChange={(v) => onChange({ fullName: v })}
        placeholder="Иванов Иван Иванович"
      />
      <FieldInput
        label="Должность"
        required
        value={data.role}
        onChange={(v) => onChange({ role: v })}
        placeholder="Главный инженер"
      />
      <FieldInput
        label="Email"
        type="email"
        required
        value={data.email}
        onChange={(v) => onChange({ email: v })}
        placeholder="name@company.ru"
      />
      <FieldInput
        label="Контактный телефон"
        type="tel"
        required
        value={data.phone}
        onChange={(v) => onChange({ phone: v })}
        placeholder="+7 (___) ___ __ __"
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
