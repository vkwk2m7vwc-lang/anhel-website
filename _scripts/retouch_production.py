#!/usr/bin/env python3
"""
Ретушь фото производства MFMC: удаление логотипов МФМК / Альфа Stream.

Стратегия:
  Логотипы стабильно расположены на металлических шильдиках в правом
  верхнем углу шкафов управления (ШУ). Кроп нижних 65% удаляет ШУ из
  кадра и оставляет только насосное оборудование и обвязку — то, что
  нужно показать в галерее «Производство» сайта ANHEL.

  Дополнительно — лёгкий gaussian blur на верхнем 5% полосе оставшегося
  фрейма (вторая страховка от частичного попадания шильдика).

Используется Pillow (стандартный пакет на macOS Python 3.9). cv2 не нужен.

Output: _tmp_production_processed/<category>/<filename>.jpg
"""
from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path("/Users/alexeyanurin/Projects/anhel-website/_tmp_production_raw")
OUT = Path("/Users/alexeyanurin/Projects/anhel-website/_tmp_production_processed")
OUT.mkdir(parents=True, exist_ok=True)


def process(src_path: Path, dst_path: Path) -> None:
    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    top_cut = int(h * 0.35)
    cropped = img.crop((0, top_cut, w, h))
    cw, ch = cropped.size
    blur_strip_h = max(8, int(ch * 0.05))
    # Blur top strip only
    strip = cropped.crop((0, 0, cw, blur_strip_h))
    strip = strip.filter(ImageFilter.GaussianBlur(radius=18))
    cropped.paste(strip, (0, 0))
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(dst_path, "JPEG", quality=85, optimize=True)


def main():
    total, ok = 0, 0
    for cat in sorted(ROOT.iterdir()):
        if not cat.is_dir():
            continue
        files = sorted(cat.glob("*.jpg"))
        for src in files:
            total += 1
            try:
                dst = OUT / cat.name / src.name
                process(src, dst)
                ok += 1
            except Exception as e:
                print(f"FAIL {cat.name}/{src.name}: {e}")
        print(f"{cat.name:14s} {len(files)} processed")
    print(f"\n--- {ok}/{total} OK ---")


if __name__ == "__main__":
    main()
