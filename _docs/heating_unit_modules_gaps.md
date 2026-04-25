# Heating-Unit Modules — Content Gaps

## Status

Создана структура для 8 модулей ИТП линейки ANHEL® BITP-NU (бывший «Сигма Heat®» на mfmc.ru/catalog/sigma/).

| # | Slug | Реальные данные | Картинка |
|---|---|---|---|
| 01 | input-metering | ✓ полный (mfmc.ru) | placeholder bitp.png |
| 02 | open-heating | ✓ полный (mfmc.ru) | placeholder bitp.png |
| 03 | closed-heating | ⚠ tagline + общие ТТХ | placeholder bitp.png |
| 04 | makeup | ⚠ tagline + общие ТТХ | placeholder bitp.png |
| 05 | single-stage-dhw | ⚠ tagline + общие ТТХ | placeholder bitp.png |
| 06 | two-stage-dhw | ⚠ tagline + общие ТТХ | placeholder bitp.png |
| 07 | two-stage-dhw-monoblock | ⚠ tagline + общие ТТХ | placeholder bitp.png |
| 08 | steam-condensate | ⚠ tagline + общие ТТХ | placeholder bitp.png |

## Что нужно от заказчика

### Картинки модулей

Юзер прислал 8 рендеров модулей в чате (ночное задание 26.04.2026), но они доступны только в context-window — не сохранены файлами. Необходимо:

1. Сохранить 8 png-файлов в:
   ```
   public/assets/products/heating-unit/modules/
     input-metering.png
     open-heating.png
     closed-heating.png
     makeup.png
     single-stage-dhw.png
     two-stage-dhw.png
     two-stage-dhw-monoblock.png
     steam-condensate.png
   ```

   Сейчас все 8 модулей используют общий `/assets/products/bitp.png` как fallback.

### Контент модулей 03–08

На mfmc.ru у модулей 3-8 ТТХ извлекалось через JS-extractor неполно (Bitrix HTML структура неоднородная). Текущие TS-файлы содержат:

- **Модуль 03 (closed-heating)** — общие ТТХ закрытой системы (теплообменник, циркуляционные насосы)
- **Модуль 04 (makeup)** — заполнение / подпитка системы отопления
- **Модуль 05 (single-stage-dhw)** — одноступенчатая ГВС
- **Модуль 06 (two-stage-dhw)** — двухступенчатая ГВС
- **Модуль 07 (two-stage-dhw-monoblock)** — двухступенчатая ГВС на базе моноблока
- **Модуль 08 (steam-condensate)** — пароконденсатные системы

Требуется ручной dive на каждую под-страницу mfmc.ru/catalog/sigma/<slug>/ для уточнения ТТХ. Источник работает, заказчик может верифицировать на своей стороне.

## Источник по структуре

Все 8 модулей: mfmc.ru/catalog/sigma/{modul-vvoda-i-ucheta-tepla, modul-otkrytoy-sistemy-otopleniya, modul-zakrytoy-sistemy-otopleniya, modul-zapolneniya-podpitki-sistemy-otopleniya, modul-odnostupenchatoy-sistemy-gvs, modul-dvukhstupenchatoy-sistemy-gvs, modul-dvukhstupenchatoy-sistemy-gvs-na-baze-monobloka, steam-condensate}/

## Замены контента

- «Сигма Heat®» → ANHEL® BITP-NU
- «МФМК» / «Группа компаний МФМК» → не упоминаются
- «Сигма» (одиночное) → ANHEL®
- Общая стилистика — премиум B2B, третье лицо
