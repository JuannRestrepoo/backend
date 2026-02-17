const { Router } = require("express");

const {
  getEstado,
  postEstado,
  putEstado,
  deleteEstado,
} = require("../controllers/estado");

const router = Router();

router.get("/", getEstado);
router.post("/", postEstado);
router.put("/:id", putEstado);
router.delete("/:id", deleteEstado);

module.exports = router;
