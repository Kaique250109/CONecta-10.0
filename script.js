const cards = [
    {
        id: 1,
        cat: "HTML",
        icon: "🌐",
        q: "O que é HTML?",
        a: "HTML é a linguagem de marcação usada para estruturar páginas da web.",
        tip: "Pense no HTML como o esqueleto de um site."
    },
    {
        id: 2,
        cat: "HTML",
        icon: "🏗️",
        q: "Para que serve a tag <main>?",
        a: "A tag <main> representa o conteúdo principal de uma página HTML.",
        tip: "Usar HTML semântico deixa a estrutura mais organizada."
    },
    {
        id: 3,
        cat: "HTML",
        icon: "🧩",
        q: "O que são elementos semânticos?",
        a: "São elementos que indicam claramente o significado do conteúdo, como header, main, section e footer.",
        tip: "Semântica ajuda pessoas, navegadores e mecanismos de busca."
    },
    {
        id: 4,
        cat: "CSS",
        icon: "🎨",
        q: "O que é CSS?",
        a: "CSS é a linguagem utilizada para estilizar e personalizar elementos HTML.",
        tip: "HTML estrutura. CSS deixa bonito."
    },
    {
        id: 5,
        cat: "CSS",
        icon: "📐",
        q: "Para que serve display: flex?",
        a: "Flexbox organiza elementos de forma flexível em linhas ou colunas.",
        tip: "É muito usado para criar layouts responsivos."
    },
    {
        id: 6,
        cat: "CSS",
        icon: "🔄",
        q: "O que faz transform: rotateY(180deg)?",
        a: "Gira um elemento 180 graus no eixo Y.",
        tip: "É uma das propriedades usadas para criar o efeito 3D dos flashcards."
    },
    {
        id: 7,
        cat: "CSS",
        icon: "✨",
        q: "Para que serve transition?",
        a: "A propriedade transition cria uma transição suave entre mudanças de propriedades CSS.",
        tip: "Ela deixa animações e interações menos bruscas."
    },
    {
        id: 8,
        cat: "WEB",
        icon: "🖱️",
        q: "O que é :hover?",
        a: "É uma pseudoclasse ativada quando o usuário posiciona o mouse sobre um elemento.",
        tip: "Experimente passar o mouse pelos botões deste projeto."
    },
    {
        id: 9,
        cat: "WEB",
        icon: "↔️",
        q: "Para que serve gap?",
        a: "gap define o espaço entre elementos de um layout Flexbox ou Grid.",
        tip: "É uma forma prática de criar espaçamento."
    },
    {
        id: 10,
        cat: "WEB",
        icon: "📱",
        q: "O que significa responsividade?",
        a: "É a capacidade de um site se adaptar a diferentes tamanhos de tela.",
        tip: "Abra este projeto no celular para perceber a diferença."
    },
    {
        id: 11,
        cat: "JS",
        icon: "⚡",
        q: "O que é JavaScript?",
        a: "JavaScript é uma linguagem de programação usada para adicionar lógica e interatividade às páginas.",
        tip: "Neste projeto ele controla os cards, XP, quiz e tema."
    },
    {
        id: 12,
        cat: "Git",
        icon: "🔧",
        q: "Para que serve o Git?",
        a: "Git é um sistema de controle de versão que permite acompanhar alterações em projetos.",
        tip: "GitHub pode armazenar e publicar seus projetos."
    }
];


const desafios = [
    {
        cat: "CSS",
        q: "Qual propriedade do Flexbox centraliza elementos no eixo principal?",
        options: [
            "align-items",
            "justify-content",
            "position",
            "text-align"
        ],
        correct: 1
    },
    {
        cat: "CSS",
        q: "Qual propriedade cria uma animação suave entre mudanças?",
        options: [
            "transition",
            "display",
            "padding",
            "overflow"
        ],
        correct: 0
    },
    {
        cat: "HTML",
        q: "Qual linguagem é responsável pela estrutura de uma página?",
        options: [
            "CSS",
            "JavaScript",
            "HTML",
            "Python"
        ],
        correct: 2
    },
    {
        cat: "JavaScript",
        q: "Qual tecnologia adiciona interatividade à página?",
        options: [
            "HTML",
            "JavaScript",
            "CSS",
            "Git"
        ],
        correct: 1
    }
];


let estado = {
    indice: 0,
    lista: [...cards],
    favoritos: JSON.parse(localStorage.getItem("ca_favoritos")) || [],
    aprendidos: JSON.parse(localStorage.getItem("ca_aprendidos")) || [],
    estudados: JSON.parse(localStorage.getItem("ca_estudados")) || [],
    xp: Number(localStorage.getItem("ca_xp")) || 0,
    streak: Number(localStorage.getItem("ca_streak")) || 1,
    ultimoDia: localStorage.getItem("ca_ultimo_dia") || "",
    desafio: Number(localStorage.getItem("ca_desafio")) || 0,
    pontuacao: Number(localStorage.getItem("ca_pontuacao")) || 0,
    favoritosAtivos: false
};


const flashcard = document.getElementById("flashcard");
const pergunta = document.getElementById("pergunta");
const resposta = document.getElementById("resposta");
const dica = document.getElementById("dica");
const cardIcon = document.getElementById("cardIcon");
const cardCategoria = document.getElementById("cardCategoria");

const xp = document.getElementById("xp");
const nivel = document.getElementById("nivel");
const xpBar = document.getElementById("xpBar");
const cardsEstudados = document.getElementById("cardsEstudados");
const streak = document.getElementById("streak");
const conquistas = document.getElementById("conquistas");
const bigXp = document.getElementById("bigXp");

const cardAtual = document.getElementById("cardAtual");
const cardTotal = document.getElementById("cardTotal");

const studyBar = document.getElementById("studyBar");
const progressoTexto = document.getElementById("progressoTexto");

const temaBtn = document.getElementById("temaBtn");
const toast = document.getElementById("toast");


function salvar() {
    localStorage.setItem("ca_favoritos", JSON.stringify(estado.favoritos));
    localStorage.setItem("ca_aprendidos", JSON.stringify(estado.aprendidos));
    localStorage.setItem("ca_estudados", JSON.stringify(estado.estudados));
    localStorage.setItem("ca_xp", estado.xp);
    localStorage.setItem("ca_streak", estado.streak);
    localStorage.setItem("ca_ultimo_dia", estado.ultimoDia);
    localStorage.setItem("ca_desafio", estado.desafio);
    localStorage.setItem("ca_pontuacao", estado.pontuacao);
}


function mostrarToast(texto) {
    toast.textContent = "✓ " + texto;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}


function nivelAtual() {
    return Math.floor(estado.xp / 100) + 1;
}


function atualizarInterface() {

    const nivelAtualizado = nivelAtual();

    nivel.textContent = nivelAtualizado;
    xp.textContent = estado.xp;
    bigXp.textContent = estado.xp;

    cardsEstudados.textContent = estado.estudados.length;
    streak.textContent = estado.streak;

    const xpNivel = estado.xp % 100;

    xpBar.style.width = xpNivel + "%";

    const porcentagem = cards.length
        ? Math.min(100, Math.round(
            (estado.estudados.length / cards.length) * 100
        ))
        : 0;

    studyBar.style.width = porcentagem + "%";
    progressoTexto.textContent = porcentagem + "%";

    atualizarConquistas();
}


function renderCard() {

    if (!estado.lista.length) {
        pergunta.textContent = "Nenhum card encontrado.";
        resposta.textContent = "Tente outra pesquisa.";
        dica.textContent = "";
        cardCategoria.textContent = "SEM RESULTADOS";
        cardIcon.textContent = "🔎";

        cardAtual.textContent = "0";
        cardTotal.textContent = "0";

        return;
    }

    if (estado.indice >= estado.lista.length) {
        estado.indice = 0;
    }

    if (estado.indice < 0) {
        estado.indice = estado.lista.length - 1;
    }

    const card = estado.lista[estado.indice];

    flashcard.classList.remove("flipped");

    cardIcon.textContent = card.icon;
    cardCategoria.textContent = card.cat;
    pergunta.textContent = card.q;
    resposta.textContent = card.a;
    dica.textContent = card.tip;

    cardAtual.textContent = estado.indice + 1;
    cardTotal.textContent = estado.lista.length;

    const favoritado = estado.favoritos.includes(card.id);

    document.getElementById("favoritar").textContent =
        favoritado ? "★" : "☆";

    document.getElementById("aprenderBtn").textContent =
        estado.aprendidos.includes(card.id)
            ? "✓ Aprendido"
            : "✓ Aprendi";
}


function estudarCard() {

    if (!estado.lista.length) return;

    const card = estado.lista[estado.indice];

    if (!estado.estudados.includes(card.id)) {

        estado.estudados.push(card.id);

        estado.xp += 10;

        mostrarToast("+10 XP! Card estudado 🎉");

        atualizarInterface();
        salvar();
    }
}


function marcarAprendido() {

    if (!estado.lista.length) return;

    const card = estado.lista[estado.indice];

    if (!estado.aprendidos.includes(card.id)) {

        estado.aprendidos.push(card.id);

        estado.xp += 20;

        mostrarToast("+20 XP! Você aprendeu esse conteúdo 🧠");

    } else {

        estado.aprendidos =
            estado.aprendidos.filter(id => id !== card.id);

        mostrarToast("Card removido dos aprendidos");

    }

    salvar();
    atualizarInterface();
    renderCard();
}


flashcard.addEventListener("click", () => {

    if (!estado.lista.length) return;

    flashcard.classList.toggle("flipped");

    estudarCard();
});


document.getElementById("proximo").addEventListener("click", () => {

    if (!estado.lista.length) return;

    estado.indice++;

    renderCard();
});


document.getElementById("anterior").addEventListener("click", () => {

    if (!estado.lista.length) return;

    estado.indice--;

    renderCard();
});


document.getElementById("aprenderBtn").addEventListener(
    "click",
    marcarAprendido
);


document.getElementById("favoritar").addEventListener(
    "click",
    () => {

        if (!estado.lista.length) return;

        const card = estado.lista[estado.indice];

        if (estado.favoritos.includes(card.id)) {

            estado.favoritos =
                estado.favoritos.filter(id => id !== card.id);

            mostrarToast("Removido dos favoritos");

        } else {

            estado.favoritos.push(card.id);

            mostrarToast("Adicionado aos favoritos ⭐");
        }

        salvar();
        renderCard();
    }
);


document.getElementById("embaralharBtn").addEventListener(
    "click",
    () => {

        estado.lista.sort(() => Math.random() - .5);
        estado.indice = 0;

        renderCard();

        mostrarToast("Cards embaralhados 🔀");
    }
);


document.getElementById("favoritosBtn").addEventListener(
    "click",
    () => {

        estado.favoritosAtivos =
            !estado.favoritosAtivos;

        if (estado.favoritosAtivos) {

            estado.lista = cards.filter(card =>
                estado.favoritos.includes(card.id)
            );

            mostrarToast("Mostrando favoritos ⭐");

        } else {

            estado.lista = [...cards];

            mostrarToast("Mostrando todos os cards");
        }

        estado.indice = 0;

        renderCard();
    }
);


/* FILTROS */

document.querySelectorAll(".filter").forEach(botao => {

    botao.addEventListener("click", () => {

        document.querySelectorAll(".filter")
            .forEach(b => b.classList.remove("active"));

        botao.classList.add("active");

        const categoria = botao.dataset.cat;

        estado.lista =
            categoria === "Todos"
                ? [...cards]
                : cards.filter(card =>
                    card.cat === categoria
                );

        estado.indice = 0;
        estado.favoritosAtivos = false;

        renderCard();
    });

});


/* PESQUISA */

document.getElementById("pesquisa").addEventListener(
    "input",
    event => {

        const termo =
            event.target.value.toLowerCase().trim();

        estado.lista = cards.filter(card =>

            card.q.toLowerCase().includes(termo) ||
            card.a.toLowerCase().includes(termo) ||
            card.cat.toLowerCase().includes(termo)

        );

        estado.indice = 0;

        renderCard();
    }
);


/* TEMA */

temaBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const claro =
        document.body.classList.contains("light");

    temaBtn.textContent =
        claro ? "🌙" : "☀️";

    localStorage.setItem(
        "ca_tema",
        claro ? "light" : "dark"
    );
});


if (localStorage.getItem("ca_tema") === "light") {

    document.body.classList.add("light");

    temaBtn.textContent = "🌙";
}


/* DESAFIOS */

function renderDesafio() {

    const desafio =
        desafios[estado.desafio];

    document.getElementById("quizCategoria")
        .textContent = desafio.cat;

    document.getElementById("quizNumero")
        .textContent =
        String(estado.desafio + 1).padStart(2, "0")
        + " / "
        + String(desafios.length).padStart(2, "0");

    document.getElementById("quizPergunta")
        .textContent = desafio.q;

    const opcoes =
        document.getElementById("opcoes");

    const resultado =
        document.getElementById("quizResultado");

    resultado.textContent = "";

    opcoes.innerHTML = "";

    desafio.options.forEach((opcao, index) => {

        const button =
            document.createElement("button");

        button.className = "option";
        button.textContent = opcao;

        button.addEventListener(
            "click",
            () => responderDesafio(index, button)
        );

        opcoes.appendChild(button);
    });

}


function responderDesafio(index, button) {

    const desafio =
        desafios[estado.desafio];

    const botoes =
        document.querySelectorAll(".option");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (index === desafio.correct) {

        button.classList.add("correct");

        estado.pontuacao++;
        estado.xp += 25;

        document.getElementById("quizResultado")
            .textContent =
            "🎉 Acertou! +25 XP";

        mostrarToast("+25 XP! Resposta correta 🚀");

    } else {

        button.classList.add("wrong");

        botoes[desafio.correct]
            .classList.add("correct");

        document.getElementById("quizResultado")
            .textContent =
            "💡 Quase! A alternativa correta está marcada.";
    }

    estado.desafio++;

    if (estado.desafio >= desafios.length) {
        estado.desafio = 0;
    }

    document.getElementById("pontuacao")
        .textContent = estado.pontuacao;

    salvar();
    atualizarInterface();

    setTimeout(renderDesafio, 1500);
}


/* CONQUISTAS */

const conquistasLista = [
    {
        icon: "🚀",
        nome: "Primeiro passo",
        descricao: "Estude 1 card",
        liberar: () => estado.estudados.length >= 1
    },
    {
        icon: "🧠",
        nome: "Memória de aço",
        descricao: "Aprenda 3 cards",
        liberar: () => estado.aprendidos.length >= 3
    },
    {
        icon: "⭐",
        nome: "Colecionador",
        descricao: "Favorite 3 cards",
        liberar: () => estado.favoritos.length >= 3
    },
    {
        icon: "🔥",
        nome: "Constância",
        descricao: "Mantenha uma sequência",
        liberar: () => estado.streak >= 3
    },
    {
        icon: "🏆",
        nome: "Conhecimento",
        descricao: "Alcance 100 XP",
        liberar: () => estado.xp >= 100
    },
    {
        icon: "🔎",
        nome: "Explorador",
        descricao: "Estude 6 cards",
        liberar: () => estado.estudados.length >= 6
    },
    {
        icon: "💻",
        nome: "Programador",
        descricao: "Alcance 250 XP",
        liberar: () => estado.xp >= 250
    },
    {
        icon: "👑",
        nome: "Mestre CONecta",
        descricao: "Alcance 500 XP",
        liberar: () => estado.xp >= 500
    }
];


function atualizarConquistas() {

    const container =
        document.getElementById("achievements");

    container.innerHTML = "";

    let desbloqueadas = 0;

    conquistasLista.forEach(conquista => {

        const liberada =
            conquista.liberar();

        if (liberada) {
            desbloqueadas++;
        }

        const div =
            document.createElement("div");

        div.className =
            "achievement " +
            (liberada ? "unlocked" : "");

        div.innerHTML = `
            <span>${conquista.icon}</span>
            <b>${conquista.nome}</b>
            <small>${conquista.descricao}</small>
        `;

        container.appendChild(div);
    });

    conquistas.textContent = desbloqueadas;
}


/* STREAK */

function atualizarStreak() {

    const hoje =
        new Date().toLocaleDateString("pt-BR");

    if (estado.ultimoDia !== hoje) {

        if (estado.ultimoDia) {

            const anterior =
                new Date(
                    estado.ultimoDia.split("/").reverse().join("-")
                );

            const atual = new Date();

            const diferenca =
                Math.floor(
                    (atual - anterior) /
                    (1000 * 60 * 60 * 24)
                );

            if (diferenca === 1) {
                estado.streak++;
            } else if (diferenca > 1) {
                estado.streak = 1;
            }

        }

        estado.ultimoDia = hoje;

        salvar();
    }
}


/* TECLADO */

document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {
        document.getElementById("proximo").click();
    }

    if (event.key === "ArrowLeft") {
        document.getElementById("anterior").click();
    }

    if (event.key === " ") {

        if (
            document.activeElement.tagName !== "INPUT"
        ) {

            event.preventDefault();

            flashcard.click();
        }
    }

    if (event.key.toLowerCase() === "f") {
        document.getElementById("favoritar").click();
    }

});


/* CATEGORIAS */

document.querySelectorAll(".category").forEach(
    categoria => {

        categoria.addEventListener(
            "click",
            () => {

                if (
                    categoria.classList.contains("future")
                ) {

                    mostrarToast(
                        "Essa categoria estará disponível em breve 🚀"
                    );

                    return;
                }

                mostrarToast(
                    "Categoria selecionada 📚"
                );

                document
                    .getElementById("estudar")
                    .scrollIntoView({
                        behavior: "smooth"
                    });
            }
        );
    }
);


/* INICIALIZAÇÃO */

atualizarStreak();
atualizarInterface();
renderCard();
renderDesafio();

document.getElementById("pontuacao")
    .textContent = estado.pontuacao;