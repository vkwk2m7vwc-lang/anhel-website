#!/usr/bin/env python3
"""
Скачивание фото производства с продуктовых страниц mfmc.ru (Альфа Stream).

URL'ы извлечены DOM-парсингом продуктовых страниц через Chrome (live render).

Категории сохранения соответствуют направлениям продуктов ANHEL:
  - water-supply  → /products/pumps/water-supply
  - firefighting  → /products/pumps/firefighting
  - pressure      → секция «АУПД» (пока нет на сайте, но фото пригодятся)
  - special       → секция «Специсполнение»

Ретушь логотипов МФМК выполняется в отдельном скрипте retouch_production.py
на скачанных оригиналах. Здесь только download.
"""
import os
import sys
import urllib.request
from pathlib import Path

PHOTOS = {
    "water-supply": [
        "https://mfmc.ru/upload/iblock/fd1/dsc08834.jpg",
        "https://mfmc.ru/upload/iblock/813/dsc08802.jpg",
        "https://mfmc.ru/upload/iblock/aa8/dsc08805.jpg",
        "https://mfmc.ru/upload/iblock/553/dsc08796.jpg",
        "https://mfmc.ru/upload/iblock/ade/dsc08797.jpg",
        "https://mfmc.ru/upload/iblock/625/dsc08798.jpg",
        "https://mfmc.ru/upload/iblock/997/dsc08822.jpg",
        "https://mfmc.ru/upload/iblock/8eb/dsc08824.jpg",
    ],
    "firefighting": [
        "https://mfmc.ru/upload/iblock/8fb/dsc08815.jpg",
        "https://mfmc.ru/upload/iblock/386/dsc08819.jpg",
        "https://mfmc.ru/upload/iblock/b26/dsc08820.jpg",
        "https://mfmc.ru/upload/iblock/92d/dsc08837.jpg",
        "https://mfmc.ru/upload/iblock/4c7/dsc08844.jpg",
        "https://mfmc.ru/upload/iblock/51b/dsc08838.jpg",
        "https://mfmc.ru/upload/iblock/b47/dsc08839.jpg",
        "https://mfmc.ru/upload/iblock/b69/dsc08840.jpg",
        "https://mfmc.ru/upload/iblock/b30/dsc08813.jpg",
        "https://mfmc.ru/upload/iblock/ff3/dsc08809.jpg",
        "https://mfmc.ru/upload/iblock/489/dsc08810.jpg",
    ],
    "pressure": [
        "https://mfmc.ru/upload/iblock/1a9/dsc08786.jpg",
        "https://mfmc.ru/upload/iblock/02b/dsc08787.jpg",
        "https://mfmc.ru/upload/iblock/67c/dsc08789.jpg",
        "https://mfmc.ru/upload/iblock/960/dsc09276.jpg",
        "https://mfmc.ru/upload/iblock/679/dsc09284.jpg",
        "https://mfmc.ru/upload/iblock/149/dsc09275.jpg",
        "https://mfmc.ru/upload/iblock/a6f/dsc01111.jpg",
        "https://mfmc.ru/upload/iblock/8ba/dsc01113.jpg",
    ],
    "special": [
        "https://mfmc.ru/upload/iblock/60c/dsc00984.jpg",
        "https://mfmc.ru/upload/iblock/514/dsc01023.jpg",
        "https://mfmc.ru/upload/iblock/385/dsc01006.jpg",
        "https://mfmc.ru/upload/iblock/0e0/dsc08785.jpg",
        "https://mfmc.ru/upload/iblock/f8e/dsc08770.jpg",
        "https://mfmc.ru/upload/iblock/1fd/dsc08772.jpg",
    ],
}

OUT = Path("/Users/alexeyanurin/Projects/anhel-website/_tmp_production_raw")
OUT.mkdir(parents=True, exist_ok=True)


def main():
    total, ok, fail = 0, 0, []
    for cat, urls in PHOTOS.items():
        cat_dir = OUT / cat
        cat_dir.mkdir(exist_ok=True)
        for url in urls:
            total += 1
            name = url.rsplit("/", 1)[-1]
            target = cat_dir / name
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=20) as r:
                    data = r.read()
                target.write_bytes(data)
                ok += 1
            except Exception as e:
                fail.append((cat, url, str(e)))
        print(f"{cat:12s} {len(urls)} URLs")
    print(f"\n--- {ok}/{total} downloaded ---")
    if fail:
        for f in fail:
            print(" FAIL", f)


if __name__ == "__main__":
    main()
