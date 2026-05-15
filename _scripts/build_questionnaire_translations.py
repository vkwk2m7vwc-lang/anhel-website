#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_questionnaire_translations.py  —  PDF localization wave-2 (rewrite)

Generates EN and TR PDF questionnaires that are VISUALLY IDENTICAL to the
Russian master (``public/docs/<cat>/oprosnyi-list.pdf``): same header,
company requisites block, equipment image, field boxes, footer and page
count.  Only the language of the text changes.

Why a rewrite
-------------
The wave-3 version of this script composed its own A4 layout from
scratch (single-line header + "Document ID", STEP blocks, no equipment
image, 7 pages instead of 3).  The result did not read as a localized
version of the RU master.  This rewrite instead *translates the RU
master in place*:

  1. open the RU master with PyMuPDF;
  2. cover every Russian text span with an opaque white rectangle;
  3. redraw the translated string at the exact same baseline, font,
     size and colour.

Vector graphics (rules, field boxes, check-boxes), raster images and
AcroForm widgets are never touched, so the EN/TR files are pixel-faithful
to the master apart from the glyphs themselves.

Fonts
-----
The RU master was built with DejaVu Sans / DejaVu Sans-Bold.  The same
two TTF files are bundled in ``_scripts/fonts/`` so the build is
reproducible on any machine.

Run
---
    python3 _scripts/build_questionnaire_translations.py            # all
    python3 _scripts/build_questionnaire_translations.py firefighting
"""

from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

import fitz  # PyMuPDF

# --------------------------------------------------------------------------
# Paths
# --------------------------------------------------------------------------
ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "public" / "docs"
FONT_DIR = Path(__file__).resolve().parent / "fonts"
FONT_REG = FONT_DIR / "DejaVuSans.ttf"
FONT_BLD = FONT_DIR / "DejaVuSans-Bold.ttf"

# --------------------------------------------------------------------------
# Layout registry
#
# Several product folders share one byte-identical RU master.  We generate
# the localized file once for the "lead" category and copy it to the
# siblings, exactly as the per-product link scheme expects.
# --------------------------------------------------------------------------
LAYOUTS = {
    # lead category : [sibling categories sharing the same master]
    "firefighting": ["water-supply", "heating-cooling", "special"],
    "pressure-boost": [],
    "heating-unit": [],
    "water-treatment": [],
}
# control-systems is intentionally NOT handled here: its RU master is the
# un-rebranded MFMC "Omega Control" original (MFMC Moscow requisites, Omega
# brand, Akrobat fonts) — it needs to be rebranded to ANHEL/Profit before a
# faithful EN/TR localization is possible.  Flagged for a separate decision.

# --------------------------------------------------------------------------
# Fonts
# --------------------------------------------------------------------------
_FONT_R = fitz.Font(fontfile=str(FONT_REG))
_FONT_B = fitz.Font(fontfile=str(FONT_BLD))


def _font(bold: bool) -> fitz.Font:
    return _FONT_B if bold else _FONT_R


def _text_width(text: str, bold: bool, size: float) -> float:
    return _font(bold).text_length(text, size)


# right-hand text margin of every master in this project
RIGHT_LIMIT = 535.0


def _fit_size(text: str, bold: bool, size: float, origin_x: float,
              limit: float = RIGHT_LIMIT) -> float:
    """Shrink the font just enough to keep a left-aligned span on the page.

    A translated label is occasionally a few points wider than its Russian
    original (e.g. a value inside the fixed-width tariff card).  Rather than
    let it run off the edge we scale it down a touch — only when it would
    actually overflow, never otherwise."""
    w = _text_width(text, bold, size)
    if origin_x + w <= limit or w <= 0:
        return size
    return max(size * (limit - origin_x) / w, size * 0.62)


def _rgb(color_int: int):
    return (
        ((color_int >> 16) & 0xFF) / 255.0,
        ((color_int >> 8) & 0xFF) / 255.0,
        (color_int & 0xFF) / 255.0,
    )


# --------------------------------------------------------------------------
# Translation tables — keyed by the exact RU string of a single text span.
#
# Source: wave-3 EN/TR questionnaire wording (already reviewed) plus
# src/messages/_glossary.md for terminology.  Tone: industrial-engineering
# B2B register (Grundfos / Wilo / Vansan), not marketing language.
# --------------------------------------------------------------------------

# Spans that must never be translated or covered (brand mark, protocol
# names, the bare domain in the footer, bare units / voltages / symbols
# that read the same in every language).
KEEP = {
    "ANHEL", "®", "anhelspb.com",
    "Profibus", "Modbus", "Ethernet", "GSM", "RS232 (485)",
    "/", "%", "100%", "P1", "P2", "1×230 V", "3×380 V",
}

# Company requisites block — 4 right-aligned header lines, all locales.
REQUISITES = {
    "ООО «Профит», г. Санкт-Петербург,": {
        "en": "Profit LLC, Saint Petersburg, Russia",
        "tr": "Profit LLC, Saint Petersburg, Rusya",
    },
    "Политехническая ул., д. 6, стр. 1, пом. Н-7, 194021": {
        "en": "6/1 Polytechnicheskaya St., suite Н-7, 194021",
        "tr": "6/1 Polytechnicheskaya St., daire Н-7, 194021",
    },
    "Тел. +7 (812) 416-4500, E-mail: info@anhelspb.com": {
        "en": "Tel. +7 (812) 416-4500, E-mail: info@anhelspb.com",
        "tr": "Tel. +7 (812) 416-4500, E-posta: info@anhelspb.com",
    },
    "ОГРН 1137847188357, ИНН 7802825464, КПП 780201001": {
        "en": "OGRN 1137847188357, Tax ID (INN) 7802825464, KPP 780201001",
        "tr": "OGRN 1137847188357, Vergi No (INN) 7802825464, KPP 780201001",
    },
}

# Single-line spans.  RU -> {en, tr}
SIMPLE = {
    # ---- titles / footer -------------------------------------------------
    "Опросный лист для подбора насосных установок ANHEL®": {
        "en": "Questionnaire for ANHEL® pumping unit selection",
        "tr": "ANHEL® pompa istasyonu seçimi için anket formu",
    },
    "Опросный лист — насосные установки ANHEL®": {
        "en": "Questionnaire — ANHEL® pumping units",
        "tr": "Anket formu — ANHEL® pompa istasyonları",
    },
    # ---- page 1: contacts ------------------------------------------------
    "Контактные данные": {"en": "Contact details", "tr": "İletişim bilgileri"},
    "Организация *": {"en": "Company *", "tr": "Firma *"},
    "Фамилия, имя, отчество *": {"en": "Full name *", "tr": "Ad-soyad *"},
    "Должность *": {"en": "Position *", "tr": "Görev / Pozisyon *"},
    "Email *": {"en": "Email *", "tr": "E-posta *"},
    "Контактный телефон *": {"en": "Contact phone *", "tr": "Telefon *"},
    "Город *": {"en": "City *", "tr": "Şehir *"},
    "Как вы о нас узнали?": {
        "en": "How did you hear about us?",
        "tr": "Bizi nereden duydunuz?",
    },
    "Реклама Яндекс / Google": {
        "en": "Yandex / Google ads",
        "tr": "Yandex / Google reklamları",
    },
    "Поиск Яндекс / Google": {
        "en": "Yandex / Google search",
        "tr": "Yandex / Google arama",
    },
    "Социальные сети": {"en": "Social networks", "tr": "Sosyal medya"},
    "Рекомендации коллег, друзей": {
        "en": "Recommendation from a colleague",
        "tr": "Meslektaş tavsiyesi",
    },
    "Уже знали о нас, работали с нами": {
        "en": "Already familiar, worked with us before",
        "tr": "Bizi tanıyordunuz / daha önce çalıştık",
    },
    "Другое": {"en": "Other", "tr": "Diğer"},
    "Основные данные": {"en": "General information", "tr": "Genel bilgiler"},
    "Название и расположение объекта": {
        "en": "Facility name and location",
        "tr": "Tesis adı ve konumu",
    },
    # ---- page 2: system --------------------------------------------------
    "Система": {"en": "System", "tr": "Sistem"},
    "водоснабжение": {"en": "water supply", "tr": "su temini"},
    "пожаротушение": {"en": "firefighting", "tr": "yangın söndürme"},
    "внутренний противопожарный водопровод (ВПВ)": {
        "en": "indoor fire-water riser (VPV)",
        "tr": "iç yangın hattı (VPV)",
    },
    "автоматическое пожаротушение (АПТ)": {
        "en": "automatic fire-suppression system (APT)",
        "tr": "otomatik yangın söndürme (APT)",
    },
    "отопление": {"en": "heating", "tr": "ısıtma"},
    "закрытая": {"en": "closed loop", "tr": "kapalı devre"},
    "открытая": {"en": "open loop", "tr": "açık devre"},
    "кондиционирование": {"en": "air conditioning", "tr": "iklimlendirme"},
    "совмещённая система (пожаротушение + водоснабжение)": {
        "en": "combined system (firefighting + water supply)",
        "tr": "birleşik sistem (yangın + su temini)",
    },
    "другое": {"en": "other", "tr": "diğer"},
    # ---- page 2: flow ----------------------------------------------------
    "Расход": {"en": "Flow rate", "tr": "Debi"},
    "Требуемый расход, м³/ч": {
        "en": "Required flow rate, m³/h",
        "tr": "Gerekli debi, m³/sa",
    },
    "Расход жокей-насоса, м³/ч": {
        "en": "Jockey-pump flow rate, m³/h",
        "tr": "Jokey pompa debisi, m³/sa",
    },
    "Совмещённая система": {"en": "Combined system", "tr": "Birleşik sistem"},
    "Расход при водоснабжении, м³/ч": {
        "en": "Flow rate, water supply, m³/h",
        "tr": "Su temini debisi, m³/sa",
    },
    "Расход при пожаротушении, м³/ч": {
        "en": "Flow rate, firefighting, m³/h",
        "tr": "Yangın debisi, m³/sa",
    },
    # ---- page 2: head ----------------------------------------------------
    "Напор": {"en": "Head", "tr": "Basma yüksekliği"},
    "Гарантированный напор сети, м.вод.ст.": {
        "en": "Guaranteed supply pressure, m H₂O",
        "tr": "Şebeke garantili basınç, mSS",
    },
    "Забор воды из водоёма или резервуара": {
        "en": "Water intake from a pond or tank",
        "tr": "Havuzdan veya rezervuardan su alımı",
    },
    "Водоём": {"en": "Pond / open water", "tr": "Havuz / açık su"},
    "Подземный": {"en": "Underground tank", "tr": "Yer altı tankı"},
    "Полузаглублённый": {"en": "Semi-buried tank", "tr": "Yarı gömülü tank"},
    "Наземный": {"en": "Above-ground tank", "tr": "Yer üstü tankı"},
    "Hmin, м.вод.ст.": {"en": "Hmin, m H₂O", "tr": "Hmin, mSS"},
    "Hmax, м.вод.ст.": {"en": "Hmax, m H₂O", "tr": "Hmax, mSS"},
    "Требуемый напор насосной установки, м.вод.ст. *": {
        "en": "Required pumping-unit head, m H₂O *",
        "tr": "Gerekli pompa istasyonu basma yüksekliği, mSS *",
    },
    "* = Требуемый напор системы − Гарантированный напор сети": {
        "en": "* = Required system head − Guaranteed supply pressure",
        "tr": "* = Gerekli sistem basıncı − Şebeke garantili basınç",
    },
    "Требуемый напор жокей-насоса, м.вод.ст.": {
        "en": "Required jockey-pump head, m H₂O",
        "tr": "Gerekli jokey pompa basma yüksekliği, mSS",
    },
    "Требуемый напор насосной установки при водоснабжении, м.в.с.": {
        "en": "Required pumping-unit head, water supply, m H₂O",
        "tr": "Su temini için gerekli pompa basma yüksekliği, mSS",
    },
    "Требуемый напор насосной установки при пожаротушении, м.в.с.": {
        "en": "Required pumping-unit head, firefighting, m H₂O",
        "tr": "Yangın için gerekli pompa basma yüksekliği, mSS",
    },
    "Максимальное давление в системе, бар": {
        "en": "Maximum system pressure, bar",
        "tr": "Sistem maksimum basıncı, bar",
    },
    # ---- page 3: fluid & pumps ------------------------------------------
    "Перекачиваемая жидкость": {
        "en": "Pumped fluid",
        "tr": "Pompalanan akışkan",
    },
    "Температура жидкости, t °C": {
        "en": "Fluid temperature, t °C",
        "tr": "Akışkan sıcaklığı, t °C",
    },
    "(если не чистая вода — указать концентрацию)": {
        "en": "(if not clean water, specify concentration)",
        "tr": "(saf su değilse konsantrasyonu belirtin)",
    },
    "Количество рабочих насосов": {
        "en": "Number of duty pumps",
        "tr": "Çalışan pompa sayısı",
    },
    "Количество резервных насосов": {
        "en": "Number of standby pumps",
        "tr": "Yedek pompa sayısı",
    },
    "(обеспечивающих необходимый расход)": {
        "en": "(providing the required flow)",
        "tr": "(gerekli debiyi sağlayan)",
    },
    # ---- page 3: control -------------------------------------------------
    "Управление": {"en": "Control", "tr": "Kontrol"},
    "частотное с контроллером": {
        "en": "VFD with PLC",
        "tr": "PLC ile frekans kontrollü",
    },
    "частотное на каждый насос с контроллером": {
        "en": "VFD per pump with PLC",
        "tr": "Her pompa için PLC ile frekans kontrollü",
    },
    "частотное без контроллера": {
        "en": "VFD without PLC",
        "tr": "PLC'siz frekans kontrollü",
    },
    "релейное с контроллером": {
        "en": "DOL / relay with PLC",
        "tr": "PLC ile röle kontrollü",
    },
    "релейное с контроллером + плавный пуск": {
        "en": "DOL / relay with PLC + soft starter",
        "tr": "PLC ile röle kontrollü + yumuşak yol verici",
    },
    "Управление и коммутация задвижки с электроприводом": {
        "en": "Motorized-valve control and switching",
        "tr": "Motorlu vana kontrolü ve anahtarlaması",
    },
    "Да": {"en": "Yes", "tr": "Evet"},
    "Нет": {"en": "No", "tr": "Hayır"},
    "Число задвижек": {"en": "Number of valves", "tr": "Vana sayısı"},
    "Марка и тип применяемых задвижек": {
        "en": "Valve brand and type",
        "tr": "Vana marka ve tipi",
    },
    # ---- page 3: options -------------------------------------------------
    "Опции": {"en": "Options", "tr": "Seçenekler"},
    "ввод питания на каждый насос без АВР": {
        "en": "single power input per pump (no ATS)",
        "tr": "her pompa için tek güç girişi (ATS'siz)",
    },
    "два ввода питания с АВР": {
        "en": "two power inputs with ATS",
        "tr": "ATS'li iki güç girişi",
    },
    "уличное исполнение шкафа управления (УХЛ1, УХЛ2)": {
        "en": "outdoor control cabinet (UKHL1, UKHL2)",
        "tr": "dış mekan kontrol panosu (UKHL1, UKHL2)",
    },
    "концевые выключатели для пожарной станции ВПВ": {
        "en": "limit switches for VPV fire-water pump set",
        "tr": "VPV yangın pompa seti için limit anahtarları",
    },
    "разный диаметр вход/выход коллекторов": {
        "en": "different inlet / outlet manifold diameters",
        "tr": "farklı giriş / çıkış kollektör çapları",
    },
    # ---- page 3: data transfer ------------------------------------------
    "Передача данных": {"en": "Communication", "tr": "Veri iletişimi"},
    # ---- page 3: modular enclosure --------------------------------------
    "Модульное исполнение в ёмкости": {
        "en": "Modular skid in an enclosure",
        "tr": "Hazneli modüler set",
    },
    "контейнер": {"en": "container", "tr": "konteyner"},
    "бочка": {"en": "tank", "tr": "tank"},
    "стеклопластик": {"en": "fiberglass", "tr": "fiberglas (CTP)"},
    "металл": {"en": "steel", "tr": "çelik"},
    "вертикальное исполнение": {"en": "vertical", "tr": "dikey"},
    "горизонтальное исполнение": {"en": "horizontal", "tr": "yatay"},
    "Дополнительные сведения": {
        "en": "Additional information",
        "tr": "Ek bilgi",
    },
    # ---- page 3: disclaimer marker --------------------------------------
    "Внимание!": {"en": "Important!", "tr": "Dikkat!"},

    # =====================================================================
    # pressure-boost  (АУПД — pressure-maintenance unit)
    # =====================================================================
    "Опросный лист — АУПД ANHEL®": {
        "en": "Questionnaire — ANHEL® pressure-maintenance units",
        "tr": "Anket formu — ANHEL® basınç koruma üniteleri",
    },
    "Параметры системы": {
        "en": "System parameters", "tr": "Sistem parametreleri",
    },
    "Тепловая мощность системы, Гкал/ч": {
        "en": "System thermal capacity, Gcal/h",
        "tr": "Sistem ısıl kapasitesi, Gcal/sa",
    },
    "Тепловая мощность системы, кВт": {
        "en": "System thermal capacity, kW",
        "tr": "Sistem ısıl kapasitesi, kW",
    },
    "Объём системы (расчётный), л": {
        "en": "System design volume, L",
        "tr": "Sistem tasarım hacmi, L",
    },
    "Статическое давление в системе, бар": {
        "en": "System static pressure, bar",
        "tr": "Sistem statik basıncı, bar",
    },
    "Максимальное рабочее давление, м.вод.ст.": {
        "en": "Maximum working pressure, m H₂O",
        "tr": "Maksimum işletme basıncı, mSS",
    },
    "Давление срабатывания предохранительного клапана, м.вод.ст": {
        "en": "Safety valve set pressure, m H₂O",
        "tr": "Emniyet vanası ayar basıncı, mSS",
    },
    "Давление в обратной линии теплосети, м.вод.ст.": {
        "en": "District-heating return line pressure, m H₂O",
        "tr": "Bölgesel ısıtma dönüş hat basıncı, mSS",
    },
    "Теплоноситель и режим": {
        "en": "Heat carrier and operating mode",
        "tr": "Isı taşıyıcı ve çalışma rejimi",
    },
    "Тип теплоносителя": {"en": "Heat carrier type", "tr": "Isı taşıyıcı tipi"},
    "вода": {"en": "water", "tr": "su"},
    "раствор гликоля, %": {
        "en": "glycol solution, %", "tr": "glikol çözeltisi, %",
    },
    "Температурный график системы (прямая T1 / обратная T2), °C": {
        "en": "System temperature schedule (supply T1 / return T2), °C",
        "tr": "Sistem sıcaklık eğrisi (gidiş T1 / dönüş T2), °C",
    },
    "Количество насосов": {"en": "Number of pumps", "tr": "Pompa sayısı"},
    "Система заполнения": {"en": "Filling system", "tr": "Doldurma sistemi"},
    "нет": {"en": "no", "tr": "hayır"},
    "да": {"en": "yes", "tr": "evet"},
    "да, за 5 часов по требованию МОЭК": {
        "en": "yes, within 5 hours per MOEK requirement",
        "tr": "evet, MOEK gereğince 5 saat içinde",
    },
    "Тип системы": {"en": "System type", "tr": "Sistem tipi"},
    "вентиляция": {"en": "ventilation", "tr": "havalandırma"},
    "другая": {"en": "other", "tr": "diğer"},
    "Ограничение по габаритам проёма (высота × ширина), м": {
        "en": "Doorway size limit (height × width), m",
        "tr": "Kapı açıklığı sınırı (yükseklik × genişlik), m",
    },
    "высота": {"en": "height", "tr": "yükseklik"},
    "ширина": {"en": "width", "tr": "genişlik"},

    # =====================================================================
    # water-treatment  (ВПУ — water treatment unit)
    # =====================================================================
    "Опросный лист — установки водоподготовки ANHEL®": {
        "en": "Questionnaire — ANHEL® water treatment units",
        "tr": "Anket formu — ANHEL® su arıtma üniteleri",
    },
    "Опросный лист для подбора установки водоподготовки ANHEL®": {
        "en": "Questionnaire for ANHEL® water treatment unit selection",
        "tr": "ANHEL® su arıtma ünitesi seçimi için anket formu",
    },
    "Источник водоснабжения  (анализ исходной воды необходимо приложить к опросному листу)": {
        "en": "Water supply source  (a raw-water analysis report must be attached to this questionnaire)",
        "tr": "Su kaynağı  (ham su analiz raporu bu anket formuna eklenmelidir)",
    },
    "Температура исходной воды (min, max), °C": {
        "en": "Raw water temperature (min, max), °C",
        "tr": "Ham su sıcaklığı (min, maks), °C",
    },
    "Требования к качеству воды  (приложить требования или ссылку на нормативный документ)": {
        "en": "Treated-water quality requirements  (attach the requirements or a reference to the applicable standard)",
        "tr": "Arıtılmış su kalite gereksinimleri  (gereksinimleri veya ilgili standardın referansını ekleyin)",
    },
    "Расход на входе в водопроводной сети в точке подключения, м³/ч": {
        "en": "Inlet flow rate at the supply network connection point, m³/h",
        "tr": "Bağlantı noktasında şebeke giriş debisi, m³/sa",
    },
    "Давление на входе в водопроводной сети в точке подключения, м.вод.ст.": {
        "en": "Inlet pressure at the supply network connection point, m H₂O",
        "tr": "Bağlantı noktasında şebeke giriş basıncı, mSS",
    },
    "Тип применяемого насоса на входе (если имеется)": {
        "en": "Inlet pump type (if any)",
        "tr": "Giriş pompası tipi (mevcutsa)",
    },
    "Необходимый расход очищенной воды": {
        "en": "Treated-water flow demand",
        "tr": "Gerekli arıtılmış su debisi",
    },
    "Суточный, м³/сут": {"en": "Daily, m³/day", "tr": "Günlük, m³/gün"},
    "Максимальный часовой, м³/ч": {
        "en": "Peak hourly, m³/h", "tr": "Tepe saatlik, m³/sa",
    },
    "График водопотребления  (для выбора оптимальной схемы работы установки)": {
        "en": "Water consumption schedule  (to choose the optimal operating scheme)",
        "tr": "Su tüketim takvimi  (ünitenin en uygun çalışma şemasının seçilmesi için)",
    },
    "Количество смен": {"en": "Number of shifts", "tr": "Vardiya sayısı"},
    "Продолжительность смены": {
        "en": "Shift duration", "tr": "Vardiya süresi",
    },
    "Продолжительность перерыва между сменами (max)": {
        "en": "Break between shifts (max)",
        "tr": "Vardiyalar arası mola (maks)",
    },
    "Режим работы установки": {
        "en": "Unit operating mode", "tr": "Ünitenin çalışma rejimi",
    },
    "Необходимый запас чистой воды (накопительная ёмкость − V, м³)": {
        "en": "Treated-water buffer storage required (tank capacity − V, m³)",
        "tr": "Gerekli arıtılmış su yedeği (depolama tankı − V, m³)",
    },
    "Объём имеющихся ёмкостей под чистую воду, м³": {
        "en": "Existing treated-water tank capacity, m³",
        "tr": "Mevcut arıtılmış su tank kapasitesi, m³",
    },
    "Необходимый напор воды на выходе из установки, м.вод.ст.": {
        "en": "Required outlet head, m H₂O",
        "tr": "Ünite çıkışında gerekli basma yüksekliği, mSS",
    },
    "Наличие сети для отведения промывной воды": {
        "en": "Network for backwash discharge — available?",
        "tr": "Geri yıkama tahliyesi için hat — mevcut mu?",
    },
    "Наличие ограничений по качеству отводимой промывной воды": {
        "en": "Quality restrictions on the discharged backwash water",
        "tr": "Tahliye edilen geri yıkama suyu kalitesine ilişkin kısıtlamalar",
    },
    "По составу": {"en": "Composition limits", "tr": "İçerik kısıtlamaları"},
    "По объёму": {"en": "Volume limits", "tr": "Hacim kısıtlamaları"},
    "Объём предоставления проектной документации на установку": {
        "en": "Scope of project documentation to be supplied with the unit",
        "tr": "Ünite ile birlikte sağlanacak proje dokümantasyonu kapsamı",
    },

    # =====================================================================
    # heating-unit  (БИТП — block-type heat substation)
    # =====================================================================
    "Опросный лист — БИТП ANHEL®": {
        "en": "Questionnaire — ANHEL® heat substations",
        "tr": "Anket formu — ANHEL® ısı merkezleri",
    },
    "Наименование и расположение объекта": {
        "en": "Facility name and location",
        "tr": "Tesis adı ve konumu",
    },
    "Температурный график сетевой воды на входе / выходе в БИТП (зимний период), °C": {
        "en": "District water temperature schedule at the substation inlet / outlet (winter), °C",
        "tr": "BIM giriş / çıkışında bölgesel ısıtma suyu sıcaklık eğrisi (kış), °C",
    },
    "Вход T1": {"en": "T1 (inlet)", "tr": "T1 (giriş)"},
    "Вход T2": {"en": "T2 (outlet)", "tr": "T2 (çıkış)"},
    "Давление сетевой воды на входе / выходе в БИТП, бар": {
        "en": "District water pressure at the substation inlet / outlet, bar",
        "tr": "BIM giriş / çıkışında bölgesel ısıtma suyu basıncı, bar",
    },
    "Высота здания, м": {"en": "Building height, m", "tr": "Bina yüksekliği, m"},
    "Теплоноситель (вода, гликолевый раствор (%) и т.д.)": {
        "en": "Heat carrier (water, glycol solution (%), etc.)",
        "tr": "Isı taşıyıcı (su, glikol çözeltisi (%), vb.)",
    },
    "Отопление": {"en": "Heating", "tr": "Isıtma"},
    "Тепловая нагрузка": {"en": "Thermal load", "tr": "Isıl yük"},
    "Гкал/час": {"en": "Gcal/h", "tr": "Gcal/sa"},
    "Отопление (схема присоединения)": {
        "en": "Heating (connection scheme)",
        "tr": "Isıtma (bağlantı şeması)",
    },
    "Зависимая": {"en": "Dependent (direct)", "tr": "Bağımlı (doğrudan)"},
    "Независимая": {"en": "Independent (indirect)", "tr": "Bağımsız (eşanjörlü)"},
    "Непосредственная": {"en": "Direct", "tr": "Doğrudan"},
    "Отопление  (продолжение)": {
        "en": "Heating  (continued)", "tr": "Isıtma  (devam)",
    },
    "Тип пластинчатого теплообменника": {
        "en": "Plate heat-exchanger type", "tr": "Plakalı eşanjör tipi",
    },
    "Паяный": {"en": "Brazed", "tr": "Lehimli"},
    "Разборный": {"en": "Gasketed (demountable)", "tr": "Sökülebilir contalı"},
    "Кожухотрубчатый": {
        "en": "Shell-and-tube", "tr": "Borulu (shell-and-tube)",
    },
    "Температурный график системы отопления (зимний период), °C": {
        "en": "Heating system temperature schedule (winter), °C",
        "tr": "Isıtma sistemi sıcaklık eğrisi (kış), °C",
    },
    "Вход T1.2": {"en": "T1.2 inlet", "tr": "T1.2 giriş"},
    "Вход T2.2": {"en": "T2.2 return", "tr": "T2.2 dönüş"},
    "Потери давления в системе отопления, м.в.ст.": {
        "en": "Heating system pressure drop, m H₂O",
        "tr": "Isıtma sistemi basınç kaybı, mSS",
    },
    "Максимальное рабочее давление, м.в.ст.": {
        "en": "Maximum working pressure, m H₂O",
        "tr": "Maksimum işletme basıncı, mSS",
    },
    "Объём системы отопления, м³": {
        "en": "Heating system volume, m³", "tr": "Isıtma sistemi hacmi, m³",
    },
    "Резервирование теплообменника": {
        "en": "Heat-exchanger redundancy", "tr": "Eşanjör yedekleme",
    },
    "Резервирование насоса": {
        "en": "Pump redundancy", "tr": "Pompa yedekleme",
    },
    "На склад": {"en": "Spare on stock", "tr": "Stok yedek"},
    "Сдвоенный": {"en": "Twin pump", "tr": "İkiz pompa"},
    "Частотное регулирование насосов": {
        "en": "Pump VFD speed control", "tr": "Pompa frekans kontrolü",
    },
    "Вентиляция": {"en": "Ventilation", "tr": "Havalandırma"},
    "Схема присоединения": {
        "en": "Connection scheme", "tr": "Bağlantı şeması",
    },
    "Температурный график системы в зимний период, °C": {
        "en": "System temperature schedule (winter), °C",
        "tr": "Sistem sıcaklık eğrisi (kış), °C",
    },
    "Потери давления в системе, м.в.ст.": {
        "en": "System pressure drop, m H₂O",
        "tr": "Sistem basınç kaybı, mSS",
    },
    "Объём системы, м³": {"en": "System volume, m³", "tr": "Sistem hacmi, m³"},
    "ГВС  (горячее водоснабжение)": {
        "en": "DHW  (domestic hot water)",
        "tr": "KSS  (kullanım sıcak suyu)",
    },
    "Температура холодной воды, °C": {
        "en": "Cold water temperature, °C", "tr": "Soğuk su sıcaklığı, °C",
    },
    "Температура горячей воды, °C": {
        "en": "Hot water temperature, °C", "tr": "Sıcak su sıcaklığı, °C",
    },
    "Давление холодной воды на входе в БИТП, бар": {
        "en": "Cold water inlet pressure at substation, bar",
        "tr": "BIM girişinde soğuk su basıncı, bar",
    },
    "Необходимое давление горячей воды, бар": {
        "en": "Required hot water pressure, bar",
        "tr": "Gerekli sıcak su basıncı, bar",
    },
    "Необходимость в установке циркуляционной линии ГВС": {
        "en": "DHW circulation line required?",
        "tr": "KSS sirkülasyon hattı gerekli mi?",
    },
    "Расход воды на циркуляцию ГВС от максимального расхода, %": {
        "en": "DHW circulation flow as % of peak demand, %",
        "tr": "Tepe debinin yüzdesi olarak KSS sirkülasyon debisi, %",
    },
    "Гидравлическое сопротивление циркуляции ГВС, м.в.ст.": {
        "en": "DHW circulation head loss, m H₂O",
        "tr": "KSS sirkülasyon hidrolik direnci, mSS",
    },
    "Схема включения теплообменника ГВС": {
        "en": "DHW heat-exchanger configuration",
        "tr": "KSS eşanjör şeması",
    },
    "1-ступенчатая": {"en": "Single-stage", "tr": "Tek kademeli"},
    "2-ступенчатая": {"en": "Two-stage", "tr": "İki kademeli"},
    "Моноблок": {"en": "Single-skid (monoblock)", "tr": "Monoblok (tek beden)"},
    "Дополнительное оборудование, функции и параметры": {
        "en": "Additional equipment, functions, and parameters",
        "tr": "Ek ekipmanlar, işlevler ve parametreler",
    },
    "Погодозависимое регулирование": {
        "en": "Outdoor-temperature compensation",
        "tr": "Dış hava sıcaklığına bağlı kontrol",
    },
    "Автоматическая линия подпитки систем отопления и вентиляции": {
        "en": "Automatic make-up line for heating and ventilation",
        "tr": "Isıtma ve havalandırma için otomatik takviye hattı",
    },
    "Автоматическая установка поддержания давления для систем отопления и вентиляции": {
        "en": "Automatic pressure-maintenance unit for heating and ventilation",
        "tr": "Isıtma ve havalandırma için otomatik basınç koruma ünitesi",
    },
    "Узел учёта тепловой энергии": {
        "en": "Thermal energy metering unit",
        "tr": "Isı enerjisi ölçüm ünitesi",
    },
    "Регулятор перепада давления": {
        "en": "Differential pressure regulator",
        "tr": "Diferansiyel basınç regülatörü",
    },
    "Расширительный бак": {"en": "Expansion tank", "tr": "Genleşme tankı"},
    "Расходомер на холодную воду": {
        "en": "Cold-water flow meter", "tr": "Soğuk su debimetresi",
    },
    "Датчик аварии насоса (реле перепада давления)": {
        "en": "Pump-failure sensor (DP switch)",
        "tr": "Pompa arıza sensörü (DP anahtarı)",
    },
    "Диспетчеризация": {"en": "SCADA / dispatching", "tr": "SCADA / dispeçer"},
    "Предусмотреть подпиточный клапан": {
        "en": "Provide a make-up valve", "tr": "Takviye vanası eklenmeli",
    },
    "Предусмотреть подпиточный насос": {
        "en": "Provide a make-up pump", "tr": "Takviye pompası eklenmeli",
    },
    "Изоляция трубопроводов": {
        "en": "Pipework insulation", "tr": "Boru izolasyonu",
    },
    "Стальная арматура на вводе": {
        "en": "Inlet valves and fittings (steel)",
        "tr": "Giriş vanaları ve armatürleri (çelik)",
    },
    "Под приварку": {"en": "Welded", "tr": "Kaynaklı"},
    "Фланцевая": {"en": "Flanged", "tr": "Flanşlı"},
    "Резьбовая": {"en": "Threaded", "tr": "Dişli"},
    "Размеры помещения для установки БИТП (длина × ширина × высота), мм": {
        "en": "Substation room dimensions (L × W × H), mm",
        "tr": "BIM oda boyutları (U × G × Y), mm",
    },
    "Размер проёма (ширина × высота), мм": {
        "en": "Doorway size (W × H), mm",
        "tr": "Kapı açıklığı (G × Y), mm",
    },
    "Передача данных на диспетчерский пункт": {
        "en": "Data communication to SCADA",
        "tr": "SCADA'ya veri iletişimi",
    },
    "Тел. модем": {"en": "Tel. modem", "tr": "Tel. modem"},
    "Питание насосов от шкафа управления БИТП": {
        "en": "Pumps powered from the substation control cabinet",
        "tr": "Pompalar BIM kontrol panosundan beslenir",
    },
    "Питание насосов от стороннего шкафа": {
        "en": "Pumps powered from an external cabinet",
        "tr": "Pompalar harici panodan beslenir",
    },
    "Напряжение питания": {"en": "Supply voltage", "tr": "Besleme gerilimi"},
}

# Multi-line paragraph groups.  Each member RU string maps to its group id;
# the group is rendered once, re-wrapped to the master's column width.
PARAGRAPHS = {
    "intro_a": {
        "lines": [
            "Уважаемые партнёры! Для наиболее точного подбора оборудования, соответствующего Вашим",
            "требованиям, просим Вас ответить на приведённые ниже вопросы или направить в наш адрес",
            "техническое задание, содержащее все требуемые данные.",
        ],
        "en": (
            "Dear partners, to ensure the most accurate selection of "
            "equipment matching your requirements, please answer the "
            "questions below or send us a technical specification "
            "containing all the required data."
        ),
        "tr": (
            "Değerli iş ortakları, gereksinimlerinize en uygun ekipman "
            "seçimini sağlamak için lütfen aşağıdaki soruları yanıtlayın "
            "veya gerekli tüm verileri içeren bir teknik şartname gönderin."
        ),
        "wrap": 468.0,
    },
    "intro_b": {
        "lines": [
            "При возникновении трудностей и вопросов по заполнению опросного листа, пожалуйста, позвоните",
            "по +7 (812) 416-4500 — наши специалисты с удовольствием Вам помогут.",
            # pressure-boost / heating-unit / water-treatment masters phrase
            # the second line slightly differently — same translation:
            "по телефону +7 (812) 416-4500 — наши специалисты с удовольствием Вам помогут.",
        ],
        "en": (
            "If you have any difficulties or questions while completing "
            "this questionnaire, please call +7 (812) 416-4500 — our "
            "specialists will gladly assist you."
        ),
        "tr": (
            "Anket formunu doldururken herhangi bir zorluk veya sorunuz "
            "olursa lütfen +7 (812) 416-4500 numarasını arayın — "
            "uzmanlarımız size yardımcı olmaktan memnuniyet duyar."
        ),
        "wrap": 468.0,
    },
    # pressure-boost / heating-unit have a 2-line title (the NU and
    # water-treatment titles are single-line — handled via SIMPLE).
    "title_pb": {
        "lines": [
            "Опросный лист для подбора автоматических установок",
            "поддержания давления ANHEL® (АУПД)",
        ],
        "en": "Questionnaire for ANHEL® automatic pressure-maintenance "
              "unit selection (APMU)",
        "tr": "ANHEL® otomatik basınç koruma ünitesi seçimi için anket "
              "formu (APMU)",
        "wrap": 472.0,
    },
    "title_hu": {
        "lines": [
            "Опросный лист на подбор блочного",
            "индивидуального теплового пункта ANHEL®",
        ],
        "en": "Questionnaire for ANHEL® block-type individual heat "
              "substation selection",
        "tr": "ANHEL® blok bireysel ısı merkezi seçimi için anket formu",
        "wrap": 472.0,
    },
    # pressure-boost / heating-unit / water-treatment share one compact
    # disclaimer: 5 lines, "Внимание!" inline in the first one (not a
    # separately styled marker like the NU layout).
    "disclaimer2": {
        "lines": [
            "Внимание!  ООО «Профит» не несёт ответственности за корректность исходных данных",
            "для подбора оборудования, указанных в опросном листе.",
            "Отказ заказчика заполнить опросный лист означает его согласие со всеми техническими",
            "характеристиками, определяемыми условным обозначением, указанным в заявке в",
            "соответствие с каталогом ANHEL®, и отсутствие дополнительных требований к изделию.",
        ],
        "en": [
            "Important!  Profit LLC accepts no responsibility for the "
            "accuracy of the source data provided in this questionnaire "
            "for equipment selection.",
            "If the customer declines to complete this questionnaire, "
            "this is deemed acceptance of all technical characteristics "
            "defined by the type designation stated in the order in "
            "accordance with the ANHEL® catalogue, and confirmation that "
            "the product requires no additional features.",
        ],
        "tr": [
            "Dikkat!  Profit LLC, ekipman seçimi için bu anket formunda "
            "verilen kaynak verilerin doğruluğundan sorumlu değildir.",
            "Müşterinin bu anket formunu doldurmayı reddetmesi, siparişte "
            "belirtilen tip tanımıyla ANHEL® kataloğuna uygun olarak "
            "tanımlanan tüm teknik özellikleri kabul ettiği ve ürün için "
            "ek bir gereksinim bulunmadığı anlamına gelir.",
        ],
        "left_x": 72.4,
        "wrap": 460.0,
        "leading": 12.0,
        "para_gap": 12.0,
    },
    "disclaimer": {
        # first line is indented (it sits next to the bold "Внимание!"
        # marker); the remaining lines start at the left text edge.
        "lines": [
            "ООО «Профит» не несёт ответственности за корректность исходных данных для подбора оборудования,",
            "указанных в опросном листе.",
            "Отказ заказчика заполнить опросный лист означает его согласие со всеми техническими характеристиками,",
            "определяемыми условным обозначением, указанным в заявке в соответствие с каталогом ANHEL®,",
            "и отсутствие дополнительных требований к изделию.",
        ],
        "en": [
            "Profit LLC accepts no responsibility for the accuracy of the "
            "source data provided in this questionnaire for equipment "
            "selection.",
            "If the customer declines to complete this questionnaire, this "
            "is deemed acceptance of all technical characteristics defined "
            "by the type designation stated in the order in accordance "
            "with the ANHEL® catalogue, and confirmation that the product "
            "requires no additional features.",
        ],
        "tr": [
            "Profit LLC, ekipman seçimi için bu anket formunda verilen "
            "kaynak verilerin doğruluğundan sorumlu değildir.",
            "Müşterinin bu anket formunu doldurmayı reddetmesi, siparişte "
            "belirtilen tip tanımıyla ANHEL® kataloğuna uygun olarak "
            "tanımlanan tüm teknik özellikleri kabul ettiği ve ürün için "
            "ek bir gereksinim bulunmadığı anlamına gelir.",
        ],
        "indent_x": 128.4,   # first-line start (after the bold marker)
        "left_x": 72.4,      # subsequent lines
        "wrap_first": 402.0,
        "wrap_rest": 458.0,
        "leading": 11.0,
        "para_gap": 4.0,
    },
}

# reverse index: RU member line -> group id
_PARA_INDEX = {ln: gid for gid, g in PARAGRAPHS.items() for ln in g["lines"]}

# page indicator: "стр. N / M"
_PAGE_RE = re.compile(r"^стр\.\s*(\d+)\s*/\s*(\d+)$")


# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------
def _wrap(text: str, bold: bool, size: float, max_width: float):
    """Greedy word-wrap to a list of lines fitting *max_width*."""
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = w if not cur else cur + " " + w
        if _text_width(trial, bold, size) <= max_width or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def _redact_rect(bbox, pad_x=1.0, pad_v=0.6) -> fitz.Rect:
    """Tight rectangle around a text span — large enough to fully clear the
    glyphs, small enough not to touch the next span or any vector graphic."""
    return fitz.Rect(bbox[0] - pad_x, bbox[1] - pad_v,
                     bbox[2] + pad_x, bbox[3] + pad_v)


def _draw(page: fitz.Page, origin, text, bold, size, color_int):
    page.insert_text(
        fitz.Point(origin[0], origin[1]),
        text,
        fontsize=size,
        fontfile=str(FONT_BLD if bold else FONT_REG),
        fontname="djvb" if bold else "djv",
        color=_rgb(color_int),
    )


# --------------------------------------------------------------------------
# Core
#
# Each page is processed in three phases:
#   1. plan   — read every RU span, work out its translation and the
#               rectangle that has to be cleared;
#   2. redact — drop the Russian glyphs (text only: images, vector
#               graphics and AcroForm widgets are explicitly preserved);
#   3. draw   — paint the translated strings back at the master's
#               baselines, fonts, sizes and colours.
# Doing it in this order means the output PDF carries no hidden Russian
# text underneath the translation — it is genuinely localized, not just
# painted over.
# --------------------------------------------------------------------------
def _localize_page(page: fitz.Page, locale: str, report: dict):
    spans = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") == 1:          # image block — leave it
            continue
        for line in block["lines"]:
            for sp in line["spans"]:
                spans.append(sp)

    redactions: list = []      # fitz.Rect
    draws: list = []           # (origin, text, bold, size, color)
    handled_groups: set = set()

    for sp in spans:
        text = sp["text"].strip()
        if not text:
            continue
        bold = "Bold" in sp["font"]
        size = sp["size"]
        color = sp["color"]
        bbox = sp["bbox"]
        origin = sp["origin"]

        if text in KEEP:
            continue

        # --- multi-line paragraph -------------------------------------
        if text in _PARA_INDEX:
            gid = _PARA_INDEX[text]
            if gid in handled_groups:
                continue
            handled_groups.add(gid)
            _plan_paragraph(gid, locale, spans, redactions, draws)
            continue

        # --- company requisites (right-aligned) -----------------------
        if text in REQUISITES:
            tr = REQUISITES[text][locale]
            redactions.append(_redact_rect(bbox))
            w = _text_width(tr, bold, size)
            draws.append(((bbox[2] - w, origin[1]), tr, bold, size, color))
            report["translated"] += 1
            continue

        # --- page indicator -------------------------------------------
        m = _PAGE_RE.match(text)
        if m:
            tr = ("page " if locale == "en" else "sayfa ") + \
                 f"{m.group(1)} / {m.group(2)}"
            redactions.append(_redact_rect(bbox))
            w = _text_width(tr, bold, size)
            draws.append(((bbox[2] - w, origin[1]), tr, bold, size, color))
            report["translated"] += 1
            continue

        # --- single-line span -----------------------------------------
        if text in SIMPLE:
            tr = SIMPLE[text][locale]
            redactions.append(_redact_rect(bbox))
            draw_size = _fit_size(tr, bold, size, origin[0])
            draws.append(((origin[0], origin[1]), tr, bold,
                          draw_size, color))
            report["translated"] += 1
            continue

        # --- nothing matched ------------------------------------------
        report["missing"].append(text)

    # phase 2 — remove the Russian glyphs, keep everything else.
    # fill=False: the redaction must NOT paint a rectangle — it only
    # removes the glyphs and reveals whatever was beneath (white page,
    # a grey field box, a dark card …), so it is correct on any
    # background colour.
    for rect in redactions:
        page.add_redact_annot(rect, fill=False)
    if redactions:
        page.apply_redactions(
            images=fitz.PDF_REDACT_IMAGE_NONE,
            graphics=fitz.PDF_REDACT_LINE_ART_NONE,
            text=fitz.PDF_REDACT_TEXT_REMOVE,
        )

    # phase 3 — paint the translations back
    for origin, text, bold, size, color in draws:
        _draw(page, origin, text, bold, size, color)


def _plan_paragraph(gid: str, locale: str, spans: list,
                    redactions: list, draws: list):
    """Plan redaction rects + draw items for one multi-line paragraph."""
    grp = PARAGRAPHS[gid]
    members = [s for s in spans if s["text"].strip() in grp["lines"]]
    if not members:
        return
    members.sort(key=lambda s: s["bbox"][1])
    for s in members:
        redactions.append(_redact_rect(s["bbox"]))

    first = members[0]
    size = first["size"]
    color = first["color"]
    bold = "Bold" in first["font"]

    if gid == "disclaimer":
        # two sentences; the first line is indented next to the bold marker
        x_first = grp["indent_x"]
        x_left = grp["left_x"]
        leading = grp["leading"]
        y = first["origin"][1]
        for si, sentence in enumerate(grp[locale]):
            if si == 0:
                lines = _wrap(sentence, bold, size, grp["wrap_first"])
                if len(lines) > 1:           # re-wrap the remainder wider
                    rest = " ".join(lines[1:])
                    lines = [lines[0]] + _wrap(rest, bold, size,
                                               grp["wrap_rest"])
            else:
                lines = _wrap(sentence, bold, size, grp["wrap_rest"])
                y += grp["para_gap"]
            for li, ln in enumerate(lines):
                x = x_first if (si == 0 and li == 0) else x_left
                draws.append(((x, y), ln, bold, size, color))
                y += leading
        return

    if gid == "disclaimer2":
        # 5-line compact disclaimer, "Внимание!" inline; two sentences,
        # everything at the left text edge.
        x = grp["left_x"]
        y = first["origin"][1]
        leading = grp["leading"]
        for si, sentence in enumerate(grp[locale]):
            if si > 0:
                y += grp["para_gap"]
            for ln in _wrap(sentence, bold, size, grp["wrap"]):
                draws.append(((x, y), ln, bold, size, color))
                y += leading
        return

    # intro_a / intro_b / title_*: simple block at the master's leading
    ys = [m["origin"][1] for m in members]
    leading = (ys[1] - ys[0]) if len(ys) > 1 else 12.5
    x, y = first["origin"][0], first["origin"][1]
    for ln in _wrap(grp[locale], bold, size, grp["wrap"]):
        draws.append(((x, y), ln, bold, size, color))
        y += leading


def localize(master: Path, out: Path, locale: str) -> dict:
    report = {"file": out.name, "translated": 0, "missing": []}
    doc = fitz.open(master)
    for page in doc:
        _localize_page(page, locale, report)
    try:
        doc.subset_fonts()                   # keep file size near the master
    except Exception:
        pass
    out.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(out), deflate=True, garbage=4, clean=True)
    doc.close()
    return report


# --------------------------------------------------------------------------
# Driver
# --------------------------------------------------------------------------
def build(categories=None):
    all_reports = []
    leads = [c for c in LAYOUTS if not categories or c in categories
             or any(c in LAYOUTS[c] for c in (categories or []))]
    # if a sibling was requested explicitly, still build via its lead
    if categories:
        leads = [lead for lead in LAYOUTS
                 if lead in categories
                 or any(sib in categories for sib in LAYOUTS[lead])]
    else:
        leads = list(LAYOUTS)

    for lead in leads:
        master = DOCS / lead / "oprosnyi-list.pdf"
        if not master.exists():
            print(f"  !! master missing: {master}")
            continue
        for locale in ("en", "tr"):
            out = DOCS / lead / f"oprosnyi-list-{locale}.pdf"
            rep = localize(master, out, locale)
            all_reports.append(rep)
            status = "OK" if not rep["missing"] else f"MISSING {len(rep['missing'])}"
            size_kb = out.stat().st_size // 1024
            print(f"  {out.relative_to(ROOT)}  "
                  f"[{rep['translated']} spans, {size_kb} KB]  {status}")
            for miss in rep["missing"]:
                print(f"     · untranslated: {miss!r}")
            # propagate to sibling categories sharing this master
            for sib in LAYOUTS[lead]:
                sib_out = DOCS / sib / f"oprosnyi-list-{locale}.pdf"
                sib_out.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(out, sib_out)
                print(f"     -> copied to {sib_out.relative_to(ROOT)}")
    return all_reports


if __name__ == "__main__":
    args = sys.argv[1:]
    reports = build(args or None)
    miss_total = sum(len(r["missing"]) for r in reports)
    if miss_total:
        print(f"\n!! {miss_total} untranslated span(s) — see above")
        sys.exit(1)
    print("\nDone.")
