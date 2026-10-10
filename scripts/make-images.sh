#!/usr/bin/env bash
# Regenerates the WebP variants used by index.html from the source JPEGs in assets/web.
# Requires ImageMagick (`convert`). Run from the repo root: bash scripts/make-images.sh
set -euo pipefail
cd "$(dirname "$0")/../assets/web"
for f in gallery-*.jpg hero.jpg about.jpg craft.jpg tour-scene.jpg; do
  n="${f%.jpg}"
  convert "$f" -auto-orient -strip -resize '800x800>'   -quality 78 -define webp:method=6 "$n-800.webp"
  convert "$f" -auto-orient -strip -resize '1400x1400>' -quality 78 -define webp:method=6 "$n-1400.webp"
done
for f in fb*.jpg; do
  convert "$f" -strip -quality 80 -define webp:method=6 "${f%.jpg}.webp"
done
echo "done"
