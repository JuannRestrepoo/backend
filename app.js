const express = require ("express")
const app = express()
const cors = require ("cors")

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: '*'
}))

const clientes = require ("./routes/clientes")
const universidad = require("./routes/universidad")
const tipoProyecto = require("./routes/tipoproyecto")
const etapa = require("./routes/etapa")

//ROUTES

app.use ("/api/clientes", clientes)
app.use ("/api/universidad", universidad)
app.use ("/api/tipoProyecto", tipoProyecto)
app.use ("/api/etapa", etapa)

module.exports = app
