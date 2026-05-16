#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build the RU ANHEL-branded control-systems questionnaire PDF.

Why this script exists
----------------------
The other RU questionnaires (firefighting / water-treatment / heating-unit /
pressure-boost) are produced by `_scripts/rebrand_forms.py` — it overlays
an ANHEL header and Profit LLC requisites strip onto the original MFMC
AcroForm masters, preserving their body and form fields.

Control-systems has no compatible MFMC master (the original was «Omega
Control», a different layout with its own brand names embedded in the
field labels), so we cannot overlay. Instead this script renders the
questionnaire from scratch with reportlab, matching the same visual
chrome the overlay produces: identical header / footer / requisites
strip, framed rectangular input boxes, square checkboxes, A4 portrait
pages.

The field structure is the SSOT in
`src/content/products/control-systems/quiz-config.ts`; we mirror its
sections / labels / placeholders / required-flags in Python here so a
single source of truth feeds both the live web quiz and the printable
master. Update both files together when the form changes.

Run
---
    /usr/bin/python3 _scripts/build_control_systems_ru_questionnaire.py
    # writes public/docs/control-systems/oprosnyi-list.pdf

Requirements: reportlab. macOS install:
    /usr/bin/python3 -m pip install --user reportlab
(Homebrew Python 3.14 has a broken pyexpat dylib at the time of writing
so we deliberately pin to the system Python 3.9.)
"""

from __future__ import annotations

import os
from pathlib import Path
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as rl_canvas

# --- Paths ----------------------------------------------------------------

ROOT = Path(os.environ.get("ANHEL_ROOT", "/Users/alexeyanurin/Projects/anhel-website"))
OUT = ROOT / "public" / "docs" / "control-systems" / "oprosnyi-list.pdf"

# --- Visual tokens — match rebrand_forms.py / etalon PDFs -----------------

PAGE_W, PAGE_H = A4  # 595.28 × 841.89 pt

MARGIN_L = 40
MARGIN_R = 40
MARGIN_T = 40
MARGIN_B = 36

CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R

PRIMARY = HexColor("#0A0A0A")
STEEL = HexColor("#8A94A0")
HAIRLINE = HexColor("#E5E5E3")

BOX_BORDER = HexColor("#B5B7BA")
LABEL_GREY = HexColor("#5A5A5A")
HINT_GREY = HexColor("#8E8E8E")

HEADER_REQUISITES = [
    "ООО «Профит», г. Санкт-Петербург,",
    "Политехническая ул., д. 6, стр. 1, пом. Н-7, 194021",
    "Тел. +7 (812) 416-4500, E-mail: info@anhelspb.com",
    "ОГРН 1137847188357, ИНН 7802825464, КПП 780201001",
]

TITLE = "Опросный лист для подбора шкафов управления ANHEL®"
INTRO = (
    "Уважаемые партнёры! Для наиболее точного подбора оборудования, "
    "соответствующего Вашим требованиям, просим Вас ответить на "
    "приведённые ниже вопросы или направить в наш адрес техническое "
    "задание, содержащее все требуемые данные."
)
INTRO_FOLLOWUP = (
    "При возникновении трудностей и вопросов по заполнению опросного "
    "листа, пожалуйста, позвоните по +7 (812) 416-4500 — наши специалисты "
    "с удовольствием Вам помогут. Заполненный опросный лист направьте "
    "на info@anhelspb.com."
)
FOOTER_LEFT = "Опросный лист — шкафы управления ANHEL®"
FOOTER_RIGHT = "anhelspb.com"

FONTS_REGULAR = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/Library/Fonts/Arial Unicode.ttf",
]
FONTS_BOLD = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def register_fonts():
    reg = next((p for p in FONTS_REGULAR if Path(p).exists()), None)
    if not reg:
        raise RuntimeError("No Cyrillic-capable TTF font found")
    bold = next((p for p in FONTS_BOLD if Path(p).exists()), reg)
    pdfmetrics.registerFont(TTFont("Body", reg))
    pdfmetrics.registerFont(TTFont("Bold", bold))


# Field tuples: (name, label, kind, width, required, placeholder, hint)
SECTIONS = [
    {
        "title": "Контактные данные",
        "intro": "Кому и куда отправить технико-коммерческое предложение.",
        "fields": [
            ("company_name", "Компания", "text", "half", True, "ООО «Ромашка»", None),
            ("contact_full_name", "ФИО", "text", "half", True, "Иванов Иван Иванович", None),
            ("contact_phone", "Телефон", "text", "half", True, "+7 (___) ___-__-__", None),
            ("contact_email", "E-mail", "text", "half", True, "name@company.ru", None),
            ("contact_position", "Должность", "text", "full", False,
             "главный инженер / проектировщик / снабженец", None),
        ],
    },
    {
        "title": "Объект",
        "intro": "Где будет установлен шкаф управления.",
        "fields": [
            ("object_name", "Наименование объекта", "text", "half", True,
             "ЖК «Балтийская Жемчужина»", None),
            ("object_address", "Адрес объекта", "text", "half", True,
             "Санкт-Петербург, Невский пр., 28", None),
            ("object_type", "Тип здания", "text", "half", False,
             "жилой / коммерческий / промышленный", None),
            ("project_stage", "Стадия проекта", "text", "half", False,
             "проектирование / стройка / модернизация", None),
        ],
    },
    {
        "title": "Назначение шкафа",
        "intro": "Для какой системы подбираем шкаф управления.",
        "fields": [
            ("cabinet_type", "Тип шкафа", "text", "full", True,
             "частотное регулирование / пожаротушение / дымоудаление / КНС / арматура",
             "Если не уверены — оставьте пометку «не определились»; подберём вместе."),
            ("application_details", "Назначение системы", "textarea", "full", False,
             "Например: ХВС многоэтажного ЖК, спринклерная система склада, КНС бытовых стоков",
             None),
        ],
    },
    {
        "title": "Технические параметры",
        "intro": "Базовые параметры — точные значения подберём после уточнения.",
        "fields": [
            ("pumps_count", "Количество насосов / задвижек", "text", "half", True,
             "1 – 6 (для шкафа арматуры — до 5 задвижек)", None),
            ("pump_power", "Мощность каждого, кВт", "text", "half", True, "0,37 – 500", None),
            ("current_value", "Сила тока, А", "text", "half", False, "1 – 4000", None),
            ("voltage", "Напряжение питания, В", "text", "half", True,
             "3×380 / 660 / 6 кВ / 10 кВ", None),
            ("start_method", "Способ пуска", "text", "half", False,
             "прямой / плавный / ПЧ / УПП", None),
            ("power_input", "Ввод питания", "text", "half", False,
             "одинарный / двойной с АВР", None),
        ],
    },
    {
        "title": "Особые требования",
        "intro": "Климатическое исполнение, протоколы, сертификация, диспетчеризация.",
        "fields": [
            ("climate_class", "Климатическое исполнение", "text", "half", False,
             "УХЛ4 (стандарт) / УХЛ1 / УХЛ2", None),
            ("control_type", "Тип управления", "text", "half", False,
             "местное / дистанционное / комбинированное", None),
            ("protocols", "Протоколы передачи данных", "text", "half", False,
             "Modbus RTU/TCP, ProfibusDP, EasyAccess, VNC", None),
            ("certification", "Сертификация", "text", "half", False,
             "ФЗ-123 / ТР ТС / без специальных требований", None),
            ("extra_options", "Дополнительные опции и пожелания", "textarea", "full", False,
             "Интеграция с «Орион»/«Рубеж», IP69, GSM-диспетчеризация, удалённый доступ, "
             "подключение датчиков РТС…", None),
            ("deadline", "Желаемые сроки поставки", "text", "full", False,
             "например, готовы получить через 8 недель после ТЗ", None),
            ("consent_pd",
             "Даю согласие на обработку персональных данных в соответствии с ФЗ-152.",
             "checkbox", "full", True, None, None),
        ],
    },
]


class Renderer:
    def __init__(self, c: rl_canvas.Canvas, total_pages: int = 1):
        self.c = c
        self.page = 1
        self.total_pages = total_pages
        self.body_top = PAGE_H - MARGIN_T - 100
        self.body_bottom = MARGIN_B + 32
        self.y = self.body_top

    def draw_page_header(self):
        c = self.c
        c.setFillColor(PRIMARY)
        c.setFont("Bold", 22)
        c.drawString(MARGIN_L, PAGE_H - MARGIN_T - 6, "ANHEL")
        c.setFont("Body", 9)
        c.drawString(MARGIN_L + c.stringWidth("ANHEL", "Bold", 22) + 2,
                     PAGE_H - MARGIN_T + 4, "®")
        c.setFillColor(STEEL)
        c.setFont("Body", 8.5)
        ry = PAGE_H - MARGIN_T - 2
        for line in HEADER_REQUISITES:
            c.drawRightString(PAGE_W - MARGIN_R, ry, line)
            ry -= 11
        c.setFillColor(HexColor("#5A5A5A"))
        c.setFont("Body", 8.5)
        c.drawRightString(PAGE_W - MARGIN_R, PAGE_H - MARGIN_T - 56,
                          f"стр. {self.page} / {self.total_pages}")
        c.setStrokeColor(HAIRLINE)
        c.setLineWidth(0.6)
        c.line(MARGIN_L, PAGE_H - MARGIN_T - 64,
               PAGE_W - MARGIN_R, PAGE_H - MARGIN_T - 64)

    def draw_footer(self):
        c = self.c
        c.setStrokeColor(HAIRLINE)
        c.setLineWidth(0.5)
        c.line(MARGIN_L, MARGIN_B + 18, PAGE_W - MARGIN_R, MARGIN_B + 18)
        c.setFillColor(STEEL)
        c.setFont("Body", 8)
        c.drawString(MARGIN_L, MARGIN_B + 6, FOOTER_LEFT)
        c.drawRightString(PAGE_W - MARGIN_R, MARGIN_B + 6, FOOTER_RIGHT)

    def page_break(self):
        self.draw_footer()
        self.c.showPage()
        self.page += 1
        self.draw_page_header()
        self.y = self.body_top

    def ensure(self, h: float):
        if self.y - h < self.body_bottom:
            self.page_break()

    def wrap(self, text: str, font: str, size: float, max_w: float):
        out = []
        for raw in str(text).split("\n"):
            words = raw.split()
            if not words:
                out.append("")
                continue
            cur = ""
            for w in words:
                probe = cur + (" " if cur else "") + w
                if self.c.stringWidth(probe, font, size) <= max_w:
                    cur = probe
                else:
                    if cur:
                        out.append(cur)
                    cur = w
            if cur:
                out.append(cur)
        return out

    def draw_title_block(self):
        self.y = self.body_top + 6
        self.c.setFillColor(PRIMARY)
        self.c.setFont("Bold", 14)
        for line in self.wrap(TITLE, "Bold", 14, CONTENT_W):
            self.c.drawString(MARGIN_L, self.y, line)
            self.y -= 17
        self.y -= 6
        self.c.setFillColor(HexColor("#3A3A3A"))
        self.c.setFont("Body", 9)
        for line in self.wrap(INTRO, "Body", 9, CONTENT_W):
            self.c.drawString(MARGIN_L, self.y, line)
            self.y -= 12
        self.y -= 4
        for line in self.wrap(INTRO_FOLLOWUP, "Body", 9, CONTENT_W):
            self.c.drawString(MARGIN_L, self.y, line)
            self.y -= 12
        self.y -= 10

    def draw_section_heading(self, title: str, intro: str | None):
        self.ensure(34)
        self.c.setStrokeColor(HAIRLINE)
        self.c.setLineWidth(0.6)
        self.c.line(MARGIN_L, self.y, PAGE_W - MARGIN_R, self.y)
        self.y -= 14
        self.c.setFillColor(PRIMARY)
        self.c.setFont("Bold", 11)
        self.c.drawString(MARGIN_L, self.y, title)
        self.y -= 14
        if intro:
            self.c.setFillColor(HINT_GREY)
            self.c.setFont("Body", 8.5)
            for line in self.wrap(intro, "Body", 8.5, CONTENT_W):
                self.c.drawString(MARGIN_L, self.y, line)
                self.y -= 11
        self.y -= 4

    def draw_text_field(self, x: float, w: float, label: str,
                        required: bool, placeholder: str | None,
                        hint: str | None, h: float = 22):
        self.c.setFillColor(LABEL_GREY)
        self.c.setFont("Body", 8.5)
        self.c.drawString(x, self.y, label + (" *" if required else ""))
        self.y -= 4
        self.c.setStrokeColor(BOX_BORDER)
        self.c.setLineWidth(0.6)
        self.c.rect(x, self.y - h, w, h, stroke=1, fill=0)
        if placeholder:
            self.c.setFillColor(HINT_GREY)
            self.c.setFont("Body", 8.5)
            ph = self.wrap(placeholder, "Body", 8.5, w - 8)[0]
            self.c.drawString(x + 6, self.y - h + 8, ph)
        self.y -= h + 2
        if hint:
            self.c.setFillColor(HINT_GREY)
            self.c.setFont("Body", 7.5)
            for line in self.wrap(hint, "Body", 7.5, w):
                self.c.drawString(x, self.y, line)
                self.y -= 9

    def draw_textarea_field(self, x: float, w: float, label: str,
                            required: bool, placeholder: str | None,
                            h: float = 56):
        self.c.setFillColor(LABEL_GREY)
        self.c.setFont("Body", 8.5)
        self.c.drawString(x, self.y, label + (" *" if required else ""))
        self.y -= 4
        self.c.setStrokeColor(BOX_BORDER)
        self.c.setLineWidth(0.6)
        self.c.rect(x, self.y - h, w, h, stroke=1, fill=0)
        if placeholder:
            self.c.setFillColor(HINT_GREY)
            self.c.setFont("Body", 8.5)
            ly = self.y - 10
            for line in self.wrap(placeholder, "Body", 8.5, w - 8)[:3]:
                self.c.drawString(x + 6, ly, line)
                ly -= 11
        self.y -= h + 4

    def draw_checkbox_field(self, x: float, w: float, label: str, required: bool):
        box = 9
        self.ensure(22)
        self.c.setStrokeColor(BOX_BORDER)
        self.c.setLineWidth(0.7)
        self.c.rect(x, self.y - box, box, box, stroke=1, fill=0)
        self.c.setFillColor(PRIMARY)
        self.c.setFont("Body", 9)
        text_x = x + box + 6
        lines = self.wrap(label + (" *" if required else ""),
                          "Body", 9, w - (box + 6))
        ly = self.y - 2
        for line in lines:
            self.c.drawString(text_x, ly, line)
            ly -= 11
        self.y -= max(box, len(lines) * 11) + 4

    def draw_field_row(self, fields):
        i = 0
        gap = 12
        col_w_full = CONTENT_W
        col_w_half = (CONTENT_W - gap) / 2
        while i < len(fields):
            name, label, kind, width, required, placeholder, hint = fields[i]
            if kind == "checkbox":
                self.draw_checkbox_field(MARGIN_L, col_w_full, label, required)
                i += 1
                continue
            if kind == "textarea" or width == "full":
                self.ensure(80 if kind == "textarea" else 40)
                if kind == "textarea":
                    self.draw_textarea_field(MARGIN_L, col_w_full,
                                             label, required, placeholder)
                else:
                    self.draw_text_field(MARGIN_L, col_w_full,
                                         label, required, placeholder, hint)
                i += 1
                continue
            j = i + 1
            partner = None
            if j < len(fields):
                p = fields[j]
                if p[3] == "half" and p[2] not in ("textarea", "checkbox"):
                    partner = p
            self.ensure(50)
            y_start = self.y
            self.draw_text_field(MARGIN_L, col_w_half, label, required,
                                 placeholder, hint)
            y_left_end = self.y
            if partner:
                self.y = y_start
                _, plabel, _, _, preq, pph, phint = partner
                self.draw_text_field(MARGIN_L + col_w_half + gap, col_w_half,
                                     plabel, preq, pph, phint)
                y_right_end = self.y
                self.y = min(y_left_end, y_right_end)
                i += 2
            else:
                i += 1


def render(out_path: Path, total_pages: int | None) -> int:
    c = rl_canvas.Canvas(str(out_path), pagesize=A4)
    r = Renderer(c, total_pages=(total_pages or 1))
    r.draw_page_header()
    r.draw_title_block()
    for s in SECTIONS:
        r.draw_section_heading(s["title"], s.get("intro"))
        r.draw_field_row(s["fields"])
        r.y -= 6
    r.draw_footer()
    c.save()
    return r.page


def build():
    register_fonts()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    # Two-pass: first to count pages, second to stamp the right "стр. N / M".
    tmp = OUT.with_suffix(".pass1.pdf")
    pages = render(tmp, total_pages=None)
    tmp.unlink(missing_ok=True)
    render(OUT, total_pages=pages)
    size_kb = OUT.stat().st_size / 1024
    print(f"OK  {OUT.relative_to(ROOT)}  ({pages} pages, {size_kb:.1f} KB)")


if __name__ == "__main__":
    build()
