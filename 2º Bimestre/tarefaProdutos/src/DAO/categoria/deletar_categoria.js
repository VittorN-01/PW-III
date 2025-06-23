const {conexao} = require('../conexao.js')

async function deletarcategoria(id) {
    const sql = `DELETE FROM tbl_categoria WHERE id = ?`
    const conn = await conexao()

    
    try {
        // Executar a consulta
        const [result] = await conn.query(sql, [id]);
        
        await conn.end()
        return result
      } catch (err) {
        return err.message
      }
}

module.exports = {deletarcategoria}