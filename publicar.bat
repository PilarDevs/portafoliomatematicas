@echo off
echo ==========================================
echo      PUBLICANDO PORTAFOLIO EN GITHUB
echo ==========================================
echo.
echo 1. Agregando archivos nuevos...
git add .

echo 2. Creando punto de guardado (Commit)...
git commit -m "Actualizacion automatica desde script"

echo 3. Subiendo a Internet (Push)...
git push

echo.
echo ==========================================
echo        !LISTO! CAMBIOS PUBLICADOS
echo ==========================================
echo.
pause
