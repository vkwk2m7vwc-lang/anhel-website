#!/usr/bin/env python3
"""
Оптимизация hero-фото шкафов управления.

На входе — 5 PNG с прозрачным фоном из `tmp/cabinet-photos/`.
На выходе — пара (PNG + WEBP) в `public/assets/products/control-systems/<slug>/`,
по одной hero-картинке на каждый шкаф.

Пайплайн:
  1) Загрузить исходник (RGBA, прозрачный фон сохраняем).
  2) Уменьшить до 1400px по широкой стороне (Lanczos).
  3) PNG: optimize=True, compress_level=9.
  4) WEBP: quality=85, method=6.

Запуск (на маке Алексея):
  cd /Users/alexeyanurin/Projects/anhel-website
  python3 _scripts/process_cabinet_photos.py

Эталон по форматам — насосные станции
(`_scripts/process_firefighting_photos.py` и аналогичные). Здесь
проще: одно фото на шкаф, без слайдеров.
"""

from __future__ import annotations

from pathlib import Path
from PIL import Image

SRC = Path("tmp/cabinet-photos")
DST_ROOT = Path("public/assets/products/control-systems")
TARGET_WIDTH = 1400  # 1200–1600 — попадает в окно по ТЗ

# Mapping: source filename → (slug, alt-name).
# Имена slugs соответствуют content-файлам в src/content/products/control-systems/.
MAPPING: list[tuple[str, str]] = [
    ("01_panel_multi_gray_transparent.png", "variable-frequency"),
    ("02_panel_red_tall_transparent.png", "fire-suppression"),
    ("03_panel_red_close_transparent.png", "smoke-control"),
    ("04_panel_gray_box_transparent.png", "sewage-pumping"),
    ("05_panel_gray_controls_transparent.png", "electric-actuators"),
]


def resize_keep_alpha(img: Image.Image, target_w: int) -> Image.Image:
    """Уменьшить по ширине, сохранив пропорции и альфа-канал."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    if img.width <= target_w:
        return img
    ratio = target_w / img.width
    new_size = (target_w, round(img.height * ratio))
    return img.resize(new_size, Image.Resampling.LANCZOS)


def save_pair(img: Image.Image, out_dir: Path, name: str) -> tuple[int, int]:
    out_dir.mkdir(parents=True, exist_ok=True)
    png_path = out_dir / f"{name}.png"
    webp_path = out_dir / f"{name}.webp"
    img.save(png_path, format="PNG", optimize=True, compress_level=9)
    img.save(webp_path, format="WEBP", quality=85, method=6)
    return png_path.stat().st_size, webp_path.stat().st_size


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Нет исходной папки: {SRC.resolve()}")
    print(f"Source: {SRC.resolve()}")
    print(f"Target: {DST_ROOT.resolve()}\n")

    for src_name, slug in MAPPING:
        src_path = SRC / src_name
        if not src_path.exists():
            print(f"  ! пропущено (нет файла): {src_name}")
            continue
        with Image.open(src_path) as im:
            resized = resize_keep_alpha(im, TARGET_WIDTH)
            out_dir = DST_ROOT / slug
            png_kb, webp_kb = save_pair(resized, out_dir, "hero")
        print(
            f"  {slug:<22} {resized.width}×{resized.height}  "
            f"png={png_kb / 1024:6.1f} KB  webp={webp_kb / 1024:6.1f} KB"
        )

    print("\nДонe.")


if __name__ == "__main__":
    main()
