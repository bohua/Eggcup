echo off
echo "Installing started"

echo "Installing..."
nssm.exe install EggcupService "%~dp0\node.exe" "%~dp0\server.js"

echo "Starting Service..."
sc start EggcupService

echo "Done..."
start chrome "http://localhost:8080"

pause