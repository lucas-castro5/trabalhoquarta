# App Cadastro de Contatos — Demonstração com Maestro (Grupo 8)

Aplicativo mobile simples em **React Native com Expo (JavaScript)** criado como alvo de testes automatizados E2E com o **Maestro** (`com.grupo8.contatos`).

---

## 1. Estrutura dos Arquivos na Pasta

- `App.js`: Código principal do aplicativo com a tela de Cadastro de Contatos.
- `app.json`: Configuração do Expo com o identificador fixo do pacote Android (`com.grupo8.contatos`).
- `maestro/cadastro_sucesso.yaml`: Fluxo de teste automatizado preenchendo Nome ("Luiz") e Sobrenome ("Eduardo") e verificando o cadastro.
- `maestro/cadastro_erro.yaml`: Fluxo de teste automatizado tentando salvar com campos vazios e validando a mensagem de erro.

---

## 2. Passo a Passo para Criar, Gerar e Rodar o App no Emulador (Windows / PowerShell)

> **Nota:** Os arquivos já foram criados e configurados diretamente nesta pasta (`C:\Users\lucas.csantos\Documents\trabalho`). Caso queira recriar do zero em outra pasta ou apenas rodar o projeto existente, siga os passos abaixo.

### 2.1. Se fosse criar o projeto do zero:
```powershell
# 1. Entrar na pasta do trabalho
cd C:\Users\lucas.csantos\Documents\trabalho

# 2. Criar um projeto Expo em JavaScript (template blank)
npx create-expo-app@latest . --template blank
```
*(Depois, bastaria substituir o `App.js` e o `app.json` pelos arquivos deste repositório).*

### 2.2. Gerar e instalar o app nativo no Emulador Android:
1. Abra o **Android Studio** -> **Virtual Device Manager** e inicie o seu **Emulador Android** antes de rodar o comando.
2. No **PowerShell**, dentro da pasta `C:\Users\lucas.csantos\Documents\trabalho`, execute:

```powershell
cd C:\Users\lucas.csantos\Documents\trabalho

# Gera a pasta nativa android/ (com package com.grupo8.contatos), compila e instala no emulador:
npx expo run:android
```

> **Por que usar `npx expo run:android` e não o Expo Go?**
> Esse comando gera o APK próprio com o `appId` exclusivo `com.grupo8.contatos` e instala direto no emulador como um aplicativo independente. Assim, o comando `launchApp` do Maestro abre diretamente a sua tela, sem passar pelo menu do Expo Go.

---

## 3. Como Instalar o Maestro no Windows e Rodar os Testes

### 3.1. Verificar se o Emulador Android está conectado (`adb devices`)
No PowerShell, rode:
```powershell
adb devices
```
Saída esperada:
```text
List of devices attached
emulator-5554   device
```

### 3.2. Instalar o Maestro no Windows
O Maestro exige **Java 17+** instalado (`java -version`). Você pode instalar o Maestro no Windows via PowerShell das seguintes maneiras:

**Opção A — Via WSL2 (Recomendado pela documentação oficial no Windows):**
Se tiver WSL instalado, basta rodar no terminal WSL:
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

**Opção B — Nativo no Windows (PowerShell):**
```powershell
# Baixa a versão mais recente do Maestro na pasta C:\maestro e adiciona ao PATH da sessão atual:
Invoke-WebRequest -Uri "https://github.com/mobile-dev-inc/Maestro/releases/latest/download/maestro.zip" -OutFile "$env:TEMP\maestro.zip"
Expand-Archive -Path "$env:TEMP\maestro.zip" -DestinationPath "C:\maestro" -Force
$env:PATH += ";C:\maestro\maestro\bin"

# Para salvar no PATH do usuário permanentemente:
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\maestro\maestro\bin", "User")
```

Confirme se o Maestro está funcionando:
```powershell
maestro --version
```

### 3.3. Executar os Flows do Maestro
Com o emulador aberto e o app instalado, execute no PowerShell dentro de `C:\Users\lucas.csantos\Documents\trabalho`:

**Teste 1 — Cenário de Erro (Campos vazios):**
```powershell
maestro test maestro/cadastro_erro.yaml
```

**Teste 2 — Cenário de Sucesso (Cadastro de "Luiz Eduardo"):**
```powershell
maestro test maestro/cadastro_sucesso.yaml
```

As capturas de tela (`cadastro_erro.png` e `cadastro_sucesso.png`) serão salvas automaticamente na pasta onde você rodou o comando!

---

## 4. Problemas Comuns e Como Resolver (Troubleshooting)

1. **`adb` ou Emulador não detectado (`No running devices found` ou `adb is not recognized`):**
   - **Causa:** O SDK do Android (`platform-tools`) não está no PATH do Windows ou o emulador ainda está inicializando.
   - **Solução:** Adicione o `platform-tools` ao PATH no PowerShell:
     ```powershell
     $env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
     $env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator"
     adb kill-server
     adb start-server
     adb devices
     ```
2. **Comando `maestro` não encontrado (`maestro : O termo 'maestro' não é reconhecido`):**
   - **Causa:** A pasta `bin` do Maestro ou do Java não está na variável `PATH`, ou o terminal não foi reiniciado após a instalação.
   - **Solução:** Feche e abra o PowerShell novamente, ou adicione temporariamente na sessão atual:
     ```powershell
     $env:PATH += ";C:\maestro\maestro\bin"
     ```
     Verifique também se o Java está instalado com `java -version` (se não estiver, instale com `winget install EclipseAdoptium.Temurin.17.JDK`).
3. **Teclado virtual do Android cobrindo o botão "Salvar" ou atrapalhando o clique:**
   - **Causa:** Em telas menores do emulador, o teclado aberto ocupa metade da tela.
   - **Solução (Dupla proteção já aplicada):**
     1. No `App.js`, o formulário está no topo dentro de um `KeyboardAvoidingView` + `ScrollView` com `keyboardShouldPersistTaps="handled"`.
     2. No `maestro/cadastro_sucesso.yaml`, incluímos o comando `- hideKeyboard` antes de `- tapOn: "Salvar"`. Além disso, você pode desativar o teclado virtual no emulador indo em *Settings > System > Languages & input > Physical keyboard > Show virtual keyboard (Off)*.
4. **Maestro não encontra o texto devido ao autofill/corretor do teclado Android:**
   - **Causa:** Às vezes o corretor ortográfico do Android altera o nome digitado.
   - **Solução:** No `App.js`, os campos `TextInput` já estão configurados com `autoCorrect={false}` e `autoCapitalize="words"`.
