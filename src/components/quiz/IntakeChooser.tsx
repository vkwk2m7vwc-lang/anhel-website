'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

/**
 * Интерактивный chooser для «Забор воды из водоёма или резервуара».
 * Заменяет 4 обычных чекбокса (intake_pond / intake_under / intake_semi /
 * intake_above) на 4 кликабельных карточки с SVG-схематичной иконкой
 * каждого типа резервуара. Клик по карточке — toggle соответствующего
 * AcroForm-поля. Сами чекбоксы продолжают существовать в форме
 * (имена полей те же), просто рендер другой.
 *
 * Зачем: PDF-картинка резервуаров в вебе нечитаема и непонятно куда
 * кликать. Карточки решают и узнаваемость (свой типовой силуэт), и
 * affordance (явная кликабельность), и a11y (нативные input checkbox).
 */
export function IntakeChooser() {
  const { control } = useFormContext();

  const items: Array<{
    name: string;
    label: string;
    /** SVG path/elements для миниатюры */
    icon: React.ReactNode;
  }> = [
    {
      name: 'intake_pond',
      label: 'Водоём',
      icon: <PondIcon />,
    },
    {
      name: 'intake_under',
      label: 'Подземный',
      icon: <UndergroundIcon />,
    },
    {
      name: 'intake_semi',
      label: 'Полузаглублённый',
      icon: <SemiBuriedIcon />,
    },
    {
      name: 'intake_above',
      label: 'Наземный',
      icon: <AboveGroundIcon />,
    },
  ];

  return (
    <div className="sm:col-span-2">
      <p className="mb-3 text-sm text-secondary/75">Забор воды из водоёма или резервуара</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((it) => (
          <Controller
            key={it.name}
            name={it.name}
            control={control}
            render={({ field }) => {
              const checked = !!field.value;
              return (
                <label
                  className={cn(
                    'group relative flex cursor-pointer flex-col items-center gap-3 border p-3 transition-colors',
                    checked
                      ? 'border-[color:var(--accent-current)] bg-[color:color-mix(in_srgb,var(--accent-current)_8%,transparent)]'
                      : 'border-[color:var(--color-hairline)] hover:border-secondary/40 hover:bg-[color:var(--color-hover-tint)]',
                  )}
                >
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={checked}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      'pointer-events-none aspect-[3/2] w-full transition-colors',
                      checked ? 'text-[color:var(--accent-current)]' : 'text-secondary/60',
                    )}
                    aria-hidden="true"
                  >
                    {it.icon}
                  </span>
                  <span
                    className={cn(
                      'text-center text-xs sm:text-sm transition-colors',
                      checked ? 'text-secondary' : 'text-secondary/65',
                    )}
                  >
                    {it.label}
                  </span>
                  {/* check-mark indicator справа сверху для чёткого state */}
                  <span
                    className={cn(
                      'absolute right-2 top-2 inline-block h-3 w-3 rounded-full border transition-all',
                      checked
                        ? 'border-[color:var(--accent-current)] bg-[color:var(--accent-current)] scale-100'
                        : 'border-[color:var(--color-hairline)] scale-90',
                    )}
                    aria-hidden="true"
                  />
                </label>
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
 * SVG-миниатюры типов резервуара. Используют currentColor — цвет
 * наследуется от родителя (text-secondary/60 или accent-current).
 * Все на единой стилистике: hairline-stroke, без заливок.
 * ============================================================ */

function PondIcon() {
  return (
    <svg viewBox="0 0 90 60" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-full w-full">
      {/* линия земли */}
      <path d="M0 38 L18 38 L26 30 L42 30 L42 50 L0 50 Z" />
      {/* вода в водоёме */}
      <path d="M44 32 H88" strokeDasharray="3 3" />
      <path d="M48 36 H86" strokeDasharray="3 3" opacity="0.7" />
      <path d="M52 40 H82" strokeDasharray="3 3" opacity="0.5" />
      {/* насос */}
      <circle cx="60" cy="22" r="4" />
      {/* труба от насоса в воду */}
      <path d="M60 26 L60 32" />
    </svg>
  );
}

function UndergroundIcon() {
  return (
    <svg viewBox="0 0 90 60" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-full w-full">
      {/* линия земли */}
      <path d="M0 28 H90" />
      {/* подземный резервуар (овал под землёй) */}
      <ellipse cx="45" cy="42" rx="22" ry="10" />
      {/* насос на поверхности */}
      <circle cx="20" cy="20" r="4" />
      {/* труба насос → резервуар */}
      <path d="M20 24 L20 36 L25 42" />
      {/* штрихи земли */}
      <path d="M5 32 L8 35 M14 32 L17 35 M70 32 L73 35 M80 32 L83 35" opacity="0.5" />
    </svg>
  );
}

function SemiBuriedIcon() {
  return (
    <svg viewBox="0 0 90 60" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-full w-full">
      {/* линия земли */}
      <path d="M0 30 H90" />
      {/* полузаглублённая ёмкость (часть выше, часть ниже линии) */}
      <rect x="28" y="18" width="40" height="28" />
      {/* линия раздела (граница земли пересекает резервуар посередине) */}
      <path d="M28 30 H68" opacity="0.4" />
      {/* насос на поверхности */}
      <circle cx="14" cy="22" r="4" />
      {/* труба */}
      <path d="M14 26 L14 38 L28 38" />
      {/* штрихи земли */}
      <path d="M2 34 L5 37 M76 34 L79 37 M84 34 L87 37" opacity="0.5" />
    </svg>
  );
}

function AboveGroundIcon() {
  return (
    <svg viewBox="0 0 90 60" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-full w-full">
      {/* линия земли */}
      <path d="M0 50 H90" />
      {/* наземная ёмкость целиком над землёй */}
      <rect x="32" y="14" width="40" height="36" />
      {/* насос рядом на земле */}
      <circle cx="16" cy="42" r="4" />
      {/* труба насос → бак */}
      <path d="M20 42 L32 42" />
      {/* штрихи земли */}
      <path d="M2 54 L5 57 M76 54 L79 57 M84 54 L87 57" opacity="0.5" />
    </svg>
  );
}
