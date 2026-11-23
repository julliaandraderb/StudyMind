from datetime import datetime, timedelta
import os
import json
import urllib.request
import urllib.error
import urllib.parse
import secrets
import smtplib
from email.message import EmailMessage

from flask import Flask, request, session, jsonify, send_from_directory, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.middleware.proxy_fix import ProxyFix
import pymysql

app = Flask(__name__)

# Quando o site é aberto pelo link público (Cloudflare Tunnel), o túnel avisa que o
# endereço original era https://...trycloudflare.com. O ProxyFix faz o Flask usar esse endereço
# (importante para o retorno do login com Google).
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)


# Faz o navegador sempre pegar a versão mais nova das páginas, scripts e estilos
# (sem isso, depois de uma mudança ele pode continuar mostrando a tela antiga)
@app.after_request
def sem_cache(resposta):
    if resposta.mimetype == "text/html":
        # Páginas não ficam guardadas: a setinha de voltar/avançar sempre pergunta ao servidor
        # (assim o sistema não aparece de novo depois de voltar para o login)
        resposta.headers["Cache-Control"] = "no-store"
    elif resposta.mimetype in ("text/css", "text/javascript", "application/javascript"):
        resposta.headers["Cache-Control"] = "no-cache"
    return resposta



# ==============================
# CAMINHOS DAS PASTAS
# ==============================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# ==============================
# ARQUIVO .env (SENHA DO BANCO)
# ==============================
# Lê linhas "NOME=valor" de backend/.env e coloca nas variáveis de ambiente.
# Uma variável já definida no Windows tem prioridade sobre o arquivo.

def carregar_env():
    caminho = os.path.join(BASE_DIR, ".env")

    if not os.path.exists(caminho):
        return

    with open(caminho, encoding="utf-8") as arquivo:
        for linha in arquivo:
            linha = linha.strip()
            if not linha or linha.startswith("#") or "=" not in linha:
                continue
            nome, valor = linha.split("=", 1)
            os.environ.setdefault(nome.strip(), valor.strip().strip('"').strip("'"))

carregar_env()

# Chave que assina a sessão do login: vem do .env para não ficar exposta no git
app.secret_key = os.getenv("SECRET_KEY") or "chave-de-desenvolvimento-troque-no-env"

FRONTEND_DIR = os.path.join(BASE_DIR, "..", "frontend")

HTML_DIR = os.path.join(FRONTEND_DIR, "html")


# ==============================
# CONEXÃO COM O BANCO
# ==============================

if os.getenv("DB_PASSWORD") in (None, "", "COLOQUE_SUA_SENHA_AQUI"):
    print("AVISO: coloque a senha do MySQL no arquivo backend/.env (linha DB_PASSWORD=...).")


@app.errorhandler(pymysql.err.OperationalError)
def erro_banco(erro):
    # Ex.: senha errada (1045) ou MySQL desligado (2003): responde em JSON para a tela mostrar a mensagem
    print("ERRO NO BANCO:", erro)
    return jsonify({
        "sucesso": False,
        "mensagem": "Não foi possível conectar ao banco de dados. Verifique a DB_PASSWORD e se o MySQL está rodando."
    }), 500


def conectar_banco():

    return pymysql.connect(
        host="localhost",
        user="root",
        password=os.getenv("DB_PASSWORD"),
        database="StudyMind"
    )


# ==============================
# SESSÃO SÓ VALE SE A CONTA EXISTIR
# ==============================
# O login fica guardado num cookie com o número da conta. Se a conta for apagada
# do banco, esse cookie não pode continuar dando acesso: a sessão é encerrada.

@app.before_request
def conferir_conta_da_sessao():
    usuario_id = session.get("usuario_id")
    # Arquivos de estilo, script e imagem não precisam dessa conferência
    if not usuario_id or request.endpoint == "arquivos":
        return

    conn = conectar_banco()
    cursor = conn.cursor()
    cursor.execute("SELECT 1 FROM login WHERE id = %s", (usuario_id,))
    existe = cursor.fetchone() is not None
    cursor.close()
    conn.close()

    if not existe:
        session.clear()
        if request.path == "/sistema":
            return redirect("/")


# ==============================
# PÁGINA INICIAL
# ==============================

@app.route("/")
def inicio():
    # Voltar para a tela de login encerra a sessão: para entrar de novo, precisa fazer login
    session.clear()

    return send_from_directory(
        HTML_DIR,
        "login.html"
    )


# ==============================
# LOGIN
# ==============================

def senha_em_hash(valor):
    # Hashes do werkzeug começam com o nome do método (ex.: "scrypt:..." ou "pbkdf2:...")
    return isinstance(valor, str) and valor.startswith(("scrypt:", "pbkdf2:"))


@app.route("/login", methods=["POST"])
def login():

    dados = request.get_json(silent=True) or {}

    email = (dados.get("email") or "").strip()
    senha = dados.get("senha") or ""

    conn = conectar_banco()

    cursor = conn.cursor()

    cursor.execute("SELECT id, senha, nome FROM login WHERE email=%s", (email,))
    usuario = cursor.fetchone()
    usuario_id = None
    nome_salvo = None

    if usuario and senha:
        usuario_id, senha_salva, nome_salvo = usuario
        if senha_em_hash(senha_salva):
            if not check_password_hash(senha_salva, senha):
                usuario_id = None
        elif senha_salva == senha:
            # Conta antiga com senha em texto puro: confere e já troca por hash
            cursor.execute("UPDATE login SET senha=%s WHERE id=%s", (generate_password_hash(senha), usuario_id))
            conn.commit()
        else:
            usuario_id = None

    cursor.close()
    conn.close()

    if usuario_id:

        session["usuario_id"] = usuario_id

        return jsonify({
            "sucesso": True,
            "mensagem": "Login realizado com sucesso!",
            # Conta sem nome na coluna "nome": a tela de login pergunta antes de entrar
            "precisa_nome": not (nome_salvo or "").strip()
        })

    return jsonify({
        "sucesso": False,
        "mensagem": "Email ou senha incorretos!"
    }), 401


# ==============================
# PÁGINA DO SISTEMA
# ==============================

@app.route("/sistema")
def sistema():
    # Sem login, não entra no sistema: volta para a tela de login
    if not session.get("usuario_id"):
        return redirect("/")

    return send_from_directory(
        HTML_DIR,
        "sistema.html",
    )

@app.route("/cadastro")
def cadastro():

    return send_from_directory(
        HTML_DIR,
        "cadastro.html"
    )


# ==============================
# CADASTRO (salva na tabela login)
# ==============================

@app.route("/cadastro", methods=["POST"])
def cadastrar():
    dados = request.get_json() or {}

    nome = " ".join((dados.get("nome") or "").split())
    email = (dados.get("email") or "").strip().lower()
    senha = dados.get("senha") or ""
    confirmacao = dados.get("confirmacao") or ""

    if not nome:
        return jsonify({"sucesso": False, "mensagem": "Digite seu nome!"}), 400

    if len(nome) > 100:
        return jsonify({"sucesso": False, "mensagem": "O nome pode ter no máximo 100 caracteres."}), 400

    if not email or not senha:
        return jsonify({"sucesso": False, "mensagem": "Preencha o email e a senha!"}), 400

    if "@" not in email or "." not in email.split("@")[-1]:
        return jsonify({"sucesso": False, "mensagem": "Digite um email válido!"}), 400

    # A coluna email da tabela login aceita até 100 caracteres
    if len(email) > 100:
        return jsonify({"sucesso": False, "mensagem": "Esse email é longo demais."}), 400

    if len(senha) < 6:
        return jsonify({"sucesso": False, "mensagem": "A senha precisa ter pelo menos 6 caracteres."}), 400

    if senha != confirmacao:
        return jsonify({"sucesso": False, "mensagem": "As senhas não são iguais."}), 400

    conn = conectar_banco()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT id FROM login WHERE LOWER(email) = %s", (email,))
        if cursor.fetchone():
            return jsonify({
                "sucesso": False,
                "mensagem": "Esse email já está cadastrado. Faça login ou use \"Esqueceu sua senha?\"."
            }), 409

        # A senha é salva embaralhada (hash): nem quem abre o banco consegue ler
        cursor.execute(
            "INSERT INTO login (nome, email, senha) VALUES (%s, %s, %s)",
            (nome, email, generate_password_hash(senha))
        )
        conn.commit()
        usuario_id = cursor.lastrowid

    except pymysql.err.IntegrityError:
        # Dois cadastros ao mesmo tempo com o mesmo email (a coluna email é UNIQUE)
        return jsonify({"sucesso": False, "mensagem": "Esse email já está cadastrado."}), 409
    finally:
        cursor.close()
        conn.close()

    # Já deixa a pessoa logada depois de criar a conta
    session["usuario_id"] = usuario_id

    return jsonify({"sucesso": True, "mensagem": "Conta criada com sucesso!"}), 201


# ==============================
# CSS, JS E IMAGENS
# ==============================

@app.route("/<path:arquivo>")
def arquivos(arquivo):

    return send_from_directory(
        FRONTEND_DIR,
        arquivo
    )

# ==============================
# DEVERES (MINHAS TAREFAS)
# ==============================

@app.route("/deveres", methods=["GET"])
def listar_deveres():
    if not session.get("usuario_id"):
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    conn = conectar_banco()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, obrigacoes, concluida FROM deveres WHERE usuario_id = %s ORDER BY id",
        (session["usuario_id"],)
    )
    deveres = cursor.fetchall()

    cursor.close()
    conn.close()

    deveres_lista = [
        {
            "id": dever[0],
            "obrigacoes": dever[1],
            "concluida": bool(dever[2])
        }
        for dever in deveres
    ]

    return jsonify({"sucesso": True, "deveres": deveres_lista})

@app.route("/deveres", methods=["POST"])
def adicionar_dever():
    if not session.get("usuario_id"):
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    dados = request.get_json()
    obrigacoes = (dados.get("obrigacoes") or "").strip()

    if not obrigacoes:
        return jsonify({"sucesso": False, "mensagem": "Digite o nome da tarefa!"}), 400

    if len(obrigacoes) > 200:
        return jsonify({"sucesso": False, "mensagem": "A tarefa pode ter no máximo 200 caracteres!"}), 400

    conn = conectar_banco()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO deveres (usuario_id, obrigacoes) VALUES (%s, %s)",
            (session["usuario_id"], obrigacoes)
        )
        conn.commit()
        novo_id = cursor.lastrowid
    except pymysql.err.IntegrityError:
        # Cada conta não pode ter duas tarefas com o mesmo nome
        return jsonify({"sucesso": False, "mensagem": "Essa tarefa já existe!"}), 409
    finally:
        cursor.close()
        conn.close()

    return jsonify({
        "sucesso": True,
        "dever": {"id": novo_id, "obrigacoes": obrigacoes, "concluida": False}
    })

@app.route("/deveres/<int:dever_id>", methods=["PUT"])
def concluir_dever(dever_id):
    if not session.get("usuario_id"):
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    dados = request.get_json()
    concluida = bool(dados.get("concluida"))

    conn = conectar_banco()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE deveres SET concluida = %s WHERE id = %s AND usuario_id = %s",
        (concluida, dever_id, session["usuario_id"])
    )
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"sucesso": True, "mensagem": "Tarefa atualizada!"})

@app.route("/deveres/<int:dever_id>", methods=["DELETE"])
def remover_dever(dever_id):
    if not session.get("usuario_id"):
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    conn = conectar_banco()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM deveres WHERE id = %s AND usuario_id = %s", (dever_id, session["usuario_id"]))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"sucesso": True, "mensagem": "Tarefa removida!"})

@app.route("/registrar-resposta", methods=["POST"])
def registrar_resposta():
    usuario_id = session.get("usuario_id")

    dados = request.get_json()

    materia = dados.get("materia")
    acertou = dados.get("acertou")

    if not usuario_id:
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    if not materia or acertou is None:
        return jsonify({"sucesso": False, "mensagem": "Dados não enviados!"}), 400
    conn = conectar_banco()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO resultados_questoes (usuario_id, materia, acertou) VALUES (%s, %s, %s)",
        (usuario_id, materia, acertou)
    )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({
        "sucesso": True,
        "mensagem": "Resposta registrada com sucesso!"
    })

@app.route("/progresso", methods=["GET"])
def progresso():
    usuario_id = session.get("usuario_id")

    if not usuario_id:
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    conn = conectar_banco()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT materia, COUNT(*) AS total, SUM(acertou = 1) AS acertos "
        "FROM resultados_questoes "
        "WHERE usuario_id = %s "
        "AND data_resposta >= NOW() - INTERVAL 7 DAY "
        "GROUP BY materia",
        (usuario_id,)
    )

    resultados = cursor.fetchall()
    total_geral = 0
    acertos_geral = 0

    progresso_lista = []

    for resultado in resultados:
        materia, total, acertos = resultado
        # SUM() vem como Decimal do pymysql, e o jsonify transforma Decimal em texto
        total = int(total)
        acertos = int(acertos or 0)
        porcentagem = (acertos / total) * 100 if total > 0 else 0
        total_geral += total
        acertos_geral += acertos
        progresso_lista.append({
            "materia": materia,
            "total": total,
            "acertos": acertos,
            "porcentagem": porcentagem
        })

    desempenho_geral = (
            (acertos_geral / total_geral) * 100
            if total_geral > 0 else 0
        )

    # Média do dia: média do progresso de cada matéria respondida hoje
    cursor.execute(
        "SELECT materia, COUNT(*) AS total, SUM(acertou = 1) AS acertos "
        "FROM resultados_questoes "
        "WHERE usuario_id = %s "
        "AND DATE(data_resposta) = CURDATE() "
        "GROUP BY materia",
        (usuario_id,)
    )

    porcentagens_hoje = [
        (int(acertos or 0) / int(total)) * 100
        for materia, total, acertos in cursor.fetchall()
        if total > 0
    ]

    media_dia = (
            sum(porcentagens_hoje) / len(porcentagens_hoje)
            if porcentagens_hoje else 0
        )

    cursor.close()
    conn.close()

    return jsonify({
        "sucesso": True,
        "resultados": progresso_lista,
        "desempenho_geral": desempenho_geral,
        "media_dia": media_dia,
        "materias_hoje": len(porcentagens_hoje)
    })


# ==============================
# ATUALIZAÇÕES DO BANCO
# ==============================
# Roda ao ligar o servidor. Cada passo só é feito uma vez (se ainda não existir).

def coluna_existe(cursor, tabela, coluna):
    cursor.execute(f"SHOW COLUMNS FROM {tabela} LIKE %s", (coluna,))
    return cursor.fetchone() is not None


def indice_existe(cursor, tabela, indice):
    cursor.execute(f"SHOW INDEX FROM {tabela} WHERE Key_name = %s", (indice,))
    return cursor.fetchone() is not None


def atualizar_banco():
    try:
        conn = conectar_banco()
        cursor = conn.cursor()

        # Nome da pessoa (aparece no "Boa noite, ...")
        if not coluna_existe(cursor, "login", "nome"):
            cursor.execute("ALTER TABLE login ADD COLUMN nome VARCHAR(100) NULL AFTER id")

        # Cada tarefa de "Minhas tarefas" pertence a uma conta
        if not coluna_existe(cursor, "deveres", "usuario_id"):
            cursor.execute("ALTER TABLE deveres ADD COLUMN usuario_id INT NULL AFTER id")
        # O nome da tarefa era único no site todo; agora é único só dentro de cada conta
        if indice_existe(cursor, "deveres", "obrigacoes"):
            cursor.execute("ALTER TABLE deveres DROP INDEX obrigacoes")
        if not indice_existe(cursor, "deveres", "tarefa_por_usuario"):
            cursor.execute("ALTER TABLE deveres ADD UNIQUE INDEX tarefa_por_usuario (usuario_id, obrigacoes)")

        conn.commit()
        cursor.close()
        conn.close()
    except pymysql.err.MySQLError as erro:
        print("AVISO: não foi possível atualizar o banco:", erro)


atualizar_banco()


def nome_do_email(email):
    # Sem nome cadastrado: usa o começo do e-mail ("maria.silva@..." vira "Maria")
    parte = email.split("@")[0].replace(".", " ").replace("_", " ").replace("-", " ")
    letras = "".join(ch for ch in parte.split()[0] if ch.isalpha()) if parte.split() else ""
    return letras.capitalize() or "Estudante"


@app.route("/usuario/nome", methods=["POST"])
def salvar_nome():
    # Grava o nome da pessoa logada na coluna "nome" da tabela login
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    dados = request.get_json(silent=True) or {}
    nome = " ".join((dados.get("nome") or "").split())

    if not nome:
        return jsonify({"sucesso": False, "mensagem": "Digite seu nome!"}), 400
    if len(nome) > 100:
        return jsonify({"sucesso": False, "mensagem": "O nome pode ter no máximo 100 caracteres."}), 400

    conn = conectar_banco()
    cursor = conn.cursor()
    cursor.execute("UPDATE login SET nome = %s WHERE id = %s", (nome, usuario_id))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"sucesso": True, "mensagem": f"Prazer, {nome.split()[0]}! Entrando..."})


@app.route("/usuario", methods=["GET"])
def usuario_logado():
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    conn = conectar_banco()
    cursor = conn.cursor()
    cursor.execute("SELECT nome, email FROM login WHERE id = %s", (usuario_id,))
    linha = cursor.fetchone()
    cursor.close()
    conn.close()

    if not linha:
        session.clear()
        return jsonify({"sucesso": False, "mensagem": "Conta não encontrada."}), 401

    nome, email = linha
    nome = (nome or "").strip() or nome_do_email(email)
    return jsonify({"sucesso": True, "id": usuario_id, "nome": nome, "primeiro_nome": nome.split()[0]})


# ==============================
# DASHBOARD INTELIGENTE
# ==============================
# Os cartões do topo do painel são calculados com o histórico real de cada pessoa.

META_QUESTOES_DIA = 30          # meta diária de questões
LIMITE_TOPICO_FRACO = 60        # abaixo de 60% de acerto, a matéria vira "tópico fraco"
MINIMO_PARA_AVALIAR = 3         # precisa de pelo menos 3 questões para julgar uma matéria


def criar_tabela_flashcards():
    # Cria a tabela dos flashcards revisados, se ainda não existir
    try:
        conn = conectar_banco()
        cursor = conn.cursor()
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS flashcards_revisados ("
            " id INT AUTO_INCREMENT PRIMARY KEY,"
            " usuario_id INT NOT NULL,"
            " cartao VARCHAR(100) NOT NULL,"
            " materia VARCHAR(50) NOT NULL,"
            " sabia TINYINT(1) NOT NULL,"
            " data_revisao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"
            " INDEX (usuario_id, data_revisao)"
            ")"
        )
        conn.commit()
        cursor.close()
        conn.close()
    except pymysql.err.MySQLError as erro:
        print("AVISO: não foi possível criar a tabela flashcards_revisados:", erro)


criar_tabela_flashcards()


def porcentagem(acertos, total):
    return round((acertos / total) * 100, 1) if total else 0


def calcular_sequencias(dias_estudados):
    # Sequência atual: dias seguidos com estudo até hoje (ou até ontem, se hoje ainda não estudou)
    hoje = datetime.now().date()
    dia = hoje if hoje in dias_estudados else hoje - timedelta(days=1)
    atual = 0
    while dia in dias_estudados:
        atual += 1
        dia -= timedelta(days=1)

    # Recorde: maior sequência de dias seguidos de todo o histórico
    recorde = 0
    seguidos = 0
    anterior = None
    for dia in sorted(dias_estudados):
        seguidos = seguidos + 1 if anterior and dia - anterior == timedelta(days=1) else 1
        recorde = max(recorde, seguidos)
        anterior = dia

    return atual, max(recorde, atual), hoje in dias_estudados


@app.route("/registrar-flashcard", methods=["POST"])
def registrar_flashcard():
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    dados = request.get_json(silent=True) or {}
    cartao = str(dados.get("cartao", "")).strip()[:100]
    materia = str(dados.get("materia", "")).strip()[:50]
    sabia = dados.get("sabia")

    if not cartao or not materia or sabia is None:
        return jsonify({"sucesso": False, "mensagem": "Dados não enviados!"}), 400

    conn = conectar_banco()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO flashcards_revisados (usuario_id, cartao, materia, sabia) VALUES (%s, %s, %s, %s)",
        (usuario_id, cartao, materia, bool(sabia))
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"sucesso": True})


@app.route("/dashboard", methods=["GET"])
def dashboard():
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    conn = conectar_banco()
    cursor = conn.cursor()

    def contar(sql):
        cursor.execute(sql, (usuario_id,))
        total, acertos = cursor.fetchone()
        return int(total or 0), int(acertos or 0)

    # Desempenho: últimos 7 dias comparado com os 7 dias anteriores
    total_semana, acertos_semana = contar(
        "SELECT COUNT(*), SUM(acertou = 1) FROM resultados_questoes "
        "WHERE usuario_id = %s AND data_resposta >= NOW() - INTERVAL 7 DAY"
    )
    total_antes, acertos_antes = contar(
        "SELECT COUNT(*), SUM(acertou = 1) FROM resultados_questoes "
        "WHERE usuario_id = %s AND data_resposta >= NOW() - INTERVAL 14 DAY "
        "AND data_resposta < NOW() - INTERVAL 7 DAY"
    )
    desempenho = porcentagem(acertos_semana, total_semana)
    variacao = (
        round(desempenho - porcentagem(acertos_antes, total_antes), 1)
        if total_semana and total_antes else None
    )

    # Questões e flashcards de hoje
    questoes_hoje, acertos_hoje = contar(
        "SELECT COUNT(*), SUM(acertou = 1) FROM resultados_questoes "
        "WHERE usuario_id = %s AND DATE(data_resposta) = CURDATE()"
    )
    flashcards_hoje, flashcards_sabia = contar(
        "SELECT COUNT(DISTINCT cartao), COUNT(DISTINCT CASE WHEN sabia = 1 THEN cartao END) "
        "FROM flashcards_revisados WHERE usuario_id = %s AND DATE(data_revisao) = CURDATE()"
    )

    # Dias em que a pessoa estudou (respondeu questão ou revisou flashcard)
    cursor.execute(
        "SELECT DISTINCT DATE(data_resposta) FROM resultados_questoes WHERE usuario_id = %s "
        "UNION SELECT DISTINCT DATE(data_revisao) FROM flashcards_revisados WHERE usuario_id = %s",
        (usuario_id, usuario_id)
    )
    dias_estudados = {linha[0] for linha in cursor.fetchall() if linha[0]}
    sequencia, recorde, estudou_hoje = calcular_sequencias(dias_estudados)

    # "Revisar hoje": matérias com algum erro de ontem para cá
    # (questão errada no simulado ou flashcard marcado como "Preciso revisar")
    erros_recentes = {}
    cursor.execute(
        "SELECT materia, COUNT(*) FROM resultados_questoes "
        "WHERE usuario_id = %s AND acertou = 0 AND data_resposta >= CURDATE() - INTERVAL 1 DAY "
        "GROUP BY materia",
        (usuario_id,)
    )
    for materia, quantidade in cursor.fetchall():
        erros_recentes[materia] = {"materia": materia, "questoes": int(quantidade), "flashcards": 0}

    cursor.execute(
        "SELECT f.materia, COUNT(*) FROM flashcards_revisados f "
        "JOIN (SELECT cartao, MAX(id) AS ultimo FROM flashcards_revisados "
        "      WHERE usuario_id = %s GROUP BY cartao) u ON f.id = u.ultimo "
        "WHERE f.sabia = 0 AND f.data_revisao >= CURDATE() - INTERVAL 1 DAY "
        "GROUP BY f.materia",
        (usuario_id,)
    )
    for materia, quantidade in cursor.fetchall():
        item = erros_recentes.setdefault(materia, {"materia": materia, "questoes": 0, "flashcards": 0})
        item["flashcards"] = int(quantidade)

    # Desempenho por matéria nos últimos 14 dias + acerto nas últimas 10 questões de cada uma
    cursor.execute(
        "SELECT materia, COUNT(*), SUM(acertou = 1) FROM resultados_questoes "
        "WHERE usuario_id = %s AND data_resposta >= NOW() - INTERVAL 14 DAY "
        "GROUP BY materia",
        (usuario_id,)
    )
    materias = []
    for materia, total, acertos in cursor.fetchall():
        total, acertos = int(total), int(acertos or 0)
        cursor.execute(
            "SELECT acertou FROM resultados_questoes WHERE usuario_id = %s AND materia = %s "
            "ORDER BY data_resposta DESC, id DESC LIMIT 10",
            (usuario_id, materia)
        )
        ultimas = [linha[0] for linha in cursor.fetchall()]
        materias.append({
            "materia": materia,
            "total": total,
            "porcentagem": porcentagem(acertos, total),
            "ultimas_total": len(ultimas),
            "ultimas_porcentagem": porcentagem(sum(1 for a in ultimas if a), len(ultimas))
        })

    cursor.close()
    conn.close()

    fracas = sorted(
        (m for m in materias
         if m["total"] >= MINIMO_PARA_AVALIAR and m["porcentagem"] < LIMITE_TOPICO_FRACO),
        key=lambda m: m["porcentagem"]
    )

    return jsonify({
        "sucesso": True,
        "desempenho": {"porcentagem": desempenho, "variacao": variacao, "total": total_semana},
        "questoes_hoje": {"total": questoes_hoje, "acertos": acertos_hoje, "meta": META_QUESTOES_DIA},
        "flashcards_hoje": {"total": flashcards_hoje, "sabia": flashcards_sabia},
        "sequencia": {"atual": sequencia, "recorde": recorde, "estudou_hoje": estudou_hoje},
        "materias": materias,
        "fracas": fracas,
        "revisar_hoje": sorted(erros_recentes.values(), key=lambda m: -(m["questoes"] + m["flashcards"]))
    })

# ==============================
# CHAT COM IA (GROQ OU OLLAMA)
# ==============================
# Se GROQ_API_KEY estiver no .env, o chat usa a Groq (na nuvem: rápida e mais precisa).
# Sem a chave, usa o Ollama instalado no computador (lento e erra mais).

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip()
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")

PROMPT_SISTEMA = (
    "Você é o StudyMind AI, um professor que ajuda estudantes a aprender. "
    "Responda sempre em português do Brasil, de forma clara, didática e objetiva, "
    "com exemplos quando ajudar. Se pedirem um plano de estudos, organize por dias. "
    "Precisão é mais importante que estilo: use apenas conceitos corretos dos livros didáticos "
    "do ensino médio, escreva fórmulas e equações químicas completas e confira os produtos "
    "e unidades antes de responder. Se não tiver certeza de algo, diga que não tem certeza "
    "em vez de inventar. "
    "Explique no nível do ensino médio brasileiro, seguindo o conteúdo do ensino médio "
    "(nada de conteúdo de faculdade, como cálculo ou equações de Maxwell na forma diferencial). "
    "Siga a divisão de temas do ensino médio: por exemplo, em Física, eletrostática, eletrodinâmica "
    "(corrente, resistores, geradores, potência e circuitos) e eletromagnetismo são assuntos separados; "
    "responda só sobre o tema que foi pedido. "
    "Formatação: pode usar **negrito** para termos importantes e listas com linhas começando com \"- \". "
    "Fórmulas simples podem ir em texto (U = R · i). Frações e fórmulas maiores podem ser escritas "
    "em LaTeX entre \\( \\) ou \\[ \\] (o site desenha as fórmulas). Não use $ sozinho para fórmulas. "
    "Seja conciso: responda em no máximo uns 3 parágrafos curtos (cerca de 200 palavras), "
    "indo direto aos pontos principais. Se o aluno quiser mais detalhes, ele vai pedir."
)

# Temperatura baixa deixa o modelo menos "criativo" e mais fiel aos fatos
TEMPERATURA = 0.2
MAX_TOKENS_RESPOSTA = 2000

# Quantas mensagens anteriores da conversa enviamos para a IA.
# Conversas longas deixam cada resposta mais lenta, então mandamos só as últimas.
MAX_MENSAGENS_HISTORICO = 6

MSG_DEMOROU = "A IA demorou demais para responder. Tente de novo."


def perguntar_groq(mensagens):
    corpo = json.dumps({
        "model": GROQ_MODEL,
        "messages": mensagens,
        "temperature": TEMPERATURA,
        "max_tokens": MAX_TOKENS_RESPOSTA,
        # O gpt-oss "pensa" antes de responder; "low" deixa a resposta mais rápida
        "reasoning_effort": "low"
    }).encode("utf-8")

    requisicao = urllib.request.Request(GROQ_URL, data=corpo, headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer " + GROQ_API_KEY,
        # A Groq bloqueia o "User-Agent" padrão do Python, então mandamos um próprio
        "User-Agent": "StudyMind/1.0"
    })

    with urllib.request.urlopen(requisicao, timeout=60) as resposta:
        resultado = json.loads(resposta.read().decode("utf-8"))
    return resultado["choices"][0]["message"]["content"]


def perguntar_ollama(mensagens):
    corpo = json.dumps({
        "model": OLLAMA_MODEL,
        "messages": mensagens,
        "options": {"temperature": TEMPERATURA, "num_predict": 700, "num_ctx": 4096},
        # Mantém o modelo carregado na memória por 30 min para não recarregar a cada pergunta
        "keep_alive": "30m",
        "stream": False
    }).encode("utf-8")

    requisicao = urllib.request.Request(
        OLLAMA_URL + "/api/chat",
        data=corpo,
        headers={"Content-Type": "application/json"}
    )

    # O modelo local roda no processador e pode demorar alguns minutos
    with urllib.request.urlopen(requisicao, timeout=600) as resposta:
        resultado = json.loads(resposta.read().decode("utf-8"))
    return resultado["message"]["content"]


@app.route("/chat", methods=["POST"])
def chat():
    usuario_id = session.get("usuario_id")

    if not usuario_id:
        return jsonify({"sucesso": False, "mensagem": "Faça login primeiro!"}), 401

    dados = request.get_json()
    historico = dados.get("mensagens", [])

    if not historico:
        return jsonify({"sucesso": False, "mensagem": "Mensagem não enviada!"}), 400

    mensagens = [{"role": "system", "content": PROMPT_SISTEMA}] + historico[-MAX_MENSAGENS_HISTORICO:]
    nome_ia = "Groq" if GROQ_API_KEY else "Ollama"

    try:
        if GROQ_API_KEY:
            texto = perguntar_groq(mensagens)
        else:
            texto = perguntar_ollama(mensagens)
    except urllib.error.HTTPError as erro:
        detalhe = erro.read().decode("utf-8", errors="replace")
        print(f"Erro do {nome_ia} ({erro.code}): {detalhe}")

        if erro.code == 401:
            mensagem = "A chave da Groq (GROQ_API_KEY) é inválida. Confira o arquivo .env."
        elif erro.code == 429:
            mensagem = "Muitas perguntas seguidas. Espere um minutinho e tente de novo."
        else:
            mensagem = f"Erro do {nome_ia}: {detalhe}"
        return jsonify({"sucesso": False, "mensagem": mensagem}), 502
    except TimeoutError:
        return jsonify({"sucesso": False, "mensagem": MSG_DEMOROU}), 504
    except urllib.error.URLError as erro:
        if isinstance(erro.reason, TimeoutError):
            return jsonify({"sucesso": False, "mensagem": MSG_DEMOROU}), 504
        if GROQ_API_KEY:
            mensagem = "Não foi possível conectar à Groq. Verifique sua internet."
        else:
            mensagem = "Não foi possível conectar ao Ollama. Ele está aberto?"
        return jsonify({"sucesso": False, "mensagem": mensagem}), 503

    return jsonify({"sucesso": True, "resposta": texto})

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"sucesso": True, "mensagem": "Logout realizado com sucesso!"})

# ==============================
# RECUPERAÇÃO DE SENHA POR E-MAIL
# ==============================
# 1) /solicitar-recuperacao: gera um código de 6 dígitos e envia para o e-mail
# 2) /redefinir-senha: confere o código e troca a senha
# O código é guardado como hash na tabela recuperacao_senha (nunca o código puro).

SMTP_SERVIDOR = os.getenv("SMTP_SERVIDOR", "smtp.gmail.com")
SMTP_PORTA = int(os.getenv("SMTP_PORTA", "587"))
SMTP_USUARIO = os.getenv("SMTP_USUARIO", "").strip()
# A senha de app do Google aparece com espaços ("abcd efgh ..."); tiramos os espaços
SMTP_SENHA = os.getenv("SMTP_SENHA", "").replace(" ", "")

MINUTOS_VALIDADE_CODIGO = 10
SEGUNDOS_ENTRE_ENVIOS = 60
MAX_TENTATIVAS_CODIGO = 5

# Tentativas erradas de cada código (id da linha em recuperacao_senha -> quantidade)
tentativas_codigo = {}


def enviar_email_codigo(destinatario, codigo):
    mensagem = EmailMessage()
    mensagem["Subject"] = f"{codigo} é o seu código do StudyMind"
    mensagem["From"] = f"StudyMind <{SMTP_USUARIO}>"
    mensagem["To"] = destinatario

    mensagem.set_content(
        f"Olá!\n\n"
        f"Seu código para redefinir a senha do StudyMind é: {codigo}\n\n"
        f"Ele vale por {MINUTOS_VALIDADE_CODIGO} minutos.\n"
        f"Se você não pediu para trocar a senha, ignore este e-mail.\n"
    )
    mensagem.add_alternative(f"""
        <div style="font-family: Arial, sans-serif; max-width: 420px; margin: auto; color: #2d1b4e;">
            <h2 style="color: #6c5ce7;">StudyMind</h2>
            <p>Seu código para redefinir a senha é:</p>
            <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; background: #f3ecfb;
                      padding: 16px; text-align: center; border-radius: 12px;">{codigo}</p>
            <p>Ele vale por <strong>{MINUTOS_VALIDADE_CODIGO} minutos</strong>.</p>
            <p style="color: #6b5a7a; font-size: 13px;">Se você não pediu para trocar a senha, ignore este e-mail.</p>
        </div>
    """, subtype="html")

    with smtplib.SMTP(SMTP_SERVIDOR, SMTP_PORTA, timeout=20) as servidor:
        servidor.starttls()
        servidor.login(SMTP_USUARIO, SMTP_SENHA)
        servidor.send_message(mensagem)


@app.route("/solicitar-recuperacao", methods=["POST"])
def solicitar_recuperacao():
    dados = request.get_json() or {}
    email = (dados.get("email") or "").strip()

    # Confere o e-mail antes de ir ao banco
    if not email:
        return jsonify({"sucesso": False, "mensagem": "Email não fornecido!"}), 400

    if not SMTP_USUARIO or not SMTP_SENHA:
        print("AVISO: preencha SMTP_USUARIO e SMTP_SENHA no backend/.env para enviar e-mails.")
        return jsonify({
            "sucesso": False,
            "mensagem": "O envio de e-mails ainda não foi configurado no servidor."
        }), 503

    conexao = conectar_banco()
    cursor = conexao.cursor()

    try:
        cursor.execute("SELECT id FROM login WHERE email = %s", (email,))
        usuario = cursor.fetchone()

        if not usuario:
            return jsonify({"sucesso": False, "mensagem": "Email não encontrado!"}), 404

        agora = datetime.now()

        # Evita mandar vários e-mails seguidos: espera 1 minuto entre um pedido e outro.
        # Um código criado há menos de 1 minuto ainda tem mais de (validade - 1 min) pela frente.
        limite = agora + timedelta(minutes=MINUTOS_VALIDADE_CODIGO, seconds=-SEGUNDOS_ENTRE_ENVIOS)
        cursor.execute(
            "SELECT id FROM recuperacao_senha WHERE usuario_id = %s AND usado = 0 AND expiracao > %s",
            (usuario[0], limite)
        )
        if cursor.fetchone():
            return jsonify({
                "sucesso": False,
                "mensagem": "Já enviamos um código agora há pouco. Espere 1 minuto para pedir outro."
            }), 429

        codigo = str(secrets.randbelow(900000) + 100000)
        expiracao = agora + timedelta(minutes=MINUTOS_VALIDADE_CODIGO)

        # Envia primeiro: se o e-mail falhar, não fica um código "fantasma" no banco
        enviar_email_codigo(email, codigo)

        # Códigos antigos deixam de valer: só o último enviado funciona
        cursor.execute(
            "UPDATE recuperacao_senha SET usado = 1 WHERE usuario_id = %s AND usado = 0",
            (usuario[0],)
        )
        cursor.execute(
            "INSERT INTO recuperacao_senha (usuario_id, codigo, expiracao) VALUES (%s, %s, %s)",
            (usuario[0], generate_password_hash(codigo), expiracao)
        )
        conexao.commit()

    except smtplib.SMTPAuthenticationError as erro:
        print("ERRO NO E-MAIL (usuário ou senha de app incorretos):", erro)
        return jsonify({
            "sucesso": False,
            "mensagem": "O servidor não conseguiu entrar na conta de e-mail. Confira SMTP_USUARIO e SMTP_SENHA."
        }), 502
    except (smtplib.SMTPException, OSError) as erro:
        print("ERRO AO ENVIAR E-MAIL:", erro)
        return jsonify({
            "sucesso": False,
            "mensagem": "Não foi possível enviar o e-mail agora. Tente de novo em instantes."
        }), 502
    finally:
        cursor.close()
        conexao.close()

    return jsonify({
        "sucesso": True,
        "mensagem": f"Enviamos um código para {email}. Confira também a caixa de spam."
    })


@app.route("/redefinir-senha", methods=["POST"])
def redefinir_senha():
    dados = request.get_json() or {}
    email = (dados.get("email") or "").strip()
    codigo = (dados.get("codigo") or "").strip()
    nova_senha = dados.get("nova_senha") or ""

    if not email or not codigo or not nova_senha:
        return jsonify({"sucesso": False, "mensagem": "Preencha o código e a nova senha!"}), 400

    if len(nova_senha) < 6:
        return jsonify({"sucesso": False, "mensagem": "A nova senha precisa ter pelo menos 6 caracteres."}), 400

    conexao = conectar_banco()
    cursor = conexao.cursor()

    try:
        # Pega o último código ainda válido desse usuário
        cursor.execute("""
            SELECT r.id, r.codigo, r.usuario_id
            FROM recuperacao_senha r
            JOIN login l ON l.id = r.usuario_id
            WHERE l.email = %s AND r.usado = 0 AND r.expiracao > %s
            ORDER BY r.id DESC
            LIMIT 1
        """, (email, datetime.now()))
        pedido = cursor.fetchone()

        if not pedido:
            return jsonify({
                "sucesso": False,
                "mensagem": "Código expirado ou inexistente. Peça um novo código."
            }), 400

        pedido_id, codigo_hash, usuario_id = pedido

        if not check_password_hash(codigo_hash, codigo):
            tentativas_codigo[pedido_id] = tentativas_codigo.get(pedido_id, 0) + 1

            # Depois de várias tentativas erradas, o código é cancelado
            if tentativas_codigo[pedido_id] >= MAX_TENTATIVAS_CODIGO:
                cursor.execute("UPDATE recuperacao_senha SET usado = 1 WHERE id = %s", (pedido_id,))
                conexao.commit()
                tentativas_codigo.pop(pedido_id, None)
                return jsonify({
                    "sucesso": False,
                    "mensagem": "Muitas tentativas erradas. Peça um novo código."
                }), 400

            restantes = MAX_TENTATIVAS_CODIGO - tentativas_codigo[pedido_id]
            return jsonify({
                "sucesso": False,
                "mensagem": f"Código incorreto. Você ainda tem {restantes} tentativa(s)."
            }), 400

        # A nova senha é salva embaralhada (hash)
        cursor.execute("UPDATE login SET senha = %s WHERE id = %s", (generate_password_hash(nova_senha), usuario_id))
        cursor.execute("UPDATE recuperacao_senha SET usado = 1 WHERE id = %s", (pedido_id,))
        conexao.commit()
        tentativas_codigo.pop(pedido_id, None)

    finally:
        cursor.close()
        conexao.close()

    return jsonify({"sucesso": True, "mensagem": "Senha alterada! Agora é só entrar com a nova senha."})


# ==============================
# LOGIN COM GOOGLE (OAuth 2.0)
# ==============================
# 1) /login/google manda o usuário para a tela de login do Google
# 2) O Google devolve para /login/google/callback com um código
# 3) Trocamos o código pelo e-mail da pessoa e fazemos o login
# Se o e-mail ainda não tem conta, a conta é criada na hora.

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "").strip()
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "").strip()


def endereco_retorno_google():
    # Precisa ser exatamente um dos endereços cadastrados no Google Cloud
    return request.host_url.rstrip("/") + "/login/google/callback"


def voltar_para_login(erro):
    return redirect("/?erro=" + urllib.parse.quote(erro))


@app.route("/login/google")
def login_google():
    if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
        print("AVISO: preencha GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET no backend/.env.")
        return voltar_para_login("google_nao_configurado")

    # "state" protege contra alguém forjar o retorno do Google
    estado = secrets.token_urlsafe(24)
    session["google_estado"] = estado
    # "Cadastrar com Google" (/login/google?modo=cadastro) pode criar conta nova;
    # "Entrar com Google" só entra em conta que já existe
    session["google_modo"] = "cadastro" if request.args.get("modo") == "cadastro" else "login"

    parametros = urllib.parse.urlencode({
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": endereco_retorno_google(),
        "response_type": "code",
        "scope": "openid email profile",
        "state": estado,
        "prompt": "select_account"
    })
    return redirect("https://accounts.google.com/o/oauth2/v2/auth?" + parametros)


@app.route("/login/google/callback")
def login_google_retorno():
    if request.args.get("error"):
        # Ex.: a pessoa clicou em "Cancelar" na tela do Google
        return voltar_para_login("google_cancelado")

    estado_esperado = session.pop("google_estado", None)
    modo = session.pop("google_modo", "login")
    if not estado_esperado or request.args.get("state") != estado_esperado:
        return voltar_para_login("google_falhou")

    codigo = request.args.get("code")
    if not codigo:
        return voltar_para_login("google_falhou")

    try:
        # Troca o código pelo token de acesso
        corpo = urllib.parse.urlencode({
            "code": codigo,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": endereco_retorno_google(),
            "grant_type": "authorization_code"
        }).encode("utf-8")
        requisicao = urllib.request.Request("https://oauth2.googleapis.com/token", data=corpo)
        with urllib.request.urlopen(requisicao, timeout=20) as resposta:
            token = json.loads(resposta.read().decode("utf-8"))

        # Pergunta ao Google qual é o e-mail da conta
        requisicao = urllib.request.Request(
            "https://openidconnect.googleapis.com/v1/userinfo",
            headers={"Authorization": "Bearer " + token["access_token"]}
        )
        with urllib.request.urlopen(requisicao, timeout=20) as resposta:
            perfil = json.loads(resposta.read().decode("utf-8"))

    except urllib.error.HTTPError as erro:
        print("ERRO NO LOGIN COM GOOGLE:", erro.code, erro.read().decode("utf-8", errors="replace"))
        return voltar_para_login("google_falhou")
    except (urllib.error.URLError, TimeoutError, KeyError) as erro:
        print("ERRO NO LOGIN COM GOOGLE:", erro)
        return voltar_para_login("google_falhou")

    email = (perfil.get("email") or "").strip().lower()
    if not email or not perfil.get("email_verified"):
        return voltar_para_login("google_sem_email")

    conexao = conectar_banco()
    cursor = conexao.cursor()

    try:
        nome_google = " ".join((perfil.get("given_name") or perfil.get("name") or "").split())[:100]

        cursor.execute("SELECT id, nome FROM login WHERE LOWER(email) = %s", (email,))
        usuario = cursor.fetchone()

        if not usuario and modo != "cadastro":
            # Clicou em "Entrar com Google" mas ainda não tem conta: precisa se cadastrar primeiro
            return voltar_para_login("google_sem_conta")

        if usuario:
            usuario_id = usuario[0]
            # Conta antiga sem nome: aproveita o nome que vem do Google
            if not usuario[1] and nome_google:
                cursor.execute("UPDATE login SET nome = %s WHERE id = %s", (nome_google, usuario_id))
                conexao.commit()
        else:
            # Conta nova: recebe uma senha aleatória que ninguém sabe.
            # Se a pessoa quiser entrar com senha depois, usa o "Esqueceu sua senha?".
            cursor.execute(
                "INSERT INTO login (nome, email, senha) VALUES (%s, %s, %s)",
                (nome_google or None, email, generate_password_hash(secrets.token_urlsafe(32)))
            )
            conexao.commit()
            usuario_id = cursor.lastrowid
    finally:
        cursor.close()
        conexao.close()

    session["usuario_id"] = usuario_id
    return redirect("/sistema")


if __name__ == "__main__":
    # O modo de depuração NUNCA deve ficar ligado com link público (deixa rodar comandos no PC).
    # Para ligar só no seu computador, coloque FLASK_DEBUG=1 no backend/.env.
    app.run(debug=os.getenv("FLASK_DEBUG") == "1")