# 🚀 Guia Rápido: Como Baixar e Rodar o App e os Testes (Maestro)

Este guia resume tudo o que você precisa fazer para baixar o projeto, abrir o aplicativo no emulador ou celular e rodar os testes automatizados do **Maestro**.

---

## Parte 1 — Na Sua Máquina (Onde já deixamos tudo instalado)

Você não precisa baixar mais nada! Basta usar os atalhos na pasta `C:\Users\lucas.csantos\Documents\trabalho`:

1. **Para abrir o Emulador e instalar o App:**
   - Dê 2 cliques em **`1_iniciar_emulador_e_instalar_app.bat`** *(ou abra a pasta `android` no Android Studio e clique no botão verde **Play ▶**)*.
2. **Para escolher e rodar qualquer teste do Maestro:**
   - Dê 2 cliques em **`menu_testes_maestro.bat`**.
   - Vai abrir um menu numerado de `1` a `9` para você escolher qual mini-flow ou fluxo completo quer rodar ao vivo!
3. **Para instalar no seu celular Android:**
   - Envie o arquivo **`CadastroDeContatos.apk`** (que está na pasta `C:\Users\lucas.csantos\Documents\trabalho`) pelo WhatsApp ou cabo USB e instale no celular.

---

## Parte 2 — Como Baixar e Rodar em Outro Computador (Pelo GitHub)

Se outro integrante do **Grupo 8** quiser baixar do GitHub (`https://github.com/lucas-castro5/trabalhoquarta`) em outro PC:

### Passo 1: Clonar o repositório e instalar pacotes
Abra o **PowerShell** e rode:
```powershell
git clone https://github.com/lucas-castro5/trabalhoquarta.git
cd trabalhoquarta
npm install
```

### Passo 2: Compilar e instalar o App no Emulador Android
1. Abra o **Android Studio** e ligue um **Emulador Android**.
2. No PowerShell, dentro da pasta `trabalhoquarta`, rode:
```powershell
npx expo run:android
```

### Passo 3: Instalar o Maestro no Windows
No PowerShell, rode:
```powershell
Invoke-WebRequest -Uri "https://github.com/mobile-dev-inc/Maestro/releases/latest/download/maestro.zip" -OutFile "$env:TEMP\maestro.zip"
Expand-Archive -Path "$env:TEMP\maestro.zip" -DestinationPath "C:\maestro" -Force
$env:PATH += ";C:\maestro\maestro\bin"
```

### Passo 4: Rodar os Testes do Maestro
No PowerShell, dentro da pasta do projeto, escolha o teste que deseja rodar:

```powershell
# 1. Testes Básicos dos Slides:
maestro test maestro/cadastro_erro.yaml
maestro test maestro/cadastro_sucesso.yaml

# 2. Mini-Flows Específicos (rápidos para demonstrar funções isoladas):
maestro test maestro/mini_01_validacao_duplicado.yaml
maestro test maestro/mini_02_busca_e_abas_filtro.yaml
maestro test maestro/mini_03_favoritos.yaml
maestro test maestro/mini_04_editar_contato.yaml
maestro test maestro/mini_05_excluir_e_zerar_lista.yaml

# 3. Fluxo Completo Avançado (testa o app inteiro de ponta a ponta):
maestro test maestro/fluxo_completo_avancado.yaml
```
