/**
 * Centralised route constants — single source of truth для критичных
 * URL'ов, на которые ссылается несколько компонентов.
 *
 * Если в будущем кто-то решит переименовать каталог в `/catalog` или
 * `/products/all`, изменение здесь автоматически распространится на
 * Header NAV, Footer NAV и hero-CTA «Смотреть каталог».
 *
 * Сейчас 3 потребителя `CATALOG_PATH`:
 *   - src/components/hero/HeroCTAs.tsx («Смотреть каталог» primary CTA)
 *   - src/components/layout/Header.tsx (link «Продукты» в navbar)
 *   - src/components/layout/Footer.tsx (link «Продукты» в навигации)
 *
 * Без этой константы было 3 одинаковых строковых литерала, которые
 * нужно было менять руками — и был risk что один забудется при
 * переименовании. Сейчас одна константа закрывает все три места.
 *
 * Если появятся другие критичные роуты (например, /quiz, /docs/*),
 * добавляйте их сюда же.
 */

/** Корневой каталог продукции — карточки 4 групп. */
export const CATALOG_PATH = "/products" as const;

/** Портфолио объектов — карточная сетка с фильтром (Насосные / Водоподготовка). */
export const PROJECTS_PATH = "/projects" as const;
