// ===============================================
// FUNÇÃO PARA ALTERNAR ENTRE SEÇÕES
// ===============================================
function mostrarSecao(id) {
    // 1. Esconde todas as seções
    const secoes = document.querySelectorAll('.secao');
    secoes.forEach(secao => {
        secao.classList.remove('ativa');
    });

    // 2. Mostra a seção clicada
    const secaoAtiva = document.getElementById(id);
    if (secaoAtiva) {
        secaoAtiva.classList.add('ativa');
    }

    // 3. Remove a classe 'ativo' de todos os links do menu
    const links = document.querySelectorAll('.menu a');
    links.forEach(link => {
        link.classList.remove('ativo');
    });

    // 4. Adiciona a classe 'ativo' ao link clicado
    const linkClicado = Array.from(links).find(link => {
        const texto = link.textContent.trim().toLowerCase();
        const mapa = {
            'dashboard': 'dashboard',
            'materias': 'matérias',
            'chat': 'chat',
            'flashcards': 'flashcards',
            'questoes': 'questões'
        };
        return texto.includes(mapa[id] || id);
    });

    if (linkClicado) {
        linkClicado.classList.add('ativo');
    }
}

// ===============================================
// MINHAS TAREFAS (TABELA DEVERES NO BANCO)
// ===============================================
const containerTarefas = document.querySelector('.tarefas');
const botaoNovaTarefa = containerTarefas.querySelector('.nova-tarefa');

// Cria o elemento de uma tarefa (checkbox + texto) na barra lateral
function renderizarDever(dever) {
    const tarefa = document.createElement('div');
    tarefa.className = 'tarefa';

    const id = `dever-${dever.id}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.checked = dever.concluida;
    checkbox.addEventListener('change', () => marcarDever(dever.id, checkbox));

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = dever.obrigacoes;

    const botaoRemover = document.createElement('button');
    botaoRemover.className = 'remover-tarefa';
    botaoRemover.title = 'Remover tarefa';
    botaoRemover.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    botaoRemover.addEventListener('click', () => removerDever(dever.id, tarefa));

    tarefa.appendChild(checkbox);
    tarefa.appendChild(label);
    tarefa.appendChild(botaoRemover);
    containerTarefas.insertBefore(tarefa, botaoNovaTarefa);
}

// Apaga a tarefa do banco e da tela
async function removerDever(id, elemento) {
    if (!confirm('Remover esta tarefa?')) return;

    try {
        const resposta = await fetch(`/deveres/${id}`, { method: 'DELETE' });
        if (!resposta.ok) throw new Error(resposta.status);
        elemento.remove();
    } catch (erro) {
        console.error('Erro ao remover tarefa:', erro);
        alert('Não foi possível remover a tarefa.');
    }
}

// Busca as tarefas salvas no banco
async function carregarDeveres() {
    try {
        const resposta = await fetch('/deveres');
        const dados = await resposta.json();

        if (!resposta.ok || !dados.sucesso) {
            console.error('Não foi possível carregar as tarefas:', dados.mensagem);
            return;
        }

        containerTarefas.querySelectorAll('.tarefa').forEach(item => item.remove());
        dados.deveres.forEach(renderizarDever);
    } catch (erro) {
        console.error('Erro ao carregar tarefas:', erro);
    }
}

// Abre um campo para digitar a nova tarefa (Enter salva, Esc cancela)
function adicionarTarefa() {
    if (containerTarefas.querySelector('.tarefa-input')) return;

    const linha = document.createElement('div');
    linha.className = 'tarefa';

    const campo = document.createElement('input');
    campo.type = 'text';
    campo.className = 'tarefa-input';
    campo.placeholder = 'Digite a tarefa e aperte Enter';
    campo.maxLength = 200;

    linha.appendChild(campo);
    containerTarefas.insertBefore(linha, botaoNovaTarefa);
    campo.focus();

    let salvando = false;

    async function salvar() {
        if (salvando) return;
        const texto = campo.value.trim();

        if (!texto) {
            linha.remove();
            return;
        }

        salvando = true;
        try {
            const resposta = await fetch('/deveres', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ obrigacoes: texto })
            });
            const dados = await resposta.json();

            if (!resposta.ok || !dados.sucesso) {
                alert(dados.mensagem);
                salvando = false;
                campo.focus();
                return;
            }

            linha.remove();
            renderizarDever(dados.dever);
        } catch (erro) {
            console.error('Erro ao salvar tarefa:', erro);
            alert('Erro ao salvar a tarefa.');
            salvando = false;
        }
    }

    campo.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') salvar();
        if (evento.key === 'Escape') linha.remove();
    });
    campo.addEventListener('blur', salvar);
}

// Atualiza no banco se a tarefa foi concluída ou não
async function marcarDever(id, checkbox) {
    try {
        const resposta = await fetch(`/deveres/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ concluida: checkbox.checked })
        });

        if (!resposta.ok) throw new Error(resposta.status);
    } catch (erro) {
        console.error('Erro ao atualizar tarefa:', erro);
        checkbox.checked = !checkbox.checked;
    }
}

// ===============================================
// FLASHCARDS
// Os cartões ficam em /js/flashcards.js (bancoFlashcards).
// "Preciso revisar" devolve o cartão alguns lugares à frente na fila;
// "Sabia!" tira o cartão do deck. O nível de cada cartão fica salvo no
// navegador para que os mais errados apareçam primeiro na próxima vez.
// ===============================================
// A chave ganha o número da conta quando o usuário é carregado (cada login tem seus níveis)
let FC_CHAVE_NIVEIS = 'studymind-flashcards-nivel';
const FC_DISTANCIA_REVISAO = 3;

const fcEl = {
    filtros: document.getElementById('fcFiltros'),
    jogo: document.getElementById('fcJogo'),
    fim: document.getElementById('fcFim'),
    card: document.getElementById('fcCard'),
    materiaFrente: document.getElementById('fcMateriaFrente'),
    materiaVerso: document.getElementById('fcMateriaVerso'),
    pergunta: document.getElementById('fcPergunta'),
    resposta: document.getElementById('fcResposta'),
    formula: document.getElementById('fcFormula'),
    btnRevisar: document.getElementById('fcBtnRevisar'),
    btnSabia: document.getElementById('fcBtnSabia'),
    sabia: document.getElementById('fcSabia'),
    revisar: document.getElementById('fcRevisar'),
    barra: document.getElementById('fcBarra'),
    posicao: document.getElementById('fcPosicao'),
    resumo: document.getElementById('fcResumo'),
    btnErrados: document.getElementById('fcBtnErrados'),
    btnRecomecar: document.getElementById('fcBtnRecomecar')
};

let fcNiveis = lerNiveisFlashcards();
let fc = { filtro: 'Todas', fila: [], total: 0, sabia: 0, errados: new Set(), virado: false };

function lerNiveisFlashcards() {
    try {
        return JSON.parse(localStorage.getItem(FC_CHAVE_NIVEIS)) || {};
    } catch (erro) {
        return {};
    }
}

function salvarNiveisFlashcards() {
    try {
        localStorage.setItem(FC_CHAVE_NIVEIS, JSON.stringify(fcNiveis));
    } catch (erro) {
        // Sem localStorage o deck funciona normalmente, só não lembra os níveis
    }
}

function cartoesDoFiltro(filtro) {
    const materias = filtro === 'Todas' ? Object.keys(bancoFlashcards) : [filtro];
    return materias.flatMap(materia =>
        bancoFlashcards[materia].map((cartao, i) => ({ ...cartao, materia, id: `${materia}-${i}` }))
    );
}

function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function montarFiltrosFlashcards() {
    const opcoes = ['Todas', ...Object.keys(bancoFlashcards)];

    opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.className = 'filtro-fc' + (opcao === fc.filtro ? ' ativo' : '');
        botao.textContent = opcao;
        botao.addEventListener('click', () => {
            fcEl.filtros.querySelectorAll('.filtro-fc').forEach(item => item.classList.remove('ativo'));
            botao.classList.add('ativo');
            fc.filtro = opcao;
            iniciarDeck(cartoesDoFiltro(opcao));
        });
        fcEl.filtros.appendChild(botao);
    });
}

function iniciarDeck(cartoes) {
    // Embaralha e depois ordena pelo nível: os cartões mais errados vêm primeiro
    const fila = embaralhar(cartoes).sort((a, b) => (fcNiveis[a.id] || 0) - (fcNiveis[b.id] || 0));

    fc = { ...fc, fila, total: cartoes.length, sabia: 0, errados: new Set(), virado: false };
    fcEl.jogo.hidden = false;
    fcEl.fim.hidden = true;
    mostrarCartao();
}

function mostrarCartao() {
    atualizarPlacarFlashcards();

    if (fc.fila.length === 0) {
        mostrarFimFlashcards();
        return;
    }

    const cartao = fc.fila[0];

    // Desvira sem animação para não mostrar a resposta do próximo cartão
    fcEl.card.classList.add('sem-transicao');
    fcEl.card.classList.remove('virado');
    fc.virado = false;

    fcEl.materiaFrente.textContent = cartao.materia;
    fcEl.materiaVerso.textContent = cartao.materia;
    fcEl.pergunta.textContent = cartao.pergunta;
    fcEl.resposta.textContent = cartao.resposta;
    fcEl.formula.textContent = cartao.formula || '';
    fcEl.formula.hidden = !cartao.formula;

    void fcEl.card.offsetWidth;
    fcEl.card.classList.remove('sem-transicao');

    // Reinicia a animação de entrada do cartão
    fcEl.card.classList.remove('entrando');
    void fcEl.card.offsetWidth;
    fcEl.card.classList.add('entrando');

    fcEl.btnRevisar.disabled = true;
    fcEl.btnSabia.disabled = true;
}

function virarCartao() {
    if (fc.fila.length === 0) return;

    fc.virado = !fc.virado;
    fcEl.card.classList.remove('entrando');
    fcEl.card.classList.toggle('virado', fc.virado);
    fcEl.btnRevisar.disabled = !fc.virado;
    fcEl.btnSabia.disabled = !fc.virado;
}

function avaliarCartao(sabia) {
    if (!fc.virado || fc.fila.length === 0) return;

    const cartao = fc.fila.shift();

    if (sabia) {
        fc.sabia++;
        fcNiveis[cartao.id] = (fcNiveis[cartao.id] || 0) + 1;
    } else {
        fc.errados.add(cartao.id);
        fcNiveis[cartao.id] = 0;
        // Volta para a fila alguns cartões depois, para revisar ainda nesta rodada
        fc.fila.splice(Math.min(FC_DISTANCIA_REVISAO, fc.fila.length), 0, cartao);
    }

    salvarNiveisFlashcards();
    if (typeof registrarFlashcard === 'function') registrarFlashcard(cartao, sabia);
    mostrarCartao();
}

function atualizarPlacarFlashcards() {
    fcEl.sabia.textContent = fc.sabia;
    fcEl.revisar.textContent = fc.errados.size;
    fcEl.barra.style.width = (fc.total ? (fc.sabia / fc.total) * 100 : 0) + '%';
    fcEl.posicao.textContent = fc.fila.length
        ? `${fc.sabia} de ${fc.total} aprendidos · faltam ${fc.fila.length}`
        : `${fc.total} de ${fc.total} aprendidos`;
}

function mostrarFimFlashcards() {
    const dePrimeira = fc.total - fc.errados.size;

    fcEl.jogo.hidden = true;
    fcEl.fim.hidden = false;
    fcEl.resumo.textContent = fc.errados.size
        ? `Você sabia ${dePrimeira} de ${fc.total} cartões de primeira e revisou ${fc.errados.size} até acertar.`
        : `Perfeito! Você sabia todos os ${fc.total} cartões de primeira.`;
    fcEl.btnErrados.hidden = fc.errados.size === 0;
}

fcEl.card.addEventListener('click', virarCartao);
fcEl.btnRevisar.addEventListener('click', () => avaliarCartao(false));
fcEl.btnSabia.addEventListener('click', () => avaliarCartao(true));
fcEl.btnRecomecar.addEventListener('click', () => iniciarDeck(cartoesDoFiltro(fc.filtro)));
fcEl.btnErrados.addEventListener('click', () => {
    const errados = cartoesDoFiltro(fc.filtro).filter(cartao => fc.errados.has(cartao.id));
    iniciarDeck(errados);
});

// Atalhos de teclado: Espaço/Enter vira, 1 ou ← revisar, 2 ou → sabia
document.addEventListener('keydown', (evento) => {
    if (!document.getElementById('flashcards').classList.contains('ativa')) return;
    if (['INPUT', 'TEXTAREA', 'BUTTON'].includes(evento.target.tagName)) return;

    if (evento.key === ' ' || evento.key === 'Enter') {
        evento.preventDefault();
        virarCartao();
    } else if (evento.key === '1' || evento.key === 'ArrowLeft') {
        avaliarCartao(false);
    } else if (evento.key === '2' || evento.key === 'ArrowRight') {
        avaliarCartao(true);
    }
});

montarFiltrosFlashcards();
iniciarDeck(cartoesDoFiltro(fc.filtro));

// ===============================================
// PROGRESSO POR MATÉRIA
// ===============================================
async function buscarProgresso() {
    const resposta = await fetch("/progresso");
    const dados = await resposta.json();

    if (!resposta.ok || !dados.sucesso) {
        console.error("Não foi possível carregar o progresso.");
        return;
    }

    // O cartão "Desempenho geral" é preenchido pelo dashboard.js
    atualizarMediaDia(Number(dados.media_dia), dados.materias_hoje);

    const container = document.getElementById("progressoMaterias");
    container.innerHTML = "";

    if (dados.resultados.length === 0) {
        container.textContent = "Nenhuma questão respondida nos últimos 7 dias.";
        return;
    }

    dados.resultados.forEach(item => {
        const elemento = document.createElement("div");
        elemento.className = "barra-materia";

        const barraBg = document.createElement("div");
        barraBg.className = "barra-bg";
        const barraFill = document.createElement("div");
        barraFill.className = "barra-fill";
        item.porcentagem = Number(item.porcentagem).toFixed(2);
        barraFill.style.width = item.porcentagem + "%";
        barraFill.style.background = "linear-gradient(90deg, #c77dff, #8e5cc7)";
        barraBg.appendChild(barraFill);
        elemento.appendChild(barraBg);

        const porcentagem = document.createElement("span");
        porcentagem.className = "barra-pct";
        porcentagem.textContent = item.porcentagem + "%";
        elemento.appendChild(porcentagem);

        const nome = document.createElement("span");
        nome.textContent = item.materia;
        elemento.appendChild(nome);
        container.appendChild(elemento);
    });
    console.log(dados.resultados);
}

// ===============================================
// MÉDIA DO DIA (CÍRCULO)
// ===============================================
function atualizarMediaDia(media, materiasHoje) {
    const circunferencia = 314.16;
    const circulo = document.getElementById("circuloMedia");
    const texto = document.getElementById("mediaDia");
    const mensagem = document.getElementById("mensagemMedia");

    circulo.setAttribute("stroke-dashoffset", circunferencia * (1 - media / 100));
    texto.textContent = Math.round(media) + "%";

    if (materiasHoje === 0) {
        mensagem.textContent = "Nenhuma questão respondida hoje";
        mensagem.style.color = "var(--texto-suave)";
    } else if (media >= 70) {
        mensagem.textContent = `Acima de 70% em ${materiasHoje} matéria(s) hoje`;
        mensagem.style.color = "var(--cor-positiva)";
    } else {
        mensagem.textContent = `Abaixo de 70% em ${materiasHoje} matéria(s) hoje`;
        mensagem.style.color = "var(--cor-negativa)";
    }
}

// ===============================================
// SIMULADO: QUESTÕES POR MATÉRIA
// As questões ficam em /js/questoes.js (bancoQuestoes)
// ===============================================
const topicos = document.querySelectorAll(".tag-topico");
const questaoCard = document.getElementById("questaoCard");
const letras = ["A", "B", "C", "D"];

let simulado = { materia: null, indice: 0, acertos: 0 };

topicos.forEach(topico => {
    topico.addEventListener("click", () => {
        topicos.forEach(item => item.classList.remove("ativo"));
        topico.classList.add("ativo");
        document.querySelector(".mensagem-inicial-simulado").style.display = "none";

        simulado = { materia: topico.textContent.trim(), indice: 0, acertos: 0 };
        mostrarQuestao();
    });
});

function mostrarQuestao() {
    const questoes = bancoQuestoes[simulado.materia] || [];
    const questao = questoes[simulado.indice];
    questaoCard.innerHTML = "";
    questaoCard.style.display = "block";

    const contador = document.createElement("p");
    contador.className = "questao-contador";
    contador.textContent = `${simulado.materia} · Questão ${simulado.indice + 1} de ${questoes.length}`;
    questaoCard.appendChild(contador);

    const enunciado = document.createElement("p");
    enunciado.className = "questao-enunciado";
    enunciado.textContent = questao.enunciado;
    questaoCard.appendChild(enunciado);

    const alternativas = document.createElement("div");
    alternativas.className = "questao-alternativas";
    questao.alternativas.forEach((texto, i) => {
        const label = document.createElement("label");
        label.className = "alternativa";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "alternativa";
        input.value = letras[i];

        const span = document.createElement("span");
        span.textContent = `${letras[i]}: ${texto}`;

        label.appendChild(input);
        label.appendChild(span);
        alternativas.appendChild(label);
    });
    questaoCard.appendChild(alternativas);

    const feedback = document.createElement("p");
    feedback.className = "questao-feedback";
    questaoCard.appendChild(feedback);

    const botao = document.createElement("button");
    botao.className = "btn-responder";
    botao.textContent = "Responder";
    botao.addEventListener("click", () => responderQuestao(questao, botao, feedback));
    questaoCard.appendChild(botao);
}

function responderQuestao(questao, botao, feedback) {
    // Depois de responder, o botão passa a avançar para a próxima questão
    if (botao.dataset.respondida) {
        simulado.indice++;
        if (simulado.indice < bancoQuestoes[simulado.materia].length) {
            mostrarQuestao();
        } else {
            mostrarResultado();
        }
        return;
    }

    const input = questaoCard.querySelector("input[type='radio']:checked");
    if (!input) {
        alert("Por favor, selecione uma resposta antes de enviar.");
        return;
    }

    const acertou = input.value === questao.correta;
    if (acertou) simulado.acertos++;

    // Marca a alternativa certa (e a errada, se for o caso) e trava as opções
    questaoCard.querySelectorAll(".alternativa").forEach(label => {
        const opcao = label.querySelector("input");
        opcao.disabled = true;
        if (opcao.value === questao.correta) label.classList.add("correta");
        else if (opcao.checked) label.classList.add("errada");
    });

    feedback.textContent = (acertou ? "✅ Você acertou! " : `❌ Resposta correta: ${questao.correta}. `) + questao.explicacao;
    feedback.classList.add(acertou ? "acerto" : "erro");

    botao.dataset.respondida = "true";
    const ultima = simulado.indice === bancoQuestoes[simulado.materia].length - 1;
    botao.textContent = ultima ? "Ver resultado" : "Próxima questão →";

    fetch("/registrar-resposta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            materia: simulado.materia,
            acertou: acertou
        })
    })
    .then(resposta => resposta.json())
    .then(dados => {
        console.log(dados.mensagem);
        buscarProgresso();
        if (typeof buscarDashboard === "function") buscarDashboard();
    })
    .catch(erro => console.error("Erro ao registrar resposta:", erro));
}

function mostrarResultado() {
    const total = bancoQuestoes[simulado.materia].length;
    questaoCard.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.className = "questao-resultado";
    titulo.textContent = `Você acertou ${simulado.acertos} de ${total} em ${simulado.materia}!`;
    questaoCard.appendChild(titulo);

    const botao = document.createElement("button");
    botao.className = "btn-responder";
    botao.textContent = "Refazer simulado";
    botao.addEventListener("click", () => {
        simulado.indice = 0;
        simulado.acertos = 0;
        mostrarQuestao();
    });
    questaoCard.appendChild(botao);
}

// ===============================================
// CHAT COM IA (OLLAMA)
// ===============================================
const historicoChat = [];
const chatMensagens = document.querySelector(".chat-mensagens");
const chatInput = document.querySelector(".chat-input-area input");
const chatBotao = document.querySelector(".chat-input-area button");

function horaAtual() {
    return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

// ---------- Formatação das respostas da IA ----------
// Os elementos são montados um a um (sem innerHTML) para nunca executar HTML vindo da resposta.

// **negrito** e *itálico* dentro de uma linha
function adicionarTextoComDestaques(pai, texto) {
    const padrao = /\*\*(.+?)\*\*|\*([^*\n]+?)\*/g;
    let posicao = 0;
    let achado;

    while ((achado = padrao.exec(texto)) !== null) {
        if (achado.index > posicao) {
            pai.appendChild(document.createTextNode(texto.slice(posicao, achado.index)));
        }
        const destaque = document.createElement(achado[1] !== undefined ? "strong" : "em");
        destaque.textContent = achado[1] !== undefined ? achado[1] : achado[2];
        pai.appendChild(destaque);
        posicao = padrao.lastIndex;
    }

    if (posicao < texto.length) {
        pai.appendChild(document.createTextNode(texto.slice(posicao)));
    }
}

// Texto comum: linhas começando com # viram títulos em negrito
function adicionarTextoComum(pai, texto) {
    // A IA às vezes escreve R\$ e 20\% fora das fórmulas; tira a barra
    texto = texto.replace(/\\([$%])/g, "$1");
    const linhas = texto.split("\n");

    linhas.forEach((linha, indice) => {
        const titulo = linha.match(/^\s*#{1,6}\s+(.*)$/);

        if (titulo) {
            const destaque = document.createElement("strong");
            destaque.className = "msg-titulo";
            adicionarTextoComDestaques(destaque, titulo[1]);
            pai.appendChild(destaque);
        } else {
            adicionarTextoComDestaques(pai, linha);
        }

        if (indice < linhas.length - 1) {
            pai.appendChild(document.createTextNode("\n"));
        }
    });
}

// Fórmula em LaTeX desenhada pelo KaTeX (se ele não carregar, mostra o texto puro)
function adicionarFormula(pai, latex, emBloco) {
    const caixa = document.createElement(emBloco ? "div" : "span");

    // Vírgula decimal (0,25): sem isso o KaTeX coloca um espaço depois da vírgula
    latex = latex.replace(/(\d),(?=\d)/g, "$1{,}");

    if (window.katex) {
        window.katex.render(latex.trim(), caixa, { displayMode: emBloco, throwOnError: false });
    } else {
        caixa.textContent = latex.trim();
    }
    pai.appendChild(caixa);
}

// Separa as fórmulas \[ ... \], $$ ... $$ e \( ... \) do resto do texto
function mostrarTextoFormatado(elemento, texto) {
    elemento.textContent = "";
    const padraoFormula = /\\\[([\s\S]+?)\\\]|\$\$([\s\S]+?)\$\$|\\\(([\s\S]+?)\\\)/g;
    let posicao = 0;
    let achado;

    while ((achado = padraoFormula.exec(texto)) !== null) {
        const emBloco = achado[3] === undefined;
        let antes = texto.slice(posicao, achado.index);

        // A fórmula em bloco já ocupa a própria linha; tira a quebra de linha extra antes dela
        if (emBloco) antes = antes.replace(/\n[ \t]*$/, "");
        adicionarTextoComum(elemento, antes);
        adicionarFormula(elemento, achado[1] ?? achado[2] ?? achado[3], emBloco);

        posicao = padraoFormula.lastIndex;
        // ...e a quebra de linha extra depois dela
        if (emBloco && texto[posicao] === "\n") posicao++;
    }

    adicionarTextoComum(elemento, texto.slice(posicao));
}

function adicionarMensagem(texto, autor) {
    const mensagem = document.createElement("div");
    mensagem.className = autor === "usuario" ? "msg-usuario" : "msg-ia";

    if (autor !== "usuario") {
        const icone = document.createElement("i");
        icone.className = "fa-solid fa-robot";
        mensagem.appendChild(icone);
    }

    const bolha = document.createElement("div");
    bolha.className = "msg-bubble";

    const conteudo = document.createElement("div");
    conteudo.className = "msg-texto";
    conteudo.textContent = texto;
    bolha.appendChild(conteudo);

    const hora = document.createElement("span");
    hora.className = "msg-hora";
    hora.textContent = horaAtual();
    bolha.appendChild(hora);

    mensagem.appendChild(bolha);
    chatMensagens.appendChild(mensagem);
    chatMensagens.scrollTop = chatMensagens.scrollHeight;

    return bolha;
}

async function enviarMensagem(texto) {
    texto = texto.trim();
    if (!texto) return;

    adicionarMensagem(texto, "usuario");
    historicoChat.push({ role: "user", content: texto });

    chatInput.value = "";
    chatInput.disabled = true;
    chatBotao.disabled = true;

    const bolhaResposta = adicionarMensagem("Digitando...", "ia");
    bolhaResposta.classList.add("digitando");
    const textoResposta = bolhaResposta.querySelector(".msg-texto");

    try {
        const resposta = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensagens: historicoChat })
        });
        const dados = await resposta.json();

        bolhaResposta.classList.remove("digitando");

        if (!resposta.ok || !dados.sucesso) {
            textoResposta.textContent = "⚠️ " + dados.mensagem;
            historicoChat.pop();
            return;
        }

        mostrarTextoFormatado(textoResposta, dados.resposta);
        historicoChat.push({ role: "assistant", content: dados.resposta });
    } catch (erro) {
        bolhaResposta.classList.remove("digitando");
        textoResposta.textContent = "⚠️ Erro ao falar com o servidor.";
        historicoChat.pop();
        console.error("Erro no chat:", erro);
    } finally {
        chatInput.disabled = false;
        chatBotao.disabled = false;
        chatInput.focus();
        chatMensagens.scrollTop = chatMensagens.scrollHeight;
    }
}

chatBotao.addEventListener("click", () => enviarMensagem(chatInput.value));

chatInput.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        enviarMensagem(chatInput.value);
    }
});

document.querySelectorAll(".chat-sugestoes button").forEach(botao => {
    botao.addEventListener("click", () => enviarMensagem(botao.textContent));
});

// ===============================================
// INICIALIZAÇÃO
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    // Mostra a seção Dashboard por padrão
    mostrarSecao('dashboard');
    buscarProgresso();
    document.getElementById("horaBoasVindas").textContent = horaAtual();

    // Carrega as tarefas salvas no banco
    carregarDeveres();

    // Atualiza a data
    const dataAtual = document.getElementById('dataAtual');
    if (dataAtual) {
        const agora = new Date();
        const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const dataFormatada = `${dias[agora.getDay()]}, ${agora.getDate()} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}`;
        dataAtual.textContent = dataFormatada;
    }
});

// Se o sistema aparecer pela setinha de avançar, pergunta ao servidor se ainda está logado
// (se não estiver, o servidor manda de volta para o login)
window.addEventListener("pageshow", (evento) => {
    if (evento.persisted) window.location.reload();
});

// ===============================================
// USUÁRIO LOGADO (nome no lugar de "Juju")
// ===============================================
async function carregarUsuario() {
    try {
        const resposta = await fetch("/usuario");
        if (resposta.status === 401) {
            window.location.href = "/";
            return;
        }
        const dados = await resposta.json();
        if (!dados.sucesso) return;

        document.querySelectorAll(".nome-usuario").forEach(elemento => {
            elemento.textContent = dados.primeiro_nome;
        });
        const avatar = document.getElementById("avatarUsuario");
        if (avatar) avatar.textContent = dados.primeiro_nome.charAt(0).toUpperCase();

        // Flashcards: carrega os níveis salvos desta conta
        FC_CHAVE_NIVEIS = `studymind-flashcards-nivel-${dados.id}`;
        fcNiveis = lerNiveisFlashcards();
        iniciarDeck(cartoesDoFiltro(fc.filtro));
    } catch (erro) {
        console.error("Não foi possível carregar o usuário:", erro);
    }
}

carregarUsuario();
