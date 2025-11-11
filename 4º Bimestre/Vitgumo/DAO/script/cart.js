import { conexao } from "../conexao.js";

// Adicionar produto ao carrinho
export async function adicionarAoCarrinho(idUsuario, idProduto, quantidade) {
  if (!idProduto) throw new Error("idProduto não definido");
  const pool = await conexao();

  const [existe] = await pool.query(
    "SELECT * FROM tbCarrinho WHERE idUsuario = ? AND idProduto = ?",
    [idUsuario, idProduto]
  );

  if (existe.length > 0) {
    await pool.query(
      "UPDATE tbCarrinho SET quantidade = quantidade + ? WHERE idUsuario = ? AND idProduto = ?",
      [quantidade, idUsuario, idProduto]
    );
  } else {
    await pool.query(
      "INSERT INTO tbCarrinho (idUsuario, idProduto, quantidade) VALUES (?, ?, ?)",
      [idUsuario, idProduto, quantidade]
    );
  }
}

export async function listarCarrinho(idUsuario) {
  const pool = await conexao();
  const [itens] = await pool.query(`
    SELECT c.idCarrinho, p.nome, p.preco, p.imagem, c.quantidade,
           (p.preco * c.quantidade) AS totalItem
    FROM tbCarrinho c
    JOIN tbProdutos p ON c.idProduto = p.idProduto
    WHERE c.idUsuario = ?
  `, [idUsuario]);

  return itens;
}


// Remover item do carrinho
export async function removerItemCarrinho(idUsuario, idCarrinho) {
  const pool = await conexao();
  await pool.query(
    "DELETE FROM tbCarrinho WHERE idCarrinho = ? AND idUsuario = ?",
    [idCarrinho, idUsuario]
  );
}

// Buscar todos os itens do carrinho de um usuário
export async function getCarrinho(idUsuario) {
  const pool = await conexao();
  const [rows] = await pool.query(
    `SELECT 
        c.idCarrinho,
        c.idProduto,
        c.quantidade,
        p.nome,
        p.preco,
        p.imagem,
        (p.preco * c.quantidade) AS totalItem
     FROM tbCarrinho c
     JOIN tbProdutos p ON c.idProduto = p.idProduto
     WHERE c.idUsuario = ?`,
    [idUsuario]
  );
  return rows;
}