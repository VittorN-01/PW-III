const {conexao} = require('../conexao.js')

async function  patchItem(campo, id, valor){
  const data = [valor, id]

  const colPermitidas = ['id_pedido','id_produto', 'qnt']
  if(!colPermitidas.includes(campo)) {
    throw new Error('Coluna inválida')
  } 

  const sql = `UPDATE tbl_itempedido SET ${campo} = ? WHERE id = ?;`
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

module.exports = {patchItem}