import {
  VPU_ANHEL_MODIFICATIONS,
  VPU_ANHEL_MAX_TYPICAL_FLOW,
  type VpuModification,
} from "@/content/products/vpu-anhel-series-modifications";

/**
 * Подбор модификации ВПУ ANHEL по требуемому расходу.
 *
 * Логика интервалов (по таблице заказчика):
 *   - flow > 0   и flow ≤ 21,9 → Тип 2 (2 линии)
 *   - flow > 21,9 и ≤ 35,9    → Тип 3
 *   - flow > 35,9 и ≤ 45,9    → Тип 4
 *   - flow > 45,9 и ≤ 55,9    → Тип 5
 *   - flow ≤ 0 или > 55,9     → null (нестандарт / некорректный ввод)
 *
 * Возвращает `null` если расход вне типового диапазона серии —
 * консумер показывает алерт «Свяжитесь с нами для нестандартной
 * модификации». Это сознательный выбор: лучше явно сказать клиенту
 * «нужно вручную», чем подсунуть Тип 5 на 80 м³/ч и потом
 * разруливать претензии.
 */
export function selectVpuModification(
  flowM3h: number,
): VpuModification | null {
  if (!Number.isFinite(flowM3h) || flowM3h <= 0) return null;
  if (flowM3h > VPU_ANHEL_MAX_TYPICAL_FLOW) return null;
  return (
    VPU_ANHEL_MODIFICATIONS.find(
      (m) => flowM3h > m.minFlow && flowM3h <= m.maxFlow,
    ) ?? null
  );
}

/**
 * Транслитерация русского текста в латиницу для использования в
 * именах файлов и subject-ах писем. Без диакритики, разделитель — «-».
 *
 * - Кириллица → латиница по стандартной упрощённой схеме
 * - Не-алфавитные символы (пробелы, запятые, точки, скобки) → «-»
 * - Подряд идущие «-» свёртываются в один
 * - Обрезаются «-» по краям
 */
export function transliterateForFilename(input: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e",
    ж: "zh", з: "z", и: "i", й: "i", к: "k", л: "l", м: "m",
    н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
    ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "",
    ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
    А: "A", Б: "B", В: "V", Г: "G", Д: "D", Е: "E", Ё: "E",
    Ж: "Zh", З: "Z", И: "I", Й: "I", К: "K", Л: "L", М: "M",
    Н: "N", О: "O", П: "P", Р: "R", С: "S", Т: "T", У: "U",
    Ф: "F", Х: "H", Ц: "Ts", Ч: "Ch", Ш: "Sh", Щ: "Sch", Ъ: "",
    Ы: "Y", Ь: "", Э: "E", Ю: "Yu", Я: "Ya",
  };
  let out = "";
  for (const ch of input.normalize("NFC")) {
    out += map[ch] ?? ch;
  }
  return out
    .replace(/[^A-Za-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Имя файла PDF ТКП. Формат:
 *   TKP-ANHEL-VPU-{N}-lines-{transliteratedObject}-{YYYY-MM-DD}.pdf
 *
 * Объект транслитерируется и обрезается до 60 символов чтобы итоговое
 * имя файла не вылазило за лимиты файловых систем.
 */
export function buildKpFilename({
  modification,
  objectAddress,
  date,
}: {
  modification: VpuModification;
  objectAddress: string;
  date: Date;
}): string {
  const obj = transliterateForFilename(objectAddress).slice(0, 60) || "object";
  const iso = date.toISOString().slice(0, 10);
  return `TKP-ANHEL-VPU-${modification.linesCount}-lines-${obj}-${iso}.pdf`;
}
