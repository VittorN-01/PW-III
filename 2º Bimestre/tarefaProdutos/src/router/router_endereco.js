const express = require('express')
const router = express.Router()

// Imports das Functions
const {buscarEnderecos, buscarEndereco} = require('../DAO/endereço/buscar_endereco.js')
const {incluirEndereco} = require('../DAO/endereço/inserir_endereco.js')
const {alterarEndereco} = require('../DAO/endereço/alterar_endereco.js')
const {patchEndereco} = require('../DAO/endereço/patch_endereco.js')
const {deletarEndereco} = require('../DAO/endereço/deletar_endereco.js')

// ROTAS
router.get('/firma/1.0.0/enderecos', async (req, res) =>{
    let enderecos = await buscarEnderecos()
    res.json(enderecos)
})

router.get('/firma/1.0.0/endereco/:id', async (req, res) =>{
    let id = parseInt( req.params.id)
    let endereco = await buscarEndereco(id)
    res.json(endereco)
})

router.post('/firma/1.0.0/endereco', async (req, res) =>{
    let {id, logradouro, cep, numero, bairro, cidade} = req.body
    const infos = [id, logradouro, cep, numero, bairro, cidade]
    let result = await incluirEndereco(infos)
    res.json(result)
})

router.put('/firma/1.0.0/alterarendereco', async (req, res) => {
    let {logradouro, cep, numero, bairro, cidade, id} = req.body
    const infos = [logradouro, cep, numero, bairro, cidade, id]
    let result = await alterarEndereco(infos)
    res.json(result)
})  

router.patch('/firma/1.0.0/alterarendereco', async (req, res) => {
    let {campo, id, valor} = req.body
    let result = await patchEndereco(campo, id, valor)
    res.send(200).json(result)
})

router.delete('/firma/1.0.0/deleteendereco/:id', async (req, res) => {
    let id = req.params.id
    let result = await deletarEndereco(id)
    res.json(result)
})


module.exports = router