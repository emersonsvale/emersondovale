@echo off
cd /d "d:\Projetos\Emerson\portifolio-emerson"
echo === Git status ===
git status
echo.
echo === Ultimo commit ===
git log -1 --oneline
echo.
echo === Adicionando e commitando ===
git add -A
git commit -m "chore: portfolio - About Me, Hero, Projects, admin, PDF e regra Coolify"
if errorlevel 1 (
  echo Commit falhou ou nao ha mudancas.
  pause
  exit /b 1
)
echo.
echo === Enviando para GitHub ===
git push origin main
echo.
echo === Pronto ===
pause
