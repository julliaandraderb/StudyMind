// ===============================================
// GUIAS DE ESTUDO POR MATÉRIA
// Cada matéria tem uma lista de tópicos, e cada tópico é um guia com seções.
//
// Para adicionar um guia novo, copie um tópico { ... } e troque o conteúdo.
// Campos de cada seção (todos opcionais, exceto titulo):
//   titulo, resumo, conceito (lista de parágrafos),
//   diagrama { titulo, svg, legenda },
//   cards [{ titulo, texto }],
//   exemplo { titulo, enunciado, passos [], resultado },
//   atencao
// Pode usar <strong> e <sub>/<sup> nos textos.
// ===============================================

// Desenha um resistor (zigue-zague) na horizontal, começando em (x, y), com 40 de largura
function svgResistorH(x, y) {
    return `<path class="dg-roxo" d="M${x} ${y} l5 -8 l10 16 l10 -16 l10 16 l5 -8" />`;
}

// Desenha um resistor (zigue-zague) na vertical, começando em (x, y), com 40 de altura
function svgResistorV(x, y) {
    return `<path class="dg-roxo" d="M${x} ${y} l8 5 l-16 10 l16 10 l-16 10 l8 5" />`;
}

// Grade 10 x 10 com "pintados" quadradinhos preenchidos (para porcentagem)
function svgGradePorcentagem(pintados) {
    let quadrados = "";
    for (let i = 0; i < 100; i++) {
        const linha = Math.floor(i / 10);
        const coluna = i % 10;
        const classe = i < pintados ? "dg-quadro-cheio" : "dg-quadro";
        quadrados += `<rect class="${classe}" x="${130 + coluna * 14}" y="${12 + linha * 14}" width="12" height="12" rx="2" />`;
    }
    return `<svg viewBox="0 0 400 160" role="img" aria-label="Grade com ${pintados} de 100 quadrados pintados">
        ${quadrados}
        <text class="dg-txt dg-forte" x="285" y="70">${pintados} de 100</text>
        <text class="dg-txt" x="285" y="88">= ${pintados}%</text>
        <text class="dg-txt" x="285" y="106">= ${pintados}/100 = 0,${pintados}</text>
    </svg>`;
}

const guiasMaterias = [
    // =========================================================
    // FÍSICA
    // =========================================================
    {
        id: "fisica",
        nome: "Física",
        area: "Ciências da Natureza",
        icone: "fa-atom",
        cor: "#8e5cc7",
        topicos: [
            {
                id: "eletrodinamica",
                titulo: "Eletrodinâmica",
                subtitulo: "Um guia completo para dominar corrente, tensão, resistência, associações, potência elétrica e análise de circuitos.",
                calculo: true,
                formulas: ["i = ΔQ/Δt", "U = R · i", "R = ρ · L/A", "P = U · i", "E = P · Δt"],
                secoes: [
                    {
                        titulo: "Fundamentos elétricos",
                        resumo: "A eletrodinâmica estuda cargas elétricas em movimento e os efeitos produzidos por elas nos circuitos.",
                        conceito: [
                            "Nos metais, alguns elétrons estão fracamente ligados aos átomos e podem se deslocar pelo material. Sem uma fonte de tensão, esse movimento é desordenado e não existe corrente resultante.",
                            "Quando uma pilha ou tomada estabelece uma <strong>diferença de potencial</strong>, surge um campo elétrico no condutor e os elétrons passam a se mover de forma ordenada. Esse movimento ordenado é a <strong>corrente elétrica</strong>."
                        ],
                        diagrama: {
                            titulo: "Como a corrente se estabelece",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Circuito com fonte e resistor mostrando a corrente convencional e o movimento dos elétrons em sentidos opostos">
                                <path class="dg-traco" d="M70 84 V50 H330 V65" />
                                <path class="dg-traco" d="M330 105 V140 H70 V96" />
                                ${svgResistorV(330, 65)}
                                <line class="dg-laranja dg-grosso" x1="56" y1="84" x2="84" y2="84" />
                                <line class="dg-laranja dg-grosso" x1="63" y1="96" x2="77" y2="96" />
                                <text class="dg-txt dg-laranja-txt" x="40" y="80">+</text>
                                <text class="dg-txt dg-laranja-txt" x="42" y="104">−</text>
                                <text class="dg-txt dg-laranja-txt" x="92" y="94">fonte</text>
                                <text class="dg-txt dg-roxo-txt" x="345" y="90">resistor</text>
                                <line class="dg-laranja" x1="150" y1="34" x2="245" y2="34" />
                                <polygon class="dg-laranja-cheio" points="245,29 255,34 245,39" />
                                <text class="dg-txt" x="150" y="24">corrente convencional (i)</text>
                                <circle class="dg-roxo-cheio" cx="170" cy="50" r="3.5" />
                                <circle class="dg-roxo-cheio" cx="200" cy="50" r="3.5" />
                                <circle class="dg-roxo-cheio" cx="230" cy="50" r="3.5" />
                                <line class="dg-roxo" x1="250" y1="66" x2="155" y2="66" />
                                <polygon class="dg-roxo-cheio" points="155,61 145,66 155,71" />
                                <text class="dg-txt" x="150" y="84">movimento dos elétrons</text>
                            </svg>`,
                            legenda: "A pilha mantém a diferença de potencial. A corrente convencional percorre o circuito externo do polo positivo para o negativo; os elétrons se deslocam no sentido oposto."
                        },
                        cards: [
                            { titulo: "Carga elétrica (Q)", texto: "Propriedade da matéria medida em coulomb (C). A carga é quantizada: Q = n · e, com e = 1,6 × 10<sup>−19</sup> C." },
                            { titulo: "Corrente elétrica (i)", texto: "Fluxo ordenado de cargas. A intensidade média é i = ΔQ/Δt e sua unidade é o ampère (A), equivalente a C/s." },
                            { titulo: "Tensão elétrica (U)", texto: "Diferença de potencial entre dois pontos: é a energia fornecida a cada unidade de carga. Unidade: volt (V), equivalente a J/C." },
                            { titulo: "Sentido da corrente", texto: "O sentido convencional vai do polo positivo para o negativo pelo circuito externo. Os elétrons, que são os portadores reais nos metais, andam ao contrário." }
                        ],
                        exemplo: {
                            titulo: "Corrente e quantidade de elétrons",
                            enunciado: "Uma corrente constante de 2 A atravessa um fio durante 5 s. Determine a carga transportada e o número de elétrons que passou por uma seção do fio.",
                            passos: [
                                "Pela definição de corrente: i = ΔQ/Δt, portanto ΔQ = i · Δt.",
                                "ΔQ = 2 A · 5 s = 10 C.",
                                "Como Q = n · e, temos n = Q/e = 10/(1,6 × 10<sup>−19</sup>)."
                            ],
                            resultado: "10 C e aproximadamente 6,25 × 10<sup>19</sup> elétrons."
                        },
                        atencao: "Ampère não mede quantidade de carga. Ele mede a rapidez com que a carga atravessa uma seção do condutor: 1 A = 1 C/s."
                    },
                    {
                        titulo: "Resistência e Leis de Ohm",
                        resumo: "A resistência representa a oposição de um material à passagem da corrente elétrica.",
                        conceito: [
                            "Quando os elétrons se movem pelo condutor, eles colidem com os átomos do material. Essas colisões dificultam a passagem da corrente e transformam energia elétrica em calor. A medida dessa dificuldade é a <strong>resistência elétrica (R)</strong>, em ohms (Ω).",
                            "A <strong>1ª Lei de Ohm</strong> diz que, em um resistor ôhmico, a tensão é proporcional à corrente: U = R · i. A <strong>2ª Lei de Ohm</strong> mostra do que a resistência depende: do material (resistividade ρ), do comprimento L e da área da seção A do fio."
                        ],
                        diagrama: {
                            titulo: "Gráfico U × i",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Gráfico de tensão por corrente: reta para resistor ôhmico e curva para não ôhmico">
                                <line class="dg-traco" x1="60" y1="150" x2="360" y2="150" />
                                <line class="dg-traco" x1="60" y1="150" x2="60" y2="15" />
                                <polygon class="dg-tinta-cheio" points="360,145 370,150 360,155" />
                                <polygon class="dg-tinta-cheio" points="55,15 60,5 65,15" />
                                <text class="dg-txt" x="335" y="166">i (A)</text>
                                <text class="dg-txt" x="18" y="20">U (V)</text>
                                <line class="dg-roxo dg-grosso" x1="60" y1="150" x2="320" y2="40" />
                                <path class="dg-laranja dg-tracejado" d="M60 150 Q 230 140 300 25" />
                                <text class="dg-txt dg-roxo-txt" x="326" y="44">ôhmico</text>
                                <text class="dg-txt dg-roxo-txt" x="326" y="58">(R constante)</text>
                                <text class="dg-txt dg-laranja-txt" x="235" y="138">não ôhmico</text>
                            </svg>`,
                            legenda: "No resistor ôhmico o gráfico é uma reta que passa pela origem e a inclinação é a resistência. Em componentes não ôhmicos (como lâmpadas incandescentes e LEDs), R muda com a corrente."
                        },
                        cards: [
                            { titulo: "1ª Lei de Ohm", texto: "U = R · i. Para um resistor ôhmico, dobrar a tensão dobra a corrente, porque R permanece constante." },
                            { titulo: "2ª Lei de Ohm", texto: "R = ρ · L/A. Fio mais comprido → mais resistência. Fio mais grosso → menos resistência." },
                            { titulo: "Resistividade (ρ)", texto: "Característica do material, em Ω · m. Metais como cobre e prata têm ρ baixa (bons condutores); borracha e vidro têm ρ altíssima (isolantes)." },
                            { titulo: "Temperatura", texto: "Nos metais, a resistividade aumenta com a temperatura. Por isso o filamento de uma lâmpada incandescente tem resistência maior quando está aceso." }
                        ],
                        exemplo: {
                            titulo: "Mudando as dimensões do fio",
                            enunciado: "Um fio tem resistência R. Outro fio, do mesmo material, tem o dobro do comprimento e metade da área da seção. Qual é a resistência do segundo fio?",
                            passos: [
                                "Primeiro fio: R = ρ · L/A.",
                                "Segundo fio: R' = ρ · (2L)/(A/2).",
                                "R' = ρ · 2L · 2/A = 4 · (ρ · L/A) = 4R."
                            ],
                            resultado: "A resistência fica 4 vezes maior: R' = 4R."
                        },
                        atencao: "Cuidado com diâmetro e área: a área da seção é A = π · r². Dobrar o diâmetro quadruplica a área e, portanto, divide a resistência por 4."
                    },
                    {
                        titulo: "Associação de resistores",
                        resumo: "Resistores podem ser ligados em série, em paralelo ou de forma mista. Cada tipo tem regras próprias.",
                        conceito: [
                            "Na <strong>associação em série</strong>, os resistores ficam um depois do outro, em um único caminho. A corrente é a mesma em todos e a tensão total se divide entre eles.",
                            "Na <strong>associação em paralelo</strong>, os resistores ficam ligados aos mesmos dois pontos, formando caminhos alternativos. A tensão é a mesma em todos e a corrente total se divide entre os ramos.",
                            "O <strong>resistor equivalente (R<sub>eq</sub>)</strong> é um único resistor que, colocado no lugar da associação, produziria a mesma corrente total."
                        ],
                        diagrama: {
                            titulo: "Série × paralelo",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Resistores em série à esquerda e em paralelo à direita">
                                <text class="dg-txt dg-forte" x="70" y="22">Série</text>
                                <path class="dg-traco" d="M15 85 H45" />
                                ${svgResistorH(45, 85)}
                                <path class="dg-traco" d="M85 85 H110" />
                                ${svgResistorH(110, 85)}
                                <path class="dg-traco" d="M150 85 H180" />
                                <text class="dg-txt" x="55" y="68">R₁</text>
                                <text class="dg-txt" x="120" y="68">R₂</text>
                                <text class="dg-txt" x="38" y="120">mesma corrente</text>
                                <text class="dg-txt" x="30" y="138">R<tspan dy="3" font-size="8">eq</tspan><tspan dy="-3"> = R₁ + R₂</tspan></text>
                                <line class="dg-separador" x1="200" y1="20" x2="200" y2="150" />
                                <text class="dg-txt dg-forte" x="275" y="22">Paralelo</text>
                                <path class="dg-traco" d="M215 85 H240 M240 50 V120 M240 50 H270 M310 50 H340 M240 120 H270 M310 120 H340 M340 50 V120 M340 85 H385" />
                                ${svgResistorH(270, 50)}
                                ${svgResistorH(270, 120)}
                                <text class="dg-txt" x="282" y="36">R₁</text>
                                <text class="dg-txt" x="282" y="106">R₂</text>
                                <text class="dg-txt" x="250" y="146">mesma tensão</text>
                                <text class="dg-txt" x="225" y="164">1/R<tspan dy="3" font-size="8">eq</tspan><tspan dy="-3"> = 1/R₁ + 1/R₂</tspan></text>
                            </svg>`,
                            legenda: "Em série há um único caminho para a corrente. Em paralelo, a corrente se divide entre os ramos e cada resistor recebe a mesma tensão."
                        },
                        cards: [
                            { titulo: "Série", texto: "R<sub>eq</sub> = R₁ + R₂ + ... A corrente é igual em todos; U<sub>total</sub> = U₁ + U₂ + ... Se um componente queima, o circuito todo para." },
                            { titulo: "Paralelo", texto: "1/R<sub>eq</sub> = 1/R₁ + 1/R₂ + ... A tensão é igual em todos; i<sub>total</sub> = i₁ + i₂ + ..." },
                            { titulo: "Atalho para dois resistores", texto: "Em paralelo: R<sub>eq</sub> = (R₁ · R₂)/(R₁ + R₂), ou seja, produto pela soma." },
                            { titulo: "Resistores iguais", texto: "n resistores iguais a R: em série, R<sub>eq</sub> = n · R; em paralelo, R<sub>eq</sub> = R/n." }
                        ],
                        exemplo: {
                            titulo: "Dois resistores em paralelo",
                            enunciado: "Resistores de 6 Ω e 3 Ω estão em paralelo, ligados a uma fonte de 12 V. Calcule a resistência equivalente, a corrente total e a corrente em cada resistor.",
                            passos: [
                                "R<sub>eq</sub> = (6 · 3)/(6 + 3) = 18/9 = 2 Ω.",
                                "Corrente total: i = U/R<sub>eq</sub> = 12/2 = 6 A.",
                                "Cada resistor recebe 12 V: i₁ = 12/6 = 2 A e i₂ = 12/3 = 4 A.",
                                "Conferindo: i₁ + i₂ = 2 + 4 = 6 A."
                            ],
                            resultado: "R<sub>eq</sub> = 2 Ω, corrente total de 6 A, sendo 2 A no resistor de 6 Ω e 4 A no de 3 Ω."
                        },
                        atencao: "Em paralelo, a resistência equivalente é sempre menor que o menor resistor da associação. É por isso que as tomadas de uma casa são ligadas em paralelo: cada aparelho recebe a mesma tensão e funciona de forma independente."
                    },
                    {
                        titulo: "Potência, energia e efeito Joule",
                        resumo: "Potência é a rapidez com que a energia elétrica é transformada. É o que aparece nas questões de conta de luz.",
                        conceito: [
                            "A <strong>potência elétrica</strong> indica quanta energia um aparelho transforma por segundo. Ela é medida em watts (W): 1 W = 1 J/s.",
                            "A <strong>energia consumida</strong> depende da potência e do tempo de uso: E = P · Δt. Na conta de luz, a energia aparece em <strong>quilowatt-hora (kWh)</strong>, que é a energia de um aparelho de 1 000 W funcionando por 1 hora.",
                            "O <strong>efeito Joule</strong> é a transformação de energia elétrica em calor quando a corrente atravessa um resistor. É o princípio de chuveiros, ferros de passar e aquecedores."
                        ],
                        cards: [
                            { titulo: "Três formas da potência", texto: "P = U · i = R · i² = U²/R. Use a que tiver os dados do problema." },
                            { titulo: "Energia", texto: "E = P · Δt. Com P em kW e Δt em horas, a energia sai direto em kWh." },
                            { titulo: "kWh em joules", texto: "1 kWh = 1 000 W · 3 600 s = 3,6 × 10<sup>6</sup> J." },
                            { titulo: "Valor da conta", texto: "Custo = energia (kWh) × tarifa (R$/kWh)." }
                        ],
                        exemplo: {
                            titulo: "Gasto de um chuveiro",
                            enunciado: "Um chuveiro de 5 500 W / 220 V é usado 15 minutos por dia durante 30 dias. Calcule a corrente, a energia consumida no mês e o custo, se o kWh custa R$ 0,80.",
                            passos: [
                                "Corrente: i = P/U = 5 500/220 = 25 A.",
                                "Tempo total: 15 min · 30 = 450 min = 7,5 h.",
                                "Energia: E = 5,5 kW · 7,5 h = 41,25 kWh.",
                                "Custo: 41,25 · 0,80 = R$ 33,00."
                            ],
                            resultado: "Corrente de 25 A, consumo de 41,25 kWh e custo de R$ 33,00 no mês."
                        },
                        atencao: "Na posição \"inverno\", o chuveiro tem resistência MENOR. Com a tensão fixa, P = U²/R aumenta quando R diminui: menos resistência significa mais potência e água mais quente."
                    },
                    {
                        titulo: "Geradores, receptores e circuitos",
                        resumo: "Geradores fornecem energia elétrica ao circuito; receptores a transformam em outra forma de energia útil, que não seja só calor.",
                        conceito: [
                            "Um <strong>gerador</strong> (pilha, bateria, usina) transforma outra forma de energia em energia elétrica. Ele tem uma <strong>força eletromotriz (ε)</strong>, que é a tensão que ele produz, e uma <strong>resistência interna (r)</strong>, que desperdiça parte da energia como calor.",
                            "Por isso, a tensão entregue nos terminais é menor que ε quando há corrente: U = ε − r · i. Em um circuito simples com um gerador e um resistor externo R, a corrente é dada pela <strong>Lei de Pouillet</strong>: i = ε/(R + r).",
                            "Um <strong>receptor</strong> (motor elétrico, ventilador) transforma energia elétrica em energia mecânica, por exemplo. Ele tem uma força contraeletromotriz ε' e U = ε' + r' · i."
                        ],
                        diagrama: {
                            titulo: "Gerador real em um circuito",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Circuito com gerador de força eletromotriz e resistência interna ligado a um resistor externo">
                                <rect class="dg-caixa-tracejada" x="30" y="40" width="90" height="105" rx="10" />
                                <text class="dg-txt dg-laranja-txt" x="34" y="34">gerador real</text>
                                <path class="dg-traco" d="M75 60 V30 H320 V65 M320 105 V150 H75 V125" />
                                <line class="dg-laranja dg-grosso" x1="61" y1="60" x2="89" y2="60" />
                                <line class="dg-laranja dg-grosso" x1="68" y1="72" x2="82" y2="72" />
                                <path class="dg-traco" d="M75 72 V85" />
                                ${svgResistorV(75, 85)}
                                <text class="dg-txt" x="96" y="70">ε</text>
                                <text class="dg-txt" x="92" y="110">r</text>
                                ${svgResistorV(320, 65)}
                                <text class="dg-txt dg-roxo-txt" x="335" y="90">R (externo)</text>
                                <line class="dg-laranja" x1="170" y1="18" x2="240" y2="18" />
                                <polygon class="dg-laranja-cheio" points="240,13 250,18 240,23" />
                                <text class="dg-txt" x="150" y="50">i = ε/(R + r)</text>
                            </svg>`,
                            legenda: "A resistência interna r fica \"dentro\" do gerador. Parte da tensão ε se perde nela; o resto, U = ε − r · i, chega ao resistor externo."
                        },
                        cards: [
                            { titulo: "Equação do gerador", texto: "U = ε − r · i. Se o gerador é ideal (r = 0), U = ε." },
                            { titulo: "Lei de Pouillet", texto: "Para um gerador ligado a uma resistência externa R: i = ε/(R + r)." },
                            { titulo: "Curto-circuito", texto: "Ligando os terminais diretamente (R = 0), a corrente é máxima: i<sub>cc</sub> = ε/r. É perigoso porque aquece muito." },
                            { titulo: "Equação do receptor", texto: "U = ε' + r' · i. O receptor precisa receber uma tensão maior que sua força contraeletromotriz." }
                        ],
                        exemplo: {
                            titulo: "Bateria com resistência interna",
                            enunciado: "Uma bateria de força eletromotriz 12 V e resistência interna 1 Ω alimenta um resistor de 5 Ω. Calcule a corrente e a tensão nos terminais da bateria.",
                            passos: [
                                "Pouillet: i = ε/(R + r) = 12/(5 + 1) = 2 A.",
                                "Tensão nos terminais: U = ε − r · i = 12 − 1 · 2 = 10 V.",
                                "Conferindo no resistor: U = R · i = 5 · 2 = 10 V."
                            ],
                            resultado: "Corrente de 2 A e tensão de 10 V nos terminais."
                        },
                        atencao: "A força eletromotriz ε só é igual à tensão nos terminais quando o gerador não fornece corrente (circuito aberto) ou quando é ideal (r = 0)."
                    },
                    {
                        titulo: "Medição e segurança",
                        resumo: "Como medir corrente e tensão corretamente, e como funcionam fusíveis, disjuntores e o aterramento.",
                        conceito: [
                            "O <strong>amperímetro</strong> mede corrente e deve ser ligado <strong>em série</strong>, para que toda a corrente passe por ele. O ideal tem resistência nula, para não atrapalhar o circuito.",
                            "O <strong>voltímetro</strong> mede tensão e deve ser ligado <strong>em paralelo</strong> com o componente. O ideal tem resistência infinita, para não desviar corrente.",
                            "<strong>Fusíveis e disjuntores</strong> ficam em série com o circuito e interrompem a corrente quando ela passa do limite, evitando superaquecimento dos fios e incêndios."
                        ],
                        diagrama: {
                            titulo: "Onde ligar cada medidor",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Amperímetro em série no circuito e voltímetro em paralelo com o resistor">
                                <path class="dg-traco" d="M60 84 V40 H150 M190 40 H280 V65 M280 105 V140 H60 V96" />
                                <line class="dg-laranja dg-grosso" x1="46" y1="84" x2="74" y2="84" />
                                <line class="dg-laranja dg-grosso" x1="53" y1="96" x2="67" y2="96" />
                                <circle class="dg-medidor" cx="170" cy="40" r="20" />
                                <text class="dg-txt dg-forte" x="164" y="45">A</text>
                                <text class="dg-txt" x="128" y="76">amperímetro</text>
                                <text class="dg-txt" x="140" y="90">em série</text>
                                ${svgResistorV(280, 65)}
                                <path class="dg-traco" d="M280 52 H350 V65 M280 118 H350 V105" />
                                <circle class="dg-medidor" cx="350" cy="85" r="20" />
                                <text class="dg-txt dg-forte" x="344" y="90">V</text>
                                <text class="dg-txt" x="296" y="155">voltímetro em paralelo</text>
                            </svg>`,
                            legenda: "O amperímetro fica no caminho da corrente. O voltímetro é ligado nos dois lados do componente cuja tensão queremos medir."
                        },
                        cards: [
                            { titulo: "Amperímetro", texto: "Em série. Ideal: resistência zero. Ligado em paralelo por engano, pode provocar um curto." },
                            { titulo: "Voltímetro", texto: "Em paralelo. Ideal: resistência infinita, para não desviar corrente do circuito." },
                            { titulo: "Fusível e disjuntor", texto: "Em série. O fusível derrete e precisa ser trocado; o disjuntor desarma e pode ser religado." },
                            { titulo: "Aterramento", texto: "O fio terra oferece um caminho de baixa resistência para a corrente de fuga ir para o solo, em vez de passar pelo corpo de quem toca o aparelho." }
                        ],
                        exemplo: {
                            titulo: "Escolhendo o disjuntor",
                            enunciado: "Um forno elétrico de 2 540 W será ligado em uma rede de 127 V. Qual é a corrente no circuito e qual deve ser a capacidade mínima do disjuntor?",
                            passos: [
                                "i = P/U = 2 540/127 = 20 A.",
                                "O disjuntor precisa suportar pelo menos essa corrente sem desarmar.",
                                "Escolhe-se o valor comercial logo acima (por exemplo, 25 A), desde que a fiação também suporte essa corrente."
                            ],
                            resultado: "A corrente é de 20 A; o disjuntor deve ser de pelo menos 20 A, compatível com a bitola do fio."
                        },
                        atencao: "Um pássaro pousado em um fio de alta tensão não leva choque porque as duas patas estão praticamente no mesmo potencial: a diferença de potencial sobre ele é quase zero e quase não passa corrente pelo seu corpo."
                    }
                ]
            }
        ]
    },

    // =========================================================
    // MATEMÁTICA
    // =========================================================
    {
        id: "matematica",
        nome: "Matemática",
        area: "Matemática e suas Tecnologias",
        icone: "fa-square-root-variable",
        cor: "#7b2cbf",
        topicos: [
            {
                id: "porcentagem",
                titulo: "Porcentagem",
                subtitulo: "Da ideia de \"por cento\" até aumentos, descontos, variação percentual e juros: um dos assuntos mais úteis no dia a dia e nas provas.",
                calculo: true,
                formulas: ["p% = p/100", "parte = p% · todo", "V = V₀ · (1 ± p%)", "Δ% = (V − V₀)/V₀", "M = C · (1 + i)ᵗ"],
                secoes: [
                    {
                        titulo: "O que é porcentagem",
                        resumo: "Porcentagem é uma fração com denominador 100: uma forma padronizada de comparar partes de um todo.",
                        conceito: [
                            "Dizer \"25%\" é o mesmo que dizer \"25 partes de cada 100\". Por isso toda porcentagem pode ser escrita como <strong>fração</strong> (25/100 = 1/4) ou como <strong>número decimal</strong> (0,25).",
                            "Para calcular a porcentagem de um valor, basta multiplicar: <strong>p% de X = (p/100) · X</strong>. O valor X é a <strong>base</strong>, ou seja, o todo sobre o qual a porcentagem é calculada."
                        ],
                        diagrama: {
                            titulo: "25% em uma grade de 100",
                            svg: svgGradePorcentagem(25),
                            legenda: "Cada quadradinho é 1% do total. Pintar 25 quadradinhos é o mesmo que pintar 1/4 da grade."
                        },
                        cards: [
                            { titulo: "Três formas do mesmo número", texto: "50% = 1/2 = 0,5 · 25% = 1/4 = 0,25 · 20% = 1/5 = 0,2 · 10% = 1/10 = 0,1." },
                            { titulo: "Cálculo mental: 10% e 1%", texto: "10% de um valor: divida por 10. 1%: divida por 100. Ex.: 10% de 340 = 34; 1% de 340 = 3,4." },
                            { titulo: "Montando outras porcentagens", texto: "5% é metade de 10%. 15% = 10% + 5%. 30% = 3 · 10%." },
                            { titulo: "Descobrindo a porcentagem", texto: "Que porcentagem 30 é de 120? 30/120 = 0,25 = 25%." }
                        ],
                        exemplo: {
                            titulo: "35% de 240",
                            enunciado: "Uma escola tem 240 alunos e 35% deles fazem cursinho. Quantos alunos fazem cursinho?",
                            passos: [
                                "Pela fórmula: 0,35 · 240 = 84.",
                                "Conferindo de cabeça: 10% de 240 = 24, então 30% = 72.",
                                "5% é metade de 10%: 12. Logo, 35% = 72 + 12 = 84."
                            ],
                            resultado: "84 alunos fazem cursinho."
                        },
                        atencao: "Porcentagem é sempre \"de alguma coisa\". Antes de calcular, identifique qual é a base. Em \"30% dos aprovados\" e \"30% dos inscritos\", as bases são diferentes."
                    },
                    {
                        titulo: "Aumentos e descontos",
                        resumo: "O jeito mais rápido de calcular aumentos e descontos é usar o fator multiplicativo.",
                        conceito: [
                            "Aumentar um valor em p% é o mesmo que multiplicá-lo por <strong>(1 + p/100)</strong>. Um aumento de 10% equivale a multiplicar por 1,10.",
                            "Dar um desconto de p% é multiplicar por <strong>(1 − p/100)</strong>. Um desconto de 10% equivale a multiplicar por 0,90.",
                            "Quando há vários aumentos e descontos seguidos, <strong>multiplicam-se os fatores</strong>, nunca se somam as porcentagens."
                        ],
                        diagrama: {
                            titulo: "Sobe 10%, depois desce 10%",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Barras mostrando 200 reais, 220 reais depois do aumento e 198 reais depois do desconto">
                                <line class="dg-traco" x1="40" y1="145" x2="370" y2="145" />
                                <rect class="dg-barra" x="60" y="45" width="60" height="100" rx="4" />
                                <rect class="dg-barra-roxa" x="170" y="35" width="60" height="110" rx="4" />
                                <rect class="dg-barra-laranja" x="280" y="45.5" width="60" height="99.5" rx="4" />
                                <text class="dg-txt dg-forte" x="66" y="37">R$ 200</text>
                                <text class="dg-txt dg-forte" x="176" y="27">R$ 220</text>
                                <text class="dg-txt dg-forte" x="286" y="37">R$ 198</text>
                                <text class="dg-txt" x="70" y="162">inicial</text>
                                <text class="dg-txt" x="182" y="162">× 1,10</text>
                                <text class="dg-txt" x="292" y="162">× 0,90</text>
                            </svg>`,
                            legenda: "Os 10% de desconto incidem sobre R$ 220, e não sobre R$ 200. Por isso o preço final fica abaixo do inicial."
                        },
                        cards: [
                            { titulo: "Fator de aumento", texto: "Aumento de p%: × (1 + p/100). Ex.: +25% → × 1,25." },
                            { titulo: "Fator de desconto", texto: "Desconto de p%: × (1 − p/100). Ex.: −30% → × 0,70." },
                            { titulo: "Sucessivos", texto: "+20% e depois +20% = 1,2 · 1,2 = 1,44, ou seja, +44% (e não +40%)." },
                            { titulo: "Voltando ao original", texto: "Se o preço com 25% de aumento é R$ 150, o original é 150 ÷ 1,25 = R$ 120." }
                        ],
                        exemplo: {
                            titulo: "Aumento seguido de desconto",
                            enunciado: "Um produto de R$ 200 sofreu aumento de 10% e, no mês seguinte, desconto de 10%. Qual é o preço final? Houve ganho ou perda em relação ao inicial?",
                            passos: [
                                "Após o aumento: 200 · 1,10 = 220.",
                                "Após o desconto: 220 · 0,90 = 198.",
                                "Fator total: 1,10 · 0,90 = 0,99, ou seja, 1% a menos que o inicial."
                            ],
                            resultado: "O preço final é R$ 198: uma queda de 1% em relação aos R$ 200 iniciais."
                        },
                        atencao: "Aumentos e descontos sucessivos não se somam nem se cancelam. Sempre multiplique os fatores."
                    },
                    {
                        titulo: "Variação percentual",
                        resumo: "Quanto um valor cresceu ou diminuiu em relação ao valor inicial, e a diferença entre porcentagem e pontos percentuais.",
                        conceito: [
                            "A <strong>variação percentual</strong> compara a mudança com o valor de partida: Δ% = (valor final − valor inicial)/valor inicial. Se o resultado for positivo, houve aumento; se for negativo, houve queda.",
                            "Quando o próprio dado já é uma porcentagem (taxa de desemprego, juros, inflação), a diferença simples entre duas taxas é medida em <strong>pontos percentuais (p.p.)</strong>."
                        ],
                        cards: [
                            { titulo: "Fórmula", texto: "Δ% = (V − V₀)/V₀ × 100. A base é sempre o valor inicial V₀." },
                            { titulo: "Pontos percentuais", texto: "Taxa de 10% para 12%: subiu 2 p.p., mas cresceu 20% em termos relativos (2/10)." },
                            { titulo: "Queda e recuperação", texto: "Se algo cai 50%, precisa subir 100% para voltar ao valor original (de 100 para 50, e de 50 para 100)." },
                            { titulo: "Leitura de gráficos", texto: "Em gráficos, confira se o eixo mostra valores absolutos ou porcentagens antes de calcular a variação." }
                        ],
                        exemplo: {
                            titulo: "Variação de preço",
                            enunciado: "O preço de um ingresso passou de R$ 50 para R$ 65. Qual foi a variação percentual?",
                            passos: [
                                "Diferença: 65 − 50 = 15.",
                                "Divida pela base, que é o valor inicial: 15/50 = 0,30.",
                                "0,30 = 30%."
                            ],
                            resultado: "Aumento de 30%."
                        },
                        atencao: "Dividir pelo valor final é o erro mais comum. Se o preço voltasse de R$ 65 para R$ 50, a queda seria de 15/65 ≈ 23%, e não de 30%."
                    },
                    {
                        titulo: "Juros simples e compostos",
                        resumo: "Juros simples crescem sempre o mesmo valor; juros compostos crescem sobre o valor acumulado (\"juros sobre juros\").",
                        conceito: [
                            "Nos <strong>juros simples</strong>, os juros de cada período são calculados sempre sobre o capital inicial C. Por isso crescem em linha reta: J = C · i · t e M = C + J.",
                            "Nos <strong>juros compostos</strong>, os juros de cada período entram no saldo e passam a render também. O montante é M = C · (1 + i)<sup>t</sup>, e o crescimento é exponencial. É o sistema usado por bancos, financiamentos e cartões de crédito."
                        ],
                        diagrama: {
                            titulo: "R$ 1 000 a 10% ao mês",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Gráfico comparando juros simples em linha reta e juros compostos em curva crescente ao longo de 10 meses">
                                <line class="dg-traco" x1="50" y1="150" x2="365" y2="150" />
                                <line class="dg-traco" x1="50" y1="150" x2="50" y2="12" />
                                <text class="dg-txt" x="330" y="166">meses</text>
                                <text class="dg-txt" x="8" y="154">1 000</text>
                                <line class="dg-roxo dg-grosso" x1="50" y1="150" x2="350" y2="68.75" />
                                <polyline class="dg-laranja dg-grosso" points="50,150 110,132.9 170,112.3 230,87.3 290,57.1 350,20.5" />
                                <text class="dg-txt dg-roxo-txt" x="270" y="105">simples: R$ 2 000</text>
                                <text class="dg-txt dg-laranja-txt" x="230" y="25">compostos: ≈ R$ 2 594</text>
                                <text class="dg-txt" x="44" y="166">0</text>
                                <text class="dg-txt" x="343" y="166">10</text>
                            </svg>`,
                            legenda: "No começo as duas curvas ficam próximas, mas com o tempo os juros compostos se distanciam cada vez mais."
                        },
                        cards: [
                            { titulo: "Juros simples", texto: "J = C · i · t e M = C + J. Os juros são iguais em todos os períodos." },
                            { titulo: "Juros compostos", texto: "M = C · (1 + i)<sup>t</sup>. Os juros aumentam a cada período." },
                            { titulo: "Unidades", texto: "Taxa e tempo devem estar na mesma unidade: taxa ao mês com tempo em meses." },
                            { titulo: "Taxa na conta", texto: "Use a taxa em decimal: 10% = 0,10; 2,5% = 0,025." }
                        ],
                        exemplo: {
                            titulo: "Simples × compostos em 3 meses",
                            enunciado: "R$ 1 000 são aplicados a 10% ao mês por 3 meses. Compare o montante nos regimes simples e composto.",
                            passos: [
                                "Simples: J = 1 000 · 0,10 · 3 = 300, então M = 1 300.",
                                "Compostos: M = 1 000 · 1,10³.",
                                "1,10³ = 1,10 · 1,10 · 1,10 = 1,331, então M = 1 331."
                            ],
                            resultado: "Simples: R$ 1 300. Compostos: R$ 1 331 (R$ 31 a mais)."
                        },
                        atencao: "Se a taxa é ao ano e o tempo está em meses, converta antes de calcular. Nos juros simples, 12% ao ano equivalem a 1% ao mês; nos compostos, essa conversão não é uma simples divisão."
                    }
                ]
            }
        ]
    },

    // =========================================================
    // QUÍMICA
    // =========================================================
    {
        id: "quimica",
        nome: "Química",
        area: "Ciências da Natureza",
        icone: "fa-flask",
        cor: "#a855f7",
        topicos: [
            {
                id: "estequiometria",
                titulo: "Estequiometria",
                subtitulo: "Mol, massa molar, balanceamento e cálculos com reações químicas: como prever quanto de produto uma reação forma.",
                calculo: true,
                formulas: ["n = m/M", "1 mol = 6,02 × 10²³", "V = 22,4 L/mol (CNTP)", "rendimento = real/teórico"],
                secoes: [
                    {
                        titulo: "Mol e massa molar",
                        resumo: "O mol é a unidade que o químico usa para contar partículas, assim como a dúzia conta ovos.",
                        conceito: [
                            "Átomos e moléculas são pequenos demais para contar um a um. Por isso usamos o <strong>mol</strong>: 1 mol corresponde a <strong>6,02 × 10<sup>23</sup></strong> partículas (a constante de Avogadro).",
                            "A <strong>massa molar (M)</strong> é a massa de 1 mol de uma substância, em g/mol. Ela é a soma das massas atômicas dos átomos da fórmula. Exemplo: H₂O → 2 · 1 + 16 = <strong>18 g/mol</strong>."
                        ],
                        cards: [
                            { titulo: "Número de mols", texto: "n = m/M. Ex.: 36 g de água ÷ 18 g/mol = 2 mol." },
                            { titulo: "Constante de Avogadro", texto: "1 mol de qualquer coisa tem 6,02 × 10<sup>23</sup> unidades: átomos, moléculas ou íons." },
                            { titulo: "Volume molar", texto: "Nas CNTP (0 °C e 1 atm), 1 mol de qualquer gás ocupa 22,4 L." },
                            { titulo: "Massas atômicas úteis", texto: "H = 1, C = 12, N = 14, O = 16, Na = 23, S = 32, Cl = 35,5 (em g/mol)." }
                        ],
                        exemplo: {
                            titulo: "Mols e moléculas na água",
                            enunciado: "Quantos mols e quantas moléculas existem em 36 g de água (H₂O)?",
                            passos: [
                                "Massa molar: M = 2 · 1 + 16 = 18 g/mol.",
                                "n = m/M = 36/18 = 2 mol.",
                                "Moléculas: 2 · 6,02 × 10<sup>23</sup> = 12,04 × 10<sup>23</sup> = 1,204 × 10<sup>24</sup>."
                            ],
                            resultado: "2 mol, ou cerca de 1,2 × 10<sup>24</sup> moléculas."
                        },
                        atencao: "O volume de 22,4 L/mol vale só para gases e só nas CNTP. Não use esse valor para líquidos e sólidos, nem em outras condições de temperatura e pressão."
                    },
                    {
                        titulo: "Balanceamento e proporção",
                        resumo: "Uma equação balanceada mostra em que proporção os reagentes se combinam e os produtos se formam.",
                        conceito: [
                            "Pela <strong>Lei de Lavoisier</strong>, a massa se conserva: nenhum átomo é criado ou destruído em uma reação. Por isso o número de átomos de cada elemento deve ser o mesmo dos dois lados da equação.",
                            "Os <strong>coeficientes</strong> (os números na frente das fórmulas) indicam a proporção em mols. Em CH₄ + 2 O₂ → CO₂ + 2 H₂O, 1 mol de metano reage com 2 mol de oxigênio."
                        ],
                        diagrama: {
                            titulo: "Contando os átomos",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Equação da combustão do metano balanceada com a contagem de átomos de cada lado">
                                <text class="dg-txt dg-equacao" x="200" y="38" text-anchor="middle">CH₄ + 2 O₂ → CO₂ + 2 H₂O</text>
                                <line class="dg-separador" x1="200" y1="55" x2="200" y2="155" />
                                <text class="dg-txt dg-forte" x="100" y="72" text-anchor="middle">reagentes</text>
                                <text class="dg-txt dg-forte" x="300" y="72" text-anchor="middle">produtos</text>
                                <text class="dg-txt" x="100" y="98" text-anchor="middle">C: 1</text>
                                <text class="dg-txt" x="100" y="120" text-anchor="middle">H: 4</text>
                                <text class="dg-txt" x="100" y="142" text-anchor="middle">O: 2 · 2 = 4</text>
                                <text class="dg-txt" x="300" y="98" text-anchor="middle">C: 1</text>
                                <text class="dg-txt" x="300" y="120" text-anchor="middle">H: 2 · 2 = 4</text>
                                <text class="dg-txt" x="300" y="142" text-anchor="middle">O: 2 + 2 = 4</text>
                                <text class="dg-txt dg-roxo-txt" x="200" y="120" text-anchor="middle">=</text>
                            </svg>`,
                            legenda: "Com os coeficientes certos, cada elemento aparece na mesma quantidade nos reagentes e nos produtos."
                        },
                        cards: [
                            { titulo: "Método das tentativas", texto: "Comece pelo elemento que aparece em menos substâncias (geralmente metais e carbono), depois hidrogênio e por último oxigênio." },
                            { titulo: "Coeficientes", texto: "Use os menores números inteiros possíveis. O coeficiente 1 não se escreve." },
                            { titulo: "Proporção em mol", texto: "Os coeficientes valem para mols e moléculas. Para massa, é preciso multiplicar pela massa molar." },
                            { titulo: "Gases", texto: "Para gases nas mesmas condições, a proporção em mols também vale para os volumes." }
                        ],
                        exemplo: {
                            titulo: "Combustão do propano",
                            enunciado: "Balanceie a equação da combustão completa do propano: C₃H₈ + O₂ → CO₂ + H₂O.",
                            passos: [
                                "Carbono: 3 à esquerda, então 3 CO₂.",
                                "Hidrogênio: 8 à esquerda, então 4 H₂O (4 · 2 = 8).",
                                "Oxigênio à direita: 3 · 2 + 4 · 1 = 10 átomos, então 5 O₂."
                            ],
                            resultado: "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O."
                        },
                        atencao: "Nunca altere os índices das fórmulas (o 2 de H₂O). Mudar o índice muda a substância. No balanceamento, só os coeficientes podem mudar."
                    },
                    {
                        titulo: "Cálculo estequiométrico",
                        resumo: "Com a equação balanceada, é possível calcular a massa, o volume ou o número de mols de qualquer participante.",
                        conceito: [
                            "Todo cálculo estequiométrico segue o mesmo roteiro: <strong>1)</strong> balancear a equação; <strong>2)</strong> converter o dado do problema para mol; <strong>3)</strong> usar a proporção dos coeficientes; <strong>4)</strong> converter a resposta para a unidade pedida (massa, volume ou partículas)."
                        ],
                        diagrama: {
                            titulo: "O caminho do cálculo",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Fluxo: massa do reagente, dividida pela massa molar, vira mol; a proporção da equação leva ao mol do produto; multiplicando pela massa molar, chega-se à massa do produto">
                                <rect class="dg-caixa" x="10" y="60" width="80" height="44" rx="10" />
                                <rect class="dg-caixa-roxa" x="115" y="60" width="80" height="44" rx="10" />
                                <rect class="dg-caixa-roxa" x="220" y="60" width="80" height="44" rx="10" />
                                <rect class="dg-caixa" x="320" y="60" width="72" height="44" rx="10" />
                                <text class="dg-txt dg-forte" x="50" y="78" text-anchor="middle">massa</text>
                                <text class="dg-txt" x="50" y="94" text-anchor="middle">reagente</text>
                                <text class="dg-txt dg-forte" x="155" y="78" text-anchor="middle">mol</text>
                                <text class="dg-txt" x="155" y="94" text-anchor="middle">reagente</text>
                                <text class="dg-txt dg-forte" x="260" y="78" text-anchor="middle">mol</text>
                                <text class="dg-txt" x="260" y="94" text-anchor="middle">produto</text>
                                <text class="dg-txt dg-forte" x="356" y="78" text-anchor="middle">massa</text>
                                <text class="dg-txt" x="356" y="94" text-anchor="middle">produto</text>
                                <line class="dg-laranja" x1="92" y1="82" x2="107" y2="82" />
                                <polygon class="dg-laranja-cheio" points="107,77 114,82 107,87" />
                                <line class="dg-laranja" x1="197" y1="82" x2="212" y2="82" />
                                <polygon class="dg-laranja-cheio" points="212,77 219,82 212,87" />
                                <line class="dg-laranja" x1="302" y1="82" x2="312" y2="82" />
                                <polygon class="dg-laranja-cheio" points="312,77 319,82 312,87" />
                                <text class="dg-txt" x="102" y="128" text-anchor="middle">÷ M</text>
                                <text class="dg-txt" x="207" y="128" text-anchor="middle">proporção</text>
                                <text class="dg-txt" x="207" y="142" text-anchor="middle">da equação</text>
                                <text class="dg-txt" x="310" y="128" text-anchor="middle">× M</text>
                            </svg>`,
                            legenda: "A proporção da equação só vale em mols. Por isso, primeiro se converte para mol e depois se volta para a unidade pedida."
                        },
                        cards: [
                            { titulo: "Massa → mol", texto: "Divida pela massa molar: n = m/M." },
                            { titulo: "Mol → volume (gás)", texto: "Nas CNTP, multiplique por 22,4 L." },
                            { titulo: "Mol → partículas", texto: "Multiplique por 6,02 × 10<sup>23</sup>." },
                            { titulo: "Regra de três", texto: "Montar \"1 mol de CH₄ — 44 g de CO₂\" e fazer regra de três também funciona, desde que a proporção venha da equação balanceada." }
                        ],
                        exemplo: {
                            titulo: "Queima do metano",
                            enunciado: "Na reação CH₄ + 2 O₂ → CO₂ + 2 H₂O, qual é a massa de CO₂ produzida na queima de 16 g de CH₄? E qual volume de O₂ (nas CNTP) é consumido? (C = 12, H = 1, O = 16)",
                            passos: [
                                "M(CH₄) = 12 + 4 · 1 = 16 g/mol, então 16 g = 1 mol de CH₄.",
                                "Pela equação, 1 mol de CH₄ forma 1 mol de CO₂ e consome 2 mol de O₂.",
                                "M(CO₂) = 12 + 2 · 16 = 44 g/mol, então forma 44 g de CO₂.",
                                "O₂: 2 mol · 22,4 L/mol = 44,8 L."
                            ],
                            resultado: "Forma 44 g de CO₂ e consome 44,8 L de O₂ nas CNTP."
                        },
                        atencao: "A proporção 1 : 2 da equação é entre mols, não entre gramas. 16 g de CH₄ não reagem com 32 g de O₂, e sim com 2 mol de O₂ = 64 g."
                    },
                    {
                        titulo: "Reagente limitante e rendimento",
                        resumo: "Quando os reagentes não estão na proporção exata, um deles acaba antes e limita a quantidade de produto.",
                        conceito: [
                            "O <strong>reagente limitante</strong> é o que é totalmente consumido e determina quanto produto se forma. O outro é o <strong>reagente em excesso</strong>: sobra uma parte dele no final.",
                            "O <strong>rendimento</strong> compara a quantidade de produto realmente obtida com a quantidade teórica calculada pela estequiometria. Na prática, o rendimento costuma ser menor que 100% por perdas e reações paralelas."
                        ],
                        cards: [
                            { titulo: "Como achar o limitante", texto: "Converta os reagentes para mol e compare com a proporção da equação. O que \"faltaria\" é o limitante." },
                            { titulo: "Calcule pelo limitante", texto: "A quantidade de produto sempre é calculada a partir do reagente limitante." },
                            { titulo: "Rendimento", texto: "Rendimento (%) = (quantidade real/quantidade teórica) × 100." },
                            { titulo: "Pureza", texto: "Se o reagente tem 80% de pureza, só 80% da massa dele participa da reação." }
                        ],
                        exemplo: {
                            titulo: "Produção de amônia",
                            enunciado: "Na reação N₂ + 3 H₂ → 2 NH₃, misturam-se 28 g de N₂ e 9 g de H₂. Qual é o limitante e que massa de NH₃ se forma? E se o rendimento for de 80%? (N = 14, H = 1)",
                            passos: [
                                "N₂: 28/28 = 1 mol. H₂: 9/2 = 4,5 mol.",
                                "1 mol de N₂ precisa de 3 mol de H₂. Há 4,5 mol: sobra 1,5 mol de H₂, então o N₂ é o limitante.",
                                "1 mol de N₂ forma 2 mol de NH₃. M(NH₃) = 14 + 3 = 17 g/mol, então 2 · 17 = 34 g.",
                                "Com 80% de rendimento: 0,80 · 34 = 27,2 g."
                            ],
                            resultado: "N₂ é o limitante. Formam-se 34 g de NH₃ (teórico) ou 27,2 g com 80% de rendimento."
                        },
                        atencao: "O limitante não é necessariamente o reagente de menor massa. Aqui o H₂ tem menos massa (9 g contra 28 g), mas está em excesso. Compare sempre em mols, considerando a proporção."
                    }
                ]
            }
        ]
    },

    // =========================================================
    // BIOLOGIA
    // =========================================================
    {
        id: "biologia",
        nome: "Biologia",
        area: "Ciências da Natureza",
        icone: "fa-leaf",
        cor: "#9d4edd",
        topicos: [
            {
                id: "ecologia",
                titulo: "Ecologia",
                subtitulo: "Como os seres vivos se relacionam entre si e com o ambiente: cadeias alimentares, fluxo de energia e ciclos da matéria.",
                formulas: ["Energia: fluxo em um sentido", "Matéria: ciclo", "≈ 10% passa ao nível seguinte", "Produtor → consumidor → decompositor"],
                secoes: [
                    {
                        titulo: "Conceitos básicos",
                        resumo: "A ecologia organiza a vida em níveis, do indivíduo até a biosfera inteira.",
                        conceito: [
                            "A ecologia estuda as relações dos seres vivos entre si e com o ambiente. Ela trabalha com níveis de organização cada vez mais amplos: <strong>população</strong>, <strong>comunidade</strong>, <strong>ecossistema</strong> e <strong>biosfera</strong>.",
                            "Dois conceitos caem muito: <strong>habitat</strong> é o lugar onde a espécie vive; <strong>nicho ecológico</strong> é o modo de vida dela, ou seja, o que come, quando é ativa e como interage com as outras espécies."
                        ],
                        cards: [
                            { titulo: "População", texto: "Indivíduos da mesma espécie, na mesma área, ao mesmo tempo. Ex.: todas as capivaras de um parque." },
                            { titulo: "Comunidade", texto: "O conjunto de populações de espécies diferentes que vivem em uma área. É a parte viva (biótica)." },
                            { titulo: "Ecossistema", texto: "A comunidade mais os fatores físicos e químicos do ambiente (luz, água, solo, temperatura), que são os fatores abióticos." },
                            { titulo: "Biosfera", texto: "O conjunto de todos os ecossistemas da Terra: todas as regiões do planeta onde existe vida." }
                        ],
                        exemplo: {
                            titulo: "Identificando os níveis",
                            enunciado: "Em uma lagoa vivem tilápias, algas, garças e bactérias, em água com certa temperatura e luminosidade. O que formam: (a) todas as tilápias; (b) todos os seres vivos da lagoa; (c) os seres vivos junto com a água, a luz e a temperatura?",
                            passos: [
                                "(a) Uma única espécie na mesma área: população.",
                                "(b) Várias espécies juntas, só a parte viva: comunidade.",
                                "(c) Parte viva + fatores abióticos: ecossistema."
                            ],
                            resultado: "(a) população; (b) comunidade; (c) ecossistema."
                        },
                        atencao: "Um jeito fácil de lembrar: habitat é o \"endereço\" da espécie e nicho ecológico é a \"profissão\" dela. Duas espécies podem dividir o mesmo habitat com nichos diferentes."
                    },
                    {
                        titulo: "Cadeias e teias alimentares",
                        resumo: "As cadeias alimentares mostram quem serve de alimento para quem e como a energia passa de um ser vivo a outro.",
                        conceito: [
                            "Toda cadeia alimentar começa nos <strong>produtores</strong>, seres autotróficos (plantas, algas e algumas bactérias) que produzem matéria orgânica pela fotossíntese ou quimiossíntese.",
                            "Depois vêm os <strong>consumidores</strong>: primários (herbívoros), secundários (comem herbívoros), terciários e assim por diante. Os <strong>decompositores</strong> (fungos e bactérias) atuam em todos os níveis e devolvem os nutrientes ao ambiente.",
                            "Na natureza, as cadeias se cruzam e formam <strong>teias alimentares</strong>, em que um mesmo animal pode ter vários tipos de alimento."
                        ],
                        diagrama: {
                            titulo: "Uma cadeia alimentar",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Cadeia alimentar: capim, gafanhoto, sapo e cobra, com decompositores atuando em todos os níveis">
                                <rect class="dg-caixa-verde" x="8" y="40" width="78" height="40" rx="10" />
                                <rect class="dg-caixa" x="111" y="40" width="78" height="40" rx="10" />
                                <rect class="dg-caixa" x="214" y="40" width="78" height="40" rx="10" />
                                <rect class="dg-caixa" x="317" y="40" width="78" height="40" rx="10" />
                                <text class="dg-txt dg-forte" x="47" y="64" text-anchor="middle">capim</text>
                                <text class="dg-txt dg-forte" x="150" y="64" text-anchor="middle">gafanhoto</text>
                                <text class="dg-txt dg-forte" x="253" y="64" text-anchor="middle">sapo</text>
                                <text class="dg-txt dg-forte" x="356" y="64" text-anchor="middle">cobra</text>
                                <text class="dg-txt" x="47" y="96" text-anchor="middle">produtor</text>
                                <text class="dg-txt" x="150" y="96" text-anchor="middle">consumidor 1º</text>
                                <text class="dg-txt" x="253" y="96" text-anchor="middle">consumidor 2º</text>
                                <text class="dg-txt" x="356" y="96" text-anchor="middle">consumidor 3º</text>
                                <line class="dg-laranja" x1="88" y1="60" x2="102" y2="60" /><polygon class="dg-laranja-cheio" points="102,55 110,60 102,65" />
                                <line class="dg-laranja" x1="191" y1="60" x2="205" y2="60" /><polygon class="dg-laranja-cheio" points="205,55 213,60 205,65" />
                                <line class="dg-laranja" x1="294" y1="60" x2="308" y2="60" /><polygon class="dg-laranja-cheio" points="308,55 316,60 308,65" />
                                <rect class="dg-caixa-roxa" x="110" y="122" width="180" height="34" rx="10" />
                                <text class="dg-txt dg-forte" x="200" y="144" text-anchor="middle">decompositores</text>
                                <path class="dg-roxo dg-tracejado" d="M47 104 V139 H110 M356 104 V139 H290" />
                            </svg>`,
                            legenda: "As setas indicam o sentido da energia: de quem é comido para quem come. Os decompositores reciclam a matéria de todos os níveis."
                        },
                        cards: [
                            { titulo: "Produtores", texto: "Autotróficos: fabricam o próprio alimento. São a porta de entrada da energia na cadeia." },
                            { titulo: "Consumidores", texto: "Heterotróficos: obtêm energia comendo outros seres vivos. Herbívoros são consumidores primários." },
                            { titulo: "Decompositores", texto: "Fungos e bactérias que decompõem restos e cadáveres, devolvendo nutrientes minerais ao solo." },
                            { titulo: "Nível trófico", texto: "A posição na cadeia: produtor = 1º nível, consumidor primário = 2º nível, e assim por diante." }
                        ],
                        exemplo: {
                            titulo: "Consumidor × nível trófico",
                            enunciado: "Na cadeia capim → gafanhoto → sapo → cobra, qual é a classificação do sapo como consumidor e qual nível trófico ele ocupa?",
                            passos: [
                                "O sapo come o gafanhoto, que é herbívoro: o sapo é consumidor secundário.",
                                "Contando os níveis: capim (1º), gafanhoto (2º), sapo (3º)."
                            ],
                            resultado: "O sapo é consumidor secundário e ocupa o 3º nível trófico."
                        },
                        atencao: "Consumidor secundário não é o mesmo que 2º nível trófico. O nível trófico conta a partir do produtor, então o consumidor de ordem n está sempre no nível n + 1."
                    },
                    {
                        titulo: "Fluxo de energia e pirâmides",
                        resumo: "A energia entra pelo Sol, passa pelos níveis tróficos e se perde como calor. Por isso as cadeias são curtas.",
                        conceito: [
                            "A energia flui em <strong>um único sentido</strong>: entra como luz nos produtores e passa de nível em nível. Em cada nível, a maior parte é gasta na respiração e se perde como calor.",
                            "Em média, só cerca de <strong>10%</strong> da energia de um nível chega ao nível seguinte. Por isso as cadeias raramente passam de 4 ou 5 níveis.",
                            "As <strong>pirâmides ecológicas</strong> representam essa passagem. A pirâmide de energia nunca é invertida; as de números e de biomassa podem ser."
                        ],
                        diagrama: {
                            titulo: "Pirâmide de energia",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Pirâmide de energia com 10 000, 1 000, 100 e 10 quilocalorias do produtor ao consumidor terciário">
                                <polygon class="dg-nivel-1" points="60,155 340,155 310,120 90,120" />
                                <polygon class="dg-nivel-2" points="90,118 310,118 280,83 120,83" />
                                <polygon class="dg-nivel-3" points="120,81 280,81 250,46 150,46" />
                                <polygon class="dg-nivel-4" points="150,44 250,44 225,12 175,12" />
                                <text class="dg-txt dg-forte" x="200" y="142" text-anchor="middle">produtores · 10 000 kcal</text>
                                <text class="dg-txt dg-forte" x="200" y="105" text-anchor="middle">consumidores 1º · 1 000</text>
                                <text class="dg-txt dg-forte" x="200" y="68" text-anchor="middle">2º · 100</text>
                                <text class="dg-txt dg-forte" x="200" y="33" text-anchor="middle">3º · 10</text>
                                <text class="dg-txt dg-laranja-txt" x="320" y="70">calor perdido</text>
                                <text class="dg-txt dg-laranja-txt" x="320" y="84">em cada nível</text>
                            </svg>`,
                            legenda: "Cada nível recebe cerca de 10% da energia do nível anterior. O restante é usado nas atividades vitais e liberado como calor."
                        },
                        cards: [
                            { titulo: "Energia", texto: "Flui em um sentido e não volta: os produtores não reaproveitam o calor liberado. Por isso é preciso entrada constante de luz solar." },
                            { titulo: "Pirâmide de números", texto: "Pode ser invertida: uma única árvore pode sustentar milhares de insetos." },
                            { titulo: "Pirâmide de biomassa", texto: "Pode ser invertida em oceanos: o fitoplâncton tem pouca massa em cada momento, mas se reproduz muito rápido." },
                            { titulo: "Pirâmide de energia", texto: "Nunca é invertida, porque nenhum nível pode ter mais energia do que recebeu do anterior." }
                        ],
                        exemplo: {
                            titulo: "Quanto chega ao topo",
                            enunciado: "Os produtores de um ecossistema fixam 10 000 kcal. Considerando que cerca de 10% da energia passa a cada nível, quanto chega ao consumidor terciário?",
                            passos: [
                                "Consumidor primário: 10% de 10 000 = 1 000 kcal.",
                                "Consumidor secundário: 10% de 1 000 = 100 kcal.",
                                "Consumidor terciário: 10% de 100 = 10 kcal."
                            ],
                            resultado: "Cerca de 10 kcal, ou seja, apenas 0,1% da energia fixada pelos produtores."
                        },
                        atencao: "Com as substâncias tóxicas não biodegradáveis (como mercúrio e o inseticida DDT) acontece o contrário: elas se acumulam e ficam mais concentradas nos níveis mais altos. Isso se chama biomagnificação."
                    },
                    {
                        titulo: "Ciclo do carbono",
                        resumo: "A matéria circula entre os seres vivos e o ambiente. O carbono é o ciclo mais ligado ao aquecimento global.",
                        conceito: [
                            "Diferente da energia, a matéria é <strong>reciclada</strong>. O carbono sai da atmosfera (na forma de CO₂) pela <strong>fotossíntese</strong> e entra nas moléculas orgânicas dos seres vivos.",
                            "Ele volta para a atmosfera pela <strong>respiração</strong> dos seres vivos, pela <strong>decomposição</strong> da matéria orgânica e pela <strong>combustão</strong> de combustíveis e florestas.",
                            "A queima de combustíveis fósseis libera carbono que estava guardado havia milhões de anos, aumentando a quantidade de CO₂ no ar e intensificando o efeito estufa."
                        ],
                        diagrama: {
                            titulo: "Por onde o carbono passa",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Ciclo do carbono: a fotossíntese retira CO2 do ar; respiração, decomposição e combustão devolvem CO2">
                                <rect class="dg-caixa-roxa" x="130" y="8" width="140" height="36" rx="10" />
                                <text class="dg-txt dg-forte" x="200" y="31" text-anchor="middle">CO₂ na atmosfera</text>
                                <rect class="dg-caixa-verde" x="10" y="115" width="110" height="40" rx="10" />
                                <text class="dg-txt dg-forte" x="65" y="139" text-anchor="middle">plantas e algas</text>
                                <rect class="dg-caixa" x="145" y="115" width="110" height="40" rx="10" />
                                <text class="dg-txt dg-forte" x="200" y="139" text-anchor="middle">animais</text>
                                <rect class="dg-caixa" x="280" y="115" width="110" height="40" rx="10" />
                                <text class="dg-txt dg-forte" x="335" y="132" text-anchor="middle">combustíveis</text>
                                <text class="dg-txt dg-forte" x="335" y="147" text-anchor="middle">fósseis</text>
                                <line class="dg-verde" x1="135" y1="40" x2="70" y2="107" /><polygon class="dg-verde-cheio" points="64,102 66,114 75,108" />
                                <text class="dg-txt dg-verde-txt" x="20" y="70">fotossíntese</text>
                                <line class="dg-laranja" x1="200" y1="110" x2="200" y2="54" /><polygon class="dg-laranja-cheio" points="195,54 200,46 205,54" />
                                <text class="dg-txt dg-laranja-txt" x="206" y="88">respiração</text>
                                <line class="dg-laranja" x1="320" y1="110" x2="268" y2="50" /><polygon class="dg-laranja-cheio" points="263,56 263,44 273,50" />
                                <text class="dg-txt dg-laranja-txt" x="305" y="72">combustão</text>
                                <line class="dg-traco" x1="122" y1="135" x2="139" y2="135" /><polygon class="dg-tinta-cheio" points="139,130 145,135 139,140" />
                            </svg>`,
                            legenda: "A fotossíntese retira CO₂ do ar; respiração, decomposição e combustão devolvem. Os seres vivos também respiram e liberam CO₂."
                        },
                        cards: [
                            { titulo: "Fotossíntese", texto: "6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂, na presença de luz e clorofila. Retira carbono do ar." },
                            { titulo: "Respiração celular", texto: "C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energia. Feita por plantas e animais; devolve CO₂ ao ar." },
                            { titulo: "Combustão", texto: "Queima de combustíveis fósseis (petróleo, carvão, gás) e de florestas: libera grandes quantidades de CO₂." },
                            { titulo: "Efeito estufa", texto: "Fenômeno natural que mantém a Terra aquecida. O excesso de CO₂ e metano o intensifica e provoca o aquecimento global." }
                        ],
                        exemplo: {
                            titulo: "Por que reflorestar ajuda",
                            enunciado: "Projetos de reflorestamento são apontados como uma forma de reduzir o aquecimento global. Qual processo explica essa ideia?",
                            passos: [
                                "O aquecimento global está ligado ao aumento de CO₂ na atmosfera.",
                                "Árvores em crescimento fazem mais fotossíntese do que respiração: retiram CO₂ do ar.",
                                "O carbono fica armazenado na madeira e nas outras partes da planta (o chamado sequestro de carbono)."
                            ],
                            resultado: "A fotossíntese das árvores em crescimento retira CO₂ do ar e armazena o carbono na biomassa."
                        },
                        atencao: "Efeito estufa e buraco na camada de ozônio são problemas diferentes. O efeito estufa intensificado vem do excesso de gases como CO₂ e metano; o buraco na camada de ozônio foi causado principalmente pelos CFCs."
                    }
                ]
            }
        ]
    }
];
