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

//ROUTES

app.use ("/api/clientes", clientes)
app.use ("/api/universidad", universidad)

module.exports = app

