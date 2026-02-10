const {Router} = require("express")

const {
    getTipoProyecto,
    postTipoProyecto,
    putTipoProyecto,
    deleteTipoProyecto
} = require("../controllers/tipoProyecto")

const router = Router()

router.get('/', getTipoProyecto)
router.post('/', postTipoProyecto)
router.put('/:id', putTipoProyecto)
router.delete('/:id', deleteTipoProyecto)


module.exports = router