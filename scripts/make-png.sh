#!/usr/bin/env bash
# Renders the PNG assets (Open Graph image, Apple touch icon, favicon.ico) using headless Chrome.
# Run `node scripts/make-logo.mjs` first so the SVGs exist.
#
#   bash scripts/make-png.sh
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
shot() { # shot <url> <w> <h> <out> [extra flags...]
  local url="$1" w="$2" h="$3" out="$4"; shift 4
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --force-device-scale-factor=1 --virtual-time-budget=4000 --window-size="$w,$h" \
    --screenshot="$out" "$@" "$url" >/dev/null 2>&1
}

# 1. Open Graph / social preview image
shot "file://$PWD/scripts/og-image.html" 1200 630 src/app/opengraph-image.png

# 2. Apple touch icon (ink background, same dots as the favicon; iOS applies its own rounding)
cat > "$TMP/apple.html" <<EOF
<body style="margin:0;background:#0B1220"><img src="file://$PWD/src/app/icon.svg" width="180" height="180"></body>
EOF
shot "file://$TMP/apple.html" 180 180 src/app/apple-icon.png

# 3. favicon.ico: a 48x48 PNG wrapped in an ICO container (transparent corners)
cat > "$TMP/ico.html" <<EOF
<body style="margin:0;background:transparent"><img src="file://$PWD/src/app/icon.svg" width="48" height="48" style="display:block"></body>
EOF
shot "file://$TMP/ico.html" 48 48 "$TMP/icon-48.png" --default-background-color=00000000
node -e '
const fs = require("fs");
const png = fs.readFileSync(process.argv[1]);
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0);  head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);       // ICONDIR: 1 image
head.writeUInt8(48, 6);    head.writeUInt8(48, 7);   head.writeUInt8(0, 8); head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12);
head.writeUInt32LE(png.length, 14); head.writeUInt32LE(22, 18);
fs.writeFileSync(process.argv[2], Buffer.concat([head, png]));
' "$TMP/icon-48.png" src/app/favicon.ico

rm -rf "$TMP"
echo "Wrote src/app/opengraph-image.png, src/app/apple-icon.png, src/app/favicon.ico"
