const {conexao} = require('../conexao.js')

async function alterarEndereco(infos){
    const sql = `UPDATE tbl_endereco SET logradouro = ?, cep = ?, numero = ?, bairro = ?, cidade = ?  WHERE id = ?;`
    
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

module.exports = {alterarEndereco}