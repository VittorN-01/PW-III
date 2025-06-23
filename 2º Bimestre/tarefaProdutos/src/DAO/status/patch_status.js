const {conexao} = require('../conexao.js')

async function patchStatus(campo, id, valor){
  const data = [valor, id]

  const colPermitidas = ['id', 'nome']
  if(!colPermitidas.includes(campo)) {
    throw new Error('Coluna inválida')
  } 

  const sql = `UPDATE tbl_status SET ${campo} = ? WHERE id = ?;`
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

module.exports = {patchStatus}