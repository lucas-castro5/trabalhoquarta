@echo off
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=C:\Android\Sdk"
set "PATH=%PATH%;C:\maestro\maestro\bin;C:\Android\Sdk\platform-tools;C:\Android\Sdk\emulator;%JAVA_HOME%\bin"

cd /d "C:\Users\lucas.csantos\Documents\trabalho"
echo === Dispositivos conectados ===
adb devices

echo.
echo === Executando Teste 1: Cadastro com Erro (Campos Vazios) ===
call maestro test maestro/cadastro_erro.yaml

echo.
echo === Executando Teste 2: Cadastro com Sucesso (Luiz Eduardo) ===
call maestro test maestro/cadastro_sucesso.yaml

echo.
echo === Executando Teste 3: Fluxo Completo Avancado (Categorias, Busca, Favorito, Exclusao) ===
call maestro test maestro/fluxo_completo_avancado.yaml

echo.
echo === Todos os testes finalizados! ===
pause
