#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_manual_translations.py  —  PDF localization wave-2 (rewrite)

Generates EN and TR versions of the 16-page ANHEL® operating manual
(SPD-type pumping units) that match the Russian master
``public/docs/<cat>/manual.pdf``: same white cover with the equipment
photo, same header band, company requisites, section markers, heading
accents, warning bars, footer and 16-page geometry.

Why a rewrite
-------------
The wave-3 manual was composed from scratch with a different visual
language — a black cover, no equipment photo, a single-line header and,
worst of all, the Cyrillic ОГРН / ИНН / КПП block left untranslated on
the EN/TR cover.  This rewrite renders the (already reviewed) EN/TR
content from _manual_content.py *onto the RU master*:

  * the header band, footer, page indicators and the cover photo are
    kept from the master (redact-in-place of the few header strings);
  * the whole body of every content page is cleared (text + the
    position-locked heading accents / warning bars / table rules) and
    re-laid-out fresh in the master's exact typography, because the
    accents are pinned to the Russian text flow and cannot simply be
    kept.

Fonts: DejaVu Sans / Sans-Bold from _scripts/fonts/ — the family the RU
master was built with.

Run:
    python3 _scripts/build_manual_translations.py
"""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

import fitz  # PyMuPDF

from build_questionnaire_translations import (  # shared engine
    FONT_REG, FONT_BLD, _FONT_R, _FONT_B, _text_width, _rgb,
    _redact_rect, _draw, _wrap, REQUISITES, _PAGE_RE,
)
from _manual_content import EN_PAGES, TR_PAGES

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "public" / "docs"
# the 5 pump subcategories share one byte-identical RU manual master
LEAD = "firefighting"
SIBLINGS = ["water-supply", "pressure-boost", "heating-cooling", "special"]

# --------------------------------------------------------------------------
# Typography — measured from the RU master
# --------------------------------------------------------------------------
X_LEFT = 62.4
X_RIGHT = 532.9
WIDTH = X_RIGHT - X_LEFT                       # 470.5
CONTENT_TOP = 98.0                             # baseline of the section marker
CONTENT_BOTTOM = 790.0                         # last usable baseline

COL_GREY = 0x7A7A7A
COL_DARK = 0x0A0A0A
COL_BODY = 0x3A3A3A
COL_RED = 0xD72638

# block fonts (size, bold, colour)
F_SECTION = (7.5, False, COL_GREY)
F_H2 = (16.0, True, COL_DARK)
F_H3 = (11.0, True, COL_DARK)
F_INTRO = (9.5, False, COL_DARK)
F_PARA = (9.5, False, COL_BODY)
F_BULLET = (9.5, False, COL_BODY)
F_WARN_TITLE = (9.0, True, COL_RED)
F_WARN_BODY = (9.0, False, COL_DARK)
F_TBL_KEY = (9.0, True, COL_DARK)
F_TBL_VAL = (9.0, False, COL_BODY)
F_TOC = (10.0, False, COL_DARK)
F_TOC_NUM = (10.0, True, COL_DARK)

# all gaps measured baseline-to-baseline from the RU master
LEAD_BODY = 14.5        # line leading inside a paragraph / bullet
LEAD_WARN = 13.5
LEAD_TBL = 15.0
GAP_SECTION_H2 = 18.0   # section marker baseline -> h2 baseline
GAP_H2_BODY = 32.0      # h2 baseline -> first body baseline
GAP_PARA = 8.0          # extra gap between consecutive paragraphs
GAP_BEFORE_H3 = 18.0    # extra gap before an h3
GAP_AFTER_H3 = 14.0     # h3 baseline -> body baseline
GAP_BEFORE_BULLETS = 4.0
GAP_BULLET = 4.0        # extra gap between bullet items
GAP_BEFORE_SECTION = 14.0
GAP_BEFORE_WARN = 20.0
GAP_TABLE_ROW = 23.0    # last line of a row -> first line of the next
H2_RULE_DY = 10.0       # h2 baseline -> accent underline y
H2_RULE_X1 = 122.4
HAIRLINE = (0.886, 0.886, 0.886)
ACCENT_RULE = (0.039, 0.039, 0.039)

# table column geometry
TBL_KEY_X = 62.4
TBL_VAL_X = 262.4
TBL_KEY_W = TBL_VAL_X - TBL_KEY_X - 10
TBL_VAL_W = X_RIGHT - TBL_VAL_X

# footer text (per the RU master)
FOOTER = {
    "en": "Operating manual — ANHEL® SPD pumping units",
    "tr": "Kullanım kılavuzu — ANHEL® SPD pompa istasyonları",
}

# --------------------------------------------------------------------------
# Cover page (page 1) — fixed strings
# --------------------------------------------------------------------------
COVER_REQUISITES = {
    "ООО «Профит» · г. Санкт-Петербург": {
        "en": "Profit LLC · Saint Petersburg, Russia",
        "tr": "Profit LLC · Saint Petersburg, Rusya",
    },
    "Политехническая ул., д. 6, стр. 1, пом. Н-7, 194021": {
        "en": "6/1 Polytechnicheskaya St., suite Н-7, 194021",
        "tr": "6/1 Polytechnicheskaya St., daire Н-7, 194021",
    },
    "+7 (812) 416-4500 · info@anhelspb.com": {
        "en": "+7 (812) 416-4500 · info@anhelspb.com",
        "tr": "+7 (812) 416-4500 · info@anhelspb.com",
    },
    "ТЕХНИЧЕСКАЯ ДОКУМЕНТАЦИЯ  ·  ANHEL®  ·  2026": {
        "en": "TECHNICAL DOCUMENTATION  ·  ANHEL®  ·  2026",
        "tr": "TEKNİK DOKÜMANTASYON  ·  ANHEL®  ·  2026",
    },
    "Руководство": {"en": "Operating", "tr": "Kullanım"},
    "по эксплуатации": {"en": "Manual", "tr": "Kılavuzu"},
    "Насосные установки ANHEL® · тип СПД": {
        "en": "ANHEL® pumping units · SPD type",
        "tr": "ANHEL® pompa istasyonları · SPD tipi",
    },
    "Версия 1.0   Редакция 2026   Санкт-Петербург": {
        "en": "Version 1.0   Edition 2026   Saint Petersburg",
        "tr": "Sürüm 1.0   Baskı 2026   Saint Petersburg",
    },
    "ОГРН 1137847188357   ·   ИНН 7802825464   ·   КПП 780201001": {
        "en": "OGRN 1137847188357   ·   Tax ID (INN) 7802825464   ·   KPP 780201001",
        "tr": "OGRN 1137847188357   ·   Vergi No (INN) 7802825464   ·   KPP 780201001",
    },
}


# --------------------------------------------------------------------------
# EN/TR page -> ordered list of canonical content blocks
#   block = ("section"|"h2"|"h3"|"para"|"intro"|"bullets"|"warn"|"table", data)
# --------------------------------------------------------------------------
def page_blocks(page: dict):
    """Flatten one EN_PAGES / TR_PAGES dict into ordered render blocks."""
    keys = list(page.keys())
    # the only authored-order glitch: on page 3 h2_2 precedes tag_2
    if "h2_2" in keys and "tag_2" in keys:
        i, j = keys.index("h2_2"), keys.index("tag_2")
        if i < j:
            keys[i], keys[j] = keys[j], keys[i]
    blocks = []
    for k in keys:
        v = page[k]
        if k in ("tag", "tag_2"):
            blocks.append(("section", v))
        elif k in ("h2", "h2_2", "title"):
            blocks.append(("h2", v))
        elif k in ("h3", "h3_2", "h3_3"):
            blocks.append(("h3", v))
        elif k in ("intro", "intro_2"):
            blocks.append(("intro", v))
        elif k in ("para", "para_2", "para_b", "para_c", "para_d"):
            blocks.append(("para", v))
        elif k in ("paras", "paras_2"):
            for p in v:
                blocks.append(("para", p))
        elif k in ("bullets", "bullets_ordered", "bullets_ordered_2"):
            ordered = k.startswith("bullets_ordered")
            blocks.append(("bullets", {"items": v, "ordered": ordered}))
        elif k in ("warn", "warn_2"):
            blocks.append(("warn", v))
        elif k in ("table", "table_2"):
            blocks.append(("table", v))
        elif k == "toc":
            blocks.append(("toc", v))
        # cover/title/subtitle/version handled by the cover routine
    return blocks


# --------------------------------------------------------------------------
# Low-level drawing
# --------------------------------------------------------------------------
def _put(page, x, y, text, font_spec):
    size, bold, color = font_spec
    _draw(page, (x, y), text, bold, size, color)


def _line(page, x0, y, x1, color, width=0.4):
    page.draw_line(fitz.Point(x0, y), fitz.Point(x1, y),
                   color=color, width=width)


def draw_section(page, y, text):
    _put(page, X_LEFT, y, text, F_SECTION)
    return y


def draw_h2(page, y, text):
    _put(page, X_LEFT, y, text, F_H2)
    _line(page, X_LEFT, y + H2_RULE_DY, H2_RULE_X1, ACCENT_RULE, 0.8)
    return y


def draw_h3(page, y, text):
    _put(page, X_LEFT, y, text, F_H3)
    return y


def draw_paragraph(page, y, text, font_spec, x=X_LEFT, width=WIDTH,
                   leading=LEAD_BODY):
    size, bold, _ = font_spec
    for ln in _wrap(text, bold, size, width):
        _put(page, x, y, ln, font_spec)
        y += leading
    return y - leading            # baseline of the last line drawn


def draw_bullets(page, y, items, ordered=False):
    size, bold, color = F_BULLET
    for i, item in enumerate(items):
        marker = f"{i + 1}." if ordered else "•"
        _put(page, X_LEFT, y, marker, F_BULLET)
        last = draw_paragraph(page, y, item, F_BULLET,
                              x=X_LEFT + 14.0, width=WIDTH - 14.0)
        y = last + LEAD_BODY + GAP_BULLET
    return y - LEAD_BODY - GAP_BULLET


def draw_warn(page, y, text):
    """y = baseline of the marker word.  Returns the last body baseline."""
    # split the leading marker word (CAUTION — / DİKKAT —) from the body
    title, _, body = text.partition(" — ")
    if not body:
        title, _, body = text.partition(" – ")
    _put(page, X_LEFT + 12.0, y, title, F_WARN_TITLE)
    by = y + 16.0
    size, bold, _ = F_WARN_BODY
    for ln in _wrap(body, bold, size, WIDTH - 12.0):
        _put(page, X_LEFT + 12.0, by, ln, F_WARN_BODY)
        by += LEAD_WARN
    bottom = by - LEAD_WARN
    page.draw_line(fitz.Point(X_LEFT, y - 6.0),
                   fitz.Point(X_LEFT, bottom + 5.0),
                   color=(0.843, 0.149, 0.22), width=2.0)
    return bottom


def draw_table(page, y, rows):
    """y = baseline of the first row's first line.  Returns the last
    baseline drawn."""
    ks, kb, _ = F_TBL_KEY
    vs, vb, _ = F_TBL_VAL
    last = y
    for ri, (key, val) in enumerate(rows):
        key_lines = _wrap(key, kb, ks, TBL_KEY_W)
        val_lines = _wrap(val, vb, vs, TBL_VAL_W)
        if ri:
            _line(page, X_LEFT, y - 11.0, X_RIGHT, HAIRLINE, 0.4)
        for i, ln in enumerate(key_lines):
            _put(page, TBL_KEY_X, y + i * LEAD_TBL, ln, F_TBL_KEY)
        for i, ln in enumerate(val_lines):
            _put(page, TBL_VAL_X, y + i * LEAD_TBL, ln, F_TBL_VAL)
        n = max(len(key_lines), len(val_lines))
        last = y + (n - 1) * LEAD_TBL
        y = last + GAP_TABLE_ROW
    return last


def draw_toc(page, y, entries):
    size, bold, _ = F_TOC
    for name, num in entries:
        _put(page, X_LEFT, y, name, F_TOC)
        nw = _text_width(str(num), True, size)
        _put(page, X_RIGHT - nw, y, str(num), F_TOC_NUM)
        # dotted leader
        name_w = _text_width(name, bold, size)
        dot_x0 = X_LEFT + name_w + 6
        dot_x1 = X_RIGHT - nw - 6
        dots = "." * max(0, int((dot_x1 - dot_x0) / _text_width(".", False, 9)))
        if dots:
            _draw(page, (dot_x0, y), dots, False, 9.0, COL_GREY)
        y += 22.0
    return y


# --------------------------------------------------------------------------
# Page layout
# --------------------------------------------------------------------------
def layout_content_page(page, blocks, locale, report):
    """Clear the body of a content page and re-lay-out the translated blocks."""
    # 1. wipe the whole body (text + position-locked accents / rules),
    #    keeping the header band (y < 86) and the footer hairline
    #    (y = 796.9).  The rect runs wider than the text column because a
    #    few RU warning lines overshoot the right margin.
    page.add_redact_annot(fitz.Rect(40.0, 86.0, 555.0, 795.0), fill=False)
    page.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_TOUCHED,
        text=fitz.PDF_REDACT_TEXT_REMOVE,
    )

    # 2. re-flow the blocks
    y = CONTENT_TOP
    first = True
    prev = None
    for kind, data in blocks:
        if kind == "section":
            if not first:
                y += GAP_BEFORE_SECTION
            draw_section(page, y, data)
            y += GAP_SECTION_H2
            prev = "section"
        elif kind == "h2":
            if prev not in (None, "section") and not first:
                y += GAP_BEFORE_SECTION
            draw_h2(page, y, data)
            y += GAP_H2_BODY
            prev = "h2"
        elif kind == "h3":
            if not first:
                y += GAP_BEFORE_H3
            draw_h3(page, y, data)
            y += GAP_AFTER_H3
            prev = "h3"
        elif kind in ("para", "intro"):
            if prev in ("para", "intro", "warn", "bullets"):
                y += GAP_PARA
            spec = F_INTRO if kind == "intro" else F_PARA
            last = draw_paragraph(page, y, data, spec)
            y = last + LEAD_BODY
            prev = kind
        elif kind == "bullets":
            y += GAP_BEFORE_BULLETS
            last = draw_bullets(page, y, data["items"], data["ordered"])
            y = last + LEAD_BODY
            prev = "bullets"
        elif kind == "warn":
            y += GAP_BEFORE_WARN
            bottom = draw_warn(page, y, data)
            y = bottom + LEAD_WARN
            prev = "warn"
        elif kind == "table":
            last = draw_table(page, y, data)
            y = last + GAP_TABLE_ROW
            prev = "table"
        elif kind == "toc":
            y = draw_toc(page, y, data)
            prev = "toc"
        first = False

    if y > CONTENT_BOTTOM + 6:
        report["overflow"].append((report["_page"], round(y, 1)))


def localize_header_footer(page, locale, total):
    """Translate the running header requisites, page indicator and footer."""
    redactions, draws = [], []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") == 1:
            continue
        for line in block["lines"]:
            for sp in line["spans"]:
                text = sp["text"].strip()
                if not text:
                    continue
                bold = "Bold" in sp["font"]
                size, color = sp["size"], sp["color"]
                bbox, origin = sp["bbox"], sp["origin"]
                if text in REQUISITES:
                    tr = REQUISITES[text][locale]
                    redactions.append(_redact_rect(bbox))
                    w = _text_width(tr, bold, size)
                    draws.append(((bbox[2] - w, origin[1]), tr, bold,
                                  size, color))
                    continue
                m = _PAGE_RE.match(text)
                if m:
                    tr = ("page " if locale == "en" else "sayfa ") + \
                         f"{m.group(1)} / {m.group(2)}"
                    redactions.append(_redact_rect(bbox))
                    w = _text_width(tr, bold, size)
                    draws.append(((bbox[2] - w, origin[1]), tr, bold,
                                  size, color))
                    continue
                if text.startswith("Руководство по эксплуатации"):
                    tr = FOOTER[locale]
                    redactions.append(_redact_rect(bbox))
                    draws.append(((origin[0], origin[1]), tr, bold,
                                  size, color))
                    continue
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


def localize_cover(page, locale):
    """Translate the cover-page strings; keep the equipment photo."""
    redactions, draws = [], []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") == 1:
            continue
        for line in block["lines"]:
            for sp in line["spans"]:
                text = sp["text"].strip()
                if not text or text in ("ANHEL", "®", "anhelspb.com"):
                    continue
                bold = "Bold" in sp["font"]
                size, color = sp["size"], sp["color"]
                bbox, origin = sp["bbox"], sp["origin"]
                if text not in COVER_REQUISITES:
                    raise RuntimeError(f"cover: untranslated {text!r}")
                tr = COVER_REQUISITES[text][locale]
                redactions.append(_redact_rect(bbox))
                # the three requisite lines + the footer line are right- or
                # block-aligned; everything else keeps its left origin
                right_aligned = bbox[2] >= X_RIGHT - 1 and origin[0] > X_LEFT + 5
                if right_aligned:
                    w = _text_width(tr, bold, size)
                    draws.append(((bbox[2] - w, origin[1]), tr, bold,
                                  size, color))
                else:
                    draws.append(((origin[0], origin[1]), tr, bold,
                                  size, color))
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


def localize(master: Path, out: Path, locale: str) -> dict:
    pages = EN_PAGES if locale == "en" else TR_PAGES
    report = {"file": out.name, "overflow": [], "_page": 0}
    doc = fitz.open(master)
    total = doc.page_count
    for i, page in enumerate(doc):
        report["_page"] = i + 1
        if i == 0:
            localize_cover(page, locale)
            continue
        localize_header_footer(page, locale, total)
        layout_content_page(page, page_blocks(pages[i]), locale, report)
    try:
        doc.subset_fonts()
    except Exception:
        pass
    out.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(out), deflate=True, garbage=4, clean=True)
    doc.close()
    return report


def build():
    master = DOCS / LEAD / "manual.pdf"
    reports = []
    for locale in ("en", "tr"):
        out = DOCS / LEAD / f"manual-{locale}.pdf"
        rep = localize(master, out, locale)
        reports.append(rep)
        kb = out.stat().st_size // 1024
        status = "OK" if not rep["overflow"] else f"OVERFLOW {rep['overflow']}"
        print(f"  {out.relative_to(ROOT)}  [{kb} KB]  {status}")
        for sib in SIBLINGS:
            sib_out = DOCS / sib / f"manual-{locale}.pdf"
            sib_out.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(out, sib_out)
            print(f"     -> copied to {sib_out.relative_to(ROOT)}")
    return reports


if __name__ == "__main__":
    reports = build()
    over = sum(len(r["overflow"]) for r in reports)
    if over:
        print(f"\n!! {over} page(s) overflow — tighten spacing")
        sys.exit(1)
    print("\nDone.")
