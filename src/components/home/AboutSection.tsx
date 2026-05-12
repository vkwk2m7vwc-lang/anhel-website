/**
 * Секция «О компании» — якорь `#about` на главной.
 *
 * Цель — закрыть мёртвую ссылку в шапке (C1 из pre-launch audit) и дать
 * проектировщику/закупщику быстрый ответ «что за ANHEL» без перехода на
 * отдельную страницу. Скролл-якорь, не route.
 *
 * Содержимое — плейсхолдер ~3 абзацев, который заменит копирайтер.
 * Финальные цифры в счётчиках статические (без count-up anim), потому
 * что в hero уже играется анимация — повторять тот же эффект на одной
 * странице визуально шумно (см. M1 из audit: count-up читался как
 * «числа постоянно растут»). Для финальных значений берём те же
 * 150+/12/4, что и в hero — чтобы пользователь не получал разные
 * цифры в разных секциях одной страницы.
 *
 * Стиль секции согласован с `ProductsShowcase`: max-width 1440,
 * h2 на font-display, lede 60-70 chars, mono-tag сверху.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <p className="mono-tag mb-6">О компании</p>
        <h2
          id="about-heading"
          className="max-w-3xl font-display text-3xl leading-tight md:text-5xl"
        >
          ANHEL® — российский производитель инженерного оборудования для зданий, которые будут стоять десятилетиями.
        </h2>

        <div className="mt-10 grid gap-8 text-base leading-relaxed text-[var(--color-secondary)]/75 md:grid-cols-2 md:gap-14 md:text-lg">
          <p>
            Мы проектируем и собираем насосные станции, тепловые пункты, установки водоподготовки и шкафы управления под задачу конкретного объекта — от жилых комплексов и медицинских центров до промышленных площадок и атомных реакторов.
          </p>
          <p>
            Каждая установка проходит полный цикл — расчёт, конфигурация под параметры объекта, обвязка, монтаж электрики, заводская приёмка под нагрузкой. На объект приезжает готовый блок, который встаёт в проект без переделок.
          </p>
        </div>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--color-secondary)]/60 md:text-lg">
          Офис, инженерное бюро и производство — Санкт-Петербург и Москва. Сервис — собственная бригада с круглосуточной поддержкой по объектам в эксплуатации.
        </p>

        {/* Static stats — без count-up animation. Финальные значения
            те же, что в hero, чтобы пользователь не натыкался на
            разные цифры в разных секциях одной страницы. */}
        <div
          aria-label="Ключевые показатели"
          className="mt-16 grid grid-cols-3 gap-6 border-t border-[var(--color-hairline)] pt-10 md:mt-20 md:gap-16 md:pt-14"
        >
          <div>
            <p className="font-mono text-2xl font-medium leading-none text-[var(--color-secondary)] md:text-[32px]">
              150
              <span aria-hidden="true" className="text-[var(--accent-fire)]">
                +
              </span>
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50">
              Объектов
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl font-medium leading-none text-[var(--color-secondary)] md:text-[32px]">
              12
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50">
              Лет опыта
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl font-medium leading-none text-[var(--color-secondary)] md:text-[32px]">
              04
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50">
              Направления
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
