#!/data/data/com.termux/files/usr/bin/bash
# ════════════════════════════════════════════════════════════════
#  Moto GP Circuit — ANDROID automated setup (Termux)
#
#  BEFORE running this: download these 2 files to your phone's
#  Downloads folder (or from the GitHub Releases page):
#      1) bike-racer.html
#      2) server.js
#
#  Then in Termux run:
#      bash ~/storage/downloads/setup-android.sh
# ════════════════════════════════════════════════════════════════
cd "$HOME" || exit 1

echo "=================================================="
echo "  Moto GP Circuit — Android setup"
echo "=================================================="

# 1. access to the phone's Downloads folder (asks permission once)
if [ ! -d "$HOME/storage/downloads" ]; then
  echo
  echo " Asking for storage permission — tap ALLOW on the popup..."
  termux-setup-storage
fi
DL="$HOME/storage/downloads"

# 2. game folder
DIR="$HOME/moto-gp-circuit"
mkdir -p "$DIR"

found=0
for f in bike-racer.html server.js; do
  if [ -f "$DL/$f" ]; then cp -f "$DL/$f" "$DIR/$f"; found=$((found+1)); fi
done
if [ $found -lt 2 ] && { [ ! -f "$DIR/bike-racer.html" ] || [ ! -f "$DIR/server.js" ]; }; then
  echo
  echo " MISSING FILES: download bike-racer.html and server.js"
  echo " from the repo (Releases page) into your Downloads folder,"
  echo " then run this again."
  exit 1
fi

# package.json is tiny — create it here so you don't need a 3rd download
if [ ! -f "$DIR/package.json" ]; then
  cat > "$DIR/package.json" <<'EOF'
{
  "name": "moto-gp-circuit",
  "version": "2.0.0",
  "private": true,
  "scripts": { "start": "node server.js" },
  "dependencies": { "ws": "^8.0.0" }
}
EOF
fi

cd "$DIR" || exit 1

# 3. Node.js
if ! command -v node >/dev/null 2>&1; then
  echo
  echo " Installing Node.js (one time, ~1 minute)..."
  pkg update -y || apt update -y
  pkg install -y nodejs || apt install -y nodejs
fi

# 4. server dependencies
if [ ! -d node_modules ]; then
  echo
  echo " Installing server dependencies (one time)..."
  npm install || exit 1
fi

# 5. keep the phone from killing the server while you play
termux-wake-lock 2>/dev/null
echo
echo " ✔ Keep Termux in the background (don't swipe it away)."
echo "   For long sessions: Android Settings → Apps → Termux →"
echo "   Battery → Unrestricted."

echo
echo " NOW OPEN CHROME ON THIS PHONE:"
echo "      http://localhost:8765"
echo " The game auto-connects its multiplayer by itself."
echo
echo " FRIENDS: turn on your Hotspot, they join Wi-Fi and open"
echo " the http://<phone-ip>:8765 address printed below:"
echo
exec node server.js
