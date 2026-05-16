"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Award, ClipboardCheck, FileCheck2 } from "lucide-react";
import { ProductionVideoPlayer } from "./ProductionVideoPlayer";

/**
 * Секция «Производство» — якорь `#production` на главной.
 *
 * Расширенная версия (2026-05): к старым трём колонкам (КБ / Цех / Стенд)
 * добавлены блоки:
 *   1. Hero-видео плазменной резки + заголовок секции
 *   2. Производственные мощности (площадка под одной крышей)
 *   3. Полный цикл — 5 этапов (Проектирование → Сервис)
 *   4. Inline-видео сварки + три исходных карточки (КБ / Цех / Стенд)
 *   5. Качество и контроль (ISO 9001:2015, стенд, ЕАЭС)
 *   6. Цифры (4 показателя ANHEL) + CTA
 *
 * Цифры в финальном блоке — только данные ANHEL: 12+ лет, 150+ объектов,
 * от 30 дней, 100% стендовые испытания. Цифры из других материалов
 * (например, годы существования других площадок) сюда не идут — это
 * редакционное правило, не баг.
 *
 * Видео:
 *   - <ProductionVideoPlayer> — lazy-load + reduced-motion + mobile fallback
 *   - Hero: full-bleed, aspect 21:9 (desktop) / 4:3 (mobile)
 *   - Inline: 16:9, max-width, rounded, центрирован
 *   - Источник: Alex Moisieiev / Pexels (free license)
 *
 * i18n: все строки — из `home.production.*`. Цифры (30, 100, 12, 150)
 * презентационные и не переводятся; текстовые значения («Своё» и т.п.) —
 * через ключи `stats.*_value`.
 */
export function ProductionSection() {
  const t = useTranslations("home.production");
  return (
    <section
      id="production"
      aria-labelledby="production-heading"
      className="scroll-mt-24 border-t border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
    >
      {/* Блок 1 — Hero видео + заголовок секции.
          Full-bleed. На десктопе — широкая кинокадровая полоса 21:9,
          на мобайле — компактнее 4:3 (иначе высота уходит за viewport). */}
      <div className="relative w-full overflow-hidden bg-black">
        <ProductionVideoPlayer
          base="plasma-cutting"
          poster="plasma-cutting-poster.jpg"
          aspectClass="aspect-[4/3] md:aspect-[21/9]"
        />
        {/* Тёмный градиент снизу — чтобы текст под видео читался даже
            если кадр в нижней трети видео яркий. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent md:h-48"
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-6 pb-8 md:px-12 md:pb-12">
          <p className="mono-tag mb-3 text-white/80">{t("mono_tag")}</p>
          <h2
            id="production-heading"
            className="max-w-3xl font-display text-3xl leading-tight text-white md:text-5xl"
          >
            {t("heading")}
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-secondary)]/75 md:text-lg">
          {t("lede")}
        </p>

        {/* Блок 2 — Производственные мощности.
            Площадка-под-одной-крышей: КБ + цех + стенд. Без указания
            конкретных географий и площадей других подразделений — это
            редакционная граница (бренд-инструкции). */}
        <div className="mt-16 border-t border-[var(--color-hairline)] pt-12 md:mt-24 md:pt-16">
          <p className="mono-tag mb-4">{t("capacity_tag")}</p>
          <h3 className="max-w-2xl font-display text-2xl leading-tight md:text-4xl">
            {t("capacity_title")}
          </h3>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--color-secondary)]/70 md:text-lg">
            {t("capacity_description")}
          </p>

          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
            <CapacityCard
              label={t("capacity.engineering.label")}
              value={t("capacity.engineering.value")}
            />
            <CapacityCard
              label={t("capacity.assembly.label")}
              value={t("capacity.assembly.value")}
            />
            <CapacityCard
              label={t("capacity.testing.label")}
              value={t("capacity.testing.value")}
            />
          </div>
        </div>

        {/* Блок 3 — Полный цикл, 5 этапов.
            На десктопе — 5 в ряд с тонкими разделителями, на мобайле
            вертикальный список с большими номерами слева. */}
        <div className="mt-20 md:mt-28">
          <h3 className="max-w-3xl font-display text-2xl leading-tight md:text-4xl">
            {t("cycle_title")}
          </h3>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--color-secondary)]/70 md:text-lg">
            {t("cycle_description")}
          </p>

          <ol className="mt-10 grid gap-px overflow-hidden bg-[var(--color-hairline)] md:mt-14 md:grid-cols-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <CycleStep
                key={n}
                number={n}
                title={t(`cycle.step${n}.title`)}
                body={t(`cycle.step${n}.body`)}
              />
            ))}
          </ol>
        </div>

        {/* Блок 4 — Inline-видео сварки + три исходные карточки. */}
        <div className="mt-20 md:mt-28">
          <div className="mx-auto max-w-4xl">
            <ProductionVideoPlayer
              base="welding"
              poster="welding-poster.jpg"
              aspectClass="aspect-video"
              rounded
            />
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
              {t("welding_caption")}
            </p>
          </div>

          {/* 3 подблока: КБ / Цех / Стенд (наследие — копирайт остаётся). */}
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
        </div>

        {/* Блок 5 — Качество и контроль.
            ISO 9001:2015, стендовые испытания, документация ЕАЭС. */}
        <div className="mt-20 border-t border-[var(--color-hairline)] pt-12 md:mt-28 md:pt-16">
          <h3 className="max-w-3xl font-display text-2xl leading-tight md:text-4xl">
            {t("quality_title")}
          </h3>

          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-10">
            <QualityCard
              icon={<Award className="h-6 w-6" strokeWidth={1.5} />}
              title={t("quality.iso.title")}
              body={t("quality.iso.body")}
            />
            <QualityCard
              icon={<ClipboardCheck className="h-6 w-6" strokeWidth={1.5} />}
              title={t("quality.control.title")}
              body={t("quality.control.body")}
            />
            <QualityCard
              icon={<FileCheck2 className="h-6 w-6" strokeWidth={1.5} />}
              title={t("quality.certificates.title")}
              body={t("quality.certificates.body")}
            />
          </div>
        </div>

        {/* Блок 6 — Цифры (4 показателя ANHEL).
            12+ лет, 150+ объектов, от 30 дней, 100% стенд. На мобайле
            2×2, на десктопе — 4 в ряд. */}
        <div
          aria-label={t("stats_aria")}
          className="mt-20 grid grid-cols-2 gap-6 border-t border-[var(--color-hairline)] pt-12 md:mt-28 md:grid-cols-4 md:gap-10 md:pt-16"
        >
          <Stat
            value={t("stats.years_value")}
            suffix="+"
            caption={t("stats.years_caption")}
          />
          <Stat
            value={t("stats.objects_value")}
            suffix="+"
            caption={t("stats.objects_caption")}
          />
          <Stat
            value={t("stats.lead_time_value")}
            unit={t("stats.lead_time_unit")}
            caption={t("stats.lead_time_caption")}
          />
          <Stat value="100" suffix="%" caption={t("stats.testing_caption")} />
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
 * Карточка «мощности» — короткая метка сверху, текстовое значение снизу.
 */
function CapacityCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t-[1.5px] border-[var(--accent-fire)] pt-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
        {label}
      </p>
      <p className="mt-3 font-display text-xl leading-tight md:text-2xl">
        {value}
      </p>
    </div>
  );
}

/**
 * Этап полного цикла. Номер 01-05 в моноширинном.
 */
function CycleStep({
  number,
  title,
  body,
}: {
  number: number;
  title: string;
  body: string;
}) {
  return (
    <li className="bg-[var(--color-primary)] p-6 md:p-8">
      <p className="font-mono text-xs text-[var(--accent-fire)]">
        0{number}
      </p>
      <h4 className="mt-3 font-display text-lg leading-tight md:text-xl">
        {title}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)]/65 md:text-[15px]">
        {body}
      </p>
    </li>
  );
}

/**
 * Карточка качества — иконка сверху, заголовок, текст.
 */
function QualityCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article>
      <div
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-md border border-[var(--color-hairline)] text-[var(--color-secondary)]"
      >
        {icon}
      </div>
      <h4 className="mt-5 font-display text-lg leading-tight md:text-xl">
        {title}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)]/70 md:text-[15px]">
        {body}
      </p>
    </article>
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
 */
function Stat({
  value,
  suffix,
  unit,
  caption,
}: {
  value: string;
  suffix?: string;
  unit?: string;
  caption: string;
}) {
  return (
    <div>
      <p className="flex items-baseline gap-1 font-display text-[40px] font-medium leading-none text-[var(--color-secondary)] md:text-[56px]">
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
