const cadastroForm = document.getElementById("cadastroForm");
const message = document.getElementById("message");
const botaoCadastrar = document.getElementById("botaoCadastrar");

// Mostra uma mensagem de erro (vermelha) ou sucesso (verde) abaixo dos botões
function mostrarMensagem(texto, sucesso) {
    message.textContent = texto;
    message.classList.toggle("sucesso", Boolean(sucesso));
    message.classList.toggle("erro", !sucesso);
}

// Enquanto espera o servidor, trava o botão e mostra um ícone girando
function carregando(ativo) {
    botaoCadastrar.disabled = ativo;
    botaoCadastrar.classList.toggle("carregando", ativo);
}

cadastroForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value;
    const confirmacao = document.getElementById("confirmPassword").value;

    // Confere antes de mandar para o servidor
    if (senha !== confirmacao) {
        mostrarMensagem("As senhas não são iguais.", false);
        document.getElementById("confirmPassword").focus();
        return;
    }

    carregando(true);
    message.textContent = "";

    try {
        const response = await fetch("/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: nome, email: email, senha: senha, confirmacao: confirmacao })
        });

        const data = await response.json();

        if (response.ok) {
            // A conta foi salva e a pessoa já está logada
            mostrarMensagem(data.mensagem + " Entrando...", true);
            window.location.href = "/sistema";
            return;
        }

        mostrarMensagem(data.mensagem, false);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem("Erro ao conectar com o servidor.", false);
    }

    carregando(false);
});

// Se o navegador mostrar esta tela pela setinha de voltar (sem recarregar),
// encerra a sessão do mesmo jeito: para entrar no sistema, precisa fazer login de novo
window.addEventListener("pageshow", (evento) => {
    if (evento.persisted) fetch("/logout", { method: "POST" });
});
