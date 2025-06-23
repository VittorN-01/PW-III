const express = require('express')
const router = express.Router()

// Imports das Functions
const {buscarPedidos, buscarPedido} = require('../DAO/pedido/buscar_pedido.js')
const {incluirPedido} = require('../DAO/pedido/inserir_pedido.js')
const {alterarPedido} = require('../DAO/pedido/alterar_pedido.js')
const {patchPedido} = require('../DAO/pedido/patch_pedido.js')
const {deletarPedido} = require('../DAO/pedido/deletar_pedido.js')

// ROTAS
router.get('/firma/1.0.0/pedidos', async (req, res) =>{
    let pedidos = await buscarPedidos()
    res.json(pedidos)
})

router.get('/firma/1.0.0/pedido/:numero', async (req, res) =>{
    let numero = parseInt( req.params.numero)
    let pedido = await buscarPedido(numero)
    res.json(pedido)
})

router.post('/firma/1.0.0/pedido', async (req, res) =>{
    let {numero, data_elaboracao, cliente_id} = req.body
    const infos = [numero, data_elaboracao, cliente_id]
    let result = await incluirPedido(infos)
    res.json(result)
})

router.put('/firma/1.0.0/alterarpedido', async (req, res) => {
    let {data_elaboracao, cliente_id, numero} = req.body
    const infos = [data_elaboracao, cliente_id, numero]
    let result = await alterarPedido(infos)
    res.json(result)
})  

router.patch('/firma/1.0.0/alterarpedido', async (req, res) => {
    let {campo, numero, valor} = req.body
    let result = await patchPedido(campo, numero, valor)
    res.send(200).json(result)
})

router.delete('/firma/1.0.0/deletepedido/:numero', async (req, res) => {
    let numero = req.params.numero
    let result = await deletarPedido(numero)
    res.json(result)
})


module.exports = router