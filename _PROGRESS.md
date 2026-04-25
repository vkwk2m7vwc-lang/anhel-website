# Автономная сессия — большая задача ANHEL

**Старт:** 2026-04-25
**Исполнитель:** Claude (Cowork mode)
**Источник ТЗ:** uploads/TZ_ANHEL_большая_задача.md

---

## Статус по задачам

| # | Задача | Ветка | Статус |
|---|---|---|---|
| 1 | Объекты (портфолио) — насосные + водоподготовка | `feat/projects-portfolio` | ✅ pushed |
| 2 | Фото производства MFMC + ретушь | `feat/production-photos` | ⛔ блокер: ручная ретушь |
| 3 | Сертификаты в существующий блок | `feat/certificates` | в работе |
| 4 | 3 fillable PDF опросника | `feat/fillable-forms` | ждёт |
| 5 | Руководство по эксплуатации (локально) | — | ждёт |

---

## Технические заметки

- Wordmark: текстовый `ANHEL®` в Inter Tight Display (Medium) + ® — соответствует существующему Header
- Палитра: из `_docs/BRAND.md` (`#0A0A0A` primary, `#F5F5F3` secondary, акценты по продуктам)
- Шрифты PDF: Inter (Google Fonts, Open Font License) — скачаю в скрипте генерации
- Скачивание изображений: DC + Python urllib (stdlib)
- Ретушь: Pillow GaussianBlur + crop (cv2 не нужен, упростил)
- Реквизиты ПРОФИТ: парсинг из `Реквизиты с 15.12.2021 ООО _Профит_.docx`

---

## Лог событий

### 2026-04-25 — Подготовка
- Проверены все каналы (Chrome, DC, sandbox-libs)
- Подтверждён pipeline base64-download (тест 79KB OK)
- Проверены исходники в `~/Desktop/ANHEL Сайт/Документы/` — все 3 опросника, 3 декларации, руководство МФМК, реквизиты, Excel со списком проектов на месте
- Структура проекта изучена (Header, Footer, DocumentsGrid, types.ts, content-files)

### 2026-04-25 — Задача 1 (Объекты) — ✅ pushed
- Распарсено 76 карточек с profitspb.com/projects → отфильтровано 13 с насосными/водоподготовкой
- Скачаны 13 cover-фото с tildacdn.com
- Создана структура: `src/content/projects/types.ts`, `src/content/projects/data.ts`
- Маршруты: `/projects` (фильтр Все/Насосные/Водоподготовка) и `/projects/[slug]` (детальная)
- Компоненты: `src/components/projects/ProjectCard.tsx`, `ProjectsFilter.tsx`
- Header NAV / MobileMenu / Footer обновлены: `/#projects` → `/projects` (через константу `PROJECTS_PATH`)
- `npx tsc --noEmit` clean, `npm run build` clean (13 SSG-страниц + список)
- Commit: `feat(projects): add /projects portfolio with 13 объектов`
- Push: `origin/feat/projects-portfolio`

### 2026-04-25 — Задача 2 (Фото производства MFMC) — ⛔ блокер
**Статус:** не публикуется автономно. Требуется ручная ретушь логотипов в Photoshop / Affinity.

**Что сделано:**
- Скачано 33 фото с 4 продуктовых страниц mfmc.ru (water-supply 8, firefighting 11, pressure 8, special 6). Heating-страница не имеет фотоблока производства.
- Скрипт скачивания: `_scripts/download_production.py`.
- Применён автоматический кроп нижних 65% + GaussianBlur по верхней полосе — `_scripts/retouch_production.py`.

**Почему ОТБРАКОВКА:**
После автоматической обработки логотипы МФМК остаются видимыми:
- На шкафах управления — частичные шильдики «МФМК» / «АЛЬФА» в правом верхнем углу остаются (фото иногда сняты под углом — шкафы уходят ниже линии кропа).
- На рамах насосов — синие квадратные шильдики «MM» (лого МФМК) видны в центре кадра.
- На трубопроводах — мелкие наклейки (могут содержать брендинг).

ТЗ: «Если хоть один логотип проскочил — это критическая ошибка (юридический риск использовать чужой логотип). Если фото невозможно полностью очистить — НЕ публиковать его».

**Что нужно от Алексея:**
1. Запустить `python3 _scripts/download_production.py` чтобы пересоздать `_tmp_production_raw/`
2. Открыть каждое фото в Photoshop/Affinity, удалить логотипы вручную (clone-stamp / heal-tool / spot-removal)
3. Сохранить очищенные фото в `public/assets/production/<category>/<file>.webp`
4. Подключить галерею к продуктовым страницам через `gallery.photos[].src` в `src/content/products/<slug>.ts`
5. Альтернатива: использовать собственные фото или стоковые с лицензией

Ветка `feat/production-photos` оставлена локально с подготовительными скриптами в `_scripts/` (без коммита фото). Алексей решит после возвращения, мержить ли скрипты в main или удалить.

