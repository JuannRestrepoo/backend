const Estado = require("../models/estado");
const { request, response } = require("express");

const getEstado = async (req = request, res = response) => {
  try {
    const estadoDB = await Estado.find();
    return res.json(estadoDB);
  } catch (e) {
    return res.status(500).json({
      msg: "Error General" + e,
    });
  }
};

const postEstado = async (req = request, res = response) => {
  try {
    const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : "";

    if (!nombre) {
      return res.status(400).json({
        msg: "El nombre es obligatorio",
      });
    }

    const estadoDB = await Estado.findOne({ nombre: nombre });

    if (estadoDB) {
      return res.status(400).json({
        msg: `El estado ${nombre} ya existe`,
      });
    }

    const estado = {
      nombre,
    };

    const guardarEstado = new Estado(estado);
    await guardarEstado.save();

    return res.status(201).json({
      msg: `El estado ${nombre} fue creado`,
      estado: guardarEstado,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error del servidor" + e,
    });
  }
};

const putEstado = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        msg: "El id es obligatorio",
      });
    }

    const data = { ...req.body };
    data.nombre = data.nombre ? data.nombre.toUpperCase() : "";
    data.fechaActualizacion = Date.now();

    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "Id invalido",
      });
    }

    const estado = await Estado.findByIdAndUpdate(id, data, { new: true });

    if (!estado) {
      return res.status(404).json({ msg: "Estado no encontrado" });
    }

    return res.json({ msg: "Estado actualizado", estado });
  } catch (e) {
    return res.status(500).json({ msg: "Error del server: " + e });
  }
};

const deleteEstado = async (req = request, res = response) => {
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

    const estado = await Estado.findByIdAndDelete(id);

    if (!estado) {
      return res.status(404).json({ msg: "Estado no encontrado" });
    }

    return res.json({
      msg: "Estado eliminado",
      estado,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error del server: " + e,
    });
  }
};

module.exports = {
  getEstado,
  postEstado,
  putEstado,
  deleteEstado,
};
