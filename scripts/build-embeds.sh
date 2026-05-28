#!/usr/bin/env bash
# scripts/build-embeds.sh
#
# Pre-upload transform for CSE 160 demos.
#
# What this does:
# - Re-encodes asg3 + asg4 galaxy.mp4 textures from 70MB at 1280×1280 →
#   ~13MB at 720×720, dropping audio entirely (the JS plays it muted).
#   Same visual fidelity, 81% size reduction.
# - Removes original galaxy.mp4 from each asg's assets/ in-place; replaces
#   with the optimized version.
# - The asg3/asg4 .html files reference `assets/galaxyfinal.mp4` so the
#   replacement is transparent.
#
# Run by the reusable workflow when `build.script: scripts/build-embeds.sh`
# is declared in web.codeseys.json. Idempotent — re-runs check whether the
# size is already small.
#
# Env vars provided by the workflow:
#   EMBED_SLUG       — manifest.slug
#   EMBED_VERSION    — short git sha
#   EMBED_SOURCE_DIR — what the workflow will rsync to R2
set -euo pipefail

OPTIMIZE_DIRS=("asg3" "asg4")
TARGET_FILE="assets/galaxyfinal.mp4"
TARGET_RES="720:720"
TARGET_CRF=28
SIZE_THRESHOLD_MB=20  # if the file is already ≤20MB we assume it was optimized

echo "Build script: optimizing video textures for $EMBED_SLUG@$EMBED_VERSION"

for dir in "${OPTIMIZE_DIRS[@]}"; do
  src="$dir/$TARGET_FILE"
  if [ ! -f "$src" ]; then
    echo "  · $src not found; skipping"
    continue
  fi

  size_bytes=$(stat -c%s "$src")
  size_mb=$((size_bytes / 1024 / 1024))
  echo "  · $src is ${size_mb}MB"

  if [ "$size_mb" -le "$SIZE_THRESHOLD_MB" ]; then
    echo "    already ≤${SIZE_THRESHOLD_MB}MB; skipping"
    continue
  fi

  tmp="$(mktemp --suffix=.mp4)"
  echo "    re-encoding to $TARGET_RES, crf=$TARGET_CRF, no audio…"
  ffmpeg -y -nostdin -loglevel warning \
    -i "$src" \
    -an \
    -vf scale=$TARGET_RES \
    -c:v libx264 -crf $TARGET_CRF -preset slow \
    -pix_fmt yuv420p -movflags +faststart \
    "$tmp"
  new_bytes=$(stat -c%s "$tmp")
  new_mb=$((new_bytes / 1024 / 1024))
  pct=$((100 - (new_bytes * 100 / size_bytes)))
  echo "    ${size_mb}MB → ${new_mb}MB (${pct}% reduction)"
  mv "$tmp" "$src"
done

echo "Build script complete"
