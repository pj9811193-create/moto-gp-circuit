@echo off
title Moto GP Circuit - Multiplayer Server
cd /d "%~dp0"

echo ==================================================
echo   Moto GP Circuit - automated setup
echo ==================================================

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js is NOT installed yet.
  echo  Opening the download page in 3 seconds...
  echo  Install Node.js LTS, then run this file again.
  timeout /t 3 >nul
  start https://nodejs.org/en/download
  pause
  exit /b 1
)

if not exist node_modules (
  echo.
  echo  Installing server ^(one time only^)...
  call npm install
  if errorlevel 1 (
    echo  npm install failed - check your internet connection.
    pause
    exit /b 1
  )
)

echo.
echo  Starting server and opening the game in your browser...
echo  Friends on the same Wi-Fi: use the LAN address printed below.
echo.

rem open the browser 2 seconds after the server starts
if "%PORT%"=="" set PORT=8765
start "" cmd /c "timeout /t 2 >nul & start http://localhost:%PORT%"

node server.js
pause
