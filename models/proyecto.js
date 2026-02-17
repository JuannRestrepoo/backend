const { Schema, model } = require("mongoose");
const etapa = require("./etapa");

const proyectoSchema = Schema({
  numero: {
    type: String,
    required: [true, "El numero es obligatorio"],
  },

  titulo: {
  type: String,
  required: [true, "El titulo es obligatorio"],
  },

  descripcion: {
    type: String,
    required: [true, "La descripcion es obligatoria"],
  },
  estado: {
    type: String,
    required: [true, "El estado es obligatorio"],
  },
  fechaInicio: {
    type: Date,
    default: Date.now,
  },
  fechaFin: {
    type: Date,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },

  clienteId: {
    type: Schema.Types.ObjectId,
    ref: "clientes",
    required: true,
  },
  universidadId: {
    type: Schema.Types.ObjectId,
    ref: "universidad",
    required: true,
  },
  tipoProyectoId: {
    type: Schema.Types.ObjectId,
    ref: "TipoProyecto",
    required: true,
  },
  etapaId: {
    type: Schema.Types.ObjectId,
    ref: "etapa",
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },  
});

module.exports = model("Proyecto", proyectoSchema);
