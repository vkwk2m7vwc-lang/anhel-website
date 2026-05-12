import Link from "next/link";
import { useTranslations } from "next-intl";

/**
 * Секция «Производство» — якорь `#production` на главной.
 *
 * Содержимое — финальные тексты v2 из copy.md (A.3):
 *   - метка, заголовок, лид-абзац
 *   - 3 подблока: КБ / Цех / Стенд
 *   - ряд из 4 цифр: от 30 дней / 4 направления / 100% / Своё
 *   - CTA «Запросить визит на производство →» ведёт на /contacts
 *
 * Принцип: слово «Москва» нигде не упоминается (copy.md, общий
 * принцип редактуры).
 *
 * i18n: все строки — из `home.production.*`. Цифры (30, 4, 100)
 * презентационные и не переводятся; «Своё» переведено через
 * stats.in_house_value, потому что это не число а самостоятельный
 * термин «in-house».
 */
export function ProductionSection() {
  const t = useTranslations("home.production");
  return (
    <section
      id="production"
      aria-labelledby="production-heading"
      className="scroll-mt-24 border-t border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <p className="mono-tag mb-6">{t("mono_tag")}</p>
        <h2
          id="production-heading"
          className="max-w-3xl font-display text-3xl leading-tight md:text-5xl"
        >
          {t("heading")}
        </h2>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-secondary)]/75 md:mt-10 md:text-lg">
          {t("lede")}
        </p>

        {/* 3 подблока. Карточки с левой акцентной линией #E97132 (1.5px).
            На md+ — три в ряд, на мобайле — друг под другом. */}
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          <ProcessCard
            title={t("cards.design.title")}
            body={t("cards.design.body")}
          />
          <ProcessCard
            title={t("cards.assembly.title")}
            body={t("cards.assembly.body")}
          />
          <ProcessCard
            title={t("cards.testing.title")}
            body={t("cards.testing.body")}
          />
        </div>

        {/* 4 цифры под подблоками. Стилистика как в About — font-display
            40-56px, accent-fire на знаке «+»/«%», подпись font-mono 11px. */}
        <div
          aria-label={t("stats_aria")}
          className="mt-14 grid grid-cols-2 gap-6 border-t border-[var(--color-hairline)] pt-10 md:mt-16 md:grid-cols-4 md:gap-10 md:pt-12"
        >
          <Stat
            value={t("stats.lead_time_value")}
            unit={t("stats.lead_time_unit")}
            caption={t("stats.lead_time_caption")}
          />
          <Stat value="4" caption={t("stats.directions_caption")} />
          <Stat
            value="100"
            suffix="%"
            caption={t("stats.testing_caption")}
          />
          <Stat
            value={t("stats.in_house_value")}
            caption={t("stats.in_house_caption")}
            displayValue
          />
        </div>

        {/* CTA «Запросить визит на производство». Ведёт на /contacts. */}
        <div className="mt-12 md:mt-16">
          <Link
            href="/contacts"
            data-cursor="hover"
            data-cta="production-visit"
            className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)]"
          >
            {t("cta")}
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
 * подпись капсом снизу.
 *
 * `displayValue` — флаг для нечисловых значений («Своё»):
 * рендерим font-display поменьше (32/44 вместо 40/56), чтобы текстовое
 * значение не выглядело крикливее цифровых соседей.
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
