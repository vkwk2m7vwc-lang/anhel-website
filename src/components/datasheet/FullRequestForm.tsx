"use client";

import { useState } from "react";

/**
 * FullRequestForm — the «proper» request form embedded inline at
 * the section where the engineer is ready to submit. NOT a modal,
 * NOT behind a button — visible, fillable, editable.
 *
 * Fields cover the minimum a sales-engineer needs to come back with
 * a real quote:
 *   - Q (расход), m³/h
 *   - H (напор), m
 *   - Среда (clean water / hot water / process)
 *   - Кол-во насосов
 *   - Особые требования (free text — частотный пуск, IP, ABS box, etc)
 *   - Объект (project name)
 *   - Контакт (name + phone or email + role)
 *
 * Submit handler is a no-op for now (logs + visual confirmation).
 * Wiring to /api/quote-request lands when the backend is live.
 */
export function FullRequestForm({ accent = "#1E6FD9" }: { accent?: string }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-[var(--color-hairline)] bg-[var(--color-surface-1)] p-8 text-center">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: accent }}
        >
          ЗАЯВКА ОТПРАВЛЕНА
        </p>
        <p className="mt-3 text-[15px] leading-snug text-[var(--color-secondary)]">
          Инженер подберёт конфигурацию по вашим параметрам и пришлёт КП на указанную почту.
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55">
          СРЕДНЕЕ ВРЕМЯ ОТВЕТА: 15 МИНУТ В РАБОЧЕЕ ВРЕМЯ
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="border border-[var(--color-hairline)] p-6 md:p-8"
    >
      {/* Two-column grid for hydraulic params */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <Field label="Q, расход (м³/ч)" name="q" placeholder="напр. 25" required />
        <Field label="H, напор (м)" name="h" placeholder="напр. 80" required />
        <Field
          label="Среда"
          name="medium"
          placeholder="ХВС / ГВС / питьевая / технологическая"
        />
        <Field label="Кол-во насосов" name="pumps" placeholder="напр. 3+1" />
      </div>

      {/* Object + contact */}
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <Field
          label="Объект"
          name="object"
          placeholder="название объекта или ТЗ"
        />
        <Field
          label="Кол-во рабочих часов в сутки"
          name="duty"
          placeholder="напр. 24/7"
        />
      </div>

      <div className="mt-5">
        <label className="block">
          <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55">
            ОСОБЫЕ ТРЕБОВАНИЯ
          </span>
          <textarea
            name="notes"
            placeholder="частотное регулирование на каждый насос, IP55, шумопоглощающий шкаф, итд."
            rows={3}
            className="mt-1 block w-full resize-none border-b border-[var(--color-hairline)] bg-transparent py-2 text-[14px] text-[var(--color-secondary)] outline-none transition-colors placeholder:text-[var(--color-secondary)]/30 focus:border-[var(--accent-water)]"
          />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <Field label="Имя и компания" name="contact" placeholder="Иван Петров, ООО Стройсервис" required />
        <Field
          label="Email или телефон"
          name="reach"
          type="email"
          placeholder="ivan@example.ru"
          required
        />
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="font-mono text-[10px] uppercase leading-[1.6] tracking-[0.14em] text-[var(--color-secondary)]/55">
          ОТВЕТ ИНЖЕНЕРА В ТЕЧЕНИЕ 15 МИНУТ В РАБОЧЕЕ ВРЕМЯ.
          <br />
          МОЖНО ПРИЛОЖИТЬ ОПРОСНЫЙ ЛИСТ В ОТВЕТЕ НА ПИСЬМО.
        </p>

        <button
          type="submit"
          className="inline-flex items-center justify-between gap-3 border bg-[var(--accent-water)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-85"
          style={{ borderColor: accent, background: accent }}
        >
          <span>ОТПРАВИТЬ ЗАПРОС</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55">
        <span>{label}</span>
        {required ? (
          <span style={{ color: "var(--accent-water)" }}>*</span>
        ) : null}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full border-b border-[var(--color-hairline)] bg-transparent py-2 text-[14px] text-[var(--color-secondary)] outline-none transition-colors placeholder:text-[var(--color-secondary)]/30 focus:border-[var(--accent-water)]"
      />
    </label>
  );
}
