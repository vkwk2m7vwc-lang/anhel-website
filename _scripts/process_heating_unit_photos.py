#!/usr/bin/env python3
"""
Обработка пользовательских фото блочных индивидуальных тепловых пунктов.

Источник: ~/Desktop/ANHEL Сайт/Фото мфмк (производство)/ИТП/

Серии:
  - blochnye_teplovye_punkty_btp_dlya_zhilogo_kompleksa_now-_<N>_.jpg
    → ИТП ANHEL® для жилого комплекса (4 фото на объекте)
  - blochnye_teplovye_punkty_dlya_obrazovatelnogo_tsentra_tavrida-_<N>_.jpg
    → ИТП ANHEL® для образовательного центра «Таврида» (9 фото)
  - dsc00845.jpg / dsc00847.jpg → крупные планы из цеха

Output: public/assets/production/heating-unit/<series>-<N>.jpg
"""
from pathlib import Path
import re
from PIL import Image

SRC = Path("/Users/alexeyanurin/Desktop/ANHEL Сайт/Фото мфмк (производство)/ИТП")
DST = Path("/Users/alexeyanurin/Projects/anhel-website/public/assets/production/heating-unit")
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
    files = sorted(p for p in SRC.glob("*.jpg") if not p.name.startswith("."))
    print(f"Найдено {len(files)} JPG")
    for f in files:
        if "tavrida" in f.name:
            m = re.search(r"-_(\d+)_\.jpg$", f.name)
            num = m.group(1).zfill(2) if m else "00"
            out = DST / f"tavrida-{num}.jpg"
        elif "kompleksa_now" in f.name:
            m = re.search(r"-_(\d+)_\.jpg$", f.name)
            num = m.group(1).zfill(2) if m else "00"
            out = DST / f"residential-{num}.jpg"
        elif "dsc" in f.name.lower():
            out = DST / f"shop-{f.stem.replace('dsc','').lstrip('0').zfill(2)}.jpg"
        else:
            out = DST / f.name
        process(f, out)
        print(f"  {f.name[:48]}… → {out.name}  {out.stat().st_size//1024} KB")


if __name__ == "__main__":
    main()
