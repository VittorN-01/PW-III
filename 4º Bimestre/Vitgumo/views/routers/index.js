// =============================
// ======== ROTAS API =========
// =============================
import express from "express";
import { getProdutos, getProdutosPorTermo } from "../../DAO/script/produtos.js";
import { cadastroUser, logarUser } from "../../DAO/script/usuarios.js";
import { adicionarAoCarrinho, listarCarrinho, removerItemCarrinho, getCarrinho } from "../../DAO/script/cart.js";
import { criarPedido, adicionarItemPedido, limparCarrinho } from "../../DAO/script/compras.js";
const router = express.Router();

// =============================
// ======== HOME PAGE =========
// =============================
router.get("/", async (req, res) => {
  try {
    const categorias = await getProdutos();
    res.render("home", {
      categorias,
      usuario: req.session.usuario,
    });
  } catch (erro) {
    console.error("Erro ao buscar produtos no router:", erro.message);
    res.status(500).send("Erro ao carregar produtos");
  }
});

// =============================
// ======== CADASTRO =========
// =============================
router.post("/vitgumo/1.0.0/cadastro", async (req, res) => {
  const { nome, cpf, email, senha } = req.body;
  try {
    const result = await cadastroUser({ nome, cpf, email, senha });
    
    // result.insertId é retornado pelo MySQL ao inserir novo registro
    req.session.usuario = { nome, id: result.insertId };

    res.json({
      success: true,
      message: "Usuário cadastrado com sucesso!",
      user: { nome, id: result.insertId }
    });
  } catch (erro) {
    console.error("Erro no cadastro:", erro.message);
    res.status(500).json({ success: false, message: erro.message });
  }
});

// =============================
// ======== LOGIN =========
// =============================
router.post("/vitgumo/1.0.0/login", async (req, res) => {
  const { cpfEmail, senha } = req.body;
  try {
    const user = await logarUser(cpfEmail, senha);

    if (user) {
      req.session.usuario = { nome: user.nome, id: user.idUsuario }; // <-- corrigido aqui
      res.json({ success: true, message: "Login realizado!", user });
    } else {
      res.json({ success: false, message: "CPF/Email ou senha incorretos!" });
    }
  } catch (erro) {
    console.error("Erro no login:", erro.message);
    res.status(500).json({ success: false, message: erro.message });
  }
});

// =============================
// ======== LOGOUT =========
// =============================
router.get("/vitgumo/1.0.0/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) console.error("Erro ao deslogar:", err);
    res.redirect("/");
  });
});


// =============================
// ======== RESULTADOS BUSCA ========
// =============================
router.get("/vitgumo/1.0.0/resultado", async (req, res) => {
  try {
    const termo = (req.query.q || "").trim();

    // Caso o usuário acesse sem digitar nada
    if (!termo) {
      return res.render("resultados", {
        termo: "",
        produtos: [],
        quantidade: 0
      });
    }

    // Busca produtos que contenham o termo (case-insensitive)
    const produtos = await getProdutosPorTermo(termo);

    // Renderiza a view
    res.render("resultados", {
      termo,
      produtos,
      quantidade: produtos.length
    });
  } catch (erro) {
    console.error("Erro na busca:", erro.message);
    res.status(500).render("erro", {
      message: "Erro ao buscar produtos. Tente novamente mais tarde."
    });
  }
});

// =============================
// ======== TELA PRODUTOS =========
// =============================
router.get("/vitgumo/1.0.0/produtos", async (req, res) => {
  try {
    const produtos = await getProdutos();
    const categoriasMap = {};

    produtos.forEach(prod => {
      if (!categoriasMap[prod.categoria]) {
        categoriasMap[prod.categoria] = { nome: prod.categoria, produtos: [] };
      }
      categoriasMap[prod.categoria].produtos.push(prod);
    });

    const categorias = Object.values(categoriasMap);
    res.render("produtos", { categorias, usuario: req.session.usuario });
  } catch (erro) {
    console.error("Erro ao buscar produtos:", erro.message);
    res.status(500).send("Erro ao carregar produtos");
  }
});

// =============================
// ======== TELA CADASTRO/LOGIN =========
// =============================
router.get("/vitgumo/1.0.0/cadastroLogin", (req, res) => {
  res.render("cadastroLogin");
});

// =============================
// ======== CARRINHO =========
// =============================

// 🛒 Adicionar produto
router.post("/vitgumo/1.0.0/carrinho/adicionar", async (req, res) => {
  const { idProduto, quantidade } = req.body;
  const usuario = req.session.usuario;

  if (!usuario) return res.status(401).json({ success: false, message: "Você precisa estar logado." });
  if (!idProduto) return res.status(400).json({ success: false, message: "Produto inválido." });

  try {
    await adicionarAoCarrinho(usuario.id, idProduto, quantidade);
    res.json({ success: true, message: "Produto adicionado ao carrinho!" });
  } catch (erro) {
    console.error("Erro ao adicionar ao carrinho:", erro);
    res.status(500).json({ success: false, message: "Erro ao adicionar produto ao carrinho." });
  }
});

// Listar carrinho
router.get("/vitgumo/1.0.0/carrinho", async (req, res) => {
  const usuario = req.session.usuario;
  if (!usuario) return res.redirect("/vitgumo/1.0.0/cadastroLogin");

  try {
    const itens = await listarCarrinho(usuario.id);
    const totalGeral = itens.reduce((soma, item) => soma + Number(item.totalItem), 0);
    res.render("carrinho", { itens, totalGeral, usuario });
  } catch (erro) {
    console.error("Erro ao carregar carrinho:", erro);
    res.status(500).send("Erro ao carregar o carrinho.");
  }
});

// Remover item
router.post("/vitgumo/1.0.0/carrinho/remover", async (req, res) => {
  const { idCarrinho } = req.body;
  const usuario = req.session.usuario;
  if (!usuario) return res.status(401).json({ success: false, message: "Você precisa estar logado." });

  try {
    await removerItemCarrinho(usuario.id, idCarrinho);
    res.redirect("/vitgumo/1.0.0/carrinho");
  } catch (erro) {
    console.error("Erro ao remover item:", erro);
    res.status(500).json({ success: false, message: "Erro ao remover item." });
  }
});

// Finalizar compra
router.post("/vitgumo/1.0.0/carrinho/finalizar", async (req, res) => {
  try {
    const { tipoEntrega, endereco, formaPagamento } = req.body;
    const usuario = req.session.usuario;

    // 🧍 Verifica se o usuário está logado
    if (!usuario) {
      return res.status(401).render("login", {
        message: "Você precisa estar logado para finalizar a compra."
      });
    }

    // 🚫 Validação básica
    if (!tipoEntrega || !formaPagamento) {
      return res.status(400).render("carrinho", {
        message: "Selecione o tipo de entrega e a forma de pagamento."
      });
    }

    if (tipoEntrega === "entrega" && (!endereco || endereco.trim() === "")) {
      return res.status(400).render("carrinho", {
        message: "Informe o endereço para entrega."
      });
    }

    // 🛒 Buscar produtos do carrinho
    const carrinho = await getCarrinho(usuario.id);

    if (!carrinho || !carrinho.length) {
      return res.render("carrinho", {
        message: "Seu carrinho está vazio!"
      });
    }

    // 💰 Calcular total
    const total = carrinho.reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0
    );

    // 🧾 Criar pedido na tbPedidos
    const idPedido = await criarPedido({
      idUsuario: usuario.id,
      tipo_entrega: tipoEntrega,
      endereco_entrega: tipoEntrega === "entrega" ? endereco : null,
      forma_pagamento: formaPagamento,
      total
    });

    // 📦 Inserir os itens na tbPedidoItens
    for (const item of carrinho) {
      await adicionarItemPedido({
        idPedido,
        idProduto: item.idProduto,
        quantidade: item.quantidade,
        preco_unitario: item.preco
      });
    }

    // 🧹 Limpar o carrinho do usuário
    await limparCarrinho(usuario.id);

    // ✅ Renderiza tela de sucesso
    res.render("checkout", {
      idPedido,
      total: total.toFixed(2),
      tipoEntrega,
      formaPagamento,
      endereco: tipoEntrega === "entrega" ? endereco : "Retirada na loja"
    });

  } catch (erro) {
    console.error("Erro ao finalizar compra:", erro);
    res.status(500).render("erro", {
      message: "Ocorreu um erro ao finalizar sua compra. Tente novamente mais tarde."
    });
  }
});

export default router;
