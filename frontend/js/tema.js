// ===============================================
// MODO ESCURO
// O tema fica no atributo data-theme do <html> e a escolha é salva no
// navegador (localStorage), para continuar igual ao recarregar a página.
// A aplicação inicial acontece no <head> do sistema.html, antes de desenhar a página.
// ===============================================

function temaEscuroAtivo() {
    return document.documentElement.getAttribute("data-theme") === "dark";
}

// Atualiza o ícone e o texto do botão conforme o tema atual
function atualizarBotaoTema() {
    const botao = document.getElementById("botaoTema");
    if (!botao) return;

    const escuro = temaEscuroAtivo();
    botao.querySelector("i").className = escuro ? "fa-solid fa-sun" : "fa-solid fa-moon";
    botao.querySelector("span").textContent = escuro ? "Modo claro" : "Modo escuro";
    botao.title = escuro ? "Mudar para o modo claro" : "Mudar para o modo escuro";
}

function alternarTema() {
    const escuro = !temaEscuroAtivo();

    if (escuro) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

    // Em janela anônima ou com o armazenamento bloqueado, o tema só não fica salvo
    try {
        localStorage.setItem("tema", escuro ? "escuro" : "claro");
    } catch (erro) {}

    atualizarBotaoTema();
}

document.getElementById("botaoTema")?.addEventListener("click", alternarTema);
atualizarBotaoTema();
