# 📱 App Cadastro de Contatos — Automação de Testes E2E com Maestro (Grupo 8)

Repositório oficial do aplicativo mobile de demonstração do **Grupo 8** para o seminário sobre **Testes Automatizados de Interface (E2E) com Maestro**.

### Integrantes do Grupo 8
- Jonathan Oliveira Rodrigues
- Lucas Gabriel Castro dos Santos
- Luiz Eduardo
- João Victor Ferreira

---

## 🛠️ Tecnologias Utilizadas
- **React Native com Expo** (JavaScript puro, sem TypeScript)
- **Pacote Nativo Android fixo (`appId`):** `com.grupo8.contatos`
- **Maestro (`maestro.mobile.dev`):** Framework de testes E2E em YAML

---

## ✨ Funcionalidades do Aplicativo (`App.js`)
1. **Cadastro de Contatos:** Campos `Nome *`, `Sobrenome *`, `Telefone (opcional)` e seletor de `Categoria` (*Faculdade*, *Trabalho*, *Família*).
2. **Validações Inteligentes:**
   - Campos obrigatórios vazios exibem `"Preencha todos os campos"`.
   - Tentativa de cadastrar o mesmo nome duas vezes exibe `"Contato já cadastrado!"`.
3. **Contadores em Tempo Real:** Badges no topo indicando `Total: X` e `Favoritos: Y`.
4. **Busca e Abas de Filtro Rápido:**
   - Campo `"Buscar contato..."` que filtra por nome ou telefone em tempo real.
   - Abas de filtro (`Filtro: Todos`, `Filtro: Favoritos`, `Filtro: Faculdade`, `Filtro: Trabalho`, `Filtro: Família`).
5. **Ações por Contato:**
   - **Favoritar (`★`):** Marca/desmarca como favorito e atualiza o contador.
   - **Editar:** Carrega os dados do contato no formulário e salva exibindo `"Contato atualizado com sucesso!"`.
   - **Excluir:** Remove o contato da lista e exibe `"Contato removido!"`.
6. **Botões Rápidos de Demonstração:**
   - **`Carregar Grupo 8`:** Preenche instantaneamente a lista com os 4 integrantes do Grupo 8 para facilitar testes rápidos de filtro, busca e exclusão.
   - **`Zerar Lista`:** Limpa todos os contatos cadastrados de uma só vez.

---

## 📂 Estrutura de Testes do Maestro (`maestro/`)

| Arquivo YAML | O que ele testa |
| :--- | :--- |
| [`maestro/cadastro_sucesso.yaml`](./maestro/cadastro_sucesso.yaml) | **Fluxo Básico (Sucesso):** Preenche *Luiz Eduardo*, esconde o teclado, salva e verifica na lista. |
| [`maestro/cadastro_erro.yaml`](./maestro/cadastro_erro.yaml) | **Fluxo Básico (Erro):** Clica em *Salvar* com campos vazios e verifica a mensagem `"Preencha todos os campos"`. |
| [`maestro/mini_01_validacao_duplicado.yaml`](./maestro/mini_01_validacao_duplicado.yaml) | **Mini-Flow 01:** Testa campos vazios e bloqueio de contato duplicado (`"Contato já cadastrado!"`). |
| [`maestro/mini_02_busca_e_abas_filtro.yaml`](./maestro/mini_02_busca_e_abas_filtro.yaml) | **Mini-Flow 02:** Carrega o Grupo 8 com 1 clique, filtra pelas abas *Trabalho* e *Faculdade* e testa a barra de busca. |
| [`maestro/mini_03_favoritos.yaml`](./maestro/mini_03_favoritos.yaml) | **Mini-Flow 03:** Favorita contatos e filtra pela aba exclusiva `Filtro: Favoritos`. |
| [`maestro/mini_04_editar_contato.yaml`](./maestro/mini_04_editar_contato.yaml) | **Mini-Flow 04:** Cadastra um contato, clica em `Editar`, altera telefone/categoria e valida `"Contato atualizado com sucesso!"`. |
| [`maestro/mini_05_excluir_e_zerar_lista.yaml`](./maestro/mini_05_excluir_e_zerar_lista.yaml) | **Mini-Flow 05:** Testa a exclusão individual de um card (`Excluir`) e o botão `Zerar Lista`. |
| [`maestro/fluxo_completo_avancado.yaml`](./maestro/fluxo_completo_avancado.yaml) | **Fluxo Completo E2E:** Executa uma bateria completa de testes passando por validação, múltiplos cadastros, busca, favoritos e exclusão. |

---

## 🚀 Como Baixar e Rodar o Projeto (Passo a Passo)

### 1. Clonar o repositório e instalar dependências
No **PowerShell**, execute:
```powershell
git clone https://github.com/lucas-castro5/trabalhoquarta.git
cd trabalhoquarta
npm install
```

### 2. Gerar e instalar o App no Emulador Android
Com o **Android Studio** instalado e um **Emulador Android** aberto:
```powershell
# Gera a pasta nativa android/, compila o APK com package com.grupo8.contatos e instala no emulador:
npx expo run:android
```
*(Ou, se já estiver na máquina configurada, basta clicar duas vezes em **`1_iniciar_emulador_e_instalar_app.bat`**).*

---

## 🧪 Como Instalar o Maestro e Rodar os Testes

### 1. Instalar o Maestro no Windows (PowerShell)
Requer **Java 17+** instalado (o próprio JDK do Android Studio em `C:\Program Files\Android\Android Studio\jbr` já serve):
```powershell
Invoke-WebRequest -Uri "https://github.com/mobile-dev-inc/Maestro/releases/latest/download/maestro.zip" -OutFile "$env:TEMP\maestro.zip"
Expand-Archive -Path "$env:TEMP\maestro.zip" -DestinationPath "C:\maestro" -Force
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:PATH += ";C:\maestro\maestro\bin;C:\Android\Sdk\platform-tools;$env:JAVA_HOME\bin"

# Verificar se o emulador está conectado e o Maestro instalado:
adb devices
maestro --version
```

### 2. Executar os Testes Automatizados

#### Opção A — Usando o Menu Interativo (2 cliques)
Basta dar dois cliques no arquivo **`menu_testes_maestro.bat`** e digitar o número do teste desejado (`1` a `9`)!

#### Opção B — Comandos diretos no PowerShell
```powershell
# Fluxos Básicos (Slides):
maestro test maestro/cadastro_erro.yaml
maestro test maestro/cadastro_sucesso.yaml

# Mini-Flows Específicos:
maestro test maestro/mini_01_validacao_duplicado.yaml
maestro test maestro/mini_02_busca_e_abas_filtro.yaml
maestro test maestro/mini_03_favoritos.yaml
maestro test maestro/mini_04_editar_contato.yaml
maestro test maestro/mini_05_excluir_e_zerar_lista.yaml

# Fluxo Completo Avançado E2E:
maestro test maestro/fluxo_completo_avancado.yaml
```

---

## 📲 Como Instalar no Celular Físico (Android)
1. Se você gerou o APK (`CadastroDeContatos.apk` ou `android/app/build/outputs/apk/debug/app-debug.apk`), envie o arquivo `.apk` para o celular via WhatsApp/USB e toque para instalar.
2. Ou conecte o celular no cabo USB com a **Depuração USB** ativada nas *Opções do Desenvolvedor* e rode:
   ```powershell
   adb install -r CadastroDeContatos.apk
   ```

---

## 🔧 Solução de Problemas Comuns (Troubleshooting)
- **`adb` ou Emulador não reconhecido:** Certifique-se de que o emulador está ligado no Android Studio e adicione `C:\Android\Sdk\platform-tools` ao `PATH`.
- **`maestro` não reconhecido no PowerShell:** Rode `$env:PATH += ";C:\maestro\maestro\bin"` na janela atual do terminal.
- **Teclado cobrindo botões:** O app já utiliza `KeyboardAvoidingView` + `ScrollView` e os flows do Maestro utilizam `- hideKeyboard` antes de clicar em `Salvar`.
