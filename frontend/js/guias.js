// ===============================================
// MATÉRIAS: LISTA DE MATÉRIAS, TÓPICOS E GUIAS
// Os conteúdos ficam em materias.js e materias-humanas.js.
// ===============================================

const guiaConteudo = document.getElementById("materiasConteudo");
let guiaObservador = null;

function buscarMateria(idMateria) {
    return guiasMaterias.find(materia => materia.id === idMateria);
}

function numeroDuasCasas(numero) {
    return String(numero).padStart(2, "0");
}

// Mostra a seção "Matérias" e volta ao topo da página
function prepararTelaMaterias() {
    mostrarSecao("materias");
    if (guiaObservador) {
        guiaObservador.disconnect();
        guiaObservador = null;
    }
    window.scrollTo(0, 0);
}

// ---------- Nível 1: todas as matérias ----------
function abrirMaterias() {
    prepararTelaMaterias();

    const cards = guiasMaterias.map(materia => {
        const nomesTopicos = materia.topicos.map(topico => topico.titulo).join(" · ");
        const quantidade = materia.topicos.length === 1 ? "1 guia" : `${materia.topicos.length} guias`;

        return `
            <button class="materia-card" style="--cor-materia: ${materia.cor}" onclick="abrirMateria('${materia.id}')">
                <span class="materia-icone"><i class="fa-solid ${materia.icone}"></i></span>
                <span class="materia-area">${materia.area}</span>
                <strong class="materia-nome">${materia.nome}</strong>
                <span class="materia-topicos">${nomesTopicos}</span>
                <span class="materia-quantidade">${quantidade} <i class="fa-solid fa-arrow-right"></i></span>
            </button>`;
    }).join("");

    guiaConteudo.innerHTML = `
        <div class="materias-topo">
            <h2>Matérias</h2>
            <p>Guias de revisão com explicações, diagramas e exemplos resolvidos passo a passo.</p>
        </div>
        <div class="materias-grade">${cards}</div>`;
}

// ---------- Nível 2: os tópicos de uma matéria ----------
function abrirMateria(idMateria) {
    const materia = buscarMateria(idMateria);
    if (!materia) return abrirMaterias();

    prepararTelaMaterias();

    const cards = materia.topicos.map(topico => `
        <button class="topico-card" style="--cor-materia: ${materia.cor}" onclick="abrirGuia('${materia.id}', '${topico.id}')">
            <div>
                <strong>${topico.titulo}</strong>
                <p>${topico.subtitulo}</p>
                <span class="topico-card-secoes">${topico.secoes.length} seções · ${topico.secoes.map(secao => secao.titulo).join(" · ")}</span>
            </div>
            <i class="fa-solid fa-chevron-right"></i>
        </button>`).join("");

    guiaConteudo.innerHTML = `
        ${montarTrilha(materia)}
        <div class="materias-topo materia-cabecalho" style="--cor-materia: ${materia.cor}">
            <span class="materia-icone"><i class="fa-solid ${materia.icone}"></i></span>
            <div>
                <h2>${materia.nome}</h2>
                <p>${materia.area}</p>
            </div>
        </div>
        <div class="topicos-lista">${cards}</div>`;
}

// Caminho clicável: Matérias › Física › Eletrodinâmica
function montarTrilha(materia, topico) {
    let html = `<nav class="guia-trilha" aria-label="Você está em">
        <button onclick="abrirMaterias()">Matérias</button>`;

    if (topico) {
        html += `<i class="fa-solid fa-chevron-right"></i>
            <button onclick="abrirMateria('${materia.id}')">${materia.nome}</button>
            <i class="fa-solid fa-chevron-right"></i>
            <span>${topico.titulo}</span>`;
    } else {
        html += `<i class="fa-solid fa-chevron-right"></i><span>${materia.nome}</span>`;
    }

    return html + `</nav>`;
}

// ---------- Nível 3: o guia completo ----------
function abrirGuia(idMateria, idTopico) {
    const materia = buscarMateria(idMateria);
    const topico = materia && materia.topicos.find(item => item.id === idTopico);
    if (!topico) return abrirMaterias();

    prepararTelaMaterias();

    const chips = (topico.formulas || []).map(formula =>
        `<div class="guia-formula">${formula}</div>`).join("");

    const indice = topico.secoes.map((secao, posicao) => `
        <li><a href="#guia-secao-${posicao + 1}" data-secao="${posicao + 1}">
            <span>${numeroDuasCasas(posicao + 1)}</span>${secao.titulo}
        </a></li>`).join("");

    const secoes = topico.secoes.map((secao, posicao) => montarSecaoGuia(secao, posicao + 1, topico)).join("");

    guiaConteudo.innerHTML = `
        ${montarTrilha(materia, topico)}

        <header class="guia-hero" style="--cor-materia: ${materia.cor}">
            <span class="guia-etiqueta">${materia.nome} · Revisão completa</span>
            <h1>${topico.titulo}</h1>
            <p>${topico.subtitulo}</p>
        </header>

        ${chips ? `<div class="guia-formulas">${chips}</div>` : ""}

        <div class="guia-layout">
            <div class="guia-secoes">
                ${secoes}

                <div class="guia-final">
                    <div>
                        <strong>Hora de praticar</strong>
                        <p>Teste o que você revisou com questões de ${materia.nome}.</p>
                    </div>
                    <button class="btn-iniciar" onclick="praticarMateria('${materia.nome}')">Fazer questões de ${materia.nome} →</button>
                </div>
            </div>

            <aside class="guia-indice">
                <span class="guia-rotulo-cinza">Neste guia</span>
                <ol>${indice}</ol>
                <button class="guia-perguntar" onclick="perguntarSobreGuia('${topico.titulo.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-robot"></i> Tirar dúvida com a IA
                </button>
            </aside>
        </div>`;

    ativarIndiceGuia();
}

function montarSecaoGuia(secao, numero, topico) {
    let html = `
        <article class="guia-secao" id="guia-secao-${numero}">
            <header class="guia-secao-topo">
                <span class="guia-numero">${numeroDuasCasas(numero)}</span>
                <div>
                    <h2>${secao.titulo}</h2>
                    ${secao.resumo ? `<p>${secao.resumo}</p>` : ""}
                </div>
            </header>`;

    if (secao.conceito) {
        html += `
            <div class="guia-conceito">
                <span class="guia-rotulo">Entenda o conceito</span>
                ${secao.conceito.map(paragrafo => `<p>${paragrafo}</p>`).join("")}
            </div>`;
    }

    if (secao.diagrama) {
        html += `
            <figure class="guia-diagrama">
                <div class="guia-diagrama-topo">
                    <strong>${secao.diagrama.titulo}</strong>
                    <span class="guia-rotulo-cinza">Diagrama visual</span>
                </div>
                <div class="guia-diagrama-imagem">${secao.diagrama.svg}</div>
                ${secao.diagrama.legenda ? `<figcaption>${secao.diagrama.legenda}</figcaption>` : ""}
            </figure>`;
    }

    if (secao.cards) {
        html += `
            <span class="guia-rotulo-cinza guia-rotulo-solto">${topico.calculo ? "Conceitos e fórmulas" : "Pontos-chave"}</span>
            <div class="guia-cards">
                ${secao.cards.map(card => `
                    <div class="guia-card">
                        <strong>${card.titulo}</strong>
                        <p>${card.texto}</p>
                    </div>`).join("")}
            </div>`;
    }

    if (secao.exemplo) {
        const exemplo = secao.exemplo;
        html += `
            <div class="guia-exemplo">
                <span class="guia-rotulo">Exemplo resolvido</span>
                <h3>${exemplo.titulo}</h3>
                <p>${exemplo.enunciado}</p>
                <ol class="guia-passos ${topico.calculo ? "guia-passos-calculo" : ""}">
                    ${exemplo.passos.map((passo, indice) => `<li><span>${indice + 1}</span><div>${passo}</div></li>`).join("")}
                </ol>
                <p class="guia-resultado"><strong>Resultado:</strong> ${exemplo.resultado}</p>
            </div>`;
    }

    if (secao.atencao) {
        html += `
            <div class="guia-atencao">
                <span>Atenção</span>
                <p>${secao.atencao}</p>
            </div>`;
    }

    return html + `</article>`;
}

// Índice lateral: rola até a seção ao clicar e destaca a seção que está na tela
function ativarIndiceGuia() {
    const links = guiaConteudo.querySelectorAll(".guia-indice a");

    links.forEach(link => {
        link.addEventListener("click", evento => {
            evento.preventDefault();
            const alvo = document.getElementById(`guia-secao-${link.dataset.secao}`);
            if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    if (!("IntersectionObserver" in window)) return;

    guiaObservador = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            const numero = entrada.target.id.replace("guia-secao-", "");
            links.forEach(link => link.classList.toggle("ativo", link.dataset.secao === numero));
        });
    }, { rootMargin: "-20% 0px -70% 0px" });

    guiaConteudo.querySelectorAll(".guia-secao").forEach(secao => guiaObservador.observe(secao));
}

// Abre o simulado já na matéria do guia
function praticarMateria(nomeMateria) {
    mostrarSecao("questoes");
    window.scrollTo(0, 0);
    const botao = Array.from(document.querySelectorAll(".tag-topico"))
        .find(tag => tag.textContent.trim() === nomeMateria);
    if (botao) botao.click();
}

// Vai para o chat com a pergunta começada
function perguntarSobreGuia(tituloTopico) {
    mostrarSecao("chat");
    const campo = document.querySelector(".chat-input-area input");
    if (campo) {
        campo.value = `Tenho uma dúvida sobre ${tituloTopico}: `;
        campo.focus();
    }
}
