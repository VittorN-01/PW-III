const express = require('express')
const router = express.Router()

// Imports das Functions
const {buscarItens, buscarItem} = require('../DAO/itemPedido/buscar_itemPedido.js')
const {incluirItem} = require('../DAO/itemPedido/inserir_itemPedido.js')
const {alterarItemPedido} = require('../DAO/itemPedido/alterar_itemPedido.js')
const {patchItem} = require('../DAO/itemPedido/patch_itemPedido.js')
const {deletarItem} = require('../DAO/itemPedido/deletar_itemPedido.js')

// ROTAS
router.get('/firma/1.0.0/itenspedidos', async (req, res) =>{
    let itemPedido = await buscarItens()
    res.json(itemPedido)
})

router.get('/firma/1.0.0/itempedido/:id', async (req, res) =>{
    let id = parseInt( req.params.id)
    let itemPedido = await buscarItem(id)
    res.json(itemPedido)
})

router.post('/firma/1.0.0/itenspedido', async (req, res) =>{
    let {id, id_pedido, id_produto, qnt} = req.body
    const infos = [id, id_pedido, id_produto, qnt]
    let result = await incluirItem(infos)
    res.json(result)
})

router.put('/firma/1.0.0/alteraritempedido', async (req, res) => {
    let {id_pedido,id_produto, qnt, id} = req.body
    const infos = [id_pedido,id_produto, qnt, id]
    let result = await alterarItemPedido(infos)
    res.json(result)
})  

router.patch('/firma/1.0.0/alteraritempedido', async (req, res) => {
    let {campo, id, valor} = req.body
    let result = await patchItem(campo, id, valor)
    res.send(200).json(result)
})

router.delete('/firma/1.0.0/deleteitempedido/:id', async (req, res) => {
    let id = req.params.id
    let result = await deletarItem(id)
    res.json(result)
})


module.exports = router