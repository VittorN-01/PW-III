const {conexao} = require('../conexao.js')

async function  patchCatego (campo, id, valor){
  const data = [valor, id]

  const colPermitidas = ['nome']
  if(!colPermitidas.includes(campo)) {
    throw new Error('Coluna inválida')
  } 

  const sql = `UPDATE tbl_categoria SET ${campo} = ? WHERE id = ?;`
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

module.exports = {patchCatego}