const Universidad = require("../models/universidad");
const { request, response } = require("express");

const getUniversidad = async (req = request, res = response) => {
  try {
    const universidadDB = await Universidad.find();
    return res.json(universidadDB);
  } catch (e) {
    return res.status(500).json({
      msg: "Error General" + e,
    });
  }
};

const postUniversidad = async (req = request, res = response) => {
  try {
    const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : "";
    const direccion = req.body.direccion ? req.body.direccion.toUpperCase(): "";
    const telefono = req.body.telefono ;

    if (!nombre || !direccion || !telefono) {
      return res.status(400).json({
        msg: "Tdos los campos son obligatorios",
      });
    }

    const UniversidadDB = await Universidad.findOne({
      nombre: nombre,
      direccion: direccion,
    });

    if (UniversidadDB) {
      return res.status(400).json({
        msg: `La universidad ${nombre} ya existe`,
      });
    }

    const universidad = {
      nombre,
      direccion,
      telefono,
    };

    const guardarUniversidad = new Universidad(universidad);
    console.log(guardarUniversidad);

    await guardarUniversidad.save();

    return res.status(201).json({
      msg: `La universidad ${nombre} fue creada`,
      universidad: guardarUniversidad,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error General" + e,
    });
  }
};

module.exports = {
  getUniversidad,
  postUniversidad,
};
