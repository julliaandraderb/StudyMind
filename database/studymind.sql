-- =====================================================
-- StudyMind · estrutura do banco de dados (MySQL 8)
--
-- Cria o banco "StudyMind" e todas as tabelas, sem nenhum dado.
-- Como usar:
--   MySQL Workbench: File → Open SQL Script → escolha este arquivo → clique no raio (⚡)
--   Terminal:        mysql -u root -p < database/studymind.sql
-- =====================================================

CREATE DATABASE IF NOT EXISTS StudyMind
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE StudyMind;

-- -----------------------------------------------------
-- Contas de usuário
-- "senha" guarda o hash da senha (nunca a senha em texto).
-- Contas criadas pelo login com Google também ficam aqui.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS login (
    id     INT          NOT NULL AUTO_INCREMENT,
    nome   VARCHAR(100) NULL,
    email  VARCHAR(100) NOT NULL,
    senha  VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- "Minhas tarefas" do menu lateral
-- Cada conta não pode ter duas tarefas com o mesmo nome.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS deveres (
    id          INT          NOT NULL AUTO_INCREMENT,
    usuario_id  INT          NULL,
    obrigacoes  VARCHAR(200) NOT NULL,
    concluida   TINYINT(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY tarefa_por_usuario (usuario_id, obrigacoes),
    CONSTRAINT fk_deveres_login
        FOREIGN KEY (usuario_id) REFERENCES login (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Cada questão respondida no simulado
-- Usada no desempenho, no progresso por matéria e no "Revisar hoje".
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS resultados_questoes (
    id             INT          NOT NULL AUTO_INCREMENT,
    usuario_id     INT          NOT NULL,
    materia        VARCHAR(100) NOT NULL,
    acertou        TINYINT(1)   NOT NULL,
    data_resposta  DATETIME     NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY usuario_id (usuario_id),
    CONSTRAINT fk_resultados_login
        FOREIGN KEY (usuario_id) REFERENCES login (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Cada flashcard avaliado ("Sabia!" ou "Preciso revisar")
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS flashcards_revisados (
    id            INT          NOT NULL AUTO_INCREMENT,
    usuario_id    INT          NOT NULL,
    cartao        VARCHAR(100) NOT NULL,
    materia       VARCHAR(50)  NOT NULL,
    sabia         TINYINT(1)   NOT NULL,
    data_revisao  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY usuario_id (usuario_id, data_revisao),
    CONSTRAINT fk_flashcards_login
        FOREIGN KEY (usuario_id) REFERENCES login (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Códigos de "Esqueci minha senha" enviados por e-mail
-- "codigo" guarda o hash do código; ele expira e só pode ser usado uma vez.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS recuperacao_senha (
    id          INT          NOT NULL AUTO_INCREMENT,
    usuario_id  INT          NOT NULL,
    codigo      VARCHAR(255) NOT NULL,
    expiracao   DATETIME     NOT NULL,
    usado       TINYINT(1)   NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY usuario_id (usuario_id),
    CONSTRAINT fk_recuperacao_login
        FOREIGN KEY (usuario_id) REFERENCES login (id) ON DELETE CASCADE
) ENGINE=InnoDB;
