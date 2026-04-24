"use client";

import { FieldInput, RadioCard, FieldGroupTitle } from "../QuizFields";
import type { QuizData, WaterSource } from "../quiz-schema";

/**
 * Шаг 03 · Гидравлика — PDF «Существующий напор на входе»,
 * «Требуемый напор на выходе», «Перекачиваемая жидкость».
 *
 * The PDF shows four small intake pictograms with labels; we keep the
 * four options as plain text cards for now and can promote to
 * icon-cards later (SVG in our style) without changing the data
 * model.
 */
export function StepHydraulics({
  data,
  onChange,
}: {
  data: QuizData;
  onChange: (p: Partial<QuizData>) => void;
}) {
  const setSource = (waterSource: WaterSource) => onChange({ waterSource });
  const showSprinklerFeed = data.systemType === "fire-sprinkler";
  const showCombined = data.systemType === "combined";

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <FieldInput
          label="Существующий напор на входе (подпор)"
          unit="м.в.ст."
          type="number"
          width="short"
          value={data.inletHead}
          onChange={(v) => onChange({ inletHead: v })}
        />
      </div>

      <div>
        <FieldGroupTitle>Забор воды из водоёма или резервуара</FieldGroupTitle>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <RadioCard<WaterSource>
            value="reservoir"
            selected={data.waterSource}
            onSelect={setSource}
            label="Водоём"
            description="Открытый резервуар"
          />
          <RadioCard<WaterSource>
            value="underground"
            selected={data.waterSource}
            onSelect={setSource}
            label="Подземный резервуар"
            description="Полностью заглублён"
          />
          <RadioCard<WaterSource>
            value="semi-underground"
            selected={data.waterSource}
            onSelect={setSource}
            label="Полуподземный резервуар"
            description="Частично заглублён"
          />
          <RadioCard<WaterSource>
            value="above-ground"
            selected={data.waterSource}
            onSelect={setSource}
            label="Наземный резервуар"
            description="На поверхности"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <FieldInput
            label="Hmin"
            unit="м.вод.ст."
            type="number"
            width="short"
            value={data.hMin}
            onChange={(v) => onChange({ hMin: v })}
          />
          <FieldInput
            label="Hmax"
            unit="м.вод.ст."
            type="number"
            width="short"
            value={data.hMax}
            onChange={(v) => onChange({ hMax: v })}
          />
        </div>
      </div>

      <div>
        <FieldGroupTitle>Требуемый напор</FieldGroupTitle>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <FieldInput
            label="На выходе из установки (без учёта подпора)"
            unit="м.в.ст."
            type="number"
            width="short"
            value={data.outletHead}
            onChange={(v) => onChange({ outletHead: v })}
          />
          {showSprinklerFeed ? (
            <FieldInput
              label="На выходе из насоса подпитки (спринклерная)"
              unit="м.в.ст."
              type="number"
              width="short"
              value={data.feedOutletHead}
              onChange={(v) => onChange({ feedOutletHead: v })}
            />
          ) : null}
          {showCombined ? (
            <>
              <FieldInput
                label="При водоснабжении"
                unit="м.в.с."
                type="number"
                width="short"
                value={data.combinedOutletWater}
                onChange={(v) => onChange({ combinedOutletWater: v })}
              />
              <FieldInput
                label="При пожаротушении"
                unit="м.в.с."
                type="number"
                width="short"
                value={data.combinedOutletFire}
                onChange={(v) => onChange({ combinedOutletFire: v })}
              />
            </>
          ) : null}
          <FieldInput
            label="Максимальное давление в системе"
            unit="бар"
            type="number"
            width="short"
            value={data.maxPressure}
            onChange={(v) => onChange({ maxPressure: v })}
          />
        </div>
      </div>

      <div>
        <FieldGroupTitle>Перекачиваемая жидкость</FieldGroupTitle>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <FieldInput
            label="Жидкость (если не чистая вода — концентрация)"
            value={data.fluid}
            onChange={(v) => onChange({ fluid: v })}
            placeholder="Вода / пропиленгликоль 30%"
          />
          <FieldInput
            label="Температура жидкости"
            unit="°C"
            type="number"
            width="short"
            value={data.fluidTemp}
            onChange={(v) => onChange({ fluidTemp: v })}
          />
        </div>
      </div>
    </div>
  );
}
