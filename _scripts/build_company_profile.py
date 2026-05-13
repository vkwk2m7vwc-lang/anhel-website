#!/usr/bin/env python3
"""
Generate the ANHEL® / Profit LLC company-profile PDF in three locales
(RU / EN / TR). Single-page A4 each, minimal-premium ANHEL design,
identical content shape but locale-specific copy and formatting.

The existing RU master `/public/anhel-card.pdf` is preserved untouched
for backwards compatibility (the URL is referenced from older Footer
links and emails). Side-by-side we add `/public/company-profile-{ru,
en,tr}.pdf`. /contacts page download button swaps to the right one
based on the active locale.

RU is the canonical legal record. EN and TR are in international
B2B-card format (Gazprom Neft / Schneider Electric Russia register
for EN; Vansan / Sempa register for TR). The Russian tax IDs
(INN / KPP / OGRN / OKPO / OKATO) are kept in transliterated form
with explanatory English / Turkish labels in brackets.
"""

from pathlib import Path
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path("/Users/alexeyanurin/Desktop/ANHEL Сайт/ANHEL  Сайт")
PUB = ROOT / "public"

PRIMARY = HexColor("#0A0A0A")
SECONDARY = HexColor("#F5F5F3")
MUTED = HexColor("#A0A0A0")
HAIRLINE = HexColor("#CCCCCC")
ACCENT = HexColor("#D72638")

FONT_BODY_PATHS = [
    "/Library/Fonts/Arial Unicode.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
]
FONT_BOLD_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def register_fonts():
    reg = next((p for p in FONT_BODY_PATHS if Path(p).exists()), None)
    bold = next((p for p in FONT_BOLD_PATHS if Path(p).exists()), reg)
    if not reg:
        raise RuntimeError("No Unicode-capable TTF font found")
    pdfmetrics.registerFont(TTFont("Body", reg))
    pdfmetrics.registerFont(TTFont("Bold", bold or reg))


# -------------------------------------------------------------- content

LOCALES = {
    "ru": {
        "title": "ООО «ПРОФИТ»",
        "subtitle": "КАРТОЧКА ОРГАНИЗАЦИИ",
        "tag_brand": "Юридическое лицо за товарным знаком ANHEL®",
        "sections": [
            {
                "label": "ПОЛНОЕ ФИРМЕННОЕ НАИМЕНОВАНИЕ",
                "rows": [
                    ("", "Общество с ограниченной ответственностью «Профит»"),
                ],
            },
            {
                "label": "ЮРИДИЧЕСКИЙ И ФАКТИЧЕСКИЙ АДРЕС",
                "rows": [
                    ("", "194021, г. Санкт-Петербург, вн.тер.г. Муниципальный Округ Светлановское,"),
                    ("", "ул. Политехническая, д. 6, стр. 1, помещ. Н-7"),
                ],
            },
            {
                "label": "РЕГИСТРАЦИОННЫЕ ДАННЫЕ",
                "rows": [
                    ("ИНН", "7802825464"),
                    ("КПП", "780201001"),
                    ("ОГРН", "1137847188357"),
                    ("ОКПО", "11109065"),
                    ("ОКАТО", "40265563000"),
                ],
            },
            {
                "label": "БАНКОВСКИЕ РЕКВИЗИТЫ",
                "rows": [
                    ("НАИМЕНОВАНИЕ БАНКА", "Филиал «Санкт-Петербургский» АО «Альфа-Банк»"),
                    ("РАСЧЁТНЫЙ СЧЁТ", "40702810932410004000"),
                    ("БИК", "044030786"),
                    ("КОРРЕСПОНДЕНТСКИЙ СЧЁТ", "30101810600000000786"),
                ],
            },
            {
                "label": "ГЕНЕРАЛЬНЫЙ ДИРЕКТОР",
                "rows": [
                    ("", "Леплявкин А. В."),
                ],
            },
        ],
        "footer_date": "АКТУАЛЬНО НА 13 МАЯ 2026 ГОДА",
        "footer_contact": "ANHELSPB.COM · INFO@ANHELSPB.COM · +7 (812) 416-45-00",
    },
    "en": {
        "title": "PROFIT LLC",
        "subtitle": "COMPANY PROFILE",
        "tag_brand": "Legal entity behind the ANHEL® brand",
        "sections": [
            {
                "label": "LEGAL NAME",
                "rows": [
                    ("Full name", "Profit Limited Liability Company"),
                    ("Trading name", "Profit LLC"),
                ],
            },
            {
                "label": "REGISTERED AND OPERATING ADDRESS",
                "rows": [
                    ("", "6/1 Polytechnicheskaya St., suite Н-7,"),
                    ("", "Svetlanovskoye Municipal District,"),
                    ("", "Saint Petersburg 194021, Russia"),
                ],
            },
            {
                "label": "REGISTRATION DETAILS",
                "rows": [
                    ("Tax ID (INN)", "7802825464"),
                    ("KPP", "780201001"),
                    ("State registration number (OGRN)", "1137847188357"),
                    ("OKPO", "11109065"),
                    ("OKATO", "40265563000"),
                ],
            },
            {
                "label": "BANKING DETAILS",
                "rows": [
                    ("Bank name", "Alfa-Bank JSC, Saint Petersburg Branch"),
                    ("Settlement account", "40702810932410004000"),
                    ("BIC", "044030786"),
                    ("Correspondent account", "30101810600000000786"),
                ],
            },
            {
                "label": "GENERAL DIRECTOR",
                "rows": [
                    ("", "A. V. Leplyavkin"),
                ],
            },
        ],
        "footer_date": "VALID AS OF 13 MAY 2026",
        "footer_contact": "ANHELSPB.COM · INFO@ANHELSPB.COM · +7 (812) 416-45-00",
    },
    "tr": {
        "title": "PROFIT LLC",
        "subtitle": "ŞİRKET PROFİLİ",
        "tag_brand": "ANHEL® markasının arkasındaki tüzel kişilik",
        "sections": [
            {
                "label": "RESMİ ŞİRKET ADI",
                "rows": [
                    ("Tam adı", "Profit Limited Sorumlu Şirket (LLC)"),
                    ("Ticari adı", "Profit LLC"),
                ],
            },
            {
                "label": "TESCİL VE FAALİYET ADRESİ",
                "rows": [
                    ("", "6/1 Polytechnicheskaya St., daire Н-7,"),
                    ("", "Svetlanovskoye Belediye Bölgesi,"),
                    ("", "Saint Petersburg 194021, Rusya"),
                ],
            },
            {
                "label": "TESCİL BİLGİLERİ",
                "rows": [
                    ("Vergi numarası (INN)", "7802825464"),
                    ("KPP", "780201001"),
                    ("Devlet tescil numarası (OGRN)", "1137847188357"),
                    ("OKPO", "11109065"),
                    ("OKATO", "40265563000"),
                ],
            },
            {
                "label": "BANKA BİLGİLERİ",
                "rows": [
                    ("Banka adı", "Alfa-Bank JSC, Saint Petersburg Şubesi"),
                    ("Hesap numarası", "40702810932410004000"),
                    ("BIC", "044030786"),
                    ("Muhabir hesap", "30101810600000000786"),
                ],
            },
            {
                "label": "GENEL MÜDÜR",
                "rows": [
                    ("", "A. V. Leplyavkin"),
                ],
            },
        ],
        "footer_date": "13 MAYIS 2026 İTİBARIYLA GEÇERLİDİR",
        "footer_contact": "ANHELSPB.COM · INFO@ANHELSPB.COM · +7 (812) 416-45-00",
    },
}


# -------------------------------------------------------------- render


def render(locale: str, content: dict, out: Path):
    register_fonts()
    w, h = A4
    c = canvas.Canvas(str(out), pagesize=A4)

    # --- Top band: ANHEL wordmark + brand line
    c.setFillColor(PRIMARY)
    c.setFont("Bold", 22)
    c.drawString(20 * mm, h - 22 * mm, "ANHEL")
    c.setFont("Body", 10)
    c.drawString(
        20 * mm + c.stringWidth("ANHEL", "Bold", 22) + 1.5 * mm,
        h - 18 * mm,
        "®",
    )
    c.setFillColor(MUTED)
    c.setFont("Body", 8)
    c.drawRightString(w - 20 * mm, h - 20 * mm, content["tag_brand"])

    # --- Accent stripe
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.5)
    c.line(20 * mm, h - 27 * mm, w - 20 * mm, h - 27 * mm)

    # --- Title block
    c.setFillColor(PRIMARY)
    c.setFont("Bold", 24)
    c.drawString(20 * mm, h - 40 * mm, content["title"])
    c.setFillColor(MUTED)
    c.setFont("Body", 10)
    c.drawString(20 * mm, h - 47 * mm, content["subtitle"])

    # --- Sections
    y = h - 60 * mm
    for sec in content["sections"]:
        # section label
        c.setFillColor(MUTED)
        c.setFont("Body", 7.5)
        c.drawString(20 * mm, y, sec["label"])
        y -= 4 * mm

        # rows
        c.setFillColor(PRIMARY)
        for label, value in sec["rows"]:
            if label:
                c.setFont("Body", 8)
                c.setFillColor(MUTED)
                c.drawString(20 * mm, y, label)
                c.setFont("Body", 10)
                c.setFillColor(PRIMARY)
                c.drawString(80 * mm, y, value)
            else:
                c.setFont("Body", 10)
                c.setFillColor(PRIMARY)
                c.drawString(20 * mm, y, value)
            y -= 5.5 * mm

        # hairline separator
        y -= 1 * mm
        c.setStrokeColor(HAIRLINE)
        c.setLineWidth(0.4)
        c.line(20 * mm, y, w - 20 * mm, y)
        y -= 5 * mm

    # --- Footer
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.2)
    c.line(20 * mm, 26 * mm, w - 20 * mm, 26 * mm)

    c.setFillColor(MUTED)
    c.setFont("Body", 8)
    c.drawString(20 * mm, 19 * mm, content["footer_date"])
    c.setFont("Body", 8)
    c.drawRightString(w - 20 * mm, 19 * mm, content["footer_contact"])

    c.showPage()
    c.save()
    print(f"  wrote {out.name} ({out.stat().st_size // 1024} KB)")


def main():
    for loc, content in LOCALES.items():
        render(loc, content, PUB / f"company-profile-{loc}.pdf")


if __name__ == "__main__":
    main()
