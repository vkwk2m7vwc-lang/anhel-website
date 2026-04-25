#!/usr/bin/env python3
"""
Переоформление руководства по эксплуатации НУ Альфа СПД (МФМК)
в брендинг ANHEL®.

Стратегия:
  1. Заменяем обложку (стр. 1) на новую ANHEL-обложку (полная пересборка
     через reportlab) — содержит wordmark, заголовок «Руководство по
     эксплуатации насосных установок ANHEL®», hero-render с сайта
     (используем тот же ассет /public/assets/products/hvs-nu-red2.png).
  2. На страницах 2..N применяем overlay: ANHEL-шапка перекрывает
     шапку МФМК, новый футер с реквизитами ПРОФИТ перекрывает
     старый. Form-fields отсутствуют, поэтому overlay безопасен.

Output: не коммитится в репо. Сохраняется локально в
~/Desktop/ANHEL Сайт/Документы/готовое/Руководство_эксплуатации_ANHEL.pdf
"""
from pathlib import Path
import io
import pypdf
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

# Sandbox vs Mac path detection
ROOT = Path("/sessions/clever-stoic-hamilton/mnt/anhel-website")
if not ROOT.exists():
    ROOT = Path("/Users/alexeyanurin/Projects/anhel-website")

SRC = ROOT / "_tmp_manual.pdf"
HERO_IMAGE = ROOT / "public" / "assets" / "products" / "hvs-nu-red2.png"

# Output path on user's Mac
OUT_DIR_MAC = "/Users/alexeyanurin/Desktop/ANHEL Сайт/Документы/готовое"
# In sandbox we can't write to /Users/, so write to project's _tmp_ + user runs DC mkdir + cp
OUT_NAME = "Руководство_эксплуатации_ANHEL.pdf"

PRIMARY = HexColor("#0A0A0A")
SECONDARY = HexColor("#F5F5F3")
STEEL = HexColor("#8A94A0")
ACCENT_FIRE = HexColor("#D72638")


def register_fonts():
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/Library/Fonts/Arial Unicode.ttf",
    ]
    bold_paths = ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"]
    reg = next((p for p in paths if Path(p).exists()), None)
    bold = next((p for p in bold_paths if Path(p).exists()), reg)
    if reg:
        pdfmetrics.registerFont(TTFont("ANHELSans", reg))
        pdfmetrics.registerFont(TTFont("ANHELSans-Bold", bold or reg))


def make_cover(width: float, height: float) -> bytes:
    """ANHEL cover — wordmark, title, version, hero image на A4."""
    register_fonts()
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(width, height))

    # Background — black ANHEL primary
    c.setFillColor(PRIMARY)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    # Top: ANHEL wordmark + ®
    c.setFillColor(SECONDARY)
    c.setFont("ANHELSans-Bold", 32)
    c.drawString(50, height - 75, "ANHEL")
    c.setFont("ANHELSans", 14)
    c.drawString(50 + c.stringWidth("ANHEL", "ANHELSans-Bold", 32) + 4, height - 65, "®")

    # Mono accent stripe
    c.setStrokeColor(ACCENT_FIRE)
    c.setLineWidth(2)
    c.line(50, height - 95, width - 50, height - 95)

    # Section badge
    c.setFillColor(ACCENT_FIRE)
    c.setFont("ANHELSans-Bold", 9)
    c.drawString(50, height - 115, "01 · ТЕХНИЧЕСКАЯ ДОКУМЕНТАЦИЯ")

    # Hero image — embed product render центрированно
    if HERO_IMAGE.exists():
        try:
            img = ImageReader(str(HERO_IMAGE))
            iw, ih = img.getSize()
            # Scale to fit a 400x500 box centered
            box_w, box_h = 380, 480
            scale = min(box_w / iw, box_h / ih)
            tw, th = iw * scale, ih * scale
            x = (width - tw) / 2
            y = height / 2 - th / 2 + 40
            c.drawImage(img, x, y, width=tw, height=th, mask="auto",
                        preserveAspectRatio=True)
        except Exception as e:
            pass

    # Bottom title
    c.setFillColor(SECONDARY)
    c.setFont("ANHELSans-Bold", 28)
    title_y = 220
    title = "Руководство по эксплуатации"
    c.drawString(50, title_y, title)

    c.setFont("ANHELSans", 18)
    c.setFillColor(STEEL)
    subtitle = "Насосные установки ANHEL® серии HVS-NU"
    c.drawString(50, title_y - 32, subtitle)

    # Footer area on cover
    c.setStrokeColor(STEEL)
    c.setLineWidth(0.5)
    c.line(50, 90, width - 50, 90)
    c.setFont("ANHELSans", 9)
    c.setFillColor(SECONDARY)
    c.drawString(50, 70, "ООО «ПРОФИТ»")
    c.drawString(50, 56, "Санкт-Петербург · Производство — Москва")
    c.drawRightString(width - 50, 70, "anhelspb.com")
    c.drawRightString(width - 50, 56, "Версия 2026.04 · Изд. 1")

    c.showPage()
    c.save()
    return buf.getvalue()


def make_overlay_inner(width: float, height: float) -> bytes:
    """Overlay для inner-страниц: white-rect шапка + footer."""
    register_fonts()
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(width, height))
    # Top banner — perekрывает шапку МФМК (~85pt)
    banner_h = 85
    c.setFillColor(white)
    c.rect(0, height - banner_h, width, banner_h, fill=1, stroke=0)
    c.setStrokeColor(ACCENT_FIRE)
    c.setLineWidth(1)
    c.line(40, height - banner_h, width - 40, height - banner_h)
    # Wordmark
    c.setFillColor(PRIMARY)
    c.setFont("ANHELSans-Bold", 16)
    c.drawString(40, height - 50, "ANHEL")
    c.setFont("ANHELSans", 8)
    c.drawString(40 + c.stringWidth("ANHEL", "ANHELSans-Bold", 16) + 2, height - 44, "®")
    # Right tag
    c.setFillColor(STEEL)
    c.setFont("ANHELSans", 7)
    c.drawRightString(width - 40, height - 50, "РУКОВОДСТВО ПО ЭКСПЛУАТАЦИИ")
    c.drawRightString(width - 40, height - 62, "Насосные установки HVS-NU")

    # Bottom footer — перекрывает футер МФМК (~50pt)
    footer_h = 50
    c.setFillColor(white)
    c.rect(0, 0, width, footer_h, fill=1, stroke=0)
    c.setStrokeColor(HexColor("#E5E5E3"))
    c.setLineWidth(0.5)
    c.line(40, footer_h, width - 40, footer_h)
    c.setFillColor(STEEL)
    c.setFont("ANHELSans", 7)
    c.drawCentredString(width / 2, 25, "ООО «ПРОФИТ» · Санкт-Петербург · +7 (812) 416-4500")
    c.drawCentredString(width / 2, 14, "info@anhelspb.com · anhelspb.com")
    c.showPage()
    c.save()
    return buf.getvalue()


def main():
    reader = pypdf.PdfReader(str(SRC))
    n = len(reader.pages)
    p1 = reader.pages[0]
    w = float(p1.mediabox.width)
    h = float(p1.mediabox.height)

    writer = pypdf.PdfWriter()

    # Page 1 — completely replace with ANHEL cover
    cover_bytes = make_cover(w, h)
    cover_reader = pypdf.PdfReader(io.BytesIO(cover_bytes))
    writer.add_page(cover_reader.pages[0])

    # Pages 2..N — apply overlay (ANHEL banner + footer)
    for idx in range(1, n):
        page = reader.pages[idx]
        pw = float(page.mediabox.width)
        ph = float(page.mediabox.height)
        ovl_bytes = make_overlay_inner(pw, ph)
        ovl_reader = pypdf.PdfReader(io.BytesIO(ovl_bytes))
        # Important: clone page first so we don't mutate reader.pages
        writer.add_page(page)
        writer.pages[-1].merge_page(ovl_reader.pages[0])

    out = ROOT / "_tmp_manual_anhel.pdf"
    with open(out, "wb") as f:
        writer.write(f)
    print(f"OK: {n} pages → {out}")


if __name__ == "__main__":
    main()
