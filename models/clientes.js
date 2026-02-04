
const {Schema, model} = require("mongoose");



const clientesSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    apellido:{
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    email:{
        type: String,
        required: [true, "El email es obligatorio"]
    },
    telefono:{
        type: String,
        required: [true, "El telefono es obligatorio"]
    },
    fechaCreacion:{
        type: Date,
        default: Date.now()
    },
     fechaActualizacion:{
        type: Date,
        default: Date.now()
    },
})





module.exports = model("clientes", clientesSchema)