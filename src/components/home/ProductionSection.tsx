import Link from "next/link";

/**
 * Секция «Производство» — якорь `#production` на главной.
 *
 * Содержимое — финальные тексты v2 из copy.md (A.3):
 *   - метка, заголовок, лид-абзац
 *   - 3 подблока: Конструкторское бюро / Сборочный цех / Испытательный
 *     стенд (горизонтально на md+, вертикально на мобайле; у каждой
 *     карточки — левая акцентная линия #E97132)
 *   - ряд из 4 цифр: от 30 дней · 4 направления · 100% стендовые
 *     испытания · Своё производство и сборка
 *   - CTA «Запросить визит на производство →» ведёт на /contacts
 *     (форма на /contacts пока не умеет читать query — query
 *     добавим, когда форма поддержит pre-fill, в этой волне нет)
 *   - фото-плейсхолдер цеха убран (по правке v2 от 12.05.2026:
 *     «фото с производства пока убери»). Когда придут реальные
 *     фото цеха — вернуть отдельной задачей с next/image-сеткой.
 *
 * Принцип: слово «Москва» нигде не упоминается — ни в текстах
 * подблоков, ни в счётчиках (см. copy.md, общий принцип редактуры).
 */
export function ProductionSection() {
  return (
    <section
      id="production"
      aria-labelledby="production-heading"
      className="scroll-mt-24 border-t border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <p className="mono-tag mb-6">Производство</p>
        <h2
          id="production-heading"
          className="max-w-3xl font-display text-3xl leading-tight md:text-5xl"
        >
          Полный цикл на одной площадке
        </h2>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-secondary)]/75 md:mt-10 md:text-lg">
          Конструкторское бюро, сборочный цех и испытательный стенд под одной
          крышей. От расчёта до отгрузки — без передач между подрядчиками.
        </p>

        {/* 3 подблока. Карточки с левой акцентной линией #E97132 (1.5px).
            На md+ — три в ряд, на мобайле — друг под другом. */}
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          <ProcessCard
            title="Конструкторское бюро"
            body="Расчёт гидравлики, тепловой схемы, подбор оборудования и автоматики под параметры объекта. Готовим рабочую документацию в форматах DWG, PDF, IFC."
          />
          <ProcessCard
            title="Сборочный цех"
            body="Сварка металлоконструкций рам, монтаж насосного и теплообменного оборудования, обвязка трубопроводов, прокладка кабельных трасс, сборка шкафов автоматики. Каждый модуль собирается под конкретный проект — не серийная продукция со склада."
          />
          <ProcessCard
            title="Испытательный стенд"
            body="Каждое изделие проходит гидравлические и электрические испытания до отгрузки. Имитируем рабочие режимы, фиксируем параметры в протоколе. На объект приезжает модуль, готовый к пусконаладке за 1–3 смены."
          />
        </div>

        {/* 4 цифры под подблоками. Стилистика как в About — font-display
            40-56px, accent-fire на знаке «+»/«%», подпись font-mono 11px. */}
        <div
          aria-label="Показатели производства"
          className="mt-14 grid grid-cols-2 gap-6 border-t border-[var(--color-hairline)] pt-10 md:mt-16 md:grid-cols-4 md:gap-10 md:pt-12"
        >
          <Stat value="от 30" unit="дней" caption="Срок производства" />
          <Stat value="4" caption="Направления" />
          <Stat value="100" suffix="%" caption="Стендовые испытания" />
          <Stat value="Своё" caption="Производство и сборка" displayValue />
        </div>

        {/* CTA «Запросить визит на производство». Ведёт на /contacts;
            форма пока не читает query — pre-fill темы добавим, когда
            форма научится читать ?topic= (вне рамок этой волны). */}
        <div className="mt-12 md:mt-16">
          <Link
            href="/contacts"
            data-cursor="hover"
            data-cta="production-visit"
            className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)]"
          >
            Запросить визит на производство
            <span
              aria-hidden="true"
              className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}

/**
 * Карточка подблока процесса (КБ / Цех / Стенд).
 *
 * Левая акцентная линия 1.5px цветом `--accent-fire` (#E97132) —
 * визуальный «фирменный» поджиг, повторяющий accent на счётчиках
 * About. Сам контент: заголовок font-display + lede font-mono +
 * параграф body. Карточка не интерактивна — это контент, не CTA.
 */
function ProcessCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="border-l-[1.5px] border-[var(--accent-fire)] pl-5 md:pl-6">
      <h3 className="font-display text-xl leading-tight text-[var(--color-secondary)] md:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)]/70 md:mt-4 md:text-[15px]">
        {body}
      </p>
    </article>
  );
}

/**
 * Single static stat — крупная цифра + опц. suffix + опц. unit +
 * подпись капсом снизу. Тот же паттерн, что у `AboutSection.Stat`,
 * но локальная копия — две секции на одной странице и общий
 * вынесенный компонент создал бы перекрёстную зависимость
 * между ProductionSection и AboutSection, что неприятно при
 * редактировании одной из них.
 *
 * `displayValue` — флаг для нечисловых значений («Своё»):
 * рендерим font-display а не цифровой шрифт.
 */
function Stat({
  value,
  suffix,
  unit,
  caption,
  displayValue,
}: {
  value: string;
  suffix?: string;
  unit?: string;
  caption: string;
  displayValue?: boolean;
}) {
  return (
    <div>
      <p
        className={`flex items-baseline gap-1 font-display font-medium leading-none text-[var(--color-secondary)] ${
          displayValue
            ? "text-[32px] md:text-[44px]"
            : "text-[40px] md:text-[56px]"
        }`}
      >
        <span>{value}</span>
        {suffix ? (
          <span aria-hidden="true" className="text-[var(--accent-fire)]">
            {suffix}
          </span>
        ) : null}
        {unit ? (
          <span className="ml-1 font-mono text-base font-normal text-[var(--color-secondary)]/70 md:text-lg">
            {unit}
          </span>
        ) : null}
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55 md:mt-4">
        {caption}
      </p>
    </div>
  );
}
