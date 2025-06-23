const {conexao} = require('../conexao.js')

async function alterarCliente(infos){
    const sql = `UPDATE tbl_cliente SET telefone = ?, nome = ?, limite = ?, id_endereco = ?, id_status = ? WHERE codigo = ?;`
    
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

module.exports = {alterarCliente}