@echo off
title Monitor Automatico - MathPortfolio
color 0A
echo ==================================================
echo   MONITOR DE CAMBIOS AUTOMATICO
echo   Mantener esta ventana abierta mientras trabajas.
echo.
echo   [ESPERANDO] Si guardas algo en el navegador,
echo               yo lo subire a internet automaticamente.
echo ==================================================

:loop
rem Esperar 3 segundos entre verificaciones
timeout /t 3 /nobreak >nul

rem Verificar si hay cambios en git
git status --porcelain | findstr . >nul

if %errorlevel% equ 0 (
    cls
    echo ==================================================
    echo   [DETECTADO] Nuevo contenido encontrado...
    echo ==================================================
    
    echo 1. Preparando archivos...
    git add .
    
    echo 2. Guardando version...
    git commit -m "Actualizacion automatica desde Web Admin"
    
    echo 3. Subiendo a GitHub...
    git push
    
    echo.
    echo ==================================================
    echo   [LISTO] Todo actualizado. Esperando mas...
    echo ==================================================
)

goto loop
