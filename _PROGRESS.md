# Автономная сессия — большая задача ANHEL

**Старт:** 2026-04-25
**Исполнитель:** Claude (Cowork mode)
**Источник ТЗ:** uploads/TZ_ANHEL_большая_задача.md

---

## Статус по задачам

| # | Задача | Ветка | Статус |
|---|---|---|---|
| 1 | Объекты (портфолио) — насосные + водоподготовка | `feat/projects-portfolio` | в работе |
| 2 | Фото производства MFMC + ретушь | `feat/production-photos` | ждёт |
| 3 | Сертификаты в существующий блок | `feat/certificates` | ждёт |
| 4 | 3 fillable PDF опросника | `feat/fillable-forms` | ждёт |
| 5 | Руководство по эксплуатации (локально) | — | ждёт |

---

## Технические заметки

- Wordmark: текстовый `ANHEL®` в Inter Tight Display (Medium) + ® — соответствует существующему Header
- Палитра: из `_docs/BRAND.md` (`#0A0A0A` primary, `#F5F5F3` secondary, акценты по продуктам)
- Шрифты PDF: Inter (Google Fonts, Open Font License) — скачаю в скрипте генерации
- Скачивание изображений: Chrome MCP `fetch → arrayBuffer → base64` → DC `python -c base64.decode | open(...)` (обходит CORS блокировку download-атрибута)
- Ретушь: cv2.inpaint (TELEA + NS), отбраковка нечистых
- Реквизиты ПРОФИТ: парсинг из `~/Desktop/ANHEL Сайт/Документы/Реквизиты с 15.12.2021 ООО _Профит_.docx`

---

## Лог событий

### 2026-04-25
- ✅ Проверены все каналы (Chrome, DC, sandbox-libs)
- ✅ Подтверждён pipeline base64-download (тест на kvartry-v-4990-zhk-i.jpg → 79KB OK)
- ✅ Проверены исходники в `~/Desktop/ANHEL Сайт/Документы/` — все 3 опросника, 3 декларации, руководство МФМК, реквизиты, Excel со списком проектов на месте
- ✅ Структура проекта изучена (Header, Footer, DocumentsGrid, types.ts, content-files)
- ⏳ Начинаю Задачу 1: создаю ветку, парсер profitspb…
