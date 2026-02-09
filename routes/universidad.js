const { Router } = require("express");

const {
  getUniversidad,
  postUniversidad,
} = require("../controllers/universidad");

const router = Router();

router.get("/", getUniversidad);
router.post("/", postUniversidad);

module.exports = router;
