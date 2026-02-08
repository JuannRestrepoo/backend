const { Router } = require("express");

const {
     getUniversidad
 } = require("../controllers/universidad");

const router = Router();

router.get("/", getUniversidad);

module.exports = router;
