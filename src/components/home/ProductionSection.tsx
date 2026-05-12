/**
 * Секция «Производство» — якорь `#production` на главной.
 *
 * Закрывает мёртвую ссылку в шапке (C1 из pre-launch audit). До prelaunch-аудита
 * ссылка вела на `/#manufacturing` — ID не существовал в DOM, клик уходил
 * в void. Теперь — реальная секция с якорем `#production` (единое имя
 * совпадает с label в шапке).
 *
 * Содержимое — плейсхолдер ~3 абзацев, который заменит копирайтер.
 * Фото-блок — placeholder-плитка с подписью «Фото производства будет
 * добавлено». Когда Алексей пришлёт фото цеха, заменить на сетку через
 * <Image> из next/image (паттерн из `GalleryRail.tsx`).
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
          Собственный цех — каждая установка приезжает на объект как готовый блок.
        </h2>

        <div className="mt-10 grid gap-8 text-base leading-relaxed text-[var(--color-secondary)]/75 md:grid-cols-2 md:gap-14 md:text-lg">
          <p>
            Производственная площадка в Москве — раскрой, сварка рам, обвязка трубопроводов, монтаж насосных групп, сборка щитов автоматики. Каждый узел проходит заводское давление и тест в режиме объекта до отгрузки.
          </p>
          <p>
            На производстве — собственные сварщики, монтажники, электрики. Линейка контрольно-измерительных стендов: гидравлические испытания, протоколы пневмо-тестов, нагрузочные прогоны автоматики. Без посредников и заёмных бригад.
          </p>
        </div>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--color-secondary)]/60 md:text-lg">
          Отгрузка — блок с паспортом, гидравлической схемой, актом приёмки и пусконаладкой на объекте. Запуск под ключ, гарантия 24 месяца.
        </p>

        {/* Фото-плейсхолдер. Когда придут фото цеха — заменить на сетку
            через next/image (GalleryRail-паттерн). До тех пор показываем
            подпись, чтобы посетитель не недоумевал «почему здесь пусто». */}
        <div className="mt-16 border-t border-[var(--color-hairline)] pt-10 md:mt-20 md:pt-14">
          <div
            role="img"
            aria-label="Фото производственной площадки будет добавлено"
            className="flex aspect-[16/9] items-center justify-center rounded-sm border border-dashed border-[var(--color-hairline)] bg-[var(--color-image-placeholder)] md:aspect-[21/9]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-secondary)]/40">
              Фото производства — будет добавлено
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
