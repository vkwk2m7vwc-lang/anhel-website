"use client";

import { ConsentCheckbox, FieldTextarea } from "../QuizFields";
import type { QuizData } from "../quiz-schema";

/**
 * Шаг 06 · Дополнительно — PDF «Дополнительные сведения».
 * Free-form textarea + consent checkbox. The "submit" button lives
 * in the section's footer (QuizSection), not inside this step.
 */
export function StepExtra({
  data,
  onChange,
}: {
  data: QuizData;
  onChange: (p: Partial<QuizData>) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <FieldTextarea
        label="Дополнительные сведения"
        rows={6}
        value={data.extra}
        onChange={(v) => onChange({ extra: v })}
        placeholder="Особенности объекта, сроки, ограничения по месту монтажа — всё что важно для подбора"
      />

      <ConsentCheckbox
        checked={Boolean(data.consent)}
        onToggle={() => onChange({ consent: !data.consent })}
      >
        Нажимая «Отправить заявку», я даю согласие на обработку персональных
        данных и подтверждаю, что ознакомлен(а) с политикой обработки данных.
      </ConsentCheckbox>
    </div>
  );
}
