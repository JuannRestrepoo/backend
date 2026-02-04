const {Router} = require("express")

const {
    getClientes,
    //postClientes
} = require("../controllers/clientes")

const router = Router()


router.get('/', getClientes)

//router.post('/', postClientes)

module.exports = router