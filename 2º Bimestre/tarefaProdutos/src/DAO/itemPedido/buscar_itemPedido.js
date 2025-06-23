const {conexao} = require('../conexao.js')


async function buscarItens(){
    const sql = `SELECT * FROM tbl_itempedido;`
    
    const conn = await conexao()
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

async function buscarItem(id){
    const sql = `SELECT * FROM tbl_itempedido WHERE id = ?`
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [id]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}


module.exports = {buscarItens, buscarItem}