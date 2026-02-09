const { Router } = require("express");

const {
  getUniversidad,
  postUniversidad,
  putClientes,
  deleUniversidad,
} = require("../controllers/universidad");

const router = Router();

router.get("/", getUniversidad);
router.post("/", postUniversidad);
router.put("/:id", putClientes);
router.delete("/:id", deleUniversidad);

module.exports = router;
