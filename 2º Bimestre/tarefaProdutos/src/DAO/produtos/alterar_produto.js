const {conexao} = require('../conexao.js')

async function alterarProduto(infos){
    const sql = `UPDATE tbl_produtos SET nome = ?, id_categoria = ?, preco = ? WHERE codigo = ?;`
    
    const conn = await conexao()
    try {
        // Executar a consulta
        const [rows] = await conn.query(sql, infos);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

module.exports = {alterarProduto}