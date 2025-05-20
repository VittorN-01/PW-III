import clubes from './times.js'

let trs = document.querySelectorAll("tbody tr");

// Atualiza os dados dos clubes
clubes.forEach(time => {
    time.saldoGols = time.golsFeitos - time.golsSofridos;
    time.pontos = time.vitorias * 3 + time.empates;
});

// Separar os clubes por grupo
let grupos = {
    A: [],
    B: [],
    C: [],
    D: []
};

clubes.forEach(time => {
    if (grupos[time.grupo]) {
        grupos[time.grupo].push(time);
    }
});

// Ordenar cada grupo
Object.keys(grupos).forEach(grupo => {
    grupos[grupo].sort((a, b) => {
        if (b.pontos !== a.pontos) return b.pontos - a.pontos;
        if (b.vitorias !== a.vitorias) return b.vitorias - a.vitorias;
        if (b.saldoGols !== a.saldoGols) return b.saldoGols - a.saldoGols;
        return b.golsFeitos - a.golsFeitos;
    });
});

// Junta todos os grupos em ordem A, B, C, D
let clubesOrdenados = [
    ...grupos.A,
    ...grupos.B,
    ...grupos.C,
    ...grupos.D
];

let qtd = Math.min(trs.length, clubesOrdenados.length);

for (let index = 1; index <= qtd; index++) {
    let tr = trs[index - 1];

    if ((index - 1) % 4 === 0) {
        tr.style.backgroundColor = '#A4F3E9'; 
        tr.style.fontWeight = 'bold';
    }

    for (let i = 0; i < 10; i++) {
        let novaTD = document.createElement('td');
        tr.appendChild(novaTD);
    }

    let filhos = tr.children;
    editarFilhos(filhos, (index - 1), clubesOrdenados);
}

function editarFilhos(filhos, index, clubes) {
    filhos[1].textContent = clubes[index].nome;
    filhos[2].textContent = clubes[index].pontos;
    filhos[3].textContent = clubes[index].jogos;
    filhos[4].textContent = clubes[index].vitorias;
    filhos[5].textContent = clubes[index].empates;
    filhos[6].textContent = clubes[index].derrotas;
    filhos[7].textContent = clubes[index].golsFeitos;
    filhos[8].textContent = clubes[index].golsSofridos;
    filhos[9].textContent = clubes[index].saldoGols;

    let pontos = clubes[index].pontos;
    let jogos = clubes[index].jogos;
    filhos[10].textContent = calcularAproveitamento(pontos, jogos);
}

function calcularAproveitamento(pontos, jogos) {
    return ((pontos / (jogos * 3)) * 100).toFixed(0) + '%';
}