/**
 * Fallback submit path — build a `mailto:` URL from the quiz data
 * so the user's own mail client sends the inquiry until the real
 * backend (Resend + Telegram + Turnstile) ships.
 *
 * Why mailto vs a mock submit flow:
 *   - No lying about «Заявка принята» when nothing was received
 *   - User's outbox has a copy — they can re-send / forward
 *   - Zero backend surface to maintain for a stopgap
 *
 * Trade-offs:
 *   - Opens the OS default mail client, which might not be set up
 *     on a fresh corporate laptop; QuizSuccess panel covers this
 *     case with direct phone/email fallback lines
 *   - Some browsers silently block mailto: without a user-initiated
 *     click — we call it from the button's onClick, so that's fine
 */

import { CONTACTS } from "@/lib/contacts";
import type {
  QuizData,
  SystemType,
  WaterSource,
  ControlMode,
  ModuleHousing,
  DataTransferProtocol,
  OptionFlag,
} from "./quiz-schema";

/** Human-readable labels for enum values — used in mailto body. */
const SYSTEM_LABEL: Record<SystemType, string> = {
  water: "Водоснабжение",
  "fire-drencher": "Пожаротушение — дренчерное",
  "fire-sprinkler": "Пожаротушение — спринклерное",
  "heating-closed": "Отопление — закрытая",
  "heating-open": "Отопление — открытая",
  aircon: "Кондиционирование",
  wells: "Скважинные насосы в кожухе",
  combined: "Совмещённая (пожар + водоснабжение)",
  other: "Другое",
};

const WATER_SOURCE_LABEL: Record<WaterSource, string> = {
  reservoir: "Водоём (открытый резервуар)",
  underground: "Подземный резервуар",
  "semi-underground": "Полуподземный резервуар",
  "above-ground": "Наземный резервуар",
};

const CONTROL_LABEL: Record<ControlMode, string> = {
  "vfd-controller": "Частотное с контроллером",
  "vfd-per-pump": "Частотное на каждый насос с контроллером",
  "vfd-no-controller": "Частотное без контроллера",
  "relay-controller": "Релейное с контроллером",
  "relay-softstart": "Релейное + плавный пуск",
};

const HOUSING_LABEL: Record<ModuleHousing, string> = {
  container: "Контейнер",
  "barrel-fiberglass-vertical": "Бочка · стеклопластик · вертикальная",
  "barrel-fiberglass-horizontal": "Бочка · стеклопластик · горизонтальная",
  "barrel-metal-vertical": "Бочка · металл · вертикальная",
  "barrel-metal-horizontal": "Бочка · металл · горизонтальная",
};

const PROTOCOL_LABEL: Record<DataTransferProtocol, string> = {
  profibus: "Profibus",
  modbus: "Modbus",
  ethernet: "Ethernet",
  gsm: "GSM",
  other: "Другое",
};

const OPTION_LABEL: Record<OptionFlag, string> = {
  "power-per-pump-no-avr": "Ввод питания на каждый насос без АВР",
  "power-dual-input-avr": "Два ввода питания с АВР",
  "outdoor-uxl1-uxl2": "Уличное исполнение шкафа (УХЛ1, УХЛ2)",
  "collector-diff": "Разный диаметр вход/выход коллекторов",
};

/**
 * Compose a multi-line body string from non-empty quiz fields.
 * Keeps section headers so the mail is scan-able when it lands
 * in ANHEL®'s inbox.
 */
function composeBody(data: QuizData): string {
  const lines: string[] = [];
  const push = (label: string, value: string | undefined) => {
    if (value && value.toString().trim()) {
      lines.push(`${label}: ${value}`);
    }
  };

  lines.push("Здравствуйте!");
  lines.push("");
  lines.push("Параметры для подбора насосной станции пожаротушения:");
  lines.push("");

  lines.push("— Контактные данные —");
  push("Организация", data.org);
  push("ФИО", data.fullName);
  push("Должность", data.role);
  push("Email", data.email);
  push("Телефон", data.phone);
  push("Город", data.city);
  lines.push("");

  lines.push("— Объект и тип системы —");
  push("Объект", data.objectName);
  if (data.systemType) push("Тип системы", SYSTEM_LABEL[data.systemType]);
  push("Система (если «другое»)", data.systemTypeOther);
  push("Требуемый расход, м³/ч", data.flow);
  push("Расход насоса подпитки, м³/ч", data.feedFlow);
  push("Расход при водоснабжении, м³/ч", data.combinedFlowWater);
  push("Расход при пожаротушении, м³/ч", data.combinedFlowFire);
  lines.push("");

  lines.push("— Гидравлика —");
  push("Подпор на входе, м.в.ст.", data.inletHead);
  if (data.waterSource)
    push("Забор воды", WATER_SOURCE_LABEL[data.waterSource]);
  push("Hmin, м.вод.ст.", data.hMin);
  push("Hmax, м.вод.ст.", data.hMax);
  push("Напор на выходе, м.в.ст.", data.outletHead);
  push("Напор на выходе насоса подпитки, м.в.ст.", data.feedOutletHead);
  push("Напор при водоснабжении, м.в.с.", data.combinedOutletWater);
  push("Напор при пожаротушении, м.в.с.", data.combinedOutletFire);
  push("Макс. давление, бар", data.maxPressure);
  push("Жидкость", data.fluid);
  push("Температура жидкости, °C", data.fluidTemp);
  lines.push("");

  lines.push("— Насосы и управление —");
  push("Рабочих насосов", data.workingPumps);
  push("Резервных насосов", data.standbyPumps);
  if (data.control) push("Тип управления", CONTROL_LABEL[data.control]);
  lines.push("");

  lines.push("— Опции и коммутация —");
  push("Задвижки с электроприводом", data.valvesElectric);
  push("Число задвижек", data.valveCount);
  push("Марка задвижек", data.valveBrand);
  if (data.options && data.options.length > 0) {
    lines.push(
      `Опции: ${data.options.map((o) => OPTION_LABEL[o]).join("; ")}`,
    );
  }
  push("Диаметры коллекторов (Ду)", data.collectorDiff);
  if (data.dataTransfer && data.dataTransfer.length > 0) {
    lines.push(
      `Передача данных: ${data.dataTransfer
        .map((p) => PROTOCOL_LABEL[p])
        .join("; ")}`,
    );
  }
  push("Передача данных (другое)", data.dataTransferOther);
  if (data.moduleHousing)
    push("Исполнение в ёмкости", HOUSING_LABEL[data.moduleHousing]);
  lines.push("");

  if (data.extra && data.extra.trim()) {
    lines.push("— Дополнительно —");
    lines.push(data.extra.trim());
    lines.push("");
  }

  lines.push("Спасибо!");

  return lines.join("\n");
}

/**
 * Build a complete `mailto:` href ready to be assigned to
 * `window.location.href` or `<a href>`.
 */
export function buildMailtoHref(data: QuizData): string {
  const subject = "Заявка с сайта — Насосная станция пожаротушения ANHEL";
  const body = composeBody(data);
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams uses '+' for spaces, but mailto: expects '%20' for
  // maximum cross-client compatibility. Replace manually.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${CONTACTS.email}?${query}`;
}
