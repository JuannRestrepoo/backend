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

//ROUTES

app.use ("/api/clientes", clientes)





module.exports = app

