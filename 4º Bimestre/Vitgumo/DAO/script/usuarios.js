import { conexao } from "../conexao.js";

// LOGIN
export async function logarUser(cpfEmail, senha) {
  console.log("Tentando login de CLIENTE");

  const sql = `SELECT * FROM tbUsuarios 
               WHERE (cpf = ? OR email = ?) AND senha = ?`;

  const conn = await conexao();
  try {
    const [rows] = await conn.query(sql, [cpfEmail, cpfEmail, senha]);
    await conn.end();

    if (rows.length > 0) {
      return rows[0]; // retorna o usuário encontrado
    } else {
      return null; // usuário não encontrado
    }
  } catch (err) {
    console.error("Erro ao logar usuário:", err);
    await conn.end();
    throw err;
  }
}

// CADASTRO
export async function cadastroUser({ nome, cpf, email, senha }) {
  console.log("Cadastro de CLIENTE");

  const sql = `INSERT INTO tbUsuarios (nome, cpf, email, senha) VALUES (?, ?, ?, ?)`;
  const conn = await conexao();

  try {
    const [results] = await conn.query(sql, [nome, cpf, email, senha]);
    await conn.end();
    return results;
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    await conn.end();
    throw new Error(err.sqlMessage || err.message);
  }
}
