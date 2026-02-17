const Etapa = require("../models/etapa");
const { request, response } = require("express");

const getEtapa = async (req = request, res = response) => {
  try {
    const etapaDB = await Etapa.find();
    return res.json(etapaDB);
  } catch (e) {
    return res.status(500).json({
      msg: "Error General" + e,
    });
  }
};

const postEtapa = async (req = request, res = response) => {
  try {
    const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : "";

    if (!nombre) {
      return res.status(400).json({
        msg: "El nombre es obligatorio",
      });
    }

    const etapaDB = await Etapa.findOne({ nombre: nombre });

    if (etapaDB) {
      return res.status(400).json({
        msg: `La etapa ${nombre} ya existe`,
      });
    }

    const etapa = {
      nombre,
    };

    const guardarEtapa = new Etapa(etapa);

    await guardarEtapa.save();

    return res.status(201).json({
      msg: `La etapa ${nombre} fue creada`,
      etapa: guardarEtapa,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error del servidor" + e,
    });
  }
};

const putEtapa = async (req = request, res = response) => {
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

    const etapa = await Etapa.findByIdAndUpdate(id, data, { new: true });

    if (!etapa) {
      return res.status(404).json({ msg: "Etapa no encontrada" });
    }

    return res.json({ msg: "Etapa actualizada", etapa });
  } catch (e) {
    return res.status(500).json({ msg: "Error del server: " + e });
  }
};

const deleteEtapa = async (req = request, res = response) => {
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

    const etapa = await Etapa.findByIdAndDelete(id);

    if (!etapa) {
      return res.status(404).json({ msg: "Etapa no encontrada" });
    }

    return res.json({
      msg: "Etapa eliminada",
      etapa,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error del server: " + e,
    });
  }
};

module.exports = {
  getEtapa,
  postEtapa,
  putEtapa,
  deleteEtapa,
};
