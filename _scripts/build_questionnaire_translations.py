#!/usr/bin/env python3
"""
Generate EN and TR PDF versions of the ANHEL® pumping-unit, AUPD,
ITP, VPU and control-cabinet questionnaires for foreign customers.

Output layout per locale: A4 portrait, minimal-premium ANHEL header
(brand wordmark + Profit LLC contact strip) + footer, body composed
of step headings, section headings and printable input fields
(text → underline + side-label, number → underline + unit, radio →
○ Option A   ○ Option B, checkbox → ☐ Label, textarea → 3-line box).

Field labels, hints, option captions all come from
`src/messages/{en,tr}/quiz.json` — they were translated during the
wave-3 online flow and we just re-use them here.

The RU master PDFs (originals from MFMC / Profit, AcroForm-based)
are not touched — they remain in `public/docs/<product>/oprosnyi-
list.pdf` and stay locale=ru. EN/TR are sibling files with the
`-en` / `-tr` stem suffix.

Run:
    python3 _scripts/build_questionnaire_translations.py

This regenerates all 10 PDFs (5 quiz kinds × 2 locales) and copies
the `pumps` PDF into firefighting/water-supply/heating-cooling/
special directories so the existing per-product link scheme keeps
working.
"""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Iterable

from reportlab.lib.colors import HexColor, black
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as rl_canvas

ROOT = Path("/Users/alexeyanurin/Desktop/ANHEL Сайт/ANHEL  Сайт")
DOCS = ROOT / "public" / "docs"
MESSAGES = ROOT / "src" / "messages"

# ---- palette ----------------------------------------------------------
PRIMARY = HexColor("#0A0A0A")
SECONDARY = HexColor("#F5F5F3")
HAIRLINE = HexColor("#CCCCCC")
MUTED = HexColor("#808080")
ACCENT = HexColor("#D72638")

# ---- fonts ------------------------------------------------------------
FONT_BODY_PATHS = [
    "/Library/Fonts/Arial Unicode.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/Library/Fonts/DejaVuSans.ttf",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
]
FONT_BOLD_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/Library/Fonts/DejaVuSans-Bold.ttf",
]


def register_fonts() -> None:
    reg = next((p for p in FONT_BODY_PATHS if Path(p).exists()), None)
    bold = next((p for p in FONT_BOLD_PATHS if Path(p).exists()), reg)
    if not reg:
        raise RuntimeError("No Unicode-capable TTF font found on this system")
    pdfmetrics.registerFont(TTFont("Body", reg))
    pdfmetrics.registerFont(TTFont("Bold", bold or reg))


# =====================================================================
# Quiz structure: ordered tuples that mirror src/content/quiz/*-fields.ts
# Each entry: (step_id, [section_id, [(field_name, kind, width, unit?), ...]])
# kind in {text, email, tel, number, textarea, radio, checkbox}
# width in {half, full}
# unit is an optional plain-text suffix that gets shown after the input
# (the localised label suffix `, m³/h` etc. is appended via OPTIONAL_UNIT
# lookup when present).
#
# The TS source files are authoritative for ordering. Keep them in
# sync when adding fields.
# =====================================================================

# Mapping field-name → unit suffix shown after the input line.
# Pulled from the TS configs, identical across locales.
FIELD_UNITS = {
    # VPU
    "water_temp": "°C",
    "input_flow": "m³/h",
    "input_pressure": "m H₂O",
    "clean_flow_daily": "m³/day",
    "clean_flow_max_h": "m³/h",
    "water_reserve": "m³",
    "existing_tanks": "m³",
    "output_pressure": "m H₂O",
    # ITP — heating side
    "heat_load_heating": "Gcal/h",
    "heat_load_vent": "Gcal/h",
    "heat_load_dhw": "Gcal/h",
    "heat_load_total": "Gcal/h",
    "primary_t_supply": "°C",
    "primary_t_return": "°C",
    "primary_pressure_supply": "MPa",
    "primary_pressure_return": "MPa",
    "secondary_t_supply": "°C",
    "secondary_t_return": "°C",
    "secondary_pressure_supply": "MPa",
    "secondary_pressure_return": "MPa",
    "dhw_t_supply": "°C",
    "dhw_t_circ": "°C",
    "dhw_pressure": "MPa",
    "vent_load": "kW",
    # AUPD
    "system_volume": "m³",
    "static_pressure": "bar",
    "working_pressure": "bar",
    "max_pressure": "bar",
    "make_up_flow": "m³/h",
    "make_up_pressure": "bar",
    "supply_t": "°C",
    "ambient_t_min": "°C",
    "ambient_t_max": "°C",
    "module_power": "kW",
    "expansion_volume": "L",
    "drain_volume": "L",
    # pumps
    "flow_household": "m³/h",
    "flow_industrial": "m³/h",
    "flow_fire_per_jet": "L/s",
    "flow_fire_jets": "jets",
    "flow_fire_total": "L/s",
    "head_static": "m",
    "head_dynamic": "m",
    "head_total": "m",
    "pressure_supply": "bar",
    "pressure_intake": "bar",
    "pressure_drop_allowed": "bar",
    "liquid_t_min": "°C",
    "liquid_t_max": "°C",
    "pump_power_each": "kW",
    "pump_count_main": "",
    "pump_count_standby": "",
}

# Each step is a tuple (step_id, sections); sections is a list of
# (section_id, fields); fields is a list of (name, kind, width).
QUIZ_VPU = [
    ("contacts", [
        ("contact-data", [
            ("contact_organization", "text", "full"),
            ("contact_fullname", "text", "full"),
            ("contact_position", "text", "half"),
            ("contact_city", "text", "half"),
            ("contact_email", "email", "half"),
            ("contact_phone", "tel", "half"),
        ]),
    ]),
    ("source", [
        ("source", [
            ("water_source", "textarea", "full"),
            ("water_temp", "text", "half"),
            ("water_quality_req", "textarea", "full"),
            ("input_flow", "number", "half"),
            ("input_pressure", "number", "half"),
            ("input_pump_type", "text", "full"),
        ]),
    ]),
    ("flow-mode", [
        ("clean-flow", [
            ("clean_flow_daily", "number", "half"),
            ("clean_flow_max_h", "number", "half"),
        ]),
        ("schedule", [
            ("shifts_count", "text", "half"),
            ("shift_duration", "text", "half"),
            ("shift_break", "text", "full"),
            ("operating_mode", "text", "full"),
        ]),
        ("storage", [
            ("water_reserve", "number", "full"),
            ("existing_tanks", "number", "half"),
            ("output_pressure", "number", "half"),
        ]),
    ]),
    ("drain-docs", [
        ("drain", [
            ("drain_network", "text", "full"),
            ("drain_limits_composition", "text", "half"),
            ("drain_limits_volume", "text", "half"),
        ]),
        ("docs", [
            ("design_docs_scope", "text", "full"),
            ("additional_info", "textarea", "full"),
        ]),
    ]),
]


QUIZ_PUMPS = [
    ("contacts", [
        ("contact-data", [
            ("contact_organization", "text", "full"),
            ("contact_fullname", "text", "full"),
            ("contact_position", "text", "half"),
            ("contact_city", "text", "half"),
            ("contact_email", "email", "half"),
            ("contact_phone", "tel", "half"),
        ]),
        ("source", [
            ("source_channel", "radio", "full"),
            ("source_other", "text", "full"),
        ]),
        ("object", [
            ("object_name", "textarea", "full"),
        ]),
    ]),
    ("system", [
        ("system", [
            ("sys_water_supply", "checkbox", "full"),
            ("sys_firefighting", "checkbox", "full"),
            ("ff_vpv", "checkbox", "full"),
            ("ff_apt", "checkbox", "full"),
            ("sys_heating", "checkbox", "full"),
            ("heat_closed", "checkbox", "half"),
            ("heat_open", "checkbox", "half"),
            ("sys_cooling", "checkbox", "full"),
            ("sys_combined", "checkbox", "full"),
            ("sys_other", "checkbox", "full"),
            ("sys_other_text", "text", "full"),
        ]),
    ]),
    ("flow-head", [
        ("flow", [
            ("flow_total", "number", "half"),
            ("flow_jockey", "number", "half"),
            ("flow_combined_water", "number", "half"),
            ("flow_combined_ff", "number", "half"),
        ]),
        ("head", [
            ("head_guaranteed", "number", "half"),
            ("intake_pond", "checkbox", "half"),
            ("intake_under", "checkbox", "half"),
            ("intake_semi", "checkbox", "half"),
            ("intake_above", "checkbox", "half"),
            ("head_hmin", "number", "half"),
            ("head_hmax", "number", "half"),
            ("head_required", "number", "full"),
            ("head_jockey", "number", "half"),
            ("head_combined_water", "number", "full"),
            ("head_combined_ff", "number", "full"),
            ("pressure_max", "number", "half"),
        ]),
    ]),
    ("equipment", [
        ("liquid-pumps", [
            ("liquid_type", "text", "half"),
            ("liquid_temp", "number", "half"),
            ("pumps_main", "number", "half"),
            ("pumps_reserve", "number", "half"),
        ]),
        ("control", [
            ("ctrl_freq_with_ctrl", "checkbox", "half"),
            ("ctrl_freq_per_pump", "checkbox", "half"),
            ("ctrl_freq_no_ctrl", "checkbox", "half"),
            ("ctrl_relay_with_ctrl", "checkbox", "half"),
            ("ctrl_relay_soft_start", "checkbox", "half"),
            ("valve_drive", "radio", "full"),
            ("valve_count", "number", "half"),
            ("valve_brand", "text", "half"),
        ]),
        ("options", [
            ("opt_power_no_avr", "checkbox", "full"),
            ("opt_power_avr", "checkbox", "full"),
            ("opt_outdoor", "checkbox", "full"),
            ("opt_limit_sw", "checkbox", "full"),
            ("opt_diff_diam", "checkbox", "full"),
            ("opt_diff_diam_text", "text", "full"),
        ]),
        ("protocol", [
            ("proto_profibus", "checkbox", "half"),
            ("proto_modbus", "checkbox", "half"),
            ("proto_ethernet", "checkbox", "half"),
            ("proto_gsm", "checkbox", "half"),
            ("proto_other", "checkbox", "full"),
            ("proto_other_text", "text", "full"),
        ]),
        ("module", [
            ("module_container", "checkbox", "half"),
            ("module_tank", "checkbox", "half"),
            ("module_fiberglass", "checkbox", "half"),
            ("module_steel", "checkbox", "half"),
            ("module_vertical", "checkbox", "half"),
            ("module_horizontal", "checkbox", "half"),
        ]),
        ("additional", [
            ("additional_info", "textarea", "full"),
        ]),
    ]),
]



def _itp_system_fields(prefix: str) -> list[tuple[str, str, str]]:
    """Mirror makeSystemFields() from itp-fields.ts (heating + vent)."""
    return [
        (f"{prefix}_load", "number", "full"),
        (f"{prefix}_scheme_dependent", "checkbox", "half"),
        (f"{prefix}_scheme_independent", "checkbox", "half"),
        (f"{prefix}_scheme_direct", "checkbox", "full"),
        (f"{prefix}_he_brazed", "checkbox", "half"),
        (f"{prefix}_he_demountable", "checkbox", "half"),
        (f"{prefix}_he_shell", "checkbox", "full"),
        (f"{prefix}_t1", "number", "half"),
        (f"{prefix}_t2", "number", "half"),
        (f"{prefix}_pressure_loss", "number", "half"),
        (f"{prefix}_max_pressure", "number", "half"),
        (f"{prefix}_volume", "number", "half"),
        (f"{prefix}_he_reserve", "radio", "full"),
        (f"{prefix}_he_reserve_pct", "number", "half"),
        (f"{prefix}_pump_100", "checkbox", "half"),
        (f"{prefix}_pump_storage", "checkbox", "half"),
        (f"{prefix}_pump_double", "checkbox", "full"),
        (f"{prefix}_freq_reg", "radio", "full"),
    ]


QUIZ_ITP = [
    ("contacts", [
        ("contact-data", [
            ("contact_organization", "text", "full"),
            ("contact_fullname", "text", "full"),
            ("contact_position", "text", "half"),
            ("contact_city", "text", "half"),
            ("contact_email", "email", "half"),
            ("contact_phone", "tel", "half"),
        ]),
        ("object", [
            ("object_name", "textarea", "full"),
        ]),
        ("source", [
            ("source_channel", "radio", "full"),
            ("source_other", "text", "full"),
        ]),
    ]),
    ("main", [
        ("temperatures", [
            ("main_t1", "number", "half"),
            ("main_t2", "number", "half"),
        ]),
        ("pressures", [
            ("main_p1", "number", "half"),
            ("main_p2", "number", "half"),
        ]),
        ("general", [
            ("building_height", "number", "half"),
            ("heat_carrier", "text", "full"),
        ]),
    ]),
    ("heating", [
        ("heating", _itp_system_fields("heating")),
    ]),
    ("vent", [
        ("vent", _itp_system_fields("vent")),
    ]),
    ("dhw", [
        ("dhw-load", [
            ("dhw_load", "number", "full"),
            ("dhw_cold_temp", "number", "half"),
            ("dhw_hot_temp", "number", "half"),
            ("dhw_cold_pressure", "number", "half"),
            ("dhw_hot_pressure", "number", "half"),
        ]),
        ("dhw-circ", [
            ("dhw_circulation", "radio", "full"),
            ("dhw_circ_flow", "number", "half"),
            ("dhw_circ_resistance", "number", "half"),
        ]),
        ("dhw-scheme", [
            ("dhw_scheme_1", "checkbox", "half"),
            ("dhw_scheme_2", "checkbox", "half"),
            ("dhw_scheme_mono", "checkbox", "full"),
        ]),
        ("dhw-he", [
            ("dhw_he_brazed", "checkbox", "half"),
            ("dhw_he_demountable", "checkbox", "half"),
            ("dhw_he_shell", "checkbox", "full"),
        ]),
        ("dhw-reserve", [
            ("dhw_he_reserve", "radio", "full"),
            ("dhw_he_reserve_pct", "number", "half"),
            ("dhw_pump_100", "checkbox", "half"),
            ("dhw_pump_storage", "checkbox", "half"),
            ("dhw_pump_double", "checkbox", "full"),
            ("dhw_freq_reg", "radio", "full"),
        ]),
    ]),
    ("extras", [
        ("extras-list", [
            ("extra_weather_dep", "radio", "full"),
            ("extra_auto_makeup", "radio", "full"),
            ("extra_auto_pressure", "radio", "full"),
            ("extra_heat_meter", "radio", "full"),
            ("extra_pressure_reg", "radio", "full"),
            ("extra_expansion_tank", "radio", "full"),
            ("extra_flow_meter", "radio", "full"),
            ("extra_pump_failure", "radio", "full"),
            ("extra_dispatch", "radio", "full"),
            ("extra_makeup_valve", "radio", "full"),
            ("extra_makeup_pump", "radio", "full"),
            ("extra_insulation", "radio", "full"),
        ]),
        ("arm", [
            ("arm_welded", "checkbox", "half"),
            ("arm_flange", "checkbox", "half"),
            ("arm_thread", "checkbox", "full"),
        ]),
        ("sizes", [
            ("room_size", "text", "full"),
            ("doorway_size", "text", "full"),
        ]),
        ("protocol", [
            ("proto_rs232", "checkbox", "half"),
            ("proto_ethernet", "checkbox", "half"),
            ("proto_gsm", "checkbox", "half"),
            ("proto_modem", "checkbox", "half"),
        ]),
        ("power", [
            ("power_from_bitp", "radio", "full"),
            ("power_from_external", "radio", "full"),
            ("voltage_230", "checkbox", "half"),
            ("voltage_380", "checkbox", "half"),
        ]),
        ("additional", [
            ("additional_info", "textarea", "full"),
        ]),
    ]),
]


QUIZ_AUPD = [
    ("contacts", [
        ("contact-data", [
            ("contact_organization", "text", "full"),
            ("contact_fullname", "text", "full"),
            ("contact_position", "text", "half"),
            ("contact_city", "text", "half"),
            ("contact_email", "email", "half"),
            ("contact_phone", "tel", "half"),
        ]),
        ("source", [
            ("source_channel", "radio", "full"),
            ("source_other", "text", "full"),
        ]),
        ("object", [
            ("object_name", "textarea", "full"),
        ]),
    ]),
    ("system-params", [
        ("thermal-power", [
            ("thermal_power_gcal", "number", "half"),
            ("thermal_power_kw", "number", "half"),
        ]),
        ("volume-pressure", [
            ("system_volume", "number", "half"),
            ("static_pressure", "number", "half"),
            ("max_pressure", "number", "half"),
            ("valve_pressure", "number", "half"),
            ("return_pressure", "number", "full"),
        ]),
    ]),
    ("medium-mode", [
        ("medium", [
            ("heat_water", "checkbox", "half"),
            ("heat_glycol", "checkbox", "half"),
            ("glycol_percent", "text", "half"),
        ]),
        ("temperature", [
            ("temp_t1", "number", "half"),
            ("temp_t2", "number", "half"),
        ]),
        ("pumps", [
            ("pump_count", "number", "half"),
            ("fill_system", "radio", "full"),
        ]),
    ]),
    ("system-type", [
        ("sys", [
            ("sys_heating", "checkbox", "half"),
            ("sys_ventilation", "checkbox", "half"),
            ("sys_other", "checkbox", "full"),
            ("sys_other_text", "text", "full"),
        ]),
        ("limits", [
            ("limit_height", "number", "half"),
            ("limit_width", "number", "half"),
        ]),
        ("additional", [
            ("additional_info", "textarea", "full"),
        ]),
    ]),
]



# Control systems quiz uses a flat steps→fields layout (no sections).
# To keep the same renderer we wrap each step in a single anonymous
# section with id matching the JSON's step index (0..N).
QUIZ_CONTROL_SYSTEMS = [
    ("0", [
        ("__", [
            ("company_name", "text", "half"),
            ("contact_full_name", "text", "half"),
            ("contact_phone", "tel", "half"),
            ("contact_email", "email", "half"),
            ("contact_position", "text", "full"),
        ]),
    ]),
    ("1", [
        ("__", [
            ("object_name", "text", "half"),
            ("object_address", "text", "half"),
            ("object_type", "text", "half"),
            ("project_stage", "text", "half"),
        ]),
    ]),
    ("2", [
        ("__", [
            ("cabinet_type", "text", "full"),
            ("application_details", "textarea", "full"),
        ]),
    ]),
    ("3", [
        ("__", [
            ("pumps_count", "text", "half"),
            ("pump_power", "text", "half"),
            ("current_value", "text", "half"),
            ("voltage", "text", "half"),
            ("start_method", "text", "half"),
            ("power_input", "text", "half"),
        ]),
    ]),
    ("4", [
        ("__", [
            ("climate_class", "text", "half"),
            ("control_type", "text", "half"),
            ("protocols", "text", "half"),
            ("certification", "text", "half"),
            ("extra_options", "textarea", "full"),
            ("deadline", "text", "full"),
            ("consent_pd", "checkbox", "full"),
        ]),
    ]),
]


# Quiz registry — maps quiz_kind to (structure, JSON path inside quiz.json,
# whether the step layout uses numeric step IDs).
QUIZZES = {
    "vpu":             {"struct": QUIZ_VPU,             "json_key": "vpu",             "numeric_steps": False},
    "pumps":           {"struct": QUIZ_PUMPS,           "json_key": "pumps",           "numeric_steps": False},
    "aupd":            {"struct": QUIZ_AUPD,            "json_key": "aupd",            "numeric_steps": False},
    "itp":             {"struct": QUIZ_ITP,             "json_key": "itp",             "numeric_steps": False},
    "control_systems": {"struct": QUIZ_CONTROL_SYSTEMS, "json_key": "control_systems", "numeric_steps": True},
}

# Each quiz kind targets one or more product directories under
# public/docs/. The same EN/TR PDF is copied to all of them.
QUIZ_TO_DIRS = {
    "vpu":             ["water-treatment"],
    "pumps":           ["firefighting", "water-supply", "heating-cooling", "special"],
    "aupd":            ["pressure-boost"],
    "itp":             ["heating-unit"],
    "control_systems": ["control-systems"],
}


# ---- locale strings shown on the PDF chrome (not in messages JSON) ---
#
# Contact e-mail is `info@anhelspb.com` everywhere — the same address
# the website (/contacts, /service, Footer) and the RU AcroForm
# masters use. `company_strip` is intentionally short: it sits in a
# repeating page header next to the right-aligned document ID, so it
# must not be wide enough to collide with it (see `draw_header`,
# which additionally truncates at « · » boundaries as a safety net).
CHROME = {
    "en": {
        "doc_kind": "QUESTIONNAIRE",
        "instructions_title": "How to complete this form",
        "instructions": (
            "Fill in the form by hand or in a PDF reader. Tick the relevant "
            "boxes (☐ → ■). Where parameters are unknown, leave the line "
            "blank or write «to be determined». Return the completed form "
            "to info@anhelspb.com — our engineering team replies within "
            "one business day with a sizing proposal."
        ),
        "company_strip": (
            "Profit LLC · ANHEL® brand · anhelspb.com · info@anhelspb.com"
        ),
        "required_note": "* — required field.",
        "page": "Page",
        "of": "of",
        "yes": "Yes",
        "no": "No",
        "appendix_note": (
            "Attach any project drawings, water analyses or specifications "
            "as separate files when you reply."
        ),
        "doc_id_prefix": "Document ID",
        "date_prefix": "Issued",
        "step_label": "Step",
    },
    "tr": {
        "doc_kind": "ANKET FORMU",
        "instructions_title": "Formun doldurulması",
        "instructions": (
            "Formu elle veya bir PDF okuyucuda doldurun. İlgili kutuları "
            "işaretleyin (☐ → ■). Bilinmeyen parametreler için satırı boş "
            "bırakın veya «belirlenecek» yazın. Doldurulmuş formu "
            "info@anhelspb.com adresine gönderin — mühendislik ekibimiz "
            "bir iş günü içinde teklifle dönüş yapar."
        ),
        "company_strip": (
            "Profit LLC · ANHEL® markası · anhelspb.com · info@anhelspb.com"
        ),
        "required_note": "* — zorunlu alan.",
        "page": "Sayfa",
        "of": "/",
        "yes": "Evet",
        "no": "Hayır",
        "appendix_note": (
            "Yanıt verirken proje çizimlerini, su analizlerini veya "
            "şartnameleri ayrı dosya olarak ekleyin."
        ),
        "doc_id_prefix": "Belge No",
        "date_prefix": "Düzenleme",
        "step_label": "Adım",
    },
}


# Required-field markers. Pulled from src/content/quiz/*-fields.ts and
# src/content/products/control-systems/quiz-config.ts (`required: true`).
# Rendered as a red asterisk after the field label, matching the RU
# AcroForm masters where the contact block is marked mandatory.
_CONTACT_REQUIRED = {
    "contact_organization", "contact_fullname", "contact_position",
    "contact_city", "contact_email", "contact_phone",
}
REQUIRED_FIELDS = {
    "vpu": set(_CONTACT_REQUIRED),
    "pumps": set(_CONTACT_REQUIRED),
    "aupd": set(_CONTACT_REQUIRED),
    "itp": set(_CONTACT_REQUIRED),
    "control_systems": {
        "company_name", "contact_full_name", "contact_phone",
        "object_name", "object_address", "cabinet_type",
        "pumps_count", "pump_power", "voltage", "consent_pd",
    },
}


# =====================================================================
# Label resolution
# =====================================================================

def get(d: dict, *path, default=None):
    cur = d
    for p in path:
        if not isinstance(cur, dict) or p not in cur:
            return default
        cur = cur[p]
    return cur


def resolve_field(messages_quiz: dict, json_key: str, field_name: str) -> dict:
    """
    Returns a dict {label, hint, unit, options?} for a given field.
    `options` (only for radio/select-style fields) is an ordered list
    of (value, label) tuples.
    """
    base = get(messages_quiz, json_key, "fields", field_name, default={}) or {}
    label = base.get("label") or field_name
    hint = base.get("hint")
    unit_msg = base.get("unit")
    opts_dict = base.get("options")
    options = None
    if isinstance(opts_dict, dict):
        options = list(opts_dict.items())
    return {"label": label, "hint": hint, "unit": unit_msg, "options": options}


def resolve_section_title(messages_quiz: dict, json_key: str, section_id: str) -> str | None:
    """Return section.title (or None if section is anonymous like '__')."""
    if section_id == "__":
        return None
    return get(messages_quiz, json_key, "sections", section_id, "title")


def resolve_section_hint(messages_quiz: dict, json_key: str, section_id: str) -> str | None:
    if section_id == "__":
        return None
    return get(messages_quiz, json_key, "sections", section_id, "hint")


def resolve_step(messages_quiz: dict, json_key: str, step_id: str, numeric: bool) -> dict:
    if numeric:
        node = get(messages_quiz, json_key, "steps", step_id) or {}
    else:
        node = get(messages_quiz, json_key, "steps", step_id) or {}
    return {
        "title": node.get("title") or step_id,
        "description": node.get("description"),
    }


def resolve_top(messages_quiz: dict, json_key: str) -> dict:
    base = get(messages_quiz, json_key) or {}
    return {
        "title": base.get("title") or json_key,
        "meta_description": base.get("meta_description"),
    }


# =====================================================================
# PDF rendering
# =====================================================================

# A4 in mm = 210 × 297
PAGE_W, PAGE_H = A4
MARGIN_L = 18 * mm
MARGIN_R = 18 * mm
MARGIN_T = 22 * mm
MARGIN_B = 22 * mm
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R
HALF_GAP = 5 * mm
HALF_W = (CONTENT_W - HALF_GAP) / 2

LINE_HEIGHT = 4.6 * mm
INPUT_HEIGHT = 6.0 * mm
TEXTAREA_LINES = 3
SECTION_GAP = 5 * mm
STEP_GAP = 8 * mm


class Renderer:
    """Stateful renderer — tracks current Y, paginates as needed."""

    def __init__(self, c: rl_canvas.Canvas, locale: str, chrome: dict,
                 doc_id: str, top_title: str, top_subtitle: str):
        self.c = c
        self.locale = locale
        self.chrome = chrome
        self.doc_id = doc_id
        self.top_title = top_title
        self.top_subtitle = top_subtitle
        # Field names that get a red required-marker asterisk. Populated
        # by the caller (build_one / the service-form builder) before
        # any field is drawn.
        self.required_fields: set[str] = set()
        self.page = 1
        self.total_pages = None  # set after first pass; redraw if needed
        self.y = PAGE_H - MARGIN_T
        # Header band height — drawn at top of every page
        self.header_h = 28 * mm
        # Footer reserved height
        self.footer_h = 12 * mm
        self.body_top = PAGE_H - MARGIN_T - self.header_h
        self.body_bottom = MARGIN_B + self.footer_h
        self.y = self.body_top

    # --- chrome ---------------------------------------------------

    def draw_header(self):
        """
        Two-row header band:
          row 1 — ANHEL® wordmark (left)        ·  doc kind (right)
          row 2 — company strip (left)          ·  document ID (right)

        Row 2 is the collision-prone one: a long left-aligned company
        strip and a right-aligned doc ID share the same baseline. We
        size the strip against the *measured* width of the doc ID and
        truncate it at « · » separators if it would ever reach the ID,
        so the two never overlap regardless of locale string lengths.
        """
        c = self.c
        top_y = PAGE_H - MARGIN_T + 8 * mm
        bot_y = PAGE_H - MARGIN_T + 3.2 * mm
        right_x = PAGE_W - MARGIN_R

        # row 1 left: ANHEL wordmark
        c.setFillColor(PRIMARY)
        c.setFont("Bold", 16)
        c.drawString(MARGIN_L, top_y, "ANHEL®")
        # row 1 right: doc kind
        c.setFont("Body", 8)
        c.setFillColor(MUTED)
        c.drawRightString(right_x, top_y, self.chrome["doc_kind"])

        # row 2 right: document ID
        doc_id_line = f"{self.chrome['doc_id_prefix']}: {self.doc_id}"
        c.setFont("Body", 8)
        c.setFillColor(MUTED)
        c.drawRightString(right_x, bot_y, doc_id_line)

        # row 2 left: company strip — width-limited so it never reaches
        # the doc ID. 8 mm safety gutter between the two.
        doc_id_w = pdfmetrics.stringWidth(doc_id_line, "Body", 8)
        avail = CONTENT_W - doc_id_w - 8 * mm
        strip = self.chrome["company_strip"]
        while strip and pdfmetrics.stringWidth(strip, "Body", 8) > avail:
            if " · " in strip:
                strip = strip.rsplit(" · ", 1)[0]
            else:
                strip = strip[:-2]
        c.drawString(MARGIN_L, bot_y, strip)

        # hairline
        c.setStrokeColor(HAIRLINE)
        c.setLineWidth(0.4)
        c.line(MARGIN_L, PAGE_H - MARGIN_T,
               PAGE_W - MARGIN_R, PAGE_H - MARGIN_T)

    def draw_footer(self):
        c = self.c
        c.setStrokeColor(HAIRLINE)
        c.setLineWidth(0.4)
        c.line(MARGIN_L, MARGIN_B + 6 * mm,
               PAGE_W - MARGIN_R, MARGIN_B + 6 * mm)
        c.setFont("Body", 8)
        c.setFillColor(MUTED)
        c.drawString(MARGIN_L, MARGIN_B + 2.5 * mm, self.top_title)
        right = (f"{self.chrome['page']} {self.page}"
                 f"{' ' + self.chrome['of'] + ' ' + str(self.total_pages) if self.total_pages else ''}")
        c.drawRightString(PAGE_W - MARGIN_R, MARGIN_B + 2.5 * mm, right)

    def page_break(self):
        self.draw_footer()
        self.c.showPage()
        self.page += 1
        self.y = self.body_top
        self.draw_header()

    def ensure_space(self, h: float):
        if self.y - h < self.body_bottom:
            self.page_break()

    # --- typography helpers --------------------------------------

    def wrap_text(self, text: str, font: str, size: float, max_w: float) -> list[str]:
        if not text:
            return []
        words = text.split()
        lines = []
        cur = ""
        for w in words:
            test = (cur + " " + w).strip()
            if pdfmetrics.stringWidth(test, font, size) <= max_w:
                cur = test
            else:
                if cur:
                    lines.append(cur)
                cur = w
        if cur:
            lines.append(cur)
        return lines

    def draw_paragraph(self, text: str, font: str, size: float,
                       color, x: float, max_w: float, leading: float | None = None) -> float:
        """Draw a wrapped paragraph at (x, self.y). Returns new y."""
        leading = leading or (size * 1.4)
        lines = self.wrap_text(text, font, size, max_w)
        self.ensure_space(leading * len(lines))
        self.c.setFont(font, size)
        self.c.setFillColor(color)
        for line in lines:
            self.c.drawString(x, self.y - size, line)
            self.y -= leading
        return self.y

    # --- structured blocks ----------------------------------------

    def draw_top_card(self, top_title: str, top_subtitle: str,
                      instructions_title: str, instructions_text: str):
        """Draw the cover band on the first page (under the chrome header)."""
        # accent
        self.c.setFillColor(ACCENT)
        self.c.rect(MARGIN_L, self.y - 1.2 * mm, 8 * mm, 0.6 * mm, fill=1, stroke=0)
        self.y -= 4 * mm
        # title
        self.c.setFillColor(PRIMARY)
        self.c.setFont("Bold", 22)
        for line in self.wrap_text(top_title, "Bold", 22, CONTENT_W):
            self.c.drawString(MARGIN_L, self.y - 22, line)
            self.y -= 24
        self.y -= 2 * mm
        # subtitle
        self.c.setFillColor(MUTED)
        self.c.setFont("Body", 10)
        if top_subtitle:
            for line in self.wrap_text(top_subtitle, "Body", 10, CONTENT_W):
                self.c.drawString(MARGIN_L, self.y - 10, line)
                self.y -= 14
        self.y -= 5 * mm
        # instructions block
        self.c.setStrokeColor(HAIRLINE)
        self.c.setLineWidth(0.4)
        box_top = self.y
        # estimate box height
        body_lines = self.wrap_text(instructions_text, "Body", 9, CONTENT_W - 8 * mm)
        box_h = 8 * mm + len(body_lines) * 12 + 2 * mm
        self.c.rect(MARGIN_L, self.y - box_h, CONTENT_W, box_h, fill=0, stroke=1)
        # title
        self.c.setFillColor(PRIMARY)
        self.c.setFont("Bold", 9)
        self.c.drawString(MARGIN_L + 4 * mm, self.y - 6 * mm, instructions_title.upper())
        # body
        self.c.setFont("Body", 9)
        self.c.setFillColor(MUTED)
        ty = self.y - 11 * mm
        for line in body_lines:
            self.c.drawString(MARGIN_L + 4 * mm, ty, line)
            ty -= 12
        self.y -= box_h + 6 * mm

    def draw_step_heading(self, idx_label: str, title: str, description: str | None):
        self.ensure_space(18 * mm)
        # mono-tag
        self.c.setFillColor(MUTED)
        self.c.setFont("Body", 8)
        self.c.drawString(MARGIN_L, self.y - 8, idx_label.upper())
        self.y -= 12
        # title
        self.c.setFillColor(PRIMARY)
        self.c.setFont("Bold", 15)
        for line in self.wrap_text(title, "Bold", 15, CONTENT_W):
            self.c.drawString(MARGIN_L, self.y - 15, line)
            self.y -= 18
        # accent
        self.c.setFillColor(ACCENT)
        self.c.rect(MARGIN_L, self.y - 1 * mm, 12 * mm, 0.5 * mm, fill=1, stroke=0)
        self.y -= 3 * mm
        if description:
            self.c.setFillColor(MUTED)
            self.c.setFont("Body", 9)
            for line in self.wrap_text(description, "Body", 9, CONTENT_W):
                self.c.drawString(MARGIN_L, self.y - 9, line)
                self.y -= 12
        self.y -= 4 * mm

    def draw_section_heading(self, title: str | None, hint: str | None):
        if not title and not hint:
            return
        self.ensure_space(12 * mm)
        if title:
            self.c.setFillColor(PRIMARY)
            self.c.setFont("Bold", 11)
            for line in self.wrap_text(title, "Bold", 11, CONTENT_W):
                self.c.drawString(MARGIN_L, self.y - 11, line)
                self.y -= 14
        if hint:
            self.c.setFillColor(MUTED)
            self.c.setFont("Body", 8.5)
            for line in self.wrap_text(hint, "Body", 8.5, CONTENT_W):
                self.c.drawString(MARGIN_L, self.y - 8.5, line)
                self.y -= 11
        self.y -= 2 * mm

    # --- field renderers ----------------------------------------

    def _draw_required_star(self, x_after: float, baseline_y: float):
        """Draw a red ' *' marker just after a label on the same line."""
        self.c.setFillColor(ACCENT)
        self.c.setFont("Body", 9)
        self.c.drawString(x_after + 1.5, baseline_y, "*")
        self.c.setFillColor(PRIMARY)

    def _input_field(self, x: float, label: str, w: float, unit: str | None,
                     hint: str | None, multiline_lines: int = 1,
                     required: bool = False):
        """Render label + input rule(s) + optional unit + optional hint."""
        # label
        self.c.setFillColor(PRIMARY)
        self.c.setFont("Body", 9)
        self.c.drawString(x, self.y - 9, label)
        if required:
            label_w = pdfmetrics.stringWidth(label, "Body", 9)
            self._draw_required_star(x + label_w, self.y - 9)
        self.y -= 11
        # input rule(s)
        unit_w = 0
        if unit:
            self.c.setFont("Body", 9)
            unit_w = pdfmetrics.stringWidth(unit, "Body", 9) + 3
        rule_y = self.y - 4
        rule_w = w - unit_w
        self.c.setStrokeColor(PRIMARY)
        self.c.setLineWidth(0.4)
        for i in range(multiline_lines):
            self.c.line(x, rule_y - i * 6 * mm, x + rule_w, rule_y - i * 6 * mm)
        if unit:
            self.c.setFillColor(MUTED)
            self.c.drawString(x + rule_w + 3, rule_y - 2, unit)
        self.y -= 5 * mm + (multiline_lines - 1) * 6 * mm
        if hint:
            self.c.setFillColor(MUTED)
            self.c.setFont("Body", 7.5)
            for line in self.wrap_text(hint, "Body", 7.5, w):
                self.c.drawString(x, self.y - 7.5, line)
                self.y -= 9.5
        self.y -= 2 * mm

    def _checkbox_field(self, x: float, label: str, w: float, hint: str | None,
                        required: bool = False):
        # checkbox glyph
        self.c.setStrokeColor(PRIMARY)
        self.c.setLineWidth(0.5)
        box = 3 * mm
        cb_y = self.y - 9
        self.c.rect(x, cb_y, box, box, fill=0, stroke=1)
        # label — required marker is baked into the text since the label
        # may wrap across lines (checkbox labels can be long).
        if required:
            label = f"{label} *"
        self.c.setFillColor(PRIMARY)
        self.c.setFont("Body", 9)
        lx = x + box + 2 * mm
        lw = w - (box + 2 * mm)
        lines = self.wrap_text(label, "Body", 9, lw)
        for i, ln in enumerate(lines):
            self.c.drawString(lx, self.y - 9 + (i == 0 and 0 or 0) - i * 10, ln)
        self.y -= max(11, 10 * len(lines))
        if hint:
            self.c.setFillColor(MUTED)
            self.c.setFont("Body", 7.5)
            for line in self.wrap_text(hint, "Body", 7.5, w - box - 2 * mm):
                self.c.drawString(lx, self.y - 7.5, line)
                self.y -= 9.5
        self.y -= 1.5 * mm

    def _radio_field(self, x: float, label: str, w: float,
                     options: list[tuple[str, str]] | None, hint: str | None,
                     required: bool = False):
        # label — required marker baked in (radio labels can wrap).
        if required:
            label = f"{label} *"
        self.c.setFillColor(PRIMARY)
        self.c.setFont("Body", 9)
        for line in self.wrap_text(label, "Body", 9, w):
            self.c.drawString(x, self.y - 9, line)
            self.y -= 11
        # radio rows
        if options:
            for val, opt_label in options:
                self.ensure_space(10)
                cx = x + 1.5 * mm
                cy = self.y - 6
                self.c.setStrokeColor(PRIMARY)
                self.c.setLineWidth(0.5)
                self.c.circle(cx, cy, 1.5 * mm, stroke=1, fill=0)
                self.c.setFillColor(PRIMARY)
                self.c.setFont("Body", 9)
                self.c.drawString(x + 5 * mm, self.y - 9, opt_label)
                self.y -= 11
        if hint:
            self.c.setFillColor(MUTED)
            self.c.setFont("Body", 7.5)
            for line in self.wrap_text(hint, "Body", 7.5, w):
                self.c.drawString(x, self.y - 7.5, line)
                self.y -= 9.5
        self.y -= 1.5 * mm

    def draw_field_row(self, fields: list[tuple], messages_quiz: dict, json_key: str):
        """
        Given a list of (name, kind, width) for fields that should appear
        on the same logical row (one full or two halves), render them.
        Page-break-aware: each row is rendered in a single column flow,
        but half-width fields are paired horizontally.
        """
        # We pre-compute estimated height; rough heuristic — enough.
        # For simplicity, render fields one-by-one but pair halves on
        # the same y.
        i = 0
        while i < len(fields):
            f = fields[i]
            name, kind, width = f
            resolved = resolve_field(messages_quiz, json_key, name)
            if width == "half" and i + 1 < len(fields) and fields[i + 1][2] == "half":
                # render both halves at same starting y
                start_y = self.y
                self.ensure_space(18 * mm)
                self._render_one(MARGIN_L, HALF_W, fields[i], resolved)
                left_end_y = self.y
                self.y = start_y
                right_resolved = resolve_field(messages_quiz, json_key, fields[i + 1][0])
                self._render_one(MARGIN_L + HALF_W + HALF_GAP, HALF_W, fields[i + 1], right_resolved)
                self.y = min(left_end_y, self.y)
                i += 2
            else:
                self.ensure_space(16 * mm)
                self._render_one(MARGIN_L, CONTENT_W, f, resolved)
                i += 1

    def _render_one(self, x: float, w: float, field_tuple, resolved: dict):
        name, kind, width = field_tuple
        label = resolved["label"]
        hint = resolved["hint"]
        unit = FIELD_UNITS.get(name) or resolved["unit"]
        required = name in self.required_fields
        if kind in ("text", "email", "tel"):
            self._input_field(x, label, w, unit, hint, multiline_lines=1,
                              required=required)
        elif kind == "number":
            self._input_field(x, label, w, unit, hint, multiline_lines=1,
                              required=required)
        elif kind == "textarea":
            self._input_field(x, label, w, unit, hint,
                              multiline_lines=TEXTAREA_LINES, required=required)
        elif kind == "checkbox":
            self._checkbox_field(x, label, w, hint, required=required)
        elif kind == "radio":
            self._radio_field(x, label, w, resolved["options"], hint,
                              required=required)
        else:
            self._input_field(x, label, w, None, hint, required=required)


# =====================================================================
# Build
# =====================================================================

def build_one(kind: str, locale: str, out_path: Path):
    cfg = QUIZZES[kind]
    struct = cfg["struct"]
    json_key = cfg["json_key"]
    numeric = cfg["numeric_steps"]
    chrome = CHROME[locale]

    messages_quiz = json.loads(
        (MESSAGES / locale / "quiz.json").read_text(encoding="utf-8")
    )

    top = resolve_top(messages_quiz, json_key)
    top_title = top["title"]
    top_subtitle = top["meta_description"] or ""

    # Document ID — slug + locale + date stamp.
    doc_id = f"ANHEL-{kind.replace('_', '-').upper()}-2026-{locale.upper()}"

    out_path.parent.mkdir(parents=True, exist_ok=True)

    c = rl_canvas.Canvas(str(out_path), pagesize=A4)
    c.setTitle(f"{top_title} — {locale.upper()}")
    c.setAuthor("Profit LLC (ANHEL® brand)")
    c.setSubject(top_subtitle or top_title)
    c.setKeywords([kind, locale, "ANHEL", "questionnaire"])

    r = Renderer(c, locale, chrome, doc_id, top_title, top_subtitle)
    r.required_fields = REQUIRED_FIELDS.get(kind, set())
    r.draw_header()
    r.draw_top_card(top_title, top_subtitle,
                    chrome["instructions_title"], chrome["instructions"])

    # Required-field legend (explains the red asterisk).
    r.ensure_space(8 * mm)
    c.setFillColor(MUTED)
    c.setFont("Body", 8)
    c.drawString(MARGIN_L, r.y - 8, chrome["required_note"])
    r.y -= 6 * mm

    # Iterate steps → sections → fields
    for step_idx, (step_id, sections) in enumerate(struct):
        step_data = resolve_step(messages_quiz, json_key, step_id, numeric)
        if not sections:  # 'review' step has no fields
            continue
        step_label = f"{chrome['step_label']} {step_idx + 1:02d}"
        r.draw_step_heading(step_label, step_data["title"], step_data["description"])
        for section_id, fields in sections:
            sec_title = resolve_section_title(messages_quiz, json_key, section_id)
            sec_hint = resolve_section_hint(messages_quiz, json_key, section_id)
            r.draw_section_heading(sec_title, sec_hint)
            r.draw_field_row(fields, messages_quiz, json_key)
            r.y -= SECTION_GAP
        r.y -= STEP_GAP - SECTION_GAP

    # Appendix footnote
    r.ensure_space(12 * mm)
    c.setFillColor(MUTED)
    c.setFont("Body", 8)
    for line in r.wrap_text(chrome["appendix_note"], "Body", 8, CONTENT_W):
        c.drawString(MARGIN_L, r.y - 8, line)
        r.y -= 10

    r.draw_footer()
    c.save()


def build_all():
    register_fonts()
    written: list[tuple[str, str, Path, int]] = []
    for kind in QUIZZES:
        for locale in ("en", "tr"):
            dirs = QUIZ_TO_DIRS[kind]
            # Generate once into the first dir, then copy to siblings.
            primary = DOCS / dirs[0] / f"oprosnyi-list-{locale}.pdf"
            build_one(kind, locale, primary)
            size = primary.stat().st_size
            written.append((kind, locale, primary, size))
            for extra in dirs[1:]:
                target = DOCS / extra / f"oprosnyi-list-{locale}.pdf"
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(primary, target)
                written.append((kind, locale, target, target.stat().st_size))

    # Report
    print(f"\n{'Quiz':<18} {'Locale':<7} {'Size KB':<8} Path")
    print("-" * 80)
    for k, lo, p, s in written:
        rel = p.relative_to(ROOT)
        print(f"{k:<18} {lo:<7} {s/1024:7.1f}  {rel}")


if __name__ == "__main__":
    build_all()
