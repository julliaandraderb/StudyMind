// ===============================================
// DASHBOARD INTELIGENTE
// Busca o histórico real em /dashboard e monta os cartões, os tópicos
// fracos e a recomendação. Os elementos são criados um a um (sem innerHTML),
// porque os nomes das matérias vêm do banco.
// ===============================================

// Cria um elemento com texto e classe, já pronto para usar
function criarElemento(tag, texto, classe) {
    const elemento = document.createElement(tag);
    if (texto !== undefined && texto !== null) elemento.textContent = texto;
    if (classe) elemento.className = classe;
    return elemento;
}

// Monta um parágrafo misturando texto normal e partes em negrito: ["Olá ", ["negrito"], "!"]
function preencherComDestaques(elemento, partes) {
    elemento.textContent = "";
    partes.forEach(parte => {
        elemento.appendChild(Array.isArray(parte)
            ? criarElemento("strong", parte[0])
            : document.createTextNode(parte));
    });
}

function formatarPorcentagem(valor) {
    return Number(valor).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "%";
}

function plural(quantidade, singular, pluralTexto) {
    return `${quantidade} ${quantidade === 1 ? singular : pluralTexto}`;
}

// Bom dia / Boa tarde / Boa noite, conforme o horário
function atualizarSaudacao() {
    const hora = new Date().getHours();
    const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
    document.getElementById("saudacao").textContent = saudacao;
}

// Guia da matéria (definido em materias.js), para os botões "Revisar"
function guiaDaMateria(nomeMateria) {
    if (typeof guiasMaterias === "undefined") return null;
    const materia = guiasMaterias.find(item => item.nome === nomeMateria);
    return materia && materia.topicos.length ? { materia, topico: materia.topicos[0] } : null;
}

function totalFlashcardsNoDeck() {
    if (typeof bancoFlashcards === "undefined") return 0;
    return Object.values(bancoFlashcards).reduce((soma, cartoes) => soma + cartoes.length, 0);
}

function definirTrend(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.classList.toggle("positivo", tipo === "positivo");
    elemento.classList.toggle("negativo", tipo === "negativo");
}

// ---------- Cartões do topo ----------
function preencherCartoes(dados) {
    // Desempenho geral (últimos 7 dias)
    const desempenho = dados.desempenho;
    document.getElementById("desempenhoGeral").textContent =
        desempenho.total ? formatarPorcentagem(desempenho.porcentagem) : "—";

    const trendDesempenho = document.getElementById("desempenhoTrend");
    if (!desempenho.total) {
        definirTrend(trendDesempenho, "Sem dados ainda");
    } else if (desempenho.variacao === null) {
        definirTrend(trendDesempenho, `${plural(desempenho.total, "questão", "questões")} em 7 dias`);
    } else if (desempenho.variacao > 0) {
        definirTrend(trendDesempenho, `↑ ${formatarPorcentagem(desempenho.variacao)} esta semana`, "positivo");
    } else if (desempenho.variacao < 0) {
        definirTrend(trendDesempenho, `↓ ${formatarPorcentagem(-desempenho.variacao)} esta semana`, "negativo");
    } else {
        definirTrend(trendDesempenho, "= igual à semana passada");
    }

    // Questões hoje x meta
    const questoes = dados.questoes_hoje;
    document.getElementById("questoesHoje").textContent = questoes.total;
    document.getElementById("questoesBarra").style.width = Math.min(100, (questoes.total / questoes.meta) * 100) + "%";
    const faltam = questoes.meta - questoes.total;
    if (faltam > 0) {
        definirTrend(document.getElementById("questoesTrend"), `Meta: ${questoes.meta} · faltam ${faltam}`);
    } else {
        definirTrend(document.getElementById("questoesTrend"), `Meta de ${questoes.meta} batida! 🎉`, "positivo");
    }

    // Flashcards revisados hoje
    const flashcards = dados.flashcards_hoje;
    const totalDeck = totalFlashcardsNoDeck();
    document.getElementById("flashcardsHoje").textContent = flashcards.total;
    document.getElementById("flashcardsBarra").style.width =
        (totalDeck ? Math.min(100, (flashcards.total / totalDeck) * 100) : 0) + "%";
    definirTrend(
        document.getElementById("flashcardsTrend"),
        flashcards.total
            ? `de ${totalDeck} · ${flashcards.sabia} você já sabia`
            : `de ${totalDeck} cartões no deck`,
        flashcards.total && flashcards.total >= totalDeck ? "positivo" : null
    );

    // Dias de sequência
    const sequencia = dados.sequencia;
    document.getElementById("sequenciaAtual").textContent = sequencia.atual;
    const trendSequencia = document.getElementById("sequenciaTrend");
    if (sequencia.atual > 0 && !sequencia.estudou_hoje) {
        definirTrend(trendSequencia, "Estude hoje para não perder!", "negativo");
    } else if (sequencia.atual > 0 && sequencia.atual >= sequencia.recorde) {
        definirTrend(trendSequencia, "Seu novo recorde! 🔥", "positivo");
    } else {
        definirTrend(trendSequencia, `Recorde: ${plural(sequencia.recorde, "dia", "dias")}`);
    }
}

// ---------- Frase do topo ----------
function preencherResumo(dados) {
    const resumo = document.getElementById("resumoDia");
    const revisar = dados.revisar_hoje.length;

    if (revisar > 0) {
        preencherComDestaques(resumo, ["Você tem ", [plural(revisar, "matéria", "matérias")], " para revisar hoje. Vamos lá?"]);
    } else if (!dados.materias.length) {
        preencherComDestaques(resumo, ["Ainda não temos seu histórico. ", ["Faça um simulado"], " para o StudyMind descobrir seus pontos fracos."]);
    } else if (dados.questoes_hoje.total < dados.questoes_hoje.meta) {
        preencherComDestaques(resumo, ["Nada para revisar! Faltam ", [plural(dados.questoes_hoje.meta - dados.questoes_hoje.total, "questão", "questões")], " para a meta de hoje."]);
    } else {
        preencherComDestaques(resumo, ["Meta do dia batida e nada para revisar. ", ["Mandou bem!"]]);
    }
}

// Matérias do banco de questões que ainda não foram praticadas
function materiasNaoPraticadas(dados) {
    if (typeof bancoQuestoes === "undefined") return [];
    const praticadas = new Set(dados.materias.map(item => item.materia));
    return Object.keys(bancoQuestoes).filter(nome => !praticadas.has(nome));
}

// ---------- Botões "Revisar" (ao lado do círculo) ----------
function preencherBotoesRevisar(dados) {
    const botoes = document.getElementById("botoesRevisar");
    botoes.textContent = "";

    // Matérias fracas primeiro; se não houver, sugere as que nunca foram praticadas
    const itens = dados.fracas.map(item => ({ nome: item.materia, detalhe: `${formatarPorcentagem(item.porcentagem)} de acerto` }));
    if (!itens.length) {
        materiasNaoPraticadas(dados).forEach(nome => itens.push({ nome, detalhe: "Ainda não praticada" }));
    }

    itens.slice(0, 2).forEach(item => {
        const botao = criarElemento("button", null, "btn-revisar");
        botao.appendChild(criarElemento("i", null, "fa-solid fa-rotate"));
        botao.appendChild(document.createTextNode(" " + item.nome + " "));
        botao.appendChild(criarElemento("span", "REVISAR"));
        botao.title = item.detalhe;
        botao.addEventListener("click", () => praticarMateria(item.nome));
        botoes.appendChild(botao);
    });
}

// ---------- "Revisar hoje" ----------
// Só aparecem as matérias em que a pessoa errou algo ontem ou hoje
// (questão do simulado ou flashcard marcado como "Preciso revisar").
function preencherRevisarHoje(dados) {
    const grade = document.getElementById("topicosRevisar");
    const contador = document.getElementById("revisarContador");
    grade.textContent = "";

    const itens = dados.revisar_hoje;
    contador.hidden = !itens.length;
    contador.textContent = plural(itens.length, "matéria", "matérias");

    itens.forEach(item => grade.appendChild(criarCartaoRevisar(item)));

    if (!itens.length) {
        const vazio = criarElemento("div", null, "revisar-vazio");
        vazio.appendChild(criarElemento("i", null, "fa-solid fa-circle-check"));
        const texto = criarElemento("div");
        texto.appendChild(criarElemento("strong", "Tudo em dia!"));
        texto.appendChild(criarElemento("p",
            "Quando você errar uma questão do simulado ou um flashcard, a matéria aparece aqui para revisar."));
        vazio.appendChild(texto);
        grade.appendChild(vazio);
    }
}

// Abre os flashcards já filtrados na matéria
function revisarFlashcardsDaMateria(nomeMateria) {
    mostrarSecao("flashcards");
    window.scrollTo(0, 0);
    const filtro = Array.from(document.querySelectorAll(".filtro-fc"))
        .find(botao => botao.textContent.trim() === nomeMateria);
    if (filtro) filtro.click();
}

function criarBotaoRevisar(texto, icone, classe, acao) {
    const botao = criarElemento("button", null, classe);
    botao.type = "button";
    botao.appendChild(criarElemento("i", null, "fa-solid " + icone));
    botao.appendChild(document.createTextNode(" " + texto));
    botao.addEventListener("click", acao);
    return botao;
}

// Um cartão do "Revisar hoje": matéria, onde foram os erros e atalhos para revisar
function criarCartaoRevisar(item) {
    const guia = guiaDaMateria(item.materia);
    const infoMateria = guia ? guia.materia : null;

    const cartao = criarElemento("article", null, "revisar-card");
    if (infoMateria && infoMateria.cor) cartao.style.setProperty("--cor-materia", infoMateria.cor);

    // Topo: ícone, nome e área da matéria
    const topo = criarElemento("div", null, "revisar-card-topo");
    const icone = criarElemento("span", null, "revisar-card-icone");
    icone.appendChild(criarElemento("i", null, "fa-solid " + (infoMateria && infoMateria.icone ? infoMateria.icone : "fa-book-open")));
    topo.appendChild(icone);
    const nomes = criarElemento("div");
    nomes.appendChild(criarElemento("strong", item.materia, "revisar-card-nome"));
    if (infoMateria && infoMateria.area) nomes.appendChild(criarElemento("span", infoMateria.area, "revisar-card-area"));
    topo.appendChild(nomes);
    cartao.appendChild(topo);

    // Onde foram os erros
    const erros = criarElemento("ul", null, "revisar-card-erros");
    if (item.questoes > 0) {
        const linha = criarElemento("li", null, "erro-simulado");
        linha.appendChild(criarElemento("i", null, "fa-solid fa-pen-to-square"));
        linha.appendChild(document.createTextNode(" " + plural(item.questoes, "questão errada", "questões erradas")));
        erros.appendChild(linha);
    }
    if (item.flashcards > 0) {
        const linha = criarElemento("li", null, "erro-flashcard");
        linha.appendChild(criarElemento("i", null, "fa-solid fa-layer-group"));
        linha.appendChild(document.createTextNode(" " + plural(item.flashcards, "flashcard para revisar", "flashcards para revisar")));
        erros.appendChild(linha);
    }
    cartao.appendChild(erros);

    // Ações: o primeiro botão é o principal
    const acoes = criarElemento("div", null, "revisar-card-acoes");
    const botoes = [];
    if (item.questoes > 0) {
        botoes.push(["Refazer questões", "fa-rotate-right", () => praticarMateria(item.materia)]);
    }
    if (item.flashcards > 0) {
        botoes.push(["Revisar flashcards", "fa-layer-group", () => revisarFlashcardsDaMateria(item.materia)]);
    }
    if (guia) {
        botoes.push(["Ver guia", "fa-book-open", () => abrirMateria(guia.materia.id)]);
    }
    botoes.forEach(([texto, iconeBotao, acao], i) => {
        acoes.appendChild(criarBotaoRevisar(texto, iconeBotao,
            i === 0 ? "revisar-btn revisar-btn-principal" : "revisar-btn", acao));
    });
    cartao.appendChild(acoes);

    return cartao;
}

// ---------- Recomendação do StudyMind ----------
function preencherRecomendacao(dados) {
    const texto = document.getElementById("recomendacaoTexto");
    const botao = document.getElementById("recomendacaoBotao");
    let materiaSugerida = null;

    if (dados.fracas.length) {
        const pior = dados.fracas[0];
        const guia = guiaDaMateria(pior.materia);
        preencherComDestaques(texto, [
            "Com base no seu histórico, priorize ", [guia ? `${guia.topico.titulo} (${pior.materia})` : pior.materia],
            ` hoje. Seu acerto nas últimas ${pior.ultimas_total} questões foi de apenas `,
            [formatarPorcentagem(pior.ultimas_porcentagem)], "."
        ]);
        materiaSugerida = pior.materia;
    } else if (!dados.materias.length) {
        preencherComDestaques(texto, ["Comece por um simulado curto. Depois de algumas questões eu mostro ", ["onde você mais precisa melhorar"], "."]);
        materiaSugerida = typeof bancoQuestoes !== "undefined" ? Object.keys(bancoQuestoes)[0] : null;
    } else {
        const novas = materiasNaoPraticadas(dados);
        if (novas.length) {
            preencherComDestaques(texto, ["Você está indo bem! Que tal variar e treinar ", [novas[0]], ", que você ainda não praticou?"]);
            materiaSugerida = novas[0];
        } else {
            // Sem matéria fraca: reforça a de menor acerto
            const menor = [...dados.materias].sort((a, b) => a.porcentagem - b.porcentagem)[0];
            preencherComDestaques(texto, ["Ótimo desempenho! Para subir ainda mais, reforce ", [menor.materia],
                ", com ", [formatarPorcentagem(menor.porcentagem)], " de acerto."]);
            materiaSugerida = menor.materia;
        }
    }

    botao.hidden = !materiaSugerida;
    if (materiaSugerida) {
        botao.textContent = `Fazer questões de ${materiaSugerida} →`;
        botao.onclick = () => praticarMateria(materiaSugerida);
    }
}

async function buscarDashboard() {
    atualizarSaudacao();
    try {
        const resposta = await fetch("/dashboard");
        const dados = await resposta.json();
        if (!resposta.ok || !dados.sucesso) throw new Error(dados.mensagem);

        preencherCartoes(dados);
        preencherResumo(dados);
        preencherBotoesRevisar(dados);
        preencherRevisarHoje(dados);
        preencherRecomendacao(dados);
    } catch (erro) {
        console.error("Não foi possível carregar o dashboard:", erro);
        document.getElementById("resumoDia").textContent = "Não foi possível carregar seu resumo agora.";
        document.getElementById("recomendacaoTexto").textContent = "Assim que o servidor responder, sua recomendação aparece aqui.";
    }
}

// Guarda cada flashcard avaliado, para o cartão "Flashcards revisados" e a sequência de dias
function registrarFlashcard(cartao, sabia) {
    fetch("/registrar-flashcard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartao: cartao.id, materia: cartao.materia, sabia: sabia })
    })
        .then(() => buscarDashboard())
        .catch(erro => console.error("Erro ao registrar flashcard:", erro));
}

document.addEventListener("DOMContentLoaded", buscarDashboard);
