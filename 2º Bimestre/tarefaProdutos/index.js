const express = require('express')
const env = require('dotenv')
// Conexão
const {conexao, closeConexao, testarConexao} = require('./src/DAO/conexao.js')

// ROTAS
const rotasCategorias = require('./src/router/router_categoria.js')
const rotasClientes = require('./src/router/router_cliente.js')
const rotasEnderecos = require('./src/router/router_endereco.js')
const rotasItemPedidos = require('./src/router/router_itemPedido.js')
const rotasPedidos = require('./src/router/router_pedido.js')
const rotasProdutos = require('./src/router/router_produto.js')
const rotasStatus = require('./src/router/router_status.js')

const app = express()
env.config()

app.use(
    express.urlencoded({
        extended: true
    })
)
  
app.use(express.json())
  

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Usando as rotas
app.use(rotasCategorias)
app.use(rotasClientes)
app.use(rotasEnderecos)
app.use(rotasItemPedidos)
app.use(rotasPedidos)
app.use(rotasProdutos)
app.use(rotasStatus)


app.listen(process.env.PORTA, () => {
    console.log(`Operando na porta ${process.env.PORTA}`), 
    testarConexao(conexao())
})