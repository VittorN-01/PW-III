const {conexao} = require('../conexao.js')

async function deletarPedido(numero) {
    const sql = `DELETE FROM tbl_pedido WHERE numero=?`
    const conn = await conexao()
    
    
    try {
        // Executar a consulta
        const [result] = await conn.query(sql, [numero]);
        await conn.end()
        return result
      } catch (err) {
        return err.message
      }
}

module.exports = {deletarPedido}