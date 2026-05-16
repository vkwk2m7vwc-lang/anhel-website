/**
 * Email-шаблон для менеджера ANHEL — быстрый подбор серии ВПУ.
 *
 * Срабатывает когда клиент жмёт «Получить КП» в форме quick quote на
 * /products/water-treatment/anhel-series. Письмо идёт на
 * QUIZ_RECIPIENT_EMAIL (в тест-фазе — anurin7@gmail.com).
 *
 * Структура по образцу quiz-result.ts (этап 4 v2): renderEmailShell +
 * renderCustomerBlock + renderPdfCta. Sections содержат «Параметры
 * подбора» (расход + подобранная модификация). PDF с КП клиента
 * прикладывается отдельным вложением.
 *
 * Тема письма: `[ANHEL] Новый КП — Серия ВПУ (Тип N) — <объект 40 char>`.
 */
import {
  renderEmailShell,
  renderCustomerBlock,
  renderSection,
  renderPdfCta,
  type EmailLocale,
  type EmailCustomer,
} from "./_layout";

export type VpuQuoteQuickEmailData = {
  /** Visitor's UI locale — shown as a tag in the header. */
  locale: EmailLocale;
  /** Hex колоr продукта (treatment). */
  accent: string;
  customer: EmailCustomer;
  /** Введённая клиентом производительность, м³/ч. */
  flow: number;
  /** Имя модификации (ВПУ ANHEL (3 линии)). */
  modificationName: string;
  /** Подпись «Тип N» — для темы письма. */
  modificationType: string;
  /** Диапазон расхода модификации (для строки «Диапазон»). */
  modificationFlowRange: string;
  /** Застройщик объекта. */
  developerCompany: string;
  /** Кадастровый номер участка — опционально. */
  cadastralNumber?: string;
};

export function renderVpuQuoteQuickEmail(data: VpuQuoteQuickEmailData): {
  subject: string;
  html: string;
} {
  const objectShort = (data.customer.objectAddress ?? "").trim().slice(0, 40);
  const subjectObject = objectShort || data.customer.company || data.customer.name;
  const subject = `[ANHEL] Новый КП — Серия ВПУ (${data.modificationType}) — ${subjectObject}`;
  const heading = "Новый КП по серии ВПУ ANHEL";

  // Sections: «Параметры подбора» + «Проектная цепочка»
  const paramsSection = renderSection(
    {
      title: "Параметры подбора",
      rows: [
        {
          label: "Введённый расход",
          value: `${formatFlowRu(data.flow)} м³/ч`,
        },
        {
          label: "Подобранная модификация",
          value: data.modificationName,
        },
        {
          label: "Диапазон производительности",
          value: data.modificationFlowRange,
        },
      ],
    },
    data.accent,
  );

  // Опциональная строка с кадастром — добавляем только если есть.
  // «Подготовлено для» = та же формулировка, что и на титуле PDF.
  const projectChainRows = [
    { label: "Застройщик", value: data.developerCompany },
    { label: "Подготовлено для", value: data.customer.company ?? "—" },
    { label: "Город", value: data.customer.city ?? "—" },
    { label: "Объект (адрес)", value: data.customer.objectAddress ?? "—" },
  ];
  if (data.cadastralNumber && data.cadastralNumber.trim()) {
    projectChainRows.push({
      label: "Кадастровый №",
      value: data.cadastralNumber,
    });
  }

  const projectChainSection = renderSection(
    {
      title: "Проектная цепочка",
      rows: projectChainRows,
    },
    data.accent,
  );

  const bodyHtml =
    renderCustomerBlock(data.customer, data.accent) +
    paramsSection +
    projectChainSection +
    renderPdfCta(data.accent, {
      title: "Коммерческое предложение приложено к письму",
      note:
        "PDF КП — отдельным вложением. Это тот же файл, который скачал " +
        "клиент после подтверждения предпросмотра. Чтобы перезвонить — кнопка «Reply».",
    });

  const html = renderEmailShell({
    heading,
    locale: data.locale,
    accent: data.accent,
    bodyHtml,
    intro:
      "Клиент воспользовался быстрым подбором на странице серии ВПУ. " +
      "Контакты — ниже, подобранная модификация — в карточке, " +
      "коммерческое предложение — в PDF-вложении.",
  });

  return { subject, html };
}

/** Форматирование расхода в RU-стиле: точка → запятая, 1-2 знака. */
function formatFlowRu(flow: number): string {
  const rounded = Math.round(flow * 100) / 100;
  const str = rounded.toFixed(rounded % 1 === 0 ? 0 : 2);
  return str.replace(/\.?0+$/, "").replace(".", ",");
}
