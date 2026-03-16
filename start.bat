@echo off
echo Starting Portfolio Servers...

:: Kill ports if already in use
npx kill-port 5000
npx kill-port 5001

:: Start AI server in new window
start "AI Server" cmd /k "node server.js"

:: Start Mail server in new window
start "Mail Server" cmd /k "node mailserver.cjs"

echo Both servers started!