const { Await } = require("react-router-dom")
const Clientes = require("../models/clientes")
const {request, response, json} = require("express")

const getClientes = async (req = request, res = response) => { 
    try {
        const clientesDB = await Cliente.find()
        return res.json(clientesDB)
        
    } catch (e) {
        return res.status(500).json({
            msg: "Error General"+ e
        })
        
    }
    
}






module.exports = {getClientes}