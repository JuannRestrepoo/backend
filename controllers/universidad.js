const Universidad = require("../models/universidad");
const { request, response } = require("express");

const getUniversidad = async (req = request,res = response) => {
  try {
    const universidadDB = await Universidad.find();
    return res.json(universidadDB);
  } catch (e) {
    return res.status(500).json({
      msg: "Error General" + e,
    });
  }
};

module.exports = {
  getUniversidad,
};
