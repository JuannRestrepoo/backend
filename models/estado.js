const { Schema, model } = require("mongoose");

const estadoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("estado", estadoSchema);
