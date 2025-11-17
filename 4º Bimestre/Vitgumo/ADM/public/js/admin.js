async function carregarProdutos() {
    try {
        const resposta = await fetch("/produtos");
        const produtos = await resposta.json();

        const tbody = document.getElementById("listaProdutos");
        tbody.innerHTML = "";

        produtos.forEach((p) => {
            const precoFormatado = Number(p.preco).toFixed(2);

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${p.idProduto}</td>
                <td>${p.nome}</td>
                <td>R$ ${precoFormatado}</td>
                <td>${p.quantidade}</td>
                <td>${p.categoria}</td>
                <td>
                    <button onclick="editar(${p.idProduto})" class="btn-editar">Editar</button>
                    <button onclick="deletar(${p.idProduto})" class="btn-deletar">Excluir</button>
                </td>
            `;

            tbody.appendChild(tr);
        });
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

carregarProdutos();

// =============================
// MODAL
// =============================
const modal = document.getElementById("modalEditar");

function abrirModal() {
    modal.style.display = "flex";
}

function fecharModal() {
    modal.style.display = "none";
}

document.getElementById("btnFechar").addEventListener("click", fecharModal);


const modalAdd = document.getElementById("modalAdd");
document.getElementById("btnAdd").addEventListener("click", () => {
    modalAdd.style.display = "flex";
});

document.getElementById("btnAddFechar").addEventListener("click", () => {
    modalAdd.style.display = "none";
});

// =============================
// INSERIR PRODUTO
// =============================
function limparCamposAdd() {
    document.getElementById("add-nome").value = "";
    document.getElementById("add-preco").value = "";
    document.getElementById("add-quantidade").value = "";
    document.getElementById("add-categoria").value = "";
    document.getElementById("add-descricao").value = "";
    document.getElementById("add-imagem").value = "";
    document.getElementById("add-avaliacao").value = "";
}

document.getElementById("btnAddSalvar").addEventListener("click", async () => {

    const novoProduto = {
        nome: document.getElementById("add-nome").value,
        preco: document.getElementById("add-preco").value,
        quantidade: document.getElementById("add-quantidade").value,
        categoria: document.getElementById("add-categoria").value,
        descricao: document.getElementById("add-descricao").value,
        imagem: document.getElementById("add-imagem").value,
        avaliacao: document.getElementById("add-avaliacao").value
    };

    const resposta = await fetch("/produtos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto)
    });

    if (!resposta.ok) {
        alert("Erro ao adicionar produto!");
        return;
    }

    alert("Produto adicionado com sucesso!");

    limparCamposAdd();
    modalAdd.style.display = "none";
    carregarProdutos();
});


// =============================
// EDITAR PRODUTO
// =============================
async function editar(id) {
    try {
        const resposta = await fetch(`/produtos/${id}`);
        const p = await resposta.json();

        document.getElementById("edit-id").value = p.idProduto;
        document.getElementById("edit-nome").value = p.nome;
        document.getElementById("edit-preco").value = p.preco;
        document.getElementById("edit-quantidade").value = p.quantidade;
        document.getElementById("edit-categoria").value = p.categoria;
        document.getElementById("edit-descricao").value = p.descricao;
        document.getElementById("edit-imagem").value = p.imagem;
        document.getElementById("edit-avaliacao").value = p.avaliacao;

        abrirModal();
    } catch (e) {
        console.error("Erro ao carregar produto:", e);
    }
}


// =============================
// SALVAR ALTERAÇÕES
// =============================
document.getElementById("btnSalvar").addEventListener("click", async () => {
    const produtoEditado = {
        nome: document.getElementById("edit-nome").value,
        preco: document.getElementById("edit-preco").value,
        quantidade: document.getElementById("edit-quantidade").value,
        categoria: document.getElementById("edit-categoria").value,
        descricao: document.getElementById("edit-descricao").value,
        imagem: document.getElementById("edit-imagem").value,
        avaliacao: document.getElementById("edit-avaliacao").value
    };

    const id = document.getElementById("edit-id").value;

    await fetch(`/produtos/editar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoEditado)
    });

    fecharModal();
    carregarProdutos();
});


// =============================
// DELETAR PRODUTO
// =============================
async function deletar(id) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    const resposta = await fetch(`/produtos/delete/${id}`, { method: "DELETE" });

    if (!resposta.ok) {
        const erro = await resposta.json();
        alert("Erro: " + erro.msg);
        return;
    }

    alert("Produto deletado com sucesso!");
    carregarProdutos();
}

