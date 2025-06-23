const express = require('express')
const router = express.Router()

// Imports das Functions
const {buscarClientes, buscarCliente} = require('../DAO/cliente/buscar_cliente.js')
const {incluirCliente} = require('../DAO/cliente/inserir_cliente.js')
const {alterarCliente} = require('../DAO/cliente/alterar_cliente.js')
const {patchCliente} = require('../DAO/cliente/patch_cliente.js')
const {deletarCliente} = require('../DAO/cliente/deletar_cliente.js')

// ROTAS
router.get('/firma/1.0.0/clientes', async (req, res) =>{
    let clientes = await buscarClientes()
    res.json(clientes)
})

router.get('/firma/1.0.0/cliente/:codigo', async (req, res) =>{
    let codigo = parseInt( req.params.codigo)
    let cliente = await buscarCliente(codigo)
    res.json(cliente)
})

router.post('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [codigo, nome, telefone, limite, id_endereco, id_status]
    let result = await incluirCliente(infos)
    res.json(result)
})

router.put('/firma/1.0.0/alterarcliente', async (req, res) => {
    let {telefone, nome, limite, id_endereco, id_status, codigo} = req.body
    const infos = [telefone, nome, limite, id_endereco, id_status, codigo]
    let result = await alterarCliente(infos)
    res.json(result)
})

router.patch('/firma/1.0.0/alterardado', async (req, res) => {
    let {campo, codigo, valor} = req.body
    let result = await patchCliente(campo, codigo, valor)
    res.send(200).json(result)
})

router.delete('/firma/1.0.0/deletecliente/:codigo', async (req, res) => {
    let codigo = req.params.codigo
    let result = await deletarCliente(codigo)
    res.json(result)
})


module.exports = router