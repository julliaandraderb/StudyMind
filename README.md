# StudyMind

Sistema de estudos: dashboard de desempenho, simulado com questões, flashcards, guias de estudo por matéria, lista de tarefas e chat com IA.

## Funcionalidades

- **Dashboard:** desempenho geral, questões e flashcards do dia, dias de sequência, progresso por matéria e o painel **"Revisar hoje"** com as matérias em que você errou algo desde ontem.
- **Matérias:** guias completos com explicações, exemplos resolvidos e pegadinhas comuns em provas (Física, Matemática, Química, Biologia, Português, História, Geografia e Filosofia).
- **Simulado:** questões por matéria, com correção na hora.
- **Flashcards:** os cartões que você erra voltam mais vezes.
- **Chat com IA:** tira dúvidas sobre qualquer matéria (Groq na nuvem ou Ollama no computador).
- **Conta de usuário:** cadastro, login, login com Google e recuperação de senha por e-mail.
- **Modo escuro.**

## Tecnologias

- **Backend:** Python + Flask
- **Banco de dados:** MySQL 8 (biblioteca PyMySQL)
- **Frontend:** HTML, CSS e JavaScript puro
- **IA:** [Groq](https://console.groq.com) (nuvem) ou [Ollama](https://ollama.com) (local)

## O que você precisa instalar

- [Python 3.10 ou mais novo](https://www.python.org/downloads/) (na instalação, marque **"Add Python to PATH"**)
- [MySQL 8](https://dev.mysql.com/downloads/installer/) (o MySQL Workbench ajuda a ver o banco)
- [Git](https://git-scm.com/downloads), para baixar o projeto

## Como rodar no seu computador

### 1. Baixe o projeto

```bash
git clone <link-do-repositorio>
cd <pasta-do-projeto>
```

### 2. Instale as dependências do Python

Crie um ambiente virtual e instale as bibliotecas:

```bash
python -m venv .venv
```

Ative o ambiente virtual:

- **Windows:** `.venv\Scripts\activate`
- **Mac/Linux:** `source .venv/bin/activate`

Depois instale:

```bash
pip install -r requirements.txt
```

### 3. Crie o banco de dados

O arquivo [`database/studymind.sql`](database/studymind.sql) cria o banco `StudyMind` com todas as tabelas, vazias.

- **MySQL Workbench:** *File → Open SQL Script*, escolha `database/studymind.sql` e clique no raio (⚡) para executar.
- **Terminal:**
  ```bash
  mysql -u root -p < database/studymind.sql
  ```

### 4. Configure as senhas e chaves

Copie o arquivo de exemplo:

- **Windows:** `copy backend\.env.example backend\.env`
- **Mac/Linux:** `cp backend/.env.example backend/.env`

Abra o `backend/.env` e preencha pelo menos estes dois campos:

| Campo | O que colocar |
|---|---|
| `DB_PASSWORD` | A senha do usuário `root` do seu MySQL |
| `SECRET_KEY` | Uma chave aleatória. Gere uma com `python -c "import secrets; print(secrets.token_hex(32))"` |

Os outros campos são opcionais. O site funciona sem eles, só sem o recurso correspondente:

| Campo | Para que serve | Onde conseguir |
|---|---|---|
| `GROQ_API_KEY` | Chat com IA rápido, na nuvem | [console.groq.com/keys](https://console.groq.com/keys) (grátis) |
| `SMTP_USUARIO` e `SMTP_SENHA` | Enviar o código de "Esqueci minha senha" | Um Gmail com [senha de app](https://myaccount.google.com/apppasswords) |
| `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET` | Botão "Entrar com Google" | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → criar "ID do cliente OAuth" |

> ⚠️ O arquivo `.env` tem senhas e **nunca** deve ir para o GitHub. Ele já está no `.gitignore`.

### 5. Inicie o servidor

```bash
cd backend
python study.py
```

Abra **http://localhost:5000** no navegador e crie uma conta.

## Chat com IA sem a Groq (opcional)

Sem `GROQ_API_KEY`, o chat usa o Ollama instalado no próprio computador (é mais lento):

1. Instale o [Ollama](https://ollama.com/download).
2. Baixe o modelo: `ollama pull llama3.2`
3. Deixe o Ollama aberto enquanto usa o site.

## Login com Google

No Google Cloud Console, em **"URIs de redirecionamento autorizados"**, cadastre:

```
http://localhost:5000/login/google/callback
http://127.0.0.1:5000/login/google/callback
```

Se o site for aberto por outro endereço (por exemplo, um link público), esse endereço também precisa ser cadastrado: `https://SEU-LINK/login/google/callback`.

Enquanto o app do Google estiver em modo **"Teste"**, só os e-mails cadastrados em *Tela de consentimento OAuth → Usuários de teste* conseguem entrar.

## Problemas comuns

| Problema | Solução |
|---|---|
| "Não foi possível conectar ao banco de dados" | Confira a `DB_PASSWORD` no `.env` e se o serviço do MySQL está ligado. |
| `Unknown database 'StudyMind'` | Rode o arquivo `database/studymind.sql` (passo 3). |
| A página fica carregando para sempre | Pode haver outro servidor antigo na porta 5000. Feche todos os terminais com `python study.py` e inicie de novo. |
| `ModuleNotFoundError: No module named 'flask'` | Ative o ambiente virtual e rode `pip install -r requirements.txt`. |
| Login com Google: "solicitação inválida" | O endereço de retorno não está cadastrado no Google Cloud (veja "Login com Google"). |

## Estrutura do projeto

```
backend/
  study.py              # servidor Flask: páginas, login e rotas da API
  .env.example          # modelo das configurações (copie para .env)
database/
  studymind.sql         # estrutura do banco de dados MySQL
frontend/
  html/                 # páginas: login, cadastro e sistema
  css/
    sistema.css         # estilos do sistema
    materias.css        # estilos dos guias de estudo
    tema-escuro.css     # cores do modo escuro
  js/
    sistema.js          # simulado, flashcards, tarefas e chat
    dashboard.js        # cartões do dashboard e "Revisar hoje"
    questoes.js         # banco de questões do simulado
    flashcards.js       # banco de flashcards
    materias.js         # guias de Exatas e Natureza
    materias-humanas.js # guias de Humanas e Linguagens
    materias-extras.js  # tópicos extras de todas as matérias
    guias.js            # monta as telas dos guias
    tema.js             # botão de modo escuro
requirements.txt        # bibliotecas do Python
```

## Banco de dados

| Tabela | O que guarda |
|---|---|
| `login` | Contas (nome, e-mail e hash da senha) |
| `deveres` | Tarefas da lista "Minhas tarefas" |
| `resultados_questoes` | Cada questão respondida no simulado (acertou ou não) |
| `flashcards_revisados` | Cada flashcard avaliado ("Sabia!" ou "Preciso revisar") |
| `recuperacao_senha` | Códigos temporários de "Esqueci minha senha" |

Todas as tabelas se ligam à tabela `login` pelo campo `usuario_id`. Quando uma conta é apagada, os dados dela são apagados junto.
