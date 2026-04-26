#!/usr/bin/env python3
"""
Обработка пользовательских фото пожарных НС:
  - Source: ~/Desktop/ANHEL Сайт/Фото мфмк (производство)/НС Пожаротушения/*.png
  - Target: public/assets/production/firefighting/<slug>.jpg

Конвертация PNG → JPEG q=85, ресайз до max 1600px по широкой стороне
(достаточно для production-галереи, в 5-7 раз меньше исходных PNG).
"""
from pathlib import Path
from PIL import Image

SRC = Path("/Users/alexeyanurin/Desktop/ANHEL Сайт/Фото мфмк (производство)/НС Пожаротушения")
DST = Path("/Users/alexeyanurin/Projects/anhel-website/public/assets/production/firefighting")
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
    files = sorted(p for p in SRC.glob("*.png") if not p.name.startswith("."))
    print(f"Found {len(files)} PNGs")
    for f in files:
        # 01.png → shop-01.jpg
        num = f.stem.zfill(2)
        out = DST / f"shop-{num}.jpg"
        process(f, out)
        kb = out.stat().st_size // 1024
        print(f"  {f.name} → {out.name}  {kb} KB")
    print(f"\nProcessed {len(files)} photos → {DST}")


if __name__ == "__main__":
    main()
