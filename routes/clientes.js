const {Router} = require("express")

const {
    getClientes,
    postClientes,
    putClientes
} = require("../controllers/clientes")

const router = Router()


router.get('/', getClientes)
router.post('/', postClientes)
router.put('/:id', putClientes)

module.exports = router