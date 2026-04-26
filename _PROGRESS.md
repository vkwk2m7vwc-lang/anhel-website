# Автономная сессия — большая задача ANHEL

**Старт:** 2026-04-25
**Исполнитель:** Claude (Cowork mode)
**Источник ТЗ:** `uploads/TZ_ANHEL_большая_задача.md`

---

## Итог по задачам

| # | Задача | Ветка | Статус |
|---|---|---|---|
| 1 | Объекты (портфолио) — насосные + водоподготовка | `feat/projects-portfolio` | ✅ merged |
| 2 | Фото производства MFMC + ретушь | `feat/production-photos` | ⛔ блокер: ручная ретушь |
| 3 | Сертификаты в существующий блок | `feat/certificates` | ✅ merged (через fillable-forms) |
| 4 | 3 fillable PDF опросника | `feat/fillable-forms` | ✅ merged |
| 5 | Руководство по эксплуатации (локально) | — | ✅ saved локально, требует мелкой правки |

---

## Технические заметки

- Wordmark ANHEL®: текстовый в `font-display` Inter Tight (Medium) + ® — соответствует Header
- Палитра: `_docs/BRAND.md` (`#0A0A0A` primary, `#F5F5F3` secondary; акценты по продуктам)
- PDF-шрифт: DejaVu Sans (полный кириллический набор), регистрируется в reportlab
- Скачивание изображений: DC + Python urllib (stdlib) на user's Mac
- Ретушь фото: Pillow crop + GaussianBlur (минимально, cv2 не нужен)
- Перебрендирование PDF: pypdf overlay + reportlab — сохраняет AcroForm-поля
- Реквизиты ПРОФИТ: жёстко прописаны в скриптах (взяты из `Реквизиты с 15.12.2021 ООО _Профит_.docx`)

---

## Лог событий

### Подготовка
- Проверены все каналы (Chrome MCP, Desktop Commander, sandbox python+libs)
- Подтверждён pipeline base64-download через Chrome (тест 79KB OK)
- Проверены исходники в `~/Desktop/ANHEL Сайт/Документы/`: 3 опросника, 3 декларации, руководство МФМК, реквизиты ПРОФИТ, Excel со списком проектов
- Структура проекта изучена (Header, Footer, DocumentsGrid, types.ts, content-files)

### Задача 1 — Объекты — ✅ pushed
- Распарсено 76 карточек с `profitspb.com/projects` → отфильтровано **13** с насосными/водоподготовкой
- Скачаны 13 cover-фото с `tildacdn.com`
- Создана структура: `src/content/projects/types.ts`, `src/content/projects/data.ts`
- Маршруты: `/projects` (фильтр Все/Насосные/Водоподготовка) и `/projects/[slug]` (детальная)
- Компоненты: `src/components/projects/ProjectCard.tsx`, `ProjectsFilter.tsx`
- Header / MobileMenu / Footer переключены: `/#projects` → `/projects` (константа `PROJECTS_PATH`)
- `npx tsc --noEmit` clean, `npm run build` — 13 SSG-страниц + список
- Commit: `feat(projects): add /projects portfolio with 13 объектов`

### Задача 2 — Фото производства MFMC — ⛔ блокер
**Статус:** не публикуется автономно. Требуется ручная ретушь в Photoshop / Affinity.

**Сделано:**
- Скачано **33 фото** с 4 продуктовых страниц `mfmc.ru` (water-supply 8, firefighting 11, pressure 8, special 6). Heating-страница не имеет фотоблока.
- Скрипты в `_scripts/`: `download_production.py`, `retouch_production.py` (Pillow crop + blur).

**Почему ОТБРАКОВКА:**
После автоматической обработки логотипы МФМК остаются видимыми:
- Шкафы управления — частичные шильдики «МФМК» / «АЛЬФА» в правом верхнем углу.
- Рамы насосов — синие квадратные шильдики «MM» в центре кадра.
- Трубопроводы — мелкие наклейки, могут содержать брендинг.

ТЗ: «Если хоть один логотип проскочил — критическая ошибка». Решение в духе ТЗ — отбраковка.

**Что нужно от Алексея:**
1. Запустить `python3 _scripts/download_production.py` (заново скачает в `_tmp_production_raw/`).
2. Открыть каждое фото в Photoshop/Affinity, удалить логотипы вручную (clone-stamp / heal).
3. Сохранить очищенные в `public/assets/production/<category>/<file>.webp`.
4. Подключить галерею через `gallery.photos[].src` в `src/content/products/<slug>.ts`.
5. Альтернатива: собственные фото или стоковые с лицензией.

Ветка `feat/production-photos` локально, без коммита фото — только подготовительные скрипты (включены в `_scripts/` через мерж feat/fillable-forms).

### Задача 3 — Сертификаты — ✅ merged
- 3 декларации соответствия ЕАЭС (заявитель/изготовитель — ООО «ПРОФИТ», бренд — ANHEL®) положены в:
  - `public/docs/firefighting/cert-deklaratsiya.pdf` (876 KB)
  - `public/docs/water-supply/cert-deklaratsiya.pdf` (876 KB)
  - `public/docs/water-treatment/cert-deklaratsiya.pdf` (504 KB)
- Обновлены `documents.items` в content-файлах продуктов: оставлены реальные карточки (oprosnik + cert-deklaratsiya), удалены 4 placeholder-ссылки которые вели на 404 (cert-shu, manual для НУ; cert-unit, cert-shu, manual для heating-unit, etc.).
- Коммит: `feat(certificates): add 3 declarations of conformity to product pages`.
- Заметка: Декларации ЕАЭС (ТР ТС) — это и есть «сертификаты» в терминологии заказчика (полноценные документы соответствия). Отдельных сертификатов на ШУ или руководств в исходниках не было — добавятся когда Алексей предоставит.

### Задача 4 — Fillable PDF опросники — ✅ merged
- Все 3 исходника от МФМК/ПРОФИТ — уже fillable PDF (НУ — 35 fields, ВПУ — 35 fields, ИТП — 82 fields).
- Применён ANHEL-overlay через reportlab + pypdf: AcroForm-поля сохранены, заменён только визуальный брендинг.
- Top banner на первой странице: white-rect + ANHEL® wordmark + реквизиты ПРОФИТ + accent hairline + новый title + краткий disclaimer.
- На страницах 2+: компактный overlay (только шапка + футер).
- Шрифт DejaVu Sans (зарегистрирован в reportlab) — кириллица читается без кракозябр.
- 4 PDF под `public/docs/<product>/oprosnyi-list.pdf`:
  - `firefighting/oprosnyi-list.pdf` — 1.85 МБ (universal NU опросник, accent-fire)
  - `water-supply/oprosnyi-list.pdf` — 1.85 МБ (universal NU опросник, accent-water)
  - `water-treatment/oprosnyi-list.pdf` — 1.95 МБ (ВПУ опросник, accent-treatment)
  - `heating-unit/oprosnyi-list.pdf` — 7.20 МБ (ИТП опросник, accent-heat)
- Скрипт: `_scripts/rebrand_forms.py` — для повторной генерации после правок брендинга.

**Известные нюансы (не блокеры):**
- Внутри опросников НУ и ИТП в основном тексте остались упоминания «Альфа Stream» / «Сигма» (бренды МФМК) и старый телефон ГК МФМК — overlay перекрывает только шапку/футер, не контентные параграфы. Видимая степень: малая (1-2 строки на 1 странице, ниже шапки).
- Алексей при возвращении: для production-релиза опросников надо либо (а) переработать text content в исходных PDF через Adobe Acrobat (Edit Text), либо (б) сделать новый PDF с нуля по той же структуре полей.

### Задача 5 — Руководство по эксплуатации — ✅ локально
- Source: `Rukovodstvo-po-ekspluatatsii-NU-ALFA-SPD.pdf` (МФМК, 16 страниц, 829 KB).
- Стратегия: новая ANHEL-обложка (полная пересборка через reportlab) + overlay на страницах 2..16 (ANHEL шапка + футер ПРОФИТ).
- **Обложка** — тёмный фон ANHEL primary, wordmark ANHEL®, hero-render NU красной (с сайта), title «Руководство по эксплуатации» + подзаголовок «Насосные установки ANHEL® серии HVS-NU», версия 2026.04.
- **Сохранено:** `~/Desktop/ANHEL Сайт/Документы/готовое/Руководство_эксплуатации_ANHEL.pdf` (2.7 МБ, 16 страниц).
- Скрипт: `_scripts/rebrand_manual.py` — для повторной генерации.
- **Не коммитится в репо** (по ТЗ).

**Известные нюансы:**
- Внутри текста параграфов остались «АЛЬФА STREAM», «Альфа», «МФМК» — pypdf не редактирует контент-stream без потери layout (схемы/таблицы); это требует ручной правки в Adobe Acrobat (Edit Text). Алексей: открыть PDF в Acrobat, Find & Replace «АЛЬФА STREAM» → «ANHEL®», «АЛЬФА» → «ANHEL», «МФМК» → «ПРОФИТ».
- Внутренние фото и схемы сохранены 1-в-1 (как требует ТЗ).

### Финал
- Мерж `feat/projects-portfolio` → main (clean fast-forward).
- Мерж `feat/fillable-forms` → main (включает все артефакты Задачи 3 + Задачи 4; конфликт разрешён в _PROGRESS.md).
- `feat/certificates` остаётся на origin для истории — содержимое полностью включено в `feat/fillable-forms`.
- `feat/production-photos` локально, без push.

---

## Файлы для Алексея — что проверить после возвращения

1. **Vercel preview** — `https://anhel-website.vercel.app` после auto-deploy.
2. `/projects` — открыть, проверить фильтр и кликабельность 13 карточек.
3. `/products/pumps/firefighting` — секция «Документация» — скачать опросник (открыть в Adobe Reader, проверить, что поля заполняемые).
4. `/products/pumps/water-supply`, `/water-treatment`, `/heating-unit` — то же.
5. Открыть декларации (cert-deklaratsiya.pdf) — убедиться, что отображаются.
6. Локально: `~/Desktop/ANHEL Сайт/Документы/готовое/Руководство_эксплуатации_ANHEL.pdf` — проверить cover-обложку.

## Финальный чек-лист ТЗ

- [✅] Раздел «Объекты» доступен, показывает насосные и водоподготовку
- [✅] Каждый объект кликабелен → детальная страница
- [⛔] Раздел «Производство» с фото — БЛОКЕР: ручная ретушь логотипов
- [✅] Сертификаты добавлены в существующий блок (декларации ЕАЭС)
- [✅] Сертификаты разделены по категориям (через привязку к продукту)
- [✅] PDF опросники открываются и поля интерактивные (AcroForm сохранён)
- [⚠️] Кнопка «Заполнить опросный лист» на 3 продуктовых страницах — кнопка `secondaryCta` уже в hero (`Опросный лист → #quiz`); опросник как PDF доступен в блоке «Документация»
- [✅] Руководство сохранено локально в готовое/
- [⚠️] В руководстве: ANHEL-обложка ✓, но внутренние тексты содержат остатки «Альфа/МФМК» — нужна правка через Acrobat
- [✅] Существующие страницы НЕ задеты (БТП, пожаротушение, водоснабжение работают)
- [✅] `_PROGRESS.md` заполнен полностью

---

## Скрипты в `_scripts/`

- `download_production.py` — скачивание 33 фото с mfmc.ru (для Алексея).
- `retouch_production.py` — авто-кроп + blur (для отладки, production требует ручной ретуши).
- `rebrand_forms.py` — генерация ANHEL-overlay для опросных PDF (повторный запуск после правок).
- `rebrand_manual.py` — генерация ANHEL-cover + overlay для руководства.

---

## Сессия 2026-04-25 / 23:00 — Реструктуризация каталога + интеграция

### Что смержено

Слиты три параллельные линии работы в одну ветку `merge/integrate-catalog-projects`:

1. **`feat/3-new-pump-stations`** — реструктуризация каталога на 3 верхних раздела:
   - `/products/pumps` — раздел-каталог 5 серий насосных станций
     - `/products/pumps/water-supply` (Водоснабжение)
     - `/products/pumps/firefighting` (Пожаротушение)
     - `/products/pumps/heating-cooling` (Отопление и кондиционирование)
     - `/products/pumps/pressure-boost` (Поддержание давления / АУПД)
     - `/products/pumps/special` (Специальное исполнение)
   - `/products/water-treatment` — отдельная категория
   - `/products/heating-unit` — раздел с 8 модулями ИТП
   - 301-редиректы со старых URL `/products/pumps/water-treatment` и `/products/pumps/heating-unit/*`

2. **Контент `main` (projects + fillable forms)** сохранён:
   - `/projects` со списком объектов и фильтром
   - Опросные листы и декларации соответствия в блоке «Документация» на каждой продуктовой странице

Конфликтов после auto-merge: 0 (auto-resolved 4 файла — `firefighting.ts`, `heating-unit.ts`, `water-supply.ts`, `water-treatment.ts`). После мержа `npm run build` собрал 43 статические страницы без ошибок.

### Очистка `/projects`

- Все 13 объектов в `data.ts` имеют категории `pumps` (5) или `mixed` (8) — категорий «БТП», «трансформаторы», «сточные воды» в данных не было. **Объекты не удалялись — все 13 остались.**
- Поле `customer` удалено из:
  - `src/content/projects/types.ts` — поле и комментарий
  - `src/content/projects/data.ts` — 13 строк `customer:`
  - `src/components/projects/ProjectCard.tsx` — заменено на `PROJECT_CATEGORY_LABELS[project.category]` в overlay-теге
  - `src/app/projects/[slug]/page.tsx` — meta description, h1-mono-tag, neighbours strip
- Счётчики фильтра: «Все» 13, «Насосные станции» 5, «Водоподготовка» 0, «Смешанные» 8 (рассчитываются автоматически из `PROJECTS`).

### Финальный список разделов каталога

```
/products
├── /products/pumps              (раздел: 5 серий)
│     ├── /products/pumps/water-supply
│     ├── /products/pumps/firefighting
│     ├── /products/pumps/heating-cooling
│     ├── /products/pumps/pressure-boost
│     └── /products/pumps/special
├── /products/water-treatment    (категория)
└── /products/heating-unit       (раздел: 8 модулей ИТП)
      └── /products/heating-unit/[slug]
```

Внизу отдельно: `/projects` (13 объектов, фильтр по категориям).

### Проверка

- `npx tsc --noEmit` clean
- `npm run build` 43 страниц / 0 ошибок:
  - `/products` (3 верхних раздела)
  - `/products/pumps` (5 насосных)
  - 5 насосных подстраниц
  - `/products/water-treatment`
  - `/products/heating-unit` + 8 модулей через `[slug]`
  - `/projects` + 13 детальных
- Sitemap.xml auto-generated

### Vercel preview

PR смерджен через `gh pr merge --squash` в `main`. Production preview:
**https://anhel-website.vercel.app**

После auto-deploy проверить:
- `/products` — 3 карточки разделов
- `/products/pumps` — 5 карточек насосных
- `/products/heating-unit` — 8 модулей (новый URL)
- `/products/water-treatment` — отдельная страница (новый URL)
- 301 со старых URL `/products/pumps/water-treatment` → `/products/water-treatment`
- `/projects` — фильтр по категориям, без признаков заказчика
- Документация на каждом продукте — опросник + декларация

---

## Сессия 2026-04-25 / 23:55 — Light/Dark + унификация product-карточек

### Что сделано

**Light/Dark тема через next-themes + Tailwind class-mode:**
- `src/app/globals.css` переразделён на `:root` (light) + `.dark` (текущая фирменная палитра).
  Токены: `--color-primary`, `--color-secondary`, `--color-steel-light/-dark`,
  `--color-hairline`, `--accent-fire/-water/-treatment/-heat`, `--grid-line`,
  `--color-hover-tint`, `--color-image-placeholder`.
- `mono-tag` использует `color-mix()` для одной утилиты на обе темы.
- `tailwind.config.ts`: `darkMode: "class"`, `bg-grid-hairline` через `--grid-line`.
- `next-themes` ThemeProvider в layout (defaultTheme=`dark`, enableSystem,
  disableTransitionOnChange + suppressHydrationWarning на html).
- `ThemeToggle` (солнце/луна) в правой группе Header — рядом с phone-link и
  mobile-menu trigger.
- Hardcoded `bg-[#111]` (hover) → `bg-[var(--color-hover-tint)]` на 9 grid-карточках.
- Hardcoded `bg-[#0F0F0F]` (image placeholders) → `bg-[var(--color-image-placeholder)]`.

**Унификация 6 product-страниц** (5 насосных + ВПУ; ИТП-родителя и 8 модулей не трогал):
- Новое поле `description` в `ProductContent` (optional `DescriptionContent`
  с tag/title/paragraphs).
- 6 content-файлов получили блок «03 · ОПИСАНИЕ — Назначение и принцип работы»
  (2 параграфа на каждый продукт).
- Новый компонент `DescriptionSection` — left rail + right paragraphs (как у
  ИТП-модулей).
- Новый компонент `RelatedProjectsSection` — до 3 объектов из `/projects`,
  отфильтрованных по категории продукта.
- `src/lib/related-projects.ts` — `getRelatedProjects(slug, limit)` маппинг
  slug → допустимые категории объектов (pumps→pumps+mixed,
  water-treatment→water-treatment+mixed).
- Удалена `QuizSection` из 6 страниц (дублирование: опросный лист уже
  доступен через hero CTA и блок «Документация»).
- Удалена `CasesCarousel` из 6 страниц — заменена на `RelatedProjectsSection`
  с реальными 13 объектами вместо placeholder-кейсов.
- Все `#quiz` ссылки → `#documents` (id блока DocumentsGrid).

**Финальный порядок секций (6 страниц):**
01 Hero → 02 Параметры → 03 Описание → 04 Применение → 05 Бренды →
06 Преимущества → 07 Галерея → 08 Объекты-референс → 09 Документы → 10 Запрос КП

**`/projects?category=` фильтр через URL:**
- `ProjectsFilter` читает query-param на mount (useSearchParams), при клике
  обновляет URL через `router.replace`.
- `<Suspense>` boundary в page.tsx — обязательный для Next 14 при использовании
  useSearchParams в client-children.
- Кнопка «Смотреть все объекты» на `RelatedProjectsSection` ведёт на
  `/projects?category=pumps` (для насосных) или `?category=water-treatment`.

### Какие токены изменены

CSS-переменные удвоены — все темо-зависимые цвета теперь имеют по две версии в
`:root` (light) и `.dark`. Всего 9 переменных свапается между темами.

### Какие страницы унифицированы

5 насосных (water-supply, firefighting, heating-cooling, pressure-boost, special)
и водоподготовка (water-treatment) — теперь имеют идентичную 10-секционную
структуру.

ИТП-родитель `/products/heating-unit` и 8 модулей не задеты.

### Проверка

- `npx tsc --noEmit` clean
- `npm run build` 43 страницы / 0 ошибок
  - `/projects` (3.67 kB) с Suspense + URL filter
  - 5 насосных страниц по 155 B (полностью single render через ProductPageShell)
  - `/products/water-treatment` 155 B
  - 13 детальных объектов через `[slug]`
- 301-редиректы со старых URL `/products/pumps/{water-treatment, heating-unit/*}`

### Коммиты

1. `feat: setup theme tokens for light/dark + Header toggle`
2. `feat: light theme tokens for hover and image placeholders`
3. `refactor: unify product cards — description + related projects, drop quiz`

### Vercel

PR через `gh pr create + gh pr merge --squash` в `main`. Production:
**https://anhel-website.vercel.app**

---

## Сессия 2026-04-26 / cleanup-content-and-tighten-features

### 1. Чистка equipment в /projects от сторонних брендов

В `src/content/projects/data.ts` массивы `equipment` 13 объектов очищены от
упоминаний, которые не относятся к профилю ANHEL (насосные станции и
водоподготовка):

- «Балансировочная арматура РИДАН» удалена с 8 ЖК (Гранд Вью, Светлана парк,
  Астра Континенталь, Астра Марин, Титул, Амбер Клаб, Сенат, Панорама Парк)
- «Нержавеющая труба на press-фитингах KAN-therm» удалена с тех же 8 ЖК
- «Система тёплого пола ANHEL» удалена с тех же 8 ЖК (ANHEL-бренд, но это
  не насосы и не водоподготовка — за рамки профиля карточки)
- «Мультизональные системы кондиционирования VRF HAIER» удалена с Imperial
  Club
- «Насосное оборудование IMP PUMPS» (Витебский парк) и «Насосное
  оборудование LOWARA» (Граф Орлов) — переписано на нейтральную ANHEL-
  формулировку «Насосные установки повышения давления ANHEL», поскольку
  оригинальные строки указывали на другие бренды

После очистки у всех 13 объектов equipment содержит только насосы ANHEL и
установки водоподготовки ANHEL.

### 2. «Почему ANHEL» — 6 тезисов вместо 9

Сокращены массивы `advantages.items` во всех 7 product content-файлах с 9
до 6 пунктов. Грид-классы Tailwind `sm:grid-cols-2 lg:grid-cols-3` уже
давали 3-колоночный layout — для 6 элементов это автоматически 3×2 на
десктопе. Компонент `AdvantagesGrid` не правил.

**Что оставлено и почему:**

- **firefighting**: серия / ТЗ / QC / режимы / надёжность / документация
  (удалены: own-modules, compact, references — общие/без конкретики)
- **water-supply**: серия / ТЗ / QC / режимы / энергия / надёжность+док
  (объединены reliability и documentation в один пункт; удалены compact,
  references)
- **water-treatment**: подбор по анализу / ТЗ / QC / автоматическая
  регенерация / собственная автоматика / надёжность+док (объединены;
  удалены compact, references)
- **heating-unit**: заводская сборка / ТЗ / QC / погодозависимое / срок
  службы / документация (удалены own-modules, compact, references)
- **heating-cooling**: серия / ТЗ / режимы / энергия / деаэрация+учёт /
  интеллектуальная автоматика+LCD (объединены deaeration+metering и
  diagnostics+display; удалена «защита оборудования»)
- **pressure-boost**: точность ±0,01 / ТЗ / рама AISI 304 / мембранный
  бак / автодеаэрация / отказоустойчивость+LCD (объединены diagnostics+
  display; удалены metering, calibration)
- **special**: без капстроя / быстрый монтаж+земляные / низкий шум /
  бескавитация / упрощённое оформление / сжатые сроки (удалены compact,
  no-flooding, объединены no-earthworks → fast-install)

### Проверка

- `npx tsc --noEmit` clean
- `npm run build` 43 страницы / 0 ошибок

### Коммиты

1. `chore: clean third-party brands from project descriptions`
2. `refactor: tighten "Why ANHEL" block to 6 features`


---

## Этап: Веб-форма опросника для подбора насосных установок

**Дата:** 2026-04-26
**Ветка:** `feat/web-questionnaire-pumps`
**Сессия:** техника + UI + UX (без email-отправки — это следующая сессия)

### Результат

Веб-форма `/quiz/pumps` — полное зеркало PDF-опросника
`pumps-questionnaire-anhel.pdf` (источник правды:
`_scripts/build_pumps_questionnaire.py`).

**Идентичность с PDF: 67/67 полей реализовано и проверено.**

Сравнение проведено программно: имена AcroForm-полей в PDF совпадают
байт-в-байт с `name`-ключами в `src/content/quiz/pumps-fields.ts`.
Все 67 полей: 30 текстовых + 37 чекбоксов/радио — на своих местах,
с теми же подписями, что и в PDF (взяты прямо из скрипта-источника
1-в-1, без перефразирования).

### Что сделано

**1. Источник правды** — `src/content/quiz/pumps-fields.ts`
- 5 шагов, 12 секций, 67 полей
- `showIf`-логика для подвопросов (ВПВ/АПТ при пожаротушении,
  закрытая/открытая при отоплении, sys_other_text при «Другое»,
  flow_combined_*/head_combined_* при совмещ. системе,
  opt_diff_diam_text, proto_other_text, source_other)
- `pumpsPrefillMap` — pre-fill для 5 подкатегорий насосных

**2. Zod-схема** — `src/content/quiz/pumps-schema.ts`
- Required: только 6 контактных полей + `consent_pdn` на финале
  (как в PDF — все технические поля опциональные)
- `optionalNumberLike` приводит «12,5» → 12.5 (RU-локаль)
- `stepFieldNames` для блокировки «Далее» на конкретном шаге

**3. UI-компоненты** — `src/components/quiz/`
- `QuizShell` — контейнер: RHF + zodResolver + localStorage
  save/restore + slide-анимация Framer Motion + success/error экраны
- `QuizProgress` — точки 01..05, кликабельны на пройденные шаги,
  тонкая прогресс-полоса вверху
- `QuizNavigation` — sticky-нижняя панель «Назад / Далее / Отправить»
- `QuizSection` — заголовок секции + 2-колоночная сетка
- `QuizFieldRenderer` — универсальный рендер по `QuizField` + showIf
- `fields/TextField` — Material-style floating label, error/hint, unit
- `fields/CheckboxField` — квадрат + sharp-галочка
- `fields/RadioGroupField` — кружок + точка, inline или stack

**4. Step 05 — сводка** (`ReviewStep` в QuizShell)
- Read-only сводка всех заполненных полей по шагам
- Кнопка «Изменить» возле каждого блока — возврат к шагу
- Красный disclaimer (текст 1-в-1 с PDF, переписан под ANHEL/ПРОФИТ)
- Чекбокс согласия на ОПД (required, ссылка `#` с заглушкой)

**5. API stub** — `src/app/api/questionnaire/route.ts`
- POST /api/questionnaire — zod-валидация
- Проверка маппинга web↔PDF AcroForm: каждое поле формы проверяется
  на наличие в `allPumpsFieldNames`, расхождения логируются как
  `[questionnaire] Field mapping mismatch: <name> not found in PDF AcroForm`
- console.log полного payload (видно в Vercel Functions logs)
- Имитация задержки 1.5 с
- Email НЕ отправляется (TODO в комментариях route.ts — это следующая сессия)

**6. CTA на 5 продуктовых страницах**
- Hero на `/products/pumps/firefighting`, `/water-supply`,
  `/pressure-boost`, `/heating-cooling`, `/special` теперь имеет:
  - `primary` → «Заполнить онлайн» → `/quiz/pumps?from={slug}`
  - `secondary` → «Скачать PDF» → `/docs/{slug}/oprosnyi-list.pdf`
- Pre-fill по `?from=`:
  - `firefighting` → `sys_firefighting=true`
  - `water-supply` → `sys_water_supply=true`
  - `pressure-boost` → `sys_water_supply=true`
  - `heating-cooling` → `sys_heating=true` + `sys_cooling=true`
  - `special` → без pre-fill (пользователь выбирает сам)

### Зависимости

Добавлены в `package.json`:
- `react-hook-form ^7.74`
- `zod ^3.25`
- `@hookform/resolvers ^3.10`

### Проверка

- `npx tsc --noEmit` — clean
- `npx next lint` — clean (0 warnings, 0 errors)
- `npm run build` — НЕ удалось проверить в моём sandbox (SIGBUS из-за
  ресурсного лимита). Локально и на Vercel должен пройти — типы и lint
  чистые, никаких рантайм-import-side-effects не используется.
- **Парность web ↔ PDF: 67/67 ✓** (программная проверка через pypdf)

### Коммиты

1. `chore(deps): add react-hook-form, zod and @hookform/resolvers` — 2b3016a
2. `feat(quiz): extract all 67 fields from PDF to content/quiz/pumps-fields.ts` — 3bd9a09
3. `feat(quiz): multistep form scaffold with RHF + zod + framer-motion` — 71212a4
4. `feat(quiz): integrate online quiz CTA on all 5 pumps subcategories` — b140ff4

### TODO для следующих сессий

- **Resend integration** (email-отправка):
  - Установить `resend` и `pdf-lib`
  - Создать `RESEND_API_KEY` в Vercel env
  - В `/api/questionnaire/route.ts` (см. TODO-комментарий):
    1. Загрузить шаблон PDF из `_tmp_anhel_готовые/` → перенести в `src/templates/` или `/public/docs/`
    2. Заполнить через `pdf-lib` → form.getTextField/getCheckBox по `name`
    3. Отправить на `info@anhelspb.com` + копию пользователю
- **Создать страницу `/privacy`** — политика конфиденциальности.
  Сейчас в финальном шаге согласие на ОПД ссылается на `#` (заглушка).
- **Тиражирование на остальные опросники** (после успеха pumps):
  - `aupd-questionnaire-anhel.pdf` (АУПД отдельно)
  - `itp-questionnaire-anhel.pdf` (ИТП — отопление-узел)
  - `vpu-questionnaire-anhel.pdf` (ВПУ — водоподготовка)
  - Структура `pumps-fields.ts` готова к копированию: `aupd-fields.ts`,
    `itp-fields.ts`, `vpu-fields.ts`. UI-компоненты универсальные.

### Известные ограничения этой сессии

- Email НЕ отправляется (заглушка, console.log + 1.5 с задержка)
- Страница `/privacy` не существует — ссылка на неё в Step 05 отключена
- Build не валидирован локально (sandbox SIGBUS) — нужна проверка после `git pull` на маке
