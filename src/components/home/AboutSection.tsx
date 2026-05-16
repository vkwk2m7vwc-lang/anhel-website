import { useTranslations } from "next-intl";

/**
 * Секция «О компании» — якорь `#about` на главной.
 *
 * Цель — закрыть мёртвую ссылку в шапке (C1 из pre-launch audit) и дать
 * проектировщику/закупщику быстрый ответ «что за ANHEL» без перехода на
 * отдельную страницу. Скролл-якорь, не route.
 *
 * Содержимое:
 *   - метка, заголовок, 3 абзаца (бренд → производство → полный цикл)
 *
 * Ряд счётчиков (150+ / 12+ / 4+ / 24+) убран после редакционного
 * аудита 2026-05: он дословно дублировал hero-counters одним экраном
 * выше. Бренд-метрики теперь живут только в hero.
 *
 * CTA «О производстве →» удалена в v1.20-pre-launch-fixes — секция
 * ProductionSection временно убрана из главной страницы.
 *
 * Стиль секции согласован с `ProductsShowcase`: max-width 1440,
 * h2 на font-display, lede 60-70 chars, mono-tag сверху.
 *
 * i18n: все строки — из `home.about.*`.
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
          className="max-w-3xl font-display text-3xl leading-tight tracking-tight text-balance md:text-5xl"
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
      </div>
    </section>
  );
}
