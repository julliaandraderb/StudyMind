// ===============================================
// TÓPICOS EXTRAS DAS MATÉRIAS
// Acrescenta novos guias às matérias criadas em materias.js e materias-humanas.js.
// Cada bloco abaixo diz o id da matéria e a lista de tópicos novos dela.
// O formato de cada tópico é o mesmo explicado no topo de materias.js.
// ===============================================

const topicosExtras = {
    // =========================================================
    // FÍSICA
    // =========================================================
    fisica: [
        {
            id: "cinematica",
            titulo: "Cinemática",
            subtitulo: "Velocidade, aceleração, MRU, MRUV e queda livre: como descrever o movimento dos corpos sem se preocupar com as causas.",
            calculo: true,
            formulas: ["v = Δs/Δt", "s = s₀ + v · t", "v = v₀ + a · t", "s = s₀ + v₀t + at²/2", "v² = v₀² + 2aΔs"],
            secoes: [
                {
                    titulo: "Conceitos e velocidade média",
                    resumo: "A cinemática descreve onde um corpo está, quão rápido se move e como sua velocidade muda.",
                    conceito: [
                        "Para descrever um movimento, primeiro escolhemos um <strong>referencial</strong>: um passageiro sentado no ônibus está em repouso em relação ao ônibus, mas em movimento em relação à rua.",
                        "A <strong>velocidade média</strong> é a distância percorrida dividida pelo tempo gasto: v = Δs/Δt. No Sistema Internacional ela é medida em m/s, mas no dia a dia usamos km/h."
                    ],
                    cards: [
                        { titulo: "Referencial", texto: "Corpo ou ponto em relação ao qual o movimento é observado. Movimento e repouso sempre dependem do referencial." },
                        { titulo: "Deslocamento (Δs)", texto: "Variação da posição: Δs = s − s₀. Pode ser diferente da distância total percorrida em um trajeto de ida e volta." },
                        { titulo: "Velocidade média", texto: "v = Δs/Δt. Um carro que anda 120 km em 2 h teve velocidade média de 60 km/h, mesmo que tenha parado no caminho." },
                        { titulo: "km/h ↔ m/s", texto: "De km/h para m/s, divida por 3,6. De m/s para km/h, multiplique por 3,6. Ex.: 72 km/h = 20 m/s." }
                    ],
                    exemplo: {
                        titulo: "Viagem com parada",
                        enunciado: "Um ônibus percorre 180 km em 2 h, para 30 min e depois percorre mais 120 km em 1,5 h. Qual a velocidade média na viagem toda?",
                        passos: [
                            "Distância total: 180 + 120 = 300 km.",
                            "Tempo total, contando a parada: 2 + 0,5 + 1,5 = 4 h.",
                            "v = Δs/Δt = 300/4."
                        ],
                        resultado: "75 km/h."
                    },
                    atencao: "Velocidade média não é a média das velocidades. Sempre divida a distância total pelo tempo total, incluindo as paradas."
                },
                {
                    titulo: "MRU e MRUV",
                    resumo: "No MRU a velocidade é constante; no MRUV a velocidade muda sempre no mesmo ritmo.",
                    conceito: [
                        "No <strong>movimento retilíneo uniforme (MRU)</strong> o corpo percorre distâncias iguais em tempos iguais. A posição segue a função s = s₀ + v · t.",
                        "No <strong>movimento retilíneo uniformemente variado (MRUV)</strong> existe uma aceleração constante, que é a variação da velocidade por unidade de tempo: a = Δv/Δt, medida em m/s²."
                    ],
                    cards: [
                        { titulo: "Função horária (MRU)", texto: "s = s₀ + v · t. Velocidade constante e aceleração nula." },
                        { titulo: "Velocidade (MRUV)", texto: "v = v₀ + a · t. Uma aceleração de 2 m/s² aumenta a velocidade em 2 m/s a cada segundo." },
                        { titulo: "Posição (MRUV)", texto: "s = s₀ + v₀ · t + a · t²/2. A posição varia com o quadrado do tempo." },
                        { titulo: "Torricelli", texto: "v² = v₀² + 2 · a · Δs. Use quando o problema não fornece o tempo." }
                    ],
                    exemplo: {
                        titulo: "Carro partindo do repouso",
                        enunciado: "Um carro parte do repouso com aceleração constante de 2 m/s². Qual a velocidade e a distância percorrida após 5 s?",
                        passos: [
                            "Velocidade: v = v₀ + a · t = 0 + 2 · 5 = 10 m/s.",
                            "Distância: Δs = v₀ · t + a · t²/2 = 0 + 2 · 25/2 = 25 m.",
                            "Conferindo com Torricelli: v² = 0 + 2 · 2 · 25 = 100 → v = 10 m/s."
                        ],
                        resultado: "10 m/s (36 km/h) e 25 m."
                    },
                    atencao: "Aceleração negativa nem sempre significa frear. O movimento é retardado quando a velocidade e a aceleração têm sinais opostos."
                },
                {
                    titulo: "Queda livre e gráficos",
                    resumo: "Sem resistência do ar, todos os corpos caem com a mesma aceleração, a da gravidade.",
                    conceito: [
                        "Na <strong>queda livre</strong>, desprezando a resistência do ar, um corpo cai em MRUV com aceleração g ≈ 10 m/s², não importa sua massa. Uma pena e um martelo caem juntos no vácuo.",
                        "Os <strong>gráficos</strong> aparecem muito em provas. No gráfico v × t, a inclinação da reta é a aceleração e a área sob a curva é o deslocamento."
                    ],
                    cards: [
                        { titulo: "Velocidade na queda", texto: "v = g · t. Após 3 s de queda, v = 10 · 3 = 30 m/s." },
                        { titulo: "Altura da queda", texto: "h = g · t²/2. Em 3 s o corpo cai 10 · 9/2 = 45 m." },
                        { titulo: "Gráfico s × t", texto: "Reta no MRU (inclinação = velocidade). Parábola no MRUV." },
                        { titulo: "Gráfico v × t", texto: "Reta horizontal no MRU. Reta inclinada no MRUV. Área sob o gráfico = deslocamento." }
                    ],
                    exemplo: {
                        titulo: "Pedra solta de um prédio",
                        enunciado: "Uma pedra é solta do alto de um prédio e leva 2 s para chegar ao chão. Qual a altura do prédio e a velocidade da pedra ao tocar o solo? (g = 10 m/s²)",
                        passos: [
                            "Altura: h = g · t²/2 = 10 · 4/2 = 20 m.",
                            "Velocidade: v = g · t = 10 · 2 = 20 m/s.",
                            "Em km/h: 20 · 3,6 = 72 km/h."
                        ],
                        resultado: "20 m de altura e 20 m/s ao chegar ao chão."
                    },
                    atencao: "A massa não muda o tempo de queda livre. Se o enunciado não fala em resistência do ar, corpos leves e pesados chegam juntos."
                }
            ]
        },
        {
            id: "ondulatoria",
            titulo: "Ondulatória",
            subtitulo: "Tipos de onda, a equação v = λ · f e os fenômenos ondulatórios: reflexão, refração, difração, interferência e ressonância.",
            calculo: true,
            formulas: ["v = λ · f", "f = 1/T", "Som no ar ≈ 340 m/s", "Luz ≈ 3 × 10⁸ m/s"],
            secoes: [
                {
                    titulo: "O que é uma onda",
                    resumo: "Uma onda é uma perturbação que se propaga transportando energia, sem transportar matéria.",
                    conceito: [
                        "Quando uma pedra cai num lago, a água sobe e desce no mesmo lugar, mas a perturbação viaja até a margem. Isso mostra a ideia central: <strong>a onda transporta energia, não matéria</strong>.",
                        "As ondas são classificadas pela <strong>natureza</strong> (mecânicas precisam de um meio; eletromagnéticas se propagam até no vácuo) e pela <strong>direção de vibração</strong> (transversais ou longitudinais)."
                    ],
                    cards: [
                        { titulo: "Ondas mecânicas", texto: "Precisam de um meio material para se propagar. Ex.: som, ondas na água, ondas numa corda. O som não se propaga no vácuo." },
                        { titulo: "Ondas eletromagnéticas", texto: "Propagam-se no vácuo a cerca de 3 × 10⁸ m/s. Ex.: luz, rádio, micro-ondas, raios X." },
                        { titulo: "Transversais", texto: "A vibração é perpendicular à propagação. Ex.: ondas numa corda e todas as eletromagnéticas." },
                        { titulo: "Longitudinais", texto: "A vibração acontece na mesma direção da propagação. Ex.: o som no ar, feito de compressões e rarefações." }
                    ],
                    exemplo: {
                        titulo: "Explosão no espaço",
                        enunciado: "Em filmes, explosões no espaço aparecem com um estrondo enorme. Isso é fisicamente correto?",
                        passos: [
                            "O som é uma onda mecânica.",
                            "Ondas mecânicas precisam de um meio material para se propagar.",
                            "No espaço praticamente não há matéria (vácuo). A luz da explosão chegaria, mas o som não."
                        ],
                        resultado: "Não. Veríamos o clarão, mas não ouviríamos nada."
                    },
                    atencao: "Luz e som são ondas de naturezas diferentes. A luz é eletromagnética e transversal; o som é mecânico e, no ar, longitudinal."
                },
                {
                    titulo: "Equação fundamental",
                    resumo: "Velocidade, comprimento de onda e frequência estão ligados por v = λ · f.",
                    conceito: [
                        "O <strong>comprimento de onda (λ)</strong> é a distância entre duas cristas seguidas. A <strong>frequência (f)</strong> é o número de oscilações por segundo, medida em hertz (Hz). O <strong>período (T)</strong> é o tempo de uma oscilação completa: T = 1/f.",
                        "A onda anda um comprimento de onda a cada período, então v = λ/T = <strong>λ · f</strong>. Em um mesmo meio, a velocidade é fixa: se a frequência aumenta, o comprimento de onda diminui."
                    ],
                    cards: [
                        { titulo: "Amplitude", texto: "Altura da crista em relação ao equilíbrio. Está ligada à energia da onda: no som, define o volume (intensidade)." },
                        { titulo: "Frequência", texto: "No som, define se ele é grave (baixa frequência) ou agudo (alta frequência). Não muda quando a onda troca de meio." },
                        { titulo: "Velocidade", texto: "Depende do meio. O som é mais rápido em sólidos e líquidos do que no ar." },
                        { titulo: "Espectro eletromagnético", texto: "Rádio → micro-ondas → infravermelho → luz visível → ultravioleta → raios X → raios gama. A frequência e a energia aumentam nessa ordem." }
                    ],
                    exemplo: {
                        titulo: "Rádio FM",
                        enunciado: "Uma rádio FM transmite na frequência de 100 MHz. Qual o comprimento de onda dessa transmissão? (v = 3 × 10⁸ m/s)",
                        passos: [
                            "100 MHz = 100 × 10⁶ Hz = 10⁸ Hz.",
                            "λ = v/f = 3 × 10⁸ / 10⁸.",
                            "λ = 3 m."
                        ],
                        resultado: "3 metros."
                    },
                    atencao: "Quando a onda muda de meio, a frequência continua igual. Quem muda são a velocidade e o comprimento de onda."
                },
                {
                    titulo: "Fenômenos ondulatórios",
                    resumo: "Reflexão, refração, difração, interferência e ressonância explicam muitas situações do cotidiano.",
                    conceito: [
                        "Quando uma onda encontra um obstáculo ou muda de meio, ela pode voltar (<strong>reflexão</strong>), mudar de velocidade e direção (<strong>refração</strong>) ou contornar o obstáculo (<strong>difração</strong>).",
                        "Quando duas ondas se encontram, elas se somam (<strong>interferência</strong>). E quando um corpo é estimulado na sua frequência natural, ele vibra com amplitude máxima (<strong>ressonância</strong>)."
                    ],
                    cards: [
                        { titulo: "Reflexão", texto: "A onda volta ao meio de origem. Ex.: eco, espelhos, sonar e ultrassom." },
                        { titulo: "Refração", texto: "A onda muda de meio e de velocidade. Ex.: o canudo que parece quebrado dentro do copo d'água." },
                        { titulo: "Difração", texto: "A onda contorna obstáculos. Por isso ouvimos alguém falando atrás de um muro, mesmo sem vê-lo." },
                        { titulo: "Ressonância", texto: "Vibração forçada na frequência natural do corpo. Ex.: a taça que quebra com o som de uma cantora e o forno de micro-ondas." }
                    ],
                    exemplo: {
                        titulo: "Identificando o fenômeno",
                        enunciado: "Uma pessoa ouve a música de uma festa que acontece do outro lado de um muro alto, mesmo sem ver a festa. Que fenômeno explica isso?",
                        passos: [
                            "O som não atravessa o muro de forma relevante, então não é refração.",
                            "Ele também não está voltando para a festa, então não é reflexão.",
                            "O som contorna a borda do muro, porque seu comprimento de onda é grande, comparável ao tamanho do obstáculo."
                        ],
                        resultado: "Difração."
                    },
                    atencao: "Efeito Doppler: a frequência percebida aumenta quando a fonte se aproxima e diminui quando se afasta, como na sirene da ambulância."
                }
            ]
        }
    ],

    // =========================================================
    // MATEMÁTICA
    // =========================================================
    matematica: [
        {
            id: "geometria-plana",
            titulo: "Geometria plana",
            subtitulo: "Áreas das principais figuras, Teorema de Pitágoras e escala: a geometria que mais aparece em problemas do cotidiano.",
            calculo: true,
            formulas: ["A▭ = b · h", "A△ = b · h/2", "A○ = π · r²", "a² = b² + c²", "escala = desenho/real"],
            secoes: [
                {
                    titulo: "Áreas das figuras",
                    resumo: "A área mede quanto espaço uma figura ocupa no plano, em unidades ao quadrado (m², cm²).",
                    conceito: [
                        "Muitas questões pedem a área de terrenos, pisos, paredes ou embalagens. O segredo é <strong>dividir figuras complicadas em figuras simples</strong> (retângulos, triângulos e círculos) e somar as áreas.",
                        "Cuidado com as unidades: 1 m² = 10 000 cm², porque 1 m = 100 cm e a área usa o quadrado da medida."
                    ],
                    cards: [
                        { titulo: "Retângulo e quadrado", texto: "A = base · altura. No quadrado de lado ℓ, A = ℓ²." },
                        { titulo: "Triângulo", texto: "A = base · altura / 2. A altura é sempre perpendicular à base." },
                        { titulo: "Trapézio", texto: "A = (B + b) · h / 2, em que B é a base maior e b a menor." },
                        { titulo: "Círculo", texto: "A = π · r² e comprimento C = 2 · π · r. Use π ≈ 3,14 ou 3, conforme o enunciado." }
                    ],
                    exemplo: {
                        titulo: "Piso de uma sala",
                        enunciado: "Uma sala retangular mede 5 m por 4 m. Quantas caixas de piso são necessárias, se cada caixa cobre 2,5 m²?",
                        passos: [
                            "Área da sala: 5 · 4 = 20 m².",
                            "Número de caixas: 20 / 2,5 = 8.",
                            "Como o resultado é exato, 8 caixas bastam."
                        ],
                        resultado: "8 caixas."
                    },
                    atencao: "Se o resultado der quebrado (ex.: 8,2 caixas), arredonde para cima: não dá para comprar parte de uma caixa."
                },
                {
                    titulo: "Teorema de Pitágoras",
                    resumo: "Em todo triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.",
                    conceito: [
                        "O <strong>triângulo retângulo</strong> tem um ângulo de 90°. O lado oposto a esse ângulo é a <strong>hipotenusa</strong> (o maior lado) e os outros dois são os <strong>catetos</strong>.",
                        "O Teorema de Pitágoras diz que <strong>a² = b² + c²</strong>. Ele aparece em escadas apoiadas em paredes, diagonais de telas e terrenos, rampas e distâncias no mapa."
                    ],
                    cards: [
                        { titulo: "Hipotenusa", texto: "Fica sempre de frente para o ângulo reto e é o maior lado do triângulo." },
                        { titulo: "Trio 3, 4, 5", texto: "3² + 4² = 9 + 16 = 25 = 5². Os múltiplos também valem: 6, 8, 10 e 9, 12, 15." },
                        { titulo: "Diagonal do quadrado", texto: "d = ℓ · √2. Num quadrado de lado 10, a diagonal mede cerca de 14,1." },
                        { titulo: "Diagonal da tela", texto: "Uma TV de 50 polegadas tem 50\" na diagonal, não na largura." }
                    ],
                    exemplo: {
                        titulo: "Escada na parede",
                        enunciado: "Uma escada de 5 m está apoiada numa parede, com o pé a 3 m da base da parede. A que altura ela toca a parede?",
                        passos: [
                            "A escada é a hipotenusa (5 m) e a distância até a parede é um cateto (3 m).",
                            "5² = 3² + h² → 25 = 9 + h².",
                            "h² = 16 → h = 4 m."
                        ],
                        resultado: "4 metros."
                    },
                    atencao: "Pitágoras só vale para triângulos retângulos. Confira se há um ângulo de 90° antes de aplicar a fórmula."
                },
                {
                    titulo: "Escala e semelhança",
                    resumo: "A escala relaciona a medida no desenho com a medida real; figuras semelhantes têm a mesma forma e tamanhos proporcionais.",
                    conceito: [
                        "Uma <strong>escala 1:500</strong> significa que 1 cm no desenho corresponde a 500 cm (5 m) na realidade. É muito usada em mapas, plantas de casas e maquetes.",
                        "Em figuras <strong>semelhantes</strong>, se os comprimentos são multiplicados por k, as áreas ficam multiplicadas por k² e os volumes por k³."
                    ],
                    cards: [
                        { titulo: "Escala", texto: "E = medida no desenho / medida real, com as duas na mesma unidade." },
                        { titulo: "Escala grande × pequena", texto: "1:100 é uma escala maior que 1:10 000: mostra menos área, com mais detalhes." },
                        { titulo: "Razão de áreas", texto: "Se os lados dobram (k = 2), a área fica 4 vezes maior (k² = 4)." },
                        { titulo: "Razão de volumes", texto: "Se os lados dobram, o volume fica 8 vezes maior (k³ = 8)." }
                    ],
                    exemplo: {
                        titulo: "Planta de uma casa",
                        enunciado: "Na planta de uma casa, na escala 1:50, um quarto mede 8 cm por 6 cm. Qual a área real do quarto?",
                        passos: [
                            "Medidas reais: 8 · 50 = 400 cm = 4 m e 6 · 50 = 300 cm = 3 m.",
                            "Área real: 4 · 3 = 12 m².",
                            "Outra forma: área no papel (48 cm²) · 50² = 120 000 cm² = 12 m²."
                        ],
                        resultado: "12 m²."
                    },
                    atencao: "Não multiplique a área do desenho só pela escala. A área real é a área do desenho multiplicada pelo quadrado da escala."
                }
            ]
        },
        {
            id: "estatistica",
            titulo: "Estatística",
            subtitulo: "Média, média ponderada, mediana, moda e dispersão: como resumir e interpretar dados de tabelas e gráficos.",
            calculo: true,
            formulas: ["média = soma/quantidade", "ponderada = Σ(valor · peso)/Σpesos", "mediana = valor central", "moda = mais frequente"],
            secoes: [
                {
                    titulo: "Média aritmética e ponderada",
                    resumo: "A média distribui igualmente o total entre todos os valores.",
                    conceito: [
                        "A <strong>média aritmética</strong> é a soma de todos os valores dividida pela quantidade de valores. Ela é muito usada, mas é sensível a valores extremos: um salário muito alto puxa a média para cima.",
                        "Na <strong>média ponderada</strong>, cada valor tem um peso. É assim que muitas escolas calculam a nota final e como muitos vestibulares calculam a nota, com pesos diferentes por área."
                    ],
                    cards: [
                        { titulo: "Média simples", texto: "Notas 6, 7 e 8: média = (6 + 7 + 8)/3 = 7." },
                        { titulo: "Média ponderada", texto: "Multiplique cada valor pelo peso, some tudo e divida pela soma dos pesos." },
                        { titulo: "Valores extremos", texto: "Dados 2, 3, 3, 4 e 38: a média é 10, mas quase todos os valores são pequenos." },
                        { titulo: "Nota necessária", texto: "Para descobrir a nota que falta, use: soma necessária = média desejada · quantidade." }
                    ],
                    exemplo: {
                        titulo: "Nota com pesos",
                        enunciado: "Um aluno tirou 6 na prova de peso 2 e 8 na prova de peso 3. Qual a média final?",
                        passos: [
                            "Valores vezes pesos: 6 · 2 = 12 e 8 · 3 = 24.",
                            "Soma: 12 + 24 = 36. Soma dos pesos: 2 + 3 = 5.",
                            "Média = 36/5."
                        ],
                        resultado: "7,2."
                    },
                    atencao: "Na média ponderada, divida pela soma dos pesos, e não pela quantidade de notas."
                },
                {
                    titulo: "Mediana e moda",
                    resumo: "A mediana é o valor do meio dos dados ordenados; a moda é o valor que mais se repete.",
                    conceito: [
                        "Para achar a <strong>mediana</strong>, coloque os dados em ordem crescente. Se a quantidade for ímpar, ela é o valor central; se for par, é a média dos dois valores centrais.",
                        "A <strong>moda</strong> é o valor mais frequente. Um conjunto pode ter uma moda, várias modas ou nenhuma. A mediana e a moda não são afetadas por valores extremos, como acontece com a média."
                    ],
                    cards: [
                        { titulo: "Quantidade ímpar", texto: "2, 5, 7, 9, 12 → mediana = 7 (o 3º valor)." },
                        { titulo: "Quantidade par", texto: "3, 5, 7, 8, 10, 12 → mediana = (7 + 8)/2 = 7,5." },
                        { titulo: "Moda", texto: "1, 2, 2, 3, 2, 4 → moda = 2. Se dois valores empatam, o conjunto é bimodal." },
                        { titulo: "Qual usar?", texto: "Com valores muito discrepantes (como salários), a mediana representa melhor o \"valor típico\" que a média." }
                    ],
                    exemplo: {
                        titulo: "Tempos de corrida",
                        enunciado: "Os tempos (em minutos) de 6 corredores foram: 12, 15, 11, 15, 20, 13. Determine a média, a mediana e a moda.",
                        passos: [
                            "Ordenando: 11, 12, 13, 15, 15, 20.",
                            "Média: (11 + 12 + 13 + 15 + 15 + 20)/6 = 86/6 ≈ 14,3.",
                            "Mediana: (13 + 15)/2 = 14. Moda: 15, que aparece duas vezes."
                        ],
                        resultado: "Média ≈ 14,3 min, mediana = 14 min e moda = 15 min."
                    },
                    atencao: "O erro mais comum é calcular a mediana sem ordenar os dados primeiro."
                },
                {
                    titulo: "Dispersão dos dados",
                    resumo: "Medidas de dispersão mostram se os dados estão próximos ou espalhados em torno da média.",
                    conceito: [
                        "Dois grupos podem ter a mesma média e comportamentos bem diferentes. As notas 5, 5 e 5 e as notas 0, 5 e 10 têm média 5, mas o segundo grupo é muito mais espalhado.",
                        "A <strong>amplitude</strong> é a diferença entre o maior e o menor valor. O <strong>desvio padrão</strong> mede quanto, em média, os valores se afastam da média: quanto menor, mais <strong>regular</strong> ou homogêneo é o conjunto."
                    ],
                    cards: [
                        { titulo: "Amplitude", texto: "Maior valor − menor valor. Em 0, 5, 10 a amplitude é 10." },
                        { titulo: "Variância", texto: "Média dos quadrados das diferenças entre cada valor e a média." },
                        { titulo: "Desvio padrão", texto: "Raiz quadrada da variância. Fica na mesma unidade dos dados." },
                        { titulo: "Regularidade", texto: "Em provas, \"o mais regular\" é quem tem o menor desvio padrão." }
                    ],
                    exemplo: {
                        titulo: "Atleta mais regular",
                        enunciado: "Dois atletas têm a mesma média de pontos. O atleta A tem desvio padrão 1,2 e o atleta B tem desvio padrão 3,5. Qual é o mais regular?",
                        passos: [
                            "As médias são iguais, então elas não decidem a questão.",
                            "Desvio padrão menor significa pontuações mais próximas da média.",
                            "1,2 < 3,5."
                        ],
                        resultado: "O atleta A é o mais regular."
                    },
                    atencao: "As questões costumam dar os desvios já calculados. Na maioria das vezes basta comparar qual é o menor."
                }
            ]
        }
    ],

    // =========================================================
    // QUÍMICA
    // =========================================================
    quimica: [
        {
            id: "solucoes",
            titulo: "Soluções",
            subtitulo: "Soluto, solvente, solubilidade, concentração comum, concentração molar e diluição: a química das misturas do dia a dia.",
            calculo: true,
            formulas: ["C = m/V (g/L)", "M = n/V (mol/L)", "n = m/MM", "C₁ · V₁ = C₂ · V₂"],
            secoes: [
                {
                    titulo: "Soluto, solvente e solubilidade",
                    resumo: "Solução é uma mistura homogênea formada por um soluto dissolvido em um solvente.",
                    conceito: [
                        "Na água com açúcar, o açúcar é o <strong>soluto</strong> (o que é dissolvido) e a água é o <strong>solvente</strong> (o que dissolve). A água é chamada de solvente universal porque dissolve muitas substâncias.",
                        "O <strong>coeficiente de solubilidade</strong> é a quantidade máxima de soluto que se dissolve em uma quantidade de solvente, a uma temperatura. Para a maioria dos sólidos, ele aumenta com a temperatura; para os gases, diminui."
                    ],
                    cards: [
                        { titulo: "Insaturada", texto: "Tem menos soluto do que o máximo possível. Ainda dá para dissolver mais." },
                        { titulo: "Saturada", texto: "Tem exatamente o máximo de soluto dissolvido. O excesso fica no fundo (corpo de fundo)." },
                        { titulo: "Supersaturada", texto: "Tem mais soluto dissolvido que o máximo. É instável: qualquer agitação faz o excesso precipitar." },
                        { titulo: "Gases", texto: "Gases se dissolvem melhor em líquidos frios e sob pressão. Por isso o refrigerante quente perde gás mais rápido." }
                    ],
                    exemplo: {
                        titulo: "Peixes e água quente",
                        enunciado: "Indústrias que despejam água quente em rios podem causar a morte de peixes, mesmo sem poluentes químicos. Por quê?",
                        passos: [
                            "Os peixes respiram o gás oxigênio dissolvido na água.",
                            "A solubilidade dos gases diminui quando a temperatura aumenta.",
                            "Água mais quente dissolve menos oxigênio, e os peixes ficam sem o suficiente para respirar."
                        ],
                        resultado: "A água aquecida tem menos oxigênio dissolvido (poluição térmica)."
                    },
                    atencao: "Cuidado com a regra da temperatura: sólidos costumam ficar mais solúveis no calor, mas gases ficam menos solúveis."
                },
                {
                    titulo: "Concentração comum e molar",
                    resumo: "A concentração indica quanto soluto existe em determinado volume de solução.",
                    conceito: [
                        "A <strong>concentração comum (C)</strong> é a massa de soluto dividida pelo volume da solução: C = m/V, normalmente em g/L.",
                        "A <strong>concentração molar (M)</strong>, ou molaridade, usa a quantidade de matéria: M = n/V, em mol/L. Para achar n, divida a massa pela massa molar: n = m/MM."
                    ],
                    cards: [
                        { titulo: "Concentração comum", texto: "C = m/V. 20 g de sal em 0,5 L de solução → C = 40 g/L." },
                        { titulo: "Molaridade", texto: "M = n/V. 0,5 mol em 0,25 L → M = 2 mol/L." },
                        { titulo: "Porcentagem e ppm", texto: "Título em massa = massa de soluto / massa da solução. 1 ppm = 1 parte em 1 milhão (1 mg/kg)." },
                        { titulo: "Unidades", texto: "Converta mL em L antes de calcular: 250 mL = 0,25 L." }
                    ],
                    exemplo: {
                        titulo: "Soro caseiro",
                        enunciado: "Uma solução foi preparada com 5,85 g de NaCl (massa molar 58,5 g/mol) em água, formando 500 mL. Qual a concentração comum e a molar?",
                        passos: [
                            "Concentração comum: C = 5,85 g / 0,5 L = 11,7 g/L.",
                            "Quantidade de matéria: n = 5,85/58,5 = 0,1 mol.",
                            "Molaridade: M = 0,1 mol / 0,5 L = 0,2 mol/L."
                        ],
                        resultado: "C = 11,7 g/L e M = 0,2 mol/L."
                    },
                    atencao: "O volume da fórmula é o da solução inteira, e não só o do solvente."
                },
                {
                    titulo: "Diluição",
                    resumo: "Diluir é acrescentar solvente: a quantidade de soluto continua a mesma, mas a concentração diminui.",
                    conceito: [
                        "Quando colocamos água num suco concentrado, a quantidade de soluto não muda, só o volume aumenta. Por isso a concentração diminui.",
                        "Como a massa (ou o número de mols) de soluto se mantém, vale a relação <strong>C₁ · V₁ = C₂ · V₂</strong>, que também funciona com a molaridade."
                    ],
                    cards: [
                        { titulo: "O que se conserva", texto: "A quantidade de soluto. Muda apenas o volume da solução." },
                        { titulo: "Fórmula", texto: "C₁ · V₁ = C₂ · V₂, ou M₁ · V₁ = M₂ · V₂." },
                        { titulo: "Volume adicionado", texto: "Água acrescentada = V₂ − V₁. Muitas questões pedem esse valor, e não o volume final." },
                        { titulo: "Concentrar", texto: "Evaporar solvente faz o caminho inverso: o volume diminui e a concentração aumenta." }
                    ],
                    exemplo: {
                        titulo: "Diluindo um produto de limpeza",
                        enunciado: "Temos 100 mL de uma solução 2 mol/L. Que volume de água devemos acrescentar para que a concentração passe a 0,5 mol/L?",
                        passos: [
                            "M₁ · V₁ = M₂ · V₂ → 2 · 100 = 0,5 · V₂.",
                            "V₂ = 200/0,5 = 400 mL.",
                            "Água acrescentada: 400 − 100 = 300 mL."
                        ],
                        resultado: "300 mL de água."
                    },
                    atencao: "Leia com atenção se a questão pede o volume final da solução ou o volume de água que foi acrescentado."
                }
            ]
        },
        {
            id: "funcoes-organicas",
            titulo: "Funções orgânicas",
            subtitulo: "O carbono, as cadeias carbônicas, a nomenclatura básica e como reconhecer álcoois, ácidos, ésteres, aminas e outras funções.",
            formulas: ["met · et · prop · but · pent", "an · en · in", "-ol · -al · -ona · -oico", "C faz 4 ligações"],
            secoes: [
                {
                    titulo: "O carbono e as cadeias",
                    resumo: "A química orgânica estuda os compostos do carbono, que formam a base da vida e de muitos materiais.",
                    conceito: [
                        "O carbono é <strong>tetravalente</strong>: faz sempre 4 ligações. Ele consegue se ligar a outros carbonos formando <strong>cadeias</strong> longas, ramificadas ou fechadas em anéis, o que explica a enorme variedade de compostos orgânicos.",
                        "As cadeias podem ser classificadas como abertas ou fechadas, normais ou ramificadas, saturadas (só ligações simples entre carbonos) ou insaturadas (com ligações duplas ou triplas)."
                    ],
                    cards: [
                        { titulo: "Tetravalência", texto: "O carbono faz 4 ligações, que podem ser simples, duplas ou triplas." },
                        { titulo: "Saturada", texto: "Apenas ligações simples entre carbonos. Ex.: etano (CH₃–CH₃)." },
                        { titulo: "Insaturada", texto: "Tem ao menos uma ligação dupla ou tripla entre carbonos. Ex.: eteno (CH₂=CH₂)." },
                        { titulo: "Aromática", texto: "Tem o anel benzênico: seis carbonos com ligações simples e duplas alternadas." }
                    ],
                    exemplo: {
                        titulo: "Contando hidrogênios",
                        enunciado: "Em uma cadeia de 3 carbonos só com ligações simples (propano), quantos hidrogênios existem?",
                        passos: [
                            "Os carbonos das pontas se ligam a 1 carbono, então completam as 4 ligações com 3 hidrogênios cada.",
                            "O carbono do meio se liga a 2 carbonos e completa com 2 hidrogênios.",
                            "Total: 3 + 2 + 3 = 8 hidrogênios (C₃H₈)."
                        ],
                        resultado: "8 hidrogênios: C₃H₈."
                    },
                    atencao: "Quando faltar hidrogênio numa fórmula estrutural simplificada, complete cada carbono até ele ter 4 ligações."
                },
                {
                    titulo: "Nomenclatura básica",
                    resumo: "O nome de um composto orgânico é montado com prefixo + infixo + sufixo.",
                    conceito: [
                        "O <strong>prefixo</strong> indica o número de carbonos da cadeia principal: met (1), et (2), prop (3), but (4), pent (5), hex (6).",
                        "O <strong>infixo</strong> indica o tipo de ligação: an (só simples), en (uma dupla) e in (uma tripla). O <strong>sufixo</strong> indica a função: -o (hidrocarboneto), -ol (álcool), -al (aldeído), -ona (cetona) e -oico (ácido carboxílico)."
                    ],
                    cards: [
                        { titulo: "Metano", texto: "met + an + o: 1 carbono, ligações simples, hidrocarboneto. CH₄, o gás natural." },
                        { titulo: "Etanol", texto: "et + an + ol: 2 carbonos, ligações simples, álcool. O álcool combustível e das bebidas." },
                        { titulo: "Propanona", texto: "prop + an + ona: 3 carbonos, cetona. É a acetona do removedor de esmalte." },
                        { titulo: "Ácido etanoico", texto: "et + an + oico: ácido de 2 carbonos. É o ácido acético do vinagre." }
                    ],
                    exemplo: {
                        titulo: "Dando nome ao composto",
                        enunciado: "Qual o nome do composto CH₂=CH–CH₂–CH₃?",
                        passos: [
                            "A cadeia tem 4 carbonos → prefixo but.",
                            "Há uma ligação dupla → infixo en.",
                            "É um hidrocarboneto → sufixo o. A dupla começa no carbono 1."
                        ],
                        resultado: "But-1-eno (1-buteno)."
                    },
                    atencao: "A numeração da cadeia começa pela ponta mais próxima do grupo funcional ou da insaturação."
                },
                {
                    titulo: "Principais funções",
                    resumo: "Cada função orgânica tem um grupo de átomos característico, chamado grupo funcional.",
                    conceito: [
                        "Reconhecer as funções é uma das habilidades mais cobradas em provas. A questão mostra a estrutura de um remédio, um perfume ou um alimento e pergunta quais funções estão presentes.",
                        "Funções oxigenadas têm oxigênio (álcool, fenol, aldeído, cetona, ácido carboxílico, éster e éter). Funções nitrogenadas têm nitrogênio (amina e amida)."
                    ],
                    cards: [
                        { titulo: "Álcool × fenol", texto: "Os dois têm –OH. No álcool ele está num carbono saturado; no fenol, direto no anel aromático." },
                        { titulo: "Aldeído × cetona", texto: "Os dois têm C=O. No aldeído fica na ponta da cadeia (–CHO); na cetona, entre dois carbonos." },
                        { titulo: "Ácido × éster", texto: "Ácido carboxílico: –COOH. Éster: –COO– ligado a outro carbono. Ésteres dão aroma a frutas e perfumes." },
                        { titulo: "Amina × amida", texto: "Amina: nitrogênio ligado a carbonos. Amida: nitrogênio ligado ao C=O (–CONH₂)." }
                    ],
                    exemplo: {
                        titulo: "Aroma de fruta",
                        enunciado: "O acetato de isoamila, responsável pelo aroma de banana, tem o grupo –COO– ligado a dois grupos de carbono. A que função ele pertence?",
                        passos: [
                            "O grupo tem C=O e mais um oxigênio, como um ácido.",
                            "Mas, no lugar do hidrogênio do –COOH, há um grupo de carbono.",
                            "Esse é o grupo característico dos ésteres, que costumam ter cheiro agradável."
                        ],
                        resultado: "Éster."
                    },
                    atencao: "Um mesmo composto pode ter várias funções ao mesmo tempo. Procure um grupo funcional de cada vez."
                }
            ]
        }
    ],

    // =========================================================
    // BIOLOGIA
    // =========================================================
    biologia: [
        {
            id: "genetica",
            titulo: "Genética",
            subtitulo: "Genes, alelos, a 1ª Lei de Mendel, cruzamentos, probabilidade e o sistema sanguíneo ABO.",
            calculo: true,
            formulas: ["Aa × Aa → 1 AA : 2 Aa : 1 aa", "Fenótipo 3 : 1", "\"e\" → multiplica", "\"ou\" → soma"],
            secoes: [
                {
                    titulo: "Conceitos básicos",
                    resumo: "A genética estuda como as características são transmitidas de pais para filhos.",
                    conceito: [
                        "As características hereditárias são determinadas por <strong>genes</strong>, trechos de DNA localizados nos cromossomos. Cada pessoa recebe um conjunto de cromossomos do pai e outro da mãe, por isso tem duas versões de cada gene.",
                        "Essas versões são os <strong>alelos</strong>. O alelo <strong>dominante</strong> (letra maiúscula, A) se manifesta mesmo em dose única. O <strong>recessivo</strong> (letra minúscula, a) só aparece quando está em dose dupla (aa)."
                    ],
                    cards: [
                        { titulo: "Genótipo", texto: "A composição genética do indivíduo: AA, Aa ou aa." },
                        { titulo: "Fenótipo", texto: "A característica que se manifesta, como a cor dos olhos. Resulta do genótipo e do ambiente." },
                        { titulo: "Homozigoto", texto: "Tem dois alelos iguais: AA (dominante) ou aa (recessivo)." },
                        { titulo: "Heterozigoto", texto: "Tem dois alelos diferentes: Aa. Mostra o fenótipo dominante." }
                    ],
                    exemplo: {
                        titulo: "Genótipo pelo fenótipo",
                        enunciado: "O albinismo é condicionado por um alelo recessivo (a). Qual o genótipo de uma pessoa albina? E de uma pessoa com pigmentação normal?",
                        passos: [
                            "O fenótipo recessivo só aparece em dose dupla.",
                            "Pessoa albina: aa.",
                            "Pessoa com pigmentação normal: tem pelo menos um A, então pode ser AA ou Aa."
                        ],
                        resultado: "Albina: aa. Normal: AA ou Aa."
                    },
                    atencao: "Dominante não significa mais comum na população. Significa apenas que se manifesta em heterozigose."
                },
                {
                    titulo: "1ª Lei de Mendel e cruzamentos",
                    resumo: "Cada característica é condicionada por dois fatores, que se separam na formação dos gametas.",
                    conceito: [
                        "Gregor Mendel cruzou ervilhas e percebeu que cada indivíduo tem dois fatores para cada característica, mas passa <strong>só um deles</strong> para cada gameta. Essa é a <strong>1ª Lei de Mendel</strong>, ou lei da segregação dos fatores.",
                        "Para prever os filhos de um cruzamento, usamos o <strong>quadro de Punnett</strong>: os gametas de um dos pais vão nas linhas e os do outro, nas colunas."
                    ],
                    cards: [
                        { titulo: "Aa × Aa", texto: "Genótipos: 1 AA : 2 Aa : 1 aa. Fenótipos: 3 dominantes : 1 recessivo." },
                        { titulo: "Aa × aa", texto: "Genótipos: 1 Aa : 1 aa. Metade dos filhos com cada fenótipo." },
                        { titulo: "Regra do \"e\"", texto: "Eventos simultâneos: multiplique. Ter dois filhos aa: 1/4 · 1/4 = 1/16." },
                        { titulo: "Regra do \"ou\"", texto: "Eventos que se excluem: some. Ser AA ou aa: 1/4 + 1/4 = 1/2." }
                    ],
                    exemplo: {
                        titulo: "Casal heterozigoto",
                        enunciado: "Um casal com pigmentação normal, ambos heterozigotos (Aa), quer ter um filho. Qual a probabilidade de ele ser albino (aa)?",
                        passos: [
                            "Cada um produz gametas A e a, com 1/2 de chance cada.",
                            "Para ser aa, o filho precisa receber a do pai e a da mãe.",
                            "1/2 · 1/2 = 1/4."
                        ],
                        resultado: "1/4, ou 25%."
                    },
                    atencao: "Se a questão já diz que o filho tem fenótipo dominante, a chance de ele ser heterozigoto é 2/3, e não 1/2: descartamos o aa."
                },
                {
                    titulo: "Grupos sanguíneos ABO",
                    resumo: "O sistema ABO é determinado por três alelos e explica as regras de doação de sangue.",
                    conceito: [
                        "O tipo sanguíneo depende de três alelos: <strong>Iᴬ</strong>, <strong>Iᴮ</strong> e <strong>i</strong>. Os alelos Iᴬ e Iᴮ são <strong>codominantes</strong> (os dois se manifestam juntos), e ambos dominam o i.",
                        "As hemácias podem ter os antígenos A, B, os dois ou nenhum. O plasma tem anticorpos contra os antígenos que a pessoa não possui. Por isso nem todo sangue pode ser doado para qualquer pessoa."
                    ],
                    cards: [
                        { titulo: "Tipo A", texto: "Genótipos IᴬIᴬ ou Iᴬi. Tem antígeno A e anticorpo anti-B." },
                        { titulo: "Tipo B", texto: "Genótipos IᴮIᴮ ou Iᴮi. Tem antígeno B e anticorpo anti-A." },
                        { titulo: "Tipo AB", texto: "Genótipo IᴬIᴮ. Tem os dois antígenos e nenhum anticorpo: receptor universal." },
                        { titulo: "Tipo O", texto: "Genótipo ii. Não tem antígenos nas hemácias: doador universal." }
                    ],
                    exemplo: {
                        titulo: "Filhos de A com B",
                        enunciado: "Um homem do tipo A (Iᴬi) e uma mulher do tipo B (Iᴮi) podem ter filhos de quais tipos sanguíneos?",
                        passos: [
                            "Gametas do homem: Iᴬ ou i. Gametas da mulher: Iᴮ ou i.",
                            "Combinações: IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B) e ii (O).",
                            "Cada combinação tem 1/4 de chance."
                        ],
                        resultado: "A, B, AB ou O, cada um com 25%."
                    },
                    atencao: "Pais A e B podem ter filho O, se os dois forem heterozigotos. Isso costuma aparecer em questões de investigação de paternidade."
                }
            ]
        },
        {
            id: "citologia",
            titulo: "Citologia",
            subtitulo: "A célula como unidade da vida: procariontes e eucariontes, organelas e suas funções, e as diferenças entre célula animal e vegetal.",
            formulas: ["Procarionte: sem núcleo", "Eucarionte: com núcleo", "Mitocôndria → energia", "Cloroplasto → fotossíntese"],
            secoes: [
                {
                    titulo: "Tipos de célula",
                    resumo: "Todos os seres vivos são formados por células, que podem ser procariontes ou eucariontes.",
                    conceito: [
                        "A <strong>teoria celular</strong> diz que todos os seres vivos são formados por células, que a célula é a menor unidade da vida e que toda célula vem de outra célula. Os vírus não têm células e, por isso, são um caso à parte.",
                        "As células <strong>procariontes</strong> não têm núcleo organizado: o DNA fica solto no citoplasma. As <strong>eucariontes</strong> têm o DNA protegido dentro de um núcleo, separado pela carioteca, e têm organelas membranosas."
                    ],
                    cards: [
                        { titulo: "Procariontes", texto: "Bactérias e arqueas. Sem núcleo e sem organelas membranosas, mas com ribossomos." },
                        { titulo: "Eucariontes", texto: "Protozoários, algas, fungos, plantas e animais. Têm núcleo e organelas." },
                        { titulo: "Membrana plasmática", texto: "Envolve todas as células e controla o que entra e o que sai (permeabilidade seletiva)." },
                        { titulo: "Vírus", texto: "Acelulares: só se reproduzem dentro de uma célula hospedeira. Por isso antibióticos não funcionam contra eles." }
                    ],
                    exemplo: {
                        titulo: "Identificando a célula",
                        enunciado: "Ao microscópio, um pesquisador observa uma célula com parede celular, ribossomos e DNA disperso no citoplasma, sem núcleo. Que tipo de organismo é esse?",
                        passos: [
                            "A ausência de núcleo organizado indica uma célula procarionte.",
                            "Plantas também têm parede celular, mas são eucariontes, com núcleo.",
                            "Uma célula procarionte com parede celular é típica de bactéria."
                        ],
                        resultado: "Uma bactéria (procarionte)."
                    },
                    atencao: "Ter parede celular não significa ser planta: bactérias e fungos também têm, com composições diferentes."
                },
                {
                    titulo: "Organelas e funções",
                    resumo: "Cada organela tem uma função, como os setores de uma fábrica.",
                    conceito: [
                        "As organelas dividem o trabalho dentro da célula eucarionte. O <strong>núcleo</strong> guarda o DNA e comanda a célula. Os <strong>ribossomos</strong> produzem proteínas. A <strong>mitocôndria</strong> faz a respiração celular e libera energia.",
                        "O <strong>retículo endoplasmático</strong> produz e transporta substâncias, o <strong>complexo golgiense</strong> modifica, embala e exporta essas substâncias, e os <strong>lisossomos</strong> fazem a digestão dentro da célula."
                    ],
                    cards: [
                        { titulo: "Mitocôndria", texto: "Respiração celular: glicose + O₂ → CO₂ + H₂O + energia (ATP). Abundante em células musculares." },
                        { titulo: "Ribossomo", texto: "Síntese de proteínas. Existe em todas as células, inclusive nas bactérias." },
                        { titulo: "Complexo golgiense", texto: "Armazena, modifica e secreta substâncias. Abundante em células que produzem secreções." },
                        { titulo: "Lisossomo", texto: "Bolsas com enzimas digestivas. Digerem partículas englobadas e organelas velhas." }
                    ],
                    exemplo: {
                        titulo: "Célula muscular",
                        enunciado: "As células do músculo cardíaco trabalham sem parar. Que organela deve ser muito abundante nelas?",
                        passos: [
                            "Trabalho contínuo exige muita energia.",
                            "A energia das células vem principalmente da respiração celular.",
                            "A respiração celular acontece nas mitocôndrias."
                        ],
                        resultado: "Mitocôndrias."
                    },
                    atencao: "A mitocôndria não \"produz energia do nada\": ela transforma a energia química da glicose em ATP, que a célula consegue usar."
                },
                {
                    titulo: "Célula animal × vegetal",
                    resumo: "Células animais e vegetais são eucariontes, mas têm estruturas diferentes.",
                    conceito: [
                        "A célula vegetal tem três estruturas que a animal não tem: a <strong>parede celular</strong> de celulose, que dá sustentação; os <strong>cloroplastos</strong>, onde acontece a fotossíntese; e um <strong>vacúolo central</strong> grande, que armazena água e substâncias.",
                        "A <strong>fotossíntese</strong> (6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂) é praticamente o inverso da respiração celular. As plantas fazem as duas: fotossíntese só com luz e respiração o tempo todo."
                    ],
                    cards: [
                        { titulo: "Parede celular", texto: "Feita de celulose nas plantas. Protege e dá forma à célula." },
                        { titulo: "Cloroplasto", texto: "Tem clorofila e faz a fotossíntese, transformando energia luminosa em energia química." },
                        { titulo: "Vacúolo", texto: "Grande e central nas plantas. Armazena água e ajuda a manter a célula firme (turgor)." },
                        { titulo: "Centríolos", texto: "Presentes na célula animal e ausentes na maioria das plantas. Participam da divisão celular." }
                    ],
                    exemplo: {
                        titulo: "Planta no escuro",
                        enunciado: "Uma planta fica 24 horas num quarto totalmente escuro. Que processo ela continua realizando?",
                        passos: [
                            "A fotossíntese depende de luz, então para no escuro.",
                            "A respiração celular acontece o tempo todo, com ou sem luz.",
                            "No escuro, a planta só consome O₂ e libera CO₂."
                        ],
                        resultado: "Apenas a respiração celular."
                    },
                    atencao: "Plantas também respiram. Durante o dia, como a fotossíntese é mais intensa, o saldo é de liberação de oxigênio."
                }
            ]
        }
    ],

    // =========================================================
    // PORTUGUÊS
    // =========================================================
    portugues: [
        {
            id: "figuras-de-linguagem",
            titulo: "Figuras de linguagem",
            subtitulo: "Metáfora, metonímia, hipérbole, ironia, antítese, paradoxo e outras: os recursos que dão expressividade aos textos.",
            formulas: ["Metáfora: comparação implícita", "Comparação: usa \"como\"", "Antítese: ideias opostas", "Paradoxo: opostos que se fundem"],
            secoes: [
                {
                    titulo: "Figuras de palavra",
                    resumo: "Nas figuras de palavra, um termo é usado com um sentido diferente do habitual.",
                    conceito: [
                        "Usar a palavra no sentido literal é o <strong>sentido denotativo</strong>. Usá-la com um sentido figurado, que depende do contexto, é o <strong>sentido conotativo</strong>. As figuras de linguagem exploram a conotação.",
                        "A <strong>metáfora</strong> aproxima dois elementos sem usar conectivo (\"Meu coração é um balde\"). A <strong>comparação</strong> faz a mesma aproximação, mas com conectivo (\"forte como um touro\"). A <strong>metonímia</strong> troca um termo por outro com o qual tem relação próxima."
                    ],
                    cards: [
                        { titulo: "Metáfora", texto: "\"Amor é fogo que arde sem se ver\" (Camões). O amor é tratado como fogo, sem \"como\"." },
                        { titulo: "Comparação", texto: "\"Ela é bela como uma flor.\" Usa conectivo: como, tal qual, feito, parece." },
                        { titulo: "Metonímia", texto: "\"Li Machado de Assis\" (a obra pelo autor). \"Bebi dois copos\" (o conteúdo pelo recipiente)." },
                        { titulo: "Sinestesia", texto: "Mistura de sentidos: \"voz macia\" (audição + tato), \"cheiro doce\" (olfato + paladar)." }
                    ],
                    exemplo: {
                        titulo: "Metáfora ou metonímia?",
                        enunciado: "Na frase \"O Brasil inteiro chorou a derrota\", que figura de linguagem aparece?",
                        passos: [
                            "Não é o país, como território, que chora.",
                            "\"Brasil\" está no lugar de \"os brasileiros\": o lugar pelos seus habitantes.",
                            "Trocar um termo por outro com relação próxima de sentido é metonímia."
                        ],
                        resultado: "Metonímia."
                    },
                    atencao: "Dica para diferenciar: na metáfora há uma semelhança entre os termos; na metonímia há uma relação real de proximidade (autor e obra, lugar e habitantes)."
                },
                {
                    titulo: "Figuras de pensamento",
                    resumo: "As figuras de pensamento trabalham com o sentido das ideias e das frases.",
                    conceito: [
                        "A <strong>hipérbole</strong> exagera (\"já falei um milhão de vezes\") e o <strong>eufemismo</strong> suaviza (\"ele partiu desta para melhor\"). A <strong>ironia</strong> diz o contrário do que se pensa, e o contexto revela a intenção.",
                        "A <strong>antítese</strong> aproxima ideias opostas (\"riso e choro\"). O <strong>paradoxo</strong> vai além: junta ideias opostas numa mesma afirmação, que parece impossível (\"é ferida que dói e não se sente\"). A <strong>personificação</strong> dá características humanas a seres não humanos."
                    ],
                    cards: [
                        { titulo: "Hipérbole", texto: "Exagero intencional: \"Estou morrendo de fome\"." },
                        { titulo: "Eufemismo", texto: "Suaviza algo desagradável: \"faltou com a verdade\" no lugar de \"mentiu\"." },
                        { titulo: "Ironia", texto: "Diz o oposto do que se quer dizer: \"Que belo dia!\" durante uma tempestade." },
                        { titulo: "Personificação", texto: "Também chamada prosopopeia: \"O vento sussurrava segredos\"." }
                    ],
                    exemplo: {
                        titulo: "Antítese ou paradoxo?",
                        enunciado: "No verso de Camões \"É um contentamento descontente\", qual é a figura de linguagem?",
                        passos: [
                            "Há dois termos opostos: contentamento e descontente.",
                            "Eles não estão só lado a lado: estão fundidos, atribuídos ao mesmo ser ao mesmo tempo.",
                            "A afirmação parece logicamente impossível."
                        ],
                        resultado: "Paradoxo (ou oxímoro)."
                    },
                    atencao: "Antítese: os opostos convivem no texto (\"Nasce o sol e morre a noite\"). Paradoxo: os opostos se aplicam à mesma coisa ao mesmo tempo."
                },
                {
                    titulo: "Figuras sonoras",
                    resumo: "As figuras sonoras exploram o som das palavras e são muito usadas em poemas, letras de música e publicidade.",
                    conceito: [
                        "A <strong>aliteração</strong> repete sons consonantais e a <strong>assonância</strong> repete sons vocálicos. Os dois recursos criam ritmo e reforçam o sentido do texto.",
                        "A <strong>onomatopeia</strong> imita sons da realidade, como \"tique-taque\", \"au-au\" e \"bum\". Ela aparece muito em quadrinhos, outro gênero muito usado em provas."
                    ],
                    cards: [
                        { titulo: "Aliteração", texto: "\"Vozes veladas, veludosas vozes\" (Cruz e Sousa): repetição do som de V." },
                        { titulo: "Assonância", texto: "\"Sou um mulato nato no sentido lato\" (Caetano Veloso): repetição do som de A." },
                        { titulo: "Onomatopeia", texto: "Palavras que imitam sons: \"O relógio fazia tic-tac\"." },
                        { titulo: "Paronomásia", texto: "Aproxima palavras de som parecido e sentido diferente: \"quem casa quer casa\"." }
                    ],
                    exemplo: {
                        titulo: "Som e sentido",
                        enunciado: "No verso \"O rato roeu a roupa do rei de Roma\", que recurso sonoro predomina e qual efeito ele cria?",
                        passos: [
                            "O som consonantal do R se repete várias vezes.",
                            "A repetição de consoantes é a aliteração.",
                            "O efeito é criar ritmo e um desafio de pronúncia (trava-língua)."
                        ],
                        resultado: "Aliteração do som de R."
                    },
                    atencao: "Para não confundir: consoAnte → aliteração; vogal → assonância."
                }
            ]
        },
        {
            id: "variacao-linguistica",
            titulo: "Variação linguística",
            subtitulo: "Por que falamos de jeitos diferentes: variações regionais, sociais, situacionais e históricas, e o preconceito linguístico.",
            formulas: ["Regional (diatópica)", "Social (diastrática)", "Situacional (diafásica)", "Histórica (diacrônica)"],
            secoes: [
                {
                    titulo: "O que é variação",
                    resumo: "Toda língua viva varia conforme o lugar, o grupo social, a situação e a época.",
                    conceito: [
                        "A língua portuguesa não é uma só forma fixa. Um gaúcho, um baiano e um paulistano falam de jeitos diferentes, e todos falam português. Essas diferenças são chamadas de <strong>variação linguística</strong>.",
                        "A <strong>norma-padrão</strong> é o conjunto de regras ensinado na escola e usado em documentos oficiais. Ela é uma das variedades da língua, e não a única correta. As outras variedades também têm regras próprias e funcionam bem na comunicação."
                    ],
                    cards: [
                        { titulo: "Norma-padrão", texto: "Modelo idealizado, descrito nas gramáticas e esperado em textos formais, como uma redação escolar." },
                        { titulo: "Norma culta", texto: "Como os falantes mais escolarizados realmente usam a língua. É um pouco mais flexível que a norma-padrão." },
                        { titulo: "Variedades populares", texto: "Usadas no dia a dia por grande parte da população. Têm lógica e regras próprias." },
                        { titulo: "Língua viva", texto: "Toda língua muda com o tempo. O latim falado deu origem ao português." }
                    ],
                    exemplo: {
                        titulo: "Mandioca, aipim ou macaxeira?",
                        enunciado: "A mesma raiz é chamada de mandioca em São Paulo, aipim no Rio de Janeiro e macaxeira no Nordeste. Que tipo de variação é essa?",
                        passos: [
                            "A diferença está nas palavras usadas para o mesmo alimento.",
                            "Ela muda conforme a região do país.",
                            "A variação ligada ao lugar é a variação regional."
                        ],
                        resultado: "Variação regional (diatópica)."
                    },
                    atencao: "Os estudos da linguagem não tratam a variação como erro. A ideia central é que nenhuma variedade é melhor que outra."
                },
                {
                    titulo: "Tipos de variação",
                    resumo: "As variações podem ser regionais, sociais, situacionais ou históricas.",
                    conceito: [
                        "A <strong>variação regional</strong> (diatópica) depende do lugar: sotaques e vocabulário. A <strong>variação social</strong> (diastrática) depende do grupo: idade, escolaridade, profissão. Gírias e jargões técnicos entram aqui.",
                        "A <strong>variação situacional</strong> (diafásica) depende do contexto: falamos de um jeito com amigos e de outro numa entrevista de emprego. A <strong>variação histórica</strong> (diacrônica) mostra como a língua muda com o tempo."
                    ],
                    cards: [
                        { titulo: "Regional", texto: "\"Tu vais\" no Sul, \"você vai\" em boa parte do país; \"bergamota\", \"mexerica\" e \"tangerina\"." },
                        { titulo: "Social", texto: "Gíria de jovens, jargão de médicos ou advogados, linguagem de grupos específicos." },
                        { titulo: "Situacional", texto: "Registro formal × informal. \"E aí, beleza?\" com amigos; \"Bom dia, como vai?\" numa reunião." },
                        { titulo: "Histórica", texto: "\"Vossa mercê\" → \"vosmecê\" → \"você\" → \"cê\". \"Pharmacia\" virou \"farmácia\"." }
                    ],
                    exemplo: {
                        titulo: "Texto antigo",
                        enunciado: "Um anúncio de jornal de 1920 diz: \"Precisa-se de uma creada para serviços de casa\". A grafia \"creada\" mostra qual variação?",
                        passos: [
                            "Hoje escrevemos \"criada\".",
                            "A diferença não é de região nem de grupo social.",
                            "Ela mostra uma mudança da língua ao longo do tempo."
                        ],
                        resultado: "Variação histórica (diacrônica)."
                    },
                    atencao: "Gíria é variação social. Mas quando o problema é usar gíria numa situação formal, a questão está falando de adequação ao contexto (variação situacional)."
                },
                {
                    titulo: "Preconceito linguístico e adequação",
                    resumo: "Julgar alguém pelo jeito de falar é preconceito linguístico; o que importa é a adequação ao contexto.",
                    conceito: [
                        "<strong>Preconceito linguístico</strong> é discriminar uma pessoa pela forma como ela fala, quase sempre associando seu jeito de falar à região de origem, à classe social ou à escolaridade. O linguista Marcos Bagno é uma referência nesse tema.",
                        "Em vez de \"certo\" e \"errado\", a ideia de <strong>adequação</strong> é mais útil: cada situação pede uma variedade. Usar a norma-padrão numa conversa entre amigos pode soar estranho, assim como usar gírias numa redação oficial."
                    ],
                    cards: [
                        { titulo: "Preconceito linguístico", texto: "Ridicularizar sotaques ou formas populares. É uma forma de exclusão social." },
                        { titulo: "Adequação", texto: "Escolher a variedade que combina com o interlocutor, o gênero do texto e a situação." },
                        { titulo: "Literatura e música", texto: "Autores usam variedades populares de propósito, para dar voz e identidade aos personagens." },
                        { titulo: "Redação escolar", texto: "Exige a norma-padrão, porque é um texto formal. Isso é adequação, e não superioridade de uma variedade." }
                    ],
                    exemplo: {
                        titulo: "Letra de música",
                        enunciado: "Uma canção diz: \"Nóis vai, nóis vorta\". Uma questão pergunta qual é a função desse uso no texto.",
                        passos: [
                            "A forma não segue a norma-padrão, mas é uma variedade legítima.",
                            "O compositor escolheu essa forma de propósito, num gênero artístico.",
                            "Ela valoriza a fala popular e cria identidade com um grupo."
                        ],
                        resultado: "Caracterizar a fala popular e dar identidade ao texto, e não um erro."
                    },
                    atencao: "Em provas, alternativas que chamam variedades populares de \"erradas\", \"inferiores\" ou \"pobres\" quase sempre estão incorretas."
                }
            ]
        }
    ],

    // =========================================================
    // HISTÓRIA
    // =========================================================
    historia: [
        {
            id: "brasil-colonia",
            titulo: "Brasil Colônia (1500–1822)",
            subtitulo: "Da chegada dos portugueses à Independência: capitanias, governo-geral, açúcar, escravidão, mineração e as revoltas coloniais.",
            formulas: ["1500 · Chegada", "1534 · Capitanias", "1549 · Governo-geral", "Séc. XVIII · Mineração", "1789 · Inconfidência"],
            secoes: [
                {
                    titulo: "Início da colonização",
                    resumo: "Nas primeiras décadas, Portugal explorou o pau-brasil; a colonização efetiva começou na década de 1530.",
                    conceito: [
                        "Após a chegada da esquadra de Cabral em 1500, Portugal se interessou pouco pelo território, porque o comércio com as Índias era mais lucrativo. A principal atividade foi a extração do <strong>pau-brasil</strong>, feita com mão de obra indígena por meio do escambo.",
                        "A ameaça de outros países, como a França, levou à colonização efetiva. Em 1534 foram criadas as <strong>capitanias hereditárias</strong>, e em 1549 o <strong>governo-geral</strong>, com Tomé de Sousa fundando Salvador, a primeira capital."
                    ],
                    cards: [
                        { titulo: "Pau-brasil", texto: "Madeira que fornecia tinta vermelha. Era monopólio da Coroa e foi extraída com trabalho indígena trocado por objetos (escambo)." },
                        { titulo: "Capitanias hereditárias", texto: "Faixas de terra entregues a donatários, que deviam colonizá-las com recursos próprios. A maioria fracassou." },
                        { titulo: "Governo-geral", texto: "Criado em 1549 para centralizar a administração. Salvador foi a capital até 1763." },
                        { titulo: "Jesuítas", texto: "Chegaram com Tomé de Sousa. Catequizaram indígenas, fundaram colégios e criaram aldeamentos." }
                    ],
                    exemplo: {
                        titulo: "Por que colonizar?",
                        enunciado: "Por que Portugal decidiu ocupar de fato o território brasileiro a partir da década de 1530?",
                        passos: [
                            "Até então, o lucro principal vinha do comércio com o Oriente.",
                            "Franceses passaram a contrabandear pau-brasil no litoral.",
                            "Para não perder a terra, Portugal precisava ocupá-la e povoá-la."
                        ],
                        resultado: "Para garantir a posse do território diante das invasões estrangeiras, além da queda nos lucros com as Índias."
                    },
                    atencao: "O território não estava vazio: milhões de indígenas já viviam aqui. A colonização trouxe guerras, doenças e escravização para esses povos."
                },
                {
                    titulo: "Açúcar e escravidão",
                    resumo: "A economia açucareira dos séculos XVI e XVII foi baseada no latifúndio, na monocultura e no trabalho escravizado.",
                    conceito: [
                        "O açúcar era muito valorizado na Europa. No litoral do Nordeste, principalmente em Pernambuco e na Bahia, surgiram os <strong>engenhos</strong>, organizados no sistema de <strong>plantation</strong>: grande propriedade, monocultura, produção para exportação e mão de obra escravizada.",
                        "Milhões de africanos foram trazidos à força pelo <strong>tráfico negreiro</strong>, uma atividade muito lucrativa para comerciantes e para a Coroa. Os escravizados resistiram de várias formas, inclusive fugindo e formando <strong>quilombos</strong>, como o de Palmares."
                    ],
                    cards: [
                        { titulo: "Plantation", texto: "Latifúndio + monocultura + exportação + trabalho escravizado. O modelo marcou a estrutura social do Brasil." },
                        { titulo: "Pacto colonial", texto: "A colônia só podia comerciar com a metrópole, que comprava barato e vendia caro (exclusivo metropolitano)." },
                        { titulo: "Quilombo dos Palmares", texto: "Maior quilombo do período, na serra da Barriga (atual Alagoas). Zumbi foi seu líder mais conhecido; morreu em 1695." },
                        { titulo: "Sociedade açucareira", texto: "Patriarcal e rural: o senhor de engenho no topo e os escravizados na base, com pouca mobilidade social." }
                    ],
                    exemplo: {
                        titulo: "Características do engenho",
                        enunciado: "Que características da economia açucareira colonial ainda podem ser percebidas na estrutura agrária brasileira?",
                        passos: [
                            "O modelo se baseava em grandes propriedades (latifúndios).",
                            "A produção era voltada para o mercado externo.",
                            "Esses traços ajudam a explicar a concentração de terras que persiste no Brasil."
                        ],
                        resultado: "A concentração fundiária e a produção agrícola voltada à exportação."
                    },
                    atencao: "Nas provas, a resistência dos escravizados é um tema forte: fugas, quilombos, preservação da cultura e da religião também foram formas de resistir."
                },
                {
                    titulo: "Mineração e revoltas",
                    resumo: "No século XVIII, a descoberta de ouro em Minas Gerais mudou a economia, a sociedade e a capital da colônia.",
                    conceito: [
                        "A descoberta de ouro no fim do século XVII deslocou o centro econômico para o interior, em <strong>Minas Gerais</strong>. A sociedade mineradora foi mais urbana e diversificada que a açucareira, e a capital passou de Salvador para o <strong>Rio de Janeiro em 1763</strong>, por onde o ouro era embarcado.",
                        "A Coroa cobrava impostos pesados, como o <strong>quinto</strong> (20% do ouro) e a <strong>derrama</strong> (cobrança forçada de impostos atrasados). A insatisfação levou à <strong>Inconfidência Mineira (1789)</strong>, inspirada no Iluminismo e na independência dos Estados Unidos."
                    ],
                    cards: [
                        { titulo: "Quinto", texto: "Imposto de 20% sobre todo o ouro extraído, cobrado nas Casas de Fundição." },
                        { titulo: "Inconfidência Mineira", texto: "1789. Elite mineira contra a derrama. Foi denunciada antes de começar; Tiradentes foi executado em 1792." },
                        { titulo: "Conjuração Baiana", texto: "1798. Teve participação popular (alfaiates, soldados, escravizados) e defendia o fim da escravidão." },
                        { titulo: "Interiorização", texto: "A mineração estimulou a ocupação do interior, o comércio interno e a criação de gado para abastecer as minas." }
                    ],
                    exemplo: {
                        titulo: "Comparando revoltas",
                        enunciado: "Qual a principal diferença entre a Inconfidência Mineira e a Conjuração Baiana?",
                        passos: [
                            "A Inconfidência foi liderada pela elite mineira, preocupada com os impostos.",
                            "Ela não propunha claramente o fim da escravidão.",
                            "A Conjuração Baiana teve ampla participação popular e defendia a abolição e a igualdade."
                        ],
                        resultado: "A Conjuração Baiana teve caráter popular e defendia o fim da escravidão; a Inconfidência foi um movimento de elite."
                    },
                    atencao: "Tiradentes virou herói nacional na República, que precisava de símbolos. Questões podem tratar da construção dessa imagem."
                }
            ]
        },
        {
            id: "ditadura-militar",
            titulo: "Ditadura Militar (1964–1985)",
            subtitulo: "O golpe de 1964, os Atos Institucionais, o \"milagre econômico\", a repressão e a abertura até a redemocratização.",
            formulas: ["1964 · Golpe", "1968 · AI-5", "1968–73 · Milagre", "1979 · Anistia", "1984 · Diretas Já", "1985 · Fim"],
            secoes: [
                {
                    titulo: "O golpe e os Atos Institucionais",
                    resumo: "Em 1964, os militares, com apoio de setores civis, derrubaram o presidente João Goulart.",
                    conceito: [
                        "O presidente <strong>João Goulart (Jango)</strong> defendia as <strong>reformas de base</strong>, como a reforma agrária. Em plena Guerra Fria, setores da elite, da classe média, da Igreja e da imprensa, com apoio dos Estados Unidos, acusavam o governo de levar o país ao comunismo.",
                        "Em 31 de março e 1º de abril de 1964, os militares deram um <strong>golpe</strong> e assumiram o poder. O regime passou a governar por meio de <strong>Atos Institucionais (AIs)</strong>, decretos que se colocavam acima da Constituição."
                    ],
                    cards: [
                        { titulo: "Reformas de base", texto: "Propostas de Jango: reforma agrária, urbana, educacional e eleitoral (voto dos analfabetos)." },
                        { titulo: "AI-1 (1964)", texto: "Permitiu cassar mandatos e suspender direitos políticos de opositores." },
                        { titulo: "AI-2 (1965)", texto: "Extinguiu os partidos e criou o bipartidarismo: ARENA (governo) e MDB (oposição consentida)." },
                        { titulo: "Eleições indiretas", texto: "O presidente passou a ser escolhido pelo Congresso, e não pelo voto popular." }
                    ],
                    exemplo: {
                        titulo: "Contexto do golpe",
                        enunciado: "Por que o contexto internacional da Guerra Fria ajuda a explicar o golpe de 1964?",
                        passos: [
                            "O mundo estava dividido entre o bloco capitalista (EUA) e o socialista (URSS).",
                            "Após a Revolução Cubana (1959), os EUA temiam novos governos de esquerda na América Latina.",
                            "As reformas de Jango foram apresentadas por seus opositores como uma ameaça comunista."
                        ],
                        resultado: "O anticomunismo da Guerra Fria serviu de justificativa para o golpe, que teve apoio dos EUA."
                    },
                    atencao: "O golpe teve apoio de parte da sociedade civil, por isso muitos historiadores falam em ditadura \"civil-militar\"."
                },
                {
                    titulo: "AI-5, repressão e milagre",
                    resumo: "O AI-5 inaugurou o período mais duro do regime, ao mesmo tempo em que a economia crescia rapidamente.",
                    conceito: [
                        "Em dezembro de 1968, diante de protestos estudantis e greves, o governo Costa e Silva decretou o <strong>AI-5</strong>. Ele permitiu fechar o Congresso, cassar mandatos, censurar a imprensa e as artes e suspendeu o <strong>habeas corpus</strong> para crimes políticos.",
                        "Os <strong>\"anos de chumbo\"</strong>, sobretudo no governo Médici, tiveram prisões, torturas, mortes e desaparecimentos de opositores. Ao mesmo tempo, o <strong>\"milagre econômico\"</strong> (1968–1973) trouxe crescimento acelerado, financiado por empréstimos externos e com aumento da concentração de renda."
                    ],
                    cards: [
                        { titulo: "AI-5", texto: "O mais duro dos atos: fechamento do Congresso, censura prévia e fim do habeas corpus para crimes políticos." },
                        { titulo: "Censura", texto: "Músicas, peças, filmes e jornais eram vetados. Artistas usavam metáforas para driblar os censores." },
                        { titulo: "Milagre econômico", texto: "PIB crescendo cerca de 10% ao ano, grandes obras e propaganda ufanista (\"Brasil, ame-o ou deixe-o\")." },
                        { titulo: "O outro lado", texto: "Arrocho salarial, concentração de renda e aumento da dívida externa." }
                    ],
                    exemplo: {
                        titulo: "Música e censura",
                        enunciado: "Canções como \"Cálice\", de Chico Buarque e Gilberto Gil, usavam duplo sentido (\"cálice\" / \"cale-se\"). Por quê?",
                        passos: [
                            "Após o AI-5, havia censura prévia sobre as artes.",
                            "Críticas diretas ao regime seriam proibidas.",
                            "O duplo sentido permitia criticar a repressão de forma disfarçada."
                        ],
                        resultado: "Para denunciar a censura e a repressão driblando os censores."
                    },
                    atencao: "O crescimento do milagre não foi distribuído: o famoso lema da época era \"fazer o bolo crescer para depois dividir\"."
                },
                {
                    titulo: "Abertura e redemocratização",
                    resumo: "A partir de 1974, o regime iniciou uma abertura \"lenta, gradual e segura\", que terminou em 1985.",
                    conceito: [
                        "A crise do petróleo (1973) encerrou o milagre e trouxe inflação e dívida. O presidente <strong>Geisel</strong> anunciou uma abertura <strong>\"lenta, gradual e segura\"</strong>, controlada pelos próprios militares. No governo <strong>Figueiredo</strong> veio a <strong>Lei da Anistia (1979)</strong> e a volta do pluripartidarismo.",
                        "Em 1984, o movimento <strong>Diretas Já</strong> levou milhões às ruas pela eleição direta para presidente, mas a emenda foi rejeitada. Em 1985, <strong>Tancredo Neves</strong> foi eleito de forma indireta; ele morreu antes de assumir, e <strong>José Sarney</strong> tomou posse. A Constituição de 1988 consolidou a redemocratização."
                    ],
                    cards: [
                        { titulo: "Lei da Anistia (1979)", texto: "Permitiu a volta de exilados e a libertação de presos políticos, mas também perdoou agentes do Estado que torturaram." },
                        { titulo: "Diretas Já (1984)", texto: "Grande mobilização popular pela emenda Dante de Oliveira, que foi rejeitada pelo Congresso." },
                        { titulo: "Fim do regime (1985)", texto: "Tancredo foi eleito pelo Colégio Eleitoral; com sua morte, Sarney assumiu." },
                        { titulo: "Constituição de 1988", texto: "Chamada de \"Constituição Cidadã\": garantiu direitos sociais, voto dos analfabetos e eleições diretas." }
                    ],
                    exemplo: {
                        titulo: "Anistia em debate",
                        enunciado: "Por que a Lei da Anistia de 1979 ainda é discutida hoje?",
                        passos: [
                            "Ela libertou presos políticos e permitiu o retorno dos exilados, uma conquista da oposição.",
                            "Mas também foi aplicada aos agentes do Estado que cometeram torturas e assassinatos.",
                            "Por isso, esses crimes não foram julgados no Brasil."
                        ],
                        resultado: "Porque foi \"ampla, geral e irrestrita\" e impediu a punição de torturadores do regime."
                    },
                    atencao: "A Comissão Nacional da Verdade (2012–2014) investigou as violações de direitos humanos do período e é tema frequente em questões."
                }
            ]
        }
    ],

    // =========================================================
    // GEOGRAFIA
    // =========================================================
    geografia: [
        {
            id: "urbanizacao",
            titulo: "Urbanização",
            subtitulo: "O êxodo rural, a rede urbana, metrópoles e conurbação, e os problemas das grandes cidades brasileiras.",
            formulas: ["Êxodo rural → urbanização", "Conurbação: cidades unidas", "Ilha de calor", "Inversão térmica"],
            secoes: [
                {
                    titulo: "Êxodo rural e urbanização",
                    resumo: "O Brasil se urbanizou de forma rápida e desorganizada, principalmente a partir da década de 1950.",
                    conceito: [
                        "<strong>Urbanização</strong> é o aumento da população urbana em relação à rural. No Brasil, a população urbana passou a ser maioria nos anos 1960 e hoje ultrapassa 80% do total.",
                        "O principal motor foi o <strong>êxodo rural</strong>: a mecanização do campo e a concentração de terras expulsaram trabalhadores, enquanto a industrialização das cidades, sobretudo no Sudeste, atraía mão de obra."
                    ],
                    cards: [
                        { titulo: "Fatores de repulsão", texto: "Mecanização agrícola, concentração fundiária, falta de crédito e de serviços no campo." },
                        { titulo: "Fatores de atração", texto: "Empregos na indústria e nos serviços, acesso a escolas, saúde e infraestrutura." },
                        { titulo: "Ritmo brasileiro", texto: "Os países ricos levaram mais de um século para se urbanizar; o Brasil fez isso em poucas décadas." },
                        { titulo: "Consequência", texto: "As cidades cresceram mais rápido do que a oferta de moradia, transporte e saneamento." }
                    ],
                    exemplo: {
                        titulo: "Causas do êxodo",
                        enunciado: "Por que a modernização da agricultura brasileira, a partir dos anos 1960 e 1970, contribuiu para o êxodo rural?",
                        passos: [
                            "As máquinas passaram a fazer o trabalho de muitas pessoas.",
                            "A modernização favoreceu grandes propriedades, aumentando a concentração de terras.",
                            "Sem trabalho nem terra, muitos camponeses migraram para as cidades."
                        ],
                        resultado: "A mecanização reduziu a necessidade de mão de obra e a concentração de terras expulsou pequenos produtores."
                    },
                    atencao: "Urbanização não é o mesmo que crescimento das cidades. Ela mede a proporção da população que vive em áreas urbanas."
                },
                {
                    titulo: "Rede urbana e metrópoles",
                    resumo: "As cidades se organizam numa hierarquia e algumas crescem tanto que se juntam fisicamente.",
                    conceito: [
                        "As cidades formam uma <strong>rede urbana</strong>, com uma hierarquia: as <strong>metrópoles</strong> oferecem serviços sofisticados e influenciam grandes regiões; cidades médias e pequenas dependem delas para alguns serviços.",
                        "Quando duas ou mais cidades crescem até suas malhas urbanas se unirem, ocorre a <strong>conurbação</strong>. Conjuntos de municípios integrados formam as <strong>regiões metropolitanas</strong>, como a Grande São Paulo."
                    ],
                    cards: [
                        { titulo: "Metrópole", texto: "Grande cidade que polariza uma região, com serviços especializados. Ex.: São Paulo, Rio de Janeiro, Brasília." },
                        { titulo: "Conurbação", texto: "Junção física de cidades vizinhas, sem limite visível entre elas. Ex.: São Paulo e o ABC paulista." },
                        { titulo: "Megalópole", texto: "União de metrópoles. Ex.: o eixo Rio–São Paulo, em formação." },
                        { titulo: "Macrocefalia urbana", texto: "Concentração excessiva de população e serviços em uma ou poucas grandes cidades." }
                    ],
                    exemplo: {
                        titulo: "Identificando o conceito",
                        enunciado: "Uma pessoa sai de casa em Santo André e chega a São Paulo sem perceber onde termina uma cidade e começa a outra. Que fenômeno é esse?",
                        passos: [
                            "São dois municípios diferentes.",
                            "As áreas construídas das duas cidades se encontraram.",
                            "A junção física de malhas urbanas é chamada conurbação."
                        ],
                        resultado: "Conurbação."
                    },
                    atencao: "Região metropolitana é uma definição legal e administrativa; conurbação é a junção física. Uma não depende da outra."
                },
                {
                    titulo: "Problemas urbanos",
                    resumo: "O crescimento desordenado gerou desigualdade, problemas de moradia e impactos ambientais nas cidades.",
                    conceito: [
                        "A falta de planejamento e de moradia acessível levou à <strong>favelização</strong> e à ocupação de áreas de risco, como encostas e margens de rios. A <strong>segregação socioespacial</strong> separa a população por renda: bairros ricos com infraestrutura e periferias com poucos serviços.",
                        "Há também problemas ambientais: a <strong>impermeabilização do solo</strong> pelo asfalto e concreto causa enchentes, a <strong>ilha de calor</strong> deixa o centro mais quente que a periferia, e a <strong>inversão térmica</strong> concentra a poluição no inverno."
                    ],
                    cards: [
                        { titulo: "Segregação socioespacial", texto: "Separação dos grupos sociais no espaço da cidade, de acordo com a renda." },
                        { titulo: "Enchentes", texto: "O solo impermeabilizado não absorve a chuva, e a água escoa toda de uma vez para rios canalizados." },
                        { titulo: "Ilha de calor", texto: "Áreas centrais, com muito concreto, asfalto e pouca vegetação, ficam mais quentes que o entorno." },
                        { titulo: "Inversão térmica", texto: "No inverno, uma camada de ar frio fica presa sob uma de ar quente, e a poluição não se dispersa." }
                    ],
                    exemplo: {
                        titulo: "Enchentes nas cidades",
                        enunciado: "Por que as enchentes são mais frequentes nas grandes cidades, mesmo com chuvas de intensidade parecida às de áreas rurais?",
                        passos: [
                            "Asfalto e concreto impedem a infiltração da água no solo.",
                            "A água da chuva escoa rapidamente para as partes baixas e para os rios.",
                            "Rios canalizados e lixo nos bueiros diminuem ainda mais a capacidade de escoamento."
                        ],
                        resultado: "Por causa da impermeabilização do solo, somada à canalização dos rios e ao lixo nas galerias."
                    },
                    atencao: "Não confunda: ilha de calor acontece o ano todo e é causada pela urbanização; inversão térmica é um fenômeno natural, mais comum no inverno, que fica perigoso por causa da poluição."
                }
            ]
        },
        {
            id: "fontes-de-energia",
            titulo: "Fontes de energia",
            subtitulo: "Fontes renováveis e não renováveis, a matriz energética brasileira e os impactos ambientais de cada fonte.",
            formulas: ["Renovável: se recompõe", "Não renovável: esgota", "Matriz elétrica BR: hídrica", "Matriz energética ≠ elétrica"],
            secoes: [
                {
                    titulo: "Renováveis e não renováveis",
                    resumo: "As fontes de energia se dividem entre as que se recompõem na natureza e as que se esgotam.",
                    conceito: [
                        "<strong>Fontes não renováveis</strong> existem em quantidade limitada e levam milhões de anos para se formar, como o <strong>petróleo, o carvão mineral e o gás natural</strong> (combustíveis fósseis) e o urânio (energia nuclear).",
                        "<strong>Fontes renováveis</strong> se recompõem em pouco tempo: água dos rios (hidrelétrica), vento (eólica), sol (solar), biomassa (como o etanol e o bagaço de cana) e o calor da Terra (geotérmica)."
                    ],
                    cards: [
                        { titulo: "Combustíveis fósseis", texto: "Petróleo, carvão e gás natural. Liberam CO₂ na queima e são a principal causa do aquecimento global." },
                        { titulo: "Nuclear", texto: "Não emite CO₂ na geração, mas produz lixo radioativo e tem risco de acidentes graves. No Brasil: usinas de Angra." },
                        { titulo: "Biomassa", texto: "Matéria orgânica como cana, madeira e resíduos. O etanol de cana é um destaque brasileiro." },
                        { titulo: "Eólica e solar", texto: "Crescem rapidamente no Brasil, sobretudo no Nordeste, pela boa incidência de vento e sol." }
                    ],
                    exemplo: {
                        titulo: "Classificando a fonte",
                        enunciado: "O gás natural é uma fonte de energia renovável? Ele é considerado mais limpo que o carvão. Por quê?",
                        passos: [
                            "O gás natural é um combustível fóssil, formado ao longo de milhões de anos.",
                            "Por isso, é uma fonte não renovável.",
                            "Na queima, ele emite menos CO₂ e poluentes que o carvão e o petróleo."
                        ],
                        resultado: "Não é renovável, mas é menos poluente que os outros combustíveis fósseis."
                    },
                    atencao: "Renovável não é sinônimo de sem impacto. Hidrelétricas e plantações para biocombustível também causam danos ambientais."
                },
                {
                    titulo: "Matriz energética brasileira",
                    resumo: "O Brasil tem uma das matrizes mais renováveis do mundo, graças às hidrelétricas e à biomassa.",
                    conceito: [
                        "A <strong>matriz energética</strong> reúne todas as fontes de energia usadas num país (transporte, indústria, residências). A <strong>matriz elétrica</strong> é só a parte usada para gerar eletricidade.",
                        "No Brasil, perto de metade da matriz energética é renovável, enquanto a média mundial é bem menor. Na matriz elétrica, a <strong>energia hidrelétrica</strong> é a principal fonte, aproveitando os grandes rios de planalto."
                    ],
                    cards: [
                        { titulo: "Matriz energética", texto: "Todas as fontes: combustíveis dos carros, gás das indústrias, lenha, eletricidade etc." },
                        { titulo: "Matriz elétrica", texto: "Só a geração de eletricidade. No Brasil, é dominada pelas hidrelétricas." },
                        { titulo: "Rios de planalto", texto: "Têm desníveis e grande volume de água, ideais para hidrelétricas. Ex.: Itaipu, no rio Paraná." },
                        { titulo: "Pré-sal", texto: "Grandes reservas de petróleo em águas profundas, que aumentaram a produção brasileira." }
                    ],
                    exemplo: {
                        titulo: "Crise hídrica",
                        enunciado: "Por que períodos de seca prolongada podem aumentar a conta de luz no Brasil?",
                        passos: [
                            "A maior parte da eletricidade brasileira vem de hidrelétricas.",
                            "Com pouca chuva, o nível dos reservatórios cai e a geração diminui.",
                            "É preciso ligar termelétricas, que são mais caras e poluentes."
                        ],
                        resultado: "Porque a dependência das hidrelétricas obriga o uso de termelétricas, mais caras, nas secas."
                    },
                    atencao: "Não confunda as duas matrizes: o petróleo pesa muito na matriz energética (transportes), mas pouco na matriz elétrica."
                },
                {
                    titulo: "Impactos ambientais",
                    resumo: "Toda fonte de energia tem vantagens e desvantagens; as provas costumam pedir essa comparação.",
                    conceito: [
                        "As <strong>hidrelétricas</strong> não queimam combustível, mas alagam grandes áreas, destroem florestas, afetam a fauna dos rios e deslocam populações ribeirinhas e indígenas, como no caso de Belo Monte, no rio Xingu.",
                        "As <strong>termelétricas</strong> a combustíveis fósseis emitem gases de efeito estufa e poluentes. Já as fontes <strong>eólica e solar</strong> têm baixo impacto, mas são intermitentes: dependem de vento e de sol."
                    ],
                    cards: [
                        { titulo: "Hidrelétrica", texto: "Vantagem: renovável e barata a longo prazo. Desvantagem: alagamento, perda de biodiversidade e deslocamento de pessoas." },
                        { titulo: "Termelétrica", texto: "Vantagem: pode ser ligada a qualquer hora. Desvantagem: poluição e emissão de CO₂." },
                        { titulo: "Eólica", texto: "Vantagem: limpa. Desvantagem: depende do vento, causa ruído e pode afetar aves." },
                        { titulo: "Solar", texto: "Vantagem: limpa e pode ser instalada em casas. Desvantagem: não gera à noite e precisa de baterias ou de outra fonte." }
                    ],
                    exemplo: {
                        titulo: "Escolhendo a fonte",
                        enunciado: "Uma cidade do sertão nordestino, com muito sol e vento constante, quer gerar energia com baixo impacto ambiental. Que fontes são mais indicadas?",
                        passos: [
                            "O sertão tem pouca água, o que inviabiliza hidrelétricas.",
                            "Termelétricas causariam poluição.",
                            "A forte insolação e os ventos constantes favorecem as fontes solar e eólica."
                        ],
                        resultado: "Solar e eólica, que podem se complementar."
                    },
                    atencao: "Nas questões de comparação, procure a alternativa que traz uma vantagem e uma desvantagem corretas da mesma fonte."
                }
            ]
        }
    ],

    // =========================================================
    // FILOSOFIA
    // =========================================================
    filosofia: [
        {
            id: "filosofia-antiga",
            titulo: "Sócrates, Platão e Aristóteles",
            subtitulo: "Os três grandes filósofos da Grécia Antiga: o método socrático, a teoria das ideias e o realismo aristotélico.",
            formulas: ["Sócrates · \"Só sei que nada sei\"", "Platão · Mito da caverna", "Aristóteles · Justo meio"],
            secoes: [
                {
                    titulo: "Sócrates",
                    resumo: "Sócrates (469–399 a.C.) não deixou nada escrito e ensinava conversando nas praças de Atenas.",
                    conceito: [
                        "Antes de Sócrates, os <strong>pré-socráticos</strong> buscavam a <strong>arché</strong>, o princípio de todas as coisas (Tales dizia que era a água). Sócrates mudou o foco da filosofia para o <strong>ser humano</strong>: a ética, a justiça e a virtude.",
                        "Seu método tinha duas etapas: a <strong>ironia</strong>, em que fazia perguntas até o interlocutor perceber que não sabia o que achava que sabia, e a <strong>maiêutica</strong>, que ajudava a pessoa a \"dar à luz\" as próprias ideias."
                    ],
                    cards: [
                        { titulo: "\"Só sei que nada sei\"", texto: "Reconhecer a própria ignorância é o primeiro passo para buscar o conhecimento." },
                        { titulo: "\"Conhece-te a ti mesmo\"", texto: "Frase do templo de Delfos adotada por Sócrates: o autoconhecimento é o caminho para a virtude." },
                        { titulo: "Maiêutica", texto: "\"Parto das ideias\": por meio de perguntas, o interlocutor chega sozinho à verdade." },
                        { titulo: "Morte", texto: "Acusado de corromper a juventude e desrespeitar os deuses, foi condenado a beber cicuta." }
                    ],
                    exemplo: {
                        titulo: "O método em ação",
                        enunciado: "Um professor não dá a resposta, mas faz uma sequência de perguntas até que o aluno perceba sozinho a contradição no que dizia. Que método é esse?",
                        passos: [
                            "As perguntas mostram ao aluno que seu conhecimento era falso: essa é a ironia.",
                            "Depois, o aluno constrói sozinho uma ideia melhor.",
                            "Ajudar o outro a gerar o conhecimento por si mesmo é a maiêutica."
                        ],
                        resultado: "O método socrático (ironia e maiêutica)."
                    },
                    atencao: "A ironia socrática não é deboche: é o momento de mostrar que as certezas do interlocutor eram frágeis."
                },
                {
                    titulo: "Platão",
                    resumo: "Platão (c. 428–348 a.C.), discípulo de Sócrates, dividiu a realidade em mundo sensível e mundo das ideias.",
                    conceito: [
                        "Para Platão, o <strong>mundo sensível</strong>, que percebemos pelos sentidos, é imperfeito e está sempre mudando: é apenas uma cópia. A verdadeira realidade está no <strong>mundo das ideias</strong> (ou inteligível), formado por modelos perfeitos e eternos, acessíveis só pela razão.",
                        "A <strong>alegoria da caverna</strong>, no livro A República, ilustra essa teoria: prisioneiros que só veem sombras na parede acreditam que elas são a realidade. O filósofo é quem sai da caverna, vê a luz do sol e volta para libertar os outros."
                    ],
                    cards: [
                        { titulo: "Mundo sensível", texto: "O que percebemos pelos sentidos: mutável, imperfeito, lugar da opinião (doxa)." },
                        { titulo: "Mundo das ideias", texto: "Modelos perfeitos e eternos, conhecidos pela razão. Lugar do conhecimento verdadeiro (episteme)." },
                        { titulo: "Alegoria da caverna", texto: "As sombras representam as aparências; sair da caverna é o caminho do conhecimento." },
                        { titulo: "Política", texto: "Em A República, defende que a cidade ideal seja governada por filósofos (o rei-filósofo)." }
                    ],
                    exemplo: {
                        titulo: "Interpretando a caverna",
                        enunciado: "Na alegoria da caverna, o que representam as sombras projetadas na parede?",
                        passos: [
                            "Os prisioneiros acreditam que as sombras são tudo o que existe.",
                            "Mas elas são apenas reflexos de objetos reais que eles não veem.",
                            "Elas simbolizam o mundo das aparências, percebido pelos sentidos."
                        ],
                        resultado: "As aparências do mundo sensível, que muitos confundem com a verdade."
                    },
                    atencao: "Em provas, a caverna aparece ligada a temas atuais, como desinformação e redes sociais: aceitar as \"sombras\" sem questionar."
                },
                {
                    titulo: "Aristóteles",
                    resumo: "Aristóteles (384–322 a.C.), aluno de Platão, valorizou a experiência e o mundo concreto.",
                    conceito: [
                        "Aristóteles discordou do mestre: para ele, as essências não estão num mundo separado, mas <strong>nas próprias coisas</strong>. Por isso, o conhecimento começa pelos sentidos e pela observação, o que o torna um <strong>realista</strong>.",
                        "Na ética, defendeu que o objetivo da vida é a <strong>felicidade (eudaimonia)</strong>, alcançada pela virtude. A virtude é o <strong>justo meio</strong> entre dois extremos: a coragem fica entre a covardia e a imprudência."
                    ],
                    cards: [
                        { titulo: "Ato e potência", texto: "A semente é uma árvore em potência; a árvore é a semente em ato. Explica a mudança das coisas." },
                        { titulo: "Justo meio", texto: "A virtude é o equilíbrio entre o excesso e a falta, e se forma pelo hábito." },
                        { titulo: "Animal político", texto: "O ser humano só se realiza plenamente vivendo em sociedade, na pólis." },
                        { titulo: "Lógica", texto: "Criou o silogismo: \"Todo homem é mortal; Sócrates é homem; logo, Sócrates é mortal\"." }
                    ],
                    exemplo: {
                        titulo: "Encontrando o justo meio",
                        enunciado: "Segundo Aristóteles, qual seria a virtude entre a avareza (gastar de menos) e o esbanjamento (gastar demais)?",
                        passos: [
                            "Os dois extremos são vícios: um por falta e outro por excesso.",
                            "A virtude está no equilíbrio entre eles.",
                            "Gastar na medida certa, de acordo com a situação, é a generosidade (liberalidade)."
                        ],
                        resultado: "A generosidade (liberalidade)."
                    },
                    atencao: "Resumo para a prova: Platão olha para cima (mundo das ideias, razão); Aristóteles olha para as coisas (experiência, observação)."
                }
            ]
        },
        {
            id: "etica",
            titulo: "Ética: Kant e utilitarismo",
            subtitulo: "Ética e moral, o dever e o imperativo categórico de Kant, e o utilitarismo de Bentham e Stuart Mill.",
            formulas: ["Kant · Dever e intenção", "Imperativo categórico", "Utilitarismo · Consequências", "Maior felicidade para o maior número"],
            secoes: [
                {
                    titulo: "Ética e moral",
                    resumo: "A moral são as regras de conduta de uma sociedade; a ética é a reflexão sobre essas regras.",
                    conceito: [
                        "A <strong>moral</strong> é o conjunto de normas, valores e costumes que orientam o comportamento de um grupo em determinada época. Ela varia de uma cultura para outra e muda com o tempo.",
                        "A <strong>ética</strong> é a parte da filosofia que reflete sobre a moral: pergunta por que algo é certo ou errado e busca fundamentos para nossas escolhas. As grandes teorias éticas respondem de formas diferentes a essa pergunta."
                    ],
                    cards: [
                        { titulo: "Moral", texto: "Regras e costumes vividos na prática por um grupo. Ex.: normas de convivência de uma sociedade." },
                        { titulo: "Ética", texto: "Reflexão crítica sobre a moral. Pergunta: o que torna uma ação correta?" },
                        { titulo: "Ética do dever", texto: "Avalia a ação pela intenção e pela regra seguida (Kant)." },
                        { titulo: "Ética das consequências", texto: "Avalia a ação pelos resultados que ela produz (utilitarismo)." }
                    ],
                    exemplo: {
                        titulo: "Moral muda com o tempo?",
                        enunciado: "Práticas aceitas em outras épocas, como a escravidão, hoje são condenadas. O que isso mostra sobre a moral?",
                        passos: [
                            "A moral é construída pelas sociedades.",
                            "Valores e normas mudam ao longo da história.",
                            "A reflexão ética ajuda a questionar normas injustas."
                        ],
                        resultado: "Que a moral é histórica e cultural, e a ética permite criticá-la."
                    },
                    atencao: "Na linguagem do dia a dia, ética e moral são usadas como sinônimos, mas na filosofia há essa diferença."
                },
                {
                    titulo: "Kant e o dever",
                    resumo: "Para Immanuel Kant (1724–1804), uma ação é moral quando é feita por dever, seguindo a razão.",
                    conceito: [
                        "Kant defende que o valor moral de uma ação está na <strong>intenção</strong>, e não nos resultados. Agir corretamente só por medo de punição ou interesse não tem valor moral: é preciso agir <strong>por dever</strong>.",
                        "O critério é o <strong>imperativo categórico</strong>: \"Age apenas segundo uma máxima tal que possas querer que ela se torne lei universal\". Outra formulação diz que devemos tratar a humanidade sempre como um <strong>fim</strong>, nunca apenas como um <strong>meio</strong>."
                    ],
                    cards: [
                        { titulo: "Imperativo categórico", texto: "Regra incondicional: vale para todos, sempre. Ex.: \"não minta\", e não \"não minta se quiser ser respeitado\"." },
                        { titulo: "Teste da universalização", texto: "Pergunte: e se todos agissem assim? Se a regra não pode valer para todos, a ação é imoral." },
                        { titulo: "Pessoa como fim", texto: "Usar alguém apenas como instrumento, como enganá-lo para obter vantagem, é imoral." },
                        { titulo: "Autonomia", texto: "A pessoa moral dá a si mesma a lei pela razão, e não obedece só por pressão externa." }
                    ],
                    exemplo: {
                        titulo: "Promessa falsa",
                        enunciado: "Segundo Kant, alguém em dificuldade pode pedir dinheiro emprestado prometendo devolver, sabendo que não vai cumprir?",
                        passos: [
                            "Universalizando: \"todos podem fazer promessas falsas quando precisarem\".",
                            "Se todos fizessem isso, ninguém mais acreditaria em promessas, e a própria promessa perderia o sentido.",
                            "Além disso, a pessoa que empresta estaria sendo usada apenas como meio."
                        ],
                        resultado: "Não. A ação não pode ser universalizada e usa o outro apenas como meio."
                    },
                    atencao: "Para Kant, mentir é errado mesmo que traga boas consequências. É aí que ele mais se diferencia do utilitarismo."
                },
                {
                    titulo: "Utilitarismo",
                    resumo: "Para o utilitarismo, a ação correta é a que produz a maior felicidade para o maior número de pessoas.",
                    conceito: [
                        "O utilitarismo, de <strong>Jeremy Bentham</strong> e <strong>John Stuart Mill</strong>, é uma ética <strong>consequencialista</strong>: uma ação é boa ou má de acordo com os resultados que produz.",
                        "O princípio da <strong>utilidade</strong> manda escolher a ação que gera mais bem-estar e menos sofrimento para o maior número de pessoas. Mill acrescentou que há prazeres de qualidade superior, como os intelectuais, e não só de quantidade."
                    ],
                    cards: [
                        { titulo: "Consequencialismo", texto: "O que importa é o resultado da ação, e não a intenção ou a regra seguida." },
                        { titulo: "Princípio da utilidade", texto: "A maior felicidade possível para o maior número de pessoas." },
                        { titulo: "Bentham", texto: "Propôs calcular prazeres e dores para decidir qual ação é melhor." },
                        { titulo: "Crítica", texto: "Pode justificar sacrificar uma minoria em nome do bem-estar da maioria." }
                    ],
                    exemplo: {
                        titulo: "Kant × utilitarismo",
                        enunciado: "Uma pessoa esconde um amigo perseguido. O perseguidor pergunta onde ele está. Como Kant e um utilitarista avaliariam a mentira para salvá-lo?",
                        passos: [
                            "Para Kant, mentir nunca pode ser universalizado, então a mentira continua sendo errada.",
                            "Para o utilitarista, deve-se comparar as consequências.",
                            "Mentir salva uma vida e evita sofrimento, o que gera mais bem-estar."
                        ],
                        resultado: "Kant condenaria a mentira; o utilitarista a consideraria correta."
                    },
                    atencao: "Resumo para a prova: Kant = intenção e dever. Utilitarismo = consequências e felicidade da maioria."
                }
            ]
        }
    ]
};

// Coloca os tópicos novos dentro das matérias que já existem
Object.entries(topicosExtras).forEach(([idMateria, topicos]) => {
    const materia = guiasMaterias.find(item => item.id === idMateria);
    if (!materia) {
        console.warn(`Matéria "${idMateria}" não encontrada para os tópicos extras.`);
        return;
    }
    topicos.forEach(topico => {
        if (!materia.topicos.some(existente => existente.id === topico.id)) {
            materia.topicos.push(topico);
        }
    });
});
