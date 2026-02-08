const { Schema, model } = require("mongoose");

const universidadSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  direccion: {
    type: String,
    required: [true, "La direcion es obligatoria"],
  },
  telefono: {
    type: String,
    required: [true, "El telefono es obligatorio"],
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

module.exports = model("universidad", universidadSchema);
