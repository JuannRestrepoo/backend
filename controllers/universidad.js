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
    const direccion = req.body.direccion ? req.body.direccion.toUpperCase() : "";
    const telefono = req.body.telefono;

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

const putClientes = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        msg: "El id es obligatorio",
      });
    }

    const data = { ...req.body };
    data.nombre = data.nombre ? data.nombre.toUpperCase() : "";
    data.direccion = data.direccion ? data.direccion.toUpperCase() : "";
    data.fechaActualizacion = Date.now();

    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "Id invalido",
      });
    }

    const universidad = await Universidad.findByIdAndUpdate(id, data, { new: true });

    if (!universidad) {
      return res.status(404).json({ msg: "Universidad no encontrada" });
    }

    return res.json({ msg: "Universidad actualizada", universidad });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error del server: " + e });
  }
};

const deleUniversidad = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        msg: "El id es obligatorio",
      });
    }

    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "Id invalido",
      });
    }

    const universidad = await Universidad.findByIdAndDelete(id);

    if (!universidad) {
      return res.status(404).json({ msg: "Universidad no encontrada" });
    }

    return res.json({
      msg: "Universidad eliminada",
      universidad,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error del server: " + e,
    });
  }
};

module.exports = {
  getUniversidad,
  postUniversidad,
  putClientes,
  deleUniversidad,
};
