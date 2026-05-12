import Link from "next/link";
import { useTranslations } from "next-intl";

/**
 * Секция «О компании» — якорь `#about` на главной.
 *
 * Цель — закрыть мёртвую ссылку в шапке (C1 из pre-launch audit) и дать
 * проектировщику/закупщику быстрый ответ «что за ANHEL» без перехода на
 * отдельную страницу. Скролл-якорь, не route.
 *
 * Содержимое — финальные тексты v2 из copy.md (A.2):
 *   - метка, заголовок, 3 абзаца (бренд → производство → полный цикл)
 *   - ряд из 3 статичных счётчиков (150+ объектов / 12+ лет опыта / 04 направления)
 *   - CTA «О производстве →» — якорь на /#production
 *
 * Счётчики статические (без count-up anim) — в hero уже играется
 * анимация, повторять её одной секцией ниже визуально шумно (см. M1
 * из audit: count-up читался как «числа постоянно растут»).
 *
 * Стиль секции согласован с `ProductsShowcase`: max-width 1440,
 * h2 на font-display, lede 60-70 chars, mono-tag сверху.
 *
 * i18n: все строки — из `home.about.*`. Все цифры в счётчиках —
 * презентационные (150 / 12 / 04 / +) и не переводятся: они одинаковы
 * во всех языках, лишь подписи (`caption`) приходят через t().
 */
export function AboutSection() {
  const t = useTranslations("home.about");
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <p className="mono-tag mb-6">{t("mono_tag")}</p>
        <h2
          id="about-heading"
          className="max-w-3xl font-display text-3xl leading-tight md:text-5xl"
        >
          {t("heading")}
        </h2>

        <div className="mt-10 grid gap-8 text-base leading-relaxed text-[var(--color-secondary)]/75 md:grid-cols-2 md:gap-14 md:text-lg">
          <p>{t("paragraph_1")}</p>
          <p>{t("paragraph_2")}</p>
        </div>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--color-secondary)]/60 md:text-lg">
          {t("paragraph_3")}
        </p>

        {/* Static stats — без count-up animation. 3 значения горизонтально:
            150+ объектов / 12 лет опыта / 04 направления — реальные цифры
            бренда (бизнес работает с 2014, 150+ объектов сданы). */}
        <div
          aria-label={t("stats_aria")}
          className="mt-16 grid grid-cols-3 gap-6 border-t border-[var(--color-hairline)] pt-10 md:mt-20 md:gap-16 md:pt-14"
        >
          <Stat value="150" suffix="+" caption={t("stats.objects_caption")} />
          <Stat value="12" suffix="+" caption={t("stats.years_caption")} />
          <Stat value="04" caption={t("stats.directions_caption")} />
        </div>

        {/* CTA на якорь #production — секция «Производство» ниже на той
            же странице. Сам link плотный, ghost-style, как у hero. */}
        <div className="mt-12 md:mt-16">
          <Link
            href="/#production"
            data-cursor="hover"
            data-cta="about-to-production"
            className="group inline-flex items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 px-[22px] py-[14px] text-sm font-medium text-[var(--color-secondary)] transition-colors hover:border-[var(--color-secondary)]"
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
 * Single static stat — крупная цифра, опц. accent-suffix, опц. unit,
 * подпись капсом снизу. Композиция стабильная, никакой анимации.
 *
 * `value` всегда строка (поддерживает «10» / «100» / «24» / «4» и пр.).
 * `suffix` — отдельный span с accent-fire цветом (для «+»).
 * `unit`   — мелкий моно-суффикс справа (для «24 мес»).
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
