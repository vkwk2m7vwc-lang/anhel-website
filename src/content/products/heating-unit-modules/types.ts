/**
 * Heating-unit module — content types.
 *
 * 8 модулей линейки ANHEL® BITP-NU (блочные индивидуальные тепловые
 * пункты): входной учёт, открытая/закрытая система отопления,
 * заполнение/подпитка, одно-/двухступенчатая ГВС, ГВС на моноблоке,
 * пароконденсатные системы.
 *
 * Источник структуры — mfmc.ru/catalog/sigma/. Контент адаптирован
 * под бренд ANHEL® (без упоминаний «Сигма Heat®», «МФМК»).
 *
 * Тип специально компактнее общего ProductContent: модуль — это
 * sub-страница каталога, а не отдельная продуктовая линейка с
 * полным набором секций (бренды, кейсы, документы повторяются с
 * родительской страницы /products/pumps/heating-unit).
 */

export type HeatingModuleSlug =
  | "input-metering"
  | "open-heating"
  | "closed-heating"
  | "makeup"
  | "single-stage-dhw"
  | "two-stage-dhw"
  | "two-stage-dhw-monoblock"
  | "steam-condensate";

export interface HeatingModuleSpec {
  /** Mono-uppercase label, e.g. «МАКС. ТЕМПЕРАТУРА» */
  label: string;
  /** Display value, e.g. «200» или «от 1 до 3» */
  value: string;
  /** Optional unit, e.g. «°С», «Гкал/ч» */
  unit?: string;
}

export interface HeatingModule {
  slug: HeatingModuleSlug;
  /** «01», «02», … для индексации в каталоге */
  mono: string;
  /** Полное имя для hero и breadcrumb */
  title: string;
  /** Краткий title для каталог-карточки */
  shortTitle: string;
  /** 1–2 предложения описания для hero и каталог-карточки */
  tagline: string;
  /** Расширенное описание для подстраницы (1–3 абзаца) */
  description: string;
  /** Картинка модуля. Все 8 пока используют общий placeholder bitp.png — см. _docs/heating_unit_modules_gaps.md */
  image: {
    src: string;
    alt: string;
  };
  /** ТТХ модуля — 4–8 строк */
  techSpecs: HeatingModuleSpec[];
  /** Назначение / область применения — 2–4 пункта */
  applications: string[];
  /** Состав установки — что входит в модуль (опционально) */
  composition?: string[];
  /**
   * Флаг draft — если true, контент модуля содержит общие
   * отраслевые формулировки и не сверен 1-в-1 с источником.
   * См. _docs/heating_unit_modules_gaps.md.
   */
  draft?: boolean;
}
