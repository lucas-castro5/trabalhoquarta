@echo off
cd /d "C:\Users\lucas.csantos\Documents\trabalho"
echo === Enviando projeto para https://github.com/lucas-castro5/trabalhoquarta ===
echo (Se abrir uma janela do GitHub no navegador, basta clicar em Authorize / Sign In!)
git push -u origin main --force
echo.
echo === Concluido! ===
pause
