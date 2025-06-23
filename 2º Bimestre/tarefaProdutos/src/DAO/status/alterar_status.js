const {conexao} = require('../conexao.js')

async function alterarStatus(infos){
    const sql = `UPDATE tbl_status SET nome = ? WHERE id = ?;`
    
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

module.exports = {alterarStatus}