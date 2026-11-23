// ===============================================
// BANCO DE QUESTÕES
// Para adicionar uma questão, copie um bloco { ... } dentro da matéria.
// "correta" é a letra da alternativa certa (A, B, C ou D).
// ===============================================
const bancoQuestoes = {
    "Física": [
        {
            enunciado: "Um condutor é percorrido por uma corrente de 3 A durante 4 s. Qual a carga elétrica que atravessou o condutor?",
            alternativas: ["3 C", "4 C", "7 C", "12 C"],
            correta: "D",
            explicacao: "Q = i · t = 3 A · 4 s = 12 C."
        },
        {
            enunciado: "Um carro trafega em uma rodovia a 72 km/h. Qual é essa velocidade em metros por segundo?",
            alternativas: ["7,2 m/s", "20 m/s", "36 m/s", "259,2 m/s"],
            correta: "B",
            explicacao: "Para converter km/h em m/s, divide-se por 3,6: 72 ÷ 3,6 = 20 m/s."
        },
        {
            enunciado: "Um bloco de 5 kg, apoiado em uma superfície sem atrito, recebe uma aceleração de 2 m/s². Qual é a força resultante sobre ele?",
            alternativas: ["2,5 N", "7 N", "10 N", "25 N"],
            correta: "C",
            explicacao: "Pela 2ª Lei de Newton, F = m · a = 5 · 2 = 10 N."
        },
        {
            enunciado: "Um chuveiro elétrico de 5 500 W fica ligado 20 minutos por dia durante 30 dias. Qual é o consumo de energia no mês?",
            alternativas: ["55 kWh", "110 kWh", "165 kWh", "3 300 kWh"],
            correta: "A",
            explicacao: "E = P · t = 5,5 kW · (1/3 h · 30) = 5,5 · 10 = 55 kWh."
        },
        {
            enunciado: "Uma onda se propaga em uma corda com frequência de 10 Hz e comprimento de onda de 2 m. Qual é a velocidade de propagação dessa onda?",
            alternativas: ["0,2 m/s", "5 m/s", "20 m/s", "200 m/s"],
            correta: "C",
            explicacao: "v = λ · f = 2 m · 10 Hz = 20 m/s."
        },
        {
            enunciado: "Uma garrafa térmica mantém o café quente por várias horas porque foi projetada para reduzir as trocas de calor com o ambiente. Quais processos de transferência de calor ela busca minimizar?",
            alternativas: ["Apenas a condução", "Condução, convecção e radiação", "Apenas a radiação", "Apenas a evaporação"],
            correta: "B",
            explicacao: "O vácuo entre as paredes reduz condução e convecção, e as paredes espelhadas reduzem a radiação."
        },
        {
            enunciado: "Um objeto é solto do repouso e cai livremente durante 2 s. Desprezando a resistência do ar e considerando g = 10 m/s², qual é sua velocidade ao final desse tempo?",
            alternativas: ["2 m/s", "5 m/s", "10 m/s", "20 m/s"],
            correta: "D",
            explicacao: "Na queda livre, v = g · t = 10 · 2 = 20 m/s."
        },
        {
            enunciado: "Em uma residência, várias lâmpadas são ligadas de forma que, se uma queimar, as outras continuam acesas. Que tipo de associação é essa?",
            alternativas: ["Em série", "Em paralelo", "Mista obrigatoriamente", "Em curto-circuito"],
            correta: "B",
            explicacao: "Na associação em paralelo, cada lâmpada tem seu próprio caminho para a corrente, então uma não depende da outra."
        }
    ],

    "Matemática": [
        {
            enunciado: "Um arquiteto projeta uma praça quadrada cujo lado mede (3x + 4) metros. Usando o produto notável do quadrado da soma, qual expressão representa a área da praça?",
            alternativas: ["9x² + 16", "9x² + 12x + 16", "9x² + 24x + 16", "9x² − 24x + 16"],
            correta: "C",
            explicacao: "(3x + 4)² = (3x)² + 2 · 3x · 4 + 4² = 9x² + 24x + 16."
        },
        {
            enunciado: "Uma loja vende um tênis por R$ 80,00 e oferece 15% de desconto no pagamento à vista. Qual é o preço à vista?",
            alternativas: ["R$ 65,00", "R$ 68,00", "R$ 72,00", "R$ 95,00"],
            correta: "B",
            explicacao: "15% de 80 = 12. Então 80 − 12 = R$ 68,00."
        },
        {
            enunciado: "Um aluno tirou as notas 6, 7, 8, 9 e 10 em cinco provas. Qual é a média aritmética das notas?",
            alternativas: ["7", "7,5", "8", "8,5"],
            correta: "C",
            explicacao: "(6 + 7 + 8 + 9 + 10) ÷ 5 = 40 ÷ 5 = 8."
        },
        {
            enunciado: "Em um mapa com escala 1 : 100 000, a distância entre duas cidades é de 5 cm. Qual é a distância real entre elas?",
            alternativas: ["50 km", "0,5 km", "500 km", "5 km"],
            correta: "D",
            explicacao: "5 cm · 100 000 = 500 000 cm = 5 000 m = 5 km."
        },
        {
            enunciado: "Ao lançar um dado comum de seis faces, qual é a probabilidade de sair um número maior que 4?",
            alternativas: ["1/6", "1/3", "1/2", "2/3"],
            correta: "B",
            explicacao: "Os resultados favoráveis são 5 e 6: 2 de 6 possibilidades, ou seja, 2/6 = 1/3."
        },
        {
            enunciado: "Uma receita de bolo para 4 pessoas usa 300 g de farinha. Mantendo a proporção, quantos gramas de farinha são necessários para 10 pessoas?",
            alternativas: ["600 g", "700 g", "750 g", "1 200 g"],
            correta: "C",
            explicacao: "300 ÷ 4 = 75 g por pessoa. 75 · 10 = 750 g."
        },
        {
            enunciado: "Um terreno retangular mede 12 m por 15 m. O dono quer cercá-lo com 3 voltas de arame. Quantos metros de arame serão necessários?",
            alternativas: ["162 m", "54 m", "108 m", "180 m"],
            correta: "A",
            explicacao: "Perímetro = 2 · (12 + 15) = 54 m. Com 3 voltas: 54 · 3 = 162 m."
        },
        {
            enunciado: "Um aplicativo de transporte cobra R$ 5,00 fixos mais R$ 2,00 por quilômetro rodado. Quanto custa uma corrida de 12 km?",
            alternativas: ["R$ 24,00", "R$ 29,00", "R$ 34,00", "R$ 60,00"],
            correta: "B",
            explicacao: "f(x) = 5 + 2x → f(12) = 5 + 24 = R$ 29,00."
        }
    ],

    "Português": [
        {
            enunciado: "“Lucas sempre gostou de ler, mas nunca teve muito tempo para isso. Durante as férias, decidiu visitar a biblioteca de seu bairro. Lá, encontrou um livro de aventuras que despertou sua curiosidade. Todos os dias, reservava algumas horas para a leitura e, ao terminar o livro, percebeu que havia desenvolvido um novo hábito.”\n\nQual foi a principal mudança na rotina de Lucas após visitar a biblioteca?",
            alternativas: [
                "Passou a frequentar a biblioteca todos os dias para estudar.",
                "Desenvolveu o hábito de reservar um tempo diário para a leitura.",
                "Deixou de gostar de livros de aventuras.",
                "Começou a trabalhar na biblioteca do bairro."
            ],
            correta: "B",
            explicacao: "O texto diz que ele reservava horas todos os dias para ler e “havia desenvolvido um novo hábito”."
        },
        {
            enunciado: "Na frase “Aquele jogador é um leão em campo”, qual figura de linguagem foi utilizada?",
            alternativas: ["Comparação", "Metonímia", "Metáfora", "Hipérbole"],
            correta: "C",
            explicacao: "Há uma comparação implícita (sem “como”) entre o jogador e o leão, o que caracteriza a metáfora."
        },
        {
            enunciado: "Na frase “Estou morrendo de fome”, a expressão destacada é um exemplo de:",
            alternativas: ["Hipérbole", "Ironia", "Eufemismo", "Antítese"],
            correta: "A",
            explicacao: "A hipérbole é o exagero intencional para dar ênfase a uma ideia."
        },
        {
            enunciado: "Em uma conversa entre amigos, alguém diz: “Nóis vai no cinema amanhã”. Do ponto de vista dos estudos linguísticos, essa fala representa:",
            alternativas: [
                "Um erro que deve ser sempre corrigido, em qualquer situação.",
                "Uma variação linguística legítima, adequada a contextos informais.",
                "Uma forma de falar exclusiva de pessoas idosas.",
                "Um estrangeirismo incorporado ao português."
            ],
            correta: "B",
            explicacao: "As variações linguísticas devem ser respeitadas: a fala não segue a norma-padrão, mas é adequada ao contexto informal."
        },
        {
            enunciado: "Em qual das frases o uso do acento grave (crase) está correto?",
            alternativas: ["Fui à praia ontem.", "Ele começou à estudar.", "Entreguei o livro à ele.", "Andamos à pé até a escola."],
            correta: "A",
            explicacao: "“Ir a” + “a praia” = “à praia”. Não há crase antes de verbos, pronomes pessoais e palavras masculinas."
        },
        {
            enunciado: "Uma propaganda diz: “Compre já! Aproveite essa oferta imperdível!”. Qual função da linguagem predomina nesse texto?",
            alternativas: ["Referencial", "Emotiva", "Metalinguística", "Conativa (apelativa)"],
            correta: "D",
            explicacao: "A função conativa busca convencer o leitor, com verbos no imperativo e apelos diretos."
        },
        {
            enunciado: "Um texto que relata fatos recentes de forma objetiva, apresentando título e um primeiro parágrafo (lide) com as informações principais, pertence a qual gênero?",
            alternativas: ["Crônica", "Poema", "Notícia", "Carta pessoal"],
            correta: "C",
            explicacao: "A notícia é objetiva, informa fatos atuais e responde no lide: o quê, quem, quando, onde, como e por quê."
        },
        {
            enunciado: "Na frase “Ela estudou muito, porém não conseguiu a nota que queria”, o conectivo “porém” expressa ideia de:",
            alternativas: ["Adição", "Oposição", "Conclusão", "Explicação"],
            correta: "B",
            explicacao: "“Porém” é uma conjunção adversativa: introduz uma ideia contrária à anterior."
        }
    ],

    "Química": [
        {
            enunciado: "O sal de cozinha (NaCl) é formado pela união de sódio (Na) e cloro (Cl). Que tipo de ligação química ocorre na formação do NaCl?",
            alternativas: ["Ligação covalente", "Ligação iônica", "Ligação metálica", "Ligação de hidrogênio"],
            correta: "B",
            explicacao: "O sódio (metal) doa um elétron ao cloro (ametal), formando íons Na⁺ e Cl⁻ que se atraem: ligação iônica."
        },
        {
            enunciado: "Uma solução apresentou pH igual a 3 a 25 °C. Essa solução é classificada como:",
            alternativas: ["Ácida", "Básica", "Neutra", "Salina, obrigatoriamente"],
            correta: "A",
            explicacao: "pH menor que 7 indica solução ácida; igual a 7, neutra; maior que 7, básica."
        },
        {
            enunciado: "Qual processo é mais adequado para separar a água do sal dissolvido nela, recuperando a água pura?",
            alternativas: ["Filtração", "Catação", "Destilação simples", "Peneiração"],
            correta: "C",
            explicacao: "Na destilação simples a água evapora, é condensada e recolhida, e o sal fica no recipiente."
        },
        {
            enunciado: "Um átomo de carbono tem número atômico 6 e número de massa 12. Quantos nêutrons ele possui?",
            alternativas: ["3", "12", "18", "6"],
            correta: "D",
            explicacao: "Nêutrons = A − Z = 12 − 6 = 6."
        },
        {
            enunciado: "A combustão completa do gás metano (CH₄), presente no gás natural, produz:",
            alternativas: ["CO₂ e H₂O", "CO e H₂", "O₂ e H₂", "CH₄ e O₂"],
            correta: "A",
            explicacao: "CH₄ + 2 O₂ → CO₂ + 2 H₂O. A combustão completa gera gás carbônico e água."
        },
        {
            enunciado: "Qual dos fenômenos abaixo é uma transformação química?",
            alternativas: ["Derretimento do gelo", "Evaporação da água", "Queima de um papel", "Quebra de um copo"],
            correta: "C",
            explicacao: "Na queima formam-se novas substâncias (cinzas, CO₂, água). Os outros são mudanças físicas."
        },
        {
            enunciado: "Qual gás, liberado principalmente pela queima de combustíveis fósseis, é o maior responsável pela intensificação do efeito estufa?",
            alternativas: ["Nitrogênio (N₂)", "Argônio (Ar)", "Oxigênio (O₂)", "Dióxido de carbono (CO₂)"],
            correta: "D",
            explicacao: "O CO₂ retém parte do calor irradiado pela Terra e é o principal gás emitido por atividades humanas."
        },
        {
            enunciado: "A massa molar da água (H₂O) é 18 g/mol. Quantos mols existem em 36 g de água?",
            alternativas: ["1 mol", "2 mol", "18 mol", "36 mol"],
            correta: "B",
            explicacao: "n = massa ÷ massa molar = 36 ÷ 18 = 2 mol."
        }
    ],

    "Biologia": [
        {
            enunciado: "As plantas produzem seu próprio alimento por meio da fotossíntese, utilizando água, gás carbônico e energia luminosa. Qual é a principal função da clorofila nesse processo?",
            alternativas: ["Absorver a energia luminosa.", "Transportar água pelas raízes.", "Liberar sais minerais no solo.", "Absorver oxigênio do ambiente."],
            correta: "A",
            explicacao: "A clorofila é o pigmento que capta a luz, fornecendo a energia para a fotossíntese."
        },
        {
            enunciado: "Qual organela celular é responsável pela respiração celular, processo que produz a maior parte da energia (ATP) da célula?",
            alternativas: ["Ribossomo", "Mitocôndria", "Complexo golgiense", "Lisossomo"],
            correta: "B",
            explicacao: "A mitocôndria realiza a respiração celular aeróbica, gerando ATP a partir da glicose."
        },
        {
            enunciado: "A dengue, a zika e a chikungunya são doenças transmitidas no Brasil principalmente por qual vetor?",
            alternativas: ["Mosquito Anopheles", "Barbeiro", "Mosquito Aedes aegypti", "Caramujo"],
            correta: "C",
            explicacao: "O Aedes aegypti se reproduz em água parada; por isso eliminar criadouros é a principal forma de prevenção."
        },
        {
            enunciado: "Do cruzamento entre dois indivíduos heterozigotos (Aa × Aa), qual é a probabilidade de nascer um descendente recessivo (aa)?",
            alternativas: ["50%", "75%", "0%", "25%"],
            correta: "D",
            explicacao: "Os genótipos possíveis são AA, Aa, Aa e aa. Apenas 1 em 4 é aa = 25%."
        },
        {
            enunciado: "Na cadeia alimentar capim → gafanhoto → sapo → cobra, qual ser vivo ocupa a posição de consumidor secundário?",
            alternativas: ["Capim", "Gafanhoto", "Sapo", "Cobra"],
            correta: "C",
            explicacao: "Capim = produtor; gafanhoto = consumidor primário; sapo = consumidor secundário; cobra = consumidor terciário."
        },
        {
            enunciado: "As vacinas são uma das principais formas de prevenção de doenças. Como elas atuam no organismo?",
            alternativas: [
                "Fornecem anticorpos prontos para uso imediato.",
                "Estimulam o organismo a produzir anticorpos e células de memória.",
                "Matam as bactérias diretamente, como os antibióticos.",
                "Curam a doença depois que ela já se instalou."
            ],
            correta: "B",
            explicacao: "A vacina gera imunidade ativa: o corpo aprende a reconhecer o agente. Anticorpos prontos são característicos do soro."
        },
        {
            enunciado: "Nas células eucarióticas, onde fica armazenada a maior parte do material genético (DNA)?",
            alternativas: ["No núcleo", "Na membrana plasmática", "Na parede celular", "No vacúolo"],
            correta: "A",
            explicacao: "Nas células eucarióticas o DNA fica protegido dentro do núcleo, delimitado pela carioteca."
        },
        {
            enunciado: "O despejo de esgoto rico em nutrientes em um lago provoca a proliferação excessiva de algas, a queda do oxigênio dissolvido e a morte de peixes. Esse fenômeno é chamado de:",
            alternativas: ["Eutrofização", "Inversão térmica", "Chuva ácida", "Bioacumulação"],
            correta: "A",
            explicacao: "Na eutrofização, o excesso de nutrientes faz as algas crescerem; ao morrerem, sua decomposição consome o oxigênio da água."
        }
    ],

    "Geografia": [
        {
            enunciado: "O crescimento das cidades brasileiras ocorreu de forma acelerada a partir da segunda metade do século XX. Qual fator contribuiu diretamente para esse crescimento da urbanização?",
            alternativas: [
                "A diminuição das atividades industriais nas cidades.",
                "O aumento do êxodo rural em direção aos centros urbanos.",
                "A redução da oferta de empregos nas áreas urbanas.",
                "O crescimento da população que vive exclusivamente no campo."
            ],
            correta: "B",
            explicacao: "A mecanização do campo e a industrialização das cidades levaram milhões de pessoas do meio rural para o urbano."
        },
        {
            enunciado: "Fenômeno comum nas metrópoles durante o inverno, em que uma camada de ar mais quente fica sobre uma camada de ar frio, impedindo a dispersão dos poluentes:",
            alternativas: ["Inversão térmica", "Ilha de calor", "Efeito estufa", "El Niño"],
            correta: "A",
            explicacao: "Na inversão térmica o ar frio, mais denso, fica preso junto ao solo com os poluentes, piorando a qualidade do ar."
        },
        {
            enunciado: "Nos grandes centros urbanos, a temperatura costuma ser mais alta do que nas áreas periféricas e rurais, devido ao asfalto, ao concreto e à pouca vegetação. Esse fenômeno é chamado de:",
            alternativas: ["Chuva ácida", "La Niña", "Ilha de calor", "Inversão térmica"],
            correta: "C",
            explicacao: "Materiais urbanos absorvem e retêm calor, e a falta de vegetação reduz o resfriamento, formando a ilha de calor."
        },
        {
            enunciado: "Bioma do Brasil central caracterizado por árvores baixas e de troncos retorcidos, cascas grossas, raízes profundas e estações seca e chuvosa bem definidas:",
            alternativas: ["Caatinga", "Pampa", "Mata Atlântica", "Cerrado"],
            correta: "D",
            explicacao: "O Cerrado é uma savana tropical; suas raízes profundas permitem buscar água durante a estação seca."
        },
        {
            enunciado: "A Terra completa uma rotação (360°) em aproximadamente 24 horas. Por isso, cada fuso horário corresponde a quantos graus de longitude?",
            alternativas: ["1°", "10°", "15°", "24°"],
            correta: "C",
            explicacao: "360° ÷ 24 h = 15° por hora, ou seja, 15° por fuso."
        },
        {
            enunciado: "Qual é a principal fonte de geração de energia elétrica no Brasil?",
            alternativas: ["Nuclear", "Hidrelétrica", "Carvão mineral", "Petróleo"],
            correta: "B",
            explicacao: "Graças à grande quantidade de rios, a maior parte da eletricidade brasileira vem de usinas hidrelétricas."
        },
        {
            enunciado: "Processo de integração econômica, cultural e tecnológica entre os países, intensificado pelos avanços nos transportes e nas telecomunicações:",
            alternativas: ["Globalização", "Colonização", "Feudalismo", "Mercantilismo"],
            correta: "A",
            explicacao: "A globalização aproxima mercados e culturas, mas também pode aumentar desigualdades entre países."
        },
        {
            enunciado: "Qual é o principal objetivo do projeto de transposição do rio São Francisco?",
            alternativas: [
                "Gerar energia nuclear no Nordeste.",
                "Facilitar a exportação de minérios pelo rio.",
                "Drenar áreas alagadas da Amazônia.",
                "Levar água para regiões do semiárido nordestino."
            ],
            correta: "D",
            explicacao: "A transposição desvia parte das águas do rio para abastecer áreas do semiárido que sofrem com a seca."
        }
    ],

    "História": [
        {
            enunciado: "A Revolução Industrial, iniciada na Inglaterra no século XVIII, substituiu gradualmente a produção artesanal pela produção em máquinas. Qual foi uma das principais consequências desse processo?",
            alternativas: [
                "O fortalecimento do trabalho artesanal como principal forma de produção.",
                "A diminuição do crescimento das cidades industriais.",
                "O crescimento da produção em larga escala e do trabalho assalariado.",
                "O fim das desigualdades entre os trabalhadores."
            ],
            correta: "C",
            explicacao: "As fábricas passaram a produzir em grande escala com operários assalariados, acelerando também a urbanização."
        },
        {
            enunciado: "A Lei Áurea, assinada pela princesa Isabel em 1888, determinou:",
            alternativas: ["A independência do Brasil", "O fim da escravidão no Brasil", "A proclamação da República", "O direito de voto às mulheres"],
            correta: "B",
            explicacao: "A Lei Áurea aboliu a escravidão, mas sem políticas de inclusão dos libertos na sociedade."
        },
        {
            enunciado: "A Consolidação das Leis do Trabalho (CLT), que reuniu direitos como salário mínimo e férias, foi criada em 1943 durante o governo de:",
            alternativas: ["Getúlio Vargas", "Juscelino Kubitschek", "Dom Pedro II", "Fernando Collor"],
            correta: "A",
            explicacao: "A CLT faz parte da política trabalhista da Era Vargas (1930–1945)."
        },
        {
            enunciado: "O Ato Institucional nº 5 (AI-5), decretado em 1968 durante a ditadura militar, ficou marcado por:",
            alternativas: [
                "Ampliar a liberdade de imprensa.",
                "Convocar eleições diretas para presidente.",
                "Endurecer a repressão, permitindo fechar o Congresso e suspender garantias individuais.",
                "Extinguir as Forças Armadas."
            ],
            correta: "C",
            explicacao: "O AI-5 foi o ato mais duro do regime: censura, cassações e suspensão do habeas corpus para crimes políticos."
        },
        {
            enunciado: "A Constituição Federal de 1988 ficou conhecida como “Constituição Cidadã” porque:",
            alternativas: [
                "Restabeleceu a monarquia no Brasil.",
                "Proibiu os partidos de oposição.",
                "Instituiu o voto censitário, baseado na renda.",
                "Ampliou os direitos sociais e políticos após o fim da ditadura."
            ],
            correta: "D",
            explicacao: "Ela garantiu direitos como voto universal (inclusive analfabetos), saúde (SUS) e educação como direitos de todos."
        },
        {
            enunciado: "Qual era o lema da Revolução Francesa (1789)?",
            alternativas: ["“Liberdade, Igualdade, Fraternidade”", "“Ordem e Progresso”", "“Paz, Terra e Pão”", "“Deus, Pátria e Família”"],
            correta: "A",
            explicacao: "O lema expressava os ideais iluministas contra os privilégios da nobreza e do clero."
        },
        {
            enunciado: "A Guerra Fria (1947–1991) caracterizou-se principalmente por:",
            alternativas: [
                "Um conflito armado direto entre Brasil e Argentina.",
                "Uma disputa política, ideológica e militar entre EUA e URSS.",
                "Uma guerra religiosa na Europa medieval.",
                "A união de todos os países contra o nazismo."
            ],
            correta: "B",
            explicacao: "EUA (capitalismo) e URSS (socialismo) disputaram influência mundial, sem um confronto direto entre eles."
        },
        {
            enunciado: "Durante o período colonial, a produção de açúcar no Nordeste brasileiro baseou-se principalmente em:",
            alternativas: [
                "Pequenas propriedades com trabalho assalariado.",
                "Indústrias mecanizadas.",
                "Latifúndio, monocultura e trabalho de pessoas escravizadas.",
                "Cooperativas de imigrantes europeus."
            ],
            correta: "C",
            explicacao: "O sistema de plantation combinava grandes propriedades, um único produto para exportação e mão de obra escravizada."
        }
    ],

    "Filosofia": [
        {
            enunciado: "Uma pessoa encontra uma carteira com dinheiro e documentos na rua. Mesmo sem ninguém observando, ela decide procurar o dono para devolvê-la. Essa atitude está relacionada principalmente a qual conceito filosófico?",
            alternativas: [
                "Ética, por envolver uma reflexão sobre o que é correto fazer.",
                "Ceticismo, por questionar a existência da verdade.",
                "Estética, por analisar a beleza das ações.",
                "Empirismo, por valorizar o conhecimento adquirido pelos sentidos."
            ],
            correta: "A",
            explicacao: "A ética reflete sobre o agir correto e os valores que orientam nossas escolhas."
        },
        {
            enunciado: "A frase “Só sei que nada sei”, que expressa o reconhecimento da própria ignorância como ponto de partida do conhecimento, é atribuída a:",
            alternativas: ["Descartes", "Sócrates", "Karl Marx", "Nietzsche"],
            correta: "B",
            explicacao: "Sócrates usava o diálogo (maiêutica) para levar as pessoas a questionarem o que achavam que sabiam."
        },
        {
            enunciado: "“Penso, logo existo” é a ideia central do pensamento de René Descartes. Ela está associada a qual corrente filosófica?",
            alternativas: ["Empirismo", "Existencialismo", "Racionalismo", "Estoicismo"],
            correta: "C",
            explicacao: "Para o racionalismo, a razão é a principal fonte do conhecimento seguro."
        },
        {
            enunciado: "No Mito da Caverna, de Platão, as sombras vistas pelos prisioneiros na parede representam:",
            alternativas: [
                "O mundo das ideias.",
                "As aparências e opiniões, distantes do conhecimento verdadeiro.",
                "A felicidade plena.",
                "O poder político dos reis."
            ],
            correta: "B",
            explicacao: "Sair da caverna simboliza o caminho da filosofia: das aparências (sombras) ao conhecimento verdadeiro."
        },
        {
            enunciado: "Para Thomas Hobbes, no estado de natureza há uma “guerra de todos contra todos”. Para garantir a paz, os indivíduos firmam um contrato e entregam o poder a:",
            alternativas: ["A Igreja", "Uma assembleia de filósofos", "Ninguém, vivendo em anarquia", "Um Estado soberano forte (o Leviatã)"],
            correta: "D",
            explicacao: "Hobbes é contratualista: abrimos mão de parte da liberdade em troca de segurança garantida pelo Estado."
        },
        {
            enunciado: "“Age de tal modo que a máxima da tua ação possa se tornar uma lei universal.” Esse princípio, chamado imperativo categórico, foi formulado por:",
            alternativas: ["Aristóteles", "Immanuel Kant", "Maquiavel", "Rousseau"],
            correta: "B",
            explicacao: "Para Kant, uma ação é moral quando feita por dever e poderia valer para todas as pessoas."
        },
        {
            enunciado: "Para Aristóteles, a virtude ética consiste em:",
            alternativas: [
                "Buscar o máximo de prazer possível.",
                "Obedecer cegamente às leis.",
                "Encontrar o meio-termo entre dois extremos (o excesso e a falta).",
                "Acumular riquezas."
            ],
            correta: "C",
            explicacao: "Exemplo: a coragem é o meio-termo entre a covardia (falta) e a imprudência (excesso)."
        },
        {
            enunciado: "Para o existencialista Jean-Paul Sartre, a frase “a existência precede a essência” significa que:",
            alternativas: [
                "O ser humano primeiro existe e depois se define pelas próprias escolhas.",
                "O ser humano já nasce com um destino definido.",
                "Somente Deus pode definir a essência humana.",
                "A natureza determina todas as nossas ações."
            ],
            correta: "A",
            explicacao: "Para Sartre, somos “condenados a ser livres”: construímos quem somos e somos responsáveis por isso."
        }
    ]
};
