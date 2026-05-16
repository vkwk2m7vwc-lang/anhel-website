# ANHEL — bilingual term glossary

Source of truth for technical terminology across the website. When a
new term shows up in `messages/ru/*.json`, add it here in all three
languages before writing the EN/TR translations — keeps the register
consistent across pages.

Tone bench-marks:
- **EN** — Grundfos, Wilo, IMI Hydronic, Honeywell. Industrial-
  engineering register, no consumer software words ("solution",
  "platform"). "We manufacture …", not "We offer …".
- **TR** — Vansan, Sempa, Esmaksan. Mühendislik / endüstri jargonu,
  pazarlama dilinden uzak. "Üretiyoruz", not "sunuyoruz".

---

## Product lines & equipment

| RU | EN | TR |
|---|---|---|
| насосная станция | pumping station | pompa istasyonu |
| блочный тепловой пункт (БТП) | block heat substation | blok ısı istasyonu |
| индивидуальный тепловой пункт (ИТП) | individual heat substation | bireysel ısı istasyonu |
| водоподготовка | water treatment | su arıtma |
| установка водоподготовки | water treatment unit | su arıtma ünitesi |
| шкаф управления | control cabinet | kontrol panosu |
| система пожаротушения | fire-suppression system | yangın söndürme sistemi |
| пожарная установка | fire-suppression unit | yangın söndürme ünitesi |
| повысительная насосная станция | pressure-boosting pumping station | basınç artırıcı pompa istasyonu |
| водоснабжение | water supply | su temini |
| отопление и охлаждение | heating and cooling | ısıtma ve soğutma |
| ГВС (горячее водоснабжение) | domestic hot water (DHW) | sıcak kullanım suyu |
| ввод (тепловой) | (heat) intake | (ısı) girişi |
| подпитка | make-up | takviye |
| тепловой пункт | heat substation | ısı istasyonu |
| гидравлика | hydraulics | hidrolik |
| тепловая схема | thermal circuit | ısıl şema |
| ППА (противопожарная автоматика) | fire alarm | yangın alarmı |
| ПДВ (противодымная вентиляция) | smoke control | duman kontrolü |
| КНС (канализационная насосная станция) | sewage pumping station | kanalizasyon pompa istasyonu |
| ЧРП (частотно-регулируемый привод) | variable frequency drive (VFD) | değişken frekanslı sürücü (VFD) |
| электропривод | electric drive | elektrik tahriki |

## Process & manufacturing

| RU | EN | TR |
|---|---|---|
| модуль | module | modül |
| модульный | modular | modüler |
| блочно-модульный | block-modular | blok-modüler |
| заводская сборка | factory assembly | fabrika montajı |
| серийное производство | serial production | seri üretim |
| конструкторское бюро (КБ) | engineering office | mühendislik ofisi |
| сборочный цех | assembly shop | montaj atölyesi |
| испытательный стенд | test bench | test tezgâhı |
| стендовые испытания | bench testing | tezgâhta test |
| гидравлические испытания | hydraulic testing | hidrolik test |
| электрические испытания | electrical testing | elektriksel test |
| пусконаладка | commissioning | devreye alma |
| монтаж | installation | montaj |
| отгрузка | shipment | sevkiyat |
| полный цикл | full cycle | tam döngü |
| под ключ | turnkey | anahtar teslim |
| расчёт и подбор | sizing and selection | hesaplama ve seçim |
| рабочая документация | working documentation | çalışma belgesi |

## Customer-facing actions (CTAs)

| RU | EN | TR |
|---|---|---|
| Запросить ТКП | Request a quote | Teklif iste |
| Скачать каталог | Download catalogue | Kataloğu indir |
| Связаться с инженером | Talk to an engineer | Mühendisle konuş |
| Каталог продукции | Product catalogue | Ürün kataloğu |
| Связаться | Get in touch | İletişime geç |
| Подробнее | Learn more | Daha fazla |
| Запросить визит на производство | Request a factory visit | Fabrika ziyareti talep et |
| Опросный лист | Specification sheet | Teknik veri formu |

## Documents & navigation

| RU | EN | TR |
|---|---|---|
| Продукты | Products | Ürünler |
| Документация | Documentation | Belgeler |
| Объекты / Проекты | Projects | Projeler |
| Производство | Manufacturing | Üretim |
| Сервис | Service | Servis |
| О компании | About | Hakkımızda |
| Контакты | Contact | İletişim |
| Опросные листы | Specification sheets | Teknik veri formları |
| Каталоги | Catalogues | Kataloglar |
| Сертификаты | Certificates | Sertifikalar |
| Реквизиты | Company details | Şirket bilgileri |
| Декларация ЕАЭС о соответствии | EAEU conformity declaration | EAEU uygunluk beyannamesi |

## Legal & corporate

| RU | EN | TR |
|---|---|---|
| ООО «Профит» | Profit LLC (ООО «Профит») | Profit LLC (ООО «Профит») |
| ИНН | Tax ID (INN) | Vergi No (INN) |
| ОГРН | OGRN (registration number) | OGRN (kayıt numarası) |
| Все права защищены | All rights reserved | Tüm hakları saklıdır |
| Политика конфиденциальности | Privacy Policy | Gizlilik Politikası |
| Согласие на обработку данных | Personal Data Consent | Kişisel Veri Onayı |

## Geography

| RU | EN | TR |
|---|---|---|
| Санкт-Петербург | St. Petersburg | St. Petersburg |
| Москва | Moscow | Moskova |
| Россия | Russia | Rusya |
| по всей России | across Russia | Rusya genelinde |

## Branding rules

- `ANHEL®` — never transliterated. Always latin in every locale.
- Product brands `ANHEL HEAT` / `AQUA` / `FIRE` / `CONTROL` — latin
  everywhere. They're brand names, not feature labels.
- `ООО «Профит»` — keep Cyrillic, follow with `(Profit LLC)` on first
  mention in EN; in TR follow with `(Profit LLC)` on first mention.
  On the legal copyright footer, both EN and TR keep the Russian form
  in parentheses for legal correctness.
- Tax IDs, address numbers — values never translate; only labels do.
- Metric units only (°C, бар → bar, м³/ч → m³/h, кВт → kW, мм → mm).
- Decimal separator: `.` for EN/TR, `,` for RU.

## Workflow

When adding a new key to `messages/ru/<ns>.json`:
1. Translate to EN and TR using this glossary as the anchor.
2. If the term isn't here yet, add a row before writing the translations.
3. Mirror the new key into `messages/en/` and `messages/tr/`.

For now ZH/ES/FR are deferred to Stage 2 — once those locales land,
extend each table with three more columns. No structural changes
needed beyond columns.
