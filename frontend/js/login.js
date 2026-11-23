const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const botaoEntrar = document.getElementById("botaoEntrar");

const recuperarSenha = document.getElementById("recuperarSenha");
const mensagemRecuperacao = document.getElementById("mensagemRecuperacao");
const botaoEnviarCodigo = document.getElementById("enviarCodigo");

const redefinirSenha = document.getElementById("redefinirSenha");
const nomeForm = document.getElementById("nomeForm");
const mensagemRedefinir = document.getElementById("mensagemRedefinir");
const botaoRedefinir = document.getElementById("botaoRedefinir");

// E-mail para o qual o código foi enviado (usado na etapa de trocar a senha)
let emailRecuperacao = "";

// Mostra uma mensagem de erro (vermelha) ou sucesso (verde) abaixo dos botões
function mostrarMensagem(elemento, texto, sucesso) {
    elemento.textContent = texto;
    elemento.classList.toggle("sucesso", Boolean(sucesso));
    elemento.classList.toggle("erro", !sucesso);
}

// Enquanto espera o servidor, trava o botão e mostra um ícone girando
function carregando(botao, ativo) {
    botao.disabled = ativo;
    botao.classList.toggle("carregando", ativo);
}

// Mostra só uma das telas: login, pedir código ou trocar senha
function mostrarTela(tela) {
    [loginForm, recuperarSenha, redefinirSenha, nomeForm].forEach(form => {
        if (form) form.hidden = form !== tela;
    });
}

async function enviarJson(url, dados) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
    const data = await response.json();
    return { ok: response.ok, data: data };
}

// ---------- LOGIN ----------
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    carregando(botaoEntrar, true);
    message.textContent = "";

    try {
        const resposta = await enviarJson("/login", { email: email, senha: senha });

        if (resposta.ok) {
            // Conta sem nome no banco: pergunta o nome antes de entrar
            if (resposta.data.precisa_nome && nomeForm) {
                carregando(botaoEntrar, false);
                mostrarTela(nomeForm);
                document.getElementById("nomeUsuario").focus();
                return;
            }
            mostrarMensagem(message, resposta.data.mensagem, true);
            window.location.href = "/sistema";
            return;
        }

        mostrarMensagem(message, resposta.data.mensagem, false);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(message, "Erro ao conectar com o servidor.", false);
    }

    carregando(botaoEntrar, false);
});

// ---------- NOME (conta sem nome na tabela login) ----------
if (nomeForm) {
    const botaoSalvarNome = document.getElementById("botaoSalvarNome");
    const mensagemNome = document.getElementById("mensagemNome");

    nomeForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const nome = document.getElementById("nomeUsuario").value.trim();

        carregando(botaoSalvarNome, true);
        mensagemNome.textContent = "";

        try {
            const resposta = await enviarJson("/usuario/nome", { nome: nome });
            if (resposta.ok) {
                mostrarMensagem(mensagemNome, resposta.data.mensagem, true);
                window.location.href = "/sistema";
                return;
            }
            mostrarMensagem(mensagemNome, resposta.data.mensagem, false);
        } catch (erro) {
            console.error(erro);
            mostrarMensagem(mensagemNome, "Erro ao conectar com o servidor.", false);
        }

        carregando(botaoSalvarNome, false);
    });
}

// ---------- ERROS DO LOGIN COM GOOGLE ----------
// O servidor volta para "/?erro=..." quando algo dá errado com o Google
const mensagensGoogle = {
    google_nao_configurado: "O login com Google ainda não foi configurado no servidor.",
    google_cancelado: "Login com Google cancelado.",
    google_sem_email: "Não foi possível obter um e-mail verificado da sua conta Google.",
    google_falhou: "Não foi possível entrar com o Google. Tente de novo.",
    google_sem_conta: "Você ainda não tem conta com esse e-mail. Cadastre-se primeiro (pode ser com o Google)."
};

const erroGoogle = new URLSearchParams(window.location.search).get("erro");
if (erroGoogle && mensagensGoogle[erroGoogle]) {
    mostrarMensagem(message, mensagensGoogle[erroGoogle], false);
    // Limpa o endereço para a mensagem não voltar ao recarregar a página
    history.replaceState(null, "", "/");
}

// A página de cadastro também usa este arquivo, mas não tem as telas de recuperação
if (recuperarSenha && redefinirSenha) {
    // ---------- RECUPERAR SENHA: 1) PEDIR O CÓDIGO ----------
    document.getElementById("esqueciSenha").addEventListener("click", (event) => {
        event.preventDefault();
        mostrarTela(recuperarSenha);
        mensagemRecuperacao.textContent = "";

        // Já preenche com o e-mail digitado no login, se houver
        const campo = document.getElementById("emailRecuperacao");
        campo.value = document.getElementById("email").value;
        campo.focus();
    });

    document.getElementById("voltarLogin").addEventListener("click", () => {
        mostrarTela(loginForm);
    });

    async function pedirCodigo(email, botao, elementoMensagem) {
        carregando(botao, true);
        elementoMensagem.textContent = "";

        try {
            const resposta = await enviarJson("/solicitar-recuperacao", { email: email });
            mostrarMensagem(elementoMensagem, resposta.data.mensagem, resposta.ok);
            return resposta.ok;
        } catch (erro) {
            console.error(erro);
            mostrarMensagem(elementoMensagem, "Erro ao conectar com o servidor.", false);
            return false;
        } finally {
            carregando(botao, false);
        }
    }

    recuperarSenha.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("emailRecuperacao").value.trim();
        const enviado = await pedirCodigo(email, botaoEnviarCodigo, mensagemRecuperacao);

        if (enviado) {
            emailRecuperacao = email;
            document.getElementById("textoCodigoEnviado").textContent =
                `Digite o código que enviamos para ${email}. Ele vale por 10 minutos.`;
            redefinirSenha.reset();
            mensagemRedefinir.textContent = "";
            mostrarTela(redefinirSenha);
            document.getElementById("codigo").focus();
        }
    });

    // ---------- RECUPERAR SENHA: 2) TROCAR A SENHA ----------
    // O campo do código aceita só números
    document.getElementById("codigo").addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/\D/g, "").slice(0, 6);
    });

    redefinirSenha.addEventListener("submit", async (event) => {
        event.preventDefault();

        const codigo = document.getElementById("codigo").value;
        const novaSenha = document.getElementById("novaSenha").value;
        const confirmacao = document.getElementById("confirmarNovaSenha").value;

        if (novaSenha !== confirmacao) {
            mostrarMensagem(mensagemRedefinir, "As senhas não são iguais.", false);
            return;
        }

        carregando(botaoRedefinir, true);
        mensagemRedefinir.textContent = "";

        try {
            const resposta = await enviarJson("/redefinir-senha", {
                email: emailRecuperacao,
                codigo: codigo,
                nova_senha: novaSenha
            });

            if (resposta.ok) {
                // Volta para o login já com o e-mail preenchido
                document.getElementById("email").value = emailRecuperacao;
                document.getElementById("password").value = "";
                mostrarTela(loginForm);
                mostrarMensagem(message, resposta.data.mensagem, true);
                document.getElementById("password").focus();
            } else {
                mostrarMensagem(mensagemRedefinir, resposta.data.mensagem, false);
            }
        } catch (erro) {
            console.error(erro);
            mostrarMensagem(mensagemRedefinir, "Erro ao conectar com o servidor.", false);
        }

        carregando(botaoRedefinir, false);
    });

    document.getElementById("reenviarCodigo").addEventListener("click", () => {
        pedirCodigo(emailRecuperacao, document.getElementById("reenviarCodigo"), mensagemRedefinir);
    });
}

// Se o navegador mostrar esta tela pela setinha de voltar (sem recarregar),
// encerra a sessão do mesmo jeito: para entrar no sistema, precisa fazer login de novo
window.addEventListener("pageshow", (evento) => {
    if (evento.persisted) fetch("/logout", { method: "POST" });
});
