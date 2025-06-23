const {conexao} = require('../conexao.js')

async function patchPedido(campo, numero, valor){
  const data = [valor, numero]

  const colPermitidas = ['numero', 'data_elaboracao', 'cliente_id']
  if(!colPermitidas.includes(campo)) {
    throw new Error('Coluna inválida')
  } 

  const sql = `UPDATE tbl_pedido SET ${campo} = ? WHERE numero = ?;`
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

module.exports = {patchPedido}