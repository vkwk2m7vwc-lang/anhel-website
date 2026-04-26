#!/usr/bin/env python3
"""
Обработка пользовательских фото станций водоснабжения.

Источник: ~/Desktop/ANHEL Сайт/Фото мфмк (производство)/НС Водоснабжение/
  - 3 файла *_edited_*.png — отретушированные пользователем (без МФМК-логотипов)
  - 6 файлов *_original_*.jpg — исходники с видимыми шильдиками МФМК
    (пропускаются — нельзя публиковать без ручной ретуши)

Output: public/assets/production/water-supply/shop-NN.jpg

Конвертация: PNG → JPEG q=85, max 1600px по широкой стороне.
"""
from pathlib import Path
import re
from PIL import Image

SRC = Path("/Users/alexeyanurin/Desktop/ANHEL Сайт/Фото мфмк (производство)/НС Водоснабжение")
DST = Path("/Users/alexeyanurin/Projects/anhel-website/public/assets/production/water-supply")
DST.mkdir(parents=True, exist_ok=True)

MAX_SIDE = 1600
QUALITY = 85


def process(src: Path, dst: Path):
    img = Image.open(src).convert("RGB")
    w, h = img.size
    if max(w, h) > MAX_SIDE:
        scale = MAX_SIDE / max(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    img.save(dst, "JPEG", quality=QUALITY, optimize=True)


def main():
    edited = sorted(p for p in SRC.glob("*_edited_*.png") if not p.name.startswith("."))
    print(f"Edited (без логотипов МФМК): {len(edited)} файлов")
    for f in edited:
        m = re.match(r"^(\d+)", f.name)
        num = m.group(1).zfill(2) if m else "00"
        out = DST / f"shop-{num}.jpg"
        process(f, out)
        print(f"  {f.name[:40]}… → {out.name}  {out.stat().st_size//1024} KB")

    skipped = sorted(p for p in SRC.glob("*_original_*.jpg") if not p.name.startswith("."))
    if skipped:
        print(f"\nПропущено {len(skipped)} *_original_* (содержат шильдики МФМК):")
        for f in skipped:
            print(f"  {f.name}")


if __name__ == "__main__":
    main()
