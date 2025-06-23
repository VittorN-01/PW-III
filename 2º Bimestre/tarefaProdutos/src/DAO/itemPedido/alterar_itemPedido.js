const {conexao} = require('../conexao.js')

async function alterarItemPedido(infos){
    const sql = `UPDATE tbl_itempedido SET id_pedido = ?, id_produto = ?, qnt = ? WHERE id = ?;`
    
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

module.exports = {alterarItemPedido}