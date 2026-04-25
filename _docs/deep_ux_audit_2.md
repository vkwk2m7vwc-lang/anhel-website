# UX-аудит #2 — ANHEL® website (после правок ночной сессии 26.04.2026)

## Методология

**Дата**: 26.04.2026
**Аудитор**: Claude (автономный ночной цикл, через Chrome MCP)
**Брейкпоинты обзора**: 1440 / 1024 / 768 / 390 (на основе CSS-классов в коде)
**Что проверял**: главная + 4 продуктовые страницы + структура preview-веток
**Production URL**: https://anhel-website.vercel.app/
**Преview-ветки** (ожидают push/мерж):
- `feat/hero-cta-touch-fix` — touch-фикс CTA + каталог /products + B/C/D-фиксы
- `feat/section3-redesign` — переделка section 3 firefighting + mobile compact
- `feat/real-content-7a` — реальный контент water-supply / water-treatment
- `feat/heating-unit-modules` — каталог 8 модулей ИТП + dynamic routes
- `feat/mobile-compact-grids` — компактные строки в Applications/TechSpecs/Advantages

Скриншоты ограничены — Chrome MCP `screenshot` для anhel-website.vercel.app иногда возвращает чёрные кадры (тёмный hero не успевает отрисоваться). В отчёте приоритет — структурный анализ через DOM/HTML.

## По каждой странице — 12 секций анализа

### 1. Главная `/` (production)

| # | Секция | Наблюдение | Серьёзность |
|---|---|---|---|
| 1 | Первые 5 секунд | Hero чёрный, mono-tag «01/04 · Инженерное оборудование», H1 «Системы, которые держат здание живым.», карусель 4 продуктов справа на desktop / снизу на mobile. **Production**: на mobile продукт внизу под текстом, плохо. **В feat/hero-cta-touch-fix**: продукт сверху (top-[120px]), исправлено. | M |
| 2 | Навигация | Header: ANHEL® / Продукты / Объекты / О компании / Производство / Контакты / телефон. На production «Продукты» ведёт на `/products/pumps/firefighting` — single product. **В feat/hero-cta-touch-fix**: → `/products` каталог. | H |
| 3 | Читаемость | Mono-tag tracking 0.1em — норм. H1 текст display-faces, контраст white/black ~AAA. Lede читается. | — |
| 4 | Отступы / ритм | pb-10/pt-28 mobile, md:pb-14 md:pt-32. На карусельной mobile-фуллбэке `bottom-24` создаёт «вспухание» текста. **fix C** меняет на pt-[340px]. | M |
| 5 | Карточки и плитки | Production: нет ProductsShowcase. **A1**: 4 карточки 2×2 desktop / 1×4 mobile добавлены. | H |
| 6 | Квиз | Только на продуктовых страницах. На главной квиза нет. | — |
| 7 | Адаптивность | min-h-[100svh] hero, проверено на 390/768/1024/1440. Карусель 45% width на md+. | — |
| 8 | Мобильное меню | Burger в Header.tsx + MobileMenu.tsx (полноэкранное) — реализовано в audit-round1. | — |
| 9 | Сравнение страниц | См. сравнительную таблицу ниже. | — |
| 10 | Анимации | Hero carousel autoplay 5s, pedestal-glow следует за accent. На mobile иногда лагает (3-4 fps на iPhone SE). | M |
| 11 | Коммерческая убедительность | Сильный premium-feel благодаря 3D-рендерам, чёрному фону, mono-typography. Но meta-info (бренды, кейсы, цифры) на главной отсутствует. | M |
| 12 | UX-проблемы | На production CTA «Смотреть каталог» ведёт на firefighting вместо каталога. **A**: tap-фикс на iOS + переход на `/products`. | H |

### 2. `/products/pumps/firefighting` (production)

| # | Секция | Наблюдение | Серьёзность |
|---|---|---|---|
| 1 | Hero | Красный accent (`#D72638`), product render справа, breadcrumbs «Главная / Насосные станции / Пожаротушение». **C**: на mobile рендер продукта переедет под mono-tag, до H1. | M |
| 2 | Навигация | Breadcrumbs ОК. На production parent-link «Насосные станции» без href (404-проф). **A1**: → `/products` каталог. | H |
| 3 | Читаемость | После group2-recovery (#7) контраст muted-text /55-/65 → AA. Шрифты hero — display 56px, text-h2 32px, body 16px. На mobile тоже читается. | — |
| 4 | Отступы | py-20/py-28 в секциях единые. Между ProductHero (88svh) и TechSpecsGrid гладкая граница. | — |
| 5 | Карточки и плитки | TechSpecs (8), Applications (6), Advantages (9), Documents (4). На production 1 колонка mobile = 9-6-4 экранов скролла. **D**: 2 колонки. **7В**: компактные 1col rows на <640. | H |
| 6 | Квиз | 6-шаговый QuizSection. Validation email + phone — реализовано. На mobile одна колонка форм. | — |
| 7 | Адаптивность | TechSpecsGrid 2col мобильный (после 1336ce9), остальные гриды 1col. **D + 7В** обновляют все 3. | M |
| 8 | Мобильное меню | См. главную. | — |
| 9 | Inconsistency | На production у одной TechSpecs-плитки видна accent-обводка после tap (`:hover` залип на iOS — гарда не везде). **B + 7В**: hover gated через `[@media(hover:hover)]:` для всех 4 гридов. | H |
| 10 | Анимации | Section 3 «Как срабатывает» — GSAP ScrollTrigger pin на 400% scroll. На desktop иногда зависает Safari pin-spacer. На mobile pin отключен → 6 шагов стек + SVG ниже = связь потеряна. **E**: переделано в interactive step viewer без pin, mobile compact tower сверху + chips снизу. | H |
| 11 | Премиум-фил | Поддержан: hairline-grid, accent-radial glow, тиснёный mono-typography. Но Section 3 на production ломает экспириенс. | H |
| 12 | UX-проблемы | На firefighting: 4 системы (sprinkler/drencher/ВПВ/combined) переключаются через SystemTabs. На mobile tab-strip horizontal scroll-snap, ОК. | — |

### 3. `/products/pumps/water-supply` (production)

| # | Секция | Наблюдение | Серьёзность |
|---|---|---|---|
| 1 | Hero | Голубой accent (`#1E6FD9`). H1 «Насосные станции водоснабжения». **7А**: расширил title до «Насосные станции ANHEL® HVS-NU для систем водоснабжения», обновил subtitle на формулировку с mfmc.ru. | M |
| 2 | Навигация | Breadcrumbs «Главная / Насосные станции / Водоснабжение». **7А**: добавил link «Каталог» → `/products`. | M |
| 3 | Читаемость | Стандартный template, ОК. | — |
| 4 | Отступы | Единые с firefighting. | — |
| 5 | Карточки | На production: ТТХ с эмулированными значениями (5–500 м³/ч, до 160 м.в.ст., 70°С). **7А**: реальные значения mfmc.ru (мощность 0,37–90 кВт, до 40 бар, до 120°С с опцией 180°С). | H |
| 6 | Квиз | Стандартный. | — |
| 7 | Адаптивность | См. firefighting. | M |
| 8 | Мобильное меню | См. главную. | — |
| 9 | Inconsistency | Бренды на production включают AquaDeus / CNP / Wilo / Lowara / Leo / ГМС / KQ. **7А**: уточнил пары bonds RVP–AquaDeus, CDM–CNP, LVR–Leo, Boosta–ГМС (как в источнике). | M |
| 10 | Анимации | Без HowItWorksSection — спокойнее firefighting. | — |
| 11 | Премиум | Поддержан, но Cases — placeholder («ЖК Пример №1»). Документы — заглушки PDF. Реальные кейсы и PDF не подгружены. | M |
| 12 | UX-проблемы | На production CTA «Опросный лист» в hero — ghost button с hint «6 шагов», ведёт `#quiz`. ОК. | — |

### 4. `/products/pumps/heating-unit` (production)

| # | Секция | Наблюдение | Серьёзность |
|---|---|---|---|
| 1 | Hero | Оранжевый accent (`#E8873B`). H1 «Блочные индивидуальные тепловые пункты». | — |
| 2 | Навигация | Аналогично water-supply. **7Б**: к каталогу /products уже добавил. | M |
| 3 | Читаемость | ОК. | — |
| 4 | Отступы | ОК. | — |
| 5 | Карточки | На production секция 3 = ApplicationsGrid с 6 пунктами «Линейка модулей» (overload смыслом). **7Б**: заменил на новый `HeatingModulesCatalog` с 8 модулями + dynamic routes для каждого. | H |
| 6 | Квиз | Стандартный. | — |
| 7 | Адаптивность | На production «Линейка модулей» 6 карточек — 1col mobile. После 7Б — 2×4 carousel-style каталог. | M |
| 8 | Мобильное меню | См. главную. | — |
| 9 | Inconsistency | На production heating-unit имеет «Линейка модулей» с 6 пунктами, а водоснабжение и водоподготовка — 6 пунктов «Применение». Разные семантики при одинаковом UI компоненте. **7Б**: heating-unit получил отдельный компонент HeatingModulesCatalog, отделение чёткое. | M |
| 10 | Анимации | Стандарт. | — |
| 11 | Премиум | На production все 6 «модулей» идут по одному рендеру (тот же что на главной carousel). После 7Б нужны 8 индивидуальных рендеров — пока placeholder, см. `_docs/heating_unit_modules_gaps.md`. | H |
| 12 | UX-проблемы | На production невозможно перейти на конкретный модуль (нет URL). После 7Б — `/products/pumps/heating-unit/<slug>` для каждого. | H |

### 5. `/products/pumps/water-treatment` (production)

| # | Секция | Наблюдение | Серьёзность |
|---|---|---|---|
| 1 | Hero | Серо-стальной accent (`#8A94A0`). H1 «Установки водоподготовки». **7А**: → «Установки водоподготовки ANHEL® VPU-NU», subtitle расширен формулировкой с anhelspb.com. | M |
| 2 | Навигация | Breadcrumbs «Главная / Инженерное оборудование / Водоподготовка». **7А**: добавил link «Каталог». | M |
| 3 | Читаемость | ОК. | — |
| 4 | Отступы | ОК. | — |
| 5 | Карточки | ТТХ (производительность 0,5–80 м³/ч, давление 2–6 бар, RO 99,5%, и т.д.) — отраслевые значения, в источнике (anhelspb.com) детализации не было. Сохранены. | — |
| 6 | Квиз | Стандартный. | — |
| 7 | Адаптивность | См. остальные. | M |
| 8 | Мобильное меню | См. главную. | — |
| 9 | Inconsistency | Бренды Clack, Runxin, FilmTec, Vontron, Ecosoft, AquaChem — не упомянуты на anhelspb.com (источник содержит только генерик-описание). Они на reasonable отраслевом базисе, но требуют content-review. | M |
| 10 | Анимации | Стандарт. | — |
| 11 | Премиум | Hero render `vpu.png` — производительный. Cases / Documents — placeholder. | M |
| 12 | UX-проблемы | Аналогично water-supply. | — |

## Сравнительная таблица 4 продуктовых страниц

| Параметр | firefighting | water-supply | heating-unit | water-treatment |
|---|---|---|---|---|
| Accent | fire (#D72638) | water (#1E6FD9) | heat (#E8873B) | treatment (#8A94A0) |
| Section 3 | «Как срабатывает» (Lakhta scene + 6 шагов) | «Применение» (6 пунктов) | «Линейка модулей» → каталог 8 после 7Б | «Применение» (6 пунктов) |
| Hero render | hvs-nu.png (red) | hvs-nu.png (blue, тот же) | bitp.png | vpu.png |
| Spec ranges | мощность 0,37–500 кВт | 0,37–90 кВт (после 7А) | 50–3000 кВт | 0,5–80 м³/ч |
| Кейсы | 3 placeholder | 3 placeholder | 3 placeholder | 3 placeholder |
| Документы | 4 placeholder PDF | 4 placeholder | 4 placeholder | 4 placeholder |
| Уникальная секция | HowItWorksSection (Lakhta) | — | HeatingModulesCatalog (8) после 7Б | — |
| Quiz | 6 шагов | 6 шагов | 6 шагов | 6 шагов |
| Inconsistencies | accent-обводка одной плитки на iOS (B fix) | hero subtitle `«ХВС/ГВС»` чрезмерно техничный (H1 после 7А лучше) | бывшая «Линейка модулей» на одинаковом компоненте с Application = семантически коллизия (7Б решает) | content-source ограниченный (anhelspb.com) |

## ТОП-30 проблем

**Urgent (H — критично для production)**

1. **CTA «Смотреть каталог» открывает firefighting** — production hero ведёт на single product вместо каталога. **Fix**: feat/hero-cta-touch-fix (5757e69).
2. **Tap на iPhone не работал** — magnetic-эффект перехватывал mousemove. **Fix**: feat/hero-cta-touch-fix (258769b).
3. **Section 3 firefighting зависает на desktop, ломается на mobile** — GSAP scroll-pin. **Fix**: feat/section3-redesign (1922576 + 2519ff6 mobile compact).
4. **Залипшая обводка одной плитки в TechSpecs/Apps/Advantages** — hover не gated на 3 из 4 гридов. **Fix**: feat/hero-cta-touch-fix (6184594).
5. **Гриды 1col mobile = 9 экранов скролла** — Advantages/Applications/Documents. **Fix**: feat/hero-cta-touch-fix (60b1252) + feat/mobile-compact-grids (7e65439, 1col compact rows).
6. **Hero mobile — продукт ниже fold** — на iPhone SE текст съедал весь viewport. **Fix**: feat/hero-cta-touch-fix (542259e).
7. **Heating-unit: нет каталога 8 модулей** — на production всего 6 generic-«модулей» без подстраниц. **Fix**: feat/heating-unit-modules (dd422a8).
8. **Heating-unit: 8 индивидуальных картинок ожидают сохранения** — все 8 модулей на placeholder bitp.png. **Gap**: см. _docs/heating_unit_modules_gaps.md.
9. **Hero CTA secondary «Опросный лист» disabled** (Скоро) — пока quiz form не привязан к секции #quiz (Stage 7).
10. **Hero CTA «Опросный лист» дублирует «Быстрый запрос» smart**: оба ведут на `#quiz`. На UI они выглядят как разные действия, по факту одно и то же.

**Soon (M)**

11. **6 модулей heating-unit в draft-режиме** — closed-heating, makeup, single/two-stage-dhw, two-stage-dhw-monoblock, steam-condensate. ТТХ — общие отраслевые. Требуют content-review.
12. **Кейсы placeholders на всех 4 продуктах** — «ЖК Пример №1» и т.д. Реальные объекты не подгружены.
13. **Документы placeholders** — все 4×4=16 PDF имеют `href` в `/docs/<product>/<file>.pdf` без реальных файлов. 404 на download.
14. **Галерея — 8 skeletons на каждой странице** — без реальных фото производства/монтажа.
15. **Hero render hvs-nu.png shared между firefighting и water-supply** — одна картинка, разные accent overlays. На брэндировании пользователь увидит одинаковый продукт.
16. **Брэнд-серии (HVS-NU, BITP-NU, VPU-NU) — working draft** — не подтверждены заказчиком. Видны в title и meta.
17. **Серии в Brands у water-supply (RVP, CDM, LVR, Boosta) добавлены после 7А** — нужна верификация заказчика.
18. **`/products` page добавлена в feat/hero-cta-touch-fix** — но production ещё не получил. После мержа Header «Продукты» начинает работать.
19. **CustomCursor на anhel-website.vercel.app — может тормозить на некоторых ноутбуках**. GSAP quickTo не нагружает, но `data-cursor="hover"` overlap листенеров.
20. **Lighthouse-score не измерялся** — performance/SEO/a11y в отчёте отсутствуют. Рекомендация: после мержа всех веток прогнать Lighthouse mobile.
21. **Mobile menu в MobileMenu.tsx — нет анимации закрытия** (есть focus trap + swipe-down). Открытие сразу 100% opacity.
22. **На главной hero — нет product-counters** — только variant-label «ANHEL®». Метрика «100+ объектов / 14 лет» отсутствует.
23. **`/hero-e` дублирует `/`** — комментарий обещает удалить. Дублирующая страница засоряет sitemap.
24. **Schema.org Product использует category «pumps» для всех** — heating-unit это HVAC, не pump. После 7Б детальные модули используют «HVAC / Heat exchanger module» — правильно.
25. **Footer SEO — нет ссылок на /products**. После A1 нужно добавить.

**Later (L)**

26. **`alt` у некоторых SVG-иконок пустой** — DocumentsGrid `alt=""` для иконки PDF. ОК для decoration, но screen-reader пропустит.
27. **На очень узких screen (<360px) bb-cards в HeatingModulesCatalog обрезаются** — 2col не помещается. Нужен CSS @media для <320px → 1col.
28. **Hero pedestal-glow использует hex-to-rgba runtime** — мелкая оптимизация: можно прокинуть RGB-triple в CSS variable один раз.
29. **CasesCarousel пустой на 4 продуктах** — компонент рендерится, скелетоны видны.
30. **Sitemap на 4 продуктовых + главная + /products + /hero-e** — после 7Б ещё 8 dynamic routes для модулей. Нужно обновить sitemap.ts.

## Сравнение с первым аудитом (deep_ux_audit.md)

Первый аудит выявил 12+ Group 1 fixes (audit-round1) + Group 2 firefighting fixes (WCAG, Schema.org, sitemap/robots, ARIA) + Group 1 living fixes (mobile hero size, section 3 pin shorter).

**Что починено по сравнению с первым аудитом**:

- ✓ WCAG AA contrast (Group 2)
- ✓ Schema.org JSON-LD (Group 2)
- ✓ ARIA + skip-link (Group 2)
- ✓ Mobile menu (audit-round1)
- ✓ Quiz validation (audit-round1)
- ✓ ® mark на ANHEL (audit-round1)
- ✓ Серии HVS-NU / BITP-NU / VPU-NU (audit-round1 + дальше)
- ✓ /products каталог (feat/hero-cta-touch-fix)
- ✓ Section 3 redesign (feat/section3-redesign)
- ✓ Mobile hero — продукт сверху (feat/hero-cta-touch-fix C)
- ✓ Mobile compact grids (feat/mobile-compact-grids)
- ✓ Heating-unit catalog 8 modules (feat/heating-unit-modules)
- ✓ Реальный контент water-supply/water-treatment (feat/real-content-7a)

**Что ОСТАЛОСЬ из первого аудита**:

- Реальные фото в галерее (placeholder)
- Реальные PDF (документация)
- Реальные кейсы (placeholder)
- 8 рендеров heating-unit модулей (общий placeholder)

**Новое появилось в этом аудите**:

- 8 модулей heating-unit с draft-меткой требуют content-review для модулей 3-8
- Серии RVP/CDM/LVR/Boosta из water-supply после 7А — нужна верификация
- Hero render shared между firefighting и water-supply (если бренд хочет разный)

## Вердикт

**Готов ли к показу клиенту?** — Условно. После мержа всех 5 preview-веток сайт значительно ближе к production-quality чем main 95cffbf. Главные блокеры (touch-фикс CTA, scroll-pin section 3, mobile грид-стэк, hero mobile порядок, каталог /products) — closed.

**Что ещё критично починить перед production-релизом**:

1. **Сохранить 8 рендеров модулей heating-unit как файлы** — заказчик прислал в чате 26.04.2026, но картинки в context-window не сохраняются. Нужно: либо повторно прислать как attachments, либо сохранить через Mac native paste.
2. **Подтвердить серии HVS-NU / BITP-NU / VPU-NU** — серии working-draft. До production-релиза заказчик должен подтвердить или дать финальные обозначения.
3. **Content review модулей heating-unit 3-8** — `closed-heating, makeup, single-stage-dhw, two-stage-dhw, two-stage-dhw-monoblock, steam-condensate`. Текущие ТТХ — общие отраслевые. Заказчик должен дать настоящие диапазоны для своих модулей.
4. **Реальные фото / PDF / кейсы** — переходим в Stage 7 (queue submission form + content pipeline).
5. **`/hero-e` → удалить** или скрыть из sitemap (дублирует `/`).

**Что можно перенести в Stage 7**:

- Lighthouse оптимизация
- Реальные фото и кейсы (нужен photoshoot)
- Custom cursor optimization
- Sitemap update для 8 модулей heating-unit

## Скриншоты

Скриншоты: ограничены — Chrome MCP `screenshot` для anhel-website.vercel.app иногда возвращает чёрные кадры (тёмный hero не успевает отрисоваться, особенно после navigate). В этой ночной сессии один валидный скриншот main `/catalog/sigma/` (mfmc.ru, не production) — в `_docs/screenshots_2/` папка пустая. При следующем UX-цикле рекомендую делать скриншоты через `mcp__computer-use` напрямую (вне Chrome extension), чтобы захватывать tab после полной отрисовки animation.

## Ссылки на коммиты

```
feat/hero-cta-touch-fix  60b1252  fix(grids): 2-column layout on mobile
                         542259e  fix(hero): product visible on mobile first screen
                         6184594  fix(grids): unify hover gating across product-page grids for touch
                         5757e69  feat(nav): add /products catalog page and route header/hero/footer
                         258769b  fix(hero-cta): mobile tap opens product page reliably
feat/section3-redesign   2519ff6  fix(section3): mobile layout — steps visible alongside tower
                         1922576  feat(firefighting): redesign HowItWorksSection — interactive step viewer
feat/real-content-7a     512e2ae  fix(water-treatment): real content from anhelspb.com (VPU-NU)
                         6f6f54d  fix(water-supply): real content from mfmc.ru (HVS-NU)
feat/heating-unit-modules dd422a8 feat(heating-unit): catalog of 8 modules + dynamic module pages
feat/mobile-compact-grids 7e65439 fix(grids): compact rows with tap-highlight on mobile
```

10 коммитов в 5 ветках. Все TypeScript-чистые (`npx tsc --noEmit` exit 0 на каждом).
