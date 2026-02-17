const TipoProyecto = require("../models/tipoProyecto");
const { request, response, json } = require("express");


const getTipoProyecto = async (req = request, res = response) => {
  try {
    const tipoProyectoDB = await TipoProyecto.find();
    return res.json(tipoProyectoDB);
  } catch (e) {
    return res.status(500).json({
      msg: "Error General" + e,
    });
  }
};


const postTipoProyecto = async (req = request, res = response) => {
  try {

    const nombre = req.body.nombre
    const descripcion= req.body.descripcion;

    if (!nombre || !descripcion) {
      return res.status(400).json({
        msg: "Todos los campos son obligatorios",
      });
    }

    const tipoProyectoDB = await TipoProyecto.findOne({ 
        nombre: nombre, 
        descripcion: descripcion, 
    });


    if (tipoProyectoDB) {
      return res.status(400).json({
        msg: `El TipoProyecto ${nombre} ya existe`,
      });
    }

    const tipoProyecto = {
      nombre,
      descripcion,
    };


    const guardarTipoProyecto = new TipoProyecto(tipoProyecto);
    console.log(guardarTipoProyecto);

    await guardarTipoProyecto.save();

    return res.status(201).json({
      msg: `El tipoProyecto ${nombre} fue creado`,
      TipoProyecto: guardarTipoProyecto ,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error del servidor" + e,
    });
  }
};

const putTipoProyecto = async (req = request, res = response) => {
  try {

    const { id } = req.params;


    if (!id) {
      return res.status(400).json({
        msg: "El id es obligatorio",
      });
    }


    const data = { ...req.body };
    data.nombre = data.nombre
    data.fechaActualizacion = Date.now();

    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "Id inválido",
      });
    }

    const tipoProyecto = await TipoProyecto.findByIdAndUpdate(id, data, { new: true });

    if (!tipoProyecto) {
      return res.status(404).json({ msg: "TipoProyecto no encontrado" });
    }

    return res.json({ msg: "TipoProyecto Actualizado", tipoProyecto });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error del server: " + e });
  }
};

const deleteTipoProyecto = async (req = request, res = response) => {
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
        msg: "Id inválido",
      });
    }

    const tipoProyecto = await TipoProyecto.findByIdAndDelete(id);
    return res.json({
      msg: "TipoProyecto Eliminado",
      tipoProyecto,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error del server: " + e,
    });
  }
};


module.exports = {
  getTipoProyecto,
  postTipoProyecto,
  putTipoProyecto,
  deleteTipoProyecto,
};
