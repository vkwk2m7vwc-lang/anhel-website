#!/usr/bin/env python3
"""
Перебрендирование 3 опросных листов в стилистику ANHEL.

Все 3 исходника — уже fillable PDF (AcroForm). Перегенерация полей
ломает совместимость; вместо этого используем overlay-стратегию:

  1. Генерируем средствами reportlab страницу-наложение (PDF) с
     шапкой ANHEL (wordmark + реквизиты ПРОФИТ) и опционально
     нижним колонтитулом.
  2. Поверх каждой страницы исходного PDF мерджим overlay через
     pypdf.PageObject.merge_page — так интерактивные поля формы
     (TextField/Checkbox/Radio) сохраняются, заменяется только
     визуальный «капитан» страницы.

ВПУ-опросник уже под брендом ANHEL (заголовок «Anhel» в шапке) —
overlay нужен только для лёгкого выравнивания реквизитов ПРОФИТ;
оставляем как есть, но кладём под единый путь /docs/<product>/.

Для НУ и ИТП — overlay полностью покрывает старую шапку МФМК
(белый прямоугольник в верхней зоне) и наносит ANHEL-wordmark.
Дополнительно — белый прямоугольник в нижней зоне с реквизитами
ПРОФИТ для перекрытия исходного футера МФМК.
"""
from pathlib import Path
import io
import pypdf
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.units import mm

import os
# Detect sandbox vs Mac runtime — sandbox sees the project under /sessions/
ROOT = Path("/sessions/clever-stoic-hamilton/mnt/anhel-website")
if not ROOT.exists():
    ROOT = Path("/Users/alexeyanurin/Projects/anhel-website")
SRC_DIR = ROOT
OUT_DIR = ROOT / "public" / "docs"

# ANHEL palette from _docs/BRAND.md
PRIMARY = HexColor("#0A0A0A")
SECONDARY = HexColor("#F5F5F3")
STEEL = HexColor("#8A94A0")
ACCENT_FIRE = HexColor("#D72638")
ACCENT_WATER = HexColor("#1E6FD9")
ACCENT_TREAT = HexColor("#8A94A0")
ACCENT_HEAT = HexColor("#E8873B")

PROFIT_REQUISITES = (
    "ООО «ПРОФИТ» · Санкт-Петербург, Политехническая ул., д. 6, стр. 1, пом. 1-Н   "
    "Тел. +7 (812) 416-4500 · info@anhelspb.com · anhelspb.com"
)


# Register DejaVu Sans (full Cyrillic support) — both Mac and Linux paths
_FONTS_REGISTERED = False


def _register_fonts():
    global _FONTS_REGISTERED
    if _FONTS_REGISTERED:
        return
    paths_regular = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/Library/Fonts/Arial Unicode.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    paths_bold = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    regular = next((p for p in paths_regular if Path(p).exists()), None)
    bold = next((p for p in paths_bold if Path(p).exists()), regular)
    if regular:
        pdfmetrics.registerFont(TTFont("ANHELSans", regular))
    if bold and bold != regular:
        pdfmetrics.registerFont(TTFont("ANHELSans-Bold", bold))
    elif regular:
        pdfmetrics.registerFont(TTFont("ANHELSans-Bold", regular))
    _FONTS_REGISTERED = True


def make_overlay(width: float, height: float, accent_hex: str, badge: str, title: str) -> bytes:
    """Создаёт PDF одной страницы с ANHEL-шапкой и нижним колонтитулом.
    Возвращает PDF-байты."""
    _register_fonts()
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(width, height))

    # ===== TOP BANNER (расширен — покрывает шапку + заголовок + дисклеймер источника) =====
    banner_h = 215  # ~57mm — достаточно для шапки + заголовка + блока обращения
    c.setFillColor(white)
    c.rect(0, height - banner_h, width, banner_h, fill=1, stroke=0)

    # Hairline-линия акцентом под зоной ANHEL-шапки (52 pt от верха страницы)
    accent_y = height - 90
    c.setStrokeColor(HexColor(accent_hex))
    c.setLineWidth(1.5)
    c.line(40, accent_y, width - 40, accent_y)

    # ANHEL wordmark
    c.setFillColor(PRIMARY)
    c.setFont("ANHELSans-Bold", 26)
    c.drawString(40, height - 60, "ANHEL")
    c.setFont("ANHELSans", 10)
    c.drawString(40 + c.stringWidth("ANHEL", "ANHELSans-Bold", 26) + 2, height - 51, "®")

    # Right-aligned: ПРОФИТ identification
    c.setFillColor(STEEL)
    c.setFont("ANHELSans", 8)
    c.drawRightString(width - 40, height - 47, "ООО «ПРОФИТ»")
    c.drawRightString(width - 40, height - 60, "Санкт-Петербург · Москва (производство)")
    c.drawRightString(width - 40, height - 73, "anhelspb.com")

    # Mono accent badge (категория опросника)
    c.setFillColor(HexColor(accent_hex))
    c.setFont("ANHELSans-Bold", 8)
    c.drawString(40, height - 110, badge)

    # Title в стиле ANHEL — крупный display
    c.setFillColor(PRIMARY)
    c.setFont("ANHELSans-Bold", 17)
    # Wrap if too long
    title_lines = _wrap(title, "ANHELSans-Bold", 17, width - 80, c)
    y = height - 138
    for line in title_lines:
        c.drawString(40, y, line)
        y -= 22

    # Brief disclaimer in ANHEL style
    c.setFillColor(STEEL)
    c.setFont("ANHELSans", 8.5)
    disclaimer = (
        "Заполните опросный лист для подбора оборудования под параметры объекта. "
        "По вопросам обращайтесь: +7 (812) 416-4500, info@anhelspb.com."
    )
    disc_lines = _wrap(disclaimer, "ANHELSans", 8.5, width - 80, c)
    y -= 5
    for line in disc_lines:
        c.drawString(40, y, line)
        y -= 11

    # ===== BOTTOM FOOTER =====
    footer_h = 45
    c.setFillColor(white)
    c.rect(0, 0, width, footer_h, fill=1, stroke=0)
    c.setStrokeColor(HexColor("#E5E5E3"))
    c.setLineWidth(0.5)
    c.line(40, footer_h, width - 40, footer_h)
    c.setFillColor(STEEL)
    c.setFont("ANHELSans", 7)
    c.drawCentredString(width / 2, 22, "ООО «ПРОФИТ» · Санкт-Петербург · +7 (812) 416-4500")
    c.drawCentredString(width / 2, 11, "info@anhelspb.com · anhelspb.com")

    c.showPage()
    c.save()
    return buf.getvalue()


def _wrap(text: str, font: str, size: float, max_width: float, c) -> list:
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = cur + (" " if cur else "") + w
        if c.stringWidth(test, font, size) <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def overlay_pdf(src_path: Path, dst_path: Path, accent_hex: str, badge: str, title: str) -> None:
    """Применяет overlay ко всем страницам исходного PDF.
    Сохраняет AcroForm-поля исходника."""
    reader = pypdf.PdfReader(str(src_path))
    writer = pypdf.PdfWriter(clone_from=reader)
    for idx, page in enumerate(writer.pages):
        w = float(page.mediabox.width)
        h = float(page.mediabox.height)
        # Большой overlay только на первой странице (там МФМК-шапка + заголовок).
        # На остальных страницах — компактный overlay (только верхняя ANHEL-полоса +
        # нижний footer), чтобы не перекрывать контентные поля.
        is_first = idx == 0
        ovl_bytes = make_overlay(w, h, accent_hex, badge, title) if is_first \
            else make_overlay_compact(w, h, accent_hex)
        ovl_reader = pypdf.PdfReader(io.BytesIO(ovl_bytes))
        page.merge_page(ovl_reader.pages[0])
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    with open(dst_path, "wb") as f:
        writer.write(f)


def make_overlay_compact(width: float, height: float, accent_hex: str) -> bytes:
    """Компактный overlay для страниц 2+ — только верхняя ANHEL-полоса
    (перекрывает повторяющуюся шапку МФМК) и нижний footer."""
    _register_fonts()
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(width, height))
    # Top: white rect 100pt + wordmark
    c.setFillColor(white)
    c.rect(0, height - 100, width, 100, fill=1, stroke=0)
    c.setStrokeColor(HexColor(accent_hex))
    c.setLineWidth(1.5)
    c.line(40, height - 90, width - 40, height - 90)
    c.setFillColor(PRIMARY)
    c.setFont("ANHELSans-Bold", 22)
    c.drawString(40, height - 60, "ANHEL")
    c.setFont("ANHELSans", 9)
    c.drawString(40 + c.stringWidth("ANHEL", "ANHELSans-Bold", 22) + 2, height - 53, "®")
    c.setFillColor(STEEL)
    c.setFont("ANHELSans", 8)
    c.drawRightString(width - 40, height - 60, "Опросный лист · ANHEL®  стр. 2")
    # Bottom footer
    c.setFillColor(white)
    c.rect(0, 0, width, 45, fill=1, stroke=0)
    c.setStrokeColor(HexColor("#E5E5E3"))
    c.setLineWidth(0.5)
    c.line(40, 45, width - 40, 45)
    c.setFillColor(STEEL)
    c.setFont("ANHELSans", 7)
    c.drawCentredString(width / 2, 22, "ООО «ПРОФИТ» · Санкт-Петербург · +7 (812) 416-4500")
    c.drawCentredString(width / 2, 11, "info@anhelspb.com · anhelspb.com")
    c.showPage()
    c.save()
    return buf.getvalue()


def copy_as_is(src_path: Path, dst_path: Path) -> None:
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    dst_path.write_bytes(src_path.read_bytes())


def main():
    nu_src = SRC_DIR / "_tmp_op_nu.pdf"
    overlay_pdf(nu_src, OUT_DIR / "firefighting" / "oprosnyi-list.pdf",
                "#D72638", "01 · ОПРОСНЫЙ ЛИСТ", "Опросный лист — насосные станции пожаротушения ANHEL®")
    overlay_pdf(nu_src, OUT_DIR / "water-supply" / "oprosnyi-list.pdf",
                "#1E6FD9", "01 · ОПРОСНЫЙ ЛИСТ", "Опросный лист — насосные станции водоснабжения ANHEL®")
    print("OK: firefighting + water-supply")

    vpu_src = SRC_DIR / "_tmp_op_vpu.pdf"
    overlay_pdf(vpu_src, OUT_DIR / "water-treatment" / "oprosnyi-list.pdf",
                "#8A94A0", "01 · ОПРОСНЫЙ ЛИСТ", "Опросный лист — установки водоподготовки ANHEL®")
    print("OK: water-treatment")

    itp_src = SRC_DIR / "_tmp_op_itp.pdf"
    overlay_pdf(itp_src, OUT_DIR / "heating-unit" / "oprosnyi-list.pdf",
                "#E8873B", "01 · ОПРОСНЫЙ ЛИСТ", "Опросный лист — блочный индивидуальный тепловой пункт ANHEL®")
    print("OK: heating-unit")


if __name__ == "__main__":
    main()
