const express = require('express')
const router = express.Router()

// Imports das Functions
const {buscarCategorias, buscarCategoria} = require('../DAO/categoria/buscar_categoria.js')
const {incluirCategoria} = require('../DAO/categoria/inserir_categoria.js')
const {alterarCategoria} = require('../DAO/categoria/alterar_categoria.js')
const {patchCatego} = require('../DAO/categoria/patch_categoria.js')
const {deletarcategoria} = require('../DAO/categoria/deletar_categoria.js')

// ROTAS
router.get('/firma/1.0.0/categorias', async (req, res) =>{
    let categorias = await buscarCategorias()
    res.json(categorias)
})

router.get('/firma/1.0.0/categoria/:id', async (req, res) =>{
    let id = parseInt( req.params.id)
    let categoria = await buscarCategoria(id)
    res.json(categoria)
})

router.post('/firma/1.0.0/categoria', async (req, res) =>{
    let {id, nome} = req.body
    const infos = [id, nome]
    let result = await incluirCategoria(infos)
    res.json(result)
})

router.put('/firma/1.0.0/alterarcategoria', async (req, res) => {
    let {nome, id} = req.body
    const infos = [nome, id]
    let result = await alterarCategoria(infos)
    res.json(result)
})  

router.patch('/firma/1.0.0/patchcatego', async (req, res) => {
    let {campo, id, valor} = req.body
    let result = await patchCatego(campo, id, valor)
    res.send(200).json(result)
})

router.delete('/firma/1.0.0/deletecategoria/:id', async (req, res) => {
    const id = req.params.id
    let result = await deletarcategoria(id)
    res.json(result)
})


module.exports = router