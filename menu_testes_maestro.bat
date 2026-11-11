@echo off
chcp 65001 >nul
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=C:\Android\Sdk"
set "PATH=%PATH%;C:\maestro\maestro\bin;C:\Android\Sdk\platform-tools;C:\Android\Sdk\emulator;%JAVA_HOME%\bin"
cd /d "C:\Users\lucas.csantos\Documents\trabalho"

:menu
cls
echo ===============================================================
echo        MENU DE TESTES AUTOMATIZADOS MAESTRO - GRUPO 8
echo ===============================================================
echo  [1] Basico: Cadastro com Sucesso (cadastro_sucesso.yaml)
echo  [2] Basico: Cadastro com Erro Vazio (cadastro_erro.yaml)
echo  -------------------------------------------------------------
echo  [3] Mini-Flow 01: Validacao + Bloqueio de Duplicado
echo  [4] Mini-Flow 02: Busca por Texto + Abas de Filtro (Categoria)
echo  [5] Mini-Flow 03: Favoritar Contatos + Aba Favoritos
echo  [6] Mini-Flow 04: Editar Contato Existente
echo  [7] Mini-Flow 05: Excluir Contato + Zerar Lista
echo  -------------------------------------------------------------
echo  [8] FLUXO COMPLETO AVANCADO E2E (fluxo_completo_avancado.yaml)
echo  [9] RODAR TODOS OS TESTES EM SEQUENCIA
echo  [0] Sair
echo ===============================================================
set /p opcao="Escolha o numero do teste para executar no emulador: "

if "%opcao%"=="1" call maestro test maestro/cadastro_sucesso.yaml & pause & goto menu
if "%opcao%"=="2" call maestro test maestro/cadastro_erro.yaml & pause & goto menu
if "%opcao%"=="3" call maestro test maestro/mini_01_validacao_duplicado.yaml & pause & goto menu
if "%opcao%"=="4" call maestro test maestro/mini_02_busca_e_abas_filtro.yaml & pause & goto menu
if "%opcao%"=="5" call maestro test maestro/mini_03_favoritos.yaml & pause & goto menu
if "%opcao%"=="6" call maestro test maestro/mini_04_editar_contato.yaml & pause & goto menu
if "%opcao%"=="7" call maestro test maestro/mini_05_excluir_e_zerar_lista.yaml & pause & goto menu
if "%opcao%"=="8" call maestro test maestro/fluxo_completo_avancado.yaml & pause & goto menu
if "%opcao%"=="9" (
    call maestro test maestro/cadastro_erro.yaml
    call maestro test maestro/cadastro_sucesso.yaml
    call maestro test maestro/mini_01_validacao_duplicado.yaml
    call maestro test maestro/mini_02_busca_e_abas_filtro.yaml
    call maestro test maestro/mini_03_favoritos.yaml
    call maestro test maestro/mini_04_editar_contato.yaml
    call maestro test maestro/mini_05_excluir_e_zerar_lista.yaml
    call maestro test maestro/fluxo_completo_avancado.yaml
    pause
    goto menu
)
if "%opcao%"=="0" exit
goto menu
