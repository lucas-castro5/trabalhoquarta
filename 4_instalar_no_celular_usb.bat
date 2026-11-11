@echo off
chcp 65001 >nul
set "ANDROID_HOME=C:\Android\Sdk"
set "PATH=%PATH%;C:\Android\Sdk\platform-tools"

echo ===============================================================
echo        INSTALAR APP NO CELULAR VIA CABO USB (ADB)
echo ===============================================================
echo Verificando aparelhos conectados...
"C:\Android\Sdk\platform-tools\adb.exe" devices -l
echo.
echo Instalando CadastroDeContatos.apk no celular...
"C:\Android\Sdk\platform-tools\adb.exe" -d install -r "C:\Users\lucas.csantos\Documents\trabalho\CadastroDeContatos.apk"
echo.
echo Abrindo o app na tela do celular...
"C:\Android\Sdk\platform-tools\adb.exe" -d shell monkey -p com.grupo8.contatos -c android.intent.category.LAUNCHER 1
echo.
pause
