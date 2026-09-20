#!/usr/bin/env bash
# Moto GP Circuit — automated setup (Mac / Linux / Chromebook with Linux shell)
cd "$(dirname "$0")"

echo "=================================================="
echo "  Moto GP Circuit — automated setup"
echo "=================================================="

if ! command -v node >/dev/null 2>&1; then
  echo
  echo " Node.js is NOT installed yet."
  echo " Install it from https://nodejs.org then run ./start.sh again."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo
  echo " Installing server (one time only)..."
  npm install || { echo " npm install failed — check your internet connection."; exit 1; }
fi

echo
echo " Starting server and opening the game in your browser..."
echo " Friends on the same Wi-Fi: use the LAN address printed below."
echo

# open the browser 2 seconds after the server starts
: "${PORT:=8765}"; export PORT
( sleep 2; (xdg-open "http://localhost:$PORT" >/dev/null 2>&1 || open "http://localhost:$PORT" >/dev/null 2>&1) ) &
node server.js
