import type { DescriptionContent } from "@/content/products/types";

/**
 * Описание (назначение и принцип работы) — короткий блок 1-3 параграфа.
 *
 * Визуальный приём заимствован у ИТП-подстраниц:
 *   left rail (mono-tag + h2) | right column (параграфы)
 * на md+. На mobile стек, h2 над текстом.
 *
 * Минимально-инвазивная структура: одна section с границей сверху,
 * единый paddings ритм совпадает с другими product-сегментами
 * (TechSpecsGrid, BrandsStrip, AdvantagesGrid).
 *
 * Optional render: вызывающая страница уже проверяет
 * `description` на undefined — компонент здесь предполагает наличие
 * данных (TS дёрнет если попадёт пустое).
 */
export function DescriptionSection({
  content,
}: {
  content: DescriptionContent;
}) {
  return (
    <section
      id="description"
      aria-labelledby="description-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="description-title"
              className="mt-4 max-w-[420px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              {content.title}
            </h2>
          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            {content.paragraphs.map((p, i) => (
              <p
                key={i}
                className="max-w-[760px] text-base leading-relaxed text-[var(--color-secondary)]/80 md:text-[17px]"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
