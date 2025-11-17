import express from "express";
import { db } from "../server.js";

const router = express.Router();

// ============================
// 📌 LISTAR TODOS OS PRODUTOS
// ============================
router.get("/", (req, res) => {
    db.query("SELECT * FROM tbProdutos", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// ============================
// 📌 BUSCAR PRODUTO POR ID
// ============================
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.query(
        "SELECT * FROM tbProdutos WHERE idProduto = ?",
        [id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0)
                return res.status(404).json({ msg: "Produto não encontrado" });

            res.json(results[0]);
        }
    );
});

// ============================
// 📌 ADICIONAR PRODUTO
// ============================
router.post("/add", (req, res) => {
    const { nome, preco, quantidade, categoria, descricao, imagem, avaliacao } = req.body;

    db.query(
        "INSERT INTO tbProdutos (nome, preco, quantidade, categoria, descricao, imagem, avaliacao) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [nome, preco, quantidade, categoria, descricao, imagem, avaliacao],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ msg: "Produto adicionado!" });
        }
    );
});

// ============================
// 📌 EDITAR PRODUTO
// ============================
router.put("/editar/:id", (req, res) => {
    const { nome, preco, quantidade, categoria, descricao, imagem, avaliacao } = req.body;
    const { id } = req.params;

    db.query(
        "UPDATE tbProdutos SET nome=?, preco=?, quantidade=?, categoria=?, descricao=?, imagem=?, avaliacao=? WHERE idProduto=?",
        [nome, preco, quantidade, categoria, descricao, imagem, avaliacao, id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ msg: "Produto atualizado!" });
        }
    );
});

// ============================
// 📌 DELETAR PRODUTO
// ============================
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM tbPedidoItens WHERE idProduto = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length > 0) {
            return res.status(400).json({
                msg: "Não é possível excluir: produto já está em pedidos."
            });
        }

        db.query("DELETE FROM tbProdutos WHERE idProduto = ?", [id], (err2) => {
            if (err2) return res.status(500).json({ error: err2 });
            res.json({ msg: "Produto excluído com sucesso!" });
        });
    });
});



export default router;
