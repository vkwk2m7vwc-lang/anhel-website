"use client";

import {
  FieldGroupTitle,
  FieldInput,
  FieldRadioGroup,
  RadioCard,
} from "../QuizFields";
import type { ControlMode, QuizData } from "../quiz-schema";

/**
 * Шаг 04 · Насосы и управление — PDF «Количество рабочих/резервных
 * насосов», «Управление». Five control modes verbatim from the PDF.
 */
export function StepPumps({
  data,
  onChange,
}: {
  data: QuizData;
  onChange: (p: Partial<QuizData>) => void;
}) {
  const set = (control: ControlMode) => onChange({ control });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <FieldGroupTitle>Количество насосов</FieldGroupTitle>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <FieldInput
            label="Рабочих (обеспечивают необходимый расход)"
            type="number"
            width="short"
            value={data.workingPumps}
            onChange={(v) => onChange({ workingPumps: v })}
          />
          <FieldInput
            label="Резервных"
            type="number"
            width="short"
            value={data.standbyPumps}
            onChange={(v) => onChange({ standbyPumps: v })}
          />
        </div>
      </div>

      <FieldRadioGroup
        label="Тип управления"
        idPrefix="quiz-control"
        className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
      >
        <RadioCard<ControlMode>
          value="vfd-controller"
          selected={data.control}
          onSelect={set}
          label="Частотное с контроллером"
          description="Общий ПЛК управляет группой"
        />
        <RadioCard<ControlMode>
          value="vfd-per-pump"
          selected={data.control}
          onSelect={set}
          label="Частотное на каждый насос с контроллером"
          description="Индивидуальные VFD + ПЛК"
        />
        <RadioCard<ControlMode>
          value="vfd-no-controller"
          selected={data.control}
          onSelect={set}
          label="Частотное без контроллера"
          description="Автономные преобразователи"
        />
        <RadioCard<ControlMode>
          value="relay-controller"
          selected={data.control}
          onSelect={set}
          label="Релейное с контроллером"
          description="Прямой пуск, ПЛК"
        />
        <RadioCard<ControlMode>
          value="relay-softstart"
          selected={data.control}
          onSelect={set}
          label="Релейное с контроллером + плавный пуск"
          description="ПЛК + soft-starter"
        />
      </FieldRadioGroup>
    </div>
  );
}
