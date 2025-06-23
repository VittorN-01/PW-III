const express = require('express')
const router = express.Router()

// Imports das Functions
const {buscarProdutos, buscarProduto} = require('../DAO/produtos/buscar_produto.js')
const {incluirProduto} = require('../DAO/produtos/inserir_produto.js')
const {alterarProduto} = require('../DAO/produtos/alterar_produto.js')
const {patchProduto} = require('../DAO/produtos/patch_produto.js')
const {deletarProduto} = require('../DAO/produtos/deletar_produto.js')

// ROTAS
router.get('/firma/1.0.0/produtos', async (req, res) =>{
    let produtos = await buscarProdutos()
    res.json(produtos)
})

router.get('/firma/1.0.0/produto/:codigo', async (req, res) =>{
    let codigo = parseInt( req.params.codigo)
    let produto = await buscarProduto(codigo)
    res.json(produto)
})

router.post('/firma/1.0.0/produto', async (req, res) =>{
    let {codigo, nome,id_categoria, preco} = req.body
    const infos = [codigo, nome, id_categoria, preco]
    let result = await incluirProduto(infos)
    res.json(result)
})

router.put('/firma/1.0.0/alterarproduto', async (req, res) => {
    let {nome, id_categoria, preco, codigo} = req.body
    const infos = [nome, id_categoria, preco, codigo]
    let result = await alterarProduto(infos)
    res.json(result)
})  

router.patch('/firma/1.0.0/alterarproduto', async (req, res) => {
    let {campo, codigo, valor} = req.body
    let result = await patchProduto(campo, codigo, valor)
    res.send(200).json(result)
})

router.delete('/firma/1.0.0/deleteproduto/:codigo', async (req, res) => {
    let codigo = req.params.codigo
    let result = await deletarProduto(codigo)
    res.json(result)
})


module.exports = router