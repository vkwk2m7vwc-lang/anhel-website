#!/usr/bin/env bash
# Commit the hero-carousel + nav changes and push to main.
# Run this from the anhel-website clone root (where .git/ lives):
#   bash COMMIT_AND_PUSH.sh
set -euo pipefail

# Clear any stray lockfile left from the sandbox apply.
rm -f .git/index.lock

git status -sb

git add -A

git commit -F - << 'MSG'
feat(hero): wire carousel + nav to /products/pumps/firefighting

The only product page built so far is firefighting, but nothing on
the homepage actually linked to it — /#products was a dangling
anchor and the carousel tabs only switched the hero background.

Carousel (src/components/hero/HeroBgCarousel.tsx + lib/hero-products.ts):
  - HeroProduct gains optional `href`. Only pump-fire carries one
    today (/products/pumps/firefighting); the other three are
    flagged as 'coming soon'.
  - Desktop + mobile product images are wrapped in <Link> when
    href exists, so clicking the render takes you to the page.
  - Below the active product name, ready products show an inline
    'Подробнее ↗' link in the product accent colour; unready ones
    show a muted 'Скоро' chip. Visible state distinction, no
    extra UI block needed.
  - Tab buttons (01-04) still drive the carousel via goTo() — nav
    and slide-switch stay as separate concerns.

Nav (Header.tsx, Footer.tsx, HeroCTAs.tsx):
  - 'Продукты' / 'Смотреть каталог' used to point at /#products,
    which no section on the page has an id for. Pointed them at
    /products/pumps/firefighting for now — when the other three
    product pages land we'll route through a /products hub.

No changes to useHeroCarousel, tab behaviour, autopause, or any
section below the hero. Purely additive on the navigation side.
MSG

git push origin main

echo ""
echo "✅ Pushed. Vercel will build automatically — new prod in ~30s."
echo "   Watch: https://vercel.com/anurin7-5494s-projects/anhel-website/deployments"
