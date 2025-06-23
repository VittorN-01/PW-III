const express = require('express')
const router = express.Router()

// Imports das Functions
const {buscarStatus, buscarStatusId} = require('../DAO/status/buscar_status.js')
const {incluirStatus} = require('../DAO/status/inserir_status.js')
const {alterarStatus} = require('../DAO/status/alterar_status.js')
const {patchStatus} = require('../DAO/status/patch_status.js')
const {deletarStatus} = require('../DAO/status/deletar_status.js')

// ROTAS
router.get('/firma/1.0.0/statuses', async (req, res) =>{
    let status = await buscarStatus()
    res.json(status)
})

router.get('/firma/1.0.0/status/:id', async (req, res) =>{
    let id = parseInt( req.params.id)
    let status = await buscarStatusId(id)
    res.json(status)
})

router.post('/firma/1.0.0/status', async (req, res) =>{
    let {id, nome} = req.body
    const infos = [id, nome]
    let result = await incluirStatus(infos)
    res.json(result)
})

router.put('/firma/1.0.0/alterarstatus', async (req, res) => {
    let {nome, id} = req.body
    const infos = [nome, id]
    let result = await alterarStatus(infos)
    res.json(result)
})  

router.patch('/firma/1.0.0/alterarstatus', async (req, res) => {
    let {campo, id, valor} = req.body
    let result = await patchStatus(campo, id, valor)
    res.send(200).json(result)
})

router.delete('/firma/1.0.0/deletestatus/:id', async (req, res) => {
    let id = req.params.id
    let result = await deletarStatus(id)
    res.json(result)
})


module.exports = router