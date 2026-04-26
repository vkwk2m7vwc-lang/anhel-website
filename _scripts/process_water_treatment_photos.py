#!/usr/bin/env python3
"""
Обработка пользовательских фото установок водоподготовки.

Источники:
  - ~/Desktop/ANHEL Сайт/Фото мфмк (производство)/ВПУ/Удокан/*.jpg
    → Установка обратного осмоса ANHEL® на объекте «ГОК Удокан»
  - ~/Desktop/ANHEL Сайт/Фото мфмк (производство)/ВПУ/*.jpg
    → Серия «Дельта ВПУ Aqua» для жилых объектов

Output: public/assets/production/water-treatment/
  - Удокан: udokan-01.jpg … udokan-08.jpg
  - Дельта Aqua: delta-aqua-02.jpg … delta-aqua-14.jpg

Конвертация: max 1600px по широкой стороне, JPEG q=85.
Исходники уже JPEG, но размер варьируется — нормализуем.
"""
from pathlib import Path
import re
from PIL import Image

ROOT = Path("/Users/alexeyanurin/Desktop/ANHEL Сайт/Фото мфмк (производство)/ВПУ")
DST = Path("/Users/alexeyanurin/Projects/anhel-website/public/assets/production/water-treatment")
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
    udokan_dir = ROOT / "Удокан"
    udokan_files = sorted(p for p in udokan_dir.glob("*.jpg") if not p.name.startswith("."))
    print(f"Удокан: {len(udokan_files)} файлов")
    for i, f in enumerate(udokan_files, 1):
        out = DST / f"udokan-{i:02d}.jpg"
        process(f, out)
        print(f"  {f.name} → {out.name}  {out.stat().st_size//1024} KB")

    aqua_files = sorted(p for p in ROOT.glob("*.jpg") if not p.name.startswith("."))
    print(f"\nДельта ВПУ Aqua: {len(aqua_files)} файлов")
    for f in aqua_files:
        # Extract number from filename: ...-_<N>_.jpg
        m = re.search(r"-_(\d+)_\.jpg$", f.name)
        num = m.group(1).zfill(2) if m else "00"
        out = DST / f"delta-aqua-{num}.jpg"
        process(f, out)
        print(f"  {f.name[:50]}… → {out.name}  {out.stat().st_size//1024} KB")


if __name__ == "__main__":
    main()
