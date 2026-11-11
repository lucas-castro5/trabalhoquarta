@echo off
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=C:\Android\Sdk"
set "PATH=%PATH%;C:\maestro\maestro\bin;C:\Android\Sdk\platform-tools;C:\Android\Sdk\emulator;%JAVA_HOME%\bin"

cd /d "C:\Users\lucas.csantos\Documents\trabalho"
echo === Executando Fluxo Completo Avancado no Emulador ===
call maestro test maestro/fluxo_completo_avancado.yaml
pause
