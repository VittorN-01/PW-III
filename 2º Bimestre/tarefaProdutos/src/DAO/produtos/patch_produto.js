const {conexao} = require('../conexao.js')

async function patchProduto(campo, codigo, valor){
  const data = [valor, codigo]

  const colPermitidas = ['codigo', 'nome', 'id_categoria', 'preco']
  if(!colPermitidas.includes(campo)) {
    throw new Error('Coluna inválida')
  } 

  const sql = `UPDATE tbl_produtos SET ${campo} = ? WHERE codigo = ?;`
  const conn = await conexao()

    try {
        // Executar a consulta
        const [rows] = await conn.query(sql, data);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

module.exports = {patchProduto}