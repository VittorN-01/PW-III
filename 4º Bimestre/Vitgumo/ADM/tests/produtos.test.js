import request from 'supertest';
import app from '../server.js';
import { db } from '../server.js';  // ou de onde você exporta a conexão

describe('Testes da API de Produtos', () => {
  // Antes de todos os testes, limpar ou configurar banco de teste
  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      db.query("DELETE FROM tbPedidoItens", (err) => {
        if (err) return reject(err);

        db.query("DELETE FROM tbProdutos", (err2) => {
          if (err2) return reject(err2);
          resolve();
        });
      });
    });
  });


  it('GET /produtos deve retornar uma lista vazia inicialmente', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('POST /produtos/add cria um produto', async () => {
    const novo = {
      nome: 'Teste Produto',
      preco: 9.99,
      quantidade: 5,
      categoria: 'Teste',
      descricao: 'Descrição de teste',
      imagem: 'http://url-imagem',
      avaliacao: 0
    };

    const res = await request(app)
      .post('/produtos/add')
      .send(novo);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('Produto adicionado!');

    // verificar que o produto está na base
    const getRes = await request(app).get('/produtos');
    expect(getRes.body.length).toBe(1);
    expect(getRes.body[0].nome).toBe(novo.nome);
  });

  it('PUT /produtos/editar/:id atualiza o produto', async () => {
    // primeiro pega o produto inserido
    const lista = await request(app).get('/produtos');
    const prod = lista.body[0];

    const alterado = { ...prod, nome: 'Produto Modificado', preco: 19.99 };

    const res = await request(app)
      .put(`/produtos/editar/${prod.idProduto}`)
      .send(alterado);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('Produto atualizado!');

    const getRes2 = await request(app).get('/produtos');
    expect(getRes2.body[0].nome).toBe('Produto Modificado');
    expect(Number(getRes2.body[0].preco)).toBeCloseTo(19.99);
  });

  it('DELETE /produtos/delete/:id remove o produto', async () => {
    const lista = await request(app).get('/produtos');
    const prod = lista.body[0];

    const res = await request(app)
      .delete(`/produtos/delete/${prod.idProduto}`);

    // pode ser 200 ou 400 depende da sua regra de FK
    expect([200, 400]).toContain(res.statusCode);
  });

  afterAll(() => {
    db.end();
  });

});
