@echo off
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=C:\Android\Sdk"
set "PATH=%PATH%;C:\maestro\maestro\bin;C:\Android\Sdk\platform-tools;C:\Android\Sdk\emulator;%JAVA_HOME%\bin"

echo === 1. Iniciando o Emulador Android (Pixel_6_API_34) ===
start "" "C:\Android\Sdk\emulator\emulator.exe" -avd Pixel_6_API_34 -no-snapshot-load

echo === 2. Aguardando o Emulador ligar... ===
"C:\Android\Sdk\platform-tools\adb.exe" wait-for-device
:wait_boot
for /f "delims=" %%a in ('"C:\Android\Sdk\platform-tools\adb.exe" shell getprop sys.boot_completed 2^>nul') do set boot=%%a
if not "%boot%"=="1" (
    timeout /t 2 /nobreak >nul
    goto wait_boot
)

echo === 3. Instalando o App Cadastro de Contatos (com.grupo8.contatos) ===
"C:\Android\Sdk\platform-tools\adb.exe" install -r "C:\Users\lucas.csantos\Documents\trabalho\android\app\build\outputs\apk\debug\app-debug.apk"

echo === 4. Abrindo o App no Emulador ===
"C:\Android\Sdk\platform-tools\adb.exe" shell monkey -p com.grupo8.contatos -c android.intent.category.LAUNCHER 1

echo.
echo === TUDO PRONTO! O Emulador esta aberto com o App instalado! ===
echo Agora basta rodar o arquivo 2_rodar_testes_maestro.bat ou executar os comandos do Maestro no PowerShell.
pause
