const {conexao} = require('../conexao.js')

async function alterarPedido(infos){
    const sql = `UPDATE tbl_pedido SET data_elaboracao = ?, cliente_id = ? WHERE numero = ?;`
    
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

module.exports = {alterarPedido}