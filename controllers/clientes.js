const Clientes = require("../models/clientes");
const { request, response, json } = require("express");

const getClientes = async (req = request, res = response) => {
  try {
    const clientesDB = await Clientes.find();
    return res.json(clientesDB);
  } catch (e) {
    return res.status(500).json({
      msg: "Error General" + e,
    });
  }
};

const postClientes = async (req = request, res = response) => {
  try {
    //obtener valor de variables
    const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : "";
    const apellido = req.body.apellido ? req.body.apellido.toUpperCase() : "";
    const email = req.body.email;
    const telefono = req.body.telefono;

    //validar que las variables esten presentes
    if (!nombre || !apellido || !email || !telefono) {
      return res.status(400).json({
        msg: "Todos los campos son obligatorios",
      });
    }

    //Validar si el clienta ya existe en la base de datos con nombre y email
    const clienteDB = await Clientes.findOne({ nombre: nombre, email: email });

    //si el cliente existe, retornar un error
    if (clienteDB) {
      return res.status(400).json({
        msg: `El cliente ${nombre} ya existe`,
      });
    }

    //crear cliente
    const cliente = {
      nombre,
      apellido,
      email,
      telefono,
    };

    //guardar el cliente ne base de datos
    const guardarCliente = new Clientes(cliente);
    console.log(guardarCliente);

    await guardarCliente.save();

    return res.status(201).json({
      msg: `El cliente ${nombre} fue creado`,
      cliente: guardarCliente,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error del servidor" + e,
    });
  }
};

const putClientes = async (req = request, res = response) => {
  try {
    // obtener el id del cliente desde params
    const { id } = req.params;

    // validar id
    if (!id) {
      return res.status(400).json({ 
        msg: "El id es obligatorio" 
      });
    }

    // obtener la informacion del cliente desde body
    const data = { ...req.body };
    data.nombre = data.nombre ? data.nombre.toUpperCase() : "";
    data.fechaActualizacion = Date.now();

    // opcional: validar que id sea un ObjectId válido (si usas mongoose)
    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        msg: "Id inválido" 
      });
    }

    const cliente = await Clientes.findByIdAndUpdate(id, data, { new: true });

    if (!cliente) {
      return res.status(404).json({ msg: "Cliente no encontrado" });
    }

    return res.json({ msg: "Cliente Actualizado", cliente });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error del server: " + e });
  }
};

const deleteClientes = async (req = request, res = response) => {
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

    const cliente = await Clientes.findByIdAndDelete(id);
    return res.json({
      msg: "Cliente Eliminado",
      cliente,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error del server: " + e,
    });
  }
};

module.exports = {
  getClientes,
  postClientes,
  putClientes,
  deleteClientes,
};
