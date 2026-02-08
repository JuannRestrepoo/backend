const {Router} = require("express")

const {
    getClientes,
    postClientes,
    putClientes,
    deleteClientes
} = require("../controllers/clientes")

const router = Router()

router.get('/', getClientes)
router.post('/', postClientes)
router.put('/:id', putClientes)
router.delete('/:id', deleteClientes)

module.exports = router