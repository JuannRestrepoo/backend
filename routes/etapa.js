const { Router } = require("express");

const {
  getEtapa,
  postEtapa,
  putEtapa,
  deleteEtapa,
} = require("../controllers/etapa");

const router = Router();

router.get("/", getEtapa);
router.post("/", postEtapa);
router.put("/:id", putEtapa);
router.delete("/:id", deleteEtapa);

module.exports = router;
