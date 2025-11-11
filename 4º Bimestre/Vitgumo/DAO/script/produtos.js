import { conexao } from '../conexao.js'

// Função auxiliar para buscar produtos do banco
export async function getProdutos() {
  const pool = await conexao();
  const [rows] = await pool.query("SELECT * FROM tbProdutos ORDER BY categoria, nome");

  // Agrupar por categoria
  const categorias = [];
  const map = {};
  rows.forEach(prod => {
    if (!map[prod.categoria]) {
      map[prod.categoria] = { nome: prod.categoria, produtos: [] };
      categorias.push(map[prod.categoria]);
    }
    map[prod.categoria].produtos.push(prod);
  });

  return categorias;
}

export async function getProdutosPorTermo(termo) {
  const sql = `
    SELECT idProduto, nome, descricao, preco, imagem 
    FROM tbProdutos 
    WHERE nome LIKE ? OR descricao LIKE ?
  `;
  const conn = await conexao();
  try {
    const [rows] = await conn.query(sql, [`%${termo}%`, `%${termo}%`]);
    return rows;
  } catch (err) {
    throw new Error(err.sqlMessage || err.message);
  } finally {
    await conn.end();
  }
}