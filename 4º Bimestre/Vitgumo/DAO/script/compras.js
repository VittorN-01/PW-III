import { conexao } from "../conexao.js";
const db = await conexao();

export async function criarPedido({ idUsuario, endereco_entrega, forma_pagamento, total }) {
  const [result] = await db.query(
    `INSERT INTO tbPedidos (idUsuario, total, endereco_entrega, forma_pagamento) VALUES (?, ?, ?, ?)`,
    [idUsuario, total, endereco_entrega, forma_pagamento]
  );
  return result.insertId;
}

export async function adicionarItemPedido({ idPedido, idProduto, quantidade, preco_unitario }) {
  await db.query(
    `INSERT INTO tbPedidoItens (idPedido, idProduto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)`,
    [idPedido, idProduto, quantidade, preco_unitario]
  );
}

export async function limparCarrinho(idUsuario) {
  await db.query("DELETE FROM tbCarrinho WHERE idUsuario = ?", [idUsuario]);
}
