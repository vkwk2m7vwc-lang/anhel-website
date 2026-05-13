#!/usr/bin/env python3
"""
Generate EN and TR printable versions of the ANHEL® service-request form.

The RU master sits at /public/documents/service-request-anhel.pdf and was
delivered by Profit/MFMC as a static AcroForm. EN/TR are new sibling
files generated from src/messages/{en,tr}/service.json
(`service.request_form` namespace) using the same Renderer that builds
the questionnaires.

Layout mirrors the online flow `/service/request`:
  Step 0 — Facility and request (4 fields)
  Step 1 — Equipment and documents (7 fields)
  Step 2 — Contact person (4 fields)
  Step 3 — Fault description + 4 commitment checkboxes (5 fields)

Step 4 is the in-app review screen — skipped in the PDF.

Output:
    /public/documents/service-request-anhel-en.pdf
    /public/documents/service-request-anhel-tr.pdf
"""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path

ROOT = Path("/Users/alexeyanurin/Desktop/ANHEL Сайт/ANHEL  Сайт")
DOCS = ROOT / "public" / "documents"
MESSAGES = ROOT / "src" / "messages"

# Pull the Renderer + chrome helpers from the questionnaire generator.
spec = importlib.util.spec_from_file_location(
    "qmod", ROOT / "_scripts" / "build_questionnaire_translations.py"
)
qmod = importlib.util.module_from_spec(spec)  # type: ignore
spec.loader.exec_module(qmod)  # type: ignore


# Structure: list of (step_index_str, [("__", [(name, kind, width), ...])]).
# Step 4 is the in-app review screen — omitted.
SERVICE_FORM = [
    ("0", [("__", [
        ("request_number", "text", "full"),
        ("company_name", "text", "half"),
        ("object_name", "text", "half"),
        ("object_address", "text", "full"),
    ])]),
    ("1", [("__", [
        ("equipment_type", "text", "half"),
        ("equipment_name", "text", "half"),
        ("equipment_serial", "text", "half"),
        ("equipment_commissioning_date", "text", "half"),
        ("invoice_number_date", "text", "half"),
        ("upd_number_date", "text", "half"),
        ("synteka_number", "text", "full"),
    ])]),
    ("2", [("__", [
        ("contact_full_name", "text", "half"),
        ("contact_position", "text", "half"),
        ("contact_phone", "tel", "half"),
        ("contact_email", "email", "half"),
    ])]),
    ("3", [("__", [
        ("problem_description", "textarea", "full"),
        ("commit_representative", "checkbox", "full"),
        ("commit_equipment_ready", "checkbox", "full"),
        ("commit_decision_after_request", "checkbox", "full"),
        ("consent_pd", "checkbox", "full"),
    ])]),
]


# Override the service-specific chrome.
CHROME = {
    "en": {
        **qmod.CHROME["en"],
        "doc_kind": "SERVICE REQUEST",
        "instructions_title": "How to use this form",
        "instructions": (
            "Fill in the form by hand or in a PDF reader. After completing, "
            "sign, stamp and email to info@anhelspb.com. The decision to "
            "dispatch a service engineer is made after we receive the "
            "completed and signed request."
        ),
        "appendix_note": (
            "Photographs and short video material of the fault can be "
            "attached to the follow-up email."
        ),
    },
    "tr": {
        **qmod.CHROME["tr"],
        "doc_kind": "SERVİS TALEBİ",
        "instructions_title": "Formun kullanımı",
        "instructions": (
            "Formu elle veya bir PDF okuyucuda doldurun. Tamamladıktan "
            "sonra imzalayın, kaşeleyin ve info@anhelspb.com adresine "
            "e-posta ile gönderin. Servis mühendisi atama kararı, "
            "tamamlanmış ve imzalanmış talep elimize ulaştıktan sonra "
            "verilir."
        ),
        "appendix_note": (
            "Arızanın fotoğrafları ve kısa video kayıtları takip "
            "e-postasına eklenebilir."
        ),
    },
}


def resolve_field(form_messages: dict, field_name: str) -> dict:
    base = form_messages.get("fields", {}).get(field_name, {}) or {}
    return {
        "label": base.get("label") or field_name,
        "hint": base.get("hint"),
        "unit": None,
        "options": None,
    }


def build_one(locale: str, out_path: Path):
    chrome = CHROME[locale]
    service_messages = json.loads(
        (MESSAGES / locale / "service.json").read_text(encoding="utf-8")
    )
    form = service_messages.get("request_form", {})

    top_title = form.get("title") or "Service Request"
    top_subtitle = form.get("subtitle") or ""
    doc_id = f"ANHEL-SERVICE-2026-{locale.upper()}"

    out_path.parent.mkdir(parents=True, exist_ok=True)

    qmod.register_fonts()
    c = qmod.rl_canvas.Canvas(str(out_path), pagesize=qmod.A4)
    c.setTitle(f"{top_title} — {locale.upper()}")
    c.setAuthor("Profit LLC (ANHEL® brand)")
    c.setSubject(top_subtitle or top_title)
    c.setKeywords(["service", "request", locale, "ANHEL"])

    r = qmod.Renderer(c, locale, chrome, doc_id, top_title, top_subtitle)
    r.draw_header()
    r.draw_top_card(top_title, top_subtitle,
                    chrome["instructions_title"], chrome["instructions"])

    steps_node = form.get("steps", {})

    for step_idx, (step_id, sections) in enumerate(SERVICE_FORM):
        step_data = steps_node.get(step_id, {}) or {}
        step_label = f"{chrome['step_label']} {step_idx + 1:02d}"
        r.draw_step_heading(step_label, step_data.get("title", step_id),
                            step_data.get("description"))

        for section_id, fields in sections:
            # All sections are anonymous (__) — no section heading.
            # We just lay out the fields.
            i = 0
            while i < len(fields):
                f = fields[i]
                name, kind, width = f
                resolved = resolve_field(form, name)
                if width == "half" and i + 1 < len(fields) and fields[i + 1][2] == "half":
                    start_y = r.y
                    r.ensure_space(18 * qmod.mm)
                    r._render_one(qmod.MARGIN_L, qmod.HALF_W, f, resolved)
                    left_end_y = r.y
                    r.y = start_y
                    right_resolved = resolve_field(form, fields[i + 1][0])
                    r._render_one(qmod.MARGIN_L + qmod.HALF_W + qmod.HALF_GAP,
                                  qmod.HALF_W, fields[i + 1], right_resolved)
                    r.y = min(left_end_y, r.y)
                    i += 2
                else:
                    r.ensure_space(16 * qmod.mm)
                    r._render_one(qmod.MARGIN_L, qmod.CONTENT_W, f, resolved)
                    i += 1
            r.y -= qmod.SECTION_GAP
        r.y -= qmod.STEP_GAP - qmod.SECTION_GAP

    # Signature block
    r.ensure_space(30 * qmod.mm)
    c.setStrokeColor(qmod.HAIRLINE)
    c.setLineWidth(0.4)
    sig_y = r.y - 8 * qmod.mm
    sig_w = (qmod.CONTENT_W - qmod.HALF_GAP) / 2
    c.line(qmod.MARGIN_L, sig_y, qmod.MARGIN_L + sig_w, sig_y)
    c.line(qmod.MARGIN_L + sig_w + qmod.HALF_GAP, sig_y,
           qmod.MARGIN_L + qmod.CONTENT_W, sig_y)
    c.setFont("Body", 8)
    c.setFillColor(qmod.MUTED)
    sig_labels = {
        "en": ("Signature and stamp", "Date"),
        "tr": ("İmza ve kaşe", "Tarih"),
    }
    sig_lbl, date_lbl = sig_labels[locale]
    c.drawString(qmod.MARGIN_L, sig_y - 4 * qmod.mm, sig_lbl)
    c.drawString(qmod.MARGIN_L + sig_w + qmod.HALF_GAP,
                 sig_y - 4 * qmod.mm, date_lbl)
    r.y -= 18 * qmod.mm

    # Appendix
    r.ensure_space(12 * qmod.mm)
    c.setFillColor(qmod.MUTED)
    c.setFont("Body", 8)
    for line in r.wrap_text(chrome["appendix_note"], "Body", 8, qmod.CONTENT_W):
        c.drawString(qmod.MARGIN_L, r.y - 8, line)
        r.y -= 10

    r.draw_footer()
    c.save()


def build_all():
    written = []
    for locale in ("en", "tr"):
        path = DOCS / f"service-request-anhel-{locale}.pdf"
        build_one(locale, path)
        written.append((locale, path, path.stat().st_size))
    print(f"\n{'Locale':<7} {'Size KB':<8} Path")
    print("-" * 70)
    for lo, p, s in written:
        print(f"{lo:<7} {s/1024:7.1f}  {p.relative_to(ROOT)}")


if __name__ == "__main__":
    build_all()
