"use client";

import {
  FieldInput,
  FieldRadioGroup,
  FieldTextarea,
  RadioCard,
} from "../QuizFields";
import type { QuizData, SystemType } from "../quiz-schema";

/**
 * Шаг 02 · Объект и тип системы — PDF «Основные данные».
 * Object name + system type radio (8 canonical + «другое»), then
 * flow fields. Sprinkler systems also ask for feed-pump flow; the
 * combined option exposes two separate flow inputs for water supply
 * and fire mode.
 */
export function StepObject({
  data,
  onChange,
}: {
  data: QuizData;
  onChange: (p: Partial<QuizData>) => void;
}) {
  const set = (systemType: SystemType) => onChange({ systemType });

  const showSprinklerFeed = data.systemType === "fire-sprinkler";
  const showCombinedFlows = data.systemType === "combined";

  return (
    <div className="flex flex-col gap-8">
      <FieldTextarea
        label="Название и расположение объекта"
        rows={2}
        value={data.objectName}
        onChange={(v) => onChange({ objectName: v })}
        placeholder="ЖК «Пример», Москва, 1-я очередь"
      />

      <FieldRadioGroup
        label="Тип системы"
        idPrefix="quiz-system-type"
        className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
      >
        <RadioCard<SystemType> value="water" selected={data.systemType} onSelect={set} label="Водоснабжение" />
        <RadioCard<SystemType> value="fire-drencher" selected={data.systemType} onSelect={set} label="Пожаротушение — дренчерное" />
        <RadioCard<SystemType> value="fire-sprinkler" selected={data.systemType} onSelect={set} label="Пожаротушение — спринклерное" />
        <RadioCard<SystemType> value="heating-closed" selected={data.systemType} onSelect={set} label="Отопление — закрытая" />
        <RadioCard<SystemType> value="heating-open" selected={data.systemType} onSelect={set} label="Отопление — открытая" />
        <RadioCard<SystemType> value="aircon" selected={data.systemType} onSelect={set} label="Кондиционирование" />
        <RadioCard<SystemType> value="wells" selected={data.systemType} onSelect={set} label="Скважинные насосы в кожухе" />
        <RadioCard<SystemType> value="combined" selected={data.systemType} onSelect={set} label="Совмещённая (пожар + водоснабжение)" />
        <RadioCard<SystemType> value="other" selected={data.systemType} onSelect={set} label="Другое" />
      </FieldRadioGroup>
      {data.systemType === "other" ? (
        <div>
          <FieldInput
            label="Опишите систему"
            value={data.systemTypeOther}
            onChange={(v) => onChange({ systemTypeOther: v })}
            placeholder="Например, оборотное водоснабжение"
          />
        </div>
      ) : null}

      <div>
        <p className="mt-4 border-t border-[var(--color-hairline)] pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/60">
          Расход
        </p>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <FieldInput
            label="Требуемый расход"
            unit="м³/ч"
            type="number"
            width="short"
            value={data.flow}
            onChange={(v) => onChange({ flow: v })}
          />
          {showSprinklerFeed ? (
            <FieldInput
              label="Расход насоса подпитки (спринклерная)"
              unit="м³/ч"
              type="number"
              width="short"
              value={data.feedFlow}
              onChange={(v) => onChange({ feedFlow: v })}
            />
          ) : null}
          {showCombinedFlows ? (
            <>
              <FieldInput
                label="Расход при водоснабжении"
                unit="м³/ч"
                type="number"
                width="short"
                value={data.combinedFlowWater}
                onChange={(v) => onChange({ combinedFlowWater: v })}
              />
              <FieldInput
                label="Расход при пожаротушении"
                unit="м³/ч"
                type="number"
                width="short"
                value={data.combinedFlowFire}
                onChange={(v) => onChange({ combinedFlowFire: v })}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
