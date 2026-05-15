#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_service_request_translations.py  —  PDF localization wave-2

Generates EN and TR versions of the ANHEL® service-request form
(``public/documents/service-request-anhel.pdf``) that are VISUALLY
IDENTICAL to the Russian master — same header, requisites, section
markers, field boxes, the page-2 obligation cards, the tariff card and
the footer.  Only the language of the text changes.

Method is identical to build_questionnaire_translations.py: open the RU
master with PyMuPDF, redact every Russian text span (text only — images,
vector graphics and AcroForm widgets are preserved) and redraw the
translation at the exact same baseline / font / size / colour.  The
shared primitives are imported from build_questionnaire_translations.

Run:
    python3 _scripts/build_service_request_translations.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import fitz  # PyMuPDF

from build_questionnaire_translations import (  # shared engine
    FONT_REG, FONT_BLD, _text_width, _rgb, _redact_rect, _draw, _wrap,
    _fit_size, REQUISITES, _PAGE_RE,
)

ROOT = Path(__file__).resolve().parent.parent
MASTER = ROOT / "public" / "documents" / "service-request-anhel.pdf"

# --------------------------------------------------------------------------
# Spans left untouched
# --------------------------------------------------------------------------
KEEP = {"ANHEL", "®", "anhelspb.com", "12 000 ₽", "01", "02", "03"}

# Section markers — "NN · NAME"
_SECTION_RE = re.compile(r"^(\d{2})\s*·\s*(.+)$")
SECTIONS = {
    "КОНТАКТЫ": {"en": "CONTACTS", "tr": "İLETİŞİM"},
    "ОСНОВАНИЯ": {"en": "DOCUMENTS", "tr": "BELGELER"},
    "КОНТАКТНОЕ ЛИЦО": {"en": "CONTACT PERSON", "tr": "İLETİŞİM KİŞİSİ"},
    "ОБОРУДОВАНИЕ": {"en": "EQUIPMENT", "tr": "EKİPMAN"},
    "ПРОБЛЕМА": {"en": "PROBLEM", "tr": "SORUN"},
    "ОБЯЗАТЕЛЬСТВА": {"en": "OBLIGATIONS", "tr": "YÜKÜMLÜLÜKLER"},
    "ТАРИФЫ И СРОКИ": {"en": "RATES AND LEAD TIMES", "tr": "ÜCRETLER VE SÜRELER"},
    "ПОДТВЕРЖДЕНИЕ": {"en": "CONFIRMATION", "tr": "ONAY"},
    "ПАМЯТКА": {"en": "CHECKLIST", "tr": "NOTLAR"},
}

# --------------------------------------------------------------------------
# Single-line spans
# --------------------------------------------------------------------------
SIMPLE = {
    "Заявка на проведение диагностики": {
        "en": "Equipment diagnostics request",
        "tr": "Ekipman teşhis talebi",
    },
    "Заявка на проведение диагностики ANHEL®": {
        "en": "ANHEL® equipment diagnostics request",
        "tr": "ANHEL® ekipman teşhis talebi",
    },
    "Номер заявки *": {"en": "Request number *", "tr": "Talep numarası *"},
    # 01 · contacts
    "Общая информация о заказчике": {
        "en": "General customer information",
        "tr": "Genel müşteri bilgileri",
    },
    "Название компании *": {"en": "Company name *", "tr": "Firma adı *"},
    "Наименование объекта *": {"en": "Facility name *", "tr": "Tesis adı *"},
    "Адрес объекта *": {"en": "Facility address *", "tr": "Tesis adresi *"},
    # 02 · documents
    "Документы-основание": {"en": "Source documents", "tr": "Dayanak belgeler"},
    "Номер и дата Счёта *": {
        "en": "Invoice number and date *",
        "tr": "Fatura numarası ve tarihi *",
    },
    "Номер и дата УПД *": {
        "en": "UPD number and date *",
        "tr": "UPD numarası ve tarihi *",
    },
    "Номер заявки в Синтеке (при наличии)": {
        "en": "Synteka request number (if any)",
        "tr": "Synteka talep numarası (varsa)",
    },
    # 03 · contact person
    "Ответственное лицо на объекте": {
        "en": "On-site responsible person",
        "tr": "Sahadaki sorumlu kişi",
    },
    "Фамилия, имя, отчество *": {"en": "Full name *", "tr": "Ad-soyad *"},
    "Должность *": {"en": "Position *", "tr": "Görev / Pozisyon *"},
    "Мобильный телефон *": {"en": "Mobile phone *", "tr": "Cep telefonu *"},
    "E-mail *": {"en": "E-mail *", "tr": "E-posta *"},
    # 04 · equipment
    "Информация о насосной установке": {
        "en": "Pumping unit information",
        "tr": "Pompa istasyonu bilgileri",
    },
    "Тип *": {"en": "Type *", "tr": "Tip *"},
    "Наименование *": {"en": "Name *", "tr": "Adı *"},
    "Серийный номер изделия *": {
        "en": "Product serial number *", "tr": "Ürün seri numarası *",
    },
    "Дата ввода в эксплуатацию *": {
        "en": "Commissioning date *", "tr": "Devreye alma tarihi *",
    },
    # 05 · problem
    "Описание неисправности": {
        "en": "Fault description", "tr": "Arıza açıklaması",
    },
    "Подробное описание (* приложить видео к письму)": {
        "en": "Detailed description (* attach a video to the email)",
        "tr": "Ayrıntılı açıklama (* e-postaya video ekleyin)",
    },
    # 06 · obligations
    "Заказчик обязуется": {
        "en": "The customer undertakes to",
        "tr": "Müşteri şunları taahhüt eder",
    },
    "Представитель": {"en": "Representative", "tr": "Temsilci"},
    "Готовность": {"en": "Readiness", "tr": "Hazırlık"},
    "Заявка": {"en": "Request", "tr": "Talep"},
    # 07 · rates
    "Условия выезда": {"en": "Call-out terms", "tr": "Çıkış koşulları"},
    "Диагностика 1 ед.": {"en": "Diagnostics, 1 unit", "tr": "Teşhis, 1 birim"},
    "оборудования (СПб)": {
        "en": "of equipment (St. Petersburg)",
        "tr": "ekipman (St. Petersburg)",
    },
    "Холостой выезд": {"en": "Wasted call-out", "tr": "Boşa çıkış"},
    "(если не подготовлено)": {
        "en": "(if not prepared)", "tr": "(hazırlık yoksa)",
    },
    "С момента получения": {
        "en": "From receipt of the", "tr": "Kaşeli talebin",
    },
    "пропечатанной заявки": {
        "en": "stamped request", "tr": "alınmasından itibaren",
    },
    "Механика / ПО": {"en": "Mechanics / software", "tr": "Mekanik / yazılım"},
    "(ориентировочно)": {"en": "(approximate)", "tr": "(tahminî)"},
    "3–5 дн.": {"en": "3–5 days", "tr": "3–5 gün"},
    "7–10 / 5–7 дн.": {"en": "7–10 / 5–7 days", "tr": "7–10 / 5–7 gün"},
    # 08 · confirmation
    "Печать и подпись": {"en": "Stamp and signature", "tr": "Kaşe ve imza"},
    "М.П.": {"en": "Stamp", "tr": "Kaşe"},
    "Место для печати": {"en": "Stamp area", "tr": "Kaşe alanı"},
    "Дата": {"en": "Date", "tr": "Tarih"},
    "Подпись (расшифровка)": {
        "en": "Signature (printed name)", "tr": "İmza (ad-soyad)",
    },
    # 09 · checklist
    "Важно при заполнении заявки": {
        "en": "Important when filling in the request",
        "tr": "Talebi doldururken önemli",
    },
    "1. Номер заявки — это серийный номер изделия.": {
        "en": "1. The request number is the product serial number.",
        "tr": "1. Talep numarası, ürünün seri numarasıdır.",
    },
    "2. При заполнении заявки обязательно нужно указывать номер и дату УПД.": {
        "en": "2. The UPD number and date must always be stated when filling in the request.",
        "tr": "2. Talep doldurulurken UPD numarası ve tarihi mutlaka belirtilmelidir.",
    },
    "3. Пример серийного номера указан на шильде изделия (формат 24С574 — год и индекс серии).": {
        "en": "3. An example serial number is shown on the product nameplate (format 24С574 — year and series index).",
        "tr": "3. Örnek seri numarası ürün etiketinde gösterilir (format 24С574 — yıl ve seri indeksi).",
    },
}

# --------------------------------------------------------------------------
# Multi-line paragraph groups
# --------------------------------------------------------------------------
PARAGRAPHS = {
    "intro": {
        "lines": [
            "Заполните, пропечатайте и направьте на info@anhelspb.com. Решение о",
            "выезде сервисного инженера принимается после получения",
            "заполненного и пропечатанного обращения.",
        ],
        "en": "Fill in the form, stamp it and send it to info@anhelspb.com. "
              "The decision to dispatch a service engineer is made after the "
              "completed and stamped request is received.",
        "tr": "Formu doldurun, kaşeleyin ve info@anhelspb.com adresine "
              "gönderin. Servis mühendisinin görevlendirilmesi kararı, "
              "doldurulmuş ve kaşeli talep alındıktan sonra verilir.",
        "wrap": 320.0,
    },
    "conditions": {
        "lines": [
            "Если случай признан негарантийным, Клиент оплачивает расходы (выезд, диагностика, ремонт) в",
            "течение пяти рабочих дней с момента выставления счёта. Регионы вне Санкт-Петербурга",
            "рассчитываются отдельно. Заявку направляйте на info@anhelspb.com — указанные сроки являются",
            "ориентировочными, каждый случай рассматривается в частном порядке.",
        ],
        "en": "If the case is deemed non-warranty, the Client pays the costs "
              "(call-out, diagnostics, repair) within five working days of "
              "the invoice date. Regions outside Saint Petersburg are quoted "
              "separately. Send the request to info@anhelspb.com — the stated "
              "lead times are approximate; each case is reviewed individually.",
        "tr": "Durum garanti dışı kabul edilirse, Müşteri masrafları (çıkış, "
              "teşhis, onarım) fatura tarihinden itibaren beş iş günü içinde "
              "öder. Saint Petersburg dışındaki bölgeler ayrıca fiyatlandırılır. "
              "Talebi info@anhelspb.com adresine gönderin — belirtilen süreler "
              "tahminîdir, her durum ayrı ayrı değerlendirilir.",
        "wrap": 470.0,
    },
}

# Page-2 obligation cards.  Each is one narrow box: a single body
# paragraph (card 1, 3) or an intro line + dash bullets (card 2).
OBLIG = {
    "oblig1": {
        "lines": [
            "Обеспечить присутствие на", "объекте своего",
            "представителя с правом", "подписи в «Сервисном",
            "протоколе» и печати на", "«Акте выполненных работ».",
        ],
        "x": 74.4, "wrap": 132.0, "leading": 11.5,
        "body": {
            "en": ["Ensure the presence at the site of your representative "
                   "authorised to sign the Service Protocol and apply the "
                   "stamp on the Work Completion Act."],
            "tr": ["Servis Tutanağını imzalama ve İş Bitirme Tutanağına kaşe "
                   "basma yetkisine sahip bir temsilcinizin sahada "
                   "bulunmasını sağlayın."],
        },
    },
    "oblig2": {
        "lines": [
            "Обеспечить готовность", "оборудования к",
            "диагностике, что означает:",
            "—обеспечить доступ к", "оборудованию;",
            "—имеется возможность", "вкл./откл. эл. питание на", "ШУ;",
            "—имеется возможность", "подать/перекрыть",
            "перекачиваемую среду", "(воду) к оборудованию;",
            "—обеспечить возможность", "расхода воды на отметках.",
        ],
        "x": 234.5, "x_bullet": 236.5, "x_cont": 244.5,
        "wrap": 132.0, "wrap_bullet": 126.0, "leading": 11.5,
        "body": {
            "en": [
                "Ensure the equipment is ready for diagnostics, which means:",
                "— provide access to the equipment;",
                "— the control-cabinet power can be switched on / off;",
                "— the pumped medium (water) can be supplied to / shut off "
                "from the equipment;",
                "— water can be drawn off at the required levels.",
            ],
            "tr": [
                "Ekipmanın teşhise hazır olmasını sağlayın, bu şu anlama gelir:",
                "— ekipmana erişim sağlanmalı;",
                "— kontrol panosunda elektrik gücü açılıp / kapatılabilmeli;",
                "— pompalanan akışkan (su) ekipmana verilip / "
                "kesilebilmeli;",
                "— gerekli kotlarda su akışı sağlanabilmeli.",
            ],
        },
    },
    "oblig3": {
        "lines": [
            "Решение о возможности", "выезда принимается",
            "сервисным инженером после", "получения ЗАПОЛНЕННОГО и",
            "ПРОПЕЧАТАННОГО", "Обращения, направленного",
            "на info@anhelspb.com.",
        ],
        "x": 394.7, "wrap": 132.0, "leading": 11.5,
        "body": {
            "en": ["The decision on a possible call-out is made by the "
                   "service engineer after receiving the COMPLETED and "
                   "STAMPED request sent to info@anhelspb.com."],
            "tr": ["Çıkış kararı, info@anhelspb.com adresine gönderilen "
                   "DOLDURULMUŞ ve KAŞELİ talebin alınmasından sonra servis "
                   "mühendisi tarafından verilir."],
        },
    },
}

_PARA_INDEX = {ln: gid for gid, g in PARAGRAPHS.items() for ln in g["lines"]}
_OBLIG_INDEX = {ln: gid for gid, g in OBLIG.items() for ln in g["lines"]}


# --------------------------------------------------------------------------
# Core
# --------------------------------------------------------------------------
def _localize_page(page, locale, report):
    spans = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") == 1:
            continue
        for line in block["lines"]:
            spans.extend(line["spans"])

    redactions, draws = [], []
    handled = set()

    for sp in spans:
        text = sp["text"].strip()
        if not text or text in KEEP:
            continue
        bold = "Bold" in sp["font"]
        size, color = sp["size"], sp["color"]
        bbox, origin = sp["bbox"], sp["origin"]

        # multi-line paragraph
        if text in _PARA_INDEX:
            gid = _PARA_INDEX[text]
            if gid in handled:
                continue
            handled.add(gid)
            _plan_paragraph(gid, locale, spans, redactions, draws)
            continue

        # page-2 obligation card body
        if text in _OBLIG_INDEX:
            gid = _OBLIG_INDEX[text]
            if gid in handled:
                continue
            handled.add(gid)
            _plan_oblig(gid, locale, spans, redactions, draws)
            continue

        # company requisites (right-aligned)
        if text in REQUISITES:
            tr = REQUISITES[text][locale]
            redactions.append(_redact_rect(bbox))
            w = _text_width(tr, bold, size)
            draws.append(((bbox[2] - w, origin[1]), tr, bold, size, color))
            report["translated"] += 1
            continue

        # page indicator
        m = _PAGE_RE.match(text)
        if m:
            tr = ("page " if locale == "en" else "sayfa ") + \
                 f"{m.group(1)} / {m.group(2)}"
            redactions.append(_redact_rect(bbox))
            w = _text_width(tr, bold, size)
            draws.append(((bbox[2] - w, origin[1]), tr, bold, size, color))
            report["translated"] += 1
            continue

        # section marker  "NN · NAME"
        m = _SECTION_RE.match(text)
        if m and m.group(2) in SECTIONS:
            tr = f"{m.group(1)} · {SECTIONS[m.group(2)][locale]}"
            redactions.append(_redact_rect(bbox))
            draws.append(((origin[0], origin[1]), tr, bold, size, color))
            report["translated"] += 1
            continue

        # single-line span
        if text in SIMPLE:
            tr = SIMPLE[text][locale]
            redactions.append(_redact_rect(bbox))
            draw_size = _fit_size(tr, bold, size, origin[0])
            draws.append(((origin[0], origin[1]), tr, bold,
                          draw_size, color))
            report["translated"] += 1
            continue

        report["missing"].append(text)

    # fill=False — remove the glyphs only, reveal whatever is beneath
    # (white page, grey field box, the dark tariff card …).
    for rect in redactions:
        page.add_redact_annot(rect, fill=False)
    if redactions:
        page.apply_redactions(
            images=fitz.PDF_REDACT_IMAGE_NONE,
            graphics=fitz.PDF_REDACT_LINE_ART_NONE,
            text=fitz.PDF_REDACT_TEXT_REMOVE,
        )
    for origin, text, bold, size, color in draws:
        _draw(page, origin, text, bold, size, color)


def _plan_paragraph(gid, locale, spans, redactions, draws):
    grp = PARAGRAPHS[gid]
    members = [s for s in spans if s["text"].strip() in grp["lines"]]
    if not members:
        return
    members.sort(key=lambda s: s["bbox"][1])
    for s in members:
        redactions.append(_redact_rect(s["bbox"]))
    first = members[0]
    size, color = first["size"], first["color"]
    bold = "Bold" in first["font"]
    ys = [m["origin"][1] for m in members]
    leading = (ys[1] - ys[0]) if len(ys) > 1 else 12.5
    x, y = first["origin"][0], first["origin"][1]
    for ln in _wrap(grp[locale], bold, size, grp["wrap"]):
        draws.append(((x, y), ln, bold, size, color))
        y += leading


def _plan_oblig(gid, locale, spans, redactions, draws):
    grp = OBLIG[gid]
    members = [s for s in spans if s["text"].strip() in grp["lines"]]
    if not members:
        return
    members.sort(key=lambda s: s["bbox"][1])
    for s in members:
        redactions.append(_redact_rect(s["bbox"]))
    first = members[0]
    size, color = first["size"], first["color"]
    bold = "Bold" in first["font"]
    leading = grp["leading"]
    y = first["origin"][1]
    for seg in grp["body"][locale]:
        if seg.startswith("—"):
            # dash bullet: hanging indent
            x0 = grp.get("x_bullet", grp["x"])
            x1 = grp.get("x_cont", grp["x"])
            lines = _wrap(seg, bold, size, grp.get("wrap_bullet", grp["wrap"]))
            for i, ln in enumerate(lines):
                draws.append(((x0 if i == 0 else x1, y), ln,
                              bold, size, color))
                y += leading
        else:
            for ln in _wrap(seg, bold, size, grp["wrap"]):
                draws.append(((grp["x"], y), ln, bold, size, color))
                y += leading


def localize(out: Path, locale: str) -> dict:
    report = {"file": out.name, "translated": 0, "missing": []}
    doc = fitz.open(MASTER)
    for page in doc:
        _localize_page(page, locale, report)
    try:
        doc.subset_fonts()
    except Exception:
        pass
    out.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(out), deflate=True, garbage=4, clean=True)
    doc.close()
    return report


def build():
    reports = []
    for locale in ("en", "tr"):
        out = MASTER.with_name(f"service-request-anhel-{locale}.pdf")
        rep = localize(out, locale)
        reports.append(rep)
        status = "OK" if not rep["missing"] else f"MISSING {len(rep['missing'])}"
        print(f"  {out.relative_to(ROOT)}  "
              f"[{rep['translated']} spans, {out.stat().st_size // 1024} KB]  "
              f"{status}")
        for miss in rep["missing"]:
            print(f"     · untranslated: {miss!r}")
    return reports


if __name__ == "__main__":
    reports = build()
    miss = sum(len(r["missing"]) for r in reports)
    if miss:
        print(f"\n!! {miss} untranslated span(s)")
        sys.exit(1)
    print("\nDone.")
