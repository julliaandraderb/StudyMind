// ===============================================
// GUIAS DE ESTUDO: HUMANAS E LINGUAGENS
// Continua a lista "guiasMaterias" criada em materias.js
// (este arquivo precisa ser carregado depois dele).
// ===============================================

guiasMaterias.push(
    // =========================================================
    // PORTUGUÊS
    // =========================================================
    {
        id: "portugues",
        nome: "Português",
        area: "Linguagens e Códigos",
        icone: "fa-book",
        cor: "#b5179e",
        topicos: [
            {
                id: "funcoes-da-linguagem",
                titulo: "Funções da linguagem",
                subtitulo: "Os seis elementos da comunicação e as seis funções de Jakobson: como descobrir a intenção principal de um texto.",
                formulas: ["Emissor → emotiva", "Receptor → conativa", "Referente → referencial", "Canal → fática", "Código → metalinguística", "Mensagem → poética"],
                secoes: [
                    {
                        titulo: "Os elementos da comunicação",
                        resumo: "Todo ato de comunicação tem seis elementos. Cada função da linguagem destaca um deles.",
                        conceito: [
                            "O linguista Roman Jakobson descreveu a comunicação com seis elementos: o <strong>emissor</strong> envia uma <strong>mensagem</strong> ao <strong>receptor</strong>, por meio de um <strong>canal</strong>, usando um <strong>código</strong> comum, para falar de um <strong>referente</strong> (o assunto, o contexto).",
                            "Cada texto dá mais destaque a um desses elementos. A <strong>função da linguagem</strong> é justamente o elemento que fica em primeiro plano."
                        ],
                        diagrama: {
                            titulo: "Elemento em foco → função",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Esquema da comunicação: emissor, mensagem e receptor em linha, com referente, canal e código, cada um ligado à sua função">
                                <rect class="dg-caixa" x="10" y="62" width="100" height="46" rx="10" />
                                <rect class="dg-caixa-roxa" x="150" y="62" width="100" height="46" rx="10" />
                                <rect class="dg-caixa" x="290" y="62" width="100" height="46" rx="10" />
                                <text class="dg-txt dg-forte" x="60" y="82" text-anchor="middle">emissor</text>
                                <text class="dg-txt dg-roxo-txt" x="60" y="98" text-anchor="middle">emotiva</text>
                                <text class="dg-txt dg-forte" x="200" y="82" text-anchor="middle">mensagem</text>
                                <text class="dg-txt dg-roxo-txt" x="200" y="98" text-anchor="middle">poética</text>
                                <text class="dg-txt dg-forte" x="340" y="82" text-anchor="middle">receptor</text>
                                <text class="dg-txt dg-roxo-txt" x="340" y="98" text-anchor="middle">conativa</text>
                                <line class="dg-laranja" x1="112" y1="85" x2="141" y2="85" /><polygon class="dg-laranja-cheio" points="141,80 149,85 141,90" />
                                <line class="dg-laranja" x1="252" y1="85" x2="281" y2="85" /><polygon class="dg-laranja-cheio" points="281,80 289,85 281,90" />
                                <text class="dg-txt dg-forte" x="200" y="22" text-anchor="middle">referente</text>
                                <text class="dg-txt dg-roxo-txt" x="200" y="38" text-anchor="middle">referencial</text>
                                <text class="dg-txt dg-forte" x="120" y="140" text-anchor="middle">canal</text>
                                <text class="dg-txt dg-roxo-txt" x="120" y="156" text-anchor="middle">fática</text>
                                <text class="dg-txt dg-forte" x="280" y="140" text-anchor="middle">código</text>
                                <text class="dg-txt dg-roxo-txt" x="280" y="156" text-anchor="middle">metalinguística</text>
                                <line class="dg-separador" x1="200" y1="44" x2="200" y2="58" />
                                <line class="dg-separador" x1="160" y1="112" x2="130" y2="126" />
                                <line class="dg-separador" x1="240" y1="112" x2="270" y2="126" />
                            </svg>`,
                            legenda: "Em roxo, a função que aparece quando o texto se concentra naquele elemento."
                        },
                        cards: [
                            { titulo: "Emissor", texto: "Quem produz a mensagem: o autor, o falante, o anunciante." },
                            { titulo: "Receptor", texto: "A quem a mensagem se dirige: o leitor, o ouvinte, o consumidor." },
                            { titulo: "Canal e código", texto: "Canal é o meio físico (voz, telefone, papel, internet). Código é o sistema de sinais (a língua portuguesa, Libras, um mapa)." },
                            { titulo: "Referente", texto: "O assunto, o contexto, a realidade de que a mensagem trata." }
                        ],
                        atencao: "Nas provas, a pergunta costuma ser sobre a função predominante. Primeiro descubra qual é a intenção principal do texto (informar, convencer, emocionar...) e depois veja qual elemento está em foco."
                    },
                    {
                        titulo: "As seis funções",
                        resumo: "Cada função tem marcas linguísticas típicas que ajudam a reconhecê-la.",
                        conceito: [
                            "As marcas mais úteis são as <strong>pessoas do discurso</strong> e o <strong>modo verbal</strong>: 1ª pessoa aponta para o emissor (emotiva), 2ª pessoa e verbos no imperativo apontam para o receptor (conativa) e 3ª pessoa com linguagem objetiva aponta para o referente (referencial)."
                        ],
                        cards: [
                            { titulo: "Referencial (denotativa)", texto: "Foco no assunto. Linguagem objetiva, 3ª pessoa, informação. Ex.: notícias, textos científicos, manuais." },
                            { titulo: "Emotiva (expressiva)", texto: "Foco no emissor. 1ª pessoa, opiniões, sentimentos, interjeições e exclamações. Ex.: diários, cartas pessoais, relatos." },
                            { titulo: "Conativa (apelativa)", texto: "Foco no receptor. Verbos no imperativo, 2ª pessoa (você), vocativos. Ex.: propagandas, discursos políticos, campanhas." },
                            { titulo: "Fática", texto: "Foco no canal: testar, iniciar ou manter o contato. Ex.: \"Alô?\", \"Está me ouvindo?\", \"Né?\", \"Bom dia!\"." },
                            { titulo: "Metalinguística", texto: "Foco no código: a linguagem explica a própria linguagem. Ex.: verbetes de dicionário, um poema sobre fazer poemas, um filme sobre cinema." },
                            { titulo: "Poética", texto: "Foco na própria mensagem: a forma é trabalhada com rimas, ritmo, sonoridade e figuras de linguagem. Ex.: poemas, slogans criativos, letras de música." }
                        ],
                        exemplo: {
                            titulo: "Uma propaganda",
                            enunciado: "\"Beba Suco Natural. Você merece o melhor da fruta!\" Qual é a função da linguagem predominante?",
                            passos: [
                                "O verbo \"beba\" está no imperativo: é uma ordem ou um convite ao leitor.",
                                "\"Você merece\": o texto se dirige diretamente ao receptor, em 2ª pessoa.",
                                "A intenção é convencer o leitor a comprar o produto."
                            ],
                            resultado: "Função conativa (apelativa), com foco no receptor."
                        },
                        atencao: "A função poética não aparece só em poemas. Propagandas e slogans que brincam com sons e rimas também a usam, mas a função predominante de uma propaganda costuma ser a conativa."
                    },
                    {
                        titulo: "Como resolver questões",
                        resumo: "Um roteiro rápido para identificar a função predominante em qualquer texto.",
                        conceito: [
                            "Um texto quase sempre mistura várias funções. Uma propaganda pode ter rima (poética) e informações sobre o produto (referencial), mas o objetivo principal é convencer (conativa). A resposta certa é a função <strong>predominante</strong>, a que está ligada ao objetivo central do texto."
                        ],
                        cards: [
                            { titulo: "1. Qual é o objetivo?", texto: "Informar → referencial. Expressar sentimentos → emotiva. Convencer ou dar ordens → conativa." },
                            { titulo: "2. Quem está em foco?", texto: "Eu (emissor), você (receptor), o assunto (referente), a própria língua (código)..." },
                            { titulo: "3. Procure as marcas", texto: "Imperativo e vocativo, 1ª pessoa e exclamações, definições, rimas e jogos de palavras." },
                            { titulo: "4. Elimine", texto: "Descarte as funções que aparecem só em um detalhe do texto e não no seu objetivo principal." }
                        ],
                        exemplo: {
                            titulo: "Um verbete",
                            enunciado: "\"Saudade (s.f.): sentimento nostálgico causado pela ausência de alguém ou de algo.\" Qual é a função predominante?",
                            passos: [
                                "O texto explica o significado de uma palavra.",
                                "Ou seja, usa a língua para falar da própria língua (o código)."
                            ],
                            resultado: "Função metalinguística."
                        },
                        atencao: "Não confunda emotiva com conativa. Na emotiva, o emissor fala de si (\"Eu sinto tanta falta...\"). Na conativa, ele tenta agir sobre o receptor (\"Ligue agora!\")."
                    }
                ]
            }
        ]
    },

    // =========================================================
    // HISTÓRIA
    // =========================================================
    {
        id: "historia",
        nome: "História",
        area: "Ciências Humanas",
        icone: "fa-landmark",
        cor: "#5a189a",
        topicos: [
            {
                id: "era-vargas",
                titulo: "Era Vargas (1930–1945)",
                subtitulo: "Os quinze anos de Getúlio Vargas no poder: da Revolução de 1930 ao Estado Novo, com as leis trabalhistas e a industrialização.",
                formulas: ["1930 · Revolução", "1932 · Rev. Constitucionalista", "1934 · Constituição", "1937 · Estado Novo", "1943 · CLT", "1945 · Deposição"],
                secoes: [
                    {
                        titulo: "Revolução de 1930 e Governo Provisório",
                        resumo: "O fim da República Oligárquica e a chegada de Vargas ao poder.",
                        conceito: [
                            "Na Primeira República (1889–1930), São Paulo e Minas Gerais se revezavam na presidência, na chamada <strong>política do café com leite</strong>. Em 1929, o paulista Washington Luís indicou outro paulista, Júlio Prestes, rompendo o acordo com Minas.",
                            "Minas, Rio Grande do Sul e Paraíba formaram a <strong>Aliança Liberal</strong>, com Getúlio Vargas como candidato. Júlio Prestes venceu a eleição, marcada por fraudes, como era comum na época. O assassinato de João Pessoa, vice de Vargas, serviu de estopim, e um movimento armado levou Vargas ao poder em novembro de 1930.",
                            "No <strong>Governo Provisório (1930–1934)</strong>, Vargas fechou o Congresso, governou por decretos e nomeou interventores para os estados."
                        ],
                        diagrama: {
                            titulo: "As três fases",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Linha do tempo da Era Vargas: Governo Provisório de 1930 a 1934, Governo Constitucional de 1934 a 1937 e Estado Novo de 1937 a 1945">
                                <line class="dg-traco dg-grosso" x1="20" y1="80" x2="380" y2="80" />
                                <rect class="dg-faixa-1" x="20" y="72" width="96" height="16" />
                                <rect class="dg-faixa-2" x="116" y="72" width="72" height="16" />
                                <rect class="dg-faixa-3" x="188" y="72" width="192" height="16" />
                                <circle class="dg-roxo-cheio" cx="20" cy="80" r="6" />
                                <circle class="dg-roxo-cheio" cx="116" cy="80" r="6" />
                                <circle class="dg-roxo-cheio" cx="188" cy="80" r="6" />
                                <circle class="dg-roxo-cheio" cx="380" cy="80" r="6" />
                                <text class="dg-txt dg-forte" x="20" y="60" text-anchor="middle">1930</text>
                                <text class="dg-txt dg-forte" x="116" y="60" text-anchor="middle">1934</text>
                                <text class="dg-txt dg-forte" x="188" y="60" text-anchor="middle">1937</text>
                                <text class="dg-txt dg-forte" x="372" y="60" text-anchor="middle">1945</text>
                                <text class="dg-txt" x="68" y="112" text-anchor="middle">Governo</text>
                                <text class="dg-txt" x="68" y="126" text-anchor="middle">Provisório</text>
                                <text class="dg-txt" x="152" y="112" text-anchor="middle">Governo</text>
                                <text class="dg-txt" x="152" y="126" text-anchor="middle">Constitucional</text>
                                <text class="dg-txt dg-forte" x="284" y="112" text-anchor="middle">Estado Novo</text>
                                <text class="dg-txt" x="284" y="126" text-anchor="middle">(ditadura)</text>
                            </svg>`,
                            legenda: "A Era Vargas vai de 1930 a 1945. Vargas voltaria ao poder eleito em 1951, mas esse segundo governo não faz parte da Era Vargas."
                        },
                        cards: [
                            { titulo: "Café com leite", texto: "Alternância entre paulistas e mineiros na presidência, sustentada pela política dos governadores e pelo coronelismo." },
                            { titulo: "Crise de 1929", texto: "A quebra da Bolsa de Nova York derrubou o preço do café e enfraqueceu a elite cafeeira paulista." },
                            { titulo: "Interventores", texto: "Vargas substituiu os governadores eleitos por interventores de sua confiança, centralizando o poder." },
                            { titulo: "Revolução Constitucionalista (1932)", texto: "São Paulo pegou em armas exigindo uma nova Constituição. Foi derrotado militarmente, mas a Constituinte foi convocada." }
                        ],
                        atencao: "Chama-se \"Revolução de 1930\", mas não houve uma revolução social: foi uma troca de grupos no poder, que tirou as oligarquias cafeeiras do comando do governo federal."
                    },
                    {
                        titulo: "Governo Constitucional (1934–1937)",
                        resumo: "Uma nova Constituição, a polarização entre integralistas e comunistas e o caminho para o golpe.",
                        conceito: [
                            "A <strong>Constituição de 1934</strong> trouxe o voto secreto e o voto feminino (que já havia sido instituído pelo Código Eleitoral de 1932), além de direitos trabalhistas como jornada de 8 horas e salário mínimo. Vargas foi eleito presidente de forma indireta, pela Assembleia Constituinte.",
                            "O período foi marcado pela polarização entre a <strong>Ação Integralista Brasileira</strong> (de inspiração fascista, liderada por Plínio Salgado) e a <strong>Aliança Nacional Libertadora</strong> (frente de esquerda ligada aos comunistas, com Luís Carlos Prestes).",
                            "Em 1935, a ANL tentou um levante, a <strong>Intentona Comunista</strong>, que foi derrotado. Vargas usou o \"perigo comunista\" para aumentar a repressão e preparar o golpe."
                        ],
                        cards: [
                            { titulo: "Constituição de 1934", texto: "Voto secreto e feminino, Justiça Eleitoral, direitos trabalhistas e previsão da Justiça do Trabalho." },
                            { titulo: "Integralismo", texto: "Movimento nacionalista e autoritário, com lema \"Deus, Pátria e Família\" e uniformes verdes, inspirado no fascismo italiano." },
                            { titulo: "ANL", texto: "Frente antifascista e anti-imperialista. Foi colocada na ilegalidade por Vargas em 1935." },
                            { titulo: "Plano Cohen (1937)", texto: "Documento falso que descrevia um suposto plano comunista para tomar o poder. Foi o pretexto para o golpe do Estado Novo." }
                        ],
                        atencao: "O voto feminino veio em 1932, com o Código Eleitoral, e foi confirmado pela Constituição de 1934. As duas datas podem aparecer nas questões."
                    },
                    {
                        titulo: "Estado Novo (1937–1945)",
                        resumo: "A ditadura de Vargas: centralização, censura, propaganda e trabalhismo.",
                        conceito: [
                            "Em novembro de 1937, com o pretexto do Plano Cohen, Vargas deu um golpe, fechou o Congresso e impôs uma nova Constituição, apelidada de <strong>\"Polaca\"</strong> por se inspirar na Constituição autoritária da Polônia. Os partidos foram extintos, inclusive o integralista.",
                            "O <strong>DIP (Departamento de Imprensa e Propaganda)</strong>, criado em 1939, censurava jornais, rádio e cinema e construía a imagem de Vargas como \"pai dos pobres\".",
                            "Ao mesmo tempo, o governo criou leis trabalhistas, como o salário mínimo (1940) e a <strong>CLT (1943)</strong>, e investiu na indústria de base, como a <strong>Companhia Siderúrgica Nacional</strong>, em Volta Redonda."
                        ],
                        cards: [
                            { titulo: "Trabalhismo", texto: "Direitos trabalhistas concedidos pelo Estado, em troca de apoio e controle dos sindicatos, que ficaram atrelados ao Ministério do Trabalho." },
                            { titulo: "Industrialização", texto: "O Estado investiu na indústria de base: CSN (siderurgia), Companhia Vale do Rio Doce (mineração) e Fábrica Nacional de Motores." },
                            { titulo: "Segunda Guerra", texto: "O Brasil entrou na guerra em 1942, ao lado dos Aliados. A FEB lutou na Itália a partir de 1944." },
                            { titulo: "Fim do Estado Novo", texto: "Lutar contra o fascismo na Europa e viver uma ditadura no Brasil era uma contradição. Vargas foi deposto pelos militares em outubro de 1945." }
                        ],
                        exemplo: {
                            titulo: "A contradição da guerra",
                            enunciado: "Por que a participação do Brasil na Segunda Guerra Mundial contribuiu para o fim do Estado Novo?",
                            passos: [
                                "O Brasil lutou ao lado dos Aliados, contra os regimes nazifascistas.",
                                "Internamente, porém, o país vivia uma ditadura, com censura e sem eleições.",
                                "Essa contradição fortaleceu a oposição, que passou a exigir eleições e liberdade de imprensa."
                            ],
                            resultado: "A luta contra as ditaduras na Europa tornou insustentável a ditadura no Brasil, o que levou à deposição de Vargas em 1945."
                        },
                        atencao: "A Petrobras (1953) foi criada no segundo governo Vargas (1951–1954), quando ele voltou eleito, e não durante a Era Vargas (1930–1945)."
                    }
                ]
            }
        ]
    },

    // =========================================================
    // GEOGRAFIA
    // =========================================================
    {
        id: "geografia",
        nome: "Geografia",
        area: "Ciências Humanas",
        icone: "fa-earth-americas",
        cor: "#7c3aed",
        topicos: [
            {
                id: "climatologia",
                titulo: "Climatologia",
                subtitulo: "Tempo e clima, fatores que influenciam o clima, tipos de chuva e os climas do Brasil.",
                formulas: ["Tempo ≠ clima", "−0,6 °C a cada 100 m", "Barlavento: chuva", "Sotavento: seco"],
                secoes: [
                    {
                        titulo: "Tempo, clima e fatores climáticos",
                        resumo: "O clima de um lugar depende de fatores como latitude, altitude, proximidade do mar e massas de ar.",
                        conceito: [
                            "<strong>Tempo</strong> é o estado da atmosfera em um momento (\"hoje está chovendo\"). <strong>Clima</strong> é o padrão do tempo observado ao longo de muitos anos, normalmente cerca de 30 anos de medições.",
                            "Os elementos do clima (temperatura, umidade, pressão) são influenciados pelos <strong>fatores climáticos</strong>: latitude, altitude, maritimidade e continentalidade, massas de ar, correntes marítimas, relevo e vegetação."
                        ],
                        cards: [
                            { titulo: "Latitude", texto: "Perto do Equador, os raios solares chegam mais perpendiculares e o calor é maior. Em direção aos polos, as temperaturas diminuem." },
                            { titulo: "Altitude", texto: "Quanto mais alto, mais frio: a temperatura cai em média cerca de 0,6 °C a cada 100 m de altitude." },
                            { titulo: "Maritimidade × continentalidade", texto: "Perto do mar, a água suaviza a temperatura (menor amplitude térmica). No interior, a amplitude térmica é maior." },
                            { titulo: "Massas de ar", texto: "Grandes porções de ar com temperatura e umidade próprias. Ao se deslocarem, levam essas características para outras regiões." }
                        ],
                        exemplo: {
                            titulo: "O efeito da altitude",
                            enunciado: "Uma cidade no litoral, ao nível do mar, registra 28 °C. Qual é a temperatura esperada em uma cidade a 1 000 m de altitude, na mesma latitude, considerando apenas a altitude?",
                            passos: [
                                "A temperatura cai cerca de 0,6 °C a cada 100 m.",
                                "1 000 m = 10 · 100 m, então a queda é de 10 · 0,6 = 6 °C.",
                                "28 − 6 = 22 °C."
                            ],
                            resultado: "Cerca de 22 °C."
                        },
                        atencao: "\"Amanhã vai fazer frio\" é previsão do tempo, não do clima. Uma onda de frio isolada não muda o clima de uma região."
                    },
                    {
                        titulo: "Tipos de chuva",
                        resumo: "Chuva se forma quando o ar úmido sobe, esfria e o vapor se condensa. O que muda é o motivo da subida.",
                        conceito: [
                            "Toda chuva depende de ar úmido que sobe, esfria e condensa. Existem três tipos principais, de acordo com o que faz o ar subir: aquecimento da superfície (<strong>convectiva</strong>), uma barreira de relevo (<strong>orográfica</strong>) ou o encontro de massas de ar (<strong>frontal</strong>)."
                        ],
                        diagrama: {
                            titulo: "Chuva orográfica",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Chuva orográfica: o vento úmido vindo do mar sobe a serra, chove no lado de barlavento e chega seco ao lado de sotavento">
                                <rect class="dg-mar" x="0" y="140" width="110" height="30" />
                                <text class="dg-txt dg-azul-txt" x="40" y="154">mar</text>
                                <polygon class="dg-serra" points="110,160 220,40 330,160" />
                                <line class="dg-traco" x1="0" y1="160" x2="400" y2="160" />
                                <path class="dg-azul dg-grosso" d="M20 120 H95 Q 145 115 176 72" />
                                <polygon class="dg-azul-cheio" points="170,70 182,63 180,77" />
                                <text class="dg-txt dg-azul-txt" x="14" y="110">vento úmido</text>
                                <ellipse class="dg-nuvem" cx="130" cy="28" rx="38" ry="14" />
                                <line class="dg-azul" x1="115" y1="48" x2="110" y2="62" />
                                <line class="dg-azul" x1="128" y1="48" x2="123" y2="62" />
                                <line class="dg-azul" x1="141" y1="48" x2="136" y2="62" />
                                <text class="dg-txt dg-azul-txt" x="60" y="56">chuva</text>
                                <path class="dg-laranja dg-grosso" d="M245 45 Q 290 60 360 110" />
                                <polygon class="dg-laranja-cheio" points="356,103 366,115 352,113" />
                                <text class="dg-txt dg-laranja-txt" x="300" y="70">ar seco</text>
                                <text class="dg-txt dg-forte" x="140" y="148">barlavento</text>
                                <text class="dg-txt dg-forte" x="240" y="148">sotavento</text>
                            </svg>`,
                            legenda: "O lado da serra voltado para o vento úmido (barlavento) recebe muita chuva. O ar chega seco ao outro lado (sotavento), que fica mais árido."
                        },
                        cards: [
                            { titulo: "Convectiva", texto: "O calor aquece a superfície, o ar úmido sobe rápido e forma nuvens carregadas. São as \"chuvas de verão\" do fim da tarde, fortes e rápidas." },
                            { titulo: "Orográfica (de relevo)", texto: "O ar úmido é forçado a subir uma serra. Comum na Serra do Mar, no litoral do Sudeste." },
                            { titulo: "Frontal", texto: "Encontro de uma massa de ar fria com uma quente: o ar quente sobe sobre o frio. Típica das frentes frias no Sul e no Sudeste." },
                            { titulo: "Sombra de chuva", texto: "Região seca a sotavento de uma serra. Ajuda a explicar a semiaridez de partes do interior do Nordeste." }
                        ],
                        atencao: "Barlavento é o lado que recebe o vento (e a chuva). Sotavento é o lado protegido, para onde o ar chega já seco."
                    },
                    {
                        titulo: "Os climas do Brasil",
                        resumo: "Por ser um país muito extenso e quase todo na zona tropical, o Brasil tem climas predominantemente quentes, mas com diferenças importantes.",
                        conceito: [
                            "A maior parte do território brasileiro está entre o Equador e o Trópico de Capricórnio, por isso predominam os <strong>climas quentes</strong>. As diferenças vêm principalmente da quantidade e da distribuição das chuvas, da altitude e da atuação das massas de ar.",
                            "Uma classificação muito usada nos livros didáticos divide o país em seis climas: equatorial, tropical, tropical de altitude, tropical atlântico (litorâneo), semiárido e subtropical."
                        ],
                        cards: [
                            { titulo: "Equatorial", texto: "Amazônia. Quente e úmido o ano todo, com chuvas abundantes e baixa amplitude térmica." },
                            { titulo: "Tropical", texto: "Brasil Central. Duas estações bem definidas: verão chuvoso e inverno seco. É o clima do Cerrado." },
                            { titulo: "Tropical de altitude", texto: "Planaltos do Sudeste. Parecido com o tropical, mas com temperaturas mais baixas por causa da altitude." },
                            { titulo: "Tropical atlântico", texto: "Faixa litorânea do Nordeste ao Sudeste. Quente e úmido, influenciado pela massa tropical atlântica." },
                            { titulo: "Semiárido", texto: "Sertão nordestino. Temperaturas altas, chuvas escassas e irregulares, com longos períodos de estiagem. É o clima da Caatinga." },
                            { titulo: "Subtropical", texto: "Região Sul. Estações bem marcadas, invernos frios (com geadas e até neve em áreas altas) e chuvas bem distribuídas." }
                        ],
                        exemplo: {
                            titulo: "Por que o Sertão é seco",
                            enunciado: "Cite fatores que ajudam a explicar o clima semiárido do Sertão nordestino.",
                            passos: [
                                "As massas de ar úmidas perdem boa parte da umidade antes de chegar ao interior.",
                                "O relevo, como o Planalto da Borborema, barra a umidade vinda do litoral e cria uma sombra de chuva.",
                                "As chuvas são concentradas em poucos meses e muito irregulares de um ano para outro."
                            ],
                            resultado: "A falta de massas de ar úmidas, as barreiras de relevo e a irregularidade das chuvas explicam a semiaridez."
                        },
                        atencao: "A friagem é a chegada da massa de ar polar atlântica a partes da Amazônia (principalmente Acre e Rondônia), provocando quedas bruscas de temperatura em uma região normalmente quente."
                    }
                ]
            }
        ]
    },

    // =========================================================
    // FILOSOFIA
    // =========================================================
    {
        id: "filosofia",
        nome: "Filosofia",
        area: "Ciências Humanas",
        icone: "fa-scale-balanced",
        cor: "#6f42a8",
        topicos: [
            {
                id: "contratualismo",
                titulo: "Contratualismo",
                subtitulo: "Hobbes, Locke e Rousseau: por que os seres humanos criam o Estado e o que justifica o poder político.",
                formulas: ["Hobbes · Leviatã (1651)", "Locke · Segundo Tratado (1689)", "Rousseau · Contrato Social (1762)"],
                secoes: [
                    {
                        titulo: "O que é o contratualismo",
                        resumo: "A ideia de que o Estado nasce de um acordo entre as pessoas, e não da vontade divina ou da tradição.",
                        conceito: [
                            "Os contratualistas imaginam como seria a vida humana antes de existir governo, o chamado <strong>estado de natureza</strong>. A partir daí, explicam por que as pessoas fariam um <strong>contrato social</strong>, abrindo mão de parte da liberdade para viver em uma <strong>sociedade civil</strong> organizada.",
                            "O estado de natureza é uma hipótese para pensar a origem e os limites do poder, e não um período histórico real. Cada autor o descreve de um jeito, e por isso chega a um modelo diferente de Estado."
                        ],
                        diagrama: {
                            titulo: "A lógica do contrato",
                            svg: `<svg viewBox="0 0 400 170" role="img" aria-label="Esquema: estado de natureza, depois contrato social, depois sociedade civil e Estado">
                                <rect class="dg-caixa" x="10" y="55" width="110" height="56" rx="12" />
                                <rect class="dg-caixa-laranja" x="145" y="55" width="110" height="56" rx="12" />
                                <rect class="dg-caixa-roxa" x="280" y="55" width="110" height="56" rx="12" />
                                <text class="dg-txt dg-forte" x="65" y="80" text-anchor="middle">estado de</text>
                                <text class="dg-txt dg-forte" x="65" y="96" text-anchor="middle">natureza</text>
                                <text class="dg-txt dg-forte" x="200" y="80" text-anchor="middle">contrato</text>
                                <text class="dg-txt dg-forte" x="200" y="96" text-anchor="middle">social</text>
                                <text class="dg-txt dg-forte" x="335" y="80" text-anchor="middle">sociedade</text>
                                <text class="dg-txt dg-forte" x="335" y="96" text-anchor="middle">civil e Estado</text>
                                <line class="dg-laranja" x1="122" y1="83" x2="137" y2="83" /><polygon class="dg-laranja-cheio" points="137,78 144,83 137,88" />
                                <line class="dg-laranja" x1="257" y1="83" x2="272" y2="83" /><polygon class="dg-laranja-cheio" points="272,78 279,83 272,88" />
                                <text class="dg-txt" x="65" y="135" text-anchor="middle">sem governo</text>
                                <text class="dg-txt" x="200" y="135" text-anchor="middle">acordo entre</text>
                                <text class="dg-txt" x="200" y="149" text-anchor="middle">as pessoas</text>
                                <text class="dg-txt" x="335" y="135" text-anchor="middle">poder político</text>
                                <text class="dg-txt" x="335" y="149" text-anchor="middle">legítimo</text>
                            </svg>`,
                            legenda: "Os três autores seguem esse esquema, mas discordam sobre como é o estado de natureza e sobre quem deve ter o poder depois do contrato."
                        },
                        cards: [
                            { titulo: "Estado de natureza", texto: "Situação hipotética sem leis nem governo. É o ponto de partida do raciocínio." },
                            { titulo: "Contrato social", texto: "Acordo pelo qual as pessoas aceitam regras comuns e uma autoridade política." },
                            { titulo: "Legitimidade", texto: "Para os contratualistas, o poder é legítimo porque vem do consentimento das pessoas, e não de Deus ou da hereditariedade." },
                            { titulo: "Contexto", texto: "Séculos XVII e XVIII: guerras civis, crise do absolutismo e ascensão da burguesia na Europa." }
                        ],
                        atencao: "Nas provas, o mais cobrado é diferenciar os três autores. Guarde a imagem de cada um sobre o estado de natureza: guerra (Hobbes), direitos naturais (Locke) e bondade natural (Rousseau)."
                    },
                    {
                        titulo: "Hobbes: o Leviatã",
                        resumo: "Thomas Hobbes (1588–1679) defendeu um soberano com poder absoluto para garantir a paz.",
                        conceito: [
                            "Para Hobbes, no estado de natureza todos são iguais e todos têm direito a tudo. Como os recursos são limitados, isso gera desconfiança e uma <strong>\"guerra de todos contra todos\"</strong>, em que a vida é \"solitária, pobre, sórdida, embrutecida e curta\".",
                            "Movidas pelo <strong>medo da morte</strong>, as pessoas transferem seus direitos a um soberano, o <strong>Leviatã</strong>, que deve ter poder absoluto para manter a paz e a segurança."
                        ],
                        cards: [
                            { titulo: "Estado de natureza", texto: "Guerra de todos contra todos. Não há justiça nem propriedade, porque não há uma lei comum." },
                            { titulo: "Motivo do contrato", texto: "Medo da morte violenta e desejo de segurança." },
                            { titulo: "Tipo de Estado", texto: "Soberano absoluto e indivisível. Ninguém pode se rebelar contra ele." },
                            { titulo: "Contexto", texto: "Hobbes escreveu marcado pela Guerra Civil Inglesa, que o fez valorizar a ordem acima de tudo." }
                        ],
                        exemplo: {
                            titulo: "Identificando o autor",
                            enunciado: "\"Enquanto os homens vivem sem um poder comum capaz de mantê-los a todos em respeito, eles se encontram naquela condição a que se chama guerra.\" A qual autor e ideia se refere o trecho?",
                            passos: [
                                "O trecho fala da falta de um \"poder comum\": é o estado de natureza.",
                                "A condição descrita é de \"guerra\".",
                                "Estado de natureza como guerra é a marca de Hobbes."
                            ],
                            resultado: "Hobbes: sem um soberano, o estado de natureza é uma guerra de todos contra todos."
                        },
                        atencao: "A frase \"o homem é o lobo do homem\" não foi criada por Hobbes: ela vem do escritor romano Plauto. Hobbes a usou e a tornou famosa."
                    },
                    {
                        titulo: "Locke: direitos naturais",
                        resumo: "John Locke (1632–1704) defendeu um governo limitado, que existe para proteger os direitos das pessoas.",
                        conceito: [
                            "Para Locke, o estado de natureza não é uma guerra. As pessoas já têm <strong>direitos naturais</strong>: <strong>vida, liberdade e propriedade</strong>. A propriedade nasce do trabalho: ao trabalhar a terra, a pessoa a torna sua.",
                            "O problema é que não existe um juiz imparcial para resolver conflitos. O contrato cria um governo para <strong>proteger esses direitos</strong>. Se o governo os violar, o povo tem o <strong>direito de resistência</strong> e pode derrubá-lo."
                        ],
                        cards: [
                            { titulo: "Estado de natureza", texto: "Relativamente pacífico, com direitos naturais, mas sem um juiz imparcial para os conflitos." },
                            { titulo: "Motivo do contrato", texto: "Garantir e proteger a vida, a liberdade e a propriedade." },
                            { titulo: "Tipo de Estado", texto: "Governo limitado, com poderes separados (Legislativo acima do Executivo) e que depende do consentimento do povo." },
                            { titulo: "Influência", texto: "É considerado o \"pai do liberalismo\". Inspirou a Revolução Gloriosa (1688), a Independência dos EUA e a Revolução Francesa." }
                        ],
                        atencao: "Se a questão falar em direito de resistência ou rebelião contra um governo injusto, pense em Locke. Para Hobbes, não há direito de rebelião contra o soberano."
                    },
                    {
                        titulo: "Rousseau: a vontade geral",
                        resumo: "Jean-Jacques Rousseau (1712–1778) via na sociedade a origem da desigualdade e defendeu a soberania do povo.",
                        conceito: [
                            "Para Rousseau, no estado de natureza o ser humano é bom e livre (a ideia que ficou conhecida como <strong>\"bom selvagem\"</strong>). É a sociedade, especialmente a <strong>propriedade privada</strong>, que cria a desigualdade e corrompe as pessoas.",
                            "O contrato social legítimo é aquele em que todos participam das decisões. A <strong>soberania pertence ao povo</strong> e se expressa pela <strong>vontade geral</strong>, que busca o bem comum, e não pela soma dos interesses individuais."
                        ],
                        cards: [
                            { titulo: "Estado de natureza", texto: "O ser humano é bom, livre e vive de forma simples. A desigualdade surge com a propriedade privada." },
                            { titulo: "Vontade geral", texto: "A vontade do povo voltada ao bem comum. É diferente da \"vontade de todos\", que é só a soma dos interesses particulares." },
                            { titulo: "Tipo de Estado", texto: "Soberania popular: o povo é o soberano e as leis devem expressar a vontade geral. Base da ideia de democracia direta." },
                            { titulo: "Frase famosa", texto: "\"O homem nasce livre, e por toda parte encontra-se a ferros\" (Do Contrato Social)." }
                        ],
                        exemplo: {
                            titulo: "Comparando os três",
                            enunciado: "Um texto afirma que o primeiro homem que cercou um terreno e disse \"isto é meu\" foi o verdadeiro fundador da sociedade civil e de seus males. Qual autor defende essa ideia?",
                            passos: [
                                "O texto liga a propriedade privada aos males da sociedade.",
                                "Locke também fala de propriedade, mas a vê como um direito natural a ser protegido.",
                                "Ver a propriedade como origem da desigualdade é a marca de Rousseau."
                            ],
                            resultado: "Rousseau, no Discurso sobre a origem da desigualdade (1755)."
                        },
                        atencao: "Resumo para a prova: Hobbes = medo e soberano absoluto. Locke = propriedade e governo limitado. Rousseau = desigualdade e soberania popular."
                    }
                ]
            }
        ]
    }
);
