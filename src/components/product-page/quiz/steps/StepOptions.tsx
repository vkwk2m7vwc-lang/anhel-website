"use client";

import {
  CheckboxCard,
  FieldInput,
  FieldGroupTitle,
  RadioCard,
} from "../QuizFields";
import type {
  DataTransferProtocol,
  ModuleHousing,
  OptionFlag,
  QuizData,
} from "../quiz-schema";

/**
 * Шаг 05 · Опции и коммутация — PDF «Управление и коммутация»,
 * «Опции», «Передача данных», «Модульное исполнение в ёмкости».
 *
 * The PDF mixes radios and checkboxes across these groups. We keep
 * the distinction:
 *   - валвес electric (да/нет)           — radio
 *   - options                             — multi-select
 *   - data transfer                       — multi-select
 *   - module housing                      — radio (5 combinations)
 */
export function StepOptions({
  data,
  onChange,
}: {
  data: QuizData;
  onChange: (p: Partial<QuizData>) => void;
}) {
  // Multi-select helpers — toggle flag in options / dataTransfer arrays.
  const toggleOption = (flag: OptionFlag) => {
    const current = data.options ?? [];
    const next = current.includes(flag)
      ? current.filter((f) => f !== flag)
      : [...current, flag];
    onChange({ options: next });
  };
  const toggleProtocol = (p: DataTransferProtocol) => {
    const current = data.dataTransfer ?? [];
    const next = current.includes(p)
      ? current.filter((f) => f !== p)
      : [...current, p];
    onChange({ dataTransfer: next });
  };

  const setHousing = (moduleHousing: ModuleHousing) =>
    onChange({ moduleHousing });

  const optsSet = data.options ?? [];
  const protoSet = data.dataTransfer ?? [];

  return (
    <div className="flex flex-col gap-8">
      {/* Задвижки */}
      <div>
        <FieldGroupTitle>Задвижки с электроприводом</FieldGroupTitle>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <RadioCard<"yes" | "no">
            value="yes"
            selected={data.valvesElectric}
            onSelect={(v) => onChange({ valvesElectric: v })}
            label="Да"
          />
          <RadioCard<"yes" | "no">
            value="no"
            selected={data.valvesElectric}
            onSelect={(v) => onChange({ valvesElectric: v })}
            label="Нет"
          />
        </div>
        {data.valvesElectric === "yes" ? (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <FieldInput
              label="Число задвижек"
              type="number"
              width="short"
              value={data.valveCount}
              onChange={(v) => onChange({ valveCount: v })}
            />
            <FieldInput
              label="Марка и тип применяемых задвижек"
              value={data.valveBrand}
              onChange={(v) => onChange({ valveBrand: v })}
              placeholder="Например, Ду 100, «Броен»"
            />
          </div>
        ) : null}
      </div>

      {/* Опции */}
      <div>
        <FieldGroupTitle>Опции</FieldGroupTitle>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <CheckboxCard
            label="Ввод питания на каждый насос без АВР"
            checked={optsSet.includes("power-per-pump-no-avr")}
            onToggle={() => toggleOption("power-per-pump-no-avr")}
          />
          <CheckboxCard
            label="Два ввода питания с АВР"
            checked={optsSet.includes("power-dual-input-avr")}
            onToggle={() => toggleOption("power-dual-input-avr")}
          />
          <CheckboxCard
            label="Уличное исполнение шкафа (УХЛ1, УХЛ2)"
            checked={optsSet.includes("outdoor-uxl1-uxl2")}
            onToggle={() => toggleOption("outdoor-uxl1-uxl2")}
          />
          <CheckboxCard
            label="Разный диаметр вход/выход коллекторов"
            checked={optsSet.includes("collector-diff")}
            onToggle={() => toggleOption("collector-diff")}
          />
        </div>
        {optsSet.includes("collector-diff") ? (
          <div className="mt-4">
            <FieldInput
              label="Диаметры (Ду вход / Ду выход)"
              value={data.collectorDiff}
              onChange={(v) => onChange({ collectorDiff: v })}
              placeholder="Ду 150 / Ду 100"
            />
          </div>
        ) : null}
      </div>

      {/* Передача данных */}
      <div>
        <FieldGroupTitle>Передача данных</FieldGroupTitle>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <CheckboxCard
            label="Profibus"
            checked={protoSet.includes("profibus")}
            onToggle={() => toggleProtocol("profibus")}
          />
          <CheckboxCard
            label="Modbus"
            checked={protoSet.includes("modbus")}
            onToggle={() => toggleProtocol("modbus")}
          />
          <CheckboxCard
            label="Ethernet"
            checked={protoSet.includes("ethernet")}
            onToggle={() => toggleProtocol("ethernet")}
          />
          <CheckboxCard
            label="GSM"
            checked={protoSet.includes("gsm")}
            onToggle={() => toggleProtocol("gsm")}
          />
          <CheckboxCard
            label="Другое"
            checked={protoSet.includes("other")}
            onToggle={() => toggleProtocol("other")}
          />
        </div>
        {protoSet.includes("other") ? (
          <div className="mt-4">
            <FieldInput
              label="Укажите протокол"
              value={data.dataTransferOther}
              onChange={(v) => onChange({ dataTransferOther: v })}
              placeholder="CAN, OPC-UA, …"
            />
          </div>
        ) : null}
      </div>

      {/* Модульное исполнение */}
      <div>
        <FieldGroupTitle>Модульное исполнение в ёмкости</FieldGroupTitle>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <RadioCard<ModuleHousing>
            value="container"
            selected={data.moduleHousing}
            onSelect={setHousing}
            label="Контейнер"
          />
          <RadioCard<ModuleHousing>
            value="barrel-fiberglass-vertical"
            selected={data.moduleHousing}
            onSelect={setHousing}
            label="Бочка · стеклопластик · вертикальная"
          />
          <RadioCard<ModuleHousing>
            value="barrel-fiberglass-horizontal"
            selected={data.moduleHousing}
            onSelect={setHousing}
            label="Бочка · стеклопластик · горизонтальная"
          />
          <RadioCard<ModuleHousing>
            value="barrel-metal-vertical"
            selected={data.moduleHousing}
            onSelect={setHousing}
            label="Бочка · металл · вертикальная"
          />
          <RadioCard<ModuleHousing>
            value="barrel-metal-horizontal"
            selected={data.moduleHousing}
            onSelect={setHousing}
            label="Бочка · металл · горизонтальная"
          />
        </div>
      </div>
    </div>
  );
}
