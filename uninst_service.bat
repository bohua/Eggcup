echo off
echo "Uninstall Started..."

echo "Stopping Service..."
sc stop EggcupService

echo "Removing Service..."
nssm.exe remove EggcupService confirm

echo "Done"

pause