const {conexao} = require('../conexao.js')

async function  patchCliente(campo, codigo, valor){
  const data = [valor, codigo]

  const colPermitidas = ['nome', 'telefone', 'limite','id_endereco','id_status']
  if(!colPermitidas.includes(campo)) {
    throw new Error('Coluna inválida')
  } 

  const sql = `UPDATE tbl_cliente SET ${campo} = ? WHERE codigo = ?;`
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

module.exports = {patchCliente}