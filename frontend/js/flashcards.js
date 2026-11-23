// ===============================================
// BANCO DE FLASHCARDS
// Para adicionar um cartão, copie um bloco { ... } dentro da matéria.
// ===============================================
const bancoFlashcards = {
    "Física": [
        { pergunta: "O que é corrente elétrica?", resposta: "Fluxo ordenado de cargas elétricas em um condutor.", formula: "i = Q / t  (Ampère, A)" },
        { pergunta: "O que diz a 1ª Lei de Newton (Inércia)?", resposta: "Um corpo permanece em repouso ou em movimento retilíneo uniforme, a menos que uma força resultante atue sobre ele." },
        { pergunta: "O que é a Lei de Ohm?", resposta: "A tensão em um resistor é proporcional à corrente que passa por ele.", formula: "U = R · i" },
        { pergunta: "Como se calcula a energia cinética?", resposta: "É a energia associada ao movimento de um corpo.", formula: "Ec = m · v² / 2" },
        { pergunta: "Como se calcula a velocidade média?", resposta: "Distância percorrida dividida pelo tempo gasto. Para passar de km/h para m/s, divida por 3,6.", formula: "v = Δs / Δt" }
    ],
    "Matemática": [
        { pergunta: "O que diz o Teorema de Pitágoras?", resposta: "Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.", formula: "a² = b² + c²" },
        { pergunta: "Como calcular x% de um valor?", resposta: "Multiplique o valor pela porcentagem e divida por 100. Ex.: 15% de 80 = 12.", formula: "x% de y = x · y / 100" },
        { pergunta: "Qual é a área de um círculo?", resposta: "Pi vezes o raio ao quadrado (π ≈ 3,14).", formula: "A = π · r²" },
        { pergunta: "O que é uma função afim?", resposta: "Função do tipo f(x) = ax + b. O “a” é a taxa de variação (inclinação) e o “b” é o valor inicial.", formula: "f(x) = ax + b" },
        { pergunta: "Como se calcula uma probabilidade?", resposta: "Número de casos favoráveis dividido pelo número de casos possíveis.", formula: "P = favoráveis / possíveis" }
    ],
    "Português": [
        { pergunta: "O que é metáfora?", resposta: "Comparação implícita, sem conectivo (“como”). Ex.: “Ele é um leão em campo”." },
        { pergunta: "O que é variação linguística?", resposta: "As diferentes formas de usar a língua conforme região, idade, grupo social ou situação. Nenhuma é “errada”: cada uma é adequada a um contexto." },
        { pergunta: "O que é a função conativa da linguagem?", resposta: "Busca convencer ou influenciar o leitor, com verbos no imperativo e apelos diretos. Comum em propagandas." },
        { pergunta: "Qual a diferença entre coesão e coerência?", resposta: "Coesão é a ligação entre as partes do texto (conectivos, pronomes). Coerência é o sentido lógico do texto como um todo." },
        { pergunta: "Quais os 5 elementos da proposta de intervenção da redação dissertativa-argumentativa?", resposta: "Agente (quem faz), ação (o quê), meio/modo (como), finalidade (para quê) e detalhamento de um desses elementos." }
    ],
    "Química": [
        { pergunta: "O que é ligação iônica?", resposta: "Ligação entre metal e ametal, com transferência de elétrons e formação de íons que se atraem. Ex.: NaCl." },
        { pergunta: "O que indica o pH de uma solução?", resposta: "pH < 7: ácida · pH = 7: neutra · pH > 7: básica (a 25 °C)." },
        { pergunta: "O que são isótopos?", resposta: "Átomos do mesmo elemento (mesmo número de prótons) com número de nêutrons diferente. Ex.: C-12 e C-14." },
        { pergunta: "O que é uma reação de neutralização?", resposta: "Reação entre um ácido e uma base, formando sal e água.", formula: "ácido + base → sal + água" },
        { pergunta: "O que é 1 mol?", resposta: "Quantidade de matéria que contém 6,02 × 10²³ entidades (constante de Avogadro).", formula: "n = massa / massa molar" }
    ],
    "Biologia": [
        { pergunta: "Qual a função da mitocôndria?", resposta: "Realizar a respiração celular, produzindo energia (ATP) a partir da glicose." },
        { pergunta: "Qual é a equação da fotossíntese?", resposta: "Gás carbônico e água, com energia luminosa, formam glicose e oxigênio.", formula: "6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂" },
        { pergunta: "Qual a diferença entre DNA e RNA?", resposta: "DNA: fita dupla, açúcar desoxirribose, base timina. RNA: fita simples, açúcar ribose, base uracila." },
        { pergunta: "O que é seleção natural?", resposta: "Ideia de Darwin: indivíduos com características mais vantajosas no ambiente sobrevivem e se reproduzem mais, passando-as adiante." },
        { pergunta: "Qual a diferença entre vacina e soro?", resposta: "Vacina: estimula o corpo a produzir anticorpos (prevenção, imunidade ativa). Soro: fornece anticorpos prontos (tratamento, imunidade passiva)." }
    ],
    "Geografia": [
        { pergunta: "O que é inversão térmica?", resposta: "Uma camada de ar quente fica sobre o ar frio junto ao solo, impedindo a dispersão dos poluentes. Comum no inverno das metrópoles." },
        { pergunta: "O que é ilha de calor?", resposta: "Temperatura mais alta nos centros urbanos por causa do asfalto, concreto e pouca vegetação." },
        { pergunta: "Quais são os 6 biomas brasileiros?", resposta: "Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa." },
        { pergunta: "O que é êxodo rural?", resposta: "Migração em massa do campo para as cidades, motivada pela mecanização agrícola e pela busca de emprego." },
        { pergunta: "Qual a principal fonte de energia elétrica do Brasil?", resposta: "Hidrelétrica: o país tem muitos rios caudalosos, o que torna sua matriz elétrica bastante renovável." }
    ],
    "História": [
        { pergunta: "O que foi a Revolução Industrial?", resposta: "Transformação iniciada na Inglaterra (séc. XVIII): troca da produção artesanal pela mecanizada, surgimento das fábricas e do trabalho assalariado." },
        { pergunta: "O que marcou a Era Vargas (1930–1945)?", resposta: "Centralização do poder, industrialização e leis trabalhistas (CLT, 1943, com salário mínimo e férias)." },
        { pergunta: "O que foi o AI-5?", resposta: "Ato Institucional de 1968, o mais duro da ditadura militar (1964–1985): censura, fechamento do Congresso e suspensão do habeas corpus." },
        { pergunta: "O que foi o Iluminismo?", resposta: "Movimento do séc. XVIII que defendia a razão, a liberdade e a separação dos poderes contra o absolutismo. Ex.: Montesquieu, Voltaire, Rousseau." },
        { pergunta: "O que foi a Lei Áurea?", resposta: "Lei de 1888 que aboliu a escravidão no Brasil, sem políticas de inclusão para a população liberta." }
    ],
    "Filosofia": [
        { pergunta: "Qual a diferença entre ética e moral?", resposta: "Moral: conjunto de regras e costumes de uma sociedade. Ética: reflexão filosófica sobre essas regras e sobre o agir correto." },
        { pergunta: "O que representa o Mito da Caverna?", resposta: "Alegoria de Platão: as sombras são as aparências; sair da caverna é o caminho até o conhecimento verdadeiro." },
        { pergunta: "Racionalismo x Empirismo?", resposta: "Racionalismo (Descartes): o conhecimento vem da razão. Empirismo (Locke, Hume): o conhecimento vem da experiência e dos sentidos." },
        { pergunta: "O que é o contratualismo?", resposta: "Teoria de que a sociedade nasce de um contrato entre os indivíduos. Hobbes: Estado forte; Locke: direitos naturais; Rousseau: vontade geral." },
        { pergunta: "O que é o imperativo categórico de Kant?", resposta: "“Age de tal modo que a máxima da tua ação possa se tornar uma lei universal.” A moral vem do dever, não das consequências." }
    ]
};
